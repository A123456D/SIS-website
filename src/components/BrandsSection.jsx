import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const brands = [
  'MikroTik',
  'Hybrid solar & lithium backup',
  'IP CCTV',
  'Dolby Atmos AV',
  'Smart home platforms',
  'Fixed wireless & mesh',
];

export default function BrandsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="brands" className="scroll-mt-28 py-14 bg-slate-900">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-sm font-semibold tracking-wider uppercase text-teal-400 mb-6">
            Technologies we design around
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {brands.map((brand) => (
              <span
                key={brand}
                className="px-4 py-2 rounded-full border border-white/15 bg-white/5 text-sm text-white/85"
              >
                {brand}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
