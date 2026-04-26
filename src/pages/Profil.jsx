import { useState } from 'react';
import TopBar from '../components/TopBar';
import Modal from '../components/Modal';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const menuItems = [
  { icon: 'assignment', label: 'Riwayat Transaksi', action: 'riwayat' },
  { icon: 'account_balance', label: 'Rekening Pencairan', action: 'rekening' },
  { icon: 'settings', label: 'Pengaturan', action: 'pengaturan' },
  { icon: 'support_agent', label: 'Bantuan CS', action: 'bantuan' },
];

export default function Profil() {
  const { user, logout, showToast } = useApp();
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <>
      <TopBar title="Profil" />
      <div className="page-content">
        {/* Avatar & Info */}
        <div className="profil-header animate-fade-in-up">
          <div className="profil-avatar"><span className="material-symbols-outlined">person</span></div>
          <div className="profil-name">{user.nama}</div>
          <div className="profil-id">{user.idAnggota}</div>
          <span className="badge badge-success" style={{ marginTop: 'var(--space-sm)' }}>● Anggota Aktif</span>
        </div>

        {/* Boat Info */}
        <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
          <div className="flex items-center gap-md">
            <div className="list-item-icon material-symbols-outlined" style={{ fontSize: 24, color: 'var(--color-primary)' }}>directions_boat</div>
            <div>
              <div className="text-bold">{user.kapal}</div>
              <div className="text-xs text-muted">Kapal terdaftar</div>
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="profil-menu-group">
          <div className="profil-menu-group-title">Akun</div>
          {menuItems.map((item, i) => (
            <div key={i} className="list-item" style={{ cursor: 'pointer' }} onClick={() => {
              if (item.action === 'pengaturan') setShowSettings(true);
              else showToast(`${item.label} (demo)`);
            }}>
              <div className="list-item-icon material-symbols-outlined">{item.icon}</div>
              <div className="list-item-content"><div className="list-item-title">{item.label}</div></div>
              <span className="text-muted">›</span>
            </div>
          ))}
        </div>

        {/* App Info */}
        <div className="profil-menu-group">
          <div className="profil-menu-group-title">Aplikasi</div>
          <div className="list-item">
            <div className="list-item-icon material-symbols-outlined">smartphone</div>
            <div className="list-item-content">
              <div className="list-item-title">Versi Aplikasi</div>
              <div className="list-item-subtitle">Bluecora PWA v1.0.0</div>
            </div>
          </div>
        </div>

        {/* Logout */}
        <div className="profil-logout">
          <button className="btn btn-outline btn-full" style={{ borderColor: 'var(--color-danger)', color: 'var(--color-danger)' }} onClick={handleLogout} id="btn-logout">
            Keluar
          </button>
        </div>
      </div>

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
    </>
  );
}
