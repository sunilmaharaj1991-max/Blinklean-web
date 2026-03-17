import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";
import FloatingWhatsApp from "../components/FloatingWhatsApp";

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
    
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, []);

  return (
    <div className="faq-page">
      <Header />

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

      <Footer />
      <BottomNav />
      <FloatingWhatsApp />
    </div>
  );
};

export default Faq;
