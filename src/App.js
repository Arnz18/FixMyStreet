import React from 'react';
import HeroSection from './components/HeroSection';
import KeyFeatures from './components/KeyFeatures';
import MapPreview from './components/MapPreview';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import './styles/global.css';

function App() {
  return (
    <div className="app">
      <HeroSection />
      <KeyFeatures />
      <MapPreview />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;