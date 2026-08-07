/**
 * Deep domain knowledge for Pip — solar, hybrid power, automation, AV/theatre,
 * CCTV, rural MikroTik networking, and how SIS ties them together.
 * Written to answer “how does this work?” questions, not invent SIS prices/brands.
 */

function entry(partial) {
  return {
    followUps: [],
    bullets: [],
    path: null,
    section: null,
    whatsappText: null,
    priority: 10,
    topic: partial.id,
    ...partial,
  };
}

/** @returns {Array<object>} */
export function buildDomainKnowledge() {
  const out = [];

  // ═══════════════════════════════════════════
  // SOLAR / RENEWABLE / BACKUP
  // ═══════════════════════════════════════════
  out.push(
    entry({
      id: 'domain-solar-what',
      topic: 'solar',
      title: 'What is hybrid solar backup?',
      answer:
        'Hybrid solar + battery backup uses panels (and often the grid) to charge lithium batteries through a hybrid inverter. When the grid fails, the inverter island-modes and keeps your priority circuits alive—lights, Wi‑Fi, fridge, security—without waiting for a generator to start.',
      bullets: [
        'Daytime solar can cut the bill and charge batteries',
        'Battery + inverter carry essentials through outages',
        'You choose which circuits are “must stay on”',
      ],
      tags: ['solar', 'hybrid', 'renewable', 'photovoltaic', 'pv', 'panels', 'how solar works'],
      keys: ['what is solar', 'how does solar work', 'hybrid solar', 'what is hybrid', 'solar backup', 'renewable energy'],
      path: '/services/solar',
      followUps: ['Do you help with power outages?', 'How big a battery do I need?', 'How do I get a quote?'],
      whatsappText: 'Hi Jean, I want to understand hybrid solar backup for my property.',
      priority: 14,
    }),
    entry({
      id: 'domain-solar-battery',
      topic: 'battery sizing',
      title: 'Battery sizing',
      answer:
        'Battery size is about how long you need essentials to run in an outage—not a random “3‑bedroom package.” We add up the watts on your priority circuits (lights, Wi‑Fi, fridge, CCTV, maybe a few plugs), estimate hours of backup you want, then size lithium capacity and inverter output to match. Jean will scope that properly after knowing your loads.',
      bullets: [
        'List must-stay-on circuits first',
        'Estimate hours of backup you care about',
        'Inverter size must cover surge (e.g. fridge start)',
      ],
      tags: ['battery', 'batteries', 'kwh', 'capacity', 'lithium', 'size', 'sizing', 'how big', 'how much battery'],
      keys: ['how big a battery', 'battery size', 'how many kwh', 'kwh battery', 'lithium size', 'how much battery'],
      path: '/services/solar',
      followUps: ['Do you help with power outages?', 'How do I get a quote?', 'What is a hybrid inverter?'],
      whatsappText: 'Hi Jean, can you help size a battery/backup for my property?',
      priority: 15,
    }),
    entry({
      id: 'domain-solar-inverter',
      topic: 'hybrid inverter',
      title: 'Hybrid inverter',
      answer:
        'A hybrid inverter is the brain of a modern backup system: it manages solar input, battery charge/discharge, and grid connection. In an outage it can form a local “micro-grid” for your priority DB circuits. That’s different from a simple grid-tied inverter that usually shuts down when the grid dies (anti-islanding).',
      bullets: [
        'Charges batteries from solar and/or grid',
        'Powers loads when the grid fails',
        'Needs correct changeover / DB design for safety',
      ],
      tags: ['inverter', 'hybrid inverter', 'offgrid', 'island', 'changeover'],
      keys: ['what is a hybrid inverter', 'hybrid inverter', 'inverter', 'grid tied vs hybrid'],
      path: '/services/solar',
      followUps: ['Do you help with power outages?', 'How big a battery do I need?', 'How do I get a quote?'],
      priority: 13,
    }),
    entry({
      id: 'domain-solar-outage',
      topic: 'outages',
      title: 'Power outages & grid failure',
      answer:
        'Yes—outage resilience is a core SIS design goal. Hybrid solar and lithium backup keep critical circuits online when the grid drops. We plan priority loads so you don’t try to run the whole house/farm off a small battery, and we can align CCTV and Wi‑Fi so security and connectivity don’t die mid-outage.',
      bullets: [
        'Priority circuit planning',
        'Lithium backup through grid failure',
        'Optional UPS pairing for cameras/network',
      ],
      tags: ['outage', 'outages', 'grid', 'failure', 'blackout', 'power cut', 'loadshedding', 'ups'],
      keys: ['power outage', 'grid failure', 'during outage', 'when power goes', 'load shedding'],
      path: '/services/solar',
      section: '/#faq',
      followUps: ['What about UPS for CCTV?', 'How big a battery do I need?', 'How do I get a quote?'],
      priority: 16,
    }),
    entry({
      id: 'domain-solar-panels',
      topic: 'solar panels',
      title: 'Solar panels',
      answer:
        'Panels harvest daytime energy. On a hybrid system that energy runs loads and tops up batteries; surplus can reduce what you buy from the grid. Roof orientation, shading, and available area matter more than marketing wattage alone—we design around your roof/site reality.',
      tags: ['panels', 'panel', 'photovoltaic', 'pv', 'roof', 'array'],
      keys: ['solar panels', 'how panels work', 'pv panels', 'roof solar'],
      path: '/services/solar',
      followUps: ['What is hybrid solar backup?', 'How do I get a quote?'],
      priority: 11,
    }),
    entry({
      id: 'domain-solar-vs-generator',
      topic: 'generator vs solar',
      title: 'Generator vs solar backup',
      answer:
        'Generators are great for long heavy loads but need fuel, noise management, and maintenance. Lithium hybrid backup is silent, starts instantly, and covers essentials cleanly—often the better “always on” layer. Many sites use both: battery for seamless cover, generator for extended deep outages. SIS designs hybrid power that can work with generators where it makes sense.',
      tags: ['generator', 'genset', 'diesel', 'petrol'],
      keys: ['generator vs solar', 'generator or battery', 'do i need a generator', 'solar vs generator'],
      path: '/services/agriculture',
      followUps: ['Do you help with power outages?', 'Tell me about hybrid power', 'How do I get a quote?'],
      priority: 12,
    }),
    entry({
      id: 'domain-solar-coc',
      topic: 'electrical compliance',
      title: 'Electrical compliance / CoC',
      answer:
        'Electrical work that requires compliance is handled to South African standards. A Certificate of Compliance (CoC) may be needed depending on the scope—DB changes, inverter installs, new circuits. We’ll advise what your project needs for a safe, compliant installation.',
      tags: ['coc', 'compliance', 'certificate', 'sabs', 'electrical', 'safety'],
      keys: ['certificate of compliance', 'do i need a coc', 'electrical compliance'],
      section: '/#faq',
      followUps: ['How does the process work?', 'How do I get a quote?'],
      priority: 12,
    })
  );

  // ═══════════════════════════════════════════
  // HYBRID POWER
  // ═══════════════════════════════════════════
  out.push(
    entry({
      id: 'domain-hybrid-power',
      topic: 'hybrid power',
      title: 'Hybrid power systems',
      answer:
        'Hybrid power means blending sources—grid, solar, battery, sometimes generator—so the site stays productive when one source fails. SIS designs distribution, surge protection, and backup so farms, commercial sites, and homes aren’t one fault away from total downtime.',
      bullets: [
        'Grid + solar + battery (and generator if needed)',
        'Surge & overload protection',
        'Sized to real site demand',
      ],
      tags: ['hybrid power', 'distribution', 'high voltage', 'surge', 'overload'],
      keys: ['hybrid power', 'what is hybrid power', 'power systems', 'tell me about hybrid power'],
      path: '/services/agriculture',
      section: '/#agriculture',
      followUps: ['Hybrid power for farms?', 'Do you do solar for commercial?', 'How do I get a quote?'],
      priority: 13,
    })
  );

  // ═══════════════════════════════════════════
  // HOME AUTOMATION
  // ═══════════════════════════════════════════
  out.push(
    entry({
      id: 'domain-automation-what',
      topic: 'home automation',
      title: 'What is home automation?',
      answer:
        'Home automation ties lighting, climate, security, and often AV into one controllable environment—app, voice, schedules, and sensors—so the house responds instead of you hunting remotes and wall switches. SIS designs it as part of the wider system, not a pile of unrelated gadgets.',
      bullets: [
        'Lighting scenes & schedules',
        'Climate / HVAC control',
        'Security & sensors in one picture',
      ],
      tags: ['automation', 'smart home', 'smart', 'lighting', 'climate', 'voice', 'alexa', 'google'],
      keys: [
        'what is home automation',
        'how does home automation work',
        'smart home',
        'home automation',
        'automate my home',
      ],
      path: '/services/automation',
      followUps: ['Can systems work together?', 'Do you help with power outages?', 'How do I get a quote?'],
      priority: 17,
    }),
    entry({
      id: 'domain-automation-lighting',
      topic: 'smart lighting',
      title: 'Smart lighting',
      answer:
        'Smart lighting lets you set scenes (evening, movie, away), dim by room, and automate with schedules or occupancy. Done properly it’s wired/planned into the home’s control layer so it still behaves predictably—and can sit alongside security and AV instead of fighting them.',
      tags: ['lighting', 'lights', 'dimmer', 'scenes', 'led'],
      keys: ['smart lighting', 'automate lights', 'lighting control', 'light scenes'],
      path: '/services/automation',
      followUps: ['What is home automation?', 'How do I get a quote?'],
      priority: 11,
    }),
    entry({
      id: 'domain-automation-climate',
      topic: 'climate control',
      title: 'Climate & HVAC automation',
      answer:
        'Climate automation schedules heating/cooling, setbacks when you’re away, and room-level comfort where the kit allows. Paired with energy awareness it can cut waste—especially useful alongside solar/backup planning so you’re not dumping battery into an empty house at full HVAC.',
      tags: ['climate', 'hvac', 'aircon', 'heating', 'thermostat', 'temperature'],
      keys: ['climate control', 'smart hvac', 'automate aircon', 'thermostat'],
      path: '/services/automation',
      followUps: ['What is home automation?', 'How do I get a quote?'],
      priority: 11,
    }),
    entry({
      id: 'domain-automation-security',
      topic: 'automation security',
      title: 'Automation + security',
      answer:
        'Automation and security belong together: door/window sensors, cameras, alarms, and lighting can share presence logic—“away” mode arms, lights simulate occupancy, alerts hit your phone. SIS plans CCTV and automation so they’re one environment, not two apps that ignore each other.',
      tags: ['security', 'sensors', 'alarm', 'away mode'],
      keys: ['automation and security', 'smart security', 'away mode'],
      path: '/services/automation',
      followUps: ['Tell me about CCTV', 'Can systems work together?', 'How do I get a quote?'],
      priority: 11,
    })
  );

  // ═══════════════════════════════════════════
  // HOME THEATRE / AV
  // ═══════════════════════════════════════════
  out.push(
    entry({
      id: 'domain-av-what',
      topic: 'home theatre',
      title: 'Home theatre & AV',
      answer:
        'A proper home theatre (or refined media lounge) is more than a big TV: display choice, speaker layout, acoustics, lighting, and sources planned as one room. SIS designs from lounge upgrades to dedicated cinema rooms—including surround formats like Dolby Atmos where the space and budget fit.',
      bullets: [
        'Display & viewing geometry',
        'Surround / Atmos speaker design',
        'Acoustic & lighting considerations',
      ],
      tags: ['theatre', 'theater', 'cinema', 'av', 'audio', 'visual', 'surround', 'atmos', 'dolby', '4k', '8k'],
      keys: [
        'what is home theatre',
        'home theatre',
        'home theater',
        'media lounge',
        'dolby atmos',
        'surround sound',
        'private cinema',
      ],
      path: '/services/av',
      followUps: ['Do you do Dolby Atmos?', 'Can systems work together?', 'How do I get a quote?'],
      priority: 16,
    }),
    entry({
      id: 'domain-av-atmos',
      topic: 'dolby atmos',
      title: 'Dolby Atmos',
      answer:
        'Yes—Dolby Atmos is part of how we think about serious AV. Atmos adds height channels so sound moves above you, not just around you. It needs the right speaker layout (or up-firing/ceiling strategy), amplification, and calibration—SIS designs that into the room instead of bolting it on later.',
      tags: ['atmos', 'dolby', 'immersive', 'height channels', 'surround'],
      keys: ['dolby atmos', 'do you do atmos', 'do you do dolby', 'atmos sound', 'immersive audio', 'dolby'],
      path: '/services/av',
      followUps: ['What is home theatre?', 'How do I get a quote?'],
      priority: 17,
    }),
    entry({
      id: 'domain-av-acoustic',
      topic: 'acoustics',
      title: 'Acoustics & room design',
      answer:
        'Hard rooms make great gear sound harsh. Acoustic treatment, seating layout, screen size vs distance, and lighting control decide whether a theatre feels cinematic or just loud. We factor that in—especially for dedicated rooms—rather than only shopping for a TV and a soundbar.',
      tags: ['acoustic', 'acoustics', 'treatment', 'echo', 'reverb', 'seating'],
      keys: ['acoustics', 'acoustic treatment', 'room treatment', 'theatre layout'],
      path: '/services/av',
      followUps: ['What is home theatre?', 'How do I get a quote?'],
      priority: 11,
    }),
    entry({
      id: 'domain-av-multiroom',
      topic: 'multi-room audio',
      title: 'Multi-room audio',
      answer:
        'Multi-room audio lets you play different (or the same) music across zones—kitchen, patio, lounge—with app control. It pairs naturally with home automation and can share infrastructure with a theatre install so you’re not running three competing audio ecosystems.',
      tags: ['multi-room', 'multiroom', 'zones', 'streaming', 'speakers'],
      keys: ['multi room audio', 'multiroom', 'whole home audio', 'music zones'],
      path: '/services/av',
      followUps: ['What is home theatre?', 'What is home automation?', 'How do I get a quote?'],
      priority: 11,
    })
  );

  // ═══════════════════════════════════════════
  // CCTV / SECURITY
  // ═══════════════════════════════════════════
  out.push(
    entry({
      id: 'domain-cctv-what',
      topic: 'cctv',
      title: 'CCTV & security',
      answer:
        'Modern IP CCTV gives HD/4K detail, remote phone viewing, motion alerts, and night vision. SIS designs camera placement for real coverage—entries, yards, driveways—and can pair UPS/backup so cameras keep recording when the grid fails.',
      bullets: [
        'HD/4K IP cameras',
        'Remote monitoring & alerts',
        'Optional UPS / outage-ready power',
      ],
      tags: ['cctv', 'camera', 'cameras', 'security', 'surveillance', 'nvr', 'monitoring', 'night vision'],
      keys: [
        'what is cctv',
        'how does cctv work',
        'security cameras',
        'tell me about cctv',
        'ip cameras',
        'camera system',
      ],
      path: '/services/cctv',
      followUps: ['What about UPS for CCTV?', 'Can systems work together?', 'How do I get a quote?'],
      priority: 14,
    }),
    entry({
      id: 'domain-cctv-ups',
      topic: 'cctv ups',
      title: 'CCTV during outages',
      answer:
        'Yes—cameras that die in an outage miss the moment you care about. We can include UPS or tie surveillance into hybrid backup so recording and alerts continue through power cuts. Typical property layouts are 4- or 8-camera starts, then grow.',
      tags: ['ups', 'outage', 'backup', 'cctv', 'power'],
      keys: ['cctv during outage', 'ups for cctv', 'cameras when power fails', 'cameras stay on'],
      path: '/services/cctv',
      followUps: ['Do you help with power outages?', 'How do I get a quote?'],
      priority: 15,
    }),
    entry({
      id: 'domain-cctv-remote',
      topic: 'remote viewing',
      title: 'Remote camera viewing',
      answer:
        'IP systems stream to your phone so you can check the property from anywhere. Motion alerts cut the noise versus watching 24/7. Good installs also plan storage (local NVR and/or cloud options) and network quality so remote viewing isn’t fragile.',
      tags: ['remote', 'phone', 'app', 'alerts', 'motion', 'nvr', 'cloud'],
      keys: ['remote viewing', 'view cameras on phone', 'motion alerts', 'nvr'],
      path: '/services/cctv',
      followUps: ['Tell me about CCTV', 'How do I get a quote?'],
      priority: 11,
    }),
    entry({
      id: 'domain-cctv-placement',
      topic: 'camera placement',
      title: 'Camera placement',
      answer:
        'Placement beats camera count. Cover approach paths, doors, gates, and blind corners; mind glare, height, and vandal risk. On farms and commercial yards we also think distance and weatherproofing—long drives and open ground need different lenses than a suburban front door.',
      tags: ['placement', 'coverage', 'blind spot', 'yard', 'gate'],
      keys: ['where to put cameras', 'camera placement', 'how many cameras'],
      path: '/services/cctv',
      followUps: ['Tell me about CCTV', 'How do I get a quote?'],
      priority: 11,
    })
  );

  // ═══════════════════════════════════════════
  // RURAL / MIKROTIK
  // ═══════════════════════════════════════════
  out.push(
    entry({
      id: 'domain-wifi-what',
      topic: 'rural internet',
      title: 'Rural connectivity / MikroTik',
      answer:
        'Rural connectivity is about stable internet where town Wi‑Fi doesn’t reach. SIS builds MikroTik-centred networks with long-range wireless links, mesh/whole-property coverage, and weatherproof outdoor gear—so work, streaming, cameras, and smart devices stay online on remote sites.',
      bullets: [
        'MikroTik router core',
        'Long-range / mesh coverage',
        'Outdoor weatherproof links where needed',
      ],
      tags: ['rural', 'internet', 'wifi', 'wi-fi', 'mikrotik', 'connectivity', 'mesh', 'wireless', 'network'],
      keys: [
        'rural internet',
        'how does mikrotik work',
        'mikrotik',
        'rural wifi',
        'farm internet',
        'remote internet',
        'what is mikrotik',
      ],
      path: '/services/wifi',
      section: '/#agriculture',
      followUps: ['Do you install in rural areas?', 'Do you cover my area?', 'How do I get a quote?'],
      priority: 14,
    }),
    entry({
      id: 'domain-wifi-mikrotik',
      topic: 'mikrotik',
      title: 'Why MikroTik?',
      answer:
        'MikroTik is a proven toolkit for serious routing and wireless links—especially useful on farms and sprawling properties where consumer routers fall over. We use it as the network core, then design coverage outward with the right outdoor radios and cabling for the terrain.',
      tags: ['mikrotik', 'router', 'routing'],
      keys: ['why mikrotik', 'mikrotik router', 'mikrotik network'],
      path: '/services/wifi',
      section: '/#agriculture',
      followUps: ['Rural internet / MikroTik?', 'How do I get a quote?'],
      priority: 12,
    }),
    entry({
      id: 'domain-wifi-mesh',
      topic: 'mesh wifi',
      title: 'Mesh & whole-property Wi‑Fi',
      answer:
        'Mesh and multi-AP designs spread coverage across the house, sheds, yard, or lodge instead of one overworked router in the lounge. On rural sites we often combine indoor Wi‑Fi with outdoor point-to-point or point-to-multipoint links between buildings.',
      tags: ['mesh', 'coverage', 'access point', 'wifi', 'buildings'],
      keys: ['mesh wifi', 'whole property wifi', 'wifi across farm', 'wifi between buildings'],
      path: '/services/wifi',
      section: '/#agriculture',
      followUps: ['Rural internet / MikroTik?', 'How do I get a quote?'],
      priority: 11,
    }),
    entry({
      id: 'domain-wifi-cameras',
      topic: 'network for cctv',
      title: 'Network + CCTV',
      answer:
        'Cameras need a network that can carry video without choking. On rural and commercial sites we design bandwidth, PoE, and uplink quality so CCTV and internet share infrastructure cleanly—especially important when you’re also running backup power for the rack.',
      tags: ['poe', 'bandwidth', 'nvr', 'network', 'cctv'],
      keys: ['network for cameras', 'wifi for cctv', 'poe cameras'],
      path: '/services/wifi',
      followUps: ['Tell me about CCTV', 'Rural internet / MikroTik?', 'How do I get a quote?'],
      priority: 11,
    })
  );

  // ═══════════════════════════════════════════
  // INTEGRATION / SIS APPROACH
  // ═══════════════════════════════════════════
  out.push(
    entry({
      id: 'domain-sis-approach',
      topic: 'how sis works',
      title: 'How SIS designs systems',
      answer:
        'SIS designs environments: power, security, automation, AV, and connectivity planned together so they share logic and infrastructure. You can still phase the install—start with outage essentials or CCTV, then grow—without painting yourself into a corner.',
      bullets: [
        'Cross-system design, not separate silos',
        'Phased growth when budget needs it',
        'Handover support so you can actually use it',
      ],
      tags: ['sis', 'design', 'environment', 'phased', 'approach'],
      keys: ['how does sis work', 'how do you design', 'your approach', 'phased install'],
      section: '/#process',
      followUps: ['Can systems work together?', 'How does the process work?', 'How do I get a quote?'],
      priority: 12,
    })
  );

  return out;
}

export const DOMAIN_KNOWLEDGE = buildDomainKnowledge();
