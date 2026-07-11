import React from 'react';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Services from '../components/Services';
import Experience from '../components/Experience';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <>
      <SEO 
        title="Rudra Patel | Digital Architect & Full-Stack Engineerr"
        description="Portfolio of Rudra Patel, a specialized Full-stack developer in Vadodara, Gujarat and iOS developer in India. Engineering high-performance web solutions and SwiftUI apps."
        keywords="Rudra Patel, Full-stack developer Vadodara, iOS developer Gujarat, React developer India, Swift developer Vadodara, MERN stack developer India, mobile app developer Vadodara, Gujarat software engineer"
        ogTitle="RUDRA | Full-Stack & iOS Developer Portfolio"
        ogDescription="Premium full-stack web engineering and native iOS application development based in Vadodara, Gujarat, India."
        ogImage="/images/about.webp"
        canonical="https://patelrudra.in/"
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


