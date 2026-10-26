import React from 'react';
import { Search, Shield, GraduationCap, Building2, CheckCircle2, ArrowRight, MapPin, Sparkles, PhoneCall, Layers, QrCode } from 'lucide-react';
import { FoundItem, Role } from '../types';
import { CAMPUSES } from '../data/mockData';

interface PublicHomeProps {
  onOpenLogin: (role?: Role) => void;
  onExploreCatalog: () => void;
  onReportLost: () => void;
  foundItems: FoundItem[];
}

export const PublicHome: React.FC<PublicHomeProps> = ({
  onOpenLogin,
  onExploreCatalog,
  onReportLost,
  foundItems
}) => {
  const recentItems = foundItems.slice(0, 3);

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ug-purple via-purple-900 to-ug-purpleDark text-white p-8 sm:p-12 shadow-2xl">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 bg-[radial-gradient(#E5A93C_1.5px,transparent_1.5px)] [background-size:20px_20px] pointer-events-none"></div>

        <div className="max-w-3xl relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ug-gold/20 border border-ug-gold/40 text-ug-gold text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Sistem Informasi Resmi Terpadu Universitas Gunadarma
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Barang Hilang di Kampus? <br />
            <span className="text-ug-gold">Temukan & Ambil Kembali dengan Aman.</span>
          </h1>

          <p className="text-sm sm:text-base text-purple-200 leading-relaxed max-w-2xl">
            Layanan pelaporan dan pencarian barang tercecer di seluruh lingkungan kampus Gunadarma: Margonda (D), Kelapa Dua (E, G, H), Kalimalang (J1), dan Karawaci (K). Dilengkapi verifikasi ciri khusus (*anti-fraud*).
          </p>

          <div className="pt-4 flex flex-wrap gap-3">
            <button
              onClick={() => onOpenLogin('MAHASISWA')}
              className="px-6 py-3 rounded-xl bg-ug-gold hover:bg-amber-400 text-slate-950 text-xs sm:text-sm font-extrabold shadow-lg transition flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4" />
              Masuk Akun Mahasiswa
            </button>

            <button
              onClick={onExploreCatalog}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold backdrop-blur-md transition border border-white/20 flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              Lihat Katalog Temuan Bebas
            </button>
          </div>
        </div>

        {/* Live stats footer banner */}
        <div className="mt-8 pt-6 border-t border-purple-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-black text-ug-gold">100%</div>
            <div className="text-[11px] text-purple-200">Kerahasiaan Data Pemilik</div>
          </div>
          <div>
            <div className="text-2xl font-black text-white">6 Kampus</div>
            <div className="text-[11px] text-purple-200">Terintegrasi Terpusat</div>
          </div>
          <div>
            <div className="text-2xl font-black text-white">24 Jam</div>
            <div className="text-[11px] text-purple-200">Pengamanan Pos Satpam</div>
          </div>
          <div>
            <div className="text-2xl font-black text-ug-gold">BAST Digital</div>
            <div className="text-[11px] text-purple-200">Tanda Tangan & QR Resmi</div>
          </div>
        </div>
      </section>

      {/* 3 Dedicated Role Gateways (Homepages Access) */}
      <section className="space-y-4">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Pintu Masuk Sesuai Kebutuhan Anda
          </h2>
          <p className="text-xs text-slate-500">
            Setiap peran memiliki dasbor, alat kerja, dan kewenangan yang berbeda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Mahasiswa */}
          <div className="bg-white rounded-2xl p-6 border-2 border-purple-100 hover:border-ug-purple transition shadow-sm hover:shadow-md flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-ug-purple flex items-center justify-center">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Mahasiswa / Pemilik Barang</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cari barang Anda yang tertinggal di kelas, lab, atau kantin. Ajukan klaim kepemilikan dengan menjawab pertanyaan ciri rahasia dan terima Tiket QR.
              </p>
              <ul className="text-[11px] text-slate-500 space-y-1.5 pt-1">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Login SSO Studentsite Gunadarma</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Smart Reverse-Matching Radar</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Dapatkan Tiket QR Pengambilan</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => onOpenLogin('MAHASISWA')}
              className="w-full py-2.5 rounded-xl bg-ug-purple hover:bg-ug-purpleDark text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>Masuk Portal Mahasiswa</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: Petugas Pos Satpam */}
          <div className="bg-white rounded-2xl p-6 border-2 border-amber-100 hover:border-ug-gold transition shadow-sm hover:shadow-md flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Petugas Pos Satpam (Pusat Registrasi)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pusat resmi pelaporan dan penyimpanan barang temuan kampus. Satpam mendata barang hasil patroli posko maupun barang yang diserahkan (drop-off) oleh mahasiswa, aslab, dan dosen.
              </p>
              <ul className="text-[11px] text-slate-500 space-y-1.5 pt-1">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Form Resmi Input Temuan di Pos Satpam</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Manajemen Loker & Rak Pos Satpam</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Scan Tiket & Tanda Tangan BAST Digital</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => onOpenLogin('SATPAM')}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>Masuk Portal Pos Satpam</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: Admin BAAK */}
          <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-slate-800 transition shadow-sm hover:shadow-md flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Kemahasiswaan & BAAK</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Otoritas verifikasi klaim kepemilikan. Bandingkan jawaban rahasia mahasiswa dengan catatan satpam dan kelola barang lewat batas retensi.
              </p>
              <ul className="text-[11px] text-slate-500 space-y-1.5 pt-1">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Split-View Verifikasi Komparatif</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Persetujuan & Penerbitan Tiket QR</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Audit Disposisi & Donasi Baksos Kampus</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => onOpenLogin('ADMIN')}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>Masuk Portal Admin BAAK</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Recent Found Items Preview */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
        <div className="flex flex-wrap justify-between items-end gap-2 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Barang Temuan Terbaru di Kampus</h2>
            <p className="text-xs text-slate-500">
              Barang yang baru diserahkan ke posko satpam dan asisten lab hari ini.
            </p>
          </div>
          <button
            onClick={onExploreCatalog}
            className="text-xs font-bold text-ug-purple hover:underline flex items-center gap-1"
          >
            Lihat Semua Barang di Katalog <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentItems.map(item => (
            <div key={item.id} className="border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition flex flex-col justify-between">
              <div className="relative h-40 bg-slate-100">
                <img
                  src={item.photoUrl}
                  alt={item.itemName}
                  className={`w-full h-full object-cover ${item.isCensored ? 'blur-md' : ''}`}
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white shadow">
                  Tersimpan di Posko
                </span>
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-mono">
                  Kampus {item.campus}
                </span>
              </div>
              <div className="p-3.5 space-y-2">
                <span className="text-[10px] font-mono text-slate-400 block">{item.itemCode}</span>
                <h4 className="font-bold text-sm text-slate-800 line-clamp-1">{item.itemName}</h4>
                <p className="text-[11px] text-slate-500 line-clamp-2">{item.publicDescription}</p>
                <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-600">
                  <span>Pos: {item.storagePoint}</span>
                  <button
                    onClick={() => onOpenLogin('MAHASISWA')}
                    className="font-bold text-ug-purple hover:underline"
                  >
                    Klaim Barang &rarr;
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Posko Contact & Campus Locations */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md space-y-4">
        <div className="flex items-center gap-2">
          <PhoneCall className="w-5 h-5 text-ug-gold" />
          <h3 className="font-bold text-base">Posko Layanan Fisik di Seluruh Kampus Gunadarma</h3>
        </div>
        <p className="text-xs text-slate-400">
          Jika Anda menemukan barang di area kampus, segera serahkan ke pos satpam terdekat berikut:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          {CAMPUSES.map(c => (
            <div key={c.code} className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
              <span className="text-ug-gold font-bold block">Kampus {c.code}</span>
              <span className="text-slate-300 block font-medium">{c.name}</span>
              <span className="text-[10px] text-slate-500">{c.city}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
