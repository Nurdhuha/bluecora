import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import BottomNav from './components/BottomNav';
import Splash from './pages/Splash';
import Onboarding from './pages/Onboarding';
import Login from './pages/Login';
import Home from './pages/Home';
import ColdStorage from './pages/ColdStorage';
import JualIkan from './pages/JualIkan';
import Koperasi from './pages/Koperasi';
import Keuangan from './pages/Keuangan';
import Distribusi from './pages/Distribusi';
import Edukasi from './pages/Edukasi';
import Profil from './pages/Profil';

function AppLayout() {
  const { isLoggedIn, toast } = useApp();
  const location = useLocation();
  const hideNavPaths = ['/', '/onboarding', '/login'];
  const shouldShowNav = isLoggedIn && !hideNavPaths.includes(location.pathname);

  return (
    <div className="app-layout">
      {/* Toast Notification */}
      {toast && (
        <div className="toast-container">
          <div className={`toast toast-${toast.type}`}>
            {toast.type === 'success' ? '✓' : 'ℹ'} {toast.message}
          </div>
        </div>
      )}

      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        {/* Protected routes */}
        <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
        <Route path="/cold-storage" element={isLoggedIn ? <ColdStorage /> : <Navigate to="/login" />} />
        <Route path="/jual-ikan" element={isLoggedIn ? <JualIkan /> : <Navigate to="/login" />} />
        <Route path="/koperasi" element={isLoggedIn ? <Koperasi /> : <Navigate to="/login" />} />
        <Route path="/keuangan" element={isLoggedIn ? <Keuangan /> : <Navigate to="/login" />} />
        <Route path="/distribusi" element={isLoggedIn ? <Distribusi /> : <Navigate to="/login" />} />
        <Route path="/edukasi" element={isLoggedIn ? <Edukasi /> : <Navigate to="/login" />} />
        <Route path="/profil" element={isLoggedIn ? <Profil /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Bottom Nav — only visible when logged in and on main pages */}
      {shouldShowNav && (
        <BottomNav />
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppLayout />
      </AppProvider>
    </BrowserRouter>
  );
}
