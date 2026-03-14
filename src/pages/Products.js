import React from 'react';
import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';
import './Products.css';

function Products() {
  useScrollReveal();

  const products = [
    {
      name: 'G-Rump',
      tagline: 'An epistemological agent that constructs knowledge about your codebase.',
      description:
        'G-Rump doesn\'t just autocomplete your code — it builds an internal model of what your project knows and what it doesn\'t. 54K lines of native Swift orchestrate multi-model reasoning across OpenRouter, Anthropic, OpenAI, and Ollama, using 100+ local tools and MCP integration to construct genuine understanding of your codebase before acting on it. The difference between pattern-matching and knowledge construction is the difference between a suggestion and a collaborator.',
      status: 'Live',
      features: [
        'Epistemological code analysis — understands before suggesting',
        'Multi-model reasoning (OpenRouter, Anthropic, OpenAI, Ollama)',
        '100+ local tools for deep codebase knowledge construction',
        'MCP (Model Context Protocol) for structured context exchange',
        'Agent orchestration that reasons about multi-step plans',
        'Native macOS app — Developer ID signed & notarized',
      ],
      gradient: 'linear-gradient(135deg, #6366f1 0%, #3B82F6 100%)',
    },
    {
      name: 'FairEstimator',
      tagline: 'Construction estimating with epistemological transparency.',
      description:
        'Most AI estimating tools give you a number. FairEstimator shows you HOW it arrived at that number — which line items it combined, what regional data it weighted, and where its confidence intervals widen. Every estimate surfaces the reasoning chain so contractors can verify the logic, not just trust the output. That\'s the difference between a black box and a thinking partner.',
      status: 'Live',
      features: [
        'Transparent reasoning — see HOW estimates are composed',
        'Confidence intervals on every line item',
        'Regional cost data with source attribution',
        'AI-powered scope analysis from project descriptions',
        'Exportable estimates with full methodology breakdown',
        'Built for contractors who need to verify, not just trust',
      ],
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    },
    {
      name: 'AEON',
      tagline: 'Where type systems become logic and AI co-evolves with your code.',
      description:
        'AEON treats your type system as a logic (Curry-Howard correspondence) — every type signature is a theorem, every implementation is a proof. Across 85K lines of Python and 20+ language adapters, it doesn\'t just lint your code; it reasons about what your types guarantee and where those guarantees break down. The AI co-evolves with your codebase, learning your project\'s invariants to surface increasingly precise analysis over time.',
      status: 'Live',
      features: [
        'Type-theoretic analysis via Curry-Howard correspondence',
        'AI that co-evolves with your codebase over time',
        '20+ language adapters (Python, JS, Go, Rust, Swift, and more)',
        'Proof-aware refactoring suggestions',
        'Security analysis grounded in type-level guarantees',
        'CLI-first workflow with CI/CD integration',
      ],
      gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    },
    {
      name: 'Driftlands',
      tagline: 'Emergent survival where entropy is the game designer.',
      description:
        'Driftlands doesn\'t script its world — it parameterizes emergence and lets entropy do the design work. Built in Bevy/Rust with a full ECS architecture, every system (weather, ecology, combat, crafting) feeds back into every other system through tunable entropy parameters. The result is a survival crafting game where no two playthroughs converge, because the world genuinely doesn\'t know what it\'s going to do next — and neither do you.',
      status: 'In Development',
      features: [
        'Emergence parameters — tune chaos, watch worlds diverge',
        'Entropy-driven procedural generation (not random, emergent)',
        'Full ECS architecture in Bevy/Rust for systemic feedback loops',
        'Real-time combat shaped by environmental state',
        'Crafting and building that alter the world\'s entropy balance',
        '40 user stories spanning exploration to endgame defense',
      ],
      gradient: 'linear-gradient(135deg, #B48A4A 0%, #7E5E33 100%)',
    },
  ];

  return (
    <div className="products">
      <div className="page-header reveal">
        <h1>Products & Solutions</h1>
        <p>Software that knows what it knows — and shows you how it got there</p>
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
