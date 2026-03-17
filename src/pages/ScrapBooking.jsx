import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
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
    
    // Pincode validation
    if (!ALLOWED_ZONES.some(z => z.pincodes.includes(formData.pincode))) {
      setAreaError("Sorry, we don't serve this pincode yet.");
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
    let pgSaved = false;

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
      created_at:   new Date().toISOString()
    };

    try {
      // 1. Primary Save: PostgreSQL (Backend)
      if (API_BASE) {
        try {
          const res = await fetch(`${API_BASE}/scrap/booking`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });
          if (res.ok) {
            pgSaved = true;
            console.log("✅ Saved to PostgreSQL");
          } else {
            const errBody = await res.text();
            let errData;
            try { errData = JSON.parse(errBody); } catch { errData = errBody; }
            console.error("Backend Error:", errData);
            alert(`Error from server: ${typeof errData === 'object' ? JSON.stringify(errData) : errData}`);
          }
        } catch (apiErr) {
          console.error("API Connection Error:", apiErr.message);
          alert(`Connection failed: ${apiErr.message}`);
        }
      }

      if (pgSaved) {
        setShowSuccess(true);
      }
    } catch (err) {
      console.error("Critical Submit Error:", err);
      alert("Something went wrong. Please check your internet and try again.");
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
    <>
      <Header />
      <div className="sb-hero">
        <h1>Recycle &amp; <span>Earn Cash</span> 💰</h1>
        <p>Schedule a doorstep scrap pickup in Bangalore instantly.</p>
      </div>

      <div className="sb-layout">
        <div className="sb-form-card">
          <form onSubmit={handleSubmit}>
            <div className="sb-step">
              <label className="sb-label">Full Name</label>
              <input className="sb-input" id="user_name" type="text" required value={formData.user_name} onChange={handleInputChange} />
              <label className="sb-label">Phone Number</label>
              <input className="sb-input" id="phone_number" type="tel" required pattern="[0-9]{10}" value={formData.phone_number} onChange={handleInputChange} />
            </div>

            <div className="sb-step">
              <label className="sb-label">Complete Address</label>
              <textarea className="sb-textarea" id="address" rows="3" required value={formData.address} onChange={handleInputChange} />
              <div className="sb-form-grid">
                <div className="sb-form-group">
                  <label className="sb-label">Pincode</label>
                  <input className="sb-input" id="pincode" type="text" required pattern="[0-9]{6}" value={formData.pincode} onChange={handleInputChange} />
                </div>
                <div className="sb-form-group">
                  <label className="sb-label">Pickup Point (Optional)</label>
                  <input className="sb-input" id="pickup_point" type="text" value={formData.pickup_point} onChange={handleInputChange} />
                </div>
              </div>
              {areaError && <span className="sb-field-hint error">{areaError}</span>}
              {pincodeValid && !areaError && <span className="sb-field-hint success">✓ Servicing this area</span>}
            </div>

            <div className="sb-step">
              <h3 style={{ marginBottom: 15 }}>Materials</h3>
              {formData.items.map((item, index) => (
                <div key={index} className="sb-item-row">
                  <select className="sb-select" required value={item.material_name} onChange={(e) => handleItemChange(index, "material_name", e.target.value)}>
                    <option value="" disabled>Material...</option>
                    <option value="Newspapers">Newspapers</option>
                    <option value="Cardboard">Cardboard</option>
                    <option value="Plastic">Plastic</option>
                    <option value="Metal">Metal</option>
                    <option value="E-Waste">Electronics</option>
                  </select>
                  <input className="sb-input" type="number" placeholder="kg" min="0.5" step="0.5" required value={item.estimated_weight} onChange={(e) => handleItemChange(index, "estimated_weight", e.target.value)} />
                  {formData.items.length > 1 && <button type="button" className="sb-remove-btn" onClick={() => removeItem(index)}>×</button>}
                </div>
              ))}
              <button type="button" className="sb-add-btn" onClick={addItem}>+ Add Item</button>
            </div>

            <button type="submit" className="sb-submit-btn" disabled={loading}>
              {loading ? "Booking..." : "Schedule My Pickup"}
            </button>
          </form>
        </div>

        <div className="sb-sidebar">
          <div className="sb-info-card">
            <h4>Service Areas</h4>
            <div className="sb-areas-grid">
              {ALLOWED_ZONES.map((z,i) => <div key={i} className="sb-area-chip">📍 {z.name}</div>)}
            </div>
          </div>
        </div>
      </div>

      {showSuccess && (
        <div className="sb-success-overlay">
          <div className="sb-success-modal">
            <h2>Success! 🎉</h2>
            <p>We've received your request. An admin will contact you shortly.</p>
            <button className="sb-btn-home" onClick={() => navigate("/")}>Back to Home</button>
          </div>
        </div>
      )}

      <Footer />
      <BottomNav />
      <FloatingWhatsApp />
    </>
  );
};

export default ScrapBooking;
