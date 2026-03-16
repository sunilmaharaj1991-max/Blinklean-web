import React from "react";

const Bookings = () => {
  return (
    <>
      {/* Generated JSX from HTML */}

      {/*  Navigation  */}
      <nav className="navbar">
        <div className="container nav-container">
          <a
            href="index.html"
            className="logo-wrapper"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
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
                  style={{
                    fontSize: "1.4rem",
                    letterSpacing: "-0.5px",
                    fontWeight: "800",
                    color: "var(--text-main)",
                  }}
                >
                  <span style={{ color: "#009ee3" }}>Blink</span>
                  <span style={{ color: "#1b9b3a" }}>lean</span>
                </div>
              </div>
            </div>
          </a>
          <div className="nav-links" id="navLinks">
            <a href="index.html#services">Services</a>
            <a href="profile.html">My Account</a>
            <a href="booking.html" className="btn btn-primary">
              Sell Scrap
            </a>
          </div>
          <button className="mobile-menu-btn" id="menuBtn">
            <i data-lucide="menu"></i>
          </button>
        </div>
      </nav>

      <main className="container bookings-container">
        <header className="bookings-header">
          <h1>My Bookings</h1>
          <p>Track your ongoing services and manage upcoming appointments.</p>
        </header>

        {/*  2. Ongoing / In Progress  */}
        <section className="booking-section">
          <h2>Ongoing Services</h2>
          <div className="booking-card">
            <div className="booking-card-header">
              <div className="service-info-main">
                <img
                  src="/assets/images/ongoing_service.png"
                  alt="Ongoing service"
                  className="service-thumb"
                />
                <div className="service-title-area">
                  <h3>Kitchen Deep Cleaning</h3>
                  <div className="status-badge ongoing">In Progress</div>
                </div>
              </div>
            </div>
            <div className="pro-info">
              <div className="pro-avatar">AK</div>
              <div className="pro-text">
                <p>Anil Kumar is on the job</p>
                <span>Est. completion by 02:30 PM</span>
              </div>
            </div>
            <div className="booking-actions">
              <button className="btn btn-secondary btn-sm">
                <i
                  data-lucide="message-square"
                  style={{ width: "14px", height: "14px", marginRight: "8px" }}
                ></i>
                Contact Support
              </button>
            </div>
          </div>
        </section>

        {/*  1. Upcoming Bookings  */}
        <section className="booking-section">
          <h2>Upcoming Appointments</h2>
          <div className="booking-card">
            <div className="booking-card-header">
              <div className="service-info-main">
                <img
                  src="/assets/images/upcoming_service.png"
                  alt="Upcoming service"
                  className="service-thumb"
                />
                <div className="service-title-area">
                  <h3>Bathroom Deep Cleaning</h3>
                  <div className="status-badge scheduled">Scheduled</div>
                </div>
              </div>
              <div className="booking-price">₹499</div>
            </div>
            <div className="booking-details-grid">
              <div className="detail-item">
                <i data-lucide="calendar"></i>
                <span>25 Feb, 10:00 AM</span>
              </div>
              <div className="detail-item">
                <i data-lucide="map-pin"></i>
                <span>Home Address</span>
              </div>
            </div>
            <div className="booking-actions">
              <button className="btn btn-secondary btn-sm">Reschedule</button>
              <button
                className="btn btn-secondary btn-sm"
                style={{ color: "#ef4444" }}
              >
                Cancel Booking
              </button>
            </div>
          </div>
        </section>

        {/*  3. Completed Services  */}
        <section className="booking-section">
          <h2>Completed Services</h2>
          <div className="booking-card">
            <div className="booking-card-header">
              <div className="service-info-main">
                <img
                  src="/assets/images/completed_service.png"
                  alt="Completed service"
                  className="service-thumb"
                />
                <div className="service-title-area">
                  <h3>Full Car Wash</h3>
                  <div className="status-badge completed">Completed</div>
                </div>
              </div>
              <div className="booking-price">₹1,299</div>
            </div>
            <div className="booking-details-grid">
              <div className="detail-item">
                <i data-lucide="calendar"></i>
                <span>15 Feb, 04:00 PM</span>
              </div>
              <div className="detail-item">
                <i data-lucide="check-circle-2"></i>
                <span>Service Satisfactory</span>
              </div>
            </div>
            <div className="booking-actions">
              <button className="btn btn-primary btn-sm">Rebook Service</button>
              <button className="btn btn-secondary btn-sm">
                Rate & Review
              </button>
            </div>
          </div>

          {/*  Cancelled Example  */}
          <div className="booking-card" style={{ opacity: "0.8" }}>
            <div className="booking-card-header">
              <div className="service-info-main">
                <img
                  src="/assets/images/cancelled_service.png"
                  alt="Cancelled service"
                  className="service-thumb"
                />
                <div className="service-title-area">
                  <h3>Home Sanitation</h3>
                  <div className="status-badge cancelled">Cancelled</div>
                </div>
              </div>
            </div>
            <div className="booking-actions">
              <button className="btn btn-secondary btn-sm">View Details</button>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div
            className="footer-brand"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <svg
                width="30"
                height="30"
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
              </svg>
              <div
                className="logo-text"
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "800",
                  marginLeft: "8px",
                }}
              >
                <span style={{ color: "#009ee3" }}>Blink</span>
                <span style={{ color: "#1b9b3a" }}>lean</span>
              </div>
            </div>
            <p>&copy; 2026 Blinklean Services. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/*  Floating WhatsApp Button  */}
      <div className="whatsapp-float-container">
        <span className="whatsapp-tooltip">Chat with us on WhatsApp</span>
        <a
          href="https://wa.me/917022803582?text=Hello%20Blinklean%2C%20I%20am%20interested%20in%20your%20cleaning%20or%20scrap%20recycling%20services."
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

export default Bookings;
