import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";
import FloatingWhatsApp from "../components/FloatingWhatsApp";

const RefundAndCancellationPolicy = () => {
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
          <h1>Refund & Cancellation Policy</h1>
          <p>
            At Blinklean, we strive to provide reliable and professional
            cleaning services. This policy explains the terms for cancellations,
            rescheduling, and refunds.
          </p>

          <h2>1. Cancellation by Customer</h2>
          <ul>
            <li>
              Customers must cancel or reschedule a confirmed service at least 1
              hour before the scheduled service time.
            </li>
            <li>
              Cancellations made less than 1 hour before the service time may
              not be eligible for a refund.
            </li>
            <li>
              Same-time cancellations or no-shows will be treated as service
              availed and are non-refundable.
            </li>
          </ul>

          <h2>2. Cancellation by Blinklean</h2>
          <ul>
            <li>
              Blinklean reserves the right to cancel or reschedule services due
              to unavoidable reasons such as staff unavailability, safety
              issues, weather conditions, or technical problems.
            </li>
            <li>
              In such cases, customers may opt for rescheduling or a full
              refund.
            </li>
          </ul>

          <h2>3. Refund Policy</h2>
          <ul>
            <li>Eligible refunds will be processed only after verification.</li>
            <li>Refunds will be made through the original payment method.</li>
            <li>
              Refund processing may take 7–10 working days, depending on the
              bank or payment gateway.
            </li>
          </ul>

          <h2>4. Partial Refunds</h2>
          <ul>
            <li>
              If a service is partially completed and a valid concern is
              reported within 24 hours, Blinklean may offer a partial refund or
              service redo, at its discretion.
            </li>
            <li>
              No refunds will be issued for satisfactorily completed services.
            </li>
          </ul>

          <h2>5. Non-Refundable Cases</h2>
          <p>Refunds will not be applicable if:</p>
          <ul>
            <li>Cancellation is made within 1 hour of service time</li>
            <li>Customer is unavailable or denies access at the location</li>
            <li>Incorrect address or service details are provided</li>
            <li>
              Water, electricity, or safe working conditions are not provided
            </li>
            <li>
              Dissatisfaction arises due to permanent stains, old damage, or
              normal wear and tear
            </li>
          </ul>

          <h2>6. Packages & Subscriptions</h2>
          <ul>
            <li>
              For prepaid packages or subscriptions, refunds (if any) will be
              calculated on a pro-rata basis after deducting completed services.
            </li>
            <li>
              Subscription cancellations must be requested at least 24 hours in
              advance.
            </li>
          </ul>

          <h2>7. How to Cancel or Request Refund</h2>
          <p>
            Customers must contact Blinklean through official channels with:
          </p>
          <ul>
            <li>Booking reference number</li>
            <li>Scheduled service date & time</li>
            <li>Reason for cancellation or refund request</li>
          </ul>

          <h2>8. Policy Updates</h2>
          <p>
            Blinklean reserves the right to amend this policy at any time.
            Updates will be effective immediately upon posting on the website.
          </p>

          <h2>9. Contact Us</h2>
          <p>
            For questions regarding cancellations or refunds, please contact us
            via the details mentioned on our website.
          </p>
        </section>
      </main>

      <Footer />
      <BottomNav />
      <FloatingWhatsApp />
    </>
  );
};

export default RefundAndCancellationPolicy;
