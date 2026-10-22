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
    majorOrDepartment: 'Komandan Regu Posko Satpam',
    email: 'bambang.security@gunadarma.ac.id',
    campus: 'D'
  },
  aslab: {
    id: 'user-aslab-1',
    name: 'Fajar Kurniawan',
    identifier: 'ASLAB-TI-08',
    role: 'ASLAB',
    majorOrDepartment: 'Asisten Laboratorium TI (Kampus H)',
    email: 'fajar.lab@staff.gunadarma.ac.id',
    campus: 'H'
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
