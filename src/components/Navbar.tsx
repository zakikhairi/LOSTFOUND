import React from 'react';
import { Search, ShieldAlert, UserCheck, Layers, FileText, LogOut, LogIn, LayoutDashboard, User } from 'lucide-react';
import { AuthUser, Role } from '../types';

interface NavbarProps {
  currentUser: AuthUser | null;
  onOpenLogin: (role?: Role) => void;
  onLogout: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  pendingClaimsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onOpenLogin,
  onLogout,
  activeTab,
  setActiveTab,
  pendingClaimsCount
}) => {
  return (
    <header className="sticky top-0 z-50 bg-ug-purple text-white shadow-lg border-b-2 border-ug-gold">
      {/* Top Banner (User Session Status or Guest Info) */}
      <div className="bg-ug-purpleDark px-4 py-1.5 text-xs flex flex-wrap justify-between items-center border-b border-purple-900/50">
        <div className="flex items-center space-x-2 text-purple-200">
          <span className="font-semibold text-ug-gold">UNIVERSITAS GUNADARMA</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">Pusat Informasi & Pelayanan Lost and Found Terpadu</span>
        </div>

        <div className="flex items-center space-x-2">
          {currentUser ? (
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-purple-200">
                Masuk sebagai: <strong className="text-ug-gold">{currentUser.name}</strong> ({currentUser.role})
              </span>
              <button
                onClick={onLogout}
                className="px-2.5 py-0.5 rounded-full bg-rose-600/80 hover:bg-rose-600 text-white font-bold text-[10px] transition flex items-center gap-1"
                title="Keluar dari akun ini"
              >
                <LogOut className="w-3 h-3" />
                Keluar
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-purple-300">Belum masuk akun?</span>
              <button
                onClick={() => onOpenLogin('MAHASISWA')}
                className="px-2.5 py-0.5 rounded-full bg-ug-gold text-slate-950 font-bold text-[10px] hover:bg-amber-400 transition flex items-center gap-1"
              >
                <LogIn className="w-3 h-3" />
                Masuk Akun
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo & Identity */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => setActiveTab(currentUser ? (currentUser.role === 'MAHASISWA' ? 'student-dash' : currentUser.role === 'ADMIN' ? 'admin-portal' : 'guard-portal') : 'public-home')}
          >
            <div className="w-10 h-10 rounded-lg bg-ug-gold flex items-center justify-center font-black text-ug-purple text-xl shadow-md border border-amber-200">
              UG
            </div>
            <div>
              <div className="text-base font-extrabold tracking-tight text-white flex items-center gap-1.5">
                LOST & FOUND <span className="text-ug-gold text-sm font-semibold">GUNADARMA</span>
              </div>
              <p className="text-[11px] text-purple-200 font-medium">
                {currentUser ? `Portal ${currentUser.role}` : 'Sistem Penyelamatan Barang Tertinggal'}
              </p>
            </div>
          </div>

          {/* Navigation Links depending on user role */}
          <nav className="hidden md:flex space-x-1 items-center">
            {/* PUBLIC NAVIGATION (NOT LOGGED IN) */}
            {!currentUser && (
              <>
                <button
                  onClick={() => setActiveTab('public-home')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    activeTab === 'public-home'
                      ? 'bg-ug-purpleDark text-ug-gold border border-purple-800'
                      : 'text-purple-100 hover:bg-purple-800/60'
                  }`}
                >
                  Beranda
                </button>
                <button
                  onClick={() => setActiveTab('catalog')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                    activeTab === 'catalog'
                      ? 'bg-ug-purpleDark text-ug-gold border border-purple-800'
                      : 'text-purple-100 hover:bg-purple-800/60'
                  }`}
                >
                  <Search className="w-4 h-4" />
                  Katalog Temuan Publik
                </button>
                <button
                  onClick={() => onOpenLogin('MAHASISWA')}
                  className="ml-2 px-4 py-2 bg-ug-gold text-slate-950 font-bold rounded-xl text-xs hover:bg-amber-400 transition shadow-md flex items-center gap-1.5"
                >
                  <LogIn className="w-4 h-4" />
                  Masuk Portal Mahasiswa
                </button>
              </>
            )}

            {/* MAHASISWA LOGGED IN */}
            {currentUser && currentUser.role === 'MAHASISWA' && (
              <>
                <button
                  onClick={() => setActiveTab('student-dash')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                    activeTab === 'student-dash'
                      ? 'bg-ug-purpleDark text-ug-gold border border-purple-800'
                      : 'text-purple-100 hover:bg-purple-800/60'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard Saya
                </button>

                <button
                  onClick={() => setActiveTab('catalog')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                    activeTab === 'catalog'
                      ? 'bg-ug-purpleDark text-ug-gold border border-purple-800'
                      : 'text-purple-100 hover:bg-purple-800/60'
                  }`}
                >
                  <Search className="w-4 h-4" />
                  Cari di Katalog
                </button>

                <button
                  onClick={() => setActiveTab('report-lost')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                    activeTab === 'report-lost'
                      ? 'bg-ug-purpleDark text-ug-gold border border-purple-800'
                      : 'text-purple-100 hover:bg-purple-800/60'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  Lapor Kehilangan
                </button>

                <button
                  onClick={() => setActiveTab('my-claims')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                    activeTab === 'my-claims'
                      ? 'bg-ug-purpleDark text-ug-gold border border-purple-800'
                      : 'text-purple-100 hover:bg-purple-800/60'
                  }`}
                >
                  <UserCheck className="w-4 h-4" />
                  Tiket Klaim Saya
                </button>
              </>
            )}

            {/* SATPAM & ASLAB LOGGED IN */}
            {currentUser && (currentUser.role === 'SATPAM' || currentUser.role === 'ASLAB') && (
              <>
                <button
                  onClick={() => setActiveTab('guard-portal')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                    activeTab === 'guard-portal'
                      ? 'bg-ug-purpleDark text-ug-gold border border-purple-800'
                      : 'text-purple-100 hover:bg-purple-800/60'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  Portal Posko Jaga
                </button>

                <button
                  onClick={() => setActiveTab('catalog')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                    activeTab === 'catalog'
                      ? 'bg-ug-purpleDark text-ug-gold border border-purple-800'
                      : 'text-purple-100 hover:bg-purple-800/60'
                  }`}
                >
                  <Search className="w-4 h-4" />
                  Katalog Barang Posko
                </button>
              </>
            )}

            {/* ADMIN BAAK LOGGED IN */}
            {currentUser && currentUser.role === 'ADMIN' && (
              <>
                <button
                  onClick={() => setActiveTab('admin-portal')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                    activeTab === 'admin-portal'
                      ? 'bg-ug-purpleDark text-ug-gold border border-purple-800'
                      : 'text-purple-100 hover:bg-purple-800/60'
                  }`}
                >
                  <ShieldAlert className="w-4 h-4" />
                  Verifikasi Klaim BAAK
                  {pendingClaimsCount > 0 && (
                    <span className="bg-rose-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                      {pendingClaimsCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('guard-portal')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                    activeTab === 'guard-portal'
                      ? 'bg-ug-purpleDark text-ug-gold border border-purple-800'
                      : 'text-purple-100 hover:bg-purple-800/60'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  Monitoring Posko
                </button>

                <button
                  onClick={() => setActiveTab('catalog')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                    activeTab === 'catalog'
                      ? 'bg-ug-purpleDark text-ug-gold border border-purple-800'
                      : 'text-purple-100 hover:bg-purple-800/60'
                  }`}
                >
                  <Search className="w-4 h-4" />
                  Katalog Semua Kampus
                </button>
              </>
            )}
          </nav>

          {/* User profile / Login pill */}
          <div className="flex items-center space-x-3">
            {currentUser ? (
              <div className="flex items-center gap-2">
                <div className="text-right hidden sm:block">
                  <div className="text-xs font-semibold text-white">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-ug-gold font-medium uppercase tracking-wider">
                    {currentUser.identifier}
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-ug-purpleDark border border-ug-gold flex items-center justify-center font-bold text-xs text-ug-gold shadow-sm">
                  {currentUser.name.charAt(0)}
                </div>
              </div>
            ) : (
              <button
                onClick={() => onOpenLogin('MAHASISWA')}
                className="px-3 py-1.5 rounded-lg bg-ug-gold text-slate-950 font-bold text-xs hover:bg-amber-400 transition shadow-sm flex items-center gap-1"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Masuk</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
