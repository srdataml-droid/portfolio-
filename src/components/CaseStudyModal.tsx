import React, { useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { X, ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import type { ProjectCaseStudy } from '../utils/portfolioLogic';
import { ResilientImage } from './ResilientImage';

interface CaseStudyModalProps {
  project: ProjectCaseStudy | null;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
}

export function CaseStudyModal({
  project,
  onClose,
  onNavigate,
}: CaseStudyModalProps) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate('next');
      if (e.key === 'ArrowLeft') onNavigate('prev');
    };
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [project, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="case-study-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        >
          <motion.div
            key={project.id}
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-title"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.99 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl border border-black/15 dark:border-white/15 bg-[#F8F5ED] dark:bg-[#141414] text-[#101010] dark:text-[#F8F5ED] shadow-2xl"
          >
            {/* Top Modal Bar */}
            <div className="sticky top-0 z-20 flex items-center justify-between gap-4 px-5 sm:px-8 py-4 border-b border-black/10 dark:border-white/10 bg-[#F8F5ED]/95 dark:bg-[#141414]/95 backdrop-blur-md">
              <div className="flex items-center gap-2.5 text-xs text-[#5B5D5B] dark:text-[#9A9C9A]">
                <span className="font-mono-tabular text-[#101010] dark:text-[#F5C518] font-medium">
                  Case Study {project.index}
                </span>
                <span aria-hidden="true">·</span>
                <span>{project.status}</span>
                <span aria-hidden="true" className="hidden sm:inline">·</span>
                <span className="hidden sm:inline">{project.year}</span>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close case study"
                className="inline-flex items-center justify-center min-w-[40px] min-h-[40px] rounded-md border border-black/15 dark:border-white/15 hover:border-[#F5C518] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 sm:p-8 space-y-8">
              <div>
                <h2
                  id="case-study-title"
                  className="font-display text-3xl sm:text-4xl font-semibold tracking-tight leading-tight"
                >
                  {project.title}
                </h2>
                <p className="mt-2 text-base text-[#5B5D5B] dark:text-[#A4A6A4]">
                  {project.subtitle}
                </p>
              </div>

              {/* Project Visual */}
              <div className="aspect-[16/9] max-h-[300px] w-full rounded-lg overflow-hidden border border-black/10 dark:border-white/10 bg-[#181818]">
                <ResilientImage
                  src={project.imageUrl}
                  alt={project.imageAlt}
                  fallbackTitle={project.title}
                />
              </div>

              {/* Problem & Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#5B5D5B] dark:text-[#F5C518] mb-2.5">
                    The Problem
                  </h3>
                  <p className="text-sm sm:text-[15px] leading-[1.7] text-[#323432] dark:text-[#C5C7C5]">
                    {project.problem}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#5B5D5B] dark:text-[#F5C518] mb-2.5">
                    The Solution
                  </h3>
                  <p className="text-sm sm:text-[15px] leading-[1.7] text-[#323432] dark:text-[#C5C7C5]">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Role & Technologies */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-black/10 dark:border-white/10">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#5B5D5B] dark:text-[#8E908E] mb-2">
                    Developer Role
                  </h3>
                  <p className="text-sm leading-relaxed text-[#101010] dark:text-[#F8F5ED]">
                    {project.role}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#5B5D5B] dark:text-[#8E908E] mb-2">
                    Technologies
                  </h3>
                  <p className="text-sm leading-relaxed text-[#101010] dark:text-[#F8F5ED]">
                    {project.technologies.join(' · ')}
                  </p>
                </div>
              </div>

              {/* Product Decisions */}
              <div className="pt-6 border-t border-black/10 dark:border-white/10">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#5B5D5B] dark:text-[#F5C518] mb-4">
                  Important Product Decisions
                </h3>
                <ul className="space-y-3">
                  {project.productDecisions.map((decision, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm sm:text-[15px] leading-relaxed text-[#323432] dark:text-[#C5C7C5]"
                    >
                      <span className="font-mono-tabular text-xs text-[#F5C518] bg-[#101010] dark:bg-transparent px-1.5 py-0.5 rounded mt-0.5 shrink-0">
                        0{idx + 1}
                      </span>
                      <span>{decision}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Status & External Links */}
              <div className="pt-6 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-[#5B5D5B] dark:text-[#8E908E]">
                    Current Status: <span className="text-[#101010] dark:text-[#F8F5ED] font-medium">{project.status}</span>
                  </p>
                  {project.notes && (
                    <p className="text-xs text-[#5B5D5B] dark:text-[#8E908E] mt-1">
                      {project.notes}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[40px] text-xs font-semibold rounded-md bg-[#F5C518] text-[#101010] hover:bg-[#ffd644] transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>Open Live Preview</span>
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[40px] text-xs font-semibold rounded-md border border-black/20 dark:border-white/20 hover:border-[#F5C518] transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>View Source on GitHub</span>
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>

              {/* Cyclic Next/Prev Case Study Footer */}
              <div className="pt-6 border-t border-black/10 dark:border-white/10 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('prev')}
                  className="inline-flex items-center gap-2 px-3.5 py-2 min-h-[40px] text-xs font-medium rounded-md border border-black/15 dark:border-white/15 hover:border-[#F5C518] transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Previous Project</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('next')}
                  className="inline-flex items-center gap-2 px-3.5 py-2 min-h-[40px] text-xs font-medium rounded-md border border-black/15 dark:border-white/15 hover:border-[#F5C518] transition-colors cursor-pointer"
                >
                  <span>Next Project</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
