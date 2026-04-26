import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/onboarding', { replace: true }), 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-screen">
      <div className="splash-logo">🐟</div>
      <h1 className="splash-title">Bluecora</h1>
      <p className="splash-subtitle">Koperasi Nelayan Bawean</p>
      <div className="splash-loader" />
    </div>
  );
}
