import { NavLink } from 'react-router-dom';
import { User, Video, Briefcase, Calendar, MessageSquare, Moon, Sun } from 'lucide-react';

const Sidebar = ({ toggleTheme, theme }) => {
  const navItems = [
    { path: '/profile', name: 'Perfil', icon: User },
    { path: '/portfolio', name: 'Portfolio', icon: Video },
    { path: '/brands', name: 'Marcas', icon: Briefcase },
    { path: '/campaigns', name: 'Campañas', icon: Calendar },
    { path: '/messages', name: 'Mensajes', icon: MessageSquare },
  ];

  return (
    <aside className="glass-panel" style={{ width: '280px', height: '100vh', borderRadius: '0 24px 24px 0', borderLeft: 'none', position: 'sticky', top: 0, padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--color-primary-dark)', fontSize: '1.5rem', fontWeight: 700, letterSpacing: '1px' }}>UGC Connect</h2>
        <p style={{ fontSize: '0.875rem' }}>Plataforma de Creadores</p>
      </div>
      
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              textDecoration: 'none',
              color: isActive ? 'var(--color-primary-dark)' : 'var(--color-text-main)',
              background: isActive ? 'var(--glass-bg)' : 'transparent',
              fontWeight: isActive ? 600 : 500,
              boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
              transition: 'all var(--transition-fast)'
            })}
          >
            <item.icon size={20} />
            {item.name}
          </NavLink>
        ))}
      </nav>
      
      <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img src="/sandra.jpg" alt="User" className="avatar" style={{ width: '40px', height: '40px' }} />
          <div>
            <p style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-text-main)' }}>Sandra</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>@sandra_ugc</p>
          </div>
        </div>
        <button 
          onClick={toggleTheme} 
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '0.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          title={theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
        >
          {theme === 'light' ? <Moon size={20} color="var(--color-text-muted)" /> : <Sun size={20} color="var(--color-text-muted)" />}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
