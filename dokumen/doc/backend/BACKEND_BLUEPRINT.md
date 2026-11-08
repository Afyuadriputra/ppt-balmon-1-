# BACKEND_BLUEPRINT.md

## BALMON PEKANBARU — RUST BACKEND TECHNICAL BLUEPRINT

**Document ID:** BE-BP-001
**Version:** 1.1.0
**Status:** DRAFT — M0 Architecture Finalization
**Date:** 5 November 2026
**Project:** Portal Balai Monitor Spektrum Frekuensi Radio Kelas I Pekanbaru
**Repository:** `D:\KERJA\magang hub\batch2\Balaimonitor\balmon-pekanbaru`
**Owner:** Backend Engineering
**Architecture:** Feature-Based Modular Monolith + 4-Layer Clean Architecture

---

# I. PROJECT OVERVIEW

## 1.1 Purpose

Dokumen ini merupakan spesifikasi arsitektur teknis utama untuk pengembangan backend Portal Balmon Pekanbaru.

Dokumen digunakan oleh developer dan AI coding agent sebagai pedoman dalam merancang, mengimplementasikan, menguji, dan mengintegrasikan backend dengan frontend SvelteKit yang telah tersedia.

Backend bertanggung jawab menyediakan:

1. REST API publik yang kompatibel dengan frontend.
2. Persistensi data dinamis menggunakan PostgreSQL.
3. Administrative API untuk pengelolaan konten.
4. Authentication, authorization, dan role-based access control.
5. Caching dan optimasi akses data.
6. Pengelolaan dokumen dan media.
7. Audit perubahan administratif.
8. Mekanisme migrasi data canonical frontend.
9. Observability, keamanan, dan kesiapan deployment.

Pengembangan menggunakan Rust dan Axum dengan pendekatan Modular Monolith untuk menjaga sistem tetap ringan, modular, dan mudah dikelola oleh solo developer.

## 1.2 Engineering objectives

| Objective       | Target desain                                            |
| --------------- | -------------------------------------------------------- |
| Correctness     | Data dan respons sesuai kontrak frontend                 |
| Security        | Admin API terlindungi dan tervalidasi                    |
| Performance     | Asynchronous I/O, pooling, query optimization, caching   |
| Maintainability | Struktur modul dengan empat layer yang konsisten         |
| Reliability     | Transaksi, validasi, error handling, graceful shutdown   |
| Testability     | Unit, integration, contract, dan security testing        |
| Scalability     | Modular monolith yang dapat ditingkatkan secara bertahap |
| Compatibility   | Frontend tidak membutuhkan redesign                      |
| Operability     | Logging, metrics, backup, dan recovery                   |

Target performa numerik pada dokumen ini merupakan sasaran pengujian, bukan hasil benchmark yang telah terbukti.

## 1.3 Scope

### In scope

- Rust Axum HTTP server.
- PostgreSQL persistence.
- SeaORM entities dan repositories.
- SeaORM versioned migrations.
- Canonical JSON migration dan seeding.
- 24 Public REST API.
- Admin REST API untuk CMS.
- Session-based authentication.
- RBAC dan permission enforcement.
- Tower middleware.
- Moka in-memory caching.
- Media metadata dan upload.
- Content publishing workflow.
- Structured audit logging.
- API contract validation.
- Backend/frontend integration testing.
- Production deployment preparation.

### Out of scope untuk baseline

- Sistem pengajuan ISR secara transaksional.
- Pembayaran atau payment gateway.
- Pengelolaan tiket pengaduan internal secara penuh.
- Sistem permohonan PPID baru.
- Integrasi langsung dengan database operasional kementerian.
- Live telemetry perangkat monitoring radio.
- Microservices.
- Kubernetes.
- Message broker atau Kafka.
- Distributed caching sebagai dependensi wajib.
- Redis/Valkey sejak tahap pertama.
- Pengembangan ulang UI website publik.
- Penggantian Repository Provider Pattern frontend.

Fitur di luar scope hanya dapat ditambahkan melalui kebutuhan dan keputusan arsitektur yang disetujui.

## 1.4 Architecture status terminology

Setiap keputusan dalam dokumentasi menggunakan status:

- **CONFIRMED:** telah diperiksa dari source atau data aktual.
- **SELECTED:** pilihan teknologi atau pendekatan yang sudah ditentukan dalam perencanaan.
- **PROPOSED:** rancangan yang belum difinalisasi.
- **UNRESOLVED:** membutuhkan pemeriksaan atau keputusan lebih lanjut.

AI Agent tidak boleh menganggap seluruh desain yang berstatus PROPOSED sebagai implementasi final.

---

# II. SYSTEM CONTEXT & FUNCTIONAL REQUIREMENTS

## 2.1 System context

Sistem terdiri atas:

**Public Website**

Frontend SvelteKit yang menyediakan informasi kepada masyarakat.

**Admin CMS**

Antarmuka administratif untuk mengelola konten yang menjadi tanggung jawab Balmon.

**Rust Backend**

Axum REST API yang menangani request, validasi, autentikasi, business rules, database access, dan caching.

**PostgreSQL**

Penyimpanan utama untuk konten dinamis dan data administratif.

**Static Resources**

Sumber JSON yang tetap dikelola sebagai konten statis tervalidasi.

**Media Storage**

Penyimpanan gambar atau dokumen yang diunggah melalui CMS.

## 2.2 High-level architecture

```text
                    PUBLIC USERS
                         |
                         v
                  SVELTEKIT WEBSITE
                         |
                         v
                  HTTPS / REVERSE PROXY
                         |
                         v
                  RUST AXUM BACKEND
                         |
               TOWER MIDDLEWARE STACK
                         |
               +---------+---------+
               |                   |
               v                   v
          PUBLIC API            ADMIN API
          GET ONLY              AUTH + RBAC
               |                   |
               +---------+---------+
                         |
                  FEATURE MODULES
                         |
                  APPLICATION LAYER
                         |
                  DOMAIN RULES
                         |
                  REPOSITORY PORTS
                         |
                  INFRASTRUCTURE
                         |
             +-----------+-----------+
             |           |           |
             v           v           v
         POSTGRESQL     MOKA       STORAGE
```

Diagram merupakan gambaran komponen. Dependency kode mengikuti ketentuan Clean Architecture pada Bab IV.

## 2.3 User roles

### Public Visitor

Dapat mengakses informasi publik tanpa login.

### Content Editor

Dapat membuat dan mengubah draft konten yang diizinkan.

### Reviewer / Publisher

Dapat meninjau dan menerbitkan konten sesuai permission.

### Data Operator

Dapat memperbarui data operasional atau statistik sesuai penugasan.

### Super Admin

Mengelola akun, hak akses, konfigurasi yang diizinkan, dan seluruh modul administratif.

Hak akses tepatnya ditetapkan melalui permission matrix yang diuji pada backend.

## 2.4 Public functional requirements

Backend harus menyediakan informasi mengenai:

1. Kontak kantor dan jam layanan.
2. Wilayah kerja dan sektor pemanfaatan spektrum.
3. Profil instansi, tugas, dasar hukum, dan pimpinan.
4. Metrik serta distribusi kinerja tahunan.
5. Berita dan materi edukasi.
6. Dokumen publik dan informasi PPID.
7. Katalog layanan, portal, FAQ, dan pengaduan.
8. Konten beranda dan video unggulan.

Backend tidak boleh mewajibkan autentikasi untuk informasi publik tersebut.

## 2.5 Administrative functional requirements

Kemampuan administratif yang direncanakan:

| Modul CMS          | Kemampuan                                           |
| ------------------ | --------------------------------------------------- |
| Publications       | CRUD berita, edukasi, pengelolaan video             |
| Public Information | CRUD dokumen, pengaturan PPID                       |
| Services           | CRUD katalog, portal, FAQ, konfigurasi pengaduan    |
| Institution        | Pengelolaan pejabat dan penugasan                   |
| Contacts           | Perbarui informasi kantor                           |
| Coverage           | Pembaruan data referensi terbatas                   |
| Performance        | Pengelolaan data kinerja tahunan                    |
| Site Content       | Perbarui hero dan konfigurasi konten yang diizinkan |
| Auth               | Login, logout, pengguna, role, session              |
| Media              | Upload, metadata, pemilihan dan pengelolaan aset    |

Implementasi CRUD penuh dilakukan pada data yang benar-benar memerlukannya.

Data singleton cukup menggunakan operasi baca dan pembaruan.

## 2.6 Content publishing workflow

Workflow yang diusulkan:

`DRAFT → REVIEW → PUBLISHED → ARCHIVED`

Aturan:

- Draft tidak tampil melalui Public API.
- Review memerlukan pemeriksaan permission.
- Publish memerlukan permission yang sesuai.
- Archived tidak tampil sebagai konten aktif.
- Riwayat perubahan administratif dicatat.
- Konten yang sudah diterbitkan tidak boleh hilang akibat import ulang.

Workflow revisi draft untuk konten yang telah published merupakan pengembangan lanjutan apabila dibutuhkan approval tanpa mengubah versi publik yang sedang aktif.

---

# III. TECHNOLOGY STACK

## 3.1 Selected stack

| Concern           | Technology                                 | Responsibility                          |
| ----------------- | ------------------------------------------ | --------------------------------------- |
| Language          | Rust Stable                                | Bahasa backend                          |
| HTTP Framework    | Axum                                       | API routing dan handlers                |
| Async Runtime     | Tokio                                      | Async task dan I/O                      |
| Middleware        | Tower                                      | Service middleware abstraction          |
| HTTP Middleware   | tower-http                                 | HTTP tracing, CORS, compression, limits |
| ORM               | SeaORM                                     | Persistence dan relasi database         |
| Database          | PostgreSQL                                 | Persistent storage                      |
| Migration         | SeaORM Migration                           | Database schema versioning              |
| Cache             | Moka                                       | In-memory application cache             |
| Serialization     | Serde                                      | DTO dan JSON                            |
| Validation        | validator                                  | Request validation                      |
| API Specification | utoipa                                     | OpenAPI integration                     |
| Authentication    | axum-login / compatible session middleware | Admin login                             |
| Session           | tower-sessions / compatible store          | Persistent sessions                     |
| Password Hash     | argon2                                     | Argon2id password hashing               |
| Error Handling    | thiserror                                  | Typed application errors                |
| Logging           | tracing                                    | Structured diagnostics                  |
| HTTP Client       | reqwest                                    | External HTTP access if required        |
| Configuration     | Environment + typed configuration          | Runtime settings                        |
| Reverse Proxy     | Caddy atau Nginx                           | HTTPS, routing, proxy policy            |

Versi crate harus dipilih berdasarkan kompatibilitas nyata pada waktu implementasi, lalu dikunci melalui `Cargo.lock`.

Tidak ada keharusan menggunakan seluruh crate opsional sejak M1.

## 3.2 Architectural strategy

Gunakan satu backend Rust application dengan struktur Modular Monolith.

Alasan:

- Tidak membutuhkan komunikasi antarmicroservice.
- Deployment sederhana.
- Transaksi PostgreSQL mudah dikelola.
- Modul dapat dikembangkan secara independen pada level kode.
- Overhead maintenance rendah.
- Cocok untuk solo developer.

