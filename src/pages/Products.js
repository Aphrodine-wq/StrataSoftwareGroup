import React from 'react';
import './Products.css';

function Products() {
  const products = [
    {
      title: 'Fair Trade Worker',
      description: 'Fair Trade Worker is a platform that allows you to find the best team and best price for your project.',
      features: ['AI Quote Estimates', 'Extensive Contractor Network', 'Payment Protection'],
      link: '#'
    }
  ];

  return (
    <div className="products">
      <div className="products-header">
        <h1>Our Products</h1>
        <p>Innovative in-house software solutions</p>
      </div>
      
      <div className="products-grid">
        {products.map((product, index) => (
          <a href={product.link} key={index} className="product-card">
            <div className="card-content">
              <h3>{product.title}</h3>
              <p className="product-description">{product.description}</p>
              <ul className="features-list">
                {product.features.map((feature, idx) => (
                  <li key={idx}>✓ {feature}</li>
                ))}
              </ul>
            </div>
            <div className="card-footer">
              <span className="learn-more">Learn More →</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Products;
