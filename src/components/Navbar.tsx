import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

interface NavbarProps {
  activeSection: string;
}

const NAV_LINKS = [
  { id: 'work', label: 'Work', href: '#work' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'expertise', label: 'Expertise', href: '#expertise' },
  { id: 'beyond-code', label: 'Beyond Code', href: '#beyond-code' },
];

export function Navbar({ activeSection }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-black/10 dark:border-white/10 bg-[#F8F5ED]/90 dark:bg-[#101010]/90 backdrop-blur-md transition-colors duration-200">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element Brand Zone */}
          <a
            href="#home"
            className="font-display text-lg font-semibold tracking-tight text-[#101010] dark:text-[#F8F5ED] whitespace-nowrap shrink-0 hover:text-[#F5C518] dark:hover:text-[#F5C518] transition-colors"
          >
            Samuel Irenikase
          </a>

          {/* Zone 2: 4 concise single-line nav links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-7"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`relative py-1.5 text-sm font-medium whitespace-nowrap shrink-0 transition-colors ${
                    isActive
                      ? 'text-[#101010] dark:text-[#F5C518]'
                      : 'text-[#5B5D5B] dark:text-[#9A9C9A] hover:text-[#101010] dark:hover:text-[#F8F5ED]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-underline"
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-[#F5C518]"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action (desktop) + mobile menu toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden md:block">
              <MagneticButton
                as="a"
                href="#contact"
                className="px-4 py-2 text-xs font-semibold bg-[#101010] text-[#F8F5ED] dark:bg-[#F5C518] dark:text-[#101010] hover:bg-[#272727] dark:hover:bg-[#ffd644] rounded-md"
              >
                <span>Let&apos;s Connect</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </MagneticButton>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="md:hidden inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-md border border-black/15 dark:border-white/15 text-[#101010] dark:text-[#F8F5ED] hover:border-[#F5C518] transition-colors"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-16 z-30 md:hidden bg-[#F8F5ED] dark:bg-[#101010] px-6 py-8 flex flex-col justify-between overflow-y-auto"
          >
            <nav aria-label="Mobile sections" className="flex flex-col gap-2">
              {NAV_LINKS.map((link, idx) => (
                <motion.a
                  key={link.id}
                  href={link.href}
                  onClick={handleLinkClick}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.25 }}
                  className={`py-4 border-b border-black/10 dark:border-white/10 font-display text-2xl font-medium flex items-center justify-between ${
                    activeSection === link.id
                      ? 'text-[#101010] dark:text-[#F5C518]'
                      : 'text-[#101010] dark:text-[#F8F5ED]'
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="font-mono-tabular text-xs text-[#5B5D5B] dark:text-[#8E908E]">
                    0{idx + 1}
                  </span>
                </motion.a>
              ))}
            </nav>

            <div className="pt-8 space-y-4">
              <a
                href="#contact"
                onClick={handleLinkClick}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-[#F5C518] text-[#101010] font-semibold text-sm rounded-md"
              >
                <span>Let&apos;s Connect</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <p className="text-xs text-[#5B5D5B] dark:text-[#8E908E]">
                Samuel Irenikase · Lagos, Nigeria
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
