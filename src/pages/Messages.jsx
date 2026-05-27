import { useState, useRef, useEffect } from 'react';
import { Send, ArrowLeft } from 'lucide-react';

const Messages = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'brand', text: '¡Hola Sandra! Nos encantó tu último vídeo sobre rutinas de skincare. ¿Estarías interesada en una colaboración pagada para nuestro nuevo Serum?' },
    { id: 2, sender: 'me', text: '¡Hola equipo! Muchas gracias. ¡Sí, me encantaría conocer más detalles sobre la campaña y el presupuesto!' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const newMsg = { id: Date.now(), sender: 'me', text: inputValue };
    setMessages(prev => [...prev, newMsg]);
    setInputValue('');

    // Fake auto-reply after 1.5s
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { id: Date.now(), sender: 'brand', text: '¡Perfecto! Te acabo de enviar un email con el briefing completo y nuestra propuesta económica. Échale un vistazo cuando puedas 😊' }
      ]);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-4 md:gap-8" style={{ animation: 'fadeIn var(--transition-normal)', height: '100%', paddingBottom: '1rem' }}>
      <header className="hidden md:block">
        <h1>Mensajes</h1>
        <p>Comunícate directamente con las marcas.</p>
      </header>

      <div className="glass-panel flex flex-col md:flex-row" style={{ padding: 0, flex: 1, overflow: 'hidden', minHeight: '60vh' }}>
        
        {/* Contact List - Hidden on mobile for simplicity, or we can just show it if we build a complex UI. Let's hide it on mobile to give full screen to the chat */}
        <div className="hidden md:flex" style={{ width: '300px', borderRight: '1px solid var(--glass-border)', flexDirection: 'column' }}>
          <div style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)' }}>
            <input 
              type="text" 
              placeholder="Buscar mensajes..." 
              style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--glass-border)', background: 'transparent', outline: 'none', color: 'var(--color-text-main)' }} 
            />
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <div style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', cursor: 'pointer', background: 'var(--color-primary-light)' }}>
              <div className="flex items-center gap-3">
                <img src="https://ui-avatars.com/api/?name=GB&background=e0f2f1" alt="Glow Beauty" className="avatar" style={{ width: '40px', height: '40px' }} />
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-main)' }}>Glow Beauty</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '180px' }}>Último mensaje...</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex flex-col" style={{ flex: 1, height: '100%' }}>
          {/* Chat Header */}
          <div style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--glass-bg)' }}>
            <button className="md:hidden" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' }}>
              <ArrowLeft size={20} color="var(--color-text-main)" />
            </button>
            <img src="https://ui-avatars.com/api/?name=GB&background=e0f2f1&color=26a69a" alt="Glow Beauty" className="avatar" style={{ width: '40px', height: '40px' }} />
            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Glow Beauty</h3>
          </div>
          
          {/* Messages */}
          <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {messages.map(msg => (
              <div key={msg.id} style={{ 
                alignSelf: msg.sender === 'me' ? 'flex-end' : 'flex-start', 
                background: msg.sender === 'me' ? 'var(--color-primary-light)' : 'var(--glass-bg)', 
                color: msg.sender === 'me' ? 'var(--color-primary-dark)' : 'var(--color-text-main)',
                padding: '0.75rem 1rem', 
                borderRadius: msg.sender === 'me' ? 'var(--radius-md) var(--radius-md) 0 var(--radius-md)' : 'var(--radius-md) var(--radius-md) var(--radius-md) 0', 
                maxWidth: '85%', 
                border: msg.sender === 'brand' ? '1px solid var(--glass-border)' : 'none',
                boxShadow: 'var(--glass-shadow)',
                fontSize: '0.95rem'
              }}>
                <p style={{ margin: 0 }}>{msg.text}</p>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} style={{ padding: '1rem', borderTop: '1px solid var(--glass-border)', display: 'flex', gap: '0.5rem', background: 'var(--glass-bg)' }}>
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Escribe un mensaje..." 
              style={{ flex: 1, padding: '0.75rem 1rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--glass-border)', background: 'transparent', outline: 'none', color: 'var(--color-text-main)' }} 
            />
            <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Send size={18} />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Messages;
