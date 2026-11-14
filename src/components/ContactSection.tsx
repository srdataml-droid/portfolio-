import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react';
import { PORTFOLIO_PROFILE } from '../data/portfolio';
import {
  buildMailtoHref,
  formatInquiryClipboardText,
  validateInquiry,
  type InquiryFormData,
} from '../utils/portfolioLogic';
import { MagneticButton } from './MagneticButton';

export function ContactSection() {
  const shouldReduceMotion = useReducedMotion();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedBrief, setCopiedBrief] = useState(false);
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof InquiryFormData, string>>>({});
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PORTFOLIO_PROFILE.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2200);
    } catch {
      setStatusMessage(`Direct email: ${PORTFOLIO_PROFILE.email}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateInquiry(formData);
    setErrors(result.errors);
    if (!result.valid) {
      setStatusMessage(null);
      return;
    }

    const href = buildMailtoHref(PORTFOLIO_PROFILE.email, formData);
    window.location.href = href;
    setStatusMessage('Opening your default email client with your prepared message.');
  };

  const handleCopyBrief = async () => {
    const result = validateInquiry(formData);
    setErrors(result.errors);
    if (!result.valid) {
      setStatusMessage(null);
      return;
    }
    try {
      await navigator.clipboard.writeText(formatInquiryClipboardText(formData));
      setCopiedBrief(true);
      setStatusMessage('Formatted brief copied to clipboard.');
      window.setTimeout(() => setCopiedBrief(false), 2500);
    } catch {
      setStatusMessage('Clipboard unavailable in this browser context.');
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Direct Channels & Configurable Links */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-between gap-10"
          >
            <div>
              <p className="text-xs font-medium text-[#5B5D5B] dark:text-[#F5C518] mb-3 tracking-wide">
                05. Contact
              </p>
              <h2
                className="font-display text-3xl sm:text-4xl lg:text-[42px] font-semibold tracking-tight text-[#101010] dark:text-[#F8F5ED] leading-[1.1]"
                style={{ textWrap: 'balance' }}
              >
                Let&apos;s build something practical and lasting.
              </h2>
              <p className="mt-5 text-base leading-[1.7] text-[#404240] dark:text-[#A4A6A4]">
                Available for AI/ML engineering roles, full-stack product builds, and ambitious technical collaborations from Lagos or remotely.
              </p>
            </div>

            <div className="space-y-6 pt-6 border-t border-black/10 dark:border-white/10">
              {/* Direct Email */}
              <div>
                <span className="block text-xs text-[#5B5D5B] dark:text-[#8E908E] mb-1.5">
                  Email
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${PORTFOLIO_PROFILE.email}`}
                    className="font-display text-lg font-medium text-[#101010] dark:text-[#F8F5ED] hover:text-[#F5C518] dark:hover:text-[#F5C518] transition-colors"
                  >
                    {PORTFOLIO_PROFILE.email}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label="Copy email address"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] text-xs font-medium rounded-md border border-black/15 dark:border-white/15 hover:border-[#F5C518] transition-colors cursor-pointer"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#F5C518]" aria-hidden="true" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* GitHub */}
              <div>
                <span className="block text-xs text-[#5B5D5B] dark:text-[#8E908E] mb-1.5">
                  GitHub
                </span>
                <a
                  href={PORTFOLIO_PROFILE.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-display text-base font-medium text-[#101010] dark:text-[#F8F5ED] hover:text-[#F5C518] dark:hover:text-[#F5C518] transition-colors"
                >
                  <span>github.com/{PORTFOLIO_PROFILE.githubHandle}</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>

              {/* Editable Social Links (only active links rendered as clickable; unconfigured noted clearly) */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <span className="block text-xs text-[#5B5D5B] dark:text-[#8E908E] mb-1">
                    LinkedIn
                  </span>
                  {PORTFOLIO_PROFILE.linkedinUrl ? (
                    <a
                      href={PORTFOLIO_PROFILE.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium hover:text-[#F5C518]"
                    >
                      <span>Profile</span>
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  ) : (
                    <span className="text-xs text-[#5B5D5B] dark:text-[#8E908E]">
                      Editable in portfolio.ts
                    </span>
                  )}
                </div>

                <div>
                  <span className="block text-xs text-[#5B5D5B] dark:text-[#8E908E] mb-1">
                    X / Twitter
                  </span>
                  {PORTFOLIO_PROFILE.xUrl ? (
                    <a
                      href={PORTFOLIO_PROFILE.xUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium hover:text-[#F5C518]"
                    >
                      <span>Profile</span>
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  ) : (
                    <span className="text-xs text-[#5B5D5B] dark:text-[#8E908E]">
                      Editable in portfolio.ts
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Validated Project Inquiry Composer */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 p-6 sm:p-8 rounded-lg border border-black/10 dark:border-white/10 bg-[#EFEBE0]/55 dark:bg-[#171717]"
          >
            <h3 className="font-display text-xl font-semibold tracking-tight text-[#101010] dark:text-[#F8F5ED] mb-2">
              Prepare an Inquiry
            </h3>
            <p className="text-sm text-[#5B5D5B] dark:text-[#9A9C9A] mb-6">
              Compose a structured note to launch directly in your email client or copy cleanly to clipboard.
            </p>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="inquiry-name"
                    className="block text-xs font-medium text-[#101010] dark:text-[#F8F5ED] mb-1.5"
                  >
                    Your Name
                  </label>
                  <input
                    id="inquiry-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, name: e.target.value }));
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    placeholder="Adaeze Okafor"
                    aria-invalid={Boolean(errors.name)}
                    className="w-full px-3.5 py-2.5 min-h-[44px] text-sm rounded-md border border-black/15 dark:border-white/15 bg-[#F8F5ED] dark:bg-[#101010] text-[#101010] dark:text-[#F8F5ED] placeholder:text-[#8E908E] focus:border-[#F5C518] focus:outline-none"
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-red-600 dark:text-amber-400" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="inquiry-email"
                    className="block text-xs font-medium text-[#101010] dark:text-[#F8F5ED] mb-1.5"
                  >
                    Email Address
                  </label>
                  <input
                    id="inquiry-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, email: e.target.value }));
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    placeholder="you@company.com"
                    aria-invalid={Boolean(errors.email)}
                    className="w-full px-3.5 py-2.5 min-h-[44px] text-sm rounded-md border border-black/15 dark:border-white/15 bg-[#F8F5ED] dark:bg-[#101010] text-[#101010] dark:text-[#F8F5ED] placeholder:text-[#8E908E] focus:border-[#F5C518] focus:outline-none"
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-600 dark:text-amber-400" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="inquiry-subject"
                  className="block text-xs font-medium text-[#101010] dark:text-[#F8F5ED] mb-1.5"
                >
                  Subject
                </label>
                <input
                  id="inquiry-subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, subject: e.target.value }));
                    if (errors.subject) setErrors((prev) => ({ ...prev, subject: undefined }));
                  }}
                  placeholder="AI Product Build / Engineering Role"
                  aria-invalid={Boolean(errors.subject)}
                  className="w-full px-3.5 py-2.5 min-h-[44px] text-sm rounded-md border border-black/15 dark:border-white/15 bg-[#F8F5ED] dark:bg-[#101010] text-[#101010] dark:text-[#F8F5ED] placeholder:text-[#8E908E] focus:border-[#F5C518] focus:outline-none"
                />
                {errors.subject && (
                  <p className="mt-1.5 text-xs text-red-600 dark:text-amber-400" role="alert">
                    {errors.subject}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="inquiry-message"
                  className="block text-xs font-medium text-[#101010] dark:text-[#F8F5ED] mb-1.5"
                >
                  Project or Opportunity Details
                </label>
                <textarea
                  id="inquiry-message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, message: e.target.value }));
                    if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                  }}
                  placeholder="Share context on what you are building, timeline, and how we might collaborate."
                  aria-invalid={Boolean(errors.message)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-md border border-black/15 dark:border-white/15 bg-[#F8F5ED] dark:bg-[#101010] text-[#101010] dark:text-[#F8F5ED] placeholder:text-[#8E908E] focus:border-[#F5C518] focus:outline-none resize-y"
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs text-red-600 dark:text-amber-400" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <MagneticButton
                  type="submit"
                  className="px-6 py-3 min-h-[44px] text-xs font-semibold rounded-md bg-[#F5C518] text-[#101010] hover:bg-[#ffd644]"
                >
                  <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Open in Email Client</span>
                </MagneticButton>

                <button
                  type="button"
                  onClick={handleCopyBrief}
                  className="inline-flex items-center gap-2 px-5 py-3 min-h-[44px] text-xs font-medium rounded-md border border-black/15 dark:border-white/15 text-[#101010] dark:text-[#F8F5ED] hover:border-[#F5C518] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {copiedBrief ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#F5C518]" aria-hidden="true" />
                      <span>Brief Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Copy Formatted Brief</span>
                    </>
                  )}
                </button>
              </div>

              {statusMessage && (
                <p
                  role="status"
                  className="text-xs font-medium text-[#101010] dark:text-[#F5C518] pt-1"
                >
                  {statusMessage}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
