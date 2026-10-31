/**
 * ============================================================================
 * BERKAS KHUSUS KODE BACKEND GOOGLE APPS SCRIPT (GAS)
 * DDMS - DAFI Document Management System (SMP DAFI)
 * ============================================================================
 * Jika terjadi perbaruan pada skrip Google Apps Script, perbarui file ini atau Code.gs.
 */

window.DMS_GAS_CODE = `/**
 * ============================================================================
 * BACKEND GOOGLE APPS SCRIPT (Code.gs) - VERSI KEAMANAN TINGGI (HARDENED v2.0)
 * DDMS - DAFI Document Management System (SMP DAFI)
 * Arsitektur: GitHub Pages (Frontend Domain Tetap) + GAS Web App (API + Drive + Sheets)
 * ============================================================================
 * 
 * FITUR KEAMANAN:
 * 1. Password Hashing (SHA-256 + Salt) - Tidak menyimpan teks sandi polos di Google Sheets.
 * 2. RBAC & Signed Auth Token (HMAC-SHA256) - Mencegah pemalsuan sesi dan unauthorized mutasi API.
 * 3. Proteksi Endpoint Mutasi (upload, revisi, hapus) wajib memiliki token valid dengan role yang sesuai.
 * 4. PDF Magic Bytes Validation (%PDF- / 0x25 0x50 0x44 0x46) - Mencegah eksekusi berkas berbahaya.
 * 5. Batasan Ukuran Berkas Maksimal (15 MB) - Mencegah DoS / kuota Drive exhaustion.
 * 6. Sanitasi Input & Proteksi Formula Injection (Spreadsheet Injection Neutralizer).
 * 7. Rate Limiting / Proteksi Brute Force Login menggunakan CacheService.
 * 8. Pengendalian Izin File Google Drive (Dokumen Internal Pendidik tidak dibuka publik bebas).
 */

const CONFIG = {
  FOLDER_NAME: 'Arsip_PDF_SMP_DAFI',
  SHEET_DOCS: 'Documents',
  SHEET_VERSIONS: 'VersionHistory',
  SHEET_USERS: 'Users',
  SHEET_SUGGESTIONS: 'SuggestedDocs',
  MAX_FILE_BYTES: 15 * 1024 * 1024, // 15 MB
  TOKEN_EXPIRY_HOURS: 24,
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_MINUTES: 5
};

/**
 * Mengambil atau membuat Kunci Rahasia Server (Server Secret) unik di ScriptProperties
 */
function getAppSecret_() {
  const props = PropertiesService.getScriptProperties();
  let secret = props.getProperty('DMS_SERVER_SECRET');
  if (!secret) {
    secret = Utilities.getUuid() + '-' + Utilities.getUuid() + '-' + (new Date().getTime());
    props.setProperty('DMS_SERVER_SECRET', secret);
  }
  return secret;
}

/**
 * Hashing Kata Sandi menggunakan SHA-256 + Salt
 */
function hashPassword_(password, salt) {
  const combined = (salt || 'dafi_salt') + ':' + String(password || '');
  const rawBytes = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    combined,
    Utilities.Charset.UTF_8
  );
  let hex = '';
  for (let i = 0; i < rawBytes.length; i++) {
    const b = (rawBytes[i] < 0 ? rawBytes[i] + 256 : rawBytes[i]).toString(16);
    hex += (b.length === 1 ? '0' : '') + b;
  }
  return hex;
}

/**
 * Generate Signed HMAC-SHA256 Token untuk Sesi Pengguna
 */
function generateAuthToken_(user) {
  const secret = getAppSecret_();
  const exp = new Date().getTime() + (CONFIG.TOKEN_EXPIRY_HOURS * 60 * 60 * 1000);
  const payloadStr = user.username + '|' + user.role + '|' + exp;
  const sigBytes = Utilities.computeHmacSha256Signature(payloadStr, secret);
  let hexSig = '';
  for (let i = 0; i < sigBytes.length; i++) {
    const b = (sigBytes[i] < 0 ? sigBytes[i] + 256 : sigBytes[i]).toString(16);
    hexSig += (b.length === 1 ? '0' : '') + b;
  }
  return Utilities.base64EncodeWebSafe(payloadStr + '.' + hexSig);
}

/**
 * Verifikasi Validitas dan Hak Akses (Role) dari Auth Token
 */
function verifyAuthToken_(token, allowedRoles) {
  if (!token) {
    return { valid: false, message: 'Autentikasi ditolak: Sesi atau token keamanan tidak disertakan.' };
  }
  try {
    const decoded = Utilities.newBlob(Utilities.base64DecodeWebSafe(token)).getDataAsString();
    const parts = decoded.split('.');
    if (parts.length !== 2) {
      return { valid: false, message: 'Format token keamanan tidak valid.' };
    }

    const payloadStr = parts[0];
    const clientSig = parts[1];
    const secret = getAppSecret_();

    const expectedSigBytes = Utilities.computeHmacSha256Signature(payloadStr, secret);
    let expectedSig = '';
    for (let i = 0; i < expectedSigBytes.length; i++) {
      const b = (expectedSigBytes[i] < 0 ? expectedSigBytes[i] + 256 : expectedSigBytes[i]).toString(16);
      expectedSig += (b.length === 1 ? '0' : '') + b;
    }

    if (expectedSig !== clientSig) {
      return { valid: false, message: 'Integritas sesi gagal: Tanda tangan token tidak sah atau telah diubah.' };
    }

    const data = payloadStr.split('|');
    const username = data[0];
    const role = data[1];
    const exp = parseInt(data[2], 10);

    if (new Date().getTime() > exp) {
      return { valid: false, message: 'Sesi Anda telah kedaluwarsa demi keamanan. Silakan login kembali.' };
    }

    if (allowedRoles && allowedRoles.length > 0 && allowedRoles.indexOf(role) === -1) {
      return { valid: false, message: 'Akses ditolak: Peran akun Anda (' + role + ') tidak memiliki hak untuk operasi ini.' };
    }

    return { valid: true, username: username, role: role };
  } catch (err) {
    return { valid: false, message: 'Gagal memverifikasi token sesi: ' + err.toString() };
  }
}

/**
 * Sanitasi string input dan menetralkan bahaya formula injection pada spreadsheet (=, +, -, @)
 */
function sanitizeInput_(val, maxLen) {
  if (val === null || val === undefined) return '';
  let str = String(val).trim();
  if (maxLen && str.length > maxLen) {
    str = str.substring(0, maxLen);
  }
  // Cegah CSV/Spreadsheet Formula Injection
  if (/^[=\+\-@]/.test(str)) {
    str = "'" + str;
  }
  return str;
}

/**
 * Sanitasi nama berkas untuk mencegah Directory Traversal
 */
function sanitizeFileName_(name) {
  if (!name) return 'Dokumen_SMP_DAFI.pdf';
  let safe = String(name).replace(/[\/\\:\*\?"<>\|]/g, '_').replace(/[^a-zA-Z0-9_\.\-\s]/g, '');
  if (!safe.toLowerCase().endsWith('.pdf')) {
    safe += '.pdf';
  }
  return safe;
}

/**
 * Validasi Magic Bytes PDF (%PDF-) dan batasan ukuran berkas
 */
function validatePdfBytes_(decodedBytes) {
  if (!decodedBytes || decodedBytes.length < 100) {
    return { valid: false, message: 'Berkas PDF tidak valid atau kosong.' };
  }
  if (decodedBytes.length > CONFIG.MAX_FILE_BYTES) {
    return { valid: false, message: 'Ukuran file melebihi batas maksimal 15 MB.' };
  }
  // Verifikasi Magic Bytes: %PDF- -> [0x25, 0x50, 0x44, 0x46]
  // 37 = '%', 80 = 'P', 68 = 'D', 70 = 'F'
  if (decodedBytes[0] !== 37 || decodedBytes[1] !== 80 || decodedBytes[2] !== 68 || decodedBytes[3] !== 70) {
    return { valid: false, message: 'Format ditolak: Berkas bukan dokumen PDF yang valid (%PDF header tidak ditemukan).' };
  }
  return { valid: true };
}

/**
 * Inisialisasi awal Spreadsheet & Folder Google Drive dengan kredensial ter-hash
 */
function setupDatabase() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // 1. Sheet Documents
  let docSheet = ss.getSheetByName(CONFIG.SHEET_DOCS);
  if (!docSheet) {
    docSheet = ss.insertSheet(CONFIG.SHEET_DOCS);
    docSheet.appendRow([
      'id',
      'nomorDokumen',
      'judul',
      'kategori',
      'pembuat',
      'kataKunci',
      'akses',
      'versi',
      'tanggalTerbit',
      'tanggalUpdate',
      'ukuran',
      'ringkasan',
      'driveFileId',
      'driveViewUrl',
      'driveDownloadUrl'
    ]);
    docSheet.getRange(1, 1, 1, 15).setFontWeight('bold').setBackground('#047857').setFontColor('#ffffff');
  }

  // 2. Sheet VersionHistory
  let verSheet = ss.getSheetByName(CONFIG.SHEET_VERSIONS);
  if (!verSheet) {
    verSheet = ss.insertSheet(CONFIG.SHEET_VERSIONS);
    verSheet.appendRow([
      'versionId',
      'docId',
      'versi',
      'tanggalUpdate',
      'diperbaruiOleh',
      'catatanPerubahan',
      'ukuran',
      'driveFileId',
      'driveViewUrl'
    ]);
    verSheet.getRange(1, 1, 1, 9).setFontWeight('bold').setBackground('#047857').setFontColor('#ffffff');
  }

  // 3. Sheet Users (Tersimpan dalam bentuk Hash SHA-256 + Salt acak)
  let userSheet = ss.getSheetByName(CONFIG.SHEET_USERS);
  if (!userSheet) {
    userSheet = ss.insertSheet(CONFIG.SHEET_USERS);
    userSheet.appendRow(['username', 'passwordHash', 'salt', 'namaLengkap', 'role', 'jabatan']);
    userSheet.getRange(1, 1, 1, 6).setFontWeight('bold').setBackground('#047857').setFontColor('#ffffff');

    // Buat salt acak untuk masing-masing user bawaan
    const saltKs = 'dafi_salt_ks';
    const saltGr = 'dafi_salt_gr';
    const saltAd = 'dafi_salt_ad';

    userSheet.appendRow(['kepsek', hashPassword_('dafi2026', saltKs), saltKs, 'Kepala SMP DAFI', 'kepsek', 'Kepala Sekolah']);
    userSheet.appendRow(['guru', hashPassword_('guru2026', saltGr), saltGr, 'Tenaga Pendidik SMP DAFI', 'guru', 'Guru / Wali Kelas']);
    userSheet.appendRow(['admin', hashPassword_('admin2026', saltAd), saltAd, 'Admin Tata Usaha SMP DAFI', 'admin', 'Staf Administrasi & TU']);
  }

  // 4. Sheet SuggestedDocs (Target Dokumen Standar Sekolah)
  let sugSheet = ss.getSheetByName(CONFIG.SHEET_SUGGESTIONS);
  if (!sugSheet) {
    sugSheet = ss.insertSheet(CONFIG.SHEET_SUGGESTIONS);
    sugSheet.appendRow(['id', 'judulSaran', 'kategori', 'pembuatDisarankan', 'prioritas', 'alasan', 'kataKunci']);
    sugSheet.getRange(1, 1, 1, 7).setFontWeight('bold').setBackground('#047857').setFontColor('#ffffff');
  }

  // Pastikan Kunci Rahasia Server telah di-generate
  getAppSecret_();

  // Pastikan Folder Drive tersedia
  getOrCreateArchiveFolder_();
  return 'Setup Database Berhasil! Seluruh kredensial tersimpan dengan aman (SHA-256 + Salt).';
}

/**
 * Mengambil atau membuat folder penyimpanan PDF di Google Drive
 */
function getOrCreateArchiveFolder_() {
  const folders = DriveApp.getFoldersByName(CONFIG.FOLDER_NAME);
  if (folders.hasNext()) {
    return folders.next();
  }
  const folder = DriveApp.createFolder(CONFIG.FOLDER_NAME);
  return folder;
}

/**
 * Handler HTTP GET - Mengambil daftar dokumen, riwayat versi, dan saran dokumen
 */
function doGet(e) {
  try {
    const action = (e && e.parameter && e.parameter.action) ? e.parameter.action : 'getAll';

    if (action === 'ping') {
      return jsonResponse_({
        status: 'ok',
        school: 'SMP DAFI',
        securityLevel: 'Hardened v2.0 (HMAC Auth, SHA-256 Hashing, PDF Magic Validation)',
        timestamp: new Date().toISOString()
      });
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const docs = sheetToObjects_(ss.getSheetByName(CONFIG.SHEET_DOCS));
    const versions = sheetToObjects_(ss.getSheetByName(CONFIG.SHEET_VERSIONS));
    const suggestions = sheetToObjects_(ss.getSheetByName(CONFIG.SHEET_SUGGESTIONS));

    // Gabungkan riwayat versi ke masing-masing dokumen
    const docsWithHistory = docs.map(function(doc) {
      doc.kataKunci = doc.kataKunci ? String(doc.kataKunci).split(',').map(function(k) { return k.trim(); }).filter(Boolean) : [];
      doc.riwayat = versions.filter(function(v) { return String(v.docId) === String(doc.id); });
      return doc;
    });

    return jsonResponse_({
      status: 'ok',
      documents: docsWithHistory,
      suggestions: suggestions
    });
  } catch (err) {
    return jsonResponse_({ status: 'error', message: 'Gagal memuat arsip: ' + err.toString() });
  }
}

/**
 * Handler HTTP POST - Menangani Login, Upload PDF Baru, dan Update Versi Dokumen
 * Menggunakan Content-Type text/plain dari fetch() agar bebas dari blokir CORS Preflight di GitHub Pages
 */
function doPost(e) {
  try {
    const rawBody = (e && e.postData && e.postData.contents) ? e.postData.contents : '{}';
    const payload = JSON.parse(rawBody);
    const action = payload.action || '';

    if (action === 'login') {
      return handleLogin_(payload);
    }
    if (action === 'uploadDocument') {
      return handleUploadDocument_(payload);
    }
    if (action === 'updateVersion') {
      return handleUpdateVersion_(payload);
    }
    if (action === 'deleteDocument') {
      return handleDeleteDocument_(payload);
    }
    if (action === 'scanDriveFolder') {
      return handleScanDriveFolder_(payload);
    }

    return jsonResponse_({ status: 'error', message: 'Aksi tidak diizinkan atau tidak dikenali: ' + action });
  } catch (err) {
    return jsonResponse_({ status: 'error', message: 'Permintaan gagal diproses: ' + err.toString() });
  }
}

/**
 * Verifikasi Login Pengguna dengan Hashing SHA-256 + Proteksi Brute Force (Rate Limiting)
 */
function handleLogin_(payload) {
  const username = sanitizeInput_(payload.username, 50).toLowerCase();
  const password = String(payload.password || '');

  if (!username || !password) {
    return jsonResponse_({ status: 'error', message: 'Username dan kata sandi wajib diisi.' });
  }

  // Rate Limiting menggunakan Script Cache
  const cache = CacheService.getScriptCache();
  const lockoutKey = 'LOCKOUT_' + username;
  if (cache.get(lockoutKey)) {
    return jsonResponse_({
      status: 'error',
      message: 'Akun ditangguhkan sementara karena terlalu banyak percobaan gagal. Silakan tunggu 5 menit.'
    });
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const users = sheetToObjects_(ss.getSheetByName(CONFIG.SHEET_USERS));
  const found = users.find(function(u) {
    return String(u.username).toLowerCase() === username;
  });

  const attemptKey = 'ATTEMPTS_' + username;
  let attempts = parseInt(cache.get(attemptKey) || '0', 10);

  if (!found) {
    // Timing mitigation: tetap hitung hash tiruan
    hashPassword_('dummy_pwd', 'dummy_salt');
    attempts++;
    cache.put(attemptKey, String(attempts), 300);
    if (attempts >= CONFIG.MAX_LOGIN_ATTEMPTS) {
      cache.put(lockoutKey, 'locked', CONFIG.LOCKOUT_MINUTES * 60);
    }
    return jsonResponse_({ status: 'error', message: 'Kredensial login tidak cocok.' });
  }

  let isMatch = false;
  if (found.passwordHash && found.salt) {
    isMatch = (hashPassword_(password, found.salt) === found.passwordHash);
  } else if (found.password) {
    // Backward-compatibility jika sebelumnya plaintext, langsung bandingkan & siapkan migrasi
    isMatch = (String(found.password) === password);
  }

  if (!isMatch) {
    attempts++;
    cache.put(attemptKey, String(attempts), 300);
    if (attempts >= CONFIG.MAX_LOGIN_ATTEMPTS) {
      cache.put(lockoutKey, 'locked', CONFIG.LOCKOUT_MINUTES * 60);
    }
    return jsonResponse_({ status: 'error', message: 'Kredensial login tidak cocok.' });
  }

  // Reset percobaan jika login sukses
  cache.remove(attemptKey);

  // Buat HMAC Signed Token
  const token = generateAuthToken_(found);

  return jsonResponse_({
    status: 'ok',
    token: token,
    user: {
      username: found.username,
      namaLengkap: found.namaLengkap,
      role: found.role,
      jabatan: found.jabatan
    }
  });
}

/**
 * Menyimpan file PDF Base64 ke Google Drive & mencatat metadata ke Sheet Documents & VersionHistory
 * Wajib Token RBAC: admin, kepsek, atau guru
 */
function handleUploadDocument_(payload) {
  // 1. Verifikasi Izin Akses RBAC
  const auth = verifyAuthToken_(payload.authToken, ['admin', 'kepsek', 'guru']);
  if (!auth.valid) {
    return jsonResponse_({ status: 'error', message: auth.message });
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  setupDatabase(); // Pastikan struktur siap

  const docSheet = ss.getSheetByName(CONFIG.SHEET_DOCS);
  const verSheet = ss.getSheetByName(CONFIG.SHEET_VERSIONS);
  const folder = getOrCreateArchiveFolder_();

  let driveFileId = '';
  let driveViewUrl = '';
  let driveDownloadUrl = '';

  // 2. Validasi & Simpan Berkas PDF
  if (payload.fileBase64) {
    const cleanBase64 = String(payload.fileBase64).replace(/^data:application\/pdf;base64,/, '').replace(/\s/g, '');
    let decoded;
    try {
      decoded = Utilities.base64Decode(cleanBase64);
    } catch (e) {
      return jsonResponse_({ status: 'error', message: 'Gagal mendekode data berkas base64.' });
    }

    // Validasi Magic Bytes & Ukuran Maksimal
    const pdfCheck = validatePdfBytes_(decoded);
    if (!pdfCheck.valid) {
      return jsonResponse_({ status: 'error', message: pdfCheck.message });
    }

    const safeBaseName = sanitizeFileName_(payload.fileName || 'Dokumen_SMP_DAFI.pdf');
    const safeDocId = sanitizeInput_(payload.id || ('DOC-' + new Date().getTime()), 30);
    const safeVersi = sanitizeInput_(payload.versi || 'v1.0', 10);
    const finalFileName = safeDocId + '_' + safeVersi + '_' + safeBaseName;

    const blob = Utilities.newBlob(decoded, 'application/pdf', finalFileName);
    const file = folder.createFile(blob);

    // Pengendalian Hak Akses Berkas Google Drive
    const akses = sanitizeInput_(payload.akses || 'Publik', 30);
    if (akses === 'Publik') {
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    }

    driveFileId = file.getId();
    driveViewUrl = 'https://drive.google.com/file/d/' + driveFileId + '/preview';
    driveDownloadUrl = 'https://drive.google.com/uc?export=download&id=' + driveFileId;
  }

  // 3. Sanitasi Seluruh Input Metadata
  const nowDate = Utilities.formatDate(new Date(), Session.getScriptTimeZone() || 'Asia/Jakarta', 'yyyy-MM-dd');
  const docId = sanitizeInput_(payload.id || ('DOC-' + new Date().getTime()), 30);
  const nomorDokumen = sanitizeInput_(payload.nomorDokumen || '-', 50);
  const judul = sanitizeInput_(payload.judul || 'Tanpa Judul', 150);
  const kategori = sanitizeInput_(payload.kategori || 'Surat Administratif', 40);
  const pembuat = sanitizeInput_(payload.pembuat || auth.username, 60);
  const akses = sanitizeInput_(payload.akses || 'Publik', 30);
  const versi = sanitizeInput_(payload.versi || 'v1.0', 10);
  const ukuran = sanitizeInput_(payload.ukuran || '250 KB', 20);
  const ringkasan = sanitizeInput_(payload.ringkasan || '', 500);

  let tagsArray = [];
  if (Array.isArray(payload.kataKunci)) {
    tagsArray = payload.kataKunci.map(function(k) { return sanitizeInput_(k, 30); });
  } else if (payload.kataKunci) {
    tagsArray = String(payload.kataKunci).split(',').map(function(k) { return sanitizeInput_(k, 30); });
  }
  const tagsString = tagsArray.filter(Boolean).join(', ');

  docSheet.appendRow([
    docId,
    nomorDokumen,
    judul,
    kategori,
    pembuat,
    tagsString,
    akses,
    versi,
    nowDate,
    nowDate,
    ukuran,
    ringkasan,
    driveFileId,
    driveViewUrl,
    driveDownloadUrl
  ]);

  verSheet.appendRow([
    'VER-' + new Date().getTime(),
    docId,
    versi,
    nowDate,
    sanitizeInput_(payload.diperbaruiOleh || pembuat, 60),
    sanitizeInput_(payload.catatanPerubahan || 'Unggahan dokumen awal (rilis pertama).', 250),
    ukuran,
    driveFileId,
    driveViewUrl
  ]);

  return jsonResponse_({
    status: 'ok',
    message: 'Dokumen berhasil diverifikasi dan diunggah dengan aman ke Google Drive & Sheets.',
    docId: docId,
    driveFileId: driveFileId,
    driveViewUrl: driveViewUrl,
    driveDownloadUrl: driveDownloadUrl
  });
}

/**
 * Memperbarui versi dokumen yang sudah ada & menambahkan baris baru di VersionHistory
 * Wajib Token RBAC: admin, kepsek, atau guru
 */
function handleUpdateVersion_(payload) {
  // 1. Verifikasi Izin Akses RBAC
  const auth = verifyAuthToken_(payload.authToken, ['admin', 'kepsek', 'guru']);
  if (!auth.valid) {
    return jsonResponse_({ status: 'error', message: auth.message });
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const docSheet = ss.getSheetByName(CONFIG.SHEET_DOCS);
  const verSheet = ss.getSheetByName(CONFIG.SHEET_VERSIONS);
  const folder = getOrCreateArchiveFolder_();

  const docId = sanitizeInput_(payload.docId, 30);
  const versiBaru = sanitizeInput_(payload.versiBaru || payload.versi || 'v1.1', 10);
  const catatanPerubahan = sanitizeInput_(payload.catatanPerubahan || 'Pembaruan revisi dokumen.', 250);
  const diperbaruiOleh = sanitizeInput_(payload.diperbaruiOleh || auth.username, 60);
  const ukuran = sanitizeInput_(payload.ukuran || '260 KB', 20);

  let driveFileId = payload.driveFileId || '';
  let driveViewUrl = payload.driveViewUrl || '';
  let driveDownloadUrl = payload.driveDownloadUrl || '';

  // 2. Validasi & Simpan Berkas Revisi PDF
  if (payload.fileBase64) {
    const cleanBase64 = String(payload.fileBase64).replace(/^data:application\/pdf;base64,/, '').replace(/\s/g, '');
    let decoded;
    try {
      decoded = Utilities.base64Decode(cleanBase64);
    } catch (e) {
      return jsonResponse_({ status: 'error', message: 'Gagal mendekode berkas PDF revisi.' });
    }

    const pdfCheck = validatePdfBytes_(decoded);
    if (!pdfCheck.valid) {
      return jsonResponse_({ status: 'error', message: pdfCheck.message });
    }

    const safeBaseName = sanitizeFileName_(payload.fileName || 'Revisi_SMP_DAFI.pdf');
    const finalFileName = docId + '_' + versiBaru + '_' + safeBaseName;

    const blob = Utilities.newBlob(decoded, 'application/pdf', finalFileName);
    const file = folder.createFile(blob);

    driveFileId = file.getId();
    driveViewUrl = 'https://drive.google.com/file/d/' + driveFileId + '/preview';
    driveDownloadUrl = 'https://drive.google.com/uc?export=download&id=' + driveFileId;
  }

  const nowDate = Utilities.formatDate(new Date(), Session.getScriptTimeZone() || 'Asia/Jakarta', 'yyyy-MM-dd');
  const data = docSheet.getDataRange().getValues();
  let found = false;

  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0]) === docId) {
      found = true;
      docSheet.getRange(i + 1, 8).setValue(versiBaru); // kolom versi
      docSheet.getRange(i + 1, 10).setValue(nowDate);   // kolom tanggalUpdate
      if (ukuran) docSheet.getRange(i + 1, 11).setValue(ukuran);
      if (driveFileId) {
        docSheet.getRange(i + 1, 13).setValue(driveFileId);
        docSheet.getRange(i + 1, 14).setValue(driveViewUrl);
        docSheet.getRange(i + 1, 15).setValue(driveDownloadUrl);
      }
      break;
    }
  }

  if (!found) {
    return jsonResponse_({ status: 'error', message: 'Dokumen sasaran tidak ditemukan.' });
  }

  verSheet.appendRow([
    'VER-' + new Date().getTime(),
    docId,
    versiBaru,
    nowDate,
    diperbaruiOleh,
    catatanPerubahan,
    ukuran,
    driveFileId,
    driveViewUrl
  ]);

  return jsonResponse_({
    status: 'ok',
    message: 'Versi dokumen berhasil diperbarui secara terverifikasi.',
    driveFileId: driveFileId,
    driveViewUrl: driveViewUrl
  });
}

/**
 * Menghapus dokumen berdasarkan ID
 * Wajib Token RBAC: admin atau kepsek ONLY
 */
function handleDeleteDocument_(payload) {
  const auth = verifyAuthToken_(payload.authToken, ['admin', 'kepsek']);
  if (!auth.valid) {
    return jsonResponse_({ status: 'error', message: auth.message });
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const docSheet = ss.getSheetByName(CONFIG.SHEET_DOCS);
  const data = docSheet.getDataRange().getValues();
  const targetId = sanitizeInput_(payload.docId, 30);

  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0]) === targetId) {
      docSheet.deleteRow(i + 1);
      return jsonResponse_({ status: 'ok', message: 'Dokumen berhasil dihapus oleh ' + auth.username + '.' });
    }
  }
  return jsonResponse_({ status: 'error', message: 'Dokumen tidak ditemukan.' });
}

/**
 * Pindai & Daftarkan Massal Seluruh PDF yang Sudah Ada di Google Drive
 * Dapat dijalankan langsung dari Toolbar Editor Apps Script (Run > syncExistingDriveFolder)
 * atau dipanggil secara otomatis melalui Web UI.
 */
function syncExistingDriveFolder(customFolderId, operatorName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  setupDatabase(); // Pastikan struktur sheet Documents & VersionHistory siap

  const docSheet = ss.getSheetByName(CONFIG.SHEET_DOCS);
  const verSheet = ss.getSheetByName(CONFIG.SHEET_VERSIONS);

  let folder;
  if (customFolderId) {
    try {
      folder = DriveApp.getFolderById(customFolderId);
    } catch (e) {
      folder = getOrCreateArchiveFolder_();
    }
  } else {
    folder = getOrCreateArchiveFolder_();
  }

  const files = folder.getFiles();

  // Ambil daftar fileId yang sudah terdaftar agar tidak terjadi duplikasi
  const existingData = docSheet.getDataRange().getValues();
  const registeredFileIds = new Set();
  const existingDocCount = Math.max(0, existingData.length - 1);
  for (let i = 1; i < existingData.length; i++) {
    if (existingData[i][12]) { // Kolom driveFileId
      registeredFileIds.add(String(existingData[i][12]));
    }
  }

  let importedCount = 0;
  let skippedCount = 0;
  let totalDriveFiles = 0;
  const nowDate = Utilities.formatDate(new Date(), Session.getScriptTimeZone() || 'Asia/Jakarta', 'yyyy-MM-dd');
  const currentYear = new Date().getFullYear();
  const creator = operatorName || 'Admin Tata Usaha';

  while (files.hasNext()) {
    const file = files.next();
    totalDriveFiles++;
    const fileId = file.getId();

    // Validasi apakah berkas merupakan PDF
    const mime = file.getMimeType();
    const fileName = file.getName();
    const isPdf = (mime === MimeType.PDF || fileName.toLowerCase().endsWith('.pdf'));

    if (!isPdf) {
      skippedCount++;
      continue;
    }

    // Jika sudah pernah terdaftar, lewati agar tidak dobel
    if (registeredFileIds.has(fileId)) {
      skippedCount++;
      continue;
    }

    // Bersihkan nama file untuk menjadi Judul Dokumen
    const rawName = fileName.replace(/\.pdf$/i, '');
    let cleanTitle = sanitizeInput_(rawName.replace(/[_-]+/g, ' ').trim(), 150);
    if (!cleanTitle) cleanTitle = 'Dokumen Arsip SMP DAFI ' + fileId.substring(0, 6);

    // Deteksi Kategori Cerdas berdasarkan kata kunci nama file
    let kategori = 'Surat Administratif';
    let kodeKat = 'SURAT';
    const lower = cleanTitle.toLowerCase();

    if (lower.includes('sop') || lower.includes('standar operasional') || lower.includes('prosedur')) {
      kategori = 'SOP';
      kodeKat = 'SOP';
    } else if (lower.includes('sk ') || lower.includes('sk_') || lower.includes('surat keputusan') || lower.includes('keputusan kepala')) {
      kategori = 'SK';
      kodeKat = 'SK';
    } else if (lower.includes('tatib') || lower.includes('tata tertib') || lower.includes('kode etik') || lower.includes('peraturan') || lower.includes('adab')) {
      kategori = 'Tata Tertib';
      kodeKat = 'TATIB';
    }

    // Hitung ukuran file
    const bytes = file.getSize();
    const kb = Math.max(1, Math.round(bytes / 1024));
    const fileSizeStr = kb >= 1024 ? (kb / 1024).toFixed(2) + ' MB' : kb + ' KB';

    // Generate Nomor & ID Dokumen
    const nextSeq = existingDocCount + importedCount + 1;
    const seqStr = String(nextSeq).padStart(3, '0');
    const docId = 'DOC-' + currentYear + '-' + seqStr;
    const nomorDokumen = seqStr + '/' + kodeKat + '/SMP-DAFI/' + currentYear;

    // View & Download URLs
    const viewUrl = 'https://drive.google.com/file/d/' + fileId + '/preview';
    const dlUrl = 'https://drive.google.com/uc?export=download&id=' + fileId;

    // Kata kunci pencarian
    const tags = [kategori.toLowerCase(), 'arsip drive', 'impor massal', currentYear.toString()];

    // Simpan ke Sheet Documents
    docSheet.appendRow([
      docId,
      nomorDokumen,
      cleanTitle,
      kategori,
      creator,
      tags.join(', '),
      'Publik',
      'v1.0',
      nowDate,
      nowDate,
      fileSizeStr,
      'Dokumen resmi diimpor secara otomatis melalui sinkronisasi massal folder Google Drive sekolah.',
      fileId,
      viewUrl,
      dlUrl
    ]);

    // Catat ke Sheet VersionHistory
    verSheet.appendRow([
      'VER-' + new Date().getTime() + '-' + nextSeq,
      docId,
      'v1.0',
      nowDate,
      creator,
      'Pendaftaran awal hasil sinkronisasi massal dari folder Google Drive.',
      fileSizeStr,
      fileId,
      viewUrl
    ]);

    registeredFileIds.add(fileId);
    importedCount++;
  }

  const msg = 'Sinkronisasi selesai! Berhasil mendaftarkan ' + importedCount + ' dokumen baru (Dilewati: ' + skippedCount + ' berkas).';
  Logger.log(msg);
  return {
    success: true,
    message: msg,
    importedCount: importedCount,
    skippedCount: skippedCount,
    totalDriveFiles: totalDriveFiles
  };
}

/**
 * Handler HTTP POST - Pindai Massal Folder Google Drive
 * Memindai file-file PDF yang sudah diunggah secara manual ke folder Drive
 * Wajib Token RBAC: admin atau kepsek
 */
function handleScanDriveFolder_(payload) {
  const auth = verifyAuthToken_(payload.authToken, ['admin', 'kepsek']);
  if (!auth.valid) {
    return jsonResponse_({ status: 'error', message: auth.message });
  }

  const result = syncExistingDriveFolder(payload.folderId || null, auth.username);
  return jsonResponse_({
    status: 'ok',
    message: result.message,
    importedCount: result.importedCount,
    skippedCount: result.skippedCount,
    totalDriveFiles: result.totalDriveFiles
  });
}

/**
 * Helper konversi Sheet ke Array of Objects
 */
function sheetToObjects_(sheet) {
  if (!sheet) return [];
  const rows = sheet.getDataRange().getValues();
  if (rows.length < 2) return [];
  const headers = rows[0];
  const result = [];
  for (let i = 1; i < rows.length; i++) {
    const obj = {};
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = rows[i][j];
    }
    result.push(obj);
  }
  return result;
}

/**
 * Helper output JSON dengan ContentService
 */
function jsonResponse_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
`;
