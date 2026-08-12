import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Zap, Wifi, Camera, ArrowRight, MessageCircle, MapPin } from 'lucide-react';

const WHATSAPP_FARM_URL =
  'https://wa.me/27646517446?text=' +
  encodeURIComponent(
    'Hi Jean, I’d like to talk about a farm / agricultural install. My location is: '
  );

const capabilities = [
  {
    icon: Zap,
    title: 'Hybrid power that holds',
    blurb:
      'Grid, solar, and battery backup sized for farm loads—so pumps, cold rooms, gates, and essentials stay up when the grid doesn’t.',
    href: '/services/agriculture',
    cta: 'Hybrid power systems',
    image: '/assets/ag-hybrid-power.webp',
  },
  {
    icon: Wifi,
    title: 'MikroTik for the property',
    blurb:
      'Long-range links and mesh coverage between house, sheds, and yard—built on MikroTik where town Wi‑Fi won’t reach.',
    href: '/services/wifi',
    cta: 'Rural connectivity',
    image: '/assets/ag-rural-connectivity.webp',
  },
  {
    icon: Camera,
    title: 'Eyes on the yard',
    blurb:
      'HD/4K CCTV with remote alerts—and UPS options so cameras keep watching through power outages.',
    href: '/services/cctv',
    cta: 'CCTV & security',
    image: '/assets/ag-cctv-security.webp',
  },
];

export default function AgricultureSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="agriculture" className="scroll-mt-28 py-20 md:py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 36 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-12"
        >
          <span className="inline-block text-sm font-semibold text-teal-600 tracking-wider uppercase mb-4">
            Agriculture & rural
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-900 mb-5">
            Built for the farm, not the suburb
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Distance, outages, and weather are the brief—especially on South African farms and
            rural properties. We design hybrid power, MikroTik connectivity, and monitoring that
            work across the homestead—not a city kit stretched thin.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {capabilities.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.06 * i }}
              className="rounded-2xl border border-slate-200 bg-white overflow-hidden flex flex-col shadow-sm"
            >
              <div className="aspect-[16/10] bg-slate-100 overflow-hidden">
                <img
                  src={item.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-5 flex-1">{item.blurb}</p>
                <Link
                  to={item.href}
                  className="inline-flex items-center gap-2 text-sm font-medium text-teal-700 hover:text-teal-800"
                >
                  {item.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 rounded-2xl border border-slate-200 bg-white p-6 md:p-7"
        >
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900 mb-1">Planning a farm install?</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Tell Jean your town or farm name and what you need—power, internet, or cameras.
              We’ll confirm whether we can help.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href={WHATSAPP_FARM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm font-medium rounded-full hover:shadow-lg hover:shadow-teal-500/25 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              Talk about a farm install
            </a>
            <a
              href="#coverage"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('coverage')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-slate-200 text-slate-700 text-sm font-medium rounded-full hover:bg-slate-50 transition-colors"
            >
              <MapPin className="w-4 h-4" />
              Check coverage
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
