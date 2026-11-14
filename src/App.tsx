import React, { useCallback, useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { PORTFOLIO_PROJECTS } from './data/portfolio';
import {
  getAdjacentProject,
  resolveActiveSection,
  resolveInitialTheme,
  type ProjectCaseStudy,
  type ThemeMode,
} from './utils/portfolioLogic';
import { IntroOverlay } from './components/IntroOverlay';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SelectedWorkSection } from './components/SelectedWorkSection';
import { AboutAndExpertiseSection } from './components/AboutAndExpertiseSection';
import { BeyondCodeSection } from './components/BeyondCodeSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CaseStudyModal } from './components/CaseStudyModal';

const SECTION_IDS = ['home', 'work', 'about', 'expertise', 'beyond-code', 'contact'];
const THEME_STORAGE_KEY = 'samuel_portfolio_theme';

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return 'dark';
    return resolveInitialTheme(window.localStorage.getItem(THEME_STORAGE_KEY));
  });

  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);
  const [introDone, setIntroDone] = useState(false);

  // Sync .dark class on <html> and persist preference
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, [theme]);

  // Scrollspy active-section tracking
  useEffect(() => {
    let ticking = false;
    const updateActive = () => {
      const positions = SECTION_IDS.map((id) => {
        const el = document.getElementById(id);
        return {
          id,
          top: el ? el.offsetTop : 0,
        };
      });
      setActiveSection(resolveActiveSection(positions, window.scrollY, 180));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActive);
        ticking = true;
      }
    };

    updateActive();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateActive);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateActive);
    };
  }, []);

  const handleToggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const handleIntroComplete = useCallback(() => {
    setIntroDone(true);
  }, []);

  const handleNavigateCaseStudy = useCallback(
    (direction: 'prev' | 'next') => {
      if (!selectedProject) return;
      const next = getAdjacentProject(PORTFOLIO_PROJECTS, selectedProject.id, direction);
      if (next) setSelectedProject(next);
    },
    [selectedProject],
  );

  return (
    <MotionConfig reducedMotion="user">
      <div
        data-intro-done={introDone ? 'true' : 'false'}
        data-theme={theme}
        className="min-h-screen bg-[#F8F5ED] text-[#101010] dark:bg-[#101010] dark:text-[#F8F5ED] transition-colors duration-200"
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#F5C518] focus:text-[#101010] focus:rounded-md focus:text-xs focus:font-semibold"
        >
          Skip to main content
        </a>

        <IntroOverlay onComplete={handleIntroComplete} />

        <Navbar activeSection={activeSection} />

        <main id="main-content">
          <HeroSection theme={theme} onToggleTheme={handleToggleTheme} />
          <SelectedWorkSection onSelectProject={setSelectedProject} />
          <AboutAndExpertiseSection />
          <BeyondCodeSection />
          <ContactSection />
        </main>

        <Footer />

        <CaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onNavigate={handleNavigateCaseStudy}
        />
      </div>
    </MotionConfig>
  );
}
