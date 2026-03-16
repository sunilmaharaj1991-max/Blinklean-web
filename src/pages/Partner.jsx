import { Link } from "react-router-dom";

const Partner = () => {
  return (
    <>
      {/* Generated JSX from HTML */}

      <nav className="navbar">
        <div className="container nav-container">
          <Link
            to="/"
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
          </Link>
          <div className="nav-links" id="navLinks">
            <Link to="/services#home-cleaning">Home Cleaning</Link>
            <Link to="/services#vehicle-cleaning">Vehicle Cleaning</Link>
            <Link to="/services#laundry">Laundry</Link>
            <Link to="/services#recycling">Scrap & Recycling</Link>
            <Link to="/partner">Partner With Us</Link>
            <Link to="/login" className="nav-login-btn">
              Login
            </Link>
          </div>
        </div>
      </nav>

      <header className="partner-hero">
        <div className="container">
          <h1>Partner with Blinklean AI Clean-Tech</h1>
          <p>
            Join India's multi-service platform for Home Cleaning, Vehicle Care,
            Laundry & Recycling.
          </p>
        </div>
      </header>

      <section className="partner-benefits">
        <div className="container">
          <h2 style={{ textAlign: "center" }}>Why Partner With Us?</h2>
          <div className="benefit-grid">
            <div
              className="card"
              style={{ textAlign: "center", padding: "30px" }}
            >
              <i
                data-lucide="trending-up"
                style={{
                  color: "var(--primary)",
                  marginBottom: "15px",
                  width: "40px",
                  height: "40px",
                }}
              ></i>
              <h3>Verified Leads</h3>
              <p>
                Access high-intent customers in your vicinity with AI-driven
                booking assignments.
              </p>
            </div>
            <div
              className="card"
              style={{ textAlign: "center", padding: "30px" }}
            >
              <i
                data-lucide="wallet"
                style={{
                  color: "var(--primary)",
                  marginBottom: "15px",
                  width: "40px",
                  height: "40px",
                }}
              ></i>
              <h3>Secure Earnings</h3>
              <p>
                Transparent weekly payment cycles and performance-based
                incentives.
              </p>
            </div>
            <div
              className="card"
              style={{ textAlign: "center", padding: "30px" }}
            >
              <i
                data-lucide="award"
                style={{
                  color: "var(--primary)",
                  marginBottom: "15px",
                  width: "40px",
                  height: "40px",
                }}
              ></i>
              <h3>Premium Branding</h3>
              <p>
                Deliver services under a known clean-tech brand with top-tier
                training and gear.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="partnership-categories">
        <div className="container">
          <h2 style={{ textAlign: "center", marginBottom: "40px" }}>
            Partnership Opportunities
          </h2>
          <div className="benefit-grid">
            <div className="category-card-p">
              <i data-lucide="home"></i>
              <h3>Home Cleaning</h3>
              <p>For 1BHK-3BHK specialists and deep cleaning experts.</p>
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
              <h3>Scrap & Recycling</h3>
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
            <form>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Enter your full name" />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  placeholder="Mobile number for OTP verification"
                />
              </div>
              <div className="form-group">
                <label>Partnership Interest</label>
                <select>
                  <option>Home Cleaning Expert</option>
                  <option>Vehicle Detailer</option>
                  <option>Laundry Service Center</option>
                  <option>Scrap Collection Agent</option>
                  <option>Office Cleaning Contractor</option>
                </select>
              </div>
              <div className="form-group">
                <label>Location (City/Pincode)</label>
                <input type="text" placeholder="Where do you operate?" />
              </div>
              <div className="form-group">
                <label>Experience (Years)</label>
                <input type="number" placeholder="Years of experience" />
              </div>
              <button type="submit" className="btn btn-primary btn-full">
                Join the Ecosystem
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="footer-premium">
        <div className="container footer-grid-premium">
          {/* Column 1: Company */}
          <div className="footer-col">
            <div className="footer-logo">
              <svg
                width="32"
                height="32"
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
              <div className="logo-text">
                <span style={{ color: "#009ee3" }}>Blink</span>
                <span style={{ color: "#1b9b3a" }}>lean</span>
              </div>
            </div>
            <p className="footer-desc">
              Blinklean provides professional doorstep clean-tech services
              including home cleaning, waterless vehicle detailing, laundry, and
              scrap recycling.
            </p>
            <div className="footer-social">
              <a
                href="https://www.instagram.com/p/DU7uAgDE5U5/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ=="
                target="_blank"
                rel="noopener noreferrer"
              >
                <i data-lucide="instagram"></i>
              </a>
              <a
                href="https://www.linkedin.com/company/malnad-manju-cafe/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i data-lucide="linkedin"></i>
              </a>
              <a
                href="https://x.com/blinklean"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
              </a>
              <a
                href="https://wa.me/917022803582"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i data-lucide="message-circle"></i>
              </a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="footer-col">
            <h4>Our Services</h4>
            <ul className="footer-links-list">
              <li>
                <Link to="/services#home-cleaning">Home Cleaning</Link>
              </li>
              <li>
                <Link to="/services#vehicle-cleaning">Vehicle Care</Link>
              </li>
              <li>
                <Link to="/services#laundry">Laundry Services</Link>
              </li>
              <li>
                <Link to="/scrap-recycling">Scrap Recycling</Link>
              </li>
            </ul>
          </div>

          {/* Column Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links-list">
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
              <li>
                <Link to="/services">Join as Partner</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Information */}
          <div className="footer-col">
            <h4>Contact Us</h4>
            <div className="footer-contact-info">
              <div className="contact-item">
                <i data-lucide="map-pin"></i>
                <span>Vijayanagar, Bangalore</span>
              </div>
              <div className="contact-item">
                <i data-lucide="mail"></i>
                <a href="mailto:support@blinklean.com">support@blinklean.com</a>
              </div>
              <div className="contact-item">
                <i data-lucide="phone"></i>
                <span>+91 70228 03582</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div
            className="container"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              className="footer-policy-links"
              style={{
                display: "flex",
                gap: "15px",
                flexWrap: "wrap",
                justifyContent: "center",
                fontSize: "0.85rem",
                marginBottom: "5px",
              }}
            >
              <Link
                to="/privacy-policy"
                style={{ color: "var(--text-muted)", textDecoration: "none" }}
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-and-conditions"
                style={{ color: "var(--text-muted)", textDecoration: "none" }}
              >
                Terms & Conditions
              </Link>
              <Link
                to="/refund-and-cancellation-policy"
                style={{ color: "var(--text-muted)", textDecoration: "none" }}
              >
                Refund Policy
              </Link>
              <Link
                to="/equal-opportunity-policy"
                style={{ color: "var(--text-muted)", textDecoration: "none" }}
              >
                Equal Opportunity
              </Link>
            </div>
            <p>&copy; 2026 Blinklean. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
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

export default Partner;
