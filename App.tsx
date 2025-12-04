import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { AskAI } from './components/AskAI';
import { Home } from './pages/Home';
import { Crafts } from './pages/Crafts';
import { Info } from './pages/Info';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Subtle background grid effect
const BackgroundGrid = () => (
  <div className="fixed inset-0 z-[-1] pointer-events-none">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
  </div>
);

const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen text-white selection:bg-white/20">
      <BackgroundGrid />
      <Navigation />
      <ScrollToTop />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stuff" element={<Crafts />} />
        <Route path="/about" element={<Info />} />
      </Routes>

      <Footer />
      <AskAI />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;