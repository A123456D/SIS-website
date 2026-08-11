import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MessageCircle, MapPin, Home, Tractor, Building2 } from 'lucide-react';

const WHATSAPP_URL =
  'https://wa.me/27646517446?text=' +
  encodeURIComponent('Hi Jean, do you cover my area? My location is: ');

const audiences = [
  {
    icon: Home,
    title: 'Homes & estates',
    text: 'Quiet power, sharp security, and systems that disappear into daily life.',
  },
  {
    icon: Tractor,
    title: 'Farms & rural properties',
    text: 'Long-reach internet, hybrid backup, and monitoring built for distance.',
  },
  {
    icon: Building2,
    title: 'Commercial sites',
    text: 'Uptime-minded power, CCTV, and networks for businesses and facilities.',
  },
];

export default function CoverageSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="coverage" className="scroll-mt-28 py-24 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 36 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          <div>
            <span className="inline-block text-sm font-semibold text-teal-600 tracking-wider uppercase mb-4">
              Service area
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-slate-900 mb-5">
              From the driveway to the dirt road
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              We’re South Africa–based, and we work where a city-only installer often can’t—or
              won’t. Homes and estates, commercial yards and facilities, farms and rural sites:
              places where power, security, and internet have to survive outages, distance, and
              real local conditions.
            </p>
            <p className="text-slate-600 leading-relaxed mb-8">
              Coverage still depends on where you are and what you’re building. Drop Jean your
              town or farm name and we’ll tell you straight whether we can help.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-medium rounded-full hover:shadow-lg hover:shadow-teal-500/25 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              Check if we cover your area
            </a>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-5 rounded-2xl border border-slate-200 bg-slate-50">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Where we focus</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Three worlds, one craft: residential comfort, commercial uptime, and rural
                  reach—especially hybrid backup and MikroTik connectivity that hold when the
                  grid or the signal gets thin.
                </p>
              </div>
            </div>

            {audiences.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                className="flex items-start gap-4 p-5 rounded-2xl border border-slate-200/80 bg-white"
              >
                <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-teal-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
