/**
 * ============================================================================
 * PENGHUBUNG GITHUB PAGES DENGAN GOOGLE APPS SCRIPT (gas-code.js)
 * DDMS - DAFI Document Management System (SMP DAFI)
 * ============================================================================
 * 
 * FUNGSI BERKAS INI:
 * Berkas ini khusus bertindak sebagai jembatan (connector / bridge) antara
 * frontend GitHub Pages dengan backend Google Apps Script (GAS) API.
 * 
 * CARA MENGHUBUNGKAN:
 * 1. Deploy backend Apps Script (Code.gs) sebagai Web App (Anyone / Siapa saja).
 * 2. Salin URL Web App yang berakhiran /exec.
 * 3. Tempelkan URL tersebut ke variabel DEFAULT_WEB_APP_URL di bawah ini.
 *    (Atau tempelkan melalui menu "Koneksi GAS" di antarmuka web).
 * 
 * Jika Anda membuat deployment baru di GAS, CUKUP PERBARUI BERKAS INI.
 */

const GAS_CONFIG = {
  // ==========================================================================
  // TEMPELKAN URL WEB APP GAS ANDA DI BAWAH INI (Berakhiran /exec)
  // Contoh: 'https://script.google.com/macros/s/AKfycbz_XYZ123.../exec'
  // ==========================================================================
  DEFAULT_WEB_APP_URL: '',

  // Pengaturan Komunikasi
  TIMEOUT_MS: 30000,
  STORAGE_KEY_GAS_URL: 'smp_dafi_simdok_gas_url_v1',
  SCHOOL_IDENTITY: 'SMP DAFI Sidoarjo'
};

/**
 * Modul Penghubung Antarmuka GitHub Pages & Backend Google Apps Script (GasConnector)
 * Menggunakan protokol CORS-Safe (fetch text/plain) untuk mencegah blokir preflight di browser
 */
const GasConnector = {
  /**
   * Validasi format URL Web App Google Apps Script resmi
   */
  isValidUrl: function(url) {
    if (!url) return false;
    const s = String(url).trim();
    return s.startsWith('https://script.google.com/macros/s/') && s.endsWith('/exec');
  },

  /**
   * Mendapatkan URL Web App GAS aktif (Prioritas: Penyimpanan Browser -> Default Konfigurasi)
   */
  getActiveUrl: function() {
    try {
      const stored = localStorage.getItem(GAS_CONFIG.STORAGE_KEY_GAS_URL);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (this.isValidUrl(parsed)) return parsed;
      }
    } catch (e) {}
    return GAS_CONFIG.DEFAULT_WEB_APP_URL || '';
  },

  /**
   * Menyimpan URL Web App GAS ke penyimpanan browser
   */
  setActiveUrl: function(url) {
    const cleanUrl = String(url || '').trim();
    try {
      localStorage.setItem(GAS_CONFIG.STORAGE_KEY_GAS_URL, JSON.stringify(cleanUrl));
    } catch (e) {}
    return cleanUrl;
  },

  /**
   * Uji Koneksi / Ping ke Google Apps Script
   */
  ping: async function(overrideUrl) {
    const targetUrl = overrideUrl || this.getActiveUrl();
    if (!this.isValidUrl(targetUrl)) {
      return { status: 'error', message: 'URL Web App GAS tidak valid atau belum diisi.' };
    }
    try {
      const res = await fetch(targetUrl + '?action=ping', {
        method: 'GET',
        redirect: 'follow'
      });
      return await res.json();
    } catch (err) {
      return { status: 'error', message: 'Gagal terhubung ke GAS: ' + err.toString() };
    }
  },

  /**
   * Mengambil daftar seluruh dokumen dan saran standar dari Google Sheets
   */
  getAllDocuments: async function() {
    const targetUrl = this.getActiveUrl();
    if (!this.isValidUrl(targetUrl)) return null;

    try {
      const res = await fetch(targetUrl + '?action=getAll', {
        method: 'GET',
        redirect: 'follow'
      });
      return await res.json();
    } catch (err) {
      console.warn('Gagal memuat arsip dari GAS:', err);
      return null;
    }
  },

  /**
   * Mengirim request POST aman ke Google Apps Script
   * Bebas dari CORS Preflight block karena menggunakan Content-Type: text/plain;charset=utf-8
   */
  sendPost: async function(action, payload, authToken) {
    const targetUrl = this.getActiveUrl();
    if (!this.isValidUrl(targetUrl)) return null;

    const bodyData = Object.assign({}, payload, {
      action: action,
      authToken: authToken || ''
    });

    try {
      const res = await fetch(targetUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(bodyData),
        redirect: 'follow'
      });
      return await res.json();
    } catch (err) {
      console.error('Koneksi POST ke GAS gagal:', err);
      return { status: 'error', message: err.toString() };
    }
  },

  /**
   * Autentikasi Login Pengguna ke Backend GAS
   */
  login: async function(username, password) {
    return await this.sendPost('login', { username: username, password: password });
  },

  /**
   * Unggah dokumen PDF baru ke Google Drive & Google Sheets
   */
  uploadDocument: async function(docPayload, authToken) {
    return await this.sendPost('uploadDocument', docPayload, authToken);
  },

  /**
   * Perbarui versi dokumen PDF yang sudah ada
   */
  updateVersion: async function(versionPayload, authToken) {
    return await this.sendPost('updateVersion', versionPayload, authToken);
  },

  /**
   * Pindai dan daftarkan massal seluruh file PDF di folder Google Drive
   */
  scanDriveFolder: async function(authToken, folderId) {
    return await this.sendPost('scanDriveFolder', { folderId: folderId }, authToken);
  },

  /**
   * Hapus dokumen dari Google Sheets (Khusus Admin / Kepala Sekolah)
   */
  deleteDocument: async function(docId, authToken) {
    return await this.sendPost('deleteDocument', { docId: docId }, authToken);
  },

  /**
   * Tambah saran rekomendasi dokumen standar ke Google Sheets
   */
  addSuggestion: async function(stdPayload, authToken) {
    return await this.sendPost('addSuggestion', stdPayload, authToken);
  },

  /**
   * Ganti kata sandi akun pengguna secara aman
   */
  changePassword: async function(oldPassword, newPassword, authToken) {
    return await this.sendPost('changePassword', { oldPassword: oldPassword, newPassword: newPassword }, authToken);
  }
};

// Ekspos ke objek window global agar langsung dapat digunakan oleh app.js
window.GAS_CONFIG = GAS_CONFIG;
window.GasConnector = GasConnector;
