import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

interface IntroOverlayProps {
  onComplete: () => void;
}

export function IntroOverlay({ onComplete }: IntroOverlayProps) {
  const shouldReduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') return false;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false;
    return true;
  });

  useEffect(() => {
    if (!visible || shouldReduceMotion) {
      onComplete();
      return;
    }

    const timer = window.setTimeout(() => {
      setVisible(false);
      onComplete();
    }, 1150);

    return () => window.clearTimeout(timer);
  }, [visible, shouldReduceMotion, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col justify-between bg-[#101010] text-[#F8F5ED] px-6 py-8 md:px-12 md:py-10"
          aria-label="Portfolio introduction"
        >
          <div className="flex items-center justify-between text-xs text-[#8E908E]">
            <span className="font-mono-tabular">Lagos, Nigeria</span>
            <button
              type="button"
              onClick={() => {
                setVisible(false);
                onComplete();
              }}
              className="text-[#F8F5ED]/80 hover:text-[#F5C518] transition-colors px-3 py-1.5 min-h-[40px]"
            >
              Skip intro
            </button>
          </div>

          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm text-[#F5C518] mb-3 tracking-wide"
            >
              AI/ML &amp; Full-Stack Product Engineering
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl sm:text-6xl font-semibold tracking-tight leading-none"
            >
              Samuel Irenikase
            </motion.h2>
          </div>

          <div className="w-full h-px bg-white/10 overflow-hidden">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'left center' }}
              className="h-full bg-[#F5C518]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
