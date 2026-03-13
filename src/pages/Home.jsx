import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import IntroScreen from '@/components/IntroScreen';

export default function Home() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <IntroScreen onComplete={() => setIntroDone(true)} />
      {introDone && (
        <>
          <Navbar />
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <ContactSection />
          <Footer />
        </>
      )}
    </div>
  );
}