import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import StickySearchForm from './components/StickySearchForm';
import Homepage from './pages/Homepage';
import DevisPage from './pages/DevisPage';
import CharterPage from './pages/CharterPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import LegalNoticesPage from './pages/LegalNoticesPage';
import BlogListingPage from './pages/BlogListingPage';
import BlogPage from './pages/BlogPage';
import TradePage from './pages/TradePage';
import TradeLocationPage from './pages/TradeLocationPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <>
      <ScrollToTop />
      <StickySearchForm />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/devis" element={<DevisPage />} />
        <Route path="/charte" element={<CharterPage />} />
        <Route path="/politique-confidentialite" element={<PrivacyPolicyPage />} />
        <Route path="/mentions-legales" element={<LegalNoticesPage />} />
        <Route path="/blog" element={<BlogListingPage />} />
        <Route path="/blog/:slug" element={<BlogPage />} />
        <Route path="/:tradeSlug/vendee" element={<TradePage />} />
        <Route path="/:tradeSlug/:citySlug" element={<TradeLocationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;