import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const LOGO_URL = '/assets/logo.webp';
const LOGO_FALLBACK = '/assets/logo.png';

export default function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-slate-950">
        <picture>
          <source
            type="image/webp"
            media="(max-width: 768px)"
            srcSet="/assets/hero-bg-sm.webp"
          />
          <source type="image/webp" srcSet="/assets/hero-bg.webp" />
          <source
            type="image/jpeg"
            media="(max-width: 768px)"
            srcSet="/assets/hero-bg-sm.jpg"
          />
          <img
            src="/assets/hero-bg.jpg"
            alt=""
            width={1536}
            height={1024}
            decoding="async"
            fetchPriority="high"
            className="w-full h-full object-cover object-center"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-900/65 to-teal-950/55" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 sm:pt-28 pb-28 sm:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <picture>
            <source type="image/webp" srcSet={LOGO_URL} />
            <img
              src={LOGO_FALLBACK}
              alt="SIS — Systems Integration Specialists"
              width={480}
              height={200}
              decoding="async"
              className="mx-auto mb-5 sm:mb-8 h-24 sm:h-36 md:h-48 lg:h-56 w-auto max-w-[min(100%,18rem)] sm:max-w-[min(100%,22rem)] object-contain drop-shadow-2xl"
            />
          </picture>

          <h1 className="font-display text-[2rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white tracking-tight mb-4 sm:mb-6 px-1">
            Technology that
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-300 to-sky-300">
              refines life
            </span>
          </h1>

          <p className="max-w-xl mx-auto text-[0.95rem] sm:text-lg text-white/75 leading-relaxed mb-8 sm:mb-10 px-1 text-balance">
            South Africa–based systems integration for homes, commercial sites, and rural
            properties—solar backup through outages, smart automation, cinema-grade theatre,
            and CCTV that stays awake. For farms, we add MikroTik networks that reach where
            town Wi-Fi won't.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full max-w-md sm:max-w-none mx-auto px-1">
            <button
              type="button"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-8 py-3.5 sm:py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-medium rounded-full hover:shadow-xl hover:shadow-teal-500/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              Get in Touch
            </button>
            <button
              type="button"
              onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-8 py-3.5 sm:py-4 bg-white/10 backdrop-blur-sm border border-white/25 text-white font-medium rounded-full hover:bg-white/20 transition-all duration-300"
            >
              Explore Services
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2"
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
