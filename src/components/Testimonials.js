import React, { useState } from 'react';

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      role: "Concerned Citizen",
      testimonial: "I reported a dangerous pothole on my street that had been causing accidents for months. Within 3 days, it was completely fixed! The ability to track the repair status gave me confidence that my voice was actually being heard.",
      image: "/api/placeholder/80/80"
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Municipal Engineer",
      testimonial: "The dashboard has revolutionized how we prioritize road repairs. The AI severity classification helps us identify truly dangerous issues, and the data analytics let us allocate resources more efficiently than ever before.",
      image: "/api/placeholder/80/80"
    },
    {
      id: 3,
      name: "Amit Patel",
      role: "Local Business Owner",
      testimonial: "The poor road conditions were driving customers away from my shop. After using FixMyStreet to report multiple issues in our commercial district, repairs were made quickly and foot traffic has increased significantly.",
      image: "/api/placeholder/80/80"
    }
  ];

  const handleNext = () => {
    setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="container">
        <div className="section-header">
          <h2>Making Real Impact</h2>
          <p>Hear from citizens and authorities who are transforming their communities</p>
        </div>
        
        <div className="testimonials-carousel">
          <button className="carousel-arrow prev" onClick={handlePrev}>←</button>
          
          <div className="testimonial-card">
            <div className="testimonial-image">
              <img 
                src={testimonials[activeTestimonial].image} 
                alt={testimonials[activeTestimonial].name}
              />
            </div>
            <div className="testimonial-content">
              <p className="quote">{testimonials[activeTestimonial].testimonial}</p>
              <div className="testimonial-author">
                <h4>{testimonials[activeTestimonial].name}</h4>
                <p>{testimonials[activeTestimonial].role}</p>
              </div>
            </div>
          </div>
          
          <button className="carousel-arrow next" onClick={handleNext}>→</button>
        </div>
        
        <div className="testimonial-indicators">
          {testimonials.map((_, index) => (
            <button 
              key={index}
              className={`indicator ${index === activeTestimonial ? 'active' : ''}`}
              onClick={() => setActiveTestimonial(index)}
            />
          ))}
        </div>
        
        <div className="impact-stats">
          <div className="impact-item">
            <h3>12,500+</h3>
            <p>Issues Reported</p>
          </div>
          <div className="impact-item">
            <h3>85%</h3>
            <p>Resolution Rate</p>
          </div>
          <div className="impact-item">
            <h3>30%</h3>
            <p>Decrease in Road Accidents</p>
          </div>
          <div className="impact-item">
            <h3>48 Hours</h3>
            <p>Average Response Time</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;