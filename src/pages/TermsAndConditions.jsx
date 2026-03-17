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

      <main className="policy-container">
        <section>
          <h1>Terms & Conditions</h1>
          <div className="policy-meta">
            <p>Company Name: Blinklean Pvt. Ltd.</p>
            <p>Location: Vijayanagar – 560040</p>
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

          <h2>4. Booking & Payments</h2>
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
        </section>
      </main>

      <Footer />
      <BottomNav />
      <FloatingWhatsApp />
    </>
  );
};

export default TermsAndConditions;
