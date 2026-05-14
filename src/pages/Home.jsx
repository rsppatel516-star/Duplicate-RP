import React from 'react';
import { Helmet } from 'react-helmet-async';
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
      <Helmet>
        <title>RUDRA | Digital Architect & Full-Stack Engineer </title>
        <meta name="description" content="Portfolio of Rudra Patel, a Digital Architect specializing in premium web experiences, high-performance mobile apps, and robust full-stack engineering." />
        <meta name="keywords" content="Rudra Patel, Digital Architect, Full-Stack Developer, Mobile App Developer, React, Flutter, Node.js, Midnight Glass Design" />
        <meta property="og:title" content="RUDRA | Digital Architect Portfolio" />
        <meta property="og:description" content="Immersive digital experiences and high-performance engineering." />
        <meta property="og:image" content="/images/about.png" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://patelrudra.in/" />
      </Helmet>

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

