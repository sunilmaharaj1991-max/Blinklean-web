import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import "../assets/css/contact-premium.css";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="contact-page-wrapper">
      <Header />

      <header className="contact-hero">
        <div className="container">
          <h1 className="animate-fade-in">Get in Touch</h1>
          <p className="animate-fade-in" style={{ animationDelay: "100ms" }}>
            We're here to help you with any questions about professional cleaning or recycling.
          </p>
        </div>
      </header>

      <main className="container contact-grid">
        <div className="contact-info animate-fade-in" style={{ animationDelay: "200ms" }}>
          <h2>Contact Details</h2>
          <div className="info-card">
            <div className="info-icon">
              <Mail size={24} />
            </div>
            <div>
              <h3>Email Us</h3>
              <p>support@blinklean.com</p>
            </div>
          </div>
          <div className="info-card">
            <div className="info-icon">
              <Phone size={24} />
            </div>
            <div>
              <h3>Call Us</h3>
              <p>+91 70228 03582</p>
            </div>
          </div>
          <div className="info-card">
            <div className="info-icon">
              <MapPin size={24} />
            </div>
            <div>
              <h3>Our Head Office</h3>
              <p>Vijayanagar, Bengaluru</p>
              <p style={{ fontSize: "0.85rem", opacity: 0.8 }}>Karnataka - 560040</p>
            </div>
          </div>
        </div>

        <div className="contact-form animate-fade-in" style={{ animationDelay: "300ms" }}>
          <h2>Send us a Message</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-row">
              <div className="form-group">
                <label>Your Name</label>
                <input type="text" placeholder="John Doe" required />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="john@example.com" required />
              </div>
            </div>
            <div className="form-group">
              <label>Subject</label>
              <input type="text" placeholder="How can we help?" required />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea rows="5" placeholder="Your message here..." required></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: "100%", height: "55px", borderRadius: "15px" }}>
              <Send size={18} style={{ marginRight: "10px" }} />
              Send Message
            </button>
          </form>
        </div>
      </main>

      <Footer />
      <BottomNav />
      <FloatingWhatsApp />
    </div>
  );
};

export default Contact;
