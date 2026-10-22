import React from 'react';
import { QrCode, CheckCircle2, Clock, AlertCircle, MapPin, ShieldCheck, ArrowRight } from 'lucide-react';
import { Claim, FoundItem } from '../types';

interface MyClaimsViewProps {
  claims: Claim[];
  foundItems: FoundItem[];
  onOpenCatalog: () => void;
}

export const MyClaimsView: React.FC<MyClaimsViewProps> = ({
  claims,
  foundItems,
  onOpenCatalog
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Status Klaim & Tiket Pengambilan Saya</h2>
          <p className="text-xs text-slate-500 mt-1">
            Pantau status verifikasi BAAK dan tunjukkan QR Tiket ini ke posko saat mengambil barang.
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs font-bold text-ug-purple block">Rizky Maulana</span>
          <span className="text-[10px] text-slate-400 font-mono">NPM: 50422910</span>
        </div>
      </div>

      {claims.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
          <AlertCircle className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-700 text-base">Belum Ada Klaim Aktif</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Anda belum mengajukan klaim kepemilikan untuk barang apa pun. Buka katalog untuk mencari barang Anda yang hilang.
          </p>
          <button
            onClick={onOpenCatalog}
            className="px-4 py-2 bg-ug-purple text-white text-xs font-bold rounded-lg shadow-sm"
          >
            Buka Katalog Barang Temuan
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {claims.map((claim) => {
            const item = foundItems.find((i) => i.id === claim.itemId);

            return (
              <div
                key={claim.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
              >
                {/* Header status bar */}
                <div
                  className={`px-5 py-3 text-xs font-bold flex justify-between items-center ${
                    claim.status === 'APPROVED'
                      ? 'bg-emerald-50 text-emerald-800 border-b border-emerald-100'
                      : claim.status === 'PENDING'
                      ? 'bg-amber-50 text-amber-800 border-b border-amber-100'
                      : claim.status === 'COMPLETED'
                      ? 'bg-blue-50 text-blue-800 border-b border-blue-100'
                      : 'bg-rose-50 text-rose-800 border-b border-rose-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {claim.status === 'APPROVED' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    {claim.status === 'PENDING' && <Clock className="w-4 h-4 text-amber-600 animate-spin" />}
                    {claim.status === 'COMPLETED' && <ShieldCheck className="w-4 h-4 text-blue-600" />}
                    <span>
                      {claim.status === 'APPROVED' && 'KLAIM DISETUJUI BAAK - SIAP DIAMBIL'}
                      {claim.status === 'PENDING' && 'MENUNGGU VERIFIKASI ADMIN BAAK'}
                      {claim.status === 'COMPLETED' && 'BARANG TELAH SELESAI DIAMBIL'}
                      {claim.status === 'REJECTED' && 'KLAIM DITOLAK (BUKTI TIDAK COCOK)'}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-slate-500">
                    Diajukan: {claim.appliedAt}
                  </span>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* Left Column: Item Details */}
                  <div className="md:col-span-7 space-y-3">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 block">
                        {item?.itemCode}
                      </span>
                      <h3 className="font-bold text-base text-slate-800">{item?.itemName}</h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                        {item?.publicDescription}
                      </p>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-700">
                        <MapPin className="w-3.5 h-3.5 text-ug-purple" />
                        <span className="font-semibold text-ug-purple">
                          Lokasi Posko Pengambilan:
                        </span>
                        <span>{item?.storagePoint}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 pl-5">
                        Posisi Rak: <span className="font-mono font-bold text-slate-700">{item?.lockerRackCode}</span>
                      </div>
                    </div>

                    {claim.rejectionReason && (
                      <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 space-y-1">
                        <span className="font-bold block">Alasan Penolakan dari Admin:</span>
                        <p className="text-[11px]">{claim.rejectionReason}</p>
                      </div>
                    )}

                    {claim.handoverNotes && (
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-800 space-y-1">
                        <span className="font-bold block">Catatan BAST Petugas:</span>
                        <p className="text-[11px]">{claim.handoverNotes}</p>
                      </div>
                    )}
                  </div>

                  {/* Right Column: QR Ticket Card (If Approved) */}
                  <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    {claim.status === 'APPROVED' ? (
                      <div className="text-center space-y-2 w-full">
                        <span className="text-[10px] font-bold text-ug-purple uppercase tracking-wider block">
                          TIKET PENGAMBILAN RESMI
                        </span>
                        
                        {/* Simulated QR Code Graphic */}
                        <div className="w-36 h-36 bg-white p-2 rounded-xl border-2 border-ug-purple mx-auto shadow-sm flex flex-col items-center justify-center relative">
                          <QrCode className="w-28 h-28 text-slate-900" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="bg-ug-gold text-ug-purple text-[8px] font-black px-1.5 py-0.5 rounded shadow">
                              UG
                            </span>
                          </div>
                        </div>

                        <span className="font-mono font-bold text-xs text-slate-800 block">
                          {claim.claimTicketQr}
                        </span>

                        <p className="text-[10px] text-slate-500 leading-tight">
                          Tunjukkan QR ini beserta <strong>KTM Asli</strong> ke satpam di posko untuk serah terima fisik.
                        </p>
                      </div>
                    ) : claim.status === 'COMPLETED' ? (
                      <div className="text-center space-y-2 py-4">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                          <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-bold text-slate-800 block">
                          Serah Terima Selesai
                        </span>
                        <span className="text-[10px] text-slate-400">
                          Barang telah dikembalikan kepada Anda secara sah.
                        </span>
                      </div>
                    ) : (
                      <div className="text-center space-y-2 py-6 text-slate-400">
                        <Clock className="w-10 h-10 mx-auto text-amber-400" />
                        <span className="text-xs font-semibold block text-slate-600">
                          Menunggu Review
                        </span>
                        <p className="text-[10px] text-slate-400 max-w-[180px]">
                          Admin BAAK sedang memeriksa kesesuaian ciri khusus Anda.
                        </p>
                      </div>
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
