# 02 — SPESIFIKASI KONTRAK REST API & INTEGRASI FRONTEND-BACKEND
## Portal Web Resmi Balai Monitor Spektrum Frekuensi Radio Kelas I Pekanbaru

---

## 1. Konvensi Arsitektur REST API

Untuk menjamin integrasi mulus dengan `frontend/src/lib/api/client.ts` dan seluruh repositori API di `$lib/repositories/api/`, backend REST API yang akan dibangun **wajib mematuhi konvensi berikut**:

### 1.1. Base URL & Versioning
- **Lingkungan Lokal / Development**: `http://localhost:8000/api/v1/public`
- **Lingkungan Produksi**: `https://balmonpekanbaru.postel.go.id/api/v1/public`
- Seluruh endpoint publik yang dikonsumsi oleh portal frontend diawali dengan namespace prefix `/api/v1/public`. Namespace administratif `/api/v1/admin` dialokasikan khusus untuk CMS dan mutasi data di masa depan.

### 1.2. Format Respons Sukses (Standard Success Envelope)
Seluruh respons sukses HTTP (status code `200 OK`) wajib dibungkus dalam struktur amplop standar:

```json
{
  "success": true,
  "data": {
    "...": "Payload DTO data domain spesifik"
  },
  "meta": {
    "timestamp": "2026-11-05T09:00:00.000Z",
    "version": "1.0.0",
    "sourceMode": "api"
  }
}
```
*Catatan Kritis Klien*: `ApiClient.get<T>(endpoint)` pada frontend mengekstrak `response.data` secara langsung. Jika atribut `data` ditiadakan oleh backend, klien akan mendeteksi payload sebagai respons korup.

### 1.3. Format Respons Gagal (Standard Error Envelope)
Ketika terjadi kesalahan (kode HTTP `4xx` atau `5xx`), backend wajib mengembalikan struktur JSON terstandarisasi:

```json
{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Artikel dengan slug 'monitoring-frekuensi-riau' tidak ditemukan.",
    "details": {
      "slug": "monitoring-frekuensi-riau"
    }
  },
  "meta": {
    "timestamp": "2026-11-05T09:00:00.000Z",
    "version": "1.0.0"
  }
}
```

Daftar Kode Error Backend yang Didukung:
- `BAD_REQUEST` (400): Parameter query tidak valid atau tidak memenuhi syarat.
- `RESOURCE_NOT_FOUND` (404): Entitas slug atau ID dokumen tidak ada di database.
- `VALIDATION_ERROR` (422): Validasi input gagal pada level Pydantic / ORM.
- `RATE_LIMIT_EXCEEDED` (429): Klien melebihi batas request rate limiting.
- `INTERNAL_SERVER_ERROR` (500): Terjadi kegagalan server internal / query crash.

---

## 2. Inventaris 24 Endpoint REST API Publik (25 Metode Reader)

Berikut adalah daftar lengkap 24 endpoint unik HTTP GET yang melayani 25 metode reader frontend:

