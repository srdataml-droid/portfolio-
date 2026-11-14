import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'motion/react';
import { ArrowDown, ArrowRight, Sun, Moon } from 'lucide-react';
import { PORTFOLIO_PROFILE } from '../data/portfolio';
import { MagneticButton } from './MagneticButton';
import { ResilientImage } from './ResilientImage';
import type { ThemeMode } from '../utils/portfolioLogic';

interface HeroSectionProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
}

export function HeroSection({ theme, onToggleTheme }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitContainerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const imageParallaxY = useTransform(scrollYProgress, [0, 1], [0, 48]);

  // Lightweight 3D perspective pointer interaction for spatial depth behind portrait
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateY = useSpring(pointerX, { stiffness: 140, damping: 22 });
  const rotateX = useSpring(pointerY, { stiffness: 140, damping: 22 });

  const handlePortraitPointerMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !portraitContainerRef.current) return;
    const rect = portraitContainerRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    pointerX.set(nx * 6);
    pointerY.set(-ny * 6);
  };

  const handlePortraitPointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative border-b border-black/10 dark:border-white/10 overflow-hidden"
    >
      {/* Subtle architectural ambient warmth — restrained to preserve 60-30-10 discipline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] w-[560px] h-[560px] rounded-full bg-[#F5C518]/[0.06] dark:bg-[#F5C518]/[0.07] blur-[120px]"
      />

      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 pt-10 pb-10 lg:pt-16 lg:pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Editorial Identity & Positioning */}
          <div className="lg:col-span-7 flex flex-col justify-between py-2 lg:py-4">
            <div>
              {/* Restrained availability indicator — unboxed text + subtle gold rule */}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3 mb-7 text-xs sm:text-sm text-[#5B5D5B] dark:text-[#9A9C9A]"
              >
                <span className="inline-block w-7 h-px bg-[#F5C518]" aria-hidden="true" />
                <span>{PORTFOLIO_PROFILE.availabilityLabel}</span>
              </motion.div>

              <motion.p
                initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-base sm:text-lg font-medium text-[#101010] dark:text-[#F5C518] mb-3 tracking-tight"
              >
                {PORTFOLIO_PROFILE.name} — {PORTFOLIO_PROFILE.shortRole}
              </motion.p>

              <motion.h1
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-semibold tracking-tight text-[#101010] dark:text-[#F8F5ED] leading-[1.04] max-w-2xl"
                style={{
                  fontSize: 'clamp(2.35rem, 4.5vw, 4.15rem)',
                  textWrap: 'balance',
                }}
              >
                {PORTFOLIO_PROFILE.headline}
              </motion.h1>

              <motion.p
                initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 text-base sm:text-[17px] leading-[1.65] text-[#5B5D5B] dark:text-[#A4A6A4] max-w-[60ch]"
              >
                {PORTFOLIO_PROFILE.subheadline}
              </motion.p>
            </div>

            {/* Primary Calls to Action */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <MagneticButton
                as="a"
                href="#work"
                className="px-6 py-3.5 text-sm font-semibold bg-[#F5C518] text-[#101010] hover:bg-[#ffd644] rounded-md"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </MagneticButton>

              <MagneticButton
                as="a"
                href="#contact"
                className="px-6 py-3.5 text-sm font-medium border border-black/20 dark:border-white/20 text-[#101010] dark:text-[#F8F5ED] hover:border-[#F5C518] dark:hover:border-[#F5C518] rounded-md"
              >
                <span>Let&apos;s Connect</span>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right Column: Prominent Editorial Portrait with Lightweight 3D Spatial Frame */}
          <div
            ref={portraitContainerRef}
            onMouseMove={handlePortraitPointerMove}
            onMouseLeave={handlePortraitPointerLeave}
            className="lg:col-span-5 relative flex items-stretch"
            style={{ perspective: '1100px' }}
          >
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={shouldReduceMotion ? undefined : { rotateX, rotateY }}
              className="relative w-full aspect-[3/4] lg:aspect-auto lg:min-h-[520px] rounded-lg overflow-hidden border border-black/15 dark:border-white/15 bg-[#161616]"
            >
              {/* Lightweight decorative geometric 3D wireframe corner accent */}
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute top-4 right-4 z-10 w-16 h-16 text-[#F5C518]/50"
                viewBox="0 0 64 64"
                fill="none"
              >
                <path d="M12 12H52V52" stroke="currentColor" strokeWidth="1" />
                <path d="M24 24H44V44" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
                <circle cx="52" cy="12" r="2" fill="currentColor" />
              </svg>

              <motion.div
                style={shouldReduceMotion ? undefined : { y: imageParallaxY }}
                className="w-full h-[108%] -mt-[4%]"
              >
                <ResilientImage
                  src={PORTFOLIO_PROFILE.portraitUrl}
                  alt={PORTFOLIO_PROFILE.portraitAlt}
                  loading="eager"
                  className="object-cover object-top"
                  fallbackTitle={PORTFOLIO_PROFILE.name}
                />
              </motion.div>

              {/* Measured lower contrast scrim for subtle caption legibility */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 via-black/35 to-transparent"
              />
              <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between text-xs text-[#F8F5ED]">
                <span className="font-medium tracking-wide">Samuel Irenikase</span>
                <span className="font-mono-tabular text-[#F5C518]">6.5244° N, 3.3792° E</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Full-Width Bottom Metadata Strip (below split, per Portfolio Layout Guidelines) */}
        <div className="mt-10 lg:mt-14 pt-6 border-t border-black/10 dark:border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-center text-sm">
          <div>
            <span className="block text-xs text-[#5B5D5B] dark:text-[#8E908E] mb-0.5">
              Location
            </span>
            <span className="font-medium text-[#101010] dark:text-[#F8F5ED]">
              {PORTFOLIO_PROFILE.location}
            </span>
          </div>

          <div>
            <span className="block text-xs text-[#5B5D5B] dark:text-[#8E908E] mb-0.5">
              Core Discipline
            </span>
            <span className="font-medium text-[#101010] dark:text-[#F8F5ED]">
              Python · AI/ML · Full-Stack
            </span>
          </div>

          <div className="flex items-center">
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              className="inline-flex items-center gap-2 px-3.5 py-2 min-h-[40px] rounded-md border border-black/15 dark:border-white/15 text-xs font-medium text-[#101010] dark:text-[#F8F5ED] hover:border-[#F5C518] dark:hover:border-[#F5C518] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-[#F5C518]" aria-hidden="true" />
                  <span>Light Surface</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#101010]" aria-hidden="true" />
                  <span>Dark Surface</span>
                </>
              )}
            </button>
          </div>

          <div className="sm:justify-self-end">
            <a
              href="#work"
              className="inline-flex items-center gap-2 text-xs font-medium text-[#5B5D5B] dark:text-[#9A9C9A] hover:text-[#101010] dark:hover:text-[#F5C518] transition-colors py-2 whitespace-nowrap shrink-0"
            >
              <span>Scroll to selected work</span>
              <ArrowDown className="w-3.5 h-3.5 text-[#101010] dark:text-[#F5C518]" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
