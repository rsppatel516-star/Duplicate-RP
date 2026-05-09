import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import FeatureNavbar from './components/FeatureNavbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Artifacts from './pages/Artifacts';
import CaseStudy from './pages/CaseStudy';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import GlobalParticles from './components/canvas/GlobalParticles';
import ClickSpark from './components/ui/ClickSpark';

function App() {
  const location = useLocation();
  const isFeaturePage = location.pathname.startsWith('/artifacts') || location.pathname.startsWith('/blog');

  return (
    <div className="min-h-screen flex flex-col bg-dark-bg text-dark-textMain relative">
      {/* Global Particle Background */}
      <GlobalParticles />

      {/* Main Content Layer wrapped with ClickSpark */}
      <ClickSpark
        sparkColor='#6366f1'
        sparkSize={24}
        sparkRadius={25}
        sparkCount={12}
        duration={600}
      >
        <div className="relative z-10 flex flex-col min-h-screen">
          {/* Conditionally render Navbar or FeatureNavbar */}
          {isFeaturePage ? <FeatureNavbar /> : <Navbar />}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/artifacts" element={<Artifacts />} />
              <Route path="/artifacts/:id" element={<CaseStudy />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
            </Routes>
          </main>
          {!isFeaturePage && <Footer />}
        </div>
      </ClickSpark>
    </div>
  );
}

export default App;
