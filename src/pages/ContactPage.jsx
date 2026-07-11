import React from 'react';
import SEO from '../components/SEO';
import Contact from '../components/Contact';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-dark-bg pt-20">
      <SEO 
        title="Contact"
        description="Get in touch with Rudra Patel. Ready to collaborate on your next digital project, startup, or engineering challenge."
        canonical="https://patelrudra.in/contact"
      />

      <Contact isPage={true} />
    </div>
  );
}
