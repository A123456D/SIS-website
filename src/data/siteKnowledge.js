/**
 * Pip knowledge — SIS website copy + deep domain knowledge for each service area.
 */
import { services } from '@/data/services';
import { DOMAIN_KNOWLEDGE } from '@/data/pipDomainKnowledge';

export const CONTACT = {
  phoneDisplay: '064 651 7446',
  phoneTel: '+27646517446',
  email: 'integrationsspecialists@gmail.com',
  whatsappBase: 'https://wa.me/27646517446',
  name: 'Jean Conradie',
  company: 'SIS (Systems Integration Specialists)',
};

export const siteFaqs = [
  {
    q: 'Do you help with power outages and grid failure?',
    a: 'Yes. Hybrid solar and battery backup are a core part of what we design—keeping lights, connectivity, security, and critical circuits online when the grid goes down.',
    tags: ['outage', 'outages', 'grid', 'failure', 'backup', 'battery', 'power cut', 'blackout', 'ups', 'solar', 'loadshedding'],
    followUps: ['How do I get a quote?', 'Do you do solar for commercial?', 'What about UPS for CCTV?'],
  },
  {
    q: 'Do you install in rural areas?',
    a: 'Rural and farm properties are a strong focus, especially MikroTik-based connectivity paired with power and security. Message us your location and we’ll confirm coverage.',
    tags: ['rural', 'farm', 'farms', 'remote', 'area', 'coverage', 'location', 'town', 'where', 'install'],
    followUps: ['Rural internet / MikroTik?', 'Do you cover my area?', 'Hybrid power for farms?'],
    section: '/#agriculture',
  },
  {
    q: 'What brands and tech do you work with?',
    a: 'We design around proven building blocks for each job—MikroTik for rural networking, hybrid solar and lithium backup for power, IP CCTV for surveillance, and calibrated AV / home theatre systems for entertainment. We’ll recommend what fits your site, not a single locked brand list.',
    tags: ['brand', 'brands', 'mikrotik', 'tech', 'technology', 'equipment', 'dolby'],
    followUps: ['Tell me about MikroTik internet', 'What about home theatre?', 'How do I get a quote?'],
  },
  {
    q: 'Can systems work together?',
    a: 'Yes. That’s the whole point of SIS. We don’t drop in solar, CCTV, automation, AV, and connectivity as separate silos—we design them as one environment so power, security, and control actually talk to each other, and you’re not stuck with mismatched vendors.',
    tags: [
      'together',
      'integrate',
      'integration',
      'intergrate',
      'one system',
      'combine',
      'seamless',
      'all services',
      'everything',
      'joined',
    ],
    followUps: ['Full property integration?', 'What services do you offer?', 'How does the process work?'],
  },
  {
    q: 'How long does an install take?',
    a: 'It depends on scope—a focused CCTV or connectivity job is typically much quicker than a full hybrid solar + automation project. After assessment we give a realistic timeline before work starts.',
    tags: ['how long', 'timeline', 'duration', 'install take', 'weeks', 'days'],
    followUps: ['How does the process work?', 'How do I get a quote?', 'Do you offer support after installation?'],
  },
  {
    q: 'Do you offer support after installation?',
    a: 'Yes. We help with handover, app access, and practical support so you can actually use the system day to day—and refine it as your needs change.',
    tags: ['support', 'maintenance', 'help later', 'warranty', 'aftercare'],
    followUps: ['How does the process work?', 'How do I get a quote?', 'Contact Jean'],
  },
  {
    q: 'Do I need a Certificate of Compliance (CoC)?',
    a: 'Electrical work that requires compliance is handled to South African standards. We’ll advise what your project needs for safe, compliant installation.',
    tags: ['coc', 'compliance', 'certificate', 'sabs', 'electrical'],
    followUps: ['How does the process work?', 'Do you help with power outages?', 'How do I get a quote?'],
  },
  {
    q: 'Do you offer financing?',
    a: 'Yes. Financing is available for qualifying installs—so you can get the right system in place without having to pay everything upfront. Ask Jean when you enquire and we’ll walk you through the options for your project.',
    tags: ['finance', 'financing', 'payment plan', 'payment plans', 'instalment', 'installment', 'loan', 'afford', 'monthly', 'pay over time', 'credit'],
    followUps: ['How do I get a quote?', 'How does the process work?', 'Contact Jean'],
  },
  {
    q: 'Can you work with equipment I already have?',
    a: 'Often yes. We’ll assess existing solar, cameras, or networking and integrate or upgrade where it makes sense instead of replacing everything by default.',
    tags: ['existing', 'already have', 'upgrade', 'replace', 'retrofit'],
    followUps: ['How do I get a quote?', 'Do you help with power outages?', 'Contact Jean'],
  },
];

