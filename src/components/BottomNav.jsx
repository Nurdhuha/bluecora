import { NavLink } from 'react-router-dom';

const tabs = [
  { path: '/home', icon: 'home', label: 'Beranda' },
  { path: '/jual-ikan', icon: 'set_meal', label: 'Jual' },
  { path: '/koperasi', icon: 'handshake', label: 'Koperasi' },
  { path: '/profil', icon: 'person', label: 'Profil' },
];

export default function BottomNav() {
  return (
    <nav className="bottom-nav" id="bottom-nav">
      {tabs.map(tab => (
        <NavLink
          key={tab.path}
          to={tab.path}
          className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
        >
          <span className="bottom-nav-icon material-symbols-outlined">{tab.icon}</span>
          <span className="bottom-nav-label">{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
