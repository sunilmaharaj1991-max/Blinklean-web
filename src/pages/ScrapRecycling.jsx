import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";
import { auth } from "../firebase";
import { User, MapPin, Recycle, Plus, MessageCircle, ArrowRight } from "lucide-react";
import "../assets/css/scrap-recycling.css";

const ScrapRecycling = () => {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(() => {
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Header />

      <div className="booking-hero">
        <div className="container animate-fade-in">
          <h1>Recycle & Earn Money</h1>
          <p>Schedule a door-step scrap pick-up instantly. Professional collection and instant payment.</p>
        </div>
      </div>

      <div className="booking-container">
        <div className="booking-card">
          <form id="scrapBookingForm">
            <div className="step-title">
              <User style={{ marginRight: "10px" }} />
              Personal Details
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label>Your Name</label>
                <input
                  type="text"
                  id="user_name"
                  placeholder="Enter Full Name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  id="user_phone"
                  placeholder="1234567890"
                  required
                />
              </div>
            </div>

            <div className="step-title" style={{ marginTop: "40px" }}>
              <MapPin style={{ marginRight: "10px" }} />
              Collection Address
            </div>
            <div className="form-group">
              <label>Complete Address</label>
              <textarea
                id="address"
                rows="3"
                placeholder="House/Flat No, Apartment Name, Street..."
                required
              ></textarea>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label>Pincode</label>
                <input type="text" id="pincode" placeholder="560XXX" required />
              </div>
              <div className="form-group">
                <label>City</label>
                <input type="text" value="Bangalore" disabled />
              </div>
            </div>

            <div className="step-title" style={{ marginTop: "40px" }}>
              <Recycle style={{ marginRight: "10px" }} />
              What are you selling?
            </div>
            <div id="itemsContainer">
              <div className="item-row">
                <div className="form-group">
                  <label>Material Type</label>
                  <select className="material-select" defaultValue="" required>
                    <option value="" disabled>Select Material</option>
                    <option value="newspapers">Newspapers</option>
                    <option value="cardboard">Cardboard</option>
                    <option value="plastic">Plastic</option>
                    <option value="metal">Iron/Metal</option>
                    <option value="aluminum">Aluminum</option>
                    <option value="copper">Copper</option>
                    <option value="e-waste">Electronic Waste</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Weight (Approx Kg)</label>
                  <input
                    type="number"
                    className="weight-input"
                    placeholder="0"
                    min="0.1"
                    step="0.1"
                    required
                  />
                </div>
              </div>
            </div>

            <button type="button" className="btn-add-item">
              <Plus /> Add Another Material
            </button>

            <div className="summary-box">
              <div className="summary-item total-row" style={{ color: "var(--primary)" }}>
                <span>Status</span>
                <span>Awaiting Collection</span>
              </div>
              <p style={{ fontSize: "0.85rem", color: "#6b7280", marginTop: "10px" }}>
                * Final value will be determined at the time of collection based
                on current market rates and digital weighing scales.
              </p>
            </div>

            <Link
              to="/scrap-booking"
              className="btn btn-primary btn-full"
              style={{ marginTop: "30px", padding: "18px", textDecoration: "none", textAlign: "center", display: "block" }}
            >
              Start On-Site Booking
            </Link>
          </form>
        </div>
      </div>

      <Footer />
      <BottomNav />
      {/* Floating WhatsApp Button */}
      <div className="whatsapp-float-container">
        <span className="whatsapp-tooltip">Chat with us on WhatsApp</span>
        <a
          href="https://wa.me/917022803582?text=Hello%20Blinklean%2C%20I%20am%20interested%20in%20your%20services."
          className="whatsapp-float-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle />
        </a>
      </div>
    </>
  );
};

export default ScrapRecycling;
