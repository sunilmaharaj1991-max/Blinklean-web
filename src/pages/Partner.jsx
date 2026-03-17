import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";
import "../assets/css/partner.css";

const Partner = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    alert("Thank you for your interest! Our team will contact you shortly.");
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
              <i data-lucide="trending-up" style={{ color: "var(--primary)", marginBottom: "15px", width: "40px", height: "40px" }}></i>
              <h3>Verified Leads</h3>
              <p>Access high-intent customers in your vicinity with AI-driven booking assignments.</p>
            </div>
            <div className="card" style={{ textAlign: "center", padding: "30px" }}>
              <i data-lucide="wallet" style={{ color: "var(--primary)", marginBottom: "15px", width: "40px", height: "40px" }}></i>
              <h3>Secure Earnings</h3>
              <p>Transparent weekly payment cycles and performance-based incentives.</p>
            </div>
            <div className="card" style={{ textAlign: "center", padding: "30px" }}>
              <i data-lucide="award" style={{ color: "var(--primary)", marginBottom: "15px", width: "40px", height: "40px" }}></i>
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
              <i data-lucide="home"></i>
              <h3>Home Cleaners</h3>
              <p>Independent professionals or small cleaning agencies.</p>
            </div>
            <div className="category-card-p">
              <i data-lucide="car"></i>
              <h3>Vehicle Care</h3>
              <p>Mobile car wash and detailing professionals.</p>
            </div>
            <div className="category-card-p">
              <i data-lucide="shirt"></i>
              <h3>Laundry Partners</h3>
              <p>For established laundry centers and dry cleaners.</p>
            </div>
            <div className="category-card-p">
              <i data-lucide="recycle"></i>
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
                <input type="text" placeholder="Enter your full name" required />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  placeholder="Mobile number for OTP verification"
                  required
                />
              </div>
              <div className="form-group">
                <label>Partnership Interest</label>
                <select required>
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
                <input type="text" placeholder="Where do you operate?" required />
              </div>
              <div className="form-group">
                <label>Experience (Years)</label>
                <input type="number" placeholder="Years of experience" required />
              </div>
              <button type="submit" className="btn btn-primary btn-full">
                {submitted ? "✓ Message Sent!" : "Join the Ecosystem"}
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
          <i data-lucide="message-circle"></i>
        </a>
      </div>
    </>
  );
};

export default Partner;
