const STORAGE_KEY_DOCS = 'smp_dafi_simdok_docs_v1';
    const STORAGE_KEY_STANDARDS = 'smp_dafi_simdok_standards_v1';
    const STORAGE_KEY_GAS_URL = 'smp_dafi_simdok_gas_url_v1';
    const STORAGE_KEY_USER = 'smp_dafi_simdok_user_v1';

    const INITIAL_DOCUMENTS = [
      {
        id: 'DOC-2026-001',
        nomorDokumen: '001/TATIB/SMP-DAFI/VII/2026',
        judul: 'Tata Tertib dan Kode Etik Guru & Tenaga Kependidikan SMP DAFI',
        kategori: 'Tata Tertib',
        pembuat: 'Kepala Sekolah',
        kataKunci: ['tata tertib', 'kode etik', 'guru', 'disiplin', 'jam kerja', 'kehadiran'],
        akses: 'Internal Pendidik',
        versi: 'v2.1',
        tanggalTerbit: '2026-07-10',
        tanggalUpdate: '2026-10-12',
        ukuran: '420 KB',
        ringkasan: 'Pedoman resmi jam kehadiran (06.45 WIB), adab berpakaian syar’i dan rapi, kewajiban pendampingan karakter siswa, serta mekanisme izin bagi seluruh guru dan staf SMP DAFI.',
        isiPasal: [
          'Pasal 1 (Kehadiran & Jam Kerja): Pendidik hadir selambat-lambatnya pukul 06.45 WIB untuk menyambut kedatangan siswa dan mengikuti briefing pagi.',
          'Pasal 2 (Adab & Keteladanan): Pendidik wajib menjaga integritas akhlak Islami, keteladanan ibadah berjamaah, serta kerapian busana kerja sesuai ketentuan hari.',
          'Pasal 3 (Administrasi Pembelajaran): Setiap guru wajib memperbarui perangkat ajar dan jurnal mengajar mingguan paling lambat setiap hari Jumat pukul 15.00 WIB.',
          'Pasal 4 (Mekanisme Perizinan): Pengajuan izin tidak hadir wajib disampaikan melalui Kepala Sekolah dan ditembuskan ke Waka Kurikulum beserta tugas pengganti kelas.'
        ],
        riwayat: [
          {
            versionId: 'VER-101',
            versi: 'v1.0',
            tanggalUpdate: '2026-07-10',
            diperbaruiOleh: 'Kepala Sekolah',
            catatanPerubahan: 'Penerbitan awal Tata Tertib Guru Tahun Ajaran 2026/2027.',
            ukuran: '390 KB'
          },
          {
            versionId: 'VER-102',
            versi: 'v2.0',
            tanggalUpdate: '2026-08-20',
            diperbaruiOleh: 'Kepala Sekolah',
            catatanPerubahan: 'Penambahan klausul pendampingan sholat berjamaah dan pembinaan adab siswa.',
            ukuran: '410 KB'
          },
          {
            versionId: 'VER-103',
            versi: 'v2.1',
            tanggalUpdate: '2026-10-12',
            diperbaruiOleh: 'Kepala TU',
            catatanPerubahan: 'Penyesuaian prosedur izin daring dan pelaporan guru piket di Pasal 4.',
            ukuran: '420 KB'
          }
        ]
      },
      {
        id: 'DOC-2026-002',
        nomorDokumen: '002/TATIB/SMP-DAFI/VII/2026',
        judul: 'Tata Tertib dan Panduan Adab Peserta Didik SMP DAFI',
        kategori: 'Tata Tertib',
        pembuat: 'Waka Kesiswaan',
        kataKunci: ['tata tertib siswa', 'adab', 'seragam', 'poin pelanggaran', 'kesiswaan', 'disiplin'],
        akses: 'Publik',
        versi: 'v1.2',
        tanggalTerbit: '2026-07-12',
        tanggalUpdate: '2026-09-05',
        ukuran: '580 KB',
        ringkasan: 'Aturan lengkap hak, kewajiban, adab pergaulan, ketentuan seragam harian, larangan membawa gawai tanpa izin pembelajaran, serta sistem pembinaan prestasi dan pelanggaran siswa SMP DAFI.',
        isiPasal: [
          'Bab I (Kewajiban Utama Siswa): Menjaga adab terhadap guru, orang tua, dan sesama teman serta mengikuti seluruh rangkaian kegiatan KBM dan ibadah tepat waktu.',
          'Bab II (Ketentuan Seragam & Kerapian): Mengenakan seragam sesuai jadwal harian SMP DAFI lengkap dengan atribut resmi dan sepatu hitam.',
          'Bab III (Penggunaan Perangkat Digital): Perangkat laptop/tablet hanya digunakan pada jam mata pelajaran yang telah diizinkan oleh guru pengampu.',
          'Bab IV (Tahapan Pembinaan): Pembinaan dilakukan secara bertahap dan edukatif mulai dari teguran lisan, pembinaan wali kelas, hingga pemanggilan orang tua/wali.'
        ],
        riwayat: [
          {
            versionId: 'VER-201',
            versi: 'v1.0',
            tanggalUpdate: '2026-07-12',
            diperbaruiOleh: 'Waka Kesiswaan',
            catatanPerubahan: 'Rilis pedoman tata tertib siswa untuk buku saku wali murid dan guru.',
            ukuran: '550 KB'
          },
          {
            versionId: 'VER-202',
            versi: 'v1.2',
            tanggalUpdate: '2026-09-05',
            diperbaruiOleh: 'Waka Kesiswaan',
            catatanPerubahan: 'Pembaruan aturan peminjaman laptop pembelajaran di Bab III.',
            ukuran: '580 KB'
          }
        ]
      },
      {
        id: 'DOC-2026-003',
        nomorDokumen: '015/SOP/SMP-DAFI/VIII/2026',
        judul: 'SOP Pelaksanaan KBM, Guru Piket, dan Penanganan Kelas Kosong',
        kategori: 'SOP',
        pembuat: 'Waka Kurikulum',
        kataKunci: ['sop kbm', 'guru piket', 'kelas kosong', 'guru pengganti', 'pembelajaran', 'kurikulum'],
        akses: 'Publik',
        versi: 'v2.0',
        tanggalTerbit: '2026-08-01',
        tanggalUpdate: '2026-10-01',
        ukuran: '345 KB',
        ringkasan: 'Alur kerja baku pelaksanaan Kegiatan Belajar Mengajar (KBM), tugas kontrol keliling guru piket, serta prosedur penugasan guru pengganti (inval) apabila terdapat guru yang berhalangan hadir.',
        isiPasal: [
          'Prosedur 1 (Pembukaan KBM): Guru masuk kelas tepat saat bel berbunyi, memimpin doa, memeriksa kebersihan kelas, dan mengisi presensi siswa.',
          'Prosedur 2 (Pemantauan Guru Piket): Guru piket melakukan pengecekan keterisian seluruh ruang kelas pada menit ke-10 jam pelajaran pertama.',
          'Prosedur 3 (Penanganan Kelas Kosong): Apabila guru berhalangan hadir lebih dari 10 menit, guru piket wajib berkoordinasi dengan Waka Kurikulum untuk menugaskan guru inval dan menyampaikan lembar penugasan terstruktur.',
          'Prosedur 4 (Evaluasi Harian): Guru piket menutup berita acara harian sebelum pukul 15.30 WIB.'
        ],
        riwayat: [
          {
            versionId: 'VER-301',
            versi: 'v1.0',
            tanggalUpdate: '2026-08-01',
            diperbaruiOleh: 'Waka Kurikulum',
            catatanPerubahan: 'Penyusunan awal SOP KBM dan Guru Piket.',
            ukuran: '320 KB'
          },
          {
            versionId: 'VER-302',
            versi: 'v2.0',
            tanggalUpdate: '2026-10-01',
            diperbaruiOleh: 'Waka Kurikulum',
            catatanPerubahan: 'Integrasi form pelaporan digital guru inval dan batas waktu respons 10 menit.',
            ukuran: '345 KB'
          }
        ]
      },
      {
        id: 'DOC-2026-004',
        nomorDokumen: '019/SOP/SMP-DAFI/VIII/2026',
        judul: 'SOP Pengajuan Surat, Legalisir, dan Layanan Administrasi Tata Usaha',
        kategori: 'SOP',
        pembuat: 'Kepala TU',
        kataKunci: ['sop tu', 'administrasi', 'surat keluar', 'legalisir', 'pelayanan', 'tata usaha'],
        akses: 'Publik',
        versi: 'v1.0',
        tanggalTerbit: '2026-08-14',
        tanggalUpdate: '2026-08-14',
        ukuran: '290 KB',
        ringkasan: 'Standar waktu pelayanan dan alur pengajuan surat tugas guru, surat keterangan aktif siswa, permohonan dana kegiatan, serta legalisir dokumen kelulusan di ruang TU SMP DAFI.',
        isiPasal: [
          'Layanan 1 (Surat Tugas & Rekomendasi Guru): Pengajuan diterima minimal H-2 kegiatan melalui staf TU dan disahkan oleh Kepala Sekolah dalam waktu maksimal 1x24 jam kerja.',
          'Layanan 2 (Surat Keterangan Siswa & Mutasi): Wali murid/wali kelas mengajukan formulir permohonan dilengkapi kartu pelajar.',
          'Layanan 3 (Penomoran & Pengarsipan): Setiap surat resmi wajib menggunakan kode klasifikasi arsip SMP DAFI dan diunggah salinan PDF-nya ke dalam DDMS.'
        ],
        riwayat: [
          {
            versionId: 'VER-401',
            versi: 'v1.0',
            tanggalUpdate: '2026-08-14',
            diperbaruiOleh: 'Kepala TU',
            catatanPerubahan: 'Penerbitan perdana SOP layanan administrasi terpadu TU SMP DAFI.',
            ukuran: '290 KB'
          }
        ]
      },
      {
        id: 'DOC-2026-005',
        nomorDokumen: '042/SK/SMP-DAFI/VII/2026',
        judul: 'SK Kepala Sekolah tentang Pembagian Tugas Mengajar & Wali Kelas Semester Ganjil 2026/2027',
        kategori: 'SK',
        pembuat: 'Kepala Sekolah',
        kataKunci: ['sk mengajar', 'pembagian tugas', 'wali kelas', 'semester ganjil', 'jam mengajar', 'beban kerja'],
        akses: 'Internal Pendidik',
        versi: 'v1.1',
        tanggalTerbit: '2026-07-15',
        tanggalUpdate: '2026-08-03',
        ukuran: '740 KB',
        ringkasan: 'Surat Keputusan resmi Kepala SMP DAFI mengenai distribusi beban jam tatap muka guru mata pelajaran, penugasan wali kelas VII, VIII, dan IX, serta koordinator pembina ekstrakurikuler.',
        isiPasal: [
          'MEMUTUSKAN — Kesatu: Menetapkan pembagian tugas mengajar guru mata pelajaran dan beban kerja tambahan sebagaimana tercantum dalam Lampiran I keputusan ini.',
          'Kedua: Menunjuk dan menugaskan nama-nama pendidik pada Lampiran II sebagai Wali Kelas VII, VIII, dan IX SMP DAFI Tahun Ajaran 2026/2027.',
          'Ketiga: Masing-masing pendidik melaporkan pelaksanaan tugas secara berkala kepada Kepala Sekolah melalui Wakil Kepala Sekolah bidang terkait.',
          'Keempat: Keputusan ini berlaku sejak tanggal ditetapkan dengan ketentuan apabila terdapat kekeliruan akan diadakan perbaikan sebagaimana mestinya.'
        ],
        riwayat: [
          {
            versionId: 'VER-501',
            versi: 'v1.0',
            tanggalUpdate: '2026-07-15',
            diperbaruiOleh: 'Kepala Sekolah',
            catatanPerubahan: 'Penetapan awal SK Pembagian Tugas Mengajar TA 2026/2027.',
            ukuran: '720 KB'
          },
          {
            versionId: 'VER-502',
            versi: 'v1.1',
            tanggalUpdate: '2026-08-03',
            diperbaruiOleh: 'Waka Kurikulum',
            catatanPerubahan: 'Revisi Lampiran I terkait penyesuaian jadwal mengampu mata pelajaran IPA dan Bahasa Arab.',
            ukuran: '740 KB'
          }
        ]
      },
      {
        id: 'DOC-2026-006',
        nomorDokumen: '058/SE/SMP-DAFI/X/2026',
        judul: 'Surat Edaran Pedoman Pelaksanaan Asesmen Tengah Semester & Rapor Proyek',
        kategori: 'Surat Administratif',
        pembuat: 'Waka Kurikulum',
        kataKunci: ['surat edaran', 'asesmen', 'ujian', 'rapor', 'kisi-kisi', 'kurikulum'],
        akses: 'Publik',
        versi: 'v1.0',
        tanggalTerbit: '2026-10-05',
        tanggalUpdate: '2026-10-05',
        ukuran: '310 KB',
        ringkasan: 'Edaran resmi jadwal pengumpulan naskah soal, telaah kisi-kisi oleh MGMP sekolah, pelaksanaan asesmen, serta batas akhir penginputan nilai rapor oleh dewan guru SMP DAFI.',
        isiPasal: [
          'Poin 1 (Pengumpulan Naskah Soal): Seluruh guru mapel mengunggah naskah soal dan kisi-kisi paling lambat 10 hari sebelum pelaksanaan asesmen.',
          'Poin 2 (Verifikasi Kualitas Soal): Tim Penjaminan Mutu dan Waka Kurikulum melakukan validasi soal HOTS dan kesesuaian capaian pembelajaran.',
          'Poin 3 (Pengolahan Nilai & Rapor): Nilai hasil asesmen wajib diinput ke aplikasi rapor paling lambat 5 hari kerja setelah ujian berakhir.'
        ],
        riwayat: [
          {
            versionId: 'VER-601',
            versi: 'v1.0',
            tanggalUpdate: '2026-10-05',
            diperbaruiOleh: 'Waka Kurikulum',
            catatanPerubahan: 'Penerbitan Surat Edaran pedoman teknis asesmen semester ganjil.',
            ukuran: '310 KB'
          }
        ]
      }
    ];

    const INITIAL_STANDARD_DOCS = [
      {
        id: 'STD-01',
        judulSaran: 'Tata Tertib dan Kode Etik Guru & Tenaga Kependidikan SMP DAFI',
        kategori: 'Tata Tertib',
        pembuatDisarankan: 'Kepala Sekolah',
        prioritas: 'Tinggi',
        alasan: 'Pedoman utama disiplin dan etika kerja seluruh pendidik.',
        kataKunci: ['tata tertib', 'kode etik', 'guru', 'tenaga kependidikan']
      },
      {
        id: 'STD-02',
        judulSaran: 'Tata Tertib dan Panduan Adab Peserta Didik SMP DAFI',
        kategori: 'Tata Tertib',
        pembuatDisarankan: 'Waka Kesiswaan',
        prioritas: 'Tinggi',
        alasan: 'Acuan kedisiplinan, seragam, dan adab siswa.',
        kataKunci: ['tata tertib siswa', 'adab', 'peserta didik']
      },
      {
        id: 'STD-03',
        judulSaran: 'SOP Pelaksanaan KBM, Guru Piket, dan Penanganan Kelas Kosong',
        kategori: 'SOP',
        pembuatDisarankan: 'Waka Kurikulum',
        prioritas: 'Tinggi',
        alasan: 'Menjamin kelancaran jam pelajaran harian dan ketertiban guru piket.',
        kataKunci: ['sop kbm', 'guru piket', 'kelas kosong']
      },
      {
        id: 'STD-04',
        judulSaran: 'SOP Pengajuan Surat, Legalisir, dan Layanan Administrasi Tata Usaha',
        kategori: 'SOP',
        pembuatDisarankan: 'Kepala TU',
        prioritas: 'Sedang',
        alasan: 'Standar pelayanan surat-menyurat dan arsip TU.',
        kataKunci: ['sop tu', 'legalisir', 'administrasi tata usaha']
      },
      {
        id: 'STD-05',
        judulSaran: 'SK Pembagian Tugas Mengajar & Wali Kelas Semester Berjalan',
        kategori: 'SK',
        pembuatDisarankan: 'Kepala Sekolah',
        prioritas: 'Tinggi',
        alasan: 'Dokumen wajib pemberkasan tunjangan profesi dan beban kerja guru.',
        kataKunci: ['sk mengajar', 'pembagian tugas', 'wali kelas']
      },
      {
        id: 'STD-06',
        judulSaran: 'SK Tim Pencegahan dan Penanganan Kekerasan (TPPK) Sekolah',
        kategori: 'SK',
        pembuatDisarankan: 'Kepala Sekolah',
        prioritas: 'Tinggi',
        alasan: 'Amanat regulasi Kemendikbudristek untuk lingkungan sekolah ramah anak.',
        kataKunci: ['sk tppk', 'pencegahan kekerasan', 'ramah anak', 'perundungan']
      },
      {
        id: 'STD-07',
        judulSaran: 'SOP Pelaksanaan Supervisi Akademik dan Penilaian Kinerja Guru (PKG)',
        kategori: 'SOP',
        pembuatDisarankan: 'Tim Penjaminan Mutu',
        prioritas: 'Tinggi',
        alasan: 'Panduan jadwal, instrumen, dan tindak lanjut supervisi kelas oleh Kepala Sekolah.',
        kataKunci: ['supervisi akademik', 'pkg', 'penilaian kinerja guru']
      },
      {
        id: 'STD-08',
        judulSaran: 'Tata Tertib Penggunaan Laboratorium IPA, Komputer & Perpustakaan',
        kategori: 'Tata Tertib',
        pembuatDisarankan: 'Waka Kurikulum',
        prioritas: 'Sedang',
        alasan: 'Menjaga keselamatan kerja praktikum dan ketertiban fasilitas belajar.',
        kataKunci: ['tata tertib laboratorium', 'komputer', 'perpustakaan', 'praktikum']
      },
      {
        id: 'STD-09',
        judulSaran: 'SOP Penanganan Kedisiplinan, Konseling BK & Pemanggilan Orang Tua',
        kategori: 'SOP',
        pembuatDisarankan: 'Waka Kesiswaan',
        prioritas: 'Tinggi',
        alasan: 'Menstandarkan alur kolaborasi Wali Kelas, Guru BK, dan Orang Tua Siswa.',
        kataKunci: ['sop bk', 'konseling', 'pemanggilan orang tua', 'kedisiplinan']
      },
      {
        id: 'STD-10',
        judulSaran: 'Surat Edaran Kalender Akademik & Agenda Kegiatan Tahunan SMP DAFI',
        kategori: 'Surat Administratif',
        pembuatDisarankan: 'Waka Kurikulum',
        prioritas: 'Sedang',
        alasan: 'Acuan bersama tanggal efektif belajar, ujian, dan kegiatan sekolah.',
        kataKunci: ['kalender akademik', 'agenda tahunan', 'hari efektif']
      }
    ];

        /**
     * Mengambil kode backend Google Apps Script (Code.gs).
     * 1. Coba fetch 'Code.gs' secara dinamis (otomatis mutakhir di server / GitHub Pages).
     * 2. Jika fetch gagal / offline / protokol file://, tampilkan fallback panduan ramah.
     */
    async function getGasCode() {
      try {
        const resp = await fetch('Code.gs');
        if (resp.ok) {
          const text = await resp.text();
          if (text && text.includes('CONFIG')) {
            return text;
          }
        }
      } catch (e) {
        // Fallback untuk protokol file:// atau mode offline
      }
      return '// ==========================================================================\n' +
             '// KODE BACKEND GOOGLE APPS SCRIPT (Code.gs)\n' +
             '// ==========================================================================\n' +
             '// Kode server tersimpan terpisah pada berkas "Code.gs".\n' +
             '// Buka berkas Code.gs di folder repositori Anda, lalu salin dan tempelkan\n' +
             '// ke Google Apps Script (Ekstensi > Apps Script di Google Sheets Anda).\n' +
             '// ==========================================================================';
    }

    const STORAGE_KEY_TOKEN = 'smp_dafi_simdok_token_v1';

    let appState = {
      documents: [],
      standards: [],
      currentUser: null,
      authToken: '',
      activeTab: 'catalog',
      selectedCategory: 'ALL',
      selectedDocId: 'DOC-2026-001',
      viewMode: 'grid',
      gasWebAppUrl: '',
      currentViewingDocId: null,
      currentViewingVersionIdx: 0,
      pdfZoom: 1.0,
      pendingUploadBase64: null,
      pendingUploadBlobUrl: null,
      pendingUploadFileName: '',
      pendingUploadFileSize: ''
    };

    // Kredensial Demo Terproteksi (Tersimpan sebagai Hash SHA-256 + Salt acak)
    const DEMO_USERS = [
      { username: 'kepsek', salt: 'dafi_salt_ks', passwordHash: 'f0acabda1ee2611ad4497afd9269f19ed09b4597b469c3f972479a571590edcd', namaLengkap: 'Ustadz Kepala SMP DAFI', role: 'kepsek', jabatan: 'Kepala Sekolah' },
      { username: 'guru', salt: 'dafi_salt_gr', passwordHash: '4465075cfe20f74d04f1f08ff7ecfbd300fef34a3065a07bdde0bf2b724b91c3', namaLengkap: 'Ustadz/Ustadzah Pendidik', role: 'guru', jabatan: 'Guru Mata Pelajaran' },
      { username: 'admin', salt: 'dafi_salt_ad', passwordHash: '118b9667af783bc40b6efe2931ec98120d47831e9a9c1196a2e5dc88a779bf30', namaLengkap: 'Admin Tata Usaha DAFI', role: 'admin', jabatan: 'Kepala Tata Usaha' }
    ];

    async function hashPasswordClient(password, salt) {
      const combined = (salt || 'dafi_salt') + ':' + String(password || '');
      if (window.crypto && window.crypto.subtle) {
        try {
          const msgBuffer = new TextEncoder().encode(combined);
          const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgBuffer);
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          return hashArray.map(function(b) { return b.toString(16).padStart(2, '0'); }).join('');
        } catch (e) {
          // Fallback
        }
      }
      return combined;
    }

    function isValidGasUrl(url) {
      if (window.GasConnector && typeof window.GasConnector.isValidUrl === 'function') {
        return window.GasConnector.isValidUrl(url);
      }
      if (!url) return false;
      const s = String(url).trim();
      return s.startsWith('https://script.google.com/macros/s/') && s.endsWith('/exec');
    }

    function isSafePdfUrl(url) {
      if (!url) return false;
      const s = String(url).trim();
      if (s.startsWith('blob:') || s.startsWith('data:application/pdf;base64,')) return true;
      try {
        const u = new URL(s);
        return u.protocol === 'https:' && (
          u.hostname === 'drive.google.com' ||
          u.hostname === 'docs.google.com'
        );
      } catch (e) {
        return false;
      }
    }

    function sanitizeFileNameClient(name) {
      if (!name) return 'Dokumen_SMP_DAFI.pdf';
      let safe = String(name).replace(/[\/\\:\*\?"<>\|]/g, '_').replace(/[^a-zA-Z0-9_\.\-\s]/g, '');
      if (!safe.toLowerCase().endsWith('.pdf')) {
        safe += '.pdf';
      }
      return safe;
    }

    function safeGetStorage(key, fallback) {
      try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
      } catch (e) {
        return fallback;
      }
    }

    function safeSetStorage(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        // Ignore storage restrictions
      }
    }

    function initApp() {
      appState.documents = safeGetStorage(STORAGE_KEY_DOCS, null) || JSON.parse(JSON.stringify(INITIAL_DOCUMENTS));
      appState.standards = safeGetStorage(STORAGE_KEY_STANDARDS, null) || JSON.parse(JSON.stringify(INITIAL_STANDARD_DOCS));
      if (window.GasConnector && typeof window.GasConnector.getActiveUrl === 'function') {
        appState.gasWebAppUrl = window.GasConnector.getActiveUrl();
      } else {
        appState.gasWebAppUrl = safeGetStorage(STORAGE_KEY_GAS_URL, '');
      }
      appState.currentUser = safeGetStorage(STORAGE_KEY_USER, null);
      appState.authToken = safeGetStorage(STORAGE_KEY_TOKEN, '');

      if (appState.currentUser && !appState.authToken && appState.currentUser.token) {
        appState.authToken = appState.currentUser.token;
      }

      if (appState.documents.length > 0 && !appState.selectedDocId) {
        appState.selectedDocId = appState.documents[0].id;
      }

      const gasInput = document.getElementById('gasUrlInput');
      if (gasInput) gasInput.value = appState.gasWebAppUrl;

      const gasCodeBlock = document.getElementById('gasCodeBlock');
      if (gasCodeBlock) { getGasCode().then(function(code) { gasCodeBlock.textContent = code; }); }

      updateAuthUI();
      updateGasStatusBadge();
      refreshAllViews();
    }

    function refreshAllViews() {
      updateMetricsAndCounters();
      renderCatalog();
      renderSidebarQueueAndShare();
      renderSmartAssistant();
      populateHistoryFilterDropdown();
      renderGlobalHistory();
    }

    function showToast(message, type) {
      const container = document.getElementById('toastContainer');
      if (!container) return;

      const bgClass = type === 'error'
        ? 'bg-red-600 text-white'
        : type === 'warning'
        ? 'bg-amber-500 text-slate-950'
        : 'bg-slate-900 text-white';

      const toast = document.createElement('div');
      toast.className = `pointer-events-auto px-4 py-3 rounded-xl shadow-lg text-xs sm:text-sm font-medium flex items-center justify-between gap-3 ${bgClass}`;
      toast.innerHTML = `
        <span>${escapeHtml(message)}</span>
        <button type="button" class="opacity-75 hover:opacity-100 font-bold text-sm leading-none">&times;</button>
      `;
      toast.querySelector('button').addEventListener('click', function() {
        toast.remove();
      });

      container.appendChild(toast);
      setTimeout(function() {
        if (toast.parentNode) toast.remove();
      }, 4000);
    }

    function escapeHtml(str) {
      return String(str || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    function switchMainTab(tabName) {
      appState.activeTab = tabName;
      const tabs = ['catalog', 'smart', 'history', 'gas'];
      tabs.forEach(function(t) {
        const panel = document.getElementById('tabPanel-' + t);
        const btn = document.getElementById('tabBtn-' + t);
        if (panel) {
          panel.classList.toggle('hidden', t !== tabName);
        }
        if (btn) {
          if (t === tabName) {
            btn.className = 'px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-[#3B66F5] shadow-xs whitespace-nowrap flex items-center gap-1.5 transition';
          } else {
            btn.className = 'px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 whitespace-nowrap flex items-center gap-1.5 transition';
          }
        }
      });
    }

    function updateAuthUI() {
      const authArea = document.getElementById('authHeaderArea');
      const roleBannerBadge = document.getElementById('roleBannerBadge');
      const roleBannerDesc = document.getElementById('roleBannerDesc');
      const bannerLoginBtn = document.getElementById('bannerLoginBtn');

      if (!authArea) return;

      if (appState.currentUser) {
        const u = appState.currentUser;
        authArea.innerHTML = `
          <div class="flex items-center gap-2 bg-blue-50/80 border border-blue-200 px-2.5 py-1 rounded-xl">
            <div class="w-6 h-6 rounded-full bg-[#3B66F5] text-white text-xs font-bold flex items-center justify-center">
              ${escapeHtml(u.namaLengkap.charAt(0))}
            </div>
            <div class="hidden sm:block text-left">
              <div class="text-xs font-bold text-slate-800 leading-none">${escapeHtml(u.namaLengkap)}</div>
              <div class="text-[10px] text-[#3B66F5] font-semibold">${escapeHtml(u.jabatan)}</div>
            </div>
            <button type="button" onclick="handleLogout()" class="ml-1 px-2 py-0.5 rounded-lg bg-white hover:bg-red-50 text-slate-600 hover:text-red-600 text-[11px] font-semibold border border-slate-200 transition">
              Keluar
            </button>
          </div>
        `;
        if (roleBannerBadge) {
          roleBannerBadge.textContent = u.jabatan;
          roleBannerBadge.className = 'text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#3B66F5] border border-blue-200';
        }
        if (roleBannerDesc) {
          roleBannerDesc.textContent = 'Login aktif sebagai ' + u.namaLengkap;
        }
        if (bannerLoginBtn) {
          bannerLoginBtn.textContent = 'Akun: ' + u.jabatan;
          bannerLoginBtn.setAttribute('onclick', 'handleOpenUploadModal()');
        }
      } else {
        authArea.innerHTML = `
          <button type="button" onclick="openLoginModal()" class="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition">
            Login
          </button>
        `;
        if (roleBannerBadge) {
          roleBannerBadge.textContent = 'Mode Pengunjung Publik';
          roleBannerBadge.className = 'text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600';
        }
        if (bannerLoginBtn) {
          bannerLoginBtn.textContent = 'Login Pendidik / Admin';
          bannerLoginBtn.setAttribute('onclick', 'openLoginModal()');
        }
      }
    }

    function openLoginModal(customReason) {
      const modal = document.getElementById('loginModal');
      const reasonEl = document.getElementById('loginModalReason');
      const errBox = document.getElementById('loginErrorBox');
      if (errBox) errBox.classList.add('hidden');
      if (reasonEl && customReason) {
        reasonEl.textContent = customReason;
      }
      if (modal) modal.classList.remove('hidden');
    }

    function closeLoginModal() {
      const modal = document.getElementById('loginModal');
      if (modal) modal.classList.add('hidden');
    }

    function fillDemoCredentials(user, pass) {
      const uEl = document.getElementById('loginUsername');
      const pEl = document.getElementById('loginPassword');
      if (uEl) uEl.value = user;
      if (pEl) pEl.value = pass;
      const errBox = document.getElementById('loginErrorBox');
      if (errBox) errBox.classList.add('hidden');
    }

    let loginFailAttempts = 0;
    let loginLockoutUntil = 0;

    async function handleLoginSubmit(e) {
      e.preventDefault();
      const errBox = document.getElementById('loginErrorBox');
      const now = Date.now();

      // Proteksi Brute Force (Lockout)
      if (now < loginLockoutUntil) {
        const remaining = Math.ceil((loginLockoutUntil - now) / 1000);
        if (errBox) {
          errBox.textContent = `Akses login terkunci sementara demi keamanan. Coba lagi dalam ${remaining} detik.`;
          errBox.classList.remove('hidden');
        }
        return;
      }

      const username = (document.getElementById('loginUsername').value || '').trim().toLowerCase();
      const password = (document.getElementById('loginPassword').value || '').trim();

      if (!username || !password) {
        if (errBox) {
          errBox.textContent = 'Harap isi username dan kata sandi.';
          errBox.classList.remove('hidden');
        }
        return;
      }

      // 1. Jika terhubung ke Backend Google Apps Script, verifikasi dengan API backend
      if (isValidGasUrl(appState.gasWebAppUrl)) {
        try {
          let result;
          if (window.GasConnector && typeof window.GasConnector.login === 'function') {
            result = await window.GasConnector.login(username, password);
          } else {
            const resp = await fetch(appState.gasWebAppUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'text/plain;charset=utf-8' },
              body: JSON.stringify({ action: 'login', username: username, password: password }),
              redirect: 'follow'
            });
            result = await resp.json();
          }
          if (result && result.status === 'ok') {
            loginFailAttempts = 0;
            appState.authToken = result.token || '';
            appState.currentUser = Object.assign({}, result.user, { token: result.token });
            safeSetStorage(STORAGE_KEY_USER, appState.currentUser);
            safeSetStorage(STORAGE_KEY_TOKEN, appState.authToken);
            closeLoginModal();
            updateAuthUI();
            renderCatalog();
            renderSidebarQueueAndShare();
            showToast('Berhasil masuk secara aman sebagai ' + result.user.namaLengkap, 'success');
            return;
          } else {
            loginFailAttempts++;
            if (loginFailAttempts >= 5) {
              loginLockoutUntil = Date.now() + (30 * 1000);
            }
            if (errBox) {
              errBox.textContent = (result && result.message) ? result.message : 'Kredensial login tidak cocok.';
              errBox.classList.remove('hidden');
            }
            return;
          }
        } catch (netErr) {
          console.warn('Gagal menghubungi GAS, mencoba fallback validasi lokal.', netErr);
        }
      }

      // 2. Mode Demo Terproteksi (Offline/Fallback): Verifikasi Hash SHA-256 + Salt
      const found = DEMO_USERS.find(function(u) { return u.username === username; });
      let match = false;
      if (found) {
        const computedHash = await hashPasswordClient(password, found.salt);
        if (computedHash === found.passwordHash) {
          match = true;
        }
      }

      if (!match) {
        loginFailAttempts++;
        if (loginFailAttempts >= 5) {
          loginLockoutUntil = Date.now() + (30 * 1000);
          if (errBox) {
            errBox.textContent = 'Terlalu banyak percobaan gagal. Login diblokir sementara selama 30 detik.';
            errBox.classList.remove('hidden');
          }
        } else {
          if (errBox) {
            errBox.textContent = `Username atau kata sandi tidak cocok. (Percobaan ${loginFailAttempts}/5)`;
            errBox.classList.remove('hidden');
          }
        }
        return;
      }

      loginFailAttempts = 0;
      const demoToken = 'LOCAL_AUTH_' + found.role.toUpperCase() + '_' + Date.now();
      appState.authToken = demoToken;
      appState.currentUser = {
        username: found.username,
        namaLengkap: found.namaLengkap,
        role: found.role,
        jabatan: found.jabatan,
        token: demoToken
      };
      safeSetStorage(STORAGE_KEY_USER, appState.currentUser);
      safeSetStorage(STORAGE_KEY_TOKEN, demoToken);
      closeLoginModal();
      updateAuthUI();
      renderCatalog();
      renderSidebarQueueAndShare();
      showToast('Berhasil masuk sebagai ' + found.namaLengkap + ' (Mode Terproteksi SHA-256)', 'success');
    }

    function handleLogout() {
      appState.currentUser = null;
      appState.authToken = '';
      safeSetStorage(STORAGE_KEY_USER, null);
      safeSetStorage(STORAGE_KEY_TOKEN, null);
      updateAuthUI();
      renderCatalog();
      renderSidebarQueueAndShare();
      showToast('Anda telah keluar ke Mode Pengunjung Publik.', 'success');
    }

    function isStandardFulfilled(stdItem) {
      return appState.documents.find(function(doc) {
        if (doc.kategori !== stdItem.kategori) return false;
        const docText = (doc.judul + ' ' + (doc.kataKunci || []).join(' ') + ' ' + doc.ringkasan).toLowerCase();
        const matchCount = (stdItem.kataKunci || []).filter(function(kw) {
          return docText.indexOf(kw.toLowerCase()) !== -1;
        }).length;
        return matchCount >= 1 || calculateSimilarityScore(doc.judul, stdItem.judulSaran) >= 0.35;
      });
    }

    function updateMetricsAndCounters() {
      const total = appState.documents.length;
      const pubCount = appState.documents.filter(function(d) { return d.akses === 'Publik'; }).length;
      const intCount = total - pubCount;

      const countTatib = appState.documents.filter(function(d) { return d.kategori === 'Tata Tertib'; }).length;
      const countSop = appState.documents.filter(function(d) { return d.kategori === 'SOP'; }).length;
      const countSk = appState.documents.filter(function(d) { return d.kategori === 'SK'; }).length;
      const countSurat = appState.documents.filter(function(d) { return d.kategori === 'Surat Administratif'; }).length;

      let fulfilledCount = 0;
      appState.standards.forEach(function(std) {
        if (isStandardFulfilled(std)) fulfilledCount++;
      });
      const totalStd = appState.standards.length || 1;
      const missingCount = totalStd - fulfilledCount;
      const pct = Math.round((fulfilledCount / totalStd) * 100);

      const elTotal = document.getElementById('statTotalDocs');
      const elBreak = document.getElementById('statAccessBreakdown');
      const elTatib = document.getElementById('folderCountTatib');
      const elSop = document.getElementById('statSopTatib');
      const elSk = document.getElementById('statSkSurat');
      const elSurat = document.getElementById('folderCountSurat');
      const elPct = document.getElementById('statSmartCompleteness');
      const elSub = document.getElementById('statSmartSubtext');
      const navDocs = document.getElementById('navCountDocs');
      const navSmart = document.getElementById('navCountSmart');

      if (elTotal) elTotal.textContent = total;
      if (elBreak) elBreak.textContent = `${pubCount} Publik • ${intCount} Internal Pendidik`;
      if (elTatib) elTatib.textContent = countTatib;
      if (elSop) elSop.textContent = countSop;
      if (elSk) elSk.textContent = countSk;
      if (elSurat) elSurat.textContent = countSurat;
      const fAll = document.getElementById('folderBtnAll');
      const fTatib = document.getElementById('folderBtnTatib');
      const fSop = document.getElementById('folderBtnSop');
      const fSk = document.getElementById('folderBtnSk');
      const fSurat = document.getElementById('folderBtnSurat');
      if (fAll) fAll.setAttribute('data-files-label', `(${total}) Files`);
      if (fTatib) fTatib.setAttribute('data-files-label', `(${countTatib}) Files`);
      if (fSop) fSop.setAttribute('data-files-label', `(${countSop}) Files`);
      if (fSk) fSk.setAttribute('data-files-label', `(${countSk}) Files`);
      if (fSurat) fSurat.setAttribute('data-files-label', `(${countSurat}) Files`);
      if (elPct) elPct.textContent = pct + '%';
      if (elSub) elSub.textContent = `${missingCount} saran dokumen`;
      if (navDocs) navDocs.textContent = total;
      if (navSmart) navSmart.textContent = missingCount > 0 ? `${missingCount} Perlu Ditambah` : 'Lengkap';
    }

    function quickFilterCategory(category) {
      appState.selectedCategory = category;
      const pills = document.querySelectorAll('.cat-pill');
      pills.forEach(function(btn) {
        const isActive = btn.getAttribute('data-cat') === category;
        btn.classList.toggle('active-folder', isActive);
      });
      if (appState.activeTab !== 'catalog') {
        switchMainTab('catalog');
      }
      renderCatalog();
    }

    function setViewMode(mode) {
      appState.viewMode = mode;
      const btnGrid = document.getElementById('viewBtnGrid');
      const btnTable = document.getElementById('viewBtnTable');
      if (btnGrid && btnTable) {
        btnGrid.className = mode === 'grid'
          ? 'px-2.5 py-1 rounded-lg text-xs font-semibold bg-white text-slate-800 shadow-2xs'
          : 'px-2.5 py-1 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-800';
        btnTable.className = mode === 'table'
          ? 'px-2.5 py-1 rounded-lg text-xs font-semibold bg-white text-slate-800 shadow-2xs'
          : 'px-2.5 py-1 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-800';
      }
      renderCatalog();
    }

    function filterByTag(tagText) {
      const searchInput = document.getElementById('searchInput');
      if (searchInput) {
        searchInput.value = tagText;
        renderCatalog();
      }
    }

    function clearSearchAndFilters() {
      document.getElementById('searchInput').value = '';
      document.getElementById('filterCreator').value = 'ALL';
      document.getElementById('filterAccess').value = 'ALL';
      quickFilterCategory('ALL');
    }

    function getCategoryBadgeStyle(kategori) {
      if (kategori === 'Tata Tertib') return 'bg-red-50 text-red-600 border-red-200';
      if (kategori === 'SOP') return 'bg-blue-50 text-[#3B66F5] border-blue-200';
      if (kategori === 'SK') return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      return 'bg-orange-50 text-orange-600 border-orange-200';
    }

    // SVG Document Page Icon with Folded Ear & Colored Type Pill (Matches Reference Image)
    function getFileDocumentSvg(kategori, sizeClass) {
      let badgeColor = '#EF4444'; // Red for PDF / Tata Tertib
      let badgeText = 'PDF';
      if (kategori === 'SOP') {
        badgeColor = '#3B66F5'; // Royal Blue like DOC in reference
        badgeText = 'SOP';
      } else if (kategori === 'SK') {
        badgeColor = '#16A34A'; // Green like XLS in reference
        badgeText = 'SK';
      } else if (kategori === 'Surat Administratif') {
        badgeColor = '#F97316'; // Orange like PPT in reference
        badgeText = 'SRT';
      }

      const cls = sizeClass || 'w-14 h-16';
      return `
        <svg class="${cls} mx-auto" viewBox="0 0 56 64" fill="none">
          <path d="M10 6C10 3.79086 11.7909 2 14 2H35.1716C36.2324 2 37.2499 2.42143 38 3.17157L46.8284 12C47.5786 12.7501 48 13.7676 48 14.8284V58C48 60.2091 46.2091 62 44 62H14C11.7909 62 10 60.2091 10 58V6Z" fill="#F8FAFC" stroke="#94A3B8" stroke-width="2.2"/>
          <path d="M35 2.5V11C35 12.6569 36.3431 14 38 14H47.5" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/>
          <rect x="6" y="32" width="30" height="15" rx="3.5" fill="${badgeColor}"/>
          <text x="21" y="42.5" text-anchor="middle" fill="#FFFFFF" font-family="Plus Jakarta Sans, sans-serif" font-size="8.5" font-weight="800">${badgeText}</text>
        </svg>
      `;
    }

    function selectDocumentTile(docId, openImmediately) {
      appState.selectedDocId = docId;
      renderCatalog();
      renderSidebarQueueAndShare();
      if (openImmediately) {
        openPdfViewer(docId);
      }
    }

    function openSelectedDocViewer() {
      if (!appState.selectedDocId && appState.documents.length > 0) {
        appState.selectedDocId = appState.documents[0].id;
      }
      if (appState.selectedDocId) {
        openPdfViewer(appState.selectedDocId);
      }
    }

    function openSelectedDocRevision() {
      if (!appState.selectedDocId && appState.documents.length > 0) {
        appState.selectedDocId = appState.documents[0].id;
      }
      if (appState.selectedDocId) {
        openDirectUpdateVersion(appState.selectedDocId);
      }
    }

    function renderCatalog() {
      const query = (document.getElementById('searchInput').value || '').trim().toLowerCase();
      const creatorFilter = document.getElementById('filterCreator').value;
      const accessFilter = document.getElementById('filterAccess').value;
      const sortOrder = document.getElementById('sortOrder').value;
      const clearBtn = document.getElementById('clearSearchBtn');

      if (clearBtn) {
        clearBtn.classList.toggle('hidden', query.length === 0);
      }

      const filtered = appState.documents.filter(function(doc) {
        if (appState.selectedCategory !== 'ALL' && doc.kategori !== appState.selectedCategory) {
          return false;
        }
        if (creatorFilter !== 'ALL' && doc.pembuat !== creatorFilter) {
          return false;
        }
        if (accessFilter !== 'ALL' && doc.akses !== accessFilter) {
          return false;
        }
        if (query) {
          const haystack = [
            doc.judul,
            doc.nomorDokumen,
            doc.kategori,
            doc.pembuat,
            doc.ringkasan,
            (doc.kataKunci || []).join(' ')
          ].join(' ').toLowerCase();
          return haystack.indexOf(query) !== -1;
        }
        return true;
      });

      filtered.sort(function(a, b) {
        if (sortOrder === 'title') {
          return a.judul.localeCompare(b.judul);
        }
        if (sortOrder === 'version') {
          return (b.riwayat ? b.riwayat.length : 1) - (a.riwayat ? a.riwayat.length : 1);
        }
        return String(b.tanggalUpdate).localeCompare(String(a.tanggalUpdate));
      });

      const infoEl = document.getElementById('filterResultInfo');
      if (infoEl) {
        infoEl.textContent = `Menampilkan ${filtered.length} dari ${appState.documents.length} dokumen`;
      }

      const container = document.getElementById('catalogContainer');
      if (!container) return;

      if (filtered.length === 0) {
        container.innerHTML = `
          <div class="rounded-2xl border border-dashed border-slate-200 p-10 text-center space-y-3">
            <h3 class="text-base font-bold text-slate-700">Dokumen Tidak Ditemukan</h3>
            <p class="text-xs text-slate-400 max-w-md mx-auto">
              Tidak ada berkas PDF yang cocok dengan kata kunci pencarian Anda.
            </p>
            <div class="flex items-center justify-center gap-2 pt-1">
              <button type="button" onclick="clearSearchAndFilters()" class="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50">Reset Filter</button>
              <button type="button" onclick="prefillUploadFromSearch()" class="px-4 py-2 rounded-xl bg-[#3B66F5] text-xs font-semibold text-white hover:bg-[#2952D9]">+ Unggah Dokumen Ini</button>
            </div>
          </div>
        `;
        return;
      }

      if (appState.viewMode === 'table') {
        renderTableCatalog(container, filtered);
      } else {
        renderGridCatalog(container, filtered);
      }
    }

    // File Grid Styled Like the Reference UI Image (Clean Icon Tiles + Selected Blue Card Highlight)
    function renderGridCatalog(container, docs) {
      const tilesHtml = docs.map(function(doc) {
        const isSelected = appState.selectedDocId === doc.id;
        const isLocked = doc.akses === 'Internal Pendidik' && !appState.currentUser;
        const revCount = doc.riwayat ? doc.riwayat.length : 1;

        return `
          <div onclick="selectDocumentTile('${escapeHtml(doc.id)}', false)" class="file-tile ${isSelected ? 'selected-file' : ''} p-4 flex flex-col items-center text-center justify-between cursor-pointer relative group">
            <!-- Three Dots Menu on Selected or Hover (Matches Reference UI) -->
            <button type="button" onclick="event.stopPropagation(); openDocHistoryJump('${escapeHtml(doc.id)}')" class="${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} absolute top-2.5 right-2.5 w-6 h-6 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition" title="Riwayat ${revCount} Versi">
              ⋮
            </button>

            <div class="w-full space-y-2.5 pt-1">
              <!-- Document Icon with Category Color Pill -->
              <div onclick="event.stopPropagation(); openPdfViewer('${escapeHtml(doc.id)}')" class="transition-transform group-hover:scale-105">
                ${getFileDocumentSvg(doc.kategori, 'w-14 h-16')}
              </div>

              <!-- Title -->
              <div class="px-1">
                <h3 class="text-xs sm:text-[13px] font-semibold text-slate-700 line-clamp-2 leading-snug" title="${escapeHtml(doc.judul)}">
                  ${escapeHtml(doc.judul)}
                </h3>
                <p class="text-[11px] text-slate-400 mt-1">
                  ${escapeHtml(doc.tanggalUpdate)} • <span class="font-mono-code font-semibold text-slate-500">${escapeHtml(doc.versi)}</span>
                </p>
              </div>
            </div>

            <!-- Action Pills (Visible on Selected or Hover) -->
            <div class="w-full pt-3 mt-2 border-t border-slate-100/80 flex items-center justify-center gap-1.5">
              ${isLocked ? `
                <button type="button" onclick="event.stopPropagation(); openLoginModal('Dokumen &quot;${escapeHtml(doc.judul)}&quot; berstatus Internal Pendidik. Silakan login terlebih dahulu.')" class="w-full py-1.5 px-2.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 font-semibold text-[11px] transition">
                  🔒 Internal
                </button>
              ` : `
                <button type="button" onclick="event.stopPropagation(); openPdfViewer('${escapeHtml(doc.id)}')" class="flex-1 py-1.5 px-2.5 rounded-lg ${isSelected ? 'bg-[#3B66F5] text-white' : 'bg-slate-100 hover:bg-[#3B66F5] text-slate-700 hover:text-white'} font-semibold text-[11px] transition">
                  Baca PDF
                </button>
              `}
              <button type="button" onclick="event.stopPropagation(); openDirectUpdateVersion('${escapeHtml(doc.id)}')" class="py-1.5 px-2 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-[#3B66F5] font-semibold text-[11px] transition" title="Unggah Revisi Baru">
                ${revCount}v
              </button>
            </div>
          </div>
        `;
      }).join('');

      container.innerHTML = `<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pt-1">${tilesHtml}</div>`;
    }

    function renderTableCatalog(container, docs) {
      const rowsHtml = docs.map(function(doc) {
        const isLocked = doc.akses === 'Internal Pendidik' && !appState.currentUser;
        const catStyle = getCategoryBadgeStyle(doc.kategori);
        return `
          <tr onclick="selectDocumentTile('${escapeHtml(doc.id)}', false)" class="border-b border-slate-100 hover:bg-slate-50/80 transition cursor-pointer">
            <td class="py-3 px-3">
              <div class="font-semibold text-slate-800 text-xs sm:text-sm">${escapeHtml(doc.judul)}</div>
              <div class="text-[11px] font-mono-code text-slate-400">${escapeHtml(doc.nomorDokumen)}</div>
            </td>
            <td class="py-3 px-3">
              <span class="px-2 py-0.5 rounded-md text-[11px] font-semibold border ${catStyle}">${escapeHtml(doc.kategori)}</span>
            </td>
            <td class="py-3 px-3 text-xs text-slate-600">${escapeHtml(doc.pembuat)}</td>
            <td class="py-3 px-3 font-mono-code text-xs font-semibold text-slate-700">${escapeHtml(doc.versi)}</td>
            <td class="py-3 px-3 text-xs text-slate-500">${escapeHtml(doc.tanggalUpdate)}</td>
            <td class="py-3 px-3 text-right">
              ${isLocked ? `
                <button type="button" onclick="event.stopPropagation(); openLoginModal('Silakan login untuk membaca dokumen internal ini.')" class="px-3 py-1 rounded-lg bg-amber-100 text-amber-800 font-semibold text-xs">Login</button>
              ` : `
                <button type="button" onclick="event.stopPropagation(); openPdfViewer('${escapeHtml(doc.id)}')" class="px-3 py-1 rounded-lg bg-[#3B66F5] text-white font-semibold text-xs">Baca PDF</button>
              `}
            </td>
          </tr>
        `;
      }).join('');

      container.innerHTML = `
        <div class="rounded-xl border border-slate-200/80 overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200/80 text-[11px] font-bold uppercase text-slate-400">
                <th class="py-2.5 px-3">Dokumen</th>
                <th class="py-2.5 px-3">Kategori</th>
                <th class="py-2.5 px-3">Pembuat</th>
                <th class="py-2.5 px-3">Versi</th>
                <th class="py-2.5 px-3">Tanggal</th>
                <th class="py-2.5 px-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>${rowsHtml}</tbody>
          </table>
        </div>
      `;
    }

    // -----------------------------------------------------------------------
    // RIGHT SIDEBAR RENDERER: UPLOAD QUEUE + SHARE CARD (MATCHES IMAGE)
    // -----------------------------------------------------------------------
    function renderSidebarQueueAndShare() {
      const queueEl = document.getElementById('sidebarUploadQueue');
      const shareTitleEl = document.getElementById('shareCardDocTitle');
      const shareAccessSelect = document.getElementById('shareAccessQuickSelect');
      const sharePeopleEl = document.getElementById('sharePeopleList');

      const recentDocs = appState.documents.slice(0, 3);
      if (queueEl) {
        queueEl.innerHTML = recentDocs.map(function(doc, idx) {
          if (idx === 0) {
            return `
              <div onclick="openPdfViewer('${escapeHtml(doc.id)}')" class="p-3 rounded-xl bg-[#F2F6FF] border border-[#DCE6FF] cursor-pointer transition hover:shadow-xs space-y-2">
                <div class="flex items-center justify-between gap-2">
                  <div class="flex items-center gap-2.5 min-w-0">
                    <div class="w-8 h-9 shrink-0 flex items-center justify-center">
                      ${getFileDocumentSvg(doc.kategori, 'w-7 h-8')}
                    </div>
                    <div class="min-w-0">
                      <div class="text-xs font-semibold text-slate-700 truncate">${escapeHtml(doc.judul)}.pdf</div>
                      <div class="text-[10px] text-slate-400">${escapeHtml(doc.ukuran)} • ${escapeHtml(doc.versi)}</div>
                    </div>
                  </div>
                  <span class="text-[11px] font-bold text-[#3B66F5] shrink-0">100%</span>
                </div>
                <div class="w-full h-1.5 rounded-full bg-blue-100 overflow-hidden">
                  <div class="h-full bg-[#3B66F5] rounded-full" style="width: 100%"></div>
                </div>
              </div>
            `;
          }
          return `
            <div onclick="openPdfViewer('${escapeHtml(doc.id)}')" class="p-2.5 rounded-xl bg-white border border-slate-200/80 hover:border-blue-300 cursor-pointer flex items-center justify-between gap-2 transition">
              <div class="flex items-center gap-2.5 min-w-0">
                <div class="w-8 h-9 shrink-0 flex items-center justify-center">
                  ${getFileDocumentSvg(doc.kategori, 'w-7 h-8')}
                </div>
                <div class="min-w-0">
                  <div class="text-xs font-semibold text-slate-700 truncate">${escapeHtml(doc.judul)}.pdf</div>
                  <div class="text-[10px] text-slate-400">${escapeHtml(doc.ukuran)} • ${escapeHtml(doc.tanggalUpdate)}</div>
                </div>
              </div>
              <button type="button" onclick="event.stopPropagation(); openDirectUpdateVersion('${escapeHtml(doc.id)}')" class="p-1.5 text-slate-400 hover:text-[#3B66F5] transition" title="Perbarui Versi">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
              </button>
            </div>
          `;
        }).join('');
      }

      const selectedDoc = appState.documents.find(function(d) { return d.id === appState.selectedDocId; }) || appState.documents[0];
      if (!selectedDoc) return;

      if (shareTitleEl) {
        const shortName = selectedDoc.judul.length > 28 ? selectedDoc.judul.slice(0, 28) + '...' : selectedDoc.judul;
        shareTitleEl.textContent = shortName + '.pdf';
      }

      if (shareAccessSelect) {
        shareAccessSelect.value = selectedDoc.akses;
      }

      if (sharePeopleEl) {
        const people = [
          { initials: 'KS', bg: 'bg-[#E59843]', name: 'Kepala SMP DAFI', email: 'kepsek@smpdafi.sch.id', roleLabel: 'file owner', isOwner: true },
          { initials: 'WK', bg: 'bg-[#3C7A5B]', name: 'Waka Kurikulum & Kesiswaan', email: 'kurikulum@smpdafi.sch.id', roleLabel: 'can edit ▾', isOwner: false },
          { initials: 'GR', bg: 'bg-[#4F6BED]', name: 'Dewan Guru & Wali Kelas', email: 'guru@smpdafi.sch.id', roleLabel: selectedDoc.akses === 'Publik' ? 'can view ▾' : 'internal login ▾', isOwner: false }
        ];

        sharePeopleEl.innerHTML = people.map(function(p) {
          return `
            <div class="flex items-center justify-between gap-3">
              <div class="flex items-center gap-3 min-w-0">
                <div class="w-9 h-9 rounded-full ${p.bg} text-white text-xs font-bold flex items-center justify-center shrink-0">
                  ${p.initials}
                </div>
                <div class="min-w-0">
                  <div class="text-xs font-bold text-slate-700 truncate">${p.name}</div>
                  <div class="text-[11px] text-slate-400 truncate">${p.email}</div>
                </div>
              </div>
              ${p.isOwner ? `
                <span class="px-2.5 py-1 rounded-md bg-blue-50 text-[#3B66F5] text-[11px] font-semibold shrink-0">file owner</span>
              ` : `
                <button type="button" onclick="handleQuickAccessChange()" class="text-[11px] font-medium text-slate-500 hover:text-[#3B66F5] shrink-0">${p.roleLabel}</button>
              `}
            </div>
          `;
        }).join('');
      }
    }

    function handleQuickSidebarAction() {
      const input = document.getElementById('quickSidebarCheckInput');
      const val = (input ? input.value : '').trim();
      if (!val) {
        handleOpenUploadModal();
        return;
      }
      if (val.indexOf('script.google.com') !== -1) {
        appState.gasWebAppUrl = val;
        safeSetStorage(STORAGE_KEY_GAS_URL, val);
        if (window.GasConnector && typeof window.GasConnector.setActiveUrl === 'function') {
          window.GasConnector.setActiveUrl(val);
        }
        const gasUrlInput = document.getElementById('gasUrlInput');
        if (gasUrlInput) gasUrlInput.value = val;
        updateGasStatusBadge();
        showToast('URL Endpoint GAS berhasil disimpan!', 'success');
        return;
      }
      // Jika bukan URL GAS, buka modal upload dengan prefill judul
      handleOpenUploadModal({
        judul: val,
        kategori: 'SOP',
        pembuat: 'Kepala Sekolah',
        kataKunci: [val.toLowerCase()],
        alasan: ''
      });
    }

    function handleQuickAccessChange() {
      const sel = document.getElementById('shareAccessQuickSelect');
      const selectedDoc = appState.documents.find(function(d) { return d.id === appState.selectedDocId; });
      if (!selectedDoc || !sel) return;

      if (!appState.currentUser) {
        openLoginModal('Silakan login terlebih dahulu untuk mengubah hak akses dokumen "' + selectedDoc.judul + '".');
        sel.value = selectedDoc.akses;
        return;
      }

      selectedDoc.akses = sel.value;
      safeSetStorage(STORAGE_KEY_DOCS, appState.documents);
      refreshAllViews();
      showToast(`Hak akses "${selectedDoc.judul}" diubah menjadi ${selectedDoc.akses}.`, 'success');
    }

    // -----------------------------------------------------------------------
    // IN-APP PDF READER & RIWAYAT VERSI
    // -----------------------------------------------------------------------
    function openPdfViewer(docId, versionIdx) {
      const doc = appState.documents.find(function(d) { return d.id === docId; });
      if (!doc) return;

      if (doc.akses === 'Internal Pendidik' && !appState.currentUser) {
        openLoginModal('Dokumen "' + doc.judul + '" bersifat Internal Pendidik SMP DAFI. Silakan login terlebih dahulu.');
        return;
      }

      appState.selectedDocId = docId;
      appState.currentViewingDocId = docId;
      const historyList = doc.riwayat && doc.riwayat.length > 0 ? doc.riwayat : [
        { versi: doc.versi, tanggalUpdate: doc.tanggalUpdate, diperbaruiOleh: doc.pembuat, catatanPerubahan: 'Rilis dokumen.', ukuran: doc.ukuran }
      ];
      appState.currentViewingVersionIdx = typeof versionIdx === 'number' ? versionIdx : historyList.length - 1;
      appState.pdfZoom = 1.0;

      renderPdfViewerContent();
      renderSidebarQueueAndShare();
      document.getElementById('pdfViewerModal').classList.remove('hidden');
    }

    function closePdfViewerModal() {
      document.getElementById('pdfViewerModal').classList.add('hidden');
    }

    function handleViewerVersionChange() {
      const sel = document.getElementById('viewerVersionSelect');
      if (!sel) return;
      appState.currentViewingVersionIdx = parseInt(sel.value, 10) || 0;
      renderPdfViewerContent();
    }

    function adjustPdfZoom(delta) {
      appState.pdfZoom = Math.min(1.4, Math.max(0.75, Math.round((appState.pdfZoom + delta) * 100) / 100));
      const sheet = document.getElementById('printablePdfArea');
      const label = document.getElementById('pdfZoomLabel');
      if (sheet) {
        sheet.style.transform = `scale(${appState.pdfZoom})`;
      }
      if (label) {
        label.textContent = Math.round(appState.pdfZoom * 100) + '%';
      }
    }

    function printCurrentPdf() {
      window.print();
    }

    function renderPdfViewerContent() {
      const doc = appState.documents.find(function(d) { return d.id === appState.currentViewingDocId; });
      if (!doc) return;

      const historyList = doc.riwayat && doc.riwayat.length > 0 ? doc.riwayat : [
        { versi: doc.versi, tanggalUpdate: doc.tanggalUpdate, diperbaruiOleh: doc.pembuat, catatanPerubahan: 'Rilis dokumen.', ukuran: doc.ukuran }
      ];
      const activeVer = historyList[appState.currentViewingVersionIdx] || historyList[historyList.length - 1];
      const isLatest = appState.currentViewingVersionIdx === historyList.length - 1;

      document.getElementById('viewerDocCategoryBadge').textContent = doc.kategori;
      document.getElementById('viewerDocTitle').textContent = doc.judul;
      document.getElementById('viewerDocSubtitle').textContent = `${doc.nomorDokumen} • Oleh: ${doc.pembuat} • Akses: ${doc.akses}`;
      document.getElementById('pdfZoomLabel').textContent = Math.round(appState.pdfZoom * 100) + '%';

      const verSelect = document.getElementById('viewerVersionSelect');
      verSelect.innerHTML = historyList.map(function(v, idx) {
        const tag = idx === historyList.length - 1 ? ' (Terbaru)' : ' (Arsip)';
        const selected = idx === appState.currentViewingVersionIdx ? 'selected' : '';
        return `<option value="${idx}" ${selected}>${escapeHtml(v.versi)}${tag} - ${escapeHtml(v.tanggalUpdate)}</option>`;
      }).join('');

      const nativeIframe = document.getElementById('nativePdfIframe');
      const printableArea = document.getElementById('printablePdfArea');
      const extNotice = document.getElementById('externalPdfNotice');
      const extLink = document.getElementById('externalPdfDirectLink');

      const activeBlobOrDrive = activeVer.pdfBlobUrl || doc.pdfBlobUrl || activeVer.driveViewUrl || doc.driveViewUrl;
      if (activeBlobOrDrive && isSafePdfUrl(activeBlobOrDrive)) {
        extNotice.classList.remove('hidden');
        extLink.href = activeBlobOrDrive;
        nativeIframe.src = activeBlobOrDrive;
        nativeIframe.classList.remove('hidden');
      } else {
        extNotice.classList.add('hidden');
        extLink.removeAttribute('href');
        nativeIframe.src = 'about:blank';
        nativeIframe.classList.add('hidden');
      }

      const pasalList = (doc.isiPasal && doc.isiPasal.length > 0)
        ? doc.isiPasal
        : [
            'Ketentuan Umum: ' + doc.ringkasan,
            'Pelaksanaan: Seluruh tenaga pendidik dan unit kerja terkait di lingkungan SMP DAFI wajib melaksanakan ketentuan dalam dokumen ini secara tertib dan bertanggung jawab.',
            'Evaluasi & Pembaruan: Dokumen ini ditinjau secara berkala setiap semester dan dicatat riwayat perubahannya pada DDMS (DAFI Document Management System) SMP DAFI.'
          ];

      const pasalHtml = pasalList.map(function(p, i) {
        return `
          <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm leading-relaxed text-slate-800">
            <span class="font-bold text-[#3B66F5]">Butir ${i + 1}:</span> ${escapeHtml(p)}
          </div>
        `;
      }).join('');

      printableArea.style.transform = `scale(${appState.pdfZoom})`;
      printableArea.innerHTML = `
        <div class="border-b-4 border-double border-slate-800 pb-4 flex items-center justify-between gap-4">
          <div class="flex items-center gap-3.5">
            <div class="w-14 h-14 rounded-xl bg-[#3B66F5] text-white flex items-center justify-center font-extrabold text-lg shrink-0">
              DAFI
            </div>
            <div>
              <div class="text-xs font-bold uppercase tracking-widest text-[#3B66F5]">Yayasan Pondok Pesantren Darul Fikri</div>
              <div class="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">SEKOLAH MENENGAH PERTAMA (SMP) DAFI</div>
              <div class="text-[11px] text-slate-500">DDMS - DAFI Document Management System • Sidoarjo, Jawa Timur</div>
            </div>
          </div>
          <div class="text-right shrink-0">
            <span class="inline-block px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 font-mono-code text-xs font-bold text-[#3B66F5]">
              ${escapeHtml(activeVer.versi)}
            </span>
            <div class="text-[10px] text-slate-400 mt-1">${isLatest ? 'DOKUMEN AKTIF' : 'ARSIP VERSI LAMA'}</div>
          </div>
        </div>

        ${!isLatest ? `
          <div class="p-3 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-900 font-medium">
            Perhatian: Anda sedang membaca arsip terdahulu (<strong>${escapeHtml(activeVer.versi)}</strong>, tanggal ${escapeHtml(activeVer.tanggalUpdate)}). Versi terbaru dokumen ini adalah <strong>${escapeHtml(doc.versi)}</strong>.
          </div>
        ` : ''}

        <div class="text-center space-y-1 py-2">
          <div class="text-xs font-bold uppercase tracking-widest text-slate-400">${escapeHtml(doc.kategori)} RESMI SEKOLAH</div>
          <h2 class="text-base sm:text-lg font-extrabold text-slate-900 uppercase max-w-xl mx-auto leading-snug">
            ${escapeHtml(doc.judul)}
          </h2>
          <div class="text-xs font-mono-code text-slate-500">Nomor: ${escapeHtml(doc.nomorDokumen)}</div>
        </div>

        <div class="space-y-1.5">
          <div class="text-xs font-bold uppercase tracking-wider text-slate-400">I. Pokok Tujuan &amp; Ruang Lingkup</div>
          <p class="text-xs sm:text-sm text-slate-700 leading-relaxed bg-blue-50/50 p-3.5 rounded-xl border border-blue-100">
            ${escapeHtml(doc.ringkasan)}
          </p>
        </div>

        <div class="space-y-2.5">
          <div class="text-xs font-bold uppercase tracking-wider text-slate-400">II. Uraian Ketentuan / Standar Operasional</div>
          ${pasalHtml}
        </div>

        <div class="p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-xs space-y-1">
          <div class="font-bold text-slate-800">Catatan Riwayat Pembaruan (${escapeHtml(activeVer.versi)}):</div>
          <p class="text-slate-600">${escapeHtml(activeVer.catatanPerubahan)} — Diperbarui oleh <strong>${escapeHtml(activeVer.diperbaruiOleh)}</strong> pada ${escapeHtml(activeVer.tanggalUpdate)}.</p>
        </div>

        <div class="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 text-xs">
          <div class="space-y-1 text-slate-400">
            <div>ID Arsip Digital: <span class="font-mono-code font-semibold text-slate-700">${escapeHtml(doc.id)}</span></div>
            <div>Status Akses: <span class="font-semibold text-slate-700">${escapeHtml(doc.akses)}</span></div>
            <div>Terverifikasi di DDMS - DAFI Document Management System</div>
          </div>
          <div class="text-left sm:text-right space-y-4">
            <div>
              <div>Ditetapkan di: Sidoarjo</div>
              <div>Pada tanggal: <strong>${escapeHtml(activeVer.tanggalUpdate)}</strong></div>
              <div class="font-bold text-slate-800 mt-1">${escapeHtml(doc.pembuat)} SMP DAFI</div>
            </div>
            <div class="inline-block px-3 py-1 rounded-lg border border-blue-300 bg-blue-50 text-[#3B66F5] font-semibold text-[11px]">
              ✓ Disahkan Secara Digital — SMP DAFI
            </div>
          </div>
        </div>
      `;

      const metaContainer = document.getElementById('viewerMetadataList');
      metaContainer.innerHTML = `
        <div class="grid grid-cols-3 gap-1 py-1.5 border-b border-slate-100">
          <span class="text-slate-400">Nomor:</span>
          <span class="col-span-2 font-mono-code font-semibold text-slate-800">${escapeHtml(doc.nomorDokumen)}</span>
        </div>
        <div class="grid grid-cols-3 gap-1 py-1.5 border-b border-slate-100">
          <span class="text-slate-400">Kategori:</span>
          <span class="col-span-2 font-semibold text-slate-800">${escapeHtml(doc.kategori)}</span>
        </div>
        <div class="grid grid-cols-3 gap-1 py-1.5 border-b border-slate-100">
          <span class="text-slate-400">Pembuat:</span>
          <span class="col-span-2 font-semibold text-slate-800">${escapeHtml(doc.pembuat)}</span>
        </div>
        <div class="grid grid-cols-3 gap-1 py-1.5 border-b border-slate-100">
          <span class="text-slate-400">Hak Akses:</span>
          <span class="col-span-2 font-semibold text-slate-800">${escapeHtml(doc.akses)}</span>
        </div>
        <div class="grid grid-cols-3 gap-1 py-1.5 border-b border-slate-100">
          <span class="text-slate-400">Ukuran PDF:</span>
          <span class="col-span-2 text-slate-800">${escapeHtml(activeVer.ukuran || doc.ukuran)}</span>
        </div>
        <div class="py-1.5">
          <span class="text-slate-400 block mb-1">Kata Kunci:</span>
          <div class="flex flex-wrap gap-1">
            ${(doc.kataKunci || []).map(function(k) {
              return `<span class="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[11px]">#${escapeHtml(k)}</span>`;
            }).join('')}
          </div>
        </div>
      `;

      document.getElementById('viewerHistoryCount').textContent = historyList.length + ' Versi';
      const timelineContainer = document.getElementById('viewerVersionTimeline');
      timelineContainer.innerHTML = historyList.slice().reverse().map(function(v, revIdx) {
        const realIdx = historyList.length - 1 - revIdx;
        const isCurrentSelected = realIdx === appState.currentViewingVersionIdx;
        return `
          <div class="p-3 rounded-xl border ${isCurrentSelected ? 'border-[#3B66F5] bg-blue-50/40' : 'border-slate-200 bg-slate-50'} space-y-1">
            <div class="flex items-center justify-between">
              <span class="font-mono-code text-xs font-bold ${isCurrentSelected ? 'text-[#3B66F5]' : 'text-slate-800'}">
                ${escapeHtml(v.versi)} ${realIdx === historyList.length - 1 ? '(Terbaru)' : ''}
              </span>
              <span class="text-[11px] text-slate-400">${escapeHtml(v.tanggalUpdate)}</span>
            </div>
            <p class="text-xs text-slate-600 leading-snug">${escapeHtml(v.catatanPerubahan)}</p>
            <div class="flex items-center justify-between pt-1 text-[11px] text-slate-400">
              <span>Oleh: ${escapeHtml(v.diperbaruiOleh)}</span>
              ${!isCurrentSelected ? `
                <button type="button" onclick="openPdfViewer('${escapeHtml(doc.id)}', ${realIdx})" class="font-semibold text-[#3B66F5] hover:underline">Buka Versi Ini</button>
              ` : `<span class="font-semibold text-[#3B66F5]">Sedang Dibaca</span>`}
            </div>
          </div>
        `;
      }).join('');
    }

    function openUpdateFromViewer() {
      const docId = appState.currentViewingDocId;
      closePdfViewerModal();
      openDirectUpdateVersion(docId);
    }

    function openDocHistoryJump(docId) {
      switchMainTab('history');
      const sel = document.getElementById('historyDocFilter');
      if (sel) {
        sel.value = docId;
        renderGlobalHistory();
      }
    }

    function handleOpenUploadModal(prefillData) {
      if (!appState.currentUser) {
        openLoginModal('Untuk menjaga keamanan arsip DDMS SMP DAFI, fitur Unggah & Pembaruan Dokumen PDF memerlukan login terlebih dahulu.');
        return;
      }

      appState.pendingUploadBase64 = null;
      appState.pendingUploadBlobUrl = null;
      appState.pendingUploadFileName = '';
      appState.pendingUploadFileSize = '';
      document.getElementById('selectedFileNameDisplay').textContent = 'Klik untuk memilih file .PDF dari perangkat Anda';
      document.getElementById('selectedFileSizeDisplay').textContent = 'Mendukung pratinjau langsung di aplikasi & konversi Base64 ke Google Drive';
      document.getElementById('formPdfFile').value = '';
      const bFile = document.getElementById('formBatchPdfFiles');
      if (bFile) bFile.value = '';

      populateExistingDocDropdown();
      switchUploadFormMode('new');

      if (prefillData) {
        document.getElementById('formJudul').value = prefillData.judul || '';
        document.getElementById('formKategori').value = prefillData.kategori || 'SOP';
        document.getElementById('formPembuat').value = prefillData.pembuat || appState.currentUser.jabatan || 'Kepala Sekolah';
        document.getElementById('formKataKunci').value = (prefillData.kataKunci || []).join(', ');
        document.getElementById('formRingkasan').value = prefillData.alasan || '';
        autoGenerateDocNumber();
        checkUploadSimilarityLive();
      } else {
        document.getElementById('uploadDocForm').reset();
        document.getElementById('formVersi').value = 'v1.0';
        document.getElementById('formCatatanRevisi').value = 'Unggahan dokumen resmi awal (rilis pertama).';
        document.getElementById('smartDuplicateAlert').classList.add('hidden');
      }

      document.getElementById('uploadModal').classList.remove('hidden');
    }

    function closeUploadModal() {
      document.getElementById('uploadModal').classList.add('hidden');
    }

    function populateExistingDocDropdown() {
      const sel = document.getElementById('formSelectExistingDoc');
      if (!sel) return;
      sel.innerHTML = appState.documents.map(function(d) {
        return `<option value="${escapeHtml(d.id)}">[${escapeHtml(d.versi)}] ${escapeHtml(d.judul)} (${escapeHtml(d.nomorDokumen)})</option>`;
      }).join('');
    }

    function switchUploadFormMode(mode, targetDocId) {
      document.getElementById('formMode').value = mode;
      const btnNew = document.getElementById('modeBtnNew');
      const btnUpdate = document.getElementById('modeBtnUpdate');
      const btnBatch = document.getElementById('modeBtnBatch');
      const existingWrapper = document.getElementById('existingDocSelectWrapper');
      const singleFields = document.getElementById('singleUploadFields');
      const batchFields = document.getElementById('batchUploadFields');
      const badge = document.getElementById('uploadModalModeBadge');
      const title = document.getElementById('uploadModalTitle');
      const submitSingleBtn = document.getElementById('submitUploadBtn');
      const submitBatchBtn = document.getElementById('submitBatchBtn');

      const activeBtnCls = 'py-2 px-1 text-center text-xs font-semibold rounded-lg bg-white text-slate-900 shadow-xs transition';
      const inactiveBtnCls = 'py-2 px-1 text-center text-xs font-semibold rounded-lg text-slate-600 hover:text-slate-900 transition';

      if (btnNew) btnNew.className = mode === 'new' ? activeBtnCls : inactiveBtnCls;
      if (btnUpdate) btnUpdate.className = mode === 'update' ? activeBtnCls : inactiveBtnCls;
      if (btnBatch) btnBatch.className = (mode === 'batch' ? activeBtnCls : inactiveBtnCls) + ' flex items-center justify-center gap-1';

      if (mode === 'batch') {
        if (singleFields) singleFields.classList.add('hidden');
        if (batchFields) batchFields.classList.remove('hidden');
        if (submitSingleBtn) submitSingleBtn.classList.add('hidden');
        if (submitBatchBtn) submitBatchBtn.classList.remove('hidden');
        if (badge) badge.textContent = 'Mode Upload Massal';
        if (title) title.textContent = 'Upload Banyak Berkas PDF Sekaligus';
        return;
      }

      if (singleFields) singleFields.classList.remove('hidden');
      if (batchFields) batchFields.classList.add('hidden');
      if (submitSingleBtn) submitSingleBtn.classList.remove('hidden');
      if (submitBatchBtn) submitBatchBtn.classList.add('hidden');

      if (mode === 'update') {
        if (existingWrapper) existingWrapper.classList.remove('hidden');
        if (badge) badge.textContent = 'Mode Perbarui Versi Dokumen';
        if (title) title.textContent = 'Unggah Revisi / Pembaruan Versi Dokumen PDF';
        if (submitSingleBtn) submitSingleBtn.textContent = 'Simpan Versi Baru';
        const dupAlert = document.getElementById('smartDuplicateAlert');
        if (dupAlert) dupAlert.classList.add('hidden');

        if (targetDocId) {
          const sel = document.getElementById('formSelectExistingDoc');
          if (sel) sel.value = targetDocId;
        }
        populateFormForVersionUpdate();
      } else {
        if (existingWrapper) existingWrapper.classList.add('hidden');
        if (badge) badge.textContent = 'Unggah Dokumen Baru';
        if (title) title.textContent = 'Upload File PDF ke DDMS SMP DAFI';
        if (submitSingleBtn) submitSingleBtn.textContent = 'Simpan & Publikasikan PDF';
        const vEl = document.getElementById('formVersi');
        if (vEl) vEl.value = 'v1.0';
        const crEl = document.getElementById('formCatatanRevisi');
        if (crEl) crEl.value = 'Unggahan dokumen resmi awal (rilis pertama).';
      }
    }

    // -------------------------------------------------------------------------
    // FITUR UPLOAD MASSAL (BATCH MULTI-FILE UPLOADER)
    // -------------------------------------------------------------------------
    appState.batchFilesQueue = [];

    async function handleBatchPdfFilesSelected(event) {
      const fileList = event.target.files;
      if (!fileList || fileList.length === 0) return;

      const maxBytes = 15 * 1024 * 1024;
      let addedCount = 0;

      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];

        const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
        if (!isPdf) {
          showToast(`Berkas "${file.name}" dilewati karena bukan berkas .PDF.`, 'warning');
          continue;
        }

        if (file.size > maxBytes) {
          showToast(`Berkas "${file.name}" dilewati karena ukuran melebihi 15 MB.`, 'warning');
          continue;
        }

        try {
          const headerSlice = await file.slice(0, 4).arrayBuffer();
          const bytes = new Uint8Array(headerSlice);
          if (bytes[0] !== 37 || bytes[1] !== 80 || bytes[2] !== 68 || bytes[3] !== 70) {
            showToast(`Berkas "${file.name}" dilewati karena header bukan dokumen PDF valid.`, 'warning');
            continue;
          }
        } catch (e) {
          continue;
        }

        const rawName = file.name.replace(/\.pdf$/i, '');
        const cleanTitle = rawName.replace(/[_-]+/g, ' ').trim();
        let kategori = 'Surat Administratif';
        const lower = cleanTitle.toLowerCase();
        if (lower.includes('sop') || lower.includes('standar operasional') || lower.includes('prosedur')) {
          kategori = 'SOP';
        } else if (lower.includes('sk ') || lower.includes('sk_') || lower.includes('surat keputusan')) {
          kategori = 'SK';
        } else if (lower.includes('tatib') || lower.includes('tata tertib') || lower.includes('kode etik')) {
          kategori = 'Tata Tertib';
        }

        const kb = Math.max(1, Math.round(file.size / 1024));
        const sizeStr = kb >= 1024 ? (kb / 1024).toFixed(2) + ' MB' : kb + ' KB';

        appState.batchFilesQueue.push({
          id: 'BATCH-' + Date.now() + '-' + i,
          file: file,
          name: file.name,
          title: cleanTitle,
          category: kategori,
          size: sizeStr,
          status: 'ready',
          errorMessage: ''
        });
        addedCount++;
      }

      renderBatchQueue();
      if (addedCount > 0) {
        showToast(`Berhasil menambahkan ${addedCount} berkas ke antrean upload massal.`, 'success');
      }
    }

    function renderBatchQueue() {
      const queueList = document.getElementById('batchQueueList');
      const queueContainer = document.getElementById('batchQueueContainer');
      const queueCount = document.getElementById('batchQueueCount');
      const batchCountBadge = document.getElementById('batchCountBadge');

      if (!queueList) return;
      const total = appState.batchFilesQueue.length;
      if (queueCount) queueCount.textContent = total;
      if (batchCountBadge) batchCountBadge.textContent = total;

      if (total === 0) {
        if (queueContainer) queueContainer.classList.add('hidden');
        return;
      }

      if (queueContainer) queueContainer.classList.remove('hidden');

      queueList.innerHTML = appState.batchFilesQueue.map(function(item, idx) {
        let statusBadge = '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600">Siap</span>';
        if (item.status === 'uploading') {
          statusBadge = '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-[#3B66F5] animate-pulse">Mengunggah...</span>';
        } else if (item.status === 'success') {
          statusBadge = '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700">Sukses ✅</span>';
        } else if (item.status === 'failed') {
          statusBadge = '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700" title="' + escapeHtml(item.errorMessage) + '">Gagal ❌</span>';
        }

        return `
          <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3 text-xs">
            <div class="min-w-0 flex-1">
              <div class="font-bold text-slate-800 truncate">${escapeHtml(item.title)}</div>
              <div class="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2">
                <span class="px-1.5 py-0.2 rounded bg-slate-200/60 font-semibold text-slate-600">${escapeHtml(item.category)}</span>
                <span>${escapeHtml(item.size)}</span>
              </div>
            </div>
            <div class="flex items-center gap-2 shrink-0">
              ${statusBadge}
              ${item.status === 'ready' ? `
                <button type="button" onclick="removeBatchQueueItem(${idx})" class="p-1 text-slate-400 hover:text-red-500 text-sm leading-none" title="Hapus dari antrean">&times;</button>
              ` : ''}
            </div>
          </div>
        `;
      }).join('');
    }

    function removeBatchQueueItem(idx) {
      if (appState.batchFilesQueue[idx]) {
        appState.batchFilesQueue.splice(idx, 1);
        renderBatchQueue();
      }
    }

    function clearBatchQueue() {
      appState.batchFilesQueue = [];
      renderBatchQueue();
      const input = document.getElementById('formBatchPdfFiles');
      if (input) input.value = '';
    }

    async function handleStartBatchUpload() {
      if (!appState.currentUser) {
        openLoginModal('Silakan login terlebih dahulu untuk melakukan upload dokumen massal.');
        return;
      }

      const queue = appState.batchFilesQueue.filter(function(i) { return i.status === 'ready' || i.status === 'failed'; });
      if (queue.length === 0) {
        showToast('Antrean kosong atau seluruh berkas sudah selesai diunggah.', 'warning');
        return;
      }

      const submitBtn = document.getElementById('submitBatchBtn');
      const progressWrapper = document.getElementById('batchProgressBarWrapper');
      const progressBar = document.getElementById('batchProgressBar');
      const progressLabel = document.getElementById('batchProgressLabel');
      const progressPct = document.getElementById('batchProgressPct');

      if (submitBtn) submitBtn.disabled = true;
      if (progressWrapper) progressWrapper.classList.remove('hidden');

      const defaultPembuat = document.getElementById('batchDefaultPembuat').value || 'Admin Tata Usaha';
      const defaultAkses = document.getElementById('batchDefaultAkses').value || 'Publik';
      const nowDate = new Date().toISOString().substring(0, 10);
      const uploaderName = appState.currentUser ? appState.currentUser.namaLengkap : defaultPembuat;

      let successCount = 0;
      const total = queue.length;

      for (let i = 0; i < total; i++) {
        const item = queue[i];
        item.status = 'uploading';
        renderBatchQueue();

        const pct = Math.round(((i) / total) * 100);
        if (progressBar) progressBar.style.width = pct + '%';
        if (progressPct) progressPct.textContent = pct + '%';
        if (progressLabel) progressLabel.textContent = `Mengunggah (${i + 1}/${total}): ${item.title}...`;

        try {
          const base64Data = await new Promise(function(resolve, reject) {
            const reader = new FileReader();
            reader.onload = function(e) { resolve(e.target.result); };
            reader.onerror = reject;
            reader.readAsDataURL(item.file);
          });

          const codeMap = { 'Tata Tertib': 'TATIB', 'SOP': 'SOP', 'SK': 'SK', 'Surat Administratif': 'SE' };
          const code = codeMap[item.category] || 'DOC';
          const num = String(appState.documents.length + 1).padStart(3, '0');
          const nomorDokumen = `${num}/${code}/SMP-DAFI/${new Date().getFullYear()}`;
          const newId = 'DOC-' + new Date().getFullYear() + '-' + num;

          const newDoc = {
            id: newId,
            nomorDokumen: nomorDokumen,
            judul: item.title,
            kategori: item.category,
            pembuat: defaultPembuat,
            kataKunci: [item.category.toLowerCase(), 'upload massal'],
            akses: defaultAkses,
            versi: 'v1.0',
            tanggalTerbit: nowDate,
            tanggalUpdate: nowDate,
            ukuran: item.size,
            ringkasan: 'Dokumen diunggah secara massal ke DDMS SMP DAFI.',
            pdfBlobUrl: URL.createObjectURL(item.file),
            riwayat: [
              {
                versionId: 'VER-' + Date.now(),
                versi: 'v1.0',
                tanggalUpdate: nowDate,
                diperbaruiOleh: uploaderName,
                catatanPerubahan: 'Unggahan massal berkas PDF.',
                ukuran: item.size
              }
            ]
          };

          if (appState.gasWebAppUrl) {
            const gasRes = await sendToGasBackend({
              action: 'uploadDocument',
              id: newId,
              nomorDokumen: nomorDokumen,
              judul: item.title,
              kategori: item.category,
              pembuat: defaultPembuat,
              kataKunci: [item.category.toLowerCase(), 'upload massal'],
              akses: defaultAkses,
              versi: 'v1.0',
              ukuran: item.size,
              ringkasan: 'Dokumen diunggah secara massal ke DDMS SMP DAFI.',
              diperbaruiOleh: uploaderName,
              catatanPerubahan: 'Unggahan massal berkas PDF.',
              fileName: item.name,
              fileBase64: base64Data
            });

            if (gasRes && gasRes.status === 'ok') {
              newDoc.driveFileId = gasRes.driveFileId;
              newDoc.driveViewUrl = gasRes.driveViewUrl;
              newDoc.driveDownloadUrl = gasRes.driveDownloadUrl;
            }
          }

          appState.documents.unshift(newDoc);
          item.status = 'success';
          successCount++;
        } catch (err) {
          item.status = 'failed';
          item.errorMessage = err.toString();
        }

        renderBatchQueue();
      }

      if (progressBar) progressBar.style.width = '100%';
      if (progressPct) progressPct.textContent = '100%';
      if (progressLabel) progressLabel.textContent = `Selesai! Berhasil mengunggah ${successCount} dari ${total} berkas.`;
      if (submitBtn) submitBtn.disabled = false;

      safeSetStorage(STORAGE_KEY_DOCS, appState.documents);
      refreshAllViews();
      showToast(`Upload massal selesai! Berhasil mendaftarkan ${successCount} berkas.`, 'success');

      setTimeout(function() {
        if (progressWrapper) progressWrapper.classList.add('hidden');
      }, 3500);
    }

    // -------------------------------------------------------------------------
    // SINKRONISASI MASSAL DARI FOLDER GOOGLE DRIVE
    // -------------------------------------------------------------------------
    async function triggerScanDriveFolder() {
      if (!appState.currentUser) {
        openLoginModal('Fitur Pindai Massal Google Drive memerlukan login akun (Kepala Sekolah atau Admin TU).');
        return;
      }

      if (appState.currentUser.role !== 'kepsek' && appState.currentUser.role !== 'admin') {
        showToast('Akses dibatasi: Hanya Kepala Sekolah dan Admin TU yang dapat menjalankan pemindaian massal Drive.', 'error');
        return;
      }

      if (!isValidGasUrl(appState.gasWebAppUrl)) {
        showToast('Koneksikan Web App GAS terlebih dahulu untuk menggunakan fitur auto-scan Google Drive.', 'warning');
        return;
      }

      const btn = document.getElementById('btnScanDriveFolder');
      const box = document.getElementById('driveScanResultBox');

      if (btn) {
        btn.disabled = true;
        btn.innerHTML = `<span class="inline-block animate-spin mr-1">⏳</span> Memindai Google Drive...`;
      }

      if (box) {
        box.classList.remove('hidden');
        box.className = 'p-4 rounded-xl border border-blue-200 bg-blue-50 text-xs text-blue-900 space-y-1';
        box.innerHTML = '<strong>Sedang Memindai...</strong> Google Apps Script sedang membaca seluruh berkas PDF di folder Drive sekolah...';
      }

      try {
        const resp = await sendToGasBackend({
          action: 'scanDriveFolder'
        });

        if (resp && resp.status === 'ok') {
          if (box) {
            box.className = 'p-4 rounded-xl border border-emerald-200 bg-emerald-50 text-xs sm:text-sm text-emerald-950 space-y-1.5';
            box.innerHTML = `
              <div class="font-bold text-emerald-800 text-sm flex items-center gap-1.5">
                <span>✅ Pemindaian Massal Berhasil!</span>
              </div>
              <p class="text-xs text-emerald-700">${escapeHtml(resp.message)}</p>
              <div class="flex items-center gap-4 text-xs font-semibold text-emerald-800 pt-1">
                <span>Dokumen Baru: <strong>${resp.importedCount || 0}</strong></span>
                <span>Dilewati (Sudah Ada / Non-PDF): <strong>${resp.skippedCount || 0}</strong></span>
                <span>Total Berkas di Drive: <strong>${resp.totalDriveFiles || 0}</strong></span>
              </div>
            `;
          }
          showToast(`Sinkronisasi Drive berhasil! Ditambahkan ${resp.importedCount || 0} dokumen baru.`, 'success');
          await syncFromGasBackend();
        } else {
          if (box) {
            box.className = 'p-4 rounded-xl border border-red-200 bg-red-50 text-xs text-red-900 space-y-1';
            box.innerHTML = `<strong>Gagal Memindai:</strong> ${escapeHtml((resp && resp.message) || 'Terjadi kesalahan pada backend GAS.')}`;
          }
          showToast('Pemindaian Drive gagal: ' + ((resp && resp.message) || 'Periksa koneksi GAS.'), 'error');
        }
      } catch (err) {
        if (box) {
          box.className = 'p-4 rounded-xl border border-red-200 bg-red-50 text-xs text-red-900 space-y-1';
          box.innerHTML = `<strong>Galat Sistem:</strong> ${escapeHtml(err.toString())}`;
        }
        showToast('Gagal menghubungi backend GAS: ' + err.toString(), 'error');
      } finally {
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg><span>🔍 Pindai &amp; Daftarkan dari Drive</span>`;
        }
      }
    }

    function openDirectUpdateVersion(docId) {
      if (!appState.currentUser) {
        openLoginModal('Silakan login terlebih dahulu untuk memperbarui versi dokumen ini.');
        return;
      }
      populateExistingDocDropdown();
      document.getElementById('uploadModal').classList.remove('hidden');
      switchUploadFormMode('update', docId);
    }

    function populateFormForVersionUpdate() {
      const docId = document.getElementById('formSelectExistingDoc').value;
      const doc = appState.documents.find(function(d) { return d.id === docId; });
      if (!doc) return;

      document.getElementById('formTargetDocId').value = doc.id;
      document.getElementById('formJudul').value = doc.judul;
      document.getElementById('formNomor').value = doc.nomorDokumen;
      document.getElementById('formKategori').value = doc.kategori;
      document.getElementById('formPembuat').value = doc.pembuat;
      document.getElementById('formAkses').value = doc.akses;
      document.getElementById('formKataKunci').value = (doc.kataKunci || []).join(', ');
      document.getElementById('formRingkasan').value = doc.ringkasan;
      document.getElementById('formVersi').value = incrementVersionString(doc.versi);
      document.getElementById('formCatatanRevisi').value = '';
      document.getElementById('formCatatanRevisi').placeholder = 'Jelaskan pasal/bagian yang diperbarui pada versi ' + incrementVersionString(doc.versi) + ' ini...';
    }

    function incrementVersionString(verStr) {
      const m = String(verStr || 'v1.0').match(/v?(\d+)\.(\d+)/i);
      if (!m) return 'v1.1';
      const major = parseInt(m[1], 10);
      const minor = parseInt(m[2], 10) + 1;
      return `v${major}.${minor}`;
    }

    async function handlePdfFileSelected(event) {
      const file = event.target.files && event.target.files[0];
      if (!file) return;

      // 1. Validasi Tipe Berkas & Ekstensi
      const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
      if (!isPdf) {
        showToast('Keamanan: Berkas ditolak! Hanya dokumen resmi berekstensi .PDF yang diizinkan.', 'error');
        event.target.value = '';
        return;
      }

      // 2. Validasi Batas Ukuran (Maksimal 15 MB)
      const maxBytes = 15 * 1024 * 1024;
      if (file.size > maxBytes) {
        showToast('Keamanan: Ukuran berkas (' + (file.size / (1024 * 1024)).toFixed(1) + ' MB) melebihi batas maksimal 15 MB!', 'error');
        event.target.value = '';
        return;
      }

      // 3. Verifikasi Magic Bytes PDF (%PDF-)
      try {
        const headerSlice = await file.slice(0, 4).arrayBuffer();
        const bytes = new Uint8Array(headerSlice);
        // % = 37, P = 80, D = 68, F = 70
        const isMagicPdf = (bytes[0] === 37 && bytes[1] === 80 && bytes[2] === 68 && bytes[3] === 70);
        if (!isMagicPdf) {
          showToast('Keamanan: Format ditolak! Header berkas bukan dokumen PDF yang sah (%PDF tidak ditemukan).', 'error');
          event.target.value = '';
          return;
        }
      } catch (err) {
        showToast('Gagal memverifikasi integritas berkas PDF.', 'error');
        event.target.value = '';
        return;
      }

      appState.pendingUploadFileName = sanitizeFileNameClient(file.name);
      const kb = Math.max(1, Math.round(file.size / 1024));
      appState.pendingUploadFileSize = kb >= 1024 ? (kb / 1024).toFixed(2) + ' MB' : kb + ' KB';

      document.getElementById('selectedFileNameDisplay').textContent = 'File Terpilih: ' + appState.pendingUploadFileName;
      document.getElementById('selectedFileSizeDisplay').textContent = 'Ukuran: ' + appState.pendingUploadFileSize + ' • Terverifikasi Aman (%PDF)';

      try {
        appState.pendingUploadBlobUrl = URL.createObjectURL(file);
      } catch (e) {
        appState.pendingUploadBlobUrl = null;
      }

      const reader = new FileReader();
      reader.onload = function(evt) {
        appState.pendingUploadBase64 = evt.target.result;
      };
      reader.readAsDataURL(file);

      const judulInput = document.getElementById('formJudul');
      if (judulInput && !judulInput.value.trim()) {
        const cleanTitle = appState.pendingUploadFileName.replace(/\.pdf$/i, '').replace(/[_-]+/g, ' ');
        judulInput.value = cleanTitle;
      }
      checkUploadSimilarityLive();
    }

    function calculateSimilarityScore(strA, strB) {
      const cleanA = String(strA || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
      const cleanB = String(strB || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
      const stopWords = ['dan', 'di', 'ke', 'dari', 'untuk', 'pada', 'tentang', 'smp', 'dafi', 'tahun', 'ajaran', 'dokumen'];
      const wordsA = cleanA.split(/\s+/).filter(function(w) { return w.length > 2 && stopWords.indexOf(w) === -1; });
      const wordsB = cleanB.split(/\s+/).filter(function(w) { return w.length > 2 && stopWords.indexOf(w) === -1; });

      if (wordsA.length === 0 || wordsB.length === 0) return 0;
      let matches = 0;
      wordsA.forEach(function(wA) {
        if (wordsB.some(function(wB) { return wB.indexOf(wA) !== -1 || wA.indexOf(wB) !== -1; })) {
          matches++;
        }
      });
      return matches / Math.max(wordsA.length, Math.min(wordsB.length, 4));
    }

    function findSimilarExistingDocuments(judul, nomor) {
      const results = [];
      appState.documents.forEach(function(doc) {
        const exactNomor = nomor && doc.nomorDokumen.toLowerCase() === nomor.toLowerCase();
        const score = calculateSimilarityScore(judul, doc.judul);
        if (exactNomor || score >= 0.4) {
          results.push({ doc: doc, score: exactNomor ? 1.0 : score, exactNomor: exactNomor });
        }
      });
      results.sort(function(a, b) { return b.score - a.score; });
      return results;
    }

    function checkUploadSimilarityLive() {
      const mode = document.getElementById('formMode').value;
      const alertBox = document.getElementById('smartDuplicateAlert');
      if (!alertBox || mode === 'update') {
        if (alertBox) alertBox.classList.add('hidden');
        return;
      }

      const judul = (document.getElementById('formJudul').value || '').trim();
      const nomor = (document.getElementById('formNomor').value || '').trim();
      if (judul.length < 4 && nomor.length < 4) {
        alertBox.classList.add('hidden');
        return;
      }

      const matches = findSimilarExistingDocuments(judul, nomor);
      if (matches.length === 0) {
        alertBox.classList.add('hidden');
        return;
      }

      const topMatch = matches[0].doc;
      const nextVer = incrementVersionString(topMatch.versi);
      alertBox.classList.remove('hidden');
      alertBox.innerHTML = `
        <div class="flex items-start justify-between gap-3">
          <div class="space-y-1">
            <div class="font-bold text-amber-950">
              ⚡ Deteksi Pintar: Dokumen Serupa Sudah Ada di Database!
            </div>
            <p class="text-amber-900 leading-relaxed">
              Ditemukan arsip <strong>"${escapeHtml(topMatch.judul)}"</strong> (Nomor: <span class="font-mono-code">${escapeHtml(topMatch.nomorDokumen)}</span>, Versi: <strong>${escapeHtml(topMatch.versi)}</strong>).
            </p>
          </div>
          <button type="button" onclick="switchUploadFormMode('update', '${escapeHtml(topMatch.id)}')" class="px-3 py-1.5 rounded-lg bg-[#3B66F5] text-white font-semibold text-xs shrink-0">
            Perbarui ke ${escapeHtml(nextVer)}
          </button>
        </div>
      `;
    }

    function autoGenerateDocNumber() {
      const kat = document.getElementById('formKategori').value;
      const codeMap = {
        'Tata Tertib': 'TATIB',
        'SOP': 'SOP',
        'SK': 'SK',
        'Surat Administratif': 'SE'
      };
      const code = codeMap[kat] || 'DOC';
      const num = String(appState.documents.length + 15).padStart(3, '0');
      document.getElementById('formNomor').value = `${num}/${code}/SMP-DAFI/X/2026`;
      checkUploadSimilarityLive();
    }

    function autoSuggestKeywords() {
      const judul = (document.getElementById('formJudul').value || '').toLowerCase();
      const kat = (document.getElementById('formKategori').value || '').toLowerCase();
      const rawWords = (judul + ' ' + kat).replace(/[^a-z0-9\s]/g, ' ').split(/\s+/);
      const stop = ['dan', 'di', 'ke', 'dari', 'untuk', 'pada', 'tentang', 'smp', 'dafi', 'yang', 'dengan'];
      const unique = [];
      rawWords.forEach(function(w) {
        if (w.length > 2 && stop.indexOf(w) === -1 && unique.indexOf(w) === -1) {
          unique.push(w);
        }
      });
      if (unique.length === 0) unique.push('administrasi', 'pendidik', 'smp dafi');
      document.getElementById('formKataKunci').value = unique.slice(0, 6).join(', ');
    }

    function prefillUploadFromSearch() {
      const q = (document.getElementById('searchInput').value || '').trim();
      handleOpenUploadModal({
        judul: q || 'Dokumen Baru SMP DAFI',
        kategori: appState.selectedCategory !== 'ALL' ? appState.selectedCategory : 'SOP',
        pembuat: 'Kepala Sekolah',
        kataKunci: q ? [q.toLowerCase()] : ['administrasi'],
        alasan: ''
      });
    }

    async function handleSubmitDocument(e) {
      e.preventDefault();
      const mode = document.getElementById('formMode').value;
      const judul = document.getElementById('formJudul').value.trim();
      const nomor = document.getElementById('formNomor').value.trim();
      const kategori = document.getElementById('formKategori').value;
      const pembuat = document.getElementById('formPembuat').value;
      const akses = document.getElementById('formAkses').value;
      const versi = document.getElementById('formVersi').value.trim() || 'v1.0';
      const kataKunci = document.getElementById('formKataKunci').value.split(',').map(function(k) { return k.trim(); }).filter(Boolean);
      const ringkasan = document.getElementById('formRingkasan').value.trim();
      const catatanRevisi = document.getElementById('formCatatanRevisi').value.trim();
      const today = '2026-10-29';
      const uploaderName = appState.currentUser ? appState.currentUser.namaLengkap : pembuat;
      const fileSize = appState.pendingUploadFileSize || '360 KB';

      if (mode === 'update') {
        const targetId = document.getElementById('formSelectExistingDoc').value;
        const doc = appState.documents.find(function(d) { return d.id === targetId; });
        if (!doc) return;

        doc.judul = judul;
        doc.nomorDokumen = nomor;
        doc.kategori = kategori;
        doc.pembuat = pembuat;
        doc.akses = akses;
        doc.versi = versi;
        doc.tanggalUpdate = today;
        doc.ukuran = fileSize;
        doc.kataKunci = kataKunci;
        doc.ringkasan = ringkasan;
        if (appState.pendingUploadBlobUrl) {
          doc.pdfBlobUrl = appState.pendingUploadBlobUrl;
        }
        if (!doc.riwayat) doc.riwayat = [];
        doc.riwayat.push({
          versionId: 'VER-' + Date.now(),
          versi: versi,
          tanggalUpdate: today,
          diperbaruiOleh: uploaderName,
          catatanPerubahan: catatanRevisi,
          ukuran: fileSize,
          pdfBlobUrl: appState.pendingUploadBlobUrl || null
        });

        appState.selectedDocId = doc.id;

        if (appState.gasWebAppUrl) {
          await sendToGasBackend({
            action: 'updateVersion',
            docId: doc.id,
            versiBaru: versi,
            versi: versi,
            diperbaruiOleh: uploaderName,
            catatanPerubahan: catatanRevisi,
            ukuran: fileSize,
            fileName: appState.pendingUploadFileName || (judul + '.pdf'),
            fileBase64: appState.pendingUploadBase64
          });
        }

        safeSetStorage(STORAGE_KEY_DOCS, appState.documents);
        closeUploadModal();
        refreshAllViews();
        showToast(`Versi dokumen "${judul}" berhasil diperbarui ke ${versi}!`, 'success');
      } else {
        const newId = 'DOC-2026-' + String(appState.documents.length + 1).padStart(3, '0');
        const newDoc = {
          id: newId,
          nomorDokumen: nomor,
          judul: judul,
          kategori: kategori,
          pembuat: pembuat,
          kataKunci: kataKunci,
          akses: akses,
          versi: versi,
          tanggalTerbit: today,
          tanggalUpdate: today,
          ukuran: fileSize,
          ringkasan: ringkasan,
          pdfBlobUrl: appState.pendingUploadBlobUrl || null,
          isiPasal: [
            'Ketentuan Pokok: ' + ringkasan,
            'Pelaksanaan & Pengawasan: Dokumen ini berlaku bagi seluruh unit terkait di SMP DAFI sejak tanggal ditetapkan.',
            'Administrasi Arsip: Tercatat secara resmi dalam DDMS (DAFI Document Management System) SMP DAFI dengan nomor ' + nomor + '.'
          ],
          riwayat: [
            {
              versionId: 'VER-' + Date.now(),
              versi: versi,
              tanggalUpdate: today,
              diperbaruiOleh: uploaderName,
              catatanPerubahan: catatanRevisi,
              ukuran: fileSize,
              pdfBlobUrl: appState.pendingUploadBlobUrl || null
            }
          ]
        };

        appState.documents.unshift(newDoc);
        appState.selectedDocId = newId;

        if (appState.gasWebAppUrl) {
          await sendToGasBackend({
            action: 'uploadDocument',
            id: newId,
            nomorDokumen: nomor,
            judul: judul,
            kategori: kategori,
            pembuat: pembuat,
            kataKunci: kataKunci,
            akses: akses,
            versi: versi,
            ukuran: fileSize,
            ringkasan: ringkasan,
            diperbaruiOleh: uploaderName,
            catatanPerubahan: catatanRevisi,
            fileName: appState.pendingUploadFileName || (judul + '.pdf'),
            fileBase64: appState.pendingUploadBase64
          });
        }

        safeSetStorage(STORAGE_KEY_DOCS, appState.documents);
        closeUploadModal();
        refreshAllViews();
        showToast(`Dokumen PDF "${judul}" berhasil diunggah ke DDMS - DAFI Document Management System!`, 'success');
      }
    }

    function renderSmartAssistant() {
      const catProgressContainer = document.getElementById('smartCategoryProgress');
      const missingContainer = document.getElementById('smartMissingList');
      const fulfilledContainer = document.getElementById('smartFulfilledList');
      if (!catProgressContainer || !missingContainer || !fulfilledContainer) return;

      const categories = ['Tata Tertib', 'SOP', 'SK', 'Surat Administratif'];
      catProgressContainer.innerHTML = categories.map(function(cat) {
        const stdForCat = appState.standards.filter(function(s) { return s.kategori === cat; });
        const doneForCat = stdForCat.filter(function(s) { return Boolean(isStandardFulfilled(s)); });
        const total = stdForCat.length || 1;
        const pct = Math.round((doneForCat.length / total) * 100);
        const docsInCat = appState.documents.filter(function(d) { return d.kategori === cat; }).length;

        return `
          <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-slate-700">${escapeHtml(cat)}</span>
              <span class="text-xs font-bold text-[#3B66F5]">${pct}% Standar</span>
            </div>
            <div class="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
              <div class="h-full bg-[#3B66F5] rounded-full" style="width: ${pct}%"></div>
            </div>
            <div class="flex items-center justify-between text-[11px] text-slate-400">
              <span>${doneForCat.length}/${stdForCat.length} Standar Wajib</span>
              <span>Total: ${docsInCat} PDF</span>
            </div>
          </div>
        `;
      }).join('');

      const missingItems = [];
      const fulfilledItems = [];

      appState.standards.forEach(function(std) {
        const matchedDoc = isStandardFulfilled(std);
        if (matchedDoc) {
          fulfilledItems.push({ std: std, doc: matchedDoc });
        } else {
          missingItems.push(std);
        }
      });

      document.getElementById('missingDocsBadge').textContent = missingItems.length + ' Belum Tersedia';
      document.getElementById('fulfilledDocsBadge').textContent = fulfilledItems.length + ' Sudah Ada';

      if (missingItems.length === 0) {
        missingContainer.innerHTML = `
          <div class="p-6 rounded-2xl bg-blue-50 border border-blue-200 text-center space-y-1">
            <div class="text-sm font-bold text-[#3B66F5]">Seluruh Dokumen Standar SMP DAFI Sudah Terpenuhi!</div>
            <p class="text-xs text-slate-500">Anda dapat menambahkan target dokumen standar baru jika diperlukan.</p>
          </div>
        `;
      } else {
        missingContainer.innerHTML = missingItems.map(function(item) {
          return `
            <div class="cloud-card p-4 space-y-2.5">
              <div class="flex items-center justify-between gap-2 flex-wrap">
                <div class="flex items-center gap-1.5">
                  <span class="px-2 py-0.5 rounded text-[11px] font-semibold border ${getCategoryBadgeStyle(item.kategori)}">${escapeHtml(item.kategori)}</span>
                  <span class="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">Prioritas ${escapeHtml(item.prioritas)}</span>
                </div>
                <span class="text-[11px] text-slate-400">PIC: <strong class="text-slate-700">${escapeHtml(item.pembuatDisarankan)}</strong></span>
              </div>
              <div>
                <h4 class="text-sm font-bold text-slate-800">${escapeHtml(item.judulSaran)}</h4>
                <p class="text-xs text-slate-500 mt-0.5">${escapeHtml(item.alasan)}</p>
              </div>
              <div class="flex items-center justify-between pt-2 border-t border-slate-100">
                <span class="text-[11px] font-semibold text-amber-600">Belum Ada di Library</span>
                <button type="button" onclick="triggerUploadFromSuggestion('${escapeHtml(item.id)}')" class="px-3 py-1.5 rounded-xl bg-[#3B66F5] hover:bg-[#2952D9] text-white text-xs font-semibold transition">
                  + Unggah Dokumen Ini
                </button>
              </div>
            </div>
          `;
        }).join('');
      }

      fulfilledContainer.innerHTML = fulfilledItems.map(function(pair) {
        return `
          <div class="cloud-card p-3.5 flex items-start justify-between gap-3">
            <div class="space-y-1 min-w-0">
              <div class="flex items-center gap-1.5">
                <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">Sudah Ada (${escapeHtml(pair.doc.versi)})</span>
                <span class="text-[11px] font-mono-code text-slate-400 truncate">${escapeHtml(pair.doc.nomorDokumen)}</span>
              </div>
              <div class="text-xs font-bold text-slate-800 truncate">${escapeHtml(pair.doc.judul)}</div>
              <div class="text-[11px] text-slate-400">Update: ${escapeHtml(pair.doc.tanggalUpdate)}</div>
            </div>
            <div class="flex flex-col gap-1 shrink-0">
              <button type="button" onclick="openPdfViewer('${escapeHtml(pair.doc.id)}')" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold">Baca</button>
              <button type="button" onclick="openDirectUpdateVersion('${escapeHtml(pair.doc.id)}')" class="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#3B66F5] text-xs font-semibold">Revisi</button>
            </div>
          </div>
        `;
      }).join('');
    }

    function triggerUploadFromSuggestion(stdId) {
      const std = appState.standards.find(function(s) { return s.id === stdId; });
      if (!std) return;
      handleOpenUploadModal({
        judul: std.judulSaran,
        kategori: std.kategori,
        pembuat: std.pembuatDisarankan,
        kataKunci: std.kataKunci,
        alasan: std.alasan
      });
    }

    function runInteractiveDuplicateCheck() {
      const val = (document.getElementById('smartCheckInput').value || '').trim();
      const box = document.getElementById('smartCheckResultBox');
      if (!box) return;

      if (val.length < 3) {
        box.className = 'rounded-xl p-4 bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-500';
        box.textContent = 'Masukkan minimal 3 karakter untuk mengecek ketersediaan atau duplikasi dokumen di database SMP DAFI.';
        return;
      }

      const matches = findSimilarExistingDocuments(val, val);
      if (matches.length > 0) {
        const m = matches[0].doc;
        box.className = 'rounded-xl p-4 bg-amber-50 border border-amber-200 text-xs sm:text-sm space-y-2';
        box.innerHTML = `
          <div class="font-bold text-amber-900">⚠️ Info Pintar: Dokumen Serupa Sudah Tersedia di Library!</div>
          <p class="text-amber-800">
            Arsip <strong>"${escapeHtml(m.judul)}"</strong> (${escapeHtml(m.nomorDokumen)}) sudah terdaftar dengan versi aktif <strong>${escapeHtml(m.versi)}</strong> oleh ${escapeHtml(m.pembuat)}.
          </p>
          <div class="flex items-center gap-2 pt-1">
            <button type="button" onclick="openPdfViewer('${escapeHtml(m.id)}')" class="px-3 py-1.5 rounded-lg bg-white border border-amber-300 text-amber-900 font-semibold text-xs">Baca Dokumen Existing</button>
            <button type="button" onclick="openDirectUpdateVersion('${escapeHtml(m.id)}')" class="px-3 py-1.5 rounded-lg bg-[#3B66F5] text-white font-semibold text-xs">Unggah sebagai Versi Baru (${escapeHtml(incrementVersionString(m.versi))})</button>
          </div>
        `;
      } else {
        box.className = 'rounded-xl p-4 bg-blue-50 border border-blue-200 text-xs sm:text-sm space-y-2';
        box.innerHTML = `
          <div class="font-bold text-[#3B66F5]">✓ Belum Ada Dokumen Serupa di Library</div>
          <p class="text-slate-600">
            Judul <strong>"${escapeHtml(val)}"</strong> belum ditemukan di dalam katalog. Anda dapat mengunggahnya sebagai dokumen baru.
          </p>
          <button type="button" onclick="handleOpenUploadModal({ judul: '${escapeHtml(val)}', kategori: 'SOP', pembuat: 'Kepala Sekolah', kataKunci: ['${escapeHtml(val.toLowerCase())}'], alasan: '' })" class="px-3 py-1.5 rounded-lg bg-[#3B66F5] text-white font-semibold text-xs">
            + Buat &amp; Unggah Dokumen Baru Ini
          </button>
        `;
      }
    }

    function openAddStandardModal() {
      document.getElementById('addStandardModal').classList.remove('hidden');
    }

    function closeAddStandardModal() {
      document.getElementById('addStandardModal').classList.add('hidden');
    }

    function handleAddStandardSubmit(e) {
      e.preventDefault();
      const newStd = {
        id: 'STD-' + Date.now(),
        judulSaran: document.getElementById('stdJudul').value.trim(),
        kategori: document.getElementById('stdKategori').value,
        pembuatDisarankan: document.getElementById('stdPembuat').value,
        prioritas: 'Tinggi',
        alasan: document.getElementById('stdAlasan').value.trim(),
        kataKunci: document.getElementById('stdKataKunci').value.split(',').map(function(k) { return k.trim(); }).filter(Boolean)
      };
      appState.standards.push(newStd);
      safeSetStorage(STORAGE_KEY_STANDARDS, appState.standards);

      if (appState.gasWebAppUrl) {
        sendToGasBackend({
          action: 'addSuggestion',
          id: newStd.id,
          judulSaran: newStd.judulSaran,
          kategori: newStd.kategori,
          pembuatDisarankan: newStd.pembuatDisarankan,
          prioritas: newStd.prioritas,
          alasan: newStd.alasan,
          kataKunci: newStd.kataKunci
        });
      }

      closeAddStandardModal();
      document.getElementById('stdJudul').value = '';
      document.getElementById('stdAlasan').value = '';
      document.getElementById('stdKataKunci').value = '';
      refreshAllViews();
      showToast('Target dokumen standar baru berhasil ditambahkan.', 'success');
    }

    function populateHistoryFilterDropdown() {
      const sel = document.getElementById('historyDocFilter');
      if (!sel) return;
      const currentVal = sel.value || 'ALL';
      const opts = ['<option value="ALL">Semua Dokumen (' + appState.documents.length + ')</option>'];
      appState.documents.forEach(function(d) {
        opts.push(`<option value="${escapeHtml(d.id)}">${escapeHtml(d.judul)} (${escapeHtml(d.versi)})</option>`);
      });
      sel.innerHTML = opts.join('');
      sel.value = currentVal;
    }

    function renderGlobalHistory() {
      const container = document.getElementById('globalHistoryTimeline');
      const filterId = document.getElementById('historyDocFilter').value || 'ALL';
      if (!container) return;

      const allEvents = [];
      appState.documents.forEach(function(doc) {
        if (filterId !== 'ALL' && doc.id !== filterId) return;
        const list = doc.riwayat || [];
        list.forEach(function(ver, idx) {
          allEvents.push({
            docId: doc.id,
            judul: doc.judul,
            nomorDokumen: doc.nomorDokumen,
            kategori: doc.kategori,
            versi: ver.versi,
            versionIdx: idx,
            isLatest: idx === list.length - 1,
            tanggalUpdate: ver.tanggalUpdate,
            diperbaruiOleh: ver.diperbaruiOleh,
            catatanPerubahan: ver.catatanPerubahan,
            ukuran: ver.ukuran || doc.ukuran
          });
        });
      });

      allEvents.sort(function(a, b) {
        return String(b.tanggalUpdate).localeCompare(String(a.tanggalUpdate));
      });

      container.innerHTML = allEvents.map(function(ev) {
        return `
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div class="space-y-1">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="px-2 py-0.5 rounded font-mono-code text-xs font-bold ${ev.isLatest ? 'bg-[#3B66F5] text-white' : 'bg-slate-200 text-slate-700'}">
                  ${escapeHtml(ev.versi)} ${ev.isLatest ? '(Aktif)' : '(Arsip)'}
                </span>
                <span class="px-2 py-0.5 rounded text-[11px] font-semibold border ${getCategoryBadgeStyle(ev.kategori)}">${escapeHtml(ev.kategori)}</span>
                <span class="text-xs text-slate-400">${escapeHtml(ev.tanggalUpdate)} • Oleh: <strong class="text-slate-700">${escapeHtml(ev.diperbaruiOleh)}</strong></span>
              </div>
              <h4 class="text-sm font-bold text-slate-800">${escapeHtml(ev.judul)}</h4>
              <p class="text-xs text-slate-500">${escapeHtml(ev.catatanPerubahan)}</p>
            </div>
            <div class="flex items-center gap-2 shrink-0">
              <button type="button" onclick="openPdfViewer('${escapeHtml(ev.docId)}', ${ev.versionIdx})" class="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition">
                Baca Versi ${escapeHtml(ev.versi)}
              </button>
              <button type="button" onclick="openDirectUpdateVersion('${escapeHtml(ev.docId)}')" class="px-3 py-1.5 rounded-xl bg-[#3B66F5] hover:bg-[#2952D9] text-xs font-semibold text-white transition">
                + Perbarui Lagi
              </button>
            </div>
          </div>
        `;
      }).join('');
    }

    function updateGasStatusBadge() {
      const dot = document.getElementById('gasStatusDot');
      const text = document.getElementById('gasStatusText');
      const note = document.getElementById('gasSavedStatusNote');
      if (!dot || !text) return;

      if (appState.gasWebAppUrl) {
        dot.className = 'w-2 h-2 rounded-full bg-emerald-500';
        text.textContent = 'Mode: Terhubung ke GAS API';
        if (note) note.textContent = 'Endpoint aktif: ' + appState.gasWebAppUrl;
      } else {
        dot.className = 'w-2 h-2 rounded-full bg-amber-500';
        text.textContent = 'Mode: Database Lokal (Siap Konek GAS)';
        if (note) note.textContent = 'Saat URL dikosongkan, aplikasi berjalan dalam Mode Database Lokal (tersimpan di browser).';
      }
    }

    async function saveAndTestGasUrl() {
      const url = (document.getElementById('gasUrlInput').value || '').trim();
      if (url && !isValidGasUrl(url)) {
        showToast('Keamanan: URL tidak valid! Harus berformat resmi https://script.google.com/macros/s/.../exec', 'error');
        return;
      }
      appState.gasWebAppUrl = url;
      safeSetStorage(STORAGE_KEY_GAS_URL, url);
      if (window.GasConnector && typeof window.GasConnector.setActiveUrl === 'function') {
        window.GasConnector.setActiveUrl(url);
      }
      updateGasStatusBadge();

      if (!url) {
        showToast('URL GAS dikosongkan. Aplikasi beralih ke Mode Database Lokal.', 'warning');
        return;
      }

      showToast('Menguji koneksi aman ke Google Apps Script...', 'success');
      await syncFromGasBackend();
    }

    async function syncFromGasBackend() {
      const activeUrl = appState.gasWebAppUrl || (window.GasConnector ? window.GasConnector.getActiveUrl() : '');
      if (!isValidGasUrl(activeUrl)) {
        showToast('Masukkan URL Web App GAS yang sah terlebih dahulu pada kolom konfigurasi.', 'warning');
        return;
      }
      try {
        let data;
        if (window.GasConnector && typeof window.GasConnector.getAllDocuments === 'function') {
          data = await window.GasConnector.getAllDocuments();
        } else {
          const response = await fetch(activeUrl + '?action=getAll', {
            method: 'GET',
            redirect: 'follow'
          });
          data = await response.json();
        }
        if (data && data.status === 'ok' && Array.isArray(data.documents) && data.documents.length > 0) {
          appState.documents = data.documents;
          safeSetStorage(STORAGE_KEY_DOCS, appState.documents);
          refreshAllViews();
          showToast('Berhasil menyinkronkan ' + data.documents.length + ' dokumen dari Google Sheets & Drive!', 'success');
        } else {
          showToast('Terhubung ke GAS! Spreadsheet masih kosong, menampilkan arsip bawaan SMP DAFI.', 'success');
        }
      } catch (err) {
        showToast('Gagal menghubungi URL GAS. Pastikan akses Web App disetel ke "Anyone / Siapa saja".', 'error');
      }
    }

    async function sendToGasBackend(payload) {
      const activeUrl = appState.gasWebAppUrl || (window.GasConnector ? window.GasConnector.getActiveUrl() : '');
      if (!isValidGasUrl(activeUrl)) return null;
      try {
        const token = appState.authToken || (appState.currentUser && appState.currentUser.token) || '';
        let resData;
        if (window.GasConnector && typeof window.GasConnector.sendPost === 'function') {
          resData = await window.GasConnector.sendPost(payload.action, payload, token);
        } else {
          const securePayload = Object.assign({}, payload, {
            authToken: token
          });
          const response = await fetch(activeUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(securePayload),
            redirect: 'follow'
          });
          resData = await response.json();
        }
        if (resData && resData.status === 'error' && (resData.message.includes('token') || resData.message.includes('Sesi') || resData.message.includes('Autentikasi'))) {
          showToast('Sesi autentikasi Anda telah kedaluwarsa. Silakan login kembali.', 'warning');
          handleLogout();
        }
        return resData;
      } catch (err) {
        showToast('Dokumen disimpan secara lokal (sinkronisasi GAS tertunda).', 'warning');
        return null;
      }
    }

    async function copyGasCode() {
      const code = await getGasCode();
      const btnText = document.getElementById('copyGasBtnText');
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(code);
        } else {
          const temp = document.createElement('textarea');
          temp.value = code;
          document.body.appendChild(temp);
          temp.select();
          document.execCommand('copy');
          temp.remove();
        }
        if (btnText) btnText.textContent = 'Tersalin!';
        showToast('Kode Code.gs berhasil disalin ke clipboard!', 'success');
        setTimeout(function() {
          if (btnText) btnText.textContent = 'Salin Kode Code.gs';
        }, 2500);
      } catch (e) {
        showToast('Silakan blok teks kode dan tekan Ctrl+C.', 'warning');
      }
    }

    function resetDemoDatabase() {
      appState.documents = JSON.parse(JSON.stringify(INITIAL_DOCUMENTS));
      appState.standards = JSON.parse(JSON.stringify(INITIAL_STANDARD_DOCS));
      safeSetStorage(STORAGE_KEY_DOCS, appState.documents);
      safeSetStorage(STORAGE_KEY_STANDARDS, appState.standards);
      refreshAllViews();
      showToast('Data sampel arsip SMP DAFI berhasil dikembalikan ke pengaturan awal.', 'success');
    }

    window.onload = initApp;
  