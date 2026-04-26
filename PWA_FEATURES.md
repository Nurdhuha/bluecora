# 🌊 Rancangan Tambahan Aplikasi Bluecora (Format PWA)

Mengingat aplikasi **Bluecora** ditujukan untuk nelayan (yang sering berada di area minim sinyal) dan dikembangkan dalam format **PWA (Progressive Web App)**, berikut adalah rancangan tambahan fitur, optimalisasi, dan UI/UX yang dapat memaksimalkan teknologi PWA.

---

## 1. 📡 Optimalisasi Fitur Offline (Offline-First)
Karena nelayan menghabiskan banyak waktu di laut dengan konektivitas internet yang tidak stabil atau nihil, PWA sangat diuntungkan dengan fitur *Offline-First* menggunakan Service Workers dan IndexedDB.

*   **Pencatatan Tangkapan Offline:** Nelayan dapat menginput jumlah dan jenis ikan yang ditangkap secara langsung saat di kapal. Data akan tersimpan lokal di HP dan akan **otomatis tersinkronisasi** (Auto-Sync) dengan server koperasi segera setelah HP mendapatkan sinyal di darat.
*   **Akses Harga & Cuaca Terakhir:** Aplikasi menyimpan data (*cache*) harga ikan dan prakiraan cuaca terakhir sebelum nelayan berangkat. Jadi saat di tengah laut, nelayan masih bisa melihat data tersebut sebagai referensi.
*   **Mode Laut (Sea Mode):** Sebuah mode khusus yang dapat diaktifkan saat melaut. Mode ini mematikan pencarian sinyal background yang tidak perlu untuk menghemat baterai, dan mengubah antarmuka menjadi mode layar kontras tinggi.

## 2. 🔔 Push Notification & Background Sync
PWA memungkinkan pengiriman notifikasi seperti aplikasi native, sangat berguna untuk info yang sensitif terhadap waktu.

*   **Peringatan Cuaca Ekstrem (Real-time):** Notifikasi peringatan dini jika ada potensi badai atau gelombang tinggi di sekitar perairan Bawean.
*   **Pembaruan Harga Ikan:** Notifikasi saat harga ikan tertentu naik tajam, memotivasi nelayan untuk fokus pada komoditas tersebut.
*   **Pengingat Koperasi:** Notifikasi untuk jadwal Rapat Anggota, pencairan dana pinjaman, atau jatuh tempo cicilan.
*   **Notifikasi Pembayaran Sukses:** Saat nelayan menjual ikan ke koperasi, uang langsung masuk dan muncul notifikasi pop-up.

## 3. 📱 Integrasi Perangkat Keras (Hardware Access)
PWA modern dapat mengakses perangkat keras smartphone secara langsung lewat API browser.

*   **Geolokasi (GPS) untuk Fishing Ground:** Nelayan dapat menandai titik koordinat (Pin Location) tempat mereka mendapat banyak tangkapan. Titik ini bisa disimpan pribadi atau dibagikan ke anggota koperasi lain.
*   **Kamera & Pemindai QR (QR Code Scanner):**
    *   **Transaksi Koperasi:** Menggunakan kamera untuk scan QR Code saat mengambil uang atau bertransaksi di koperasi.
    *   **Foto Kualitas Ikan:** Nelayan bisa memfoto ikan hasil tangkapan. Ke depannya dapat diintegrasikan dengan AI ringan untuk mendeteksi *Grade* (A/B/C) secara otomatis berdasarkan foto.
*   **Web Share API:** Memudahkan nelayan untuk membagikan info harga ikan atau undangan koperasi ke aplikasi WhatsApp dengan satu klik.

## 4. 🚨 Fitur Tambahan: SOS & Keamanan
Fitur vital yang sangat dibutuhkan oleh nelayan namun sering terlewat.

*   **Tombol Darurat (SOS Button):** Tombol merah besar yang jika ditekan akan mengirimkan titik koordinat GPS terakhir ke Koperasi dan kapal nelayan lain di sekitarnya. Jika tidak ada sinyal internet, PWA bisa mem-bypass untuk membuka aplikasi SMS bawaan dengan format koordinat yang sudah terisi.

