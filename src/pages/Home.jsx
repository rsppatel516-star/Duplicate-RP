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
      "alternateName": ["Rudra Patel Vadodara", "Rudra Patel iOS Developer"],
      "url": "https://patelrudra.in",
      "image": {
        "@type": "ImageObject",
        "@id": "https://patelrudra.in/#primaryimage",
        "url": "https://patelrudra.in/images/0R7A7692.webp",
        "contentUrl": "https://patelrudra.in/images/0R7A7692.webp",
        "caption": "Rudra Patel - Digital Architect & Full-Stack Engineer"
      },
      "jobTitle": "Full-Stack Engineer & iOS Developer",
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
        "React",
        "Next.js",
        "Swift",
        "SwiftUI",
        "Node.js",
        "Full-Stack Web Development",
        "iOS Development",
        "Tailwind CSS",
        "JavaScript",
        "TypeScript"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://patelrudra.in/#website",
      "url": "https://patelrudra.in",
      "name": "Rudra Patel | Digital Architect & Full-Stack Engineer",
      "description": "Portfolio of Rudra Patel, a specialized Full-stack developer in Vadodara, Gujarat and iOS developer in India.",
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
      "name": "Rudra Patel Digital Architect Portfolio",
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
        title="Rudra Patel | Digital Architect & Full-Stack Engineer"
        description="Portfolio of Rudra Patel, a specialized Full-stack developer in Vadodara, Gujarat and iOS developer in India. Engineering high-performance web solutions and SwiftUI apps."
        keywords="Rudra Patel, Full-stack developer Vadodara, iOS developer Gujarat, React developer India, Swift developer Vadodara, MERN stack developer India, mobile app developer Vadodara, Gujarat software engineer"
        ogTitle="RUDRA | Full-Stack & iOS Developer Portfolio"
        ogDescription="Full-stack web engineering and native iOS application development based in Vadodara, Gujarat, India."
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