Jangan memecah setiap feature menjadi Cargo crate terpisah tanpa kebutuhan nyata.

SeaORM migration dapat menggunakan crate migrasi sendiri jika dibutuhkan oleh mekanisme toolchain yang dipilih.

## 3.3 Dependency management

Setiap penambahan dependency harus mempertimbangkan:

- Apakah dependency benar-benar diperlukan.
- Kompatibilitas versi dengan Axum dan Tokio.
- Kondisi pemeliharaan.
- Security advisories.
- Lisensi.
- Ukuran dependency graph.
- Risiko duplikasi fungsi.
- Efek terhadap build dan deployment.

Gunakan satu strategi ORM utama.

SeaORM dipilih sebagai ORM default. Raw SQL melalui kemampuan yang tersedia pada stack data-access boleh digunakan untuk query yang memang memerlukannya.

Jangan menambahkan lapisan SQLx repository paralel hanya untuk operasi sederhana.

---

# IV. CLEAN ARCHITECTURE & MODULE STRUCTURE

## 4.1 Architectural style

Gunakan:

**Feature-Based Modular Monolith with Four-Layer Pragmatic Clean Architecture**

Setiap feature mempunyai empat layer:

1. Presentation.
2. Application.
3. Domain.
4. Infrastructure.

Lapisan berada dalam batas modul masing-masing.

## 4.2 Backend directory blueprint

```text
backend/
├── Cargo.toml
├── Cargo.lock
├── .env.example
│
├── src/
│   ├── main.rs
│   ├── app.rs
│   ├── config.rs
│   ├── state.rs
│   │
│   ├── shared/
│   │   ├── mod.rs
│   │   ├── error.rs
│   │   ├── response.rs
│   │   └── pagination.rs
│   │
│   ├── middleware/
│   │   ├── mod.rs
│   │   ├── http.rs
│   │   ├── security.rs
│   │   ├── auth.rs
│   │   ├── rate_limit.rs
│   │   └── csrf.rs
│   │
│   ├── infra/
│   │   ├── mod.rs
│   │   ├── db.rs
│   │   ├── cache.rs
│   │   ├── storage.rs
│   │   └── static_data.rs
│   │
│   └── modules/
│       ├── mod.rs
│       │
│       ├── publications/
│       │   ├── mod.rs
│       │   ├── presentation.rs
│       │   ├── application.rs
│       │   ├── domain.rs
│       │   └── infrastructure.rs
│       │
│       ├── services/
│       ├── public_info/
│       ├── institution/
│       ├── coverage/
│       ├── performance/
│       ├── contacts/
│       ├── site_content/
│       ├── auth/
│       └── media/
│
├── migration/
├── resources/
│   └── static/
│       ├── profile.json
│       ├── functions.json
│       ├── legal-bases.json
│       └── homepage.json
│
└── tests/
    ├── contracts.rs
    ├── integration.rs
    └── security.rs
```

Semua modul pada `modules/` menggunakan lima berkas dasar yang sama seperti `publications/`.

Struktur ini adalah target. File tidak perlu dibuat sebelum modul terkait mulai dikerjakan.

## 4.3 Layer responsibilities

### Presentation Layer

**File:** `presentation.rs`

Tanggung jawab:

- Axum handlers.
- Public dan admin routers.
- Parsing path/query/body.
- Request DTO.
- Response DTO.
- HTTP status mapping.
- Validasi format request.
- Pemanggilan Application Layer.

Tidak boleh:

- Menjalankan query SeaORM secara langsung.
- Mengimplementasikan business rules.
- Mengatur transaksi database.
- Mengakses repository Infrastructure secara langsung.

### Application Layer

**File:** `application.rs`

Tanggung jawab:

- Application services.
- Use-case orchestration.
- Repository ports.
- Transaction coordination.
- Permission checks yang membutuhkan konteks domain.
- Cache lifecycle coordination.
- Audit orchestration.
- Business workflow execution.

Application mengetahui kontrak repository yang diperlukan, tetapi tidak tergantung pada implementasi SeaORM.

### Domain Layer

**File:** `domain.rs`

Tanggung jawab:

- Domain entities dan value objects.
- Business invariants.
- Status transitions.
- Validasi aturan bisnis.
- Pure domain operations.

Tidak boleh mengimpor Axum, Tower, SeaORM, atau implementasi cache.

### Infrastructure Layer

**File:** `infrastructure.rs`

Tanggung jawab:

- SeaORM model dan entity mapping.
- Repository implementation.
- Query dan persistence.
- Mapping DB record ke domain model.
- Data-specific storage adapter.
- Pelaksanaan transaksi sesuai kebutuhan use case.

Tidak boleh menentukan kebijakan penerbitan konten atau melakukan pemeriksaan hak akses yang seharusnya dimiliki Application.

## 4.4 Dependency direction

```text
Presentation ---> Application ---> Domain
                       |
                       v
                Repository Port
                       ^
                       |
                Infrastructure

Composition Root:
app.rs / state.rs
    |
    +-- wires services and repository implementations
```

Domain tidak bergantung pada Infrastructure.

Infrastructure mengimplementasikan kontrak yang dimiliki Application atau Domain sesuai kebutuhan.

Dependency wiring dilakukan pada composition root.

## 4.5 Module responsibility matrix

| Module       | Data ownership                                                                                      | Core responsibilities                       |
| ------------ | --------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| publications | articles, education_topics, featured_videos                                                         | Konten berita, edukasi, video               |
| services     | services_catalog, service_portals, service_faqs, complaint_settings                                 | Layanan publik dan informasi pengaduan      |
| public_info  | public_documents, ppid_settings                                                                     | Dokumen dan PPID                            |
| institution  | organization_settings, organization_people, organization_assignments                                | Struktur organisasi dan referensi institusi |
| coverage     | coverage_districts, spectrum_applications, coverage_summary                                         | Wilayah dan pemanfaatan spektrum            |
| performance  | performance_records, performance_distributions, performance_distribution_items, performance_reports | Kinerja dan laporan tahunan                 |
| contacts     | office_settings                                                                                     | Kontak dan informasi kantor                 |
| site_content | hero_settings                                                                                       | Hero dan editorial statis                   |
| auth         | admin_users, admin_roles, admin_user_roles, audit_logs*                                             | Akun, sesi, permission                      |
| media        | media_assets                                                                                        | Media dan metadata penyimpanan              |

`audit_logs` merupakan infrastruktur audit lintas-domain. Kepemilikan teknis awal berada pada modul Auth/System, tetapi pembuatan catatan audit domain dilakukan melalui kontrak Application, bukan akses langsung antar-repository.

## 4.6 SOLID rules

**Single Responsibility:** setiap layer dan komponen memiliki tanggung jawab jelas.

**Open/Closed:** perubahan fitur tidak mengharuskan perubahan yang tidak terkait.

**Liskov Substitution:** implementasi trait mempertahankan perilaku kontraknya.

**Interface Segregation:** trait kecil dan spesifik.

**Dependency Inversion:** abstraksi didefinisikan di sisi yang menggunakannya.

Hindari:

- Generic repository global untuk seluruh entitas.
- Trait untuk setiap struct tanpa kebutuhan.
- Service yang sekadar memanggil satu repository tanpa nilai tambah, kecuali diperlukan demi konsistensi kontrak dan pengujian.
- Circular module dependencies.
- Business logic di handler.
- ORM model digunakan langsung sebagai respons publik.

---

# V. DATABASE DESIGN

## 5.1 Database strategy

Gunakan PostgreSQL sebagai sumber kebenaran untuk seluruh data yang dimigrasikan ke database.

ORM utama: SeaORM.

Migration framework: SeaORM Migration.

DBML yang direncanakan:

`doc/backend/database.dbml`

**Status rancangan:** PROPOSED — 26 tabel.

Rancangan DBML sudah diperbarui sebagai spesifikasi task2: checks, nullable/public invariants, import_key dan FK actions. Status tetap PROPOSED; parser dan approval M0-05 wajib sebelum migration pertama dibuat.

## 5.2 Table inventory

### Publications

| Table            | Purpose                      |
| ---------------- | ---------------------------- |
| articles         | Berita dan artikel publikasi |
| education_topics | Materi edukasi               |
| featured_videos  | Video unggulan               |

### Public Information

| Table            | Purpose                    |
| ---------------- | -------------------------- |
| public_documents | Dokumen, regulasi, laporan |
| ppid_settings    | Konfigurasi informasi PPID |

### Services

| Table              | Purpose                 |
| ------------------ | ----------------------- |
| services_catalog   | Katalog layanan         |
| service_portals    | Tautan portal eksternal |
| service_faqs       | Pertanyaan dan jawaban  |
| complaint_settings | Informasi pengaduan     |

### Institution & Contacts

| Table                    | Purpose                   |
| ------------------------ | ------------------------- |
| office_settings          | Kontak kantor             |
| organization_settings    | Teks pengantar organisasi |
| organization_people      | Identitas individu        |
| organization_assignments | Penugasan/jabatan         |

### Coverage

| Table                 | Purpose                    |
| --------------------- | -------------------------- |
| coverage_districts    | Kabupaten/kota             |
| spectrum_applications | Sektor penggunaan spektrum |
| coverage_summary      | Ringkasan wilayah          |

### Performance

| Table                          | Purpose                  |
| ------------------------------ | ------------------------ |
| performance_records            | Metrik kinerja tahunan   |
| performance_distributions      | Ringkasan distribusi     |
| performance_distribution_items | Item kategori distribusi |
| performance_reports            | Laporan kinerja          |

### Site Content

| Table         | Purpose             |
| ------------- | ------------------- |
| hero_settings | Konten hero beranda |

### Infrastructure & CMS

| Table            | Purpose              |
| ---------------- | -------------------- |
| media_assets     | Metadata media       |
| admin_users      | Akun administrator   |
| admin_roles      | Role                 |
| admin_user_roles | Relasi pengguna-role |
| audit_logs       | Jejak perubahan      |

**Total: 26 tabel.**

## 5.3 Primary key strategy

Gunakan UUID untuk identitas internal pada tabel yang memerlukan entitas independen.

Contoh:

- `articles.id`: UUID.
- `articles.canonical_id`: string ID lama.
- `articles.slug`: slug URL publik.

Aturan:

- UUID internal tidak menggantikan canonical ID di Public API.
- Canonical ID lama tetap dipertahankan untuk kompatibilitas.
- Slug tidak boleh diubah tanpa strategi redirect dan kompatibilitas.
- Data singleton menggunakan primary key tetap sesuai rancangan.

## 5.4 Relationship strategy

Relasi utama:

- `organization_people` 1:N `organization_assignments`.
- `public_documents` 1:N `performance_reports`.
- `public_documents` 1:N `performance_records` jika terkait dokumen pendukung.
- `performance_records` 1:0..1 `performance_distributions`.
- `performance_distributions` 1:N `performance_distribution_items`.
- `admin_users` N:M `admin_roles`.
- `admin_users` 1:N `audit_logs`.
- `media_assets` dapat direferensikan oleh dokumen atau data organisasi.

Foreign key dan perilaku penghapusan harus dinyatakan secara eksplisit.

Hindari `CASCADE DELETE` untuk data publik penting tanpa kajian dampak.

## 5.5 JSONB strategy

