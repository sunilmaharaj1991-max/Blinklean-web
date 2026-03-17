import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";
import "../assets/css/scrap-booking-premium.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

const ALLOWED_ZONES = [
  { name: "Vijayanagar",         pincodes: ["560040", "560079"] },
  { name: "Chandra Layout",      pincodes: ["560040", "560072"] },
  { name: "Attiguppe",           pincodes: ["560040"] },
  { name: "Rajajinagar",         pincodes: ["560010", "560023"] },
  { name: "Rajarajeshwari Nagar",pincodes: ["560098"] }
];


const ScrapBooking = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth]       = useState(true);
  const [loading, setLoading]                 = useState(false);
  const [showSuccess, setShowSuccess]         = useState(false);
  const [areaError, setAreaError]             = useState("");
  const [pincodeValid, setPincodeValid]       = useState(false);

  const [formData, setFormData] = useState({
    user_name:    "",
    phone_number: "",
    address:      "",
    pincode:      "",
    pickup_point: "",
    items: [{ material_name: "", estimated_weight: "" }]
  });

  /* ---- Auth ---- */
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
        setFormData(prev => ({
          ...prev,
          user_name:    user.displayName || "",
          phone_number: user.phoneNumber?.replace("+91", "") || ""
        }));
      } else {
        setIsAuthenticated(false);
      }
      setCheckingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  /* ---- Handlers ---- */
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));

    if (id === "pincode") {
      setAreaError("");
      if (value.length === 6) {
        const valid = ALLOWED_ZONES.some(z => z.pincodes.includes(value));
        setPincodeValid(valid);
        if (!valid) setAreaError("We don't serve this area yet. Check serviceable pincodes below.");
      } else {
        setPincodeValid(false);
      }
    }
  };

  const handleItemChange = (index, field, value) => {
    const items = [...formData.items];
    items[index][field] = value;
    setFormData(prev => ({ ...prev, items }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { material_name: "", estimated_weight: "" }]
    }));
  };

  const removeItem = (index) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) { navigate("/login"); return; }
    if (!ALLOWED_ZONES.some(z => z.pincodes.includes(formData.pincode))) {
      setAreaError("Sorry, we don't serve this pincode yet. We serve Vijayanagar, Rajajinagar, RR Nagar & surroundings.");
      return;
    }

    const cleanedItems = formData.items
      .map(item => ({ material_name: item.material_name, estimated_weight: parseFloat(item.estimated_weight) }))
      .filter(item => item.material_name && !isNaN(item.estimated_weight));

    if (cleanedItems.length === 0) {
      alert("Please add at least one material with weight.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        user_name:    formData.user_name,
        phone_number: formData.phone_number,
        address:      formData.address,
        pincode:      formData.pincode,
        pickup_point: formData.pickup_point,
        items:        cleanedItems,
        status:       "PENDING_APPROVAL",
        userId:       auth.currentUser ? auth.currentUser.uid : "GUEST",
        email:        auth.currentUser ? auth.currentUser.email : "",
        created_at:   new Date().toISOString(),
      };

      console.log("Processing booking...", payload);

      let savedOk = false;

      // Primary: Save to PostgreSQL via Backend API
      if (API_BASE) {
        try {
          const res = await fetch(`${API_BASE}/scrap/booking`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });
          if (res.ok) {
            savedOk = true;
            console.log("✅ Booking saved to PostgreSQL");
          }
        } catch (backendErr) {
          console.warn("PostgreSQL save failed:", backendErr.message);
        }
      }

      // Secondary: Backup / Fallback to Firestore
      try {
        await addDoc(collection(db, "scrap_bookings"), {
          ...payload,
          created_at: serverTimestamp()
        });
        if (!savedOk) savedOk = true; // Use Firestore as success if API failed
        console.log("✅ Booking saved to Firestore (Backup)");
      } catch (fsErr) {
        console.error("Firestore Save Failed:", fsErr.message);
      }

      if (savedOk) {
        setShowSuccess(true);
      } else {
        throw new Error("Unable to save booking to any database. Please check your connection.");
      }
    } catch (err) {
      console.error("Booking Error:", err);
      alert(`Booking Failed: ${err.message}. Please try again later.`);
    } finally {
      setLoading(false);
    }
  };

  /* ---- Loading Screen ---- */
  if (checkingAuth) {
    return (
      <div className="sb-loading-screen">
        <div className="sb-spinner" />
        <p style={{ color: "#64748b", fontWeight: 600 }}>Loading...</p>
      </div>
    );
  }

  /* ---- Login Gate ---- */
  if (!isAuthenticated) {
    return (
      <div className="sb-login-gate">
        <div className="sb-login-card">
          <div className="sb-login-icon-wrap">
            <svg width="36" height="36" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M12 22s8-4 8-10V7l-8-3-8 3v5c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <h2>Login to Book a Pickup</h2>
          <p>Sign in once to schedule your scrap pickup and earn instant cash from doorstep collection.</p>
          <div className="sb-login-benefits">
            {["Get instant cash at best market rates","Track all your bookings in one place","Priority admin confirmation & SMS alert"].map((b,i)=>(
              <div key={i} className="sb-login-benefit">
                <div className="sb-login-benefit-dot">✓</div>
                {b}
              </div>
            ))}
          </div>
          <button className="sb-login-btn" onClick={() => navigate("/login")}>Login / Sign Up — It's Free</button>
          <button className="sb-home-btn" onClick={() => navigate("/")}>← Back to Home</button>
        </div>
      </div>
    );
  }

  /* ===================== MAIN FORM ===================== */
  return (
    <>
      <Header />

      {/* ---- Hero ---- */}
      <div className="sb-hero">
        <div className="sb-hero-pill">
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          Bangalore's #1 Doorstep Scrap Pickup
        </div>
        <h1>Recycle &amp; <span>Earn Cash</span> 💰</h1>
        <p>Schedule a free doorstep pickup in minutes. Get paid instantly at best market rates.</p>
        <div className="sb-trust-row">
          {["Same-day Agent Visit","Digital Weighing Scale","Instant UPI / Cash Payment","Eco-Certified Recycling"].map((t,i)=>(
            <div key={i} className="sb-trust-badge">
              <span>✓</span> {t}
            </div>
          ))}
        </div>
      </div>

      {/* ---- Main Content ---- */}
      <div className="sb-layout">

        {/* ---- FORM ---- */}
        <div className="sb-form-card">
          <form onSubmit={handleSubmit}>

            {/* Step 1 */}
            <div className="sb-step">
              <div className="sb-step-header">
                <div className="sb-step-num">1</div>
                <div>
                  <div className="sb-step-title">Personal Details</div>
                  <div className="sb-step-subtitle">Your contact information for our agent</div>
                </div>
              </div>
              <div className="sb-form-grid">
                <div className="sb-form-group">
                  <label className="sb-label">Full Name</label>
                  <input className="sb-input" id="user_name" type="text" placeholder="e.g. Rajesh Kumar" required
                    value={formData.user_name} onChange={handleInputChange} />
                </div>
                <div className="sb-form-group">
                  <label className="sb-label">Phone Number</label>
                  <input className="sb-input" id="phone_number" type="tel" placeholder="10-digit mobile" required
                    pattern="[0-9]{10}" value={formData.phone_number} onChange={handleInputChange} />
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="sb-step">
              <div className="sb-step-header">
                <div className="sb-step-num">2</div>
                <div>
                  <div className="sb-step-title">Collection Address</div>
                  <div className="sb-step-subtitle">Where should our agent come?</div>
                </div>
              </div>
              <div className="sb-form-grid">
                <div className="sb-form-group full">
                  <label className="sb-label">Complete Address</label>
                  <textarea className="sb-textarea" id="address" rows="3"
                    placeholder="Flat No, Building Name, Street, Landmark..." required
                    value={formData.address} onChange={handleInputChange} />
                </div>
                <div className="sb-form-group">
                  <label className="sb-label">Pincode</label>
                  <input
                    className={`sb-input ${areaError ? "error" : pincodeValid ? "success" : ""}`}
                    id="pincode" type="text" placeholder="560040" required pattern="[0-9]{6}"
                    value={formData.pincode} onChange={handleInputChange}
                  />
                  {areaError && <span className="sb-field-hint error">⚠ {areaError}</span>}
                  {pincodeValid && !areaError && <span className="sb-field-hint success">✓ Great! We serve this area</span>}
                </div>
                <div className="sb-form-group">
                  <label className="sb-label">Pickup Point</label>
                  <input className="sb-input" id="pickup_point" type="text"
                    placeholder="e.g. Near security gate, building lobby" required
                    value={formData.pickup_point} onChange={handleInputChange} />
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="sb-step">
              <div className="sb-step-header">
                <div className="sb-step-num">3</div>
                <div>
                  <div className="sb-step-title">What Are You Selling?</div>
                  <div className="sb-step-subtitle">Add each material type with an approximate weight</div>
                </div>
              </div>
              <div className="sb-items-list">
                {formData.items.map((item, index) => (
                  <div key={index} className="sb-item-row">
                    <div className="sb-form-group">
                      <label className="sb-label">Material Type</label>
                      <select className="sb-select" required value={item.material_name}
                        onChange={(e) => handleItemChange(index, "material_name", e.target.value)}>
                        <option value="" disabled>Select material...</option>
                        <option value="Newspapers">📰 Newspapers &amp; Paper</option>
                        <option value="Cardboard">📦 Cardboard / Boxes</option>
                        <option value="Plastic">🥤 Plastic Bottles / Waste</option>
                        <option value="Iron/Metal">🔩 Iron / Steel / Metal</option>
                        <option value="Aluminum">⚙️ Aluminum</option>
                        <option value="Copper">🔌 Copper / Wires</option>
                        <option value="Electronic Waste">💻 Electronic Waste (E-waste)</option>
                      </select>
                    </div>
                    <div className="sb-form-group">
                      <label className="sb-label">Weight (kg)</label>
                      <input className="sb-input" type="number" placeholder="0.0" min="0.5" step="0.5" required
                        value={item.estimated_weight}
                        onChange={(e) => handleItemChange(index, "estimated_weight", e.target.value)} />
                    </div>
                    {formData.items.length > 1 && (
                      <button type="button" className="sb-remove-btn" onClick={() => removeItem(index)}
                        title="Remove this item">
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/>
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button type="button" className="sb-add-btn" onClick={addItem}>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Add Another Material
              </button>
            </div>

            {/* Submit */}
            <div className="sb-submit-area">
              <button type="submit" className="sb-submit-btn" disabled={loading}>
                {loading ? (
                  <>
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ animation:"spin 1s linear infinite" }}>
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83"/>
                    </svg>
                    Booking your pickup...
                  </>
                ) : (
                  <>
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>
                    Confirm &amp; Schedule Pickup
                  </>
                )}
              </button>
              <div className="sb-submit-note">
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V7l-8-3-8 3v5c0 6 8 10 8 10z"/></svg>
                Admin will confirm &amp; you'll receive an SMS notification
              </div>
            </div>
          </form>
        </div>

        {/* ---- SIDEBAR ---- */}
        <div className="sb-sidebar">

          {/* Service Areas */}
          <div className="sb-info-card">
            <div className="sb-info-card-title">
              <svg width="18" height="18" fill="none" stroke="#009EE3" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Serviceable Areas
            </div>
            <div className="sb-areas-grid">
              {ALLOWED_ZONES.map((z,i) => (
                <div key={i} className="sb-area-chip">
                  <span>📍</span> {z.name}
                </div>
              ))}
            </div>
            <p style={{ fontSize:"0.75rem", color:"#64748b", marginTop:"14px", marginBottom:0 }}>
              Expanding soon to more areas across Bangalore!
            </p>
          </div>

          {/* How It Works */}
          <div className="sb-info-card">
            <div className="sb-info-card-title">
              <svg width="18" height="18" fill="none" stroke="#1B9B3A" strokeWidth="2.2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
              How It Works
            </div>
            <div className="sb-steps-mini">
              {[
                { t:"Book Online",    d:"Fill this form — takes under 2 minutes." },
                { t:"Admin Confirms", d:"Our team reviews & sends SMS confirmation." },
                { t:"Agent Visits",   d:"Verified agent arrives at your doorstep." },
                { t:"Get Paid!",      d:"Instant cash or UPI after digital weighing." },
              ].map((s,i) => (
                <div key={i} className="sb-step-mini">
                  <div className="sb-step-mini-num">{i+1}</div>
                  <div className="sb-step-mini-text">
                    <strong>{s.t}</strong>
                    <span>{s.d}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ---- Success Modal ---- */}
      {showSuccess && (
        <div className="sb-success-overlay">
          <div className="sb-success-modal">
            <div className="sb-success-icon-wrap">
              <svg width="42" height="42" fill="none" stroke="#16a34a" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h2>Booking Submitted! 🎉</h2>
            <p>
              Your scrap pickup has been received. Our admin will review and{" "}
              <strong>send you an SMS confirmation</strong> within a few hours.
              Keep your materials ready!
            </p>
            <div className="sb-success-actions">
              <button className="sb-btn-home" onClick={() => navigate("/")}>← Back to Home</button>
              <button className="sb-btn-profile" onClick={() => navigate("/profile")}>
                📋 View My Bookings
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <BottomNav />
    </>
  );
};

export default ScrapBooking;
