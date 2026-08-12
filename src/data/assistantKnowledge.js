/**
 * Pip conversation engine — navigation-first (snap to page sections),
 * then answers from site knowledge about services and company info.
 */
import { services } from '@/data/services';
import { PIP_KNOWLEDGE, CONTACT } from '@/data/siteKnowledge';
import {
  PAGE_SECTIONS,
  matchJumpIntent,
  jumpReply,
  buildJumpMenuReply,
  buildWelcomeMessage,
} from '@/data/pipNav';

export { PAGE_SECTIONS } from '@/data/pipNav';

export const WHATSAPP_ASSISTANT_URL = whatsappUrl(
  'Hi Jean, I have a question from the SIS website assistant.'
);

export function whatsappUrl(text) {
  return `${CONTACT.whatsappBase}?text=${encodeURIComponent(text)}`;
}

export function getServiceMenu() {
  return services.map((service) => ({
    id: service.id,
    title: service.title,
    summary: service.summary,
    path: `/services/${service.id}`,
  }));
}

export function buildServicesReply() {
  return {
    text: 'Here’s what we offer — tap a service for the full page, or ask me anything about them.',
    services: getServiceMenu(),
    sectionId: 'services',
    sectionLabel: 'Services overview',
    showWhatsApp: true,
    emotion: 'happy',
    topic: 'services',
    followUps: [
      'Do you do solar for commercial?',
      'Rural internet / MikroTik?',
      'How do I get a quote?',
    ],
    whatsappHref: WHATSAPP_ASSISTANT_URL,
  };
}

export const WELCOME_MESSAGE = buildWelcomeMessage();

/** Quick site-section shortcuts (shown as Explore, not as Pip’s identity). */
export const JUMP_CHIPS = PAGE_SECTIONS.map((s) => ({
  label: s.label,
  sectionId: s.id,
}));

/** Secondary ask chips. */
export const TOPIC_CHIPS = [
  { label: 'Solar backup', ask: 'What is hybrid solar backup?' },
  { label: 'Automation', ask: 'What is home automation?' },
  { label: 'Home theatre', ask: 'What is home theatre?' },
  { label: 'CCTV', ask: 'Tell me about CCTV' },
];

export const quickPrompts = [
  'What is hybrid solar backup?',
  'What is home automation?',
  'Do you do Dolby Atmos?',
  'How do I get a quote?',
];

export function buildJumpMenu() {
  return buildJumpMenuReply();
}

const STOPWORDS = new Set([
  'a', 'an', 'the', 'do', 'does', 'did', 'you', 'your', 'yours', 'for', 'to', 'of',
  'and', 'or', 'is', 'are', 'was', 'were', 'be', 'we', 'me', 'my', 'i', 'with', 'on',
  'in', 'at', 'can', 'could', 'would', 'should', 'what', 'which', 'who', 'how', 'any',
  'about', 'from', 'into', 'that', 'this', 'it', 'if', 'also', 'just', 'please',
  'want', 'need', 'get', 'got', 'have', 'has', 'had', 'will', 'there', 'their',
  'them', 'they', 'our', 'us', 'am', 'im', 'i\'m', 'kinda', 'like', 'really',
]);

const SYNONYMS = [
  [/load[\s-]?shedding/g, 'power outage'],
  [/loadshedding/g, 'power outage'],
  [/black ?outs?/g, 'power outage'],
  [/power cuts?/g, 'power outage'],
  [/wi[\s-]?fi/g, 'wifi'],
  [/internet connection/g, 'internet'],
  [/cameras?/g, 'cctv camera'],
  [/surveillance/g, 'cctv'],
  [/security cameras?/g, 'cctv'],
  [/home theater/g, 'home theatre'],
  [/movie room/g, 'home theatre'],
  [/cinema room/g, 'home theatre'],
  [/smart home/g, 'home automation'],
  [/quotation/g, 'quote'],
  [/how much (does|do|will|would) (it|this|that|solar|cctv|a system)/g, 'quote price'],
  [/pricey|expensive|affordable|cheap/g, 'price'],
  [/biz|businesses/g, 'business'],
  [/offices?/g, 'office commercial'],
  [/warehouses?/g, 'warehouse commercial'],
  [/shops?/g, 'shop commercial'],
  [/factories|factory/g, 'industrial commercial'],
  [/homestead/g, 'farm rural'],
  [/smallholding/g, 'farm rural'],
  [/plot\b/g, 'farm rural'],
  [/integerated|intergrated/g, 'integrated'],
  [/integerate|intergrate|integate|integrting/g, 'integrate'],
  [/integeration|intergration|integartion/g, 'integration'],
];

