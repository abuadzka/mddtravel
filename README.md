# MDD Travel Umrah Dashboard

Dashboard realtime untuk travel agen Umrah, siap dipasang di GitHub Pages dan disambungkan ke Google Sheets lewat Google Apps Script.

## Isi paket

- `index.html` aplikasi dashboard responsive untuk Android, iPhone, dan desktop.
- `config.js` konfigurasi nama aplikasi, repo GitHub, dan URL backend.
- `manifest.webmanifest` dan `service-worker.js` untuk mode PWA/offline.
- `Code.gs` backend Google Apps Script untuk menyimpan data ke Google Sheets.

## Fitur dashboard

- Komposisi warna royal blue dominan, putih untuk permukaan/teks kontras, dan gold sebagai aksen.
- Ringkasan utama dari Leads, Jamaah, Booking, Pembayaran, Paket, dan kesiapan operasi.
- Widget hari, tanggal, dan jam realtime.
- Mode terang dan mode gelap yang tersimpan di perangkat.
- Export PDF lewat dialog print browser dan export Excel `.xls`.
- Logo resmi Markaz Dakwah Digital sebagai identitas aplikasi.
- Visual dashboard 3D: hero logo, bar chart, donut progress, smartart pipeline, dan ikon modul 3D.

## Deploy ke GitHub Pages

1. Upload semua isi folder ini ke repo `https://github.com/abuadzka/mddtravel`.
2. Di GitHub, buka `Settings` > `Pages`.
3. Pilih deploy dari branch utama dan root folder.
4. URL aplikasi menjadi `https://abuadzka.github.io/mddtravel/`.

## Setup Google Workspace

1. Login ke Google dengan akun `rizkifriends19@gmail.com`.
2. Buat Google Sheets baru, misalnya `MDD Travel Umrah Realtime`.
3. Buka `Extensions` > `Apps Script`.
4. Paste isi `Code.gs`.
5. Jalankan fungsi `setupWorkbook` satu kali dan izinkan akses.
6. Klik `Deploy` > `New deployment` > `Web app`.
7. Set `Execute as: Me` dan `Who has access: Anyone with the link`.
8. Copy URL Web App.
9. Paste URL itu ke `config.js` pada field `appsScriptUrl`, lalu upload ulang ke GitHub.

Dashboard tetap bisa dipakai tanpa backend karena data tersimpan di perangkat. Setelah `appsScriptUrl` aktif, data akan disinkronkan ke Google Sheets secara berkala.


## Status deployment

Redeploy dipicu ulang pada 7 Agustus 2026, 01:15 WIB untuk memastikan GitHub Pages menerbitkan versi 3D terbaru.
