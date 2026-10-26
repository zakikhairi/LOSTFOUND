import React, { useState } from 'react';
import { GraduationCap, Shield, Building2, KeyRound, ArrowLeft, Lock, Sparkles, CheckCircle2, AlertTriangle, X } from 'lucide-react';
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
  const [selectedPortal, setSelectedPortal] = useState<Role>(
    initialRoleTab === 'ADMIN' ? 'ADMIN' : initialRoleTab === 'SATPAM' ? 'SATPAM' : 'MAHASISWA'
  );

  // Form states
  const [npmInput, setNpmInput] = useState('50422910');
  const [passwordInput, setPasswordInput] = useState('studentsite123');

  const [officerIdInput, setOfficerIdInput] = useState('SEC-KAMPUS-D');
  const [officerPinInput, setOfficerPinInput] = useState('••••••');
  const [officerCampus, setOfficerCampus] = useState<CampusCode>('D');

  const [adminNipInput, setAdminNipInput] = useState('BAAK-PUSAT-01');
  const [adminPasswordInput, setAdminPasswordInput] = useState('••••••••');

  // Google SSO Modal states
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [customGoogleName, setCustomGoogleName] = useState('');
  const [customGoogleNpm, setCustomGoogleNpm] = useState('');
  const [googleError, setGoogleError] = useState<string | null>(null);

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
        name: officerCampus === 'E' ? 'Pak Suwarno' : 'Bambang Suherman',
        identifier: officerIdInput,
        role: 'SATPAM',
        majorOrDepartment: `Petugas Pos Satpam Kampus ${officerCampus}`,
        email: `satpam.k${officerCampus.toLowerCase()}@gunadarma.ac.id`,
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

  // Google SSO Handler
  const handleGoogleSelectAccount = (email: string, name: string, defaultNpm?: string) => {
    setGoogleError(null);
    if (!email.toLowerCase().endsWith('@student.gunadarma.ac.id')) {
      setGoogleError('Akses Ditolak! Harap gunakan akun resmi Google Universitas Gunadarma (@student.gunadarma.ac.id).');
      return;
    }

    // Extract NPM from email if exists (e.g. rizky.50422910@... or 50422910@...)
    const npmMatch = email.match(/\b(\d{8})\b/);
    const extractedNpm = defaultNpm || (npmMatch ? npmMatch[1] : '50422999');

    const studentUser: AuthUser = {
      id: `google-user-${Date.now()}`,
      name: name,
      identifier: extractedNpm,
      role: 'MAHASISWA',
      majorOrDepartment: 'Mahasiswa Aktif Universitas Gunadarma',
      email: email,
      campus: 'D'
    };

    setIsGoogleModalOpen(false);
    onLoginSuccess(studentUser);
  };

  const handleCustomGoogleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setGoogleError(null);

    const emailTrimmed = customGoogleEmail.trim().toLowerCase();
    if (!emailTrimmed.endsWith('@student.gunadarma.ac.id')) {
      setGoogleError('Domain email tidak valid! Wajib berakhiran @student.gunadarma.ac.id');
      return;
    }

    const npmMatch = emailTrimmed.match(/\b(\d{8})\b/) || customGoogleNpm.match(/\b(\d{8})\b/);
    const finalNpm = customGoogleNpm || (npmMatch ? npmMatch[1] : '50422999');

    const studentUser: AuthUser = {
      id: `google-user-${Date.now()}`,
      name: customGoogleName || 'Mahasiswa Gunadarma',
      identifier: finalNpm,
      role: 'MAHASISWA',
      majorOrDepartment: 'Mahasiswa Terverifikasi Google Workspace UG',
      email: emailTrimmed,
      campus: 'D'
    };

    setIsGoogleModalOpen(false);
    onLoginSuccess(studentUser);
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
                <div className="font-bold text-[11px] text-ug-gold">Pos Satpam D</div>
                <div className="text-[10px] text-purple-200">Bambang (Margonda)</div>
              </div>
            </button>

            <button
              onClick={() => handleQuickDemoLogin('satpamE')}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-left transition flex items-center gap-2 border border-white/10"
            >
              <span className="text-base">🛡️</span>
              <div>
                <div className="font-bold text-[11px] text-ug-gold">Pos Satpam E</div>
                <div className="text-[10px] text-purple-200">Pak Suwarno (KD)</div>
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
                selectedPortal === 'SATPAM'
                  ? 'bg-ug-purple text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Pos Satpam</span>
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
          {selectedPortal === 'MAHASISWA' ? (
            <div className="space-y-4">
              {/* Google SSO Button (PRIMARY) */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setIsGoogleModalOpen(true)}
                  className="w-full py-3 px-4 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition flex items-center justify-center gap-3 shadow-sm hover:shadow group"
                >
                  {/* Google 4-Color Icon */}
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span className="group-hover:text-ug-purple transition">
                    Masuk dengan Akun Kampus Google
                  </span>
                </button>

                <div className="p-2.5 bg-purple-50 rounded-xl border border-purple-100 text-[11px] text-ug-purple flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-ug-purple flex-shrink-0 mt-0.5" />
                  <span>
                    Khusus akun resmi <strong>@student.gunadarma.ac.id</strong>. Sistem otomatis mendeteksi nama dan NPM Anda.
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-3 text-[11px] text-slate-400 font-medium">
                  atau gunakan NPM Studentsite
                </span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              {/* Traditional NPM + Password Form */}
              <form onSubmit={handleManualSubmit} className="space-y-3">
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

                <button
                  type="submit"
                  className="w-full py-2.5 bg-ug-purple hover:bg-ug-purpleDark text-white text-xs font-bold rounded-xl shadow transition flex items-center justify-center gap-1.5"
                >
                  <KeyRound className="w-3.5 h-3.5 text-ug-gold" />
                  <span>Masuk dengan NPM</span>
                </button>
              </form>
            </div>
          ) : (
            <form onSubmit={handleManualSubmit} className="space-y-4">
              {/* 2. PORTAL PETUGAS POS SATPAM */}
              {selectedPortal === 'SATPAM' && (
                <>
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
                    <span className="font-bold flex items-center gap-1 text-xs">
                      <Shield className="w-3.5 h-3.5 text-amber-700" />
                      Pusat Pelaporan Temuan (Pos Satpam)
                    </span>
                    <span className="text-[11px] text-amber-800 block mt-0.5">
                      Hanya personil Pos Satpam yang berwenang mendata barang temuan dan mengelola rak penyimpanan fisik posko.
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        ID Petugas Satpam
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
                        Posko Kampus Jaga
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
                      PIN Jaga / Shift Satpam
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
                <span>Masuk ke Dashboard {selectedPortal === 'SATPAM' ? 'Pos Satpam' : selectedPortal}</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Google SSO Interactive Account Picker Modal */}
      {isGoogleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <div>
                  <h3 className="font-bold text-sm text-slate-800">Pilih Akun Kampus Google</h3>
                  <p className="text-[11px] text-slate-500">untuk melanjutkan ke Lost & Found Gunadarma</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsGoogleModalOpen(false);
                  setGoogleError(null);
                }}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Error Message if non-gunadarma domain */}
            {googleError && (
              <div className="mx-6 mt-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                <span>{googleError}</span>
              </div>
            )}

            {/* Account List */}
            <div className="p-6 space-y-4">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Pilih Akun Terdaftar (@student.gunadarma.ac.id):
              </span>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() =>
                    handleGoogleSelectAccount(
                      'rizky.50422910@student.gunadarma.ac.id',
                      'Rizky Maulana',
                      '50422910'
                    )
                  }
                  className="w-full p-3 rounded-2xl border border-slate-200 hover:border-ug-purple hover:bg-purple-50/50 transition text-left flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-ug-purple text-white font-bold flex items-center justify-center text-xs">
                      R
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-800 group-hover:text-ug-purple">
                        Rizky Maulana
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        rizky.50422910@student.gunadarma.ac.id
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-ug-purple bg-purple-100 px-2 py-0.5 rounded-full">
                    NPM: 50422910
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleGoogleSelectAccount(
                      'siti.11122844@student.gunadarma.ac.id',
                      'Siti Rahma',
                      '11122844'
                    )
                  }
                  className="w-full p-3 rounded-2xl border border-slate-200 hover:border-ug-purple hover:bg-purple-50/50 transition text-left flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center text-xs">
                      S
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-800 group-hover:text-ug-purple">
                        Siti Rahma
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        siti.11122844@student.gunadarma.ac.id
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                    NPM: 11122844
                  </span>
                </button>
              </div>

              {/* Or input your own real Gunadarma student email */}
              <div className="pt-3 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-600 block mb-2">
                  Atau Gunakan Email Kampus Anda Sendiri:
                </span>

                <form onSubmit={handleCustomGoogleLogin} className="space-y-2.5">
                  <input
                    type="email"
                    placeholder="nama.npm@student.gunadarma.ac.id"
                    value={customGoogleEmail}
                    onChange={(e) => setCustomGoogleEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-ug-purple"
                    required
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Nama Lengkap Anda"
                      value={customGoogleName}
                      onChange={(e) => setCustomGoogleName(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-xl"
                      required
                    />
                    <input
                      type="text"
                      placeholder="NPM (8 Digit)"
                      value={customGoogleNpm}
                      onChange={(e) => setCustomGoogleNpm(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-xl font-mono"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-ug-purple hover:bg-ug-purpleDark text-white text-xs font-bold rounded-xl shadow transition"
                  >
                    Verifikasi & Masuk Akun
                  </button>
                </form>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 text-[10px] text-slate-400 text-center">
              Login ini dilindungi oleh Google Workspace for Education domain Universitas Gunadarma.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