const AUDIENCE = new Set([
  'commercial', 'business', 'farm', 'farms', 'rural', 'home', 'homes',
  'residential', 'office', 'warehouse', 'industrial', 'estate', 'estates',
]);

const SERVICEISH = new Set([
  'solar', 'renewable', 'hybrid', 'power', 'cctv', 'camera', 'cameras',
  'wifi', 'internet', 'mikrotik', 'theatre', 'theater', 'automation',
  'security', 'backup', 'battery', 'inverter', 'av', 'lighting',
]);

/** Tokens that mean the question is about SIS / our offers (not random life stuff). */
const SIS_SCOPE = new Set([
  ...SERVICEISH,
  'sis', 'pip', 'panel', 'panels', 'photovoltaic', 'pv', 'batteries', 'lithium',
  'kwh', 'outage', 'outages', 'loadshedding', 'generator', 'genset', 'coc',
  'compliance', 'atmos', 'dolby', 'cinema', 'acoustic', 'nvr', 'poe',
  'mesh', 'wireless', 'network', 'connectivity', 'router',
  'smart', 'hvac', 'climate', 'lighting', 'scene', 'scenes',
  'quote', 'quotes', 'pricing', 'price', 'cost', 'finance', 'financing',
  'contact', 'whatsapp', 'jean', 'email', 'phone', 'enquiry', 'inquiry',
  'coverage', 'area', 'service', 'services', 'offering', 'offerings',
  'package', 'packages', 'process', 'faq', 'integrate', 'integration',
  'commercial', 'business', 'farm', 'farms', 'rural', 'residential',
  'home', 'homes', 'estate', 'estates', 'office', 'warehouse', 'industrial',
  'agriculture', 'install', 'installation', 'design', 'system', 'systems',
]);

/** Clear off-topic trades / topics SIS does not do. */
const OFF_TOPIC =
  /\b(fix(ing)?|repair(ing)?|leak(y|ing)?|plumb(ing|er)?|gutter|til(e|es|ing)|ceiling|paint(ing)?|garden|lawn|pool|fence|paving|car\b|vehicle|mechanic|dentist|doctor|lawyer|attorney|homework|recipe|cook(ing)?|crypto|bitcoin|stock market|boyfriend|girlfriend|weather forecast)\b/;

const OFF_TOPIC_FALLBACK = {
  text: 'I don’t know about that — I’m built for SIS. Ask me about our services (solar, hybrid power, automation, home theatre, CCTV, rural internet), coverage, process, or quotes.',
  showWhatsApp: true,
  emotion: 'confused',
  topic: 'out-of-scope',
  followUps: [
    'What services do you offer?',
    'Do you cover my area?',
    'How do I get a quote?',
  ],
  whatsappHref: WHATSAPP_ASSISTANT_URL,
};

function queryTouchesSisScope(queryNorm, queryTokens) {
  if (queryTokens.some((t) => SIS_SCOPE.has(t))) return true;
  // Multi-word scope cues that may not survive tokenization cleanly
  if (
    /\b(home automation|home theatre|home theater|rural internet|power outage|load shedding|get a quote|whatsapp jean|dolby atmos)\b/.test(
      queryNorm
    )
  ) {
    return true;
  }
  return false;
}

