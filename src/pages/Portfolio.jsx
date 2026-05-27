import { useState } from 'react';
import { Play, Plus, X } from 'lucide-react';

const Portfolio = () => {
  const [videos, setVideos] = useState(() => {
    const saved = localStorage.getItem('ugcPortfolio_v2');
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, title: 'Skincare Routine', brand: 'Glow Beauty', thumbnail: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' },
      { id: 2, title: 'Summer Outfit Haul', brand: 'Zara', thumbnail: 'https://images.unsplash.com/photo-1434389678219-45f8e5b6028a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' },
      { id: 3, title: 'Healthy Breakfast Recipe', brand: 'Whole Foods', thumbnail: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' },
    ];
  });

  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newVideo = {
      id: Date.now(),
      title: formData.get('title'),
      brand: formData.get('brand'),
      thumbnail: formData.get('thumbnail') || 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' // default generic video thumbnail
    };
    const updatedVideos = [newVideo, ...videos];
    setVideos(updatedVideos);
    localStorage.setItem('ugcPortfolio_v2', JSON.stringify(updatedVideos));
    setIsUploading(false);
  };

  return (
    <div className="flex flex-col gap-8">
      <header className="flex justify-between items-center">
        <div>
          <h1>Portfolio de Vídeos</h1>
          <p>Tus mejores trabajos y campañas UGC.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsUploading(true)}>
          <Plus size={20} style={{ marginRight: '0.5rem' }} />
          Subir Vídeo
        </button>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        {videos.map(video => (
          <div key={video.id} className="glass-card" style={{ padding: '1rem' }}>
            <div style={{ position: 'relative', borderRadius: 'var(--radius-sm)', overflow: 'hidden', aspectRatio: '9/16', marginBottom: '1rem' }}>
              <img src={video.thumbnail} alt={video.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(255,255,255,0.8)', borderRadius: '50%', padding: '1rem', cursor: 'pointer' }}>
                <Play fill="var(--color-primary-dark)" color="var(--color-primary-dark)" size={24} />
              </div>
            </div>
            <h3 style={{ fontSize: '1.1rem' }}>{video.title}</h3>
            <p style={{ fontSize: '0.85rem' }}>Campaña para <span style={{ fontWeight: 600, color: 'var(--color-primary-dark)' }}>{video.brand}</span></p>
          </div>
        ))}
      </div>

      {isUploading && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000, animation: 'fadeIn 0.2s ease-out'
        }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '500px', background: 'var(--color-bg)', position: 'relative' }}>
            <button 
              onClick={() => setIsUploading(false)}
              style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <X size={24} color="var(--color-text-muted)" />
            </button>
            <h2 style={{ marginBottom: '1.5rem' }}>Añadir nuevo vídeo</h2>
            
            <form onSubmit={handleUpload} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Título del Vídeo</label>
                <input 
                  type="text" 
                  name="title" 
                  placeholder="Ej: Unboxing de maquillaje"
                  style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--color-text-main)' }}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Marca Colaboradora</label>
                <input 
                  type="text" 
                  name="brand" 
                  placeholder="Ej: Sephora"
                  style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--color-text-main)' }}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>URL de la miniatura (Opcional)</label>
                <input 
                  type="url" 
                  name="thumbnail" 
                  placeholder="https://..."
                  style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--color-text-main)' }}
                />
                <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>Si la dejas en blanco, se usará una genérica.</p>
              </div>
              <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button type="button" className="btn btn-outline" onClick={() => setIsUploading(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary">Subir al Portfolio</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
