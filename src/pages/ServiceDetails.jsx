import React from "react";

const ServiceDetails = () => {
  return (
    <>
      {/* Generated JSX from HTML */}

      {/*  Navigation  */}
      <nav className="navbar">
        <div className="container nav-container">
          <a href="index.html" className="logo-wrapper">
            <div className="logo-text">
              Blink<span>lean</span>
            </div>
          </a>
          <div className="nav-links" id="navLinks">
            <a href="index.html">Home</a>
            <a href="services.html">Services</a>
            <a href="pricing.html">Pricing</a>
            <a href="about.html">About</a>
            <a href="partner.html">Partner</a>
            <a href="contact.html">Contact Us</a>
          </div>
          <button className="mobile-menu-btn" id="menuBtn">
            <i data-lucide="menu"></i>
          </button>
        </div>
      </nav>

      {/*  1. Service Image Banner  */}
      <header className="service-banner">
        <img
          src="/assets/images/bathroom_cleaning.png"
          alt="Bathroom Deep Cleaning"
        />
        <div className="container">
          {/*  Title can be added here if needed, but per prompt it's in a separate section  */}
        </div>
      </header>

      <main className="container details-layout">
        <div className="details-content">
          {/*  2. Service Title & Overview  */}
          <section className="overview">
            <h1>Bathroom Deep Cleaning</h1>
            <p>
              A thorough deep cleaning service that removes stains, bacteria,
              and buildup to leave your bathroom fresh, hygienic, and sparkling
              clean. We use specialized equipment and eco-friendly agents to
              restore your bathroom's original shine.
            </p>

            {/*  4. Duration & Service Details  */}
            <div className="info-row">
              <div className="info-item">
                <i data-lucide="clock"></i>
                <div>
                  <p>1 - 1.5 Hours</p>
                  <span>Estimated Time</span>
                </div>
              </div>
              <div className="info-item">
                <i data-lucide="users"></i>
                <div>
                  <p>1 Professional</p>
                  <span>Staff Required</span>
                </div>
              </div>
              <div className="info-item">
                <i data-lucide="briefcase"></i>
                <div>
                  <p>All Tools Included</p>
                  <span>No extra cost</span>
                </div>
              </div>
            </div>
          </section>

          {/*  3. Included Tasks Checklist  */}
          <section className="section-card">
            <h2>
              <i data-lucide="check-square"></i> What's Included?
            </h2>
            <div className="checklist-grid">
              <div className="check-item">
                <i data-lucide="check-circle-2"></i> Tile & floor scrubbing
              </div>
              <div className="check-item">
                <i data-lucide="check-circle-2"></i> Hard water stain removal
              </div>
              <div className="check-item">
                <i data-lucide="check-circle-2"></i> Sink & mirror cleaning
              </div>
              <div className="check-item">
                <i data-lucide="check-circle-2"></i> Toilet sanitization
              </div>
              <div className="check-item">
                <i data-lucide="check-circle-2"></i> Disinfecting high-touch
                areas
              </div>
              <div className="check-item">
                <i data-lucide="check-circle-2"></i> Exhaust fan & light
                cleaning
              </div>
              <div className="check-item">
                <i data-lucide="check-circle-2"></i> Cobweb removal
              </div>
              <div className="check-item">
                <i data-lucide="check-circle-2"></i> Tap & shower head polishing
              </div>
            </div>
          </section>

          {/*  6. Customer Reviews Preview  */}
          <section className="section-card">
            <h2>
              <i data-lucide="star"></i> Customer Feedback
            </h2>
            <div className="details-reviews">
              <div className="review-summary">
                <div className="rating-stars" style={{ color: "#fbbf24" }}>
                  <i data-lucide="star" style={{ fill: "currentColor" }}></i>
                  <i data-lucide="star" style={{ fill: "currentColor" }}></i>
                  <i data-lucide="star" style={{ fill: "currentColor" }}></i>
                  <i data-lucide="star" style={{ fill: "currentColor" }}></i>
                  <i data-lucide="star" style={{ fill: "currentColor" }}></i>
                </div>
                <span>4.8 (850 reviews)</span>
              </div>
              <div className="review-snippet">
                “Excellent service and very professional team. My bathroom looks
                brand new again. The staff was polite and finished the job
                exactly on time.”
              </div>
            </div>
          </section>
        </div>

        {/*  5. Pricing & Booking Sidebar (Desktop)  */}
        <aside className="booking-sidebar">
          <div className="sidebar-card">
            <div className="price-display">
              <span className="label">Starting from</span>
              <span className="amount">₹499</span>
            </div>

            <div className="add-ons">
              <h4>Available Add-ons</h4>
              <div className="add-on-item">
                <div className="add-on-label">
                  <input type="checkbox" id="stain" />
                  <label htmlFor="stain">Hard stain treatment</label>
                </div>
                <span>+₹99</span>
              </div>
              <div className="add-on-item">
                <div className="add-on-label">
                  <input type="checkbox" id="bacteria" />
                  <label htmlFor="bacteria">Anti-bacterial coating</label>
                </div>
                <span>+₹149</span>
              </div>
            </div>

            {/* Book Now button removed per user request */}
            <p
              style={{
                textAlign: "center",
                fontSize: "0.8rem",
                color: "var(--text-muted)",
                marginTop: "16px",
              }}
            >
              <i data-lucide="shield"></i> 100% Satisfaction Guarantee
            </p>
          </div>
        </aside>
      </main>

      {/*  7. Sticky Book Now Button (Mobile)  */}
      {/*  Removed Book Now Mobile Bar per user request  */}

      {/*  Footer  */}
      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <a href="index.html" className="logo">
              Blink<span>lean</span>
            </a>
            <p>Making home services simple, safe, and sustainable.</p>
            <div className="social-links">
              <a href="https://www.facebook.com/share/1V83bCiMAp/" target="_blank" rel="noopener noreferrer">
                <i data-lucide="facebook"></i>
              </a>
              <a href="https://www.instagram.com/blinklean?utm_source=qr&igsh=OWs2MmxoMWJ3ZnFs" target="_blank" rel="noopener noreferrer">
                <i data-lucide="instagram"></i>
              </a>
              <a href="https://www.linkedin.com/company/malnad-manju-cafe/" target="_blank" rel="noopener noreferrer">
                <i data-lucide="linkedin"></i>
              </a>
            </div>
          </div>
          <div className="footer-links">
            <h4>Services</h4>
            <a href="#">Home Cleaning</a>
            <a href="#">Car Washing</a>
            <a href="#">Grooming</a>
          </div>
          <div className="footer-links">
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default ServiceDetails;
