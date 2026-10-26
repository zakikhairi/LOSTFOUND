import { AuthUser } from '../types';

export const MOCK_USERS: Record<string, AuthUser> = {
  mahasiswa: {
    id: 'user-mhs-1',
    name: 'Rizky Maulana',
    identifier: '50422910',
    role: 'MAHASISWA',
    majorOrDepartment: 'Teknik Informatika (Kelas 3IA01)',
    email: 'rizky.m@student.gunadarma.ac.id',
    campus: 'D'
  },
  mahasiswa2: {
    id: 'user-mhs-2',
    name: 'Siti Rahma',
    identifier: '11122844',
    role: 'MAHASISWA',
    majorOrDepartment: 'Sistem Informasi (Kelas 2KA02)',
    email: 'siti.r@student.gunadarma.ac.id',
    campus: 'E'
  },
  satpam: {
    id: 'user-satpam-1',
    name: 'Bambang Suherman',
    identifier: 'SEC-KAMPUS-D',
    role: 'SATPAM',
    majorOrDepartment: 'Komandan Regu Pos Satpam Kampus D Margonda',
    email: 'bambang.security@gunadarma.ac.id',
    campus: 'D'
  },
  satpamE: {
    id: 'user-satpam-2',
    name: 'Pak Suwarno',
    identifier: 'SEC-KAMPUS-E',
    role: 'SATPAM',
    majorOrDepartment: 'Petugas Jaga Pos Satpam Kampus E Kelapa Dua',
    email: 'suwarno.security@gunadarma.ac.id',
    campus: 'E'
  },
  admin: {
    id: 'user-admin-1',
    name: 'Dra. Sarah Wijaya, M.M.',
    identifier: 'BAAK-PUSAT-01',
    role: 'ADMIN',
    majorOrDepartment: 'Biro Kemahasiswaan & BAAK Pusat',
    email: 'sarah.wijaya@gunadarma.ac.id',
    campus: 'D'
  }
};
