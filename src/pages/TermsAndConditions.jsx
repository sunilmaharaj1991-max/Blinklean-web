import React from "react";

const TermsAndConditions = () => {
  return (
    <>
      {/* Generated JSX from HTML */}

      <nav className="navbar">
        <div className="container nav-container">
          <a href="index.html" className="logo-wrapper">
            <div className="logo-svg">
              <svg
                width="50"
                height="50"
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
            </div>
            <div
              className="logo-content"
              style={{
                display: "flex",
                flexDirection: "column",
                lineHeight: "1.1",
                marginLeft: "8px",
              }}
            >
              <div
                className="logo-text"
                style={{ fontSize: "1.6rem", letterSpacing: "-0.5px" }}
              >
                <span style={{ color: "#009ee3" }}>Blink</span>
                <span style={{ color: "#1b9b3a" }}>lean</span>
              </div>
              <div
                style={{
                  fontSize: "0.95rem",
                  color: "#009ee3",
                  fontWeight: "500",
                }}
              >
                Clean in a Blink
              </div>
            </div>
          </a>
          <div className="nav-links" id="navLinks">
            <a href="services.html#home-cleaning">Home Cleaning</a>
            <a href="services.html#vehicle-cleaning">Vehicle Cleaning</a>
            <a href="services.html#laundry">Laundry</a>
            <a href="services.html#recycling">Scrap & Recycling</a>
            <a href="partner.html">Partner With Us</a>
          </div>
          <button className="mobile-menu-btn" id="menuBtn">
            <i data-lucide="menu"></i>
          </button>
        </div>
      </nav>

      <main className="policy-container">
        <section>
          <h1>Terms & Conditions</h1>
          <div className="policy-meta">
            <p>Company Name: Blinklean Pvt. Ltd.</p>
            <p>Location: Vijayanagar – 560040</p>
          </div>

          <h2>1. Introduction</h2>
          <p>
            Welcome to Blinklean. By accessing our website, mobile application,
            or booking our services, you agree to comply with and be bound by
            these Terms & Conditions.
          </p>

          <h2>2. Services Offered</h2>
          <p>Blinklean provides the following services:</p>
          <ul>
            <li>House Cleaning Services</li>
            <li>Vehicle Cleaning Services (Car, Bike, Auto, Cycle)</li>
            <li>Laundry Services</li>
            <li>Scrap Collection & Recycling Services</li>
            <li>Service availability may vary based on location.</li>
          </ul>

          <h2>3. User Responsibilities</h2>
          <ul>
            <li>Provide accurate address and contact details.</li>
            <li>Ensure access to service location at the scheduled time.</li>
            <li>
              Provide water/electricity if required for cleaning services.
            </li>
            <li>Do not book services for illegal or hazardous activities.</li>
          </ul>

          <h2>4. Booking & Payments</h2>
          <ul>
            <li>
              All bookings must be made via the official app/website or
              authorized representatives.
            </li>
            <li>
              Payments can be made via UPI, Debit/Credit Card, Net Banking, or
              Cash (if available).
            </li>
            <li>Prices are subject to change without prior notice.</li>
            <li>Advance payment may be required for certain services.</li>
          </ul>

          <h2>5. Cancellation & Refund Policy</h2>
          <ul>
            <li>Cancellation before 1 hour: Full refund.</li>
            <li>Cancellation after 1 hour: Partial/No refund.</li>
            <li>No refund after service completion.</li>
            <li>
              Refunds (if applicable) will be processed within 5–7 working days.
            </li>
          </ul>

          <h2>6. Service Warranty & Liability</h2>
          <ul>
            <li>Any service complaint must be reported within 24 hours.</li>
            <li>
              Blinklean’s liability is limited to the amount paid for the
              specific service.
            </li>
            <li>We are not responsible for pre-existing damages.</li>
          </ul>

          <h2>7. Safety & Conduct</h2>
          <ul>
            <li>Customers must ensure a safe working environment.</li>
            <li>
              Any abusive or inappropriate behavior towards staff may result in
              service termination without refund.
            </li>
          </ul>

          <h2>8. Scrap & Recycling Policy</h2>
          <ul>
            <li>Scrap valuation depends on market rates.</li>
            <li>Payment for scrap will be made after weight verification.</li>
            <li>Illegal or prohibited materials will not be accepted.</li>
          </ul>

          <h2>9. Intellectual Property</h2>
          <ul>
            <li>
              All logos, branding, app content, and website materials belong to
              Blinklean and cannot be used without written permission.
            </li>
          </ul>

          <h2>10. Termination</h2>
          <p>
            Blinklean reserves the right to suspend or terminate services in
            case of misuse, fraud, or violation of terms.
          </p>

          <h2>11. Governing Law</h2>
          <p>These Terms shall be governed under the laws of India.</p>
          <p>
            <strong>Jurisdiction:</strong> Courts only.
          </p>

          <h2>12. Updates to Terms</h2>
          <p>
            Blinklean may update these Terms & Conditions at any time. Continued
            use of services implies acceptance of updated terms.
          </p>
        </section>
      </main>

      <footer className="footer-premium">
        <div className="container footer-grid-premium">
          {/*  Column 1: Company  */}
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
                <path
                  d="M 0 50 Q 50 30 100 50"
                  fill="none"
                  stroke="white"
                  strokeWidth="5"
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

          {/*  Column 2: Services  */}
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

          {/*  Column Quick Links  */}
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

          {/*  Column 4: Contact Information  */}
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
    </>
  );
};

export default TermsAndConditions;
