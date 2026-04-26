import { useState } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ isOpen, onClose, title, children, position = 'bottom' }) {
  if (!isOpen) return null;

  return createPortal(
    <div className={`modal-overlay ${position}`} onClick={onClose}>
      <div className={`modal-content ${position}`} onClick={e => e.stopPropagation()}>
        {position === 'bottom' && <div className="modal-handle" />}
        <h2 className="modal-title">{title}</h2>
        {children}
        {position === 'top' && <div className="modal-handle" style={{ marginTop: 'var(--space-md)', marginBottom: 0 }} />}
      </div>
    </div>,
    document.body
  );
}

export function SOSButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="sos-top-btn"
        onClick={() => setShowModal(true)}
        aria-label="Tombol Darurat SOS"
        style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px', fontSize: 12, fontWeight: 700 }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>emergency</span> SOS
      </button>

      <Modal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-danger)' }}>
            <span className="material-symbols-outlined">warning</span>
            <span>Darurat — SOS</span>
          </div>
        }
      >
        <p className="text-sm text-muted" style={{ marginBottom: 'var(--space-md)' }}>
          Sinyal darurat akan dikirim ke koperasi dan nelayan terdekat.
        </p>
        <div className="card" style={{ marginBottom: 'var(--space-md)' }}>
          <div className="card-label">Koordinat Terakhir</div>
          <div className="text-md text-bold">5.7833° S, 112.6500° E</div>
          <div className="text-xs text-muted" style={{ marginTop: 4 }}>Perairan Bawean Selatan</div>
        </div>
        <button className="btn btn-danger btn-full btn-lg" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} onClick={() => setShowModal(false)}>
          <span className="material-symbols-outlined">cell_tower</span>
          <span>Kirim Sinyal SOS</span>
        </button>
        <button
          className="btn btn-outline btn-full"
          style={{ marginTop: 'var(--space-sm)' }}
          onClick={() => setShowModal(false)}
        >
          Batal
        </button>
      </Modal>
    </>
  );
}
