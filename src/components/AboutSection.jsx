import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Leaf, Shield, Wifi, Sparkles } from 'lucide-react';

const values = [
  { icon: Leaf, label: 'Sustainable', color: 'from-green-500 to-emerald-500' },
  { icon: Shield, label: 'Secure', color: 'from-blue-500 to-indigo-500' },
  { icon: Wifi, label: 'Connected', color: 'from-cyan-500 to-teal-500' },
  { icon: Sparkles, label: 'Immersive', color: 'from-orange-500 to-amber-500' },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-32 bg-white relative overflow-hidden">
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

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                We combine renewable energy, intelligent automation, advanced security, 
                rural connectivity, and immersive audio-visual design into one seamless experience.
              </p>
              <p className="text-xl font-medium text-slate-800">
                We don't sell products.
                <span className="block text-teal-600">We design environments.</span>
              </p>
              <p>
                Every solution we create is tailored to enhance your lifestyle—whether you're 
                looking to reduce your carbon footprint, automate your home, secure your property, 
                or enjoy cinema-quality entertainment in your living room.
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
            className="grid grid-cols-2 gap-4"
          >
            {values.map((value, i) => (
              <motion.div
                key={value.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                className="group p-6 bg-white rounded-2xl border border-slate-200/50 shadow-sm hover:shadow-xl hover:border-slate-300/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">{value.label}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}