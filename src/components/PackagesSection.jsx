import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { BatteryCharging, Camera, Wifi, Tv, Layers, ArrowRight } from 'lucide-react';

const packages = [
  {
    icon: BatteryCharging,
    title: 'Power outage essentials',
    blurb: 'Keep critical circuits alive—lights, Wi‑Fi, fridge, and security—through power outages and grid failure.',
    includes: [
      'Hybrid inverter + lithium backup sized to your loads',
      'Priority circuit planning',
      'Solar-ready or solar-included options',
    ],
    serviceId: 'solar',
  },
  {
    icon: Camera,
    title: 'Property security',
    blurb: 'See your home or farm from anywhere with HD/4K cameras and remote alerts.',
    includes: [
      'Typical 4- or 8-camera layouts',
      'Night vision & motion alerts',
      'Optional UPS so cameras stay up in a power outage',
    ],
    serviceId: 'cctv',
  },
  {
    icon: Wifi,
    title: 'Rural connectivity',
    blurb: 'Stable internet where town Wi‑Fi doesn’t reach—built on MikroTik networking.',
    includes: [
      'MikroTik router core',
      'Long-range / mesh coverage for the property',
      'Weatherproof outdoor links where needed',
    ],
    serviceId: 'wifi',
  },
  {
    icon: Tv,
    title: 'Home theatre & AV',
    blurb: 'From a refined media lounge to a dedicated private cinema room.',
    includes: [
      'Display & surround design',
      'Acoustic & lighting considerations',
      'Streaming and multi-room audio options',
    ],
    serviceId: 'av',
  },
  {
    icon: Layers,
    title: 'Full property integration',
    blurb: 'One plan that ties power, security, automation, AV, and connectivity together.',
    includes: [
      'Cross-system design (not separate silos)',
      'Phased install if you want to grow over time',
      'Centralised control where it makes sense',
    ],
    serviceId: 'automation',
  },
];

export default function PackagesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="packages" className="scroll-mt-28 py-20 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 36 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-sm font-semibold text-teal-600 tracking-wider uppercase mb-4">
            Typical starting points
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-900 mb-5">
            Systems we commonly design
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-600">
            Not fixed shop packages—clear starting points so you can see what fits, then we
            size the real install to your property.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {packages.map((pkg, i) => (
            <motion.article
              key={pkg.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.06 * i }}
              className={`rounded-2xl border border-slate-200 bg-slate-50/50 p-7 flex flex-col ${
                i === packages.length - 1 ? 'md:col-span-2 xl:col-span-1' : ''
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center mb-5">
                <pkg.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">{pkg.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-5">{pkg.blurb}</p>
              <ul className="space-y-2 mb-6 flex-1">
                {pkg.includes.map((line) => (
                  <li key={line} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                    {line}
                  </li>
                ))}
              </ul>
              <Link
                to={`/services/${pkg.serviceId}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-teal-700 hover:text-teal-800"
              >
                View related service
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
