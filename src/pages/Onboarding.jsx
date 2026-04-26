import { useNavigate } from 'react-router-dom';

export default function Onboarding() {
  const navigate = useNavigate();

  return (
    <div className="onboarding-page animate-fade-in">
      <div className="onboarding-logo-box animate-fade-in-up">
        <img 
          src="/image/logo_bluecora.png" 
          alt="Bluecora" 
          style={{ width: '60px', height: '60px', borderRadius: '16px', marginBottom: '8px' }} 
        />
        <span className="onboarding-logo-text">BLUECORA</span>
      </div>
      <div className="onboarding-content">
        <h1 className="onboarding-title animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Menuju Masa Depan Biru yang Berkelanjutan
        </h1>
        <p className="onboarding-desc animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          Selamat datang di Bluecora Center. Platform integrasi smart aquaculture untuk mendorong ekosistem ekonomi biru yang cerdas, efisien, dan berdampak.
        </p>
        <button 
          className="onboarding-btn animate-fade-in-up" 
          style={{ animationDelay: '0.4s' }}
          onClick={() => navigate('/login')}
        >
          Mulai Sekarang
        </button>
      </div>
    </div>
  );
}
