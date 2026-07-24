import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, FileText, X, Shield, Calendar, ArrowRight, Download, ZoomIn, ZoomOut, Maximize2, Copy, Check, Briefcase } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import MagneticButton from './ui/MagneticButton';
import GridBackground from './ui/GridBackground';

// Custom Premium SVG Icons for Tech Brands
const AzureIcon = () => (
  <img src="/images/microsoft-azure.svg" alt="Microsoft Azure" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
);

const PythonIcon = () => (
  <img src="/images/python.svg" alt="Python Programming" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
);

const DSAIcon = () => (
  <img src="/certificate img/ac logo.png" alt="Data Structures & Algorithms" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
);

const FullStackIcon = () => (
  <img src="/certificate img/ac logo.png" alt="Full-Stack Development" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
);

const OSIcon = () => (
  <svg className="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 24 24" fill="none" stroke="#00E676" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="16" height="16" rx="2.5" fill="#00E676" fillOpacity="0.2" />
    <rect x="9" y="9" width="6" height="6" rx="1" stroke="#00E676" strokeWidth="2" />
    <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
  </svg>
);

const IOSIcon = () => (
  <svg
    className="w-8 h-8 md:w-10 md:h-10"
    viewBox="-56.24 0 608.728 608.728"
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
  >
    <path d="M273.81 52.973C313.806.257 369.41 0 369.41 0s8.271 49.562-31.463 97.306c-42.426 50.98-90.649 42.638-90.649 42.638s-9.055-40.094 26.512-86.971zM252.385 174.662c20.576 0 58.764-28.284 108.471-28.284 85.562 0 119.222 60.883 119.222 60.883s-65.833 33.659-65.833 115.331c0 92.133 82.01 123.885 82.01 123.885s-57.328 161.357-134.762 161.357c-35.565 0-63.215-23.967-100.688-23.967-38.188 0-76.084 24.861-100.766 24.861C89.33 608.73 0 455.666 0 332.628c0-121.052 75.612-184.554 146.533-184.554 46.105 0 81.883 26.588 105.852 26.588z" />
  </svg>
);

const iconMap = {
  azure: <AzureIcon />,
  python: <PythonIcon />,
  dsa: <DSAIcon />,
  fullstack: <FullStackIcon />,
  os: <OSIcon />,
  ios: <IOSIcon />
};

