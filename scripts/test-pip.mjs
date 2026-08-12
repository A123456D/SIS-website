/**
 * Node test harness for Pip (no Vite aliases).
 * Run: node scripts/test-pip.mjs
 */
import { readFileSync, writeFileSync, unlinkSync } from 'fs';
import { pathToFileURL } from 'url';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '../src/data');

function rewrite(name, destName) {
  let src = readFileSync(join(dataDir, name), 'utf8');
  src = src
    .replaceAll("from '@/data/services'", "from './services.js'")
    .replaceAll("from '@/data/siteKnowledge'", "from './_tmp_sk.mjs'")
    .replaceAll("from '@/data/pipNav'", "from './_tmp_nav.mjs'")
    .replaceAll("from '@/data/pipDomainKnowledge'", "from './_tmp_domain.mjs'");
  writeFileSync(join(dataDir, destName), src);
}

rewrite('pipDomainKnowledge.js', '_tmp_domain.mjs');
rewrite('siteKnowledge.js', '_tmp_sk.mjs');
rewrite('pipNav.js', '_tmp_nav.mjs');
rewrite('assistantKnowledge.js', '_tmp_ak.mjs');

const { getAssistantReply } = await import(
  pathToFileURL(join(dataDir, '_tmp_ak.mjs')).href + '?t=' + Date.now()
);

const cases = [
  ['take me to faq', (r) => r.sectionId === 'faq' && r.autoJump],
  ['show contact', (r) => r.sectionId === 'contact' && r.autoJump],
  ['do you guys intergrate all your services', (r) => /^yes/i.test(r.text) && /one environment|together|silos/i.test(r.text)],
  ['what is hybrid solar backup?', (r) => /hybrid|battery|inverter/i.test(r.text)],
  ['how big a battery do I need?', (r) => /priority|loads|kwh|size/i.test(r.text)],
  ['what is a hybrid inverter?', (r) => /inverter/i.test(r.text)],
  ['what is home automation?', (r) => /lighting|climate|automation/i.test(r.text)],
  ['do you do dolby atmos?', (r) => /atmos/i.test(r.text)],
  ['what is home theatre?', (r) => /theatre|theater|cinema|av/i.test(r.text)],
  ['tell me about cctv', (r) => /camera|cctv|ip/i.test(r.text)],
  ['what is mikrotik?', (r) => /mikrotik/i.test(r.text)],
  ['how much does solar cost', (r) => /quote|price|whatsapp/i.test(r.text)],
  ['what services do you offer?', (r) => r.services?.length > 0 || /service|offer/i.test(r.text)],
  ['who are you?', (r) => /pip/i.test(r.text) && /assistant/i.test(r.text)],
  ['Are you hiring?', (r) => /clearance level/i.test(r.text)],
  ['How much ram are you eating?', (r) => /ram/i.test(r.text) && !/fixed prices/i.test(r.text)],
  ['How many questions can I ask', (r) => /sis|solar|only cover|off-topic/i.test(r.text) && !/no limit/i.test(r.text)],
  ['Where is Jean Avenue?', (r) => r.sectionId === 'contact' || /jean|contact|whatsapp/i.test(r.text)],
  ['can you fix my roof', (r) => /don.?t know|built for sis|ask me about/i.test(r.text)],
  ['can you paint my house', (r) => /don.?t know|built for sis|ask me about/i.test(r.text)],
  ['xyzzyfoobar', (r) => r.emotion === 'confused' || /don.?t know|not sure|built for sis/i.test(r.text)],
];

let failed = 0;
for (const [q, check] of cases) {
  const r = getAssistantReply(q);
  const ok = check(r);
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${q}`);
  console.log(`      → ${String(r.text).slice(0, 110).replace(/\n/g, ' ')}`);
  if (!ok) failed += 1;
}

const follow = getAssistantReply('for commercial?', { lastTopic: 'Renewable Energy' });
const followOk = /commercial/i.test(follow.text);
console.log(`${followOk ? 'PASS' : 'FAIL'}  follow-up after solar`);
if (!followOk) failed += 1;

for (const f of ['_tmp_domain.mjs', '_tmp_sk.mjs', '_tmp_nav.mjs', '_tmp_ak.mjs']) {
  unlinkSync(join(dataDir, f));
}

console.log(failed ? `\n${failed} failed` : '\nAll Pip tests passed');
process.exit(failed ? 1 : 0);
