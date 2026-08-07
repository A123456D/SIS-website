/**
 * Pip’s primary job: snap visitors to the right place on the site
 * without endless scrolling. Q&A rides on top of this map.
 */
import { services } from '@/data/services';

/** Main page sections — order matches the home page. */
export const PAGE_SECTIONS = [
  {
    id: 'about',
    label: 'About SIS',
    blurb: 'Who we are and how we think',
    keys: ['about', 'philosophy', 'who you are', 'company', 'sis'],
  },
  {
    id: 'services',
    label: 'Services',
    blurb: 'All six service overview cards',
    keys: ['services', 'service list', 'what you offer', 'offerings'],
  },
  {
    id: 'packages',
    label: 'Starting points',
    blurb: 'Typical systems we design',
    keys: ['packages', 'starting points', 'essentials', 'typical'],
  },
  {
    id: 'agriculture',
    label: 'Agriculture',
    blurb: 'Farm power, MikroTik & CCTV',
    keys: [
      'agriculture',
      'agricultural',
      'farm',
      'farms',
      'farming',
      'rural',
      'homestead',
      'smallholding',
    ],
  },
  {
    id: 'process',
    label: 'How it works',
    blurb: 'Enquire → install → support',
    keys: ['process', 'how it works', 'steps', 'workflow', 'timeline'],
  },
  {
    id: 'brands',
    label: 'Tech we use',
    blurb: 'MikroTik, solar, CCTV, AV…',
    keys: ['brands', 'tech', 'technology', 'mikrotik', 'dolby'],
  },
  {
    id: 'coverage',
    label: 'Coverage',
    blurb: 'Homes · business · beyond town',
    keys: ['coverage', 'area', 'where', 'location', 'commercial'],
  },
  {
    id: 'faq',
    label: 'FAQ',
    blurb: 'Outages, CoC, support…',
    keys: ['faq', 'questions', 'frequently', 'common questions'],
  },
  {
    id: 'contact',
    label: 'Contact / quote',
    blurb: 'WhatsApp, phone, enquiry form',
    keys: ['contact', 'quote', 'enquiry', 'email', 'phone', 'whatsapp', 'jean'],
  },
];

/** Service detail pages (separate routes). */
export const SERVICE_JUMPS = services.map((s) => ({
  id: s.id,
  label: s.title,
  blurb: s.summary,
  path: `/services/${s.id}`,
  keys: [
    s.id,
    s.title.toLowerCase(),
    ...s.title.toLowerCase().split(/[\s&/·-]+/).filter((w) => w.length > 2),
  ],
}));

export function buildJumpMenuReply() {
  return {
    text: 'Here’s a map of the site — tap anywhere you’d like to go, or keep asking me questions.',
    emotion: 'happy',
    topic: 'jump-menu',
    showJumpMap: true,
    showWhatsApp: false,
    followUps: [
      'What services do you offer?',
      'Do you help with power outages?',
      'How do I get a quote?',
    ],
  };
}

export function buildWelcomeMessage() {
  return {
    role: 'assistant',
    text: 'Hi — I’m Pip, your SIS assistant. Ask me about solar, automation, home theatre, CCTV, rural internet, or how we work.',
    emotion: 'wave',
    topic: 'welcome',
    showJumpMap: false,
    showWhatsApp: true,
    followUps: [
      'What is hybrid solar backup?',
      'What is home automation?',
      'How do I get a quote?',
    ],
  };
}

/** Detect “take me to FAQ”, “show contact”, “where is process”, etc. */
export function matchJumpIntent(rawMessage) {
  const m = String(rawMessage || '')
    .toLowerCase()
    .replace(/[^\w\s#+.-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!m) return null;

  const navCue =
    /\b(take me|show me|show|go to|jump to|open|scroll to|where is|where's|find|navigate|see the|look at)\b/.test(
      m
    );
  const isQuestion =
    /^(what|who|how|why|do|does|can|is|are|tell)\b/.test(m) || /\?$/.test(String(rawMessage || '').trim());

  // Pure jump menu requests
  if (
    /\b(jump menu|show jump|site map|where can i go|show (me )?(the )?menu|show (me )?(the )?site map)\b/.test(m) ||
    m === 'jump' ||
    m === 'menu' ||
    m === 'navigate'
  ) {
    return { kind: 'menu' };
  }

  // Questions are for Q&A (still get a Jump button on the answer) — unless they used nav language
  if (isQuestion && !navCue) {
    return null;
  }

  for (const section of PAGE_SECTIONS) {
    const tokens = m.split(/\s+/);
    const exact =
      m === section.id ||
      m === section.label.toLowerCase() ||
      section.keys.some((k) => m === k) ||
      tokens.includes(section.id);
    const loose = section.keys.some((k) => k.length >= 3 && m.includes(k));

    if (exact || (navCue && loose) || (m.startsWith('where') && loose)) {
      return {
        kind: 'section',
        sectionId: section.id,
        label: section.label,
        blurb: section.blurb,
      };
    }
  }

  if (navCue) {
    for (const svc of SERVICE_JUMPS) {
      if (svc.keys.some((k) => k.length > 2 && m.includes(k))) {
        return {
          kind: 'service',
          path: svc.path,
          label: svc.label,
          blurb: svc.blurb,
          sectionId: null,
        };
      }
    }
  }

  return null;
}

export function jumpReply(target) {
  if (!target || target.kind === 'menu') {
    return buildJumpMenuReply();
  }

  if (target.kind === 'section') {
    return {
      text: `Taking you to ${target.label} — ${target.blurb}.`,
      emotion: 'happy',
      topic: target.label,
      sectionId: target.sectionId,
      sectionLabel: target.label,
      autoJump: true,
      showWhatsApp: target.sectionId === 'contact',
      followUps: [
        'What services do you offer?',
        'How do I get a quote?',
        'Do you help with power outages?',
      ],
    };
  }

  if (target.kind === 'service') {
    return {
      text: `Opening ${target.label} for you.`,
      emotion: 'happy',
      topic: target.label,
      path: target.path,
      autoJump: true,
      showWhatsApp: true,
      followUps: ['What services do you offer?', 'How do I get a quote?', 'Do you cover my area?'],
    };
  }

  return buildJumpMenuReply();
}
