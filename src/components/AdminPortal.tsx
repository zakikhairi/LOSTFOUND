import React, { useState } from 'react';
import { ShieldAlert, CheckCircle, XCircle, AlertCircle, Eye, Calendar, User, FileText, ArrowRight, HeartHandshake } from 'lucide-react';
import { Claim, FoundItem } from '../types';

interface AdminPortalProps {
  claims: Claim[];
  foundItems: FoundItem[];
  onApproveClaim: (claimId: string) => void;
  onRejectClaim: (claimId: string, reason: string) => void;
  onDisposeItem: (itemId: string) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  claims,
  foundItems,
  onApproveClaim,
  onRejectClaim,
  onDisposeItem
}) => {
  const [selectedClaimId, setSelectedClaimId] = useState<string | null>(
    claims.find(c => c.status === 'PENDING')?.id || (claims[0]?.id ?? null)
  );
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);

  const pendingClaims = claims.filter(c => c.status === 'PENDING');
  const selectedClaim = claims.find(c => c.id === selectedClaimId);
  const linkedItem = selectedClaim ? foundItems.find(i => i.id === selectedClaim.itemId) : null;

  // Items near or past expiry (for disposal demo)
  const expiredCandidateItems = foundItems.filter(i => i.status === 'SAVED');

  const handleConfirmReject = () => {
    if (!selectedClaimId || !rejectReason) return;
    onRejectClaim(selectedClaimId, rejectReason);
    setShowRejectModal(false);
    setRejectReason('');
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-950 to-ug-purple text-white p-5 rounded-2xl shadow-md border-l-4 border-ug-gold flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-ug-gold text-slate-900 uppercase">
              BIRO KEMAHASISWAAN & BAAK PUSAT
            </span>
            <span className="text-xs text-purple-200">Panel Pengambilan Keputusan Validasi</span>
          </div>
          <h2 className="text-lg font-bold text-white mt-1">
            Dashboard Approval Verifikasi Kepemilikan Barang
          </h2>
        </div>

        <div className="bg-purple-900/80 px-4 py-2 rounded-xl text-center border border-purple-700">
          <div className="text-2xl font-black text-ug-gold">{pendingClaims.length}</div>
          <div className="text-[10px] text-purple-200 uppercase font-semibold">Antrean Klaim Pending</div>
        </div>
      </div>

      {/* Main Split-View Verification */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Queue List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-2">
              Daftar Antrean Pengajuan ({claims.length})
            </h3>

            {claims.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400">
                Belum ada pengajuan klaim yang masuk.
              </div>
            ) : (
              <div className="space-y-2">
                {claims.map(claim => {
                  const item = foundItems.find(i => i.id === claim.itemId);
                  const isSelected = claim.id === selectedClaimId;

                  return (
                    <div
                      key={claim.id}
                      onClick={() => setSelectedClaimId(claim.id)}
                      className={`p-3 rounded-xl border text-xs cursor-pointer transition ${
                        isSelected
                          ? 'border-ug-purple bg-purple-50/70 shadow-sm'
                          : 'border-slate-200 bg-white hover:border-purple-200'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-slate-800">{claim.claimantName}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                          claim.status === 'PENDING'
                            ? 'bg-amber-100 text-amber-800'
                            : claim.status === 'APPROVED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : claim.status === 'COMPLETED'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}>
                          {claim.status}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">
                        NPM: <span className="font-mono">{claim.claimantNpm}</span>
                      </div>
                      <div className="text-[11px] font-semibold text-ug-purple mt-1 line-clamp-1">
                        Barang: {item?.itemName}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1 flex justify-between">
                        <span>{claim.appliedAt}</span>
                        <span className="font-bold text-slate-600">Kampus {item?.campus}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right: Detailed Split Comparison Screen */}
        <div className="lg:col-span-8">
          {selectedClaim && linkedItem ? (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
              {/* Header */}
              <div className="flex flex-wrap justify-between items-start gap-2 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-mono text-ug-purple font-bold block">
                    ID PENGAJUAN: {selectedClaim.id}
                  </span>
                  <h3 className="font-bold text-lg text-slate-800">
                    Verifikasi Komparasi: Mahasiswa vs Catatan Posko
                  </h3>
                  <span className="text-xs text-slate-500">
                    Diajukan pada {selectedClaim.appliedAt}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">Status Klaim Saat Ini:</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    selectedClaim.status === 'PENDING'
                      ? 'bg-amber-100 text-amber-800'
                      : selectedClaim.status === 'APPROVED'
                      ? 'bg-emerald-100 text-emerald-800'
                      : selectedClaim.status === 'COMPLETED'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}>
                    {selectedClaim.status}
                  </span>
                </div>
              </div>

              {/* Split Comparison Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Column 1: Posko Satpam Official Findings */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5 pb-2 border-b border-slate-200">
                    <span className="w-2 h-2 rounded-full bg-slate-600"></span>
                    CATATAN RESMI PETUGAS POSKO
                  </div>

                  <div className="text-xs space-y-1.5">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Barang:</span>
                      <strong className="text-slate-800">{linkedItem.itemName}</strong> ({linkedItem.itemCode})
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Lokasi Ditemukan:</span>
                      <span className="text-slate-700">
                        Kampus {linkedItem.campus} - {linkedItem.building} ({linkedItem.specificSpot})
                      </span>
                    </div>
                    {linkedItem.areaType === 'LAB' && (
                      <div>
                        <span className="text-[10px] text-slate-400 block">Log Lab:</span>
                        <span className="text-indigo-700 font-medium">
                          {linkedItem.labShift} | {linkedItem.labPcNumber}
                        </span>
                      </div>
                    )}
                    <div>
                      <span className="text-[10px] text-slate-400 block">Titik Simpan Fisik:</span>
                      <span className="text-slate-700 font-semibold">{linkedItem.storagePoint}</span> (Rak: {linkedItem.lockerRackCode})
                    </div>
                  </div>

                  {/* Crucial Secret Features by Guard */}
                  <div className="bg-amber-50/80 p-3 rounded-lg border border-amber-200 space-y-1">
                    <span className="text-[10px] font-bold text-amber-900 uppercase block">
                      🔒 CIRI RAHASIA DARI SATPAM (KUNCI JAWABAN):
                    </span>
                    <p className="text-xs text-amber-950 font-medium leading-relaxed">
                      "{linkedItem.secretFeatures}"
                    </p>
                  </div>
                </div>

                {/* Column 2: Student Claim Answer */}
                <div className="bg-purple-50/50 p-4 rounded-xl border border-purple-200 space-y-3">
                  <div className="text-xs font-bold text-ug-purple flex items-center gap-1.5 pb-2 border-b border-purple-200">
                    <span className="w-2 h-2 rounded-full bg-ug-purple"></span>
                    JAWABAN KLAIM MAHASISWA
                  </div>

                  <div className="text-xs space-y-1.5">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Identitas Mahasiswa:</span>
                      <strong className="text-slate-800">{selectedClaim.claimantName}</strong>
                      <span className="text-slate-500 block">NPM: {selectedClaim.claimantNpm} ({selectedClaim.claimantMajor})</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">WhatsApp:</span>
                      <span className="text-slate-700 font-mono">{selectedClaim.claimantPhone}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Dokumen Pendukung:</span>
                      <span className="text-slate-700">{selectedClaim.proofDocument}</span>
                    </div>
                  </div>

                  {/* Student Answer */}
                  <div className="bg-white p-3 rounded-lg border border-purple-200 space-y-1 shadow-xs">
                    <span className="text-[10px] font-bold text-ug-purple uppercase block">
                      📝 JAWABAN CIRI KHUSUS MAHASISWA:
                    </span>
                    <p className="text-xs text-slate-800 leading-relaxed italic">
                      "{selectedClaim.secretAnswer}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons for Verification */}
              {selectedClaim.status === 'PENDING' ? (
                <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                  <button
                    onClick={() => setShowRejectModal(true)}
                    className="px-4 py-2.5 rounded-xl border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <XCircle className="w-4 h-4" />
                    Tolak Klaim (Bukan Pemilik Sah)
                  </button>

                  <button
                    onClick={() => onApproveClaim(selectedClaim.id)}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition flex items-center gap-1.5"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Setujui Klaim & Terbitkan Tiket QR Mahasiswa
                  </button>
                </div>
              ) : (
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 flex justify-between items-center">
                  <span>
                    Pengajuan ini telah diproses dengan status: <strong>{selectedClaim.status}</strong>
                  </span>
                  <span className="font-mono text-[11px] text-slate-500">
                    Tiket: {selectedClaim.claimTicketQr}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center text-slate-400">
              Pilih salah satu klaim dari daftar antrean di sebelah kiri.
            </div>
          )}
        </div>
      </div>

      {/* Retention & Disposal Policy Monitor */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-ug-purple" />
            <div>
              <h3 className="font-bold text-sm text-slate-800">
                Audit Masa Simpan Barang (Disposal & Kebijakan Donasi)
              </h3>
              <p className="text-xs text-slate-500">
                Sesuai SOP, barang yang tidak diklaim lebih dari 60–90 hari dapat dialihkan untuk kegiatan donasi/baksos BEM Gunadarma.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {expiredCandidateItems.map(item => (
            <div key={item.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs space-y-2">
              <div className="flex justify-between items-start">
                <span className="font-bold text-slate-800">{item.itemName}</span>
                <span className="text-[10px] text-slate-500 font-mono">Batas: {item.expiryDate}</span>
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-1">{item.publicDescription}</p>
              <div className="flex justify-between items-center pt-1 border-t border-slate-200">
                <span className="text-[10px] text-slate-600">Pos: {item.storagePoint}</span>
                <button
                  onClick={() => onDisposeItem(item.id)}
                  className="text-[10px] font-bold text-rose-600 hover:underline"
                >
                  Alihkan ke Donasi Sosial
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rejection Reason Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h4 className="font-bold text-base text-slate-800">Alasan Penolakan Klaim</h4>
            <p className="text-xs text-slate-500">
              Alasan ini akan otomatis dikirimkan ke mahasiswa pemohon melalui notifikasi.
            </p>

            <textarea
              rows={3}
              placeholder="Contoh: Ciri rahasia yang Anda sebutkan tidak sesuai dengan catatan fisik barang pada posko."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full p-3 text-xs border border-slate-300 rounded-xl"
              required
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowRejectModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmReject}
                disabled={!rejectReason}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 disabled:opacity-50 rounded-lg"
              >
                Kirim Penolakan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
