import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { BEYOND_CODE_CONTENT } from '../data/portfolio';

export function BeyondCodeSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="beyond-code"
      className="py-20 lg:py-28 border-b border-black/10 dark:border-white/10 overflow-hidden"
    >
      {/* Subtle Editorial Marquee Divider */}
      <div
        aria-hidden="true"
        className="mb-16 py-3 border-y border-black/10 dark:border-white/10 overflow-hidden whitespace-nowrap"
      >
        <motion.div
          animate={shouldReduceMotion ? undefined : { x: ['0%', '-50%'] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          className="inline-flex gap-8 text-xs font-mono-tabular text-[#5B5D5B] dark:text-[#8E908E]"
        >
          {Array.from({ length: 6 }).map((_, idx) => (
            <span key={idx} className="inline-flex items-center gap-8">
              <span>Applied AI Engineering</span>
              <span className="text-[#F5C518]">·</span>
              <span>Full-Stack Product Craft</span>
              <span className="text-[#F5C518]">·</span>
              <span>Worthkind Initiative</span>
              <span className="text-[#F5C518]">·</span>
              <span>Lagos, Nigeria</span>
              <span className="text-[#F5C518]">·</span>
            </span>
          ))}
        </motion.div>
      </div>

      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14"
        >
          <div className="lg:col-span-5">
            <p className="text-xs font-medium text-[#5B5D5B] dark:text-[#F5C518] mb-3 tracking-wide">
              04. Beyond Code
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#101010] dark:text-[#F8F5ED] leading-[1.12]"
              style={{ textWrap: 'balance' }}
            >
              {BEYOND_CODE_CONTENT.title}
            </h2>
          </div>

          <div className="lg:col-span-7 flex items-end">
            <p className="text-base sm:text-[17px] leading-[1.7] text-[#404240] dark:text-[#A4A6A4]">
              {BEYOND_CODE_CONTENT.lead}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {BEYOND_CODE_CONTENT.pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.index}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.45,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="p-6 sm:p-7 rounded-lg border border-black/10 dark:border-white/10 bg-[#EFEBE0]/55 dark:bg-[#171717]"
            >
              <span className="font-mono-tabular text-xs text-[#5B5D5B] dark:text-[#F5C518]">
                {pillar.index}
              </span>
              <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-[#101010] dark:text-[#F8F5ED]">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-[1.7] text-[#404240] dark:text-[#9A9C9A]">
                {pillar.summary}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
