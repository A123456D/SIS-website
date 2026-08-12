import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  X,
  Send,
  Volume2,
  VolumeX,
  RotateCcw,
  List,
  MessageCircle,
  ExternalLink,
  Navigation,
} from 'lucide-react';
import {
  getAssistantReply,
  buildServicesReply,
  buildJumpMenu,
  quickPrompts,
  TOPIC_CHIPS,
  PAGE_SECTIONS,
  WHATSAPP_ASSISTANT_URL,
  WELCOME_MESSAGE,
} from '@/data/assistantKnowledge';
import { scrollToSectionId } from '@/components/Navbar';
import { pipSounds } from '@/lib/pipSounds';

const PIP = {
  idle: '/assets/pip/pip-idle.png',
  happy: '/assets/pip/pip-happy.png',
  thinking: '/assets/pip/pip-thinking.png',
  confused: '/assets/pip/pip-confused.png',
  wave: '/assets/pip/pip-wave.png',
  listen: '/assets/pip/pip-listen.png',
};

/** Full-body blink frames from the sheet (same pose; eyes only change). */
const PIP_BLINK = Array.from(
  { length: 9 },
  (_, i) => `/assets/pip/blink/pip-blink-${String(i + 1).padStart(2, '0')}.png`,
);

/** Calm blink: open → closed → open */
const BLINK_SEQUENCE = [0, 1, 2, 4, 6, 7, 6, 4, 2, 1, 0];
const BLINK_FRAME_MS = [55, 45, 40, 40, 45, 90, 45, 40, 40, 45, 55];

const SOUND_KEY = 'sis-pip-sound';
const SEEN_KEY = 'sis-pip-seen';

