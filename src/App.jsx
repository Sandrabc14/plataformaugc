import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Profile from './pages/Profile';
import Portfolio from './pages/Portfolio';
import Brands from './pages/Brands';
import Campaigns from './pages/Campaigns';
import Messages from './pages/Messages';

const AnimatedRoutes = () => {
  const location = useLocation();
  
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };
  
  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4
  };

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/profile" replace />} />
        <Route path="/profile" element={<motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><Profile /></motion.div>} />
        <Route path="/portfolio" element={<motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><Portfolio /></motion.div>} />
        <Route path="/brands" element={<motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><Brands /></motion.div>} />
        <Route path="/campaigns" element={<motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><Campaigns /></motion.div>} />
        <Route path="/messages" element={<motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} style={{height: '100%'}}><Messages /></motion.div>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('ugcTheme') || 'light');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ugcTheme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <div className="flex" style={{ minHeight: '100vh', background: 'var(--color-bg)', transition: 'background-color var(--transition-normal)' }}>
        <Sidebar toggleTheme={toggleTheme} theme={theme} isOpen={isMenuOpen} closeMenu={() => setIsMenuOpen(false)} />
        <main className="main-container" style={{ flex: 1, padding: '2rem', height: '100vh', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          
          {/* Mobile Header */}
          <div className="mobile-menu-btn" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
            <button 
              onClick={() => setIsMenuOpen(true)}
              style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', padding: '0.5rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              <Menu size={24} color="var(--color-text-main)" />
            </button>
            <h2 style={{ marginLeft: '1rem', fontSize: '1.2rem', margin: '0 0 0 1rem' }}>UGC Connect</h2>
          </div>

          <div className="container" style={{ flex: 1 }}>
            <AnimatedRoutes />
          </div>
          <footer style={{ textAlign: 'center', padding: '2rem 0 1rem', marginTop: 'auto', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
            &copy; {new Date().getFullYear()} Plataforma UGC. Todos los derechos reservados. Neo.
          </footer>
        </main>
      </div>
    </Router>
  );
}

export default App;
