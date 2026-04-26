import TopBar from '../components/TopBar';
import { formatCurrency } from '../utils/helpers';
import { useApp } from '../context/AppContext';

export default function Keuangan() {
  const { user } = useApp();
  
  const pengeluaranTotal = user.pengeluaran.solar + user.pengeluaran.perbaikanKapal + user.pengeluaran.bekalMelaut;
  const laba = user.pendapatanBulanIni - pengeluaranTotal;
  const targetPercent = (user.targetTabungan.terkumpul / user.targetTabungan.target) * 100;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'];
  const maxIncome = Math.max(...user.pendapatanBulanLalu);

  return (
    <>
      <TopBar title="Keuangan" showBack={true} />
      <div className="page-content">
        
        {/* Premium Balance Card */}
        <div className="keuangan-card-premium animate-fade-in">
          <div className="flex justify-between items-start mb-4">
            <div className="min-width-0">
              <div className="text-xs font-bold opacity-70 uppercase tracking-widest mb-1">Laba Bersih Bulan Ini</div>
              <div className="text-2xl font-bold tracking-tight text-white">{formatCurrency(laba)}</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-white" style={{ fontSize: '20px' }}>account_balance_wallet</span>
            </div>
          </div>
        </div>

        {/* Summary Grid */}
        <div className="keuangan-summary stagger-children">
          <div className="keuangan-summary-item animate-fade-in-up">
            <div className="keuangan-summary-label">Pendapatan</div>
            <div className="keuangan-summary-value text-success text-sm">{formatCurrency(user.pendapatanBulanIni)}</div>
          </div>
          <div className="keuangan-summary-item animate-fade-in-up">
            <div className="keuangan-summary-label">Pengeluaran</div>
            <div className="keuangan-summary-value text-danger text-sm">{formatCurrency(pengeluaranTotal)}</div>
          </div>
        </div>

        {/* Interactive Chart */}
        <div className="section-header"><h2 className="section-title">Tren Pendapatan</h2></div>
        <div className="keuangan-chart-wrapper animate-fade-in">
          <div className="keuangan-chart-bars">
            {user.pendapatanBulanLalu.map((val, i) => (
              <div key={i} className="keuangan-chart-bar-container">
                <div 
                  className={`keuangan-chart-bar ${i === user.pendapatanBulanLalu.length - 1 ? 'active' : ''}`} 
                  style={{ height: `${(val / maxIncome) * 100}%` }}
                  data-value={formatCurrency(val)}
                />
                <span className="keuangan-chart-label">{months[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Expense Breakdown */}
        <div className="section-header"><h2 className="section-title">Detail Pengeluaran</h2></div>
        <div className="flex flex-col gap-sm mb-6">
          <div className="list-item animate-fade-in-up">
            <div className="list-item-icon material-symbols-outlined text-blue-500">local_gas_station</div>
            <div className="list-item-content">
              <div className="list-item-title">Solar Kapal</div>
              <div className="list-item-subtitle">Operasional</div>
            </div>
            <div className="list-item-value text-danger">-{formatCurrency(user.pengeluaran.solar)}</div>
          </div>
          <div className="list-item animate-fade-in-up">
            <div className="list-item-icon material-symbols-outlined text-orange-500">build</div>
            <div className="list-item-content">
              <div className="list-item-title">Perawatan</div>
              <div className="list-item-subtitle">Maintenance</div>
            </div>
            <div className="list-item-value text-danger">-{formatCurrency(user.pengeluaran.perbaikanKapal)}</div>
          </div>
          <div className="list-item animate-fade-in-up">
            <div className="list-item-icon material-symbols-outlined text-green-500">restaurant</div>
            <div className="list-item-content">
              <div className="list-item-title">Bekal</div>
              <div className="list-item-subtitle">Logistik</div>
            </div>
            <div className="list-item-value text-danger">-{formatCurrency(user.pengeluaran.bekalMelaut)}</div>
          </div>
        </div>

        {/* Savings Target */}
        <div className="section-header" style={{ marginTop: 'var(--space-lg)' }}><h2 className="section-title">Target Tabungan</h2></div>
        <div className="keuangan-target animate-fade-in">
          <div className="keuangan-target-header">
            <div className="flex items-center gap-2 min-width-0 flex-1">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-primary flex-shrink-0">
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>directions_boat</span>
              </div>
              <div className="min-width-0">
                <div className="list-item-title truncate">{user.targetTabungan.nama}</div>
                <div className="list-item-subtitle truncate">Sisa: {formatCurrency(user.targetTabungan.target - user.targetTabungan.terkumpul)}</div>
              </div>
            </div>
            <div className="text-right flex-shrink-0 ml-2">
              <div className="text-sm font-black text-primary">{Math.round(targetPercent)}%</div>
              <div className="text-[8px] uppercase font-bold tracking-widest text-slate-400">Tercapai</div>
            </div>
          </div>
          <div className="progress-bar h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="progress-fill h-full bg-primary rounded-full transition-all duration-1000 ease-out" 
              style={{ width: `${targetPercent}%` }} 
            />
          </div>
        </div>

        {/* Debts */}
        <div className="section-header" style={{ marginTop: 'var(--space-md)' }}><h2 className="section-title">Catatan Hutang</h2></div>
        <div className="flex flex-col gap-sm">
          {user.hutang.map((h, i) => (
            <div key={i} className="list-item animate-fade-in-up" style={{ alignItems: 'center' }}>
              <div className="list-item-icon material-symbols-outlined text-red-400">receipt_long</div>
              <div className="list-item-content" style={{ flex: '1.5' }}>
                <div className="list-item-title truncate" style={{ whiteSpace: 'nowrap' }}>{h.keterangan}</div>
                <div className="list-item-subtitle text-danger font-bold">Tempo: {h.jatuhTempo}</div>
              </div>
              <div className="list-item-value text-danger font-black">{formatCurrency(h.jumlah)}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
