import { Send } from 'lucide-react';

const Messages = () => {
  return (
    <div className="flex flex-col gap-8" style={{ animation: 'fadeIn var(--transition-normal)', height: '100%' }}>
      <header>
        <h1>Mensajes</h1>
        <p>Comunícate directamente con las marcas.</p>
      </header>

      <div className="glass-panel flex" style={{ padding: 0, height: 'calc(100vh - 180px)', overflow: 'hidden' }}>
        <div style={{ width: '300px', borderRight: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)' }}>
            <input 
              type="text" 
              placeholder="Buscar mensajes..." 
              style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.5)', outline: 'none' }} 
            />
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {/* Contact Item */}
            <div style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', cursor: 'pointer', background: 'var(--color-primary-light)' }}>
              <div className="flex items-center gap-3">
                <img src="https://ui-avatars.com/api/?name=GB&background=e0f2f1" alt="Glow Beauty" className="avatar" style={{ width: '40px', height: '40px' }} />
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.9rem' }}>Glow Beauty</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '180px' }}>¡Hola Ana! Nos encantó tu último vídeo...</p>
                </div>
              </div>
            </div>
            {/* Add more contacts here if needed */}
          </div>
        </div>

        <div className="flex flex-col" style={{ flex: 1 }}>
          <div style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img src="https://ui-avatars.com/api/?name=GB&background=e0f2f1" alt="Glow Beauty" className="avatar" style={{ width: '40px', height: '40px' }} />
            <h3 style={{ margin: 0 }}>Glow Beauty</h3>
          </div>
          
          <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ alignSelf: 'flex-start', background: 'white', padding: '1rem', borderRadius: 'var(--radius-md) var(--radius-md) var(--radius-md) 0', maxWidth: '70%', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
              <p style={{ margin: 0 }}>¡Hola Ana! Nos encantó tu último vídeo sobre rutinas de skincare. ¿Estarías interesada en una colaboración pagada para nuestro nuevo Serum?</p>
            </div>
            <div style={{ alignSelf: 'flex-end', background: 'var(--color-primary-light)', padding: '1rem', borderRadius: 'var(--radius-md) var(--radius-md) 0 var(--radius-md)', maxWidth: '70%', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
              <p style={{ margin: 0 }}>¡Hola equipo! Muchas gracias. ¡Sí, me encantaría conocer más detalles sobre la campaña y el presupuesto!</p>
            </div>
          </div>

          <div style={{ padding: '1rem', borderTop: '1px solid var(--glass-border)', display: 'flex', gap: '1rem' }}>
            <input 
              type="text" 
              placeholder="Escribe un mensaje..." 
              style={{ flex: 1, padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.8)', outline: 'none' }} 
            />
            <button className="btn btn-primary" style={{ padding: '0.75rem', borderRadius: '50%' }}>
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
