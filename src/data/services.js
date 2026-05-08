import { FaLaptopCode, FaMobileAlt, FaServer, FaFigma, FaBolt, FaCode } from 'react-icons/fa';

export const services = [
  {
    title: 'Architectural Web Development',
    description: 'Engineering high-performance, accessible, and SEO-optimized digital ecosystems using modern frameworks and cutting-edge design patterns.',
    icon: FaLaptopCode,
    features: [
      'Core Web Vitals & Performance Engineering',
      'Semantic & Accessible HTML Architecture',
      'Advanced SEO & Schema.org Integration',
      'Edge-First Deployment Strategies'
    ],
    keyBenefits: [
      'Unmatched load speeds and user retention',
      'Dominant search engine visibility',
      'Future-proof, scalable codebases'
    ],
    techStack: ['React 19', 'Next.js 15', 'Tailwind v4', 'Framer Motion']
  },
  {
    title: 'Enterprise Web Applications',
    description: 'Building robust, secure, and highly interactive business tools that automate complex workflows and provide seamless data orchestration.',
    icon: FaCode,
    features: [
      'Interactive Dashboard Orchestration',
      'Secure RBAC & Identity Management',
      'Distributed System Architecture',
      'Real-time Data Synchronization'
    ],
    keyBenefits: [
      'Streamlined business operational efficiency',
      'Bank-grade data security protocols',
      'Intuitive UX for complex data handling'
    ],
    techStack: ['Node.js', 'TypeScript', 'GraphQL', 'PostgreSQL', 'Docker']
  },
  {
    title: 'Cross-Platform Mobile Ecosystems',
    description: 'Developing high-fidelity mobile experiences that bridge the gap between native performance and cross-platform flexibility.',
    icon: FaMobileAlt,
    features: [
      'Native-Grade Performance Tuning',
      'Shared Core Logic Architectures',
      'Biometric & Hardware Integration',
      'Automated CI/CD Delivery Pipelines'
    ],
    keyBenefits: [
      'Unified brand experience across platforms',
      'Accelerated time-to-market delivery',
      'Minimized maintenance overhead'
    ],
    techStack: ['React Native', 'Flutter', 'Firebase', 'Expo']
  },
  {
    title: 'Backend Systems & API Design',
    description: 'Designing resilient microservices and API layers that power modern applications with high availability and low latency.',
    icon: FaServer,
    features: [
      'Scalable Microservices Orchestration',
      'Event-Driven System Architectures',
      'Automated API Contract Testing',
      'Comprehensive Technical Documentation'
    ],
    keyBenefits: [
      'Flawless service-to-service communication',
      'Highly available & resilient infrastructure',
      'Simplified third-party integration'
    ],
    techStack: ['Go', 'Rust', 'Redis', 'Kubernetes', 'AWS']
  },
  {
    title: 'Design-to-Code Engineering',
    description: 'Transforming complex Figma prototypes into pixel-perfect, interactive frontend systems with a focus on motion and micro-interactions.',
    icon: FaFigma,
    features: [
      'Pixel-Perfect Design Fidelity',
      'Interactive Design System Development',
      'Advanced Motion & Animation Logic',
      'Fluid & Responsive Layout Systems'
    ],
    keyBenefits: [
      'Absolute fidelity to creative vision',
      'Consistent, reusable component libraries',
      'Zero layout shift (CLS) optimization'
    ],
    techStack: ['Figma', 'Storybook', 'Tailwind CSS', 'GSAP']
  },
  {
    title: 'Digital Performance Optimization',
    description: 'Deep-dive analysis and technical auditing to eliminate bottlenecks and maximize the performance of existing digital products.',
    icon: FaBolt,
    features: [
      'Comprehensive Performance Auditing',
      'Image & Asset Pipeline Optimization',
      'Tree-Shaking & Bundle Size Analysis',
      'Accessibility & Compliance Refactoring'
    ],
    keyBenefits: [
      'Significant reduction in bounce rates',
      'Perfect 100/100 Lighthouse scores',
      'Enhanced inclusivity and user reach'
    ],
    techStack: ['Lighthouse', 'Vite', 'Cloudflare', 'Sentry']
  }
];
