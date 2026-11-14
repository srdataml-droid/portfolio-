import type { ProjectCaseStudy } from '../utils/portfolioLogic';

/**
 * Editable Portfolio Configuration
 * --------------------------------
 * Update personal links, portrait asset path, project details, and contact endpoints here.
 * To replace the portrait with a local upload later, place your image in /public or /src/assets
 * and update `PORTFOLIO_PROFILE.portraitUrl`.
 */
export const PORTFOLIO_PROFILE = {
  name: 'Samuel Irenikase',
  shortRole: 'AI/ML & Full-Stack Software Engineer',
  location: 'Lagos, Nigeria',
  headline: 'Building intelligent software for real-world problems.',
  subheadline:
    'AI/ML-focused software developer, full-stack product builder, and entrepreneur crafting resilient business platforms, practical automation, and grounded digital tools.',
  availabilityLabel: 'Open to product engineering, AI systems & technical collaborations',
  email: 'samuelirenikase@gmail.com',
  githubUrl: 'https://github.com/srdataml-droid',
  githubHandle: 'srdataml-droid',
  // Editable networking URLs — set to your live profile URLs when ready
  linkedinUrl: '',
  xUrl: '',
  portraitUrl: '/src/assets/images/samuel_portrait_1794648200044.jpg',
  portraitAlt:
    'Editorial studio portrait of Samuel Irenikase wearing a tailored black formal suit, white dress shirt, and black tie under warm golden key lighting.',
};

