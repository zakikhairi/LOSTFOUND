export type Role = 'MAHASISWA' | 'SATPAM' | 'ASLAB' | 'ADMIN';

export type ItemStatus = 'SAVED' | 'IN_CLAIM_PROCESS' | 'RETURNED' | 'DISPOSED_DONATED';

export type CampusCode = 'D' | 'E' | 'G' | 'H' | 'J1' | 'K';

export interface AuthUser {
  id: string;
  name: string;
  identifier: string; // NPM untuk mahasiswa, NIP/ID untuk Petugas/Admin
  role: Role;
  campus?: CampusCode;
  majorOrDepartment?: string;
  email: string;
}

export interface Campus {
  code: CampusCode;
  name: string;
  city: string;
}

export interface FoundItem {
  id: string;
  itemCode: string;
  itemName: string;
  category: string;
  campus: CampusCode;
  building: string;
  specificSpot: string;
  areaType: 'PUBLIC' | 'LAB' | 'CLASSROOM';
  labShift?: string;
  labPcNumber?: string;
  storagePoint: string;
  lockerRackCode: string;
  foundDate: string;
  publicDescription: string;
  secretFeatures: string; // Detail rahasia untuk blind-validation
  photoUrl: string;
  isCensored: boolean;
  status: ItemStatus;
  finderType: 'SATPAM' | 'ASLAB' | 'MAHASISWA_DROPOFF';
  finderName: string;
  finderNpm?: string;
  expiryDate: string;
}

export interface Claim {
  id: string;
  itemId: string;
  claimantName: string;
  claimantNpm: string;
  claimantMajor: string;
  claimantPhone: string;
  secretAnswer: string;
  proofDocument: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED';
  appliedAt: string;
  claimTicketQr: string;
  rejectionReason?: string;
  signatureUrl?: string;
  handoverNotes?: string;
  completedAt?: string;
}

export interface LostReport {
  id: string;
  reporterName: string;
  reporterNpm: string;
  itemName: string;
  category: string;
  campus: CampusCode;
  building: string;
  color: string;
  lostDate: string;
  description: string;
  status: 'OPEN' | 'MATCHED' | 'RESOLVED';
  matchedItemId?: string;
  matchScore?: number;
}
