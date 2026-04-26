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
    title: 'Hilink Travel',
    subtitle: 'Cinematic Journey Architect',
    description:
      'An immersive travel planning web app that lets users explore destinations, build itineraries, and discover hidden gems — all wrapped in a cinematic dark-mode bento-grid UI with real-time API data.',
    image: '/project img/Hilink.png',
    tags: ['HTML', 'CSS', 'JavaScript', 'REST API'],
    skillsUsed: [
      'API Integration',
      'Asynchronous JavaScript',  
      'Frontend Architecture',
      'Responsive Layout',
    ],
    keyFeatures: [
      'Real-time destination data via REST API',
      'Interactive bento-grid itinerary builder',
      'Downloadable trip plans',
      'Cross-device responsive design',
      'Dark-mode first UI with glassmorphism cards',
    ],
    problem: 'Travel planning information is often fragmented and visually overwhelming for users.',
    solution: 'Organized complex itinerary data into a modular bento-grid layout, making trip visualization intuitive and engaging.',
    results: 'Created a zero-latency planning interface that simplifies logistics while maintaining a premium aesthetic.',
    status: 'Completed',
    category: 'Web App',
    liveUrl: '#',
    githubUrl: 'https://github.com/Rudraptl16/Rudraptl16',
    featured: true,
  },
  {
    id: 3,
    title: 'Profile Card',
    subtitle: 'Real-time Atmospheric Intelligence',
    description:
      'A real-time atmospheric intelligence platform that visualizes weather data beautifully. Dynamic SVG visualizations and adaptive color palettes shift based on live weather conditions for an immersive experience.',
    image: '/project img/profile card.png',
    tags: ['JavaScript', 'OpenWeather API', 'GSAP', 'CSS3'],
    skillsUsed: [
      'Third-party API Integration',
      'JSON Parsing',
      'Dynamic Rendering',
      'SVG Animation',
    ],
    keyFeatures: [
      'Live weather data with high-frequency API polling',
      'Dynamic SVG atmospheric visualizations',
      'Adaptive color palettes based on conditions',
      'Offline-first localized data caching',
      'Global city search with autocomplete',
    ],
    problem: 'Standard weather applications are often cluttered with data and lack a visual connection to the actual atmosphere.',
    solution: 'Used dynamic SVG animations and color palettes that shift in real-time based on current weather conditions.',
    results: 'Improved data consumption efficiency and user engagement through satisfying, interactive visual feedback.',
    status: 'In Progress',
    category: 'Web App',
    liveUrl: '#',
    githubUrl: 'https://github.com/Rudraptl16/Rudraptl16',
    featured: true,
  },
  {
    id: 4,
    title: 'Modern Calculator',
    description:
      'A stylish dark-themed calculator reimagined as an object of high-end design. Neo-brutalist tactile interactions fused with glassmorphism deliver a premium, zero-latency calculation experience.',
    image: '/images/po.png',
    tags: ['HTML', 'CSS', 'JavaScript', 'MathJS'],
    skillsUsed: [
      'UI/UX Design',
      'DOM Manipulation',
      'Event Handling',
      'String Sanitization',
    ],
    keyFeatures: [
      'Neo-brutalist tactile key interaction',
      'Complex nested parentheses calculation engine',
      'Glassmorphic backdrop-filter UI tokens',
      'Full keyboard event listener support',
      'Dark mode interface with smooth animations',
    ],
    status: 'Completed',
    category: 'Full-Stack',
    liveUrl: '#',
    githubUrl: 'https://github.com/Rudraptl16/Rudraptl16',
    featured: true,
  },
  {
    id: 5,
    title: 'Word Counter Pro',
    description:
      'An advanced text analysis tool delivering live word, character, and sentence counts alongside reading time estimates — wrapped in a clean, minimalist interface for distraction-free writing.',
    image: '/images/pic.jpeg',
    tags: ['HTML', 'CSS', 'JavaScript'],
    skillsUsed: [
      'String Manipulation',
      'Regex',
      'Performance Optimization',
      'Minimalist UI Design',
    ],
    keyFeatures: [
      'Live character & word counting in real time',
      'Sentence and paragraph analytics',
      'Reading time estimation widget',
      'Copy-to-clipboard functionality',
      'Clean minimalist distraction-free interface',
    ],
    status: 'Completed',
    category: 'Web App',
    liveUrl: '#',
    githubUrl: 'https://github.com/Rudraptl16/Rudraptl16',
    featured: false,
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
