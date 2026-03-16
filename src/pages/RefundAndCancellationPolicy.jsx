import React from "react";
import { Link } from "react-router-dom";

const RefundAndCancellationPolicy = () => {
  return (
    <>
      {/* Generated JSX from HTML */}

      <nav className="navbar">
        <div className="container nav-container">
          <Link to="/" className="logo-wrapper">
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
          </Link>
          <div className="nav-links" id="navLinks">
            <Link to="/services#home-cleaning">Home Cleaning</Link>
            <Link to="/services#vehicle-cleaning">Vehicle Cleaning</Link>
            <Link to="/services#laundry">Laundry</Link>
            <Link to="/services#recycling">Scrap & Recycling</Link>
            <Link to="/partner">Partner With Us</Link>
          </div>
          <button className="mobile-menu-btn" id="menuBtn">
            <i data-lucide="menu"></i>
          </button>
        </div>
      </nav>

      <main className="policy-container">
        <section>
          <h1>Refund & Cancellation Policy</h1>
          <p>
            At Blinklean, we strive to provide reliable and professional
            cleaning services. This policy explains the terms for cancellations,
            rescheduling, and refunds.
          </p>

          <h2>1. Cancellation by Customer</h2>
          <ul>
            <li>
              Customers must cancel or reschedule a confirmed service at least 1
              hour before the scheduled service time.
            </li>
            <li>
              Cancellations made less than 1 hour before the service time may
              not be eligible for a refund.
            </li>
            <li>
              Same-time cancellations or no-shows will be treated as service
              availed and are non-refundable.
            </li>
          </ul>

          <h2>2. Cancellation by Blinklean</h2>
          <ul>
            <li>
              Blinklean reserves the right to cancel or reschedule services due
              to unavoidable reasons such as staff unavailability, safety
              issues, weather conditions, or technical problems.
            </li>
            <li>
              In such cases, customers may opt for rescheduling or a full
              refund.
            </li>
          </ul>

          <h2>3. Refund Policy</h2>
          <ul>
            <li>Eligible refunds will be processed only after verification.</li>
            <li>Refunds will be made through the original payment method.</li>
            <li>
              Refund processing may take 7–10 working days, depending on the
              bank or payment gateway.
            </li>
          </ul>

          <h2>4. Partial Refunds</h2>
          <ul>
            <li>
              If a service is partially completed and a valid concern is
              reported within 24 hours, Blinklean may offer a partial refund or
              service redo, at its discretion.
            </li>
            <li>
              No refunds will be issued for satisfactorily completed services.
            </li>
          </ul>

          <h2>5. Non-Refundable Cases</h2>
          <p>Refunds will not be applicable if:</p>
          <ul>
            <li>Cancellation is made within 1 hour of service time</li>
            <li>Customer is unavailable or denies access at the location</li>
            <li>Incorrect address or service details are provided</li>
            <li>
              Water, electricity, or safe working conditions are not provided
            </li>
            <li>
              Dissatisfaction arises due to permanent stains, old damage, or
              normal wear and tear
            </li>
          </ul>

          <h2>6. Packages & Subscriptions</h2>
          <ul>
            <li>
              For prepaid packages or subscriptions, refunds (if any) will be
              calculated on a pro-rata basis after deducting completed services.
            </li>
            <li>
              Subscription cancellations must be requested at least 24 hours in
              advance.
            </li>
          </ul>

          <h2>7. How to Cancel or Request Refund</h2>
          <p>
            Customers must contact Blinklean through official channels with:
          </p>
          <ul>
            <li>Booking reference number</li>
            <li>Scheduled service date & time</li>
            <li>Reason for cancellation or refund request</li>
          </ul>

          <h2>8. Policy Updates</h2>
          <p>
            Blinklean reserves the right to amend this policy at any time.
            Updates will be effective immediately upon posting on the website.
          </p>

          <h2>9. Contact Us</h2>
          <p>
            For questions regarding cancellations or refunds, please contact us
            via the details mentioned on our website.
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

export default RefundAndCancellationPolicy;
