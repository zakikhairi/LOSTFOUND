import React, { useState } from 'react';
import { X, ShieldCheck, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';
import { FoundItem, Claim } from '../types';

interface ClaimModalProps {
  item: FoundItem | null;
  onClose: () => void;
  onSubmitClaim: (newClaim: Claim) => void;
}

export const ClaimModal: React.FC<ClaimModalProps> = ({ item, onClose, onSubmitClaim }) => {
  const [claimantName, setClaimantName] = useState('Rizky Maulana');
  const [claimantNpm, setClaimantNpm] = useState('50422910');
  const [claimantMajor, setClaimantMajor] = useState('Teknik Informatika');
  const [claimantPhone, setClaimantPhone] = useState('081298765432');
  const [secretAnswer, setSecretAnswer] = useState('');
  const [proofDocument, setProofDocument] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!item) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!secretAnswer || !agreed) return;

    const newClaim: Claim = {
      id: `claim-${Date.now()}`,
      itemId: item.id,
      claimantName,
      claimantNpm,
      claimantMajor,
      claimantPhone,
      secretAnswer,
      proofDocument: proofDocument || 'KRS Semester Berjalan (Terverifikasi SSO Studentsite)',
      status: 'PENDING',
      appliedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      claimTicketQr: `UG-TICKET-${claimantNpm}-${item.itemCode.split('-')[2]}`
    };

    onSubmitClaim(newClaim);
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-ug-purple text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-ug-gold" />
            <h2 className="text-base font-bold">Formulir Klaim Kepemilikan Barang</h2>
          </div>
          <button
            onClick={onClose}
            className="text-purple-200 hover:text-white p-1 rounded-lg hover:bg-purple-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">Klaim Berhasil Diajukan!</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Pengajuan klaim untuk barang <strong>{item.itemName}</strong> ({item.itemCode}) telah masuk ke antrean verifikasi Admin BAAK / Kemahasiswaan Gunadarma.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-left text-xs space-y-1">
              <div className="text-slate-500 font-medium">Langkah selanjutnya:</div>
              <p className="text-slate-700">1. Admin akan membandingkan jawaban rahasia Anda dengan catatan fisik petugas.</p>
              <p className="text-slate-700">2. Jika disetujui, Anda akan menerima <strong>QR Tiket Pengambilan</strong> di tab "Status Klaim Saya".</p>
              <p className="text-slate-700">3. Tunjukkan tiket tersebut ke petugas di: <strong>{item.storagePoint}</strong>.</p>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-ug-purple text-white text-xs font-bold hover:bg-ug-purpleDark transition shadow-sm"
            >
              Tutup & Lihat Status Klaim
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            {/* Item Summary Box */}
            <div className="bg-purple-50 border border-purple-100 rounded-xl p-3 text-xs flex items-center justify-between">
              <div>
                <span className="font-mono text-[10px] text-ug-purple font-bold block">{item.itemCode}</span>
                <span className="font-bold text-slate-800 text-sm">{item.itemName}</span>
                <span className="text-slate-500 block text-[11px]">
                  Ditemukan di Kampus {item.campus} ({item.building})
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Pos Pengambilan:</span>
                <span className="text-xs font-bold text-slate-700">{item.storagePoint}</span>
              </div>
            </div>

            {/* Student Info */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Nama Mahasiswa
                </label>
                <input
                  type="text"
                  value={claimantName}
                  onChange={(e) => setClaimantName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-slate-50"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  NPM (Studentsite)
                </label>
                <input
                  type="text"
                  value={claimantNpm}
                  onChange={(e) => setClaimantNpm(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-slate-50 font-mono"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Fakultas / Jurusan
                </label>
                <input
                  type="text"
                  value={claimantMajor}
                  onChange={(e) => setClaimantMajor(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-slate-50"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Nomor WhatsApp Aktif
                </label>
                <input
                  type="tel"
                  value={claimantPhone}
                  onChange={(e) => setClaimantPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-slate-50"
                  required
                />
              </div>
            </div>

            {/* Blind Validation Section */}
            <div className="border-t border-slate-200 pt-3 space-y-2">
              <div className="flex items-center gap-1.5 text-ug-purple font-bold text-xs">
                <ShieldCheck className="w-4 h-4 text-ug-gold" />
                Pertanyaan Validasi Rahasia (Anti-Klaim Palsu)
              </div>
              <p className="text-[11px] text-slate-500 leading-normal">
                Sebutkan ciri khusus yang <strong>tidak disebutkan di deskripsi umum</strong> (misal: isi folder/file penting, stiker tersembunyi, wallpaper layar, atau nominal uang/kartu di dalamnya).
              </p>

              <textarea
                rows={3}
                placeholder="Contoh: Ada stiker karakter di sudut laptop / nama folder skripsi saya adalah... / ada uang receh di kantong depan..."
                value={secretAnswer}
                onChange={(e) => setSecretAnswer(e.target.value)}
                className="w-full p-3 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ug-purple"
                required
              />
            </div>

            {/* Proof Document */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Keterangan Dokumen Bukti (Opsional / Lampiran)
              </label>
              <input
                type="text"
                placeholder="Misal: KRS mata kuliah di ruangan tersebut / Dusbox / Nota beli"
                value={proofDocument}
                onChange={(e) => setProofDocument(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
              />
            </div>

            {/* Statement Agreement */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2 text-xs text-amber-800">
              <input
                type="checkbox"
                id="agree"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 rounded text-ug-purple focus:ring-ug-purple"
                required
              />
              <label htmlFor="agree" className="text-[11px] leading-relaxed cursor-pointer">
                Saya menyatakan dengan sadar bahwa barang ini adalah milik saya secara sah. Pengajuan klaim palsu akan dikenakan sanksi tata tertib mahasiswa Universitas Gunadarma.
              </label>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={!secretAnswer || !agreed}
                className="px-5 py-2 text-xs font-bold text-white bg-ug-purple hover:bg-ug-purpleDark disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-sm transition"
              >
                Kirim Pengajuan Klaim
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
