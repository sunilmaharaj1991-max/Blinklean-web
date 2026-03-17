import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";
import FloatingWhatsApp from "../components/FloatingWhatsApp";

const PrivacyPolicy = () => {
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
          <h1 className="animate-fade-in">Privacy Policy</h1>
          <p className="animate-fade-in" style={{ animationDelay: '0.2s' }}>Last updated: March 2026</p>
        </div>
      </div>

      <main className="policy-content-section">
        <div className="container">
          <div className="policy-card animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="policy-body">
              <p>
                At Blinklean, we value your privacy and are committed to protecting
                the personal information you share with us. This Privacy Policy
                explains how we collect, use, store, and safeguard your information
                when you visit our website or use our services.
              </p>

              <h2>1. Information We Collect</h2>
              <p>We may collect the following types of information:</p>
              <ul>
                <li>
                  <strong>Personal Information:</strong> Name, phone number, email
                  address, business name, and service address.
                </li>
                <li>
                  <strong>Service Information:</strong> Details related to cleaning
                  services requested or provided.
                </li>
                <li>
                  <strong>Payment Information:</strong> Transaction details (we do
                  not store card or banking details).
                </li>
                <li>
                  <strong>Technical Information:</strong> IP address, browser type,
                  device information, and website usage data.
                </li>
              </ul>

              <h2>2. How We Use Your Information</h2>
              <p>Your information may be used to:</p>
              <ul>
                <li>Process service bookings and payments</li>
                <li>Communicate service updates, confirmations, and support</li>
                <li>Improve our services and website experience</li>
                <li>Send promotional offers (only with your consent)</li>
                <li>Comply with legal and regulatory requirements</li>
              </ul>

              <h2>3. Information Sharing & Disclosure</h2>
              <p>
                Blinklean does not sell, rent, or trade your personal information.
                We may share information only:
              </p>
              <ul>
                <li>
                  With authorized employees or service partners to fulfill services
                </li>
                <li>
                  With trusted third-party service providers (payment gateways, IT
                  services)
                </li>
                <li>When required by law or government authorities</li>
              </ul>

              <h2>4. Data Security</h2>
              <p>
                We implement reasonable security measures to protect your
                information against unauthorized access, misuse, or disclosure.
                While we strive to protect your data, no online transmission can be
                guaranteed to be 100% secure.
              </p>

              <h2>5. Cookies & Tracking Technologies</h2>
              <p>Our website may use cookies and similar technologies to:</p>
              <ul>
                <li>Enhance website functionality</li>
                <li>Analyze traffic and usage patterns</li>
                <li>Improve user experience</li>
              </ul>
              <p>
                You can choose to disable cookies through your browser settings,
                though some features may not function properly.
              </p>

              <h2>6. Data Retention</h2>
              <p>
                We retain personal information only for as long as necessary to
                fulfill the purposes outlined in this policy or as required by law.
              </p>

              <h2>7. Your Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li>Access, update, or correct your personal information</li>
                <li>
                  Request deletion of your personal data (subject to legal
                  obligations)
                </li>
                <li>Withdraw consent for marketing communications at any time</li>
              </ul>
              <p>
                To exercise these rights, please contact us through our official
                communication channels.
              </p>

              <h2>8. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites. Blinklean is
                not responsible for the privacy practices or content of such
                websites.
              </p>

              <h2>9. Children’s Privacy</h2>
              <p>
                Our services and website are not intended for individuals under the
                age of 18. We do not knowingly collect personal information from
                minors.
              </p>

              <h2>10. Policy Updates</h2>
              <p>
                Blinklean reserves the right to update this Privacy Policy at any
                time. Any changes will be posted on this page with an updated
                effective date.
              </p>

              <h2>11. Contact Us</h2>
              <p>
                If you have any questions or concerns about this Privacy Policy or
                your personal data, please contact us via the details mentioned on
                our website.
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

export default PrivacyPolicy;
