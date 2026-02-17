import React from 'react';
import './Services.css';

function Services() {
  const services = [
    {
      name: 'Custom Software Development',
      description: 'Tailored software solutions built to meet your specific business needs',
      price: 'Starting at $10,000'
    },
    {
      name: 'Web Application Development',
      description: 'Modern, responsive web applications using the latest technologies',
      price: 'Starting at $7,500'
    },
    {
      name: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android',
      price: 'Starting at $12,000'
    },
    {
      name: 'UI/UX Design',
      description: 'User-centered design that creates engaging and intuitive experiences',
      price: 'Starting at $3,000'
    },
    {
      name: 'API Development & Integration',
      description: 'RESTful APIs and third-party service integrations',
      price: 'Starting at $4,500'
    },
    {
      name: 'Technical Consulting',
      description: 'Expert guidance on architecture, technology stack, and best practices',
      price: '$200/hour'
    }
  ];

  return (
    <div className="services">
      <div className="services-header">
        <h1>Our Services</h1>
        <p>Professional software development services tailored to your needs</p>
      </div>
      
      <div className="services-list">
        {services.map((service, index) => (
          <div key={index} className="service-row">
            <div className="service-info">
              <h3>{service.name}</h3>
              <p>{service.description}</p>
            </div>
            <div className="service-price">
              <span className="price">{service.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