const packages = [
  {
    title: 'Power outage essentials',
    blurb:
      'Keep critical circuits alive—lights, Wi‑Fi, fridge, and security—through power outages and grid failure.',
    includes: [
      'Hybrid inverter + lithium backup sized to your loads',
      'Priority circuit planning',
      'Solar-ready or solar-included options',
    ],
    serviceId: 'solar',
    tags: ['package', 'packages', 'essentials', 'outage', 'backup', 'inverter', 'lithium'],
  },
  {
    title: 'Property security',
    blurb: 'See your home or farm from anywhere with HD/4K cameras and remote alerts.',
    includes: [
      'Typical 4- or 8-camera layouts',
      'Night vision & motion alerts',
      'Optional UPS so cameras stay up in a power outage',
    ],
    serviceId: 'cctv',
    tags: ['package', 'packages', 'security', 'camera', 'cameras', 'cctv'],
  },
  {
    title: 'Rural connectivity',
    blurb: 'Stable internet where town Wi‑Fi doesn’t reach—built on MikroTik networking.',
    includes: [
      'MikroTik router core',
      'Long-range / mesh coverage for the property',
      'Weatherproof outdoor links where needed',
    ],
    serviceId: 'wifi',
    tags: ['package', 'packages', 'rural', 'internet', 'wifi', 'mikrotik', 'mesh'],
  },
  {
    title: 'Home theatre & AV',
    blurb: 'From a refined media lounge to a dedicated private cinema room.',
    includes: [
      'Display & surround design',
      'Acoustic & lighting considerations',
      'Streaming and multi-room audio options',
    ],
    serviceId: 'av',
    tags: ['package', 'packages', 'theatre', 'theater', 'cinema', 'av', 'audio'],
  },
  {
    title: 'Full property integration',
    blurb: 'One plan that ties power, security, automation, AV, and connectivity together.',
    includes: [
      'Cross-system design (not separate silos)',
      'Phased install if you want to grow over time',
      'Centralised control where it makes sense',
    ],
    serviceId: 'automation',
    tags: ['package', 'packages', 'integration', 'full', 'property', 'phased'],
  },
];

const processSteps = [
  {
    title: 'Enquire',
    text: 'WhatsApp or email us with your property type and what you need—power, security, AV, or connectivity.',
  },
  {
    title: 'Site assessment',
    text: 'We review your setup, power-outage and grid-failure needs, layout, and any existing equipment on site or remotely.',
  },
  {
    title: 'Proposal',
    text: 'You get a clear scope for the right system—sized for your property, not a one-size package dump. Financing is available for qualifying installs.',
  },
  {
    title: 'Install',
    text: 'Professional installation and commissioning so everything works together as one environment.',
  },
  {
    title: 'Support',
    text: 'Guidance after handover—from app access and monitoring to tweaks as your needs grow.',
  },
];

