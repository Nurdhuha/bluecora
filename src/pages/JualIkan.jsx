import { useState } from 'react';
import TopBar from '../components/TopBar';
import { formatCurrency } from '../utils/helpers';
import fishPrices from '../data/fishPrices.json';
import transactions from '../data/transactions.json';
import { useApp } from '../context/AppContext';

const steps = ['Jenis', 'Berat', 'Grade', 'Review'];

export default function JualIkan() {
  const { showToast } = useApp();
  const [step, setStep] = useState(0);
  const [jenis, setJenis] = useState('');
  const [berat, setBerat] = useState('');
  const [grade, setGrade] = useState('A');
  const [metode, setMetode] = useState('Langsung Cair');
  const [showHistory, setShowHistory] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  const selectedPrice = fishPrices.find(f => f.jenis === jenis);
  const harga = selectedPrice ? selectedPrice.harga : 0;
  const gradeMultiplier = grade === 'A' ? 1 : grade === 'B' ? 0.85 : 0.7;
  const total = harga * Number(berat) * gradeMultiplier;

  const handleSubmit = () => {
    showToast('Penjualan berhasil dicatat!', 'success');
    setStep(0); setJenis(''); setBerat(''); setGrade('A');
  };

  const nextStep = () => { if (step < 3) setStep(step + 1); };
  const prevStep = () => { if (step > 0) setStep(step - 1); };

  const totalKgBulan = transactions.reduce((a, t) => a + t.berat, 0);
  const totalPendapatan = transactions.reduce((a, t) => a + t.total, 0);

  return (
    <>
      <TopBar title="Jual Ikan" />
      <div className="page-content">
        {/* Segmented Control */}
        <div className="jual-segmented-control animate-fade-in-up">
          <div className="jual-segment-slider" style={{ transform: showHistory ? 'translateX(100%)' : 'translateX(0)' }} />
          <button className={`jual-segment-btn ${!showHistory ? 'active' : ''}`} onClick={() => setShowHistory(false)}>Jual Baru</button>
          <button className={`jual-segment-btn ${showHistory ? 'active' : ''}`} onClick={() => setShowHistory(true)}>Riwayat</button>
        </div>

        {!showHistory ? (
          <>
            {/* Progress Indicator */}
            <div className="jual-progress-container animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="jual-progress-text">Langkah {step + 1} dari 4: {steps[step]}</div>
              <div className="jual-progress-hairline">
                <div className="jual-progress-hairline-fill" style={{ width: `${((step + 1) / 4) * 100}%` }} />
              </div>
            </div>

            {/* Step Forms */}
            {step === 0 && (
              <div className="animate-fade-in">
                <h3 className="text-xl text-black" style={{ marginBottom: 'var(--space-md)' }}>Pilih Jenis Ikan</h3>
                <div className="flex flex-col gap-sm">
                  {fishPrices.map(f => (
                    <button key={f.jenis} className={`jual-option-premium ${jenis === f.jenis ? 'selected' : ''}`} onClick={() => setJenis(f.jenis)}>
                      <div className="jual-option-premium-content" style={{ textAlign: 'left' }}>
                        <div className="text-bold text-lg">{f.jenis}</div>
                        <div className="text-sm text-muted">{formatCurrency(f.harga)}/kg</div>
                      </div>
                      <div className="jual-option-premium-icon">
                        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>check</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="animate-fade-in">
                <h3 className="text-xl text-black text-center" style={{ marginBottom: 'var(--space-xl)' }}>Masukkan Berat</h3>
                <div className="jual-typographic-input">
                  <input type="number" className="jual-input-bare" placeholder="0" value={berat} onChange={e => setBerat(e.target.value)} id="input-berat" autoFocus />
                  <span className="jual-input-unit">kg</span>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-fade-in">
                <h3 className="text-xl text-black" style={{ marginBottom: 'var(--space-md)' }}>Pilih Grade Kualitas</h3>
                {['A', 'B', 'C'].map(g => (
                  <button key={g} className={`jual-option-premium ${grade === g ? 'selected' : ''}`} onClick={() => setGrade(g)}>
                    <div className="jual-option-premium-content" style={{ textAlign: 'left' }}>
                      <div className="text-bold text-lg">Grade {g}</div>
                      <div className="text-sm text-muted mt-1">{g === 'A' ? 'Kualitas terbaik — 100% harga penuh' : g === 'B' ? 'Kualitas baik — 85% dari harga' : 'Kualitas standar — 70% dari harga'}</div>
                    </div>
                    <div className="jual-option-premium-icon">
                      <span className="material-symbols-outlined" style={{ fontSize: 20 }}>check</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {step === 3 && (
              <div className="animate-fade-in">
                <div className="jual-receipt-card">
                  <div className="text-center" style={{ marginBottom: 'var(--space-md)' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 32, color: 'var(--color-primary)' }}>receipt_long</span>
                    <h3 className="text-lg text-bold mt-2">Ringkasan Penjualan</h3>
                  </div>
                  <div className="jual-receipt-divider" />
                  <div className="jual-receipt-row"><span>Jenis Ikan</span><span className="text-bold">{jenis}</span></div>
                  <div className="jual-receipt-row"><span>Berat Total</span><span className="text-bold">{berat} kg</span></div>
                  <div className="jual-receipt-row"><span>Grade</span><span className="text-bold">{grade}</span></div>
                  <div className="jual-receipt-divider" />
                  <div className="jual-receipt-row" style={{ marginTop: 'var(--space-md)' }}><span>Estimasi Pendapatan</span></div>
                  <div className="jual-receipt-total text-success">{formatCurrency(total)}</div>
                </div>

                <h3 className="text-base text-bold" style={{ marginBottom: 'var(--space-sm)' }}>Metode Pencairan</h3>
                <div className="jual-option-grid">
                  {['Langsung Cair', 'Tabungan Koperasi', 'Potong Cicilan'].map(m => (
                    <button key={m} className={`jual-option-premium ${metode === m ? 'selected' : ''}`} onClick={() => setMetode(m)}>
                      <span className="text-bold" style={{ fontSize: 14 }}>{m}</span>
                      <div className="jual-option-premium-icon">
                        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>check</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex gap-md" style={{ marginTop: 'var(--space-xl)' }}>
              {step > 0 && <button className="btn btn-secondary btn-lg" style={{ flex: 1 }} onClick={prevStep}>Kembali</button>}
              {step < 3 ? (
                <button className="btn btn-primary btn-lg" style={{ flex: 2 }} onClick={nextStep} disabled={step === 0 && !jenis}>Lanjut</button>
              ) : (
                <button className="btn btn-primary btn-lg" style={{ flex: 2 }} onClick={handleSubmit}>Konfirmasi Jual</button>
              )}
            </div>
          </>
        ) : (
          <div className="animate-fade-in">
            {/* Stats */}
            <div className="jual-receipt-card" style={{ padding: 'var(--space-lg)' }}>
              <div className="flex justify-between items-center" style={{ marginBottom: 'var(--space-md)' }}>
                <div>
                  <div className="card-label">Total Tangkapan Bulan Ini</div>
                  <div className="text-2xl text-bold text-primary" style={{ letterSpacing: '-1px' }}>{totalKgBulan} <span className="text-base text-muted font-medium">kg</span></div>
                </div>
                <div className="material-symbols-outlined" style={{ fontSize: 36, color: 'var(--color-border-light)' }}>set_meal</div>
              </div>
              <div className="jual-receipt-divider" style={{ margin: 'var(--space-sm) 0 var(--space-md)' }} />
              <div>
                <div className="card-label">Estimasi Penghasilan</div>
                <div className="text-2xl text-success text-bold" style={{ letterSpacing: '-1px' }}>{formatCurrency(totalPendapatan)}</div>
              </div>
            </div>
            
            <div className="section-header"><h2 className="section-title">Riwayat Penjualan</h2></div>
            <div className="flex flex-col gap-sm stagger-children">
              {transactions.map(t => (
                <div key={t.id} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: 'var(--color-surface)', overflow: 'hidden' }}>
                  <div 
                    className="list-item" 
                    style={{ border: 'none', marginBottom: 0, borderRadius: 0, cursor: 'pointer' }}
                    onClick={() => setExpandedId(expandedId === t.id ? null : t.id)}
                  >
                    <div className="list-item-icon material-symbols-outlined">payments</div>
                    <div className="list-item-content">
                      <div className="list-item-title">{t.jenis}</div>
                      <div className="list-item-subtitle" style={{ fontSize: 10 }}>{t.tanggal}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div className="list-item-value text-success" style={{ fontSize: 13 }}>{formatCurrency(t.total)}</div>
                      <div className="text-muted flex justify-end" style={{ marginTop: 2 }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                          {expandedId === t.id ? 'expand_less' : 'expand_more'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {expandedId === t.id && (
                    <div className="animate-fade-in" style={{ padding: '0 var(--space-md) var(--space-md)', background: 'var(--color-bg-secondary)', borderTop: '1px dashed var(--color-border)' }}>
                      <div className="jual-receipt-row" style={{ marginTop: 'var(--space-md)' }}>
                        <span>Berat Total</span><span className="text-bold">{t.berat} kg</span>
                      </div>
                      <div className="jual-receipt-row">
                        <span>Harga per kg</span><span className="text-bold">{formatCurrency(t.harga)}</span>
                      </div>
                      <div className="jual-receipt-row">
                        <span>Grade Ikan</span><span className="text-bold">{t.grade}</span>
                      </div>
                      <div className="jual-receipt-row" style={{ marginBottom: 0 }}>
                        <span>Metode Pencairan</span><span className="text-bold">{t.metode}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
