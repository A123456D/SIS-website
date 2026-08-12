import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LOGO_URL = '/assets/logo.webp';
const LOGO_FALLBACK = '/assets/logo.png';

const navLinks = [
  { label: 'About', hash: 'about' },
  { label: 'Services', hash: 'services' },
  { label: 'Packages', hash: 'packages' },
  { label: 'Agriculture', hash: 'agriculture' },
  { label: 'Process', hash: 'process' },
  { label: 'Coverage', hash: 'coverage' },
  { label: 'FAQ', hash: 'faq' },
  { label: 'Contact', hash: 'contact' },
];

export function scrollToSectionId(id) {
  const el = document.getElementById(id);
  if (!el) return false;
  const navOffset = 88;
  const top = el.getBoundingClientRect().top + window.scrollY - navOffset;
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  return true;
}

export default function Navbar({ solid = false }) {
  const [isScrolled, setIsScrolled] = useState(solid);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const onHome = location.pathname === '/';

  useEffect(() => {
    if (solid) {
      setIsScrolled(true);
      return undefined;
    }
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [solid]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  const goToSection = (hash) => {
    setMobileMenuOpen(false);

    const runScroll = () => {
      if (!scrollToSectionId(hash)) return;
      if (onHome && location.hash.replace('#', '') !== hash) {
        navigate({ pathname: '/', hash }, { replace: true });
      }
    };

    if (onHome) {
      // Wait for the menu to close so scroll position isn't fighting the overlay
      window.setTimeout(runScroll, 50);
      return;
    }

    navigate({ pathname: '/', hash });
  };

  const goHomeTop = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      navigate({ pathname: '/', hash: '' }, { replace: true });
      return;
    }
    navigate('/');
  };

  const linkClass = isScrolled || mobileMenuOpen
    ? 'text-slate-700 hover:text-teal-600'
    : 'text-white/85 hover:text-white';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || mobileMenuOpen
          ? 'bg-white/95 backdrop-blur-md shadow-sm h-20'
          : 'bg-transparent h-24'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full gap-6">
          <Link
            to="/"
            onClick={goHomeTop}
            className="shrink-0"
          >
            <picture>
              <source type="image/webp" srcSet={LOGO_URL} />
              <img
                src={LOGO_FALLBACK}
                alt="SIS — Systems Integration Specialists"
                width={240}
                height={100}
                decoding="async"
                className={`object-contain transition-all duration-500 drop-shadow-md ${
                  isScrolled || mobileMenuOpen ? 'h-11 sm:h-12' : 'h-12 sm:h-14'
                }`}
              />
            </picture>
          </Link>

          <div className="hidden lg:flex items-center gap-5 xl:gap-6 ml-auto">
            {navLinks.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => goToSection(link.hash)}
                className={`text-sm font-medium tracking-wide transition-colors duration-300 ${linkClass}`}
              >
                {link.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => goToSection('contact')}
              className="px-5 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm font-medium rounded-full hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-300"
            >
              Get Started
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className={`lg:hidden p-2 shrink-0 transition-colors ${
              isScrolled || mobileMenuOpen ? 'text-slate-700' : 'text-white'
            }`}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute left-0 right-0 top-full bg-white border-t border-slate-100 shadow-xl"
          >
            <div className="px-6 py-4 space-y-1 max-h-[calc(100dvh-5rem)] overflow-y-auto">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => goToSection(link.hash)}
                  className="block w-full text-left text-slate-700 font-medium py-3 px-2 rounded-lg hover:bg-slate-50"
                >
                  {link.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => goToSection('contact')}
                className="w-full mt-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-medium rounded-full"
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
