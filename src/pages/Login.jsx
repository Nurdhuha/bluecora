import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Login() {
  const [phone, setPhone] = useState('0812-3456-7890');
  const [pin, setPin] = useState('');
  const navigate = useNavigate();
  const { login } = useApp();

  const handleLogin = (e) => {
    e.preventDefault();
    login();
    navigate('/home', { replace: true });
  };

  return (
    <div className="login-page">
      <div className="login-header animate-fade-in-up">
        <img src="/image/logo_bluecora.png" alt="Bluecora Logo" className="login-logo-img" />
        <h1 className="login-title">Masuk ke Bluecora</h1>
        <p className="login-subtitle">Gunakan nomor HP yang terdaftar</p>
      </div>

      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label className="form-label">Nomor HP</label>
          <input
            type="tel"
            className="form-input"
            placeholder="08xx-xxxx-xxxx"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            id="input-phone"
          />
        </div>
        <div className="form-group">
          <label className="form-label">PIN</label>
          <input
            type="password"
            className="form-input"
            placeholder="Masukkan 6 digit PIN"
            maxLength={6}
            value={pin}
            onChange={e => setPin(e.target.value)}
            id="input-pin"
          />
        </div>
        <button type="submit" className="btn btn-primary btn-full btn-lg" id="btn-login">
          Masuk
        </button>
        <p className="text-xs text-muted" style={{ textAlign: 'center', marginTop: 'var(--space-sm)' }}>
          Belum punya akun? Hubungi koperasi Anda.
        </p>
      </form>
    </div>
  );
}
