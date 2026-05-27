import { Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const Brands = () => {
  const brands = [
    { id: 1, name: 'Glow Beauty', logo: 'https://ui-avatars.com/api/?name=GB&background=f5ebe6&color=b59473', industry: 'Cosmetics', rating: 5 },
    { id: 2, name: 'EcoWear', logo: 'https://ui-avatars.com/api/?name=EW&background=faeceb&color=c29d93', industry: 'Fashion', rating: 4 },
    { id: 3, name: 'Fresh Foods', logo: 'https://ui-avatars.com/api/?name=FF&background=fdfbf7&color=4a413d', industry: 'Food & Beverage', rating: 5 },
  ];

  const testimonials = [
    { id: 1, text: '"Sandra es una creadora excepcional. Su vídeo para nuestro serum aumentó nuestras ventas en un 40%. Totalmente recomendada."', author: 'Sarah J., Glow Beauty' },
    { id: 2, text: '"Muy profesional y cumple siempre con los plazos. Su estilo estético encaja perfectamente con nuestros valores de marca sostenibles."', author: 'Mark T., EcoWear' },
    { id: 3, text: '"El engagement que consiguen sus vídeos es brutal. Sin duda volveremos a contar con ella para futuras campañas de lanzamiento."', author: 'Elena G., Fresh Foods' }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1>Marcas Colaboradoras</h1>
        <p>Marcas con las que has trabajado y mantenido relaciones exitosas.</p>
      </header>

      {/* Testimonials Carousel using Framer Motion */}
      <div className="glass-panel" style={{ position: 'relative', overflow: 'hidden', minHeight: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            style={{ position: 'absolute', width: '80%', textAlign: 'center' }}
          >
            <p style={{ fontSize: '1.2rem', fontStyle: 'italic', marginBottom: '1rem', color: 'var(--color-primary-dark)' }}>
              {testimonials[currentIndex].text}
            </p>
            <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>— {testimonials[currentIndex].author}</p>
          </motion.div>
        </AnimatePresence>
        
        {/* Carousel indicators */}
        <div style={{ position: 'absolute', bottom: '1rem', display: 'flex', gap: '0.5rem' }}>
          {testimonials.map((_, idx) => (
            <div 
              key={idx} 
              style={{ 
                width: '8px', height: '8px', borderRadius: '50%', 
                background: idx === currentIndex ? 'var(--color-primary-dark)' : 'var(--glass-border)',
                transition: 'background 0.3s'
              }}
            />
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {brands.map(brand => (
          <div key={brand.id} className="glass-card flex flex-col items-center text-center gap-4">
            <img src={brand.logo} alt={brand.name} className="avatar" style={{ width: '80px', height: '80px' }} />
            <div>
              <h3>{brand.name}</h3>
              <p style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>{brand.industry}</p>
              <div className="flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < brand.rating ? "#ffd54f" : "none"} color={i < brand.rating ? "#ffd54f" : "var(--color-text-muted)"} />
                ))}
              </div>
            </div>
            <button className="btn btn-outline" style={{ width: '100%', marginTop: 'auto' }}>Ver Colaboraciones</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brands;
