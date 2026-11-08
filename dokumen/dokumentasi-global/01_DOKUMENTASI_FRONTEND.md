# 01 — DOKUMENTASI ARSITEKTUR & IMPLEMENTASI FRONTEND
## Portal Web Resmi Balai Monitor Spektrum Frekuensi Radio Kelas I Pekanbaru

---

## 1. Ikhtisar Arsitektur Frontend

Aplikasi frontend Balmon Pekanbaru dirancang dengan arsitektur enterprise modern berbasis **SvelteKit 2** dan **Svelte 5**, yang mengedepankan performa tinggi, kehandalan render, standar aksesibilitas internasional (WCAG 2.2 AA), serta pemisahan tanggung jawab (*Separation of Concerns*) yang ketat antara lapisan presentasi (UI) dan lapisan data.

```
+--------------------------------------------------------------------------+
| LAPISAN UI / VIEW (Svelte 5 Runes)                                       |
| - 11 Route Pages (+page.svelte) & Shared Shell (Navbar, Footer, A11y)     |
| - State Reaktivitas: $state, $derived, $props, $effect                   |
+--------------------------------------------------------------------------+
                                    |
                                    v
+--------------------------------------------------------------------------+
| LAPISAN VIEW-MODEL & MAPPERS ($lib/mappers/)                             |
| - Memetakan Wire DTOs menjadi UI View-Models (format tanggal, badge, dsb)|
+--------------------------------------------------------------------------+
                                    |
                                    v
+--------------------------------------------------------------------------+
| REPOSITORY PROVIDER PATTERN ($lib/repositories/provider.ts)              |
| - Penentu Sumber Data Modular (Static JSON vs REST API)                  |
| - 8 Domain Readers Asinkron                                              |
+--------------------------------------------------------------------------+
                  |                                        |
                  v (Mode "static")                        v (Mode "api")
+------------------------------------+   +---------------------------------+
| STATIC REPOSITORIES                |   | API REPOSITORIES                |
| - Membaca 22 Canonical JSON        |   | - ApiClient ($lib/api/client.ts)|
| - Lokasi: $lib/data/*              |   | - Schema Validation (Ajv 2020)  |
+------------------------------------+   +---------------------------------+
                                                           |
                                                           v
                                         +---------------------------------+
                                         | BACKEND REST API (TASK 6)       |
                                         | Target: /api/v1/public/*        |
                                         +---------------------------------+
```

---

## 2. Stack Teknologi & Pustaka Utama

| Komponen | Pustaka / Teknologi | Versi | Peran & Tanggung Jawab |
| :--- | :--- | :---: | :--- |
| **Meta-Framework** | `@sveltejs/kit` | `^2.70.3` | Routing, Server-Side Rendering (SSR), Prerendering, Lifecycle Management. |
| **Compiler / UI Core**| `svelte` | `^5.57.1` | Kompilasi reaktif berbasis **Runes** (`$state`, `$derived`, `$props`). |
| **Styling Engine** | `tailwindcss` + `@tailwindcss/vite` | `^4.3.3` | Utility-first CSS, modern styling, dark/contrast theme tokens. |
| **Headless UI** | `bits-ui` | `^1.0.0` | Komponen primitif dengan aksesibilitas terjamin (Dialog, Accordion, Dropdown). |
| **Iconography** | `lucide-svelte` | `^0.475.0` | Ikon SVG teroptimasi untuk instansi pemerintah. |
| **Peta Interaktif** | `d3-geo` + `topojson-client` | `^3.1.0` | Render visualisasi vektor wilayah Provinsi Riau dan titik pos monitoring. |
| **Motion Engine** | `gsap` | `^3.15.0` | *Spectral Wave Transition Engine* (LUT gelombang frekuensi radio). |
| **Smooth Scroll** | `lenis` | `^1.3.26` | Pengguliran halaman halus (otomatis dinonaktifkan jika `prefers-reduced-motion`). |
| **Contract Validator**| `ajv` | `^8.17.1` | Validasi skema runtime JSON Schema Draft 2020-12 sebelum data masuk ke UI. |
| **Testing** | `vitest` | `^4.1.11` | Unit testing untuk kontrak, mappers, repositori, dan aksesibilitas. |

---

## 3. Struktur Direktori Proyek (`frontend/`)

