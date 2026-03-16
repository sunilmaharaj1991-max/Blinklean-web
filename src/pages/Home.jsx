import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";

const Home = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [heroOpacity, setHeroOpacity] = useState(1);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Navbar and Hero Scroll Logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Navbar hide/show
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // Scrolling down
      } else {
        setIsVisible(true); // Scrolling up
      }
      setLastScrollY(currentScrollY);

      // Hero image fade out
      const fadeStart = 0;
      const fadeEnd = 500;
      const opacity = Math.max(
        0,
        1 - (currentScrollY - fadeStart) / (fadeEnd - fadeStart),
      );
      setHeroOpacity(opacity);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const faqData = [
    {
      question: "What services does Blinklean provide?",
      answer:
        "Blinklean is your one-stop clean-tech platform providing professional House Cleaning, innovative Waterless Vehicle Detailing, Fabric-safe Laundry, and incentivized Scrap Recycling services directly at your doorstep.",
    },
    {
      question: "Which areas do you serve?",
      answer:
        "We are currently hyper-local in Bengaluru, serving key areas including Vijayanagar, Chandra Layout, Attiguppe, Rajajinagar, and Rajarajeshwari Nagar. We are rapidly expanding to other urban clusters!",
    },
    {
      question: "How can I book a scrap recycling service?",
      answer:
        "Simply click on the 'Sell Scrap on WhatsApp' button. Our AI-assisted chat will help you schedule a pickup. A verified agent will then visit with digital scales, pay you instantly at best market rates, and collect the items.",
    },
    {
      question: "Do you provide eco-friendly cleaning?",
      answer:
        "Absolutely! Environmental sustainability is at our core. Our vehicle cleaning is 100% waterless, saving up to 200L of water per wash, and we use biodegradable cleaning agents for all residential tasks.",
    },
    {
      question: "Will services be available through an app?",
      answer:
        "Yes, our AI-powered mobile app is in the final stages of development. It will feature real-time tracking, service history, and one-tap rebooking for a truly frictionless experience.",
    },
  ];

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Initialize icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const checkServiceArea = () => {
    const pincode = document.getElementById("pincode").value;
    const result = document.getElementById("pincode-result");
    if (pincode.length === 6) {
      result.innerText = "Service is available in your area!";
      result.style.color = "var(--secondary)";
    } else {
      result.innerText = "Please enter a valid 6-digit pincode.";
      result.style.color = "red";
    }
  };

  const highlightPlan = () => {
    // Simplified logic for now
  };
  return (
    <>
      {/* Generated JSX from HTML */}

      <nav className={`navbar ${!isVisible ? "navbar-hidden" : ""}`}>
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
                style={{
                  fontSize: "1.6rem",
                  letterSpacing: "-0.5px",
                  fontFamily: "var(--font-heading)",
                  fontWeight: "800",
                }}
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
          <div
            className={`nav-links ${isMenuOpen ? "active" : ""}`}
            id="navLinks"
          >
            <Link to="/services#home-cleaning">Home Cleaning</Link>
            <Link to="/services#vehicle-cleaning">Vehicle Cleaning</Link>
            <Link to="/services#laundry">Laundry</Link>
            <Link to="/services#recycling">Scrap & Recycling</Link>
            {user ? (
              <Link to="/profile" className="nav-login-btn">
                Profile
              </Link>
            ) : (
              <Link to="/login" className="nav-login-btn">
                Login
              </Link>
            )}
          </div>
          <button className="mobile-menu-btn" id="menuBtn" onClick={toggleMenu}>
            <i data-lucide={isMenuOpen ? "x" : "menu"}></i>
          </button>
        </div>
      </nav>

      <header className="hero-premium">
        <div className="container hero-container-centered">
          <div className="hero-content-centered reveal">
            <div className="availability-pill">
              <i data-lucide="map-pin"></i>
              <span>India's first AI Powered QuickClean Platform</span>
            </div>
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: "800",
                fontSize: "clamp(2.1rem, 5vw, 4rem)",
                lineHeight: "1.2",
                marginBottom: "15px",
                textAlign: "center"
              }}
            >
              India's first <span style={{ color: "var(--primary)" }}>AI Powered</span>
              <br />
              QuickClean Platform
            </h1>
            <p
              className="tagline-premium"
              style={{
                fontFamily: "var(--font-accent)",
                fontSize: "clamp(2.5rem, 6vw, 4.2rem)",
                color: "#16a34a",
                fontWeight: "700",
                marginBottom: "30px",
                display: "block",
                textShadow: "0 2px 4px rgba(0,0,0,0.05)",
                transform: "rotate(-1deg)",
              }}
            >
              Clean in a Blink!
            </p>
            <p
              className="hero-subtext"
              style={{
                fontSize: "1.25rem",
                opacity: "0.9",
                maxWidth: "800px",
                margin: "0 auto 30px",
                lineHeight: "1.6",
              }}
            >
              Doorstep Smart Cleaning & Recycling tailored for your modern
              lifestyle. Expert care for your Home, Vehicles, and Fabrics.
            </p>

            <div className="hero-cta-buttons">
              <Link to="/services" className="btn btn-primary btn-lg">
                <i data-lucide="sparkles"></i>
                Explore Services
              </Link>
              <Link
                to="/scrap-booking"
                className="btn btn-secondary btn-lg"
              >
                <i data-lucide="shopping-basket"></i>
                Sell Scrap Now
              </Link>
            </div>

            <div className="hero-pincode-checker-centered">
              <input
                type="text"
                placeholder="Enter Pincode (e.g. 560066)"
                id="pincode"
              />
              <button onClick={() => checkServiceArea()}>
                Check Availability
              </button>
              <p
                id="pincode-result"
                style={{
                  marginTop: "10px",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  minHeight: "1.2rem",
                }}
              ></p>
            </div>

            <div className="hero-trust-strip">
              <div className="indicator-badge">
                <div className="indicator-icon-sm">
                  <i data-lucide="star"></i>
                </div>
                <div className="indicator-info">
                  <strong>4.8</strong>
                  <span>Avg Rating</span>
                </div>
              </div>
              <div className="indicator-badge">
                <div className="indicator-icon-sm">
                  <i data-lucide="users"></i>
                </div>
                <div className="indicator-info">
                  <strong>20,000+</strong>
                  <span>Happy Customers</span>
                </div>
              </div>
              <div className="indicator-badge">
                <div className="indicator-icon-sm">
                  <i data-lucide="shield-check"></i>
                </div>
                <div className="indicator-info">
                  <strong>Verified</strong>
                  <span>Professionals</span>
                </div>
              </div>
            </div>
          </div>

          {/*  Hero Slider Illustration (Restored)  */}
          <div
            className="hero-visual-bottom animate-fade-in"
            style={{
              height: "auto",
              minHeight: "300px",
              marginTop: "30px",
              opacity: heroOpacity,
              transition: "opacity 0.1s ease-out",
            }}
          >
            <img
              src="/assets/images/hero_collage.png"
              alt="Multi-Service Cleaning Collage"
              className="hero-illustration animate-float"
              style={{
                width: "100%",
                height: "auto",
                maxWidth: "1100px",
                margin: "0 auto",
                borderRadius: "24px",
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.1)",
                display: "block",
              }}
            />
          </div>
        </div>

        <div className="container reveal">
          <div className="hero-mini-stats">
            <div className="mini-stat">
              <i data-lucide="check-circle"></i>
              <span>
                <strong className="count-up" data-target="50000">
                  0
                </strong>
                + Services Completed
              </span>
            </div>
            <div className="mini-stat">
              <i data-lucide="user-check"></i>
              <span>Background Checked Staff</span>
            </div>
            <div className="mini-stat">
              <i data-lucide="leaf"></i>
              <span>Eco-Friendly Products</span>
            </div>
            <div className="mini-stat">
              <i data-lucide="lock"></i>
              <span>Secure Payments</span>
            </div>
            <div className="mini-stat">
              <i data-lucide="award"></i>
              <span>Premium Standards</span>
            </div>
          </div>
        </div>
      </header>

      {/*  Our Professional Services Section  */}
      <section id="our-services" className="our-services-section reveal">
        <div className="container">
          <div className="section-header">
            <h2>Our Professional Services</h2>
            <p>We provide reliable doorstep cleaning and recycling services.</p>
          </div>

          <div className="services-grid">
            {/*  Service Card 1: Home Cleaning  */}
            <div className="service-card">
              <div className="service-image-wrapper">
                <img src="/assets/images/gen_home.png" alt="Professional Home Deep Cleaning Service" />
              </div>
              <div className="service-icon-wrapper">
                <i data-lucide="home"></i>
              </div>
              <h3>House Cleaning</h3>
              <p>
                Professional cleaning for kitchens, bathrooms, bedrooms and full
                house interiors.
              </p>
              <div className="price-tag-simple">Starting at ₹599</div>
              <Link to="/services#home-cleaning" className="btn btn-outline">
                Learn More
              </Link>
            </div>

            {/*  Service Card 2: Vehicle Cleaning  */}
            <div className="service-card">
              <div className="service-image-wrapper">
                <img
                  src="/assets/images/car_exterior_wash.png"
                  alt="Waterless Doorstep Vehicle Cleaning and Detailing"
                />
              </div>
              <div className="service-icon-wrapper">
                <i data-lucide="car"></i>
              </div>
              <h3>Vehicle Cleaning</h3>
              <p>
                Premium waterless cleaning service for cars, motorcycles,
                auto-rickshaws and bicycles.
              </p>
              <div className="price-tag-simple">Starting at ₹99</div>
              <Link to="/services#vehicle-cleaning" className="btn btn-outline">
                Learn More
              </Link>
            </div>

            {/*  Service Card 3: Laundry Services  */}
            <div className="service-card">
              <div className="service-image-wrapper">
                <img
                  src="/assets/images/wash_and_fold.png"
                  alt="Doorstep Laundry, Wash and Fold, and Steam Ironing"
                />
              </div>
              <div className="service-icon-wrapper">
                <i data-lucide="shirt"></i>
              </div>
              <h3>Laundry Services</h3>
              <p>
                Washing, folding and steam ironing services handled by
                professionals.
              </p>
              <div className="price-tag-simple">Starting at ₹49</div>
              <Link to="/services#laundry" className="btn btn-outline">
                Learn More
              </Link>
            </div>

            {/*  Service Card 4: Scrap Recycling  */}
            <div className="service-card">
              <div className="service-image-wrapper">
                <img
                  src="/assets/images/responsible_recycling.png"
                  alt="Responsible Doorstep Scrap Collection and Recycling"
                />
              </div>
              <div className="service-icon-wrapper">
                <i data-lucide="recycle"></i>
              </div>
              <h3>Scrap Recycling</h3>
              <p>
                Sell your recyclable scrap materials and get instant pickup and
                payment.
              </p>
              <Link
                to="/scrap-booking"
                className="btn btn-secondary"
              >
                <i data-lucide="calendar"></i>
                Book Scrap Pickup
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/*  Service Areas Section  */}
      <section id="service-areas" className="service-areas-section reveal">
        <div className="container">
          <div className="service-areas-container">
            <div className="service-areas-content">
              <h2>Servicing Reliably with Cleaning & Recycling Services</h2>
              <p className="section-desc">
                Our professional team provides doorstep cleaning and recycling
                services.
              </p>

              <div
                className="locations-grid"
                style={{
                  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                }}
              >
                <div className="location-item">
                  <i data-lucide="map-pin"></i> Vijayanagar
                </div>
                <div className="location-item">
                  <i data-lucide="map-pin"></i> Chandra Layout
                </div>
                <div className="location-item">
                  <i data-lucide="map-pin"></i> Attiguppe
                </div>
                <div className="location-item">
                  <i data-lucide="map-pin"></i> Rajajinagar
                </div>
                <div className="location-item">
                  <i data-lucide="map-pin"></i> Rajarajeshwari Nagar
                </div>
              </div>

              <div className="service-areas-cta">
                <p>
                  Looking for cleaning services near you? Contact Blinklean
                  today.
                </p>
                <div className="area-buttons">
                  <a
                    href="https://wa.me/917022803582?text=Hello%20Blinklean%21%20I%20am%20looking%20for%20cleaning%20services%20near%20my%20location."
                    target="_blank"
                    className="btn btn-wa-area"
                  >
                    <i data-lucide="message-circle"></i>
                    Contact Us on WhatsApp
                  </a>
                  <a href="#our-services" className="btn btn-secondary">
                    Explore Our Services
                  </a>
                </div>
              </div>
            </div>

            <div className="service-areas-visual">
              <img
                src="assets/images/service_areas.png"
                alt="Blinklean Service Areas Coverage"
              />
            </div>
          </div>
        </div>
      </section>

      {/*  How Blinklean Works Section  */}
      <section id="how-it-works" className="process-section reveal">
        <div className="container">
          <div className="section-header">
            <h2>How Blinklean Works</h2>
            <p>
              Getting professional cleaning or scrap pickup is simple and
              hassle-free.
            </p>
          </div>

          <div className="process-grid">
            {/*  Step 1  */}
            <div className="process-step">
              <div className="step-icon-box">
                <img
                  src="assets/images/hero_collage.png"
                  alt="Choose a Service"
                />
                <i data-lucide="layout-grid"></i>
                <div className="step-number-badge">1</div>
              </div>
              <h3>Choose a Service</h3>
              <p>
                Browse our services including home cleaning, vehicle cleaning,
                laundry services, and scrap recycling.
              </p>
            </div>

            {/*  Step 2  */}
            <div className="process-step" style={{ transitionDelay: "100ms" }}>
              <div className="step-icon-box">
                <img src="assets/images/contact_us.jpg" alt="Contact Us" />
                <i data-lucide="message-circle"></i>
                <div className="step-number-badge">2</div>
              </div>
              <h3>Contact Us</h3>
              <p>
                Reach out through WhatsApp or our platform to request the
                service you need.
              </p>
            </div>

            {/*  Step 3  */}
            <div className="process-step" style={{ transitionDelay: "200ms" }}>
              <div className="step-icon-box">
                <img src="assets/images/schedule_service.jpg" alt="Schedule" />
                <i data-lucide="calendar"></i>
                <div className="step-number-badge">3</div>
              </div>
              <h3>Schedule the Service</h3>
              <p>
                Our team coordinates with you and schedules the service at your
                convenient time.
              </p>
            </div>

            {/*  Step 4  */}
            <div className="process-step" style={{ transitionDelay: "300ms" }}>
              <div className="step-icon-box">
                <img
                  src="assets/images/office_cleaning.png"
                  alt="Professional Service"
                />
                <i data-lucide="sparkles"></i>
                <div className="step-number-badge">4</div>
              </div>
              <h3>Service Delivered</h3>
              <p>
                Our trained team arrives at your location and completes the
                service efficiently.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/*  Why Customers Trust Blinklean Section  */}
      <section id="trust" className="trust-section reveal">
        <div className="container">
          <div className="trust-header">
            <h2>Why Customers Trust Blinklean</h2>
            <p>
              We are committed to providing reliable, professional, and
              eco-friendly cleaning and recycling services.
            </p>
          </div>

          <div className="trust-grid">
            {/*  Feature 1: Verified Professionals  */}
            <div className="trust-card">
              <div className="trust-image-wrapper">
                <img
                  src="/assets/images/verified_pros.png"
                  alt="Verified Professionals"
                />
              </div>
              <div className="trust-icon-box">
                <i data-lucide="user-check"></i>
              </div>
              <h3>Verified Professionals</h3>
              <p>
                Our team members are trained and verified to provide safe and
                reliable services.
              </p>
            </div>

            {/*  Feature 2: Eco-Friendly Cleaning  */}
            <div className="trust-card">
              <div className="trust-image-wrapper">
                <img
                  src="/assets/images/eco_friendly.png"
                  alt="Eco-Friendly Cleaning"
                />
              </div>
              <div className="trust-icon-box">
                <i data-lucide="leaf"></i>
              </div>
              <h3>Eco-Friendly Cleaning</h3>
              <p>
                We use environmentally friendly cleaning methods and waterless
                vehicle cleaning solutions.
              </p>
            </div>

            {/*  Feature 3: Transparent Process  */}
            <div className="trust-card">
              <div className="trust-image-wrapper">
                <img
                  src="/assets/images/tracking_app.png"
                  alt="Transparent Process"
                />
              </div>
              <div className="trust-icon-box">
                <i data-lucide="clipboard-check"></i>
              </div>
              <h3>Transparent Process</h3>
              <p>
                Customers always know what service they are receiving with clear
                communication.
              </p>
            </div>

            {/*  Feature 4: Doorstep Services  */}
            <div className="trust-card">
              <div className="trust-image-wrapper">
                <img
                  src="/assets/images/doorstep_service.png"
                  alt="Doorstep Services"
                />
              </div>
              <div className="trust-icon-box">
                <i data-lucide="map-pin"></i>
              </div>
              <h3>Doorstep Services</h3>
              <p>
                All services are delivered directly at your location for maximum
                convenience.
              </p>
            </div>

            {/*  Feature 5: Responsible Recycling  */}
            <div className="trust-card">
              <div className="trust-image-wrapper">
                <img
                  src="/assets/images/responsible_recycling.png"
                  alt="Responsible Recycling"
                />
              </div>
              <div className="trust-icon-box">
                <i data-lucide="recycle"></i>
              </div>
              <h3>Responsible Recycling</h3>
              <p>
                Scrap materials are collected responsibly and sent for proper
                recycling.
              </p>
            </div>

            {/*  Feature 6: Customer Support  */}
            <div className="trust-card">
              <div className="trust-image-wrapper">
                <img
                  src="/assets/images/customer_support.png"
                  alt="Customer Support"
                />
              </div>
              <div className="trust-icon-box">
                <i data-lucide="headset"></i>
              </div>
              <h3>Customer Support</h3>
              <p>
                Our team is available to assist customers through WhatsApp and
                online support.
              </p>
            </div>
          </div>

          <div className="trust-reassurance-strip">
            <div className="reassurance-item">
              <i data-lucide="shield-check"></i>
              <span>Background-checked staff</span>
            </div>
            <div className="reassurance-item">
              <i data-lucide="sparkles"></i>
              <span>Premium materials</span>
            </div>
            <div className="reassurance-item">
              <i data-lucide="message-circle"></i>
              <span>WhatsApp Support</span>
            </div>
            <div className="reassurance-item">
              <i data-lucide="award"></i>
              <span>Quality Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/*  Unified Testimonials Section is located below  */}

      {/*  FAQ Section  */}
      <section id="faq" className="faq-section reveal">
        <div className="container">
          <div className="faq-container">
            <div className="section-header">
              <h2
                style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem" }}
              >
                Frequently Asked Questions
              </h2>
              <p>Find answers to common questions about Blinklean services.</p>
            </div>

            <div className="faq-list">
              {faqData.map((faq, index) => (
                <div
                  key={index}
                  className={`faq-item ${activeFaq === index ? "active" : ""}`}
                >
                  <div className="faq-header" onClick={() => toggleFaq(index)}>
                    <h3>{faq.question}</h3>
                    <i data-lucide="chevron-down" className="faq-icon"></i>
                  </div>
                  <div className="faq-content">
                    <div className="faq-content-inner">{faq.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/*  App Promotion Section  */}
      <section id="app-promo" className="app-promo-section reveal">
        <div className="container">
          <div className="app-promo-container">
            <div className="app-promo-content">
              <div
                className="availability-pill"
                style={{
                  background: "rgba(27, 155, 58, 0.1)",
                  color: "#1b9b3a",
                  marginBottom: "16px",
                }}
              >
                MOBILE APP
              </div>
              <h2>
                INDIA'S FIRST AI POWERED <br />
                <span style={{ color: "#2dd4bf" }}>QUICKCLEAN PLATFORM</span>
              </h2>
              <p className="section-desc">
                On-demand home services to empower urban households.
              </p>

              <div className="app-features-list">
                {/*  Feature 1  */}
                <div className="app-feature-item">
                  <i data-lucide="zap"></i>
                  <h4>Easy Service Booking</h4>
                  <p>
                    Book home cleaning, vehicle cleaning, laundry, and scrap
                    recycling services in seconds.
                  </p>
                </div>

                {/*  Feature 2  */}
                <div className="app-feature-item">
                  <i data-lucide="map"></i>
                  <h4>Track Your Service</h4>
                  <p>
                    Monitor the status of your cleaning or recycling request
                    directly from the app.
                  </p>
                </div>

                {/*  Feature 3  */}
                <div className="app-feature-item">
                  <i data-lucide="shield-check"></i>
                  <h4>Secure Payments</h4>
                  <p>
                    Manage payments safely and transparently through the mobile
                    platform.
                  </p>
                </div>

                {/*  Feature 4  */}
                <div className="app-feature-item">
                  <i data-lucide="history"></i>
                  <h4>Service History</h4>
                  <p>
                    Keep track of all your previous cleaning and recycling
                    services in one place.
                  </p>
                </div>
              </div>

              <div className="app-buttons">
                <a href="#" className="btn btn-app-primary">
                  <i data-lucide="download"></i>
                  Get the App (Coming Soon)
                </a>
                <a
                  href="https://wa.me/917022803582"
                  target="_blank"
                  className="btn btn-secondary"
                >
                  <i data-lucide="message-circle"></i>
                  Contact Us on WhatsApp
                </a>
              </div>
            </div>

            <div className="app-visual">
              <img
                src="/assets/images/app_mockup.png"
                alt="Blinklean App Mockup"
              />
              <div className="bg-blob blob-1"></div>
              <div className="bg-blob blob-2"></div>
            </div>
          </div>
        </div>
      </section>

      <section id="trending" className="trending-services reveal">
        <div className="container">
          <div className="trending-header">
            <div className="section-header">
              <div className="trending-tag">
                <i data-lucide="flame"></i> Popular This Week
              </div>
              <h2
                style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem" }}
              >
                Trending Services
              </h2>
              <p>Highly rated services trusted by customers near you.</p>
            </div>
          </div>

          <div className="trending-grid">
            {/*  Bathroom Card  */}
            <div className="trending-card">
              <div className="card-banner">
                <img
                  src="/assets/images/bathroom_cleaning.png"
                  alt="Bathroom Deep Cleaning"
                />
                <div className="trust-badge-container">
                  <div className="trust-badge">
                    <i data-lucide="star"></i> 4.8 (2.4k)
                  </div>
                  <div className="verified-tag">
                    <i data-lucide="shield-check"></i> Verified
                  </div>
                </div>
                <div className="card-status-badge">Trending</div>
              </div>
              <div className="trending-card-body">
                <h3>Bathroom Deep Cleaning</h3>
                <p className="benefit-line">
                  Intensive cleaning for a germ-free bathroom.
                </p>
                <div className="meta-row">
                  <div className="meta-item">
                    <i data-lucide="clock"></i> 90 Mins
                  </div>
                  <div className="meta-item">
                    <i data-lucide="shield"></i> 30-Day Guarantee
                  </div>
                </div>
                <div className="why-book-strip">
                  <ul>
                    <li>Deep tile scrubbing</li>
                    <li>Mirror and glass polishing</li>
                  </ul>
                </div>
                <div className="card-footer">
                  <div className="price-display">
                    <span className="label">Starts at</span>
                    <span className="amount">₹499</span>
                  </div>
                </div>
              </div>
            </div>

            {/*  Kitchen Card  */}
            <div className="trending-card">
              <div className="card-banner">
                <img
                  src="/assets/images/kitchen_deep_cleaning.png"
                  alt="Kitchen Cleaning"
                />
                <div className="trust-badge-container">
                  <div className="trust-badge">
                    <i data-lucide="star"></i> 4.9 (1.8k)
                  </div>
                  <div className="verified-tag">
                    <i data-lucide="shield-check"></i> Verified
                  </div>
                </div>
              </div>
              <div className="trending-card-body">
                <h3>Kitchen Cleaning</h3>
                <p className="benefit-line">
                  Deep degreasing and sanitization of your kitchen.
                </p>
                <div className="why-book-strip">
                  <ul>
                    <li>Chimney & Exhaust care</li>
                    <li>Cabinet degreasing</li>
                  </ul>
                </div>
                <div className="card-footer">
                  <div className="price-display">
                    <span className="label">Starts at</span>
                    <span className="amount">₹1,299</span>
                  </div>
                </div>
              </div>
            </div>

            {/*  Sofa Card  */}
            <div className="trending-card">
              <div className="card-banner">
                <img
                  src="/assets/images/sofa_cleaning.png"
                  alt="Sofa Spa Cleaning"
                />
                <div className="trust-badge-container">
                  <div className="trust-badge">
                    <i data-lucide="star"></i> 4.7 (3.1k)
                  </div>
                  <div className="verified-tag">
                    <i data-lucide="shield-check"></i> Verified
                  </div>
                </div>
              </div>
              <div className="trending-card-body">
                <h3>Sofa Spa Cleaning</h3>
                <p className="benefit-line">
                  Premium shampooing and stain removal for sofas.
                </p>
                <div className="why-book-strip">
                  <ul>
                    <li>Fabric rejuvenating</li>
                    <li>Stain removal expert</li>
                  </ul>
                </div>
                <div className="card-footer">
                  <div className="price-display">
                    <span className="label">Starts at</span>
                    <span className="amount">₹599</span>
                  </div>
                </div>
              </div>
            </div>

            {/*  Dry Cleaning Card  */}
            <div className="trending-card">
              <div className="card-banner">
                <img
                  src="/assets/images/dry_cleaning.png"
                  alt="Premium Dry Cleaning"
                />
                <div className="trust-badge-container">
                  <div className="trust-badge">
                    <i data-lucide="star"></i> 4.9 (1.2k)
                  </div>
                  <div className="verified-tag">
                    <i data-lucide="shield-check"></i> Verified
                  </div>
                </div>
              </div>
              <div className="trending-card-body">
                <h3>Premium Dry Cleaning</h3>
                <p className="benefit-line">
                  Professional care for your delicate clothes.
                </p>
                <div className="why-book-strip">
                  <ul>
                    <li>Eco-friendly chemicals</li>
                    <li>Safe for delicate fabrics</li>
                  </ul>
                </div>
                <div className="card-footer">
                  <div className="price-display">
                    <span className="label">Starts at</span>
                    <span className="amount">₹149</span>
                  </div>
                </div>
              </div>
            </div>

            {/*  Premium Polish Card  */}
            <div className="trending-card">
              <div className="card-banner">
                <img
                  src="/assets/images/premium_polish.png"
                  alt="Premium Car Polish"
                />
                <div className="trust-badge-container">
                  <div className="trust-badge">
                    <i data-lucide="star"></i> 4.8 (950)
                  </div>
                  <div className="verified-tag">
                    <i data-lucide="shield-check"></i> Verified
                  </div>
                </div>
              </div>
              <div className="trending-card-body">
                <h3>Premium Car Polish</h3>
                <p className="benefit-line">
                  Ultimate shine and protection for your car.
                </p>
                <div className="meta-row">
                  <div className="meta-item">
                    <i data-lucide="clock"></i> 3 Hours
                  </div>
                  <div className="meta-item">
                    <i data-lucide="sparkles"></i> Wax Finish
                  </div>
                </div>
                <div className="card-footer">
                  <div className="price-display">
                    <span className="label">Starts at</span>
                    <span className="amount">₹699</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="subscriptions" className="smart-care-section">
        <div className="container care-plans-container">
          <div className="section-header">
            <span className="ai-badge">MEMBERSHIP</span>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "2.5rem",
                marginTop: "10px",
              }}
            >
              Smart Care Plans
            </h2>
            <p>
              Save more with regular maintenance plans designed for your
              lifestyle.
            </p>
          </div>

          {/*  Smart Decision Helper  */}
          <div className="plan-helper">
            <label>Who is this for?</label>
            <div className="helper-options">
              <button
                className="helper-btn active"
                onClick={() => highlightPlan("all")}
              >
                Everyone
              </button>
              <button
                className="helper-btn"
                onClick={() => highlightPlan("bike")}
              >
                Daily Riders
              </button>
              <button
                className="helper-btn"
                onClick={() => highlightPlan("car")}
              >
                Daily Drivers
              </button>
              <button
                className="helper-btn"
                onClick={() => highlightPlan("home")}
              >
                Busy Families
              </button>
            </div>
          </div>

          <div className="care-grid">
            {/*  ₹₹ BIKE CARE PLAN  */}
            <div className="care-card" id="plan-bike">
              <div className="card-image-wrapper">
                <img src="/assets/images/motorbike_wash.png" alt="Bike Care" />
                <span className="card-badge">Essential</span>
              </div>
              <div className="card-content">
                <h3>Bike Care Plan</h3>
                <div className="price-box">
                  <span className="price-amount">₹299</span>
                  <span className="price-period">/month</span>
                  <div className="savings-highlight">
                    <i data-lucide="trending-down"></i> Save up to 20%
                  </div>
                </div>
                <div className="why-book-strip" style={{ marginTop: "20px" }}>
                  <ul>
                    <li>2 Premium Foam Washes</li>
                    <li>Chain Cleaning & Lube</li>
                    <li>Full Body Polish</li>
                  </ul>
                </div>
              </div>
            </div>

            {/*  ₹₹ CAR CARE PLAN (FEATURED)  */}
            <div className="care-card featured" id="plan-car">
              <div className="card-image-wrapper">
                <img
                  src="/assets/images/car_exterior_wash.png"
                  alt="Car Care"
                />
                <span className="card-badge popular">Most Popular</span>
              </div>
              <div className="card-content">
                <h3>Car Care Plan</h3>
                <div className="price-box">
                  <span className="price-amount">₹799</span>
                  <span className="price-period">/month</span>
                  <div className="savings-highlight">
                    <i data-lucide="trending-down"></i> Best Value - 30% Off
                  </div>
                </div>
                <div className="why-book-strip" style={{ marginTop: "20px" }}>
                  <ul>
                    <li>2 Full Interior Details</li>
                    <li>Weekly Exterior Wash</li>
                    <li>Tire & Dashboard Polish</li>
                  </ul>
                </div>
              </div>
            </div>

            {/*  ₹₹ PREMIUM HOME CARE PLAN  */}
            <div className="care-card" id="plan-home">
              <div className="card-image-wrapper">
                <img src="/assets/images/gen_home.png" alt="Home Care" />
                <span className="card-badge">All-In-One</span>
              </div>
              <div className="card-content">
                <h3>Home Care Membership</h3>
                <div className="price-box">
                  <span className="price-amount">₹1,999</span>
                  <span className="price-period">/month</span>
                  <div className="savings-highlight">
                    <i data-lucide="trending-down"></i> Save ₹500+ monthly
                  </div>
                </div>
                <div className="why-book-strip" style={{ marginTop: "20px" }}>
                  <ul>
                    <li>1 Full Deep Cleaning</li>
                    <li>2 Pest Control Sessions</li>
                    <li>Priority Booking Access</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <p className="comparison-note">
            Individual bookings cost significantly more.
            <strong>Join 5,000+ members</strong> saving time and money.
          </p>
        </div>
      </section>

      <section
        id="scrap"
        className="scrap-promo-section"
        style={{ background: "#f8fafc", padding: "100px 0" }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "60px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: "1", minWidth: "300px" }}>
            <span
              className="ai-badge"
              style={{ background: "#e0f2fe", color: "#009ee3" }}
            >
              MONETIZE WASTE
            </span>
            <h2
              style={{
                fontSize: "2.5rem",
                margin: "20px 0",
                color: "var(--primary)",
              }}
            >
              Turn Your Scrap into Cash
            </h2>
            <p
              style={{
                fontSize: "1.1rem",
                color: "var(--text-muted)",
                marginBottom: "30px",
                lineHeight: "1.6",
              }}
            >
              Why throw it away when you can get paid? Schedule a pickup for
              newspapers, plastic, metal, and electronic waste. Our verified
              agents collect it from your doorstep and pay you instantly.
            </p>
            <ul
              style={{ listStyle: "none", padding: "0", marginBottom: "40px" }}
            >
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "15px",
                  fontWeight: "500",
                }}
              >
                <i data-lucide="check-circle" style={{ color: "#22c55e" }}></i>{" "}
                Daily Market Rates
              </li>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "15px",
                  fontWeight: "500",
                }}
              >
                <i data-lucide="check-circle" style={{ color: "#22c55e" }}></i>{" "}
                Digital Weighing Scales
              </li>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "15px",
                  fontWeight: "500",
                }}
              >
                <i data-lucide="check-circle" style={{ color: "#22c55e" }}></i>{" "}
                Instant Cash/UPI Payment
              </li>
            </ul>
            <Link
              to="/scrap-booking"
              className="btn btn-primary"
              style={{
                padding: "16px 40px",
                fontSize: "1.1rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <i data-lucide="calendar"></i>
              Book Pickup Now
            </Link>
          </div>
          <div
            style={{
              flex: "1",
              minWidth: "300px",
              background: "white",
              padding: "30px",
              borderRadius: "20px",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.05)",
              border: "1px solid #f1f5f9",
            }}
          >
            <h4 style={{ marginBottom: "20px", color: "var(--secondary)" }}>
              Top Accepted Materials
            </h4>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              <div
                style={{
                  paddingBottom: "10px",
                  borderBottom: "1px solid #f1f5f9",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <i
                  data-lucide="check-circle"
                  style={{ color: "#22c55e", width: "18px" }}
                ></i>
                <span>Newspaper & Paper Waste</span>
              </div>
              <div
                style={{
                  paddingBottom: "10px",
                  borderBottom: "1px solid #f1f5f9",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <i
                  data-lucide="check-circle"
                  style={{ color: "#22c55e", width: "18px" }}
                ></i>
                <span>Hard & Soft Plastics</span>
              </div>
              <div
                style={{
                  paddingBottom: "10px",
                  borderBottom: "1px solid #f1f5f9",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <i
                  data-lucide="check-circle"
                  style={{ color: "#22c55e", width: "18px" }}
                ></i>
                <span>Cardboard & Packaging</span>
              </div>
              <div
                style={{
                  paddingBottom: "10px",
                  borderBottom: "1px solid #f1f5f9",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <i
                  data-lucide="check-circle"
                  style={{ color: "#22c55e", width: "18px" }}
                ></i>
                <span>Iron, Copper, Aluminum & Metals</span>
              </div>
              <div
                style={{
                  paddingBottom: "10px",
                  borderBottom: "1px solid #f1f5f9",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <i
                  data-lucide="check-circle"
                  style={{ color: "#22c55e", width: "18px" }}
                ></i>
                <span>Electronic Waste</span>
              </div>
            </div>
            <p
              style={{
                fontSize: "0.8rem",
                color: "var(--text-muted)",
                marginTop: "15px",
              }}
            >
              * Best market prices determined at pickup based on current
              recycling rates.
            </p>
              <div style={{ marginTop: "30px", textAlign: "center" }}>
              <Link
                to="/scrap-booking"
                className="btn btn-primary"
                style={{ padding: "12px 30px", borderRadius: "12px" }}
              >
                <i data-lucide="calendar" style={{ marginRight: "8px" }}></i>
                Start Recycling Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="testimonials-premium-section">
        <div className="container">
          <div className="section-header">
            <p className="trust-micro-text">
              Verified reviews • Genuine feedback
            </p>
            <h2>Trusted by Thousands of Happy Customers</h2>
            <p>
              Real experiences from people who rely on Blinklean every day for
              their home and vehicle care across Karnataka.
            </p>
          </div>

          <div className="testimonials-premium-grid">
            {/*  Review 1  */}
            <div className="premium-testimonial-card">
              <div className="user-profile">
                <div className="user-photo-wrapper">
                  <img
                    src="assets/images/verified_pros.png"
                    alt="Mahesh Gowda"
                    className="user-photo"
                  />
                  <div className="verified-badge">
                    <i data-lucide="check"></i>
                  </div>
                </div>
                <div className="user-details">
                  <h4>Mahesh Gowda</h4>
                  <span className="user-meta">
                    Verified Customer • Vijayanagar
                  </span>
                </div>
              </div>
              <div className="premium-rating">
                <i data-lucide="star"></i>
                <i data-lucide="star"></i>
                <i data-lucide="star"></i>
                <i data-lucide="star"></i>
                <i data-lucide="star"></i>
              </div>
              <p className="premium-review-text">
                “The bathroom cleaning service was excellent. The team arrived
                on time and left the space spotless. Highly recommend!”
              </p>
              <div className="premium-service-badge">
                <i data-lucide="home"></i>
                <span>Bathroom Cleaning</span>
              </div>
              <div className="review-trust-markers">
                <div className="marker">
                  <i data-lucide="check-circle"></i> On-Time Service
                </div>
                <div className="marker">
                  <i data-lucide="shield-check"></i> Quality Assured
                </div>
              </div>
            </div>

            {/*  Review 2  */}
            <div className="premium-testimonial-card featured">
              <div className="user-profile">
                <div className="user-photo-wrapper">
                  <img
                    src="assets/images/customer_support.png"
                    alt="Sowmya Reddy"
                    className="user-photo"
                  />
                  <div className="verified-badge">
                    <i data-lucide="check"></i>
                  </div>
                </div>
                <div className="user-details">
                  <h4>Sowmya Reddy</h4>
                  <span className="user-meta">
                    Diamond Member • Chandra Layout
                  </span>
                </div>
              </div>
              <div className="premium-rating">
                <i data-lucide="star"></i>
                <i data-lucide="star"></i>
                <i data-lucide="star"></i>
                <i data-lucide="star"></i>
                <i data-lucide="star"></i>
              </div>
              <p className="premium-review-text">
                “Very professional and affordable. Booking was simple and the
                results were amazing. Will definitely book again for my monthly
                maintenance.”
              </p>
              <div className="premium-service-badge">
                <i data-lucide="sparkles"></i>
                <span>Deep Cleaning</span>
              </div>
              <div className="review-trust-markers">
                <div className="marker">
                  <i data-lucide="check-circle"></i> Service as Promised
                </div>
                <div className="marker">
                  <i data-lucide="shield-check"></i> Verified Booking
                </div>
              </div>
            </div>

            {/*  Review 3  */}
            <div className="premium-testimonial-card">
              <div className="user-profile">
                <div className="user-photo-wrapper">
                  <img
                    src="assets/images/verified_pros.png"
                    alt="Ananth Kumar"
                    className="user-photo"
                  />
                  <div className="verified-badge">
                    <i data-lucide="check"></i>
                  </div>
                </div>
                <div className="user-details">
                  <h4>Ananth Kumar</h4>
                  <span className="user-meta">
                    Verified Customer • Rajajinagar
                  </span>
                </div>
              </div>
              <div className="premium-rating">
                <i data-lucide="star"></i>
                <i data-lucide="star"></i>
                <i data-lucide="star"></i>
                <i data-lucide="star"></i>
                <i data-lucide="star"></i>
              </div>
              <p className="premium-review-text">
                “Car cleaning service was quick and thorough. The team was
                polite and used high-quality products. 5-stars for the
                eco-friendly approach!”
              </p>
              <div className="premium-service-badge">
                <i data-lucide="car-front"></i>
                <span>Car Detailing</span>
              </div>
              <div className="review-trust-markers">
                <div className="marker">
                  <i data-lucide="check-circle"></i> On-Time Service
                </div>
                <div className="marker">
                  <i data-lucide="star-half"></i> Highly Rated
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="community-initiatives"
        className="community-initiatives-section"
        style={{ padding: "100px 0", backgroundColor: "#f8fafc" }}
      >
        <div className="container">
          <div
            className="section-header"
            style={{ textAlign: "center", marginBottom: "60px" }}
          >
            <span
              className="ai-badge"
              style={{ background: "rgba(34, 197, 94, 0.1)", color: "#16a34a" }}
            >
              COMMUNITY FIRST
            </span>
            <h2
              style={{
                fontSize: "2.5rem",
                color: "var(--primary)",
                margin: "20px 0",
                fontWeight: "800",
                letterSpacing: "-1px",
              }}
            >
              Our Green Initiatives
            </h2>
            <p
              style={{
                fontSize: "1.15rem",
                color: "var(--text-muted)",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              Join the Blinklean movement to recycle responsibly and protect our
              environment for future generations.
            </p>
          </div>

          <div 
            className="community-marquee-wrapper"
            style={{
              overflow: "hidden",
              padding: "20px 0",
              position: "relative",
              width: "100%"
            }}
          >
            <div 
              className="community-marquee-track"
              style={{
                display: "flex",
                gap: "30px",
                width: "max-content",
                animation: "marquee-scroll 40s linear infinite",
              }}
              onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
              onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'running'}
            >
              {[
                "community_branded_1.png", "community6.jpg", "community_branded_2.png", 
                "community7.jpg", "community_branded_3.png", "community5.jpg",
                "community2.jpg"
              ].map((img, idx) => (
                <div
                  key={idx}
                  style={{
                    width: "300px",
                    height: "450px",
                    borderRadius: "24px",
                    overflow: "hidden",
                    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    flexShrink: 0,
                    cursor: "pointer"
                  }}
                  className="initiative-card"
                >
                  <img
                    src={`assets/images/${img}`}
                    alt={`Green Initiative ${idx + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {[
                "community_branded_1.png", "community6.jpg", "community_branded_2.png", 
                "community7.jpg", "community_branded_3.png", "community5.jpg",
                "community2.jpg"
              ].map((img, idx) => (
                <div
                  key={`dup-${idx}`}
                  style={{
                    width: "300px",
                    height: "450px",
                    borderRadius: "24px",
                    overflow: "hidden",
                    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
                    flexShrink: 0
                  }}
                  className="initiative-card"
                >
                  <img
                    src={`assets/images/${img}`}
                    alt={`Green Initiative ${idx + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              ))}
            </div>
            
            <style>{`
              @keyframes marquee-scroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(calc(-330px * 7)); }
              }
              
              .initiative-card:hover {
                transform: scale(1.05) translateY(-10px);
                box-shadow: 0 25px 50px rgba(0, 158, 227, 0.2) !important;
                z-index: 10;
              }

              @media (max-width: 768px) {
                .initiative-card {
                  width: 200px !important;
                  height: 300px !important;
                }
                @keyframes marquee-scroll {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(calc(-230px * 7)); }
                }
              }
            `}</style>
          </div>
        </div>
      </section>

      <section className="download-app-section" id="download-app">
        <div className="container">
          <div className="app-content-wrapper">
            <div className="app-text">
              <span className="ai-badge">MOBILE APP</span>
              <h2
                style={{
                  fontSize: "2.5rem",
                  color: "var(--primary)",
                  marginBottom: "20px",
                  fontWeight: "800",
                  textTransform: "uppercase",
                  lineHeight: "1.1",
                }}
              >
                India's First AI Powered
                <span style={{ color: "var(--accent-teal)" }}>
                  QuickClean
                </span>{" "}
                Platform
              </h2>
              <p
                style={{
                  marginBottom: "25px",
                  fontSize: "1.2rem",
                  color: "var(--text-muted)",
                  fontWeight: "500",
                }}
              >
                On-demand home services to empower urban households.
              </p>

              <div className="app-store-buttons">
                <a href="#" className="app-btn">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/1200px-Google_Play_Store_badge_EN.svg.png"
                    alt="Google Play"
                    style={{ height: "48px" }}
                  />
                </a>
                <a href="#" className="app-btn">
                  <img
                    src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                    alt="App Store"
                    style={{ height: "48px" }}
                  />
                </a>
              </div>

              <div className="app-service-summaries">
                <div className="app-feature-card">
                  <i
                    data-lucide="home"
                    style={{
                      color: "var(--primary)",
                      width: "24px",
                      height: "24px",
                    }}
                  ></i>
                  <div>
                    <h4 style={{ marginBottom: "5px" }}>House Cleaning</h4>
                    <p
                      style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}
                    >
                      Professional deep cleaning and sanitization for your home.
                    </p>
                  </div>
                </div>
                <div className="app-feature-card">
                  <i
                    data-lucide="car"
                    style={{
                      color: "var(--primary)",
                      width: "24px",
                      height: "24px",
                    }}
                  ></i>
                  <div>
                    <h4 style={{ marginBottom: "5px" }}>Vehicle Care</h4>
                    <p
                      style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}
                    >
                      Expert exterior and interior detailing at your doorstep.
                    </p>
                  </div>
                </div>
                <div className="app-feature-card">
                  <i
                    data-lucide="shirt"
                    style={{
                      color: "var(--primary)",
                      width: "24px",
                      height: "24px",
                    }}
                  ></i>
                  <div>
                    <h4 style={{ marginBottom: "5px" }}>Laundry Solutions</h4>
                    <p
                      style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}
                    >
                      Quick and hygienic washing and drying for your clothes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="app-visual">
              <img
                src="/assets/images/app_mockup.png"
                alt="Blinklean App"
                style={{ width: "100%", maxWidth: "450px" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/*  Final CTA Section  */}
      <section id="final-cta" className="final-cta-section reveal">
        <div className="container">
          <div className="final-cta-container">
            <h2>Ready to Experience Professional Cleaning Services?</h2>
            <p className="section-desc">
              Contact Blinklean today and discover reliable home cleaning,
              vehicle cleaning, laundry, and scrap recycling services reliably.
            </p>

            <div className="final-cta-buttons">
              <a
                href="https://wa.me/917022803582"
                target="_blank"
                className="btn btn-final-wa"
              >
                <i
                  data-lucide="message-circle"
                  style={{ color: "#1b9b3a" }}
                ></i>
                Contact Us on WhatsApp
              </a>
              <a href="#our-services" className="btn btn-final-explore">
                <i data-lucide="info"></i>
                Explore Our Services
              </a>
            </div>

            <p className="final-cta-support">
              Our team will respond quickly and help you choose the right
              service.
            </p>
          </div>
        </div>
      </section>

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
                href="https://www.instagram.com/blinklean"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i data-lucide="instagram"></i>
              </a>
              <a
                href="https://www.facebook.com/blinklean"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i data-lucide="facebook"></i>
              </a>
              <a
                href="https://www.linkedin.com/company/blinklean"
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
            <p>&copy; 2026 Blinklean. All rights reserved.</p>
            <div style={{ display: "flex", gap: "20px", fontSize: "0.85rem" }}>
              <Link to="/about" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Privacy Policy</Link>
            </div>
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
          aria-label="Contact us on WhatsApp"
        >
          <i data-lucide="message-circle"></i>
        </a>
      </div>

      {/*  Mobile Bottom Navigation  */}
      <div className="bottom-nav">
        <Link to="/" className="bottom-nav-item active">
          <i data-lucide="home"></i>
          <span>Home</span>
        </Link>
        <Link to="/services" className="bottom-nav-item">
          <i data-lucide="layout-grid"></i>
          <span>Services</span>
        </Link>
        <Link to="/login" className="bottom-nav-item">
          <i data-lucide="log-in"></i>
          <span>Login</span>
        </Link>
      </div>
    </>
  );
};

export default Home;
