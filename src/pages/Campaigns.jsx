import { Clock, CheckCircle, XCircle } from 'lucide-react';

const Campaigns = () => {
  const campaigns = [
    { id: 1, title: 'Lanzamiento Serum Vitamina C', brand: 'Glow Beauty', status: 'pending', budget: '$500', deadline: '15 Jun' },
    { id: 2, title: 'Colección Verano 2026', brand: 'EcoWear', status: 'active', budget: '$800', deadline: '20 Jun' },
    { id: 3, title: 'Campaña Bebidas Energéticas', brand: 'Fresh Foods', status: 'completed', budget: '$300', deadline: '10 May' },
  ];

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending': return <Clock color="#ffa726" size={20} />;
      case 'active': return <CheckCircle color="var(--color-primary-dark)" size={20} />;
      case 'completed': return <CheckCircle color="var(--color-text-muted)" size={20} />;
      default: return <XCircle color="#e57373" size={20} />;
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending': return <span className="badge" style={{ background: '#fff3e0', color: '#ef6c00' }}>Pendiente</span>;
      case 'active': return <span className="badge" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary-dark)' }}>Activa</span>;
      case 'completed': return <span className="badge" style={{ background: '#eceff1', color: '#607d8b' }}>Completada</span>;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col gap-8" style={{ animation: 'fadeIn var(--transition-normal)' }}>
      <header className="flex justify-between items-center">
        <div>
          <h1>Solicitudes de Campañas</h1>
          <p>Gestiona tus invitaciones y proyectos activos.</p>
        </div>
      </header>

      <div className="flex flex-col gap-4">
        {campaigns.map(camp => (
          <div key={camp.id} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ width: '100%' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{camp.title}</h3>
              <p style={{ color: 'var(--color-text-muted)', fontWeight: 500 }}>{camp.brand}</p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center" style={{ width: '100%', borderTop: '1px solid var(--glass-border)', paddingTop: '1rem' }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Presupuesto</p>
                <p style={{ color: 'var(--color-primary-dark)', fontWeight: 600, fontSize: '1.1rem' }}>{camp.budget}</p>
              </div>
              
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Fecha Límite</p>
                <p style={{ fontWeight: 500 }}>{camp.deadline}</p>
              </div>
              
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>Estado</p>
                <div className="flex items-center gap-2 justify-center">
                  {getStatusIcon(camp.status)}
                  {getStatusBadge(camp.status)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Campaigns;
