import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar, { scrollToSectionId } from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import PackagesSection from '@/components/PackagesSection';
import AgricultureSection from '@/components/AgricultureSection';
import ProcessSection from '@/components/ProcessSection';
import BrandsSection from '@/components/BrandsSection';
import CoverageSection from '@/components/CoverageSection';
import FAQSection from '@/components/FAQSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import IntroScreen from '@/components/IntroScreen';

function hasSeenIntro() {
  try {
    return localStorage.getItem('sis-intro-seen') === '1';
  } catch {
    return false;
  }
}

export default function Home() {
  const [introDone, setIntroDone] = useState(hasSeenIntro);
  const location = useLocation();

  useEffect(() => {
    if (!introDone) return;
    const id = location.hash.replace('#', '');
    if (!id) return;

    const timer = window.setTimeout(() => {
      scrollToSectionId(id);
    }, 80);

    return () => window.clearTimeout(timer);
  }, [introDone, location.hash, location.pathname, location.key]);

  return (
    <div className="min-h-screen bg-white">
      {!introDone && <IntroScreen onComplete={() => setIntroDone(true)} />}
      {introDone && (
        <>
          <Navbar />
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <PackagesSection />
          <AgricultureSection />
          <ProcessSection />
          <BrandsSection />
          <CoverageSection />
          <FAQSection />
          <ContactSection />
          <Footer />
        </>
      )}
    </div>
  );
}