export const PORTFOLIO_PROJECTS: ProjectCaseStudy[] = [
  {
    id: 'hotel-os',
    index: '01',
    title: 'Hotel OS',
    subtitle: 'Hospitality booking, reservation & front-desk operations',
    category: 'platforms',
    categoryLabel: 'Product Platform',
    status: 'Live Web Preview',
    year: '2025',
    summary:
      'An integrated hospitality operations suite uniting guest reservations, room-state tracking, and front-desk coordination in a single responsive interface.',
    problem:
      'Independent hotels and boutique properties often manage room availability, check-ins, and guest folios across disconnected spreadsheets and manual logs, creating double-booking risks and slow handovers.',
    solution:
      'Engineered a unified hospitality management web platform that centralizes room inventory, reservation lifecycles, guest records, and operational status transitions with immediate visual clarity for front-desk staff.',
    role: 'Founder & Full-Stack Product Engineer — architecture, UI/UX design, state modeling, and web deployment.',
    technologies: ['TypeScript', 'React', 'Tailwind CSS', 'Relational State Modeling', 'Vercel'],
    productDecisions: [
      'Prioritized a calendar-first and room-status operational view so front-desk teams can resolve check-in bottlenecks in seconds.',
      'Designed clean status transitions (Reserved, Checked-In, Housekeeping, Available) to prevent conflicting room assignments.',
      'Built responsive layouts for both desktop reception desks and mobile manager oversight.',
    ],
    imageUrl: '/src/assets/images/project_hotel_os_1794648199314.jpg',
    imageAlt: 'Hotel OS hospitality reservation console and operational interface composition',
    liveUrl: 'https://hotel-os-livid.vercel.app/',
    notes: 'Public web preview deployed on Vercel.',
  },
  {
    id: 'honor-erp',
    index: '02',
    title: 'HONOR ERP / Storefront',
    subtitle: 'Retail inventory, operations & commerce platform',
    category: 'platforms',
    categoryLabel: 'Commerce & ERP',
    status: 'Live Web Preview',
    year: '2025',
    summary:
      'A unified retail operations and customer storefront system designed to keep stock counts, point-of-sale workflows, and online product discovery synchronized.',
    problem:
      'Growing retail businesses struggle when their public storefront operates separately from internal stock control, leading to oversold items, manual reconciliation, and delayed restocking.',
    solution:
      'Built an end-to-end commerce and inventory platform pairing a clean buyer-facing storefront with structured product catalog management, stock visibility, and order operations.',
    role: 'Lead Full-Stack Developer — product architecture, storefront interface, and operational workflow design.',
    technologies: ['TypeScript', 'React', 'Next-Gen Web Stack', 'Inventory State Logic', 'Vercel'],
    productDecisions: [
      'Coupled storefront presentation directly with operational catalog structures to eliminate duplicate product entry.',
      'Kept product discovery fast and uncluttered so shoppers reach checkout with minimal friction.',
      'Structured inventory schemas to support clear SKU tracking and restock thresholds.',
    ],
    imageUrl: '/src/assets/images/project_honor_erp_1794648199454.jpg',
    imageAlt: 'HONOR ERP retail storefront and inventory hardware terminal editorial view',
    liveUrl: 'https://honor-storefront.vercel.app/',
    notes: 'Public storefront preview deployed on Vercel.',
  },
  {
    id: 'verodesk-zuvamo',
    index: '03',
    title: 'VeroDesk / Zuvamo',
    subtitle: 'AI-assisted business receptionist & customer interaction platform',
    category: 'ai-systems',
    categoryLabel: 'AI & Automation',
    status: 'Active Development',
    year: '2025',
    summary:
      'An intelligent business receptionist and inquiry-handling layer built to help service businesses respond promptly, qualify customer needs, and route requests cleanly.',
    problem:
      'Small and mid-sized businesses lose high-intent leads when calls and customer messages arrive outside office hours or overwhelm small front-office teams.',
    solution:
      'Designed an AI-assisted receptionist workflow combining structured intent extraction, business-context grounding, and clean escalation rules so routine inquiries receive immediate, accurate responses.',
    role: 'Creator & AI Systems Engineer — prompt architecture, interaction flows, backend orchestration, and product UX.',
    technologies: ['Python', 'LLM Orchestration', 'TypeScript', 'API Integration', 'Conversational UX'],
    productDecisions: [
      'Enforced strict domain grounding so responses stay faithful to each business’s actual pricing, hours, and services.',
      'Built explicit human-handoff triggers for edge cases rather than forcing full automation on sensitive requests.',
      'Focused on low-latency structured outputs to make customer conversations feel natural and dependable.',
    ],
    imageUrl: '/src/assets/images/project_verodesk_1794648200918.jpg',
    imageAlt: 'Sculptural acoustic metallic waves symbolizing VeroDesk AI interaction routing',
    notes: 'Currently in active product development; private build without public production URL yet.',
  },
  {
    id: 'ussd-flow',
    index: '04',
    title: 'USSD Flow',
    subtitle: 'SIM-based, mobile-data-independent banking interactions on Android',
    category: 'ai-systems',
    categoryLabel: 'Mobile Systems',
    status: 'Open-Source Prototype',
    year: '2024',
    summary:
      'An Android engineering exploration simplifying multi-step USSD banking interactions so users can complete reliable transactions without active mobile internet.',
    problem:
      'In regions where mobile data can be unreliable or costly, millions rely on USSD shortcodes—yet raw USSD menus are error-prone, timeout-sensitive, and difficult to navigate repeatedly.',
    solution:
      'Developed an Android prototype that models USSD session trees into guided, human-readable interaction steps over SIM-based telecom channels without requiring an internet data connection.',
    role: 'Mobile & Systems Developer — Android research, USSD session parsing, and interaction prototype.',
    technologies: ['Android', 'Kotlin / Java', 'USSD Session Handling', 'Accessibility & Telecom APIs'],
    productDecisions: [
      'Prioritized zero-data resilience so core financial flows remain accessible on low-connectivity networks.',
      'Structured session state handling to recover gracefully from telecom timeouts or unexpected carrier prompts.',
      'Published the exploration openly on GitHub to document patterns and share technical learnings.',
    ],
    imageUrl: '/src/assets/images/project_ussd_flow_1794648201801.jpg',
    imageAlt: 'Android smartphone on dark basalt stone depicting offline SIM-based USSD network nodes',
    repoUrl: 'https://github.com/srdataml-droid/ussd-flow',
    notes: 'Open-source engineering exploration available on GitHub.',
  },
  {
    id: 'worthkind',
    index: '05',
    title: 'Worthkind',
    subtitle: 'Collaborative technology & practical problem-solving initiative',
    category: 'initiatives',
    categoryLabel: 'Initiative',
    status: 'Ongoing Initiative',
    year: '2024 — Present',
    summary:
      'A collaborative engineering and product-building initiative focused on turning real everyday friction into practical, usable technology through rapid prototyping and teamwork.',
    problem:
      'Many promising technical ideas stall in theory because builders lack structured collaborative environments focused on real-world constraints and execution.',
    solution:
      'Established Worthkind as a vehicle for cross-disciplinary prototyping, hackathon sprints, and pragmatic software experiments grounded in community and operational realities.',
    role: 'Initiator & Technical Builder — problem framing, engineering execution, and collaborative product sprints.',
    technologies: ['Product Strategy', 'Rapid Prototyping', 'Full-Stack Web', 'Applied AI'],
    productDecisions: [
      'Anchored every sprint around observable user problems rather than technology-first novelty.',
      'Emphasized shippable prototypes and clear technical documentation over slide-deck concepts.',
      'Fostered peer learning across backend, AI/ML experimentation, and user interface craft.',
    ],
    imageUrl: '/src/assets/images/project_worthkind_1794648201903.jpg',
    imageAlt: 'Collaborative engineering desk in Lagos with warm tungsten lighting and technical plans',
    notes: 'Ongoing collaborative initiative; editable links can be attached as new releases ship.',
  },
];

