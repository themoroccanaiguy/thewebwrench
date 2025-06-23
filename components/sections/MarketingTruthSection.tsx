import React from 'react';

const MarketingTruthSection: React.FC = () => {
  return (
    <>
      <style jsx>{`
        .section {
          position: relative;
          padding: 100px 0;
          background: #ffffff;
          overflow: hidden;
          border-top: 1px solid #e2e8f0;
        }

        .section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(148,163,184,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
          opacity: 0.6;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
          z-index: 2;
        }

        .content {
          text-align: center;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #fef3cd;
          border: 2px solid #f59e0b;
          color: #92400e;
          padding: 8px 20px;
          border-radius: 25px;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 32px;
          animation: pulse 2s infinite;
        }

        .badge::before {
          content: '🚨';
          font-size: 16px;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .main-heading {
          font-size: clamp(2.2rem, 4.5vw, 3.5rem);
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 24px;
          color: #1e293b;
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
        }

        .problem-statement {
          font-size: clamp(1rem, 2.2vw, 1.2rem);
          line-height: 1.7;
          margin-bottom: 20px;
          color: #64748b;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .truth-reveal {
          font-size: clamp(1.1rem, 2.5vw, 1.4rem);
          font-weight: 700;
          margin: 48px auto;
          padding: 32px 40px;
          background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
          color: white;
          border-radius: 16px;
          position: relative;
          overflow: hidden;
          max-width: 800px;
          box-shadow: 0 10px 40px rgba(249, 115, 22, 0.2);
          transform: perspective(1000px) rotateX(2deg);
        }

        .truth-reveal::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #f97316, #ea580c, #f97316);
          border-radius: 18px;
          z-index: -1;
          animation: borderGlow 3s ease-in-out infinite;
        }

        @keyframes borderGlow {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }

        .truth-reveal::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          animation: shimmer 2.5s infinite;
        }

        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        .solution {
          font-size: clamp(1rem, 2.2vw, 1.2rem);
          line-height: 1.7;
          color: #475569;
          margin-bottom: 48px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          font-weight: 500;
        }

        .features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 32px;
          margin-top: 80px;
        }

        .feature-card {
          background: #ffffff;
          border: 2px solid #f1f5f9;
          padding: 40px 32px;
          border-radius: 16px;
          text-align: center;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #f97316, #ea580c);
          transform: scaleX(0);
          transition: transform 0.4s ease;
        }

        .feature-card:hover {
          transform: translateY(-8px);
          border-color: #f97316;
          box-shadow: 0 20px 60px rgba(249, 115, 22, 0.15);
        }

        .feature-card:hover::before {
          transform: scaleX(1);
        }

        .feature-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          margin: 0 auto 24px;
          transition: transform 0.3s ease;
        }

        .feature-card:hover .feature-icon {
          transform: scale(1.1) rotateY(10deg);
        }

        .feature-title {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 16px;
          color: #1e293b;
        }

        .feature-description {
          color: #64748b;
          line-height: 1.6;
          font-size: 1rem;
        }

        .stats-hint {
          display: flex;
          justify-content: center;
          gap: 48px;
          margin-top: 60px;
          flex-wrap: wrap;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 800;
          color: #f97316;
          display: block;
        }

        .stat-label {
          font-size: 0.9rem;
          color: #64748b;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .cta-section {
          margin-top: 80px;
          text-align: center;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
          color: white;
          padding: 18px 40px;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 700;
          font-size: 1.1rem;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(249, 115, 22, 0.3);
          border: none;
          cursor: pointer;
        }

        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(249, 115, 22, 0.4);
        }

        .cta-button::after {
          content: '→';
          transition: transform 0.3s ease;
          font-size: 1.2rem;
        }

        .cta-button:hover::after {
          transform: translateX(4px);
        }

        @media (max-width: 768px) {
          .section {
            padding: 60px 0;
          }
          
          .container {
            padding: 0 16px;
          }
          
          .features {
            grid-template-columns: 1fr;
            gap: 24px;
            margin-top: 60px;
          }

          .stats-hint {
            gap: 32px;
            margin-top: 40px;
          }

          .truth-reveal {
            padding: 24px 28px;
            transform: none;
          }
        }
      `}</style>
      
      <section className="section">
        <div className="container">
          <div className="content">
            <div className="badge">Reality Check</div>
            
            <h2 className="main-heading">Most Home Improvement Pros Don't Know This...</h2>
            
            <p className="problem-statement">
              You're busy building kitchens, fixing roofs, and managing crews — not learning SEO, Facebook Ads, or chatbots.
            </p>
            
            <div className="truth-reveal">
              But here's the truth: If people can't find you online, they'll call someone else.
            </div>
            
            <p className="solution">
              That's where we come in. We handle the marketing while you handle the job.
            </p>

            <div className="stats-hint">
              <div className="stat-item">
                <span className="stat-number">73%</span>
                <span className="stat-label">Search Online First</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">2x</span>
                <span className="stat-label">More Leads</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">90%</span>
                <span className="stat-label">Customer Satisfaction</span>
              </div>
            </div>
            
            <div className="features">
              <div className="feature-card">
                <div className="feature-icon">🎯</div>
                <h3 className="feature-title">Targeted Lead Generation</h3>
                <p className="feature-description">We bring qualified customers directly to your doorstep using proven digital strategies</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">📱</div>
                <h3 className="feature-title">Professional Online Presence</h3>
                <p className="feature-description">Build trust and credibility with a polished digital presence that converts visitors to customers</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h3 className="feature-title">Automated Marketing Systems</h3>
                <p className="feature-description">Set-and-forget marketing automation that works 24/7 to grow your business</p>
              </div>
            </div>
            
            <div className="cta-section">
              <a 
                href="https://calendly.com/more-estimates/let-s-discuss-how-we-can-help-grow-your-business" 
                target="_blank" 
                rel="noopener noreferrer"
                className="cta-button"
              >
                Get My Free Lead Strategy
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MarketingTruthSection;