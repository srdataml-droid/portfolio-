import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ABOUT_CONTENT, EXPERTISE_DOMAINS } from '../data/portfolio';

export function AboutAndExpertiseSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      {/* About Section */}
      <section
        id="about"
        className="py-20 lg:py-28 border-b border-black/10 dark:border-white/10"
      >
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5"
            >
              <p className="text-xs font-medium text-[#5B5D5B] dark:text-[#F5C518] mb-3 tracking-wide">
                02. About
              </p>
              <h2
                className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#101010] dark:text-[#F8F5ED] leading-[1.12]"
                style={{ textWrap: 'balance' }}
              >
                {ABOUT_CONTENT.title}
              </h2>

              <dl className="mt-10 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6 pt-8 border-t border-black/10 dark:border-white/10">
                {ABOUT_CONTENT.highlights.map((item) => (
                  <div key={item.label}>
                    <dt className="text-xs text-[#5B5D5B] dark:text-[#8E908E]">
                      {item.label}
                    </dt>
                    <dd className="mt-1 font-display text-base font-medium text-[#101010] dark:text-[#F8F5ED]">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-6"
            >
              {ABOUT_CONTENT.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base sm:text-[17px] leading-[1.75] text-[#323432] dark:text-[#C5C7C5]"
                >
                  {paragraph}
                </p>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section
        id="expertise"
        className="py-20 lg:py-28 border-b border-black/10 dark:border-white/10"
      >
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl mb-12 lg:mb-16"
          >
            <p className="text-xs font-medium text-[#5B5D5B] dark:text-[#F5C518] mb-3 tracking-wide">
              03. Expertise
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl lg:text-[42px] font-semibold tracking-tight text-[#101010] dark:text-[#F8F5ED] leading-[1.12]"
              style={{ textWrap: 'balance' }}
            >
              Disciplines and engineering foundations.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-black/10 dark:border-white/10">
            {EXPERTISE_DOMAINS.map((domain, idx) => (
              <motion.div
                key={domain.index}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`py-8 sm:py-10 border-b border-black/10 dark:border-white/10 ${
                  idx % 2 === 0 ? 'md:pr-10 md:border-r' : 'md:pl-10'
                }`}
              >
                <span className="font-mono-tabular text-xs text-[#5B5D5B] dark:text-[#F5C518]">
                  {domain.index}
                </span>
                <h3 className="mt-3 font-display text-xl sm:text-2xl font-semibold tracking-tight text-[#101010] dark:text-[#F8F5ED]">
                  {domain.title}
                </h3>
                <p className="mt-3 text-sm sm:text-[15px] leading-[1.7] text-[#404240] dark:text-[#A4A6A4]">
                  {domain.description}
                </p>
                <p className="mt-5 text-xs font-medium text-[#5B5D5B] dark:text-[#8E908E]">
                  {domain.capabilities.join(' · ')}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