Gunakan JSONB untuk struktur nested yang benar-benar memerlukannya.

Contoh:

- Article content paragraphs.
- Publication source metadata.
- Image metadata.
- Service requirements/steps.
- Contact address dan service hours.
- PPID procedures.
- Performance chart presentation data.
- Hero title dan slogan.

Jangan menyimpan seluruh entitas sebagai satu blob JSONB jika atributnya perlu difilter, diurutkan, atau direlasikan secara konsisten.

## 5.6 Database constraints

Minimal:

- Unique canonical IDs.
- Unique slugs untuk konten yang menggunakan slug.
- Foreign key integrity.
- Nonnegative numerical counts.
- Enumerated status validation.
- Singleton ID restriction.
- Media size constraint.
- Valid document year format.
- Valid publication status.
- Referential integrity pada laporan kinerja.

Rancangan indeks harus mempertimbangkan pola query sebenarnya, bukan dibuat otomatis untuk setiap kolom.

## 5.7 Database connection management

Gunakan connection pool yang bounded dan dibagikan melalui application state.

Baseline konfigurasi awal yang perlu diuji:

| Setting             | Proposed baseline                   |
| ------------------- | ----------------------------------- |
| Minimum connections | 2–5                                |
| Maximum connections | 10                                  |
| Acquisition timeout | 1 detik                             |
| Idle timeout        | 5–10 menit                         |
| Query timeout       | Maksimum 2 detik; total HTTP 6 detik |

Angka di atas bukan konfigurasi final. Sesuaikan dengan kapasitas server dan hasil pengujian.

Aplikasi wajib:

- Menggunakan parameterized queries.
- Menghindari N+1 queries.
- Menggunakan pagination untuk koleksi besar.
- Menjalankan transaksi secara eksplisit.
- Tidak menahan koneksi selama operasi non-database yang lambat.
- Tidak membuka koneksi PostgreSQL langsung ke internet.

## 5.8 Migration rules

- Migration versioned dan dapat dilacak.
- Tidak menggunakan auto-sync schema produksi.
- Jangan menjalankan destructive migration tanpa backup dan persetujuan.
- Pisahkan database account aplikasi dan migrasi.
- Uji migration pada database sementara sebelum staging/production.
- Sediakan prosedur rollback atau forward-fix yang jelas.
- Jangan menganggap rollback schema selalu dapat memulihkan data yang sudah dihapus.

---

# VI. PUBLIC & ADMIN API CONTRACT

## 6.1 API namespaces

**Public API:**

`/api/v1/public`

**Authentication API:**

`/api/v1/auth`

**Administrative API:**

`/api/v1/admin`

Public API baseline telah direkonsiliasi dalam `doc/backend/openapi.v1.yaml` melalui task2; dokumentasi bukan bukti backend berjalan. Frontend schema tetap sumber shape canonical. Detail operasi yang berlabel PROPOSED belum menjadi keputusan owner.

Auth dan Admin API masih memerlukan finalisasi OpenAPI.

## 6.2 Success envelope

Contoh GET `/documents/{id}` dari record canonical pertama (bukan placeholder DTO):

```json
{
  "success": true,
  "data": {
    "id": "layanan-sosialisasi-2026",
    "title": "Sosialisasi Tahun 2026",
    "category": "layanan",
    "year": "2026",
    "description": "Folder materi sosialisasi tahun 2026 yang tercantum pada daftar tautan pelayanan Balmon Pekanbaru.",
    "source": {
      "label": "Daftar Link Pelayanan Balmon Pekanbaru",
      "publisher": "Balai Monitor Spektrum Frekuensi Radio Kelas I Pekanbaru",
      "url": "https://drive.google.com/drive/folders/15cmOA-3zS3waldyrNESC_OPDb5Grx834?usp=sharing"
    }
  },
  "meta": {
    "timestamp": "2026-11-05T09:00:00.000Z",
    "version": "1.0.0",
    "sourceMode": "live_database"
  }
}
```

Aturan:

- `success` selalu boolean.
- `data` berisi DTO domain.
- `meta.timestamp` menggunakan waktu ISO 8601.
- `meta.version` sesuai versi API.
- `meta.sourceMode` menggunakan nilai yang disepakati frontend.

Frontend API client melakukan unwrapping terhadap `data`.

Jangan menghilangkan envelope tanpa perubahan kontrak yang disetujui.

## 6.3 Error envelope

```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource tidak ditemukan.",
    "details": {}
  },
  "meta": {
    "timestamp": "2026-11-05T09:00:00.000Z",
    "version": "1.0.0",
    "sourceMode": "live_database"
  }
}
```

Error taxonomy minimal:

| HTTP | Error                 |
| ---- | --------------------- |
| 400  | BAD_REQUEST           |
| 401  | UNAUTHENTICATED       |
| 403  | FORBIDDEN             |
| 404  | NOT_FOUND             |
| 405  | BAD_REQUEST           |
| 409  | CONFLICT              |
| 413  | PAYLOAD_TOO_LARGE     |
| 422  | VALIDATION_ERROR      |
| 429  | RATE_LIMIT_EXCEEDED   |
| 500  | INTERNAL_SERVER_ERROR |
| 503  | SERVICE_UNAVAILABLE   |
| 504  | REQUEST_TIMEOUT       |

Kode tambahan untuk CMS adalah proposal. Kode yang sudah digunakan frontend tidak boleh diganti tanpa pemeriksaan kompatibilitas.

## 6.4 Public API inventory

Seluruh path berikut diawali `/api/v1/public`.

| No. | Method & Path                           | Domain       |
| --: | --------------------------------------- | ------------ |
|   1 | GET `/contacts`                       | Contacts     |
|   2 | GET `/coverage`                       | Coverage     |
|   3 | GET `/coverage/districts`             | Coverage     |
|   4 | GET `/coverage/spectrum-applications` | Coverage     |
|   5 | GET `/institution`                    | Institution  |
|   6 | GET `/institution/functions`          | Institution  |
|   7 | GET `/institution/leaders`            | Institution  |
|   8 | GET `/institution/legal-bases`        | Institution  |
|   9 | GET `/performance`                    | Performance  |
|  10 | GET `/articles`                       | Publications |
|  11 | GET `/articles/{slug}`                | Publications |
|  12 | GET `/education`                      | Publications |
|  13 | GET `/education/{slug}`               | Publications |
|  14 | GET `/publications/featured-video`    | Publications |
|  15 | GET `/documents`                      | Public Info  |
|  16 | GET `/documents/{id}`                 | Public Info  |
|  17 | GET `/ppid`                           | Public Info  |
|  18 | GET `/services`                       | Services     |
|  19 | GET `/services/{slug}`                | Services     |
|  20 | GET `/portals`                        | Services     |
|  21 | GET `/faqs`                           | Services     |
|  22 | GET `/complaints`                     | Services     |
|  23 | GET `/site-content/hero`              | Site Content |
|  24 | GET `/site-content/homepage`          | Site Content |

24 endpoint melayani 25 metode reader karena Performance menggabungkan metrik dan distribusi dalam satu respons. Backend hanya mengirim bentuk canonical composite yang lengkap; dukungan legacy frontend bukan kewajiban backend menghasilkan DTO legacy.

## 6.5 Query contract

Parameter yang telah didokumentasikan:

| Endpoint         | Parameter                             |
| ---------------- | ------------------------------------- |
| `/performance` | `year`, default 2025                |
| `/articles`    | `limit`, `category`, `featured` |
| `/documents`   | `category`, `year`                |
| `/services`    | `featured`                          |
| `/portals`     | `category`                          |

Gunakan batas parameter yang tervalidasi.

Untuk pagination tambahan, jangan mengubah tipe respons koleksi menjadi objek pagination tanpa pemeriksaan kompatibilitas.

Jika menambahkan `page`, `cursor`, atau metadata pagination, periksa kebutuhan reader frontend dan perbarui OpenAPI setelah disetujui.

## 6.6 DTO compatibility

DTO publik wajib mengikuti kontrak frontend.

Contoh ketentuan:

- `publishedAt`: string tanggal `YYYY-MM-DD`.
- `content`: array string.
- `featured`: boolean.
- `published`: boolean.
- `year` dokumen: string.
- `year` Performance: number.
- `homeOrder`: number.
- `source`: objek metadata.
- `image`: objek media dengan struktur yang disepakati.
- Canonical ID: string.

Database menggunakan `snake_case`, sedangkan DTO menggunakan nama field yang diharapkan frontend.

Serde mapping harus eksplisit dan diuji.

## 6.7 Admin API

Admin endpoint yang diusulkan mencakup:

- Login/logout/session.
- CRUD articles.
- CRUD education.
- CRUD documents.
- CRUD services.
- CRUD portals.
- CRUD FAQs.
- Manage featured videos.
- Update office settings.
- Update complaint/PPID settings.
- Manage organization people and assignments.
- Manage hero settings.
- Manage performance data.
- Upload/manage media.
- Manage admin users and roles.
- Read audit logs.

Admin DTO tidak harus identik dengan Public DTO.

Contohnya, draft artikel dapat mempunyai `published_on = NULL`, sedangkan artikel publik wajib mempunyai tanggal publikasi valid.

Endpoint admin harus menggunakan autentikasi dan authorization.

Tidak boleh mengekspos draft melalui Public API.

## 6.8 OpenAPI strategy

Lokasi rancangan:

`doc/backend/openapi.v1.yaml`

Aturan:

- OpenAPI menjadi kontrak mesin setelah direkonsiliasi.
- Gunakan utoipa untuk menghubungkan definisi API dengan tipe Rust.
- Validasi dokumen OpenAPI.
- Hindari drift antara kode, OpenAPI, dan Ajv frontend.
- Contract tests menjadi syarat integrasi.

---

## 6.9 Reconciled public baseline and supersession register (task2)

**CONFIRMED:** 24 paths GET dan 25 methods reader tetap. `doc/backend/openapi.v1.yaml` membundel schema canonical tanpa external `$ref`; snapshot di dalamnya wajib dibandingkan dengan source pada setiap perubahan. Source: `frontend/src/lib/contracts/static-contracts.json`, delapan schema domain, DTO types, interfaces dan API adapters. Frontend tidak diubah.

| Materi historis | Status untuk implementasi baru | Pengganti authoritative |
| --- | --- | --- |
| dokumentasi-global/02_SPESIFIKASI_API_INTEGRASI.md §3.5 (L378–403 sebelum task2): stationType/coordinates dan summary stasiun | SUPERSEDED; histori dipertahankan read-only | coverage.schema.json properties districts/summary + types/coverage.ts |
| Dokumen sama §3.6 (L407–445): target/achievementPercent dan distribusi total:number | SUPERSEDED; tidak boleh menjadi seed/DTO backend | performance.schema.json properties metrics/distribution + types/performance.ts |
| dokumentasi-global/03_DATA_CANONICAL_DAN_DATABASE_MAPPING.md contoh metrics target/achievementPercent | SUPERSEDED untuk field mapping | §9.8 dan OpenAPI bundled canonical shapes |
| GLOBAL_DATA_CONTEXT.md wrapper value/Count | Ekspor historis, bukan format JSON canonical saat ini | Root array/object 22 file aktual |
| Contoh global provider dan BALMON_PUBLIC_INFO_SOURCE pada README/panduan lama | SUPERSEDED | §10.2; selector aktual public_information |
| dokumentasi_BE-FE path pada panduan global | UNAVAILABLE historical reference | doc/backend dan frontend/docs/api |

