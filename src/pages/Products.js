import React from 'react';
import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';
import './Products.css';

function Products() {
  useScrollReveal();

  const products = [
    {
      name: 'G-Rump',
      tagline: 'AI coding agent for macOS.',
      description:
        'A native macOS AI coding agent built with 54K lines of Swift and SwiftUI. Multi-model support across OpenRouter, Anthropic, OpenAI, and Ollama — with 100+ local tools, MCP integration, and full agent orchestration for complex development workflows.',
      status: 'Live',
      features: [
        'Multi-model AI support (OpenRouter, Anthropic, OpenAI, Ollama)',
        '100+ local tools for code analysis & manipulation',
        'MCP (Model Context Protocol) integration',
        'Agent orchestration for multi-step tasks',
        'Native macOS app built with SwiftUI',
        'Developer ID signed & notarized',
      ],
      gradient: 'linear-gradient(135deg, #6366f1 0%, #3B82F6 100%)',
    },
    {
      name: 'AEON',
      tagline: 'Multi-language static analysis engine.',
      description:
        'A deep code analysis engine spanning 85K lines of Python with 20+ language adapters. Combines traditional static analysis with AI-powered suggestions to surface bugs, security issues, and code quality improvements across your entire codebase.',
      status: 'Live',
      features: [
        '20+ language adapters (Python, JS, Go, Rust, Swift, and more)',
        'AI-powered code suggestions & refactoring',
        'Security vulnerability detection',
        'CLI-first developer workflow',
        'CI/CD pipeline integration',
        'Custom rule authoring',
      ],
      gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    },
    {
      name: 'Driftlands',
      tagline: 'Survival crafting in a procedural world.',
      description:
        'A survival crafting game built with Bevy and Rust — procedural world generation, real-time combat, crafting, farming, and base building. 40 user stories covering the full gameplay loop from first landing to endgame defense.',
      status: 'In Development',
      features: [
        'Procedural world generation',
        'Real-time combat system',
        'Crafting, farming & building mechanics',
        'Built with Bevy engine (Rust/ECS)',
        '40 user stories covering full gameplay loop',
        'Exploration, survival & base defense',
      ],
      gradient: 'linear-gradient(135deg, #B48A4A 0%, #7E5E33 100%)',
    },
  ];

  return (
    <div className="products">
      <div className="page-header reveal">
        <h1>Products & Solutions</h1>
        <p>Developer tools, AI agents, and games built by Strata</p>
      </div>

      <div className="products-content">
        {/* Product Grid */}
        <div className="products-grid">
          {products.map((product, index) => (
            <div
              key={index}
              className={`product-card reveal reveal-delay-${Math.min(index + 1, 4)} ${product.status === 'Live' ? 'product-card--live' : 'product-card--upcoming'
                }`}
            >
              <div
                className="product-card-header"
                style={{ background: product.gradient }}
              >
                <span className={`product-status ${product.status === 'Live' ? 'status-live' : 'status-upcoming'}`}>
                  {product.status}
                </span>
              </div>
              <div className="product-card-body">
                <h2>{product.name}</h2>
                <p className="product-tagline">{product.tagline}</p>
                <p className="product-description">{product.description}</p>

                <ul className="product-features">
                  {product.features.map((feature, i) => (
                    <li key={i}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {product.status === 'Live' && (
                  <Link to="/contact" className="btn-primary product-cta">
                    Request Demo <span className="btn-arrow">→</span>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