export const ABOUT_CONTENT = {
  title: 'Engineering with intent, grounded in real operational problems.',
  paragraphs: [
    'Based in Lagos, Nigeria, I build software products at the intersection of artificial intelligence, full-stack engineering, and practical entrepreneurship. My work starts from a straightforward question: what friction slows real businesses and everyday people down, and how can clean software remove it?',
    'Across hospitality systems, retail ERP and storefronts, AI-assisted customer receptionists, and offline-resilient Android telecom workflows, I focus on shipping systems that remain dependable outside ideal lab conditions.',
    'My ongoing growth in Python and AI/ML engineering pairs with strong product instincts—bridging data models, backend architecture, and refined user interfaces into cohesive, human-centered tools.',
  ],
  highlights: [
    { label: 'Base', value: 'Lagos, Nigeria' },
    { label: 'Focus', value: 'AI/ML & Product Engineering' },
    { label: 'Approach', value: 'End-to-End Execution' },
  ],
};

export interface ExpertiseDomain {
  index: string;
  title: string;
  description: string;
  capabilities: string[];
}

export const EXPERTISE_DOMAINS: ExpertiseDomain[] = [
  {
    index: '01',
    title: 'Python & AI/ML Engineering',
    description:
      'Building applied machine learning workflows, LLM-orchestrated assistants, structured intent routing, and Python-based automation pipelines.',
    capabilities: ['Python', 'Applied ML Foundations', 'LLM Prompt & Tool Orchestration', 'Data Processing'],
  },
  {
    index: '02',
    title: 'Backend & Systems Architecture',
    description:
      'Designing clean APIs, relational data models, authentication boundaries, and reliable operational state transitions for business-critical software.',
    capabilities: ['Node.js / Express', 'REST APIs', 'Relational Modeling', 'System Design'],
  },
  {
    index: '03',
    title: 'Frontend & Interactive Craft',
    description:
      'Crafting responsive, accessible web interfaces with deliberate typography, purposeful motion, and clear visual hierarchy across desktop and mobile.',
    capabilities: ['TypeScript', 'React', 'Tailwind CSS', 'Motion & Accessibility'],
  },
  {
    index: '04',
    title: 'Product & Entrepreneurial Execution',
    description:
      'Translating ambiguous real-world problems into scoped MVPs, clear product decisions, and iterative deployments that users can actually operate.',
    capabilities: ['Problem Framing', 'Product Architecture', 'Rapid Prototyping', 'Mobile & Web Delivery'],
  },
];

export const BEYOND_CODE_CONTENT = {
  title: 'Practical innovation beyond the editor.',
  lead:
    'Building meaningful technology in Lagos requires more than clean syntax—it demands understanding connectivity constraints, local business workflows, and collaborative momentum.',
  pillars: [
    {
      index: '01',
      title: 'Worthkind Initiative',
      summary:
        'A collaborative effort dedicated to identifying practical everyday bottlenecks and building grounded software solutions alongside fellow designers and engineers.',
    },
    {
      index: '02',
      title: 'Hackathon & Sprint Collaboration',
      summary:
        'Active participation in collaborative build sprints and hackathons—testing ideas under tight timelines, shipping working prototypes, and learning rapidly with peers.',
    },
    {
      index: '03',
      title: 'Constraint-Driven Engineering',
      summary:
        'Exploring offline-capable mobile channels like SIM-based USSD flows and lightweight web tools engineered to perform reliably across varied hardware and networks.',
    },
  ],
};
