import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";
import FloatingWhatsApp from "../components/FloatingWhatsApp";

const TermsAndConditions = () => {
  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, []);

  return (
    <>
      <Header />
      
      <div className="policy-hero">
        <div className="container">
          <h1 className="animate-fade-in">Terms & Conditions</h1>
          <p className="animate-fade-in" style={{ animationDelay: '0.2s' }}>Last updated: May 2026</p>
        </div>
      </div>

      <main className="policy-content-section">
        <div className="container">
          <div className="policy-card animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="policy-body">
              <div className="policy-meta" style={{ marginBottom: '30px', padding: '15px', background: '#f0f9ff', borderRadius: '12px', borderLeft: '4px solid var(--primary)' }}>
                <p style={{ margin: 0, fontWeight: '600' }}>Company Name: Blinklean Pvt. Ltd.</p>
                <p style={{ margin: 0, fontWeight: '600' }}>Location: Vijayanagar – 560040</p>
              </div>

              {/* Highlight Box for Razorpay Manual Review Verification */}
              <div style={{
                background: "#f0fdf4",
                border: "1px solid #bbf7d0",
                padding: "25px",
                borderRadius: "15px",
                marginBottom: "35px",
                color: "#166534"
              }}>
                <h3 style={{ margin: "0 0 12px", fontSize: "1.15rem", fontWeight: "700", color: "#166534", borderBottom: "none", paddingBottom: 0 }}>
                  💡 Important Information (Razorpay Gateway Compliance)
                </h3>
                <p style={{ margin: "0 0 15px", fontSize: "0.95rem", lineHeight: "1.6", color: "#166534" }}>
                  For quick reference and in compliance with payment gateway security and customer transparency regulations, the core details regarding billing, transactions, cancellations, and refunds are summarized below:
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "15px" }} className="terms-highlight-grid">
                  <div style={{ background: "white", padding: "18px", borderRadius: "10px", borderLeft: "4px solid #16a34a", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
                    <h4 style={{ margin: "0 0 8px", fontSize: "1.05rem", fontWeight: "700", color: "#15803d" }}>Section 4: Pricing & Payments</h4>
                    <ul style={{ margin: 0, paddingLeft: "15px", fontSize: "0.85rem", lineHeight: "1.5", listStyleType: "disc" }}>
                      <li style={{ paddingLeft: 0, marginBottom: "8px" }}>Payments accepted via debit/credit cards, UPI, net banking, or secure wallets.</li>
                      <li style={{ paddingLeft: 0, marginBottom: 0 }}>Prices are transparently cataloged in the app/website and exclude applicable local service taxes.</li>
                    </ul>
                  </div>
                  <div style={{ background: "white", padding: "18px", borderRadius: "10px", borderLeft: "4px solid #16a34a", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
                    <h4 style={{ margin: "0 0 8px", fontSize: "1.05rem", fontWeight: "700", color: "#15803d" }}>Section 5: Cancellation & Refunds</h4>
                    <ul style={{ margin: 0, paddingLeft: "15px", fontSize: "0.85rem", lineHeight: "1.5", listStyleType: "disc" }}>
                      <li style={{ paddingLeft: 0, marginBottom: "8px" }}>Cancellations requested at least 1 hour before scheduled time receive a full 100% refund.</li>
                      <li style={{ paddingLeft: 0, marginBottom: 0 }}>Verified refunds are automatically processed to the original payment source within 5–7 working days.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h2>1. Introduction</h2>
              <p>
                Welcome to Blinklean. By accessing our website, mobile application,
                or booking our services, you agree to comply with and be bound by
                these Terms & Conditions.
              </p>

              <h2>2. Services Offered</h2>
              <p>Blinklean provides the following services:</p>
              <ul>
                <li>House Cleaning Services</li>
                <li>Vehicle Cleaning Services (Car, Bike, Auto, Cycle)</li>
                <li>Laundry Services</li>
                <li>Scrap Collection & Recycling Services</li>
                <li>Service availability may vary based on location.</li>
              </ul>

              <h2>3. User Responsibilities</h2>
              <ul>
                <li>Provide accurate address and contact details.</li>
                <li>Ensure access to service location at the scheduled time.</li>
                <li>
                  Provide water/electricity if required for cleaning services.
                </li>
                <li>Do not book services for illegal or hazardous activities.</li>
              </ul>

              <h2>4. Pricing & Payments</h2>
              <ul>
                <li>
                  All bookings must be made via the official app/website or
                  authorized representatives.
                </li>
                <li>
                  Payments can be made via UPI, Debit/Credit Card, Net Banking, or
                  Cash (if available).
                </li>
                <li>Prices are subject to change without prior notice.</li>
                <li>Advance payment may be required for certain services.</li>
              </ul>

              <h2>5. Cancellation & Refund Policy</h2>
              <ul>
                <li>Cancellation before 1 hour: Full refund.</li>
                <li>Cancellation after 1 hour: Partial/No refund.</li>
                <li>No refund after service completion.</li>
                <li>
                  Refunds (if applicable) will be processed within 5–7 working days.
                </li>
              </ul>

              <h2>6. Service Warranty & Liability</h2>
              <ul>
                <li>Any service complaint must be reported within 24 hours.</li>
                <li>
                  Blinklean’s liability is limited to the amount paid for the
                  specific service.
                </li>
                <li>We are not responsible for pre-existing damages.</li>
              </ul>

              <h2>7. Safety & Conduct</h2>
              <ul>
                <li>Customers must ensure a safe working environment.</li>
                <li>
                  Any abusive or inappropriate behavior towards staff may result in
                  service termination without refund.
                </li>
              </ul>

              <h2>8. Scrap & Recycling Policy</h2>
              <ul>
                <li>Scrap valuation depends on market rates.</li>
                <li>Payment for scrap will be made after weight verification.</li>
                <li>Illegal or prohibited materials will not be accepted.</li>
              </ul>

              <h2>9. Intellectual Property</h2>
              <ul>
                <li>
                  All logos, branding, app content, and website materials belong to
                  Blinklean and cannot be used without written permission.
                </li>
              </ul>

              <h2>10. Termination</h2>
              <p>
                Blinklean reserves the right to suspend or terminate services in
                case of misuse, fraud, or violation of terms.
              </p>

              <h2>11. Governing Law</h2>
              <p>These Terms shall be governed under the laws of India.</p>
              <p>
                <strong>Jurisdiction:</strong> Courts only.
              </p>

              <h2>12. Updates to Terms</h2>
              <p>
                Blinklean may update these Terms & Conditions at any time. Continued
                use of services implies acceptance of updated terms.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <BottomNav />
      <FloatingWhatsApp />
    </>
  );
};

export default TermsAndConditions;
