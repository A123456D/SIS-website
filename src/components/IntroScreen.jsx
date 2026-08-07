import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOGO_URL = "/assets/logo.png";
const INTRO_KEY = 'sis-intro-seen';

export default function IntroScreen({ onComplete }) {
  const [visible, setVisible] = useState(true);
  const finishing = useRef(false);

  const finish = () => {
    if (finishing.current) return;
    finishing.current = true;
    setVisible(false);
    try {
      localStorage.setItem(INTRO_KEY, '1');
    } catch {
      // ignore
    }
    setTimeout(onComplete, 650);
  };

  useEffect(() => {
    const timer = setTimeout(finish, 2000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center cursor-pointer"
          onClick={finish}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') finish();
          }}
          aria-label="Skip intro"
        >
          <motion.img
            src={LOGO_URL}
            alt="SIS Logo"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-64 h-64 object-contain"
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-4 text-slate-500 text-sm tracking-widest uppercase"
          >
            Systems Integration Specialists
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-8 text-xs text-slate-400"
          >
            Tap to skip
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
