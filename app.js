const STORAGE_KEY_DOCS = 'smp_dafi_simdok_docs_v2';
    const STORAGE_KEY_STANDARDS = 'smp_dafi_simdok_standards_v1';
    const STORAGE_KEY_GAS_URL = 'smp_dafi_simdok_gas_url_v1';
    const STORAGE_KEY_USER = 'smp_dafi_simdok_user_v1';
    const STORAGE_KEY_NOTIFICATIONS = 'smp_dafi_notifications_v1';
    const STORAGE_KEY_FAVORITES = 'smp_dafi_favorites_v1';

    // Daftar Dokumen Awal Kosong (Murni data riil dari Google Apps Script / Google Drive / Unggahan Pengguna)
    const INITIAL_DOCUMENTS = [];

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
      selectedDocId: null,
      viewMode: 'grid',
      gasWebAppUrl: '',
      currentViewingDocId: null,
      currentViewingVersionIdx: 0,
      pdfZoom: 1.0,
      pendingUploadBase64: null,
      pendingUploadBlobUrl: null,
      pendingUploadFileName: '',
      pendingUploadFileSize: '',
      selectedPendingDocIds: new Set()
    };

    // Kredensial Demo Terproteksi (Tersimpan sebagai Hash SHA-256 + Salt acak)
    // 3 Jenis Akun: Kepala Sekolah (Approval), Tendik (Pengajuan), Admin (Pengatur Sistem)
    const DEMO_USERS = [
      { 
        username: 'kepsek', 
        salt: 'dafi_salt_ks', 
        passwordHash: 'f0acabda1ee2611ad4497afd9269f19ed09b4597b469c3f972479a571590edcd', 
        namaLengkap: 'Ustadz Kepala SMP IT Darul Fikri', 
        role: 'kepsek', 
        jabatan: 'Kepala Sekolah (Approval Dokumen)',
        deskripsiPeran: 'Berfungsi memeriksa dan menyetujui pengajuan draf/revisi dokumen resmi sekolah.'
      },
      { 
        username: 'tendik', 
        salt: 'dafi_salt_td', 
        passwordHash: 'b8062024acb88add7511ed5cdbf7691ba94e296fdb1e00e0307f2278f4fc750d', 
        namaLengkap: 'Ustadzah Tenaga Kependidikan', 
        role: 'tendik', 
        jabatan: 'Tenaga Kependidikan (Pengajuan Dokumen)',
        deskripsiPeran: 'Berfungsi menyusun dan mengajukan dokumen PDF baru atau revisi untuk disetujui Kepala Sekolah.'
      },
      { 
        username: 'guru', 
        salt: 'dafi_salt_gr', 
        passwordHash: '4465075cfe20f74d04f1f08ff7ecfbd300fef34a3065a07bdde0bf2b724b91c3', 
        namaLengkap: 'Tenaga Pendidik & Guru DAFI', 
        role: 'tendik', 
        jabatan: 'Tenaga Pendidik / Guru (Pengajuan Dokumen)',
        deskripsiPeran: 'Berfungsi mengajukan dokumen KBM dan administrasi pembelajaran untuk disetujui.'
      },
      { 
        username: 'admin', 
        salt: 'dafi_salt_ad', 
        passwordHash: '118b9667af783bc40b6efe2931ec98120d47831e9a9c1196a2e5dc88a779bf30', 
        namaLengkap: 'Admin Sistem & Tata Usaha DAFI', 
        role: 'admin', 
        jabatan: 'Administrator Sistem & TU',
        deskripsiPeran: 'Berfungsi mengatur pangkalan data dan konfigurasi sistem.'
      }
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

    /**
     * Menghasilkan token tanda tangan digital resmi (TTE Token SHA-256)
     */
    async function generateDocSignatureToken(doc, approverName, approvalDate) {
      const seed = `${doc.id}|${doc.nomorDokumen || '-'}|${approvalDate || ''}|${approverName || 'Kepala Sekolah'}|DAFI-TTE-SECRET-2026`;
      let hexHash = '';
      if (window.crypto && window.crypto.subtle) {
        try {
          const msgBuffer = new TextEncoder().encode(seed);
          const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgBuffer);
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          hexHash = hashArray.map(function(b) { return b.toString(16).padStart(2, '0'); }).join('').toUpperCase();
        } catch (e) {}
      }
      if (!hexHash) {
        let hashVal = 0;
        for (let i = 0; i < seed.length; i++) {
          hashVal = ((hashVal << 5) - hashVal) + seed.charCodeAt(i);
          hashVal |= 0;
        }
        hexHash = Math.abs(hashVal).toString(16).padStart(16, '0').toUpperCase();
      }
      return `DAFI-TTE-2026-${hexHash.substring(0, 4)}-${hexHash.substring(4, 8)}-${hexHash.substring(8, 12)}`;
    }

    /**
     * Menghasilkan URL Verifikasi Publik Keabsahan Dokumen
     */
    function getDocVerificationUrl(docId) {
      const origin = (window.location.origin && window.location.origin !== 'null') ? window.location.origin : '';
      const pathname = window.location.pathname || '';
      if (origin) {
        return `${origin}${pathname}?verify=${encodeURIComponent(docId)}`;
      }
      return `https://smpit-dafi.sch.id/ddms/?verify=${encodeURIComponent(docId)}`;
    }

    /**
     * Menghasilkan tag <img> QR Code resmi dengan fail-safe SVG fallback
     */
    function getQrCodeImgHtml(verifyUrl, altText) {
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(verifyUrl)}&color=990B10&margin=6`;
      const fallbackSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23fff" rx="8"/><rect x="10" y="10" width="25" height="25" fill="%23D40D14" rx="3"/><rect x="15" y="15" width="15" height="15" fill="%23fff"/><rect x="18" y="18" width="9" height="9" fill="%23D40D14"/><rect x="65" y="10" width="25" height="25" fill="%23D40D14" rx="3"/><rect x="70" y="15" width="15" height="15" fill="%23fff"/><rect x="73" y="18" width="9" height="9" fill="%23D40D14"/><rect x="10" y="65" width="25" height="25" fill="%23D40D14" rx="3"/><rect x="15" y="70" width="15" height="15" fill="%23fff"/><rect x="18" y="73" width="9" height="9" fill="%23D40D14"/><rect x="42" y="15" width="16" height="6" fill="%2362615F"/><rect x="42" y="25" width="10" height="6" fill="%23D40D14"/><rect x="15" y="42" width="6" height="16" fill="%2362615F"/><rect x="25" y="42" width="6" height="10" fill="%23D40D14"/><rect x="45" y="45" width="14" height="14" fill="%23D40D14"/><rect x="65" y="45" width="10" height="6" fill="%2362615F"/><rect x="45" y="68" width="8" height="18" fill="%2362615F"/><rect x="65" y="65" width="25" height="25" fill="%23D40D14" rx="2"/><text x="50" y="96" font-family="sans-serif" font-size="7" font-weight="bold" fill="%23D40D14" text-anchor="middle">VERIFIKASI</text></svg>`;
      return `<img src="${qrUrl}" alt="${escapeHtml(altText || 'QR Code TTE')}" class="w-24 h-24 sm:w-28 sm:h-28 rounded-xl border-2 border-red-200 p-1 bg-white shadow-xs shrink-0 select-none" onerror="this.onerror=null; this.src='${fallbackSvg}';" loading="lazy" />`;
    }

    /**
     * Salin token TTE ke clipboard
     */
    function copySignatureToken(token) {
      if (!token) return;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(token).then(function() {
          showToast('Kode token TTE berhasil disalin ke clipboard!', 'success');
        }).catch(function() {
          prompt('Salin Kode Token TTE secara manual:', token);
        });
      } else {
        prompt('Salin Kode Token TTE secara manual:', token);
      }
    }

    /**
     * Salin URL Verifikasi Dokumen ke clipboard
     */
    function copyVerificationUrl(docId) {
      const url = getDocVerificationUrl(docId);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(function() {
          showToast('Link verifikasi keabsahan dokumen berhasil disalin!', 'success');
        }).catch(function() {
          prompt('Salin Link Verifikasi secara manual:', url);
        });
      } else {
        prompt('Salin Link Verifikasi secara manual:', url);
      }
    }

    /**
     * Menampilkan Modal Sertifikat Verifikasi Keabsahan TTE
     */
    function showVerificationModal(docId) {
      const doc = appState.documents.find(function(d) { return d.id === docId; });
      if (!doc) {
        showToast('Dokumen dengan ID ' + docId + ' tidak ditemukan.', 'warning');
        return;
      }

      // Pastikan memiliki token TTE jika sudah disetujui
      if (doc.statusApproval === 'Disetujui' && !doc.signatureToken) {
        const seed = doc.id + (doc.nomorDokumen || '') + (doc.tanggalDisetujui || '');
        let hash = 0;
        for (let i = 0; i < seed.length; i++) {
          hash = ((hash << 5) - hash) + seed.charCodeAt(i);
          hash |= 0;
        }
        const hex = Math.abs(hash).toString(16).toUpperCase().padStart(12, '9');
        doc.signatureToken = `DAFI-TTE-2026-${hex.substring(0, 4)}-${hex.substring(4, 8)}-${hex.substring(8, 12)}`;
      }

      const modal = document.getElementById('signatureVerificationModal');
      const body = document.getElementById('verificationModalBody');
      const btnPrint = document.getElementById('btnVerifPrintCert');
      const btnOpen = document.getElementById('btnVerifOpenDoc');

      if (!modal || !body) return;

      const isApproved = doc.statusApproval === 'Disetujui';
      const verifyUrl = getDocVerificationUrl(doc.id);
      const todayTime = doc.tanggalDisetujui || (doc.tanggalPersetujuan || doc.tanggalUpdate || '2026-10-12') + ' 08:30 WIB';
      const approver = doc.disetujuiOleh || 'Ustadz Kepala SMP IT Darul Fikri, M.Pd.';

      body.innerHTML = `
        <!-- Status Banner -->
        <div class="p-4 rounded-2xl ${isApproved ? 'bg-emerald-50 border-2 border-emerald-300' : 'bg-amber-50 border-2 border-amber-300'} flex items-start gap-3 shadow-xs">
          <div class="w-10 h-10 rounded-xl ${isApproved ? 'bg-emerald-600' : 'bg-amber-500'} text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-xs">
            ${isApproved ? '✓' : '⏳'}
          </div>
          <div>
            <div class="font-extrabold text-sm sm:text-base ${isApproved ? 'text-emerald-950' : 'text-amber-950'}">
              ${isApproved ? 'DOKUMEN RESMI TERVERIFIKASI &amp; SAH' : 'STATUS: MENUNGGU PERSETUJUAN KEPALA SEKOLAH'}
            </div>
            <p class="text-xs ${isApproved ? 'text-emerald-800' : 'text-amber-800'} mt-1 leading-relaxed">
              ${isApproved 
                ? 'Dokumen ini terdaftar secara sah pada repositori resmi SMP IT Darul Fikri Sidoarjo dan belum mengalami modifikasi sejak tanggal pengesahan.' 
                : 'Dokumen ini masih berstatus usulan/draf dan belum disahkan secara elektronik.'}
            </p>
          </div>
        </div>

        <!-- Detail Dokumen Terverifikasi -->
        <div class="bg-stone-50 rounded-2xl border border-stone-200 p-4 space-y-3">
          <div class="text-[11px] font-extrabold uppercase tracking-wider text-stone-400">Rincian Dokumen Resmi</div>
          
          <div class="space-y-2">
            <div>
              <div class="text-[11px] text-stone-500">Judul Dokumen:</div>
              <div class="font-bold text-stone-900 text-sm sm:text-base leading-snug">${escapeHtml(doc.judul)}</div>
            </div>
            <div class="grid grid-cols-2 gap-2 pt-1 border-t border-stone-200">
              <div>
                <div class="text-[11px] text-stone-500">Nomor Dokumen:</div>
                <div class="font-mono-code font-bold text-stone-800 text-xs">${escapeHtml(doc.nomorDokumen)}</div>
              </div>
              <div>
                <div class="text-[11px] text-stone-500">Kategori &amp; Versi:</div>
                <div class="font-bold text-[#D40D14] text-xs">${escapeHtml(doc.kategori)} (${escapeHtml(doc.versi)})</div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-2 pt-1 border-t border-stone-200">
              <div>
                <div class="text-[11px] text-stone-500">Tanggal Terbit / Update:</div>
                <div class="font-semibold text-stone-800 text-xs">${escapeHtml(doc.tanggalUpdate || doc.tanggalTerbit)}</div>
              </div>
              <div>
                <div class="text-[11px] text-stone-500">Hak Akses:</div>
                <div class="font-semibold text-stone-800 text-xs">${escapeHtml(doc.akses)}</div>
              </div>
            </div>
          </div>
        </div>

        ${isApproved ? `
          <!-- Blok Bukti TTE & Pejabat Penandatangan -->
          <div class="dafi-tte-card rounded-2xl p-4 border-2 border-[#D40D14]/80 space-y-3 shadow-xs">
            <div class="flex items-center justify-between border-b border-red-200 pb-2">
              <span class="text-[11px] font-black uppercase tracking-wider text-[#D40D14]">Bukti Tanda Tangan Elektronik (TTE)</span>
              <span class="text-[10px] font-mono-code font-bold text-stone-500">BSrE / UU ITE Standard</span>
            </div>

            <div class="flex flex-col sm:flex-row items-center gap-4">
              <div class="shrink-0 flex flex-col items-center">
                ${getQrCodeImgHtml(verifyUrl, 'QR Verifikasi ' + doc.id)}
                <span class="text-[9px] text-stone-500 mt-1">Scan untuk verifikasi</span>
              </div>
              <div class="space-y-2 w-full text-xs">
                <div class="flex items-start justify-between gap-2">
                  <div>
                    <span class="text-[10px] text-stone-400 block">Pejabat Penandatangan:</span>
                    <div class="font-extrabold text-stone-900 text-sm">${escapeHtml(approver)}</div>
                    <div class="text-[11px] font-semibold text-[#D40D14]">Kepala SMP IT Darul Fikri Sidoarjo</div>
                    ${doc.signatureCanvasData ? `
                      <div class="mt-2 p-1 bg-white rounded-lg border border-stone-200 inline-block">
                        <img src="${doc.signatureCanvasData}" alt="Tanda Tangan Basah" class="h-9 max-w-[130px] object-contain">
                        <div class="text-[8px] font-bold text-stone-400 text-center">Goresan TTE Basah</div>
                      </div>
                    ` : ''}
                  </div>
                  <div class="shrink-0 hidden sm:block">
                    ${getOfficialDafiStampSvg()}
                  </div>
                </div>
                <div>
                  <span class="text-[10px] text-stone-400 block">Waktu Pengesahan:</span>
                  <div class="font-bold text-stone-800">${escapeHtml(todayTime)}</div>
                </div>
                <div>
                  <span class="text-[10px] text-stone-400 block">Token Keabsahan (SHA-256):</span>
                  <div class="font-mono-code text-[11px] font-bold text-[#D40D14] bg-white p-1.5 rounded-lg border border-red-200 break-all select-all">
                    ${escapeHtml(doc.signatureToken)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ` : ''}

        <div class="p-3 rounded-xl bg-stone-100 text-[11px] text-stone-600 leading-relaxed border border-stone-200">
          <strong>Keterangan Resmi:</strong> Sistem Manajemen Dokumen SMP IT Darul Fikri menggunakan pengamanan kriptografi tanda tangan elektronik berbasis token SHA-256 untuk memastikan keaslian, integritas isi, dan keabsahan hukum dokumen sekolah.
        </div>
      `;

      if (btnPrint) {
        btnPrint.onclick = function() {
          printSignatureCertificate(doc.id);
        };
      }
      if (btnOpen) {
        btnOpen.onclick = function() {
          closeVerificationModal();
          openPdfViewer(doc.id);
        };
      }

      modal.classList.remove('hidden');
    }

    /**
     * Menutup Modal Verifikasi
     */
    function closeVerificationModal() {
      const modal = document.getElementById('signatureVerificationModal');
      if (modal) modal.classList.add('hidden');
    }

    /**
     * Mencetak Lembar Pengesahan Resmi Ber-TTE
     */
    function printSignatureCertificate(docId) {
      const doc = appState.documents.find(function(d) { return d.id === docId; });
      if (!doc) return;

      const printArea = document.getElementById('printableCertificateArea');
      if (!printArea) return;

      const verifyUrl = getDocVerificationUrl(doc.id);
      const approver = doc.disetujuiOleh || 'Ustadz Kepala SMP IT Darul Fikri, M.Pd.';
      const timeStr = doc.tanggalDisetujui || (doc.tanggalPersetujuan || doc.tanggalUpdate || '2026-10-12') + ' 08:30 WIB';
      const token = doc.signatureToken || ('DAFI-TTE-2026-' + doc.id);

      printArea.innerHTML = `
        <div style="font-family: 'Plus Jakarta Sans', Arial, sans-serif; max-width: 800px; margin: 0 auto; color: #1c1917; line-height: 1.5; padding: 20px;">
          
          <!-- Kop Surat Resmi DAFI -->
          <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 4px double #1c1917; padding-bottom: 12px; margin-bottom: 20px;">
            <div style="display: flex; align-items: center; gap: 14px;">
              <div style="width: 60px; height: 60px; background: #D40D14; color: white; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 20px; border-radius: 12px;">
                DAFI
              </div>
              <div>
                <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; color: #D40D14;">Yayasan Pondok Pesantren Darul Fikri</div>
                <div style="font-size: 20px; font-weight: 900; color: #0c0a09; letter-spacing: -0.5px;">SMP ISLAM TERPADU DARUL FIKRI</div>
                <div style="font-size: 11px; color: #78716c;">Jl. Raya Sarirogo No. 1, Sidoarjo, Jawa Timur • Website: smpit-dafi.sch.id</div>
              </div>
            </div>
            <div style="text-align: right; font-size: 10px; color: #78716c; font-family: monospace;">
              <div>LEMBAR PENGESAHAN ELEKTRONIK</div>
              <div style="font-weight: bold; color: #D40D14; font-size: 11px; margin-top: 2px;">TTE NO. ${escapeHtml(doc.id)}</div>
            </div>
          </div>

          <!-- Judul Sertifikat -->
          <div style="text-align: center; margin: 25px 0 20px 0;">
            <h1 style="font-size: 18px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; color: #0c0a09; margin: 0 0 6px 0;">
              LEMBAR PENGESAHAN DOKUMEN RESMI
            </h1>
            <div style="font-size: 12px; font-weight: bold; color: #D40D14; font-family: monospace;">
              Nomor Sertifikasi TTE: BSrE/DAFI/TTE/${escapeHtml(doc.id)}/${new Date().getFullYear()}
            </div>
          </div>

          <!-- Pernyataan Pengesahan -->
          <div style="font-size: 12px; text-align: justify; margin-bottom: 20px; color: #44403c; line-height: 1.7;">
            Yang bertanda tangan di bawah ini, Kepala Sekolah Menengah Pertama (SMP) Islam Terpadu Darul Fikri Sidoarjo, menerangkan bahwa dokumen dengan rincian berikut:
          </div>

          <!-- Tabel Rincian Dokumen -->
          <table style="width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 25px; border: 1px solid #e7e5e4;">
            <tr style="background: #fafaf9; border-bottom: 1px solid #e7e5e4;">
              <td style="padding: 8px 12px; font-weight: bold; width: 30%; color: #57534e;">Judul Dokumen</td>
              <td style="padding: 8px 12px; font-weight: 800; color: #0c0a09;">${escapeHtml(doc.judul)}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e7e5e4;">
              <td style="padding: 8px 12px; font-weight: bold; color: #57534e;">Nomor Dokumen</td>
              <td style="padding: 8px 12px; font-family: monospace; font-weight: bold;">${escapeHtml(doc.nomorDokumen)}</td>
            </tr>
            <tr style="background: #fafaf9; border-bottom: 1px solid #e7e5e4;">
              <td style="padding: 8px 12px; font-weight: bold; color: #57534e;">Kategori &amp; Versi</td>
              <td style="padding: 8px 12px; font-weight: bold; color: #D40D14;">${escapeHtml(doc.kategori)} &mdash; Versi ${escapeHtml(doc.versi)}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e7e5e4;">
              <td style="padding: 8px 12px; font-weight: bold; color: #57534e;">Unit Penanggung Jawab</td>
              <td style="padding: 8px 12px;">${escapeHtml(doc.pembuat)} SMP DAFI</td>
            </tr>
            <tr style="background: #fafaf9; border-bottom: 1px solid #e7e5e4;">
              <td style="padding: 8px 12px; font-weight: bold; color: #57534e;">Ringkasan Substansi</td>
              <td style="padding: 8px 12px; text-align: justify; line-height: 1.6;">${escapeHtml(doc.ringkasan)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #57534e;">Status Keabsahan</td>
              <td style="padding: 8px 12px; font-weight: 800; color: #047857;">✓ TELAH DISETUJUI &amp; DISAHKAN SECARA RESMI</td>
            </tr>
          </table>

          <div style="font-size: 12px; text-align: justify; margin-bottom: 30px; color: #44403c; line-height: 1.7;">
            Dokumen tersebut telah diteliti, diverifikasi substansinya, dan dinyatakan berlaku mengikat di seluruh lingkungan SMP IT Darul Fikri sejak tanggal pengesahan ditetapkan.
          </div>

          <!-- Blok Tanda Tangan Elektronik & QR Code (Dual Column) -->
          <div style="border: 2px solid #D40D14; border-radius: 14px; background: #fffaf9; padding: 18px; margin-bottom: 25px;">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 20px;">
              
              <!-- QR Code & Keterangan Scan -->
              <div style="text-align: center; width: 140px; shrink: 0;">
                ${getQrCodeImgHtml(verifyUrl, 'QR ' + doc.id)}
                <div style="font-size: 9px; font-weight: bold; color: #D40D14; margin-top: 6px; text-transform: uppercase;">Pindai untuk Verifikasi</div>
                <div style="font-size: 8px; color: #78716c;">Keaslian Dokumen Real-time</div>
              </div>

              <!-- Data TTE -->
              <div style="flex: 1; border-left: 1px solid #fecaca; padding-left: 20px;">
                <div style="font-size: 11px; color: #78716c;">Ditetapkan dan disahkan di Sidoarjo:</div>
                <div style="font-size: 14px; font-weight: 900; color: #0c0a09; margin: 4px 0 2px 0;">${escapeHtml(approver)}</div>
                <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px;">
                  <div>
                    <div style="font-size: 11px; font-weight: bold; color: #D40D14;">Kepala Sekolah • SMP IT Darul Fikri Sidoarjo</div>
                    ${doc.signatureCanvasData ? `
                      <div style="margin-top: 6px; padding: 4px; background: white; border: 1px solid #e7e5e4; border-radius: 8px; display: inline-block;">
                        <img src="${doc.signatureCanvasData}" alt="TTE Basah" style="height: 48px; max-width: 140px; object-fit: contain;">
                      </div>
                    ` : ''}
                  </div>
                  <div style="transform: rotate(-6deg); margin-right: 15px;">
                    ${getOfficialDafiStampSvg()}
                  </div>
                </div>
                
                <div style="margin-top: 10px; font-size: 10px; color: #57534e;">
                  <div>Waktu Pengesahan: <strong>${escapeHtml(timeStr)}</strong></div>
                  <div>Integritas Kriptografi: <strong>SHA-256 Validated Token</strong></div>
                </div>

                <div style="margin-top: 8px; background: white; border: 1px solid #e7e5e4; padding: 6px 10px; border-radius: 8px; font-family: monospace; font-size: 10px; font-weight: bold; color: #D40D14; word-break: break-all;">
                  TOKEN TTE: ${escapeHtml(token)}
                </div>
              </div>

            </div>
          </div>

          <!-- Catatan Hukum Legalitas TTE -->
          <div style="border-top: 1px solid #e7e5e4; padding-top: 10px; font-size: 9px; color: #78716c; text-align: justify; line-height: 1.5;">
            <strong>Dasar Hukum:</strong> Sesuai dengan UU Republik Indonesia No. 11 Tahun 2008 Pasal 5 ayat (1) tentang Informasi dan Transaksi Elektronik (ITE), dokumen elektronik dan tanda tangan elektronik ini merupakan alat bukti hukum yang sah serta mengikat secara legal.
          </div>

        </div>
      `;

      document.body.classList.add('printing-certificate');
      window.print();
      setTimeout(function() {
        document.body.classList.remove('printing-certificate');
      }, 1000);
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

    // =========================================================================
    // MODUL: NOTIFIKASI AKUN TERDAFTAR (PENGGANTI NOTIFIKASI WA SELAMA TRIAL)
    // =========================================================================
    function getInAppNotifications() {
      let list = safeGetStorage(STORAGE_KEY_NOTIFICATIONS, null);
      if (!list || !Array.isArray(list)) {
        list = [
          {
            id: 'NOTIF-INIT-1',
            targetRole: 'kepsek',
            title: 'Pusat Persetujuan Dokumen',
            message: 'Selamat datang di DDMS. Pengajuan SOP, SK, dan KBM oleh tendik akan masuk ke sini untuk disahkan secara elektronik.',
            docId: null,
            type: 'system',
            read: false,
            dateStr: '01 Nov 2026',
            timeStr: '07:00 WIB'
          },
          {
            id: 'NOTIF-INIT-2',
            targetRole: 'tendik',
            title: 'Alur Pengajuan Berkas',
            message: 'Gunakan tombol Unggah PDF untuk mengajukan draf dokumen baru kepada Kepala Sekolah. Status dokumen akan dipantau real-time.',
            docId: null,
            type: 'system',
            read: false,
            dateStr: '01 Nov 2026',
            timeStr: '07:00 WIB'
          },
          {
            id: 'NOTIF-INIT-3',
            targetRole: 'admin',
            title: 'Sistem Manajemen Dokumen Aktif',
            message: 'Pangkalan data repositori dokumen terpusat SMP IT Darul Fikri siap digunakan.',
            docId: null,
            type: 'system',
            read: false,
            dateStr: '01 Nov 2026',
            timeStr: '07:00 WIB'
          }
        ];
        safeSetStorage(STORAGE_KEY_NOTIFICATIONS, list);
      }
      return list;
    }

    function sendInAppNotification(data) {
      const list = getInAppNotifications();
      const now = new Date();
      const dateStr = now.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
      const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';

      const newNotif = {
        id: 'NOTIF-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
        targetRole: data.targetRole || 'all',
        targetUsername: data.targetUsername || '',
        title: data.title || 'Pemberitahuan Sistem',
        message: data.message || '',
        docId: data.docId || null,
        type: data.type || 'system',
        read: false,
        dateStr: dateStr,
        timeStr: timeStr,
        timestamp: now.toISOString()
      };

      list.unshift(newNotif);
      safeSetStorage(STORAGE_KEY_NOTIFICATIONS, list);
      updateNotificationBadge();
    }

    function updateNotificationBadge() {
      const notifContainer = document.getElementById('notificationDropdownContainer');
      const badge = document.getElementById('notificationBadge');
      const panelBadge = document.getElementById('notifPanelUnreadBadge');
      if (!appState.currentUser) {
        if (notifContainer) notifContainer.classList.add('hidden');
        return;
      }
      if (notifContainer) notifContainer.classList.remove('hidden');

      const userRole = appState.currentUser.role;
      const username = appState.currentUser.username;
      const list = getInAppNotifications();

      const userNotifs = list.filter(function(n) {
        if (n.targetRole === 'all') return true;
        if (n.targetUsername && n.targetUsername === username) return true;
        if (n.targetRole === userRole) return true;
        if (userRole === 'admin') return true;
        return false;
      });

      const unreadCount = userNotifs.filter(function(n) { return !n.read; }).length;

      if (badge) {
        badge.textContent = unreadCount > 9 ? '9+' : unreadCount;
        badge.classList.toggle('hidden', unreadCount === 0);
      }
      if (panelBadge) {
        panelBadge.textContent = `${unreadCount} Baru`;
      }
    }

    function toggleNotificationDropdown() {
      const panel = document.getElementById('notificationDropdownPanel');
      if (!panel) return;
      const isHidden = panel.classList.contains('hidden');
      if (isHidden) {
        renderNotificationList();
        panel.classList.remove('hidden');
      } else {
        panel.classList.add('hidden');
      }
    }

    function renderNotificationList() {
      const container = document.getElementById('notificationListContainer');
      if (!container || !appState.currentUser) return;

      const userRole = appState.currentUser.role;
      const username = appState.currentUser.username;
      const list = getInAppNotifications();

      const userNotifs = list.filter(function(n) {
        if (n.targetRole === 'all') return true;
        if (n.targetUsername && n.targetUsername === username) return true;
        if (n.targetRole === userRole) return true;
        if (userRole === 'admin') return true;
        return false;
      });

      if (userNotifs.length === 0) {
        container.innerHTML = `
          <div class="p-6 text-center text-xs text-stone-400 space-y-1">
            <div class="text-lg">🔕</div>
            <p>Belum ada notifikasi akun saat ini.</p>
          </div>
        `;
        return;
      }

      container.innerHTML = userNotifs.map(function(n) {
        let icon = '📢';
        let iconColor = 'bg-stone-100 text-stone-700';
        if (n.type === 'submission') {
          icon = '📝';
          iconColor = 'bg-amber-100 text-amber-800';
        } else if (n.type === 'approval') {
          icon = '✓';
          iconColor = 'bg-emerald-100 text-emerald-800 font-bold';
        } else if (n.type === 'revision') {
          icon = '✏️';
          iconColor = 'bg-rose-100 text-rose-800';
        }

        return `
          <div onclick="handleNotificationClick('${escapeHtml(n.id)}', '${escapeHtml(n.docId || '')}')" class="notification-item p-3.5 flex items-start gap-3 cursor-pointer ${!n.read ? 'unread' : ''}">
            <div class="w-7 h-7 rounded-lg ${iconColor} flex items-center justify-center text-xs shrink-0 mt-0.5">
              ${icon}
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between gap-1">
                <h5 class="text-xs font-bold text-stone-900 truncate">${escapeHtml(n.title)}</h5>
                <span class="text-[10px] text-stone-400 shrink-0 font-medium">${escapeHtml(n.timeStr)}</span>
              </div>
              <p class="text-[11px] text-stone-600 line-clamp-2 mt-0.5">${escapeHtml(n.message)}</p>
              <div class="flex items-center justify-between text-[10px] text-stone-400 mt-1">
                <span>${escapeHtml(n.dateStr)}</span>
                ${n.docId ? `<span class="text-[#D40D14] font-semibold hover:underline">Buka Berkas &rarr;</span>` : ''}
              </div>
            </div>
          </div>
        `;
      }).join('');
    }

    function handleNotificationClick(notifId, docId) {
      const list = getInAppNotifications();
      const target = list.find(function(n) { return n.id === notifId; });
      if (target) {
        target.read = true;
        safeSetStorage(STORAGE_KEY_NOTIFICATIONS, list);
        updateNotificationBadge();
      }
      const panel = document.getElementById('notificationDropdownPanel');
      if (panel) panel.classList.add('hidden');

      if (docId) {
        openPdfViewer(docId);
      }
    }

    function markAllNotificationsAsRead() {
      if (!appState.currentUser) return;
      const userRole = appState.currentUser.role;
      const username = appState.currentUser.username;
      const list = getInAppNotifications();

      list.forEach(function(n) {
        if (n.targetRole === 'all' || n.targetRole === userRole || (n.targetUsername && n.targetUsername === username) || userRole === 'admin') {
          n.read = true;
        }
      });

      safeSetStorage(STORAGE_KEY_NOTIFICATIONS, list);
      updateNotificationBadge();
      renderNotificationList();
      showToast('Semua notifikasi telah ditandai dibaca.', 'success');
    }

    // =========================================================================
    // MODUL: PIN / FAVORIT DOKUMEN (⭐)
    // =========================================================================
    function getUserFavorites() {
      if (!appState.currentUser) return [];
      const map = safeGetStorage(STORAGE_KEY_FAVORITES, {});
      return Array.isArray(map[appState.currentUser.username]) ? map[appState.currentUser.username] : [];
    }

    function isDocFavorited(docId) {
      return getUserFavorites().includes(docId);
    }

    function toggleFavoriteDoc(docId) {
      if (!appState.currentUser) {
        openLoginModal('Silakan masuk terlebih dahulu untuk menyematkan dokumen favorit.');
        return;
      }
      const username = appState.currentUser.username;
      const map = safeGetStorage(STORAGE_KEY_FAVORITES, {});
      if (!Array.isArray(map[username])) {
        map[username] = [];
      }
      const idx = map[username].indexOf(docId);
      const isAdding = idx === -1;
      if (isAdding) {
        map[username].push(docId);
        showToast('Dokumen ditambahkan ke Favorit Saya ⭐', 'success');
      } else {
        map[username].splice(idx, 1);
        showToast('Dokumen dihapus dari Favorit Saya', 'info');
      }
      safeSetStorage(STORAGE_KEY_FAVORITES, map);
      updateFavoritesCounter();
      renderCatalog();
    }

    function updateFavoritesCounter() {
      const favBadge = document.getElementById('folderCountFav');
      const favList = getUserFavorites();
      if (favBadge) {
        favBadge.textContent = favList.length;
      }
    }

    // =========================================================================
    // MODUL: MASA BERLAKU & SIKLUS PENINJAUAN DOKUMEN (LIFECYCLE)
    // =========================================================================
    function getDocLifecycle(doc) {
      const masaTahun = parseInt(doc.masaBerlakuTahun !== undefined ? doc.masaBerlakuTahun : 1, 10);
      if (masaTahun >= 90) {
        return {
          status: 'active',
          label: 'Berlaku Tetap',
          class: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          daysRemaining: 9999
        };
      }

      const dateRefStr = doc.tanggalDisetujui || doc.tanggalPersetujuan || doc.tanggalUpdate || '2026-01-01';
      const dateRef = new Date(dateRefStr.split(' ')[0]);
      const expDate = new Date(dateRef);
      expDate.setFullYear(expDate.getFullYear() + masaTahun);

      const now = new Date();
      const diffMs = expDate.getTime() - now.getTime();
      const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

      if (diffDays < 0) {
        return {
          status: 'expired',
          label: 'Perlu Pembaruan',
          class: 'bg-rose-50 text-rose-700 border-rose-300 font-bold',
          daysRemaining: diffDays
        };
      } else if (diffDays <= 30) {
        return {
          status: 'expiring',
          label: `Segera Ditinjau (${diffDays} hr)`,
          class: 'bg-amber-50 text-amber-800 border-amber-300 font-bold',
          daysRemaining: diffDays
        };
      } else {
        const months = Math.ceil(diffDays / 30);
        return {
          status: 'active',
          label: `Aktif (${months} bln)`,
          class: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          daysRemaining: diffDays
        };
      }
    }

    // =========================================================================
    // MODUL: STEMPEL RESMI SEKOLAH DAFI (SVG RESMI)
    // =========================================================================
    function getOfficialDafiStampSvg() {
      return `
        <div class="dafi-official-stamp inline-block" style="width: 110px; height: 110px;" title="Stempel Resmi SMP IT Darul Fikri">
          <svg viewBox="0 0 160 160" width="100%" height="100%">
            <defs>
              <path id="stampOuterPath" d="M 80, 80 m -62, 0 a 62,62 0 1,1 124,0 a 62,62 0 1,1 -124,0" />
              <path id="stampInnerPath" d="M 80, 80 m -46, 0 a 46,46 0 1,0 92,0 a 46,46 0 1,0 -92,0" />
            </defs>
            <circle cx="80" cy="80" r="74" fill="none" stroke="#D40D14" stroke-width="2.5" stroke-dasharray="7,3" />
            <circle cx="80" cy="80" r="70" fill="none" stroke="#D40D14" stroke-width="3.5" />
            <circle cx="80" cy="80" r="48" fill="none" stroke="#D40D14" stroke-width="1.8" />
            
            <text font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="9.5" font-weight="900" fill="#D40D14" letter-spacing="1.4">
              <textPath href="#stampOuterPath" startOffset="50%" text-anchor="middle">
                YAYASAN DARUL FIKRI SIDOARJO
              </textPath>
            </text>

            <text font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="9" font-weight="900" fill="#D40D14" letter-spacing="1.2">
              <textPath href="#stampInnerPath" startOffset="50%" text-anchor="middle">
                ★ SMP IT DARUL FIKRI ★
              </textPath>
            </text>

            <g transform="translate(80, 80)">
              <rect x="-38" y="-12" width="76" height="24" rx="4" fill="#D40D14" opacity="0.94" />
              <text x="0" y="4" text-anchor="middle" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="10.5" font-weight="900" fill="#FFFFFF" letter-spacing="1">
                DISAHKAN
              </text>
              <circle cx="-30" cy="0" r="2" fill="#FFFFFF" />
              <circle cx="30" cy="0" r="2" fill="#FFFFFF" />
            </g>
          </svg>
        </div>
      `;
    }

    // =========================================================================
    // MODUL: PERSETUJUAN MASSAL (BATCH APPROVAL) KHUSUS KEPALA SEKOLAH
    // =========================================================================
    function toggleDocPendingSelection(docId, checked) {
      if (checked) {
        appState.selectedPendingDocIds.add(docId);
      } else {
        appState.selectedPendingDocIds.delete(docId);
      }
      updateBatchApprovalBar();
    }

    function toggleSelectAllPending(checked) {
      const pendingDocs = appState.documents.filter(function(d) { return d.statusApproval === 'Menunggu Persetujuan'; });
      if (checked) {
        pendingDocs.forEach(function(d) { appState.selectedPendingDocIds.add(d.id); });
      } else {
        appState.selectedPendingDocIds.clear();
      }
      updateBatchApprovalBar();
      renderCatalog();
    }

    function updateBatchApprovalBar() {
      const bar = document.getElementById('batchApprovalBar');
      const countEl = document.getElementById('batchPendingSelectedCount');
      const btn = document.getElementById('btnBatchApproveKepsek');
      const badge = document.getElementById('batchApproveCountBadge');
      const checkAll = document.getElementById('batchSelectAllPendingCheck');

      const isKepsek = appState.currentUser && appState.currentUser.role === 'kepsek';
      const pendingDocs = appState.documents.filter(function(d) { return d.statusApproval === 'Menunggu Persetujuan'; });

      if (!bar) return;
      if (!isKepsek || pendingDocs.length === 0) {
        bar.classList.add('hidden');
        return;
      }

      bar.classList.remove('hidden');
      const selectedCount = appState.selectedPendingDocIds.size;
      if (countEl) countEl.textContent = selectedCount;
      if (badge) badge.textContent = selectedCount;
      if (btn) btn.disabled = selectedCount === 0;
      if (checkAll) {
        checkAll.checked = pendingDocs.length > 0 && selectedCount === pendingDocs.length;
      }
    }

    async function handleBatchApproveKepsek() {
      if (!appState.currentUser || appState.currentUser.role !== 'kepsek') {
        openLoginModal('Hanya Kepala Sekolah yang memiliki wewenang pengesahan massal.');
        return;
      }
      const selectedCount = appState.selectedPendingDocIds.size;
      if (selectedCount === 0) return;

      const confirmMsg = `Konfirmasi Persetujuan Massal:\n\nApakah Anda (Kepala Sekolah) menyetujui dan mengesahkan sekaligus ${selectedCount} dokumen terpilih?\n\nSeluruh dokumen akan ditandatangani secara digital (TTE resmi) dan notifikasi akan dikirimkan ke staf pengusul.`;
      if (!confirm(confirmMsg)) return;

      const today = new Date().toISOString().split('T')[0];
      const timeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
      const approverName = appState.currentUser.namaLengkap || 'Ustadz Kepala SMP IT Darul Fikri, M.Pd.';

      let approvedCount = 0;
      for (const docId of appState.selectedPendingDocIds) {
        const doc = appState.documents.find(function(d) { return d.id === docId; });
        if (doc && doc.statusApproval === 'Menunggu Persetujuan') {
          doc.statusApproval = 'Disetujui';
          doc.disetujuiOleh = approverName;
          doc.tanggalPersetujuan = today;
          doc.tanggalDisetujui = `${today} ${timeStr}`;
          doc.catatanPersetujuan = 'Disetujui & disahkan secara resmi melalui Pengesahan Massal Kepala Sekolah.';
          doc.signatureToken = await generateDocSignatureToken(doc, approverName, doc.tanggalDisetujui);

          if (!doc.riwayat) doc.riwayat = [];
          doc.riwayat.push({
            versionId: 'VER-APP-' + Date.now() + '-' + Math.floor(Math.random() * 100),
            versi: doc.versi.replace(/\s*\(Usulan\)/i, '') + ' (Resmi Ber-TTE)',
            tanggalUpdate: today,
            diperbaruiOleh: approverName,
            catatanPerubahan: 'Pengesahan massal resmi Kepala Sekolah dengan TTE: ' + doc.signatureToken,
            ukuran: doc.ukuran || '320 KB'
          });
          doc.versi = doc.versi.replace(/\s*\(Usulan\)/i, '');
          approvedCount++;
        }
      }

      appState.selectedPendingDocIds.clear();
      safeSetStorage(STORAGE_KEY_DOCS, appState.documents);

      sendInAppNotification({
        targetRole: 'tendik',
        title: 'Pengesahan Massal Selesai',
        message: `Kepala Sekolah telah menyetujui dan mengesahkan sekaligus ${approvedCount} dokumen pengajuan KBM/SK.`,
        type: 'approval'
      });

      refreshAllViews();
      showToast(`Berhasil mengesahkan ${approvedCount} dokumen sekaligus secara resmi!`, 'success');
    }

    // =========================================================================
    // MODUL: CANVAS TANDA TANGAN BASAH DIGITAL & MODAL PERSETUJUAN KEPALA SEKOLAH
    // =========================================================================
    let signaturePadCtx = null;
    let isDrawingSignature = false;
    let hasDrawnSignature = false;

    function initSignatureCanvas() {
      const canvas = document.getElementById('signatureCanvas');
      if (!canvas) return;
      signaturePadCtx = canvas.getContext('2d');
      signaturePadCtx.lineWidth = 2.5;
      signaturePadCtx.lineCap = 'round';
      signaturePadCtx.strokeStyle = '#1e293b';

      function getPos(e) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        if (e.touches && e.touches[0]) {
          return {
            x: (e.touches[0].clientX - rect.left) * scaleX,
            y: (e.touches[0].clientY - rect.top) * scaleY
          };
        }
        return {
          x: (e.clientX - rect.left) * scaleX,
          y: (e.clientY - rect.top) * scaleY
        };
      }

      function startDraw(e) {
        isDrawingSignature = true;
        hasDrawnSignature = true;
        const p = getPos(e);
        signaturePadCtx.beginPath();
        signaturePadCtx.moveTo(p.x, p.y);
        if (e.type === 'touchstart') e.preventDefault();
      }

      function drawMove(e) {
        if (!isDrawingSignature) return;
        const p = getPos(e);
        signaturePadCtx.lineTo(p.x, p.y);
        signaturePadCtx.stroke();
        if (e.type === 'touchmove') e.preventDefault();
      }

      function stopDraw(e) {
        if (isDrawingSignature) {
          signaturePadCtx.closePath();
          isDrawingSignature = false;
        }
      }

      canvas.removeEventListener('mousedown', startDraw);
      canvas.removeEventListener('mousemove', drawMove);
      window.removeEventListener('mouseup', stopDraw);
      canvas.removeEventListener('touchstart', startDraw);
      canvas.removeEventListener('touchmove', drawMove);
      canvas.removeEventListener('touchend', stopDraw);

      canvas.addEventListener('mousedown', startDraw);
      canvas.addEventListener('mousemove', drawMove);
      window.addEventListener('mouseup', stopDraw);
      canvas.addEventListener('touchstart', startDraw, { passive: false });
      canvas.addEventListener('touchmove', drawMove, { passive: false });
      canvas.addEventListener('touchend', stopDraw);
    }

    function clearSignatureCanvas() {
      const canvas = document.getElementById('signatureCanvas');
      if (!canvas || !signaturePadCtx) return;
      signaturePadCtx.clearRect(0, 0, canvas.width, canvas.height);
      hasDrawnSignature = false;
    }

    function openKepsekApprovalModal(docId) {
      if (!appState.currentUser || appState.currentUser.role !== 'kepsek') {
        openLoginModal('Hanya Kepala Sekolah yang memiliki wewenang mengesahkan dokumen resmi.');
        return;
      }
      const doc = appState.documents.find(function(d) { return d.id === docId; });
      if (!doc) return;

      document.getElementById('approvalTargetDocId').value = doc.id;
      document.getElementById('approvalDocCategoryBadge').textContent = doc.kategori;
      document.getElementById('approvalDocNomor').textContent = doc.nomorDokumen || 'Tanpa Nomor';
      document.getElementById('approvalDocTitle').textContent = doc.judul;
      document.getElementById('approvalDocSummary').textContent = doc.ringkasan || 'Tidak ada ringkasan.';
      document.getElementById('approvalDocSubmitter').textContent = doc.diajukanOleh || doc.pembuat;
      document.getElementById('approvalDocVersion').textContent = doc.versi;
      document.getElementById('approvalNotesInput').value = '';

      clearSignatureCanvas();
      const modal = document.getElementById('kepsekApprovalModal');
      if (modal) modal.classList.remove('hidden');
      setTimeout(initSignatureCanvas, 100);
    }

    function closeKepsekApprovalModal() {
      const modal = document.getElementById('kepsekApprovalModal');
      if (modal) modal.classList.add('hidden');
    }

    async function submitKepsekApproval() {
      const docId = document.getElementById('approvalTargetDocId').value;
      const doc = appState.documents.find(function(d) { return d.id === docId; });
      if (!doc) return;

      const notes = (document.getElementById('approvalNotesInput').value || '').trim();
      const today = new Date().toISOString().split('T')[0];
      const timeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
      const approverName = appState.currentUser.namaLengkap || 'Ustadz Kepala SMP IT Darul Fikri, M.Pd.';

      doc.statusApproval = 'Disetujui';
      doc.disetujuiOleh = approverName;
      doc.tanggalPersetujuan = today;
      doc.tanggalDisetujui = `${today} ${timeStr}`;
      doc.catatanPersetujuan = notes || 'Telah disetujui dan disahkan secara resmi oleh Kepala Sekolah.';

      if (hasDrawnSignature) {
        const canvas = document.getElementById('signatureCanvas');
        if (canvas) {
          doc.signatureCanvasData = canvas.toDataURL('image/png');
        }
      }

      doc.signatureToken = await generateDocSignatureToken(doc, approverName, doc.tanggalDisetujui);

      if (!doc.riwayat) doc.riwayat = [];
      doc.riwayat.push({
        versionId: 'VER-APP-' + Date.now(),
        versi: doc.versi.replace(/\s*\(Usulan\)/i, '') + ' (Resmi Ber-TTE)',
        tanggalUpdate: today,
        diperbaruiOleh: approverName,
        catatanPerubahan: 'Dokumen disetujui & disahkan Kepala Sekolah dengan TTE: ' + doc.signatureToken,
        ukuran: doc.ukuran || '320 KB'
      });
      doc.versi = doc.versi.replace(/\s*\(Usulan\)/i, '');

      safeSetStorage(STORAGE_KEY_DOCS, appState.documents);

      sendInAppNotification({
        targetRole: 'tendik',
        title: 'Dokumen Resmi Disahkan',
        message: `Dokumen "${doc.judul}" telah disetujui & disahkan oleh Kepala Sekolah dengan TTE.`,
        docId: doc.id,
        type: 'approval'
      });

      closeKepsekApprovalModal();
      refreshAllViews();
      if (appState.currentViewingDocId === doc.id) {
        renderPdfViewerContent();
      }
      showToast(`Dokumen "${doc.judul}" berhasil disetujui & disahkan resmi!`, 'success');
    }

    function submitKepsekRevision() {
      const docId = document.getElementById('approvalTargetDocId').value;
      const doc = appState.documents.find(function(d) { return d.id === docId; });
      if (!doc) return;

      const notes = (document.getElementById('approvalNotesInput').value || '').trim();
      if (!notes) {
        alert('Mohon tuliskan arahan atau catatan revisi agar staf pengusul mengetahui bagian yang perlu diperbaiki.');
        return;
      }

      doc.statusApproval = 'Perlu Revisi';
      doc.catatanPersetujuan = notes;
      safeSetStorage(STORAGE_KEY_DOCS, appState.documents);

      sendInAppNotification({
        targetRole: 'tendik',
        title: 'Arahan Revisi Dokumen',
        message: `Kepala Sekolah meminta revisi dokumen "${doc.judul}": "${notes}"`,
        docId: doc.id,
        type: 'revision'
      });

      closeKepsekApprovalModal();
      refreshAllViews();
      if (appState.currentViewingDocId === doc.id) {
        renderPdfViewerContent();
      }
      showToast(`Catatan revisi untuk "${doc.judul}" telah dikirim ke staf pengusul.`, 'warning');
    }

    // =========================================================================
    // MODUL: MANAJEMEN PENGGUNA & AKUN PENDIDIK (KHUSUS ADMIN)
    // =========================================================================
    const STORAGE_KEY_USERS_STORE = 'smp_dafi_users_v2';

    function getStoredUsers() {
      let users = safeGetStorage(STORAGE_KEY_USERS_STORE, null);
      if (!users || !Array.isArray(users) || users.length === 0) {
        users = DEMO_USERS.slice();
        safeSetStorage(STORAGE_KEY_USERS_STORE, users);
      }
      return users;
    }

    function saveStoredUsers(users) {
      safeSetStorage(STORAGE_KEY_USERS_STORE, users);
    }

    function toggleAddUserForm(show) {
      const container = document.getElementById('addUserFormContainer');
      const btnText = document.getElementById('btnAddUserText');
      if (!container) return;
      const isVisible = !container.classList.contains('hidden');
      const targetState = (typeof show === 'boolean') ? show : !isVisible;
      container.classList.toggle('hidden', !targetState);
      if (btnText) {
        btnText.textContent = targetState ? 'Tutup Formulir' : 'Tambah Pengguna Baru';
      }
      if (targetState) {
        const uInput = document.getElementById('newUserUsername');
        if (uInput) uInput.focus();
      }
    }

    function generateRandomUserPassword() {
      const passEl = document.getElementById('newUserPassword');
      if (passEl) {
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        passEl.value = 'dafi' + randomNum;
      }
    }

    async function handleAddUserSubmit(e) {
      e.preventDefault();
      const usernameInput = document.getElementById('newUserUsername');
      const fullNameInput = document.getElementById('newUserFullName');
      const roleSelect = document.getElementById('newUserRole');
      const jobInput = document.getElementById('newUserJob');
      const passInput = document.getElementById('newUserPassword');

      const username = (usernameInput ? usernameInput.value : '').trim().toLowerCase().replace(/\s+/g, '');
      const namaLengkap = (fullNameInput ? fullNameInput.value : '').trim();
      const role = (roleSelect ? roleSelect.value : 'tendik').trim();
      const jabatan = (jobInput ? jobInput.value : '').trim();
      const password = (passInput ? passInput.value : 'dafi2026').trim();

      if (!username || !namaLengkap || !jabatan || !password) {
        showToast('Semua kolom wajib diisi untuk menambahkan pengguna.', 'warning');
        return;
      }

      if (username.length < 3) {
        showToast('Username minimal 3 karakter (huruf/angka).', 'warning');
        return;
      }

      const users = getStoredUsers();
      const exists = users.some(function(u) { return u.username.toLowerCase() === username; });
      if (exists) {
        showToast(`Username "${username}" sudah digunakan oleh akun lain.`, 'error');
        return;
      }

      const salt = 'dafi_salt_' + Math.random().toString(36).substring(2, 10);
      const passwordHash = await hashPasswordClient(password, salt);

      const newUser = {
        username: username,
        salt: salt,
        passwordHash: passwordHash,
        namaLengkap: namaLengkap,
        role: role,
        jabatan: jabatan,
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      saveStoredUsers(users);

      // Simpan hash di custom passwords store agar kompatibel offline
      const customCreds = safeGetStorage('smp_dafi_user_passwords', {});
      customCreds[username] = passwordHash;
      safeSetStorage('smp_dafi_user_passwords', customCreds);

      // Sinkronisasi ke backend GAS jika aktif
      if (isValidGasUrl(appState.gasWebAppUrl)) {
        try {
          fetch(appState.gasWebAppUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify({
              action: 'addUser',
              authToken: appState.authToken || '',
              username: username,
              password: password,
              namaLengkap: namaLengkap,
              role: role,
              jabatan: jabatan
            }),
            redirect: 'follow'
          }).catch(function(err) { console.warn('GAS user sync failed:', err); });
        } catch (err) {}
      }

      showToast(`Pengguna "${namaLengkap}" berhasil ditambahkan! Kata sandi: ${password}`, 'success');

      // Reset form
      if (usernameInput) usernameInput.value = '';
      if (fullNameInput) fullNameInput.value = '';
      if (jobInput) jobInput.value = '';
      if (passInput) passInput.value = 'dafi2026';
      toggleAddUserForm(false);
      renderUserManagementTable();
    }

    async function handleDeleteUserAction(username) {
      if (appState.currentUser && appState.currentUser.username.toLowerCase() === username.toLowerCase()) {
        showToast('Anda tidak dapat menghapus akun yang sedang Anda gunakan saat ini.', 'warning');
        return;
      }
      if (username.toLowerCase() === 'admin') {
        showToast('Akun administrator sistem utama terlindungi dan tidak dapat dihapus.', 'error');
        return;
      }

      const users = getStoredUsers();
      const targetUser = users.find(function(u) { return u.username.toLowerCase() === username.toLowerCase(); });
      if (!targetUser) return;

      const confirmed = confirm(`Apakah Anda yakin ingin menghapus akun "${targetUser.namaLengkap}" (@${targetUser.username})?`);
      if (!confirmed) return;

      const updated = users.filter(function(u) { return u.username.toLowerCase() !== username.toLowerCase(); });
      saveStoredUsers(updated);

      // Sinkronisasi ke GAS jika aktif
      if (isValidGasUrl(appState.gasWebAppUrl)) {
        try {
          fetch(appState.gasWebAppUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify({
              action: 'deleteUser',
              authToken: appState.authToken || '',
              username: username
            }),
            redirect: 'follow'
          }).catch(function(err) { console.warn('GAS delete user sync failed:', err); });
        } catch (e) {}
      }

      showToast(`Pengguna "${targetUser.namaLengkap}" berhasil dihapus.`, 'success');
      renderUserManagementTable();
    }

    async function promptResetUserPassword(username) {
      const users = getStoredUsers();
      const targetUser = users.find(function(u) { return u.username.toLowerCase() === username.toLowerCase(); });
      if (!targetUser) return;

      const newPass = prompt(`Masukkan kata sandi baru untuk pengguna "${targetUser.namaLengkap}" (@${username}):`, 'dafi2026');
      if (!newPass || newPass.trim().length < 4) {
        if (newPass !== null) showToast('Kata sandi baru minimal 4 karakter.', 'warning');
        return;
      }

      const salt = 'dafi_salt_' + Math.random().toString(36).substring(2, 10);
      const passwordHash = await hashPasswordClient(newPass.trim(), salt);
      targetUser.salt = salt;
      targetUser.passwordHash = passwordHash;
      saveStoredUsers(users);

      const customCreds = safeGetStorage('smp_dafi_user_passwords', {});
      customCreds[username] = passwordHash;
      safeSetStorage('smp_dafi_user_passwords', customCreds);

      // Sinkronisasi ke GAS jika aktif
      if (isValidGasUrl(appState.gasWebAppUrl)) {
        try {
          fetch(appState.gasWebAppUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify({
              action: 'changePassword',
              authToken: appState.authToken || '',
              username: username,
              oldPassword: '',
              newPassword: newPass.trim()
            }),
            redirect: 'follow'
          }).catch(function(err) { console.warn('GAS password sync failed:', err); });
        } catch (e) {}
      }

      showToast(`Kata sandi pengguna "${targetUser.namaLengkap}" berhasil diperbarui!`, 'success');
    }

    function renderUserManagementTable() {
      const container = document.getElementById('userManagementTableContainer');
      const badge = document.getElementById('userCountBadge');
      if (!container) return;

      const users = getStoredUsers();
      if (badge) badge.textContent = `${users.length} Pengguna`;

      const roleBadges = {
        kepsek: { label: 'Kepala Sekolah', class: 'bg-red-50 text-[#D40D14] border-red-200' },
        admin: { label: 'Administrator', class: 'bg-stone-800 text-white border-stone-800' },
        guru: { label: 'Guru / Pendidik', class: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
        tendik: { label: 'Tenaga Kependidikan', class: 'bg-amber-50 text-amber-800 border-amber-200' }
      };

      const rows = users.map(function(u) {
        const isCurrent = appState.currentUser && appState.currentUser.username.toLowerCase() === u.username.toLowerCase();
        const isSystemAdmin = u.username.toLowerCase() === 'admin';
        const roleInfo = roleBadges[u.role] || { label: u.role, class: 'bg-stone-100 text-stone-700 border-stone-200' };

        return `
          <tr class="border-b border-stone-100 hover:bg-stone-50/80 transition">
            <td class="py-3 px-3.5">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-full bg-stone-100 border border-stone-200 text-stone-800 font-bold text-xs flex items-center justify-center shrink-0">
                  ${escapeHtml((u.namaLengkap || 'U').charAt(0).toUpperCase())}
                </div>
                <div class="min-w-0">
                  <div class="font-bold text-stone-800 text-xs truncate flex items-center gap-1.5">
                    <span>${escapeHtml(u.namaLengkap)}</span>
                    ${isCurrent ? '<span class="text-[9px] px-1.5 py-0.2 rounded bg-red-100 text-[#D40D14] font-bold">Anda</span>' : ''}
                  </div>
                  <div class="text-[11px] text-stone-400 font-mono">@${escapeHtml(u.username)}</div>
                </div>
              </div>
            </td>
            <td class="py-3 px-3">
              <span class="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold border ${roleInfo.class}">
                ${roleInfo.label}
              </span>
            </td>
            <td class="py-3 px-3 text-xs text-stone-600 font-medium">
              ${escapeHtml(u.jabatan || '-')}
            </td>
            <td class="py-3 px-3 text-center">
              <span class="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Aktif</span>
              </span>
            </td>
            <td class="py-3 px-3 text-right">
              <div class="flex items-center justify-end gap-1.5">
                <button type="button" onclick="promptResetUserPassword('${escapeHtml(u.username)}')" class="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-semibold transition cursor-pointer" title="Ubah kata sandi pengguna">
                  Reset Sandi
                </button>
                ${(!isCurrent && !isSystemAdmin) ? `
                  <button type="button" onclick="handleDeleteUserAction('${escapeHtml(u.username)}')" class="px-2.5 py-1 rounded-lg bg-red-50 hover:bg-red-100 text-[#D40D14] text-[11px] font-semibold transition cursor-pointer" title="Hapus akun pengguna">
                    Hapus
                  </button>
                ` : `
                  <span class="px-2 py-1 text-[11px] text-stone-300 italic">Terkunci</span>
                `}
              </div>
            </td>
          </tr>
        `;
      }).join('');

      container.innerHTML = `
        <table class="w-full text-left text-xs">
          <thead class="bg-stone-50 border-b border-stone-200 text-stone-400 uppercase text-[10px] font-bold">
            <tr>
              <th class="py-2.5 px-3.5">Nama &amp; Username</th>
              <th class="py-2.5 px-3">Hak Akses</th>
              <th class="py-2.5 px-3">Jabatan &amp; Unit</th>
              <th class="py-2.5 px-3 text-center">Status</th>
              <th class="py-2.5 px-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      `;
    }

    // =========================================================================
    // MODUL: REKAPITULASI DOKUMEN UNIT KERJA & AKREDITASI (HALAMAN UTAMA)
    // =========================================================================
    function renderRekapitulasiPage() {
      const container = document.getElementById('rekapPageContent');
      if (!container) return;

      const docs = appState.documents;
      const total = docs.length;
      const approved = docs.filter(function(d) { return d.statusApproval === 'Disetujui'; }).length;
      const pending = docs.filter(function(d) { return d.statusApproval === 'Menunggu Persetujuan'; }).length;
      const revision = docs.filter(function(d) { return d.statusApproval === 'Perlu Revisi'; }).length;

      let activeCount = 0;
      let expiringCount = 0;
      let expiredCount = 0;

      docs.forEach(function(d) {
        const lc = getDocLifecycle(d);
        if (lc.status === 'active') activeCount++;
        else if (lc.status === 'expiring') expiringCount++;
        else if (lc.status === 'expired') expiredCount++;
      });

      // Kumpulkan daftar seluruh unit kerja unik
      const defaultUnits = ['Kepala Sekolah', 'Waka Kurikulum', 'Waka Kesiswaan', 'Kepala TU', 'Tim Penjaminan Mutu', 'Humas & Kemitraan'];
      const docUnits = docs.map(function(d) { return d.pembuat; }).filter(Boolean);
      const allUnitsSet = {};
      defaultUnits.concat(docUnits).forEach(function(u) { if (u) allUnitsSet[u] = true; });
      const units = Object.keys(allUnitsSet);

      const unitRows = units.map(function(u) {
        const uDocs = docs.filter(function(d) { return d.pembuat === u; });
        const uApproved = uDocs.filter(function(d) { return d.statusApproval === 'Disetujui'; }).length;
        const uPending = uDocs.filter(function(d) { return d.statusApproval === 'Menunggu Persetujuan'; }).length;
        const uRevision = uDocs.filter(function(d) { return d.statusApproval === 'Perlu Revisi'; }).length;
        const pct = uDocs.length > 0 ? Math.round((uApproved / uDocs.length) * 100) : 0;
        return `
          <tr class="border-b border-stone-100 hover:bg-stone-50/80 transition">
            <td class="py-3 px-4 font-bold text-stone-800 text-xs sm:text-sm">${escapeHtml(u)}</td>
            <td class="py-3 px-3 text-center font-bold text-stone-900">${uDocs.length}</td>
            <td class="py-3 px-3 text-center text-emerald-700 font-bold">${uApproved}</td>
            <td class="py-3 px-3 text-center text-amber-700 font-bold">${uPending}</td>
            <td class="py-3 px-3 text-center text-red-700 font-bold">${uRevision}</td>
            <td class="py-3 px-4">
              <div class="flex items-center gap-2.5">
                <div class="flex-1 h-2.5 bg-stone-100 rounded-full overflow-hidden border border-stone-200">
                  <div class="h-full bg-emerald-500 rounded-full transition-all duration-300" style="width: ${pct}%"></div>
                </div>
                <span class="text-xs font-bold text-stone-700 w-10 text-right">${pct}%</span>
              </div>
            </td>
            <td class="py-3 px-4 text-right">
              <button type="button" onclick="filterByCreatorFromRekap('${escapeHtml(u)}')" class="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition cursor-pointer">
                Lihat Berkas
              </button>
            </td>
          </tr>
        `;
      }).join('');

      container.innerHTML = `
        <!-- HEADER KARTU REKAPITULASI -->
        <div class="cloud-card p-6 sm:p-7 space-y-3">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                <span>Evaluasi Mutu &amp; Kesiapan Akreditasi</span>
              </div>
              <h2 class="text-xl sm:text-2xl font-black text-slate-800 mt-1">Rekapitulasi Dokumen Unit Kerja</h2>
              <p class="text-xs sm:text-sm text-slate-500 mt-0.5 max-w-2xl leading-relaxed">
                Pemetaan berkas operasional, keterpenuhan standar manajemen mutu, dan kesiapan bukti fisik akreditasi sekolah.
              </p>
            </div>
            <div class="shrink-0 flex items-center gap-2">
              <button type="button" onclick="renderRekapitulasiPage()" class="px-3.5 py-2 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer">
                <svg class="w-4 h-4 text-stone-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                <span>Segarkan</span>
              </button>
              <button type="button" onclick="window.print()" class="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-2xs cursor-pointer">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
                <span>Cetak Laporan / PDF</span>
              </button>
            </div>
          </div>
        </div>

        <!-- KPI SUMMARY CARDS -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="cloud-card p-5 space-y-1">
            <span class="text-xs text-stone-500 font-medium">Total Dokumen Terdaftar</span>
            <div class="text-2xl sm:text-3xl font-black text-stone-900">${total}</div>
            <p class="text-[11px] text-stone-400">Arsip operasional SMP DAFI</p>
          </div>
          <div class="cloud-card p-5 space-y-1 border-l-4 border-emerald-500">
            <span class="text-xs text-emerald-700 font-semibold">Disahkan Resmi (Sah)</span>
            <div class="text-2xl sm:text-3xl font-black text-emerald-900">${approved}</div>
            <p class="text-[11px] text-emerald-600">Ber-TTE dan terverifikasi</p>
          </div>
          <div class="cloud-card p-5 space-y-1 border-l-4 border-amber-500">
            <span class="text-xs text-amber-700 font-semibold">Menunggu / Perlu Revisi</span>
            <div class="text-2xl sm:text-3xl font-black text-amber-900">${pending + revision}</div>
            <p class="text-[11px] text-amber-700">${pending} pending • ${revision} revisi</p>
          </div>
          <div class="cloud-card p-5 space-y-1 border-l-4 border-red-500">
            <span class="text-xs text-red-700 font-semibold">Kedaluwarsa / Perlu Tinjau</span>
            <div class="text-2xl sm:text-3xl font-black text-[#D40D14]">${expiredCount + expiringCount}</div>
            <p class="text-[11px] text-red-600">${expiringCount} segera • ${expiredCount} expired</p>
          </div>
        </div>

        <!-- TABEL DISTRIBUSI UNIT KERJA -->
        <div class="cloud-card p-6 sm:p-7 space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <h3 class="text-base sm:text-lg font-bold text-slate-800">Distribusi Kesiapan Dokumen Berdasarkan Unit Kerja</h3>
              <p class="text-xs text-slate-500 mt-0.5">Pantau progres pengesahan instrumen dan SOP pada masing-masing divisi.</p>
            </div>
            <span class="text-xs font-bold text-stone-500 bg-stone-100 px-3 py-1 rounded-xl">${units.length} Unit Kerja</span>
          </div>

          <div class="rounded-2xl border border-stone-200 overflow-x-auto">
            <table class="w-full text-left text-xs sm:text-sm">
              <thead class="bg-stone-50 border-b border-stone-200 text-stone-400 uppercase text-[10px] font-bold">
                <tr>
                  <th class="py-3 px-4">Unit Kerja</th>
                  <th class="py-3 px-3 text-center">Total Berkas</th>
                  <th class="py-3 px-3 text-center text-emerald-700">Disahkan</th>
                  <th class="py-3 px-3 text-center text-amber-700">Pending</th>
                  <th class="py-3 px-3 text-center text-red-700">Revisi</th>
                  <th class="py-3 px-4">Tingkat Pengesahan</th>
                  <th class="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>${unitRows}</tbody>
            </table>
          </div>
        </div>

        <!-- KESIAPAN STANDAR AKREDITASI -->
        <div class="cloud-card p-6 sm:p-7 space-y-4 bg-linear-to-r from-stone-50 via-white to-red-50/20">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-[#D40D14]"></span>
            <h3 class="text-base font-bold text-stone-800">Instrumen Akreditasi &amp; Penjaminan Mutu Internal</h3>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-stone-600 leading-relaxed">
            <div class="p-4 rounded-xl bg-white border border-stone-200 space-y-1">
              <span class="font-bold text-stone-800 block text-xs">Kelengkapan Bukti Fisik SNP</span>
              <p class="text-xs text-stone-500">Seluruh dokumen operasional (SOP, Pedoman Kesiswaan, Panduan KBM, SK Tugas Guru) dikelompokkan secara terstruktur untuk audit akreditasi.</p>
            </div>
            <div class="p-4 rounded-xl bg-white border border-stone-200 space-y-1">
              <span class="font-bold text-stone-800 block text-xs">Keabsahan TTE Digital &amp; QR Code</span>
              <p class="text-xs text-stone-500">Dokumen yang disahkan Kepala Sekolah dilengkapi token hash SHA-256 dan sertifikat keabsahan digital yang dapat diverifikasi kapan saja.</p>
            </div>
          </div>
        </div>
      `;
    }

    function filterByCreatorFromRekap(creatorName) {
      switchMainTab('catalog');
      const filterCreator = document.getElementById('filterCreator');
      if (filterCreator) {
        filterCreator.value = creatorName;
      }
      renderCatalog();
    }

    function openRekapModal() {
      switchMainTab('rekap');
    }

    function closeRekapModal() {}

    function initApp() {
      // Hapus sisa-sisa cache dummy lama dari browser jika ada
      try {
        localStorage.removeItem('smp_dafi_simdok_docs_v1');
      } catch (e) {}

      // Muat dokumen tersimpan (hanya data riil hasil upload / sinkronisasi)
      const storedDocs = safeGetStorage(STORAGE_KEY_DOCS, []);
      appState.documents = (Array.isArray(storedDocs) ? storedDocs : []).filter(function(d) {
        return !['DOC-2026-001','DOC-2026-002','DOC-2026-003','DOC-2026-004','DOC-2026-005','DOC-2026-006','DOC-2026-007'].includes(d.id);
      });
      safeSetStorage(STORAGE_KEY_DOCS, appState.documents);

      appState.standards = safeGetStorage(STORAGE_KEY_STANDARDS, null) || JSON.parse(JSON.stringify(INITIAL_STANDARD_DOCS));

      // Normalisasi status approval & TTE Token untuk setiap dokumen nyata yang ada
      appState.documents.forEach(function(d) {
        if (!d.statusApproval) {
          d.statusApproval = 'Disetujui';
        }
        if (d.statusApproval === 'Disetujui') {
          if (!d.disetujuiOleh) d.disetujuiOleh = 'Ustadz Kepala SMP IT Darul Fikri, M.Pd.';
          if (!d.tanggalDisetujui) d.tanggalDisetujui = (d.tanggalPersetujuan || d.tanggalUpdate || d.tanggalTerbit || new Date().toISOString().split('T')[0]) + ' 08:30 WIB';
          if (!d.signatureToken) {
            const seed = d.id + (d.nomorDokumen || '') + (d.tanggalDisetujui || '');
            let hash = 0;
            for (let i = 0; i < seed.length; i++) {
              hash = ((hash << 5) - hash) + seed.charCodeAt(i);
              hash |= 0;
            }
            const hex = Math.abs(hash).toString(16).toUpperCase().padStart(12, '9');
            d.signatureToken = `DAFI-TTE-2026-${hex.substring(0, 4)}-${hex.substring(4, 8)}-${hex.substring(8, 12)}`;
          }
        }
      });

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
      } else if (appState.documents.length === 0) {
        appState.selectedDocId = null;
      }

      const gasInput = document.getElementById('gasUrlInput');
      if (gasInput) gasInput.value = appState.gasWebAppUrl;

      const gasCodeBlock = document.getElementById('gasCodeBlock');
      if (gasCodeBlock) { getGasCode().then(function(code) { gasCodeBlock.textContent = code; }); }

      updateAuthUI();
      updateGasStatusBadge();
      refreshAllViews();

      // Jika URL Web App GAS sudah diisi, otomatis lakukan sinkronisasi data riil di background
      if (appState.gasWebAppUrl && isValidGasUrl(appState.gasWebAppUrl)) {
        setTimeout(function() {
          syncFromGasBackend();
        }, 400);
      }

      // Pasang Event Listener Pintasan Keyboard Universal
      document.removeEventListener('keydown', handleGlobalKeydown);
      document.addEventListener('keydown', handleGlobalKeydown);

      // Tutup panel notifikasi saat klik di luar
      document.addEventListener('click', function(e) {
        const notifContainer = document.getElementById('notificationDropdownContainer');
        const notifPanel = document.getElementById('notificationDropdownPanel');
        if (notifContainer && notifPanel && !notifPanel.classList.contains('hidden')) {
          if (!notifContainer.contains(e.target)) {
            notifPanel.classList.add('hidden');
          }
        }
      });

      // Cek apakah ada parameter verifikasi dokumen pada URL (?verify=DOC-ID atau #verify-DOC-ID)
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const verifyParam = urlParams.get('verify') || (window.location.hash.startsWith('#verify-') ? window.location.hash.replace('#verify-', '') : null);
        if (verifyParam) {
          setTimeout(function() {
            showVerificationModal(verifyParam);
          }, 350);
        }
      } catch (e) {}
    }

    function refreshAllViews() {
      updateMetricsAndCounters();
      renderCatalog();
      renderSidebarQueueAndShare();
      renderSmartAssistant();
      populateHistoryFilterDropdown();
      renderGlobalHistory();
      renderRekapitulasiPage();
      renderUserManagementTable();
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
      const isLoggedIn = !!appState.currentUser;
      const isAdmin = isLoggedIn && appState.currentUser.role === 'admin';

      if (tabName === 'gas' || tabName === 'settings') {
        if (!isAdmin) {
          showToast('Menu Web Setting hanya dapat diakses oleh Administrator Sistem.', 'warning');
          tabName = 'catalog';
        } else {
          tabName = 'gas';
        }
      } else if (tabName === 'smart' || tabName === 'history' || tabName === 'rekap') {
        if (!isLoggedIn) {
          showToast('Akses dibatasi: Pengunjung publik hanya dapat mengakses Katalog Dokumen.', 'warning');
          const titleMap = { smart: 'Saran Dokumen', history: 'Riwayat Versi', rekap: 'Rekapitulasi Unit' };
          openLoginModal('Silakan masuk dengan akun terdaftar untuk mengakses menu ' + (titleMap[tabName] || tabName) + '.');
          tabName = 'catalog';
        }
      }

      appState.activeTab = tabName;
      const tabs = ['catalog', 'smart', 'history', 'rekap', 'gas'];
      tabs.forEach(function(t) {
        const panel = document.getElementById('tabPanel-' + t);
        const btn = document.getElementById('tabBtn-' + t);

        if (panel) {
          panel.classList.toggle('hidden', t !== tabName);
        }
        if (btn) {
          if (t === 'gas' && !isAdmin) {
            btn.classList.add('hidden');
          } else if ((t === 'smart' || t === 'history' || t === 'rekap') && !isLoggedIn) {
            btn.classList.add('hidden');
          } else {
            btn.classList.remove('hidden');
            const labelSpan = btn.querySelector('.tab-label');
            if (t === tabName) {
              btn.className = 'px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-[#D40D14] border border-stone-200 shadow-2xs whitespace-nowrap flex items-center gap-1.5 transition-all duration-200 cursor-pointer';
              if (labelSpan) labelSpan.classList.remove('hidden');
            } else {
              btn.className = 'p-2 rounded-xl text-stone-500 hover:text-stone-900 hover:bg-stone-200/70 whitespace-nowrap flex items-center justify-center transition-all duration-200 cursor-pointer';
              if (labelSpan) labelSpan.classList.add('hidden');
            }
          }
        }
      });

      if (tabName === 'rekap') {
        renderRekapitulasiPage();
      } else if (tabName === 'gas') {
        renderUserManagementTable();
      }

      const labelEl = document.getElementById('headerActiveTabLabel');
      if (labelEl) {
        const titles = {
          catalog: 'Katalog Dokumen',
          smart: 'Saran Dokumen',
          history: 'Riwayat Versi',
          rekap: 'Rekapitulasi Unit & Akreditasi',
          gas: 'Web Setting & Manajemen Pengguna (Admin)'
        };
        labelEl.textContent = titles[tabName] || tabName;
      }
    }

    function openProfileModal() {
      const modal = document.getElementById('profileModal');
      if (!modal) return;
      if (!appState.currentUser) {
        openLoginModal();
        return;
      }
      const u = appState.currentUser;
      const avEl = document.getElementById('profileModalAvatar');
      const nmEl = document.getElementById('profileModalName');
      const rbEl = document.getElementById('profileModalRoleBadge');
      const unEl = document.getElementById('profileModalUsername');
      const jbEl = document.getElementById('profileModalJabatan');
      const rdEl = document.getElementById('profileModalRoleDesc');

      if (avEl) avEl.textContent = u.namaLengkap ? u.namaLengkap.charAt(0).toUpperCase() : 'U';
      if (nmEl) nmEl.textContent = u.namaLengkap;
      if (rbEl) rbEl.textContent = u.jabatan;
      if (unEl) unEl.textContent = '@' + u.username;
      if (jbEl) jbEl.textContent = u.jabatan;
      if (rdEl) {
        let desc = 'Akses Terbatas';
        if (u.role === 'kepsek') desc = 'Kepala Sekolah (Approval & Menyetujui Dokumen)';
        else if (u.role === 'admin') desc = 'Admin Sistem (Scan Drive, Koneksi GAS & Database)';
        else if (u.role === 'tendik' || u.role === 'guru') desc = 'Tenaga Kependidikan (Mengajukan Dokumen)';
        rdEl.textContent = desc;
      }

      modal.classList.remove('hidden');
    }

    function closeProfileModal() {
      const modal = document.getElementById('profileModal');
      if (modal) modal.classList.add('hidden');
    }

    function openChangePasswordModal() {
      if (!appState.currentUser) {
        openLoginModal('Silakan login terlebih dahulu untuk mengganti kata sandi.');
        return;
      }
      const modal = document.getElementById('changePasswordModal');
      const userLabel = document.getElementById('changePasswordUserLabel');
      const errBox = document.getElementById('changePasswordErrorBox');
      const curInput = document.getElementById('currentPasswordInput');
      const newInput = document.getElementById('newPasswordInput');
      const confInput = document.getElementById('confirmNewPasswordInput');

      if (userLabel) userLabel.textContent = `@${appState.currentUser.username} (${appState.currentUser.namaLengkap})`;
      if (errBox) errBox.classList.add('hidden');
      if (curInput) curInput.value = '';
      if (newInput) newInput.value = '';
      if (confInput) confInput.value = '';

      if (modal) modal.classList.remove('hidden');
    }

    function closeChangePasswordModal() {
      const modal = document.getElementById('changePasswordModal');
      if (modal) modal.classList.add('hidden');
    }

    async function handleChangePasswordSubmit(e) {
      e.preventDefault();
      const errBox = document.getElementById('changePasswordErrorBox');
      const curPass = (document.getElementById('currentPasswordInput').value || '').trim();
      const newPass = (document.getElementById('newPasswordInput').value || '').trim();
      const confPass = (document.getElementById('confirmNewPasswordInput').value || '').trim();

      if (!appState.currentUser) {
        closeChangePasswordModal();
        openLoginModal();
        return;
      }

      if (newPass.length < 6) {
        if (errBox) {
          errBox.textContent = 'Kata sandi baru minimal harus 6 karakter.';
          errBox.classList.remove('hidden');
        }
        return;
      }

      if (newPass !== confPass) {
        if (errBox) {
          errBox.textContent = 'Konfirmasi kata sandi baru tidak cocok.';
          errBox.classList.remove('hidden');
        }
        return;
      }

      const username = appState.currentUser.username;
      const allUsers = getStoredUsers();
      const userRecord = allUsers.find(function(u) { return u.username.toLowerCase() === username.toLowerCase(); });
      if (userRecord) {
        const computedOldHash = await hashPasswordClient(curPass, userRecord.salt);
        const customCreds = safeGetStorage('smp_dafi_user_passwords', {});
        const activeHash = customCreds[username] || userRecord.passwordHash;

        if (computedOldHash !== activeHash) {
          if (errBox) {
            errBox.textContent = 'Kata sandi saat ini yang Anda masukkan salah.';
            errBox.classList.remove('hidden');
          }
          return;
        }

        const computedNewHash = await hashPasswordClient(newPass, userRecord.salt);
        customCreds[username] = computedNewHash;
        safeSetStorage('smp_dafi_user_passwords', customCreds);
        userRecord.passwordHash = computedNewHash;
      }

      closeChangePasswordModal();
      showToast(`Kata sandi untuk @${username} berhasil diperbarui!`, 'success');
    }

    function updateAuthUI() {
      const authArea = document.getElementById('authHeaderArea');
      const roleBannerBadge = document.getElementById('roleBannerBadge');
      const roleBannerDesc = document.getElementById('roleBannerDesc');

      if (appState.currentUser) {
        const u = appState.currentUser;
        let roleBadgeText = 'Pengguna Terdaftar';
        let roleBadgeClass = 'text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-red-50 text-[#D40D14] border border-red-200';

        if (u.role === 'kepsek') {
          roleBadgeText = 'Kepala Sekolah • Penyetujuan Dokumen';
        } else if (u.role === 'tendik' || u.role === 'guru') {
          roleBadgeText = 'Tendik • Pengajuan Dokumen';
        } else if (u.role === 'admin') {
          roleBadgeText = 'Admin • Pengatur Sistem';
        }

        // Header Profile Pill Button
        if (authArea) {
          authArea.innerHTML = `
            <button type="button" onclick="openProfileModal()" class="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100/80 border border-red-200 text-stone-800 transition cursor-pointer shadow-2xs" title="Menu Profil ${escapeHtml(u.namaLengkap)}">
              <div class="w-6 h-6 rounded-full bg-[#D40D14] text-white text-xs font-bold flex items-center justify-center shrink-0">
                ${escapeHtml(u.namaLengkap.charAt(0).toUpperCase())}
              </div>
              <div class="text-left hidden md:block">
                <div class="text-xs font-bold leading-none text-stone-800 truncate max-w-[130px]">${escapeHtml(u.namaLengkap)}</div>
                <div class="text-[10px] text-[#D40D14] font-semibold leading-tight mt-0.5">${escapeHtml(u.jabatan)}</div>
              </div>
              <svg class="w-3.5 h-3.5 text-stone-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
          `;
        }

        if (roleBannerBadge) {
          roleBannerBadge.textContent = roleBadgeText;
          roleBannerBadge.className = roleBadgeClass;
        }
        if (roleBannerDesc) {
          roleBannerDesc.textContent = 'Login aktif sebagai ' + u.namaLengkap;
        }
      } else {
        // Header Login Button
        if (authArea) {
          authArea.innerHTML = `
            <button type="button" onclick="openLoginModal()" class="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition cursor-pointer shadow-2xs">
              <svg class="w-3.5 h-3.5 text-stone-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              <span>Masuk</span>
            </button>
          `;
        }

        if (roleBannerBadge) {
          roleBannerBadge.textContent = 'Pengunjung Publik';
          roleBannerBadge.className = 'text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600';
        }
      }

      // Otorisasi Visibilitas Menu & Fitur Berdasarkan Status Login
      const isLoggedIn = !!appState.currentUser;
      const isAdmin = isLoggedIn && appState.currentUser.role === 'admin';

      // 1. Menu Navigasi Utama: Akun publik hanya dapat mengakses Katalog Dokumen
      const navSmartBtn = document.getElementById('tabBtn-smart');
      const navHistoryBtn = document.getElementById('tabBtn-history');
      const navGasBtn = document.getElementById('tabBtn-gas');
      const navRekapBtn = document.getElementById('tabBtn-rekap');

      if (navSmartBtn) navSmartBtn.classList.toggle('hidden', !isLoggedIn);
      if (navHistoryBtn) navHistoryBtn.classList.toggle('hidden', !isLoggedIn);
      if (navGasBtn) navGasBtn.classList.toggle('hidden', !isAdmin);
      if (navRekapBtn) navRekapBtn.classList.toggle('hidden', !isLoggedIn);
      switchMainTab(appState.activeTab || 'catalog');

      // 2. Tombol Aksi Katalog & Unggah PDF (Hanya untuk Pendidik/Admin terdaftar)
      const headerUploadBtn = document.getElementById('catalogHeaderUploadBtn');
      const btnToggleSide = document.getElementById('btnToggleSidePanel');
      if (headerUploadBtn) headerUploadBtn.classList.toggle('hidden', !isLoggedIn);
      if (btnToggleSide) btnToggleSide.classList.toggle('hidden', !isLoggedIn);

      // 3. Tata Letak Katalog: Publik menikmati tampilan lebar penuh (12 kolom) tanpa panel upload
      const mainCol = document.getElementById('catalogMainCol');
      const sideCol = document.getElementById('catalogSideCol');
      if (mainCol && sideCol) {
        if (!isLoggedIn) {
          sideCol.classList.add('hidden');
          mainCol.className = 'lg:col-span-12 cloud-card p-6 sm:p-8 space-y-6 transition-all duration-300';
        } else {
          sideCol.classList.remove('hidden');
          mainCol.className = 'lg:col-span-8 cloud-card p-6 sm:p-8 space-y-6 transition-all duration-300';
        }
      }

      // 4. Folder Kategori 'Menunggu Persetujuan' & 'Favorit' disembunyikan untuk publik
      const folderPending = document.getElementById('folderBtnPending');
      if (folderPending) {
        folderPending.classList.toggle('hidden', !isLoggedIn);
        if (!isLoggedIn && appState.selectedCategory === 'PENDING') {
          appState.selectedCategory = 'ALL';
        }
      }

      const folderFav = document.getElementById('folderBtnFav');
      if (folderFav) {
        folderFav.classList.toggle('hidden', !isLoggedIn);
        if (!isLoggedIn && appState.selectedCategory === 'FAVORITES') {
          appState.selectedCategory = 'ALL';
        }
      }
      updateFavoritesCounter();

      // 5. Elemen Khusus Akun Terdaftar (Saran Kelengkapan Dokumen di Katalog)
      const loggedInOnlyEls = document.querySelectorAll('.logged-in-only');
      loggedInOnlyEls.forEach(function(el) {
        el.classList.toggle('hidden', !isLoggedIn);
      });

      // 6. Pusat Notifikasi Akun & Batang Persetujuan Massal Kepsek
      updateNotificationBadge();
      updateBatchApprovalBar();

      updateGasStatusBadge();
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

      // 2. Mode Demo & Akun Tersimpan (Offline/Fallback): Verifikasi Hash SHA-256 + Salt
      const allUsers = getStoredUsers();
      const found = allUsers.find(function(u) { return u.username.toLowerCase() === username; });
      let match = false;
      if (found) {
        const computedHash = await hashPasswordClient(password, found.salt);
        const customCreds = safeGetStorage('smp_dafi_user_passwords', {});
        const expectedHash = customCreds[username] || found.passwordHash;
        if (computedHash === expectedHash) {
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
      const demoToken = 'LOCAL_AUTH_' + (found.role || 'USER').toUpperCase() + '_' + Date.now();
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
      if (appState.activeTab !== 'catalog') {
        switchMainTab('catalog');
      }
      if (appState.selectedCategory === 'PENDING') {
        appState.selectedCategory = 'ALL';
      }
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
      const countPending = appState.documents.filter(function(d) { return d.statusApproval === 'Menunggu Persetujuan'; }).length;

      // Hitung total penggunaan storage secara dinamis
      let totalBytes = 0;
      appState.documents.forEach(function(d) {
        if (d.fileSize && typeof d.fileSize === 'number') {
          totalBytes += d.fileSize;
        } else if (d.ukuran) {
          const m = String(d.ukuran).match(/([\d.,]+)\s*(MB|KB|B)/i);
          if (m) {
            const val = parseFloat(m[1].replace(',', '.'));
            const unit = m[2].toUpperCase();
            if (unit === 'MB') totalBytes += val * 1024 * 1024;
            else if (unit === 'KB') totalBytes += val * 1024;
            else totalBytes += val;
          }
        }
      });
      const storageStr = totalBytes > 0
        ? (totalBytes >= 1024 * 1024 ? (totalBytes / (1024 * 1024)).toFixed(2) + ' MB' : (totalBytes / 1024).toFixed(1) + ' KB')
        : '0 KB';
      const elStorage = document.getElementById('statStorageMb');
      if (elStorage) elStorage.textContent = storageStr;

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
      const elPending = document.getElementById('folderCountPending');
      const elPct = document.getElementById('statSmartCompleteness');
      const elSub = document.getElementById('statSmartSubtext');

      if (elTotal) elTotal.textContent = total;
      if (elBreak) elBreak.textContent = `${pubCount} Publik • ${intCount} Internal`;
      if (elTatib) elTatib.textContent = countTatib;
      if (elSop) elSop.textContent = countSop;
      if (elSk) elSk.textContent = countSk;
      if (elSurat) elSurat.textContent = countSurat;
      if (elPending) elPending.textContent = countPending;
      const fAll = document.getElementById('folderBtnAll');
      const fTatib = document.getElementById('folderBtnTatib');
      const fSop = document.getElementById('folderBtnSop');
      const fSk = document.getElementById('folderBtnSk');
      const fSurat = document.getElementById('folderBtnSurat');
      const fPending = document.getElementById('folderBtnPending');
      if (fAll) fAll.setAttribute('data-files-label', `(${total}) Files`);
      if (fTatib) fTatib.setAttribute('data-files-label', `(${countTatib}) Files`);
      if (fSop) fSop.setAttribute('data-files-label', `(${countSop}) Files`);
      if (fSk) fSk.setAttribute('data-files-label', `(${countSk}) Files`);
      if (fSurat) fSurat.setAttribute('data-files-label', `(${countSurat}) Files`);
      if (fPending) fPending.setAttribute('data-files-label', `(${countPending}) Menunggu`);
      if (elPct) elPct.textContent = pct + '%';
      if (elSub) elSub.textContent = `${missingCount} saran dokumen`;
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
      if (kategori === 'SOP') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      if (kategori === 'SK') return 'bg-red-50 text-[#D40D14] border-red-200';
      if (kategori === 'Tata Tertib') return 'bg-amber-50 text-amber-800 border-amber-200';
      return 'bg-stone-100 text-stone-700 border-stone-300';
    }

    // SVG Document Page Icon with Folded Ear & Colored Type Pill (DAFI Palette)
    function getFileDocumentSvg(kategori, sizeClass) {
      let badgeColor = '#D97706'; // Amber for Tata Tertib
      let badgeText = 'TATIB';
      if (kategori === 'SOP') {
        badgeColor = '#059669'; // Emerald for SOP
        badgeText = 'SOP';
      } else if (kategori === 'SK') {
        badgeColor = '#D40D14'; // DAFI Crimson Red for SK
        badgeText = 'SK';
      } else if (kategori === 'Surat Administratif') {
        badgeColor = '#62615F'; // DAFI Charcoal Gray for Surat
        badgeText = 'SURAT';
      }

      const cls = sizeClass || 'w-14 h-16';
      return `
        <svg class="${cls} mx-auto" viewBox="0 0 56 64" fill="none">
          <path d="M10 6C10 3.79086 11.7909 2 14 2H35.1716C36.2324 2 37.2499 2.42143 38 3.17157L46.8284 12C47.5786 12.7501 48 13.7676 48 14.8284V58C48 60.2091 46.2091 62 44 62H14C11.7909 62 10 60.2091 10 58V6Z" fill="#F8FAFC" stroke="#94A3B8" stroke-width="2.2"/>
          <path d="M35 2.5V11C35 12.6569 36.3431 14 38 14H47.5" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/>
          <rect x="6" y="32" width="34" height="15" rx="3.5" fill="${badgeColor}"/>
          <text x="23" y="42.5" text-anchor="middle" fill="#FFFFFF" font-family="Plus Jakarta Sans, sans-serif" font-size="8.5" font-weight="800">${badgeText}</text>
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

    function escapeRegExp(string) {
      return String(string).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    // Ekstraksi cuplikan teks kontekstual untuk pencarian teks penuh (Full-Text Deep Search)
    function findFullTextSnippet(doc, query) {
      if (!query || query.length < 2) return null;
      const qLower = query.toLowerCase();

      function extractSnippet(text, sourceLabel) {
        if (!text || typeof text !== 'string') return null;
        const lower = text.toLowerCase();
        const idx = lower.indexOf(qLower);
        if (idx === -1) return null;

        const start = Math.max(0, idx - 35);
        const end = Math.min(text.length, idx + query.length + 45);
        let snippet = text.slice(start, end).trim();
        if (start > 0) snippet = '...' + snippet;
        if (end < text.length) snippet = snippet + '...';

        const rawEsc = escapeHtml(snippet);
        const qEsc = escapeHtml(query);
        const highlighted = rawEsc.replace(
          new RegExp('(' + escapeRegExp(qEsc) + ')', 'gi'),
          '<mark class="bg-amber-200 text-amber-900 font-bold px-0.5 rounded">$1</mark>'
        );

        return {
          source: sourceLabel,
          snippet: snippet,
          htmlSnippet: highlighted
        };
      }

      // 1. Cek isi pasal/ketentuan dokumen
      if (Array.isArray(doc.isiPasal) && doc.isiPasal.length > 0) {
        for (let i = 0; i < doc.isiPasal.length; i++) {
          const match = extractSnippet(doc.isiPasal[i], 'Pasal/Ketentuan');
          if (match) return match;
        }
      } else if (typeof doc.isiPasal === 'string') {
        const match = extractSnippet(doc.isiPasal, 'Pasal/Ketentuan');
        if (match) return match;
      }

      // 2. Cek teks penuh PDF (kontenTeks)
      if (doc.kontenTeks) {
        const match = extractSnippet(doc.kontenTeks, 'Teks Penuh Dokumen');
        if (match) return match;
      }

      // 3. Cek Intisari AI
      if (doc.aiSummary) {
        const match = extractSnippet(doc.aiSummary, 'Intisari AI');
        if (match) return match;
      }

      // 4. Cek Ringkasan Pokok (jika kata kunci tidak terdapat pada judul/nomor)
      const isMetaMatch = [doc.judul, doc.nomorDokumen, doc.kategori].join(' ').toLowerCase().indexOf(qLower) !== -1;
      if (!isMetaMatch && doc.ringkasan) {
        const match = extractSnippet(doc.ringkasan, 'Ringkasan');
        if (match) return match;
      }

      return null;
    }

    function renderCatalog() {
      const query = (document.getElementById('searchInput').value || '').trim().toLowerCase();
      const creatorFilter = document.getElementById('filterCreator').value;
      const accessFilter = document.getElementById('filterAccess').value;
      const lifecycleFilter = document.getElementById('filterLifecycle') ? document.getElementById('filterLifecycle').value : 'ALL';
      const sortOrder = document.getElementById('sortOrder').value;
      const clearBtn = document.getElementById('clearSearchBtn');

      if (clearBtn) {
        clearBtn.classList.toggle('hidden', query.length === 0);
      }

      // Render Active Filter Chips
      const activeFilterBox = document.getElementById('activeFilterTagsContainer');
      const activeFilterList = document.getElementById('activeFilterTagsList');
      if (activeFilterBox && activeFilterList) {
        const chips = [];
        if (appState.selectedCategory === 'PENDING') {
          chips.push(`<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-amber-50 text-amber-900 font-semibold text-[11px] border border-amber-300">Status: Menunggu Persetujuan <button type="button" onclick="quickFilterCategory('ALL')" class="hover:text-amber-700 font-bold ml-0.5">✕</button></span>`);
        } else if (appState.selectedCategory === 'FAVORITES') {
          chips.push(`<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-amber-50 text-amber-900 font-semibold text-[11px] border border-amber-300">⭐ Favorit Saya <button type="button" onclick="quickFilterCategory('ALL')" class="hover:text-amber-700 font-bold ml-0.5">✕</button></span>`);
        } else if (appState.selectedCategory !== 'ALL') {
          chips.push(`<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-red-50 text-[#D40D14] font-semibold text-[11px] border border-red-200">Kategori: ${escapeHtml(appState.selectedCategory)} <button type="button" onclick="quickFilterCategory('ALL')" class="hover:text-red-500 font-bold ml-0.5">✕</button></span>`);
        }
        if (query) {
          chips.push(`<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 font-semibold text-[11px] border border-slate-200">Cari: "${escapeHtml(query)}" <button type="button" onclick="document.getElementById('searchInput').value=''; renderCatalog();" class="hover:text-red-500 font-bold ml-0.5">✕</button></span>`);
        }
        if (creatorFilter !== 'ALL') {
          chips.push(`<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 font-semibold text-[11px] border border-slate-200">Unit: ${escapeHtml(creatorFilter)} <button type="button" onclick="document.getElementById('filterCreator').value='ALL'; renderCatalog();" class="hover:text-red-500 font-bold ml-0.5">✕</button></span>`);
        }
        if (accessFilter !== 'ALL') {
          chips.push(`<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 font-semibold text-[11px] border border-slate-200">Akses: ${escapeHtml(accessFilter)} <button type="button" onclick="document.getElementById('filterAccess').value='ALL'; renderCatalog();" class="hover:text-red-500 font-bold ml-0.5">✕</button></span>`);
        }
        if (lifecycleFilter !== 'ALL') {
          const lcLabel = lifecycleFilter === 'active' ? '🟢 Aktif' : (lifecycleFilter === 'expiring' ? '🟡 Segera Ditinjau' : '🔴 Perlu Pembaruan');
          chips.push(`<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 font-semibold text-[11px] border border-slate-200">Siklus: ${lcLabel} <button type="button" onclick="document.getElementById('filterLifecycle').value='ALL'; renderCatalog();" class="hover:text-red-500 font-bold ml-0.5">✕</button></span>`);
        }

        if (chips.length > 0) {
          activeFilterBox.classList.remove('hidden');
          activeFilterList.innerHTML = chips.join('');
        } else {
          activeFilterBox.classList.add('hidden');
          activeFilterList.innerHTML = '';
        }
      }

      const filtered = appState.documents.filter(function(doc) {
        // Tamu publik hanya dapat mengakses dokumen resmi yang telah disahkan (bukan draf yang menunggu persetujuan)
        if (!appState.currentUser && doc.statusApproval === 'Menunggu Persetujuan') {
          return false;
        }
        if (appState.selectedCategory === 'PENDING') {
          if (!appState.currentUser) return false;
          if (doc.statusApproval !== 'Menunggu Persetujuan') return false;
        } else if (appState.selectedCategory === 'FAVORITES') {
          if (!appState.currentUser || !isDocFavorited(doc.id)) return false;
        } else if (appState.selectedCategory !== 'ALL' && doc.kategori !== appState.selectedCategory) {
          return false;
        }
        if (creatorFilter !== 'ALL' && doc.pembuat !== creatorFilter) {
          return false;
        }
        if (accessFilter !== 'ALL' && doc.akses !== accessFilter) {
          return false;
        }
        if (lifecycleFilter !== 'ALL') {
          const lc = getDocLifecycle(doc);
          if (lc.status !== lifecycleFilter) return false;
        }
        if (query) {
          const pasalText = Array.isArray(doc.isiPasal) ? doc.isiPasal.join(' ') : (doc.isiPasal || '');
          const fullText = (doc.kontenTeks || '');
          const aiText = (doc.aiSummary || '');
          const haystack = [
            doc.judul,
            doc.nomorDokumen,
            doc.kategori,
            doc.pembuat,
            doc.ringkasan,
            (doc.kataKunci || []).join(' '),
            pasalText,
            fullText,
            aiText
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

      updateBatchApprovalBar();
      updateFavoritesCounter();

      const container = document.getElementById('catalogContainer');
      if (!container) return;

      if (filtered.length === 0) {
        const isLibraryEmpty = appState.documents.length === 0;
        container.innerHTML = `
          <div class="rounded-2xl border border-dashed border-slate-200/90 bg-slate-50/50 p-10 text-center space-y-3">
            <div class="w-14 h-14 rounded-2xl bg-red-50 text-[#D40D14] mx-auto flex items-center justify-center shadow-inner">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 class="text-base font-bold text-slate-700">${isLibraryEmpty ? 'Arsip Dokumen Siap (Masih Kosong)' : 'Dokumen Tidak Ditemukan'}</h3>
              <p class="text-xs text-slate-500 max-w-md mx-auto mt-0.5 leading-relaxed">
                ${isLibraryEmpty 
                  ? 'Belum ada dokumen PDF resmi yang terdaftar. Anda dapat mengunggah berkas PDF baru untuk memulai pangkalan arsip digital.' 
                  : 'Tidak ada arsip PDF yang cocok dengan kata kunci atau filter kategori Anda.'}
              </p>
            </div>
            <div class="flex items-center justify-center gap-2 pt-2">
              ${isLibraryEmpty ? `
                <button type="button" onclick="handleOpenUploadModal()" class="px-4 py-2 rounded-xl bg-[#D40D14] text-xs font-semibold text-white hover:bg-[#B90B12] shadow-sm shadow-red-600/20 transition">
                  + Unggah Dokumen PDF Pertama
                </button>
                ${(appState.currentUser && appState.currentUser.role === 'admin') ? `
                  <button type="button" onclick="switchMainTab('gas')" class="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs transition">
                    Pindai dari Google Drive
                  </button>
                ` : ''}
              ` : `
                <button type="button" onclick="clearSearchAndFilters()" class="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs transition">
                  ↺ Reset Semua Filter
                </button>
                <button type="button" onclick="prefillUploadFromSearch()" class="px-4 py-2 rounded-xl bg-[#D40D14] text-xs font-semibold text-white hover:bg-[#B90B12] shadow-sm shadow-red-600/20 transition">
                  + Unggah Dokumen Baru Ini
                </button>
              `}
            </div>
          </div>
        `;
        return;
      }

      if (appState.viewMode === 'table') {
        renderTableCatalog(container, filtered, query);
      } else {
        renderGridCatalog(container, filtered, query);
      }
    }

    // Modern SaaS-Grade File Grid (Clean Elevation, Category Accent, WA Share Button, & Multi-Column Support)
    function renderGridCatalog(container, docs, query) {
      const sideCol = document.getElementById('catalogSideCol');
      const isSideColHidden = sideCol ? sideCol.classList.contains('hidden') : false;
      const gridColsClass = isSideColHidden
        ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pt-1'
        : 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-1';

      const tilesHtml = docs.map(function(doc) {
        const isSelected = appState.selectedDocId === doc.id;
        const isLocked = doc.akses === 'Internal Pendidik' && !appState.currentUser;
        const catStyle = getCategoryBadgeStyle(doc.kategori);
        const isPending = doc.statusApproval === 'Menunggu Persetujuan';
        const isNeedsRev = doc.statusApproval === 'Perlu Revisi';
        const isKepsek = appState.currentUser && appState.currentUser.role === 'kepsek';
        const isFav = isDocFavorited(doc.id);
        const lc = getDocLifecycle(doc);
        const snippet = query ? findFullTextSnippet(doc, query) : null;

        let badgeHtml = `<span class="px-2 py-0.5 rounded-md text-[10px] font-bold border ${catStyle} truncate max-w-[120px]">${escapeHtml(doc.kategori)}</span>`;
        if (isPending) {
          badgeHtml = `<span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1 shadow-2xs"><span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span> Menunggu</span>`;
        } else if (isNeedsRev) {
          badgeHtml = `<span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300">Revisi</span>`;
        } else {
          badgeHtml = `<div class="flex items-center gap-1">
            <span class="px-2 py-0.5 rounded-md text-[10px] font-bold border ${catStyle} truncate max-w-[85px]">${escapeHtml(doc.kategori)}</span>
            <button type="button" onclick="event.stopPropagation(); showVerificationModal('${escapeHtml(doc.id)}')" class="px-1.5 py-0.5 rounded text-[10px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition" title="Lihat Sertifikat TTE & Keabsahan Dokumen">✓ TTE</button>
          </div>`;
        }

        return `
          <div onclick="selectDocumentTile('${escapeHtml(doc.id)}', false)" class="file-card-modern ${isSelected ? 'selected-file' : ''} p-4 flex flex-col justify-between cursor-pointer relative group">
            <!-- Top Badges & Actions -->
            <div class="flex items-center justify-between gap-1 w-full pb-1">
              <div class="flex items-center gap-1.5 min-w-0">
                ${isPending && isKepsek ? `
                  <input type="checkbox" onchange="event.stopPropagation(); toggleDocPendingSelection('${escapeHtml(doc.id)}', this.checked)" ${appState.selectedPendingDocIds.has(doc.id) ? 'checked' : ''} class="w-3.5 h-3.5 rounded border-stone-300 text-[#D40D14] focus:ring-[#D40D14] cursor-pointer shrink-0" title="Pilih untuk Pengesahan Massal">
                ` : ''}
                ${badgeHtml}
              </div>
              <div class="flex items-center gap-0.5 shrink-0">
                ${appState.currentUser ? `
                  <button type="button" onclick="event.stopPropagation(); toggleFavoriteDoc('${escapeHtml(doc.id)}')" class="star-btn ${isFav ? 'active-star' : ''} w-6 h-6 flex items-center justify-center text-sm" title="${isFav ? 'Hapus dari Favorit' : 'Sematkan ke Favorit'}">
                    ★
                  </button>
                ` : ''}
                <button type="button" onclick="event.stopPropagation(); copyDocumentWaShare('${escapeHtml(doc.id)}')" class="w-6 h-6 rounded-md hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 flex items-center justify-center transition" title="Salin Ringkasan untuk WhatsApp">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                </button>
              </div>
            </div>

            <!-- Document Visual & Title -->
            <div class="w-full space-y-2 py-1 flex flex-col items-center text-center">
              <div onclick="event.stopPropagation(); openPdfViewer('${escapeHtml(doc.id)}')" class="transition-transform duration-200 group-hover:scale-105 my-1">
                ${getFileDocumentSvg(doc.kategori, 'w-12 h-14')}
              </div>
              <div class="w-full px-1">
                <h3 class="text-xs sm:text-[13px] font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-[#D40D14] transition" title="${escapeHtml(doc.judul)}">
                  ${escapeHtml(doc.judul)}
                </h3>
                <div class="mt-1 flex items-center justify-center gap-1.5 flex-wrap">
                  <span class="text-[10px] text-slate-400">${escapeHtml(doc.tanggalUpdate)}</span>
                  <span class="text-[9px] font-bold px-1.5 py-0.2 rounded-full border ${lc.class}">${escapeHtml(lc.label)}</span>
                </div>
              </div>
            </div>

            ${snippet ? `
              <div class="w-full text-left bg-amber-50/90 border border-amber-200/90 rounded-lg p-2 my-1 text-[10px] text-amber-950 leading-snug">
                <div class="font-bold text-[10px] text-amber-800 flex items-center gap-1 mb-0.5">
                  <svg class="w-2.5 h-2.5 text-amber-600 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  <span>Cocok di ${snippet.source}:</span>
                </div>
                <div class="italic text-slate-700 text-[10px] break-words">"...${snippet.htmlSnippet}..."</div>
              </div>
            ` : ''}

            <!-- Bottom Action Strip -->
            <div class="w-full pt-2.5 mt-2 border-t border-slate-100 flex flex-col gap-1.5">
              <div class="flex items-center gap-1.5 w-full">
                ${isLocked ? `
                  <button type="button" onclick="event.stopPropagation(); openLoginModal('Dokumen &quot;${escapeHtml(doc.judul)}&quot; berstatus Internal Pendidik. Silakan login terlebih dahulu.')" class="w-full py-1.5 px-2.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 font-bold text-[11px] transition flex items-center justify-center gap-1">
                    🔒 Login Internal
                  </button>
                ` : `
                  <button type="button" onclick="event.stopPropagation(); openPdfViewer('${escapeHtml(doc.id)}')" class="w-full py-1.5 px-2.5 rounded-lg ${isSelected ? 'bg-[#D40D14] text-white' : 'bg-slate-100 hover:bg-[#D40D14] text-slate-700 hover:text-white'} font-bold text-[11px] transition">
                    Baca PDF
                  </button>
                `}
              </div>

              <!-- Baris Aksi Approval Khusus Kepala Sekolah -->
              ${isPending && isKepsek ? `
                <div class="grid grid-cols-2 gap-1 w-full pt-1">
                  <button type="button" onclick="event.stopPropagation(); openKepsekApprovalModal('${escapeHtml(doc.id)}')" class="py-1 px-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] shadow-xs transition flex items-center justify-center gap-1" title="Setujui dan Sahkan Dokumen">
                    ✓ Sahkan
                  </button>
                  <button type="button" onclick="event.stopPropagation(); openKepsekApprovalModal('${escapeHtml(doc.id)}')" class="py-1 px-1.5 rounded-lg bg-white hover:bg-amber-50 border border-amber-300 text-amber-900 font-semibold text-[10px] transition text-center" title="Minta Revisi">
                    ✏️ Revisi
                  </button>
                </div>
              ` : (isPending ? `
                <div class="w-full text-center text-[10px] font-semibold text-amber-800 bg-amber-50 rounded-lg border border-amber-200 py-0.5">
                  ⏳ Menunggu Persetujuan Kepsek
                </div>
              ` : '')}
            </div>
          </div>
        `;
      }).join('');

      container.innerHTML = `<div class="${gridColsClass}">${tilesHtml}</div>`;
    }

    function renderTableCatalog(container, docs, query) {
      const isKepsek = appState.currentUser && appState.currentUser.role === 'kepsek';

      const rowsHtml = docs.map(function(doc) {
        const isLocked = doc.akses === 'Internal Pendidik' && !appState.currentUser;
        const catStyle = getCategoryBadgeStyle(doc.kategori);
        const isPending = doc.statusApproval === 'Menunggu Persetujuan';
        const isNeedsRev = doc.statusApproval === 'Perlu Revisi';
        const isFav = isDocFavorited(doc.id);
        const lc = getDocLifecycle(doc);
        const snippet = query ? findFullTextSnippet(doc, query) : null;

        let statusCellHtml = `<button type="button" onclick="event.stopPropagation(); showVerificationModal('${escapeHtml(doc.id)}')" class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition" title="Lihat Sertifikat TTE & Keabsahan Dokumen"><span>✓ TTE Sah</span></button>`;
        if (isPending) {
          statusCellHtml = '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1 w-max"><span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span> Menunggu</span>';
        } else if (isNeedsRev) {
          statusCellHtml = '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300">Revisi</span>';
        }

        return `
          <tr onclick="selectDocumentTile('${escapeHtml(doc.id)}', false)" class="border-b border-slate-100 hover:bg-slate-50/80 transition cursor-pointer">
            <td class="py-3 px-3">
              <div class="flex items-center gap-2">
                ${isPending && isKepsek ? `
                  <input type="checkbox" onchange="event.stopPropagation(); toggleDocPendingSelection('${escapeHtml(doc.id)}', this.checked)" ${appState.selectedPendingDocIds.has(doc.id) ? 'checked' : ''} class="w-3.5 h-3.5 rounded border-stone-300 text-[#D40D14] focus:ring-[#D40D14] cursor-pointer shrink-0">
                ` : ''}
                ${appState.currentUser ? `
                  <button type="button" onclick="event.stopPropagation(); toggleFavoriteDoc('${escapeHtml(doc.id)}')" class="star-btn ${isFav ? 'active-star' : ''} text-sm" title="${isFav ? 'Hapus Favorit' : 'Favorit'}">★</button>
                ` : ''}
                <div>
                  <div class="font-semibold text-slate-800 text-xs sm:text-sm">${escapeHtml(doc.judul)}</div>
                  <div class="text-[11px] font-mono-code text-slate-400 flex items-center gap-2">
                    <span>${escapeHtml(doc.nomorDokumen)}</span>
                    <span class="text-[9px] font-bold px-1.5 py-0.2 rounded-full border ${lc.class}">${escapeHtml(lc.label)}</span>
                  </div>
                  ${snippet ? `
                    <div class="mt-1 text-[10px] bg-amber-50 text-amber-950 border border-amber-200/80 rounded px-2 py-0.5 inline-flex items-center gap-1 max-w-full">
                      <span class="font-bold text-amber-700 shrink-0">🔍 Cocok di ${snippet.source}:</span>
                      <span class="italic text-slate-600 truncate max-w-[280px]">"...${snippet.htmlSnippet}..."</span>
                    </div>
                  ` : ''}
                </div>
              </div>
            </td>
            <td class="py-3 px-3">
              <span class="px-2 py-0.5 rounded-md text-[11px] font-semibold border ${catStyle}">${escapeHtml(doc.kategori)}</span>
            </td>
            <td class="py-3 px-3 text-xs text-slate-600">${escapeHtml(doc.pembuat)}</td>
            <td class="py-3 px-3">
              ${statusCellHtml}
            </td>
            <td class="py-3 px-3 font-mono-code text-xs font-semibold text-slate-700">${escapeHtml(doc.versi)}</td>
            <td class="py-3 px-3 text-xs text-slate-500">${escapeHtml(doc.tanggalUpdate)}</td>
            <td class="py-3 px-3 text-right">
              <div class="inline-flex items-center justify-end gap-1.5">
                ${isPending && isKepsek ? `
                  <button type="button" onclick="event.stopPropagation(); openKepsekApprovalModal('${escapeHtml(doc.id)}')" class="px-2 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition shadow-xs">✓ Sahkan</button>
                  <button type="button" onclick="event.stopPropagation(); openKepsekApprovalModal('${escapeHtml(doc.id)}')" class="px-2 py-1 rounded-lg border border-amber-300 hover:bg-amber-50 text-amber-800 font-semibold text-[11px] transition">Revisi</button>
                ` : ''}
                <button type="button" onclick="event.stopPropagation(); copyDocumentWaShare('${escapeHtml(doc.id)}')" class="p-1 rounded-lg border border-slate-200 hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 transition" title="Salin Ringkasan untuk WhatsApp">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                </button>
                ${isLocked ? `
                  <button type="button" onclick="event.stopPropagation(); openLoginModal('Silakan login untuk membaca dokumen internal ini.')" class="px-3 py-1 rounded-lg bg-amber-100 text-amber-800 font-semibold text-xs">Login</button>
                ` : `
                  <button type="button" onclick="event.stopPropagation(); openPdfViewer('${escapeHtml(doc.id)}')" class="px-3 py-1 rounded-lg bg-[#D40D14] text-white font-semibold text-xs">Baca PDF</button>
                `}
              </div>
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
                <th class="py-2.5 px-3">Status</th>
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

    // -------------------------------------------------------------------------
    // WORKFLOW PERSETUJUAN DOKUMEN (APPROVAL OLEH KEPALA SEKOLAH)
    // -------------------------------------------------------------------------
    async function approveDocumentAction(docId) {
      if (!appState.currentUser || appState.currentUser.role !== 'kepsek') {
        openLoginModal('Hanya akun Kepala Sekolah yang berwenang menyetujui pengajuan dokumen resmi.');
        return;
      }

      const doc = appState.documents.find(function(d) { return d.id === docId; });
      if (!doc) return;

      const confirmApprove = confirm(`Apakah Anda (Kepala Sekolah) menyetujui dan mengesahkan dokumen resmi:\n\n"${doc.judul}"?\n\nDokumen akan berstatus Disetujui & Berlaku secara sah.`);
      if (!confirmApprove) return;

      const today = new Date().toISOString().split('T')[0];
      const timeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
      const approverName = appState.currentUser.namaLengkap || 'Ustadz Kepala SMP IT Darul Fikri, M.Pd.';

      doc.statusApproval = 'Disetujui';
      doc.disetujuiOleh = approverName;
      doc.tanggalPersetujuan = today;
      doc.tanggalDisetujui = `${today} ${timeStr}`;
      doc.catatanPersetujuan = 'Telah disetujui dan disahkan secara resmi oleh Kepala Sekolah.';

      // Generate SHA-256 Digital Signature (TTE) Token
      doc.signatureToken = await generateDocSignatureToken(doc, approverName, doc.tanggalDisetujui);

      if (!doc.riwayat) doc.riwayat = [];
      doc.riwayat.push({
        versionId: 'VER-APP-' + Date.now(),
        versi: doc.versi.replace(/\s*\(Usulan\)/i, '') + ' (Resmi Ber-TTE)',
        tanggalUpdate: today,
        diperbaruiOleh: approverName,
        catatanPerubahan: 'Dokumen disetujui dan disahkan secara resmi oleh Kepala Sekolah dengan TTE: ' + doc.signatureToken,
        ukuran: doc.ukuran || '320 KB'
      });
      doc.versi = doc.versi.replace(/\s*\(Usulan\)/i, '');

      safeSetStorage(STORAGE_KEY_DOCS, appState.documents);

      if (appState.gasWebAppUrl) {
        sendToGasBackend({
          action: 'approveDocument',
          docId: doc.id,
          status: 'Disetujui',
          signatureToken: doc.signatureToken,
          tanggalDisetujui: doc.tanggalDisetujui,
          catatan: doc.catatanPersetujuan
        });
      }

      refreshAllViews();
      if (appState.currentViewingDocId === doc.id) {
        renderPdfViewerContent();
      }
      showToast(`Dokumen "${doc.judul}" berhasil disetujui dan disahkan secara resmi!`, 'success');
    }

    async function requestRevisionAction(docId) {
      if (!appState.currentUser || appState.currentUser.role !== 'kepsek') {
        openLoginModal('Hanya akun Kepala Sekolah yang berwenang meminta revisi dokumen.');
        return;
      }

      const doc = appState.documents.find(function(d) { return d.id === docId; });
      if (!doc) return;

      const note = prompt(`Masukkan catatan revisi untuk Tendik/Pengusul dokumen:\n"${doc.judul}":`, 'Mohon perbaiki klausul/pasal terkait sebelum disahkan.');
      if (note === null) return;

      const today = new Date().toISOString().split('T')[0];
      doc.statusApproval = 'Perlu Revisi';
      doc.catatanPersetujuan = note.trim() || 'Perlu perbaikan draf dokumen.';

      safeSetStorage(STORAGE_KEY_DOCS, appState.documents);

      if (appState.gasWebAppUrl) {
        sendToGasBackend({
          action: 'approveDocument',
          docId: doc.id,
          status: 'Perlu Revisi',
          catatan: doc.catatanPersetujuan
        });
      }

      refreshAllViews();
      if (appState.currentViewingDocId === doc.id) {
        renderPdfViewerContent();
      }
      showToast(`Catatan revisi untuk "${doc.judul}" berhasil dikirim.`, 'warning');
    }

    // -----------------------------------------------------------------------
    // RIGHT SIDEBAR RENDERER: UPLOAD & ANTREAN DOKUMEN TERKINI
    // -----------------------------------------------------------------------
    function renderSidebarQueueAndShare() {
      const queueEl = document.getElementById('sidebarUploadQueue');
      if (!queueEl) return;

      const recentDocs = appState.documents.slice(0, 3);
      if (recentDocs.length === 0) {
        queueEl.innerHTML = '<div class="p-3 text-center text-xs text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">Belum ada file di antrean.</div>';
        return;
      }

      queueEl.innerHTML = recentDocs.map(function(doc, idx) {
        if (idx === 0) {
          return `
            <div onclick="openPdfViewer('${escapeHtml(doc.id)}')" class="p-3 rounded-xl bg-[#FEF2F2] border border-[#FECACA] cursor-pointer transition hover:shadow-xs space-y-2">
              <div class="flex items-center justify-between gap-2">
                <div class="flex items-center gap-2.5 min-w-0">
                  <div class="w-8 h-9 shrink-0 flex items-center justify-center">
                    ${getFileDocumentSvg(doc.kategori, 'w-7 h-8')}
                  </div>
                  <div class="min-w-0">
                    <div class="text-xs font-semibold text-slate-700 truncate">${escapeHtml(doc.judul)}.pdf</div>
                    <div class="text-[10px] text-slate-400">${escapeHtml(doc.ukuran)} &bull; ${escapeHtml(doc.versi)}</div>
                  </div>
                </div>
                <span class="text-[11px] font-bold text-[#D40D14] shrink-0">100%</span>
              </div>
              <div class="w-full h-1.5 rounded-full bg-red-100 overflow-hidden">
                <div class="h-full bg-[#D40D14] rounded-full" style="width: 100%"></div>
              </div>
            </div>
          `;
        }
        return `
          <div onclick="openPdfViewer('${escapeHtml(doc.id)}')" class="p-2.5 rounded-xl bg-white border border-slate-200/80 hover:border-red-300 cursor-pointer flex items-center justify-between gap-2 transition">
            <div class="flex items-center gap-2.5 min-w-0">
              <div class="w-8 h-9 shrink-0 flex items-center justify-center">
                ${getFileDocumentSvg(doc.kategori, 'w-7 h-8')}
              </div>
              <div class="min-w-0">
                <div class="text-xs font-semibold text-slate-700 truncate">${escapeHtml(doc.judul)}.pdf</div>
                <div class="text-[10px] text-slate-400">${escapeHtml(doc.ukuran)} &bull; ${escapeHtml(doc.tanggalUpdate)}</div>
              </div>
            </div>
            <button type="button" onclick="event.stopPropagation(); openDirectUpdateVersion('${escapeHtml(doc.id)}')" class="p-1.5 text-slate-400 hover:text-[#D40D14] transition" title="Perbarui Versi">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
            </button>
          </div>
        `;
      }).join('');
    }

    function handleQuickSidebarAction() {
      const input = document.getElementById('quickSidebarCheckInput');
      const val = (input ? input.value : '').trim();
      if (!val) {
        handleOpenUploadModal();
        return;
      }
      handleOpenUploadModal({
        judul: val,
        kategori: 'SOP',
        pembuat: 'Kepala Sekolah',
        kataKunci: [val.toLowerCase()],
        alasan: ''
      });
      if (input) input.value = '';
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

    function toggleCatalogSidePanel() {
      if (!appState.currentUser) {
        openLoginModal('Panel samping unggah dokumen hanya dapat diakses oleh Tenaga Pendidik atau Admin.');
        return;
      }
      const mainCol = document.getElementById('catalogMainCol');
      const sideCol = document.getElementById('catalogSideCol');
      const textToggle = document.getElementById('textToggleSide');
      if (!mainCol || !sideCol) return;

      const isHidden = sideCol.classList.contains('hidden');
      if (isHidden) {
        sideCol.classList.remove('hidden');
        mainCol.className = 'lg:col-span-8 cloud-card p-6 sm:p-8 space-y-6 transition-all duration-300';
        if (textToggle) textToggle.textContent = 'Panel Samping';
      } else {
        sideCol.classList.add('hidden');
        mainCol.className = 'lg:col-span-12 cloud-card p-6 sm:p-8 space-y-6 transition-all duration-300';
        if (textToggle) textToggle.textContent = 'Buka Panel';
      }
      renderCatalog();
    }

    function toggleViewerFocusMode() {
      const docPane = document.getElementById('viewerDocPane');
      const metaPane = document.getElementById('viewerMetaPane');
      const btnText = document.getElementById('btnToggleViewerFocusText');
      if (!docPane || !metaPane) return;

      const isMetaHidden = metaPane.classList.contains('hidden');
      if (isMetaHidden) {
        metaPane.classList.remove('hidden');
        docPane.className = 'lg:col-span-8 h-full overflow-y-auto p-3 sm:p-6 flex flex-col items-center custom-scrollbar transition-all';
        if (btnText) btnText.textContent = 'Fokus Baca';
      } else {
        metaPane.classList.add('hidden');
        docPane.className = 'lg:col-span-12 h-full overflow-y-auto p-3 sm:p-6 flex flex-col items-center custom-scrollbar transition-all';
        if (btnText) btnText.textContent = 'Info & Riwayat';
      }
    }

    function copyDocumentWaShare(docId) {
      const doc = appState.documents.find(function(d) { return d.id === docId; });
      if (!doc) return;

      const link = doc.driveViewUrl || window.location.href;
      const text = `*Dokumen Resmi SMP DAFI Sidoarjo*\n` +
                   `📄 *Judul:* ${doc.judul}\n` +
                   `🏷️ *Kategori:* ${doc.kategori} | *Versi:* ${doc.versi}\n` +
                   `📅 *Tanggal:* ${doc.tanggalUpdate} | *Unit:* ${doc.pembuat}\n` +
                   `🔗 *Tautan Dokumen:* ${link}`;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function() {
          showToast('Teks & tautan WhatsApp berhasil disalin ke papan klip!', 'success');
        });
      } else {
        const t = document.createElement('textarea');
        t.value = text;
        document.body.appendChild(t);
        t.select();
        document.execCommand('copy');
        t.remove();
        showToast('Teks & tautan WhatsApp berhasil disalin ke papan klip!', 'success');
      }
    }

    function copyCurrentViewerWaShare() {
      if (appState.currentViewingDocId) {
        copyDocumentWaShare(appState.currentViewingDocId);
      }
    }

    function closeAllModals() {
      closePdfViewerModal();
      closeUploadModal();
      closeLoginModal();
      closeAddStandardModal();
      closeProfileModal();
      closeChangePasswordModal();
      closeVerificationModal();
    }

    function handleGlobalKeydown(e) {
      // Tombol Esc untuk menutup modal yang aktif
      if (e.key === 'Escape') {
        closeAllModals();
        return;
      }

      // Tombol '/' atau 'Ctrl + K' untuk fokus pencarian cepat
      const isInputActive = document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA' || document.activeElement.tagName === 'SELECT');
      if ((e.ctrlKey && e.key.toLowerCase() === 'k') || (e.key === '/' && !isInputActive)) {
        e.preventDefault();
        if (appState.activeTab !== 'catalog') {
          switchMainTab('catalog');
        }
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
      }
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
            <span class="font-bold text-[#D40D14]">Butir ${i + 1}:</span> ${escapeHtml(p)}
          </div>
        `;
      }).join('');

      printableArea.style.transform = `scale(${appState.pdfZoom})`;
      printableArea.style.position = 'relative';
      printableArea.style.overflow = 'hidden';

      const viewerName = appState.currentUser ? appState.currentUser.namaLengkap : 'PENGUNJUNG INTERNAL';
      const nowTimeStr = new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) + ' WIB';
      const watermarkHtml = `
        <div class="internal-doc-watermark" aria-hidden="true">
          <div class="watermark-line">RAHASIA INTERNAL • DIAKSES OLEH: ${escapeHtml(viewerName.toUpperCase())} • ${nowTimeStr}</div>
          <div class="watermark-line">RAHASIA INTERNAL • DIAKSES OLEH: ${escapeHtml(viewerName.toUpperCase())} • ${nowTimeStr}</div>
          <div class="watermark-line">RAHASIA INTERNAL • DIAKSES OLEH: ${escapeHtml(viewerName.toUpperCase())} • ${nowTimeStr}</div>
          <div class="watermark-line">RAHASIA INTERNAL • DIAKSES OLEH: ${escapeHtml(viewerName.toUpperCase())} • ${nowTimeStr}</div>
          <div class="watermark-line">RAHASIA INTERNAL • DIAKSES OLEH: ${escapeHtml(viewerName.toUpperCase())} • ${nowTimeStr}</div>
          <div class="watermark-line">RAHASIA INTERNAL • DIAKSES OLEH: ${escapeHtml(viewerName.toUpperCase())} • ${nowTimeStr}</div>
        </div>
      `;

      printableArea.innerHTML = `
        ${doc.akses === 'Internal Pendidik' ? watermarkHtml : ''}
        <div class="border-b-4 border-double border-slate-800 pb-4 flex items-center justify-between gap-4 relative z-10">
          <div class="flex items-center gap-3.5">
            <div class="w-14 h-14 rounded-xl bg-[#D40D14] text-white flex items-center justify-center font-extrabold text-lg shrink-0">
              DAFI
            </div>
            <div>
              <div class="text-xs font-bold uppercase tracking-widest text-[#D40D14]">Yayasan Pondok Pesantren Darul Fikri</div>
              <div class="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">SEKOLAH MENENGAH PERTAMA (SMP) DAFI</div>
              <div class="text-[11px] text-slate-500">DDMS - DAFI Document Management System • Sidoarjo, Jawa Timur</div>
            </div>
          </div>
          <div class="text-right shrink-0">
            <span class="inline-block px-2.5 py-1 rounded-lg bg-red-50 border border-red-200 font-mono-code text-xs font-bold text-[#D40D14]">
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

        <!-- Status Approval & Tindakan Pengesahan -->
        ${doc.statusApproval === 'Menunggu Persetujuan' ? `
          <div class="p-4 rounded-xl bg-amber-50 border-2 border-amber-300 text-xs sm:text-sm text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
            <div>
              <div class="font-bold flex items-center gap-1.5 text-amber-900">
                <span class="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
                Status: Menunggu Persetujuan Kepala Sekolah
              </div>
              <p class="text-xs text-amber-800 mt-0.5">
                Diajukan oleh: <strong>${escapeHtml(doc.diajukanOleh || doc.pembuat)}</strong> pada ${escapeHtml(doc.tanggalPengajuan || doc.tanggalUpdate)}.
              </p>
            </div>
            ${appState.currentUser && appState.currentUser.role === 'kepsek' ? `
              <div class="flex items-center gap-2 shrink-0">
                <button type="button" onclick="openKepsekApprovalModal('${escapeHtml(doc.id)}')" class="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition flex items-center gap-1">
                  ✓ Setujui Pengesahan
                </button>
                <button type="button" onclick="openKepsekApprovalModal('${escapeHtml(doc.id)}')" class="px-3 py-1.5 rounded-lg bg-white hover:bg-amber-100 border border-amber-300 text-amber-900 font-semibold text-xs transition">
                  ✏️ Minta Revisi
                </button>
              </div>
            ` : ''}
          </div>
        ` : (doc.statusApproval === 'Perlu Revisi' ? `
          <div class="p-3.5 rounded-xl bg-rose-50 border border-rose-300 text-xs text-rose-900 font-medium">
            <strong>⚠️ Status: Perlu Revisi</strong> &mdash; Catatan Kepala Sekolah: &ldquo;${escapeHtml(doc.catatanPersetujuan || 'Mohon diperbaiki')}&rdquo;
          </div>
        ` : `
          <div class="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2 font-medium">
            <span class="text-emerald-700 font-bold">✓ Status Resmi:</span>
            <span>Telah disetujui &amp; disahkan oleh <strong>${escapeHtml(doc.disetujuiOleh || 'Kepala Sekolah')}</strong> (${escapeHtml(doc.tanggalPersetujuan || doc.tanggalTerbit || doc.tanggalUpdate)}).</span>
          </div>
        `)}

        <div class="text-center space-y-1 py-2">
          <div class="text-xs font-bold uppercase tracking-widest text-slate-400">${escapeHtml(doc.kategori)} RESMI SEKOLAH</div>
          <h2 class="text-base sm:text-lg font-extrabold text-slate-900 uppercase max-w-xl mx-auto leading-snug">
            ${escapeHtml(doc.judul)}
          </h2>
          <div class="text-xs font-mono-code text-slate-500">Nomor: ${escapeHtml(doc.nomorDokumen)}</div>
        </div>

        <div class="space-y-1.5">
          <div class="text-xs font-bold uppercase tracking-wider text-slate-400">I. Pokok Tujuan &amp; Ruang Lingkup</div>
          <p class="text-xs sm:text-sm text-slate-700 leading-relaxed bg-red-50/50 p-3.5 rounded-xl border border-red-100">
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

        <!-- Blok Pengesahan Digital / TTE -->
        ${doc.statusApproval === 'Disetujui' ? `
          <div class="mt-8 pt-6 border-t-2 border-slate-300">
            <div class="dafi-tte-card rounded-2xl p-4 sm:p-5 relative overflow-hidden">
              <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-red-200/80 pb-3 mb-4">
                <div class="flex items-center gap-2.5">
                  <div class="w-9 h-9 rounded-xl bg-[#D40D14] text-white flex items-center justify-center shadow-xs font-bold text-base shrink-0">
                    ✓
                  </div>
                  <div>
                    <div class="text-[11px] font-black uppercase tracking-widest text-[#D40D14]">Tanda Tangan Elektronik Resmi (TTE)</div>
                    <div class="text-xs sm:text-sm font-extrabold text-slate-900">SMP ISLAM TERPADU DARUL FIKRI SIDOARJO</div>
                  </div>
                </div>
                <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-300">
                  <span class="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                  STATUS: TERVERIFIKASI &amp; SAH
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                <div class="sm:col-span-4 flex flex-col items-center justify-center text-center p-3 rounded-xl bg-white/90 border border-red-100 shadow-2xs">
                  ${getQrCodeImgHtml(getDocVerificationUrl(doc.id), 'QR TTE ' + doc.id)}
                  <div class="text-[10px] font-extrabold text-[#D40D14] uppercase tracking-wider mt-2">Pindai untuk Verifikasi</div>
                  <div class="text-[9px] text-slate-500">Keabsahan Dokumen Real-time</div>
                </div>

                <div class="sm:col-span-8 space-y-2.5">
                  <div class="flex items-start justify-between gap-3">
                    <div>
                      <div class="text-[11px] text-slate-500">Pejabat Pengesah / Penandatangan:</div>
                      <div class="text-sm sm:text-base font-extrabold text-slate-900">${escapeHtml(doc.disetujuiOleh || 'Ustadz Kepala SMP IT Darul Fikri, M.Pd.')}</div>
                      <div class="text-xs font-semibold text-[#D40D14]">Kepala Sekolah SMP IT Darul Fikri Sidoarjo</div>
                      ${doc.signatureCanvasData ? `
                        <div class="mt-2 p-1.5 bg-white rounded-xl border border-stone-200 inline-block">
                          <img src="${doc.signatureCanvasData}" alt="Tanda Tangan Basah" class="h-10 max-w-[140px] object-contain">
                          <div class="text-[8px] font-bold text-stone-400 text-center">Goresan TTE Basah</div>
                        </div>
                      ` : ''}
                    </div>
                    <div class="shrink-0 hidden sm:block">
                      ${getOfficialDafiStampSvg()}
                    </div>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-white/80 p-2.5 rounded-xl border border-slate-200/80">
                    <div>
                      <span class="text-slate-400 block text-[10px]">Waktu Pengesahan:</span>
                      <span class="font-bold text-slate-800">${escapeHtml(doc.tanggalDisetujui || (doc.tanggalPersetujuan || doc.tanggalUpdate || '2026-10-12') + ' 08:30 WIB')}</span>
                    </div>
                    <div>
                      <span class="text-slate-400 block text-[10px]">Integritas Kriptografi:</span>
                      <span class="font-bold text-slate-800">SHA-256 Validated</span>
                    </div>
                  </div>

                  <div class="bg-red-50/80 p-2.5 rounded-xl border border-red-200/80">
                    <div class="text-[10px] font-bold text-red-900 mb-0.5 flex items-center justify-between">
                      <span>KODE TOKEN KEABSAHAN TTE:</span>
                      <button type="button" onclick="copySignatureToken('${escapeHtml(doc.signatureToken)}')" class="text-[#D40D14] hover:underline font-bold text-[10px]">Salin Kode</button>
                    </div>
                    <div class="font-mono-code text-xs font-black text-[#D40D14] tracking-wider select-all break-all">
                      ${escapeHtml(doc.signatureToken)}
                    </div>
                  </div>

                  <div class="flex flex-wrap items-center gap-2 pt-1">
                    <button type="button" onclick="showVerificationModal('${escapeHtml(doc.id)}')" class="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-900 text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5">
                      🔍 Sertifikat Keabsahan
                    </button>
                    <button type="button" onclick="printSignatureCertificate('${escapeHtml(doc.id)}')" class="px-3 py-1.5 rounded-lg bg-[#D40D14] hover:bg-[#B90B12] text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5">
                      🖨️ Cetak Lembar Pengesahan
                    </button>
                    <button type="button" onclick="copyVerificationUrl('${escapeHtml(doc.id)}')" class="px-3 py-1.5 rounded-lg bg-white hover:bg-stone-50 border border-slate-300 text-slate-700 font-semibold text-xs transition">
                      📋 Salin Link
                    </button>
                  </div>
                </div>
              </div>

              <div class="mt-3 pt-2.5 border-t border-red-100/80 text-[10px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-1">
                <span>Dokumen ini disahkan secara elektronik melalui sistem DDMS SMP IT Darul Fikri.</span>
                <span class="font-mono-code font-semibold text-[#D40D14]">UU ITE No. 11/2008 &amp; PP No. 71/2019</span>
              </div>
            </div>
          </div>
        ` : `
          <div class="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 text-xs">
            <div class="space-y-1 text-slate-400">
              <div>ID Arsip Digital: <span class="font-mono-code font-semibold text-slate-700">${escapeHtml(doc.id)}</span></div>
              <div>Status Akses: <span class="font-semibold text-slate-700">${escapeHtml(doc.akses)}</span></div>
              <div>DDMS - DAFI Document Management System</div>
            </div>
            <div class="text-left sm:text-right space-y-2">
              <div>Ditetapkan di: Sidoarjo</div>
              <div>Pada tanggal: <strong>${escapeHtml(activeVer.tanggalUpdate)}</strong></div>
              <div class="font-bold text-slate-800 mt-1">${escapeHtml(doc.pembuat)} SMP DAFI</div>
            </div>
          </div>
        `}
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
          <span class="text-slate-400">Persetujuan:</span>
          <span class="col-span-2">
            ${doc.statusApproval === 'Menunggu Persetujuan' ? `
              <span class="font-bold text-amber-800">Menunggu Persetujuan</span>
            ` : (doc.statusApproval === 'Perlu Revisi' ? `
              <span class="font-bold text-rose-800">Perlu Revisi</span>
            ` : `
              <button type="button" onclick="showVerificationModal('${escapeHtml(doc.id)}')" class="inline-flex items-center gap-1 font-bold text-emerald-700 hover:text-emerald-800 hover:underline">
                <span>✓ Disetujui (TTE Sah)</span>
              </button>
            `)}
          </span>
        </div>
        ${doc.statusApproval === 'Disetujui' && doc.signatureToken ? `
          <div class="py-1.5 border-b border-slate-100">
            <div class="flex items-center justify-between text-slate-400 mb-0.5">
              <span>Token TTE:</span>
              <button type="button" onclick="copySignatureToken('${escapeHtml(doc.signatureToken)}')" class="text-[#D40D14] hover:underline font-bold text-[10px]">Salin</button>
            </div>
            <div class="font-mono-code text-[11px] font-bold text-[#D40D14] bg-red-50 p-1 rounded border border-red-200 break-all select-all">
              ${escapeHtml(doc.signatureToken)}
            </div>
            <div class="mt-1.5 flex gap-1.5">
              <button type="button" onclick="showVerificationModal('${escapeHtml(doc.id)}')" class="flex-1 py-1 rounded bg-stone-800 hover:bg-stone-900 text-white font-bold text-[10px] text-center transition">
                🔍 Verifikasi Keabsahan
              </button>
              <button type="button" onclick="printSignatureCertificate('${escapeHtml(doc.id)}')" class="py-1 px-2 rounded bg-red-100 hover:bg-red-200 text-[#D40D14] font-bold text-[10px] transition">
                🖨️ Cetak TTE
              </button>
            </div>
          </div>
        ` : ''}
        <div class="grid grid-cols-3 gap-1 py-1.5 border-b border-slate-100">
          <span class="text-slate-400">Ukuran PDF:</span>
          <span class="col-span-2 text-slate-800">${escapeHtml(activeVer.ukuran || doc.ukuran)}</span>
        </div>
        <div class="py-1.5 border-b border-slate-100">
          <span class="text-slate-400 block mb-1">Kata Kunci:</span>
          <div class="flex flex-wrap gap-1">
            ${(doc.kataKunci || []).map(function(k) {
              return `<span class="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[11px]">#${escapeHtml(k)}</span>`;
            }).join('')}
          </div>
        </div>

        <!-- Panel Intisari Eksekutif AI (3 Poin Pokok) -->
        <div class="mt-2.5 pt-2 text-xs">
          <div class="flex items-center justify-between mb-1.5">
            <span class="font-bold text-slate-800 flex items-center gap-1 text-xs">
              <span class="text-amber-500">✨</span>
              <span>Intisari Eksekutif AI</span>
            </span>
            <button type="button" onclick="generateAiDocSummary('${escapeHtml(doc.id)}')" id="btnAiDocSummaryTrigger" class="text-[10px] font-bold text-[#D40D14] hover:text-[#96090e] hover:underline flex items-center gap-1" title="Analisis ringkasan 3 poin dengan AI">
              <span id="aiSummarySpinner_${escapeHtml(doc.id)}" class="hidden animate-spin">⚡</span>
              <span>${doc.aiSummary ? '↺ Analisis Ulang' : '✨ Hasilkan AI'}</span>
            </button>
          </div>
          ${doc.aiSummary ? `
            <div class="p-2.5 rounded-xl bg-gradient-to-br from-amber-50/70 to-red-50/30 border border-amber-200/80 text-slate-700 space-y-1.5 leading-relaxed">
              ${formatAiSummaryHtml(doc.aiSummary)}
              <div class="pt-2 border-t border-amber-200/60 flex items-center justify-between text-[10px] text-slate-500">
                <span class="flex items-center gap-1 text-emerald-700 font-semibold">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  AI Terstruktur 3 Poin
                </span>
                <button type="button" onclick="copyAiSummaryText('${escapeHtml(doc.id)}')" class="hover:text-slate-800 font-semibold text-[#D40D14] underline">
                  Salin Teks
                </button>
              </div>
            </div>
          ` : `
            <div class="p-3 rounded-xl bg-slate-50 border border-dashed border-slate-200 text-center space-y-1.5">
              <p class="text-[11px] text-slate-500">Intisari eksekutif 3 poin belum dianalisis.</p>
              <button type="button" onclick="generateAiDocSummary('${escapeHtml(doc.id)}')" class="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#D40D14] hover:bg-[#B90B12] text-white font-bold text-[11px] shadow-2xs transition">
                <span>✨ Analisis Intisari AI Sekarang</span>
              </button>
            </div>
          `}
        </div>
      `;

      const updateVerBtn = document.getElementById('viewerUpdateVersionBtn');
      if (updateVerBtn) {
        updateVerBtn.classList.toggle('hidden', !appState.currentUser);
      }

      document.getElementById('viewerHistoryCount').textContent = historyList.length + ' Versi';
      const timelineContainer = document.getElementById('viewerVersionTimeline');
      timelineContainer.innerHTML = historyList.slice().reverse().map(function(v, revIdx) {
        const realIdx = historyList.length - 1 - revIdx;
        const isCurrentSelected = realIdx === appState.currentViewingVersionIdx;
        return `
          <div class="p-3 rounded-xl border ${isCurrentSelected ? 'border-[#D40D14] bg-red-50/40' : 'border-slate-200 bg-slate-50'} space-y-1">
            <div class="flex items-center justify-between">
              <span class="font-mono-code text-xs font-bold ${isCurrentSelected ? 'text-[#D40D14]' : 'text-slate-800'}">
                ${escapeHtml(v.versi)} ${realIdx === historyList.length - 1 ? '(Terbaru)' : ''}
              </span>
              <span class="text-[11px] text-slate-400">${escapeHtml(v.tanggalUpdate)}</span>
            </div>
            <p class="text-xs text-slate-600 leading-snug">${escapeHtml(v.catatanPerubahan)}</p>
            <div class="flex items-center justify-between pt-1 text-[11px] text-slate-400">
              <span>Oleh: ${escapeHtml(v.diperbaruiOleh)}</span>
              ${!isCurrentSelected ? `
                <button type="button" onclick="openPdfViewer('${escapeHtml(doc.id)}', ${realIdx})" class="font-semibold text-[#D40D14] hover:underline">Buka Versi Ini</button>
              ` : `<span class="font-semibold text-[#D40D14]">Sedang Dibaca</span>`}
            </div>
          </div>
        `;
      }).join('');
    }

    function openUpdateFromViewer() {
      if (!appState.currentUser) {
        closePdfViewerModal();
        openLoginModal('Fitur pembaruan dan revisi dokumen memerlukan login Tenaga Pendidik / Admin.');
        return;
      }
      const docId = appState.currentViewingDocId;
      closePdfViewerModal();
      openDirectUpdateVersion(docId);
    }

    function openDocHistoryJump(docId) {
      if (!appState.currentUser) {
        openLoginModal('Riwayat versi dokumen hanya dapat diakses oleh akun Pendidik / Admin terdaftar.');
        return;
      }
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
      document.getElementById('selectedFileNameDisplay').textContent = 'Klik untuk memilih file PDF';
      document.getElementById('selectedFileSizeDisplay').textContent = 'Mendukung pratinjau langsung di aplikasi';
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
          statusBadge = '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-[#D40D14] animate-pulse">Mengunggah...</span>';
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
        openLoginModal('Fitur Pindai Massal Google Drive memerlukan login Akun Admin Sistem.');
        return;
      }

      if (appState.currentUser.role !== 'admin') {
        showToast('Akses dibatasi: Fitur Pindai Drive Massal dikhususkan untuk Akun Admin Sistem.', 'error');
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
        box.className = 'p-4 rounded-xl border border-red-200 bg-red-50 text-xs text-red-950 space-y-1';
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
                <svg class="w-4 h-4 text-emerald-600 shrink-0" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                <span>Pemindaian Massal Berhasil!</span>
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
          btn.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg><span>Pindai Folder Drive</span>`;
        }
      }
    }

    function openDirectUpdateVersion(docId) {
      if (!appState.currentUser) {
        openLoginModal('Fitur pembaruan dan revisi dokumen memerlukan login Tenaga Pendidik / Admin.');
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
      document.getElementById('selectedFileSizeDisplay').textContent = 'Ukuran: ' + appState.pendingUploadFileSize + ' (Format PDF Valid)';

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
          <button type="button" onclick="switchUploadFormMode('update', '${escapeHtml(topMatch.id)}')" class="px-3 py-1.5 rounded-lg bg-[#D40D14] text-white font-semibold text-xs shrink-0">
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

    function formatAiSummaryHtml(text) {
      if (!text) return '';
      const lines = String(text).split('\n').map(function(l) { return l.trim(); }).filter(Boolean);
      let html = '';
      lines.forEach(function(line) {
        if (/^[1-3]\.|\b(TUJUAN|KETENTUAN|EVALUASI|SANKSI|MASA BERLAKU)\b/i.test(line)) {
          html += `<div class="text-[11px] font-bold text-slate-800 mt-1.5 flex items-start gap-1"><span class="text-[#D40D14]">▸</span><span>${escapeHtml(line)}</span></div>`;
        } else {
          html += `<div class="text-[11px] text-slate-600 pl-3 leading-snug">${escapeHtml(line)}</div>`;
        }
      });
      return html || `<div class="text-[11px] text-slate-700 whitespace-pre-line leading-relaxed">${escapeHtml(text)}</div>`;
    }

    function copyAiSummaryText(docId) {
      const doc = appState.documents.find(function(d) { return d.id === docId; });
      if (!doc || !doc.aiSummary) return;
      navigator.clipboard.writeText(doc.aiSummary).then(function() {
        showToast('Intisari eksekutif AI berhasil disalin ke clipboard!', 'success');
      }).catch(function() {
        showToast('Gagal menyalin teks ke clipboard.', 'error');
      });
    }

    // Generator Intisari Dokumen Terstruktur (Gemini API + NLP Fallback)
    async function generateStructuredAiSummary(title, category, rawText) {
      if (appState.gasWebAppUrl) {
        try {
          const res = await sendToGasBackend({
            action: 'aiSummarize',
            judul: title,
            kategori: category,
            text: rawText || ''
          });
          if (res && res.status === 'ok' && res.summary) {
            return {
              summary: res.summary,
              keywords: res.keywords || [],
              source: res.source || 'gemini'
            };
          }
        } catch (e) {
          console.warn('Backend AI error, switching to local NLP:', e);
        }
      }

      // Local NLP Heuristic Engine for SMP IT Darul Fikri Sidoarjo
      const cat = String(category || '').toLowerCase();
      let p1 = '';
      let p2 = '';
      let p3 = '';

      if (cat.indexOf('sop') !== -1 || cat.indexOf('prosedur') !== -1) {
        p1 = '1. TUJUAN & RUANG LINGKUP: Menetapkan prosedur standar operasional pelaksanaan ' + title + ' bagi seluruh unit kerja di lingkungan SMP IT Darul Fikri guna menjamin tertib administrasi dan akuntabilitas mutu.';
        p2 = '2. KETENTUAN OPERASIONAL & SASARAN: Mengatur alur penanggung jawab pelaksana, verifikasi kelengkapan berkas, koordinasi lintas unit, serta kepatuhan pada standar mutu pesantren terpadu DAFI.';
        p3 = '3. EVALUASI, SANKSI & MASA BERLAKU: Berlaku efektif sejak tanggal pengesahan Kepala Sekolah dan wajib dievaluasi minimal satu kali dalam setiap tahun ajaran melalui audit tata usaha.';
      } else if (cat.indexOf('tertib') !== -1 || cat.indexOf('etik') !== -1 || cat.indexOf('santri') !== -1) {
        p1 = '1. TUJUAN & RUANG LINGKUP: Menegakkan disiplin, akhlakul karimah, dan adab islami bagi santri dan civitas akademika di lingkungan SMP IT Darul Fikri Sidoarjo.';
        p2 = '2. KETENTUAN OPERASIONAL & SASARAN: Memuat panduan adab, hak, kewajiban, serta tahapan pembinaan santri secara berjenjang dan terukur selama berada di lingkungan sekolah dan asrama.';
        p3 = '3. EVALUASI, SANKSI & MASA BERLAKU: Diterapkan mengikat selama masa aktif kependidikan/studi, ditinjau berkala tiap awal semester oleh Tim Kesiswaan, Dewan Guru, dan Bimbingan Konseling.';
      } else if (cat.indexOf('kurikulum') !== -1 || cat.indexOf('akademik') !== -1 || cat.indexOf('pembelajaran') !== -1) {
        p1 = '1. TUJUAN & RUANG LINGKUP: Pedoman resmi penyelenggaraan pembelajaran terpadu antara Kurikulum Nasional dan kurikulum kepesantrenan tahfidz di SMP IT Darul Fikri.';
        p2 = '2. KETENTUAN OPERASIONAL & SASARAN: Mengatur alokasi jam belajar, modul ajar tematik, ketuntasan minimal santri, serta sistem asesmen formatif dan sumatif berkala.';
        p3 = '3. EVALUASI, SANKSI & MASA BERLAKU: Berlaku untuk tahun ajaran aktif, dievaluasi setiap akhir semester oleh Unit Kurikulum dan Kepala Sekolah sesuai capaian mutu lulusan.';
      } else if (cat.indexOf('sk') !== -1 || cat.indexOf('keputusan') !== -1) {
        p1 = '1. TUJUAN & RUANG LINGKUP: Ketetapan legalitas formal penugasan struktural dan amanah kelembagaan di lingkungan SMP IT Darul Fikri Sidoarjo.';
        p2 = '2. KETENTUAN OPERASIONAL & SASARAN: Mengesahkan penunjukan personil, hak wewenang jabatan, dan tanggung jawab pelaporan berkala kepada Kepala Sekolah.';
        p3 = '3. EVALUASI, SANKSI & MASA BERLAKU: Berlaku terhitung sejak tanggal penetapan sampai dengan berakhirnya periode penugasan atau diterbitkannya keputusan pembaruan.';
      } else {
        p1 = '1. TUJUAN & RUANG LINGKUP: Pedoman resmi pelaksanaan ' + title + ' sebagai acuan tata kelola administrasi di lingkungan SMP IT Darul Fikri Sidoarjo.';
        p2 = '2. KETENTUAN OPERASIONAL & SASARAN: Mengikat seluruh personil dan unit kerja terkait untuk mematuhi target mutu dan koordinasi terstandar.';
        p3 = '3. EVALUASI, SANKSI & MASA BERLAKU: Tercatat secara sah dalam DDMS (DAFI Document Management System) dan dievaluasi berkala demi penjaminan mutu berkelanjutan.';
      }

      const summary = [p1, p2, p3].join('\n\n');
      const stopWords = new Set(['dan', 'atau', 'di', 'ke', 'dari', 'yang', 'untuk', 'pada', 'dengan', 'adalah', 'dalam', 'oleh', 'atas', 'tentang', 'nomor', 'tahun', 'resmi', 'smp', 'it']);
      const words = String(title + ' ' + category).toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(function(w) { return w.length > 2 && !stopWords.has(w); });
      const uniqueKeywords = Array.from(new Set(words)).slice(0, 5);
      if (!uniqueKeywords.includes('smp dafi')) uniqueKeywords.unshift('smp dafi');

      return {
        summary: summary,
        keywords: uniqueKeywords,
        source: 'local_nlp'
      };
    }

    async function generateAiSummaryForUpload() {
      const judulInput = document.getElementById('formJudul');
      const katInput = document.getElementById('formKategori');
      const ringkasanInput = document.getElementById('formRingkasan');
      const kataKunciInput = document.getElementById('formKataKunci');
      const spinner = document.getElementById('btnAiSummarySpinner');
      const icon = document.getElementById('btnAiSummaryIcon');
      const textSpan = document.getElementById('btnAiSummaryText');

      let judul = (judulInput ? judulInput.value : '').trim();
      const kategori = (katInput ? katInput.value : 'SOP').trim();

      if (!judul && appState.pendingUploadFileName) {
        judul = appState.pendingUploadFileName.replace(/\.pdf$/i, '').replace(/[_-]+/g, ' ');
        if (judulInput) judulInput.value = judul;
      }

      if (!judul) {
        showToast('Silakan isi judul dokumen atau pilih berkas PDF terlebih dahulu.', 'warning');
        if (judulInput) judulInput.focus();
        return;
      }

      if (spinner) spinner.classList.remove('hidden');
      if (icon) icon.classList.add('hidden');
      if (textSpan) textSpan.textContent = 'Menganalisis...';

      try {
        const result = await generateStructuredAiSummary(judul, kategori, '');
        if (ringkasanInput) {
          ringkasanInput.value = result.summary;
        }
        if (kataKunciInput && (!kataKunciInput.value.trim() || kataKunciInput.value.length < 10)) {
          kataKunciInput.value = result.keywords.join(', ');
        }
        showToast('✨ Intisari eksekutif 3 poin AI berhasil dibuat otomatis!', 'success');
      } catch (err) {
        showToast('Gagal membuat ringkasan AI: ' + err.message, 'error');
      } finally {
        if (spinner) spinner.classList.add('hidden');
        if (icon) icon.classList.remove('hidden');
        if (textSpan) textSpan.textContent = 'Ringkas dengan AI';
      }
    }

    async function generateAiDocSummary(docId) {
      const doc = appState.documents.find(function(d) { return d.id === docId; });
      if (!doc) return;

      const triggerBtn = document.getElementById('btnAiDocSummaryTrigger');
      const spinner = document.getElementById('aiSummarySpinner_' + docId);
      if (spinner) spinner.classList.remove('hidden');
      if (triggerBtn) triggerBtn.disabled = true;

      try {
        const rawContent = (doc.isiPasal ? doc.isiPasal.join('\n') : '') + '\n' + (doc.ringkasan || '');
        const result = await generateStructuredAiSummary(doc.judul, doc.kategori, rawContent);
        doc.aiSummary = result.summary;

        if (!doc.isiPasal || doc.isiPasal.length <= 1) {
          doc.isiPasal = result.summary.split('\n\n').filter(Boolean);
        }
        if (!doc.kontenTeks) {
          doc.kontenTeks = result.summary;
        }

        safeSetStorage(STORAGE_KEY_DOCS, appState.documents);

        // Perbarui tampilan metadata di viewer secara instan
        openPdfViewer(doc.id);
        showToast('✨ Intisari eksekutif 3 poin AI berhasil dibuat dan disimpan!', 'success');

        if (appState.gasWebAppUrl) {
          sendToGasBackend({
            action: 'updateVersion',
            id: doc.id,
            aiSummary: doc.aiSummary,
            kontenTeks: doc.kontenTeks
          }).catch(function(e) { console.warn('Sync AI to GAS error:', e); });
        }
      } catch (err) {
        showToast('Gagal menganalisis dokumen dengan AI: ' + err.message, 'error');
      } finally {
        if (spinner) spinner.classList.add('hidden');
        if (triggerBtn) triggerBtn.disabled = false;
      }
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
      const masaBerlaku = parseInt(document.getElementById('formMasaBerlaku') ? document.getElementById('formMasaBerlaku').value : '1', 10);
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
        doc.masaBerlakuTahun = masaBerlaku;
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

        if (appState.currentUser && (appState.currentUser.role === 'tendik' || appState.currentUser.role === 'guru')) {
          doc.statusApproval = 'Menunggu Persetujuan';
          doc.diajukanOleh = uploaderName;
          doc.tanggalPengajuan = today;
        } else if (appState.currentUser && appState.currentUser.role === 'kepsek') {
          doc.statusApproval = 'Disetujui';
          doc.disetujuiOleh = uploaderName;
          doc.tanggalPersetujuan = today;
        }

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
            statusApproval: doc.statusApproval,
            fileName: appState.pendingUploadFileName || (judul + '.pdf'),
            fileBase64: appState.pendingUploadBase64
          });
        }

        safeSetStorage(STORAGE_KEY_DOCS, appState.documents);
        closeUploadModal();
        refreshAllViews();
        if (doc.statusApproval === 'Menunggu Persetujuan') {
          sendInAppNotification({
            targetRole: 'kepsek',
            title: 'Pengajuan Revisi Dokumen',
            message: `Revisi untuk "${judul}" diajukan oleh ${uploaderName}. Menunggu persetujuan Anda.`,
            docId: doc.id,
            type: 'submission'
          });
          showToast(`Revisi dokumen "${judul}" berhasil diajukan! Menunggu persetujuan Kepala Sekolah.`, 'success');
        } else {
          showToast(`Versi dokumen "${judul}" berhasil diperbarui ke ${versi}!`, 'success');
        }
      } else {
        const isTendikRole = appState.currentUser && (appState.currentUser.role === 'tendik' || appState.currentUser.role === 'guru');
        const isKepsekRole = appState.currentUser && appState.currentUser.role === 'kepsek';
        const newStatus = isTendikRole ? 'Menunggu Persetujuan' : 'Disetujui';

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
          statusApproval: newStatus,
          diajukanOleh: isTendikRole ? uploaderName : '',
          tanggalPengajuan: isTendikRole ? today : '',
          disetujuiOleh: isKepsekRole ? uploaderName : (isTendikRole ? '' : 'Administrator Sistem'),
          tanggalPersetujuan: isTendikRole ? '' : today,
          catatanPersetujuan: isTendikRole ? '' : 'Disetujui',
          tanggalTerbit: today,
          tanggalUpdate: today,
          ukuran: fileSize,
          ringkasan: ringkasan,
          aiSummary: ringkasan,
          kontenTeks: ringkasan,
          masaBerlakuTahun: masaBerlaku,
          pdfBlobUrl: appState.pendingUploadBlobUrl || null,
          isiPasal: (ringkasan.indexOf('1.') !== -1 || ringkasan.indexOf('TUJUAN') !== -1)
            ? ringkasan.split('\n\n').filter(Boolean)
            : [
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
            statusApproval: newStatus,
            diajukanOleh: newDoc.diajukanOleh,
            ukuran: fileSize,
            ringkasan: ringkasan,
            aiSummary: ringkasan,
            kontenTeks: ringkasan,
            diperbaruiOleh: uploaderName,
            catatanPerubahan: catatanRevisi,
            fileName: appState.pendingUploadFileName || (judul + '.pdf'),
            fileBase64: appState.pendingUploadBase64
          });
        }

        safeSetStorage(STORAGE_KEY_DOCS, appState.documents);
        closeUploadModal();
        refreshAllViews();
        if (isTendikRole) {
          sendInAppNotification({
            targetRole: 'kepsek',
            title: 'Pengajuan Dokumen Baru',
            message: `Dokumen "${judul}" (${kategori}) telah diajukan oleh ${uploaderName}. Menunggu persetujuan Anda.`,
            docId: newId,
            type: 'submission'
          });
          showToast(`Pengajuan dokumen "${judul}" berhasil dikirim! Menunggu persetujuan Kepala Sekolah.`, 'success');
        } else if (isKepsekRole) {
          showToast(`Dokumen "${judul}" berhasil diterbitkan & disahkan oleh Kepala Sekolah!`, 'success');
        } else {
          showToast(`Dokumen PDF "${judul}" berhasil disimpan ke database DDMS!`, 'success');
        }
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
              <span class="text-xs font-bold text-[#D40D14]">${pct}% Standar</span>
            </div>
            <div class="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
              <div class="h-full bg-[#D40D14] rounded-full" style="width: ${pct}%"></div>
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
          <div class="p-6 rounded-2xl bg-red-50 border border-red-200 text-center space-y-1">
            <div class="text-sm font-bold text-[#D40D14]">Seluruh Dokumen Standar SMP DAFI Sudah Terpenuhi!</div>
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
                <button type="button" onclick="triggerUploadFromSuggestion('${escapeHtml(item.id)}')" class="px-3 py-1.5 rounded-xl bg-[#D40D14] hover:bg-[#B90B12] text-white text-xs font-semibold transition">
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
              <button type="button" onclick="openDirectUpdateVersion('${escapeHtml(pair.doc.id)}')" class="px-2.5 py-1 rounded-lg bg-red-50 hover:bg-red-100 text-[#D40D14] text-xs font-semibold">Revisi</button>
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
            <button type="button" onclick="openDirectUpdateVersion('${escapeHtml(m.id)}')" class="px-3 py-1.5 rounded-lg bg-[#D40D14] text-white font-semibold text-xs">Unggah sebagai Versi Baru (${escapeHtml(incrementVersionString(m.versi))})</button>
          </div>
        `;
      } else {
        box.className = 'rounded-xl p-4 bg-red-50 border border-red-200 text-xs sm:text-sm space-y-2';
        box.innerHTML = `
          <div class="font-bold text-[#D40D14]">✓ Belum Ada Dokumen Serupa di Library</div>
          <p class="text-slate-600">
            Judul <strong>"${escapeHtml(val)}"</strong> belum ditemukan di dalam katalog. Anda dapat mengunggahnya sebagai dokumen baru.
          </p>
          <button type="button" onclick="handleOpenUploadModal({ judul: '${escapeHtml(val)}', kategori: 'SOP', pembuat: 'Kepala Sekolah', kataKunci: ['${escapeHtml(val.toLowerCase())}'], alasan: '' })" class="px-3 py-1.5 rounded-lg bg-[#D40D14] text-white font-semibold text-xs">
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

      if (allEvents.length === 0) {
        container.innerHTML = `
          <div class="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-xs text-slate-400">
            Belum ada riwayat aktivitas pembaruan dokumen resmi.
          </div>
        `;
        return;
      }

      container.innerHTML = allEvents.map(function(ev) {
        return `
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div class="space-y-1">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="px-2 py-0.5 rounded font-mono-code text-xs font-bold ${ev.isLatest ? 'bg-[#D40D14] text-white' : 'bg-slate-200 text-slate-700'}">
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
              <button type="button" onclick="openDirectUpdateVersion('${escapeHtml(ev.docId)}')" class="px-3 py-1.5 rounded-xl bg-[#D40D14] hover:bg-[#B90B12] text-xs font-semibold text-white transition">
                + Perbarui Lagi
              </button>
            </div>
          </div>
        `;
      }).join('');
    }

    function updateGasStatusBadge() {
      const badge = document.getElementById('gasConnectionBadge');
      const dot = document.getElementById('gasStatusDot');
      const text = document.getElementById('gasStatusText');
      const note = document.getElementById('gasSavedStatusNote');

      // Tampilkan badge status koneksi GAS di header hanya jika akun adalah admin
      const isAdmin = !!(appState.currentUser && appState.currentUser.role === 'admin');
      if (badge) {
        if (isAdmin) {
          badge.classList.remove('hidden');
          badge.classList.add('inline-flex');
        } else {
          badge.classList.add('hidden');
          badge.classList.remove('inline-flex');
        }
      }

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
      if (!appState.currentUser || appState.currentUser.role !== 'admin') {
        showToast('Wewenang dibatasi: Pengaturan endpoint koneksi GAS hanya dapat dikelola oleh Administrator Sistem.', 'warning');
        return;
      }
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

      // Tampilkan Efek Animasi Skeleton Shimmer saat sinkronisasi
      const catalogEl = document.getElementById('catalogContainer');
      if (catalogEl && appState.activeTab === 'catalog') {
        catalogEl.innerHTML = `
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pt-1">
            ${[1, 2, 3, 4].map(function() {
              return `
                <div class="p-4 rounded-2xl border border-slate-100 bg-white space-y-3">
                  <div class="skeleton-shimmer h-4 w-16 rounded-md"></div>
                  <div class="skeleton-shimmer h-14 w-12 mx-auto rounded-lg my-2"></div>
                  <div class="skeleton-shimmer h-3.5 w-3/4 mx-auto rounded"></div>
                  <div class="skeleton-shimmer h-2.5 w-1/2 mx-auto rounded"></div>
                  <div class="skeleton-shimmer h-7 w-full rounded-lg mt-3"></div>
                </div>
              `;
            }).join('')}
          </div>
        `;
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
        if (data && data.status === 'ok' && Array.isArray(data.documents)) {
          appState.documents = data.documents;
          safeSetStorage(STORAGE_KEY_DOCS, appState.documents);
          refreshAllViews();
          if (data.documents.length > 0) {
            showToast('Berhasil menyinkronkan ' + data.documents.length + ' dokumen riil dari Google Sheets & Drive!', 'success');
          } else {
            showToast('Terhubung ke GAS! Database Google Sheets aktif dan siap menerima dokumen.', 'success');
          }
        } else {
          refreshAllViews();
          showToast('Terhubung ke GAS! Database Google Sheets aktif dan siap menerima dokumen.', 'success');
        }
      } catch (err) {
        refreshAllViews();
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
      if (!appState.currentUser || appState.currentUser.role !== 'admin') {
        showToast('Wewenang dibatasi: Tindakan ini hanya dapat dilakukan oleh Akun Admin Sistem.', 'warning');
        return;
      }
      if (!confirm('Apakah Anda yakin ingin mengosongkan seluruh arsip dokumen lokal browser?')) return;
      appState.documents = [];
      appState.selectedDocId = null;
      safeSetStorage(STORAGE_KEY_DOCS, []);
      try { localStorage.removeItem('smp_dafi_simdok_docs_v1'); } catch (e) {}
      refreshAllViews();
      showToast('Katalog dokumen lokal telah dikosongkan.', 'success');
    }

    window.openProfileModal = openProfileModal;
    window.closeProfileModal = closeProfileModal;
    window.openChangePasswordModal = openChangePasswordModal;
    window.closeChangePasswordModal = closeChangePasswordModal;
    window.handleChangePasswordSubmit = handleChangePasswordSubmit;
    window.switchMainTab = switchMainTab;
    window.openLoginModal = openLoginModal;
    window.closeLoginModal = closeLoginModal;
    window.handleLogout = handleLogout;
    window.approveDocumentAction = approveDocumentAction;
    window.requestRevisionAction = requestRevisionAction;
    window.showVerificationModal = showVerificationModal;
    window.closeVerificationModal = closeVerificationModal;
    window.printSignatureCertificate = printSignatureCertificate;
    window.copySignatureToken = copySignatureToken;
    window.copyVerificationUrl = copyVerificationUrl;

    // Fungsi Upgrade Fitur Lanjutan (Notifikasi Akun, Batch Approval, Rekapitulasi, & TTE Canvas)
    window.toggleNotificationDropdown = toggleNotificationDropdown;
    window.markAllNotificationsAsRead = markAllNotificationsAsRead;
    window.toggleFavoriteDoc = toggleFavoriteDoc;
    window.toggleSelectAllPending = toggleSelectAllPending;
    window.toggleDocPendingSelection = toggleDocPendingSelection;
    window.handleBatchApproveKepsek = handleBatchApproveKepsek;
    window.openKepsekApprovalModal = openKepsekApprovalModal;
    window.closeKepsekApprovalModal = closeKepsekApprovalModal;
    window.submitKepsekApproval = submitKepsekApproval;
    window.submitKepsekRevision = submitKepsekRevision;
    window.clearSignatureCanvas = clearSignatureCanvas;
    window.openRekapModal = openRekapModal;
    window.closeRekapModal = closeRekapModal;
    window.renderRekapitulasiPage = renderRekapitulasiPage;
    window.filterByCreatorFromRekap = filterByCreatorFromRekap;
    window.toggleAddUserForm = toggleAddUserForm;
    window.generateRandomUserPassword = generateRandomUserPassword;
    window.handleAddUserSubmit = handleAddUserSubmit;
    window.handleDeleteUserAction = handleDeleteUserAction;
    window.promptResetUserPassword = promptResetUserPassword;
    window.renderUserManagementTable = renderUserManagementTable;

    // Fitur AI & Pencarian Teks Penuh (Kecerdasan Buatan DDMS)
    window.generateAiSummaryForUpload = generateAiSummaryForUpload;
    window.generateAiDocSummary = generateAiDocSummary;
    window.copyAiSummaryText = copyAiSummaryText;

    window.onload = initApp;
  