function serviceExtra(serviceId) {
  const map = {
    solar: {
      tags: ['solar', 'renewable', 'lithium', 'inverter', 'pv', 'panels', 'battery', 'outage', 'grid', 'energy'],
      followUps: [
        'Do you do solar for commercial?',
        'Do you help with power outages?',
        'How do I get a quote?',
      ],
      whatsapp: 'Hi Jean, I’m interested in renewable energy / solar backup.',
    },
    automation: {
      tags: ['smart home', 'automation', 'lighting', 'climate', 'voice', 'smart'],
      followUps: ['Can systems work together?', 'Full property integration?', 'How do I get a quote?'],
      whatsapp: 'Hi Jean, I’m interested in home automation.',
    },
    av: {
      tags: ['theatre', 'theater', 'cinema', 'atmos', 'dolby', '4k', '8k', 'surround', 'av', 'audio', 'visual'],
      followUps: ['What brands and tech do you work with?', 'How do I get a quote?', 'Can systems work together?'],
      whatsapp: 'Hi Jean, I’m interested in home theatre / AV.',
    },
    cctv: {
      tags: ['camera', 'cameras', 'security', 'surveillance', 'nvr', 'monitoring', 'cctv'],
      followUps: ['What about UPS for CCTV?', 'Do you help with power outages?', 'How do I get a quote?'],
      whatsapp: 'Hi Jean, I’m interested in CCTV & security.',
    },
    agriculture: {
      tags: ['hybrid power', 'high voltage', 'commercial', 'farm', 'agricultural', 'surge', 'generator'],
      followUps: ['Do you do solar for commercial?', 'Hybrid power for farms?', 'How do I get a quote?'],
      whatsapp: 'Hi Jean, I’m interested in hybrid power systems.',
    },
    wifi: {
      tags: ['internet', 'wifi', 'wi-fi', 'connectivity', 'mikrotik', 'network', 'mesh', 'rural'],
      followUps: ['Do you install in rural areas?', 'Do you cover my area?', 'How do I get a quote?'],
      whatsapp: 'Hi Jean, I’m interested in rural connectivity / MikroTik.',
    },
  };
  return map[serviceId] || { tags: [], followUps: [], whatsapp: 'Hi Jean, I have a question from the SIS website.' };
}