Dokumen pendukung di luar allowlist task2 tidak diedit. Register ini memberi override yang eksplisit; saat materi itu dipakai sendiri, pembaca wajib memeriksa status supersession di sini. Jangan menghapus histori atau mengarang data agar contoh lama cocok.

Success selalu `{success:true,data,meta}`; error selalu `{success:false,error:{code,message,details?},meta}` tanpa `data`. `meta` wajib pada keduanya: timestamp RFC3339/date-time UTC, version `1.0.0`, sourceMode enum `static_snapshot|live_database`. Empat static endpoints memakai static_snapshot; DB-backed public endpoints termasuk Moka warm hit tetap live_database. Error static route memakai static_snapshot; error router/global tanpa domain memakai live_database sebagai mode API backend, bukan bukti DB sukses. Contoh success/error §6.2/6.3 diuji terhadap schema baru; bare DTO dan metadata api hanya kompatibilitas client lama, bukan output backend baseline.

Taxonomy 404 dipilih **NOT_FOUND**, sesuai contoh OpenAPI frontend. 400 BAD_REQUEST untuk query/path/JSON malformed; 422 VALIDATION_ERROR hanya proposal input admin; 401/403 untuk auth/admin proposal, bukan persyaratan login public. Status 405 memakai BAD_REQUEST dengan HTTP 405 pada fallback method (tambahkan ke kontrak jika route tersebut diekspos); 413/429/500/503/504 seperti §6.3. Jangan mengirim success:false dengan HTTP 200. Error tidak memuat internals/credentials; timeout menggunakan envelope REQUEST_TIMEOUT/504. Success/error tetap memiliki X-Request-ID, termasuk rejection.

### Performance contract and negative cases

Untuk tahun dengan data lengkap, GET /performance **wajib** mengembalikan semua field PerformanceMetricsDTO plus `distribution:PerformanceDistributionDTO`. year metrics integer; year chart/distribution string dan harus merujuk tahun sama. Canonical documentId harus resolve ke public document yang boleh tampil. Tidak boleh hanya metrics, hanya distribusi, atau bentuk target/achievementPercent legacy. `reports.json` bukan sumber untuk memalsukan distribution/chart.

- year hilang: default 2025 sesuai kedua reader.
- year malformed atau di luar empat digit 1000–9999: 400 BAD_REQUEST (batas query PROPOSED untuk review M0-04).
- Tahun berformat sah tanpa metrics maupun distribution: 404 NOT_FOUND.
- Tahun diketahui karena salah satu sumber ada, tetapi composite/foreign reference/aggregate belum valid: 503 SERVICE_UNAVAILABLE; jangan return 200 parsial, placeholder atau data tahun lain.
- Tahun didukung awal hanya 2025; ini ketersediaan dataset aktual, bukan hardcoded larangan tahun baru.

`x-contract-fixtures` dalam OpenAPI memuat PERF-OK, missing distribution/chart/documentId, numeric display yang salah, serta metadata invalid. PERF-OK diterima schema backend dan frontend response schema; fixture tanpa distribution masih diterima schema wire frontend lama tetapi **harus ditolak schema backend**. Spesifikasi runtime unknown-year404 dan partial-year503 diuji pada database/fixture terisolasi M3-06; task2 hanya menjalankan validator data, bukan reader TS.

### Query/visibility baseline

PROPOSED batas limit1..100/default10; default10 dipertahankan dari OpenAPI frontend. articles category case-insensitive, featured=false tidak diabaikan; urut publishedAt descending lalu canonical_id ascending. Koleksi tidak cocok filter menghasilkan [] dengan 200. Document year string empat digit dan enum kategori invalid menghasilkan400; query year belum diekspos method reader tetapi tetap API filter. Opsi pagination baru memerlukan review, tidak mengganti data array menjadi object. Detail resolve canonical id/slug, 404 untuk absen atau draft/archived/deleted. List hanya status published dan bukan deleted. education/service/portal/FAQ aktif saja; incomplete row yang harus publik merupakan503 dan diagnostic internal, bukan diisi placeholder resmi. Perubahan active flag perlu test parity pada record nonaktif; canonical saat ini tidak membuktikan perilaku masa depan.

---

# VII. TOWER MIDDLEWARE & SECURITY ARCHITECTURE

## 7.1 Middleware philosophy

Middleware menangani kebutuhan lintas-request.

Business logic tetap berada pada Domain/Application.

Gunakan middleware bawaan Tower/tower-http bila tersedia.

Custom middleware dibuat hanya untuk kebutuhan khusus.

## 7.2 Middleware directory

```text
middleware/
├── mod.rs
├── http.rs
├── security.rs
├── auth.rs
├── rate_limit.rs
└── csrf.rs
```

## 7.3 Global middleware

| Middleware        | Purpose                               |
| ----------------- | ------------------------------------- |
| Request ID        | Identifikasi request                  |
| Tracing           | Structured request/response logging   |
| Security headers  | HTTP hardening                        |
| Sensitive headers | Mencegah pencatatan kredensial        |
| Timeout           | Membatasi request yang terlalu lama   |
| Body limit        | Mengendalikan ukuran request          |
| Compression       | Mengurangi ukuran respons yang sesuai |

Perhatikan urutan Tower ServiceBuilder.

Layer yang ditambahkan terlebih dahulu berada pada bagian luar stack.

Request dan response memiliki arah eksekusi berlawanan.

## 7.4 Public middleware

Public API membutuhkan:

- CORS yang dikonfigurasi sesuai origin.
- Rate limiting.
- Cache policy.
- HTTP compression.
- Input/query validation.
- Structured errors.

Public API tidak boleh mewajibkan login.

## 7.5 Admin middleware

Admin API membutuhkan:

- Session authentication.
- CSRF protection.
- Permission enforcement.
- Rate limiting.
- No-store responses.
- Audit-aware application flow.

Jangan menempatkan authentication middleware pada seluruh router jika hal itu menghalangi Public API atau login.

CORS preflight harus dapat ditangani secara benar tanpa memerlukan session.

## 7.6 Authentication design

Gunakan server-side session untuk CMS browser.

Persyaratan:

- Secure cookie di production.
- HttpOnly.
- SameSite policy yang sesuai.
- Session regeneration saat login.
- Session expiration.
- Logout dan revocation.
- Brute-force protection.
- Argon2id password hashing.
- MFA untuk akun berisiko tinggi bila telah diputuskan.

Jika memakai cookie authentication, state-changing endpoints harus memiliki proteksi CSRF yang memadai.

## 7.7 Authorization design

Gunakan RBAC.

Role awal yang diusulkan:

- super_admin.
- content_editor.
- reviewer_publisher.
- data_operator.

Pemeriksaan harus dilakukan pada backend.

Middleware dapat memeriksa permission umum.

Application Layer harus memeriksa otorisasi yang bergantung pada resource atau keadaan bisnis.

Contoh: apakah editor tertentu boleh mengubah artikel yang telah published.

## 7.8 Rate limiting

Terapkan kebijakan terpisah untuk:

- Public GET.
- Login.
- Authenticated admin.
- Media upload.

Nilai rate limit ditentukan berdasarkan pengujian dan kebutuhan operasional.

Alamat IP yang digunakan untuk rate limiting harus berasal dari proxy chain yang tepercaya.

Jangan mempercayai `X-Forwarded-For` yang diberikan langsung oleh klien tanpa konfigurasi trust boundary.

## 7.9 File upload security

Untuk media:

- Batasi ukuran.
- Verifikasi MIME dan file signature.
- Gunakan nama penyimpanan yang aman.
- Hindari path traversal.
- Batasi format yang diperbolehkan.
- Jangan mengeksekusi berkas upload.
- Gunakan scanning bila diperlukan.
- Simpan metadata dan checksum.
- Lindungi endpoint upload dengan auth dan permission.

## 7.10 Secret management

Semua secret backend harus berada pada environment atau secret manager server.

Jangan menyimpan secret di frontend.

Konfigurasi Vite frontend dapat mengekspos variabel dengan prefix yang telah diizinkan.

Karena itu, jangan menempatkan database password, session secret, atau credential backend dalam environment frontend.

Jangan menampilkan secret pada log, dokumentasi, screenshot, atau output Agent.

## 7.11 Security acceptance

Minimal harus diverifikasi:

- Public GET tanpa login.
- Admin tanpa session ditolak.
- Admin tanpa permission ditolak.
- CSRF invalid ditolak.
- Oversized upload ditolak.
- Rate limit bekerja.
- Login failure tidak membocorkan akun atau password.
- Draft tidak dapat diakses publik.
- Error response tidak membocorkan stack trace.
- Admin response tidak disimpan dalam shared cache.

---

## 7.12 Explicit composition and auth recommendation (PROPOSED)

Task2 menetapkan satu opsi rancangan yang dapat direview. Belum ada persetujuan topology/cookie/store/RBAC atau bukti runtime. M1-03/M4-01 memerlukan persetujuan baseline HTTP ini; M5 memerlukan keputusan auth/admin terpisah.

Urutan request ServiceBuilder luar→dalam (response berbalik):

1. Mark sensitive **request** headers Authorization/Cookie; jangan memasukkannya ke span.
2. Generate UUID request ID server (ganti client-provided ID); propagate header pada semua hasil.
3. Trace span hanya method/path template/status/duration/request ID; jangan log query/body/secret.
4. Mark sensitive **response** header Set-Cookie sebelum response melewati Trace.
5. Security response headers dan normalized JSON error/fallback adapter, mencakup 404/405/413/429/504.
6. Compression untuk JSON public yang sesuai; auth/admin/session responses dikecualikan.
7. Total request timeout **6000 ms**, termasuk antrean downstream/body/handler; adapter luar menghasilkan504+meta/request ID.
8. Body limit default **64 KiB** dan bounded concurrency **64**; upload override **10 MiB** hanya protected media route setelah desain media disetujui.
9. Router scoped berikut; auth diterapkan dengan route_layer pada route yang cocok, unknown route tetap404.

| Scope | Urutan setelah global stack (request) |
| --- | --- |
| Public | CORS exact allowlist (tanpa credential) → IP rate limit → HTTP cache policy → public router/use case |
| Auth | No-store (termasuk errors) → credentialed CORS exact origin → login/IP/account throttling → session/pre-auth CSRF → auth handlers |
| Admin | No-store → credentialed CORS exact origin → admin rate limit → session load → authenticate401 → CSRF state-changing403 → general permission403 → resource authorization Application → handler |

CORS layer menangani OPTIONS sebelum session/auth/CSRF/throttle bisnis; preflight valid204, origin tidak diizinkan tidak menerima allow headers dan handler mutasi tidak dipanggil. Global body/timeout/security/request ID tetap berlaku. Jangan menempatkan cookie/auth guard pada seluruh Router. Setelah404 path tak dikenal, respons method salah405 tidak berubah401. No-store di luar CORS memastikan auth/admin error dan preflight tidak dapat menjadi cache publik.

