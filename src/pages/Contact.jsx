import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";
import FloatingWhatsApp from "../components/FloatingWhatsApp";

const Contact = () => {
  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, []);

  return (
    <>
      <Header />

      <header className="contact-hero">
        <div className="container">
          <h1>Get in Touch</h1>
          <p>We're here to help you with any questions or concerns.</p>
        </div>
      </header>

      <section className="container contact-grid">
        <div className="contact-info">
          <h2>Contact Information</h2>
          <div className="info-card">
            <div className="info-icon">
              <i data-lucide="mail"></i>
            </div>
            <div>
              <h3>Email Us</h3>
              <p>support@Blinklean.com</p>
            </div>
          </div>
          <div className="info-card">
            <div className="info-icon">
              <i data-lucide="phone"></i>
            </div>
            <div>
              <h3>Call Us</h3>
              <p>7022803582</p>
            </div>
          </div>
          <div className="info-card">
            <div className="info-icon">
              <i data-lucide="map-pin"></i>
            </div>
            <div>
              <h3>Our Office</h3>
              <p>Office: Vijayanagar</p>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <h2>Send us a Message</h2>
          <form>
            <div className="form-row">
              <div className="form-group">
                <label>Your Name</label>
                <input type="text" placeholder="John Doe" />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="john@example.com" />
              </div>
            </div>
            <div className="form-group">
              <label>Subject</label>
              <input type="text" placeholder="How can we help?" />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea rows="5" placeholder="Your message here..."></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Send Message
            </button>
          </form>
        </div>
      </section>

      <Footer />
      <BottomNav />
      <FloatingWhatsApp />
    </>
  );
};

export default Contact;
