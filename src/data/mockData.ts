import { Campus, FoundItem, Claim, LostReport } from '../types';

export const CAMPUSES: Campus[] = [
  { code: 'D', name: 'Kampus D (Margonda)', city: 'Depok' },
  { code: 'E', name: 'Kampus E (Kelapa Dua)', city: 'Depok' },
  { code: 'G', name: 'Kampus G (Kelapa Dua)', city: 'Depok' },
  { code: 'H', name: 'Kampus H (Kelapa Dua)', city: 'Depok' },
  { code: 'J1', name: 'Kampus J1 (Kalimalang)', city: 'Bekasi' },
  { code: 'K', name: 'Kampus K (Karawaci)', city: 'Tangerang' },
];

export const CATEGORIES = [
  'Elektronik & Gadget',
  'Dokumen, KTM & Dompet',
  'Aksesoris & Pakaian',
  'Botol Minum & Wadah',
  'Buku & Alat Tulis',
  'Kunci & Kendaraan'
];

export const INITIAL_FOUND_ITEMS: FoundItem[] = [
  {
    id: 'item-1',
    itemCode: 'LNF-202610-0041',
    itemName: 'Laptop Asus Vivobook 14 inch',
    category: 'Elektronik & Gadget',
    campus: 'D',
    building: 'Gedung 2',
    specificSpot: 'Selasar Lantai 3 Depan Ruang D32',
    areaType: 'PUBLIC',
    storagePoint: 'Pos Satpam Utama Kampus D',
    lockerRackCode: 'RAK-B / BOX-02',
    foundDate: '2026-10-21 13:40',
    publicDescription: 'Laptop warna abu-abu gelap metalik dalam tas jinjing hitam. Kondisi bersih dan mulus.',
    secretFeatures: 'Stiker logo Python di pojok kanan cover belakang. Wallpaper lockscreen foto pemandangan pantai biru.',
    photoUrl: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&auto=format&fit=crop&q=80',
    isCensored: false,
    status: 'IN_CLAIM_PROCESS',
    finderType: 'MAHASISWA_DROPOFF',
    finderName: 'Dimas Aditya',
    finderNpm: '51421008',
    expiryDate: '2027-01-21'
  },
  {
    id: 'item-2',
    itemCode: 'LNF-202610-0042',
    itemName: 'Kartu Tanda Mahasiswa (KTM) Gunadarma',
    category: 'Dokumen, KTM & Dompet',
    campus: 'E',
    building: 'Gedung 5',
    specificSpot: 'Kantin Belakang Kampus E',
    areaType: 'PUBLIC',
    storagePoint: 'Pos Satpam Kampus E',
    lockerRackCode: 'RAK-A / DOKUMEN-08',
    foundDate: '2026-10-21 11:15',
    publicDescription: 'KTM Universitas Gunadarma angkatan 2023 Jurusan Sistem Informasi. Dilengkapi tali lanyard warna ungu.',
    secretFeatures: 'Nama Mahasiswa: Arya Pratama, NPM: 10123491. Ada stiker hologram di belakang kartu.',
    photoUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
    isCensored: true, // Auto-blur for privacy!
    status: 'SAVED',
    finderType: 'SATPAM_PATROL',
    finderName: 'Pak Suwarno (Satpam E)',
    expiryDate: '2026-12-21'
  },
  {
    id: 'item-3',
    itemCode: 'LNF-202610-0043',
    itemName: 'Flashdisk SanDisk Ultra Dual Drive 64GB',
    category: 'Elektronik & Gadget',
    campus: 'H',
    building: 'Gedung Lab TI',
    specificSpot: 'Laboratorium TI Lantai 2',
    areaType: 'LAB',
    labShift: 'Shift 3 (13:30 - 15:30)',
    labPcNumber: 'PC-18',
    storagePoint: 'Pos Satpam Utama Kampus H',
    lockerRackCode: 'RAK-B / LOKER-03',
    foundDate: '2026-10-21 16:00',
    publicDescription: 'Flashdisk warna hitam-perak tipe Type-C & Type-A. Tertinggal di port depan PC Lab TI dan diserahkan ke Pos Satpam Kampus H.',
    secretFeatures: 'Isi folder utama: Folder "SKRIPSI_FINAL_REV4" dan folder "PRAKTIKUM_JARKOM_3IA04".',
    photoUrl: 'https://images.unsplash.com/photo-1624823183492-f084fa315729?w=600&auto=format&fit=crop&q=80',
    isCensored: false,
    status: 'SAVED',
    finderType: 'ASLAB_DROPOFF',
    finderName: 'Diserahkan oleh Fajar (Aslab TI) ke Pos Satpam',
    expiryDate: '2027-01-21'
  },
  {
    id: 'item-4',
    itemCode: 'LNF-202610-0044',
    itemName: 'Tumbler Stainless Kuning Mustard',
    category: 'Botol Minum & Wadah',
    campus: 'J1',
    building: 'Gedung 1 Kalimalang',
    specificSpot: 'Musholla Lantai 2 dekat tempat wudhu pria',
    areaType: 'PUBLIC',
    storagePoint: 'Pos Satpam Utama Kampus J1',
    lockerRackCode: 'RAK-C / BOX-09',
    foundDate: '2026-10-20 18:20',
    publicDescription: 'Tumbler tahan panas warna kuning mustard kapasitas 750ml dengan tutup pegangan hitam.',
    secretFeatures: 'Ada goresan kecil di dasar botol dan inisial ukiran spidol "MF" di bawah karet tutup.',
    photoUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80',
    isCensored: false,
    status: 'SAVED',
    finderType: 'MAHASISWA_DROPOFF',
    finderName: 'Anonim',
    expiryDate: '2026-11-20'
  },
  {
    id: 'item-5',
    itemCode: 'LNF-202610-0045',
    itemName: 'Dompet Kulit Pria Coklat Tua',
    category: 'Dokumen, KTM & Dompet',
    campus: 'D',
    building: 'Area Parkir',
    specificSpot: 'Parkiran Motor Barat dekat Pos Keluar',
    areaType: 'PUBLIC',
    storagePoint: 'Pos Satpam Utama Kampus D',
    lockerRackCode: 'RAK-A / BERHARGA-01',
    foundDate: '2026-10-19 14:10',
    publicDescription: 'Dompet lipat kulit warna coklat tua merk Braun Buffel. Kondisi tebal.',
    secretFeatures: 'Uang tunai sekitar Rp 180.000 (pecahan 50rb & 10rb) dan kartu member bioskop CGV an. Gilang.',
    photoUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&auto=format&fit=crop&q=80',
    isCensored: false,
    status: 'RETURNED',
    finderType: 'SATPAM_PATROL',
    finderName: 'Pak Bambang (Satpam D)',
    expiryDate: '2027-01-19'
  }
];

