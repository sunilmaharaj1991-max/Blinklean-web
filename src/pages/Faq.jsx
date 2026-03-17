import { Link } from "react-router-dom";
import { useEffect } from "react";
import Logo from "../components/Logo";

const Faq = () => {
  useEffect(() => {
    // Scroll to section if hash exists
    if (window.location.hash) {
      const element = document.getElementById(
        window.location.hash.substring(1),
      );
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <div className="faq-page">
      <nav className="navbar">
        <div className="container nav-container">
          <Link to="/" className="logo-wrapper">
            <Logo type="navbar" />
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

      <header className="hero-premium">
        <div className="container hero-container-centered">
          <div className="hero-content-centered reveal">
            <div className="availability-pill">
              <i data-lucide="map-pin"></i>
              <span>India's First AI Powered QuickClean Platform</span>
            </div>
            <h1>
              Frequently Asked <span className="handwritten">Questions</span>
            </h1>
            <p className="hero-subtext">
              Everything you need to know about our cleaning and recycling
              services.
            </p>
          </div>
        </div>
      </header>

      <section
        className="faq-main-section reveal"
        style={{ padding: "80px 0" }}
      >
        <div className="container">
          <div className="faq-list">
            <div className="faq-item">
              <div className="faq-header">
                <h3>What services does Blinklean provide?</h3>
                <i data-lucide="chevron-down" className="faq-icon"></i>
              </div>
              <div className="faq-content">
                <div className="faq-content-inner">
                  Blinklean provides a wide range of doorstep services including
                  professional home cleaning, eco-friendly waterless vehicle
                  cleaning, laundry services, and responsible scrap recycling.
                </div>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-header">
                <h3>Which areas do you serve?</h3>
                <i data-lucide="chevron-down" className="faq-icon"></i>
              </div>
              <div className="faq-content">
                <div className="faq-content-inner">
                  We currently serve Bangalore and surrounding areas. We are
                  rapidly expanding to other major cities soon.
                </div>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-header">
                <h3>What is waterless car cleaning?</h3>
                <i data-lucide="chevron-down" className="faq-icon"></i>
              </div>
              <div className="faq-content">
                <div className="faq-content-inner">
                  Waterless car cleaning uses specialized high-lubricity sprays
                  to polish and wash your vehicle's bodywork without using more
                  than a cup of water. It's eco-friendly, prevents scratches,
                  and leaves a premium showroom-like shine.
                </div>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-header">
                <h3>How does scrap recycling work?</h3>
                <i data-lucide="chevron-down" className="faq-icon"></i>
              </div>
              <div className="faq-content">
                <div className="faq-content-inner">
                  Simply book a pickup through our website or WhatsApp. Our
                  professional team visits your doorstep, weighs your items
                  using digital scales, pays you instantly based on current
                  market rates, and ensures materials are recycled responsibly.
                </div>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-header">
                <h3>Do you provide laundry pickup?</h3>
                <i data-lucide="chevron-down" className="faq-icon"></i>
              </div>
              <div className="faq-content">
                <div className="faq-content-inner">
                  Yes, we provide doorstep pickup and return for all laundry
                  services. You can schedule a time that works for you, and
                  we'll handle the washing, drying, and ironing.
                </div>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-header">
                <h3>How can I book a service?</h3>
                <i data-lucide="chevron-down" className="faq-icon"></i>
              </div>
              <div className="faq-content">
                <div className="faq-content-inner">
                  You can book any service through our website by navigating to
                  the services section or by contacting us directly on WhatsApp
                  at +91 70228 03582.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer-premium">
        <div className="container footer-grid-premium">
          <div className="footer-col">
            <div className="footer-logo">
              <div className="logo-text">
                <span style={{ color: "#009ee3" }}>Blink</span>
                <span style={{ color: "#1b9b3a" }}>lean</span>
              </div>
            </div>
            <p className="footer-desc">
              Professional doorstep clean-tech services including home cleaning,
              waterless vehicle detailing, laundry, and scrap recycling.
            </p>
            <div className="footer-social">
              <a
                href="https://www.instagram.com/blinklean_official"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i data-lucide="instagram"></i>
              </a>
              <a
                href="https://www.linkedin.com/company/blinklean"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i data-lucide="linkedin"></i>
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
                <Link to="/partner">Join as Partner</Link>
              </li>
            </ul>
          </div>
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
            style={{ display: "flex", justifyContent: "center" }}
          >
            <p>&copy; 2026 Blinklean. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Faq;
