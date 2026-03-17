import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";
import FloatingWhatsApp from "../components/FloatingWhatsApp";

const EqualOpportunityPolicy = () => {
  return (
    <>
      <Header />
      
      <div className="policy-hero">
        <div className="container">
          <h1 className="animate-fade-in">Equal Opportunity Policy</h1>
          <p className="animate-fade-in" style={{ animationDelay: '0.2s' }}>Last updated: March 2026</p>
        </div>
      </div>

      <main className="policy-content-section">
        <div className="container">
          <div className="policy-card animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="policy-body">
              <p>
                At Blinklean, we are committed to providing an inclusive and
                respectful workplace where every individual is treated fairly. We
                believe in equal opportunity for all, and we do not tolerate
                discrimination in any form.
              </p>

              <h2>Our Commitment</h2>
              <p>
                Blinklean provides equal employment opportunities to all employees,
                applicants, partners, and stakeholders without discrimination based
                on:
              </p>
              <ul>
                <li>Gender, age, or marital status</li>
                <li>Religion, caste, or community</li>
                <li>Disability or medical condition</li>
                <li>Race, nationality, or language</li>
                <li>Any other status protected under applicable law</li>
              </ul>

              <h2>Fair Hiring & Employment</h2>
              <p>
                We ensure that decisions related to hiring, training, promotion,
                compensation, and work allocation are based on:
              </p>
              <ul>
                <li>Skills, qualifications, and experience</li>
                <li>Work performance and professional conduct</li>
                <li>Business requirements</li>
              </ul>

              <h2>Safe & Respectful Workplace</h2>
              <p>Blinklean maintains a workplace culture that is:</p>
              <ul>
                <li>Professional and respectful</li>
                <li>Free from harassment or bullying</li>
                <li>Supportive of employee growth and development</li>
              </ul>

              <h2>Reporting Concerns</h2>
              <p>
                Any employee or applicant who experiences discrimination or
                harassment can report the issue through our official communication
                channels. Complaints will be handled confidentially and fairly.
              </p>

              <h2>Policy Compliance</h2>
              <p>
                All employees and team members are expected to follow this policy.
                Any violation may lead to disciplinary action as per company rules.
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

export default EqualOpportunityPolicy;
