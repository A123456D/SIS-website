/**
 * Generate Pip FAQ bank: 100 Q&A × 6 services + 100 integration = 700.
 * Run: node scripts/generate-pip-faq-bank.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outFile = path.resolve(__dirname, '../src/data/pipFaqBank.js');

const SERVICES = [
  {
    id: 'solar',
    topic: 'solar',
    path: '/services/solar',
    name: 'hybrid solar / renewable energy',
    short: 'solar',
    tags: ['solar', 'renewable', 'hybrid', 'battery', 'inverter', 'panels', 'backup', 'outage'],
    nouns: ['system', 'install', 'backup', 'battery bank', 'inverter', 'panel array', 'setup'],
  },
  {
    id: 'automation',
    topic: 'home automation',
    path: '/services/automation',
    name: 'home automation',
    short: 'automation',
    tags: ['automation', 'smart home', 'lighting', 'climate', 'scenes', 'sensors'],
    nouns: ['system', 'setup', 'lighting plan', 'scene', 'controller', 'install'],
  },
  {
    id: 'av',
    topic: 'home theatre',
    path: '/services/av',
    name: 'AV / home theatre',
    short: 'home theatre',
    tags: ['theatre', 'theater', 'av', 'atmos', 'audio', 'cinema', 'speakers', 'display'],
    nouns: ['room', 'system', 'setup', 'speaker layout', 'display', 'install'],
  },
  {
    id: 'cctv',
    topic: 'cctv',
    path: '/services/cctv',
    name: 'CCTV & security',
    short: 'CCTV',
    tags: ['cctv', 'camera', 'cameras', 'security', 'nvr', 'surveillance'],
    nouns: ['system', 'camera set', 'install', 'NVR setup', 'coverage plan'],
  },
  {
    id: 'agriculture',
    topic: 'hybrid power',
    path: '/services/agriculture',
    name: 'hybrid power systems',
    short: 'hybrid power',
    tags: ['hybrid power', 'farm', 'rural power', 'generator', 'distribution', 'surge'],
    nouns: ['system', 'install', 'distribution board', 'backup plan', 'setup'],
  },
  {
    id: 'wifi',
    topic: 'rural internet',
    path: '/services/wifi',
    name: 'rural connectivity / MikroTik',
    short: 'rural internet',
    tags: ['wifi', 'internet', 'mikrotik', 'mesh', 'rural', 'wireless', 'network'],
    nouns: ['network', 'link', 'mesh', 'router setup', 'install', 'coverage'],
  },
];

const AUDIENCES = ['home', 'estate', 'commercial site', 'office', 'farm', 'rural property', 'warehouse'];
const JEAN = 'WhatsApp Jean with your town/area and what you need for a proper quote.';

function pad(n) {
  return String(n).padStart(3, '0');
}

function entry({ id, topic, title, answer, keys, tags, path: p, priority = 7 }) {
  return {
    id,
    topic,
    title,
    answer,
    keys,
    tags,
    path: p || null,
    priority,
    followUps: ['How do I get a quote?', 'What services do you offer?', 'Do you cover my area?'],
    whatsappText: `Hi Jean, I was asking Pip about: ${title}`,
  };
}

function makeServiceFaqs(svc) {
  const list = [];
  const qas = [];

  // Core set of unique question/answer builders (will expand to 100)
  qas.push(
    [
      `What is ${svc.name}?`,
      `${svc.name[0].toUpperCase()}${svc.name.slice(1)} at SIS means we design and install it as part of your wider property systems—not a random bolt-on. ${JEAN}`,
    ],
    [
      `Do you install ${svc.short}?`,
      `Yes—SIS designs and installs ${svc.name} for homes, commercial sites, and rural properties. ${JEAN}`,
    ],
    [
      `How does ${svc.short} work?`,
      `We size and design your ${svc.short} around how you actually use the property, then install and commission it properly. For site-specific detail, ${JEAN}`,
    ],
    [
      `Why choose SIS for ${svc.short}?`,
      `Because we plan ${svc.short} together with power, security, automation, AV, and connectivity where it matters—so you’re not stuck with mismatched vendors. ${JEAN}`,
    ],
    [
      `How much does ${svc.short} cost?`,
      `Every property is different, so we don’t publish fixed prices. Typical starting points are on the site; Jean scopes the real install to your needs. ${JEAN}`,
    ],
    [
      `How long does a ${svc.short} install take?`,
      `It depends on scope—small upgrades can be quick; fuller systems take longer for design, install, and commissioning. Jean will outline a timeline with your quote.`,
    ],
    [
      `Do you do ${svc.short} for commercial sites?`,
      `Yes. We design ${svc.name} for commercial floors, yards, and business sites as well as homes. ${JEAN}`,
    ],
    [
      `Do you do ${svc.short} for farms?`,
      `Yes—rural and farm properties are a core part of how SIS works. Share your location and loads/needs with Jean for a realistic plan.`,
    ],
    [
      `Can ${svc.short} work during power outages?`,
      svc.id === 'solar' || svc.id === 'agriculture' || svc.id === 'cctv'
        ? `That’s a big part of the design conversation—backup power, UPS, and priority circuits keep the right things alive in an outage. ${JEAN}`
        : `Where outage resilience matters, we plan ${svc.short} alongside hybrid power / UPS so it doesn’t die when the grid does. ${JEAN}`,
    ],
    [
      `Do I need to replace everything for ${svc.short}?`,
      `Often no. We’ll assess what you already have and integrate or upgrade where it makes sense instead of ripping out working gear by default.`,
    ],
  );

  // Expand with patterned but unique variants
  const starters = [
    'Tell me about',
    'Explain',
    'What should I know about',
    'How do I get started with',
    'Is SIS good for',
    'Can you help with',
    'Do you offer',
    'What’s included in',
    'How do you design',
    'What goes into',
  ];
  const subjects = [
    `${svc.short} for my house`,
    `${svc.short} for my business`,
    `a new ${svc.nouns[0]}`,
    `${svc.short} upgrades`,
    `${svc.short} maintenance`,
    `${svc.short} after installation`,
    `${svc.short} and load shedding`,
    `${svc.short} on a tight timeline`,
    `${svc.short} in South Africa`,
    `phased ${svc.short}`,
  ];

  for (const st of starters) {
    for (const sub of subjects) {
      qas.push([
        `${st} ${sub}?`,
        `For ${sub}, SIS starts with how you use the property, then designs ${svc.name} to fit—standalone or integrated with your other systems. ${JEAN}`,
      ]);
    }
  }

  // More specific thematic questions
  const extras = [
    [`What brands do you use for ${svc.short}?`, `We recommend proven building blocks for the job—not a locked single-brand catalogue. Jean will propose what fits your site and budget.`],
    [`Do you provide support after ${svc.short} install?`, `Yes—after commissioning we’ll explain how to live with the system, and you can WhatsApp Jean if something needs attention.`],
    [`Can I expand my ${svc.short} later?`, `Usually yes. We like designs that can grow in phases so you’re not forced into a huge day-one spend.`],
    [`Is ${svc.short} worth it?`, `If downtime, comfort, security, or connectivity is costing you, a well-designed ${svc.short} usually pays back in reliability and day-to-day ease. Jean can sanity-check your case.`],
    [`What prep do I need before ${svc.short}?`, `A clear sense of priorities (what must stay on / which rooms / coverage areas) helps a lot. Photos and your town/area speed up quoting.`],
    [`Do you handle electrical compliance for ${svc.short}?`, `Electrical work that needs compliance is done to South African practice; Jean will note CoC needs for your scope.`],
    [`Can ${svc.short} integrate with my other SIS systems?`, `Yes—that’s the SIS approach. ${svc.short} is planned so it can talk to power, security, automation, AV, and connectivity where useful.`],
    [`What if my property is remote?`, `Remote and rural sites are normal for us—especially when ${svc.short} has to survive distance, weather, and outages. ${JEAN}`],
    [`Do you survey the site for ${svc.short}?`, `For real installs we scope the property properly—remote photos help first; a site visit may follow depending on the job.`],
    [`Can renters get ${svc.short}?`, `Sometimes, with landlord permission. Portable or reversible options depend on the system—ask Jean what’s realistic.`],
    [`What’s the difference between a cheap ${svc.short} kit and SIS?`, `Kits are generic. SIS designs around your circuits, rooms, coverage, and how systems share power and control.`],
    [`Will ${svc.short} work with generator backup?`, `Often yes—hybrid designs can include generator where it makes sense. We’ll say when it’s useful vs battery-first.`],
    [`Do you install ${svc.short} in townhouses?`, `Yes, within body-corporate / estate rules. We’ll plan for space, noise, and cable routes carefully.`],
    [`Can I control ${svc.short} from my phone?`, svc.id === 'automation' || svc.id === 'cctv' || svc.id === 'av' || svc.id === 'wifi'
      ? `Yes—phone apps and remote access are common; we’ll set access up cleanly and securely.`
      : `Monitoring and status apps depend on the gear—many modern ${svc.short} setups include app visibility. Jean will confirm for your design.`],
    [`What happens in a ${svc.short} fault?`, `We commission carefully and leave you with clear support paths. WhatsApp Jean if something looks wrong after install.`],
    [`Do you remove old ${svc.short} gear?`, `We can strip or re-use existing equipment as part of the plan—only replace what’s actually holding you back.`],
    [`Is financing available for ${svc.short}?`, `SIS offers financing on qualifying projects. Ask Jean when you enquire.`],
    [`What documents do I get after ${svc.short}?`, `You’ll get a clear handover for how the system works; compliance docs depend on the electrical scope.`],
    [`Can ${svc.short} reduce my bills?`, svc.id === 'solar' || svc.id === 'agriculture' || svc.id === 'automation'
      ? `Often yes—solar offsets grid use, and automation can cut wasteful lighting/climate runtime. Exact savings need your usage profile.`
      : `Indirectly—better ${svc.short} can prevent losses (downtime, theft, inefficiency). Bill impact depends on the system.`],
    [`Do you do weekend ${svc.short} installs?`, `Scheduling depends on crew and scope. Jean will propose dates that fit the job safely—not rushed shortcuts.`],
  ];
  qas.push(...extras);

  // Audience-specific
  for (const aud of AUDIENCES) {
    qas.push([
      `Do you design ${svc.short} for a ${aud}?`,
      `Yes. A ${aud} gets a ${svc.short} plan matched to its loads, layout, and risks—not a one-size kit. ${JEAN}`,
    ]);
    qas.push([
      `What does ${svc.short} look like on a ${aud}?`,
      `On a ${aud} we prioritise the circuits, rooms, or coverage that matter most, then build ${svc.name} around that. ${JEAN}`,
    ]);
  }

  // Deduplicate by question text, take 100
  const seen = new Set();
  for (const [title, answer] of qas) {
    const key = title.toLowerCase().trim();
    if (seen.has(key)) continue;
    seen.add(key);
    const n = list.length + 1;
    if (n > 100) break;
    const keys = [
      key,
      svc.short,
      svc.name,
      ...key
        .replace(/[^\w\s]/g, ' ')
        .split(/\s+/)
        .filter((w) => w.length > 3)
        .slice(0, 8),
    ];
    list.push(
      entry({
        id: `bank-${svc.id}-${pad(n)}`,
        topic: svc.topic,
        title,
        answer,
        keys: [...new Set(keys.map((k) => k.toLowerCase()))],
        tags: [...svc.tags],
        path: svc.path,
        priority: n <= 15 ? 9 : 7,
      }),
    );
  }

  // If still short, pad with numbered variants
  let i = list.length;
  while (list.length < 100) {
    i += 1;
    const noun = svc.nouns[i % svc.nouns.length];
    const aud = AUDIENCES[i % AUDIENCES.length];
    const title = `Question ${i} about ${svc.short} for a ${aud} ${noun}`;
    const altTitle = `How should I plan ${svc.short} #${i} on my ${aud}?`;
    const useTitle = seen.has(altTitle.toLowerCase()) ? title : altTitle;
    seen.add(useTitle.toLowerCase());
    list.push(
      entry({
        id: `bank-${svc.id}-${pad(list.length + 1)}`,
        topic: svc.topic,
        title: useTitle,
        answer: `Planning ${svc.short} on a ${aud} means matching the ${noun} to real use—priority needs first, then clean integration with your other SIS systems. ${JEAN}`,
        keys: [useTitle.toLowerCase(), svc.short, aud, noun, 'plan'],
        tags: [...svc.tags, aud.split(' ')[0]],
        path: svc.path,
        priority: 6,
      }),
    );
  }

  return list.slice(0, 100);
}

function makeIntegrationFaqs() {
  const pairs = [
    ['solar', 'CCTV'],
    ['solar', 'automation'],
    ['solar', 'home theatre'],
    ['solar', 'rural internet'],
    ['automation', 'CCTV'],
    ['automation', 'home theatre'],
    ['automation', 'rural internet'],
    ['CCTV', 'rural internet'],
    ['CCTV', 'home theatre'],
    ['hybrid power', 'CCTV'],
    ['hybrid power', 'automation'],
    ['hybrid power', 'rural internet'],
  ];
  const list = [];
  const qas = [
    ['Do you integrate all your services?', 'Yes. SIS designs power, security, automation, AV, and connectivity as one environment—not separate silos.'],
    ['Why integrate systems instead of buying separately?', 'Separate vendors often leave gaps in outages, networking, and control. One plan means fewer surprises and cleaner support.'],
    ['Can solar power my CCTV?', 'Yes—cameras and NVRs are classic priority loads on hybrid backup so security doesn’t die in an outage.'],
    ['Can automation run on backup power?', 'We put critical automation/controllers on circuits that stay up with hybrid backup where that matters.'],
    ['Does home theatre need special power?', 'Dedicated AV circuits and clean power planning help; we can keep essentials on backup without wasting battery on the whole cinema.'],
    ['How does MikroTik help CCTV?', 'Stable networking and PoE planning keep cameras, NVRs, and remote viewing reliable—especially on rural links.'],
    ['Can one app control everything?', 'Not always one magical app—but we design so systems cooperate: power, scenes, security, and network working as one story.'],
    ['Do I have to install everything at once?', 'No. Phased installs are common—start with power or security, then add automation/AV/connectivity without redoing the plan.'],
    ['What does “systems integration” mean at SIS?', 'It means designing how power, security, automation, AV, and connectivity share circuits, networks, and control—so they behave as one property system.'],
    ['Will integrated systems cost more?', 'Sometimes day-one cost is similar; the win is fewer reworks, fewer gaps in outages, and one accountable design. Jean quotes the real scope.'],
  ];

  for (const [a, b] of pairs) {
    qas.push([
      `How do ${a} and ${b} work together?`,
      `We plan ${a} and ${b} on shared power/network assumptions so they don’t fight each other—especially during outages and remote access. ${JEAN}`,
    ]);
    qas.push([
      `Should I install ${a} before ${b}?`,
      `Order depends on your risks. Often power/connectivity foundations first, then security and automation/AV. Jean will recommend a sequence for your site.`,
    ]);
    qas.push([
      `Can ${a} share a network with ${b}?`,
      `Usually yes—we design VLANs/Wi‑Fi/cabling so ${a} and ${b} are stable without clogging each other. Rural MikroTik setups are built for that.`,
    ]);
  }

  const themes = [
    'outages',
    'remote monitoring',
    'one vendor',
    'phased rollout',
    'farm integration',
    'estate integration',
    'commercial integration',
    'cable planning',
    'DB / circuit planning',
    'user training',
  ];
  for (const t of themes) {
    qas.push([
      `How does SIS handle ${t} across systems?`,
      `Across power, CCTV, automation, AV, and connectivity we design for ${t} up front—so you’re not patching gaps later. ${JEAN}`,
    ]);
    qas.push([
      `Why does ${t} matter for integrated homes?`,
      `${t[0].toUpperCase()}${t.slice(1)} is where single-purpose installs usually fail. SIS plans the joins so the whole property still behaves when conditions get messy.`,
    ]);
  }

  const seen = new Set();
  for (const [title, answer] of qas) {
    const key = title.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    if (list.length >= 100) break;
    list.push(
      entry({
        id: `bank-integration-${pad(list.length + 1)}`,
        topic: 'integration',
        title,
        answer,
        keys: [key, 'integrate', 'integration', 'together', 'one system', 'systems'],
        tags: ['integrate', 'integration', 'together', 'cross-system', 'sis'],
        path: null,
        priority: list.length < 20 ? 12 : 8,
      }),
    );
  }

  let n = list.length;
  while (list.length < 100) {
    n += 1;
    const [a, b] = pairs[n % pairs.length];
    const title = `Integration tip ${n}: linking ${a} with ${b}`;
    list.push(
      entry({
        id: `bank-integration-${pad(list.length + 1)}`,
        topic: 'integration',
        title,
        answer: `When linking ${a} with ${b}, we align power, networking, and control so both stay useful in normal days and during outages. ${JEAN}`,
        keys: [title.toLowerCase(), a, b, 'integrate', 'together'],
        tags: ['integrate', 'integration', a, b],
        path: null,
        priority: 6,
      }),
    );
  }
  return list.slice(0, 100);
}

const all = [];
for (const svc of SERVICES) {
  const chunk = makeServiceFaqs(svc);
  console.log(svc.id, chunk.length);
  all.push(...chunk);
}
const integ = makeIntegrationFaqs();
console.log('integration', integ.length);
all.push(...integ);

const body = `/**
 * Auto-generated Pip FAQ bank — 100 Q&A per service + 100 integration.
 * Regenerate: node scripts/generate-pip-faq-bank.mjs
 */
export const PIP_FAQ_BANK = ${JSON.stringify(all, null, 2)};
`;

fs.writeFileSync(outFile, body, 'utf8');
console.log('wrote', outFile, 'total', all.length);
