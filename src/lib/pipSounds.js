let audioCtx;

function ctx() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    audioCtx = new AC();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function tone({
  frequency = 440,
  duration = 0.12,
  type = 'sine',
  volume = 0.04,
  attack = 0.01,
  decay = 0.08,
  slideTo,
} = {}) {
  const ac = ctx();
  if (!ac) return;

  const now = ac.currentTime;
  const osc = ac.createOscillator();
  const gain = ac.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, now);
  if (slideTo) {
    osc.frequency.exponentialRampToValueAtTime(Math.max(1, slideTo), now + duration);
  }

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(volume, now + attack);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + Math.max(attack + 0.01, duration - decay));

  osc.connect(gain);
  gain.connect(ac.destination);
  osc.start(now);
  osc.stop(now + duration + 0.02);
}

export const pipSounds = {
  unlock() {
    ctx();
  },
  open() {
    tone({ frequency: 520, slideTo: 780, duration: 0.16, type: 'triangle', volume: 0.045 });
    setTimeout(() => tone({ frequency: 880, duration: 0.08, type: 'sine', volume: 0.03 }), 70);
  },
  close() {
    tone({ frequency: 640, slideTo: 320, duration: 0.14, type: 'triangle', volume: 0.035 });
  },
  send() {
    tone({ frequency: 700, slideTo: 980, duration: 0.09, type: 'sine', volume: 0.04 });
  },
  receive() {
    tone({ frequency: 420, duration: 0.07, type: 'triangle', volume: 0.03 });
    setTimeout(() => tone({ frequency: 620, duration: 0.1, type: 'sine', volume: 0.035 }), 60);
  },
  hover() {
    tone({ frequency: 760, duration: 0.05, type: 'sine', volume: 0.018 });
  },
  tap() {
    tone({ frequency: 540, duration: 0.05, type: 'square', volume: 0.015 });
  },
  confuse() {
    tone({ frequency: 360, slideTo: 280, duration: 0.16, type: 'triangle', volume: 0.03 });
  },
  success() {
    tone({ frequency: 523, duration: 0.07, type: 'sine', volume: 0.03 });
    setTimeout(() => tone({ frequency: 659, duration: 0.08, type: 'sine', volume: 0.03 }), 70);
    setTimeout(() => tone({ frequency: 784, duration: 0.1, type: 'sine', volume: 0.028 }), 140);
  },
};
