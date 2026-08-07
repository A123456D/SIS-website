import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MessageCircle, ClipboardList, FileText, Wrench, Headphones } from 'lucide-react';

const steps = [
  {
    icon: MessageCircle,
    title: 'Enquire',
    text: 'WhatsApp or email us with your property type and what you need—power, security, AV, or connectivity.',
  },
  {
    icon: ClipboardList,
    title: 'Site assessment',
    text: 'We review your setup, power-outage and grid-failure needs, layout, and any existing equipment on site or remotely.',
  },
  {
    icon: FileText,
    title: 'Proposal',
    text: 'You get a clear scope for the right system—sized for your property, not a one-size package dump. Financing is available for qualifying installs.',
  },
  {
    icon: Wrench,
    title: 'Install',
    text: 'Professional installation and commissioning so everything works together as one environment.',
  },
  {
    icon: Headphones,
    title: 'Support',
    text: 'Guidance after handover—from app access and monitoring to tweaks as your needs grow.',
  },
];

export default function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="process" className="scroll-mt-28 py-24 md:py-28 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 36 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-teal-600 tracking-wider uppercase mb-4">
            How it works
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-900 mb-5">
            From first message to a working system
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-600">
            A simple path so you always know what comes next—especially when power, security,
            and internet all need to land in one plan.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 * i }}
              className="relative bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-bold tracking-wider text-teal-600">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
                  <step.icon className="w-5 h-5 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
