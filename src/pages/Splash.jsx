import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Splash() {
  const navigate = useNavigate();
  const { isLoggedIn } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoggedIn) {
        navigate('/home', { replace: true });
      } else {
        navigate('/onboarding', { replace: true });
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate, isLoggedIn]);

  return (
    <div className="splash-screen">
      <div className="splash-bubbles">
        {[...Array(6)].map((_, i) => <div key={i} className="bubble" />)}
      </div>
      
      <div className="splash-content">
        <div className="splash-logo-wrapper">
          <img 
            src="/image/logo_aplikasi.png" 
            alt="Bluecora" 
            className="splash-logo"
            width="90"
            height="90"
            decoding="async"
          />
          <div className="splash-logo-pulse" />
        </div>
        
        <h1 className="splash-title">Bluecora</h1>
        <p className="splash-subtitle">Koperasi Nelayan Bawean</p>
        
        <div className="splash-progress-container">
          <div className="splash-progress-bar" />
        </div>
        <p className="splash-loading-text">Menyiapkan ekosistem laut...</p>
      </div>
    </div>
  );
}
