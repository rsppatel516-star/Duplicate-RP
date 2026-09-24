/**
 * certifications.js
 * Source of truth for all credential/badge data used in the Achievements page.
 * Edit this file to add, update, or remove certifications.
 */

export const certifications = [
  {
    id: 'aws-cloud-foundations',
    title: 'AWS Academy Cloud Foundations',
    issuer: 'AWS Academy',
    date: 'Sep 2026',
    verificationId: 'AWS Academy Graduate',
    verificationHash: 'Cloud Foundations - Training Badge',
    description:
      'Demonstrates foundational knowledge of cloud computing architecture, core AWS services (compute, storage, database, networking), security principles, compliance, and cloud economics.',
    brandColor: '#FF9900',
    iconName: 'aws',
    imagePath: '/certificate img/AWS_Academy_Graduate___Cloud_Foundations___Training_Badge_Badge20260923-20-u3dphj_page-0001.jpg',
    pdfPath: '',
    externalUrl: 'https://www.credly.com/go/Dhh9SshN',
    skills: ['AWS Cloud', 'Cloud Architecture', 'Security & Compliance', 'EC2 & S3', 'Cloud Economics', 'Identity & Access (IAM)'],
    caseStudyId: null,
  },
  {
    id: 'microsoft-azure',
    title: 'Microsoft Azure',
    issuer: 'Microsoft',
    date: 'Dec 2025',
    verificationId: 'AZ-900-58192',
    verificationHash: '0x7B58AE14344B413EB419',
    description:
      'Demonstrates foundational level knowledge of cloud services and how those services are provided with Microsoft Azure, including security, privacy, compliance, and trust.',
    brandColor: '#0089D6',
    iconName: 'azure',
    imagePath: '/certificate img/Microsoft Azure.webp',
    pdfPath: '/Microsoft-Azure.pdf',
    externalUrl:
      'https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/',
    skills: ['Cloud Architecture', 'Azure Services', 'Cloud Security', 'Compliance Frameworks'],
    caseStudyId: null,
  },
  {
    id: 'python-programming',
    title: 'Python Programming',
    issuer: 'Cisco Networking Academy',
    date: 'Sep 2025',
    verificationId: 'Python Essentials 1',
    verificationHash: 'Cisco Networking',
    description:
      'Validates advanced proficiency in Python concepts, object-oriented software patterns, memory structures, multithreading, and algorithmic analysis.',
    brandColor: '#3776AB',
    iconName: 'python',
    imagePath: '/certificate img/Python.webp',
    pdfPath: '',
    externalUrl: 'https://www.credly.com/badges/955b2f66-1a2b-43a1-a087-c595295d52f8/',
    skills: ['Python 3', 'Object-Oriented Programming', 'Script Automation', 'Data Analysis'],
    caseStudyId: null,
  },
  {
    id: 'data-structures-algorithms',
    title: 'Data Structures & Algorithms',
    issuer: 'Apna College',
    date: 'Aug 2025',
    verificationId: 'Alpha Development',
    verificationHash: '624bd0e39df2bf2e436e1588',
    description:
      'Verifies mastery of algorithmic complexity, sorting/searching paradigms, advanced trees, graphs, dynamic programming, and Java-based memory representation.',
    brandColor: '#FF3E00',
    iconName: 'dsa',
    imagePath: '/certificate img/DSA.webp',
    pdfPath: '',
    externalUrl: 'https://www.apnacollege.in/',
    skills: ['Java Development', 'Data Structures', 'Algorithmic Complexity', 'Problem Solving'],
    caseStudyId: 5,
  },
  {
    id: 'fullstack-development',
    title: 'Full-Stack Development',
    issuer: 'Apna College',
    date: 'March 2026',
    verificationId: 'Delta Development',
    verificationHash: '699dbfb7150d54f6eb04e686',
    description:
      'Validates end-to-end web development proficiency spanning responsive React frontends, Node.js/Express backend APIs, MongoDB data modeling, REST architecture, CI/CD pipelines, and scalable deployment practices.',
    brandColor: '#00d4aa',
    iconName: 'fullstack',
    imagePath: '/certificate img/Sigma-Development.webp',
    pdfPath: '',
    externalUrl: 'https://www.apnacollege.in/',
    skills: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST API', 'CI/CD'],
    caseStudyId: 7,
  },
  {
    id: 'operating-systems',
    title: 'Operating System',
    issuer: 'Cisco Networking Academy',
    date: 'Sep 2025',
    verificationId: 'Operating System',
    verificationHash: 'Cisco Networking Academy',
    description:
      'Verifies fundamental knowledge of thread scheduling, process synchronization, paging & virtual memory, disk management, and secure POSIX kernel architectures.',
    brandColor: '#00E676',
    iconName: 'os',
    imagePath: '/certificate img/Operating System.webp',
    pdfPath: '',
    externalUrl: 'https://www.credly.com/badges/6e2fbaff-f008-4dd4-b2ad-eabc0f4dc515/',
    skills: ['Process Management', 'Memory Allocation', 'Concurrency & Locks', 'Kernel Architecture'],
    caseStudyId: null,
  },
  {
    id: 'ios-development-workshop',
    title: 'iOS Development Workshop',
    issuer: 'Apple / WWDC',
    date: 'July 2025',
    verificationId: 'iOS Dev Workshop',
    verificationHash: 'SwiftUI & UIKit Track',
    description:
      'Hands-on workshop covering native iOS app development with Swift, SwiftUI layout system, UIKit fundamentals, Xcode toolchain, App Store publishing pipeline, and Apple Human Interface Guidelines.',
    brandColor: '#007AFF',
    iconName: 'ios',
    imagePath: '/images/iOS Workshop 1.webp',
    images: [
      '/images/iOS Workshop 1.webp',
      '/images/iOS Workshop 2.webp',
      '/images/iOS Workshop 4.webp'
    ],
    pdfPath: '',
    externalUrl: 'https://developer.apple.com/',
    skills: ['Swift', 'SwiftUI', 'UIKit', 'Xcode', 'App Store Connect', 'HIG'],
    caseStudyId: null,
  }
];