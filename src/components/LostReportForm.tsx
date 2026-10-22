import React, { useState, useMemo } from 'react';
import { FileText, Sparkles, CheckCircle2, AlertTriangle, MapPin, Calendar, Clock, ArrowRight } from 'lucide-react';
import { LostReport, FoundItem, CampusCode } from '../types';
import { CAMPUSES, CATEGORIES } from '../data/mockData';
import { calculateMatchScore } from '../utils/matching';

interface LostReportFormProps {
  foundItems: FoundItem[];
  onSubmitReport: (report: LostReport) => void;
  onClaimItem: (item: FoundItem) => void;
}

export const LostReportForm: React.FC<LostReportFormProps> = ({
  foundItems,
  onSubmitReport,
  onClaimItem
}) => {
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [campus, setCampus] = useState<CampusCode>('D');
  const [building, setBuilding] = useState('');
  const [color, setColor] = useState('');
  const [lostDate, setLostDate] = useState('2026-10-21');
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Real-time reverse matching
  const matchingCandidates = useMemo(() => {
    if (!itemName && !description) return [];

    const dummyReport: Partial<LostReport> = {
      itemName,
      category,
      campus,
      color,
      lostDate,
      description
    };

    return foundItems
      .map(item => ({
        item,
        score: calculateMatchScore(dummyReport, item)
      }))
      .filter(entry => entry.score >= 40)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [itemName, category, campus, color, lostDate, description, foundItems]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName || !building) return;

    const newReport: LostReport = {
      id: `rep-${Date.now()}`,
      reporterName: 'Rizky Maulana',
      reporterNpm: '50422910',
      itemName,
      category,
      campus,
      building,
      color,
      lostDate,
      description,
      status: matchingCandidates.length > 0 && matchingCandidates[0].score >= 70 ? 'MATCHED' : 'OPEN',
      matchedItemId: matchingCandidates.length > 0 && matchingCandidates[0].score >= 70 ? matchingCandidates[0].item.id : undefined,
      matchScore: matchingCandidates.length > 0 ? matchingCandidates[0].score : undefined
    };

    onSubmitReport(newReport);
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2.5 text-ug-purple font-bold text-lg">
          <FileText className="w-6 h-6 text-ug-gold" />
          <span>Buat Laporan Kehilangan Barang (Smart Reverse-Matching)</span>
        </div>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
          Belum menemukan barang Anda di katalog? Isi formulir di bawah ini. Sistem cerdas Gunadarma akan secara otomatis membandingkan laporan Anda dengan data barang temuan satpam di masa sekarang maupun di masa mendatang.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input Form */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h3 className="font-bold text-base text-slate-800">Laporan Kehilangan Terdaftar!</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Laporan Anda dengan kode <strong>UG-REP-{Date.now().toString().slice(-6)}</strong> telah aktif. Jika ada petugas yang menginput barang dengan ciri serupa, Anda akan mendapatkan notifikasi.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setItemName('');
                  setDescription('');
                }}
                className="mt-4 px-4 py-2 bg-ug-purple text-white text-xs font-bold rounded-lg shadow-sm"
              >
                Buat Laporan Lain
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Barang yang Hilang *
                </label>
                <input
                  type="text"
                  placeholder="Misal: Flashdisk SanDisk / Dompet Kulit Braun Buffel / Tumbler Kuning"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-ug-purple"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kategori Barang
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-slate-50"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Warna Utama
                  </label>
                  <input
                    type="text"
                    placeholder="Misal: Hitam, Abu-abu, Kuning"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kampus Lokasi Hilang
                  </label>
                  <select
                    value={campus}
                    onChange={(e) => setCampus(e.target.value as CampusCode)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-slate-50"
                  >
                    {CAMPUSES.map(c => (
                      <option key={c.code} value={c.code}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Gedung / Ruang / Area Terakhir Ingat *
                  </label>
                  <input
                    type="text"
                    placeholder="Misal: Lab TI 2, Musholla Lt 2, Kantin"
                    value={building}
                    onChange={(e) => setBuilding(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Perkiraan Tanggal Kehilangan
                </label>
                <input
                  type="date"
                  value={lostDate}
                  onChange={(e) => setLostDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-slate-50"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Deskripsi & Kronologi Singkat
                </label>
                <textarea
                  rows={3}
                  placeholder="Ceritakan detail barang, perkiraan jam kehilangan, atau ciri yang mudah dikenali..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 text-xs border border-slate-300 rounded-lg"
                />
              </div>

              <button
                type="submit"
                disabled={!itemName || !building}
                className="w-full py-3 bg-ug-purple hover:bg-ug-purpleDark text-white text-xs font-bold rounded-xl shadow-md transition disabled:opacity-50"
              >
                Kirim Laporan Kehilangan
              </button>
            </form>
          )}
        </div>

        {/* Right: Real-time Reverse Match Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm mb-2">
              <Sparkles className="w-4 h-4 text-ug-gold" />
              <span>Live Smart-Matching Radar</span>
            </div>
            <p className="text-[11px] text-amber-800 leading-relaxed mb-4">
              Sistem secara otomatis menghitung kecocokan dengan data temuan yang sudah ada di posko satpam seluruh kampus:
            </p>

            {matchingCandidates.length === 0 ? (
              <div className="bg-white/80 rounded-xl p-4 text-center border border-amber-100 text-xs text-slate-500">
                Ketik nama barang dan pilih kampus di formulir untuk melihat hasil radar pencocokan langsung.
              </div>
            ) : (
              <div className="space-y-3">
                {matchingCandidates.map(({ item, score }) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl p-3.5 border border-amber-200 shadow-xs hover:border-ug-purple transition space-y-2"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 block">{item.itemCode}</span>
                        <h4 className="font-bold text-slate-800 text-xs">{item.itemName}</h4>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          score >= 70
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}
                      >
                        Kecocokan {score}%
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-600 line-clamp-1">
                      {item.publicDescription}
                    </div>

                    <div className="flex justify-between items-center text-[10px] text-slate-500 pt-1 border-t border-slate-100">
                      <span>Pos: {item.storagePoint}</span>
                      <button
                        type="button"
                        onClick={() => onClaimItem(item)}
                        className="text-ug-purple font-bold hover:underline flex items-center gap-1"
                      >
                        Klaim Barang Ini <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
