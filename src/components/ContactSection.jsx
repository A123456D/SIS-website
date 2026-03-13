import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

const LOGO_URL = "/assets/logo.png";

const contactInfo = [
  {
    icon: Phone,
    label: 'Phone',
    value: '064 651 7446',
    href: 'tel:0646517446',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'integrationsspecialists@gmail.com',
    href: 'mailto:integrationsspecialists@gmail.com',
  },
];

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-24 md:py-32 bg-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-semibold text-teal-400 tracking-wider uppercase mb-4">
              Get In Touch
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Let's Create Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
                Perfect Environment
              </span>
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-slate-400">
              Ready to transform your space? Get in touch with Jean and let's discuss 
              how we can bring your vision to life.
            </p>
          </div>

          {/* Contact Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12">
              {/* Logo & Name */}
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/10">
                <img src={LOGO_URL} alt="SIS Logo" className="h-16 w-auto" />
                <div>
                  <h3 className="text-xl font-semibold text-white">Jean Conradie</h3>
                  <p className="text-slate-400">System's Integration Specialists</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                {contactInfo.map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-500">{item.label}</p>
                      <p className="text-white font-medium group-hover:text-teal-400 transition-colors break-all">
                        {item.value}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-teal-400 group-hover:translate-x-1 transition-all" />
                  </motion.a>
                ))}
              </div>

              {/* CTA Button */}
              <motion.a
                href="mailto:integrationsspecialists@gmail.com?subject=Enquiry from Website"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-10 w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-300 hover:-translate-y-0.5"
              >
                Send an Enquiry
                <ArrowRight className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}