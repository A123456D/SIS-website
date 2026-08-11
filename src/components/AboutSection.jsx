import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Leaf, Shield, Wifi, Sparkles, ArrowRight, X } from 'lucide-react';

const values = [
  {
    id: 'sustainable',
    icon: Leaf,
    label: 'Sustainable',
    color: 'from-green-500 to-emerald-500',
    serviceId: 'solar',
    title: 'Clean energy that lasts',
    description:
      'We design solar and hybrid power systems that cut running costs, protect against outages, and reduce your carbon footprint—without complicating daily life.',
  },
  {
    id: 'secure',
    icon: Shield,
    label: 'Secure',
    color: 'from-blue-500 to-indigo-500',
    serviceId: 'cctv',
    title: 'Protection you can trust',
    description:
      'HD/4K CCTV, smart analytics, and remote monitoring give you clear visibility of your property day and night—integrated with the rest of your home systems.',
  },
  {
    id: 'connected',
    icon: Wifi,
    label: 'Connected',
    color: 'from-cyan-500 to-teal-500',
    serviceId: 'wifi',
    title: 'Reliable rural internet',
    description:
      'MikroTik-powered networks bring stable, high-speed connectivity to remote and rural properties—so work, streaming, and smart devices stay online.',
  },
  {
    id: 'immersive',
    icon: Sparkles,
    label: 'Immersive',
    color: 'from-orange-500 to-amber-500',
    serviceId: 'av',
    title: 'Cinema at home',
    description:
      'Custom audio-visual design and dedicated home theatre systems deliver calibrated picture, surround sound, and lighting for a true cinematic experience.',
  },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeId, setActiveId] = useState(null);
  const active = values.find((v) => v.id === activeId) ?? null;
  const navigate = useNavigate();

  const openService = (serviceId) => {
    navigate(`/services/${serviceId}`);
  };

  return (
    <section id="about" className="scroll-mt-28 py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-slate-50 to-transparent" />
      
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-teal-600 tracking-wider uppercase mb-4">
            Our Philosophy
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-8">
            Technology should not complicate life.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">
              It should refine it.
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                SIS is a South Africa–based systems integrator. We combine renewable energy,
                intelligent automation, advanced security, rural connectivity, and immersive
                audio-visual design & home theatre into one seamless experience.
              </p>
              <p className="text-xl font-medium text-slate-800">
                We don't sell products.
                <span className="block text-teal-600">We design environments.</span>
              </p>
              <p>
                Every solution we create is tailored to enhance your lifestyle—whether you're 
                looking to stay powered through outages, automate your home, secure your property, 
                connect a rural site, or enjoy cinema-quality entertainment.
              </p>
            </div>

            <div className="mt-10 p-6 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-2xl border border-slate-200/50">
              <p className="text-slate-500 italic">
                "Built for today. Ready for tomorrow."
              </p>
            </div>
          </motion.div>

          {/* Right - Value Cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              {values.map((value, i) => {
                const isActive = activeId === value.id;
                return (
                  <motion.button
                    key={value.label}
                    type="button"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                    onClick={() => setActiveId(isActive ? null : value.id)}
                    aria-pressed={isActive}
                    className={`group text-left p-6 bg-white rounded-2xl border shadow-sm transition-all duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 ${
                      isActive
                        ? 'border-teal-400 shadow-xl ring-1 ring-teal-200'
                        : 'border-slate-200/50 hover:shadow-xl hover:border-slate-300/50'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <value.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800">{value.label}</h3>
                    <p className="mt-1 text-xs text-slate-400">
                      {isActive ? 'Tap to close' : 'Tap to learn more'}
                    </p>
                  </motion.button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              {active && (
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 12, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: 8, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="relative p-6 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white shadow-sm">
                    <button
                      type="button"
                      onClick={() => setActiveId(null)}
                      className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                      aria-label="Close"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${active.color} text-white text-xs font-semibold mb-3`}>
                      <active.icon className="w-3.5 h-3.5" />
                      {active.label}
                    </div>
                    <h4 className="text-xl font-semibold text-slate-900 mb-2 pr-8">
                      {active.title}
                    </h4>
                    <p className="text-slate-600 leading-relaxed mb-5">
                      {active.description}
                    </p>
                    <button
                      type="button"
                      onClick={() => openService(active.serviceId)}
                      className="inline-flex items-center gap-2 text-sm font-medium text-teal-700 hover:text-teal-800 transition-colors"
                    >
                      View related services
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