function hasStrongKeyHit(queryNorm, entry) {
  for (const key of entry.keys || []) {
    const k = normalize(key);
    if (!k) continue;
    if (k.includes(' ') && queryNorm.includes(k)) return true;
    // Longer single-word keys (mikrotik, financing, etc.)
    if (!k.includes(' ') && k.length >= 6 && queryNorm.includes(k)) return true;
  }
  return false;
}

function isOffTopicQuestion(message) {
  const m = normalize(message);
  if (!m) return false;
  // Roof repair / fix roof without solar context
  if (/\b(roof|roofs)\b/.test(m) && !/\b(solar|panel|panels|pv|inverter|battery)\b/.test(m)) {
    if (/\b(fix|repair|leak|tile|gutter|replace|paint)\b/.test(m) || /\bcan you\b/.test(m)) {
      return true;
    }
  }
  if (OFF_TOPIC.test(m) && !queryTouchesSisScope(expandSynonyms(message), tokenize(message))) {
    return true;
  }
  return false;
}

function normalize(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^\w\s#+.-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function expandSynonyms(text) {
  let out = normalize(text);
  for (const [pattern, replacement] of SYNONYMS) {
    out = out.replace(pattern, replacement);
  }
  return out.replace(/\s+/g, ' ').trim();
}

