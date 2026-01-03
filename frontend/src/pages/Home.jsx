import React from 'react';
import Hero from '../components/Home/Hero';
import Features from '../components/Features/Features';
import Benefits from '../components/Benefits/Benefits';
import HowItWorks from '../components/Home/HowItWorks';
import FinalCTA from '../components/Home/FinalCTA';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <Features />
      <HowItWorks />
      <Benefits />
      <FinalCTA />
    </div>
  );
};

export default Home;