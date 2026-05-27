import { useState, useRef } from 'react';
import { Image, Video, Globe, TrendingUp, Users, Heart, X, Upload, Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import html2pdf from 'html2pdf.js';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(() => {
    const savedData = localStorage.getItem('ugcProfileData_v2');
    if (savedData) return JSON.parse(savedData);
    
    return {
      name: 'Sandra',
      niche: 'Lifestyle & Fashion',
      bio: 'Creadora de contenido UGC especializada en moda sostenible y estilo de vida consciente. Apasionada por el storytelling visual.',
      reach: '12.5K',
      followers: '45K',
      engagement: '8.2%',
      profilePic: '/sandra.jpg'
    };
  });
  
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const mediaKitRef = useRef(null);

  const chartData = [
    { name: 'Ene', followers: 30000, engagement: 6.5 },
    { name: 'Feb', followers: 32000, engagement: 6.8 },
    { name: 'Mar', followers: 35000, engagement: 7.2 },
    { name: 'Abr', followers: 39000, engagement: 7.9 },
    { name: 'May', followers: 45000, engagement: 8.2 },
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newData = {
      ...profileData,
      name: formData.get('name'),
      niche: formData.get('niche'),
      bio: formData.get('bio'),
      profilePic: previewImage || profileData.profilePic
    };
    setProfileData(newData);
    localStorage.setItem('ugcProfileData_v2', JSON.stringify(newData));
    setIsEditing(false);
  };

  const downloadMediaKit = () => {
    const element = mediaKitRef.current;
    const opt = {
      margin:       0.5,
      filename:     `MediaKit_${profileData.name.replace(/\s+/g, '')}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="flex flex-col gap-8">
      <header className="flex justify-between items-center">
        <h1>Perfil de Creador</h1>
        <div className="flex gap-4">
          <button className="btn btn-outline" onClick={downloadMediaKit}>
            <Download size={18} style={{ marginRight: '0.5rem' }} /> Media Kit
          </button>
          <button className="btn btn-primary" onClick={() => { setPreviewImage(profileData.profilePic); setIsEditing(true); }}>
            Editar Perfil
          </button>
        </div>
      </header>

      {/* Wrapping the content we want in the PDF with a ref */}
      <div ref={mediaKitRef} style={{ background: 'var(--color-bg)', padding: '1rem', borderRadius: 'var(--radius-lg)' }}>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass-card flex-col items-center text-center md:col-span-1" style={{ display: 'flex' }}>
            <img 
              src={profileData.profilePic} 
              alt="Profile" 
              className="avatar" 
              style={{ width: '120px', height: '120px', margin: '0 auto', marginBottom: '1rem', objectFit: 'cover' }} 
            />
            <div>
              <h2 style={{ marginBottom: '0.25rem' }}>{profileData.name}</h2>
              <p className="badge">{profileData.niche}</p>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, marginTop: '1rem' }}>
              {profileData.bio}
            </p>
            <div className="flex gap-4 justify-center" style={{ marginTop: '1rem' }}>
              <Image size={24} color="var(--color-text-muted)" />
              <Video size={24} color="var(--color-text-muted)" />
              <Globe size={24} color="var(--color-text-muted)" />
            </div>
          </div>

          <div className="md:col-span-2 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="glass-card text-center">
                <TrendingUp size={28} color="var(--color-primary-dark)" style={{ margin: '0 auto 0.5rem' }} />
                <h3>{profileData.reach}</h3>
                <p style={{ fontSize: '0.8rem' }}>Alcance Promedio</p>
              </div>
              <div className="glass-card text-center">
                <Users size={28} color="var(--color-secondary-dark)" style={{ margin: '0 auto 0.5rem' }} />
                <h3>{profileData.followers}</h3>
                <p style={{ fontSize: '0.8rem' }}>Seguidores Totales</p>
              </div>
              <div className="glass-card text-center">
                <Heart size={28} color="#e57373" style={{ margin: '0 auto 0.5rem' }} />
                <h3>{profileData.engagement}</h3>
                <p style={{ fontSize: '0.8rem' }}>Engagement Rate</p>
              </div>
            </div>

            <div className="glass-panel">
              <h3 style={{ marginBottom: '1rem' }}>Crecimiento (2026)</h3>
              <div style={{ height: '200px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" />
                    <XAxis dataKey="name" stroke="var(--color-text-muted)" fontSize={12} />
                    <YAxis stroke="var(--color-text-muted)" fontSize={12} />
                    <Tooltip contentStyle={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '8px' }} />
                    <Line type="monotone" dataKey="followers" stroke="var(--color-primary-dark)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000, animation: 'fadeIn 0.2s ease-out'
        }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '500px', background: 'var(--color-bg)', position: 'relative' }}>
            <button 
              onClick={() => setIsEditing(false)}
              style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <X size={24} color="var(--color-text-muted)" />
            </button>
            <h2 style={{ marginBottom: '1.5rem' }}>Editar Perfil</h2>
            
            <form onSubmit={handleSave} className="flex flex-col gap-4">
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <img 
                  src={previewImage || profileData.profilePic} 
                  alt="Preview" 
                  className="avatar"
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
                <input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} style={{ display: 'none' }} />
                <button type="button" className="btn btn-outline" onClick={() => fileInputRef.current.click()} style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                  <Upload size={16} style={{ marginRight: '0.5rem' }} /> Cambiar Foto
                </button>
              </div>

              <div className="flex flex-col gap-1">
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Nombre Completo</label>
                <input type="text" name="name" defaultValue={profileData.name} style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--color-text-main)' }} required />
              </div>
              <div className="flex flex-col gap-1">
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Nicho Principal</label>
                <input type="text" name="niche" defaultValue={profileData.niche} style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--color-text-main)' }} required />
              </div>
              <div className="flex flex-col gap-1">
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Biografía</label>
                <textarea name="bio" defaultValue={profileData.bio} rows="3" style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--color-text-main)', resize: 'vertical' }} required></textarea>
              </div>
              <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button type="button" className="btn btn-outline" onClick={() => setIsEditing(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary">Guardar Cambios</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