Budget awal **PROPOSED**: pool acquisition1000ms, satu query2000ms, total6000ms < client8000ms; agregat beberapa query harus menyisakan budget total, bukan 2s tanpa batas per-loop. Timeout/rejection dari tower-http tidak diasumsikan menghasilkan JSON schema sendiri; normalizer diuji termasuk content-type/status/correlation. Tidak memakai timeout yang hanya mengembalikan empty-body408 lalu melaporkan504. Pilih adapter map yang mempertahankan error contract, bukan menonaktifkan timeout. Body upload/Argon2/storage harus bounded/cancellation-safe; timeout HTTP tidak menjamin pekerjaan blocking/transaksi sudah batal. Mutasi tidak boleh di-retry otomatis sesudah outcome ambigu.

Rate limit rekomendasi per satu instance: public120/min/IP burst30, login5/15min per normalized-account+IP dan20/15min/IP, admin60/min/user burst10, upload5/min/user. Nilai perlu pengujian dan approval M0-06; kunci account login tidak dicatat plaintext di log; respons failure generik. Account throttle tidak menjadi permanent lockout yang dapat disalahgunakan. IP dari transport peer kecuali trusted proxy allowlist eksplisit; forwarded header klien diabaikan. Topology aktual tetap OPEN-009.

Auth opsi rekomendasi **PROPOSED**: tower-sessions-compatible PostgreSQL persistent store, table/migrations/expiry cleanup dimiliki Auth; schema/library kompatibel SeaORM/Axum diverifikasi M5-01, bukan dianggap 26 tabel sudah menyimpan session. Tidak menambah Redis untuk baseline satu instance. Rekomendasi same-origin reverse proxy, cookie host-only Secure/HttpOnly/SameSite=Lax/Path=/, idle30min dan absolute8h; seluruh topology/cookie/lifetime menunggu owner. Cross-origin deployment harus review ulang CORS credentials/SameSite/CSRF; jangan otomatis menurunkan secure flag di production.

CSRF rekomendasi synchronizer token kriptografis terkait session, X-CSRF-Token+Origin exact allowlist pada request state-changing (termasuk login/logout), tidak pada GET/HEAD/OPTIONS. Pre-auth session/token diberikan sebelum login melalui flow auth PROPOSED; endpoint/token acquisition belum difinalkan di paths publik. Rotate session ID dan CSRF saat login; revoke pada logout/disable/reset-password/role change. Setiap admin use case baca state user/role terbaru dari DB untuk deny-by-default; role yang ada dalam cookie/cache tidak menjadi otorisasi tunggal. Transaksi mutasi sensitif memverifikasi versi hak akses saat write sehingga request yang bersaing dengan revoke tidak lolos berdasarkan snapshot lama.

| Role (PROPOSED) | Izin rekomendasi; selain ini deny |
| --- | --- |
| super_admin | Kelola pengguna/role, konfigurasi yang disetujui, akses audit; publish tetap melalui validasi workflow |
| content_editor | Create/edit draft publications/documents/services; tidak publish, tidak kelola pengguna/role |
| reviewer_publisher | Review/publish/archive konten yang disetujui; tidak kelola pengguna/role |
| data_operator | Update annual metrics/distribution/report reference; tidak publish artikel atau kelola role |

Resource-specific rules tetap Application, termasuk draft ownership/status dan validasi official-data. Role matrix, media permission dan revision workflow menunggu M0-06/OPEN-012; tidak ada endpoint admin sementara terbuka. Authorization tests mencakup unknown permission, disabled user, role revoked saat session masih ada, CSRF tidak ada/salah, preflight,404/405 serta cookie flags.

