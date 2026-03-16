import React from "react";

const Pricing = () => {
  return (
    <>
      {/* Generated JSX from HTML */}

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
            <a href="pricing.html" className="active">
              Pricing
            </a>
          </div>
        </div>
      </nav>

      <header className="pricing-hero">
        <div className="container">
          <h1>Simple, Transparent Pricing</h1>
          <p>No hidden charges. No surprises. Just sparkling clean spaces.</p>
        </div>
      </header>

      {/*  Subscription Plans (Reused from logic)  */}
      <section className="pricing-section">
        <div className="container">
          <div className="pricing-grid">
            {/*  Bike Wash Plan  */}
            <div className="pricing-card">
              <div className="plan-header">
                <h3>Bike Wash Monthly</h3>
                <div className="plan-price">
                  ₹499<span>/mo</span>
                </div>
              </div>
              <ul className="plan-features">
                <li>
                  <i data-lucide="check-circle"></i> 4 Professional washes
                </li>
                <li>
                  <i data-lucide="check-circle"></i> Chain cleaning & lubing
                </li>
                <li>
                  <i data-lucide="check-circle"></i> Doorstep service
                </li>
              </ul>
              <a href="booking.html" className="btn btn-secondary">
                Choose Plan
              </a>
            </div>

            {/*  Car Wash Plan (Featured)  */}
            <div className="pricing-card featured">
              <div className="popular-badge">Most Popular</div>
              <div className="plan-header">
                <h3>Car Care Monthly</h3>
                <div className="plan-price">
                  ₹1,299<span>/mo</span>
                </div>
              </div>
              <ul className="plan-features">
                <li>
                  <i data-lucide="check-circle"></i> 4 Interior & Exterior
                  washes
                </li>
                <li>
                  <i data-lucide="check-circle"></i> Dashboard polishing
                </li>
                <li>
                  <i data-lucide="check-circle"></i> Tire dressing
                </li>
              </ul>
              <a href="booking.html" className="btn btn-primary">
                Choose Plan
              </a>
            </div>

            {/*  Premium Home Care  */}
            <div className="pricing-card">
              <div className="plan-header">
                <h3>Premium Home Care</h3>
                <div className="plan-price">
                  ₹3,499<span>/mo</span>
                </div>
              </div>
              <ul className="plan-features">
                <li>
                  <i data-lucide="check-circle"></i> 1 Full Deep Cleaning
                </li>
                <li>
                  <i data-lucide="check-circle"></i> 2 Maintenance cleanings
                </li>
                <li>
                  <i data-lucide="check-circle"></i> Pest control voucher
                </li>
              </ul>
              <a href="booking.html" className="btn btn-secondary">
                Choose Plan
              </a>
            </div>
          </div>
        </div>
      </section>

      {/*  Individual Service Price List  */}
      <section className="price-list-section">
        <div className="container">
          <h2 style={{ textAlign: "center", marginBottom: "40px" }}>
            Individual Service Rates
          </h2>
          <table className="price-table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Bathroom Deep Cleaning</td>
                <td>₹499</td>
              </tr>
              <tr>
                <td>Kitchen Deep Cleaning</td>
                <td>₹1,299</td>
              </tr>
              <tr>
                <td>Sofa Deep Cleaning (per seat)</td>
                <td>₹199</td>
              </tr>
              <tr>
                <td>Full Home Deep Cleaning (1BHK)</td>
                <td>₹2,499</td>
              </tr>
              <tr>
                <td>Full Home Deep Cleaning (2BHK)</td>
                <td>₹3,499</td>
              </tr>
              <tr>
                <td>Car Interior Detailing</td>
                <td>₹899</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2026 Blinklean. Clean in a Blink.</p>
        </div>
      </footer>

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

export default Pricing;
