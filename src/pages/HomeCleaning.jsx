import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";

const HomeCleaning = () => {
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

      <nav className="navbar">
        <div className="container nav-container">
          <a href="index.html" className="logo-wrapper">
            <div style={{ display: "flex", alignItems: "center" }}>
              <svg
                width="40"
                height="40"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="50" cy="50" r="48" fill="#009EE3" />
                <path
                  d="M 50 13 Q 50 28 35 28 Q 50 28 50 43 Q 50 28 65 28 Q 50 28 50 13 Z"
                  fill="white"
                />
                <path
                  d="M 2 50 Q 50 30 98 50 A 48 48 0 0 1 2 50"
                  fill="#1B9B3A"
                />
                <path
                  d="M 0 50 Q 50 30 100 50"
                  fill="none"
                  stroke="white"
                  strokeWidth="5"
                />
                <path
                  d="M 15 80 Q 40 50 85 55"
                  fill="none"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  lineHeight: "1.1",
                  marginLeft: "8px",
                }}
              >
                <div
                  className="logo-text"
                  style={{ fontSize: "1.4rem", letterSpacing: "-0.5px" }}
                >
                  <span style={{ color: "#009ee3" }}>Blink</span>
                  <span style={{ color: "#1b9b3a" }}>lean</span>
                </div>
              </div>
            </div>
          </a>
          <div className="nav-links" id="navLinks">
            <Link to="/services#home-cleaning">Home Cleaning</Link>
            <Link to="/services#vehicle-cleaning">Vehicle Cleaning</Link>
            <Link to="/services#laundry">Laundry</Link>
            <Link to="/services#recycling">Scrap & Recycling</Link>
            {user ? (
               <Link to="/profile" className="nav-login-btn">Profile</Link>
            ) : (
                <Link to="/login" className="nav-login-btn">
                  Login
                </Link>
            )}
          </div>
        </div>
      </nav>

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
                  src="/assets/images/1bhk_cleaning.png"
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
                  src="/assets/images/2bhk_cleaning.png"
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
                  src="/assets/images/3bhk_cleaning.png"
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
                  src="/assets/images/kitchen_deep_cleaning.png"
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
                  src="/assets/images/bathroom_cleaning.png"
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
                  src="/assets/images/sofa_cleaning.png"
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
                  src="/assets/images/carpet_cleaning.png"
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
                  src="/assets/images/office_cleaning.png"
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
                  src="/assets/images/car_exterior_wash.png"
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
                  src="/assets/images/car_interior_cleaning.png"
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
                  src="/assets/images/premium_polish.png"
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
            <i data-lucide="bike"></i> Bike & Others
          </h3>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-img">
                <img
                  src="/assets/images/bike_detailing_kit.png"
                  alt="Bike Waterless Wash"
                />
              </div>
              <div className="service-body">
                <h3>🏍 Bike Waterless Clean</h3>
                <span className="price-tag">₹149</span>
              </div>
            </div>
            <div className="service-card">
              <div className="service-img">
                <img
                  src="/assets/images/premium_polish.png"
                  alt="Bike Premium Polish"
                />
              </div>
              <div className="service-body">
                <h3>🏍 Bike Premium Polish</h3>
                <span className="price-tag">₹249</span>
              </div>
            </div>
            <div className="service-card">
              <div className="service-img">
                <img
                  src="/assets/images/auto_full_cleaning.png"
                  alt="Auto Full Cleaning"
                />
              </div>
              <div className="service-body">
                <h3>🛺 Auto Full Cleaning</h3>
                <span className="price-tag">₹299</span>
              </div>
            </div>
            <div className="service-card">
              <div className="service-img">
                <img
                  src="/assets/images/auto_wash.png"
                  alt="Cycle Basic Wash"
                />
              </div>
              <div className="service-body">
                <h3>🚲 Cycle Basic Wash</h3>
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
            Future: Monthly subscription model coming soon!
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
                <img src="/assets/images/wash_and_fold.png" alt="Wash & Fold" />
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
                <img src="/assets/images/wash_and_iron.png" alt="Wash & Iron" />
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
                <img src="/assets/images/steam_iron.png" alt="Steam Iron" />
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
                <img src="/assets/images/dry_cleaning.png" alt="Dry Cleaning" />
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
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <Link
              to="/scrap-booking"
              className="btn btn-primary"
              style={{
                padding: "16px 40px",
                fontSize: "1.1rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                textDecoration: "none"
              }}
            >
              <i data-lucide="shopping-basket"></i> Book Pickup On-Site
            </Link>
          </div>
          <p
            style={{
              marginTop: "15px",
              fontSize: "0.8rem",
              color: "var(--text-muted)",
              textAlign: "center",
            }}
          >
            *Serving Vijayanagar, Chandra Layout, Attiguppe, Rajajinagar &
            Rajarajeshwari Nagar. Check availability for your specific pincode
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

      <footer className="footer">
        <div className="container">
          <p>&copy; 2026 Blinklean. AI Powered Clean-Tech Platform</p>
        </div>
      </footer>

      {/*  AI Chatbot Interface  */}
      <div className="chat-widget" id="chatWidget">
        <div className="chat-header">
          <div className="chat-brand">
            <img src="/assets/images/customer_support.png" alt="AI Agent" />
            <div>
              <strong>Blinklean AI</strong>
              <span>Online</span>
            </div>
          </div>
          <button className="close-chat" onclick="toggleChat()">
            <i data-lucide="x"></i>
          </button>
        </div>
        <div className="chat-body" id="chatBody">
          <div className="message ai-message">
            Hi! I'm your Blinklean AI Assistant. How can I help you today?
          </div>
        </div>
        <div className="chat-faq-options" id="faqOptions">
          <button onclick="sendFAQ('How much does home cleaning cost?')">
            Home Cleaning Cost
          </button>
          <button onclick="sendFAQ('Do you offer waterless car wash?')">
            Vehicle Cleaning
          </button>
          <button onclick="sendFAQ('How to sell scrap?')">Sell Scrap</button>
        </div>
        <div className="chat-input-area">
          <input
            type="text"
            id="chatInput"
            placeholder="Type your message..."
            onkeypress="handleKeyPress(event)"
          />
          <button onclick="sendMessage()">
            <i data-lucide="send" style={{ width: "20px", height: "20px" }}></i>
          </button>
        </div>
      </div>

      {/*  AI Chatbot Button  */}
      <div
        className="chatbot-btn"
        onclick="toggleChat()"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="/assets/images/customer_support.png"
          alt="Chatbot"
          style={{
            width: "32px",
            height: "32px",
            filter: "brightness(0) invert(1)",
          }}
        />
      </div>

      <style>{`
      .chatbot-btn {
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: linear-gradient(
          135deg,
          var(--primary),
          var(--primary-light)
        );
        width: 65px;
        height: 65px;
        border-radius: 50%;
        box-shadow: 0 4px 20px rgba(15, 76, 63, 0.4);
        cursor: pointer;
        z-index: 10000;
        transition:
          transform 0.3s,
          box-shadow 0.3s;
      }

      .chatbot-btn:hover {
        transform: scale(1.08) translateY(-5px);
        box-shadow: 0 8px 25px rgba(15, 76, 63, 0.5);
      }

      .chat-widget {
        position: fixed;
        bottom: 100px;
        right: 24px;
        width: 350px;
        height: 480px;
        background: white;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        z-index: 9999;
        display: none;
        flex-direction: column;
        overflow: hidden;
        border: 1px solid rgba(0, 0, 0, 0.05);
        opacity: 0;
        transform: translateY(20px);
        transition:
          opacity 0.3s,
          transform 0.3s;
      }

      .chat-widget.active {
        display: flex;
        opacity: 1;
        transform: translateY(0);
      }

      .chat-header {
        background: var(--primary);
        color: white;
        padding: 15px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .chat-brand {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .chat-brand img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: white;
        padding: 4px;
      }

      .chat-brand div {
        display: flex;
        flex-direction: column;
      }

      .chat-brand strong {
        font-size: 1.1rem;
      }

      .chat-brand span {
        font-size: 0.8rem;
        color: rgba(255, 255, 255, 0.8);
      }

      .close-chat {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        opacity: 0.8;
        transition: opacity 0.2s;
      }

      .close-chat:hover {
        opacity: 1;
      }

      .chat-body {
        flex: 1;
        padding: 20px;
        overflow-y: auto;
        background: #f8fafc;
        display: flex;
        flex-direction: column;
        gap: 15px;
      }

      .message {
        max-width: 85%;
        padding: 12px 16px;
        border-radius: 15px;
        font-size: 0.95rem;
        line-height: 1.4;
      }

      .ai-message {
        background: white;
        color: var(--text-main);
        align-self: flex-start;
        border-bottom-left-radius: 4px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.02);
      }

      .user-message {
        background: var(--primary);
        color: white;
        align-self: flex-end;
        border-bottom-right-radius: 4px;
      }

      .chat-faq-options {
        padding: 10px 15px;
        background: #f8fafc;
        display: flex;
        gap: 8px;
        overflow-x: auto;
        scrollbar-width: none;
        border-top: 1px solid #e2e8f0;
      }

      .chat-faq-options::-webkit-scrollbar {
        display: none;
      }

      .chat-faq-options button {
        white-space: nowrap;
        padding: 8px 15px;
        background: white;
        border: 1px solid var(--primary);
        color: var(--primary);
        border-radius: 20px;
        font-size: 0.85rem;
        cursor: pointer;
        transition: all 0.2s;
      }

      .chat-faq-options button:hover {
        background: var(--primary);
        color: white;
      }

      .chat-input-area {
        padding: 15px;
        background: white;
        border-top: 1px solid #f1f5f9;
        display: flex;
        gap: 10px;
      }

      .chat-input-area input {
        flex: 1;
        padding: 12px 15px;
        border: 1px solid #e2e8f0;
        border-radius: 20px;
        outline: none;
        font-size: 0.95rem;
      }

      .chat-input-area button {
        background: var(--primary);
        color: white;
        border: none;
        width: 42px;
        height: 42px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: transform 0.2s;
      }

      .chat-input-area button:hover {
        transform: scale(1.05);
      }

      @media (max-width: 768px) {
        .chatbot-btn {
          bottom: 20px;
          right: 20px;
          width: 55px;
          height: 55px;
        }

        .chat-widget {
          bottom: 85px;
          right: 15px;
          left: 15px;
          width: auto;
          height: 60vh;
        }
      }
    `}</style>

      {/*  Floating WhatsApp Button  */}
      <div className="whatsapp-float-container">
        <span className="whatsapp-tooltip">Chat with us on WhatsApp</span>
        <a
          href="https://wa.me/917022803582?text=Hello%20Blinklean%2C%20I%20am%20interested%20in%20your%20cleaning%20or%20scrap%20recycling%20services."
          className="whatsapp-float-btn"
          target="_blank"
          aria-label="Contact us on WhatsApp"
        >
          <i data-lucide="message-circle"></i>
        </a>
      </div>
    </>
  );
};

export default HomeCleaning;