let blinkPreloaded = false;
function preloadBlink() {
  if (blinkPreloaded || typeof window === 'undefined') return;
  blinkPreloaded = true;
  PIP_BLINK.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

function PipFace({ emotion = 'idle', className = 'w-8 h-8', alt = '', animateBlink = false }) {
  const [blinkFrame, setBlinkFrame] = useState(0);
  const canBlink = animateBlink;

  useEffect(() => {
    if (!canBlink) {
      setBlinkFrame(0);
      return undefined;
    }

    preloadBlink();

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return undefined;

    let cancelled = false;
    let timeoutId = 0;

    const scheduleNext = () => {
      timeoutId = window.setTimeout(runBlink, 3200 + Math.random() * 4200);
    };

    const runBlink = () => {
      let step = 0;
      const tick = () => {
        if (cancelled) return;
        setBlinkFrame(BLINK_SEQUENCE[step]);
        const wait = BLINK_FRAME_MS[step] ?? 50;
        step += 1;
        if (step < BLINK_SEQUENCE.length) {
          timeoutId = window.setTimeout(tick, wait);
        } else {
          setBlinkFrame(0);
          scheduleNext();
        }
      };
      tick();
    };

    scheduleNext();
    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [canBlink]);

  const src = canBlink ? PIP_BLINK[blinkFrame] || PIP_BLINK[0] : PIP[emotion] || PIP.idle;

  return (
    <img
      src={src}
      alt={alt}
      className={`${className} object-contain object-bottom select-none pointer-events-none`}
      draggable={false}
    />
  );
}

function toAssistantMessage(reply) {
  return {
    role: 'assistant',
    text: reply.text,
    bullets: reply.bullets || null,
    path: reply.path || null,
    sectionId: reply.sectionId || null,
    sectionLabel: reply.sectionLabel || null,
    services: reply.services || null,
    showJumpMap: Boolean(reply.showJumpMap),
    showWhatsApp: reply.showWhatsApp,
    whatsappHref: reply.whatsappHref || WHATSAPP_ASSISTANT_URL,
    emotion: reply.emotion || 'idle',
    topic: reply.topic || null,
    followUps: reply.followUps || [],
    autoJump: Boolean(reply.autoJump),
  };
}

function MessageBody({ text }) {
  const parts = String(text || '').split(/\n+/).filter(Boolean);
  if (parts.length <= 1) return <p className="whitespace-pre-wrap">{text}</p>;
  return (
    <div className="space-y-2">
      {parts.map((part) => (
        <p key={part.slice(0, 24)} className="whitespace-pre-wrap">
          {part}
        </p>
      ))}
    </div>
  );
}

function JumpMap({ onJump, disabled }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {PAGE_SECTIONS.map((section) => (
        <button
          key={section.id}
          type="button"
          disabled={disabled}
          onClick={() => onJump(section.id, section.label)}
          className="text-xs font-medium rounded-full border border-slate-200 bg-slate-50 hover:bg-teal-50 hover:border-teal-300 px-2.5 py-1.5 text-slate-700 transition-colors disabled:opacity-50"
        >
          {section.label}
        </button>
      ))}
    </div>
  );
}

export default function ChatAssistant() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [typing, setTyping] = useState(false);
  const [emotion, setEmotion] = useState('idle');
  const [lastTopic, setLastTopic] = useState(null);
  const [hasSeen, setHasSeen] = useState(() => {
    try {
      return localStorage.getItem(SEEN_KEY) === '1';
    } catch {
      return false;
    }
  });
  const [soundOn, setSoundOn] = useState(() => {
    try {
      return localStorage.getItem(SOUND_KEY) !== '0';
    } catch {
      return true;
    }
  });
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const hoverSoundAt = useRef(0);

  const play = (name) => {
    if (!soundOn) return;
    pipSounds.unlock();
    pipSounds[name]?.();
  };

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, typing, open]);

  useEffect(() => {
    if (!open) return undefined;
    const t = window.setTimeout(() => inputRef.current?.focus(), 220);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
        play('close');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, soundOn]);

  useEffect(() => {
    if (typing) {
      setEmotion('thinking');
      return undefined;
    }
    if (!open) {
      setEmotion('idle');
      return undefined;
    }
    if (input.trim()) {
      setEmotion('listen');
      return undefined;
    }
    const last = [...messages].reverse().find((m) => m.role === 'assistant');
    setEmotion(last?.emotion || 'idle');
    return undefined;
  }, [typing, open, input, messages]);

  const markSeen = () => {
    if (hasSeen) return;
    setHasSeen(true);
    try {
      localStorage.setItem(SEEN_KEY, '1');
    } catch {
      // ignore
    }
  };

  /** Primary action: close Pip and snap the page to a section. */
  const jumpToSection = (sectionId, label) => {
    play('success');
    setOpen(false);
    setLastTopic(label || sectionId);

    const run = () => {
      scrollToSectionId(sectionId);
      if (location.pathname === '/') {
        navigate({ pathname: '/', hash: sectionId }, { replace: true });
      }
    };

    if (location.pathname !== '/') {
      navigate({ pathname: '/', hash: sectionId });
      window.setTimeout(() => scrollToSectionId(sectionId), 120);
      return;
    }

    window.setTimeout(run, 60);
  };

  const jumpToPath = (path) => {
    play('success');
    setOpen(false);
    navigate(path);
  };

  const pushAssistantReply = (reply) => {
    const msg = toAssistantMessage(reply);
    setMessages((prev) => [...prev, msg]);
    setTyping(false);
    setEmotion(msg.emotion);
    if (msg.topic) setLastTopic(msg.topic);

    if (msg.emotion === 'confused') play('confuse');
    else if (msg.emotion === 'happy' || msg.emotion === 'wave') play('success');
    else play('receive');

    // Auto-snap when Pip decides a jump is the answer
    if (msg.autoJump && msg.sectionId) {
      window.setTimeout(() => jumpToSection(msg.sectionId, msg.sectionLabel), 450);
    } else if (msg.autoJump && msg.path) {
      window.setTimeout(() => jumpToPath(msg.path), 450);
    }
  };

  const thinkThen = (fn, baseMs = 320) => {
    setTyping(true);
    setEmotion('thinking');
    const jitter = 60 + Math.floor(Math.random() * 100);
    window.setTimeout(fn, baseMs + jitter);
  };

  const ask = (text) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;

    play('send');
    setMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
    setInput('');
    thinkThen(() => {
      pushAssistantReply(getAssistantReply(trimmed, { lastTopic }));
    }, Math.min(650, 280 + trimmed.length * 6));
  };

  const showServices = () => {
    if (typing) return;
    play('tap');
    setMessages((prev) => [...prev, { role: 'user', text: 'What services do you offer?' }]);
    thinkThen(() => pushAssistantReply(buildServicesReply()), 260);
  };

  const showJumpMenu = () => {
    if (typing) return;
    play('tap');
    setMessages((prev) => [...prev, { role: 'user', text: 'Show me the site map' }]);
    thinkThen(() => pushAssistantReply(buildJumpMenu()), 220);
  };

  const startOver = () => {
    play('tap');
    setInput('');
    setTyping(false);
    setLastTopic(null);
    setEmotion('wave');
    setMessages([{ ...WELCOME_MESSAGE }]);
  };

  const toggleOpen = () => {
    pipSounds.unlock();
    setOpen((wasOpen) => {
      if (wasOpen) {
        play('close');
        return false;
      }
      markSeen();
      play('open');
      setEmotion('wave');
      window.setTimeout(() => setEmotion((e) => (e === 'wave' ? 'happy' : e)), 1100);
      return true;
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    ask(input);
  };

  const toggleSound = () => {
    setSoundOn((on) => {
      const next = !on;
      try {
        localStorage.setItem(SOUND_KEY, next ? '1' : '0');
      } catch {
        // ignore
      }
      if (next) {
        pipSounds.unlock();
        pipSounds.tap();
      }
      return next;
    });
  };

  const lastAssistant = [...messages].reverse().find((m) => m.role === 'assistant');
  const activeFollowUps =
    lastAssistant?.followUps?.length > 0
      ? lastAssistant.followUps
      : messages.length <= 2
        ? quickPrompts
        : [];

  return (
    <div
      className="fixed z-[60] flex flex-col items-end gap-3 pointer-events-none right-3 sm:right-5"
      style={{
        bottom: 'max(5rem, calc(env(safe-area-inset-bottom, 0px) + 4rem))',
      }}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.22 }}
            role="dialog"
            aria-label="Pip, SIS assistant"
            className="pointer-events-auto w-[min(100vw-1.5rem,24rem)] h-[min(78vh,36rem)] bg-white/95 backdrop-blur-sm border border-slate-200 shadow-2xl rounded-2xl overflow-hidden flex flex-col"
          >
            <div className="px-4 py-3 bg-slate-900 text-white flex items-start justify-between gap-3 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-12 h-12 rounded-full bg-white/10 border border-white/15 flex items-center justify-center overflow-hidden shrink-0">
                  <PipFace emotion={emotion} className="w-11 h-11" />
                </div>
                <div className="min-w-0">
                  <div className="font-semibold leading-tight">Pip</div>
                  <p className="text-xs text-teal-300/90 mt-0.5">
                    {typing ? 'thinking…' : 'SIS AI assistant · online'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={startOver}
                  disabled={typing}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white disabled:opacity-40"
                  aria-label="Reset chat"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={toggleSound}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white"
                  aria-label={soundOn ? 'Mute sounds' : 'Enable sounds'}
                >
                  {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={toggleOpen}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white"
                  aria-label="Close assistant"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="px-3 py-2 border-b border-slate-100 bg-white flex gap-2 shrink-0">
              <button
                type="button"
                onClick={showServices}
                disabled={typing}
                className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-medium px-2.5 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-50"
              >
                <List className="w-3.5 h-3.5" />
                Our services
              </button>
              <button
                type="button"
                onClick={showJumpMenu}
                disabled={typing}
                className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-medium px-2.5 py-2 rounded-lg bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100 disabled:opacity-50"
              >
                <Navigation className="w-3.5 h-3.5" />
                Site map
              </button>
            </div>

            <div ref={listRef} className="flex-1 min-h-0 overflow-y-auto px-3 py-3 space-y-3 bg-slate-50/90">
              {messages.map((msg, i) => (
                <div
                  key={`${msg.role}-${i}-${msg.text?.slice(0, 12) || i}`}
                  className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <PipFace emotion={msg.emotion || 'idle'} className="w-8 h-8 mt-0.5 shrink-0" />
                  )}
                  <div
                    className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-teal-600 text-white rounded-br-md'
                        : 'bg-white border border-slate-200 text-slate-700 rounded-bl-md shadow-sm'
                    }`}
                  >
                    <MessageBody text={msg.text} />

                    {msg.role === 'assistant' && msg.bullets?.length > 0 && (
                      <ul className="mt-2.5 space-y-1.5">
                        {msg.bullets.map((line) => (
                          <li key={line} className="flex gap-2 text-xs text-slate-600 leading-snug">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {msg.role === 'assistant' && msg.showJumpMap && (
                      <div className="mt-3">
                        <JumpMap onJump={jumpToSection} disabled={typing} />
                      </div>
                    )}

                    {msg.role === 'assistant' && msg.services?.length > 0 && (
                      <div className="mt-3 space-y-1.5">
                        {msg.services.map((service) => (
                          <button
                            key={service.id}
                            type="button"
                            onClick={() => jumpToPath(service.path)}
                            className="block w-full text-left rounded-xl border border-slate-200 bg-slate-50 hover:bg-teal-50 hover:border-teal-300 px-3 py-2 transition-colors"
                          >
                            <span className="block text-sm font-semibold text-slate-900">
                              {service.title}
                            </span>
                            <span className="block text-xs text-slate-500 leading-snug mt-0.5">
                              {service.summary}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}

                    {msg.role === 'assistant' &&
                      (msg.sectionId || msg.path || msg.showWhatsApp) &&
                      !msg.showJumpMap && (
                        <div className="mt-2.5 flex flex-wrap gap-2">
                          {msg.sectionId && (
                            <button
                              type="button"
                              onClick={() => jumpToSection(msg.sectionId, msg.sectionLabel)}
                              className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-full bg-teal-600 text-white hover:bg-teal-500"
                            >
                              <Navigation className="w-3 h-3" />
                              View {msg.sectionLabel || 'on page'}
                            </button>
                          )}
                          {msg.path && !msg.services?.length && (
                            <button
                              type="button"
                              onClick={() => jumpToPath(msg.path)}
                              className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-full bg-slate-900 text-white hover:bg-slate-800"
                            >
                              Open page
                              <ExternalLink className="w-3 h-3 opacity-80" />
                            </button>
                          )}
                          {msg.showWhatsApp && (
                            <a
                              href={msg.whatsappHref || WHATSAPP_ASSISTANT_URL}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => play('tap')}
                              className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-full bg-[#25D366] text-white hover:brightness-110"
                            >
                              <MessageCircle className="w-3 h-3" />
                              WhatsApp Jean
                            </a>
                          )}
                        </div>
                      )}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex justify-start gap-2 items-center">
                  <PipFace emotion="thinking" className="w-8 h-8 shrink-0" />
                  <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-md px-3.5 py-2.5 text-sm text-slate-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse [animation-delay:120ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse [animation-delay:240ms]" />
                    <span className="ml-1">Pip is thinking…</span>
                  </div>
                </div>
              )}

              {!typing && (
                <div className="pl-10 space-y-2">
                  <div className="flex flex-wrap gap-1.5">
                    {TOPIC_CHIPS.map((chip) => (
                      <button
                        key={chip.label}
                        type="button"
                        onClick={() => {
                          play('tap');
                          ask(chip.ask);
                        }}
                        className="text-[11px] px-2.5 py-1 rounded-full border border-slate-200 bg-white text-slate-600 hover:border-teal-300 hover:text-teal-700"
                      >
                        Ask: {chip.label}
                      </button>
                    ))}
                  </div>
                  {activeFollowUps.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {activeFollowUps.map((prompt) => (
                        <button
                          key={prompt}
                          type="button"
                          onClick={() => {
                            play('tap');
                            ask(prompt);
                          }}
                          className="text-xs px-2.5 py-1.5 rounded-full border border-slate-200 bg-white text-slate-600 hover:border-teal-300 hover:text-teal-700 text-left"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <form onSubmit={onSubmit} className="p-3 border-t border-slate-200 bg-white flex gap-2 shrink-0">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onFocus={() => {
                  if (!typing) setEmotion('listen');
                }}
                placeholder="Ask about solar, CCTV, coverage…"
                className="flex-1 rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-400"
                aria-label="Message Pip"
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white flex items-center justify-center disabled:opacity-40"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={toggleOpen}
        onMouseEnter={() => {
          const now = Date.now();
          if (now - hoverSoundAt.current > 500) {
            hoverSoundAt.current = now;
            play('hover');
          }
        }}
        className="pointer-events-auto relative bg-transparent border-0 p-0 overflow-visible"
        aria-label={open ? 'Close Pip' : 'Open Pip, SIS AI assistant'}
      >
        {!open && (
          <span className="absolute -top-8 right-0 whitespace-nowrap rounded-full bg-slate-900 text-white text-xs font-medium px-3 py-1 shadow-lg">
            Ask Pip
          </span>
        )}
        {!open && !hasSeen && (
          <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-teal-400 border-2 border-white" />
        )}
        <div className="relative w-[7.5rem] h-[8.75rem] sm:w-[8rem] sm:h-[9.25rem] flex items-end justify-center overflow-visible">
          {open ? (
            <span className="mb-3 w-14 h-14 rounded-full bg-slate-900 text-white shadow-xl flex items-center justify-center">
              <X className="w-6 h-6" />
            </span>
          ) : (
            <PipFace animateBlink className="w-full h-full" alt="Pip" />
          )}
        </div>
      </button>
    </div>
  );
}
