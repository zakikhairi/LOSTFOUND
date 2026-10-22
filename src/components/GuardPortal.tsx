import React, { useState, useRef } from 'react';
import { QrCode, PlusCircle, CheckSquare, PackageCheck, AlertCircle, Search, Laptop, Building2, Camera } from 'lucide-react';
import { FoundItem, Claim, Role, CampusCode } from '../types';
import { CAMPUSES, CATEGORIES } from '../data/mockData';

interface GuardPortalProps {
  currentRole: Role;
  foundItems: FoundItem[];
  claims: Claim[];
  onAddNewItem: (item: FoundItem) => void;
  onCompleteHandover: (claimId: string, notes: string, signature: string) => void;
}

export const GuardPortal: React.FC<GuardPortalProps> = ({
  currentRole,
  foundItems,
  claims,
  onAddNewItem,
  onCompleteHandover
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'input' | 'handover' | 'lockers'>('handover');

  // Input Form States
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [campus, setCampus] = useState<CampusCode>(currentRole === 'ASLAB' ? 'H' : 'D');
  const [building, setBuilding] = useState('Gedung 2');
  const [specificSpot, setSpecificSpot] = useState('Selasar Lantai 2');
  const [areaType, setAreaType] = useState<'PUBLIC' | 'LAB'>(currentRole === 'ASLAB' ? 'LAB' : 'PUBLIC');
  const [labShift, setLabShift] = useState('Shift 2 (10:30 - 12:30)');
  const [labPcNumber, setLabPcNumber] = useState('PC-05');
  const [storagePoint, setStoragePoint] = useState(
    currentRole === 'ASLAB' ? 'Loket Ruang Asisten Lab TI Kampus H' : 'Pos Satpam Utama Kampus D'
  );
  const [lockerRackCode, setLockerRackCode] = useState('RAK-A / BOX-01');
  const [publicDescription, setPublicDescription] = useState('');
  const [secretFeatures, setSecretFeatures] = useState('');
  const [photoUrl, setPhotoUrl] = useState(
    'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80'
  );
  const [isCensored, setIsCensored] = useState(false);
  const [finderType, setFinderType] = useState<'SATPAM' | 'ASLAB' | 'MAHASISWA_DROPOFF'>(
    currentRole === 'ASLAB' ? 'ASLAB' : 'SATPAM'
  );
  const [finderName, setFinderName] = useState(currentRole === 'ASLAB' ? 'Fajar (Aslab)' : 'Bambang (Satpam)');
  const [inputSuccess, setInputSuccess] = useState(false);

  // Handover / QR Scan Simulation States
  const [scannedTicketCode, setScannedTicketCode] = useState('');
  const [selectedClaimForHandover, setSelectedClaimForHandover] = useState<Claim | null>(null);
  const [handoverNotes, setHandoverNotes] = useState('');
  const [pinVerified, setPinVerified] = useState(false);
  const [itemInspected, setItemInspected] = useState(false);

  // Canvas for Digital Signature
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  // Approved claims ready for physical pickup
  const approvedClaims = claims.filter(c => c.status === 'APPROVED');

  const handleStartDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.strokeStyle = '#1E293B';
    ctx.lineWidth = 2;
    ctx.stroke();
    setHasSignature(true);
  };

  const handleStopDraw = () => {
    setIsDrawing(false);
  };

  const handleClearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: FoundItem = {
      id: `item-${Date.now()}`,
      itemCode: `LNF-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
      itemName,
      category,
      campus,
      building,
      specificSpot,
      areaType,
      labShift: areaType === 'LAB' ? labShift : undefined,
      labPcNumber: areaType === 'LAB' ? labPcNumber : undefined,
      storagePoint,
      lockerRackCode,
      foundDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
      publicDescription,
      secretFeatures,
      photoUrl,
      isCensored: category.includes('Dokumen') || isCensored,
      status: 'SAVED',
      finderType,
      finderName,
      expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };

    onAddNewItem(newItem);
    setInputSuccess(true);
    setTimeout(() => {
      setInputSuccess(false);
      setItemName('');
      setPublicDescription('');
      setSecretFeatures('');
    }, 2500);
  };

  const handleSelectClaim = (claim: Claim) => {
    setSelectedClaimForHandover(claim);
    setScannedTicketCode(claim.claimTicketQr);
    setPinVerified(false);
    setItemInspected(false);
    setHasSignature(false);
  };

  const handleExecuteHandover = () => {
    if (!selectedClaimForHandover) return;
    const signatureData = canvasRef.current ? canvasRef.current.toDataURL() : 'Tanda Tangan Digital Terverifikasi';
    onCompleteHandover(selectedClaimForHandover.id, handoverNotes || 'Serah terima fisik berhasil & dicek bersama petugas.', signatureData);
    setSelectedClaimForHandover(null);
    setScannedTicketCode('');
  };

  return (
    <div className="space-y-6">
      {/* Header Guard Banner */}
      <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-md border-l-4 border-ug-gold flex flex-wrap justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-ug-gold text-slate-950 uppercase tracking-wider">
              {currentRole === 'ASLAB' ? 'Akses Asisten Lab' : 'Akses Pos Satpam Kampus'}
            </span>
            <span className="text-xs text-slate-400">ID Petugas: UG-OFFICER-009</span>
          </div>
          <h2 className="text-lg font-bold text-white mt-1">
            Portal Penanganan Fisik & Serah Terima Barang (Posko)
          </h2>
        </div>

        {/* Sub-tab navigation */}
        <div className="flex bg-slate-800 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveSubTab('handover')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              activeSubTab === 'handover' ? 'bg-ug-purple text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            <QrCode className="w-3.5 h-3.5 text-ug-gold" />
            Scan Tiket & BAST
            {approvedClaims.length > 0 && (
              <span className="bg-emerald-500 text-white text-[10px] px-1.5 py-0.2 rounded-full">
                {approvedClaims.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveSubTab('input')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              activeSubTab === 'input' ? 'bg-ug-purple text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5 text-ug-gold" />
            + Input Temuan Baru
          </button>

          <button
            onClick={() => setActiveSubTab('lockers')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              activeSubTab === 'lockers' ? 'bg-ug-purple text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            <PackageCheck className="w-3.5 h-3.5 text-ug-gold" />
            Daftar Rak / Loker
          </button>
        </div>
      </div>

      {/* Sub-tab 1: HANDOVER BAST DIGITAL & QR SCAN */}
      {activeSubTab === 'handover' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Scan & Claims Queue */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <QrCode className="w-4 h-4 text-ug-purple" />
                Simulasi Scanner QR Tiket Mahasiswa
              </h3>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ketik atau Scan QR Tiket (misal: UG-TICKET...)"
                  value={scannedTicketCode}
                  onChange={(e) => setScannedTicketCode(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono"
                />
              </div>

              <div className="pt-2 border-t border-slate-100">
                <span className="text-[11px] font-semibold text-slate-500 block mb-2">
                  Tiket yang Sudah Di-ACC Admin BAAK (Siap Diambil):
                </span>

                {approvedClaims.length === 0 ? (
                  <div className="bg-slate-50 p-4 rounded-xl text-center text-xs text-slate-400">
                    Tidak ada tiket klaim yang menunggu penyerahan saat ini.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {approvedClaims.map((claim) => {
                      const item = foundItems.find(i => i.id === claim.itemId);
                      const isSelected = selectedClaimForHandover?.id === claim.id;

                      return (
                        <div
                          key={claim.id}
                          onClick={() => handleSelectClaim(claim)}
                          className={`p-3 rounded-xl border text-xs cursor-pointer transition ${
                            isSelected
                              ? 'border-ug-purple bg-purple-50/50 shadow-sm'
                              : 'border-slate-200 bg-white hover:border-purple-200'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="font-mono text-[10px] text-ug-purple font-bold">
                                {claim.claimTicketQr}
                              </span>
                              <div className="font-bold text-slate-800">{claim.claimantName}</div>
                              <div className="text-[10px] text-slate-500">NPM: {claim.claimantNpm} ({claim.claimantMajor})</div>
                            </div>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              APPROVED BAAK
                            </span>
                          </div>
                          <div className="mt-2 text-[11px] text-slate-600 font-medium">
                            Barang: {item?.itemName}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            Lokasi Rak: {item?.lockerRackCode} ({item?.storagePoint})
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: BAST Digital Form */}
          <div className="lg:col-span-7">
            {selectedClaimForHandover ? (
              (() => {
                const item = foundItems.find(i => i.id === selectedClaimForHandover.itemId);

                return (
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                      <div>
                        <span className="text-[10px] font-bold text-ug-purple font-mono">BERITA ACARA DIGITAL (BAST)</span>
                        <h3 className="font-bold text-base text-slate-800">
                          Serah Terima Barang ke Mahasiswa
                        </h3>
                      </div>
                      <span className="font-mono text-xs font-bold bg-slate-100 px-2 py-1 rounded text-slate-700">
                        {selectedClaimForHandover.claimTicketQr}
                      </span>
                    </div>

                    {/* Item & Storage Box */}
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Nama Barang:</span>
                        <span className="font-bold text-slate-800">{item?.itemName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Posisi Rak Loker:</span>
                        <span className="font-mono font-bold text-ug-purple">{item?.lockerRackCode}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Penerima (Mahasiswa):</span>
                        <span className="font-bold text-slate-800">
                          {selectedClaimForHandover.claimantName} ({selectedClaimForHandover.claimantNpm})
                        </span>
                      </div>
                    </div>

                    {/* Step 1: Physical Check Checkboxes */}
                    <div className="space-y-2 pt-2">
                      <span className="text-xs font-bold text-slate-700 block">
                        Langkah Pemeriksaan Fisik di Posko:
                      </span>
                      <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={itemInspected}
                          onChange={(e) => setItemInspected(e.target.checked)}
                          className="rounded text-ug-purple"
                        />
                        <span>Pemeriksaan kondisi fisik barang telah dilakukan bersama mahasiswa.</span>
                      </label>
                      <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={pinVerified}
                          onChange={(e) => setPinVerified(e.target.checked)}
                          className="rounded text-ug-purple"
                        />
                        <span>Mahasiswa dapat membuka PIN / pola sandi / menyebutkan isi identitas di tempat.</span>
                      </label>
                    </div>

                    {/* Step 2: Digital Signature Canvas */}
                    <div className="space-y-1 pt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-700">
                          Tanda Tangan Mahasiswa Penerima:
                        </span>
                        <button
                          type="button"
                          onClick={handleClearSignature}
                          className="text-[11px] text-rose-600 hover:underline"
                        >
                          Hapus Tanda Tangan
                        </button>
                      </div>

                      <div className="border-2 border-dashed border-slate-300 rounded-xl overflow-hidden bg-slate-50">
                        <canvas
                          ref={canvasRef}
                          width={480}
                          height={120}
                          onMouseDown={handleStartDraw}
                          onMouseMove={handleDraw}
                          onMouseUp={handleStopDraw}
                          onMouseLeave={handleStopDraw}
                          className="w-full h-28 cursor-crosshair touch-none"
                        />
                      </div>
                      <span className="text-[10px] text-slate-400 block text-right">
                        *Gunakan mouse atau jari di layar sentuh untuk tanda tangan
                      </span>
                    </div>

                    {/* Step 3: Notes */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        Catatan Serah Terima Petugas
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Barang diserahkan lengkap dengan charger dan kabel."
                        value={handoverNotes}
                        onChange={(e) => setHandoverNotes(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                      />
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={handleExecuteHandover}
                      disabled={!itemInspected || !pinVerified}
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2"
                    >
                      <CheckSquare className="w-4 h-4" />
                      Selesaikan Serah Terima & Update Status "Sudah Diambil"
                    </button>
                  </div>
                );
              })()
            ) : (
              <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center text-slate-400 space-y-2">
                <QrCode className="w-12 h-12 mx-auto text-slate-300" />
                <h4 className="font-bold text-slate-700 text-sm">Pilih Tiket Mahasiswa</h4>
                <p className="text-xs max-w-sm mx-auto">
                  Pilih salah satu tiket klaim di sebelah kiri atau ketikkan kode QR untuk membuka lembar Berita Acara Serah Terima (BAST).
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sub-tab 2: INPUT TEMUAN BARU */}
      {activeSubTab === 'input' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm max-w-3xl mx-auto">
          <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-100">
            <PlusCircle className="w-5 h-5 text-ug-purple" />
            <div>
              <h3 className="font-bold text-base text-slate-800">Formulir Input Barang Temuan Baru</h3>
              <p className="text-xs text-slate-500">
                Data akan langsung terbit di katalog publik dan memicu label cetak QR Code loker.
              </p>
            </div>
          </div>

          {inputSuccess && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600" />
              <span>Barang berhasil disimpan! Kode registrasi dan label QR telah di-generate.</span>
            </div>
          )}

          <form onSubmit={handleSaveItem} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Barang *
                </label>
                <input
                  type="text"
                  placeholder="Misal: Flashdisk Kingston 32GB"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Kategori *
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
            </div>

            {/* Lokasi Fisik */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-700 block">
                Lokasi & Area Ditemukan:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-600 mb-1">Kampus</label>
                  <select
                    value={campus}
                    onChange={(e) => setCampus(e.target.value as CampusCode)}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg"
                  >
                    {CAMPUSES.map(c => (
                      <option key={c.code} value={c.code}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-600 mb-1">Gedung / Lantai</label>
                  <input
                    type="text"
                    value={building}
                    onChange={(e) => setBuilding(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg"
                    placeholder="Gedung 2 Lt 3"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-600 mb-1">Spot Spesifik</label>
                  <input
                    type="text"
                    value={specificSpot}
                    onChange={(e) => setSpecificSpot(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg"
                    placeholder="Selasar dekat toilet"
                    required
                  />
                </div>
              </div>

              {/* Tipe Area (Lab vs Public) */}
              <div className="pt-2 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                <div>
                  <label className="block text-[11px] text-slate-600 mb-1">Tipe Fasilitas</label>
                  <select
                    value={areaType}
                    onChange={(e) => setAreaType(e.target.value as 'PUBLIC' | 'LAB')}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg font-semibold"
                  >
                    <option value="PUBLIC">Area Publik Kampus</option>
                    <option value="LAB">Fasilitas Lab Terjadwal</option>
                  </select>
                </div>

                {areaType === 'LAB' && (
                  <>
                    <div>
                      <label className="block text-[11px] text-slate-600 mb-1">Shift Praktikum</label>
                      <input
                        type="text"
                        value={labShift}
                        onChange={(e) => setLabShift(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg"
                        placeholder="Shift 2 (10:30)"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-600 mb-1">Nomor PC / Meja</label>
                      <input
                        type="text"
                        value={labPcNumber}
                        onChange={(e) => setLabPcNumber(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg font-mono"
                        placeholder="PC-12"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Penyimpanan Rak */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Pos Tempat Barang Disimpan *
                </label>
                <input
                  type="text"
                  value={storagePoint}
                  onChange={(e) => setStoragePoint(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Kode Rak / Loker Fisik *
                </label>
                <input
                  type="text"
                  value={lockerRackCode}
                  onChange={(e) => setLockerRackCode(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono font-bold text-ug-purple"
                  placeholder="RAK-B / KOTAK-04"
                  required
                />
              </div>
            </div>

            {/* Public Description */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Deskripsi Umum (Boleh Dilihat Publik) *
              </label>
              <textarea
                rows={2}
                placeholder="Deskripsi fisik yang tampak dari luar tanpa membuka detail rahasia..."
                value={publicDescription}
                onChange={(e) => setPublicDescription(e.target.value)}
                className="w-full p-2.5 text-xs border border-slate-300 rounded-lg"
                required
              />
            </div>

            {/* Secret Features (Crucial for Anti-Fraud) */}
            <div className="bg-purple-50 p-3 rounded-xl border border-purple-200 space-y-1">
              <label className="block text-xs font-bold text-ug-purple">
                🔒 Ciri Khusus Rahasia (HANYA DILIHAT ADMIN & PENGUJI KLAIM) *
              </label>
              <p className="text-[11px] text-purple-700 leading-tight">
                Tuliskan ciri unik yang akan dijadikan soal ujian klaim untuk mahasiswa (misal: stiker di balik casing, isi saldo, nama folder, isi dompet).
              </p>
              <textarea
                rows={2}
                placeholder="Contoh: Di dalam dompet ada uang 75rb dan karcis parkir motor..."
                value={secretFeatures}
                onChange={(e) => setSecretFeatures(e.target.value)}
                className="w-full p-2.5 text-xs border border-purple-300 rounded-lg bg-white"
                required
              />
            </div>

            {/* Sensor checkbox */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="censor"
                checked={isCensored}
                onChange={(e) => setIsCensored(e.target.checked)}
                className="rounded text-ug-purple"
              />
              <label htmlFor="censor" className="text-xs text-slate-700 cursor-pointer">
                Sensor/Blur foto otomatis (Wajib untuk kartu identitas KTM/KTP atau barang berharga)
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-ug-purple hover:bg-ug-purpleDark text-white text-xs font-bold rounded-xl shadow-md transition"
            >
              Simpan Barang & Buat Label QR Loker
            </button>
          </form>
        </div>
      )}

      {/* Sub-tab 3: MANAJEMEN RAK & LOKER */}
      {activeSubTab === 'lockers' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-base text-slate-800">Daftar Barang Tersimpan di Posko</h3>
              <p className="text-xs text-slate-500">
                Memudahkan petugas shift berikutnya mengetahui posisi fisik barang di rak penyimpanan.
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 rounded-lg text-slate-700">
              Total: {foundItems.length} Barang
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase text-[10px]">
                  <th className="py-2.5 px-3">Kode Barang</th>
                  <th className="py-2.5 px-3">Nama Barang</th>
                  <th className="py-2.5 px-3">Lokasi Rak Loker</th>
                  <th className="py-2.5 px-3">Pos Simpan</th>
                  <th className="py-2.5 px-3">Tanggal Input</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {foundItems.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-3 font-mono font-bold text-ug-purple">{item.itemCode}</td>
                    <td className="py-3 px-3 font-semibold text-slate-800">{item.itemName}</td>
                    <td className="py-3 px-3 font-mono font-bold text-amber-700 bg-amber-50/50 rounded">
                      {item.lockerRackCode}
                    </td>
                    <td className="py-3 px-3 text-slate-600">{item.storagePoint}</td>
                    <td className="py-3 px-3 text-slate-500">{item.foundDate}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.status === 'SAVED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : item.status === 'IN_CLAIM_PROCESS'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