| No | Domain | HTTP Path | Query / Path Parameters | Tipe DTO Respons | Skema Ajv Terkait |
| :---: | :--- | :--- | :--- | :--- | :--- |
| 1 | **Contacts** | `GET /contacts` | — | `OfficeContactDTO` | `contacts.schema.json` |
| 2 | **Coverage** | `GET /coverage` | — | `CoverageSummaryDTO` | `coverage.schema.json#/properties/summary` |
| 3 | **Coverage** | `GET /coverage/districts` | — | `readonly DistrictCoverageDTO[]` | `coverage.schema.json#/properties/districts` |
| 4 | **Coverage** | `GET /coverage/spectrum-applications` | — | `readonly SpectrumApplicationDTO[]` | `coverage.schema.json#/properties/spectrumApplications` |
| 5 | **Institution** | `GET /institution` | — | `InstitutionProfileDTO` | `institution.schema.json#/properties/profile` |
| 6 | **Institution** | `GET /institution/functions` | — | `readonly OperationalFunctionDTO[]` | `institution.schema.json#/properties/functions` |
| 7 | **Institution** | `GET /institution/leaders` | — | `readonly OrganizationLeaderDTO[]` | `institution.schema.json#/properties/organization/properties/leaders` |
| 8 | **Institution** | `GET /institution/legal-bases` | — | `readonly LegalBasisDTO[]` | `institution.schema.json#/properties/legalBases` |
| 9 | **Performance**| `GET /performance` | `year` (int, default: 2025) | `PerformanceMetricsDTO & { distribution?: PerformanceDistributionDTO }` | `performance.schema.json#/$defs/response` |
| 10 | **Publications**| `GET /articles` | `limit` (int), `category` (str), `featured` (bool) | `readonly NewsArticleDTO[]` | `publications.schema.json#/properties/articles` |
| 11 | **Publications**| `GET /articles/{slug}` | `slug` (path, string) | `NewsArticleDTO` | `publications.schema.json#/properties/articles/items` |
| 12 | **Publications**| `GET /education` | — | `readonly EducationTopicDTO[]` | `publications.schema.json#/properties/education` |
| 13 | **Publications**| `GET /education/{slug}` | `slug` (path, string) | `EducationTopicDTO` | `publications.schema.json#/properties/education/items` |
| 14 | **Publications**| `GET /publications/featured-video` | — | `VideoMediaDTO` | `publications.schema.json#/properties/featuredVideo` |
| 15 | **Public Info** | `GET /documents` | `category` (regulasi\|layanan\|laporan), `year` (str) | `readonly PublicDocumentDTO[]` | `public-information.schema.json#/properties/documents` |
| 16 | **Public Info** | `GET /documents/{id}` | `id` (path, string) | `PublicDocumentDTO` | `public-information.schema.json#/properties/documents/items` |
| 17 | **Public Info** | `GET /ppid` | — | `PpidInfoDTO` | `public-information.schema.json#/properties/ppid` |
| 18 | **Services** | `GET /services` | `featured` (boolean) | `readonly ServiceItemDTO[]` | `services.schema.json#/properties/catalog` |
| 19 | **Services** | `GET /services/{slug}` | `slug` (path, string) | `ServiceItemDTO` | `services.schema.json#/properties/catalog/items` |
| 20 | **Services** | `GET /portals` | `category` (enum) | `readonly PortalItemDTO[]` | `services.schema.json#/properties/portals` |
| 21 | **Services** | `GET /faqs` | — | `readonly FaqItemDTO[]` | `services.schema.json#/properties/faqs` |
| 22 | **Services** | `GET /complaints` | — | `ComplaintInfoDTO` | `services.schema.json#/properties/complaint` |
| 23 | **Site Content**| `GET /site-content/hero` | — | `HeroContentDTO` | `site-content.schema.json#/properties/hero` |
| 24 | **Site Content**| `GET /site-content/homepage` | — | `HomepageEditorialDTO` | `site-content.schema.json#/properties/homepage` |

*Catatan Relasi*: Baris ke-9 (`GET /performance`) melayani **2 metode pembaca frontend**: `getMetrics(year)` dan `getDistribution(year)` pada `ApiPerformanceRepository`. Oleh karena itu, 24 path ini tepat melayani 25 metode pembaca repositori.

---

## 3. Spesifikasi Detail Kontrak & DTO Tiap Domain

### 3.1. Domain: Publications (Berita, Edukasi, & Video)

#### Kontrak `GET /articles` & `GET /articles/{slug}`
- **DTO Interface**:
```typescript
export interface PublicationSourceDTO {
  readonly label: string;
  readonly publisher: string;
  readonly url: string;
}

export interface PublicationMediaDTO {
  readonly type: 'url' | 'local';
  readonly url?: string;
  readonly assetKey?: string;
  readonly alt: string;
  readonly width?: number;
  readonly height?: number;
}

export interface NewsArticleDTO {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly excerpt: string;
  readonly content: readonly string[];          // Paragraf narasi artikel (Array of string)
  readonly publishedAt: string;                 // Format YYYY-MM-DD
  readonly category: string;                    // "Spektrum", "Layanan", "Kegiatan"
  readonly source: PublicationSourceDTO;        // Metadata sumber resmi artikel
  readonly image?: PublicationMediaDTO;         // Gambar sampul
  readonly video?: VideoMediaDTO;               // Video pendukung opsional
  readonly featured: boolean;                   // Menentukan tampil di carousel beranda
  readonly published: boolean;                  // Status publikasi
}
```

