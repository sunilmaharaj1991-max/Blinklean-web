import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";
import { auth } from "../firebase";

const ScrapRecycling = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);
  return (
    <>
      {/* Generated JSX from HTML */}

      <Header />

      <div className="booking-hero">
        <div className="container">
          <h1>Recycle & Earn Money</h1>
          <p>Schedule a door-step scrap pick-up instantly.</p>
        </div>
      </div>

      <div className="booking-container">
        <div className="booking-card">
          <form id="scrapBookingForm">
            <div className="step-title">
              <i data-lucide="user"></i>
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
              <i data-lucide="map-pin"></i>
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
                <div id="pincode-status"></div>
              </div>
              <div className="form-group">
                <label>City</label>
                <input type="text" value="Bangalore" disabled />
              </div>
            </div>

            <div className="step-title" style={{ marginTop: "40px" }}>
              <i data-lucide="recycling"></i>
              What are you selling?
            </div>
            <div id="itemsContainer">
              <div className="item-row">
                <div className="form-group">
                  <label>Material Type</label>
                  <select className="material-select" required>
                    <option value="" disabled selected>
                      Select Material
                    </option>
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
              <i data-lucide="plus"></i> Add Another Material
            </button>

            <div className="summary-box">
              <div id="summaryItems"></div>
              <div
                className="summary-item total-row"
                style={{ color: "var(--primary)" }}
              >
                <span>Status</span>
                <span id="totalValue">Awaiting Collection</span>
              </div>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "#6b7280",
                  marginTop: "10px",
                }}
              >
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
    </>
  );
};

export default ScrapRecycling;
