import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react";
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import Products from './pages/Products';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import Contact from './pages/Contact';
import Templates from './pages/Templates';
import TemplatePreview from './pages/TemplatePreview';
import TemplateCheckout from './pages/TemplateCheckout';
import CheckoutSuccess from './pages/CheckoutSuccess';
import CheckoutCancel from './pages/CheckoutCancel';
import CursorGlow from './components/CursorGlow';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <CursorGlow />
        <Navigation />
        <PageTransition />
        <main className="main-content page-entered">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/templates/preview/:id" element={<TemplatePreview />} />
            <Route path="/templates/checkout/:id" element={<TemplateCheckout />} />
            <Route path="/checkout/success" element={<CheckoutSuccess />} />
            <Route path="/checkout/cancel" element={<CheckoutCancel />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <ScrollToTop />
        <Analytics />
      </div>
    </Router>
  );
}

export default App;

