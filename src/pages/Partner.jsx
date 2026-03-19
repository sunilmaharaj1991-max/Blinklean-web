import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import { TrendingUp, Wallet, Award, Home, Car, Shirt, Recycle, MessageCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "../assets/css/partner-premium.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://blinklean-api.onrender.com/api/v1";

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

    try {
      const payload = {
        ...formData,
        status: "PENDING_REVIEW",
        created_at: serverTimestamp()
      };

      // Direct Save to Firebase Firestore (Primary & Reliable)
      await addDoc(collection(db, "partner_registrations"), payload);
      
      // Optional: Background Sync with Backend API
      if (API_BASE) {
        fetch(`${API_BASE}/partners/enroll`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        }).catch(() => console.warn("Backend sync failed, but enrollment is safe in Firebase."));
      }

      alert("Registration Successful! Our team will contact you shortly.");
      setFormData({ fullName: "", phone: "", serviceType: "", location: "", experience: "" });
    } catch (err) {
      console.error("Partner Enrollment Error:", err);
      alert("Registration failed due to network issue. Please try again or contact support.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="partner-page-wrapper">
      <Header />

      <header className="partner-hero">
        <div className="container animate-fade-in">
          <span className="hero-badge">Earn with Purpose</span>
          <h1>Partner with <span>Blinklean AI</span> Clean-Tech</h1>
          <p>
            Join India's most innovative multi-service platform. Scale your business 
            with Home Cleaning, Vehicle Care, Laundry & Recycling.
          </p>
          <div className="hero-cta-group" style={{ marginTop: '40px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
             <a href="#enroll-form" className="btn btn-premium" style={{ textDecoration: 'none' }}>Start Earning <ArrowRight size={18} style={{ display: 'inline', marginLeft: '8px' }} /></a>
          </div>
        </div>
      </header>

      <section className="partner-benefits">
        <div className="container">
          <div className="section-header" style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Empowering Your Growth</h2>
            <p style={{ color: '#64748b', fontSize: '1.1rem' }}>We provide the tech, you provide the excellence.</p>
          </div>
          <div className="benefit-grid">
            <div className="benefit-card">
              <div className="icon-wrapper">
                <TrendingUp size={32} />
              </div>
              <h3>Verified Leads</h3>
              <p>Forget hunting for clients. Our AI assigns high-intent bookings directly to your app dashboard based on your location.</p>
            </div>
            <div className="benefit-card">
              <div className="icon-wrapper">
                <Wallet size={32} />
              </div>
              <h3>Secure Earnings</h3>
              <p>Transparent wallet system with weekly automatic settlements and performance-linked bonuses every month.</p>
            </div>
            <div className="benefit-card">
              <div className="icon-wrapper">
                <Award size={32} />
              </div>
              <h3>Brand Power</h3>
              <p>Gain instant trust with Blinklean marketing, professional uniforms, and a premium digital partner profile.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="partner-categories">
        <div className="container">
          <div className="section-header" style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Partner Categories</h2>
            <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Opportunities across every clean-tech vertical.</p>
          </div>
          <div className="category-grid-p">
            <div className="category-card-p">
              <div className="cat-icon-blob" style={{ background: 'rgba(27, 155, 58, 0.1)', padding: '20px', borderRadius: '50%' }}>
                <Home size={40} color="#1b9b3a" />
              </div>
              <h3>Home Cleaners</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748b' }}>For independent pros or agencies specializing in deep cleaning.</p>
            </div>
            <div className="category-card-p">
              <div className="cat-icon-blob" style={{ background: 'rgba(0, 158, 227, 0.1)', padding: '20px', borderRadius: '50%' }}>
                <Car size={40} color="#009ee3" />
              </div>
              <h3>Vehicle Care</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Waterless car wash experts and detailing professionals.</p>
            </div>
            <div className="category-card-p">
              <div className="cat-icon-blob" style={{ background: 'rgba(139, 92, 246, 0.1)', padding: '20px', borderRadius: '50%' }}>
                <Shirt size={40} color="#8b5cf6" />
              </div>
              <h3>Laundry Partners</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Established dry cleaners or laundry units across the city.</p>
            </div>
            <div className="category-card-p">
              <div className="cat-icon-blob" style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '20px', borderRadius: '50%' }}>
                <Recycle size={40} color="#f59e0b" />
              </div>
              <h3>Recycling Agents</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Authorized scrap collection agents and sustainable recyclers.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="enroll-form" className="partner-form-section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '60px', alignItems: 'center' }}>
          <div className="form-info-pane">
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '25px', color: '#1e293b' }}>Join the <span style={{ color: 'var(--partner-primary)' }}>Ecosystem</span> Today</h2>
            <p style={{ fontSize: '1.2rem', color: '#64748b', marginBottom: '35px' }}>Fill out the form to express your interest. Our on-boarding team will review your application and get in touch within 48 hours.</p>
            
            <ul className="check-list" style={{ listStyle: 'none', padding: 0 }}>
               {[
                 "Quick 5-minute registration",
                 "Immediate verification process",
                 "Free training and starter kit",
                 "Start earning from day one"
               ].map((item, idx) => (
                 <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px', fontWeight: 600, color: '#475569' }}>
                    <CheckCircle2 color="#1b9b3a" size={24} /> {item}
                 </li>
               ))}
            </ul>
          </div>

          <div className="partner-form-card">
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '30px', textAlign: 'center' }}>Professional Enrollment</h3>
            <form onSubmit={handleSubmit}>
              <div className="premium-input-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. John Doe" 
                  required 
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
              <div className="premium-input-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  placeholder="10-digit mobile number"
                  required
                  pattern="[0-9]{10}"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className="premium-input-group">
                <label>Partnership Interest</label>
                <select 
                  required
                  value={formData.serviceType}
                  onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
                >
                  <option value="">Select Service Specialty</option>
                  <option value="Home Cleaning Expert">Home Cleaning Expert</option>
                  <option value="Vehicle Detailer">Vehicle Detailer</option>
                  <option value="Laundry Service Center">Laundry Service Center</option>
                  <option value="Scrap Collection Agent">Scrap Collection Agent</option>
                  <option value="Office Cleaning Contractor">Office Cleaning Contractor</option>
                </select>
              </div>
              <div className="premium-input-group">
                <label>Location (City/Pincode)</label>
                <input 
                  type="text" 
                  placeholder="Where do you operate?" 
                  required 
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
              </div>
              <div className="premium-input-group">
                <label>Work Experience (Years)</label>
                <input 
                  type="number" 
                  placeholder="e.g. 2" 
                  required 
                  min="0"
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                />
              </div>
              <button type="submit" className="btn-premium w-full" style={{ width: '100%' }} disabled={loading}>
                {loading ? "Registering..." : "Submit Enrollment Request"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
      <BottomNav />
      <FloatingWhatsApp />
    </div>
  );
};

export default Partner;
