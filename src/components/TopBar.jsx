import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal, { SOSButton } from './Modal';
import notifications from '../data/notifications.json';

export default function TopBar({ title, showBack = false }) {
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <>
      <header className="top-bar" id="top-bar">
        <div className="flex items-center" style={{ gap: '4px', minWidth: 0, flex: 1 }}>
          {showBack && (
            <button className="top-bar-btn" onClick={() => navigate('/home')} aria-label="Kembali ke Beranda" style={{ background: 'transparent', border: 'none', width: '28px', height: '28px', padding: 0, flexShrink: 0, marginLeft: '-4px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 24, color: 'var(--color-text)' }}>chevron_left</span>
            </button>
          )}
          <span className="top-bar-title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</span>
        </div>
        <div className="top-bar-right" style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          {!showBack && <SOSButton />}
          
          <button className="top-bar-btn" onClick={() => setShowSettings(true)} aria-label="Pengaturan" style={{ background: 'transparent', border: 'none', padding: 4 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 24, color: 'var(--color-text)' }}>settings</span>
          </button>
          
          <button className="top-bar-btn notification-badge" onClick={() => setShowNotif(true)} aria-label="Notifikasi" style={{ background: 'transparent', border: 'none', padding: 4 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 24, color: 'var(--color-text)' }}>notifications</span>
          </button>
        </div>
      </header>

      <Modal isOpen={showSettings} onClose={() => setShowSettings(false)} title="Pengaturan">
        <div className="flex flex-col gap-md">
          <div className="flex justify-between items-center p-3" style={{ background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-md)' }}>
            <div className="flex items-center gap-sm">
              <span className="material-symbols-outlined">dark_mode</span>
              <span className="text-bold">Tema Gelap</span>
            </div>
            <div className={`toggle-switch ${darkTheme ? 'active' : ''}`} onClick={() => setDarkTheme(!darkTheme)} style={{ width: 44, height: 24, background: darkTheme ? 'var(--color-primary)' : 'var(--color-border)', borderRadius: 24, position: 'relative', cursor: 'pointer', transition: 'all 0.3s' }}>
              <div style={{ width: 20, height: 20, background: '#fff', borderRadius: '50%', position: 'absolute', top: 2, left: darkTheme ? 22 : 2, transition: 'all 0.3s' }} />
            </div>
          </div>

          <div className="flex justify-between items-center p-3" style={{ background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-md)' }}>
            <div className="flex items-center gap-sm">
              <span className="material-symbols-outlined">language</span>
              <span className="text-bold">Bahasa</span>
            </div>
            <select className="form-input" style={{ width: 'auto', padding: '4px 8px', fontSize: 14 }} defaultValue="id">
              <option value="id">Indonesia</option>
            </select>
          </div>
        </div>
      </Modal>

      {/* Top Modal for Notifications / Papan Informasi */}
      <Modal isOpen={showNotif} onClose={() => setShowNotif(false)} title="Papan Informasi" position="top">
        <div className="flex flex-col gap-sm">
          {notifications.map(n => (
            <div key={n.id} className="card" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 24, color: 'var(--color-primary)' }}>{n.icon}</span>
              <span className="text-sm font-semibold">{n.text}</span>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
}
