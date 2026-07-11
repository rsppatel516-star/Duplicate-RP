import React from 'react';
import SEO from '../components/SEO';
import Achievements from '../components/Achievements';

export default function AchievementsPage() {
  return (
    <div className="min-h-screen bg-dark-bg pt-20">
      <SEO 
        title="Technical Credentials & Certifications"
        description="Explore the technical credentials, specialized badges, and verified achievements of Rudra Patel."
        canonical="https://patelrudra.in/achievements"
      />
      
      <Achievements />
    </div>
  );
}
