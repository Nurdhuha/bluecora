import { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import TopBar from '../components/TopBar';
import { formatCurrency, getGreeting } from '../utils/helpers';
import weatherData from '../data/weather.json';
import fishPrices from '../data/fishPrices.json';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { user } = useApp();
  const navigate = useNavigate();
  const greeting = getGreeting();


  const catchComposition = [
    { label: 'Kerapu', percent: 45, color: 'var(--color-chart-1)' },
    { label: 'Tenggiri', percent: 30, color: 'var(--color-chart-2)' },
    { label: 'Kakap', percent: 25, color: 'var(--color-chart-3)' },
  ];

  let currentPercent = 0;
  const gradientStops = catchComposition.map(item => {
    const start = currentPercent;
    currentPercent += item.percent;
    return `${item.color} ${start}% ${currentPercent}%`;
  }).join(', ');

  const [isChartVisible, setIsChartVisible] = useState(false);
  const chartRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsChartVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    
    if (chartRef.current) observer.observe(chartRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <TopBar title="Beranda" />
      <div className="page-content">
        
        {/* Greeting Section */}
        <div className="home-greeting animate-fade-in-up">
          <div className="home-greeting-sub">{greeting},</div>
          <div className="home-greeting-text text-3xl">{user.nama} 👋</div>
        </div>

        {/* Mega Action Button */}
        <button className="btn-mega animate-fade-in-up" style={{ animationDelay: '0.1s' }} onClick={() => navigate('/jual-ikan')}>
          <div style={{ textAlign: 'left' }}>
            <div className="btn-mega-title">Setor Ikan</div>
            <div className="btn-mega-sub">Mulai pencatatan tangkapan</div>
          </div>
          <div className="btn-mega-icon"><span className="material-symbols-outlined">set_meal</span></div>
        </button>

        {/* Weather Widget */}
        <div className="weather-widget animate-fade-in-up" style={{ marginBottom: 'var(--space-lg)', animationDelay: '0.2s' }}>
          <div>
            <div className="weather-icon material-symbols-outlined">partly_cloudy_day</div>
            <div className="text-sm text-bold" style={{ marginTop: 4 }}>{weatherData.kondisi}</div>
          </div>
          <div className="weather-info">
            <div className="weather-temp">{weatherData.suhu}°C</div>
            <div className="weather-detail">Angin: {weatherData.angin}</div>
            <div className="weather-detail">Ombak: {weatherData.gelombang}</div>
            <div className={`badge ${weatherData.status === 'Aman' ? 'badge-success' : 'badge-warning'}`} style={{ marginTop: 8 }}>
              {weatherData.status}
            </div>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="section-header">
          <h2 className="section-title">Menu Utama</h2>
        </div>
        <div className="bento-grid stagger-children">
          <div className="bento-item" onClick={() => navigate('/cold-storage')}>
            <span className="material-symbols-outlined bento-icon">ac_unit</span>
            <div className="bento-title">Cold Storage</div>
            <div className="bento-subtitle">Cek Kapasitas</div>
          </div>
          <div className="bento-item" onClick={() => navigate('/keuangan')}>
            <span className="material-symbols-outlined bento-icon">account_balance_wallet</span>
            <div className="bento-title">Keuangan</div>
            <div className="bento-subtitle">Arus Kas & Hutang</div>
          </div>
          <div className="bento-item" onClick={() => navigate('/distribusi')}>
            <span className="material-symbols-outlined bento-icon">local_shipping</span>
            <div className="bento-title">Distribusi</div>
            <div className="bento-subtitle">Jadwal Kapal</div>
          </div>
          <div className="bento-item" onClick={() => navigate('/edukasi')}>
            <span className="material-symbols-outlined bento-icon">menu_book</span>
            <div className="bento-title">Edukasi</div>
            <div className="bento-subtitle">Panduan Melaut</div>
          </div>
        </div>

        {/* Catch Composition Donut Chart */}
        <div className="section-header" style={{ marginTop: 'var(--space-lg)' }}>
          <h2 className="section-title">Komposisi Tangkapan</h2>
        </div>
        <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
          <div className="donut-container" ref={chartRef}>
            <div className={`donut-chart ${isChartVisible ? 'animate-chart' : ''}`} style={{ background: `conic-gradient(${gradientStops})` }}>
              <div className="donut-hole">
                <span className="donut-hole-val">120</span>
                <span className="donut-hole-label">kg Total</span>
              </div>
            </div>
            <div className="donut-legend">
              {catchComposition.map((item, i) => (
                <div key={i} className="donut-legend-item">
                  <div className="donut-legend-dot" style={{ background: item.color }} />
                  <div>
                    <div style={{ lineHeight: 1.2 }}>{item.label}</div>
                    <div className="text-muted" style={{ fontSize: 10 }}>{item.percent}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fish Prices List */}
        <div className="section-header">
          <h2 className="section-title">Harga Pasaran</h2>
        </div>
        <div className="flex flex-col gap-sm">
          {fishPrices.slice(0, 4).map((fish, i) => (
            <div key={i} className="list-item">
              <div className="list-item-icon material-symbols-outlined">set_meal</div>
              <div className="list-item-content">
                <div className="list-item-title">{fish.jenis}</div>
                <div className="list-item-subtitle">per {fish.satuan}</div>
              </div>
              <div className="list-item-value">
                <div>{formatCurrency(fish.harga)}</div>
                <span className={`card-trend ${fish.trend}`} style={{ fontSize: 10 }}>
                  {fish.trend === 'up' ? '↑' : '↓'} {Math.abs(fish.perubahan)}%
                </span>
              </div>
            </div>
          ))}
        </div>


        
      </div>
    </>
  );
}