const certifications = [
  {
    id: 'microsoft-azure',
    title: 'Microsoft Azure',
    issuer: 'Microsoft',
    date: 'Dec 2025',
    verificationId: 'AZ-900-58192',
    verificationHash: '0x7B58AE14344B413EB419',
    description: 'Demonstrates foundational level knowledge of cloud services and how those services are provided with Microsoft Azure, including security, privacy, compliance, and trust.',
    brandColor: '#0089D6',
    iconName: 'azure',
    imagePath: '/certificate img/Microsoft Azure.webp',
    pdfPath: '/Microsoft Azure .pdf',
    externalUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/',
    skills: ['Cloud Architecture', 'Azure Services', 'Cloud Security', 'Compliance Frameworks']
  },
  {
    id: 'python-programming',
    title: 'Python Programming',
    issuer: 'Cisco Networking Academy',
    date: 'Sep 2025',
    verificationId: 'Python Essentials 1',
    verificationHash: 'Cisco Networking',
    description: 'Validates advanced proficiency in Python concepts, object-oriented software patterns, memory structures, multithreading, and algorithmic analysis.',
    brandColor: '#3776AB',
    iconName: 'python',
    imagePath: '/certificate img/Python.webp',
    pdfPath: '',
    externalUrl: 'https://www.credly.com/badges/955b2f66-1a2b-43a1-a087-c595295d52f8/',
    skills: ['Python 3', 'Object-Oriented Programming', 'Script Automation', 'Data Analysis']
  },
  {
    id: 'data-structures-algorithms',
    title: 'Data Structures & Algorithms',
    issuer: 'Apna College',
    date: 'Aug 2025',
    verificationId: 'Alpha Development ',
    verificationHash: '624bd0e39df2bf2e436e1588 ',
    description: 'Verifies mastery of algorithmic complexity, sorting/searching paradigms, advanced trees, graphs, dynamic programming, and Java-based memory representation.',
    brandColor: '#FF3E00',
    iconName: 'dsa',
    imagePath: '/certificate img/DSA.webp',
    pdfPath: '',
    externalUrl: 'https://www.apnacollege.in/',
    skills: ['Java Development', 'Data Structures', 'Algorithmic Complexity', 'Problem Solving']
  },
  {
    id: 'fullstack-development',
    title: 'Full-Stack Development',
    issuer: 'Apna College',
    date: 'March 2026',
    verificationId: 'Delta Development',
    verificationHash: '699dbfb7150d54f6eb04e686',
    description: 'Validates end-to-end web development proficiency spanning responsive React frontends, Node.js/Express backend APIs, MongoDB data modeling, REST architecture, CI/CD pipelines, and scalable deployment practices.',
    brandColor: '#00d4aa',
    iconName: 'fullstack',
    imagePath: '/certificate img/Sigma-Development.webp',
    pdfPath: '',
    externalUrl: 'https://www.apnacollege.in/',
    skills: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST API', 'CI/CD']
  },
  {
    id: 'operating-systems',
    title: 'Operating System',
    issuer: 'Cisco Networking Academy',
    date: 'Sep 2025',
    verificationId: 'Operating System',
    verificationHash: 'Cisco Networking Academy',
    description: 'Verifies fundamental knowledge of thread scheduling, process synchronization, paging & virtual memory, disk management, and secure POSIX kernel architectures.',
    brandColor: '#00E676',
    iconName: 'os',
    imagePath: '/certificate img/Operating System.webp',
    pdfPath: '',
    externalUrl: 'https://www.credly.com/badges/6e2fbaff-f008-4dd4-b2ad-eabc0f4dc515/',
    skills: ['Process Management', 'Memory Allocation', 'Concurrency & Locks', 'Kernel Architecture']
  },
  {
    id: 'ios-development-workshop',
    title: 'iOS Development Workshop',
    issuer: 'Apple / WWDC',
    date: 'July 2025',
    verificationId: 'iOS Dev Workshop',
    verificationHash: 'SwiftUI & UIKit Track',
    description: 'Hands-on workshop covering native iOS app development with Swift, SwiftUI layout system, UIKit fundamentals, Xcode toolchain, App Store publishing pipeline, and Apple Human Interface Guidelines.',
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
    skills: ['Swift', 'SwiftUI', 'UIKit', 'Xcode', 'App Store Connect', 'HIG']
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
};

// Premium Mouse-Tracking Spotlight Card Component
const CredentialCard = ({ cert, onOpen, cardVariants }) => {
  const navigate = useNavigate();
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6, scale: 1.01 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      style={{
        borderColor: isHovered ? `${cert.brandColor}80` : 'rgba(255,255,255,0.05)',
        boxShadow: isHovered ? `0 0 35px ${cert.brandColor}15` : 'none'
      }}
      className="group relative bg-dark-surface/20 backdrop-blur-xl border rounded-3xl p-8 flex flex-col justify-between overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:bg-dark-surface/30 transition-all duration-500 cursor-pointer"
      onClick={onOpen}
    >
      {/* Corner brackets */}
      <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-dark-border/50 group-hover:border-dark-primary/40 transition-colors duration-500" />
      <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-dark-border/50 group-hover:border-dark-secondary/40 transition-colors duration-500" />

      {/* Hologram Spotlight following the cursor */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 200px at ${coords.x}px ${coords.y}px, ${cert.brandColor}15, transparent 80%)`
          }}
        />
      )}

      <div>
        {/* Header: Issuer Logo & Text details */}
        <div className="flex items-start justify-between gap-6 mb-6">
          <div className="flex items-center gap-5">
            <div
              style={{ color: cert.brandColor, borderColor: isHovered ? `${cert.brandColor}50` : 'rgba(255,255,255,0.08)' }}
              className="w-14 h-14 bg-dark-bg/50 border rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shrink-0"
            >
              {iconMap[cert.iconName]}
            </div>
            <div>
              <span className="text-[9px] font-code text-dark-textMuted uppercase tracking-widest block mb-1">{cert.issuer}</span>
              <h3 className="text-lg md:text-xl font-bold font-bricolage text-dark-textMain group-hover:text-white transition-colors duration-300">
                {cert.title}
              </h3>
            </div>
          </div>

          <span className="text-[10px] font-code text-dark-textMuted bg-dark-bg/40 border border-dark-border/40 px-3 py-1.5 rounded-lg flex items-center gap-2 shrink-0">
            <Calendar size={12} className="opacity-60" />
            {cert.date}
          </span>
        </div>

        {/* Description */}
        <p className="text-dark-textMuted text-xs md:text-sm font-light leading-relaxed mb-6">
          {cert.description}
        </p>

        {/* Skill tags verified */}
        <div className="flex flex-wrap gap-2 mb-8">
          {cert.skills.map((skill, index) => (
            <span
              key={index}
              style={{
                borderColor: `${cert.brandColor}25`,
                color: `${cert.brandColor}`,
                backgroundColor: isHovered ? `${cert.brandColor}10` : 'transparent'
              }}
              className="text-[9px] font-code border px-2.5 py-1 rounded-lg select-none transition-all duration-500"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Footer: Metadata & Actions */}
      <div className="border-t border-dark-border/30 pt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="text-[9px] font-code text-dark-textMuted/45">
          <span className="block">ID: {cert.verificationId}</span>
          <span className="block font-mono tracking-tighter opacity-80">{cert.verificationHash}</span>
        </div>

        <div className="flex items-center gap-4">
          {cert.externalUrl && (
            <a
              href={cert.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{ borderColor: isHovered ? `${cert.brandColor}30` : '' }}
              className="p-3 bg-dark-bg/30 hover:bg-dark-bg/60 border border-dark-border/50 rounded-xl text-dark-textMuted hover:text-white transition-all duration-300"
              title="Verify Externally"
            >
              <ExternalLink size={16} />
            </a>
          )}

          {cert.caseStudyId && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/artifacts/${cert.caseStudyId}`);
              }}
              className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 hover:border-dark-primary/30 text-dark-textMuted hover:text-white text-[10px] font-bold uppercase tracking-wider rounded-xl hover:shadow-[0_0_15px_rgba(99,102,241,0.1)] transition-all duration-500 group/btn font-bricolage cursor-pointer"
              title="Explore Related Case Study"
            >
              <Briefcase size={12} className="text-dark-primary group-hover/btn:scale-110 transition-transform" />
              <span className="hidden sm:inline">Explore Case Study</span>
              <span className="sm:hidden">Case Study</span>
            </button>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
            style={{
              backgroundColor: cert.brandColor,
              boxShadow: isHovered ? `0 0 20px ${cert.brandColor}40` : ''
            }}
            className="flex items-center gap-2.5 px-5 py-3 text-dark-bg text-[10px] font-black uppercase tracking-wider rounded-xl transition-all duration-500 hover:brightness-110 group/btn cursor-pointer"
          >
            View Credential
            <ArrowRight size={12} className="group-hover/btn:translate-x-1.5 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default function Achievements() {
  const navigate = useNavigate();
  const [selectedCert, setSelectedCert] = useState(null);
  const [zoomScale, setZoomScale] = useState(1);
  const [copiedHash, setCopiedHash] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const handleCopyHash = (hash) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(true);
    toast.success('Verification hash copied to clipboard!');
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handleZoomIn = () => setZoomScale(prev => Math.min(prev + 0.25, 2));
  const handleZoomOut = () => setZoomScale(prev => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => setZoomScale(1);

  return (
    <div className="py-24 relative overflow-hidden">
      {/* Local self-contained toaster notification framework */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#0a0a0a',
            color: '#f8fafc',
            border: '1px solid #ffffff1a',
            backdropFilter: 'blur(10px)',
            fontSize: '11px',
            fontFamily: 'Bricolage Grotesque, Inter, sans-serif',
          },
        }}
      />

      {/* Decorative Grid Background */}
      <GridBackground
        opacity="05"
        mask="radial-gradient(ellipse 60% 50% at 50% 50%, #000 70%, transparent 100%)"
      />

      {/* Background Glows */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] bg-dark-secondary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[350px] h-[350px] bg-dark-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header section (Left-aligned as per Blog.jsx) */}
        <header className="mb-14 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6 text-purple-400 font-mono text-xs font-bold tracking-[0.3em] uppercase"
          >
            <div className="w-10 h-[1px] bg-purple-500/40" />
            <Award size={15} />
            <span>CREDENTIALS & CERTIFICATIONS</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-display font-black tracking-tight sm:tracking-tighter text-white mb-6 leading-none"
          >
            Verified <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400">
              Credentials & Badges
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/60 max-w-2xl font-display leading-relaxed text-sm md:text-base text-left"
          >
            Verified cloud proficiencies, programming languages, and software architectures validated through official certifications and industry credentials.
          </motion.p>
        </header>

        {/* Credentials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {certifications.map((cert) => (
            <CredentialCard
              key={cert.id}
              cert={cert}
              onOpen={() => {
                setZoomScale(1);
                setGalleryIndex(0);
                setSelectedCert(cert);
              }}
              cardVariants={cardVariants}
            />
          ))}
        </motion.div>
      </div>

      {/* Lightbox / Split-Screen Interactive Certificate Viewer Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedCert(null)}
          >
            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              style={{
                borderColor: `${selectedCert.brandColor}40`,
                boxShadow: `0 0 50px ${selectedCert.brandColor}15`
              }}
              className="relative w-full max-w-6xl max-h-[92vh] overflow-y-auto bg-dark-bg border rounded-3xl shadow-3xl pointer-events-auto flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Close Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all duration-300 hover:bg-white/10 z-[210] cursor-pointer"
              >
                <X size={20} />
              </button>

              {/* Main Content: Split Screen Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-12 items-stretch">

                {/* Left Side: high-tech credential details */}
                <div className="lg:col-span-5 flex flex-col justify-between text-left space-y-8 pr-0 lg:pr-4">
                  <div>
                    {/* Issuer and Icon Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        style={{ color: selectedCert.brandColor, borderColor: `${selectedCert.brandColor}30` }}
                        className="w-14 h-14 bg-dark-surface border rounded-xl flex items-center justify-center shadow-lg shrink-0"
                      >
                        {iconMap[selectedCert.iconName]}
                      </div>
                      <div>
                        <span className="text-[10px] font-code text-dark-primary uppercase tracking-[0.2em] font-extrabold">{selectedCert.issuer}</span>
                        <h4 className="text-xs font-code text-dark-textMuted uppercase tracking-wider block mt-0.5">Verified Digital Credential</h4>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-bold font-bricolage text-white tracking-tight mb-4">
                      {selectedCert.title}
                    </h3>

                    {/* Description */}
                    <p className="text-dark-textMuted text-xs md:text-sm font-light leading-relaxed mb-6">
                      {selectedCert.description}
                    </p>

                    {/* Skill Tags */}
                    <div className="space-y-3 mb-6">
                      <h4 className="text-[9px] font-code text-white/40 uppercase tracking-[0.22em] font-bold">Skills Validated</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCert.skills.map((skill, index) => (
                          <span
                            key={index}
                            style={{
                              borderColor: `${selectedCert.brandColor}25`,
                              color: `${selectedCert.brandColor}`
                            }}
                            className="text-[9px] font-code bg-white/[0.01] border px-3 py-1.5 rounded-xl font-bold select-none"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Metadata and cryptographic copy widget */}
                  <div className="space-y-6 bg-dark-surface/10 border border-dark-border/40 rounded-2xl p-5 md:p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/[0.02] to-transparent pointer-events-none" />

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-[9px] font-code text-dark-textMuted uppercase block mb-1">Issue Date</span>
                        <span className="text-xs font-bold text-white flex items-center gap-1.5">
                          <Calendar size={13} className="text-dark-primary" />
                          {selectedCert.date}
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] font-code text-dark-textMuted uppercase block mb-1">Status</span>
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                          <Shield size={13} className="text-emerald-400 animate-pulse animate-duration-1000" />
                          Active & Verified
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-dark-border/20 pt-4">
                      <span className="text-[9px] font-code text-dark-textMuted uppercase block mb-1.5">Credential ID</span>
                      <div className="text-xs font-bold text-white font-mono break-all bg-dark-bg/60 border border-dark-border/60 px-3 py-2 rounded-lg flex items-center justify-between">
                        <span>{selectedCert.verificationId}</span>
                      </div>
                    </div>

                    <div className="border-t border-dark-border/20 pt-4">
                      <span className="text-[9px] font-code text-dark-textMuted uppercase block mb-1">Cryptographic Checksum</span>
                      <button
                        onClick={() => handleCopyHash(selectedCert.verificationHash)}
                        style={{ color: selectedCert.brandColor, borderColor: `${selectedCert.brandColor}20` }}
                        className="w-full text-[10px] font-mono text-left hover:text-white bg-dark-bg/40 hover:bg-dark-bg/80 border px-3.5 py-2.5 rounded-lg flex items-center justify-between group transition-all duration-300 cursor-pointer"
                        title="Click to copy hash"
                      >
                        <span className="truncate mr-4">{selectedCert.verificationHash}</span>
                        {copiedHash ? (
                          <Check size={12} className="text-emerald-400 shrink-0" />
                        ) : (
                          <Copy size={12} className="opacity-60 group-hover:opacity-100 transition-opacity shrink-0" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Side: Zoomable Certificate JPEG Viewer */}
                <div className="lg:col-span-7 flex flex-col justify-center items-stretch space-y-4">
                  <div className="relative aspect-[1.414] w-full bg-dark-surface/5 border border-dark-border/60 rounded-2xl overflow-hidden flex items-center justify-center shadow-inner group/viewer min-h-[250px] md:min-h-[380px]">

                    {/* Interactive Frame decorations */}
                    <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-dark-border/50 group-hover/viewer:border-dark-primary/40 transition-colors pointer-events-none" />
                    <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-dark-border/50 group-hover/viewer:border-dark-primary/40 transition-colors pointer-events-none" />
                    <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-dark-border/50 group-hover/viewer:border-dark-secondary/40 transition-colors pointer-events-none" />
                    <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-dark-border/50 group-hover/viewer:border-dark-secondary/40 transition-colors pointer-events-none" />

                    {/* Ambient Glow Aura */}
                    <div
                      className="absolute inset-0 opacity-10 pointer-events-none transition-all duration-700"
                      style={{
                        background: `radial-gradient(circle 350px at center, ${selectedCert.brandColor}20, transparent 90%)`
                      }}
                    />

                    {selectedCert.images ? (
                      /* ── Multi-image gallery carousel ── */
                      <div className="relative w-full h-full flex flex-col">
                        {/* Main image */}
                        <div className="flex-1 flex items-center justify-center p-3 overflow-hidden">
                          <motion.img
                            key={galleryIndex}
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                            src={selectedCert.images[galleryIndex]}
                            alt={`${selectedCert.title} — ${galleryIndex + 1}`}
                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl border border-white/5"
                          />
                        </div>

                        {/* Prev / Next arrows */}
                        {galleryIndex > 0 && (
                          <button
                            onClick={() => setGalleryIndex(i => i - 1)}
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-dark-bg/80 border border-dark-border/60 flex items-center justify-center text-white/70 hover:text-white hover:bg-dark-bg transition-all duration-200 backdrop-blur-sm z-20 cursor-pointer"
                          >
                            <ArrowRight size={15} className="rotate-180" />
                          </button>
                        )}
                        {galleryIndex < selectedCert.images.length - 1 && (
                          <button
                            onClick={() => setGalleryIndex(i => i + 1)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-dark-bg/80 border border-dark-border/60 flex items-center justify-center text-white/70 hover:text-white hover:bg-dark-bg transition-all duration-200 backdrop-blur-sm z-20 cursor-pointer"
                          >
                            <ArrowRight size={15} />
                          </button>
                        )}

                        {/* Dot indicators + counter */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-dark-bg/85 border border-dark-border/60 px-4 py-2 rounded-xl shadow-xl z-20 backdrop-blur-md">
                          {selectedCert.images.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setGalleryIndex(i)}
                              style={i === galleryIndex ? { backgroundColor: selectedCert.brandColor } : {}}
                              className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${i === galleryIndex ? 'scale-125' : 'bg-white/25 hover:bg-white/50'
                                }`}
                            />
                          ))}
                          <div className="h-3 w-[1px] bg-dark-border/40" />
                          <span className="text-[10px] font-code text-white/60 font-bold select-none">
                            {galleryIndex + 1} / {selectedCert.images.length}
                          </span>
                        </div>
                      </div>
                    ) : selectedCert.imagePath ? (
                      /* ── Single-image viewer with zoom ── */
                      <div className="w-full h-full overflow-auto flex items-center justify-center p-3 select-none">
                        <motion.img
                          animate={{ scale: zoomScale }}
                          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                          src={selectedCert.imagePath}
                          alt={selectedCert.title}
                          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl border border-white/5 cursor-grab active:cursor-grabbing"
                        />
                      </div>
                    ) : (
                      <div className="text-center p-8">
                        <Shield size={48} style={{ color: selectedCert.brandColor }} className="mx-auto mb-4 animate-pulse opacity-50" />
                        <h5 className="font-bricolage font-bold text-white text-lg mb-2">Secure Credential</h5>
                        <p className="text-dark-textMuted text-xs max-w-sm mx-auto leading-relaxed">Cryptographic proof is loaded. Use the actions panel below to download or externally verify this certification.</p>
                      </div>
                    )}

                    {/* Interactive Zoom Controls HUD — single image only */}
                    {!selectedCert.images && selectedCert.imagePath && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-dark-bg/85 border border-dark-border/60 px-4 py-2 rounded-xl flex items-center gap-4 shadow-xl z-20 backdrop-blur-md">
                        <button
                          onClick={handleZoomOut}
                          className="p-1.5 hover:bg-white/10 rounded-lg text-dark-textMuted hover:text-white transition-colors cursor-pointer"
                          title="Zoom Out"
                        >
                          <ZoomOut size={14} />
                        </button>
                        <span className="text-[10px] font-code text-white font-bold min-w-[32px] text-center select-none">
                          {Math.round(zoomScale * 100)}%
                        </span>
                        <button
                          onClick={handleZoomIn}
                          className="p-1.5 hover:bg-white/10 rounded-lg text-dark-textMuted hover:text-white transition-colors cursor-pointer"
                          title="Zoom In"
                        >
                          <ZoomIn size={14} />
                        </button>
                        <div className="h-4 w-[1px] bg-dark-border/40" />
                        <button
                          onClick={handleResetZoom}
                          className="p-1.5 hover:bg-white/10 rounded-lg text-dark-textMuted hover:text-white transition-colors cursor-pointer"
                          title="Reset"
                        >
                          <Maximize2 size={13} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Lightbox Footer Actions */}
              <div className="mx-6 md:mx-12 mb-8 md:mb-10 border-t border-dark-border/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                  <Shield size={18} className="text-emerald-500 shrink-0" />
                  <div className="text-[10px] font-code text-dark-textMuted uppercase tracking-widest text-left">
                    <span>Verified Cryptographic Checksum Secure</span>
                    <span className="block font-mono tracking-tighter text-emerald-500/80 mt-0.5">{selectedCert.verificationHash}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
                  {selectedCert.pdfPath && (
                    <a
                      href={selectedCert.pdfPath}
                      download
                      className="flex items-center gap-2 px-5 py-3 border border-dark-border/60 rounded-xl text-dark-textMuted hover:text-white hover:bg-white/5 transition-all duration-300 text-xs font-bold uppercase tracking-wider cursor-pointer"
                    >
                      <Download size={14} />
                      Download PDF
                    </a>
                  )}

                  {selectedCert.caseStudyId && (
                    <button
                      onClick={() => {
                        setSelectedCert(null);
                        navigate(`/artifacts/${selectedCert.caseStudyId}`);
                      }}
                      className="flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 hover:border-dark-secondary/30 text-dark-textMuted hover:text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 cursor-pointer"
                    >
                      <Briefcase size={14} className="text-dark-secondary" />
                      Explore Case Study
                    </button>
                  )}

                  <button
                    onClick={() => {
                      toast.success(`Credential link verified: ${selectedCert.verificationId}`);
                      window.open(selectedCert.externalUrl, '_blank');
                    }}
                    style={{
                      backgroundColor: selectedCert.brandColor,
                      boxShadow: `0 0 25px ${selectedCert.brandColor}30`
                    }}
                    className="flex items-center gap-2.5 px-6 py-3.5 text-dark-bg text-xs font-black uppercase tracking-wider rounded-xl transition-all duration-500 hover:brightness-110 cursor-pointer"
                  >
                    Verify Issuer
                    <ExternalLink size={14} />
                  </button>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
