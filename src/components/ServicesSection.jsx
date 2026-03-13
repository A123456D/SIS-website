import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sun, Home, Tv, Camera, Wifi, ArrowRight, Zap, Lightbulb, Shield, Volume2 } from 'lucide-react';

const services = [
  {
    id: 'solar',
    icon: Sun,
    title: 'Renewable Energy',
    subtitle: 'Harness the Power of the Sun',
    color: 'from-orange-500 to-amber-500',
    bgColor: 'from-orange-50 to-amber-50',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop',
    description: 'Solar energy converts sunlight directly into electricity using photovoltaic panels. These panels contain cells that generate direct current (DC) when exposed to light, which is then converted to alternating current (AC) for use in your home or business.',
    features: [
      { icon: Zap, text: 'Grid-tied & off-grid systems' },
      { icon: Lightbulb, text: 'Battery backup solutions' },
      { icon: Shield, text: 'Load shedding protection' },
    ],
    benefits: [
      'Reduce electricity bills by up to 80%',
      'Protect against rising energy costs',
      'Increase property value',
      'Minimize your carbon footprint',
    ],
  },
  {
    id: 'automation',
    icon: Home,
    title: 'Home Automation',
    subtitle: 'Intelligent Living Spaces',
    color: 'from-teal-500 to-cyan-500',
    bgColor: 'from-teal-50 to-cyan-50',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&auto=format&fit=crop',
    description: 'Home automation integrates technology to control lighting, climate, entertainment systems, and appliances through a centralized system. Using sensors, smart devices, and wireless protocols, your home learns your preferences and responds intuitively.',
    features: [
      { icon: Lightbulb, text: 'Smart lighting control' },
      { icon: Zap, text: 'Climate management' },
      { icon: Shield, text: 'Automated security' },
    ],
    benefits: [
      'Control everything from your smartphone',
      'Voice-activated convenience',
      'Energy savings through intelligent scheduling',
      'Enhanced security and peace of mind',
    ],
  },
  {
    id: 'av',
    icon: Tv,
    title: 'Audio-Visual Design',
    subtitle: 'Cinema-Quality Home Theatre',
    color: 'from-indigo-500 to-purple-500',
    bgColor: 'from-indigo-50 to-purple-50',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&auto=format&fit=crop',
    description: 'Our home theatre solutions bring the cinematic experience to your living space. We design custom audio-visual systems with precision acoustics, 4K/8K displays, surround sound, and ambient lighting that transforms any room into an immersive entertainment venue.',
    features: [
      { icon: Tv, text: '4K/8K display systems' },
      { icon: Volume2, text: 'Dolby Atmos surround sound' },
      { icon: Lightbulb, text: 'Ambient mood lighting' },
    ],
    benefits: [
      'Cinema-quality picture and sound',
      'Custom acoustic treatment',
      'Seamless streaming integration',
      'Multi-room audio distribution',
    ],
  },
  {
    id: 'cctv',
    icon: Camera,
    title: 'CCTV & Security',
    subtitle: 'Advanced Protection Systems',
    color: 'from-slate-600 to-slate-800',
    bgColor: 'from-slate-50 to-slate-100',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&auto=format&fit=crop',
    description: 'Modern CCTV systems go beyond simple recording. Our intelligent security solutions feature AI-powered analytics, facial recognition, motion detection, and remote monitoring—giving you complete visibility and control over your property 24/7.',
    features: [
      { icon: Camera, text: 'HD/4K camera systems' },
      { icon: Shield, text: 'AI-powered analytics' },
      { icon: Zap, text: 'Real-time alerts' },
    ],
    benefits: [
      '24/7 remote monitoring',
      'Night vision & thermal imaging',
      'Cloud & local storage options',
      'Integration with home automation',
    ],
  },
  {
    id: 'agriculture',
    icon: Zap,
    title: 'Hybrid High Voltage Systems for Agriculture, Residential & Commercial',
    subtitle: 'Modern Power Infrastructure',
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'from-yellow-50 to-orange-50',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&auto=format&fit=crop',
    description: 'Modern properties demand reliable, intelligent power infrastructure. We design and install hybrid high-voltage systems that combine grid power, solar energy, and backup solutions to deliver efficient, resilient electricity for agricultural operations, residential properties, and commercial facilities.',
    features: [
      { icon: Zap, text: 'Hybrid high-voltage distribution' },
      { icon: Shield, text: 'Integrated solar & battery backup' },
      { icon: Lightbulb, text: 'Smart surge & overload protection' },
      { icon: Sun, text: 'Energy-efficient system design' },
    ],
    benefits: [
      'Designed for agricultural, residential, and commercial power demands',
      'Compliant with industry electrical safety standards',
      'Reduced downtime during outages or peak demand',
      'Seamless integration with solar, generators, and smart energy systems',
    ],
  },
  {
    id: 'wifi',
    icon: Wifi,
    title: 'Rural Connectivity',
    subtitle: 'Internet for Remote Areas',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'from-green-50 to-emerald-50',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop',
    description: 'Living remotely doesn\'t mean living disconnected. We specialize in bringing reliable, high-speed internet to rural areas using a combination of satellite, fixed wireless, mesh networks, and signal boosting technologies tailored to your location.',
    features: [
      { icon: Wifi, text: 'Mesh network systems' },
      { icon: Zap, text: 'Long-range wireless' },
      { icon: Shield, text: 'Weatherproof equipment' },
    ],
    benefits: [
      'High-speed internet in remote locations',
      'Whole-property WiFi coverage',
      'Reliable video conferencing',
      'Smart device connectivity',
    ],
  },
];

function ServiceCard({ service, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.1 }}
      className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${!isEven ? 'lg:grid-flow-dense' : ''}`}
    >
      {/* Image */}
      <div className={`relative ${!isEven ? 'lg:col-start-2' : ''}`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${service.bgColor} rounded-3xl transform rotate-3`} />
        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
          <img 
            src={service.image} 
            alt={service.title}
            className="w-full h-72 lg:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className={`absolute bottom-6 left-6 w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg`}>
            <service.icon className="w-7 h-7 text-white" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}>
        <span className={`inline-block text-sm font-semibold bg-gradient-to-r ${service.color} bg-clip-text text-transparent tracking-wider uppercase mb-3`}>
          {service.subtitle}
        </span>
        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
          {service.title}
        </h3>
        <p className="text-slate-600 leading-relaxed mb-6">
          {service.description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-3 mb-6">
          {service.features.map((feature, i) => (
            <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border border-slate-200 text-sm text-slate-700">
              <feature.icon className="w-4 h-4 text-teal-600" />
              {feature.text}
            </div>
          ))}
        </div>

        {/* Benefits */}
        <ul className="space-y-2">
          {service.benefits.map((benefit, i) => (
            <li key={i} className="flex items-start gap-3 text-slate-600">
              <ArrowRight className={`w-5 h-5 mt-0.5 flex-shrink-0 bg-gradient-to-r ${service.color} rounded-full p-1 text-white`} />
              {benefit}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section id="services" className="py-24 md:py-32 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-sm font-semibold text-teal-600 tracking-wider uppercase mb-4">
            What We Offer
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Comprehensive Technology Solutions
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-600">
            From sustainable energy to intelligent living, we provide end-to-end solutions 
            that transform the way you interact with your environment.
          </p>
        </motion.div>

        {/* Services */}
        <div className="space-y-24 lg:space-y-32">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}