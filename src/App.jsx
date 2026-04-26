import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import FeatureNavbar from './components/FeatureNavbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Artifacts from './pages/Artifacts';
import CaseStudy from './pages/CaseStudy';
import GlobalParticles from './components/canvas/GlobalParticles';

function App() {
  const location = useLocation();
  const isFeaturePage = location.pathname.startsWith('/artifacts');

  return (
    <div className="min-h-screen flex flex-col bg-dark-bg text-dark-textMain relative">
      {/* Global Particle Background */}
      <GlobalParticles />

      {/* Main Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Conditionally render Navbar or FeatureNavbar */}
        {isFeaturePage ? <FeatureNavbar /> : <Navbar />}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/artifacts" element={<Artifacts />} />
            <Route path="/artifacts/:id" element={<CaseStudy />} />
          </Routes>
        </main>
        {!isFeaturePage && <Footer />}
      </div>
    </div>
  );
}

export default App;
