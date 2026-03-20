import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";
import FloatingWhatsApp from "../components/FloatingWhatsApp";

const VehicleCleaning = () => {
  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, []);

  return (
    <>
      <Header />

      <header className="services-hero">
        <div className="container">
          <h1>Expert Clean-Tech Solutions</h1>
          <p>
            Clean in a Blink, Smart Cleaning & Recycling tailored for your
            lifestyle.
          </p>
        </div>
      </header>

      {/*  House Cleaning Services  */}
      <section id="home-cleaning" className="category-section">
        <div className="container">
          <div className="category-header">
            <h2>1. HOUSE CLEANING SERVICES</h2>
            <p>Professional residential and commercial cleaning solutions.</p>
          </div>

          <h3 className="sub-category-title">
            <i data-lucide="home"></i> Home Cleaning
          </h3>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-img">
                <img
                  src="/assets/images/gen_home.png"
                  alt="1BHK Cleaning"
                />
              </div>
              <div className="service-body">
                <h3>1BHK Cleaning</h3>
                <span className="price-tag">₹1,499</span>
              </div>
            </div>
            <div className="service-card">
              <div className="service-img">
                <img
                  src="/assets/images/gen_kitchen.png"
                  alt="2BHK Cleaning"
                />
              </div>
              <div className="service-body">
                <h3>2BHK Cleaning</h3>
                <span className="price-tag">₹2,199</span>
              </div>
            </div>
            <div className="service-card">
              <div className="service-img">
                <img
                  src="/assets/images/gen_bathroom.png"
                  alt="3BHK Cleaning"
                />
              </div>
              <div className="service-body">
                <h3>3BHK Cleaning</h3>
                <span className="price-tag">₹2,999</span>
              </div>
            </div>
          </div>

          <h3 className="sub-category-title" style={{ marginTop: "40px" }}>
            <i data-lucide="sparkles"></i> Deep Cleaning
          </h3>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-img">
                <img
                  src="/assets/images/gen_kitchen.png"
                  alt="Kitchen Cleaning"
                />
              </div>
              <div className="service-body">
                <h3>Kitchen Cleaning</h3>
                <span className="price-tag">₹1,299</span>
              </div>
            </div>
            <div className="service-card">
              <div className="service-img">
                <img
                  src="/assets/images/gen_bathroom.png"
                  alt="Bathroom Cleaning"
                />
              </div>
              <div className="service-body">
                <h3>Bathroom Cleaning</h3>
                <span className="price-tag">
                  ₹599 <small>/bath</small>
                </span>
              </div>
            </div>
            <div className="service-card">
              <div className="service-img">
                <img
                  src="/assets/images/gen_sofa.png"
                  alt="Sofa Cleaning"
                />
              </div>
              <div className="service-body">
                <h3>Sofa Cleaning</h3>
                <span className="price-tag">
                  ₹399 <small>/seat</small>
                </span>
              </div>
            </div>
            <div className="service-card">
              <div className="service-img">
                <img
                  src="/assets/images/gen_home.png"
                  alt="Carpet Cleaning"
                />
              </div>
              <div className="service-body">
                <h3>Carpet Cleaning</h3>
                <p>Industrial grade deep cleaning and drying for carpets.</p>
                <span className="price-tag">
                  ₹25 <small>/sq.ft</small>
                </span>
              </div>
            </div>
          </div>

          <h3 className="sub-category-title" style={{ marginTop: "40px" }}>
            <i data-lucide="building"></i> Office Cleaning
          </h3>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-img">
                <img
                  src="/assets/images/gen_home.png"
                  alt="Office Cleaning"
                />
              </div>
              <div className="service-body">
                <h3>Commercial Office Cleaning</h3>

                <span className="price-tag">
                  ₹3 <small>/sq.ft</small>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*  Vehicle Cleaning Services  */}
      <section
        id="vehicle-cleaning"
        className="category-section"
        style={{ background: "#fafafa" }}
      >
        <div className="container">
          <div className="category-header">
            <h2>2. VEHICLE CLEANING SERVICES</h2>
            <p>Doorstep eco-friendly detailing for all your rides.</p>

            <div
              style={{
                background: "#eef2ff",
                color: "#3730a3",
                padding: "15px 20px",
                borderRadius: "8px",
                borderLeft: "4px solid #4f46e5",
                marginTop: "20px",
                textAlign: "left",
                fontWeight: "500",
                fontSize: "0.95rem",
              }}
            >
              <i
                data-lucide="info"
                style={{
                  display: "inline-block",
                  verticalAlign: "middle",
                  marginRight: "8px",
                }}
              ></i>
              We provide Waterless Cleaning Services for Car, Bike, Auto &
              Cycle. We do not offer water wash or foam wash services.
            </div>
          </div>

          <h3 className="sub-category-title" style={{ marginTop: "40px" }}>
            <i data-lucide="car"></i> Car Cleaning
          </h3>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-img">
                <img
                  src="/assets/images/gen_car.png"
                  alt="Waterless Exterior Clean"
                />
              </div>
              <div className="service-body">
                <h3>Waterless Exterior</h3>

                <span className="price-tag">₹299</span>
              </div>
            </div>
            <div className="service-card">
              <div className="service-img">
                <img
                  src="/assets/images/gen_car.png"
                  alt="Interior + Exterior"
                />
              </div>
              <div className="service-body">
                <h3>Interior + Exterior</h3>

                <span className="price-tag">₹499</span>
              </div>
            </div>
            <div className="service-card">
              <div className="service-img">
                <img
                  src="/assets/images/gen_car.png"
                  alt="Premium Polish"
                />
              </div>
              <div className="service-body">
                <h3>Premium Polish</h3>

                <span className="price-tag">₹699</span>
              </div>
            </div>
          </div>

          <h3 className="sub-category-title" style={{ marginTop: "40px" }}>
            <i data-lucide="bike"></i> Bike Detailing
          </h3>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-img" style={{ position: "relative" }}>
                <img
                  src="/assets/images/gen_car.png"
                  alt="Bike Care Plan"
                />
                <div
                  className="badge-premium"
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "#064e3b",
                    color: "white",
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                  }}
                >
                  Essential
                </div>
              </div>
              <div className="service-body">
                <h3>Bike Care Plan</h3>
                <p>
                  Monthly subscription for comprehensive bike care. Includes 2
                  detailing sessions.
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "10px",
                  }}
                >
                  <span className="price-tag">₹299</span>
                  <span
                    style={{
                      color: "#1b9b3a",
                      fontSize: "0.85rem",
                      fontWeight: "bold",
                    }}
                  >
                    Save up to 20%
                  </span>
                </div>
              </div>
            </div>
            <div className="service-card">
              <div className="service-img">
                <img
                  src="/assets/images/gen_car.png"
                  alt="Two-Wheeler Detail"
                />
              </div>
              <div className="service-body">
                <h3>Two-Wheeler Detail</h3>
                <p>
                  One-time professional waterless cleaning and polish for bikes
                  and scooters.
                </p>
                <span className="price-tag">₹149</span>
              </div>
            </div>
            <div className="service-card">
              <div className="service-img">
                <img
                  src="/assets/images/gen_car.png"
                  alt="Auto Full Cleaning"
                />
              </div>
              <div className="service-body">
                <h3>🛺 Auto Waterless Care</h3>
                <p>
                  Deep waterless interior and exterior detailing for
                  auto-rickshaws.
                </p>
                <span className="price-tag">₹199</span>
              </div>
            </div>
            <div className="service-card">
              <div className="service-img">
                <img
                  src="/assets/images/gen_car.png"
                  alt="Cycle Eco-Shine"
                />
              </div>
              <div className="service-body">
                <h3>🚲 Cycle Eco-Shine</h3>
                <p>
                  Eco-safe precision wash for bicycles without any water
                  wastage.
                </p>
                <span className="price-tag">₹99</span>
              </div>
            </div>
          </div>
          <p
            style={{
              marginTop: "30px",
              textAlign: "center",
              color: "var(--text-muted)",
              fontStyle: "italic",
            }}
          >
            Note: Monthly subscription models are the most popular choice for
            regular vehicle maintenance!
          </p>
        </div>
      </section>

      {/*  Laundry Services  */}
      <section id="laundry" className="category-section">
        <div className="container">
          <div className="category-header">
            <h2>3. LAUNDRY SERVICES</h2>
            <span className="badge-pickup">
              <i data-lucide="truck"></i> Pickup & Drop Available
            </span>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <div className="service-img" style={{ height: "180px" }}>
                <img src="/assets/images/gen_laundry.png" alt="Wash & Fold" />
              </div>
              <div className="service-body">
                <h3>Wash & Fold</h3>

                <span className="price-tag">
                  ₹79 <small>/kg</small>
                </span>
              </div>
            </div>
            <div className="service-card">
              <div className="service-img" style={{ height: "180px" }}>
                <img src="/assets/images/gen_laundry.png" alt="Wash & Iron" />
              </div>
              <div className="service-body">
                <h3>Wash & Iron</h3>

                <span className="price-tag">
                  ₹99 <small>/kg</small>
                </span>
              </div>
            </div>
            <div className="service-card">
              <div className="service-img" style={{ height: "180px" }}>
                <img src="/assets/images/gen_laundry.png" alt="Steam Iron" />
              </div>
              <div className="service-body">
                <h3>Steam Iron</h3>

                <span className="price-tag">
                  ₹10 <small>/cloth</small>
                </span>
              </div>
            </div>
            <div className="service-card">
              <div className="service-img" style={{ height: "180px" }}>
                <img src="/assets/images/gen_laundry.png" alt="Dry Cleaning" />
              </div>
              <div className="service-body">
                <h3>Dry Cleaning</h3>

                <span className="price-tag">Starts ₹149</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*  Scrap & Recycling Services  */}
      <section
        id="recycling"
        className="category-section"
        style={{ background: "#f0fdf4" }}
      >
        <div className="container">
          <div className="category-header">
            <i
              data-lucide="recycle"
              style={{
                color: "var(--primary)",
                width: "48px",
                height: "48px",
                marginBottom: "10px",
              }}
            ></i>
            <h2>4. SCRAP & RECYCLING SERVICES</h2>
            <p>
              Monetize your waste and save the planet. Smart collection at your
              doorstep.
            </p>
          </div>

          <div className="market-note">
            <strong>
              <i data-lucide="info"></i> Market Rates:
            </strong>{" "}
            Items (Newspaper, Plastic, Iron, E-Waste, Cardboard) are priced
            based on the current market price per kg.
          </div>

          <div
            className="coverage-areas"
            style={{
              marginBottom: "30px",
              background: "white",
              padding: "20px",
              borderRadius: "var(--radius-lg)",
              boxShadow: "var(--shadow-sm)",
              border: "1px solid rgba(0, 0, 0, 0.05)",
            }}
          >
            <h4
              style={{
                color: "var(--primary)",
                marginBottom: "15px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <i data-lucide="map-pin"></i> Primary Service Zones
            </h4>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                gap: "10px",
                fontSize: "0.9rem",
              }}
            >
              <span
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <i
                  data-lucide="check"
                  style={{ width: "14px", color: "var(--primary)" }}
                ></i>
                Vijayanagar
              </span>
              <span
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <i
                  data-lucide="check"
                  style={{ width: "14px", color: "var(--primary)" }}
                ></i>
                Chandra Layout
              </span>
              <span
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <i
                  data-lucide="check"
                  style={{ width: "14px", color: "var(--primary)" }}
                ></i>
                Attiguppe
              </span>
              <span
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <i
                  data-lucide="check"
                  style={{ width: "14px", color: "var(--primary)" }}
                ></i>
                Rajajinagar
              </span>
              <span
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <i
                  data-lucide="check"
                  style={{ width: "14px", color: "var(--primary)" }}
                ></i>
                Rajarajeshwari Nagar
              </span>
              <span
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <i
                  data-lucide="check"
                  style={{ width: "14px", color: "var(--primary)" }}
                ></i>
                Hassan
              </span>
              <span
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <i
                  data-lucide="check"
                  style={{ width: "14px", color: "var(--primary)" }}
                ></i>
                Amaravathi (Andhra Pradesh)
              </span>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <a
              href="https://wa.me/917022803582?text=Hello%20Blinklean%21%20I%20would%20like%20to%20schedule%20a%20scrap%20pickup.%0A%0A*Name*%3A%20%0A*Phone*%3A%20%0A*Complete%20Address*%3A%20%0A*Items%20to%20Sell*%20%28e.g.%2C%20Newspaper%2C%20Plastic%2C%20Metal%29%3A%20%0A*Approximate%20Weight*%3A%20%0A%0APlease%20confirm%20the%20booking."
              target="_blank"
              className="btn btn-primary"
              style={{
                padding: "16px 40px",
                fontSize: "1.1rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <i data-lucide="shopping-basket"></i> Sell Your Scrap Now
            </a>
          </div>
          <p
            style={{
              marginTop: "15px",
              fontSize: "0.8rem",
              color: "var(--text-muted)",
              textAlign: "center",
            }}
          >
            *Serving Vijayanagar, Chandra Layout, Attiguppe, Rajajinagar,
            Rajarajeshwari Nagar, Hassan & Amaravathi. Check availability for your specific pincode
            on the home page.
          </p>

          <div className="services-grid">
            <div className="service-card">
              <div className="service-body">
                <h3>Residential Pickup</h3>
                <p>Independent houses & villas.</p>
                <span className="badge-pickup">Available: All Zones</span>
              </div>
            </div>
            <div className="service-card">
              <div className="service-body">
                <h3>Apartment Bulk</h3>
                <p>Gated communities & societies.</p>
                <span className="badge-pickup">Available: Selected Zones</span>
              </div>
            </div>
            <div className="service-card">
              <div className="service-body">
                <h3>Office Scrap Disposal</h3>
                <p>IT parks & commercial hubs.</p>
                <span className="badge-pickup">Available: All Zones</span>
              </div>
            </div>
          </div>
          <div
            className="future-plan-box"
            style={{
              marginTop: "40px",
              textAlign: "center",
              padding: "30px",
              border: "2px dashed var(--primary)",
              borderRadius: "var(--radius-lg)",
              background: "white",
            }}
          >
            <i
              data-lucide="brain"
              style={{
                color: "var(--primary)",
                width: "48px",
                height: "48px",
                marginBottom: "15px",
              }}
            ></i>
            <h4
              style={{
                color: "var(--primary)",
                marginBottom: "10px",
                fontSize: "1.2rem",
              }}
            >
              Sustainability Tracking & AI Categorization
            </h4>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.95rem",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              Our future roadmap includes AI-based waste categorization and
              sustainability tracking to help you measure your environmental
              impact.
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <BottomNav />
      <FloatingWhatsApp />
    </>
  );
};

export default VehicleCleaning;

