// ─────────────────────────────────────────────────────────────────────────────
//  Featured Artifacts — data source for Projects.jsx
//  Categories: 'Web App' | 'Full-Stack' | 'Landing Page' | 'Mobile App'
// ─────────────────────────────────────────────────────────────────────────────

export const featuredArtifacts = [
  {
    id: 1,
    title: 'Zerodha Trading Platform',
    subtitle: 'High-Performance Editorial Experience',
    description:
      'A radical, editorial split-screen portfolio engineered with a "Midnight Glass" neo-brutalist aesthetic. Built for performance, immersive 3D backgrounds, and sophisticated Framer Motion interactions across every section.',
    image: '/case img/Zerodha.png',
    tags: ['React 19', 'Framer Motion', 'Tailwind v4', 'Vite', 'Three.js'],
    skillsUsed: [
      'Component Architecture',
      'Animation Orchestration',
      'Responsive Design',
      'Theme System Design',
    ],
    keyFeatures: [
      'Vite-based ultra-fast HMR architecture',
      'Custom CSS variable integration with Tailwind v4',
      'Global 3D particle background system',
      'Context-based adaptive dark/light theme engine',
      'Framer Motion stagger & layout animations',
      'Magnetic button micro-interactions',
    ],
    problem: 'Traditional portfolios often feel static and generic. I wanted to create a high-frequency interaction model that feels like a premium digital magazine.',
    solution: 'Implemented a motion-first architecture using Framer Motion and a global particle system to create an immersive "Midnight Glass" aesthetic.',
    results: 'Achieved ultra-fast load times and a unique brand identity that stands out in the developer ecosystem.',
    status: 'Active Maintenance',
    category: 'Full-stack',
    liveUrl: '#',
    githubUrl: 'https://github.com/Rudraptl16/Rudraptl16',
    featured: true,
  },

  {
    id: 2,
    title: 'Hilink Landing Page',
    subtitle: 'Hilink - Modern Adventure Travel UI',
    description:
      'A premium, high-fidelity travel landing page and utility platform designed to empower adventurers with offline maps, trip planning tools, and immersive camping guides for seamless outdoor exploration',
    image: '/case img/Hilink.png',
    tags: ['React 19', 'Framer Motion', 'Tailwind v4', 'Vite', 'Three.js'],
    skillsUsed: [
      'Component Architecture',
      'Animation Orchestration',
      'Responsive Design',
      'Theme System Design',
    ],
    keyFeatures: [
      'Vite-based ultra-fast HMR architecture',
      'Custom CSS variable integration with Tailwind v4',
      'Global 3D particle background system',
      'Context-based adaptive dark/light theme engine',
      'Framer Motion stagger & layout animations',
      'Magnetic button micro-interactions',
    ],
    problem: 'Traditional portfolios often feel static and generic. I wanted to create a high-frequency interaction model that feels like a premium digital magazine.',
    solution: 'Implemented a motion-first architecture using Framer Motion and a global particle system to create an immersive "Midnight Glass" aesthetic.',
    results: 'Achieved ultra-fast load times and a unique brand identity that stands out in the developer ecosystem.',
    status: 'Active Maintenance',
    category: 'Frontend',
    liveUrl: '#',
    githubUrl: 'https://github.com/Rudraptl16/Rudraptl16',
    featured: true,
  }
];

// ─── Derived helpers ──────────────────────────────────────────────────────────

/** All unique filter categories, with 'All' prepended */
export const artifactFilters = [
  'All',
  ...Array.from(new Set(featuredArtifacts.map((p) => p.category))),
];

/** Only the projects marked as featured === true */
export const featuredOnly = featuredArtifacts.filter((p) => p.featured);
