import React from 'react';

const KeyFeatures = () => {
  const features = [
    {
      id: 1,
      title: "AI-Powered Pothole Detection",
      description: "Our OpenCV technology automatically verifies and classifies the severity of reported issues",
      icon: "🔍"
    },
    {
      id: 2,
      title: "Real-time Tracking",
      description: "Citizens can monitor the status of their reports from submission to resolution",
      icon: "📱"
    },
    {
      id: 3,
      title: "Geolocation Mapping",
      description: "Precise GPS tracking to accurately pinpoint and visualize road issues",
      icon: "📍"
    },
    {
      id: 4,
      title: "Municipal Dashboard",
      description: "Authorities gain data-driven insights to efficiently allocate resources",
      icon: "📊"
    },
    {
      id: 5,
      title: "Community Engagement",
      description: "Citizens can upvote issues and provide feedback on repairs",
      icon: "👥"
    },
    {
      id: 6,
      title: "Transparent Governance",
      description: "Access to resolution timelines and performance metrics builds public trust",
      icon: "✅"
    }
  ];

  return (
    <section id="features" className="features-section">
      <div className="container">
        <div className="section-header">
          <h2>Key Features</h2>
          <p>Transforming how communities address road infrastructure problems</p>
        </div>
        
        <div className="features-grid">
          {features.map(feature => (
            <div className="feature-card" key={feature.id}>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="features-cta">
          <h3>Ready to improve your community's roads?</h3>
          <button className="btn-primary">Get Started</button>
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;