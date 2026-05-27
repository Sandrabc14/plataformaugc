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

      <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--glass-border)', textAlign: 'left', background: 'rgba(255,255,255,0.4)' }}>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Campaña</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Marca</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Presupuesto</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Fecha Límite</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map(camp => (
              <tr key={camp.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>{camp.title}</td>
                <td style={{ padding: '1rem 1.5rem' }}>{camp.brand}</td>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--color-primary-dark)', fontWeight: 600 }}>{camp.budget}</td>
                <td style={{ padding: '1rem 1.5rem' }}>{camp.deadline}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(camp.status)}
                    {getStatusBadge(camp.status)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Campaigns;
