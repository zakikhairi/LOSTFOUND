# Lost & Found Universitas Gunadarma 🎓🔍

Sistem Informasi Terpadu Pelaporan & Pengelolaan Barang Hilang/Temuan Multi-Kampus Universitas Gunadarma (Kampus D Margonda, E/G/H Kelapa Dua, J1 Kalimalang, K Karawaci).

---

## 🚀 Cara Menjalankan Aplikasi

1. Buka terminal di direktori proyek ini:
   ```bash
   cd "C:\Users\muham\.gemini\antigravity\scratch\lost-and-found-gunadarma"
   ```

2. Jalankan server pengembang:
   ```bash
   npm run dev
   ```

3. Buka browser pada alamat yang tertera (biasanya `http://localhost:5173`).

---

## ✨ Fitur-Fitur Utama

### 1. 🎓 Portal Mahasiswa (Pencarian & Klaim)
* **Filter Multi-Kampus UG:** Filter temuan berdasarkan Kampus D, E, G, H, J1, atau K.
* **Pemisahan Kategori Area:**
  * **Area Publik:** Selasar, Kantin, Parkiran, Musholla.
  * **Fasilitas Khusus / Lab:** Logbook Shift praktikum & Nomor PC (seperti tiket KA Jarak Jauh).
* **Anti-Fraud Photo Blur:** Foto dokumen sensitif (KTM, KTP, STNK) disensor/diblur otomatis untuk melindungi identitas.
* **Form Blind-Validation:** Mahasiswa diuji menyebutkan ciri khusus yang dirahasiakan sebelum klaim disetujui.
* **Smart Reverse-Matching:** Algoritma pencocokan radar langsung saat mahasiswa mengisi formulir laporan kehilangan.
* **QR Tiket Pengambilan:** Mahasiswa yang klaimnya di-ACC admin akan menerima tiket digital ber-QR code untuk ditunjukkan ke satpam di posko.

### 2. 🛡️ Portal Petugas Lapangan (Satpam Posko & Asisten Lab)
* **Form Input Temuan Cepat:** Input barang temuan lengkap dengan kategori, lokasi, foto, dan ciri rahasia (*secret features*).
* **Manajemen Rak & Loker:** Pelacakan posisi fisik barang di rak penyimpanan pos satpam.
* **Scanner Tiket & BAST Digital:** Satpam dapat memindai tiket klaim mahasiswa, melakukan verifikasi fisik bersama, meminta tanda tangan digital langsung di layar, dan menyelesaikan serah terima.

### 3. 🏛️ Dashboard Admin Kemahasiswaan & BAAK
* **Split-Screen Verification:** Layar verifikasi komparatif antara catatan rahasia posko vs jawaban klaim mahasiswa.
* **Approval & Rejection:** Menyetujui atau menolak klaim dengan alasan spesifik.
* **Kebijakan Batas Waktu & Donasi (Disposal Policy):** Mengawasi barang yang tersimpan melewati batas waktu untuk dialihkan ke kegiatan sosial/baksos kampus.

### 4. 🔀 Simulator Peran Multi-User (Top Bar)
Di bagian atas aplikasi terdapat pill switcher untuk berganti peran dalam sekejap tanpa perlu login/logout berulang kali:
* **🎓 Mahasiswa:** Rizky Maulana (NPM: 50422910)
* **🛡️ Satpam Kampus D:** Bambang S. (Pos Utama)
* **💻 Asisten Lab:** Fajar K. (Lab TI Kampus H)
* **🏛️ Admin BAAK:** Bu Sarah (Pusat)

---

## 🛠️ Stack Teknologi
* **Framework:** React 19 + TypeScript + Vite
* **Styling:** Tailwind CSS (Warna Resmi Gunadarma: Ungu `#5E2750` & Gold `#E5A93C`)
* **Icons:** Lucide React
* **Canvas:** HTML5 Canvas untuk Tanda Tangan Digital BAST
