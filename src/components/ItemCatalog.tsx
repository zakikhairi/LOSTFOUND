import React, { useState } from 'react';
import { Search, MapPin, Calendar, Clock, Eye, ShieldCheck, Filter, AlertCircle, Building2, Laptop } from 'lucide-react';
import { FoundItem, CampusCode } from '../types';
import { CAMPUSES, CATEGORIES } from '../data/mockData';

interface ItemCatalogProps {
  items: FoundItem[];
  onClaimItem: (item: FoundItem) => void;
}

export const ItemCatalog: React.FC<ItemCatalogProps> = ({ items, onClaimItem }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCampus, setSelectedCampus] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedAreaType, setSelectedAreaType] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  const filteredItems = items.filter(item => {
    const matchesSearch =
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.publicDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.building.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.itemCode.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCampus = selectedCampus === 'ALL' || item.campus === selectedCampus;
    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesAreaType = selectedAreaType === 'ALL' || item.areaType === selectedAreaType;
    const matchesStatus = selectedStatus === 'ALL' || item.status === selectedStatus;

    return matchesSearch && matchesCampus && matchesCategory && matchesAreaType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Hero Banner / Quick Search */}
      <div className="bg-gradient-to-r from-ug-purple via-purple-900 to-ug-purpleDark rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(#E5A93C_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ug-gold/20 border border-ug-gold/40 text-ug-gold text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            Sistem Resmi Terpadu Universitas Gunadarma
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Cari Barang Anda yang Tertinggal di Kampus
          </h1>
          <p className="mt-2 text-sm text-purple-200 leading-relaxed">
            Temukan barang hilang di Kampus D Margonda, Kelapa Dua (E, G, H), Kalimalang (J), maupun Karawaci (K). Dilengkapi fitur verifikasi kepemilikan yang aman.
          </p>

          {/* Search Bar Input */}
          <div className="mt-5 flex flex-col sm:flex-row gap-2">
            <div className="relative flex-grow">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari nama barang, laptop, tumbler, KTM, flashdisk..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-ug-gold text-sm shadow-md"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Selectors */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
        {/* Pilar Mode: Area Publik vs Fasilitas Khusus Lab */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-ug-purple" />
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Kategori Lokasi Temuan:
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedAreaType('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                selectedAreaType === 'ALL'
                  ? 'bg-ug-purple text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Semua Lokasi
            </button>
            <button
              onClick={() => setSelectedAreaType('LAB')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1 ${
                selectedAreaType === 'LAB'
                  ? 'bg-ug-purple text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              Fasilitas Lab & Shift Terjadwal
            </button>
            <button
              onClick={() => setSelectedAreaType('PUBLIC')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1 ${
                selectedAreaType === 'PUBLIC'
                  ? 'bg-ug-purple text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              Area Publik (Selasar, Kantin, Parkir)
            </button>
          </div>
        </div>

        {/* Dropdown Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">
              Unit Kampus UG
            </label>
            <select
              value={selectedCampus}
              onChange={(e) => setSelectedCampus(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ug-purple bg-slate-50"
            >
              <option value="ALL">Semua Kampus</option>
              {CAMPUSES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name} - {c.city}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">
              Kategori Barang
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ug-purple bg-slate-50"
            >
              <option value="ALL">Semua Kategori</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">
              Status Barang
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ug-purple bg-slate-50"
            >
              <option value="ALL">Semua Status</option>
              <option value="SAVED">Tersimpan di Posko (Dapat Diklaim)</option>
              <option value="IN_CLAIM_PROCESS">Dalam Proses Verifikasi Klaim</option>
              <option value="RETURNED">Sudah Diambil Pemilik</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center text-xs text-slate-500 px-1">
        <span>Menampilkan <strong>{filteredItems.length}</strong> barang temuan</span>
        <span>Data diupdate setiap pergantian shift satpam & asisten lab</span>
      </div>

      {/* Items Grid */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center border border-slate-200">
          <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700">Barang Tidak Ditemukan</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            Belum ada barang temuan yang sesuai dengan kata kunci atau filter ini. Silakan buat laporan kehilangan agar sistem dapat mencocokkan otomatis jika ditemukan nanti.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => {
            const campusObj = CAMPUSES.find(c => c.code === item.campus);

            return (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col"
              >
                {/* Photo Preview with Anti-Fraud Blur if Sensitive */}
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={item.photoUrl}
                    alt={item.itemName}
                    className={`w-full h-full object-cover ${
                      item.isCensored ? 'blur-md scale-105 filter' : ''
                    }`}
                  />
                  {item.isCensored && (
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-3 text-center">
                      <ShieldCheck className="w-8 h-8 text-ug-gold mb-1" />
                      <span className="text-xs font-bold">Foto Disensor Otomatis</span>
                      <span className="text-[10px] text-slate-200">
                        Untuk melindungi privasi identitas & mencegah klaim palsu
                      </span>
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className="absolute top-3 left-3">
                    {item.status === 'SAVED' && (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500 text-white shadow-sm flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                        Tersimpan di Posko
                      </span>
                    )}
                    {item.status === 'IN_CLAIM_PROCESS' && (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500 text-white shadow-sm">
                        Sedang Diverifikasi
                      </span>
                    )}
                    {item.status === 'RETURNED' && (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-600 text-white shadow-sm">
                        Sudah Diambil
                      </span>
                    )}
                  </div>

                  {/* Category Pill */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-slate-700 shadow-sm">
                    {item.category}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 flex-grow flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-1">
                      <span>{item.itemCode}</span>
                      <span className="flex items-center gap-1 text-slate-500">
                        <Clock className="w-3 h-3" />
                        {item.foundDate}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-800 text-base line-clamp-1">
                      {item.itemName}
                    </h3>

                    <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                      {item.publicDescription}
                    </p>
                  </div>

                  {/* Location Info Box */}
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-xs space-y-1.5">
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <MapPin className="w-3.5 h-3.5 text-ug-purple flex-shrink-0" />
                      <span className="font-semibold text-ug-purple">
                        {campusObj?.name || `Kampus ${item.campus}`}
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-600 truncate">{item.building}</span>
                    </div>

                    <div className="text-[11px] text-slate-500 pl-5">
                      Spot: <em>{item.specificSpot}</em>
                    </div>

                    {item.areaType === 'LAB' && (
                      <div className="pl-5 pt-1 text-[11px] text-indigo-700 font-medium flex items-center gap-1">
                        <Laptop className="w-3 h-3" />
                        <span>Log: {item.labShift} ({item.labPcNumber})</span>
                      </div>
                    )}

                    <div className="pt-1 border-t border-slate-200/60 text-[11px] text-slate-500 flex justify-between items-center">
                      <span>Titik Simpan:</span>
                      <span className="font-semibold text-slate-700">{item.storagePoint}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2">
                    {item.status === 'SAVED' ? (
                      <button
                        onClick={() => onClaimItem(item)}
                        className="w-full py-2 px-3 rounded-lg bg-ug-purple hover:bg-ug-purpleDark text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <ShieldCheck className="w-4 h-4 text-ug-gold" />
                        Ajukan Klaim Kepemilikan
                      </button>
                    ) : item.status === 'IN_CLAIM_PROCESS' ? (
                      <button
                        disabled
                        className="w-full py-2 px-3 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold cursor-not-allowed text-center"
                      >
                        Sedang Dalam Verifikasi Mahasiswa Lain
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-full py-2 px-3 rounded-lg bg-slate-100 text-slate-400 text-xs font-semibold cursor-not-allowed text-center"
                      >
                        Barang Telah Diserahkan
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
