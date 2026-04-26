import { useState } from 'react';
import TopBar from '../components/TopBar';
import Modal from '../components/Modal';
import coldData from '../data/coldStorage.json';
import { formatWeight, daysSince, formatDate, getGradeColor } from '../utils/helpers';

export default function ColdStorage() {
  const [showModal, setShowModal] = useState(false);
  const slotPercent = (coldData.slotTerisi / coldData.slotTotal) * 100;

  return (
    <>
      <TopBar title="Cold Storage" showBack={true} />
      <div className="page-content">
        
        {/* Temperature Gauge */}
        <div className="cold-gauge animate-fade-in-up">
          <div className="cold-gauge-circle">
            <span className="cold-gauge-value">{coldData.suhuRuang}°</span>
            <span className="cold-gauge-unit">Celsius</span>
          </div>
          <div className="cold-stats">
            <div className="cold-stat-item">
              <span className="cold-stat-dot" style={{ background: 'var(--color-success)' }} />
              <div>
                <div className="text-xs text-muted">Terisi</div>
                <div className="text-md text-bold text-black">{coldData.slotTerisi} slot</div>
              </div>
            </div>
            <div className="cold-stat-item">
              <span className="cold-stat-dot" style={{ background: 'var(--color-border)' }} />
              <div>
                <div className="text-xs text-muted">Tersedia</div>
                <div className="text-md text-bold text-black">{coldData.slotTotal - coldData.slotTerisi} slot</div>
              </div>
            </div>
          </div>
        </div>

        {/* Slot Progress */}
        <div className="card animate-fade-in-up" style={{ marginBottom: 'var(--space-lg)', animationDelay: '0.1s' }}>
          <div className="flex justify-between items-end" style={{ marginBottom: 12 }}>
            <div>
              <div className="text-xs text-muted font-bold text-uppercase" style={{ marginBottom: 4 }}>Total Kapasitas</div>
              <div className="text-lg text-bold text-black">{coldData.items.reduce((a, b) => a + b.berat, 0)} kg Tersimpan</div>
            </div>
            <span className="text-xl text-black">{Math.round(slotPercent)}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${slotPercent}%` }} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="cold-action-bar animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => setShowModal(true)}>
            + Simpan Ikan
          </button>
          <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setShowModal(true)}>
            Ambil Ikan
          </button>
        </div>

        {/* Fish List */}
        <div className="section-header animate-fade-in-up" style={{ animationDelay: '0.3s', marginTop: 'var(--space-lg)' }}>
          <h2 className="section-title">Inventaris Saya</h2>
          <span className="badge badge-info">{coldData.items.length} item</span>
        </div>
        
        <div className="flex flex-col gap-sm stagger-children">
          {coldData.items.map(item => (
            <div key={item.id} className="list-item">
              <div className="list-item-icon material-symbols-outlined">ac_unit</div>
              <div className="list-item-content">
                <div className="list-item-title">{item.jenis}</div>
                <div className="list-item-subtitle" style={{ fontSize: 12 }}>
                  {formatWeight(item.berat)} · {daysSince(item.tanggalMasuk)} hari tersimpan
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className={`badge ${getGradeColor(item.grade)}`}>Grade {item.grade}</span>
                <div className="text-xs text-bold" style={{ marginTop: 6, color: item.status === 'Baik' ? 'var(--color-success)' : 'var(--color-warning)' }}>
                  {item.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Simpan Hasil Tangkapan">
        <div className="form-group">
          <label className="form-label">Jenis Ikan</label>
          <select className="form-select form-input">
            <option>Kakap Merah</option><option>Kerapu</option><option>Tongkol</option><option>Tenggiri</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Berat Total (kg)</label>
          <input type="number" className="form-input" placeholder="Masukkan angka (contoh: 15)" />
        </div>
        <button className="btn btn-primary btn-full btn-lg" style={{ marginTop: 'var(--space-md)' }} onClick={() => setShowModal(false)}>Konfirmasi Simpan</button>
      </Modal>
    </>
  );
}
