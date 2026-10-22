import React from 'react';
import { Search, FileText, QrCode, Clock, CheckCircle2, ArrowRight, Sparkles, MapPin, AlertCircle } from 'lucide-react';
import { AuthUser, Claim, FoundItem, LostReport } from '../types';

interface StudentDashboardProps {
  user: AuthUser;
  claims: Claim[];
  foundItems: FoundItem[];
  lostReports: LostReport[];
  onNavigateTab: (tab: string) => void;
  onClaimItem: (item: FoundItem) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  user,
  claims,
  foundItems,
  lostReports,
  onNavigateTab,
  onClaimItem
}) => {
  const myClaims = claims.filter(c => c.claimantNpm === user.identifier);
  const myReports = lostReports.filter(r => r.reporterNpm === user.identifier);
  const readyClaims = myClaims.filter(c => c.status === 'APPROVED');
  const pendingClaims = myClaims.filter(c => c.status === 'PENDING');

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-ug-purple to-purple-900 text-white rounded-2xl p-6 sm:p-8 shadow-md border-b-2 border-ug-gold flex flex-wrap justify-between items-center gap-4">
        <div>
          <span className="text-[11px] font-bold text-ug-gold uppercase tracking-wider block">
            PORTAL MAHASISWA UNIVERSITAS GUNADARMA
          </span>
          <h1 className="text-2xl sm:text-3xl font-black mt-1">
            Selamat Datang, {user.name}!
          </h1>
          <p className="text-xs text-purple-200 mt-1 font-mono">
            NPM: {user.identifier} • {user.majorOrDepartment} • {user.email}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onNavigateTab('catalog')}
            className="px-4 py-2.5 bg-ug-gold hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl shadow-md transition flex items-center gap-1.5"
          >
            <Search className="w-4 h-4" />
            Cari Barang Temuan
          </button>
          <button
            onClick={() => onNavigateTab('report-lost')}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition border border-white/20 flex items-center gap-1.5"
          >
            <FileText className="w-4 h-4" />
            Lapor Kehilangan
          </button>
        </div>
      </div>

      {/* Notification Banner if Ticket Ready */}
      {readyClaims.length > 0 && (
        <div className="bg-emerald-50 border-2 border-emerald-400 rounded-2xl p-4 flex items-center justify-between text-xs text-emerald-900 shadow-sm animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-sm">
                Klaim Anda Disetujui Admin BAAK! (Tiket QR Tersedia)
              </div>
              <p className="text-[11px] text-emerald-700">
                Segera ambil barang Anda di posko satpam sebelum batas retensi habis.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('my-claims')}
            className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-xl text-xs hover:bg-emerald-700 transition"
          >
            Buka Tiket QR &rarr;
          </button>
        </div>
      )}

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold">Tiket Siap Diambil</span>
            <QrCode className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">{readyClaims.length}</div>
          <p className="text-[10px] text-slate-500 mt-1">Disetujui BAAK & siap serah terima</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold">Klaim Sedang Diverifikasi</span>
            <Clock className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">{pendingClaims.length}</div>
          <p className="text-[10px] text-slate-500 mt-1">Menunggu review verifikator BAAK</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold">Laporan Kehilangan Saya</span>
            <FileText className="w-5 h-5 text-ug-purple" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">{myReports.length}</div>
          <p className="text-[10px] text-slate-500 mt-1">Dipantau oleh sistem radar UG</p>
        </div>
      </div>

      {/* Main Grid: My Active Claims & Recommended Items */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: My Claims Status List */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <h3 className="font-bold text-base text-slate-800">Riwayat Pengajuan Klaim Saya</h3>
            <button
              onClick={() => onNavigateTab('my-claims')}
              className="text-xs font-bold text-ug-purple hover:underline"
            >
              Lihat Detail &rarr;
            </button>
          </div>

          {myClaims.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-400">
              Anda belum memiliki riwayat pengajuan klaim.
            </div>
          ) : (
            <div className="space-y-3">
              {myClaims.map(claim => {
                const item = foundItems.find(i => i.id === claim.itemId);

                return (
                  <div key={claim.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex justify-between items-center">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 block">{claim.claimTicketQr}</span>
                      <div className="font-bold text-slate-800 text-xs">{item?.itemName}</div>
                      <div className="text-[10px] text-slate-500">Pos Pengambilan: {item?.storagePoint}</div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      claim.status === 'APPROVED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : claim.status === 'PENDING'
                        ? 'bg-amber-100 text-amber-800'
                        : claim.status === 'COMPLETED'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {claim.status === 'APPROVED' ? 'SIAP DIAMBIL' : claim.status}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Quick Search & Campus Bulletin */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-purple-50 p-5 rounded-2xl border border-purple-200 space-y-3">
            <div className="flex items-center gap-1.5 text-ug-purple font-bold text-xs">
              <Sparkles className="w-4 h-4 text-ug-gold" />
              <span>Panduan Mengambil Barang di Posko:</span>
            </div>
            <ol className="text-xs text-purple-900 space-y-2 list-decimal list-inside leading-relaxed">
              <li>Pastikan klaim Anda berstatus <strong>APPROVED</strong> di menu Tiket Saya.</li>
              <li>Datang ke Pos Satpam / Loket Lab sesuai yang tertera pada tiket.</li>
              <li>Tunjukkan <strong>QR Tiket</strong> dan <strong>KTM Asli</strong> kepada petugas posko.</li>
              <li>Buka kunci/PIN HP di depan petugas dan tandatangani BAST digital di layar posko.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};