Referensi primer untuk semantik (bukan bukti implementasi): [Tower ServiceBuilder order](https://docs.rs/tower/0.5.3/tower/struct.ServiceBuilder.html#order), [tower-http timeout](https://docs.rs/tower-http/0.6.11/tower_http/timeout/index.html), [OWASP CSRF](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html).

---

# VIII. CACHING & PERFORMANCE ARCHITECTURE

## 8.1 Caching strategy

Gunakan Moka sebagai L1 in-memory cache.

Strategi utama:

**Cache-Aside**

```text
Request
   |
   v
Cache Lookup
   |
   +-- HIT ----> Cached DTO ---> Response
   |
   +-- MISS ---> Repository ---> PostgreSQL
                    |
                    v
                DTO Mapping
                    |
                    v
                Cache Insert
                    |
                    v
                 Response
```

PostgreSQL tetap menjadi sumber kebenaran.

## 8.2 Cache ownership

| Layer                 | Responsibility                            |
| --------------------- | ----------------------------------------- |
| Presentation          | Mengembalikan response                    |
| Application           | Menentukan cache policy dan invalidation  |
| Domain                | Tidak mengetahui cache                    |
| Infrastructure        | Menyediakan implementasi cache/repository |
| Global infra/cache.rs | Operasi umum get/set/invalidate           |

Cache tidak boleh digunakan sebagai database utama.

## 8.3 Proposed cache TTL

| Data                 | Initial TTL |
| -------------------- | ----------: |
| Article list         |    60 detik |
| Article detail       |     5 menit |
| Service catalog      |     5 menit |
| FAQ                  |    10 menit |
| Portal links         |    10 menit |
| Office contact       |     5 menit |
| Hero content         |     5 menit |
| Organization leaders |    10 menit |
| Coverage             |    15 menit |
| Performance          |    30 menit |
| Public documents     |     5 menit |

Nilai TTL adalah baseline yang harus dievaluasi.

Untuk empat sumber static, gunakan strategi cache berbasis deployment/versioning.

## 8.4 Cache key design

Cache key wajib mempertimbangkan:

- Domain.
- Resource.
- Resource ID/slug.
- Query filters.
- Sort order.
- Pagination.
- Data version bila digunakan.

Contoh:

`public:articles:category=all:featured=all:limit=10`

Jangan menggunakan key yang sama untuk request yang menghasilkan data berbeda.

## 8.5 Cache invalidation

Pada perubahan konten:

1. Jalankan validasi.
2. Simpan perubahan database.
3. Commit transaksi.
4. Invalidate cache terkait.
5. Pastikan cache daftar/detail yang terdampak diperbarui.
6. Catat kegagalan invalidasi.

Jika commit berhasil tetapi invalidasi gagal, jangan melaporkan transaksi sebagai belum tersimpan. Sistem harus membedakan status data yang berhasil disimpan dan status propagasi cache.

Untuk deployment banyak instance, invalidasi cache lokal tidak otomatis menjangkau instance lain.

Redis/Valkey atau mekanisme koordinasi lain hanya ditambahkan setelah kebutuhan tersebut nyata.

## 8.6 HTTP caching

Public API dapat menggunakan:

- Cache-Control.
- ETag.
- Conditional requests.
- Reverse proxy/CDN caching bila cocok.

CMS dan session data wajib menggunakan kebijakan no-store yang sesuai.

HTTP cache invalidation harus dipertimbangkan bersama Moka agar tidak terjadi stale content yang tidak terduga.

## 8.7 Database performance

Gunakan:

- Bounded connection pool.
- Index yang sesuai query.
- Efficient projections.
- Pagination.
- Batched loading.
- Transaction boundaries yang pendek.
- Query monitoring.
- EXPLAIN ANALYZE.
- pg_stat_statements bila tersedia.

Hindari:

- N+1 queries.
- SELECT seluruh kolom tanpa kebutuhan.
- Query di dalam loop yang tidak perlu.
- Blocking work dalam async request handler.
- Index duplikat.
- Cache tanpa batas kapasitas.

## 8.8 Preliminary performance targets

| Measurement                       | Proposed target              |
| --------------------------------- | ---------------------------- |
| Cached public GET p95             | Di bawah 50 ms               |
| Uncached public GET p95           | Di bawah 200 ms              |
| Simple admin CRUD p95             | Di bawah 300 ms              |
| Contract tests                    | 24/24 endpoint               |
| Canonical data parity             | Seluruh field wajib terjaga  |
| Unauthorized admin access         | Seluruh kasus teruji ditolak |
| Error rate under normal load test | Di bawah 0,1% untuk 5xx      |

Pengukuran harus dilakukan pada lingkungan yang ditentukan, dengan concurrency, dataset, cache state, dan spesifikasi server yang dicatat.

Target tersebut bukan jaminan performa produksi.

---

## 8.9 Transaction, audit and concurrent refill contract (PROPOSED)

Application owns one use-case transaction; Infrastructure implements the port with SeaORM. Composition root injects transaction-capable repository+audit capability sharing the same transaction. A public-facing handler never opens/commits a transaction. Do not call a second module repository directly; use an explicit Application port. Failure in domain validation, persistence or audit rolls back all domain changes; no cache invalidation on rollback. Successful commit is the durability point; cache propagation errors must never be reported as database rollback.

Recommended single-instance race policy: per-domain read/write coordination guard in Application, shared across every cache key/filter/list/detail and every mutation of that domain. Cache miss holds an async read guard through DB load and insert; mutation holds write guard from before transaction through commit and invalidation. Writer sets a domain bypass flag BEFORE beginning its transaction (with cancellation-safe cleanup state); it clears bypass only after confirmed rollback with unchanged cache or after successful post-commit invalidation. A canceled/unknown-outcome writer leaves bypass set; a recovery full-domain invalidation is required before caching resumes. Readers recheck cache under guard. Old in-flight fills finish before writer and are invalidated before writer releases; new fills read after commit. Warm-cache hits also acquire read guard for the strict post-commit visibility guarantee. Failed invalidation marks domain cache bypassed while still under write guard; subsequent readers go to DB until a successful full-domain clear restores it. Cancellation/drop must conservatively leave bypass active until cleared; don't let writer cancellation release an apparently healthy cache after commit. Use cancellation/failure tests, not a blocking lock held across await. One global generic cache framework is unnecessary.

Tradeoff: writer serializes same-domain reads briefly; long DB reads delay mutations, so queries/timeouts remain bounded. Cross-domain mutation locks follow a single sorted module-name order or do not compose them; declare all affected domains before write to avoid deadlock. Multi-instance invalidation is still UNRESOLVED for actual topology; the above guarantee only covers one process. Do not silently deploy replicas with local-only invalidation.

Recommended initial HTTP policy: API public responses Cache-Control:no-cache with deterministic ETag optional; auth/admin always no-store. No CDN/shared max-age cache until explicit freshness decision. Moka TTL remains §8.3, but TTL alone does not solve a refill race. HTML prerender freshness is separate OPEN-007. Atomic audit failure test, rollback-no-invalidation, paused-old-read→commit→new-read, invalidation failure+bypass, cancellation-after-commit, draft/public isolation, year/filter/list/detail isolation and concurrent two-write cases are acceptance of M4-04 before CMS.

---

# IX. CANONICAL DATA MIGRATION & OWNERSHIP

## 9.1 Canonical frontend sources

Lokasi:

`frontend/src/lib/data/`

Jumlah: **22 JSON** dalam **8 domain**.

Sumber data aktual menjadi dasar migrasi, bukan data contoh pada dokumentasi lama.

## 9.2 Data ownership classification

### Dynamic Managed — 6 sources

| Source                            | Destination      |
| --------------------------------- | ---------------- |
| publications/articles.json        | articles         |
| publications/education.json       | education_topics |
| public_information/documents.json | public_documents |
| services/catalog.json             | services_catalog |
| services/portals.json             | service_portals  |
| services/faqs.json                | service_faqs     |

Data ini menjadi prioritas CRUD dan CMS.

### Dynamic Read-Only — 7 sources

| Source                              | Destination                       |
| ----------------------------------- | --------------------------------- |
| coverage/districts.json             | coverage_districts                |
| coverage/spectrum-applications.json | spectrum_applications             |
| coverage/summary.json               | coverage_summary                  |
| performance/metrics-2025.json       | performance_records               |
| performance/distribution-2025.json  | performance_distributions + items |
| performance/reports.json            | performance_reports               |
| public_information/ppid.json        | ppid_settings                     |

Read-only di sini mengacu pada konsumsi melalui Public API.

Pembaruan oleh admin atau proses impor resmi dapat dirancang secara terkontrol.

### Hybrid — 5 sources

| Source                           | Destination                                  |
| -------------------------------- | -------------------------------------------- |
| contacts/office.json             | office_settings                              |
| institution/organization.json    | organization_settings + people + assignments |
| services/complaint.json          | complaint_settings                           |
| site_content/hero.json           | hero_settings                                |
| publications/featured-video.json | featured_videos                              |

Sebagian atribut dapat diubah melalui CMS, sementara atribut presentasional yang sensitif terhadap kontrak dapat tetap dibatasi.

### Keep Static — 4 sources

| Source                       | Public API                   |
| ---------------------------- | ---------------------------- |
| institution/profile.json     | GET /institution             |
| institution/functions.json   | GET /institution/functions   |
| institution/legal-bases.json | GET /institution/legal-bases |
| site_content/homepage.json   | GET /site-content/homepage   |

Keempatnya tidak perlu dimigrasikan ke tabel pada baseline.

Backend dapat menyajikannya dari resource statis tervalidasi.

## 9.3 Migration pipeline

```text
Canonical JSON
      |
      v
Source Validation
      |
      v
Field Mapping
      |
      v
Canonical ID Resolution
      |
      v
Foreign Key Resolution
      |
      v
Database Transaction
      |
      v
Parity Verification
      |
      v
Migration Report
```

## 9.4 Seeding requirements

Seeder harus:

- Deterministik.
- Idempotent.
- Dapat diuji.
- Menjaga canonical ID.
- Menjaga slug.
- Menjaga array order bila relevan.
- Mempertahankan field opsional.
- Mempertahankan sumber dan atribusi.
- Memvalidasi referensi lintas-data.
- Tidak menggandakan record.
- Tidak menghapus perubahan CMS secara otomatis.

CONFIRMED task2: 11 file root array dan 11 root object; tidak ada wrapper `value`/`Count` pada canonical aktual. Seeder membaca root sesuai mapping. Bentuk `{value:[...],Count:N}` pada GLOBAL_DATA_CONTEXT.md adalah ekspor historis. Jika suatu task secara eksplisit menerima ekspor itu, value adalah koleksi dan Count hanya metadata; bukan fallback diam-diam untuk canonical yang invalid.

## 9.5 Critical data relationships

Contoh relasi aktual:

- `performance_records.documentId`
- `performance_reports.documentId`
- `public_documents.id`

Ketiganya merujuk kepada dokumen kinerja yang sama melalui canonical ID `lap-lakip-2025`.

Resolver migration harus memetakan canonical ID ini menjadi foreign key internal.

## 9.6 Known data discrepancies

### A. Coverage schema mismatch

JSON aktual `districts.json` memiliki:

- name.
- type.
- areaKm2.
- population.
- totalIsr.
- monitoredIsr.

Spesifikasi API sebelumnya memuat bentuk distrik dengan koordinat dan status stasiun yang berbeda.

**Status: CONFIRMED baseline / contoh lama SUPERSEDED.** Current `types/coverage.ts`, coverage Ajv schema dan canonical JSON sepakat atas enam field distrik serta summary display. Tidak diperlukan keputusan untuk menciptakan field stasiun. Lihat register §6.9.

Jangan menciptakan koordinat atau atribut stasiun.

### B. Performance schema mismatch

JSON aktual menggunakan nilai tampilan metrik seperti `784 ISR`, `100%`, dan `3.92 / 4`.

Sebagian contoh DTO lama mengharapkan field numerik tambahan seperti `target` dan `achievementPercent`.

**Status: CONFIRMED baseline / contoh lama SUPERSEDED.** Current `types/performance.ts` dan Ajv memakai value:string, id dan label dengan caption/highlight/icon opsional. distribution canonical memakai totalValue:string, year:string dan gradient; §6.9 menetapkan composite wajib.

Jangan menurunkan angka yang tidak tersedia tanpa aturan dan sumber resmi.

### C. Data luas wilayah

Penjumlahan `areaKm2` pada 12 record distrik menghasilkan sekitar **93.355,82 km²**.

Ringkasan coverage memuat **89.935,90 km²**.

**Status: UNRESOLVED — perlu verifikasi sumber dan definisi indikator.**

### D. Data ISR

Data awal menunjukkan:

- Total ISR: 958.
- ISR termonitor: 784.
- Metrik spektrum termonitor: 784 ISR.

Kesamaan nilai 784 secara aritmetika dapat diverifikasi, tetapi definisi indikator harus tetap didokumentasikan.

### E. Distribusi 2025

Empat kategori distribusi menghasilkan total **451**.

Total tersebut sesuai dengan ringkasan distribusi dan referensi laporan.

### F. Organization consistency

Data organisasi dan salah satu artikel tahun 2026 memuat informasi pimpinan yang berpotensi berbeda.

**Status: UNRESOLVED — verifikasi dengan sumber resmi.**

Jangan memperbarui identitas pimpinan berdasarkan asumsi.

### G. Static operational metrics

`functions.json` mengandung uraian tugas sekaligus metrik capaian.

Metrik berpotensi mengalami perubahan meskipun deskripsi tugas tetap statis.

**Status: UNRESOLVED — tentukan apakah metrik tetap snapshot statis atau diperoleh dari Performance domain.**

## 9.7 Data parity tests

Minimal validasi:

- Seluruh file canonical dapat dibaca.
- Jumlah koleksi awal sesuai sumber.
- Canonical ID terjaga.
- Slug terjaga.
- Tanggal publikasi valid.
- Link sumber dan media terjaga.
- Urutan array relevan terjaga.
- Referential integrity valid.
- DTO sesuai Ajv.
- Tidak ada field wajib yang hilang.
- Seeding ulang tidak membuat duplikasi.

---

## 9.8 Canonical traceability and import proposal (task2)

Matrix sumber/DTO/reader berikut **CONFIRMED dari frontend**; pilihan destination/classification tetap **PROPOSED**, belum izin migration/seed. Semua file relatif `frontend/src/lib/data/`. Payload schema dipetakan oleh static-contracts.json, bukan root schema domain yang memerlukan version. Root metadata `$schema` office tidak menjadi kolom bisnis/API wajib. `reports.json` memiliki schema internal dan refs nyata, tetapi tidak mempunyai reader publik khusus.

| Canonical JSON | Root/count | PostgreSQL | Module | DTO | GET endpoint | Frontend reader | Classification usulan |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `contacts/office.json` | object/1 | office_settings | contacts | OfficeContactDTO | `/contacts` | getOfficeContact | hybrid |
| `coverage/districts.json` | array/12 | coverage_districts | coverage | DistrictCoverageDTO[] | `/coverage/districts` | getDistricts | dynamic read-only |
| `coverage/spectrum-applications.json` | array/6 | spectrum_applications | coverage | SpectrumApplicationDTO[] | `/coverage/spectrum-applications` | getSpectrumApplications | dynamic read-only |
| `coverage/summary.json` | object/1 | coverage_summary | coverage | CoverageSummaryDTO | `/coverage` | getSummary | dynamic read-only |
| `institution/profile.json` | object/1 | static resource | institution | InstitutionProfileDTO | `/institution` | getProfile | static |
| `institution/functions.json` | array/9 | static resource | institution | OperationalFunctionDTO[] | `/institution/functions` | getFunctions | static |
| `institution/legal-bases.json` | array/6 | static resource | institution | LegalBasisDTO[] | `/institution/legal-bases` | getLegalBases | static |
| `institution/organization.json` | object/1 | organization_settings + organization_people + organization_assignments | institution | OrganizationLeaderDTO[] | `/institution/leaders` | getLeaders | hybrid |
| `performance/metrics-2025.json` | object/1 | performance_records | performance | PerformanceMetricsDTO + distribution | `/performance?year=2025` | getMetrics | dynamic read-only |
| `performance/distribution-2025.json` | object/1 | performance_distributions + performance_distribution_items | performance | PerformanceDistributionDTO in composite | `/performance?year=2025` | getDistribution | dynamic read-only |
| `performance/reports.json` | array/1 | performance_reports → public_documents | performance | reports schema; no public reader | `internal / UNRESOLVED` | none | dynamic read-only |
| `public_information/documents.json` | array/10 | public_documents | public_info | PublicDocumentDTO[] / item | `/documents; /documents/{id}` | getDocuments; getDocumentById | dynamic managed |
| `public_information/ppid.json` | object/1 | ppid_settings | public_info | PpidInfoDTO | `/ppid` | getPpidInfo | dynamic read-only |
| `publications/articles.json` | array/8 | articles | publications | NewsArticleDTO[] / item | `/articles; /articles/{slug}` | getArticles; getArticleBySlug | dynamic managed |
| `publications/education.json` | array/7 | education_topics | publications | EducationTopicDTO[] / item | `/education; /education/{slug}` | getEducationTopics; getEducationTopicBySlug | dynamic managed |
| `publications/featured-video.json` | object/1 | featured_videos | publications | VideoMediaDTO | `/publications/featured-video` | getFeaturedVideo | hybrid |
| `services/catalog.json` | array/4 | services_catalog | services | ServiceItemDTO[] / item | `/services; /services/{slug}` | getCatalog; getServiceBySlug | dynamic managed |
| `services/portals.json` | array/8 | service_portals | services | PortalItemDTO[] | `/portals` | getPortals | dynamic managed |
| `services/faqs.json` | array/4 | service_faqs | services | FaqItemDTO[] | `/faqs` | getFaqs | dynamic managed |
| `services/complaint.json` | object/1 | complaint_settings | services | ComplaintInfoDTO | `/complaints` | getComplaintInfo | hybrid |
| `site_content/hero.json` | object/1 | hero_settings | site_content | HeroContentDTO | `/site-content/hero` | getHero | hybrid |
| `site_content/homepage.json` | object/1 | static resource | site_content | HomepageEditorialDTO | `/site-content/homepage` | getHomepageEditorial | static |


### Deterministic import identity (PROPOSED)

Importer mem-pin SHA-256 seluruh source snapshot dan versi mapping pada manifest yang dibuat/review di task M2-05. Perubahan hash, urutan, missing key atau data CMS berbeda menghasilkan **CONFLICT tanpa write**, bukan blind upsert. Default mode insert-only; rerun hash sama memakai key yang sama dan tidak mengubah record existing. Update/reconcile memerlukan manifest mapping dan approval terpisah; UUID internal tersimpan dan digunakan ulang, bukan mengganti canonical ID.

| Source identity | Stable import rule recommendation |
| --- | --- |
| Canonical id/slug tersedia | Gunakan canonical_id unique; slug public dipertahankan dan collision ditolak |
| FAQ tanpa id | import_key=`faq:<original-zero-based-index>` pada snapshot yang dipin; rerun tetap; reorder/edit membutuhkan mapping lama→baru yang disetujui |
| Distrik tanpa id | district_key=`district:<sha256(NFC(type)+U+0000+NFC(name))>`; tidak trim/casefold diam-diam; rename membutuhkan explicit mapping |
| Personel tanpa id | import_key=`person:<source-pointer>` pada snapshot pin; identity terpisah dari nama. Duplikasi nama tidak di-merge otomatis |
| Assignment tanpa id | import_key=`assignment:<source-pointer>`; manifest mengikat ke person key; original order→sort_order |
| Singleton | id=1; semua source object harus lengkap sebelum write |

source-pointer adalah pointer stabil pada snapshot awal, misalnya institution/organization.json#/leaders/0. Memetakan entri Toninotito di index0 dan2 kepada satu individu adalah rekomendasi **DECISION_REQUIRED**, bukan fakta identity yang boleh diinfer dari nama; owner meninjau alias manifest sebelum import organisasi. Person/assignment baru dari CMS boleh import_key NULL; seeded record wajib mempunyai key. FAQ CMS boleh NULL juga. Uniqueness key mencegah duplikasi seeded records, tetapi hanya hash pin+review mapping yang mencegah positional keys mengubah orang saat reorder. Rerun source berbeda harus gagal secara atomik, tanpa update existing/CMS.

reports.id dipertahankan pada performance_reports.canonical_id; documentId resolve terhadap public_documents.canonical_id (`lap-lakip-2025`) ke UUID. Opsi rekomendasi **PROPOSED**: reports menjadi data internal pendukung/rekonsiliasi, tidak menambah endpoint ke-25 dan tidak mengganti metadata metrics/chart; title/description organization_settings disimpan untuk parity/internal CMS, hanya leaders diekspos oleh reader saat ini. Butuh persetujuan M0-02 sebelum migration terkait; tidak dianggap field hilang karena bukan payload /institution/leaders.

### Database/public completeness and FK policy (PROPOSED)

DBML memakai named checks singleton/nonnegative/year/checksum/published date; nullable draft articles.published_on dibolehkan hanya saat bukan published. Draft/archived/deleted tidak lolos public projection. Coverage numerical fields, assignment.grade_display, performance_records.document_id/chart dan distributions.gradient_css adalah NOT NULL karena DTO memerlukannya dan record tersebut belum punya separate draft model. JSONB divalidasi lengkap sebelum insert/update/publication; NOT NULL sendiri tidak menjamin shape. Incomplete future annual data ditahan pada workflow/input yang belum disetujui, bukan dimasukkan sebagai publik dengan placeholder. Tanggal assignment/reference_year yang belum diketahui tetap NULL; tidak mengisi tahun dari asumsi.

Semua 11 FK memilih **ON DELETE RESTRICT / ON UPDATE RESTRICT** sebagai satu rekomendasi konservatif. Arsip/nonaktifkan akun/role/media/dokumen, jangan hard-delete parent yang direferensi. Alasan per relasi: assignment→person menjaga riwayat; photo/document→media menjaga aset; metrics/report→document menjaga referensi resmi; distribution→metrics dan items→distribution menjaga agregat; user_roles→user/role menjaga assignment; media.uploaded_by dan audit.actor→user menjaga attribution. Penghapusan assignment-role secara eksplisit adalah operasi auth terotorisasi/audited sebelum parent deletion bila kebijakan retensi kelak membolehkan; tak ada cascade implisit. Konsekuensi: cleanup memerlukan operasi eksplisit dan retention review. M0-05 harus menyetujui sebelum DDL.

Distribution parent dan children diperbarui dalam satu transaksi dengan row lock parent; sum count harus total_value dan year metrics/distribution/report referensial konsisten. Count opsional dalam frontend DTO tidak boleh direkayasa ketika sumber masa depan tidak menyediakannya; current seed seluruhnya punya count. Jika tidak lengkap, tandai data unavailable/503, review kebutuhan draft schema terpisah, bukan isi0. Partial unique one-active-video wajib dinyatakan pada migration dan diuji concurrency; note DBML bukan enforcement. updated_at wajib di-set repository setiap UPDATE. FK actions/checks/import_key adalah spesifikasi **PROPOSED**, bukan migration yang sudah diterapkan.

---

# X. FRONTEND–BACKEND INTEGRATION

## 10.1 Existing frontend architecture

Frontend menggunakan:

- SvelteKit 2.
- Svelte 5.
- Repository Provider Pattern.
- Static JSON repositories.
- API repositories.
- Typed DTO interfaces.
- Ajv runtime validation.
- Domain-based source switching.

Backend harus mengikuti kontrak yang sudah digunakan frontend.

## 10.2 Data source switching

Konfigurasi frontend yang didokumentasikan:

```env
BALMON_API_BASE_URL=http://localhost:8000/api/v1/public

BALMON_CONTACTS_SOURCE=static
BALMON_SERVICES_SOURCE=static
BALMON_PUBLICATIONS_SOURCE=static
BALMON_PUBLIC_INFORMATION_SOURCE=static
BALMON_INSTITUTION_SOURCE=static
BALMON_COVERAGE_SOURCE=static
BALMON_PERFORMANCE_SOURCE=static
BALMON_SITE_CONTENT_SOURCE=static
```

CONFIRMED terhadap `frontend/src/lib/config/data-source.ts`: delapan override domain di atas dibaca; default tiap domain static. `BALMON_DATA_SOURCE_DEFAULT` tidak dibaca dan bukan cara mengaktifkan semua domain. Prefix VITE_/PUBLIC_ juga diperiksa resolver; gunakan nama BALMON_ yang sesuai konfigurasi build frontend non-secret. Vite envPrefix mencakup BALMON_; jangan pernah menaruh secret backend pada variabel tersebut.

Strategi integrasi:

1. Jalankan backend.
2. Validasi satu domain API.
3. Aktifkan provider `api` untuk domain tersebut.
4. Jalankan Ajv contract tests.
5. Bandingkan tampilan dan data.
6. Perbaiki incompatibility pada contract/mapper yang disepakati.
7. Lanjutkan domain berikutnya.

Jangan beralih seluruh domain sekaligus sebelum seluruh kontrak lulus.

## 10.3 Frontend timeout

Dokumentasi frontend menetapkan HTTP timeout **8.000 ms**.

Backend sebaiknya memiliki batas internal yang lebih pendek agar kegagalan dapat ditangani sebelum client timeout.

Tidak boleh mengklaim target latency telah terpenuhi tanpa pengukuran.

## 10.4 Prerender and CMS freshness

Dokumentasi frontend menyebut halaman menggunakan prerender.

Ini menimbulkan konsekuensi penting:

**Konten yang berubah di PostgreSQL tidak otomatis memperbarui HTML yang telah diprerender saat build.**

Sebelum CMS produksi, tetapkan salah satu strategi:

- SSR untuk halaman dinamis.
- Prerender dengan rebuild/revalidation terkontrol.
- Pendekatan hybrid yang memisahkan halaman statis dan dinamis.

**Status: DECISION_REQUIRED — OPEN-007; M0 final sign-off/M4-06/M5-07 diblokir sampai strategi disetujui.** Rekomendasi: SSR/hybrid untuk halaman konten yang berubah, static untuk referensi tetap; konsekuensi runtime SSR/hosting perlu diputuskan. Controlled rebuild adalah alternatif yang membutuhkan SLA, retry/rollback dan penemuan slug baru. Tidak ada perubahan frontend dalam task2.

Tidak boleh mengklaim publikasi CMS tampil real-time jika halaman masih hanya mengambil API saat build.

## 10.5 Media URL strategy

Data canonical menggunakan:

- URL media eksternal.
- Referensi gambar lokal.
- YouTube video IDs.
- Source document URLs.
- Asset keys frontend.

Backend harus mempertahankan semantik setiap tipe media.

`source.url` tidak otomatis berarti direct download URL.

Jika admin mengunggah media baru, backend harus menghasilkan URL yang dapat diakses oleh frontend melalui origin yang disepakati.

Tidak semua gambar eksternal harus diunduh ke backend.

## 10.6 No frontend redesign

Pekerjaan backend tidak boleh mengubah:

- Branding.
- Layout.
- Animasi.
- Komponen UI.
- Konfigurasi aksesibilitas.
- Navigasi.
- Repository Reader public interface.

Perubahan frontend hanya dilakukan jika diperlukan untuk kontrak atau SSR dan telah disetujui secara eksplisit.

---

# XI. OPERATIONAL QUALITY, TESTING & OBSERVABILITY

## 11.1 Testing pyramid

### Unit tests

Fokus:

- Domain invariants.
- Application use cases.
- Publication transitions.
- Validation.
- DTO mapping.
- Cache key generation.

### Integration tests

Fokus:

- PostgreSQL repository operations.
- SeaORM migrations.
- Transaction correctness.
- Foreign key integrity.
- Authentication sessions.
- Cache invalidation.
- Media metadata persistence.

### Contract tests

Fokus:

- 24 Public API.
- OpenAPI schemas.
- Frontend Ajv schemas.
- DTO field types.
- Response envelopes.
- Canonical data parity.

### Security tests

Fokus:

- Unauthorized access.
- Forbidden permission.
- CSRF.
- Session expiration.
- Rate limiting.
- Upload restrictions.
- Information leakage.

### Performance tests

Fokus:

- Cache hit/miss.
- p50/p95/p99 latency.
- Connection pool behavior.
- Concurrent requests.
- Database query plans.
- Memory utilization.
- Error rates.

## 11.2 Rust quality gates

```bash
cargo fmt --all -- --check
cargo check --all-targets --all-features
cargo clippy --all-targets --all-features -- -D warnings
cargo test --all-targets --all-features
```

Optional dependency verification:

```bash
cargo audit
cargo deny check
```

Perintah diterapkan sesuai struktur Cargo workspace yang benar-benar digunakan.

Status pengujian harus dinyatakan sebagai:

- PASS.
- FAIL.
- NOT RUN.
- BLOCKED.

## 11.3 Contract integration gates

Minimal:

- 24/24 Public endpoints validated.
- DTO Ajv validation passed.
- Public/private boundary verified.
- Seed parity verified.
- Provider switching verified.
- Error contract verified.
- Media references verified.
- No unintended frontend regressions.

## 11.4 Observability

Baseline:

- Structured JSON logging.
- Request IDs.
- HTTP status metrics.
- Request latency metrics.
- Database error monitoring.
- Cache hit/miss metrics.
- Health endpoints.
- Graceful shutdown.

Proposed health endpoints:

- `GET /health/live`.
- `GET /health/ready`.

Liveness tidak boleh memerlukan database query mahal.

Readiness boleh memeriksa dependensi kritis dengan batas waktu yang ketat.

## 11.5 Administrative audit

Audit mencatat:

- Actor.
- Action.
- Entity type.
- Entity identifier.
- Timestamp.
- Before/after values yang aman.
- Outcome bila relevan.

Rancangan PROPOSED: setiap mutasi CMS yang mengubah state wajib memasukkan audit record dalam transaksi PostgreSQL yang sama. Kegagalan audit membatalkan transaksi; invalidation hanya setelah commit. Login failure/security telemetry terpisah dari transaksi perubahan konten. Persetujuan mekanisme rinci mengikuti M0-06 sebelum M5.

Middleware request logging tidak menggantikan audit domain.

Jangan memasukkan password hash, session token, atau secrets ke snapshot audit.

## 11.6 Production operations

Rencana produksi harus meliputi:

- TLS termination.
- Reverse proxy.
- PostgreSQL backup.
- Backup restoration test.
- Migration rollout.
- Rollback/forward-fix plan.
- Resource limits.
- Health checks.
- Error monitoring.
- Log rotation/retention.
- Secure deployment configuration.

Panduan operasional terperinci berada di `BACKEND_EXECUTION_PLAN.md`.

---

# XII. ARCHITECTURE DECISIONS & OPEN ISSUES

## 12.1 Selected architecture decisions

| ID      | Decision                                 | Status   |
| ------- | ---------------------------------------- | -------- |
| ADR-001 | Rust sebagai backend language            | SELECTED |
| ADR-002 | Axum sebagai HTTP framework              | SELECTED |
| ADR-003 | Tokio sebagai async runtime              | SELECTED |
| ADR-004 | PostgreSQL sebagai database              | SELECTED |
| ADR-005 | SeaORM sebagai ORM utama                 | SELECTED |
| ADR-006 | Feature-Based Modular Monolith           | SELECTED |
| ADR-007 | Four-layer Clean Architecture per module | SELECTED |
| ADR-008 | Tower/tower-http middleware              | SELECTED |
| ADR-009 | Moka sebagai initial application cache   | SELECTED |
| ADR-010 | Server-side sessions untuk CMS           | SELECTED |
| ADR-011 | RBAC dan backend authorization           | SELECTED |
| ADR-012 | Menjaga frontend API contract            | SELECTED |

## 12.2 Proposed design decisions

| ID      | Decision                                                  | Status   |
| ------- | --------------------------------------------------------- | -------- |
| ADR-013 | Database blueprint 26 tabel                               | PROPOSED |
| ADR-014 | Migrasi 18 sumber JSON ke database                        | PROPOSED |
| ADR-015 | Empat sumber JSON tetap statis                            | PROPOSED |
| ADR-016 | Admin publishing workflow Draft/Review/Published/Archived | PROPOSED |
| ADR-017 | Cache TTL per domain                                      | PROPOSED |
| ADR-018 | Media storage strategy                                    | PROPOSED |
| ADR-019 | Performance baseline dan load targets                     | PROPOSED |

## 12.3 Unresolved decisions

| ID       | Issue                                     | Impact                      |
| -------- | ----------------------------------------- | --------------------------- |
| OPEN-001 | SUPERSEDED: DTO lama; canonical baseline §6.9 terverifikasi | Tidak lagi konflik shape Coverage |
| OPEN-002 | SUPERSEDED: metric target lama; composite task2 §6.9 | Backend kontrak lengkap; frontend legacy tetap |
| OPEN-003 | Perbedaan total luas wilayah              | Data integrity              |
| OPEN-004 | Validitas informasi struktur pimpinan     | Konten resmi                |
| OPEN-005 | Metrik dinamis pada functions.json        | Static/dynamic ownership    |
| OPEN-006 | PROPOSED: reports internal, organisasi metadata disimpan (§9.8) | M0-02/M2-05 approval mapping |
| OPEN-007 | SSR/prerender strategy                    | CMS content freshness       |
| OPEN-008 | Admin endpoints final                     | CMS implementation          |
| OPEN-009 | Session cookie origin/deployment topology | Authentication security     |
| OPEN-010 | Media storage dan public URL              | Upload integration          |
| OPEN-011 | Tahun acuan statistik distrik             | Historical data correctness |
| OPEN-012 | Approval workflow dan revision policy     | CMS publication behavior    |

AI Agent harus mengidentifikasi keputusan terbuka yang relevan sebelum mengimplementasikan fitur terdampak.

Jangan mengisi keputusan terbuka dengan data atau perilaku yang tidak tersedia dalam sumber.

## 12.4 M0 acceptance criteria

M0 dianggap selesai hanya jika:

- [ ] Seluruh 22 canonical JSON sudah dipetakan.
- [ ] Kontrak 24 Public API sudah direkonsiliasi dengan frontend.
- [ ] Database DBML final telah diperiksa.
- [ ] Setiap tabel mempunyai module owner.
- [ ] Empat layer dan dependency rule telah disetujui.
- [ ] Middleware scope dan order sudah ditentukan.
- [ ] Authentication dan RBAC baseline ditetapkan.
- [ ] Caching policy dan invalidation baseline ditetapkan.
- [ ] Strategi data migration telah disetujui.
- [ ] Strategi SSR/prerender untuk CMS ditetapkan.
- [ ] Open issues kritis telah diselesaikan atau diberi keputusan penundaan yang aman.
- [ ] BACKEND_EXECUTION_PLAN.md konsisten dengan blueprint.
- [ ] Tidak ada ketidaksesuaian kritis antara dokumen, OpenAPI, dan DBML.

## 12.5 Engineering implementation policy

AI Agent wajib mengikuti:

**Read → Analyze → Design → Implement → Verify → Report.**

Aturan:

1. Baca `AGENTS.md`.
2. Gunakan CodeGraph untuk memahami source saat tersedia.
3. Baca skill relevan.
4. Identifikasi task dari Execution Plan.
5. Periksa bagian Blueprint terkait.
6. Periksa actual source dan kontrak.
7. Lakukan impact analysis.
8. Implementasikan scope yang diizinkan.
9. Jalankan pengujian.
10. Laporkan status dan bukti.

Agent tidak boleh mengubah frontend, database, atau API kontrak secara sepihak.

---

## 12.6 Decision gates and task2 remediation status

Task2 menyetujui pekerjaan dokumentasi, bukan seluruh proposal arsitektur atau implementasi. Semua opsi baru pada §7.12/§8.9/§9.8 dan DBML memerlukan review owner. Satu rekomendasi dipilih per isu agar dapat dinilai tanpa mengarang fakta deployment/data.

| Decision | Rekomendasi tunggal | Konsekuensi / milestone yang menunggu | Status |
| --- | --- | --- | --- |
| OPEN-003 area discrepancy | Pertahankan kedua indikator dengan provenance sampai pemilik sumber memberi definisi | Tidak mengubah canonical; seed/publish nilai resmi terkait M2-05/M3-06 menunggu otorisasi snapshot | DECISION_REQUIRED |
| OPEN-004 pimpinan | Simpan snapshot organisasi dan artikel historis; minta tanggal berlaku/identitas resmi | Mapping person/assignment M2-05 dan publish institution M5-05 tertahan | DECISION_REQUIRED |
| OPEN-005 functions metrics | Pertahankan snapshot file sebagai rekomendasi awal, berlabel periode saat owner menentukan | Refresh data/functions CMS M4-06/M5 perlu keputusan; tidak memindah metrik ke Performance otomatis | DECISION_REQUIRED |
| OPEN-011 district reference year | Simpan NULL dan provenance, minta tahun sumber | Klaim historis/tahun serta pembaruan statistik M2-05/M5-08 tertahan | DECISION_REQUIRED |
| OPEN-007 rendering | SSR/hybrid untuk konten berubah; referensi tetap static | Hosting runtime dan frontend task terotorisasi diperlukan; M4-06/M5-07 tertahan | DECISION_REQUIRED |
| OPEN-009 topology | Satu instance backend di belakang same-origin HTTPS reverse proxy | Origin/proxy/cookie/store policy harus diuji aktual; M1 external exposure/M5/M6 tertahan | PROPOSED, topology aktual UNKNOWN |
| OPEN-010 production media | Object storage private upload + public safe asset origin, metadata PostgreSQL | Biaya/provider/CORS/backup belum disetujui; M5-06/M6 tertahan | PROPOSED / DECISION_REQUIRED |
| OPEN-008/012 CMS API/workflow | Draft→Review→Published→Archived, permission matrix §7.12; perubahan published perlu revision policy | Admin contract belum final; tidak mengekspos CRUD sementara; M5 tertahan | PROPOSED / DECISION_REQUIRED |
| DB/import/retention | Terima spesifikasi checks/restrict/import manifest §9.8 setelah parser/review | M0-05/M2 migration dan seed belum boleh dimulai | PROPOSED |
| Auth/cache policies | Terima PostgreSQL session + token CSRF + atomic audit + guarded cache/bypass | M0-06/M4/M5 perlu approval dan pengujian race/cancellation | PROPOSED |

Gate M0 penuh tetap memerlukan semua checklist §12.4, validator DBML/OpenAPI semantik yang sesuai, dan approval yang belum diklaim. Restricted M1-01 scaffold verification/M1-05 boundary verification dapat dinilai independen menurut Execution Plan §2.6; tidak berarti M0 atau M1 DONE. Tidak ada coding M1 pada task2. Laporan `ouput/` mencatat 21 finding statuses serta PASS/FAIL/NOT RUN/BLOCKED berdasarkan eksekusi aktual, bukan mengganti verdict lama tanpa bukti.

---

# FINAL ARCHITECTURE SUMMARY

**Project:** Balmon Pekanbaru Public Portal
**Backend:** Rust + Axum + Tokio
**Database:** PostgreSQL + SeaORM
**Caching:** Moka
**Middleware:** Tower + tower-http
**Authentication:** Server-side sessions + Argon2id
**Authorization:** RBAC
**Architecture:** Modular Monolith + 4 Layers
**Modules:** 10 proposed feature modules
**Database:** 26 proposed tables
**Canonical Source:** 22 frontend JSON files
**Public API:** 24 GET endpoints
**API Integration:** SvelteKit Repository Provider Pattern
**API Validation:** Ajv + OpenAPI contract tests
**Engineering Standard:** SOLID, DRY, KISS, YAGNI
**Current Phase:** M0 — Architecture & Contract Finalization

## Closing Directive

Backend Balmon Pekanbaru harus dikembangkan dengan prioritas:

**Correctness, Security, Maintainability, Reliability, and Measured Performance.**

Seluruh implementasi wajib mengikuti kontrak frontend yang telah disepakati, menjaga integritas data, dan membatasi kompleksitas sesuai kebutuhan nyata.

Blueprint ini merupakan dasar perencanaan teknis.

**Status: DRAFT — belum menjadi bukti implementasi, pengujian, ataupun kesiapan produksi.**

---

**End of BACKEND_BLUEPRINT.md — Version 1.1.0**


## Task4 — delegated development approval and current implementation

OWNER_DELEGATED_APPROVAL: `task/task4.md` authorizes routine local/staging technical choices and proceeding with M1 before later milestone decisions are finalized. Historical approval gates above are superseded for that scope; unresolved official facts and production operations remain outside this delegation. Selected initial baseline: server-generated UUID request IDs, no query/header logging, 6 s timeout, 64 KiB request limit, no auth/admin routes until protected, bounded SeaORM pool with startup ping. Full M0/M1 acceptance remains incomplete; see `ouput/IMPLEMENTATION_STATUS.md` for current evidence and limitations.
