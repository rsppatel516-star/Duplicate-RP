import React from 'react';
import SEO from '../components/SEO';
import Achievements from '../components/Achievements';
import Footer from '../components/Footer';

const achievementsSchema = {
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
          "name": "Achievements",
          "item": "https://patelrudra.in/achievements"
        }
      ]
    }
  ]
};

export default function AchievementsPage() {
  return (
    <div className="min-h-screen bg-dark-bg pt-16 sm:pt-20 flex flex-col justify-between">
      <SEO 
        title="Technical Credentials & Certifications"
        description="Explore the technical credentials, specialized badges, and verified achievements of Rudra Patel."
        keywords="Rudra Patel certifications, technical credentials, verified achievements, software engineering badges, Frontend & iOS credentials"
        canonical="https://patelrudra.in/achievements"
        schema={achievementsSchema}
      />
      
      <div className="flex-grow">
        <Achievements />
      </div>
      <Footer />
    </div>
  );
}
