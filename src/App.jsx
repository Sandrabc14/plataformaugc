import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
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
        <Route path="/profile" element={
          <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            <Profile />
          </motion.div>
        } />
        <Route path="/portfolio" element={
          <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            <Portfolio />
          </motion.div>
        } />
        <Route path="/brands" element={
          <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            <Brands />
          </motion.div>
        } />
        <Route path="/campaigns" element={
          <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            <Campaigns />
          </motion.div>
        } />
        <Route path="/messages" element={
          <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} style={{height: '100%'}}>
            <Messages />
          </motion.div>
        } />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('ugcTheme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ugcTheme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <Router basename="/plataformaugc">
      <div className="flex" style={{ minHeight: '100vh', background: 'var(--color-bg)', transition: 'background-color var(--transition-normal)' }}>
        <Sidebar toggleTheme={toggleTheme} theme={theme} />
        <main style={{ flex: 1, padding: '2rem', height: '100vh', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
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
