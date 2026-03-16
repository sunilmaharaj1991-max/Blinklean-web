import React from "react";
import { Link } from "react-router-dom";

const EqualOpportunityPolicy = () => {
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
          <h1>Equal Opportunity Policy</h1>
          <p>
            At Blinklean, we are committed to providing an inclusive and
            respectful workplace where every individual is treated fairly. We
            believe in equal opportunity for all, and we do not tolerate
            discrimination in any form.
          </p>

          <h2>Our Commitment</h2>
          <p>
            Blinklean provides equal employment opportunities to all employees,
            applicants, partners, and stakeholders without discrimination based
            on:
          </p>
          <ul>
            <li>Gender, age, or marital status</li>
            <li>Religion, caste, or community</li>
            <li>Disability or medical condition</li>
            <li>Race, nationality, or language</li>
            <li>Any other status protected under applicable law</li>
          </ul>

          <h2>Fair Hiring & Employment</h2>
          <p>
            We ensure that decisions related to hiring, training, promotion,
            compensation, and work allocation are based on:
          </p>
          <ul>
            <li>Skills, qualifications, and experience</li>
            <li>Work performance and professional conduct</li>
            <li>Business requirements</li>
          </ul>

          <h2>Safe & Respectful Workplace</h2>
          <p>Blinklean maintains a workplace culture that is:</p>
          <ul>
            <li>Professional and respectful</li>
            <li>Free from harassment or bullying</li>
            <li>Supportive of employee growth and development</li>
          </ul>

          <h2>Reporting Concerns</h2>
          <p>
            Any employee or applicant who experiences discrimination or
            harassment can report the issue through our official communication
            channels. Complaints will be handled confidentially and fairly.
          </p>

          <h2>Policy Compliance</h2>
          <p>
            All employees and team members are expected to follow this policy.
            Any violation may lead to disciplinary action as per company rules.
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

export default EqualOpportunityPolicy;
