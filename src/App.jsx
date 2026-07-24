import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import FeatureNavbar from './components/FeatureNavbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import GlobalParticles from './components/canvas/GlobalParticles';
import ClickSpark from './components/ui/ClickSpark';
import ProtectedRoute from './components/admin/ProtectedRoute';

// Lazy loaded page components for optimal initial load performance
const Artifacts = lazy(() => import('./pages/Artifacts'));
const CaseStudy = lazy(() => import('./pages/CaseStudy'));
const AchievementsPage = lazy(() => import('./pages/AchievementsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));

// Lightweight page loading indicator
const PageFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

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
            <Suspense fallback={<PageFallback />}>
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
            </Suspense>
          </main>
          {!isFeaturePage && !isAdminPage && <Footer />}
        </div>
      </ClickSpark>
    </div>
  );
}

export default App;