/** @returns {Array<object>} */
export function buildPipKnowledge() {
  const entries = [];

  const push = (entry) => {
    entries.push({
      followUps: [],
      bullets: [],
      path: null,
      section: null,
      whatsappText: null,
      priority: 5,
      topic: entry.id,
      ...entry,
    });
  };

  // Deep domain knowledge first (solar, AV, automation, CCTV, MikroTik, hybrid…)
  for (const d of DOMAIN_KNOWLEDGE) {
    push(d);
  }

  // —— How SIS integrates (must beat “services” catalogue matching) ——
  push({
    id: 'integrate-all',
    topic: 'integration',
    title: 'Do you integrate all services?',
    answer:
      'Yes. That’s the whole point of SIS. We don’t install solar, CCTV, automation, AV, and connectivity as separate silos—we design them as one environment so power, security, and control actually work together, and you’re not juggling mismatched vendors.',
    bullets: [
      'One plan across power, security, automation, AV, and connectivity',
      'Phased installs if you want to grow over time',
      'Centralised control where it makes sense',
    ],
    tags: [
      'integrate',
      'integration',
      'together',
      'combine',
      'seamless',
      'all',
      'everything',
      'services',
      'systems',
    ],
    keys: [
      'integrate all',
      'integrate your services',
      'integrate all your services',
      'integrate everything',
      'do you integrate',
      'can you integrate',
      'work together',
      'systems work together',
      'all your services',
      'one environment',
      'one system',
    ],
    path: null,
    section: '/#packages',
    followUps: ['Full property integration?', 'What services do you offer?', 'How does the process work?'],
    whatsappText: 'Hi Jean, I’d like a joined-up system across a few SIS services.',
    priority: 18,
  });

  // —— Combinations people actually ask ——
  push({
    id: 'commercial-solar',
    topic: 'commercial solar',
    title: 'Commercial solar & hybrid power',
    answer:
      'Yes. Commercial is firmly in the mix—not an afterthought. We size hybrid solar and battery systems for business loads the same way we do for homes and rural sites: keep what matters online through outages, then grow the solar footprint as it makes sense.',
    bullets: [
      'Commercial loads, not a domestic kit stretched thin',
      'Solar + lithium backup for outages and grid failure',
      'Scoped to your site after a real assessment',
    ],
    tags: ['commercial', 'business', 'businesses', 'office', 'facility', 'company', 'warehouse', 'industrial'],
    keys: [
      'commercial solar',
      'solar for commercial',
      'solar commercial',
      'business solar',
      'solar for business',
      'commercial hybrid',
      'hybrid for commercial',
      'solar for a business',
      'solar for our business',
      'solar for my business',
      'commercial power',
      'power for commercial',
    ],
    path: '/services/agriculture',
    section: '/#coverage',
    followUps: ['How do I get a quote?', 'Do you cover my area?', 'Tell me about hybrid power'],
    whatsappText: 'Hi Jean, I need solar / hybrid power for a commercial site.',
    priority: 16,
    audienceRequired: true,
  });

  push({
    id: 'commercial-cctv',
    topic: 'commercial security',
    title: 'Commercial CCTV',
    answer:
      'Yes. Businesses and facilities get the full treatment—cameras that still report during a blackout, remote eyes on the yard, and UPS options so security doesn’t clock out when the grid does.',
    bullets: ['HD/4K IP camera systems', 'Remote alerts & monitoring', 'Outage-ready UPS options'],
    tags: ['commercial', 'business', 'office', 'facility', 'company'],
    keys: ['commercial cctv', 'cctv for commercial', 'business cctv', 'security for commercial', 'commercial security'],
    path: '/services/cctv',
    section: '/#coverage',
    followUps: ['Do you help with power outages?', 'How do I get a quote?', 'Can systems work together?'],
    whatsappText: 'Hi Jean, I need CCTV for a commercial site.',
    priority: 14,
    audienceRequired: true,
  });

  push({
    id: 'farm-power',
    topic: 'farm power',
    title: 'Hybrid power for farms',
    answer:
      'Yes. Farms and remote properties need power that doesn’t quit when the grid fails. We design hybrid systems combining grid, solar, and battery backup for agricultural sites—with surge protection and smart energy design.',
    bullets: [
      'Sized for farm demand',
      'Solar & battery backup integration',
      'Less downtime in outages or peak demand',
    ],
    tags: ['farm', 'farms', 'agricultural', 'agriculture', 'rural'],
    keys: ['farm power', 'hybrid power for farms', 'solar for farm', 'farm solar', 'agricultural power'],
    path: '/services/agriculture',
    section: '/#agriculture',
    followUps: ['Rural internet / MikroTik?', 'Do you cover my area?', 'How do I get a quote?'],
    whatsappText: 'Hi Jean, I need hybrid power for a farm / rural property.',
    priority: 14,
  });

  push({
    id: 'farm-internet',
    topic: 'rural internet',
    title: 'Farm / rural internet',
    answer:
      'Yes. Rural and farm properties are a strong focus. We specialise in MikroTik-powered networks with long-range / mesh coverage and weatherproof outdoor links—so remote sites stay connected.',
    bullets: ['MikroTik router core', 'Long-range / mesh coverage', 'Weatherproof outdoor gear'],
    tags: ['farm', 'farms', 'rural', 'remote', 'mikrotik', 'internet', 'wifi'],
    keys: [
      'farm internet',
      'rural internet',
      'internet for farm',
      'wifi for farm',
      'mikrotik',
      'rural wifi',
      'rural wi-fi',
    ],
    path: '/services/wifi',
    section: '/#agriculture',
    followUps: ['Do you cover my area?', 'Hybrid power for farms?', 'How do I get a quote?'],
    whatsappText: 'Hi Jean, I need rural / farm internet (MikroTik).',
    priority: 13,
  });

  push({
    id: 'cctv-ups',
    topic: 'cctv ups',
    title: 'CCTV through outages',
    answer:
      'Yes — modern CCTV should keep watching when the power doesn’t. Our IP camera systems can include UPS / backup integration so surveillance stays up during power outages and grid failure.',
    bullets: ['Remote monitoring & alerts', 'Night vision & motion detection', 'Optional UPS / outage-ready'],
    tags: ['cctv', 'ups', 'outage', 'camera', 'cameras', 'backup', 'security'],
    keys: ['ups for cctv', 'cctv ups', 'cameras during outage', 'cctv during outage', 'cameras stay up'],
    path: '/services/cctv',
    followUps: ['Do you help with power outages?', 'Property security package?', 'How do I get a quote?'],
    whatsappText: 'Hi Jean, I need CCTV that stays up during power outages.',
    priority: 12,
  });

  push({
    id: 'coverage-commercial',
    topic: 'commercial',
    title: 'Commercial sites',
    answer:
      'Yes. Businesses and facilities are part of the brief—power that stays up, CCTV that still sees in a blackout, and networks that don’t fold when the site gets busy.',
    bullets: ['Uptime-minded power', 'CCTV with remote eyes', 'Infrastructure that scales with the site'],
    tags: ['commercial', 'business', 'businesses', 'office', 'facility', 'facilities', 'company', 'warehouse', 'shop', 'retail', 'industrial'],
    keys: ['commercial', 'for commercial', 'for business', 'business site', 'office'],
    path: '/services/agriculture',
    section: '/#coverage',
    followUps: ['Do you do solar for commercial?', 'Commercial CCTV?', 'How do I get a quote?'],
    whatsappText: 'Hi Jean, do you cover commercial installs? My site is:',
    priority: 11,
  });

  push({
    id: 'coverage-farms',
    topic: 'farms',
    title: 'Farms & rural properties',
    answer:
      'Yes—and not as a side project. Farms and rural sites are where SIS feels most at home: MikroTik links that stretch, hybrid power that doesn’t flinch, and monitoring that works when you’re kilometres from town.',
    tags: ['farm', 'farms', 'rural', 'agricultural', 'agriculture', 'remote', 'homestead'],
    keys: ['farm', 'farms', 'rural property', 'agricultural'],
    path: '/services/wifi',
    section: '/#agriculture',
    followUps: ['Rural internet / MikroTik?', 'Hybrid power for farms?', 'Do you cover my area?'],
    whatsappText: 'Hi Jean, do you cover my farm / rural area? Location:',
    priority: 10,
  });

  push({
    id: 'coverage-homes',
    topic: 'homes',
    title: 'Homes & estates',
    answer:
      'Yes. For homes and estates we design the quiet version of “everything just works”—backup power, security, automation, and entertainment as one environment, not a pile of gadgets.',
    tags: ['residential', 'estate', 'estates', 'domestic', 'house'],
    keys: ['residential', 'estate', 'homes and estates', 'for my house', 'for my home'],
    // Avoid bare "home" — it collides with home theatre
    path: null,
    section: '/#coverage',
    followUps: ['What services do you offer?', 'Do you help with power outages?', 'How do I get a quote?'],
    whatsappText: 'Hi Jean, I’m looking at a residential install.',
    priority: 6,
  });

  push({
    id: 'coverage-area',
    topic: 'coverage',
    title: 'Service area',
    answer:
      'We work across homes, commercial sites, and rural properties in South Africa—especially where power, security, and internet have to survive distance and outages together. Send your town or farm name and we’ll confirm if we can reach you.',
    bullets: ['Tell us your town or farm name', 'We’ll confirm coverage straight', 'WhatsApp is the fastest check'],
    tags: ['coverage', 'area', 'location', 'town', 'south africa', 'where', 'travel', 'cover'],
    keys: ['coverage', 'service area', 'do you cover', 'where do you', 'my area', 'cover my', 'near me'],
    section: '/#coverage',
    followUps: ['How do I get a quote?', 'Contact Jean', 'What services do you offer?'],
    whatsappText: 'Hi Jean, do you cover my area? My location is:',
    priority: 10,
  });

  push({
    id: 'about-sis',
    topic: 'about',
    title: 'About SIS',
    answer:
      'SIS—Systems Integration Specialists—builds intelligent environments, not shopping lists of gadgets. Power, automation, security, rural connectivity, and home theatre planned as one story for homes, commercial sites, and rural properties.',
    tags: ['sis', 'company', 'about', 'philosophy'],
    keys: ['about sis', 'what is sis', 'who is sis', 'company', 'tell me about sis'],
    section: '/#about',
    followUps: ['What services do you offer?', 'How does the process work?', 'How do I get a quote?'],
    priority: 9,
  });

  push({
    id: 'about-pip',
    topic: 'pip',
    title: 'About Pip',
    answer:
      'I’m Pip, the SIS AI assistant. I know this website inside-out—and I can explain the tech behind what we do: hybrid solar and batteries, home automation, home theatre / Atmos, CCTV, MikroTik rural networks, and how those systems join up. For site-specific sizing and quotes, I’ll point you to Jean.',
    tags: ['pip', 'assistant', 'bot', 'robot', 'helper', 'ai'],
    keys: ['who are you', 'what are you', 'are you a bot', 'are you ai', 'your name', 'who is pip'],
    followUps: ['What is hybrid solar backup?', 'What is home automation?', 'How do I get a quote?'],
    priority: 10,
  });

  push({
    id: 'contact',
    topic: 'contact',
    title: 'Contact',
    answer: `Reach ${CONTACT.name} on WhatsApp or phone at ${CONTACT.phoneDisplay}, or email ${CONTACT.email}. WhatsApp is usually the fastest for quotes and coverage checks.`,
    tags: ['contact', 'phone', 'email', 'whatsapp', 'jean', 'call', 'speak', 'talk', 'number'],
    keys: ['contact', 'phone', 'email', 'whatsapp', 'jean', 'call', 'phone number'],
    section: '/#contact',
    followUps: ['How do I get a quote?', 'Do you cover my area?', 'What services do you offer?'],
    whatsappText: 'Hi Jean, I’d like to chat about SIS services.',
    priority: 11,
  });

  push({
    id: 'quote-pricing',
    topic: 'quote',
    title: 'Quotes & pricing',
    answer:
      'Every property is different, so we don’t publish fixed prices here. Typical starting points on the site show what we commonly design—then we size the real install to your property. Financing is available for qualifying projects. Share your town/area and what you need with Jean for a proper quote.',
    bullets: [
      'No fixed shop prices — scoped to your site',
      'Financing available for qualifying installs',
      'WhatsApp Jean with town/area + needs',
      'Or use the enquiry form on the contact section',
    ],
    tags: ['price', 'pricing', 'cost', 'quote', 'how much', 'expensive', 'budget', 'estimate', 'rates'],
    keys: ['how much', 'quote', 'pricing', 'cost', 'price', 'get a quote', 'quotation'],
    section: '/#contact',
    followUps: ['Do you offer financing?', 'How does the process work?', 'Do you cover my area?'],
    whatsappText: 'Hi Jean, I’d like a quote. My town/area is: … I need:',
    priority: 12,
  });

  push({
    id: 'financing',
    topic: 'financing',
    title: 'Financing',
    answer:
      'Yes—SIS offers financing for qualifying installs. That means you can get solar backup, security, connectivity, or a full integration without paying the full amount upfront. Ask Jean when you enquire and we’ll outline the options that fit your project.',
    bullets: [
      'Available on qualifying projects',
      'Discussed as part of your quote / proposal',
      'WhatsApp Jean to ask what’s possible for your install',
    ],
    tags: [
      'finance',
      'financing',
      'payment plan',
      'payment plans',
      'instalment',
      'installment',
      'loan',
      'afford',
      'monthly',
      'credit',
      'pay over time',
    ],
    keys: [
      'financing',
      'do you offer financing',
      'payment plan',
      'payment plans',
      'can i finance',
      'finance the install',
      'pay monthly',
      'instalments',
      'installments',
    ],
    section: '/#faq',
    followUps: ['How do I get a quote?', 'How does the process work?', 'Contact Jean'],
    whatsappText: 'Hi Jean, I’d like to ask about financing for an SIS install. My town/area is:',
    priority: 12,
  });

  push({
    id: 'process',
    topic: 'process',
    title: 'How it works',
    answer: `Simple path: ${processSteps.map((s) => s.title).join(' → ')}.`,
    bullets: processSteps.map((s) => `${s.title}: ${s.text}`),
    tags: ['process', 'how it works', 'steps', 'start', 'begin', 'enquire', 'proposal', 'workflow'],
    keys: ['how it works', 'process', 'get started', 'how do i start', 'next steps', 'what happens next'],
    section: '/#process',
    followUps: ['How do I get a quote?', 'How long does an install take?', 'Contact Jean'],
    whatsappText: 'Hi Jean, I’d like to get started with an enquiry.',
    priority: 10,
  });

  push({
    id: 'brands',
    topic: 'brands',
    title: 'Technologies',
    answer:
      'Technologies we design around include MikroTik, hybrid solar & lithium backup, IP CCTV, Dolby Atmos AV, smart home platforms, and fixed wireless & mesh. We’ll recommend what fits your site rather than locking you to one brand list.',
    tags: ['brand', 'brands', 'mikrotik', 'dolby', 'lithium', 'tech', 'technology'],
    keys: ['brands', 'technology', 'which brands', 'what tech'],
    section: '/#brands',
    followUps: ['Rural internet / MikroTik?', 'What about home theatre?', 'How do I get a quote?'],
    priority: 8,
  });

  push({
    id: 'packages-overview',
    topic: 'packages',
    title: 'Typical starting points',
    answer:
      'On the site you’ll see typical starting points—not fixed shop packages. We commonly design power-outage essentials, property security, rural MikroTik connectivity, home theatre & AV, and full property integration—then size the real install to your property.',
    bullets: packages.map((p) => p.title),
    tags: ['package', 'packages', 'starting', 'essentials', 'typical'],
    keys: ['packages', 'starting points', 'what do you typically', 'typical systems'],
    section: '/#packages',
    followUps: ['Power outage essentials?', 'Property security?', 'How do I get a quote?'],
    priority: 9,
  });

  siteFaqs.forEach((faq, i) => {
    push({
      id: `faq-${i}`,
      topic: faq.q,
      title: faq.q,
      answer: faq.a,
      tags: faq.tags,
      keys: [faq.q.toLowerCase(), ...faq.tags.slice(0, 5)],
      section: faq.section || '/#faq',
      followUps: faq.followUps || [],
      priority: 9,
    });
  });

  packages.forEach((pkg) => {
    push({
      id: `pkg-${pkg.serviceId}`,
      topic: pkg.title,
      title: pkg.title,
      answer: `${pkg.title}: ${pkg.blurb} These are starting points, not fixed shop packages—we size the real install to your property.`,
      bullets: pkg.includes,
      tags: pkg.tags,
      keys: [pkg.title.toLowerCase(), ...pkg.tags],
      path: `/services/${pkg.serviceId}`,
      section: '/#packages',
      followUps: ['How do I get a quote?', 'How does the process work?', 'What services do you offer?'],
      whatsappText: `Hi Jean, I’m interested in “${pkg.title}”.`,
      priority: 8,
    });
  });

  services.forEach((service) => {
    const extra = serviceExtra(service.id);
    push({
      id: `service-${service.id}`,
      topic: service.title,
      title: service.title,
      answer: `Yes — ${service.title} is one of our core services. ${service.summary}\n\n${service.description}`,
      bullets: [
        ...service.features.map((f) => f.text),
        ...service.benefits.slice(0, 3),
      ],
      detail: service.benefits.map((b) => `• ${b}`).join('\n'),
      tags: [
        service.id,
        ...service.title.toLowerCase().split(/[\s&/·-]+/).filter((w) => w.length > 2),
        ...extra.tags,
      ],
      keys: [
        service.title.toLowerCase(),
        service.id,
        service.subtitle.toLowerCase(),
        ...extra.tags.slice(0, 8),
      ],
      path: `/services/${service.id}`,
      followUps: extra.followUps,
      whatsappText: extra.whatsapp,
      priority: 8,
    });
  });

  return entries;
}

export const PIP_KNOWLEDGE = buildPipKnowledge();

/** Keep old import path working */
export const SITE_KNOWLEDGE = PIP_KNOWLEDGE;
