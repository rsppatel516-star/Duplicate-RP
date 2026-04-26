import { FaLaptopCode, FaMobileAlt, FaServer, FaFigma, FaBolt, FaCode } from 'react-icons/fa';

export const services = [
  {
    title: 'Website Development',
    description: 'Custom responsive websites — clean code, fast performance, mobile-first design.',
    icon: FaLaptopCode,
    features: [
      'Responsive & Mobile-First Design',
      'SEO Optimized Structure',
      'Fast Load Times & Performance',
      'Modern Tech Stack Integration'
    ],
    keyBenefits: [
      'Higher user engagement & retention',
      'Better search engine rankings',
      'Scalable foundation for future growth'
    ],
    techStack: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion']
  },
  {
    title: 'Web Application Development',
    description: 'Full-featured web apps with interactive UI, REST APIs, and scalable architecture.',
    icon: FaCode,
    features: [
      'Interactive & Dynamic Interfaces',
      'Secure User Authentication',
      'Database Design & Management',
      'Scalable & Maintainable Architecture'
    ],
    keyBenefits: [
      'Digitized and automated business logic',
      'Secure data flow & management',
      'Cross-browser and reliable access'
    ],
    techStack: ['Node.js', 'Express', 'React', 'MongoDB', 'PostgreSQL']
  },
  {
    title: 'Mobile App Development',
    description: 'Cross-platform apps built with Flutter and React Native for iOS and Android.',
    icon: FaMobileAlt,
    features: [
      'Native-Like Performance',
      'Cross-Platform Codebase',
      'App Store Optimization',
      'Push Notifications Integration'
    ],
    keyBenefits: [
      'Lower development cost for dual platforms',
      'Consistent UI across iOS and Android',
      'Reach a wider mobile audience'
    ],
    techStack: ['React Native', 'Flutter', 'Firebase', 'Expo']
  },
  {
    title: 'API Development & Integration',
    description: 'Design and integrate RESTful APIs; connect with third-party services.',
    icon: FaServer,
    features: [
      'RESTful & GraphQL APIs',
      'Secure Data Endpoints',
      'Third-Party Service Integration',
      'Detailed API Documentation'
    ],
    keyBenefits: [
      'Seamless communication between services',
      'Enhanced security and data validation',
      'Ready-to-use infrastructure scaling'
    ],
    techStack: ['Node.js', 'GraphQL', 'REST', 'Docker', 'AWS']
  },
  {
    title: 'UI from Figma',
    description: 'Pixel-perfect conversion of Figma designs into clean React or Flutter code.',
    icon: FaFigma,
    features: [
      'Pixel-Perfect Conversions',
      'Interactive Prototypes Implementation',
      'Reusable Component Systems',
      'Fluid Animations & Transitions'
    ],
    keyBenefits: [
      'Exact match to design intent',
      'Highly maintainable component structures',
      'Reduced visual bugs & layout shifts'
    ],
    techStack: ['Figma', 'HTML/CSS', 'Tailwind', 'Storybook']
  },
  {
    title: 'Website Optimization',
    description: 'Improve load speed, SEO, Core Web Vitals, and performance of existing projects.',
    icon: FaBolt,
    features: [
      'Core Web Vitals Improvement',
      'Image Optimization & Caching',
      'Code Minification & Splitting',
      'Accessibility Enhancements'
    ],
    keyBenefits: [
      'Decreased bounce rate',
      'Improved Google Lighthouse scores',
      'Better accessibility for all users'
    ],
    techStack: ['Lighthouse', 'Webpack', 'Vite', 'Cloudflare']
  }
];