- **Contoh Payload JSON Valid Ajv**:
```json
{
  "id": "art-01",
  "slug": "penertiban-frekuensi-ilegal-riau-2026",
  "title": "Balmon Pekanbaru Tingkatkan Pengawasan Frekuensi Ilegal di Perbatasan Riau",
  "excerpt": "Tim gabungan Balai Monitor Spektrum Frekuensi Radio Kelas I Pekanbaru menggelar operasi penertiban frekuensi ilegal di wilayah pesisir.",
  "content": [
    "Balai Monitor Spektrum Frekuensi Radio Kelas I Pekanbaru melaksanakan penertiban intensif.",
    "Operasi ini difokuskan pada pengamanan pita frekuensi maritim dan penerbangan guna mencegah potensi gangguan sinyal radio yang membahayakan keselamatan transportasi publik."
  ],
  "publishedAt": "2026-10-01",
  "category": "Spektrum",
  "source": {
    "label": "Siaran Pers Resmi Balmon Pekanbaru",
    "publisher": "Ditjen SDPPI Komdigi",
    "url": "https://balmonpekanbaru.postel.go.id"
  },
  "image": {
    "type": "url",
    "url": "/images/articles/penertiban-frekuensi-2026.webp",
    "alt": "Petugas Balmon Pekanbaru melakukan monitoring spektrum dengan mobil DF",
    "width": 1280,
    "height": 720
  },
  "featured": true,
  "published": true
}
```

#### Kontrak `GET /education` & `GET /education/{slug}`
- **DTO Interface**:
```typescript
export interface EducationTopicDTO {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly content: readonly string[];
  readonly icon: string;
  readonly source: PublicationSourceDTO;
  readonly image?: PublicationMediaDTO;
  readonly videoId?: string;
}
```

#### Kontrak `GET /publications/featured-video`
- **DTO Interface**:
```typescript
export interface VideoMediaDTO {
  readonly id: string;
  readonly eyebrow?: string;
  readonly title: string;
  readonly ariaLabel: string;
  readonly youtubeUrl: string;
  readonly embedUrl: string;
  readonly thumbnailUrl: string;
  readonly thumbnailAlt: string;
}
```

---

### 3.2. Domain: Public Information (Dokumen & PPID)

#### Kontrak `GET /documents` & `GET /documents/{id}`
- **DTO Interface**:
```typescript
export type DocumentCategoryDTO = 'regulasi' | 'layanan' | 'laporan';

export interface PublicDocumentDTO {
  readonly id: string;
  readonly title: string;
  readonly category: DocumentCategoryDTO;       // 'regulasi' | 'layanan' | 'laporan'
  readonly year: string;                        // Wajib string 4 digit (misal: "2024")
  readonly number?: string;                     // e.g. "Permenkominfo No. 17 Tahun 2021"
  readonly description: string;
  readonly source: {
    readonly label: string;
    readonly publisher: string;
    readonly url: string;
  };
  readonly fileUrl?: string;                    // URL unduhan PDF resmi
}
```

- **Contoh Payload JSON Valid Ajv**:
```json
{
  "id": "doc-reg-01",
  "title": "Permenkominfo No. 17 Tahun 2021 tentang Organisasi dan Tata Kerja Balai Monitor",
  "category": "regulasi",
  "year": "2021",
  "number": "Permenkominfo No. 17 Tahun 2021",
  "description": "Peraturan Menteri Komunikasi dan Informatika Republik Indonesia tentang Organisasi dan Tata Kerja Unit Pelaksana Teknis Bidang Monitor Spektrum Frekuensi Radio.",
  "source": {
    "label": "JDIH Komdigi",
    "publisher": "Kementerian Komunikasi dan Digital RI",
    "url": "https://jdih.kominfo.go.id"
  },
  "fileUrl": "https://jdih.kominfo.go.id/produk_hukum/unduh/id/837/t/permenkominfo+17+2021"
}
```

