import React, { useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, MessageCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getServiceById, services } from '@/data/services';

const WHATSAPP_URL =
  'https://wa.me/27646517446?text=' +
  encodeURIComponent("Hi Jean, I'd like to enquire about SIS services.");

export default function ServiceDetail() {
  const { serviceId } = useParams();
  const service = getServiceById(serviceId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  if (!service) {
    return <Navigate to="/" replace />;
  }

  const related = services.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <Navbar solid />

      <section className="relative pt-28 md:pt-32">
        <div className="relative h-[42vh] min-h-[280px] max-h-[420px] overflow-hidden">
          <img src={service.image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/55 to-slate-900/25" />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-6xl mx-auto w-full px-6 lg:px-8 pb-10">
              <Link
                to="/#services"
                className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white mb-5 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                All services
              </Link>
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 shadow-lg`}
              >
                <service.icon className="w-7 h-7 text-white" />
              </div>
              <p className="text-sm font-semibold tracking-wider uppercase text-teal-300 mb-2">
                {service.subtitle}
              </p>
              <h1 className="font-display text-3xl md:text-5xl font-semibold text-white max-w-3xl">
                {service.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-lg text-slate-600 leading-relaxed mb-10"
            >
              {service.description}
            </motion.p>

            <h2 className="text-xl font-semibold text-slate-900 mb-4">What’s included</h2>
            <div className="flex flex-wrap gap-3 mb-10">
              {service.features.map((feature) => (
                <div
                  key={feature.text}
                  className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-200 text-sm text-slate-700"
                >
                  <feature.icon className="w-4 h-4 text-teal-600" />
                  {feature.text}
                </div>
              ))}
            </div>

            <h2 className="text-xl font-semibold text-slate-900 mb-4">Benefits</h2>
            <ul className="space-y-3 mb-10">
              {service.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-slate-600">
                  <ArrowRight
                    className={`w-5 h-5 mt-0.5 flex-shrink-0 bg-gradient-to-r ${service.color} rounded-full p-1 text-white`}
                  />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-28 rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Talk to Jean</h3>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                Tell us about your property and we’ll confirm what fits—and whether we cover your area.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-[#25D366] text-white font-semibold rounded-full hover:brightness-110 transition-all mb-3"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
              <Link
                to="/#contact"
                className="w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-teal-500/25 transition-all"
              >
                Send an enquiry
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="pb-20 md:pb-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-14">
          <h2 className="font-display text-2xl font-semibold text-slate-900 mb-6">
            Related services
          </h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {related.map((item) => (
              <Link
                key={item.id}
                to={`/services/${item.id}`}
                className="group rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-md transition-all"
              >
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center mb-3`}
                >
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-slate-900 group-hover:text-teal-700 mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600">{item.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
