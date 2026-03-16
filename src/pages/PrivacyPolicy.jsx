import React from "react";

const PrivacyPolicy = () => {
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
          <h1>Privacy Policy</h1>
          <p>
            At Blinklean, we value your privacy and are committed to protecting
            the personal information you share with us. This Privacy Policy
            explains how we collect, use, store, and safeguard your information
            when you visit our website or use our services.
          </p>

          <h2>1. Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <ul>
            <li>
              <strong>Personal Information:</strong> Name, phone number, email
              address, business name, and service address.
            </li>
            <li>
              <strong>Service Information:</strong> Details related to cleaning
              services requested or provided.
            </li>
            <li>
              <strong>Payment Information:</strong> Transaction details (we do
              not store card or banking details).
            </li>
            <li>
              <strong>Technical Information:</strong> IP address, browser type,
              device information, and website usage data.
            </li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>Your information may be used to:</p>
          <ul>
            <li>Process service bookings and payments</li>
            <li>Communicate service updates, confirmations, and support</li>
            <li>Improve our services and website experience</li>
            <li>Send promotional offers (only with your consent)</li>
            <li>Comply with legal and regulatory requirements</li>
          </ul>

          <h2>3. Information Sharing & Disclosure</h2>
          <p>
            Blinklean does not sell, rent, or trade your personal information.
            We may share information only:
          </p>
          <ul>
            <li>
              With authorized employees or service partners to fulfill services
            </li>
            <li>
              With trusted third-party service providers (payment gateways, IT
              services)
            </li>
            <li>When required by law or government authorities</li>
          </ul>

          <h2>4. Data Security</h2>
          <p>
            We implement reasonable security measures to protect your
            information against unauthorized access, misuse, or disclosure.
            While we strive to protect your data, no online transmission can be
            guaranteed to be 100% secure.
          </p>

          <h2>5. Cookies & Tracking Technologies</h2>
          <p>Our website may use cookies and similar technologies to:</p>
          <ul>
            <li>Enhance website functionality</li>
            <li>Analyze traffic and usage patterns</li>
            <li>Improve user experience</li>
          </ul>
          <p>
            You can choose to disable cookies through your browser settings,
            though some features may not function properly.
          </p>

          <h2>6. Data Retention</h2>
          <p>
            We retain personal information only for as long as necessary to
            fulfill the purposes outlined in this policy or as required by law.
          </p>

          <h2>7. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access, update, or correct your personal information</li>
            <li>
              Request deletion of your personal data (subject to legal
              obligations)
            </li>
            <li>Withdraw consent for marketing communications at any time</li>
          </ul>
          <p>
            To exercise these rights, please contact us through our official
            communication channels.
          </p>

          <h2>8. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. Blinklean is
            not responsible for the privacy practices or content of such
            websites.
          </p>

          <h2>9. Children’s Privacy</h2>
          <p>
            Our services and website are not intended for individuals under the
            age of 18. We do not knowingly collect personal information from
            minors.
          </p>

          <h2>10. Policy Updates</h2>
          <p>
            Blinklean reserves the right to update this Privacy Policy at any
            time. Any changes will be posted on this page with an updated
            effective date.
          </p>

          <h2>11. Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy or
            your personal data, please contact us via the details mentioned on
            our website.
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

export default PrivacyPolicy;
