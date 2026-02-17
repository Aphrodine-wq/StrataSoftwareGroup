import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <div className="hero">
        <h1>Strata Software Group</h1>
        <p className="tagline">Building Tomorrow's Solutions Today</p>
        <p className="description">
          We deliver innovative software solutions, custom development services, 
          and cutting-edge products to help your business thrive in the digital age.
        </p>
      </div>
      
      <div className="features">
        <div className="feature-card">
          <h3>🚀 Innovative Products</h3>
          <p>Explore our suite of in-house software solutions</p>
        </div>
        <div className="feature-card">
          <h3>💼 Professional Services</h3>
          <p>Expert development and consulting services</p>
        </div>
        <div className="feature-card">
          <h3>📂 Proven Portfolio</h3>
          <p>View our successful client projects</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
