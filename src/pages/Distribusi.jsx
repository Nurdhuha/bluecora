import TopBar from '../components/TopBar';
import { formatWeight } from '../utils/helpers';
import distData from '../data/distribution.json';

const statusMap = { Dijadwalkan: 'badge-info', Berlayar: 'badge-warning', Sampai: 'badge-success' };
const stepperStatus = { Dijadwalkan: 0, Berlayar: 1, Sampai: 2 };
const stepLabels = ['Dikemas', 'Berlayar', 'Sampai'];

export default function Distribusi() {
  return (
    <>
      <TopBar title="Distribusi" showBack={true} />
      <div className="page-content">
        {/* Stock Card */}
        <div className="distribusi-stock-card animate-fade-in-up">
          <div className="text-sm" style={{ opacity: 0.8 }}>Total Stok Siap Kirim</div>
          <div className="distribusi-stock-value">{formatWeight(distData.stokSiapKirim)}</div>
        </div>

        {/* Destinations */}
        <div className="distribusi-map">
          <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'var(--color-primary)' }}>map</span>
          <div className="text-sm text-muted" style={{ marginTop: 'var(--space-sm)' }}>Tujuan Distribusi</div>
          <div className="distribusi-dest-grid">
            <span className="distribusi-dest-tag flex items-center gap-xs"><span className="material-symbols-outlined" style={{fontSize: 14}}>location_on</span> Gresik</span>
            <span className="distribusi-dest-tag flex items-center gap-xs"><span className="material-symbols-outlined" style={{fontSize: 14}}>location_on</span> Surabaya</span>
            <span className="distribusi-dest-tag flex items-center gap-xs"><span className="material-symbols-outlined" style={{fontSize: 14}}>location_on</span> Lamongan</span>
          </div>
        </div>

        {/* Schedule */}
        <div className="section-header"><h2 className="section-title">Jadwal Kapal</h2></div>
        <div className="flex flex-col gap-sm stagger-children" style={{ marginBottom: 'var(--space-lg)' }}>
          {distData.jadwal.map(j => (
            <div key={j.id} className="card">
              <div className="flex justify-between items-center" style={{ marginBottom: 'var(--space-sm)' }}>
                <div className="text-bold">{j.kapal}</div>
                <span className={`badge ${statusMap[j.status]}`}>{j.status}</span>
              </div>
              <div className="text-sm text-muted flex items-center gap-sm" style={{ marginBottom: 'var(--space-sm)' }}>
                <span className="flex items-center gap-xs"><span className="material-symbols-outlined" style={{fontSize: 14}}>location_on</span> {j.tujuan}</span>
                <span className="flex items-center gap-xs"><span className="material-symbols-outlined" style={{fontSize: 14}}>calendar_month</span> {j.tanggal}</span>
              </div>
              {/* Mini Stepper */}
              <div className="flex items-center gap-sm">
                {stepLabels.map((label, i) => (
                  <div key={label} className="flex items-center gap-xs" style={{ flex: 1 }}>
                    <div style={{
                      width: 8, height: 8, borderRadius: '50%',
                      background: i <= stepperStatus[j.status] ? 'var(--color-success)' : 'var(--color-surface-elevated)'
                    }} />
                    <span className="text-xs text-muted">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Buyers */}
        <div className="section-header"><h2 className="section-title">Pembeli Tetap</h2></div>
        <div className="flex flex-col gap-sm">
          {distData.pembeliTetap.map((b, i) => (
            <div key={i} className="list-item">
              <div className="list-item-icon material-symbols-outlined" style={{ background: 'rgba(18,184,134,0.15)', color: '#12B886' }}>domain</div>
              <div className="list-item-content">
                <div className="list-item-title">{b.nama}</div>
                <div className="list-item-subtitle">{b.kota}</div>
              </div>
              <div className="list-item-value text-sm">{b.orderBulanIni}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
