import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('DATABASE_URL is not set in .env!');
  process.exit(1);
}

const sql = neon(connectionString);

async function main() {
  console.log('Connecting to Neon PostgreSQL...');

  // Test connection
  const [{ now }] = await sql`SELECT NOW() as now`;
  console.log('Connected successfully! Database Server Time:', now);

  console.log('Creating tables...');

  // 1. Found items table
  await sql`
    CREATE TABLE IF NOT EXISTS found_items (
      id VARCHAR(64) PRIMARY KEY,
      item_code VARCHAR(32) UNIQUE NOT NULL,
      item_name VARCHAR(255) NOT NULL,
      category VARCHAR(64) NOT NULL,
      campus VARCHAR(10) NOT NULL,
      building VARCHAR(128) NOT NULL,
      specific_spot VARCHAR(255) NOT NULL,
      area_type VARCHAR(32) NOT NULL,
      lab_shift VARCHAR(64),
      lab_pc_number VARCHAR(32),
      storage_point VARCHAR(255) NOT NULL,
      locker_rack_code VARCHAR(64) NOT NULL,
      found_date VARCHAR(32) NOT NULL,
      public_description TEXT NOT NULL,
      secret_features TEXT NOT NULL,
      photo_url TEXT NOT NULL,
      is_censored BOOLEAN DEFAULT false,
      status VARCHAR(32) DEFAULT 'SAVED',
      finder_type VARCHAR(32) NOT NULL,
      finder_name VARCHAR(128) NOT NULL,
      finder_npm VARCHAR(32),
      expiry_date VARCHAR(32) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  // 2. Claims table
  await sql`
    CREATE TABLE IF NOT EXISTS claims (
      id VARCHAR(64) PRIMARY KEY,
      item_id VARCHAR(64) REFERENCES found_items(id) ON DELETE CASCADE,
      claimant_name VARCHAR(128) NOT NULL,
      claimant_npm VARCHAR(32) NOT NULL,
      claimant_major VARCHAR(128) NOT NULL,
      claimant_phone VARCHAR(32) NOT NULL,
      secret_answer TEXT NOT NULL,
      proof_document TEXT,
      status VARCHAR(32) DEFAULT 'PENDING',
      applied_at VARCHAR(32) NOT NULL,
      claim_ticket_qr VARCHAR(64) UNIQUE NOT NULL,
      rejection_reason TEXT,
      signature_url TEXT,
      handover_notes TEXT,
      completed_at VARCHAR(32),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  // 3. Lost reports table
  await sql`
    CREATE TABLE IF NOT EXISTS lost_reports (
      id VARCHAR(64) PRIMARY KEY,
      reporter_name VARCHAR(128) NOT NULL,
      reporter_npm VARCHAR(32) NOT NULL,
      item_name VARCHAR(255) NOT NULL,
      category VARCHAR(64) NOT NULL,
      campus VARCHAR(10) NOT NULL,
      building VARCHAR(128) NOT NULL,
      color VARCHAR(64),
      lost_date VARCHAR(32) NOT NULL,
      description TEXT,
      status VARCHAR(32) DEFAULT 'OPEN',
      matched_item_id VARCHAR(64),
      match_score INTEGER,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  console.log('Tables created successfully!');

  // Check if items already exist, if not, seed initial items
  const itemsCount = await sql`SELECT COUNT(*) as count FROM found_items`;
  if (parseInt(itemsCount[0].count) === 0) {
    console.log('Seeding initial found items...');
    await sql`
      INSERT INTO found_items (
        id, item_code, item_name, category, campus, building, specific_spot, area_type,
        storage_point, locker_rack_code, found_date, public_description, secret_features,
        photo_url, is_censored, status, finder_type, finder_name, finder_npm, expiry_date
      ) VALUES
      (
        'item-1', 'LNF-202610-0041', 'Laptop Asus Vivobook 14 inch', 'Elektronik & Gadget', 'D',
        'Gedung 2', 'Selasar Lantai 3 Depan Ruang D32', 'PUBLIC', 'Pos Satpam Utama Kampus D',
        'RAK-B / BOX-02', '2026-10-21 13:40',
        'Laptop warna abu-abu gelap metalik dalam tas jinjing hitam. Kondisi bersih dan mulus.',
        'Stiker logo Python di pojok kanan cover belakang. Wallpaper lockscreen foto pemandangan pantai biru.',
        'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&auto=format&fit=crop&q=80',
        false, 'IN_CLAIM_PROCESS', 'MAHASISWA_DROPOFF', 'Dimas Aditya', '51421008', '2027-01-21'
      ),
      (
        'item-2', 'LNF-202610-0042', 'Kartu Tanda Mahasiswa (KTM) Gunadarma', 'Dokumen, KTM & Dompet', 'E',
        'Gedung 5', 'Kantin Belakang Kampus E', 'PUBLIC', 'Pos Satpam Kampus E',
        'RAK-A / DOKUMEN-08', '2026-10-21 11:15',
        'KTM Universitas Gunadarma angkatan 2023 Jurusan Sistem Informasi. Dilengkapi tali lanyard warna ungu.',
        'Nama Mahasiswa: Arya Pratama, NPM: 10123491. Ada stiker hologram di belakang kartu.',
        'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
        true, 'SAVED', 'SATPAM', 'Pak Suwarno (Satpam E)', NULL, '2026-12-21'
      ),
      (
        'item-3', 'LNF-202610-0043', 'Flashdisk SanDisk Ultra Dual Drive 64GB', 'Elektronik & Gadget', 'H',
        'Gedung Lab TI', 'Laboratorium TI Lantai 2', 'LAB', 'Loket Ruang Asisten Lab TI Kampus H',
        'KOTAK-ASLAB-03', '2026-10-21 16:00',
        'Flashdisk warna hitam-perak tipe Type-C & Type-A. Tertinggal di port depan PC.',
        'Isi folder utama: Folder "SKRIPSI_FINAL_REV4" dan folder "PRAKTIKUM_JARKOM_3IA04".',
        'https://images.unsplash.com/photo-1624823183492-f084fa315729?w=600&auto=format&fit=crop&q=80',
        false, 'SAVED', 'ASLAB', 'Asisten Lab (Fajar)', NULL, '2027-01-21'
      ),
      (
        'item-4', 'LNF-202610-0044', 'Tumbler Stainless Kuning Mustard', 'Botol Minum & Wadah', 'J1',
        'Gedung 1 Kalimalang', 'Musholla Lantai 2 dekat tempat wudhu pria', 'PUBLIC', 'Pos Satpam Utama Kampus J1',
        'RAK-C / BOX-09', '2026-10-20 18:20',
        'Tumbler tahan panas warna kuning mustard kapasitas 750ml dengan tutup pegangan hitam.',
        'Ada goresan kecil di dasar botol dan inisial ukiran spidol "MF" di bawah karet tutup.',
        'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80',
        false, 'SAVED', 'MAHASISWA_DROPOFF', 'Anonim', NULL, '2026-11-20'
      );
    `;

    // Seed initial claim
    await sql`
      INSERT INTO claims (
        id, item_id, claimant_name, claimant_npm, claimant_major, claimant_phone,
        secret_answer, proof_document, status, applied_at, claim_ticket_qr
      ) VALUES
      (
        'claim-1', 'item-1', 'Rizky Maulana', '50422910', 'Informatika', '081298765432',
        'Ada stiker logo bahasa Python warna biru kuning di sudut cover belakang, dan wallpaper lockscreen foto pantai Karimunjawa.',
        'Bukti KRS semester 5 & foto nota pembelian laptop di Tokopedia.',
        'PENDING', '2026-10-21 16:30', 'UG-TICKET-50422910-0041'
      );
    `;

    console.log('Seeding completed successfully!');
  } else {
    console.log(`Database already has ${itemsCount[0].count} found items.`);
  }

  console.log('Neon PostgreSQL is fully ready!');
}

main().catch(err => {
  console.error('Error during database initialization:', err);
  process.exit(1);
});
