import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";
const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://blinklean-api.onrender.com/api/v1";
import { TrendingUp, Wallet, Award, Home, Car, Shirt, Recycle, MessageCircle } from "lucide-react";
import "../assets/css/partner.css";

const Partner = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    serviceType: "",
    location: "",
    experience: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!API_BASE) return;
    try {
      const res = await fetch(`${API_BASE}/partners/enroll`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error("Enrollment failed");
      alert("Registration Successful! Our team will contact you shortly.");
      setFormData({ fullName: "", phone: "", serviceType: "", location: "", experience: "" });
    } catch (err) {
      console.error(err);
      alert("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <header className="partner-hero">
        <div className="container">
          <h1>Partner with Blinklean AI Clean-Tech</h1>
          <p>
            Join India's multi-service platform for Home Cleaning, Vehicle Care,
            Laundry &amp; Recycling.
          </p>
        </div>
      </header>

      <section className="partner-benefits">
        <div className="container">
          <h2 style={{ textAlign: "center" }}>Why Partner With Us?</h2>
          <div className="benefit-grid">
            <div className="card" style={{ textAlign: "center", padding: "30px" }}>
              <TrendingUp style={{ color: "var(--primary)", marginBottom: "15px", width: "40px", height: "40px" }} />
              <h3>Verified Leads</h3>
              <p>Access high-intent customers in your vicinity with AI-driven booking assignments.</p>
            </div>
            <div className="card" style={{ textAlign: "center", padding: "30px" }}>
              <Wallet style={{ color: "var(--primary)", marginBottom: "15px", width: "40px", height: "40px" }} />
              <h3>Secure Earnings</h3>
              <p>Transparent weekly payment cycles and performance-based incentives.</p>
            </div>
            <div className="card" style={{ textAlign: "center", padding: "30px" }}>
              <Award style={{ color: "var(--primary)", marginBottom: "15px", width: "40px", height: "40px" }} />
              <h3>Premium Branding</h3>
              <p>Use the Blinklean brand identity — uniforms, app listing, and verified partner badge.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="partner-categories">
        <div className="container">
          <h2 style={{ textAlign: "center" }}>Who Can Join?</h2>
          <div className="category-grid-p">
            <div className="category-card-p">
              <Home />
              <h3>Home Cleaners</h3>
              <p>Independent professionals or small cleaning agencies.</p>
            </div>
            <div className="category-card-p">
              <Car />
              <h3>Vehicle Care</h3>
              <p>Mobile car wash and detailing professionals.</p>
            </div>
            <div className="category-card-p">
              <Shirt />
              <h3>Laundry Partners</h3>
              <p>For established laundry centers and dry cleaners.</p>
            </div>
            <div className="category-card-p">
              <Recycle />
              <h3>Scrap &amp; Recycling</h3>
              <p>Authorized collection agents and recycling yards.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="partner-form-section">
        <div className="container">
          <div className="partner-form">
            <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
              Professional Enrollment Form
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  placeholder="Enter your full name" 
                  required 
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  placeholder="Mobile number for OTP verification"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Partnership Interest</label>
                <select 
                  required
                  value={formData.serviceType}
                  onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
                >
                  <option value="">Select Service Type</option>
                  <option>Home Cleaning Expert</option>
                  <option>Vehicle Detailer</option>
                  <option>Laundry Service Center</option>
                  <option>Scrap Collection Agent</option>
                  <option>Office Cleaning Contractor</option>
                </select>
              </div>
              <div className="form-group">
                <label>Location (City/Pincode)</label>
                <input 
                  type="text" 
                  placeholder="Where do you operate?" 
                  required 
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Experience (Years)</label>
                <input 
                  type="number" 
                  placeholder="Years of experience" 
                  required 
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                />
              </div>
              <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                {loading ? "Processing..." : "Join the Ecosystem"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
      <BottomNav />

      {/* Floating WhatsApp Button */}
      <div className="whatsapp-float-container">
        <span className="whatsapp-tooltip">Chat with us on WhatsApp</span>
        <a
          href="https://wa.me/917022803582?text=Hello%20Blinklean%2C%20I%20am%20interested%20in%20partnering%20with%20you."
          className="whatsapp-float-btn"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact us on WhatsApp"
        >
          <MessageCircle />
        </a>
      </div>
    </>
  );
};

export default Partner;
