import React from 'react';

const LOGO_URL = "/assets/logo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 py-12">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={LOGO_URL} alt="SIS Logo" className="h-10 w-auto opacity-80" />
            <span className="text-slate-400 text-sm">Systems Integration Specialists</span>
          </div>

          {/* Copyright */}
          <p className="text-slate-500 text-sm">
            © {currentYear} SIS. All rights reserved.
          </p>

          {/* Tagline */}
          <p className="text-slate-600 text-sm italic">
            Sustainable. Secure. Connected. Immersive.
          </p>
        </div>
      </div>
    </footer>
  );
}