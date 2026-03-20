import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";
import FloatingWhatsApp from "../components/FloatingWhatsApp";

const ServiceDetails = () => {
  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, []);

  return (
    <>
      <Header />

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

      <Footer />
      <BottomNav />
      <FloatingWhatsApp />
    </>
  );
};

export default ServiceDetails;