```
frontend/
├── scripts/
│   └── data/
│       ├── validate.js                  # Skrip verifikasi integritas 22 canonical JSON
│       └── test-provider-switching.js  # Skrip pengujian peralihan mode provider (static <-> api)
├── src/
│   ├── app.html                         # Dokumen HTML dasar & viewport setup
│   ├── app.css                          # Impor Tailwind v4 & custom theme utilities
│   ├── lib/
│   │   ├── accessibility/               # Logika a11y: font scale, contrast state, localStorage
│   │   ├── api/                         # HTTP Client, Error Taxonomy, Request Timeout
│   │   ├── config/                      # Pengaturan data source (BALMON_* env resolver)
│   │   ├── contracts/                   # JSON Schemas (Draft 2020-12) & TypeScript DTO types
│   │   ├── data/                        # 22 Canonical Modular JSON files (8 Domain)
│   │   ├── mappers/                     # Konversi DTO mentah ke ViewModel antarmuka
│   │   ├── motion/                      # Spectral GSAP transition engine & reduced motion check
│   │   └── repositories/                # Abstraksi Provider Pattern
│   │       ├── interfaces/              # 8 Domain Reader interfaces
│   │       ├── static/                  # Repositori pembaca JSON lokal
│   │       ├── api/                     # Repositori pemanggil REST API backend
│   │       └── provider.ts              # Selector factory repositori
│   └── routes/                          # 11 Rute Navigasi SvelteKit
│       ├── +layout.svelte               # Root Layout pembungkus seluruh aplikasi
│       ├── +layout.ts                   # Konfigurasi prerender global
│       ├── _shell/                      # Komponen Shell: Navbar, MegaMenu, MobileNav, Footer
│       ├── (beranda)/                   # Rute Beranda (/)
│       ├── profil/                      # Rute Profil Balai (/profil)
│       ├── layanan/                     # Rute Layanan Publik (/layanan & /layanan/pengaduan-gangguan)
│       ├── informasi-publik/            # Rute Dokumen & PPID (/informasi-publik & /ppid)
│       ├── publikasi/                   # Rute Berita & Edukasi (/publikasi, /berita/[slug], /edukasi)
│       └── kontak/                      # Rute Kontak & Lokasi Kantor (/kontak)
├── static/                              # File aset statis: gambar WebP, logo SVG, fonts woff2
├── svelte.config.js                     # Konfigurasi adapter-auto & preprocessing Svelte
├── tsconfig.json                        # Konfigurasi TypeScript strict mode
└── vite.config.ts                       # Konfigurasi build Vite, Tailwind v4 plugin, & envPrefix
```

---

## 4. Inventaris 11 Rute & 12 Tampilan Halaman (Route Inventory)

Seluruh halaman telah dioptimasi dengan `export const prerender = true;` pada masing-masing loader `+page.ts`.

| Rute URL | Berkas Komponen | Fungsi & Konten Halaman | Repositori Data yang Digunakan |
| :--- | :--- | :--- | :--- |
| **`/`** | `src/routes/(beranda)/+page.svelte` | **Beranda Utama**: Hero banner interaktif, 4 layanan unggulan, peta pengawasan 12 kab/kota Riau, sorotan berita, video profil balai, dan kontak cepat. | `SiteContentReader`, `ServicesReader`, `CoverageReader`, `PublicationsReader`, `ContactsReader` |
| **`/profil`** | `src/routes/profil/+page.svelte` | **Profil Institusi**: Visi & misi, 9 tugas & fungsi Permenkominfo 17/2021, struktur pimpinan balai, serta landasan hukum pembentukan. | `InstitutionReader` |
| **`/layanan`** | `src/routes/layanan/+page.svelte` | **Katalog Layanan**: Daftar perizinan spektrum radio, alur aplikasi SIMS SDPPI, biaya BHP frekuensi, FAQ interaktif, dan modal detail layanan. | `ServicesReader` |
| **`/layanan/pengaduan-gangguan`** | `src/routes/layanan/pengaduan-gangguan/+page.svelte` | **Pengaduan Gangguan Frekuensi**: Alur 4 tahap penanganan interferensi radio, kontak aduan resmi, serta formulir unduh laporan gangguan. | `ServicesReader` |
| **`/informasi-publik`** | `src/routes/informasi-publik/+page.svelte` | **Informasi Publik & Regulasi**: Unduhan dokumen regulasi, standar pelayanan, laporan tahunan (LAKIP/SAKIP), serta filter tahun & kategori. | `PublicInfoReader` |
| **`/informasi-publik/ppid`** | `src/routes/informasi-publik/ppid/+page.svelte` | **Portal Layanan PPID**: Hak pemohon informasi publik sesuai UU KIP No. 14/2008, SOP permohonan informasi, dan kontak meja PPID. | `PublicInfoReader` |
| **`/publikasi`** | `src/routes/publikasi/+page.svelte` | **Pusat Publikasi**: Agregasi berita terbaru seputar monitoring spektrum dan topik edukasi frekuensi radio untuk masyarakat umum. | `PublicationsReader` |
| **`/publikasi/berita`** | `src/routes/publikasi/berita/+page.svelte` | **Indeks Berita**: Daftar seluruh siaran pers dan berita kegiatan balai dengan paginasi dan filter kategori. | `PublicationsReader` |
| **`/publikasi/berita/[slug]`** | `src/routes/publikasi/berita/[slug]/+page.svelte` | **Detail Berita**: Tampilan artikel penuh, metadata publikasi, gambar sampul WebP, dan rekomendasi artikel terkait. | `PublicationsReader` |
| **`/edukasi`** | `src/routes/edukasi/+page.svelte` | **Edukasi Spektrum**: Kartu materi edukatif mengenai bahaya interferensi radio penerbangan, ISR nelayan, dan legalitas perangkat telekomunikasi. | `PublicationsReader` |
| **`/kontak`** | `src/routes/kontak/+page.svelte` | **Kontak & Lokasi Kantor**: Alamat fisik Jl. Garuda Pekanbaru, jam layanan PTSP, tautan WhatsApp resmi, email pengaduan, dan Google Maps embed. | `ContactsReader` |
| **`* (404)`** | `src/routes/+error.svelte` | **Halaman Error**: Tampilan penanganan error rute tidak ditemukan atau kegagalan koneksi sistem dengan navigasi kembali ke beranda. | Statis Shell |

