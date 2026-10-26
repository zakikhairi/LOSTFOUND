import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { PublicHome } from './components/PublicHome';
import { StudentDashboard } from './components/StudentDashboard';
import { ItemCatalog } from './components/ItemCatalog';
import { ClaimModal } from './components/ClaimModal';
import { LostReportForm } from './components/LostReportForm';
import { GuardPortal } from './components/GuardPortal';
import { AdminPortal } from './components/AdminPortal';
import { MyClaimsView } from './components/MyClaimsView';
import { LoginPage } from './components/LoginPage';
import { api } from './services/api';

import { AuthUser, Role, FoundItem, Claim, LostReport } from './types';
import { INITIAL_FOUND_ITEMS, INITIAL_CLAIMS, INITIAL_LOST_REPORTS } from './data/mockData';

export function App() {
  // Authentication State
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [loginRoleTarget, setLoginRoleTarget] = useState<Role>('MAHASISWA');

  // Navigation State (defaults to 'public-home' for guests)
  const [activeTab, setActiveTab] = useState<string>('public-home');

  // Application Data States
  const [foundItems, setFoundItems] = useState<FoundItem[]>(INITIAL_FOUND_ITEMS);
  const [claims, setClaims] = useState<Claim[]>(INITIAL_CLAIMS);
  const [lostReports, setLostReports] = useState<LostReport[]>(INITIAL_LOST_REPORTS);

  // Sync with Neon PostgreSQL API on mount
  useEffect(() => {
    api.fetchItems().then(items => {
      if (items && items.length > 0) setFoundItems(items);
    });
    api.fetchClaims().then(cls => {
      if (cls && cls.length > 0) setClaims(cls);
    });
    api.fetchReports().then(reps => {
      if (reps && reps.length > 0) setLostReports(reps);
    });
  }, []);

  // Modal State
  const [selectedItemForClaim, setSelectedItemForClaim] = useState<FoundItem | null>(null);

  // Auth Handlers
  const handleOpenLogin = (role: Role = 'MAHASISWA') => {
    setLoginRoleTarget(role);
    setIsLoginModalOpen(true);
  };

  const handleLoginSuccess = (user: AuthUser) => {
    setCurrentUser(user);
    setIsLoginModalOpen(false);

    // Redirect to the role's dedicated homepage
    if (user.role === 'MAHASISWA') {
      setActiveTab('student-dash');
    } else if (user.role === 'SATPAM') {
      setActiveTab('guard-portal');
    } else if (user.role === 'ADMIN') {
      setActiveTab('admin-portal');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('public-home');
  };

  // Claim Handlers
  const handleClaimItem = (item: FoundItem) => {
    if (!currentUser) {
      // Prompt login first if guest tries to claim
      handleOpenLogin('MAHASISWA');
      return;
    }
    setSelectedItemForClaim(item);
  };

  const handleSubmitClaim = (newClaim: Claim) => {
    setClaims(prev => [newClaim, ...prev]);
    setFoundItems(prev =>
      prev.map(item =>
        item.id === newClaim.itemId ? { ...item, status: 'IN_CLAIM_PROCESS' } : item
      )
    );
    api.createClaim(newClaim);
  };

  const handleAddNewItem = (newItem: FoundItem) => {
    setFoundItems(prev => [newItem, ...prev]);
    api.createItem(newItem);
  };

  const handleApproveClaim = (claimId: string) => {
    setClaims(prev =>
      prev.map(claim =>
        claim.id === claimId ? { ...claim, status: 'APPROVED' } : claim
      )
    );
    api.updateClaimStatus(claimId, 'APPROVE');
  };

  const handleRejectClaim = (claimId: string, reason: string) => {
    const claim = claims.find(c => c.id === claimId);
    setClaims(prev =>
      prev.map(c =>
        c.id === claimId ? { ...c, status: 'REJECTED', rejectionReason: reason } : c
      )
    );
    if (claim) {
      setFoundItems(prev =>
        prev.map(item =>
          item.id === claim.itemId ? { ...item, status: 'SAVED' } : item
        )
      );
    }
    api.updateClaimStatus(claimId, 'REJECT', { rejectionReason: reason });
  };

  const handleCompleteHandover = (claimId: string, notes: string, signature: string) => {
    const claim = claims.find(c => c.id === claimId);
    const completedAt = new Date().toISOString().replace('T', ' ').substring(0, 16);
    setClaims(prev =>
      prev.map(c =>
        c.id === claimId
          ? {
              ...c,
              status: 'COMPLETED',
              handoverNotes: notes,
              signatureUrl: signature,
              completedAt
            }
          : c
      )
    );
    if (claim) {
      setFoundItems(prev =>
        prev.map(item =>
          item.id === claim.itemId ? { ...item, status: 'RETURNED' } : item
        )
      );
    }
    api.updateClaimStatus(claimId, 'HANDOVER', { handoverNotes: notes, signatureUrl: signature, completedAt });
  };

  const handleDisposeItem = (itemId: string) => {
    setFoundItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, status: 'DISPOSED_DONATED' } : item
      )
    );
  };

  const handleSubmitReport = (report: LostReport) => {
    setLostReports(prev => [report, ...prev]);
    api.createReport(report);
  };

  const pendingClaimsCount = claims.filter(c => c.status === 'PENDING').length;

  // Render Full Login Screen if toggled
  if (isLoginModalOpen) {
    return (
      <LoginPage
        onLoginSuccess={handleLoginSuccess}
        onCancel={() => setIsLoginModalOpen(false)}
        initialRoleTab={loginRoleTarget}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Navigation Bar with dynamic role tabs & logout */}
      <Navbar
        currentUser={currentUser}
        onOpenLogin={handleOpenLogin}
        onLogout={handleLogout}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pendingClaimsCount={pendingClaimsCount}
      />

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* 1. PUBLIC HOMEPAGE (Before Login) */}
        {activeTab === 'public-home' && (
          <PublicHome
            onOpenLogin={handleOpenLogin}
            onExploreCatalog={() => setActiveTab('catalog')}
            onReportLost={() => {
              if (!currentUser) {
                handleOpenLogin('MAHASISWA');
              } else {
                setActiveTab('report-lost');
              }
            }}
            foundItems={foundItems}
          />
        )}

        {/* 2. DEDICATED STUDENT HOMEPAGE (After Mahasiswa Login) */}
        {activeTab === 'student-dash' && currentUser && currentUser.role === 'MAHASISWA' && (
          <StudentDashboard
            user={currentUser}
            claims={claims}
            foundItems={foundItems}
            lostReports={lostReports}
            onNavigateTab={setActiveTab}
            onClaimItem={handleClaimItem}
          />
        )}

        {/* 3. CATALOG OF FOUND ITEMS (Accessible to public & users) */}
        {activeTab === 'catalog' && (
          <ItemCatalog
            items={foundItems}
            onClaimItem={handleClaimItem}
          />
        )}

        {/* 4. REPORT LOST ITEM (Requires student auth) */}
        {activeTab === 'report-lost' && (
          <LostReportForm
            foundItems={foundItems}
            onSubmitReport={handleSubmitReport}
            onClaimItem={handleClaimItem}
          />
        )}

        {/* 5. GUARD & ASLAB OPERATIONAL PORTAL */}
        {activeTab === 'guard-portal' && (
          <GuardPortal
            currentRole={currentUser ? currentUser.role : 'SATPAM'}
            foundItems={foundItems}
            claims={claims}
            onAddNewItem={handleAddNewItem}
            onCompleteHandover={handleCompleteHandover}
          />
        )}

        {/* 6. ADMIN BAAK EXECUTIVE DECISION PORTAL */}
        {activeTab === 'admin-portal' && (
          <AdminPortal
            claims={claims}
            foundItems={foundItems}
            onApproveClaim={handleApproveClaim}
            onRejectClaim={handleRejectClaim}
            onDisposeItem={handleDisposeItem}
          />
        )}

        {/* 7. MY CLAIMS & OFFICIAL QR TICKETS */}
        {activeTab === 'my-claims' && (
          <MyClaimsView
            claims={claims}
            foundItems={foundItems}
            onOpenCatalog={() => setActiveTab('catalog')}
          />
        )}
      </main>

      {/* Claim Modal Drawer */}
      <ClaimModal
        item={selectedItemForClaim}
        onClose={() => setSelectedItemForClaim(null)}
        onSubmitClaim={handleSubmitClaim}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p className="font-semibold text-slate-700">
            Sistem Informasi Lost and Found Terpadu © {new Date().getFullYear()} Universitas Gunadarma
          </p>
          <p className="text-[11px] text-slate-400">
            Meliputi Kampus D (Margonda), Kampus E, G, H (Kelapa Dua), Kampus J (Kalimalang), dan Kampus K (Karawaci).
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
