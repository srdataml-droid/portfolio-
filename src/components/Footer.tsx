import React from 'react';
import { ArrowUp } from 'lucide-react';
import { PORTFOLIO_PROFILE } from '../data/portfolio';

export function Footer() {
  return (
    <footer className="border-t border-black/10 dark:border-white/10 py-8">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#5B5D5B] dark:text-[#8E908E]">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-medium text-[#101010] dark:text-[#F8F5ED]">
            {PORTFOLIO_PROFILE.name}
          </span>
          <span aria-hidden="true">·</span>
          <span>{PORTFOLIO_PROFILE.location}</span>
          <span aria-hidden="true">·</span>
          <span>&copy; {new Date().getFullYear()}</span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href={PORTFOLIO_PROFILE.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#101010] dark:hover:text-[#F5C518] transition-colors"
          >
            GitHub
          </a>
          <a
            href={`mailto:${PORTFOLIO_PROFILE.email}`}
            className="hover:text-[#101010] dark:hover:text-[#F5C518] transition-colors"
          >
            Email
          </a>
          <a
            href="#home"
            className="inline-flex items-center gap-1 hover:text-[#101010] dark:hover:text-[#F5C518] transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
