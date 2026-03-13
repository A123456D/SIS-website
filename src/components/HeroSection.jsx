import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Sun, Home, Wifi } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/assets/hero-bg.png"
          alt="Hero background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-cyan-900/60" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-sm text-white/90 font-medium">Sustainable Technology Solutions</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
            Technology That
            <span className="block bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Refines Life
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/80 leading-relaxed mb-10">
            We design intelligent environments that seamlessly blend renewable energy, 
            smart automation, premium audio-visual experiences, and reliable connectivity.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={() => document.querySelector('#services').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white font-medium rounded-full hover:shadow-xl hover:shadow-slate-900/20 transition-all duration-300 hover:-translate-y-0.5"
            >
              Explore Our Services
            </button>
            <button
              onClick={() => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white/15 backdrop-blur-sm border border-white/30 text-white font-medium rounded-full hover:bg-white/25 hover:shadow-lg transition-all duration-300"
            >
              Get in Touch
            </button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              { icon: Sun, label: 'Solar Energy' },
              { icon: Home, label: 'Smart Automation' },
              { icon: Wifi, label: 'Rural Connectivity' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
              >
                <item.icon className="w-4 h-4 text-teal-400" />
                <span className="text-sm text-white/90">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.button
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={() => document.querySelector('#about').scrollIntoView({ behavior: 'smooth' })}
            className="p-2 text-white/50 hover:text-white transition-colors"
          >
            <ChevronDown size={28} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}