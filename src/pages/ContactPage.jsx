import React from 'react';
import SEO from '../components/SEO';
import Contact from '../components/Contact';

const contactSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://patelrudra.in"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Contact",
          "item": "https://patelrudra.in/contact"
        }
      ]
    },
    {
      "@type": "ContactPage",
      "name": "Contact Rudra Patel | Digital Architect & Full-Stack Engineer",
      "url": "https://patelrudra.in/contact",
      "description": "Get in touch with Rudra Patel in Vadodara, Gujarat, India for digital projects, software development, and iOS engineering.",
      "mainEntity": {
        "@type": "Person",
        "name": "Rudra Patel",
        "email": "patelrudra99098@gmail.com",
        "telephone": "+916354825621",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Vadodara",
          "addressRegion": "Gujarat",
          "addressCountry": "India"
        }
      }
    }
  ]
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-dark-bg pt-20">
      <SEO 
        title="Contact & Project Inquiries"
        description="Get in touch with Rudra Patel in Vadodara, Gujarat. Ready to collaborate on your next digital project, mobile app, or engineering challenge."
        keywords="Contact Rudra Patel, Hire full stack developer Vadodara, Hire iOS developer India, freelance React developer Gujarat"
        canonical="https://patelrudra.in/contact"
        schema={contactSchema}
      />

      <Contact isPage={true} />
    </div>
  );
}
