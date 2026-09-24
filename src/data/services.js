import { Laptop, Smartphone, Palette, Layers, Zap, Cloud } from 'lucide-react';

export const services = [
  {
    title: 'Frontend Web Development',
    description: 'Engineering high-performance, accessible, and SEO-optimized web applications using React, Next.js, and modern CSS architecture.',
    icon: Laptop,
    features: [
      'Responsive React & Next.js 14+ Development',
      'SEO & Schema.org Structured Data',
      'Tailwind CSS & Dynamic Design Tokens',
      'State Management & Modular Architecture'
    ],
    keyBenefits: [
      'Blazing-fast page loading speeds',
      'Dominant search engine rankings',
      'Scalable & maintainable codebase'
    ],
    techStack: ['React 18/19', 'Next.js 14/15', 'Tailwind CSS', 'TypeScript', 'Framer Motion']
  },
  {
    title: 'Native iOS App Development',
    description: 'Building elegant, high-speed native iOS mobile applications using Swift and SwiftUI with Apple Human Interface Guidelines in mind.',
    icon: Smartphone,
    features: [
      'Native SwiftUI & Swift Architecture',
      'Apple Human Interface Guidelines (HIG)',
      'Smooth 60fps Micro-Animations & Gestures',
      'App Store Submission & TestFlight Readiness'
    ],
    keyBenefits: [
      'Fluid native iOS user experience',
      'Optimal memory & battery efficiency',
      'Seamless Apple device integration'
    ],
    techStack: ['Swift', 'SwiftUI', 'Xcode', 'Combine', 'Firebase iOS SDK']
  },
  {
    title: 'UI/UX & Design-to-Code',
    description: 'Transforming Figma prototypes and design concepts into pixel-perfect, interactive frontend components with fluid motion.',
    icon: Palette,
    features: [
      'Pixel-Perfect Figma to Code Conversion',
      'Interactive Design System Development',
      'Fluid Micro-Interactions & Motion Logic',
      'Zero Layout Shift (CLS) Optimization'
    ],
    keyBenefits: [
      '100% fidelity to creative design vision',
      'Reusable, modular UI component library',
      'Engaging user interaction experiences'
    ],
    techStack: ['Figma', 'Tailwind CSS', 'Framer Motion', 'Lucide Icons', 'CSS Glassmorphism']
  },
  {
    title: 'Digital Architecture & Systems',
    description: 'Structuring clean, modular codebases and scalable web & mobile architectures designed for reliability and long-term maintainability.',
    icon: Layers,
    features: [
      'Clean Code & Component Scaffolding',
      'Scalable Folder & State Architecture',
      'Cross-Platform Logic Planning',
      'Comprehensive Code Documentation'
    ],
    keyBenefits: [
      'Reduced technical debt & easy updates',
      'Higher stability & lower error rates',
      'Effortless developer onboarding'
    ],
    techStack: ['Clean Architecture', 'Design Systems', 'TypeScript', 'Git Workflow']
  },
  {
    title: 'Performance & Speed Audit',
    description: 'Auditing and optimizing existing web and mobile applications to eliminate performance bottlenecks and boost Lighthouse scores.',
    icon: Zap,
    features: [
      'Core Web Vitals & Lighthouse Auditing',
      'Asset, Image & Script Pipeline Optimization',
      'Code-Splitting & Lazy Loading Strategies',
      'Render Cycle Optimization'
    ],
    keyBenefits: [
      'Instant load times & lower bounce rates',
      '100/100 Lighthouse performance metrics',
      'Enhanced mobile responsiveness'
    ],
    techStack: ['Lighthouse', 'Vite', 'WebP/AVIF', 'Chrome DevTools']
  },
  {
    title: 'API & Cloud Integration',
    description: 'Connecting web and mobile frontends to REST APIs, GraphQL endpoints, and Firebase cloud backends for dynamic real-time features.',
    icon: Cloud,
    features: [
      'RESTful & GraphQL API Consumption',
      'Firebase Authentication & Firestore Sync',
      'Secure Client-Side Token Storage',
      'Async Error Handling & Loading States'
    ],
    keyBenefits: [
      'Real-time data synchronization',
      'Robust authentication & authorization',
      'Smooth offline fallback handling'
    ],
    techStack: ['REST APIs', 'Firebase', 'Fetch/Axios', 'Node.js APIs', 'JSON Schema']
  }
];