export const INITIAL_CLAIMS: Claim[] = [
  {
    id: 'claim-1',
    itemId: 'item-1',
    claimantName: 'Rizky Maulana',
    claimantNpm: '50422910',
    claimantMajor: 'Informatika',
    claimantPhone: '081298765432',
    secretAnswer: 'Ada stiker logo bahasa Python warna biru kuning di sudut cover belakang, dan wallpaper lockscreen foto pantai Karimunjawa.',
    proofDocument: 'Bukti KRS semester 5 & foto nota pembelian laptop di Tokopedia.',
    status: 'PENDING',
    appliedAt: '2026-10-21 16:30',
    claimTicketQr: 'UG-TICKET-50422910-0041'
  }
];

export const INITIAL_LOST_REPORTS: LostReport[] = [
  {
    id: 'rep-1',
    reporterName: 'Siti Rahma',
    reporterNpm: '11122844',
    itemName: 'Charger Laptop MacBook USB-C 67W',
    category: 'Elektronik & Gadget',
    campus: 'D',
    building: 'Perpustakaan Gedung 3',
    color: 'Putih',
    lostDate: '2026-10-21',
    description: 'Tertinggal di meja bilik belajar mandiri lantai 2 perpus setelah maghrib.',
    status: 'OPEN'
  }
];
