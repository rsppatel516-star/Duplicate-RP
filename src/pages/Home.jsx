import React from 'react';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Services from '../components/Services';
import Experience from '../components/Experience';
import Contact from '../components/Contact';

const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://patelrudra.in/#person",
      "name": "Rudra Patel",
      "alternateName": ["Rudra Patel Vadodara", "Rudra Patel iOS Developer", "Rudra Patel Frontend Developer"],
      "url": "https://patelrudra.in",
      "image": {
        "@type": "ImageObject",
        "@id": "https://patelrudra.in/#primaryimage",
        "url": "https://patelrudra.in/images/0R7A7692.webp",
        "contentUrl": "https://patelrudra.in/images/0R7A7692.webp",
        "caption": "Rudra Patel - Digital Architect, Frontend & iOS Developer"
      },
      "jobTitle": "Digital Architect, Frontend & iOS Developer",
      "worksFor": {
        "@type": "Organization",
        "name": "Independent Digital Architect"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Vadodara",
        "addressRegion": "Gujarat",
        "addressCountry": "India"
      },
      "sameAs": [
        "https://github.com/Rudraptl16",
        "https://www.linkedin.com/in/rudrapatel816/",
        "https://www.instagram.com/rudraa_ptll/",
        "https://www.facebook.com/profile.php?id=100082469136911",
        "https://www.youtube.com/@rudrapatel4172"
      ],
      "knowsAbout": [
        "Frontend Web Development",
        "iOS Mobile App Development",
        "React",
        "Next.js",
        "Swift",
        "SwiftUI",
        "Tailwind CSS",
        "JavaScript",
        "TypeScript",
        "UI/UX Architecture"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://patelrudra.in/#website",
      "url": "https://patelrudra.in",
      "name": "Rudra Patel | Digital Architect, Frontend & iOS Developer",
      "description": "Portfolio of Rudra Patel, a Digital Architect specializing in Frontend Web Development (React/Next.js) and Native iOS Apps (SwiftUI) in Vadodara, Gujarat, India.",
      "publisher": {
        "@id": "https://patelrudra.in/#person"
      },
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "@id": "https://patelrudra.in/#primaryimage"
      },
      "inLanguage": "en-US"
    },
    {
      "@type": "ProfilePage",
      "@id": "https://patelrudra.in/#profilepage",
      "url": "https://patelrudra.in",
      "name": "Rudra Patel Digital Architect & Developer Portfolio",
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "@id": "https://patelrudra.in/#primaryimage"
      },
      "mainEntity": {
        "@id": "https://patelrudra.in/#person"
      }
    }
  ]
};

export default function Home() {
  return (
    <>
      <SEO
        title="Rudra Patel - Digital Architect | Frontend & iOS Developer"
        description="Official Portfolio of Rudra Patel — Digital Architect, Frontend Web Developer & Native iOS Developer based in Vadodara, Gujarat, India. Engineering high-performance React/Next.js web platforms and native SwiftUI mobile apps."
        keywords="Rudra Patel, Digital Architect, Frontend Developer Vadodara, iOS Developer Gujarat, React developer India, Swift developer Vadodara, SwiftUI developer, Next.js developer India, UI/UX design, mobile app developer Vadodara"
        ogTitle="Rudra Patel — Digital Architect | Frontend & iOS Developer"
        ogDescription="Frontend web engineering and native iOS application development based in Vadodara, Gujarat, India."
        ogImage="/images/navbar-avatar.webp"
        canonical="https://patelrudra.in/"
        schema={homeSchema}
      />

      <div className="relative">
        <section id="home" className="scroll-mt-24"><Hero /></section>
        <section id="about" className="scroll-mt-24"><About /></section>
        <section id="skills" className="scroll-mt-24"><Skills /></section>
        <section id="experience" className="scroll-mt-24"><Experience /></section>
        <section id="services" className="scroll-mt-24"><Services /></section>
        <section id="projects" className="scroll-mt-24"><Projects /></section>
        <section id="contact" className="scroll-mt-24"><Contact /></section>
      </div>
    </>
  );
}


