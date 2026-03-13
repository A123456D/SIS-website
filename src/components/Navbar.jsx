import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LOGO_URL = "/assets/logo.png";

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm h-20' : 'bg-transparent h-28'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-full">
        <div className="flex items-center h-full relative">

          {/* Logo: centered when not scrolled, left when scrolled */}
          <motion.a
            href="#"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            animate={isScrolled ? { x: 0, left: 0 } : {}}
            className={`absolute transition-all duration-500 ${
              isScrolled
                ? 'left-0 relative'
                : 'left-1/2 -translate-x-1/2'
            }`}
          >
            <img
              src={LOGO_URL}
              alt="SIS Logo"
              className={`object-contain transition-all duration-500 ${
                isScrolled ? 'h-14' : 'h-24'
              }`}
            />
          </motion.a>

          {/* Desktop Nav - always right */}
          <div className="hidden md:flex items-center gap-10 ml-auto">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
                  isScrolled ? 'text-slate-700 hover:text-teal-600' : 'text-slate-800 hover:text-teal-600'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('#contact')}
              className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm font-medium rounded-full hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-300"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 ml-auto"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="block w-full text-left text-slate-700 font-medium py-2"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('#contact')}
                className="w-full px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-medium rounded-full"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}