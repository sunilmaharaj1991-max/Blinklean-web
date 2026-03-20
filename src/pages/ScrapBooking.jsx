import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import "../assets/css/scrap-booking-premium.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://blinklean-api.onrender.com/api/v1";

const ALLOWED_ZONES = [
  { name: "Vijayanagar",         pincodes: ["560040", "560079"] },
  { name: "Chandra Layout",      pincodes: ["560040", "560072"] },
  { name: "Attiguppe",           pincodes: ["560040"] },
  { name: "Rajajinagar",         pincodes: ["560010", "560023"] },
  { name: "Rajarajeshwari Nagar",pincodes: ["560098"] },
  { name: "Hassan",              pincodes: ["573201", "573202"] },
  { name: "Amaravathi (Andhra Pradesh)", pincodes: ["522237", "522002"] }
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
    items:        [{ material_name: "", estimated_weight: "" }]
  });

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(user => {
      setIsAuthenticated(!!user);
      setCheckingAuth(false);
    });
    return () => unsub();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));

    if (id === "pincode" && value.length === 6) {
      const zone = ALLOWED_ZONES.find(z => z.pincodes.includes(value));
      if (!zone) {
        setAreaError("Sorry, we haven't reached your area yet.");
        setPincodeValid(false);
      } else {
        setAreaError("");
        setPincodeValid(true);
      }
    } else if (id === "pincode") {
      setPincodeValid(false);
      setAreaError("");
    }
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    setFormData(prev => ({ ...prev, items: newItems }));
  };

  const addItem = () => setFormData(prev => ({ ...prev, items: [...prev.items, { material_name: "", estimated_weight: "" }] }));
  const removeItem = (index) => setFormData(prev => ({ ...prev, items: prev.items.filter((_, i) => i !== index) }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (areaError || !pincodeValid) {
      alert("Please enter a valid pincode within our service zones.");
      return;
    }

    const cleanedItems = formData.items
      .map(item => ({ material_name: item.material_name, estimated_weight: parseFloat(item.estimated_weight) }))
      .filter(item => item.material_name && !isNaN(item.estimated_weight));

    if (cleanedItems.length === 0) {
      alert("Please add at least one material.");
      return;
    }

    setLoading(true);

    const payload = {
      user_name:    formData.user_name,
      phone_number: formData.phone_number,
      address:      formData.address,
      pincode:      formData.pincode,
      pickup_point: formData.pickup_point,
      items:        cleanedItems,
      status:       "PENDING_APPROVAL",
      userId:       auth.currentUser.uid,
      email:        auth.currentUser.email || "",
      created_at:   serverTimestamp()
    };

    try {
      // Direct Save to Firebase Firestore (Primary & Reliable)
      await addDoc(collection(db, "scrap_bookings"), payload);
      
      // Optional: Background Sync with Backend API (don't block user if it fails)
      fetch(`${API_BASE}/scrap/booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }).catch(err => {
        console.warn("Backend sync failed, but data is safe in Firebase.", err);
      });

      setShowSuccess(true);
    } catch (err) {
      console.error("Booking Error Detail:", err);
      // Fallback: If Firebase write fails, we should notify user correctly.
      alert("Something went wrong while saving your booking. Please try again or contact WhatsApp support.");
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return <div className="sb-loading-screen"><div className="sb-spinner" /></div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="sb-login-gate">
        <div className="sb-login-card">
          <h2>Login to Book a Pickup</h2>
          <p>Sign in to schedule your pickup and earn instant cash.</p>
          <button className="sb-login-btn" onClick={() => navigate("/login")}>Login / Sign Up</button>
        </div>
      </div>
    );
  }

  return (
    <div className="sb-page">
      <Header />
      
      <div className="sb-hero">
        <div className="sb-hero-pill">♻️ India's First Smart Recycling Platform</div>
        <h1>Recycle & <span>Earn Cash</span> 💰</h1>
        <p>Schedule a professional doorstep scrap pickup. Turn your clutter into instant cash sustainably.</p>
        
        <div className="sb-trust-row">
          <div className="sb-trust-badge">🛡️ Verified Agents</div>
          <div className="sb-trust-badge">⚖️ Digital Weighing</div>
          <div className="sb-trust-badge">⚡ Instant Cash</div>
        </div>
      </div>

      <div className="sb-layout">
        <div className="sb-form-card">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Contact Info */}
            <div className="sb-step">
              <div className="sb-step-header">
                <div className="sb-step-num">1</div>
                <div>
                  <h3 className="sb-step-title">Contact Information</h3>
                  <p className="sb-step-subtitle">Where should our agent reach you?</p>
                </div>
              </div>
              <div className="sb-form-grid">
                <div className="sb-form-group">
                  <label className="sb-label">Full Name</label>
                  <input className="sb-input" id="user_name" type="text" placeholder="Enter name" required value={formData.user_name} onChange={handleInputChange} />
                </div>
                <div className="sb-form-group">
                  <label className="sb-label">Phone Number</label>
                  <input className="sb-input" id="phone_number" type="tel" placeholder="10-digit mobile" required pattern="[0-9]{10}" value={formData.phone_number} onChange={handleInputChange} />
                </div>
              </div>
            </div>

            {/* Step 2: Location */}
            <div className="sb-step">
              <div className="sb-step-header">
                <div className="sb-step-num">2</div>
                <div>
                  <h3 className="sb-step-title">Pickup Address</h3>
                  <p className="sb-step-subtitle">Provide your exact location details.</p>
                </div>
              </div>
              <div className="sb-form-group" style={{ marginBottom: '16px' }}>
                <label className="sb-label">Complete Address</label>
                <textarea className="sb-textarea" id="address" placeholder="Flat/House No, Building Name, Landmark..." rows="3" required value={formData.address} onChange={handleInputChange} />
              </div>
              <div className="sb-form-grid">
                <div className="sb-form-group">
                  <label className="sb-label">Pincode</label>
                  <input className={`sb-input ${pincodeValid ? 'success' : ''}`} id="pincode" type="text" placeholder="560XXX" required pattern="[0-9]{6}" value={formData.pincode} onChange={handleInputChange} />
                </div>
              </div>
              {areaError && <span className="sb-field-hint error">⚠️ {areaError}</span>}
              {pincodeValid && !areaError && <span className="sb-field-hint success">✓ Currently servicing your area</span>}
            </div>

            {/* Step 3: Materials */}
            <div className="sb-step">
              <div className="sb-step-header">
                <div className="sb-step-num">3</div>
                <div>
                  <h3 className="sb-step-title">Scrap Details</h3>
                  <p className="sb-step-subtitle">What would you like to recycle today?</p>
                </div>
              </div>
              <div className="sb-items-list">
                {formData.items.map((item, index) => (
                  <div key={index} className="sb-item-row">
                    <div className="sb-form-group">
                      <label className="sb-label">Material</label>
                      <select className="sb-select" required value={item.material_name} onChange={(e) => handleItemChange(index, "material_name", e.target.value)}>
                        <option value="" disabled>Select Material</option>
                        <option value="Newspapers">Newspapers</option>
                        <option value="Cardboard">Cardboard</option>
                        <option value="Plastic">Plastic</option>
                        <option value="Metal">Metals / Iron</option>
                        <option value="E-Waste">Electronics / E-Waste</option>
                      </select>
                    </div>
                    <div className="sb-form-group">
                      <label className="sb-label">Est. Weight (kg)</label>
                      <input className="sb-input" type="number" placeholder="kg" min="1" step="0.5" required value={item.estimated_weight} onChange={(e) => handleItemChange(index, "estimated_weight", e.target.value)} />
                    </div>
                    {formData.items.length > 1 && (
                      <button type="button" className="sb-remove-btn" onClick={() => removeItem(index)}>
                        <span style={{ fontSize: '1.4rem' }}>&times;</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button type="button" className="sb-add-btn" onClick={addItem}>+ Add Another Material</button>
            </div>

            <div className="sb-submit-area">
              <button type="submit" className="sb-submit-btn" disabled={loading}>
                {loading ? "Processing..." : "Schedule My Pickup Now"}
              </button>
              <div className="sb-submit-note">🔒 Safe & Secure Pickup Promise</div>
            </div>
          </form>
        </div>

        <div className="sb-sidebar">
          <div className="sb-info-card">
            <h4 className="sb-info-card-title">📍 Active Zones</h4>
            <div className="sb-areas-grid">
              {ALLOWED_ZONES.map((z,i) => <div key={i} className="sb-area-chip">{z.name}</div>)}
            </div>
          </div>
          
          <div className="sb-info-card">
            <h4 className="sb-info-card-title">💡 How it Works</h4>
            <div className="sb-steps-mini">
              <div className="sb-step-mini">
                <div className="sb-step-mini-num">1</div>
                <div className="sb-step-mini-text"><strong>Book Pickup</strong> Schedule a date and time online.</div>
              </div>
              <div className="sb-step-mini">
                <div className="sb-step-mini-num">2</div>
                <div className="sb-step-mini-text"><strong> doorstep Weighing</strong> Our agent weighs scrap in front of you.</div>
              </div>
              <div className="sb-step-mini">
                <div className="sb-step-mini-num">3</div>
                <div className="sb-step-mini-text"><strong>Get Paid</strong> Receive instant cash at your doorstep.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSuccess && (
        <div className="sb-success-overlay">
          <div className="sb-success-modal">
            <div className="sb-success-icon-wrap">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1B9B3A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <h2>Pickup Scheduled! 🎉</h2>
            <p>Your request has been received. Our pickup coordinates will contact you shortly to confirm the exact arrival time.</p>
            <div className="sb-success-actions">
              <button className="sb-btn-home" onClick={() => navigate("/")}>Go to Home</button>
              <button className="sb-btn-profile" onClick={() => navigate("/profile")}>View Booking Status</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <BottomNav />
      <FloatingWhatsApp />
    </div>
  );
};

export default ScrapBooking;
