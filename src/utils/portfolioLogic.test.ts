import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildMailtoHref,
  filterProjects,
  formatInquiryClipboardText,
  getAdjacentProject,
  resolveActiveSection,
  resolveInitialTheme,
  validateInquiry,
  type ProjectCaseStudy,
} from './portfolioLogic';

const sampleProjects: ProjectCaseStudy[] = [
  {
    id: 'hotel-os',
    index: '01',
    title: 'Hotel OS',
    subtitle: 'Hospitality Operations',
    category: 'platforms',
    categoryLabel: 'Product Platform',
    status: 'Live Web Preview',
    year: '2025',
    summary: 'Hospitality software.',
    problem: 'Fragmented booking workflows.',
    solution: 'Unified operational core.',
    role: 'Full-Stack Builder',
    technologies: ['TypeScript', 'React'],
    productDecisions: ['Single reservation ledger'],
    imageUrl: '/a.jpg',
    imageAlt: 'Hotel OS',
    liveUrl: 'https://hotel-os-livid.vercel.app/',
  },
  {
    id: 'verodesk',
    index: '02',
    title: 'VeroDesk / Zuvamo',
    subtitle: 'AI Receptionist',
    category: 'ai-systems',
    categoryLabel: 'AI Systems',
    status: 'Active Development',
    year: '2025',
    summary: 'AI customer interaction.',
    problem: 'Missed customer inquiries.',
    solution: 'Structured AI triage.',
    role: 'AI & Product Engineer',
    technologies: ['Python', 'LLMs'],
    productDecisions: ['Deterministic handoff'],
    imageUrl: '/b.jpg',
    imageAlt: 'VeroDesk',
  },
  {
    id: 'worthkind',
    index: '03',
    title: 'Worthkind',
    subtitle: 'Collaborative Initiative',
    category: 'initiatives',
    categoryLabel: 'Initiative',
    status: 'Ongoing Initiative',
    year: '2024',
    summary: 'Practical problem solving.',
    problem: 'Local tooling gaps.',
    solution: 'Collaborative sprints.',
    role: 'Co-Builder',
    technologies: ['Product Design'],
    productDecisions: ['Field-first validation'],
    imageUrl: '/c.jpg',
    imageAlt: 'Worthkind',
  },
];

test('filterProjects returns all projects when category is all and narrows accurately', () => {
  assert.equal(filterProjects(sampleProjects, 'all').length, 3);
  const aiOnly = filterProjects(sampleProjects, 'ai-systems');
  assert.equal(aiOnly.length, 1);
  assert.equal(aiOnly[0].id, 'verodesk');
});

test('getAdjacentProject wraps cleanly in both directions', () => {
  assert.equal(getAdjacentProject(sampleProjects, 'hotel-os', 'prev')?.id, 'worthkind');
  assert.equal(getAdjacentProject(sampleProjects, 'worthkind', 'next')?.id, 'hotel-os');
  assert.equal(getAdjacentProject(sampleProjects, 'hotel-os', 'next')?.id, 'verodesk');
  assert.equal(getAdjacentProject([], 'hotel-os', 'next'), null);
});

test('validateInquiry catches empty/invalid fields and accepts valid input', () => {
  const invalid = validateInquiry({
    name: 'S',
    email: 'not-an-email',
    subject: 'Hi',
    message: 'Too short',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.subject);
  assert.ok(invalid.errors.message);

  const valid = validateInquiry({
    name: 'Adaeze Okafor',
    email: 'adaeze@example.com',
    subject: 'AI Engineering Collaboration',
    message: 'We would love to collaborate on an operational software product in Lagos.',
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});

test('buildMailtoHref and formatInquiryClipboardText format details cleanly', () => {
  const payload = {
    name: 'Tunde Bakare',
    email: 'tunde@company.ng',
    subject: 'Product Architecture',
    message: 'Interested in discussing backend and AI workflows for our retail stores.',
  };
  const href = buildMailtoHref('samuelirenikase@gmail.com', payload);
  assert.ok(href.startsWith('mailto:samuelirenikase@gmail.com?subject='));
  assert.ok(href.includes('Product%20Architecture'));

  const clip = formatInquiryClipboardText(payload);
  assert.ok(clip.includes('Subject: Product Architecture'));
  assert.ok(clip.includes('From: Tunde Bakare (tunde@company.ng)'));
});

test('resolveActiveSection selects deepest section past scroll cursor', () => {
  const sections = [
    { id: 'home', top: 0 },
    { id: 'work', top: 820 },
    { id: 'about', top: 1850 },
    { id: 'contact', top: 3200 },
  ];
  assert.equal(resolveActiveSection(sections, 0), 'home');
  assert.equal(resolveActiveSection(sections, 700), 'work');
  assert.equal(resolveActiveSection(sections, 1750), 'about');
  assert.equal(resolveActiveSection(sections, 3100), 'contact');
});

test('resolveInitialTheme defaults to dark and respects explicit stored choice', () => {
  assert.equal(resolveInitialTheme(null), 'dark');
  assert.equal(resolveInitialTheme('invalid'), 'dark');
  assert.equal(resolveInitialTheme('light'), 'light');
  assert.equal(resolveInitialTheme('dark'), 'dark');
});