function tokenize(text) {
  return expandSynonyms(text)
    .split(' ')
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

function isFollowUpFragment(message) {
  const m = normalize(message);
  if (!m) return false;
  if (m.split(' ').length <= 5) {
    if (
      /^(and |for |what about |how about |also |yes |no |ok |okay )/.test(m) ||
      /^(for )?(commercial|business|farms?|rural|homes?|residential)\??$/.test(m) ||
      /^(tell me more|more info|more details|and pricing|the price|how much)\??$/.test(m)
    ) {
      return true;
    }
  }
  return false;
}

function wantsServiceList(message) {
  const m = expandSynonyms(message);
  if (!m) return false;

  // Integration / “do they work together?” is NOT a catalogue request
  if (
    /\b(integrat|together|combin|one system|as one|cross.?system|joined.?up|seamless)\w*\b/.test(m)
  ) {
    return false;
  }

  if (
    /^(what )?services( do you offer)?$/.test(m) ||
    /^(your |all |show |list )?services$/.test(m) ||
    m === 'what can you do' ||
    m === 'what do you do'
  ) {
    return true;
  }

  const hasServiceWord = /\b(service|services|offering|offerings)\b/.test(m);
  const hasOfferWord = /\b(offer|offers|offering)\b/.test(m);
  const hasAskWord = /\b(what|which|list|show|tell|available|provide)\b/.test(m);
  const hasSpecific =
    /\b(solar|cctv|wifi|automation|theatre|theater|commercial|rural|mikrotik|hybrid)\b/.test(m);

  if (hasServiceWord && (hasAskWord || hasOfferWord) && !hasSpecific) return true;
  if (hasOfferWord && hasAskWord && !hasSpecific) return true;
  if (/\bwhat (can|do) you (do|offer)\b/.test(m) && !hasSpecific) return true;

  return false;
}

/** Hiring / careers — Pip stays out of HR. */
function isHiringQuestion(message) {
  const m = normalize(message);
  return (
    /\b(hir(e|ing|ed)|hiring|job|jobs|vacanc(y|ies)|career|careers|recruit|recruiting|employment|employ)\b/.test(
      m
    ) ||
    /\b(work|working) (for|at|with) (you|sis|the company)\b/.test(m) ||
    /\bare you (looking for|taking on) (staff|people|employees|technicians)\b/.test(m)
  );
}

/** Meta: how many questions / is there a limit. */
function isQuestionLimitQuery(message) {
  const m = normalize(message);
  if (
    /\b(how many|how much|limit|unlimited|max|maximum|cap)\b/.test(m) &&
    /\b(questions?|asks?|queries|messages|chats?)\b/.test(m)
  ) {
    return true;
  }
  if (/\b(can i (keep|just) ask|am i limited|is there a limit)\b/.test(m)) return true;
  if (/\b(question limit|ask forever|ask as many)\b/.test(m)) return true;
  return false;
}

/** Silly “are you a computer” / RAM / CPU jokes aimed at Pip. */
function isPipHardwareJoke(message) {
  const m = normalize(message);
  if (
    /\b(ram|memory|cpu|gpu|vram|bandwidth|megabytes?|gigabytes?|fps|ping|latency)\b/.test(m) &&
    /\b(you|your|pip|eating|eat|using|use|running|run|have|got|need)\b/.test(m)
  ) {
    return true;
  }
  if (/\b(how much (ram|memory)|are you (a )?(robot|server|computer|pc|laptop))\b/.test(m)) {
    return true;
  }
  if (/\b(what (are|is) you (running|powered)|powered by|what chip)\b/.test(m)) {
    return true;
  }
  return false;
}

/**
 * High-priority meta / banter replies — must run before knowledge scoring,
 * which greedily matches phrases like “how much” → pricing and “how many” → battery.
 */
function matchMetaReply(rawMessage) {
  const message = expandSynonyms(rawMessage);

  if (isHiringQuestion(message)) {
    return {
      text: 'That’s above my clearance level.',
      emotion: 'confused',
      topic: 'hiring',
      showWhatsApp: true,
      followUps: ['What services do you offer?', 'How do I get a quote?', 'Do you cover my area?'],
      whatsappHref: WHATSAPP_ASSISTANT_URL,
    };
  }

  if (isQuestionLimitQuery(message)) {
    return {
      text: 'Ask as many SIS questions as you like — solar, hybrid power, automation, home theatre, CCTV, rural internet, coverage, process, or quotes. I only cover what we do here, though; off-topic stuff I’ll pass on.',
      emotion: 'happy',
      topic: 'pip-limits',
      showWhatsApp: true,
      followUps: ['What services do you offer?', 'What is hybrid solar backup?', 'How do I get a quote?'],
      whatsappHref: WHATSAPP_ASSISTANT_URL,
    };
  }

  if (isPipHardwareJoke(message)) {
    return {
      text: 'Zero. I don’t eat RAM — I run on good questions and Jean’s WhatsApp. Ask me something about SIS and I’ll earn my keep.',
      emotion: 'happy',
      topic: 'pip-banter',
      showWhatsApp: true,
      followUps: ['Who are you?', 'What services do you offer?', 'How do I get a quote?'],
      whatsappHref: WHATSAPP_ASSISTANT_URL,
    };
  }

  return null;
}

function queryHasAudience(tokens) {
  return tokens.some((t) => AUDIENCE.has(t));
}

function scoreEntry(queryNorm, queryTokens, entry) {
  let match = 0;
  const tagSet = new Set((entry.tags || []).map((t) => normalize(t)));
  const hay = normalize(
    [entry.title, entry.answer, entry.detail, ...(entry.tags || []), ...(entry.keys || [])].join(' ')
  );

  // Audience-gated entries (e.g. commercial-solar) need an audience word in the query
  if (entry.audienceRequired && !queryHasAudience(queryTokens)) {
    // Still allow exact multi-word keys that already include audience
    let keyOnly = 0;
    for (const key of entry.keys || []) {
      const k = normalize(key);
      if (k && queryNorm.includes(k) && AUDIENCE.has(k.split(' ')[0])) {
        keyOnly += 18;
      }
    }
    if (keyOnly === 0) return 0;
    match += keyOnly;
  }

  for (const key of entry.keys || []) {
    const k = normalize(key);
    if (!k) continue;
    if (queryNorm.includes(k)) {
      match += k.includes(' ') ? 20 : Math.max(6, Math.min(k.length + 2, 14));
    }
  }

  // Prefer multi-word key hits; avoid scoring short tokens that only appear inside longer keys in hay
  for (const token of queryTokens) {
    if (token.length < 4) continue;
    if (tagSet.has(token)) {
      match += 8;
      continue;
    }
    let tagHit = false;
    for (const tag of tagSet) {
      if (tag.length >= 4 && (tag.includes(token) || token.includes(tag))) {
        match += 5;
        tagHit = true;
        break;
      }
    }
    if (tagHit) continue;
    if (hay.includes(token)) match += 2;
  }

  const qAudience = queryTokens.filter((t) => AUDIENCE.has(t));
  const qService = queryTokens.filter((t) => SERVICEISH.has(t));
  if (qAudience.length && qService.length) {
    const entryHasAudience = qAudience.some((t) => tagSet.has(t) || hay.includes(t));
    const entryHasService = qService.some((t) => tagSet.has(t) || hay.includes(t));
    if (entryHasAudience && entryHasService) match += 18;
  }

  // Prefer shorter, more specific entries when scores are close — applied as priority later
  if (match <= 0) return 0;
  return match + (entry.priority || 0);
}

function findBestKnowledge(rawMessage) {
  const queryNorm = expandSynonyms(rawMessage);
  const queryTokens = tokenize(rawMessage);
  const inScope = queryTouchesSisScope(queryNorm, queryTokens);

  // Phrase-only questions ("who are you?") may have zero tokens after stopword removal
  if (!queryTokens.length && !queryNorm) return null;

  let best = null;
  let bestScore = 0;
  let bestStrong = false;
  const ranked = [];

  for (const entry of PIP_KNOWLEDGE) {
    const score = scoreEntry(queryNorm, queryTokens, entry);
    if (score <= 0) continue;
    const strong = hasStrongKeyHit(queryNorm, entry);
    // Off-SIS wording must earn a real key phrase match — not a lonely tag like “roof”
    if (!inScope && !strong) continue;
    ranked.push({ entry, score, strong });
    if (score > bestScore || (score === bestScore && strong && !bestStrong)) {
      bestScore = score;
      best = entry;
      bestStrong = strong;
    }
  }

  ranked.sort((a, b) => b.score - a.score);

  const minScore = queryTokens.length === 0 ? 12 : queryTokens.length <= 2 ? 8 : 10;
  if (!best || bestScore < minScore) return null;
  if (!inScope && !bestStrong) return null;

  return { entry: best, score: bestScore, ranked: ranked.slice(0, 3) };
}

function topicSeed(topic) {
  const t = normalize(topic);
  if (!t) return '';
  if (/solar|renewable|energy|outage|backup|battery/.test(t)) return 'solar';
  if (/cctv|security|camera/.test(t)) return 'cctv';
  if (/wifi|internet|mikrotik|rural connectivity|connectivity/.test(t)) return 'internet';
  if (/theatre|theater|cinema|av|audio/.test(t)) return 'home theatre';
  if (/automation|smart/.test(t)) return 'home automation';
  if (/hybrid power|agriculture/.test(t)) return 'hybrid power';
  return t;
}

function emotionFor(entry, score) {
  if (!entry) return 'confused';
  if (entry.id === 'about-pip' || entry.id === 'about-sis') return 'wave';
  if (entry.id.includes('quote') || entry.id.includes('contact')) return 'happy';
  if (score >= 28) return 'happy';
  if (entry.id.startsWith('faq-')) return 'happy';
  return 'idle';
}

function sectionIdFromEntry(entry) {
  if (!entry?.section) return null;
  const m = String(entry.section).match(/#([\w-]+)/);
  return m ? m[1] : null;
}

function composeReply(entry, score, { isCapability, queryNorm, queryTokens } = {}) {
  let text = entry.answer;
  const entryHay = normalize(
    [entry.title, ...(entry.tags || []), ...(entry.keys || [])].join(' ')
  );
  const askingHowWhatWhy = /\b(how|what|why|when|where)\b/.test(queryNorm || '');
  const capabilityFits =
    isCapability &&
    !askingHowWhatWhy &&
    (entry.id.startsWith('service-') || entry.id.startsWith('domain-')) &&
    queryTokens?.some((t) => SERVICEISH.has(t) && (entryHay.includes(t) || SIS_SCOPE.has(t)));

  if (capabilityFits && !/^yes\b/i.test(text)) {
    text = `Yes. ${text}`;
  }

  const whatsappText =
    entry.whatsappText ||
    `Hi Jean, I was chatting with Pip about “${entry.title}”.`;

  const sectionId = sectionIdFromEntry(entry);
  const sectionMeta = PAGE_SECTIONS.find((s) => s.id === sectionId);

  const followUps = [...(entry.followUps || [])].filter(
    (f) => !/show jump menu|jump menu/i.test(f)
  );

  return {
    text,
    bullets: entry.bullets?.length ? entry.bullets : null,
    path: entry.path || null,
    sectionId,
    sectionLabel: sectionMeta?.label || null,
    services: null,
    showWhatsApp: true,
    emotion: emotionFor(entry, score),
    topic: entry.topic || entry.title,
    followUps: followUps.slice(0, 4),
    whatsappHref: whatsappUrl(whatsappText),
  };
}

/**
 * @param {string} rawMessage
 * @param {{ lastTopic?: string | null }} [context]
 */
export function getAssistantReply(rawMessage, context = {}) {
  let working = String(rawMessage || '').trim();
  const lastTopic = context.lastTopic || null;

  if (!working) {
    return {
      text: 'Ask me anything about SIS — services, coverage, process, or quotes.',
      emotion: 'listen',
      followUps: quickPrompts,
      showWhatsApp: true,
      whatsappHref: WHATSAPP_ASSISTANT_URL,
    };
  }

  // Navigation intents (still supported; not how Pip introduces himself)
  const jump = matchJumpIntent(working);
  if (jump) {
    return jumpReply(jump);
  }

  // Resolve short follow-ups using last topic (“for commercial?” after solar)
  if (lastTopic && isFollowUpFragment(working)) {
    const seed = topicSeed(lastTopic);
    working = seed ? `${seed} ${working}` : `${lastTopic} ${working}`;
  }

  const message = expandSynonyms(working);

  if (/^(hi|hello|hey|howdy|good (morning|afternoon|evening)|hola)\b/.test(message)) {
    return {
      text: 'Hi! I’m Pip — ask me about services, coverage, outages, or getting a quote.',
      emotion: 'wave',
      followUps: quickPrompts,
      showWhatsApp: true,
      topic: 'greeting',
      whatsappHref: WHATSAPP_ASSISTANT_URL,
    };
  }

  if (/^(thanks|thank you|thx|cheers|appreciate)\b/.test(message)) {
    return {
      text: 'Glad to help. Ask another question anytime — or WhatsApp Jean when you’re ready for a quote.',
      showWhatsApp: true,
      emotion: 'happy',
      topic: lastTopic || 'thanks',
      followUps: ['How do I get a quote?', 'What services do you offer?', 'Do you cover my area?'],
      whatsappHref: WHATSAPP_ASSISTANT_URL,
    };
  }

  if (/^(bye|goodbye|see you|later)\b/.test(message)) {
    return {
      text: 'Catch you later. I’m here whenever you need a hand.',
      emotion: 'wave',
      topic: 'bye',
      showWhatsApp: true,
      whatsappHref: WHATSAPP_ASSISTANT_URL,
      followUps: [],
    };
  }

  if (wantsServiceList(message)) {
    return buildServicesReply();
  }

  if (isOffTopicQuestion(working)) {
    return { ...OFF_TOPIC_FALLBACK, whatsappHref: WHATSAPP_ASSISTANT_URL };
  }

  const meta = matchMetaReply(working);
  if (meta) return meta;

  const hit = findBestKnowledge(working);
  if (hit) {
    const isCapability = /\b(do you|can you|did you|offer|install|provide|help with|cover|work with)\b/.test(
      message
    );
    return composeReply(hit.entry, hit.score, {
      isCapability,
      queryNorm: message,
      queryTokens: tokenize(working),
    });
  }

  return {
    ...OFF_TOPIC_FALLBACK,
    topic: lastTopic || 'unknown',
    whatsappHref: WHATSAPP_ASSISTANT_URL,
  };
}
