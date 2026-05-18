import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import "../assets/css/policies-premium.css";
import "../assets/css/contact-premium.css";

const DeleteAccount = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, []);

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!confirmed) {
      setError("Please check the confirmation box to proceed.");
      return;
    }
    setError("");
    setSubmitting(true);
    
    // Simulate secure transmission to our data management endpoint
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="policy-page-wrapper">
      <Header />
      
      <div className="policy-hero">
        <div className="container">
          <h1 className="animate-fade-in">Account & Data Erasure Portal</h1>
          <p className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Request secure permanent deletion of your Blinklean account and historical data
          </p>
        </div>
      </div>

      <main className="policy-content-section">
        <div className="container">
          <div className="policy-card animate-fade-in" style={{ animationDelay: '0.4s', padding: '50px' }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <div style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: "#f0fdf4",
                  border: "2px solid #bbf7d0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 25px",
                  color: "#16a34a"
                }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h2 style={{ color: "#16a34a", fontSize: "2rem", marginBottom: "15px", borderBottom: "none", paddingBottom: 0 }}>
                  Request Submitted!
                </h2>
                <p style={{ fontSize: "1.1rem", lineHeight: "1.8", color: "var(--text-main)", maxWidth: "600px", margin: "0 auto 30px" }}>
                  Your account deletion and data erasure request has been successfully received and queued. Our team will verify the details and complete the permanent deletion of your profile and data within <strong>48 hours</strong>.
                </p>
                <div style={{
                  background: "#f8fafc",
                  borderRadius: "15px",
                  padding: "20px",
                  maxWidth: "500px",
                  margin: "0 auto 30px",
                  textAlign: "left",
                  fontSize: "0.95rem",
                  color: "var(--text-main)",
                  border: "1px solid #e2e8f0"
                }}>
                  <h4 style={{ margin: "0 0 10px", fontSize: "1rem", fontWeight: "700", color: "var(--primary)" }}>What happens next?</h4>
                  <ul style={{ margin: 0, paddingLeft: "20px", lineHeight: "1.6" }}>
                    <li>You will receive a confirmation email once the erasure is complete.</li>
                    <li>You will be automatically signed out from all active app and web sessions.</li>
                    <li>To cancel this request, please contact support@blinklean.com within 12 hours.</li>
                  </ul>
                </div>
                <Link to="/" className="btn btn-primary" style={{ display: "inline-flex", alignItems: "center", height: "50px", borderRadius: "12px", padding: "0 30px", textDecoration: "none", color: "white" }}>
                  Return to Home
                </Link>
              </div>
            ) : (
              <div className="policy-body">
                <p>
                  At Blinklean, we respect your rights over your personal data. In compliance with Google Play Store policies and global privacy standards, you can request the permanent deletion of your account and associated history.
                </p>

                <div style={{
                  background: "#fff5f5",
                  borderLeft: "4px solid #ef4444",
                  padding: "20px",
                  borderRadius: "12px",
                  marginBottom: "30px",
                  color: "#991b1b"
                }}>
                  <h3 style={{ margin: "0 0 10px", fontSize: "1.1rem", fontWeight: "700" }}>⚠️ Crucial Information Regarding Data Deletion</h3>
                  <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "0.95rem", lineHeight: "1.6", listStyleType: "disc" }}>
                    <li><strong>Irreversible Process:</strong> Once processed, your account, bookings, and customer history cannot be restored.</li>
                    <li><strong>Active Bookings:</strong> Any currently scheduled home cleaning, car care, laundry, or recycling bookings will be cancelled.</li>
                    <li><strong>Loyalty & Rewards:</strong> All accumulated discounts, rewards, and credits will be permanently voided.</li>
                    <li><strong>Regulatory Retention:</strong> While personal identifiers are completely purged, transaction records will be retained strictly as required for accounting and tax compliance.</li>
                  </ul>
                </div>

                <form onSubmit={handleSubmit} style={{ marginTop: "20px" }} className="contact-form-elements">
                  <div className="form-row">
                    <div className="form-group">
                      <label style={{ color: "var(--primary)" }}>Registered Email Address</label>
                      <input
                        type="email"
                        placeholder="e.g., alex@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ border: "1px solid #cbd5e1" }}
                      />
                    </div>
                    <div className="form-group">
                      <label style={{ color: "var(--primary)" }}>Registered Phone Number</label>
                      <input
                        type="tel"
                        placeholder="e.g., +91 XXXXX XXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        style={{ border: "1px solid #cbd5e1" }}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label style={{ color: "var(--primary)" }}>Reason for Deletion (Optional)</label>
                    <select
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      style={{
                        padding: "15px 20px",
                        border: "1px solid #cbd5e1",
                        borderRadius: "12px",
                        fontFamily: "inherit",
                        fontSize: "1rem",
                        transition: "all 0.3s ease",
                        background: "white",
                        color: "var(--text-main)"
                      }}
                    >
                      <option value="">Select a reason...</option>
                      <option value="privacy">Privacy concerns</option>
                      <option value="no-longer-needed">No longer need the services</option>
                      <option value="difficult-use">App or Website is too difficult to use</option>
                      <option value="other">Other reason</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ flexDirection: "row", alignItems: "flex-start", gap: "10px", marginTop: "20px" }}>
                    <input
                      type="checkbox"
                      id="confirm-deletion"
                      checked={confirmed}
                      onChange={(e) => setConfirmed(e.target.checked)}
                      required
                      style={{ marginTop: "4px", width: "18px", height: "18px", cursor: "pointer" }}
                    />
                    <label htmlFor="confirm-deletion" style={{ fontWeight: "600", fontSize: "0.95rem", cursor: "pointer", userSelect: "none", color: "var(--text-main)" }}>
                      I understand that this action is irreversible and I request that my Blinklean account, historical services, and all associated personal data be permanently deleted.
                    </label>
                  </div>

                  {error && (
                    <div style={{ color: "#ef4444", marginBottom: "20px", fontWeight: "600", fontSize: "0.95rem" }}>
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={submitting}
                    style={{
                      width: "100%",
                      height: "55px",
                      borderRadius: "15px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      cursor: submitting ? "not-allowed" : "pointer",
                      opacity: submitting ? 0.7 : 1,
                      border: "none",
                      color: "white",
                      fontSize: "1.1rem",
                      fontWeight: "700",
                      background: "var(--primary)",
                      boxShadow: "0 10px 20px rgba(0, 158, 227, 0.2)",
                      marginTop: "20px"
                    }}
                  >
                    {submitting ? "Processing Request..." : "Submit Account Deletion Request"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <BottomNav />
      <FloatingWhatsApp />
    </div>
  );
};

export default DeleteAccount;
