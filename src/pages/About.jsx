import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";
import FloatingWhatsApp from "../components/FloatingWhatsApp";

const About = () => {
  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, []);

  return (
    <>
      <Header />

      <header className="about-hero">
        <div className="container">
          <h1>Our Story</h1>
          <p>Smart Cleaning & Recycling for a Greener Tomorrow</p>
        </div>
      </header>

      <section className="about-section">
        <div className="container about-grid">
          <div className="about-content">
            <h2>Making Home Services Simple, Safe, and Sustainable.</h2>
            <p>
              Founded with a vision to revolutionize the home service industry,
              Blinklean combines professional expertise with eco-friendly
              practices. We believe that a clean home shouldn't come at the cost
              of the environment.
            </p>
            <p>
              Our team of verified professionals is dedicated to providing
              top-notch cleaning and maintenance services while ensuring minimal
              environmental impact through our smart recycling initiatives.
            </p>

            <div className="mission-vison">
              <div className="mv-card">
                <i data-lucide="target"></i>
                <h3>Our Mission</h3>
                <p>
                  To provide high-quality home services that are accessible,
                  reliable, and environmentally responsible.
                </p>
              </div>
              <div className="mv-card">
                <i data-lucide="eye"></i>
                <h3>Our Vision</h3>
                <p>
                  To become the leading platform for sustainable home care,
                  driving a global shift towards greener living.
                </p>
              </div>
            </div>
          </div>
          <div className="about-image">
            <img
              src="/assets/images/office_cleaning.png"
              alt="About Blinklean"
            />
          </div>
        </div>
      </section>

      <Footer />
      <BottomNav />
      <FloatingWhatsApp />
    </>
  );
};

export default About;
