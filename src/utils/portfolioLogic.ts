export type ProjectCategory = 'all' | 'platforms' | 'ai-systems' | 'initiatives';

export type ProjectStatus =
  | 'Live Web Preview'
  | 'Active Development'
  | 'Open-Source Prototype'
  | 'Ongoing Initiative';

export interface ProjectCaseStudy {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: Exclude<ProjectCategory, 'all'>;
  categoryLabel: string;
  status: ProjectStatus;
  year: string;
  summary: string;
  problem: string;
  solution: string;
  role: string;
  technologies: string[];
  productDecisions: string[];
  imageUrl: string;
  imageAlt: string;
  liveUrl?: string;
  repoUrl?: string;
  notes?: string;
}

export interface InquiryFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface InquiryValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof InquiryFormData, string>>;
}

export type ThemeMode = 'dark' | 'light';

export function filterProjects(
  projects: readonly ProjectCaseStudy[],
  category: ProjectCategory,
): ProjectCaseStudy[] {
  if (category === 'all') {
    return [...projects];
  }
  return projects.filter((project) => project.category === category);
}

export function getAdjacentProject(
  projects: readonly ProjectCaseStudy[],
  currentId: string,
  direction: 'next' | 'prev',
): ProjectCaseStudy | null {
  if (projects.length === 0) return null;
  const currentIndex = projects.findIndex((item) => item.id === currentId);
  if (currentIndex === -1) return projects[0];
  const delta = direction === 'next' ? 1 : -1;
  const targetIndex = (currentIndex + delta + projects.length) % projects.length;
  return projects[targetIndex];
}

export function validateInquiry(data: InquiryFormData): InquiryValidationResult {
  const errors: Partial<Record<keyof InquiryFormData, string>> = {};

  if (!data.name.trim() || data.name.trim().length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).';
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email.trim() || !emailPattern.test(data.email.trim())) {
    errors.email = 'Please provide a valid email address.';
  }

  if (!data.subject.trim() || data.subject.trim().length < 3) {
    errors.subject = 'Please include a short subject for your inquiry.';
  }

  if (!data.message.trim() || data.message.trim().length < 15) {
    errors.message = 'Please share a brief overview (at least 15 characters).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function buildMailtoHref(
  recipientEmail: string,
  data: InquiryFormData,
): string {
  const subject = encodeURIComponent(`[Portfolio Inquiry] ${data.subject.trim()}`);
  const body = encodeURIComponent(
    `Hi Samuel,\n\n${data.message.trim()}\n\n—\nFrom: ${data.name.trim()}\nReply-To: ${data.email.trim()}`,
  );
  return `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
}

export function formatInquiryClipboardText(data: InquiryFormData): string {
  return [
    `Subject: ${data.subject.trim()}`,
    `From: ${data.name.trim()} (${data.email.trim()})`,
    '',
    data.message.trim(),
  ].join('\n');
}

export interface SectionPosition {
  id: string;
  top: number;
}

export function resolveActiveSection(
  sections: readonly SectionPosition[],
  scrollY: number,
  offset = 160,
): string {
  if (sections.length === 0) return 'home';
  const cursor = scrollY + offset;
  let active = sections[0].id;
  for (const section of sections) {
    if (section.top <= cursor) {
      active = section.id;
    }
  }
  return active;
}

export function resolveInitialTheme(
  storedTheme: string | null | undefined,
): ThemeMode {
  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme;
  }
  return 'dark';
}
