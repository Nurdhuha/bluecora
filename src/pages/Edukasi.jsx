import { useState } from 'react';
import TopBar from '../components/TopBar';
import eduData from '../data/education.json';

export default function Edukasi() {
  const [search, setSearch] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const filtered = eduData.filter(e => e.judul.toLowerCase().includes(search.toLowerCase()));

  if (selectedArticle) {
    return (
      <>
        <TopBar title="Edukasi" />
        <div className="page-content">
          <button className="btn btn-outline btn-sm" onClick={() => setSelectedArticle(null)} style={{ marginBottom: 'var(--space-md)' }}>← Kembali</button>
          <div className="material-symbols-outlined" style={{ fontSize: 48, textAlign: 'center', marginBottom: 'var(--space-md)', color: 'var(--color-primary)' }}>{selectedArticle.ikon}</div>
          <h2 className="text-lg text-bold" style={{ marginBottom: 'var(--space-md)' }}>{selectedArticle.judul}</h2>
          <span className="badge badge-info" style={{ marginBottom: 'var(--space-lg)', display: 'inline-block' }}>{selectedArticle.kategori}</span>
          <div className="text-sm text-muted" style={{ lineHeight: 1.8 }}>
            <p style={{ marginBottom: 'var(--space-md)' }}>Artikel ini membahas tentang {selectedArticle.judul.toLowerCase()} secara lengkap dan mudah dipahami oleh nelayan.</p>
            <p style={{ marginBottom: 'var(--space-md)' }}>Materi ini disusun berdasarkan pengalaman praktis dari para nelayan berpengalaman di Bawean dan panduan dari Dinas Kelautan.</p>
            <p>📹 Video tutorial akan segera tersedia di pembaruan berikutnya.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <TopBar title="Pusat Edukasi" showBack={true} />
      <div className="page-content">
        {/* Search */}
        <div className="edukasi-search">
          <span className="edukasi-search-icon material-symbols-outlined">search</span>
          <input className="form-input" placeholder="Cari materi..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 40 }} id="search-edukasi" />
        </div>

        {/* Grid */}
        <div className="edukasi-grid stagger-children">
          {filtered.map(e => (
            <div key={e.id} className="edukasi-card" onClick={() => setSelectedArticle(e)}>
              <div className="edukasi-card-thumb material-symbols-outlined" style={{ background: `${e.warna}15`, color: e.warna }}>{e.ikon}</div>
              <div className="edukasi-card-body">
                <div className="edukasi-card-title">{e.judul}</div>
                <div className="edukasi-card-tag">{e.kategori}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Certificates */}
        <div className="edukasi-cert-section">
          <div className="section-header"><h2 className="section-title">Sertifikat</h2></div>
          <div className="edukasi-cert-card">
            <div className="edukasi-cert-badge material-symbols-outlined">emoji_events</div>
            <div>
              <div className="text-sm text-bold">Pelatihan Mutu Ikan</div>
              <div className="text-xs text-muted">Selesai — 15 Mar 2026</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
