import { useState } from 'react';
import TopBar from '../components/TopBar';
import Modal from '../components/Modal';
import { formatCurrency } from '../utils/helpers';
import koperasiData from '../data/koperasi.json';
import { useApp } from '../context/AppContext';

export default function Koperasi() {
  const { user, showToast } = useApp();
  const [showPinjaman, setShowPinjaman] = useState(false);
  const [voted, setVoted] = useState(koperasiData.voting.sudahVote);
  const cicilanProgress = ((koperasiData.pinjaman.total - koperasiData.pinjaman.sisa) / koperasiData.pinjaman.total) * 100;

  return (
    <>
      <TopBar title="Koperasi" />
      <div className="page-content">
        {/* Member Card */}
        <div className="koperasi-member-card animate-fade-in-up">
          <div className="koperasi-member-avatar"><span className="material-symbols-outlined">person</span></div>
          <div>
            <div className="koperasi-member-name">{user.nama}</div>
            <div className="text-sm" style={{ opacity: 0.8 }}>{user.idAnggota}</div>
            <span className="badge badge-success" style={{ marginTop: 4 }}>● {koperasiData.status}</span>
          </div>
        </div>

        {/* Savings List */}
        <div className="section-header"><h2 className="section-title">Simpanan</h2></div>
        <div className="koperasi-savings-list animate-fade-in-up">
          <div className="koperasi-savings-item">
            <span className="koperasi-savings-label">Simpanan Pokok</span>
            <span className="koperasi-savings-value">{formatCurrency(koperasiData.simpananPokok)}</span>
          </div>
          <div className="koperasi-savings-item">
            <span className="koperasi-savings-label">Simpanan Wajib</span>
            <span className="koperasi-savings-value">{formatCurrency(koperasiData.simpananWajib)}</span>
          </div>
          <div className="koperasi-savings-item">
            <span className="koperasi-savings-label">Tabungan Sukarela</span>
            <span className="koperasi-savings-value">{formatCurrency(koperasiData.tabungan)}</span>
          </div>
          <div className="koperasi-savings-item">
            <span className="koperasi-savings-label">SHU Tahunan</span>
            <span className="koperasi-savings-value text-success">{formatCurrency(koperasiData.shu)}</span>
          </div>
        </div>

        {/* Loan Section */}
        <div className="section-header" style={{ marginTop: 'var(--space-md)' }}><h2 className="section-title">Pinjaman</h2></div>
        <div className="card animate-fade-in-up" style={{ marginBottom: 'var(--space-md)' }}>
          <div className="flex justify-between items-center" style={{ marginBottom: 'var(--space-sm)' }}>
            <div>
              <div className="text-sm text-muted">Sisa Pinjaman</div>
              <div className="text-lg text-bold">{formatCurrency(koperasiData.pinjaman.sisa)}</div>
            </div>
            <span className="badge badge-info">Aktif</span>
          </div>
          <div className="flex justify-between text-xs text-muted" style={{ marginBottom: 6 }}>
            <span>Cicilan: {formatCurrency(koperasiData.pinjaman.cicilan)}/bln</span>
            <span>{Math.round(cicilanProgress)}% lunas</span>
          </div>
          <div className="progress-bar"><div className="progress-fill" style={{ width: `${cicilanProgress}%` }} /></div>
        </div>

        {/* Actions */}
        <div className="flex gap-sm mb-6 overflow-x-auto pb-2 no-scrollbar">
          <button className="btn btn-secondary btn-sm" style={{ flexShrink: 0 }} onClick={() => setShowPinjaman(true)}>Ajukan Pinjaman</button>
          <button className="btn btn-secondary btn-sm" style={{ flexShrink: 0 }} onClick={() => showToast('Fitur tarik saldo (demo)')}>Tarik Saldo</button>
          <button className="btn btn-secondary btn-sm" style={{ flexShrink: 0 }} onClick={() => showToast('Fitur bayar cicilan (demo)')}>Bayar</button>
        </div>

        {/* Voting */}
        <div className="section-header" style={{ marginTop: 'var(--space-lg)' }}><h2 className="section-title">Voting Rapat</h2></div>
        <div className="koperasi-vote-card animate-fade-in-up">
          <div className="text-sm text-bold mb-2">{koperasiData.voting.agenda}</div>
          <div className="koperasi-vote-bar">
            <div className="koperasi-vote-yes" style={{ width: `${koperasiData.voting.setuju}%` }} />
            <div className="koperasi-vote-no" style={{ width: `${koperasiData.voting.tolak}%` }} />
          </div>
          <div className="flex justify-between text-xs text-muted mb-3">
            <span>✓ Setuju {koperasiData.voting.setuju}%</span>
            <span>✗ Tolak {koperasiData.voting.tolak}%</span>
          </div>
          {!voted ? (
            <div className="flex gap-sm">
              <button className="btn btn-primary btn-sm flex-1" onClick={() => { setVoted(true); showToast('Vote berhasil!'); }}>Setuju</button>
              <button className="btn btn-outline btn-sm flex-1" onClick={() => { setVoted(true); showToast('Vote berhasil!'); }}>Tolak</button>
            </div>
          ) : (
            <div className="text-sm text-muted text-center">✓ Anda sudah memberikan suara</div>
          )}
        </div>
      </div>

      <Modal isOpen={showPinjaman} onClose={() => setShowPinjaman(false)} title="Ajukan Pinjaman">
        <div className="form-group"><label className="form-label">Jumlah Pinjaman</label><input type="number" className="form-input" placeholder="Masukkan jumlah" /></div>
        <div className="form-group"><label className="form-label">Keperluan</label><input className="form-input" placeholder="Contoh: Modal melaut" /></div>
        <button className="btn btn-primary btn-full" onClick={() => { setShowPinjaman(false); showToast('Pengajuan terkirim!'); }}>Ajukan</button>
      </Modal>
    </>
  );
}
