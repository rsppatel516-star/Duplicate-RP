import React from 'react';
import SEO from '../components/SEO';
import Achievements from '../components/Achievements';
import Footer from '../components/Footer';

export default function AchievementsPage() {
  return (
    <div className="min-h-screen bg-dark-bg pt-16 sm:pt-20 flex flex-col justify-between">
      <SEO 
        title="Technical Credentials & Certifications | Rudra Patel"
        description="Explore the technical credentials, specialized badges, and verified achievements of Rudra Patel."
        canonical="https://patelrudra.in/achievements"
      />
      
      <div className="flex-grow">
        <Achievements />
      </div>
      <Footer />
    </div>
  );
}
