import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, Mail, MessageCircle, ArrowRight, Send, CheckCircle2 } from 'lucide-react';

const LOGO_URL = "/assets/logo.png";
const WHATSAPP_URL =
  'https://wa.me/27646517446?text=' +
  encodeURIComponent("Hi Jean, I'd like to enquire about SIS services.");

const contactInfo = [
  {
    icon: Phone,
    label: 'Phone',
    value: '064 651 7446',
    href: 'tel:+27646517446',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: 'Chat on WhatsApp',
    href: WHATSAPP_URL,
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'integrationsspecialists@gmail.com',
    href: 'mailto:integrationsspecialists@gmail.com',
  },
];

const serviceOptions = [
  'Renewable Energy',
  'Home Automation',
  'Audio-Visual & Home Theatre',
  'CCTV & Security',
  'Hybrid Power Systems',
  'Rural Connectivity',
  'Not sure yet',
];

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [form, setForm] = useState({
    name: '',
    phone: '',
    location: '',
    service: '',
    message: '',
  });
  const [sent, setSent] = useState(false);

  const update = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`SIS enquiry from ${form.name || 'website visitor'}`);
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Phone: ${form.phone}`,
        `Town / area: ${form.location || 'Not specified'}`,
        `Service interest: ${form.service || 'Not specified'}`,
        '',
        form.message || '(No message)',
      ].join('\n')
    );
    window.location.href = `mailto:integrationsspecialists@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="scroll-mt-28 py-24 md:py-32 bg-slate-900 relative overflow-hidden">
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
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-semibold text-teal-400 tracking-wider uppercase mb-4">
              Get In Touch
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-6">
              Let's create your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
                perfect environment
              </span>
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-slate-400">
              SIS is South Africa–based. Whether it’s a home, a commercial site, or a rural
              property—message Jean on WhatsApp or send a quick enquiry. Include your town or
              farm name so we can confirm coverage. Financing is available for qualifying
              installs.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
            {/* Contact details */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10"
            >
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/10">
                <img src={LOGO_URL} alt="SIS Logo" className="h-16 w-auto" />
                <div>
                  <h3 className="text-xl font-semibold text-white">Jean Conradie</h3>
                  <p className="text-slate-400">Systems Integration Specialists · South Africa</p>
                </div>
              </div>

              <div className="space-y-5">
                {contactInfo.map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target={item.label === 'WhatsApp' ? '_blank' : undefined}
                    rel={item.label === 'WhatsApp' ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-500">{item.label}</p>
                      <p className="text-white font-medium group-hover:text-teal-400 transition-colors break-all">
                        {item.value}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-teal-400 group-hover:translate-x-1 transition-all shrink-0" />
                  </motion.a>
                ))}
              </div>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] text-white font-semibold rounded-full hover:brightness-110 transition-all duration-300 hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Jean
              </a>
            </motion.div>

            {/* Enquiry form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10"
            >
              <h3 className="text-xl font-semibold text-white mb-2">Send an enquiry</h3>
              <p className="text-slate-400 text-sm mb-8">
                Fill this in and your email app will open with the message ready to send.
              </p>

              {sent ? (
                <div className="flex flex-col items-center justify-center text-center py-12 gap-3">
                  <CheckCircle2 className="w-12 h-12 text-teal-400" />
                  <p className="text-white font-medium">Opening your email…</p>
                  <p className="text-slate-400 text-sm max-w-xs">
                    If nothing opened, email us at integrationsspecialists@gmail.com or use WhatsApp.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-4 text-teal-400 text-sm hover:text-teal-300"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm text-slate-400 mb-1.5">
                      Name
                    </label>
                    <input
                      id="name"
                      required
                      value={form.name}
                      onChange={update('name')}
                      className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-400/50"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm text-slate-400 mb-1.5">
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={update('phone')}
                      className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-400/50"
                      placeholder="064 …"
                    />
                  </div>
                  <div>
                    <label htmlFor="location" className="block text-sm text-slate-400 mb-1.5">
                      Town / area
                    </label>
                    <input
                      id="location"
                      value={form.location}
                      onChange={update('location')}
                      className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-400/50"
                      placeholder="e.g. farm name or nearest town"
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-sm text-slate-400 mb-1.5">
                      Interested in
                    </label>
                    <select
                      id="service"
                      value={form.service}
                      onChange={update('service')}
                      className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-400/50"
                    >
                      <option value="" className="bg-slate-900">
                        Select a service
                      </option>
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-slate-900">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm text-slate-400 mb-1.5">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={form.message}
                      onChange={update('message')}
                      className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-400/50 resize-none"
                      placeholder="Tell us about your property or project…"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Send Enquiry
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