---

## 5. Arsitektur Repository Provider Pattern

Inti dari kemudahan integrasi backend pada repositori ini terletak pada **Repository Provider Pattern** ([frontend/src/lib/repositories/provider.ts](file:///d:/KERJA/magang%20hub/batch2/Balaimonitor/balmon-pekanbaru/frontend/src/lib/repositories/provider.ts)).

### 5.1. Prinsip Desain
- Antarmuka UI (`+page.svelte`) dan loader (`+page.ts`) **tidak pernah** melakukan `import` berkas JSON secara langsung atau melakukan `fetch()` mentah ke URL API.
- Seluruh pengambilan data dilakukan melalui **8 Domain Reader Interfaces** yang mengembalikan `Promise<DTO>`.
- Provider Selector membaca variabel lingkungan untuk menentukan apakah repositori akan memuat data dari berkas JSON lokal (`static`) atau melakukan panggilan HTTP ke backend REST API (`api`).

### 5.2. 8 Domain Reader Interfaces

```typescript
// Lokasi: frontend/src/lib/repositories/interfaces/index.ts
export interface ContactsReader {
  getOfficeContact(): Promise<OfficeContactDTO>;
}

export interface ServicesReader {
  getCatalog(options?: { featuredOnly?: boolean }): Promise<readonly ServiceItemDTO[]>;
  getServiceBySlug(slug: string): Promise<ServiceItemDTO | undefined>;
  getPortals(category?: ServicePortalCategory): Promise<readonly PortalItemDTO[]>;
  getFaqs(): Promise<readonly FaqItemDTO[]>;
  getComplaintInfo(): Promise<ComplaintInfoDTO>;
}

export interface PublicInfoReader {
  getDocuments(filter?: { category?: DocumentCategoryDTO; year?: string }): Promise<readonly PublicDocumentDTO[]>;
  getDocumentById(id: string): Promise<PublicDocumentDTO | undefined>;
  getPpidInfo(): Promise<PpidInfoDTO>;
}

export interface PublicationsReader {
  getArticles(filter?: { limit?: number; category?: string; featured?: boolean }): Promise<readonly NewsArticleDTO[]>;
  getArticleBySlug(slug: string): Promise<NewsArticleDTO | undefined>;
  getEducationTopics(): Promise<readonly EducationTopicDTO[]>;
  getEducationTopicBySlug(slug: string): Promise<EducationTopicDTO | undefined>;
  getFeaturedVideo(): Promise<VideoMediaDTO>;
}

export interface InstitutionReader {
  getProfile(): Promise<InstitutionProfileDTO>;
  getFunctions(): Promise<readonly OperationalFunctionDTO[]>;
  getLeaders(): Promise<readonly OrganizationLeaderDTO[]>;
  getLegalBases(): Promise<readonly LegalBasisDTO[]>;
}

export interface CoverageReader {
  getDistricts(): Promise<readonly DistrictCoverageDTO[]>;
  getSpectrumApplications(): Promise<readonly SpectrumApplicationDTO[]>;
  getSummary(): Promise<CoverageSummaryDTO>;
}

export interface PerformanceReader {
  getMetrics(year?: number): Promise<PerformanceMetricsDTO>;
  getDistribution(year?: number): Promise<PerformanceDistributionDTO>;
}

export interface SiteContentReader {
  getHero(): Promise<HeroContentDTO>;
  getHomepageEditorial(): Promise<HomepageEditorialDTO>;
}
```

### 5.3. Konfigurasi Peralihan Mode (`BALMON_*_SOURCE`)

Pengembang dapat menyetel sumber data secara global maupun modular per domain pada `frontend/.env`:

```env
# Default global untuk seluruh domain (opsi: "static" | "api")
BALMON_DATA_SOURCE_DEFAULT=static

# URL dasar endpoint publik backend
BALMON_API_BASE_URL=http://localhost:8000/api/v1/public

# Override spesifik per domain (Fitur transisi bertahap / Hybrid)
BALMON_CONTACTS_SOURCE=api
BALMON_SERVICES_SOURCE=api
BALMON_PUBLICATIONS_SOURCE=api
BALMON_PUBLIC_INFO_SOURCE=static
BALMON_INSTITUTION_SOURCE=static
BALMON_COVERAGE_SOURCE=static
BALMON_PERFORMANCE_SOURCE=static
BALMON_SITE_CONTENT_SOURCE=static
```

Jika `BALMON_PUBLICATIONS_SOURCE=api`, maka pemanggilan `getPublicationsReader().getArticles()` akan memicu HTTP request ke `http://localhost:8000/api/v1/public/articles`. Namun jika backend belum siap untuk domain lain, domain tersebut tetap berjalan mulus menggunakan data lokal `static`.

---

## 6. Lapisan Klien HTTP & Validasi Kontrak Runtime

### 6.1. Standar Perilaku `ApiClient` (`frontend/src/lib/api/client.ts`)
Saat repositori beralih ke mode `api`, pemanggilan HTTP ditangani oleh kelas `ApiClient`:
- **Batas Waktu (Timeout)**: 8.000 milidetik (8 detik). Jika backend tidak merespons dalam 8 detik, client akan melempar `TimeoutError` secara otomatis melalui `AbortController`.
- **Header Standar**:
  ```http
  Accept: application/json
  User-Agent: BalmonPekanbaru-WebPortal/1.0
  ```
- **Unwrapping Otomatis**: Klien mengekstrak properti `data` dari amplop `{ success: true, data: T, meta: { ... } }`.
- **Taksonomi Error Terstruktur**:
  - `NetworkError`: Kegagalan koneksi TCP, DNS lookup gagal, atau backend offline.
  - `TimeoutError`: Respons melebihi 8000ms.
  - `NotFoundError`: Kode HTTP 404 (misal: slug berita tidak ada di database).
  - `HttpError`: Kode HTTP 4xx atau 5xx lainnya.
  - `ContractViolationError`: Skema data yang dikembalikan backend tidak lolos validasi Ajv.

### 6.2. Validasi Skema Ajv Runtime (`assertValidContract`)
Sebelum data diserahkan ke komponen antarmuka, repositori API menjalankan validasi skema ketat:
```typescript
import { assertValidContract } from '$lib/contracts/validator';
import schema from '$lib/contracts/schemas/publications.schema.json';

const data = await this.client.get<unknown>('/articles');
assertValidContract(data, schema.properties.articles, 'ArticlesResponse');
```
*Catatan Penting untuk Backend*: Jika backend mengirimkan atribut yang tidak sesuai tipe (misalnya mengirim integer pada kolom yang wajib string, atau mengabaikan properti wajib), `assertValidContract` akan melempar `ContractViolationError` dan menolak merender data korup ke halaman.

---

## 7. Sistem Desain, Interaksi, & Aksesibilitas

### 7.1. Palet Warna & Identitas Visual
- **Primary Navy**: `#0B2A4A` (Warna resmi kredibilitas Komdigi).
- **Secondary Slate**: `#1E3A5F` (Elemen navigasi dan pembatas kartu).
- **Accent Gold / Amber**: `#D97706` / `#F59E0B` (Aksen spektrum frekuensi radio).
- **Background Light**: `#F8FAFC` & `#FFFFFF`.

### 7.2. Aksesibilitas Terintegrasi (WCAG 2.2 AA)
- Panel mengambang di pojok kanan bawah memungkinkan pengguna instansi publik untuk:
  1. Mengubah skala font tampilan dari **100%**, **115%**, **130%**, hingga **150%** secara instan.
  2. Mengaktifkan **Mode Kontras Tinggi** (`data-contrast="high"`) untuk rasio kontras teks minimum 7:1.
- Seluruh status a11y tersimpan secara aman di `localStorage` (`balmon:accessibility:v1`) tanpa menyimpan identitas pengguna.
- Seluruh gambar ilustrasi memiliki teks `alt` deskriptif yang bermakna.

### 7.3. Interaksi Spektral (GSAP & Lenis)
- Transisi halaman menggunakan *Spectral LUT Wave* yang mensimulasikan visualisasi spektrum frekuensi radio.
- Pengguliran halus (*smooth scrolling*) dikendalikan oleh Lenis 1.3.26. Jika sistem mendeteksi `prefers-reduced-motion: reduce`, seluruh animasi berat dinonaktifkan secara otomatis demi kenyamanan pengguna.

