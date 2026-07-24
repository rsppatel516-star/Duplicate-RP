import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import FeatureNavbar from './components/FeatureNavbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Artifacts from './pages/Artifacts';
import CaseStudy from './pages/CaseStudy';
import AchievementsPage from './pages/AchievementsPage';
import ContactPage from './pages/ContactPage';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import GlobalParticles from './components/canvas/GlobalParticles';
import ClickSpark from './components/ui/ClickSpark';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProtectedRoute from './components/admin/ProtectedRoute';

function App() {
  const location = useLocation();

  // Track pageviews on client-side route changes
  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_title: document.title,
        page_location: window.location.href,
      });
    }
  }, [location]);

  const isAdminPage = location.pathname.startsWith('/admin');
  const isFeaturePage = location.pathname.startsWith('/artifacts') ||
    location.pathname.startsWith('/blog') ||
    location.pathname.startsWith('/achievements') ||
    location.pathname.startsWith('/contact');

  return (
    <div className="min-h-screen flex flex-col bg-dark-bg text-dark-textMain relative">
      {/* Global Particle Background */}
      <GlobalParticles />

      {/* Main Content Layer wrapped with ClickSpark */}
      <ClickSpark
        sparkColor="#ec4899"
        sparkColor2="#6366f1"
        sparkSize={11}
        sparkRadius={21}
        sparkCount={12}
        duration={1000}
        extraScale={0.8}
      >
        <div className="relative z-10 flex flex-col min-h-screen">
          {/* Conditionally render Navbar or FeatureNavbar (unless on Admin pages) */}
          {!isAdminPage && (isFeaturePage ? <FeatureNavbar /> : <Navbar />)}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/artifacts" element={<Artifacts />} />
              <Route path="/artifacts/:id" element={<CaseStudy />} />
              <Route path="/achievements" element={<AchievementsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
              </Route>
            </Routes>
          </main>
          {!isFeaturePage && !isAdminPage && <Footer />}
        </div>
      </ClickSpark>
    </div>
  );
}

export default App;