## 5. 🎨 Pertimbangan UI/UX Khusus PWA Nelayan
*   **Instalasi Mudah (Add to Home Screen):** Saat nelayan membuka web Bluecora pertama kali, muncul *prompt* "Install Bluecora App". Aplikasi akan muncul di layar utama HP (Home Screen) tanpa perlu download lewat Play Store yang memakan banyak kuota.
*   **Bottom Navigation Bar (Navigasi Bawah):** Karena HP sekarang berukuran besar dan tangan nelayan mungkin basah/kotor, navigasi utama (Home, Jual, Koperasi, Profil) harus berada di bagian bawah layar agar mudah dijangkau dengan satu jempol.
*   **Dark Mode (Mode Gelap) Dinamis:** Otomatis berubah menjadi mode gelap pada malam hari atau saat melaut dini hari agar cahaya layar tidak menyilaukan mata dan mengganggu visibilitas di laut yang gelap.
*   **Ukuran Aplikasi Sangat Ringan (< 5MB):** Menggunakan pola *App Shell*, di mana kerangka aplikasi dimuat secara instan, menghemat ruang penyimpanan di HP nelayan yang mungkin spesifikasinya terbatas.
*   **Ukuran Font Fleksibel:** Opsi aksesibilitas untuk membesarkan teks (huruf) karena beberapa nelayan mungkin sudah berusia lanjut dan kesulitan membaca teks kecil.

---

### Kesimpulan Alur Pengalaman PWA (User Journey):
1.  **Di Darat:** Nelayan buka *link* web ➜ Muncul tombol "Install" ➜ App terpasang di HP ➜ Cek harga & cuaca.
2.  **Melaut (Tidak ada sinyal):** Nelayan buka App ➜ Catat hasil tangkapan secara offline ➜ Tandai lokasi GPS potensial.
3.  **Kembali ke Darat (Sinyal kembali):** App otomatis melakukan sinkronisasi (*Background Sync*) ➜ Data tangkapan terkirim ke Koperasi sebelum kapal berlabuh.
4.  **Di Koperasi:** Nelayan tinggal timbang ulang ➜ Buka App ➜ Uang cair masuk saldo.

---

## 6. 🏗️ Detail Arsitektur Sistem PWA (Fase Prototype)
Mengingat proyek ini adalah **prototype yang mengedepankan UI/UX** tanpa koneksi ke database backend nyata, rancangan arsitektur teknologi akan difokuskan pada simulasi pengalaman PWA secara *front-end*:

*   **Frontend Framework:** React (dengan Vite) atau Next.js. Sangat direkomendasikan karena ekosistem komponen UI yang kaya untuk membangun *interface* modern yang responsif dan terasa premium.
*   **State Management & Mock Data:** 
    *   Menggunakan *Context API* atau *Zustand/Redux* untuk mengelola state aplikasi secara lokal.
    *   Data seperti "Harga Ikan", "Cuaca", dan "Profil Nelayan" akan menggunakan *Mock Data* (data statis berupa file JSON) untuk mensimulasikan interaksi tanpa perlu API sungguhan.
*   **Simulasi Penyimpanan Lokal (Client-Side Storage):**
    *   **Local Storage / Session Storage:** Digunakan untuk menyimpan state sementara, seperti status login (*mock*) atau keranjang "Jual Ikan", sehingga saat halaman di-*refresh* data tidak hilang dan terasa seperti aplikasi sungguhan.
*   **Simulasi PWA (Service Worker & Manifest):**
    *   **Web App Manifest (`manifest.json`):** Dikonfigurasi secara penuh agar prototype bisa di-*install* (*Add to Home Screen*) di HP dan tampil *fullscreen* (*standalone*).
    *   **Service Worker (Caching App Shell):** Service Worker tetap diimplementasikan hanya untuk meng-*cache* kerangka UI (*App Shell*), aset gambar, dan CSS. Ini memungkinkan prototype tetap bisa dibuka dan dinavigasi meskipun HP dalam mode *Airplane Mode* (simulasi saat melaut).
*   **Simulasi Interaksi & Animasi (Micro-Interactions):**
    *   Menggunakan library seperti Framer Motion atau CSS Animations untuk memberikan *feedback* visual (contoh: *loading state*, transisi halaman yang *smooth*, *pop-up* notifikasi sukses). Ini krusial agar prototype UI/UX terasa hidup dan meyakinkan.
*   **Deployment Prototype:** Di-*hosting* secara statis menggunakan platform seperti Vercel, Netlify, atau GitHub Pages dengan dukungan HTTPS bawaan untuk memastikan fitur PWA (Manifest & Service Worker) dapat berjalan dengan baik saat diuji coba di HP.
