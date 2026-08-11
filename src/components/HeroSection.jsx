import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const LOGO_URL = '/assets/logo.png';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/assets/hero-bg.png"
          alt=""
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-900/65 to-teal-950/55" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center pt-28 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={LOGO_URL}
            alt="SIS — Systems Integration Specialists"
            className="mx-auto mb-8 h-36 sm:h-44 md:h-52 lg:h-60 w-auto object-contain drop-shadow-2xl"
          />

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-[1.05] tracking-tight mb-6">
            Technology that
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-300 to-sky-300">
              refines life
            </span>
          </h1>

          <p className="max-w-xl mx-auto text-lg text-white/75 leading-relaxed mb-10">
            South Africa–based systems integration for homes, commercial sites, and rural
            properties—solar backup through outages, smart automation, cinema-grade theatre,
            and CCTV that stays awake. For farms, we add MikroTik networks that reach where
            town Wi‑Fi won’t.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-medium rounded-full hover:shadow-xl hover:shadow-teal-500/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              Get in Touch
            </button>
            <button
              onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/25 text-white font-medium rounded-full hover:bg-white/20 transition-all duration-300"
            >
              Explore Services
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.button
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
            className="p-2 text-white/45 hover:text-white transition-colors"
            aria-label="Scroll to about"
          >
            <ChevronDown size={28} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