#### Kontrak `GET /ppid`
- **DTO Interface**:
```typescript
export interface PpidInfoDTO {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly legalBasis: string;
  readonly procedures: readonly { readonly step: string; readonly detail: string }[];
  readonly rights: readonly string[];
  readonly contact: {
    readonly officer: string;
    readonly email: string;
    readonly phone: string;
    readonly deskLocation: string;
  };
  readonly source: {
    readonly label: string;
    readonly publisher: string;
    readonly url: string;
  };
}
```

---

### 3.3. Domain: Services (Katalog, Portal, FAQ, Aduan)

#### Kontrak `GET /services` & `GET /services/{slug}`
- **DTO Interface**:
```typescript
export interface ServiceItemDTO {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly description: string;
  readonly icon: string;                        // Identifier nama icon (misal: "Radio", "Ruler")
  readonly featured: boolean;
  readonly homeOrder: number;                   // Urutan tampilan pada kartu beranda
  readonly active: boolean;                     // Status aktif operasional
  readonly requirements?: readonly string[];    // Daftar persyaratan dokumen
  readonly steps?: readonly string[];           // Alur langkah pengajuan
  readonly officialUrl?: string;                // Tautan ke SIMS SDPPI
}
```

- **Contoh Payload JSON Valid Ajv**:
```json
{
  "id": "srv-01",
  "slug": "izin-stasiun-radio-isr",
  "title": "Izin Stasiun Radio (ISR)",
  "summary": "Layanan permohonan, perpanjangan, dan verifikasi teknis Izin Stasiun Radio untuk seluruh dinas telekomunikasi di Provinsi Riau.",
  "description": "Izin Stasiun Radio (ISR) merupakan izin penggunaan spektrum frekuensi radio untuk stasiun radio tertentu sesuai peruntukannya.",
  "icon": "Radio",
  "featured": true,
  "homeOrder": 1,
  "active": true,
  "requirements": [
    "Identitas pemohon (NIB / KTP)",
    "Data teknis perangkat radio telekomunikasi",
    "Sertifikat alat dan perangkat telekomunikasi (Postel)"
  ],
  "steps": [
    "Pengajuan berkas online melalui portal e-Licensing SIMS SDPPI",
    "Analisis teknis perhitungan interferensi oleh Balmon Pekanbaru",
    "Penerbitan Surat Pemberitahuan Pembayaran (SPP) BHP Frekuensi",
    "Penerbitan dokumen ISR resmi"
  ],
  "officialUrl": "https://sdppi.kominfo.go.id"
}
```

#### Kontrak `GET /portals`
- Mengembalikan daftar tautan eksternal perizinan/pembayaran:
```typescript
export interface PortalItemDTO {
  readonly id: string;
  readonly title: string;
  readonly category: 'panduan' | 'perizinan' | 'pembayaran' | 'pengaduan' | 'nelayan';
  readonly url: string;
  readonly sourceUrl: string;
}
```

#### Kontrak `GET /complaints`
- Mengembalikan SOP dan saluran penanganan gangguan:
```typescript
export interface ComplaintInfoDTO {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly actionLabel: string;
  readonly requiredInformation: readonly string[];
  readonly steps: readonly { readonly title: string; readonly detail: string }[];
  readonly channels: {
    readonly phone: string;
    readonly email: string;
    readonly office: string;
    readonly onlinePortal: string;
  };
}
```

---

### 3.4. Domain: Contacts (Kontak & Jam Pelayanan)

#### Kontrak `GET /contacts`
- **DTO Interface**:
```typescript
export interface OfficeContactDTO {
  readonly officeName: string;
  readonly parentAgency: string;
  readonly address: {
    readonly street: string;
    readonly city: string;
    readonly postalCode: string;
    readonly directions: string;
  };
  readonly phone: { readonly display: string; readonly uri: string };
  readonly whatsapp: { readonly display: string; readonly uri: string };
  readonly email: { readonly display: string; readonly uri: string };
  readonly serviceHours: { readonly days: string; readonly time: string; readonly note: string };
  readonly location: {
    readonly latitude: number;
    readonly longitude: number;
    readonly targetUrl: string;
    readonly embedUrl: string;
  };
  readonly socials: {
    readonly instagram: { readonly label: string; readonly url: string };
  };
}
```

---

