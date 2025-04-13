import React, { useState } from 'react';
import ResponsiveNavbar from './ResponsiveNavbar';

const HeroSection = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter signup
    alert(`Thank you for subscribing with ${email}`);
    setEmail('');
  };

  return (
    <section className="hero-section">
      <div className="hero-container">
        <ResponsiveNavbar />

        <div className="hero-content">
          <div className="hero-text">
            <h1>Report Road Issues, <br />Improve Your Community</h1>
            <p>FixMyStreet empowers citizens to report potholes and road damage while helping authorities resolve them efficiently using AI technology.</p>
            <div className="cta-buttons">
              <button className="btn-primary btn-large">Report a Pothole</button>
              <button className="btn-secondary btn-large">View Local Issues</button>
            </div>
            <div className="stats">
              <div className="stat-item">
                <h3>11,000+</h3>
                <p>Accidents prevented</p>
              </div>
              <div className="stat-item">
                <h3>85%</h3>
                <p>Resolution rate</p>
              </div>
              <div className="stat-item">
                <h3>48hrs</h3>
                <p>Avg. response time</p>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <img src="/api/placeholder/600/400" alt="Road repair illustration" />
          </div>
        </div>

        <div className="newsletter">
          <h3>Stay updated on your community's improvements</h3>
          <form onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn-primary">Subscribe</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;