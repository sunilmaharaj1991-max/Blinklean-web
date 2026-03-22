import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";
import FloatingWhatsApp from "../components/FloatingWhatsApp";

const Home = () => {
  const { t } = useTranslation();
  const [activeFaq, setActiveFaq] = useState(null);
  const [heroOpacity, setHeroOpacity] = useState(1);

  // Hero Scroll Logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
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
  }, []);

  const faqData = [
    {
      question: t('home.faq.q1'),
      answer: t('home.faq.a1'),
    },
    {
      question: t('home.faq.q2'),
      answer: t('home.faq.a2'),
    },
    {
      question: t('home.faq.q3'),
      answer: t('home.faq.a3'),
    },
    {
      question: t('home.faq.q4'),
      answer: t('home.faq.a4'),
    },
    {
      question: t('home.faq.q5'),
      answer: t('home.faq.a5'),
    },
  ];

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  useEffect(() => {
    // Initialize icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, []);

  const checkServiceArea = () => {
    const pincode = document.getElementById("pincode").value;
    const result = document.getElementById("pincode-result");
    const supportedCodes = {
      "573201": "Hassan",
      "573202": "Hassan",
      "522237": "Amaravathi, AP",
      "522002": "Amaravathi, AP",
      "534001": "Eluru, AP",
      "534002": "Eluru, AP",
      "534005": "Eluru, AP",
      "534006": "Eluru, AP",
      "534007": "Eluru, AP"
    };

    if (pincode.length === 6) {
      if (supportedCodes[pincode]) {
        result.innerText = t('home.hero.service_available', { area: supportedCodes[pincode] });
        result.style.color = "#1B9B3A";
      } else {
        result.innerText = t('home.hero.service_not_available');
        result.style.color = "#ef4444";
      }
    } else {
      result.innerText = t('home.hero.invalid_pincode');
      result.style.color = "#ef4444";
    }
  };

  const highlightPlan = () => {
    // Simplified logic for now
  };
  return (
    <>
      {/* Generated JSX from HTML */}

      <Header />

      <header className="hero-premium">
        <div className="container hero-container-centered">
          <div className="hero-stats-row reveal delay-300">
            <div className="stat-item">
              <span className="stat-value">12k+</span>
              <span className="stat-label">{t('home.hero.avg_rating')}</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-value">25k+</span>
              <span className="stat-label">{t('home.hero.happy_customers')}</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-value">100%</span>
              <span className="stat-label">{t('home.hero.verified_pros')}</span>
            </div>
          </div>
          <div className="availability-pill">
            <i data-lucide="map-pin"></i>
            <span>{t('home.hero.pill')}</span>
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
            {t('home.hero.h1_line1')} <span style={{ color: "var(--primary)" }}>{t('home.hero.h1_ai')}</span>
            <br />
            {t('home.hero.h1_line2')}
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
            {t('home.hero.tagline')}
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
            {t('home.hero.subtext')}
          </p>

          <div className="hero-cta-buttons">
            <Link to="/services" className="btn btn-primary btn-lg">
              <i data-lucide="sparkles"></i>
              {t('home.hero.explore_services')}
            </Link>
            <Link
              to="/scrap-booking"
              className="btn btn-secondary btn-lg"
            >
              <i data-lucide="shopping-basket"></i>
              {t('home.hero.sell_scrap')}
            </Link>
          </div>

          <div className="hero-pincode-checker-centered">
            <input
              type="text"
              placeholder={t('home.hero.pincode_placeholder')}
              id="pincode"
            />
            <button onClick={() => checkServiceArea()}>
              {t('home.hero.check_availability')}
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
          <div className="key-stats-grid">
            <div className="key-stat-card">
              <div className="stat-icon">
                <i data-lucide="check-circle"></i>
              </div>
              <div className="stat-info">
                <h3>{t('home.stats.completed_count')}</h3>
                <p>{t('home.stats.completed')}</p>
              </div>
            </div>
            <div className="key-stat-card">
              <div className="stat-icon">
                <i data-lucide="users"></i>
              </div>
              <div className="stat-info">
                <h3>{t('home.stats.staff_count')}</h3>
                <p>{t('home.stats.staff')}</p>
              </div>
            </div>
            <div className="key-stat-card">
              <div className="stat-icon">
                <i data-lucide="leaf"></i>
              </div>
              <div className="stat-info">
                <h3>{t('home.stats.eco_count')}</h3>
                <p>{t('home.stats.eco')}</p>
              </div>
            </div>
            <div className="key-stat-card">
              <div className="stat-icon">
                <i data-lucide="shield-check"></i>
              </div>
              <div className="stat-info">
                <h3>{t('home.stats.secure_label')}</h3>
                <p>{t('home.stats.secure')}</p>
              </div>
            </div>
            <div className="key-stat-card highlight">
              <div className="stat-icon">
                <i data-lucide="star"></i>
              </div>
              <div className="stat-info">
                <h3>{t('home.stats.premium_label')}</h3>
                <p>{t('home.stats.premium')}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/*  Our Professional Services Section  */}
      <section id="our-services" className="our-services-section reveal">
        <div className="container">
          <div className="section-header reveal">
            <h2 className="section-title">{t('home.services.title')}</h2>
            <p className="section-subtitle">
              {t('home.services.subtitle')}
            </p>
          </div>

          <div className="services-grid">
            {/* Home Cleaning */}
            <div className="service-card reveal">
              <div className="service-image-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6954?auto=format&fit=crop&w=800&q=80"
                  alt="Home Cleaning"
                />
                <div className="price-tag-simple">
                  {t('home.services.starting_at')} ₹299
                </div>
              </div>
              <div className="service-content">
                <div className="service-icon-wrapper">
                  <i data-lucide="home"></i>
                </div>
                <h3>{t('home.services.home_cleaning')}</h3>
                <p>
                  {t('home.services.home_desc')}
                </p>
                <Link to="/home-cleaning" className="btn btn-outline">
                  {t('home.services.learn_more')} <i data-lucide="arrow-right"></i>
                </Link>
              </div>
            </div>

            {/* Vehicle Cleaning */}
            <div className="service-card reveal delay-100">
              <div className="service-image-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80"
                  alt="Vehicle Cleaning"
                />
                <div className="price-tag-simple">
                  {t('home.services.starting_at')} ₹149
                </div>
              </div>
              <div className="service-content">
                <div className="service-icon-wrapper">
                  <i data-lucide="car"></i>
                </div>
                <h3>{t('home.services.vehicle_cleaning')}</h3>
                <p>
                  {t('home.services.vehicle_desc')}
                </p>
                <Link to="/vehicle-cleaning" className="btn btn-outline">
                  {t('home.services.learn_more')} <i data-lucide="arrow-right"></i>
                </Link>
              </div>
            </div>

            {/* Laundry */}
            <div className="service-card reveal delay-200">
              <div className="service-image-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1545173153-5dd9a739679c?auto=format&fit=crop&w=800&q=80"
                  alt="Laundry Services"
                />
                <div className="price-tag-simple">
                  {t('home.services.starting_at')} ₹9/KG
                </div>
              </div>
              <div className="service-content">
                <div className="service-icon-wrapper">
                  <i data-lucide="washing-machine"></i>
                </div>
                <h3>{t('home.services.laundry')}</h3>
                <p>
                  {t('home.services.laundry_desc')}
                </p>
                <Link to="/laundry" className="btn btn-outline">
                  {t('home.services.learn_more')} <i data-lucide="arrow-right"></i>
                </Link>
              </div>
            </div>

            {/* Scrap */}
            <div className="service-card reveal delay-300">
              <div className="service-image-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80"
                  alt="Scrap Recycling"
                />
                <div className="price-tag-simple highlight">{t('home.services.top_rates')}</div>
              </div>
              <div className="service-content">
                <div className="service-icon-wrapper">
                  <i data-lucide="recycle"></i>
                </div>
                <h3>{t('home.services.scrap')}</h3>
                <p>
                  {t('home.services.scrap_desc')}
                </p>
                <Link to="/scrap-booking" className="btn btn-primary">
                  {t('home.services.book_pickup')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*  Service Areas Section  */}
      <section id="service-areas" className="service-areas-section reveal">
        <div className="container">
          <div className="service-areas-container">
            <div className="service-areas-content">
              <h2>{t('home.areas.title')}</h2>
              <p className="section-desc">
                {t('home.areas.desc')}
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
                <div className="location-item">
                  <i data-lucide="map-pin"></i> Hassan
                </div>
                <div className="location-item">
                  <i data-lucide="map-pin"></i> Amaravathi (AP)
                </div>
              </div>

              <div className="service-areas-cta">
                <p>
                  {t('home.areas.cta')}
                </p>
                <div className="area-buttons">
                  <a
                    href="https://wa.me/917022803582?text=Hello%20Blinklean%21%20I%20am%20looking%20for%20cleaning%20services%20near%20my%20location."
                    target="_blank"
                    className="btn btn-wa-area"
                  >
                    <i data-lucide="message-circle"></i>
                    {t('home.areas.whatsapp_cta')}
                  </a>
                  <a href="#our-services" className="btn btn-secondary">
                    {t('home.hero.explore_services')}
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
            <h2>{t('home.process.title')}</h2>
            <p>
              {t('home.process.subtitle')}
            </p>
          </div>

          <div className="process-grid">
            {/* Step 1 */}
            <div className="process-step">
              <div className="step-icon-box">
                <img
                   src="https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&w=400&q=80"
                  alt="Choose a Service"
                />
                <i data-lucide="layout-grid"></i>
                <div className="step-number-badge">1</div>
              </div>
              <h3>{t('home.process.step1_title')}</h3>
              <p>
                {t('home.process.step1_desc')}
              </p>
            </div>

            {/* Step 2 */}
            <div className="process-step" style={{ transitionDelay: "100ms" }}>
              <div className="step-icon-box">
                <img
                   src="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?auto=format&fit=crop&w=400&q=80"
                  alt="Contact Us"
                />
                <i data-lucide="message-circle"></i>
                <div className="step-number-badge">2</div>
              </div>
              <h3>{t('home.process.step2_title')}</h3>
              <p>
                {t('home.process.step2_desc')}
              </p>
            </div>

            {/* Step 3 */}
            <div className="process-step" style={{ transitionDelay: "200ms" }}>
              <div className="step-icon-box">
                <img
                   src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=400&q=80"
                  alt="Schedule"
                />
                <i data-lucide="calendar"></i>
                <div className="step-number-badge">3</div>
              </div>
              <h3>{t('home.process.step3_title')}</h3>
              <p>
                {t('home.process.step3_desc')}
              </p>
            </div>

            {/* Step 4 */}
            <div className="process-step" style={{ transitionDelay: "300ms" }}>
              <div className="step-icon-box">
                <img
                   src="https://images.unsplash.com/photo-1527515545081-5db817172677?auto=format&fit=crop&w=400&q=80"
                  alt="Service Delivered"
                />
                <i data-lucide="sparkles"></i>
                <div className="step-number-badge">4</div>
              </div>
              <h3>{t('home.process.step4_title')}</h3>
              <p>
                {t('home.process.step4_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>
      {/*  Why Customers Trust Blinklean Section  */}
      <section id="trust" className="trust-section reveal">
        <div className="container">
          <div className="trust-header">
            <h2>{t('home.trust.title')}</h2>
            <p>
              {t('home.trust.subtitle')}
            </p>
          </div>

          <div className="trust-grid">
            <div className="trust-card">
              <div className="trust-icon-box">
                <i data-lucide="user-check"></i>
              </div>
              <h3>{t('home.trust.card1_title')}</h3>
              <p>{t('home.trust.card1_desc')}</p>
            </div>
            <div className="trust-card">
              <div className="trust-icon-box">
                <i data-lucide="leaf"></i>
              </div>
              <h3>{t('home.trust.card2_title')}</h3>
              <p>{t('home.trust.card2_desc')}</p>
            </div>
            <div className="trust-card">
              <div className="trust-icon-box">
                <i data-lucide="clipboard-check"></i>
              </div>
              <h3>{t('home.trust.card3_title')}</h3>
              <p>{t('home.trust.card3_desc')}</p>
            </div>
            <div className="trust-card">
              <div className="trust-icon-box">
                <i data-lucide="map-pin"></i>
              </div>
              <h3>{t('home.trust.card4_title')}</h3>
              <p>{t('home.trust.card4_desc')}</p>
            </div>
            <div className="trust-card">
              <div className="trust-icon-box">
                <i data-lucide="recycle"></i>
              </div>
              <h3>{t('home.trust.card5_title')}</h3>
              <p>{t('home.trust.card5_desc')}</p>
            </div>
            <div className="trust-card">
              <div className="trust-icon-box">
                <i data-lucide="headset"></i>
              </div>
              <h3>{t('home.trust.card6_title')}</h3>
              <p>{t('home.trust.card6_desc')}</p>
            </div>
          </div>

          <div className="trust-reassurance-strip">
            <div className="reassurance-item">
              <i data-lucide="shield-check"></i>
              <span>{t('home.trust.reassurance_staff')}</span>
            </div>
            <div className="reassurance-item">
              <i data-lucide="sparkles"></i>
              <span>{t('home.trust.reassurance_materials')}</span>
            </div>
            <div className="reassurance-item">
              <i data-lucide="message-circle"></i>
              <span>{t('home.trust.reassurance_support')}</span>
            </div>
            <div className="reassurance-item">
              <i data-lucide="award"></i>
              <span>{t('home.trust.reassurance_guarantee')}</span>
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
              {t('home.faq.title')}
            </h2>
            <p>{t('home.faq.subtitle')}</p>
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
                {t('home.app.pill')}
              </div>
              <h2>
                {t('home.app.h2_line1')} <br />
                <span style={{ color: "#2dd4bf" }}>{t('home.app.h2_highlight')}</span>
              </h2>
              <p className="section-desc">
                {t('home.app.desc')}
              </p>

              <div className="app-features-list">
                {/* Feature 1 */}
                <div className="app-feature-item">
                  <i data-lucide="zap"></i>
                  <h4>{t('home.app.feature1_title')}</h4>
                  <p>
                    {t('home.app.feature1_desc')}
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="app-feature-item">
                  <i data-lucide="map"></i>
                  <h4>{t('home.app.feature2_title')}</h4>
                  <p>
                    {t('home.app.feature2_desc')}
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="app-feature-item">
                  <i data-lucide="shield-check"></i>
                  <h4>{t('home.app.feature3_title')}</h4>
                  <p>
                    {t('home.app.feature3_desc')}
                  </p>
                </div>

                {/* Feature 4 */}
                <div className="app-feature-item">
                  <i data-lucide="history"></i>
                  <h4>{t('home.app.feature4_title')}</h4>
                  <p>
                    {t('home.app.feature4_desc')}
                  </p>
                </div>
              </div>

              <div className="app-buttons">
                <a href="#" className="btn btn-app-primary">
                  <i data-lucide="download"></i>
                  {t('home.app.get_app')}
                </a>
                <a
                  href="https://wa.me/917022803582"
                  target="_blank"
                  className="btn btn-secondary"
                >
                  <i data-lucide="message-circle"></i>
                  {t('home.areas.whatsapp_cta')}
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
                <i data-lucide="flame"></i> {t('home.trending.tag')}
              </div>
              <h2
                style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem" }}
              >
                {t('home.trending.title')}
              </h2>
              <p>{t('home.trending.subtitle')}</p>
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
                    <i data-lucide="shield-check"></i> {t('home.trending.verified')}
                  </div>
                </div>
                <div className="card-status-badge">{t('home.trending.trending')}</div>
              </div>
              <div className="trending-card-body">
                <h3>{t('home.trending.bathroom_title')}</h3>
                <p className="benefit-line">
                  {t('home.trending.bathroom_desc')}
                </p>
                <div className="meta-row">
                  <div className="meta-item">
                    <i data-lucide="clock"></i> 90 {t('home.trending.meta_mins')}
                  </div>
                  <div className="meta-item">
                    <i data-lucide="shield"></i> {t('home.trending.meta_guarantee')}
                  </div>
                </div>
                <div className="why-book-strip">
                  <ul>
                    <li>{t('home.trending.benefit_tile')}</li>
                    <li>{t('home.trending.benefit_glass')}</li>
                  </ul>
                </div>
                <div className="card-footer">
                  <div className="price-display">
                    <span className="label">{t('home.trending.starts_at')}</span>
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
                <h3>{t('home.trending.kitchen_title')}</h3>
                <p className="benefit-line">
                  {t('home.trending.kitchen_desc')}
                </p>
                <div className="why-book-strip">
                  <ul>
                    <li>{t('home.trending.benefit_chimney')}</li>
                    <li>{t('home.trending.benefit_cabinet')}</li>
                  </ul>
                </div>
                <div className="card-footer">
                  <div className="price-display">
                    <span className="label">{t('home.trending.starts_at')}</span>
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
                <h3>{t('home.trending.sofa_title')}</h3>
                <p className="benefit-line">
                  {t('home.trending.sofa_desc')}
                </p>
                <div className="why-book-strip">
                  <ul>
                    <li>{t('home.trending.benefit_fabric')}</li>
                    <li>{t('home.trending.benefit_stain')}</li>
                  </ul>
                </div>
                <div className="card-footer">
                  <div className="price-display">
                    <span className="label">{t('home.trending.starts_at')}</span>
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
                <h3>{t('home.trending.dry_cleaning_title')}</h3>
                <p className="benefit-line">
                  {t('home.trending.dry_cleaning_desc')}
                </p>
                <div className="why-book-strip">
                  <ul>
                    <li>{t('home.trending.benefit_eco')}</li>
                    <li>{t('home.trending.benefit_delicate')}</li>
                  </ul>
                </div>
                <div className="card-footer">
                  <div className="price-display">
                    <span className="label">{t('home.trending.starts_at')}</span>
                    <span className="amount">₹149</span>
                  </div>
                </div>
              </div>
            </div>

            {/*  Premium Polish Card  */}
            <div className="trending-card">
              <div className="card-banner">
                <img
                  src="/assets/images/car_exterior_wash.png"
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
                <h3>{t('home.trending.car_polish_title')}</h3>
                <p className="benefit-line">
                  {t('home.trending.car_polish_desc')}
                </p>
                <div className="meta-row">
                  <div className="meta-item">
                    <i data-lucide="clock"></i> 3 {t('home.trending.time_hours')}
                  </div>
                  <div className="meta-item">
                    <i data-lucide="sparkles"></i> {t('home.trending.meta_wax')}
                  </div>
                </div>
                <div className="card-footer">
                  <div className="price-display">
                    <span className="label">{t('home.trending.starts_at')}</span>
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
            <span className="ai-badge">{t('home.subscriptions.badge')}</span>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "2.5rem",
                marginTop: "10px",
              }}
            >
              {t('home.subscriptions.title')}
            </h2>
            <p>
              {t('home.subscriptions.subtitle')}
            </p>
          </div>

          {/*  Smart Decision Helper  */}
          <div className="plan-helper">
            <label>{t('home.subscriptions.helper_label')}</label>
            <div className="helper-options">
              <button
                className="helper-btn active"
                onClick={() => highlightPlan("all")}
              >
                {t('home.subscriptions.helper_everyone')}
              </button>
              <button
                className="helper-btn"
                onClick={() => highlightPlan("bike")}
              >
                {t('home.subscriptions.helper_riders')}
              </button>
              <button
                className="helper-btn"
                onClick={() => highlightPlan("car")}
              >
                {t('home.subscriptions.helper_drivers')}
              </button>
              <button
                className="helper-btn"
                onClick={() => highlightPlan("home")}
              >
                {t('home.subscriptions.helper_families')}
              </button>
            </div>
          </div>

          <div className="care-grid">
            {/*  ₹₹ BIKE CARE PLAN  */}
            <div className="care-card" id="plan-bike">
              <div className="card-image-wrapper">
                <img src="/assets/images/bike_detailing.png" alt="Bike Care" />
                <span className="card-badge">{t('home.subscriptions.essential')}</span>
              </div>
              <div className="card-content">
                <h3>{t('home.subscriptions.bike_title')}</h3>
                <div className="price-box">
                  <span className="price-amount">₹299</span>
                  <span className="price-period">{t('home.subscriptions.per_month')}</span>
                  <div className="savings-highlight">
                    <i data-lucide="trending-down"></i> {t('home.subscriptions.save_up_to')} 20%
                  </div>
                </div>
                <div className="why-book-strip" style={{ marginTop: "20px" }}>
                  <ul>
                    <li>{t('home.subscriptions.benefit_bike1')}</li>
                    <li>{t('home.subscriptions.benefit_bike2')}</li>
                    <li>{t('home.subscriptions.benefit_bike3')}</li>
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
                <span className="card-badge popular">{t('home.subscriptions.most_popular')}</span>
              </div>
              <div className="card-content">
                <h3>{t('home.subscriptions.car_title')}</h3>
                <div className="price-box">
                  <span className="price-amount">₹799</span>
                  <span className="price-period">{t('home.subscriptions.per_month')}</span>
                  <div className="savings-highlight">
                    <i data-lucide="trending-down"></i> {t('home.subscriptions.best_value')}
                  </div>
                </div>
                <div className="why-book-strip" style={{ marginTop: "20px" }}>
                  <ul>
                    <li>{t('home.subscriptions.benefit_car1')}</li>
                    <li>{t('home.subscriptions.benefit_car2')}</li>
                    <li>{t('home.subscriptions.benefit_car3')}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/*  ₹₹ PREMIUM HOME CARE PLAN  */}
            <div className="care-card" id="plan-home">
              <div className="card-image-wrapper">
                <img src="/assets/images/2bhk_cleaning.png" alt="Home Care" />
                <span className="card-badge">{t('home.subscriptions.all_in_one')}</span>
              </div>
              <div className="card-content">
                <h3>{t('home.subscriptions.home_title')}</h3>
                <div className="price-box">
                  <span className="price-amount">₹1,999</span>
                  <span className="price-period">{t('home.subscriptions.per_month')}</span>
                  <div className="savings-highlight">
                    <i data-lucide="trending-down"></i> {t('home.subscriptions.save_monthly')}
                  </div>
                </div>
                <div className="why-book-strip" style={{ marginTop: "20px" }}>
                  <ul>
                    <li>{t('home.subscriptions.benefit_home1')}</li>
                    <li>{t('home.subscriptions.benefit_home2')}</li>
                    <li>{t('home.subscriptions.benefit_home3')}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <p className="comparison-note">
            {t('home.subscriptions.comparison_note')}
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
              {t('home.scrap_promo.badge')}
            </span>
            <h2
              style={{
                fontSize: "2.5rem",
                margin: "20px 0",
                color: "var(--primary)",
              }}
            >
              {t('home.scrap_promo.title')}
            </h2>
            <p
              style={{
                fontSize: "1.1rem",
                color: "var(--text-muted)",
                marginBottom: "30px",
                lineHeight: "1.6",
              }}
            >
              {t('home.scrap_promo.desc')}
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
                {t('home.scrap_promo.rates')}
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
                {t('home.scrap_promo.scales')}
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
                {t('home.scrap_promo.payments')}
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
              {t('home.scrap_promo.book_now')}
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
              {t('home.scrap_promo.materials_title')}
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
                <span>{t('home.scrap_promo.newspaper')}</span>
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
                <span>{t('home.scrap_promo.plastics')}</span>
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
                <span>{t('home.scrap_promo.cardboard')}</span>
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
                <span>{t('home.scrap_promo.metals')}</span>
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
                <span>{t('home.scrap_promo.electronics')}</span>
              </div>
            </div>
            <p
              style={{
                fontSize: "0.8rem",
                color: "var(--text-muted)",
                marginTop: "15px",
              }}
            >
              {t('home.scrap_promo.prices_note')}
            </p>
            <div style={{ marginTop: "30px", textAlign: "center" }}>
              <Link
                to="/scrap-booking"
                className="btn btn-primary"
                style={{ padding: "12px 30px", borderRadius: "12px" }}
              >
                <i data-lucide="calendar" style={{ marginRight: "8px" }}></i>
                {t('home.scrap_promo.start_recycling')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="testimonials-premium-section">
        <div className="container">
          <div className="section-header">
            <p className="trust-micro-text">
              {t('home.testimonials.micro_text')}
            </p>
            <h2>{t('home.testimonials.title')}</h2>
            <p>
              {t('home.testimonials.subtitle')}
            </p>
          </div>

          <div className="testimonials-premium-grid">
            {/*  Review 1  */}
            <div className="premium-testimonial-card">
              <div className="user-profile">
                <div className="user-photo-wrapper">
                  <img
                    src="/assets/images/mahesh_gowda.png"
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
                    {t('home.testimonials.verified_customer')} • Vijayanagar
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
                {t('home.testimonials.review1_text')}
              </p>
              <div className="premium-service-badge">
                <i data-lucide="home"></i>
                <span>Bathroom Cleaning</span>
              </div>
              <div className="review-trust-markers">
                <div className="marker">
                  <i data-lucide="check-circle"></i> {t('home.testimonials.on_time')}
                </div>
                <div className="marker">
                  <i data-lucide="shield-check"></i> {t('home.testimonials.quality')}
                </div>
              </div>
            </div>

            {/*  Review 2  */}
            <div className="premium-testimonial-card featured">
              <div className="user-profile">
                <div className="user-photo-wrapper">
                  <img
                    src="/assets/images/sowmya_reddy.png"
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
                    {t('home.testimonials.diamond_member')} • Chandra Layout
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
                {t('home.testimonials.review2_text')}
              </p>
              <div className="premium-service-badge">
                <i data-lucide="sparkles"></i>
                <span>Deep Cleaning</span>
              </div>
              <div className="review-trust-markers">
                <div className="marker">
                  <i data-lucide="check-circle"></i> {t('home.testimonials.promised')}
                </div>
                <div className="marker">
                  <i data-lucide="shield-check"></i> {t('home.testimonials.verified')}
                </div>
              </div>
            </div>

            {/*  Review 3  */}
            <div className="premium-testimonial-card">
              <div className="user-profile">
                <div className="user-photo-wrapper">
                  <img
                    src="/assets/images/ananth_kumar.png"
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
                    {t('home.testimonials.verified_customer')} • Rajajinagar
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
                {t('home.testimonials.review3_text')}
              </p>
              <div className="premium-service-badge">
                <i data-lucide="car-front"></i>
                <span>Car Detailing</span>
              </div>
              <div className="review-trust-markers">
                <div className="marker">
                  <i data-lucide="check-circle"></i> {t('home.testimonials.on_time')}
                </div>
                <div className="marker">
                  <i data-lucide="star-half"></i> {t('home.testimonials.highly_rated')}
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
              {t('home.community.badge')}
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
              {t('home.community.title')}
            </h2>
            <p
              style={{
                fontSize: "1.15rem",
                color: "var(--text-muted)",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              {t('home.community.desc')}
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
                "community1.jpg",
                "community2.jpg",
                "community3.jpg",
                "community4.jpg",
                "community5.jpg",
                "community6.jpg",
                "community7.jpg"
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
                    src={`/assets/images/${img}`}
                    alt={`Impact Service ${idx + 1}`}
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
                "community1.jpg",
                "community2.jpg",
                "community3.jpg",
                "community4.jpg",
                "community5.jpg",
                "community6.jpg",
                "community7.jpg"
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
                    src={`/assets/images/${img}`}
                    alt={`Impact Service ${idx + 1}`}
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

      <Footer />
      <FloatingWhatsApp />
      <BottomNav />
    </>
  );
};

export default Home;