### 3.5. Domain: Coverage (Wilayah & Stasiun Monitoring)

#### Kontrak `GET /coverage`
- Mengembalikan ringkasan wilayah pengawasan Riau:
```typescript
export interface CoverageSummaryDTO {
  readonly totalDistricts: number;              // 12 Kab/Kota
  readonly totalFixedStations: number;          // Jumlah stasiun monitoring tetap
  readonly totalMobileStations: number;         // Jumlah unit mobil monitoring DF
  readonly activeMonitoringHours: string;       // "24/7"
}
```

#### Kontrak `GET /coverage/districts`
- Mengembalikan daftar 12 kabupaten/kota di Provinsi Riau dengan status coverage dan koordinat pos monitoring:
```typescript
export interface DistrictCoverageDTO {
  readonly id: string;
  readonly name: string;
  readonly capital: string;
  readonly stationType: 'fixed' | 'mobile' | 'planned';
  readonly status: 'aktif' | 'terjadwal' | 'pengembangan';
  readonly coordinates: { readonly lat: number; readonly lng: number };
  readonly notes: string;
}
```

---

### 3.6. Domain: Performance (Metrik Kinerja & Distribusi Izin)

#### Kontrak `GET /performance`
- **Query Params**: `year` (integer, default: 2025).
- **Tipe Data Gabungan (Composite DTO)**:
```typescript
export interface PerformanceMetricItemDTO {
  readonly label: string;
  readonly value: string;
  readonly target: string;
  readonly achievementPercent: number;          // Wajib tipe number murni (misal: 104.2)
}

export interface PerformanceMetricsDTO {
  readonly year: number;
  readonly eyebrow: string;
  readonly title: { readonly first: string; readonly second: string };
  readonly description: string;
  readonly metrics: readonly PerformanceMetricItemDTO[];
  readonly documentId?: string;
  readonly chart?: {
    readonly eyebrow: string;
    readonly title: string;
    readonly year: string;
    readonly months: readonly string[];
    readonly averageAvailability: string;
    readonly targetAvailability: string;
    readonly areaPath: string;
    readonly linePath: string;
  };
}

export interface PerformanceDistributionDTO {
  readonly total: number;
  readonly items: readonly {
    readonly label: string;
    readonly count: number;
    readonly color: string;
  }[];
}
```

---

### 3.7. Domain: Institution (Profil, Tugas, Pimpinan, Hukum)

- `GET /institution`: Profil umum balai, visi, misi, dan nilai BerAKHLAK.
- `GET /institution/functions`: 9 tugas dan fungsi pokok UPT Balmon Pekanbaru.
- `GET /institution/leaders`: Struktur pejabat struktural (Kepala Balai, Kasubag TU, Katimja).
- `GET /institution/legal-bases`: Daftar peraturan perundang-undangan pembentukan dan kewenangan.

---

### 3.8. Domain: Site Content (Hero & Homepage Editorial)

- `GET /site-content/hero`: Headline kampanye beranda, subtitle, dan label tombol CTA.
- `GET /site-content/homepage`: Pengaturan menu akses cepat (*Quick Links*) dan susunan seksi beranda.

---

## 4. Penanganan Toleransi Transisi & Kompatibilitas Legacy

Frontend memiliki mekanisme *graceful degradation* pada mapper dan repositori untuk mengantisipasi masa transisi pengembangan backend:

1. **Normalisasi Media Berita (`normalizeLegacyMedia`)**:
   Jika backend awal belum memisahkan `image: { url, alt }` dan hanya mengembalikan string URL flat (`image: "/path/img.webp"`), fungsi normalisasi di `publications.repository.ts` akan membungkusnya secara otomatis ke bentuk objek standar.
2. **Fallback Gambar Placeholder**:
   Jika artikel atau topik edukasi tidak memiliki gambar sampul, frontend menyematkan placeholder SVG `/images/placeholders/publication-16x9.svg`.
3. **Penyelarasan Tipe Number & String**:
   Seluruh nilai numerik pada metrik kinerja atau persentase distrik **wajib dikirimkan sebagai tipe number murni** (bukan string berformat `"100%"`), agar pemformatan lokal `Intl.NumberFormat('id-ID')` di frontend berjalan konsisten.

