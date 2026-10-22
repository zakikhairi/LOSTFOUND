import React, { useState } from 'react';
import { GraduationCap, Shield, Building2, KeyRound, ArrowLeft, CheckCircle2, Lock, Sparkles, UserCheck } from 'lucide-react';
import { AuthUser, Role, CampusCode } from '../types';
import { MOCK_USERS } from '../data/mockUsers';
import { CAMPUSES } from '../data/mockData';

interface LoginPageProps {
  onLoginSuccess: (user: AuthUser) => void;
  onCancel: () => void;
  initialRoleTab?: Role;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onCancel,
  initialRoleTab = 'MAHASISWA'
}) => {
  const [selectedPortal, setSelectedPortal] = useState<Role>(initialRoleTab);

  // Form states
  const [npmInput, setNpmInput] = useState('50422910');
  const [passwordInput, setPasswordInput] = useState('studentsite123');

  const [officerIdInput, setOfficerIdInput] = useState('SEC-KAMPUS-D');
  const [officerPinInput, setOfficerPinInput] = useState('••••••');
  const [officerCampus, setOfficerCampus] = useState<CampusCode>('D');

  const [adminNipInput, setAdminNipInput] = useState('BAAK-PUSAT-01');
  const [adminPasswordInput, setAdminPasswordInput] = useState('••••••••');

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPortal === 'MAHASISWA') {
      const user: AuthUser = {
        id: `user-mhs-${Date.now()}`,
        name: npmInput === '11122844' ? 'Siti Rahma' : 'Rizky Maulana',
        identifier: npmInput,
        role: 'MAHASISWA',
        majorOrDepartment: 'Teknik Informatika (3IA01)',
        email: `${npmInput}@student.gunadarma.ac.id`,
        campus: 'D'
      };
      onLoginSuccess(user);
    } else if (selectedPortal === 'SATPAM') {
      const user: AuthUser = {
        id: `user-satpam-${Date.now()}`,
        name: officerCampus === 'E' ? 'Suwarno' : 'Bambang Suherman',
        identifier: officerIdInput,
        role: 'SATPAM',
        majorOrDepartment: `Komandan Regu Posko Satpam Kampus ${officerCampus}`,
        email: `security.k${officerCampus.toLowerCase()}@gunadarma.ac.id`,
        campus: officerCampus
      };
      onLoginSuccess(user);
    } else if (selectedPortal === 'ASLAB') {
      const user: AuthUser = {
        id: `user-aslab-${Date.now()}`,
        name: 'Fajar Kurniawan',
        identifier: officerIdInput,
        role: 'ASLAB',
        majorOrDepartment: `Asisten Laboratorium TI (Kampus ${officerCampus})`,
        email: 'aslab.ti@staff.gunadarma.ac.id',
        campus: officerCampus
      };
      onLoginSuccess(user);
    } else {
      const user: AuthUser = {
        id: `user-admin-${Date.now()}`,
        name: 'Dra. Sarah Wijaya, M.M.',
        identifier: adminNipInput,
        role: 'ADMIN',
        majorOrDepartment: 'Biro Kemahasiswaan & BAAK Pusat',
        email: 'sarah.wijaya@gunadarma.ac.id',
        campus: 'D'
      };
      onLoginSuccess(user);
    }
  };

  const handleQuickDemoLogin = (key: keyof typeof MOCK_USERS) => {
    onLoginSuccess(MOCK_USERS[key]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-ug-purpleDark to-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-ug-purple/30 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-ug-gold/20 blur-3xl pointer-events-none"></div>

      {/* Top back button */}
      <div className="max-w-md w-full mx-auto px-4 mb-4">
        <button
          onClick={onCancel}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-200 hover:text-white transition bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Kembali ke Beranda Publik
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center px-4">
        {/* UG Logo Badge */}
        <div className="w-14 h-14 rounded-2xl bg-ug-gold flex items-center justify-center font-black text-ug-purple text-2xl shadow-xl mx-auto border-2 border-amber-200 mb-3">
          UG
        </div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">
          Portal Masuk Terpadu
        </h2>
        <p className="mt-1 text-xs text-purple-200">
          Lost & Found System — Universitas Gunadarma
        </p>
      </div>

      {/* Quick 1-Click Demo Login Box */}
      <div className="mt-6 max-w-md w-full mx-auto px-4">
        <div className="bg-purple-950/70 border border-purple-500/30 rounded-2xl p-3.5 backdrop-blur-md shadow-lg">
          <div className="flex items-center gap-1.5 text-ug-gold text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AKSES CEPAT DEMO (1-KLIK LOGIN):</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleQuickDemoLogin('mahasiswa')}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-left transition flex items-center gap-2 border border-white/10"
            >
              <span className="text-base">🎓</span>
              <div>
                <div className="font-bold text-[11px] text-ug-gold">Mahasiswa</div>
                <div className="text-[10px] text-purple-200">Rizky (50422910)</div>
              </div>
            </button>

            <button
              onClick={() => handleQuickDemoLogin('satpam')}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-left transition flex items-center gap-2 border border-white/10"
            >
              <span className="text-base">🛡️</span>
              <div>
                <div className="font-bold text-[11px] text-ug-gold">Satpam Posko</div>
                <div className="text-[10px] text-purple-200">Bambang (Kampus D)</div>
              </div>
            </button>

            <button
              onClick={() => handleQuickDemoLogin('aslab')}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-left transition flex items-center gap-2 border border-white/10"
            >
              <span className="text-base">💻</span>
              <div>
                <div className="font-bold text-[11px] text-ug-gold">Asisten Lab</div>
                <div className="text-[10px] text-purple-200">Fajar (Lab TI H)</div>
              </div>
            </button>

            <button
              onClick={() => handleQuickDemoLogin('admin')}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-left transition flex items-center gap-2 border border-white/10"
            >
              <span className="text-base">🏛️</span>
              <div>
                <div className="font-bold text-[11px] text-ug-gold">Admin BAAK</div>
                <div className="text-[10px] text-purple-200">Sarah (Verifikator)</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-6 px-6 sm:px-8 shadow-2xl rounded-2xl border border-slate-200">
          {/* Portal Tabs Selector */}
          <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-xl mb-6">
            <button
              type="button"
              onClick={() => setSelectedPortal('MAHASISWA')}
              className={`py-2 px-1 text-xs font-bold rounded-lg transition flex flex-col items-center gap-1 ${
                selectedPortal === 'MAHASISWA'
                  ? 'bg-ug-purple text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Mahasiswa</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedPortal('SATPAM')}
              className={`py-2 px-1 text-xs font-bold rounded-lg transition flex flex-col items-center gap-1 ${
                selectedPortal === 'SATPAM' || selectedPortal === 'ASLAB'
                  ? 'bg-ug-purple text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Petugas Posko</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedPortal('ADMIN')}
              className={`py-2 px-1 text-xs font-bold rounded-lg transition flex flex-col items-center gap-1 ${
                selectedPortal === 'ADMIN'
                  ? 'bg-ug-purple text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Admin BAAK</span>
            </button>
          </div>

          {/* Form specific per role */}
          <form onSubmit={handleManualSubmit} className="space-y-4">
            {/* 1. PORTAL MAHASISWA */}
            {selectedPortal === 'MAHASISWA' && (
              <>
                <div className="p-3 bg-purple-50 rounded-xl border border-purple-100 text-xs text-ug-purple">
                  <span className="font-bold block">SSO Studentsite Gunadarma</span>
                  <span className="text-[11px] text-purple-700">
                    Masuk dengan akun mahasiswa aktif untuk klaim barang & lapor kehilangan.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    NPM (Nomor Pokok Mahasiswa)
                  </label>
                  <input
                    type="text"
                    value={npmInput}
                    onChange={(e) => setNpmInput(e.target.value)}
                    placeholder="Contoh: 50422910"
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl font-mono focus:ring-2 focus:ring-ug-purple focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Password Studentsite
                  </label>
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-ug-purple focus:outline-none"
                    required
                  />
                </div>
              </>
            )}

            {/* 2. PORTAL PETUGAS POSKO (SATPAM & ASLAB) */}
            {(selectedPortal === 'SATPAM' || selectedPortal === 'ASLAB') && (
              <>
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
                  <span className="font-bold block">Otoritas Petugas Lapangan</span>
                  <span className="text-[11px] text-amber-800">
                    Khusus personil keamanan posko & asisten laboratorium bertugas.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Jenis Tugas Lapangan
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPortal('SATPAM');
                        setOfficerIdInput('SEC-KAMPUS-D');
                        setOfficerCampus('D');
                      }}
                      className={`py-1.5 px-2 rounded-lg text-xs font-semibold border ${
                        selectedPortal === 'SATPAM'
                          ? 'border-ug-purple bg-purple-50 text-ug-purple'
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      🛡️ Satpam Posko
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPortal('ASLAB');
                        setOfficerIdInput('ASLAB-TI-08');
                        setOfficerCampus('H');
                      }}
                      className={`py-1.5 px-2 rounded-lg text-xs font-semibold border ${
                        selectedPortal === 'ASLAB'
                          ? 'border-ug-purple bg-purple-50 text-ug-purple'
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      💻 Asisten Lab
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      ID Petugas
                    </label>
                    <input
                      type="text"
                      value={officerIdInput}
                      onChange={(e) => setOfficerIdInput(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl font-mono"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Penempatan Kampus
                    </label>
                    <select
                      value={officerCampus}
                      onChange={(e) => setOfficerCampus(e.target.value as CampusCode)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-slate-50 font-semibold"
                    >
                      {CAMPUSES.map(c => (
                        <option key={c.code} value={c.code}>Kampus {c.code}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    PIN Jaga / Shift
                  </label>
                  <input
                    type="password"
                    value={officerPinInput}
                    onChange={(e) => setOfficerPinInput(e.target.value)}
                    placeholder="••••••"
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl"
                    required
                  />
                </div>
              </>
            )}

            {/* 3. PORTAL ADMIN BAAK */}
            {selectedPortal === 'ADMIN' && (
              <>
                <div className="p-3 bg-rose-50 rounded-xl border border-rose-100 text-xs text-rose-900">
                  <span className="font-bold block flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-rose-600" />
                    Akses Otoritas BAAK & Kemahasiswaan
                  </span>
                  <span className="text-[11px] text-rose-700">
                    Panel verifikasi klaim kepemilikan dan disposisi barang kampus.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    NIP / Akun Staff Kemahasiswaan
                  </label>
                  <input
                    type="text"
                    value={adminNipInput}
                    onChange={(e) => setAdminNipInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Password Otoritas
                  </label>
                  <input
                    type="password"
                    value={adminPasswordInput}
                    onChange={(e) => setAdminPasswordInput(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl"
                    required
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full mt-4 py-3 bg-ug-purple hover:bg-ug-purpleDark text-white text-xs font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-1.5"
            >
              <KeyRound className="w-4 h-4 text-ug-gold" />
              <span>Masuk ke Dashboard {selectedPortal}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
