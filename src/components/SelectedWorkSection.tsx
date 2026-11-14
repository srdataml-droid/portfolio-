import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import {
  filterProjects,
  type ProjectCaseStudy,
  type ProjectCategory,
} from '../utils/portfolioLogic';
import { PORTFOLIO_PROJECTS } from '../data/portfolio';
import { ResilientImage } from './ResilientImage';

interface SelectedWorkSectionProps {
  onSelectProject: (project: ProjectCaseStudy) => void;
}

const FILTER_OPTIONS: { id: ProjectCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'platforms', label: 'Platforms' },
  { id: 'ai-systems', label: 'AI & Systems' },
  { id: 'initiatives', label: 'Initiatives' },
];

export function SelectedWorkSection({ onSelectProject }: SelectedWorkSectionProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const shouldReduceMotion = useReducedMotion();
  const visibleProjects = filterProjects(PORTFOLIO_PROJECTS, activeCategory);

  return (
    <section
      id="work"
      className="py-20 lg:py-28 border-b border-black/10 dark:border-white/10"
    >
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        {/* Section Header + Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 lg:mb-16">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <p className="text-xs font-medium text-[#5B5D5B] dark:text-[#F5C518] mb-3 tracking-wide">
              01. Selected Work
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#101010] dark:text-[#F8F5ED] leading-[1.1]"
              style={{ textWrap: 'balance' }}
            >
              Software products, AI workflows, and systems engineering.
            </h2>
          </motion.div>

          {/* Interactive Filter Controls */}
          <div
            role="group"
            aria-label="Filter projects by category"
            className="inline-flex flex-nowrap items-center gap-1 p-1 rounded-lg bg-[#EFEBE0] dark:bg-[#191919] border border-black/10 dark:border-white/10 self-start max-w-full overflow-x-auto"
          >
            {FILTER_OPTIONS.map((option) => {
              const isSelected = activeCategory === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setActiveCategory(option.id)}
                  aria-pressed={isSelected}
                  className={`px-3 sm:px-3.5 py-2 min-h-[40px] text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#101010] text-[#F8F5ED] dark:bg-[#F5C518] dark:text-[#101010]'
                      : 'text-[#5B5D5B] dark:text-[#9A9C9A] hover:text-[#101010] dark:hover:text-[#F8F5ED]'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Count Context */}
        <p className="text-xs text-[#5B5D5B] dark:text-[#8E908E] mb-8 font-mono-tabular">
          Showing {visibleProjects.length} of {PORTFOLIO_PROJECTS.length} documented builds
        </p>

        {/* Editorial Project Grid */}
        {visibleProjects.length === 0 ? (
          <div className="p-12 rounded-lg border border-black/10 dark:border-white/10 text-center">
            <p className="text-sm text-[#5B5D5B] dark:text-[#9A9C9A]">
              No projects match this filter yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {visibleProjects.map((project, idx) => {
              const isFeaturedLead = activeCategory === 'all' && idx === 0;
              return (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isFeaturedLead={isFeaturedLead}
                  index={idx}
                  onSelect={onSelectProject}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: ProjectCaseStudy;
  isFeaturedLead: boolean;
  index: number;
  onSelect: (project: ProjectCaseStudy) => void;
}

function ProjectCard({
  project,
  isFeaturedLead,
  index,
  onSelect,
}: ProjectCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const [hoverPos, setHoverPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setHoverPos({ x, y });
  };

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.06, 0.24),
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleMouseMove}
      className={`group relative rounded-lg border border-black/10 dark:border-white/10 bg-[#EFEBE0]/55 dark:bg-[#171717] overflow-hidden flex flex-col justify-between transition-colors duration-200 hover:border-black/25 dark:hover:border-[#F5C518]/45 ${
        isFeaturedLead ? 'md:col-span-2 lg:grid lg:grid-cols-12' : ''
      }`}
    >
      {/* Pointer-responsive ambient light sheen */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(500px circle at ${hoverPos.x}% ${hoverPos.y}%, rgba(245, 197, 24, 0.07), transparent 60%)`,
        }}
      />

      {/* Visual Frame */}
      <div
        className={`relative overflow-hidden bg-[#161616] ${
          isFeaturedLead
            ? 'lg:col-span-7 aspect-[4/3] lg:aspect-auto lg:min-h-[380px]'
            : 'aspect-[4/3]'
        }`}
      >
        <div className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.03]">
          <ResilientImage
            src={project.imageUrl}
            alt={project.imageAlt}
            fallbackTitle={project.title}
          />
        </div>
      </div>

      {/* Content */}
      <div
        className={`relative p-6 sm:p-8 flex flex-col justify-between gap-6 ${
          isFeaturedLead ? 'lg:col-span-5' : ''
        }`}
      >
        <div>
          {/* Clean Unboxed Metadata Line (Zero-Pill Discipline) */}
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-[#5B5D5B] dark:text-[#9A9C9A] mb-3">
            <span className="font-mono-tabular text-[#101010] dark:text-[#F5C518] font-medium">
              {project.index}
            </span>
            <span aria-hidden="true">·</span>
            <span>{project.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{project.status}</span>
          </div>

          <h3 className="font-display text-2xl sm:text-[26px] font-semibold tracking-tight text-[#101010] dark:text-[#F8F5ED] leading-tight">
            {project.title}
          </h3>
          <p className="mt-1.5 text-sm font-medium text-[#5B5D5B] dark:text-[#B5B7B5]">
            {project.subtitle}
          </p>

          <p className="mt-4 text-sm leading-[1.65] text-[#404240] dark:text-[#9A9C9A]">
            {project.summary}
          </p>

          {/* Clean unboxed technology list */}
          <p className="mt-5 pt-4 border-t border-black/10 dark:border-white/10 text-xs text-[#5B5D5B] dark:text-[#8E908E] leading-relaxed">
            {project.technologies.join(' · ')}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => onSelect(project)}
            className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[40px] text-xs font-semibold rounded-md bg-[#101010] text-[#F8F5ED] dark:bg-[#272727] dark:text-[#F8F5ED] hover:bg-[#272727] dark:hover:bg-[#F5C518] dark:hover:text-[#101010] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Read Case Study</span>
          </button>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 min-h-[40px] text-xs font-medium rounded-md border border-black/15 dark:border-white/15 text-[#101010] dark:text-[#F8F5ED] hover:border-[#F5C518] dark:hover:border-[#F5C518] transition-colors whitespace-nowrap shrink-0"
            >
              <span>Live Preview</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          )}

          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 min-h-[40px] text-xs font-medium rounded-md border border-black/15 dark:border-white/15 text-[#101010] dark:text-[#F8F5ED] hover:border-[#F5C518] dark:hover:border-[#F5C518] transition-colors whitespace-nowrap shrink-0"
            >
              <span>GitHub Repo</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
