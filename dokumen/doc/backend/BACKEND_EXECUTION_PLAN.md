
# BACKEND_EXECUTION_PLAN.md

## BALMON PEKANBARU — RUST BACKEND IMPLEMENTATION & DELIVERY PLAN

**Document ID:** BE-EP-001
**Version:** 1.1.0
**Status:** DRAFT — PLANNING ONLY
**Date:** 5 November 2026
**Project:** Portal Balai Monitor Spektrum Frekuensi Radio Kelas I Pekanbaru
**Repository:** `D:\KERJA\magang hub\batch2\Balaimonitor\balmon-pekanbaru`
**Execution Model:** AI-Assisted, Milestone-Based, Contract-First Development
**Architecture:** Feature-Based Modular Monolith + 4-Layer Clean Architecture

**Related documents:**

- `AGENTS.md`
- `doc/backend/BACKEND_BLUEPRINT.md`
- `doc/backend/database.dbml`
- `doc/backend/openapi.v1.yaml`

**Important:** This document defines planned work. It does not authorize autonomous implementation, production deployment, or changes outside an explicitly approved task.

---

# I. PURPOSE & EXECUTION PRINCIPLES

## 1.1 Purpose

Dokumen ini menjadi panduan eksekusi bagi AI coding agent untuk mengembangkan backend Balmon Pekanbaru menggunakan Rust dan Axum.

Tujuan utamanya:

1. Mengubah rancangan arsitektur menjadi pekerjaan teknis yang terukur.
2. Menentukan urutan pekerjaan dan dependensi.
3. Mencegah implementasi berdasarkan asumsi.
4. Mempertahankan kompatibilitas dengan frontend yang sudah tersedia.
5. Mengimplementasikan keamanan dan performa secara bertahap.
6. Memastikan setiap hasil mempunyai bukti pengujian.
7. Mendukung pengembangan yang efisien untuk solo developer.

## 1.2 Development philosophy

Gunakan prinsip:

**Contract First → Architecture First → Small Implementation → Test → Review → Continue.**

Setiap perubahan wajib menjaga:

- Correctness.
- Security.
- Reliability.
- Maintainability.
- SOLID.
- DRY.
- KISS.
- YAGNI.
- Data integrity.
- Frontend compatibility.

AI Agent dilarang membuat fitur tambahan yang tidak terdapat dalam scope task.

## 1.3 Implementation strategy

Backend dikembangkan menggunakan strategi **vertical slices**.

Artinya, setelah fondasi tersedia, setiap domain dapat diselesaikan dari:

Presentation → Application → Domain → Infrastructure → PostgreSQL → Contract Tests.

Hindari membangun seluruh handler terlebih dahulu tanpa persistence yang dapat diuji.

Hindari membuat abstraction layer yang belum memiliki kebutuhan nyata.

## 1.4 Scope baseline

**In scope:**

- Rust Axum backend foundation.
- PostgreSQL dan SeaORM.
- 26 tabel usulan setelah verifikasi desain.
- Migrasi canonical JSON.
- 24 Public API endpoints.
- Tower middleware.
- Moka caching.
- Admin authentication.
- Role-based authorization.
- CMS CRUD.
- Media upload.
- Audit log.
- Frontend integration.
- Production readiness.

**Out of scope:**

- Payment gateway.
- Sistem perizinan ISR transaksional.
- Sistem tiket pengaduan baru.
- Sistem permohonan PPID transaksional.
- Live telemetry perangkat.
- Microservices.
- Kubernetes.
- Kafka.
- Redis sebagai dependensi awal.
- Redesign frontend.
- Modifikasi data resmi tanpa verifikasi.

---

# II. WORKFLOW & TASK GOVERNANCE

## 2.1 Task execution rules

Sebelum mengerjakan task, AI Agent wajib:

1. Membaca `AGENTS.md`.
2. Membaca task terkait.
3. Membaca bagian relevan `BACKEND_BLUEPRINT.md`.
4. Memeriksa spesifikasi DBML atau OpenAPI bila relevan.
5. Memeriksa source frontend menggunakan CodeGraph.
6. Membaca skill engineering yang relevan.
7. Melakukan impact analysis.
8. Mengidentifikasi test yang harus dijalankan.
9. Memastikan task tidak diblokir keputusan yang belum diselesaikan.

Setelah itu barulah implementasi dapat dilakukan apabila task memang telah diotorisasi.

## 2.2 Task status

Gunakan status pekerjaan:

| Status      | Makna                                                   |
| ----------- | ------------------------------------------------------- |
| PLANNED     | Belum dimulai                                           |
| READY       | Dependensi terpenuhi dan siap dilaksanakan              |
| IN_PROGRESS | Sedang dikerjakan                                       |
| BLOCKED     | Terhalang keputusan atau dependensi                     |
| REVIEW      | Implementasi selesai, perlu pemeriksaan                 |
| DONE        | Seluruh acceptance criteria dan quality gates terpenuhi |

Status `DONE` hanya boleh diberikan dengan bukti verifikasi.

## 2.3 Verification status

Untuk setiap perintah pengujian, gunakan:

- **PASS:** dijalankan dan berhasil.
- **FAIL:** dijalankan dan gagal.
- **NOT RUN:** belum dijalankan.
- **BLOCKED:** tidak dapat dijalankan karena kendala teridentifikasi.

Jangan mengubah `NOT RUN` menjadi `PASS` berdasarkan hasil pengujian sebelumnya.

## 2.4 Task sizing

Setiap task idealnya:

- Memiliki satu tujuan utama.
- Mengubah satu domain atau batasan teknis yang jelas.
- Dapat diuji secara independen.
- Memiliki acceptance criteria yang objektif.
- Menghindari refactor di luar scope.
- Tidak melakukan perubahan database produksi.

Task yang terlalu besar perlu dipecah menjadi subtask sebelum implementasi.

Contoh:

`M3-04` dapat dipecah menjadi `M3-04A`, `M3-04B`, dan seterusnya jika pekerjaan Publications berkembang lebih kompleks.

## 2.5 Dependencies and advancement

Milestone berikutnya hanya dapat dinyatakan lulus jika gate milestone sebelumnya telah terpenuhi.

Pekerjaan independen dapat dikerjakan lebih awal selama tidak bergantung pada keputusan yang masih terbuka.

Dilarang menggunakan hasil implementasi parsial sebagai bukti bahwa seluruh milestone telah selesai.

---

## 2.6 Restricted M1 verification and approval boundaries

M0 penuh tetap BLOCKED selama DBML parser/OpenAPI full semantic validator dan keputusan owner yang wajib belum tersedia. Task2 hanya memberi otorisasi revisi dokumen. Milestone tidak maju hanya karena task independen dapat dijalankan lebih awal (§2.5).

Kandidat aman secara teknis setelah **task baru mengotorisasi cakupan ini secara eksplisit**: M1-01 memeriksa scaffold/manifes/lock dan compilation existing; M1-05 memeriksa sepuluh modul/empat layer/import boundaries existing. Keduanya verification-only, tanpa init ulang repo, dependency installation/update, `.env` read, koneksi DB, server exposed, migration/seed, perubahan frontend atau implementasi handler. Maksud dependencies M0-01 pada jalur terbatas adalah inventory terverifikasi, bukan persetujuan M0 penuh. Jika diperlukan edit source/lock/dependency untuk membuat check lulus, berhenti pada hasil FAIL/BLOCKED dan minta scope perbaikan konkret.

M1-02/03/04 dan implementasi M1-01/05 tetap memerlukan M0-07 + approval yang relevan. Tidak ada unsafe interim admin router. Technical readiness, task authorization, milestone completion dan production approval adalah empat hal terpisah. Tidak ada M1 coding pada task2.

## 2.7 Executable verification profiles, approval and recovery

Command berikut adalah **rencana pengujian**, bukan hasil eksekusi task2. Record command, working directory, OS/tool version, exit code dan PASS/FAIL/NOT RUN/BLOCKED. Jika alat WSL gagal, catat hanya WSL; jalankan toolchain Windows pada task yang diotorisasi bila sesuai, jangan menyatakan Windows rusak dari kegagalan WSL. Gunakan rtk jika tersedia; jika command not found gunakan fallback langsung dan catat keterbatasan.

| Profile | Verification commands / mandatory evidence |
| --- | --- |
| V-DOC | Dari root: `git diff --check` (untuk working tree CRLF: `git -c core.whitespace=blank-at-eol,blank-at-eof,space-before-tab,cr-at-eol diff --check`; tidak mengubah konfigurasi Git); `git diff --stat`; `git status --short`. Jika lokal tersedia: `dbml2sql doc/backend/database.dbml --postgres` (stdout, tanpa DDL execution); `openapi-spec-validator doc/backend/openapi.v1.yaml`. Parser/semantic yang tidak tersedia = NOT RUN, bukan PASS. Jalankan pemeriksaan Python yaml.safe_load + local pointer resolution, Draft202012Validator.check_schema,24path parity,22file traceability dan sample/negative fixtures; bukan klaim Ajv/OAS parser penuh. Laporan ouput menyimpan recipe dan bukti task2. |
| V-RUST | Dari backend: `cargo fmt --all -- --check`; `cargo check --locked --all-targets --all-features`; `cargo clippy --locked --all-targets --all-features -- -D warnings`; `cargo test --locked --all-targets --all-features`. Untuk jalur verification-only tambahkan `--offline` pada check/clippy/test; lock tidak boleh berubah. Zero tests bukan fitur teruji. Sesuaikan workspace migrasi setelah dibuat, jangan mengecualikannya. |
| V-FOUNDATION | V-RUST + config validation/secret-redaction, health/live/ready, request-id/rejection/timeout/body/security/fallback ordering tests. M1-04 juga bounded pool success/failure/shutdown memakai database disposable terotorisasi. Jalur M1-01/05 terbatas hanya existing compilation/static boundary evidence. |
| V-DB | V-RUST termasuk migration crate + `cargo test --locked --test integration` setelah suite nyata dibuat. Isolated PostgreSQL: create-empty-schema, CHECK/NULL/unique/FK rejection, active-video concurrency, rollback,2x import, changed-source conflict dan CMS-edit preservation. Schema/seed commands baru harus didokumentasikan task M2-01/05 saat CLI benar-benar tersedia; jangan mengarang command executable sekarang. |
| V-CONTRACT | `cargo test --locked --test contracts` setelah suite ada;24endpoint, every success/error/status/header, canonical parity, filtering/order/id/date, unknown-year404 dan partial-year503. Jalankan x-contract-fixtures OpenAPI dengan validator; integrasi Ajv frontend pada V-FRONTEND. |
| V-HTTP-CACHE | `cargo test --locked --test integration`; `cargo test --locked --test security` setelah cases nyata; ordering/preflight/anonymous/admin/cache/request-id tests, paused-old-fill vs write,rollback,no-store,error/cancellation/bypass/query key isolation. M4 tidak menunggu implementasi CMS M5 untuk mutation fixture lokal. |
| V-FRONTEND | Dari frontend: `node scripts/data/validate.js`; `node scripts/data/test-provider-switching.js`; `pnpm exec svelte-check --tsconfig ./tsconfig.json --threshold error`; `pnpm exec vitest run src/lib/contracts/ src/lib/repositories/ src/lib/accessibility/ src/lib/motion/ src/lib/api/`. Build PowerShell: `$env:RAYON_NUM_THREADS="1"` lalu `pnpm run build`; browser smoke hanya jika diotorisasi. Jangan mengubah frontend untuk membuat tes lulus. |
| V-ADMIN | `cargo test --locked --test security`; `cargo test --locked --test integration`; `cargo test --locked --test contracts` setelah suite berisi tests. Matrix deny-by-default/resource, CSRF/login/logout, rotation/expiry/role revoke/disabled user, MIME/signature/size/path, audit rollback, protected CRUD dan draft leakage. Semua mutasi sudah atomic-audited sebelum publishing task. |
| V-OPS | V-RUST + `cargo audit` / `cargo deny check` jika terpasang; staging/security/load/backup+restore drills hanya setelah approval environment. Benchmark catat p50/p95/p99, hardware,dataset,cache,pool,concurrency,duration,error-rate; belum ada command load/restore spesifik karena topology belum dipilih. Task M6-03/05 wajib memilih tool/commands yang tersedia dan prosedur aman sebelum run. |

| Approval gate | Requirement |
| --- | --- |
| G-DOC | Otorisasi edit dokumentasi saat ini; owner review tetap diperlukan untuk proposal DB/security/data/freshness. Tidak mengeksekusi source/database. |
| G-IMPLEMENT | M0-07 + otorisasi task eksplisit, kecuali verification-only §2.6. HTTP baseline §7.12 Blueprint disetujui sebelum M1-03. Koneksi DB test harus dikonfirmasi terisolasi. |
| G-SCHEMA | M0-05 approval DBML,parser PASS,FK/check/import identity/provenance decisions; database disposable/backup/recovery disiapkan. Tidak ada production data mutation. |
| G-PUBLIC | M0-04 contract review, prerequisite M2, complete public projection, keputusan owner domain terkait; bukan mengubah frontend contract. |
| G-INTEGRATION | M3 + persetujuan HTTP/cache; M4-06 membutuhkan keputusan OPEN-007 dan scope frontend/testing eksplisit sebelum perubahan frontend apa pun. |
| G-ADMIN | Session/CSRF/permission/store/topology dan API admin final telah disetujui; M5-01→M5-02→protected CRUD. Media dan workflow tergantung OPEN-010/012. |
| G-RELEASE | Semua gates relevan PASS, topology dan rollback disetujui, staging/restore/load evidence, explicit release authorization terpisah dari approval code/doc. |

| Failure profile | Rollback / recovery yang wajib disiapkan |
| --- | --- |
| R-DOC | Perbaiki hanya edit dokumen task yang salah; jangan git restore/history rewrite atau menyentuh sumber existing. Pertahankan keputusan pending dan laporkan parser/tool blocker. |
| R-CODE | Pada test failure jangan publish/advance; perbaiki diff task yang diotorisasi, pertahankan user changes. Tidak menghapus test/security check. Re-run check yang terdampak. |
| R-DB | Kegagalan import/audit = rollback transaksi,tidak invalidate. Migration pada disposable DB diuji recreate/down bila aman; prod memerlukan backup+tested restore/forward-fix, bukan mengasumsikan down mengembalikan data. |
| R-INTEGRATION | Matikan rollout provider/domain atau bypass cache sesuai runbook yang disetujui; jangan mengubah canonical atau silent fallback atas error API. Rebuild/SSR rollback mengikuti keputusan freshness. |
| R-OPS | Stop release,route ke versi sehat yang backward-compatible; restore data/media hanya prosedur berizin dan restore teruji. Tangani committed-but-response-timeout sebagai outcome ambigu, bukan retry write otomatis. |

## 2.8 Per-task dependency register (authoritative DAG)

Register ini melengkapi tiap task. Semua dependency adalah task IDs existing; G-* menambahkan gate approval/environment dan bukan node implementasi. Urutan nomor tidak selalu urutan eksekusi: M2-04 mendahului M2-02 agar media/FK tersedia; M5-06 mendahului CRUD yang mereferensi media. Tidak ada ketergantungan cache pada CMS yang belum dibuat.

| Task ID | Initial status task2 | Direct dependencies |
| --- | --- | --- |
| M0-01 | DONE | NONE (source inventory) |
| M0-02 | BLOCKED | M0-01 |
| M0-03 | BLOCKED | M0-02 |
| M0-04 | REVIEW | M0-01, M0-02 |
| M0-05 | BLOCKED | M0-02 |
| M0-06 | BLOCKED | M0-04, M0-05 |
| M0-07 | BLOCKED | M0-01, M0-02, M0-03, M0-04, M0-05, M0-06 |
| M1-01 | BLOCKED | M0-01 |
| M1-02 | PLANNED | M0-07, M1-01 |
| M1-03 | PLANNED | M1-02, M0-04, M0-06 |
| M1-04 | PLANNED | M1-02, M1-03 |
| M1-05 | BLOCKED | M1-01 |
| M1-06 | PLANNED | M1-03, M1-04, M1-05 |
| M2-01 | PLANNED | M1-06, M0-05 |
| M2-02 | PLANNED | M2-01, M2-04 |
| M2-03 | PLANNED | M2-01, M2-02, M2-04 |
| M2-04 | PLANNED | M2-01 |
| M2-05 | PLANNED | M2-02, M2-03, M2-04, M0-03 |
| M2-06 | PLANNED | M2-05 |
| M3-01 | PLANNED | M2-06, M1-03, M0-04 |
| M3-02 | PLANNED | M3-01 |
| M3-03 | PLANNED | M3-01 |
| M3-04 | PLANNED | M3-01 |
| M3-05 | PLANNED | M3-01 |
| M3-06 | PLANNED | M3-01, M0-03 |
| M3-07 | PLANNED | M3-02, M3-03, M3-04, M3-05, M3-06 |
| M4-01 | PLANNED | M1-03, M3-07 |
| M4-02 | PLANNED | M4-01 |
| M4-03 | PLANNED | M4-01 |
| M4-04 | PLANNED | M4-03 |
| M4-05 | PLANNED | M4-01, M4-03 |
| M4-06 | PLANNED | M3-07, M4-04, M4-05, M0-06 |
| M4-07 | PLANNED | M4-02, M4-04, M4-05, M4-06 |
| M5-01 | PLANNED | M4-07, M2-04, M0-06 |
| M5-02 | PLANNED | M5-01 |
| M5-03 | PLANNED | M5-02, M5-06 |
| M5-04 | PLANNED | M5-02 |
| M5-05 | PLANNED | M5-02, M5-06 |
| M5-06 | PLANNED | M5-02 |
| M5-07 | PLANNED | M5-03, M5-04, M5-05, M4-04 |
| M5-08 | PLANNED | M5-02, M3-06, M4-04 |
| M5-09 | PLANNED | M5-03, M5-04, M5-05, M5-06, M5-07, M5-08 |
| M6-01 | PLANNED | M5-09 |
| M6-02 | PLANNED | M5-09 |
| M6-03 | PLANNED | M6-02 |
| M6-04 | PLANNED | M6-01, M6-03 |
| M6-05 | PLANNED | M6-04 |
| M6-06 | PLANNED | M6-04, M6-05 |
| M6-07 | PLANNED | M6-01, M6-03, M6-05, M6-06 |

Status implementasi existing M1-01/M1-05: SCAFFOLDED_ONLY; semua runtime gates NOT RUN. Task status REVIEW tidak berarti proposal disetujui. Selesainya deliverable dokumentasi tidak mengubah status task implementasi menjadi DONE.

---

# III. MILESTONE ROADMAP

## 3.1 Milestone overview

| Milestone | Name                                 | Primary Outcome                                            |
| --------- | ------------------------------------ | ---------------------------------------------------------- |
| M0        | Architecture & Contract Finalization | Blueprint dan kontrak siap diimplementasikan               |
| M1        | Rust Backend Foundation              | Axum berjalan, struktur modul dan DB connectivity siap     |
| M2        | Database & Canonical Migration       | Skema dan data awal tervalidasi                            |
| M3        | Public REST API                      | 24 endpoint publik kompatibel dengan frontend              |
| M4        | Middleware, Cache & FE Integration   | Keamanan HTTP, caching, observability dan integrasi teruji |
| M5        | Admin API, Authentication & CMS      | Operasi administratif dan workflow publikasi               |
| M6        | Hardening & Production Readiness     | Deployment, security, performance, backup dan recovery     |

## 3.2 Dependency graph

M0 → M1 → M2 → M3 → M4 → M5 → M6 (milestone exit order; task DAG di bawah memperbolehkan verification-only §2.6)

Pekerjaan pengujian keamanan, review kode, dan dokumentasi harus dilakukan terus-menerus sejak milestone yang relevan, bukan hanya pada M6.

## 3.3 Current project status

**Current planning milestone:** M0
**Implementation status: SCAFFOLDED_ONLY (CONFIRMED source inspection, task2).** Cargo files dan sepuluh modul dengan empat layer tersedia. main hanya Hello world; app/config/state/middleware/infra/layer bisnis dan tiga test files masih komentar. Tidak ada Axum server, PostgreSQL repository atau API yang telah diimplementasikan. Compilation/functionality belum diverifikasi pada task2.

Execution plan sudah berisi 1882 baris saat task2 dimulai (berbeda dengan audit task1 yang menemukan file kosong). Task2 melengkapi dokumen existing; tidak menghapus pekerjaan existing. M0 belum lulus karena validasi dan owner decisions masih pending.

AI Agent harus memeriksa repository aktual sebelum menetapkan status implementasi.

---

# IV. M0 — ARCHITECTURE & CONTRACT FINALIZATION

## Objective

Memastikan seluruh kebutuhan, kontrak, database, dan keputusan arsitektur sudah konsisten sebelum backend diimplementasikan.

**Priority:** CRITICAL
**Dependencies:** Frontend documentation, canonical JSON, engineering decisions.

### M0-01 — Frontend Source Inventory

**Objective:** Frontend Source Inventory; hasil dibatasi scope di bawah, bukan izin milestone berikutnya.
**Dependencies:** NONE (source inventory).
**Status:** DONE — inventory and validation evidence below; not approval of M0 as a whole.
**Deliverables:** perubahan spesifikasi/source yang memang diotorisasi pada scope ini + acceptance evidence; test case bernama yang relevan dan task report dengan command/exit/status. Tidak membuat dokumen/abstraksi tambahan tanpa kebutuhan.
**Verification commands:** V-DOC di §2.7; jalankan hanya setelah task terkait diotorisasi. Semua status awal runtime NOT RUN.
**Approval gate:** G-DOC; §2.7. Task documentation tidak memberi approval implementasi otomatis.
**Rollback / failure:** R-DOC; §2.7. Hentikan hanya bagian yang terdampak; jangan restore perubahan existing.


**Scope:**

- Identifikasi 22 canonical JSON.
- Verifikasi 8 domain frontend.
- Verifikasi Repository Provider Pattern.
- Identifikasi 25 reader methods.
- Verifikasi 24 Public API endpoint.
- Identifikasi schema Ajv.
- Identifikasi query parameter dan response envelope.
- Verifikasi konfigurasi static/API switching.

**Deliverables:**

- Source inventory terverifikasi.
- Domain-to-endpoint mapping.
- Contract dependency map.

**Acceptance criteria:**

- [x] Seluruh 22 sumber ditemukan atau ketidakhadirannya dilaporkan.
- [x] Seluruh reader method dipetakan.
- [x] Seluruh endpoint dipetakan.
- [x] Semua schema terkait teridentifikasi.
- [x] Tidak ada source dependency yang diasumsikan tanpa pemeriksaan.

**Verification evidence — task3, 5 November 2026:** PASS: 22 canonical JSON validated with frontend Ajv 2020 configuration and ajv-formats in a network-isolated, read-only sandbox; 24 GET paths match frontend OpenAPI; 25 reader methods counted; all schema bindings resolved; actual provider variable and 8,000 ms timeout checked. CodeGraph Windows v1.6.2 status reported 279 files and current index; source was also inspected directly. The public API itself is not implemented or runtime-tested. Full evidence and environment limits: `doc/backend/ouput/IMPLEMENTATION_STATUS.md`.

### M0-02 — Canonical Data Traceability

**Objective:** Canonical Data Traceability; hasil dibatasi scope di bawah, bukan izin milestone berikutnya.
**Dependencies:** M0-01.
**Status:** BLOCKED.
**Deliverables:** perubahan spesifikasi/source yang memang diotorisasi pada scope ini + acceptance evidence; test case bernama yang relevan dan task report dengan command/exit/status. Tidak membuat dokumen/abstraksi tambahan tanpa kebutuhan.
**Verification commands:** V-DOC di §2.7; jalankan hanya setelah task terkait diotorisasi. Semua status awal runtime NOT RUN.
**Approval gate:** G-DOC; §2.7. Task documentation tidak memberi approval implementasi otomatis.
**Rollback / failure:** R-DOC; §2.7. Hentikan hanya bagian yang terdampak; jangan restore perubahan existing.


**Scope:**

Bangun mapping:

Canonical JSON → Field → Database → DTO → Public API → Frontend Reader.

Periksa:

- Field types.
- Required/optional values.
- Nested JSON.
- IDs dan slugs.
- Array ordering.
- Source metadata.
- Media references.
- Cross-domain relationships.

**Deliverables:**

- Field-level traceability matrix.
- Data ownership decisions.
- Data migration mapping.

**Acceptance criteria:**

- [ ] Semua sumber JSON mempunyai mapping.
- [ ] Tidak ada field wajib yang hilang tanpa keputusan.
- [ ] Seluruh relasi canonical teridentifikasi.
- [ ] Field tambahan dinyatakan sebagai proposal.

### M0-03 — Contract Conflict Resolution

**Objective:** Contract Conflict Resolution; hasil dibatasi scope di bawah, bukan izin milestone berikutnya.
**Dependencies:** M0-02.
**Status:** BLOCKED.
**Deliverables:** perubahan spesifikasi/source yang memang diotorisasi pada scope ini + acceptance evidence; test case bernama yang relevan dan task report dengan command/exit/status. Tidak membuat dokumen/abstraksi tambahan tanpa kebutuhan.
**Verification commands:** V-DOC di §2.7; jalankan hanya setelah task terkait diotorisasi. Semua status awal runtime NOT RUN.
**Approval gate:** G-DOC; §2.7. Task documentation tidak memberi approval implementasi otomatis.
**Rollback / failure:** R-DOC; §2.7. Hentikan hanya bagian yang terdampak; jangan restore perubahan existing.


**Scope:**

Selesaikan konflik yang sudah diketahui:

1. Coverage JSON vs DTO.
2. Coverage summary vs DTO.
3. Performance metrics vs DTO.
4. Performance distribution vs DTO.
5. Struktur `value` dan `Count`.
6. Mapping `reports.json`.
7. Perbedaan luas wilayah.
8. Perbedaan informasi pimpinan.
9. Metrik dinamis dalam `functions.json`.
10. Tahun acuan statistik wilayah.

**Deliverables:**

- Decision log.
- Resolved mapping.
- Daftar isu yang perlu verifikasi eksternal.

**Acceptance criteria:**

- [ ] Tidak ada konflik kontrak kritis tanpa keputusan.
- [ ] Data yang tidak tersedia tidak direkayasa.
- [ ] Konflik data resmi diberi status verifikasi yang jelas.
- [ ] Perubahan skema terdokumentasi.

Konflik data yang tidak memengaruhi domain yang sedang dikerjakan dapat ditunda hanya melalui keputusan eksplisit.

### M0-04 — API Contract Finalization

**Objective:** API Contract Finalization; hasil dibatasi scope di bawah, bukan izin milestone berikutnya.
**Dependencies:** M0-01, M0-02.
**Status:** REVIEW.
**Deliverables:** perubahan spesifikasi/source yang memang diotorisasi pada scope ini + acceptance evidence; test case bernama yang relevan dan task report dengan command/exit/status. Tidak membuat dokumen/abstraksi tambahan tanpa kebutuhan.
**Verification commands:** V-DOC di §2.7; jalankan hanya setelah task terkait diotorisasi. Semua status awal runtime NOT RUN.
**Approval gate:** G-DOC; §2.7. Task documentation tidak memberi approval implementasi otomatis.
**Rollback / failure:** R-DOC; §2.7. Hentikan hanya bagian yang terdampak; jangan restore perubahan existing.


**Scope:**

- Finalisasi 24 Public API.
- Definisikan DTO request/response.
- Tetapkan success/error envelope.
- Tetapkan query, filtering dan pagination.
- Tetapkan HTTP status codes.
- Susun rancangan Admin API.
- Tentukan kebijakan kompatibilitas versi.

**Deliverable:**

`doc/backend/openapi.v1.yaml`

**Acceptance criteria:**

- [ ] 24 endpoint publik terdokumentasi.
- [ ] Semua schema response terdefinisi.
- [ ] Query parameter valid.
- [ ] OpenAPI valid secara sintaksis dan struktural.
- [ ] Kontrak cocok dengan Ajv/Reader frontend yang disepakati.

**Verification evidence — task3, 5 November 2026:** PASS: Redocly CLI 2.75.0 semantic lint (exit 0) in a network-isolated, read-only sandbox; three warnings remain: missing license metadata, localhost development server, and unused PerformanceMetricsDTO component. Invalid examples identified in the first lint run were corrected; frontend and canonical files were not changed. PASS: current OpenAPI was also checked with Ajv 2020 against 192 response examples and eight positive/negative fixtures; 24 paths and canonical contacts/functions examples match frontend data. Owner review of proposed query/error behavior remains pending; status stays REVIEW.

### M0-05 — Database Blueprint Finalization

**Objective:** Database Blueprint Finalization; hasil dibatasi scope di bawah, bukan izin milestone berikutnya.
**Dependencies:** M0-02.
**Status:** BLOCKED.
**Deliverables:** perubahan spesifikasi/source yang memang diotorisasi pada scope ini + acceptance evidence; test case bernama yang relevan dan task report dengan command/exit/status. Tidak membuat dokumen/abstraksi tambahan tanpa kebutuhan.
**Verification commands:** V-DOC di §2.7; jalankan hanya setelah task terkait diotorisasi. Semua status awal runtime NOT RUN.
**Approval gate:** G-DOC; §2.7. Task documentation tidak memberi approval implementasi otomatis.
**Rollback / failure:** R-DOC; §2.7. Hentikan hanya bagian yang terdampak; jangan restore perubahan existing.


**Scope:**

- Review 26 tabel usulan.
- Review primary/foreign keys.
- Review UUID/canonical ID.
- Review constraints.
- Review JSONB.
- Review indexes.
- Review singleton settings.
- Review cascade/soft deletion.
- Review annual performance data model.

**Deliverable:**

`doc/backend/database.dbml`

**Acceptance criteria:**

- [x] DBML dapat diparsing.
- [ ] Semua tabel memiliki owner module.
- [ ] Foreign key valid.
- [ ] Tidak ada indeks unik duplikat yang tidak perlu.
- [ ] Semua data canonical mempunyai destination.
- [ ] Tidak ada destructive assumption.

**Verification evidence — task3, 5 November 2026:** PASS: official `@dbml/core` 11.0.1 `Parser.parse(..., "dbmlv2")` in a network-isolated, read-only sandbox. PostgreSQL DDL export also produced 26 tables, 26 checks and 11 foreign keys; all exported FKs include DEFERRABLE INITIALLY IMMEDIATE although DBML does not explicitly specify deferrability. Review that implicit behavior before migrations. This is parser/export evidence only, not owner approval or proof SQL/migrations/constraints have been applied. DBML ownership, FK actions, imports and data decisions remain PROPOSED/DECISION_REQUIRED; task stays BLOCKED.

### M0-06 — Security, Caching & Integration Decisions

**Objective:** Security, Caching & Integration Decisions; hasil dibatasi scope di bawah, bukan izin milestone berikutnya.
**Dependencies:** M0-04, M0-05.
**Status:** BLOCKED.
**Deliverables:** perubahan spesifikasi/source yang memang diotorisasi pada scope ini + acceptance evidence; test case bernama yang relevan dan task report dengan command/exit/status. Tidak membuat dokumen/abstraksi tambahan tanpa kebutuhan.
**Verification commands:** V-DOC di §2.7; jalankan hanya setelah task terkait diotorisasi. Semua status awal runtime NOT RUN.
**Approval gate:** G-DOC; §2.7. Task documentation tidak memberi approval implementasi otomatis.
**Rollback / failure:** R-DOC; §2.7. Hentikan hanya bagian yang terdampak; jangan restore perubahan existing.


**Scope:**

- Tentukan session architecture.
- Tentukan origin topology CMS dan API.
- Tentukan CSRF policy.
- Finalisasi role/permission baseline.
- Tentukan cache ownership dan invalidation.
- Tentukan media storage.
- Tetapkan SSR/prerender strategy.
- Tetapkan deployment environment assumptions.

**Deliverables:**

- Security baseline.
- Cache policy.
- Integration decisions.
- Updated architecture decisions.

**Acceptance criteria:**

- [ ] Authentication boundary jelas.
- [ ] Authorization ownership jelas.
- [ ] Cache tidak membocorkan data admin.
- [ ] CMS freshness strategy diputuskan.
- [ ] Tidak ada asumsi deployment yang tidak terdokumentasi.

### M0-07 — Architecture Freeze & Implementation Readiness

**Objective:** Architecture Freeze & Implementation Readiness; hasil dibatasi scope di bawah, bukan izin milestone berikutnya.
**Dependencies:** M0-01, M0-02, M0-03, M0-04, M0-05, M0-06.
**Status:** BLOCKED.
**Deliverables:** perubahan spesifikasi/source yang memang diotorisasi pada scope ini + acceptance evidence; test case bernama yang relevan dan task report dengan command/exit/status. Tidak membuat dokumen/abstraksi tambahan tanpa kebutuhan.
**Verification commands:** V-DOC di §2.7; jalankan hanya setelah task terkait diotorisasi. Semua status awal runtime NOT RUN.
**Approval gate:** G-DOC; §2.7. Task documentation tidak memberi approval implementasi otomatis.
**Rollback / failure:** R-DOC; §2.7. Hentikan hanya bagian yang terdampak; jangan restore perubahan existing.


**Scope:**

- Finalisasi Rust stack.
- Review kompatibilitas dependency.
- Tetapkan empat layer per modul.
- Tetapkan middleware Tower composition.
- Tetapkan migration strategy.
- Tetapkan quality gates.
- Sinkronkan Blueprint, DBML, OpenAPI dan Execution Plan.

**Deliverables:**

- Architecture baseline.
- Implementation readiness checklist.

**M0 EXIT GATE:**

- [ ] Semua task M0 yang wajib berstatus DONE.
- [ ] API contract siap.
- [ ] Database model siap.
- [ ] Layer boundaries jelas.
- [ ] Security decisions tersedia.
- [ ] Tidak ada unresolved blocker untuk M1.
- [ ] Dokumentasi konsisten.
- [ ] Approval implementasi diperoleh.

**Gate result:** BLOCKED — full parser/approval/owner decisions belum terpenuhi; lihat §2.6 untuk jalur verification-only terbatas.

---

# V. M1 — RUST BACKEND FOUNDATION

## Objective

Membangun fondasi Rust Axum yang aman, modular, dapat diuji, dan dapat terhubung ke PostgreSQL.

**Dependencies:** M0 exit gate untuk implementasi; pengecualian verifikasi scaffold/boundary terbatas hanya §2.6.

### M1-01 — Rust Project Scaffold

**Objective:** Rust Project Scaffold; hasil dibatasi scope di bawah, bukan izin milestone berikutnya.
**Dependencies:** M0-01.
**Status:** BLOCKED. SCAFFOLDED_ONLY; static structure verified, compilation/gate not yet passed.
**Deliverables:** perubahan spesifikasi/source yang memang diotorisasi pada scope ini + acceptance evidence; test case bernama yang relevan dan task report dengan command/exit/status. Tidak membuat dokumen/abstraksi tambahan tanpa kebutuhan.
**Verification commands:** V-RUST + V-FOUNDATION di §2.7; jalankan hanya setelah task terkait diotorisasi. Semua status awal runtime NOT RUN.
**Approval gate:** G-IMPLEMENT; §2.7. Task documentation tidak memberi approval implementasi otomatis.
**Rollback / failure:** R-CODE; §2.7. Hentikan hanya bagian yang terdampak; jangan restore perubahan existing.


**Scope:**

- Verifikasi/adaptasi Cargo application existing; jangan menginisialisasi ulang atau menimpa scaffold.
- Periksa berkas existing `main.rs`, `app.rs`, `config.rs`, `state.rs`; implementasi hanya pada task eksplisit setelah gate.
- Buat struktur shared, middleware, infra dan modules.
- Audit dependency/lock minimum existing; perubahan dependency harus dijustifikasi dan versi kompatibel diverifikasi.
- Siapkan `.env.example`.
- Siapkan `.gitignore` yang aman.

**Acceptance:**

- [ ] Project dapat dikompilasi.
- [ ] Tidak ada secret baru dalam diff yang diotorisasi; jangan membuka `.env` atau mengklaim secret scan seluruh history.
- [ ] Struktur sesuai Blueprint.
- [ ] Dependency tidak berlebihan.

**Verification evidence — task3, 5 November 2026:** PASS: Cargo 1.99.1 metadata `--locked --offline --no-deps`, Windows `cargo fmt --all -- --check`, and direct inspection of 10 module exports / 50 files. BLOCKED: Linux `cargo check --locked --offline --all-targets --all-features` in an isolated sandbox could not obtain `errno v0.3.14` from the read-only offline registry cache. No project dependencies or lockfile were changed. Existing test files have no tests, so no functionality PASS is claimed. M0-07 and owner approval remain prerequisites for implementation.

### M1-02 — Configuration & AppState

**Objective:** Configuration & AppState; hasil dibatasi scope di bawah, bukan izin milestone berikutnya.
**Dependencies:** M0-07, M1-01.
**Status:** PLANNED.
**Deliverables:** perubahan spesifikasi/source yang memang diotorisasi pada scope ini + acceptance evidence; test case bernama yang relevan dan task report dengan command/exit/status. Tidak membuat dokumen/abstraksi tambahan tanpa kebutuhan.
**Verification commands:** V-RUST + V-FOUNDATION di §2.7; jalankan hanya setelah task terkait diotorisasi. Semua status awal runtime NOT RUN.
**Approval gate:** G-IMPLEMENT; §2.7. Task documentation tidak memberi approval implementasi otomatis.
**Rollback / failure:** R-CODE; §2.7. Hentikan hanya bagian yang terdampak; jangan restore perubahan existing.


**Scope:**

- Typed environment configuration.
- Validasi variabel wajib.
- Database URL.
- Server host/port.
- Logging configuration.
- Cache defaults.
- Environment separation.

**Acceptance:**

- [ ] Konfigurasi tidak valid ditolak.
- [ ] Secret tidak muncul pada log.
- [ ] Shared state dibuat sekali saat startup.
- [ ] Konfigurasi production dapat dibedakan dari development.

### M1-03 — Axum Routing & Error Foundation

**Objective:** Axum Routing & Error Foundation; hasil dibatasi scope di bawah, bukan izin milestone berikutnya.
**Dependencies:** M1-02, M0-04, M0-06.
**Status:** PLANNED.
**Deliverables:** perubahan spesifikasi/source yang memang diotorisasi pada scope ini + acceptance evidence; test case bernama yang relevan dan task report dengan command/exit/status. Tidak membuat dokumen/abstraksi tambahan tanpa kebutuhan.
**Verification commands:** V-RUST + V-FOUNDATION di §2.7; jalankan hanya setelah task terkait diotorisasi. Semua status awal runtime NOT RUN.
**Approval gate:** G-IMPLEMENT; §2.7. Task documentation tidak memberi approval implementasi otomatis.
**Rollback / failure:** R-CODE; §2.7. Hentikan hanya bagian yang terdampak; jangan restore perubahan existing.


**Scope:**

- Public router.
- Namespace auth/admin tetap tidak dipasang; jangan membuat placeholder handler yang terbuka.
- Middleware dasar sejak M1: request ID, redaction, tracing, security headers, body/timeout/error normalization (§7.12 Blueprint); bukan menunggu M4.
- Health endpoints.
- Error taxonomy.
- Success/error envelope.
- Not found handling.

**Acceptance:**

- [ ] Router dapat berjalan.
- [ ] `/health/live` bekerja.
- [ ] 404 dikembalikan secara benar.
- [ ] Error envelope konsisten.
- [ ] Handler tidak mengakses database langsung.

### M1-04 — PostgreSQL Connectivity

**Objective:** PostgreSQL Connectivity; hasil dibatasi scope di bawah, bukan izin milestone berikutnya.
**Dependencies:** M1-02, M1-03.
**Status:** PLANNED.
**Deliverables:** perubahan spesifikasi/source yang memang diotorisasi pada scope ini + acceptance evidence; test case bernama yang relevan dan task report dengan command/exit/status. Tidak membuat dokumen/abstraksi tambahan tanpa kebutuhan.
**Verification commands:** V-RUST + V-FOUNDATION di §2.7; jalankan hanya setelah task terkait diotorisasi. Semua status awal runtime NOT RUN.
**Approval gate:** G-IMPLEMENT; §2.7. Task documentation tidak memberi approval implementasi otomatis.
**Rollback / failure:** R-CODE; §2.7. Hentikan hanya bagian yang terdampak; jangan restore perubahan existing.


**Scope:**

- Konfigurasi SeaORM.
- Bounded connection pool.
- Startup DB health verification.
- Connection error handling.
- Graceful shutdown.

**Acceptance:**

- [ ] Koneksi berhasil pada database test.
- [ ] Kegagalan koneksi ditangani.
- [ ] Pool tidak dibuat per request.
- [ ] Tidak ada query tidak terparameterisasi.
- [ ] Koneksi dibersihkan saat shutdown.

### M1-05 — Architecture Module Skeleton

**Objective:** Architecture Module Skeleton; hasil dibatasi scope di bawah, bukan izin milestone berikutnya.
**Dependencies:** M1-01.
**Status:** BLOCKED. SCAFFOLDED_ONLY; static structure verified, compilation/gate not yet passed.
**Deliverables:** perubahan spesifikasi/source yang memang diotorisasi pada scope ini + acceptance evidence; test case bernama yang relevan dan task report dengan command/exit/status. Tidak membuat dokumen/abstraksi tambahan tanpa kebutuhan.
**Verification commands:** V-RUST + V-FOUNDATION di §2.7; jalankan hanya setelah task terkait diotorisasi. Semua status awal runtime NOT RUN.
**Approval gate:** G-IMPLEMENT; §2.7. Task documentation tidak memberi approval implementasi otomatis.
**Rollback / failure:** R-CODE; §2.7. Hentikan hanya bagian yang terdampak; jangan restore perubahan existing.


**Scope:**

Siapkan module boundaries untuk:

- publications.
- services.
- public_info.
- institution.
- coverage.
- performance.
- contacts.
- site_content.
- auth.
- media.

Gunakan empat layer untuk modul yang mulai diimplementasikan.

**Acceptance:**

- [ ] Struktur modular konsisten.
- [ ] Tidak ada dependency melanggar arsitektur.
- [ ] Compilation berhasil.
- [ ] Tidak ada boilerplate berlebihan.

**Verification evidence — task3, 5 November 2026:** PASS: Cargo 1.99.1 metadata `--locked --offline --no-deps`, Windows `cargo fmt --all -- --check`, and direct inspection of 10 module exports / 50 files. BLOCKED: Linux `cargo check --locked --offline --all-targets --all-features` in an isolated sandbox could not obtain `errno v0.3.14` from the read-only offline registry cache. No project dependencies or lockfile were changed. Existing test files have no tests, so no functionality PASS is claimed. M0-07 and owner approval remain prerequisites for implementation.

### M1-06 — Foundation Tests & CI

**Objective:** Foundation Tests & CI; hasil dibatasi scope di bawah, bukan izin milestone berikutnya.
**Dependencies:** M1-03, M1-04, M1-05.
**Status:** PLANNED.
**Deliverables:** perubahan spesifikasi/source yang memang diotorisasi pada scope ini + acceptance evidence; test case bernama yang relevan dan task report dengan command/exit/status. Tidak membuat dokumen/abstraksi tambahan tanpa kebutuhan.
**Verification commands:** V-RUST + V-FOUNDATION di §2.7; jalankan hanya setelah task terkait diotorisasi. Semua status awal runtime NOT RUN.
**Approval gate:** G-IMPLEMENT; §2.7. Task documentation tidak memberi approval implementasi otomatis.
**Rollback / failure:** R-CODE; §2.7. Hentikan hanya bagian yang terdampak; jangan restore perubahan existing.


**Scope:**

- Unit test dasar.
- Router smoke tests.
- Configuration tests.
- Health tests.
- Cargo formatting/lint/test gates.
- CI baseline bila repository CI tersedia.

**M1 EXIT GATE:**

- [ ] Backend berhasil build.
- [ ] Health tests lulus.
- [ ] DB connection test lulus.
- [ ] Config validation tests lulus.
- [ ] Cargo fmt/check/clippy/test lulus.
- [ ] Tidak ada secrets dalam diff.

**Gate result:** NOT RUN.

---

# VI. M2 — DATABASE & CANONICAL MIGRATION

## Objective

Menerapkan schema PostgreSQL dan memigrasikan data canonical frontend secara aman dan idempotent.

**Dependencies:** M1 exit + DBML final yang disetujui (M0-05).

### M2-01 — SeaORM Entity & Migration Foundation

**Objective:** SeaORM Entity & Migration Foundation; hasil dibatasi scope di bawah, bukan izin milestone berikutnya.
**Dependencies:** M1-06, M0-05.
**Status:** PLANNED.
**Deliverables:** perubahan spesifikasi/source yang memang diotorisasi pada scope ini + acceptance evidence; test case bernama yang relevan dan task report dengan command/exit/status. Tidak membuat dokumen/abstraksi tambahan tanpa kebutuhan.
**Verification commands:** V-RUST + V-DB di §2.7; jalankan hanya setelah task terkait diotorisasi. Semua status awal runtime NOT RUN.
**Approval gate:** G-SCHEMA; §2.7. Task documentation tidak memberi approval implementasi otomatis.
**Rollback / failure:** R-DB; §2.7. Hentikan hanya bagian yang terdampak; jangan restore perubahan existing.


**Scope:**

- Entity definitions.
- Enum handling.
- Foreign key configuration.
- Migration structure.
- Database constraints.
- Migration test environment.

**Acceptance:**

- [ ] Schema dapat dibuat dari database kosong.
- [ ] Constraints dapat diterapkan.
- [ ] Foreign key valid.
- [ ] Migration dapat diuji ulang.
- [ ] Model cocok dengan DBML yang disetujui.

### M2-02 — Core Content Schema

**Objective:** Core Content Schema; hasil dibatasi scope di bawah, bukan izin milestone berikutnya.
**Dependencies:** M2-01, M2-04.
**Status:** PLANNED.
**Deliverables:** perubahan spesifikasi/source yang memang diotorisasi pada scope ini + acceptance evidence; test case bernama yang relevan dan task report dengan command/exit/status. Tidak membuat dokumen/abstraksi tambahan tanpa kebutuhan.
**Verification commands:** V-RUST + V-DB di §2.7; jalankan hanya setelah task terkait diotorisasi. Semua status awal runtime NOT RUN.
**Approval gate:** G-SCHEMA; §2.7. Task documentation tidak memberi approval implementasi otomatis.
**Rollback / failure:** R-DB; §2.7. Hentikan hanya bagian yang terdampak; jangan restore perubahan existing.


**Scope:**

Implementasi tabel konten prioritas:

- articles.
- education_topics.
- featured_videos.
- public_documents.
- services_catalog.
- service_portals.
- service_faqs.

**Acceptance:**

- [ ] Tabel sesuai desain.
- [ ] Unique constraints bekerja.
- [ ] Field optional sesuai canonical.
- [ ] Unit/integration tests lulus.

### M2-03 — Institutional & Statistical Schema

**Objective:** Institutional & Statistical Schema; hasil dibatasi scope di bawah, bukan izin milestone berikutnya.
**Dependencies:** M2-01, M2-02, M2-04.
**Status:** PLANNED.
**Deliverables:** perubahan spesifikasi/source yang memang diotorisasi pada scope ini + acceptance evidence; test case bernama yang relevan dan task report dengan command/exit/status. Tidak membuat dokumen/abstraksi tambahan tanpa kebutuhan.
**Verification commands:** V-RUST + V-DB di §2.7; jalankan hanya setelah task terkait diotorisasi. Semua status awal runtime NOT RUN.
**Approval gate:** G-SCHEMA; §2.7. Task documentation tidak memberi approval implementasi otomatis.
**Rollback / failure:** R-DB; §2.7. Hentikan hanya bagian yang terdampak; jangan restore perubahan existing.


**Scope:**

Implementasi tabel:

- office settings.
- organization.
- coverage.
- performance.
- PPID.
- complaint settings.
- hero settings.

**Acceptance:**

- [ ] Semua entitas yang disetujui tersedia.
- [ ] Relasi organisasi benar.
- [ ] Relasi laporan-dokumen benar.
- [ ] Data tahunan dapat direpresentasikan.
- [ ] Singleton constraints diterapkan.

### M2-04 — CMS Infrastructure Schema

**Objective:** CMS Infrastructure Schema; hasil dibatasi scope di bawah, bukan izin milestone berikutnya.
**Dependencies:** M2-01.
**Status:** PLANNED.
**Deliverables:** perubahan spesifikasi/source yang memang diotorisasi pada scope ini + acceptance evidence; test case bernama yang relevan dan task report dengan command/exit/status. Tidak membuat dokumen/abstraksi tambahan tanpa kebutuhan.
**Verification commands:** V-RUST + V-DB di §2.7; jalankan hanya setelah task terkait diotorisasi. Semua status awal runtime NOT RUN.
**Approval gate:** G-SCHEMA; §2.7. Task documentation tidak memberi approval implementasi otomatis.
**Rollback / failure:** R-DB; §2.7. Hentikan hanya bagian yang terdampak; jangan restore perubahan existing.


**Scope:**

Implementasi:

- admin_users.
- admin_roles.
- admin_user_roles.
- media_assets.
- audit_logs.

**Acceptance:**

- [ ] RBAC relations valid.
- [ ] Media metadata valid.
- [ ] Audit references valid.
- [ ] Tidak ada secret plaintext yang disimpan.

### M2-05 — Canonical Import & Seeding

**Objective:** Canonical Import & Seeding; hasil dibatasi scope di bawah, bukan izin milestone berikutnya.
**Dependencies:** M2-02, M2-03, M2-04, M0-03.
**Status:** PLANNED.
**Deliverables:** perubahan spesifikasi/source yang memang diotorisasi pada scope ini + acceptance evidence; test case bernama yang relevan dan task report dengan command/exit/status. Tidak membuat dokumen/abstraksi tambahan tanpa kebutuhan.
**Verification commands:** V-RUST + V-DB di §2.7; jalankan hanya setelah task terkait diotorisasi. Semua status awal runtime NOT RUN.
**Approval gate:** G-SCHEMA; §2.7. Task documentation tidak memberi approval implementasi otomatis.
**Rollback / failure:** R-DB; §2.7. Hentikan hanya bagian yang terdampak; jangan restore perubahan existing.


**Scope:**

- JSON parser.
- Canonical schema validation.
- Deterministic import.
- ID mapping.
- Foreign key resolution.
- Insert-only default + idempotent rerun sumber hash sama; source/CMS konflik berhenti tanpa overwrite; reconcile/upsert hanya dengan mapping dan approval terpisah.
- Import error reporting.
- Transaction safety.

**Acceptance:**

- [ ] Seluruh sumber dynamic/hybrid yang disetujui dapat diimpor.
- [ ] Re-import tidak membuat duplikasi.
- [ ] Slug dan ID terjaga.
- [ ] Relasi valid.
- [ ] Kegagalan impor tidak meninggalkan data parsial yang tidak konsisten.
- [ ] Data CMS tidak ditimpa otomatis setelah menjadi sumber utama.

### M2-06 — Static Resources & Data Parity Verification

**Objective:** Static Resources & Data Parity Verification; hasil dibatasi scope di bawah, bukan izin milestone berikutnya.
**Dependencies:** M2-05.
**Status:** PLANNED.
**Deliverables:** perubahan spesifikasi/source yang memang diotorisasi pada scope ini + acceptance evidence; test case bernama yang relevan dan task report dengan command/exit/status. Tidak membuat dokumen/abstraksi tambahan tanpa kebutuhan.
**Verification commands:** V-RUST + V-DB di §2.7; jalankan hanya setelah task terkait diotorisasi. Semua status awal runtime NOT RUN.
**Approval gate:** G-SCHEMA; §2.7. Task documentation tidak memberi approval implementasi otomatis.
**Rollback / failure:** R-DB; §2.7. Hentikan hanya bagian yang terdampak; jangan restore perubahan existing.


**Scope:**

- Load empat static resources.
- Validasi schema.
- Pastikan format output kompatibel.
- Bandingkan hasil database dengan canonical JSON.
- Uji mapping nested fields.
- Verifikasi laporan, coverage, dan distribusi.

**M2 EXIT GATE:**

- [ ] Seluruh migrasi yang disetujui berhasil.
- [ ] Data parity lulus.
- [ ] Seeding idempotent.
- [ ] Foreign key integrity lulus.
- [ ] Static sources tervalidasi.
- [ ] Tidak ada data canonical yang hilang tanpa keputusan.
- [ ] Database dapat dibuat ulang pada lingkungan test.

**Gate result:** NOT RUN.

---

# VII. M3 — PUBLIC REST API

## Objective

Mengimplementasikan seluruh 24 Public API yang kompatibel dengan Repository Provider Pattern frontend.

**Dependencies:** M2 + OpenAPI final.

## 7.1 General API requirements

Setiap endpoint wajib:

- Menggunakan DTO.
- Menjaga response envelope.
- Memvalidasi request.
- Menangani error.
- Menggunakan repository melalui Application Layer.
- Mematuhi schema frontend.
- Tidak mengekspos draft.
- Mempertahankan canonical ID dan slug.
- Memiliki endpoint tests.
- Mendukung timeout sesuai kebijakan.

### M3-01 — Shared API Contract Verification Harness

**Objective:** Shared API Contract Verification Harness; hasil dibatasi scope di bawah, bukan izin milestone berikutnya.
**Dependencies:** M2-06, M1-03, M0-04.
**Status:** PLANNED.
**Deliverables:** perubahan spesifikasi/source yang memang diotorisasi pada scope ini + acceptance evidence; test case bernama yang relevan dan task report dengan command/exit/status. Tidak membuat dokumen/abstraksi tambahan tanpa kebutuhan.
**Verification commands:** V-RUST + V-CONTRACT di §2.7; jalankan hanya setelah task terkait diotorisasi. Semua status awal runtime NOT RUN.
**Approval gate:** G-PUBLIC; §2.7. Task documentation tidak memberi approval implementasi otomatis.
**Rollback / failure:** R-CODE; §2.7. Hentikan hanya bagian yang terdampak; jangan restore perubahan existing.


**Scope:**

- Gunakan ulang response DTO/error mapper M1-03; jangan membuat implementasi duplikat.
- Tambahkan contract harness dan validasi, bukan redefinisi envelope.
- Query validation.
- Serialization helpers.
- Pagination strategy.
- Date formatting.
- Contract test harness.

**Acceptance:**

- [ ] Envelope valid.
- [ ] Error mapping konsisten.
- [ ] DTO sesuai OpenAPI.
- [ ] Tidak ada model database yang dikembalikan langsung.

### M3-02 — Contacts, Institution & Site Content

**Objective:** Contacts, Institution & Site Content; hasil dibatasi scope di bawah, bukan izin milestone berikutnya.
**Dependencies:** M3-01.
**Status:** PLANNED.
**Deliverables:** perubahan spesifikasi/source yang memang diotorisasi pada scope ini + acceptance evidence; test case bernama yang relevan dan task report dengan command/exit/status. Tidak membuat dokumen/abstraksi tambahan tanpa kebutuhan.
**Verification commands:** V-RUST + V-CONTRACT di §2.7; jalankan hanya setelah task terkait diotorisasi. Semua status awal runtime NOT RUN.
**Approval gate:** G-PUBLIC; §2.7. Task documentation tidak memberi approval implementasi otomatis.
**Rollback / failure:** R-CODE; §2.7. Hentikan hanya bagian yang terdampak; jangan restore perubahan existing.


**Scope:** 7 endpoint.

- GET `/contacts`
- GET `/institution`
- GET `/institution/functions`
- GET `/institution/leaders`
- GET `/institution/legal-bases`
- GET `/site-content/hero`
- GET `/site-content/homepage`

**Acceptance:**

- [ ] Seluruh endpoint merespons sesuai kontrak.
- [ ] Static dan database-backed data terintegrasi.
- [ ] Struktur data tidak berubah.
- [ ] Contract tests lulus.

### M3-03 — Services API

**Objective:** Services API; hasil dibatasi scope di bawah, bukan izin milestone berikutnya.
**Dependencies:** M3-01.
**Status:** PLANNED.
**Deliverables:** perubahan spesifikasi/source yang memang diotorisasi pada scope ini + acceptance evidence; test case bernama yang relevan dan task report dengan command/exit/status. Tidak membuat dokumen/abstraksi tambahan tanpa kebutuhan.
**Verification commands:** V-RUST + V-CONTRACT di §2.7; jalankan hanya setelah task terkait diotorisasi. Semua status awal runtime NOT RUN.
**Approval gate:** G-PUBLIC; §2.7. Task documentation tidak memberi approval implementasi otomatis.
**Rollback / failure:** R-CODE; §2.7. Hentikan hanya bagian yang terdampak; jangan restore perubahan existing.


**Scope:** 5 endpoint.

- GET `/services`
- GET `/services/{slug}`
- GET `/portals`
- GET `/faqs`
- GET `/complaints`

**Acceptance:**

- [ ] Filter layanan bekerja.
- [ ] Slug lookup benar.
- [ ] Category filter valid.
- [ ] FAQ ordering konsisten.
- [ ] Error 404 benar.

### M3-04 — Publications API

**Objective:** Publications API; hasil dibatasi scope di bawah, bukan izin milestone berikutnya.
**Dependencies:** M3-01.
**Status:** PLANNED.
**Deliverables:** perubahan spesifikasi/source yang memang diotorisasi pada scope ini + acceptance evidence; test case bernama yang relevan dan task report dengan command/exit/status. Tidak membuat dokumen/abstraksi tambahan tanpa kebutuhan.
**Verification commands:** V-RUST + V-CONTRACT di §2.7; jalankan hanya setelah task terkait diotorisasi. Semua status awal runtime NOT RUN.
**Approval gate:** G-PUBLIC; §2.7. Task documentation tidak memberi approval implementasi otomatis.
**Rollback / failure:** R-CODE; §2.7. Hentikan hanya bagian yang terdampak; jangan restore perubahan existing.


**Scope:** 5 endpoint.

- GET `/articles`
- GET `/articles/{slug}`
- GET `/education`
- GET `/education/{slug}`
- GET `/publications/featured-video`

**Acceptance:**

- [ ] Published article filtering benar.
- [ ] Featured filtering benar.
- [ ] Slug unik.
- [ ] Publication dates valid.
- [ ] Source dan image metadata terjaga.
- [ ] Draft tidak dapat diakses publik.
- [ ] Endpoint detail mengembalikan 404 jika tidak tersedia.

### M3-05 — Public Information API

**Objective:** Public Information API; hasil dibatasi scope di bawah, bukan izin milestone berikutnya.
**Dependencies:** M3-01.
**Status:** PLANNED.
**Deliverables:** perubahan spesifikasi/source yang memang diotorisasi pada scope ini + acceptance evidence; test case bernama yang relevan dan task report dengan command/exit/status. Tidak membuat dokumen/abstraksi tambahan tanpa kebutuhan.
**Verification commands:** V-RUST + V-CONTRACT di §2.7; jalankan hanya setelah task terkait diotorisasi. Semua status awal runtime NOT RUN.
**Approval gate:** G-PUBLIC; §2.7. Task documentation tidak memberi approval implementasi otomatis.
**Rollback / failure:** R-CODE; §2.7. Hentikan hanya bagian yang terdampak; jangan restore perubahan existing.


**Scope:** 3 endpoint.

- GET `/documents`
- GET `/documents/{id}`
- GET `/ppid`

**Acceptance:**

- [ ] Category/year filter bekerja.
- [ ] Canonical document ID terjaga.
- [ ] URL sumber tidak berubah secara tidak sengaja.
- [ ] PPID data kompatibel.
- [ ] Tidak ada data pemohon karena belum termasuk scope.

### M3-06 — Coverage & Performance API

**Objective:** Coverage & Performance API; hasil dibatasi scope di bawah, bukan izin milestone berikutnya.
**Dependencies:** M3-01, M0-03.
**Status:** PLANNED.
**Deliverables:** perubahan spesifikasi/source yang memang diotorisasi pada scope ini + acceptance evidence; test case bernama yang relevan dan task report dengan command/exit/status. Tidak membuat dokumen/abstraksi tambahan tanpa kebutuhan.
**Verification commands:** V-RUST + V-CONTRACT di §2.7; jalankan hanya setelah task terkait diotorisasi. Semua status awal runtime NOT RUN.
**Approval gate:** G-PUBLIC; §2.7. Task documentation tidak memberi approval implementasi otomatis.
**Rollback / failure:** R-CODE; §2.7. Hentikan hanya bagian yang terdampak; jangan restore perubahan existing.


**Scope:** 4 endpoint.

- GET `/coverage`
- GET `/coverage/districts`
- GET `/coverage/spectrum-applications`
- GET `/performance`

**Acceptance:**

- [ ] DTO Coverage mengikuti keputusan M0.
- [ ] Statistik tidak direkayasa.
- [ ] Data tahunan valid.
- [ ] Performance metrics dan distribution sesuai kontrak.
- [ ] Nilai source terpelihara.
- [ ] Query year ditangani dengan benar.

### M3-07 — Full Public Contract Verification

**Objective:** Full Public Contract Verification; hasil dibatasi scope di bawah, bukan izin milestone berikutnya.
**Dependencies:** M3-02, M3-03, M3-04, M3-05, M3-06.
**Status:** PLANNED.
**Deliverables:** perubahan spesifikasi/source yang memang diotorisasi pada scope ini + acceptance evidence; test case bernama yang relevan dan task report dengan command/exit/status. Tidak membuat dokumen/abstraksi tambahan tanpa kebutuhan.
**Verification commands:** V-RUST + V-CONTRACT di §2.7; jalankan hanya setelah task terkait diotorisasi. Semua status awal runtime NOT RUN.
**Approval gate:** G-PUBLIC; §2.7. Task documentation tidak memberi approval implementasi otomatis.
**Rollback / failure:** R-CODE; §2.7. Hentikan hanya bagian yang terdampak; jangan restore perubahan existing.


**Scope:**

- 24 endpoint verification.
- JSON Schema validation.
- OpenAPI validation.
- Response envelope tests.
- Error behavior tests.
- Pagination/filter tests.
- Canonical parity tests.

**M3 EXIT GATE:**

- [ ] 24/24 Public API tersedia.
- [ ] 24/24 endpoint lulus contract tests.
- [ ] Seluruh DTO yang relevan lulus Ajv.
- [ ] Tidak ada draft leak.
- [ ] Error responses valid.
- [ ] Tidak ada breaking changes yang tidak disetujui.
- [ ] Database queries stabil pada dataset pengujian.

**Gate result:** NOT RUN.

---

# VIII. M4 — MIDDLEWARE, CACHING & FRONTEND INTEGRATION

## Objective

Mengeraskan lapisan HTTP, menerapkan caching, observability, serta menguji integrasi backend dengan frontend yang sudah ada.

**Dependencies:** M3.

### M4-01 — Global Tower Middleware Regression & Completion

**Objective:** Global Tower Middleware Regression & Completion; hasil dibatasi scope di bawah, bukan izin milestone berikutnya.
**Dependencies:** M1-03, M3-07.
**Status:** PLANNED.
**Deliverables:** perubahan spesifikasi/source yang memang diotorisasi pada scope ini + acceptance evidence; test case bernama yang relevan dan task report dengan command/exit/status. Tidak membuat dokumen/abstraksi tambahan tanpa kebutuhan.
**Verification commands:** V-RUST + V-HTTP-CACHE; V-FRONTEND hanya M4-06/07 di §2.7; jalankan hanya setelah task terkait diotorisasi. Semua status awal runtime NOT RUN.
**Approval gate:** G-INTEGRATION; §2.7. Task documentation tidak memberi approval implementasi otomatis.
**Rollback / failure:** R-INTEGRATION; §2.7. Hentikan hanya bagian yang terdampak; jangan restore perubahan existing.


**Scope:**

- Verifikasi dan lengkapi request ID/tracing/security headers/redaction yang sudah diwajibkan M1-03.
- Regresi seluruh failure responses dan urutan response middleware.
- Compression.
- Body limits.
- Timeout handling.

**Acceptance:**

- [ ] Middleware order diuji.
- [ ] Request ID tersedia.
- [ ] Error responses tetap terstruktur.
- [ ] Sensitive data tidak dicatat.
- [ ] Timeout ditangani.
- [ ] Body terlalu besar ditolak.

### M4-02 — Scoped HTTP Security

**Objective:** Scoped HTTP Security; hasil dibatasi scope di bawah, bukan izin milestone berikutnya.
**Dependencies:** M4-01.
**Status:** PLANNED.
**Deliverables:** perubahan spesifikasi/source yang memang diotorisasi pada scope ini + acceptance evidence; test case bernama yang relevan dan task report dengan command/exit/status. Tidak membuat dokumen/abstraksi tambahan tanpa kebutuhan.
**Verification commands:** V-RUST + V-HTTP-CACHE; V-FRONTEND hanya M4-06/07 di §2.7; jalankan hanya setelah task terkait diotorisasi. Semua status awal runtime NOT RUN.
**Approval gate:** G-INTEGRATION; §2.7. Task documentation tidak memberi approval implementasi otomatis.
**Rollback / failure:** R-INTEGRATION; §2.7. Hentikan hanya bagian yang terdampak; jangan restore perubahan existing.


**Scope:**

- Public CORS.
- Admin/auth CORS policy design.
- Rate limiting.
- Proxy trust configuration.
- HTTP cache policy.
- Public/admin boundary verification.

**Acceptance:**

- [ ] CORS origin sesuai konfigurasi.
- [ ] Preflight ditangani.
- [ ] Rate limiting bekerja.
- [ ] 401, 403, dan 404 tidak tertukar.
- [ ] Public API tetap dapat diakses anonim.

Authentication admin penuh diimplementasikan pada M5.

### M4-03 — Moka Cache Infrastructure

**Objective:** Moka Cache Infrastructure; hasil dibatasi scope di bawah, bukan izin milestone berikutnya.
**Dependencies:** M4-01.
**Status:** PLANNED.
**Deliverables:** perubahan spesifikasi/source yang memang diotorisasi pada scope ini + acceptance evidence; test case bernama yang relevan dan task report dengan command/exit/status. Tidak membuat dokumen/abstraksi tambahan tanpa kebutuhan.
**Verification commands:** V-RUST + V-HTTP-CACHE; V-FRONTEND hanya M4-06/07 di §2.7; jalankan hanya setelah task terkait diotorisasi. Semua status awal runtime NOT RUN.
**Approval gate:** G-INTEGRATION; §2.7. Task documentation tidak memberi approval implementasi otomatis.
**Rollback / failure:** R-INTEGRATION; §2.7. Hentikan hanya bagian yang terdampak; jangan restore perubahan existing.


**Scope:**

- Cache manager.
- Cache key conventions.
- Capacity limits.
- TTL configuration.
- Cache-aside services.
- Cache miss coalescing bila diperlukan.
- Cache metrics.

**Acceptance:**

- [ ] Cache hit benar.
- [ ] Cache miss benar.
- [ ] Key query berbeda tidak bertabrakan.
- [ ] TTL bekerja.
- [ ] Cache mempunyai batas kapasitas.
- [ ] Tidak ada data admin di public cache.

### M4-04 — Cache Consistency Foundation

**Objective:** Cache Consistency Foundation; hasil dibatasi scope di bawah, bukan izin milestone berikutnya.
**Dependencies:** M4-03.
**Status:** PLANNED.
**Deliverables:** perubahan spesifikasi/source yang memang diotorisasi pada scope ini + acceptance evidence; test case bernama yang relevan dan task report dengan command/exit/status. Tidak membuat dokumen/abstraksi tambahan tanpa kebutuhan.
**Verification commands:** V-RUST + V-HTTP-CACHE; V-FRONTEND hanya M4-06/07 di §2.7; jalankan hanya setelah task terkait diotorisasi. Semua status awal runtime NOT RUN.
**Approval gate:** G-INTEGRATION; §2.7. Task documentation tidak memberi approval implementasi otomatis.
**Rollback / failure:** R-INTEGRATION; §2.7. Hentikan hanya bagian yang terdampak; jangan restore perubahan existing.


**Scope:**

- Per-domain invalidation contract.
- Related list/detail invalidation.
- Error handling for cache failures.
- Support for future CMS mutation.
- HTTP cache coordination.

**Acceptance:**

- [ ] Invalidation contract terdefinisi.
- [ ] Simulasi perubahan data memperbarui hasil.
- [ ] Cache failure tidak mengubah status transaksi database.
- [ ] Stale content policy terdokumentasi.

### M4-05 — Observability Foundation

**Objective:** Observability Foundation; hasil dibatasi scope di bawah, bukan izin milestone berikutnya.
**Dependencies:** M4-01, M4-03.
**Status:** PLANNED.
**Deliverables:** perubahan spesifikasi/source yang memang diotorisasi pada scope ini + acceptance evidence; test case bernama yang relevan dan task report dengan command/exit/status. Tidak membuat dokumen/abstraksi tambahan tanpa kebutuhan.
**Verification commands:** V-RUST + V-HTTP-CACHE; V-FRONTEND hanya M4-06/07 di §2.7; jalankan hanya setelah task terkait diotorisasi. Semua status awal runtime NOT RUN.
**Approval gate:** G-INTEGRATION; §2.7. Task documentation tidak memberi approval implementasi otomatis.
**Rollback / failure:** R-INTEGRATION; §2.7. Hentikan hanya bagian yang terdampak; jangan restore perubahan existing.


**Scope:**

- Structured logging.
- Request latency metrics.
- Error metrics.
- DB connection monitoring.
- Cache hit/miss metrics.
- Readiness and liveness checks.

**Acceptance:**

- [ ] Request dapat ditelusuri.
- [ ] Error relevan tercatat.
- [ ] Tidak ada secret pada logs.
- [ ] Health check bekerja.
- [ ] Metrics tidak mengekspos data sensitif.

### M4-06 — Frontend Provider Integration

**Objective:** Frontend Provider Integration; hasil dibatasi scope di bawah, bukan izin milestone berikutnya.
**Dependencies:** M3-07, M4-04, M4-05, M0-06.
**Status:** PLANNED.
**Deliverables:** perubahan spesifikasi/source yang memang diotorisasi pada scope ini + acceptance evidence; test case bernama yang relevan dan task report dengan command/exit/status. Tidak membuat dokumen/abstraksi tambahan tanpa kebutuhan.
**Verification commands:** V-RUST + V-HTTP-CACHE; V-FRONTEND hanya M4-06/07 di §2.7; jalankan hanya setelah task terkait diotorisasi. Semua status awal runtime NOT RUN.
**Approval gate:** G-INTEGRATION; §2.7. Task documentation tidak memberi approval implementasi otomatis.
**Rollback / failure:** R-INTEGRATION; §2.7. Hentikan hanya bagian yang terdampak; jangan restore perubahan existing.


**Scope:**

- Per-domain provider switching.
- API connectivity.
- Ajv contract validation.
- Browser integration checks.
- Media URL verification.
- SSR/prerender behavior verification.

**Acceptance:**

- [ ] Domain yang diaktifkan menggunakan API berhasil.
- [ ] Tidak ada perubahan tampilan tak disengaja.
- [ ] Static provider tetap berfungsi sesuai kebutuhan.
- [ ] API provider lulus integration tests.
- [ ] Strategi CMS freshness sesuai keputusan M0.

**Important:** perubahan frontend dilakukan hanya jika secara eksplisit diotorisasi.

### M4-07 — Middleware & Cache Test Gate

**Objective:** Middleware & Cache Test Gate; hasil dibatasi scope di bawah, bukan izin milestone berikutnya.
**Dependencies:** M4-02, M4-04, M4-05, M4-06.
**Status:** PLANNED.
**Deliverables:** perubahan spesifikasi/source yang memang diotorisasi pada scope ini + acceptance evidence; test case bernama yang relevan dan task report dengan command/exit/status. Tidak membuat dokumen/abstraksi tambahan tanpa kebutuhan.
**Verification commands:** V-RUST + V-HTTP-CACHE; V-FRONTEND hanya M4-06/07 di §2.7; jalankan hanya setelah task terkait diotorisasi. Semua status awal runtime NOT RUN.
**Approval gate:** G-INTEGRATION; §2.7. Task documentation tidak memberi approval implementasi otomatis.
**Rollback / failure:** R-INTEGRATION; §2.7. Hentikan hanya bagian yang terdampak; jangan restore perubahan existing.


**Scope:**

- Middleware tests.
- Security boundary tests.
- Cache tests.
- Initial performance baseline.
- Provider integration verification.

**M4 EXIT GATE:**

- [ ] HTTP middleware tests lulus.
- [ ] Public rate limiting bekerja.
- [ ] Cache hit/miss/invalidation tests lulus.
- [ ] Frontend provider integration terverifikasi sesuai scope.
- [ ] Observability aktif.
- [ ] Tidak ada secrets leakage.
- [ ] Kontrak publik tidak mengalami regresi.

**Gate result:** NOT RUN.

---

# IX. M5 — AUTHENTICATION, ADMIN API & CMS

## Objective

Mengimplementasikan kemampuan administratif untuk mengelola konten melalui API yang aman.

**Dependencies:** M4 + final Admin API design.

### M5-01 — Authentication & Sessions

**Objective:** Authentication & Sessions; hasil dibatasi scope di bawah, bukan izin milestone berikutnya.
**Dependencies:** M4-07, M2-04, M0-06.
**Status:** PLANNED.
**Deliverables:** perubahan spesifikasi/source yang memang diotorisasi pada scope ini + acceptance evidence; test case bernama yang relevan dan task report dengan command/exit/status. Tidak membuat dokumen/abstraksi tambahan tanpa kebutuhan.
**Verification commands:** V-RUST + V-ADMIN di §2.7; jalankan hanya setelah task terkait diotorisasi. Semua status awal runtime NOT RUN.
**Approval gate:** G-ADMIN; §2.7. Task documentation tidak memberi approval implementasi otomatis.
**Rollback / failure:** R-DB; §2.7. Hentikan hanya bagian yang terdampak; jangan restore perubahan existing.


**Scope:**

- Admin login, pre-auth CSRF bootstrap, PostgreSQL session store/migration/cleanup setelah keputusan M0-06.
- Password verification.
- Secure session creation.
- Session regeneration.
- Logout.
- Session expiration.
- Session revocation pada logout/disable/password reset/role update, termasuk request yang bersaing dengan revoke.
- Login throttling.

**Acceptance:**

- [ ] Login valid berhasil.
- [ ] Password salah ditolak.
- [ ] Session invalid ditolak.
- [ ] Logout mencabut sesi.
- [ ] Secure cookie policy benar.
- [ ] Brute-force protections diuji.

### M5-02 — RBAC & Authorization

**Objective:** RBAC & Authorization; hasil dibatasi scope di bawah, bukan izin milestone berikutnya.
**Dependencies:** M5-01.
**Status:** PLANNED.
**Deliverables:** perubahan spesifikasi/source yang memang diotorisasi pada scope ini + acceptance evidence; test case bernama yang relevan dan task report dengan command/exit/status. Tidak membuat dokumen/abstraksi tambahan tanpa kebutuhan.
**Verification commands:** V-RUST + V-ADMIN di §2.7; jalankan hanya setelah task terkait diotorisasi. Semua status awal runtime NOT RUN.
**Approval gate:** G-ADMIN; §2.7. Task documentation tidak memberi approval implementasi otomatis.
**Rollback / failure:** R-DB; §2.7. Hentikan hanya bagian yang terdampak; jangan restore perubahan existing.


**Scope:**

- Role management.
- User-role assignment.
- Permission policy.
- Route-level guards.
- Resource-level authorization.

**Acceptance:**

- [ ] Anonymous admin request ditolak.
- [ ] User tanpa izin mendapat 403.
- [ ] Privileged operation memerlukan permission.
- [ ] Hak akses tidak dapat dilewati melalui ID resource.
- [ ] RBAC tests lulus.

### M5-03 — Publications & Document CRUD

**Objective:** Publications & Document CRUD; hasil dibatasi scope di bawah, bukan izin milestone berikutnya.
**Dependencies:** M5-02, M5-06.
**Status:** PLANNED.
**Deliverables:** perubahan spesifikasi/source yang memang diotorisasi pada scope ini + acceptance evidence; test case bernama yang relevan dan task report dengan command/exit/status. Tidak membuat dokumen/abstraksi tambahan tanpa kebutuhan.
**Verification commands:** V-RUST + V-ADMIN di §2.7; jalankan hanya setelah task terkait diotorisasi. Semua status awal runtime NOT RUN.
**Approval gate:** G-ADMIN; §2.7. Task documentation tidak memberi approval implementasi otomatis.
**Rollback / failure:** R-DB; §2.7. Hentikan hanya bagian yang terdampak; jangan restore perubahan existing.


**Scope:**

- Articles CRUD.
- Education CRUD.
- Document CRUD.
- Draft and archive behavior.
- Search/filter.
- Validation.
- Media referencing.

**Acceptance:**

- [ ] Create/edit bekerja.
- [ ] Duplicate slug ditolak.
- [ ] Invalid DTO ditolak.
- [ ] Data tidak terhapus permanen tanpa kebijakan.
- [ ] Draft tidak muncul di Public API.
- [ ] CRUD tests lulus.

### M5-04 — Services & Portal Management

**Objective:** Services & Portal Management; hasil dibatasi scope di bawah, bukan izin milestone berikutnya.
**Dependencies:** M5-02.
**Status:** PLANNED.
**Deliverables:** perubahan spesifikasi/source yang memang diotorisasi pada scope ini + acceptance evidence; test case bernama yang relevan dan task report dengan command/exit/status. Tidak membuat dokumen/abstraksi tambahan tanpa kebutuhan.
**Verification commands:** V-RUST + V-ADMIN di §2.7; jalankan hanya setelah task terkait diotorisasi. Semua status awal runtime NOT RUN.
**Approval gate:** G-ADMIN; §2.7. Task documentation tidak memberi approval implementasi otomatis.
**Rollback / failure:** R-DB; §2.7. Hentikan hanya bagian yang terdampak; jangan restore perubahan existing.


**Scope:**

- Catalog CRUD.
- FAQ CRUD.
- Portal CRUD.
- Ordering.
- Active/featured flags.
- URL validation.

**Acceptance:**

- [ ] Layanan dapat dikelola.
- [ ] FAQ dapat diurutkan.
- [ ] Portal URL tervalidasi.
- [ ] Public API merefleksikan data yang sah.
- [ ] Tidak ada incompatible response.

### M5-05 — Singleton & Institutional CMS

**Objective:** Singleton & Institutional CMS; hasil dibatasi scope di bawah, bukan izin milestone berikutnya.
**Dependencies:** M5-02, M5-06.
**Status:** PLANNED.
**Deliverables:** perubahan spesifikasi/source yang memang diotorisasi pada scope ini + acceptance evidence; test case bernama yang relevan dan task report dengan command/exit/status. Tidak membuat dokumen/abstraksi tambahan tanpa kebutuhan.
**Verification commands:** V-RUST + V-ADMIN di §2.7; jalankan hanya setelah task terkait diotorisasi. Semua status awal runtime NOT RUN.
**Approval gate:** G-ADMIN; §2.7. Task documentation tidak memberi approval implementasi otomatis.
**Rollback / failure:** R-DB; §2.7. Hentikan hanya bagian yang terdampak; jangan restore perubahan existing.


**Scope:**

- Office settings update.
- Complaint settings update.
- PPID settings update.
- Hero content update.
- Featured video management.
- Organization people/assignments.

**Acceptance:**

- [ ] Data singleton tidak dapat diduplikasi.
- [ ] Update memerlukan permission.
- [ ] Identitas dan penugasan organisasi terpisah.
- [ ] Perubahan dapat diaudit.
- [ ] Field frontend yang dibatasi tidak menerima nilai tidak valid.

### M5-06 — Media Management

**Objective:** Media Management; hasil dibatasi scope di bawah, bukan izin milestone berikutnya.
**Dependencies:** M5-02.
**Status:** PLANNED.
**Deliverables:** perubahan spesifikasi/source yang memang diotorisasi pada scope ini + acceptance evidence; test case bernama yang relevan dan task report dengan command/exit/status. Tidak membuat dokumen/abstraksi tambahan tanpa kebutuhan.
**Verification commands:** V-RUST + V-ADMIN di §2.7; jalankan hanya setelah task terkait diotorisasi. Semua status awal runtime NOT RUN.
**Approval gate:** G-ADMIN; §2.7. Task documentation tidak memberi approval implementasi otomatis.
**Rollback / failure:** R-DB; §2.7. Hentikan hanya bagian yang terdampak; jangan restore perubahan existing.


**Scope:**

- Media upload.
- MIME/file signature validation.
- Size limits.
- Safe storage key generation.
- Media metadata persistence.
- Authorization.
- Media URL generation.

**Acceptance:**

- [ ] File valid diterima.
- [ ] File tidak valid ditolak.
- [ ] Path traversal dicegah.
- [ ] File upload tidak dieksekusi.
- [ ] Metadata tersimpan.
- [ ] Media dapat digunakan oleh konten yang diizinkan.

### M5-07 — Publishing Workflow & Audit/Cache Regression

**Objective:** Publishing Workflow & Audit/Cache Regression; hasil dibatasi scope di bawah, bukan izin milestone berikutnya.
**Dependencies:** M5-03, M5-04, M5-05, M4-04.
**Status:** PLANNED.
**Deliverables:** perubahan spesifikasi/source yang memang diotorisasi pada scope ini + acceptance evidence; test case bernama yang relevan dan task report dengan command/exit/status. Tidak membuat dokumen/abstraksi tambahan tanpa kebutuhan.
**Verification commands:** V-RUST + V-ADMIN di §2.7; jalankan hanya setelah task terkait diotorisasi. Semua status awal runtime NOT RUN.
**Approval gate:** G-ADMIN; §2.7. Task documentation tidak memberi approval implementasi otomatis.
**Rollback / failure:** R-DB; §2.7. Hentikan hanya bagian yang terdampak; jangan restore perubahan existing.


**Scope:**

- Draft.
- Review.
- Publish.
- Archive.
- Permission checks.
- Mutasi pada M5-03/04/05/06/08 sudah wajib atomic audit + invalidation; jangan menunggu task ini untuk mulai melindunginya.
- Task ini menguji publishing transitions dan regresi transactional audit/cache, bukan fondasi security tertunda.

**Acceptance:**

- [ ] Transisi status sah bekerja.
- [ ] Transisi tidak sah ditolak.
- [ ] Publish memerlukan permission.
- [ ] Audit sesuai hasil perubahan yang benar.
- [ ] Public API menampilkan konten baru sesuai freshness policy.
- [ ] Cache lama tidak menyebabkan draft atau data tidak sah terekspos.

### M5-08 — Statistical Data Administration

**Objective:** Statistical Data Administration; hasil dibatasi scope di bawah, bukan izin milestone berikutnya.
**Dependencies:** M5-02, M3-06, M4-04.
**Status:** PLANNED.
**Deliverables:** perubahan spesifikasi/source yang memang diotorisasi pada scope ini + acceptance evidence; test case bernama yang relevan dan task report dengan command/exit/status. Tidak membuat dokumen/abstraksi tambahan tanpa kebutuhan.
**Verification commands:** V-RUST + V-ADMIN di §2.7; jalankan hanya setelah task terkait diotorisasi. Semua status awal runtime NOT RUN.
**Approval gate:** G-ADMIN; §2.7. Task documentation tidak memberi approval implementasi otomatis.
**Rollback / failure:** R-DB; §2.7. Hentikan hanya bagian yang terdampak; jangan restore perubahan existing.


**Scope:**

- Pengelolaan metrik tahunan yang disetujui.
- Pengelolaan distribusi.
- Validasi agregasi.
- Referensi laporan/dokumen.
- Pembatasan hak akses operator.

**Acceptance:**

- [ ] Tahun tidak terduplikasi.
- [ ] Nilai numerik tervalidasi.
- [ ] Agregasi konsisten.
- [ ] Referensi dokumen valid.
- [ ] Historical data tidak tertimpa secara tidak sah.

### M5-09 — Admin API Integration & Security Testing

**Objective:** Admin API Integration & Security Testing; hasil dibatasi scope di bawah, bukan izin milestone berikutnya.
**Dependencies:** M5-03, M5-04, M5-05, M5-06, M5-07, M5-08.
**Status:** PLANNED.
**Deliverables:** perubahan spesifikasi/source yang memang diotorisasi pada scope ini + acceptance evidence; test case bernama yang relevan dan task report dengan command/exit/status. Tidak membuat dokumen/abstraksi tambahan tanpa kebutuhan.
**Verification commands:** V-RUST + V-ADMIN di §2.7; jalankan hanya setelah task terkait diotorisasi. Semua status awal runtime NOT RUN.
**Approval gate:** G-ADMIN; §2.7. Task documentation tidak memberi approval implementasi otomatis.
**Rollback / failure:** R-DB; §2.7. Hentikan hanya bagian yang terdampak; jangan restore perubahan existing.


**Scope:**

- Admin API tests.
- RBAC matrix tests.
- CSRF tests.
- Session tests.
- CRUD tests.
- Audit tests.
- Cache invalidation tests.
- Media security tests.

**M5 EXIT GATE:**

- [ ] Authentication tests lulus.
- [ ] RBAC tests lulus.
- [ ] CSRF protection terverifikasi.
- [ ] Semua CRUD wajib lulus.
- [ ] Publishing workflow lulus.
- [ ] Audit log valid.
- [ ] Media upload aman sesuai pengujian.
- [ ] Public API tidak mengalami regresi.
- [ ] Tidak ada privilege escalation yang terdeteksi pada cakupan pengujian.

**Gate result:** NOT RUN.

---

# X. M6 — HARDENING & PRODUCTION READINESS

## Objective

Memastikan backend stabil, aman, terukur, dapat dipulihkan, dan layak diajukan untuk deployment produksi.

**Dependencies:** M5.

### M6-01 — Security Hardening

**Objective:** Security Hardening; hasil dibatasi scope di bawah, bukan izin milestone berikutnya.
**Dependencies:** M5-09.
**Status:** PLANNED.
**Deliverables:** perubahan spesifikasi/source yang memang diotorisasi pada scope ini + acceptance evidence; test case bernama yang relevan dan task report dengan command/exit/status. Tidak membuat dokumen/abstraksi tambahan tanpa kebutuhan.
**Verification commands:** V-RUST + V-OPS di §2.7; jalankan hanya setelah task terkait diotorisasi. Semua status awal runtime NOT RUN.
**Approval gate:** G-RELEASE; §2.7. Task documentation tidak memberi approval implementasi otomatis.
**Rollback / failure:** R-OPS; §2.7. Hentikan hanya bagian yang terdampak; jangan restore perubahan existing.


**Scope:**

- Dependency security audit.
- Secret management review.
- Authorization review.
- CORS/CSRF review.
- Security headers.
- Upload security.
- Error leakage testing.
- Production configuration review.

**Acceptance:**

- [ ] Tidak ada temuan kritis yang belum ditangani.
- [ ] Secret handling dan diff/history scope yang diotorisasi diperiksa tanpa mencetak nilai rahasia.
- [ ] Admin endpoints terlindungi.
- [ ] Security regression tests lulus.

### M6-02 — Database Optimization

**Objective:** Database Optimization; hasil dibatasi scope di bawah, bukan izin milestone berikutnya.
**Dependencies:** M5-09.
**Status:** PLANNED.
**Deliverables:** perubahan spesifikasi/source yang memang diotorisasi pada scope ini + acceptance evidence; test case bernama yang relevan dan task report dengan command/exit/status. Tidak membuat dokumen/abstraksi tambahan tanpa kebutuhan.
**Verification commands:** V-RUST + V-OPS di §2.7; jalankan hanya setelah task terkait diotorisasi. Semua status awal runtime NOT RUN.
**Approval gate:** G-RELEASE; §2.7. Task documentation tidak memberi approval implementasi otomatis.
**Rollback / failure:** R-OPS; §2.7. Hentikan hanya bagian yang terdampak; jangan restore perubahan existing.


**Scope:**

- Analyze slow queries.
- Review indexes.
- Review N+1 patterns.
- Review connection pooling.
- Review transactions.
- Review PostgreSQL resource usage.

**Acceptance:**

- [ ] Query penting dianalisis.
- [ ] Index digunakan berdasarkan kebutuhan nyata.
- [ ] Tidak ada redundant index yang tidak dibutuhkan.
- [ ] Connection pool stabil saat load test.

### M6-03 — Performance Benchmarking

**Objective:** Performance Benchmarking; hasil dibatasi scope di bawah, bukan izin milestone berikutnya.
**Dependencies:** M6-02.
**Status:** PLANNED.
**Deliverables:** perubahan spesifikasi/source yang memang diotorisasi pada scope ini + acceptance evidence; test case bernama yang relevan dan task report dengan command/exit/status. Tidak membuat dokumen/abstraksi tambahan tanpa kebutuhan.
**Verification commands:** V-RUST + V-OPS di §2.7; jalankan hanya setelah task terkait diotorisasi. Semua status awal runtime NOT RUN.
**Approval gate:** G-RELEASE; §2.7. Task documentation tidak memberi approval implementasi otomatis.
**Rollback / failure:** R-OPS; §2.7. Hentikan hanya bagian yang terdampak; jangan restore perubahan existing.


**Scope:**

- Public GET cold cache.
- Public GET warm cache.
- Concurrent requests.
- Admin CRUD.
- Large collection pagination.
- CPU/memory monitoring.
- Database throughput.
- Error rate measurement.

**Baseline targets:**

| Metric                             | Proposed target |
| ---------------------------------- | --------------- |
| Public cached GET p95              | <50 ms          |
| Public uncached GET p95            | <200 ms         |
| Simple admin CRUD p95              | <300 ms         |
| 5xx error rate under expected load | <0.1%           |
| Contract compatibility             | 24/24           |

Target ini harus diukur pada hardware, dataset, dan workload yang terdokumentasi.

Jika tidak terpenuhi, laporkan hasil sebenarnya serta bottleneck. Jangan mengubah hasil benchmark.

**Acceptance:**

- [ ] Hardware, dataset, concurrency, duration, cache/pool settings dan p50/p95/p99/error rate dicatat untuk setiap skenario.
- [ ] Cold/warm public GET dan admin workload memiliki hasil aktual yang dapat diulang.
- [ ] Target yang telah disetujui dipenuhi; jika gagal, task tidak DONE dan bottleneck/failure evidence dilaporkan tanpa mengubah angka.
- [ ] Tidak ada benchmark produksi/live service tanpa otorisasi environment.

### M6-04 — Deployment Configuration

**Objective:** Deployment Configuration; hasil dibatasi scope di bawah, bukan izin milestone berikutnya.
**Dependencies:** M6-01, M6-03.
**Status:** PLANNED.
**Deliverables:** perubahan spesifikasi/source yang memang diotorisasi pada scope ini + acceptance evidence; test case bernama yang relevan dan task report dengan command/exit/status. Tidak membuat dokumen/abstraksi tambahan tanpa kebutuhan.
**Verification commands:** V-RUST + V-OPS di §2.7; jalankan hanya setelah task terkait diotorisasi. Semua status awal runtime NOT RUN.
**Approval gate:** G-RELEASE; §2.7. Task documentation tidak memberi approval implementasi otomatis.
**Rollback / failure:** R-OPS; §2.7. Hentikan hanya bagian yang terdampak; jangan restore perubahan existing.


**Scope:**

- Production build.
- Environment configuration.
- Reverse proxy.
- HTTPS.
- Database credentials.
- Process supervision.
- Health checks.
- Graceful shutdown.
- Resource limits.

**Acceptance:**

- [ ] Deployment tervalidasi di staging.
- [ ] HTTPS berfungsi.
- [ ] Database tidak terekspos publik.
- [ ] Health checks bekerja.
- [ ] Secret injection aman.
- [ ] Application restart aman.

### M6-05 — Backup, Restore & Recovery

**Objective:** Backup, Restore & Recovery; hasil dibatasi scope di bawah, bukan izin milestone berikutnya.
**Dependencies:** M6-04.
**Status:** PLANNED.
**Deliverables:** perubahan spesifikasi/source yang memang diotorisasi pada scope ini + acceptance evidence; test case bernama yang relevan dan task report dengan command/exit/status. Tidak membuat dokumen/abstraksi tambahan tanpa kebutuhan.
**Verification commands:** V-RUST + V-OPS di §2.7; jalankan hanya setelah task terkait diotorisasi. Semua status awal runtime NOT RUN.
**Approval gate:** G-RELEASE; §2.7. Task documentation tidak memberi approval implementasi otomatis.
**Rollback / failure:** R-OPS; §2.7. Hentikan hanya bagian yang terdampak; jangan restore perubahan existing.


**Scope:**

- PostgreSQL backup.
- Restore procedure.
- Migration recovery.
- Media backup.
- Failure scenario.
- Recovery documentation.

**Acceptance:**

- [ ] Backup dapat dibuat.
- [ ] Restore berhasil diuji.
- [ ] Referential integrity terjaga.
- [ ] Media recovery diuji jika digunakan.
- [ ] Recovery steps terdokumentasi.

Backup yang belum pernah diuji restore tidak boleh dinyatakan sudah memenuhi recovery readiness.

### M6-06 — Operational Runbook & Handover

**Objective:** Operational Runbook & Handover; hasil dibatasi scope di bawah, bukan izin milestone berikutnya.
**Dependencies:** M6-04, M6-05.
**Status:** PLANNED.
**Deliverables:** perubahan spesifikasi/source yang memang diotorisasi pada scope ini + acceptance evidence; test case bernama yang relevan dan task report dengan command/exit/status. Tidak membuat dokumen/abstraksi tambahan tanpa kebutuhan.
**Verification commands:** V-RUST + V-OPS di §2.7; jalankan hanya setelah task terkait diotorisasi. Semua status awal runtime NOT RUN.
**Approval gate:** G-RELEASE; §2.7. Task documentation tidak memberi approval implementasi otomatis.
**Rollback / failure:** R-OPS; §2.7. Hentikan hanya bagian yang terdampak; jangan restore perubahan existing.


**Scope:**

- Service startup/shutdown.
- Health monitoring.
- Log inspection.
- Database maintenance.
- Cache troubleshooting.
- Deployment rollback.
- Incident response.
- Credential rotation process.

**Acceptance:**

- [ ] Langkah operasional terdokumentasi.
- [ ] Error umum mempunyai prosedur penanganan.
- [ ] Pemulihan tidak bergantung pada asumsi Agent.
- [ ] Secret tidak tercantum dalam runbook.

### M6-07 — Final Release Gate

**Objective:** Final Release Gate; hasil dibatasi scope di bawah, bukan izin milestone berikutnya.
**Dependencies:** M6-01, M6-03, M6-05, M6-06.
**Status:** PLANNED.
**Deliverables:** perubahan spesifikasi/source yang memang diotorisasi pada scope ini + acceptance evidence; test case bernama yang relevan dan task report dengan command/exit/status. Tidak membuat dokumen/abstraksi tambahan tanpa kebutuhan.
**Verification commands:** V-RUST + V-OPS di §2.7; jalankan hanya setelah task terkait diotorisasi. Semua status awal runtime NOT RUN.
**Approval gate:** G-RELEASE; §2.7. Task documentation tidak memberi approval implementasi otomatis.
**Rollback / failure:** R-OPS; §2.7. Hentikan hanya bagian yang terdampak; jangan restore perubahan existing.


**Scope:**

- Full regression tests.
- Contract validation.
- Security verification.
- Load test review.
- Staging verification.
- Production readiness checklist.
- Final diff and change review.

**M6 EXIT GATE:**

- [ ] Semua mandatory test PASS.
- [ ] Seluruh 24 Public API valid.
- [ ] CMS permissions valid.
- [ ] Database migrations valid.
- [ ] Data integrity valid.
- [ ] Security review selesai.
- [ ] Benchmark terdokumentasi.
- [ ] Backup/restore tested.
- [ ] Staging verified.
- [ ] Tidak ada critical blocker.
- [ ] Release approval diperoleh.

**Gate result:** NOT RUN.

Deployment produksi merupakan tindakan terpisah yang memerlukan otorisasi eksplisit.

---

# XI. TESTING & QUALITY ASSURANCE STRATEGY

## 11.1 Testing hierarchy

Gunakan urutan:

1. Unit tests.
2. Repository integration tests.
3. API integration tests.
4. Contract tests.
5. Security tests.
6. Performance tests.
7. Frontend integration tests.
8. Staging verification.

Tidak semua task membutuhkan seluruh kategori pengujian.

Pilih pengujian berdasarkan perubahan dan dampaknya.

## 11.2 Backend quality commands

Dijalankan dari direktori Cargo yang sesuai:

| Gate              | Command                                                      |
| ----------------- | ------------------------------------------------------------ |
| Formatting        | `cargo fmt --all -- --check`                               |
| Compilation       | `cargo check --all-targets --all-features`                 |
| Lint              | `cargo clippy --all-targets --all-features -- -D warnings` |
| Tests             | `cargo test --all-targets --all-features`                  |
| Dependency audit  | `cargo audit`                                              |
| Dependency policy | `cargo deny check`                                         |

Perintah audit dependency hanya dijalankan jika tool tersedia atau telah dipasang sesuai prosedur.

Jika backend menggunakan Cargo workspace, cakupan perintah harus memastikan crate aplikasi dan migrasi benar-benar termasuk.

## 11.3 Frontend verification

Pengujian frontend harus mengikuti `AGENTS.md`.

Untuk perubahan yang berkaitan dengan API:

- Canonical data validation.
- Repository provider switching.
- Ajv contract validation.
- Svelte/TypeScript type checking.
- Relevant Vitest suites.
- Production build bila berdampak pada frontend.
- Browser integration checks bila diperlukan.

Backend-only tasks tidak otomatis mengharuskan redesign atau perubahan frontend.

## 11.4 Database tests

Wajib menguji:

- Empty database migration.
- Constraint violations.
- Unique key enforcement.
- Foreign key integrity.
- Transaction rollback dan kegagalan audit (tidak ada perubahan committed/cache invalidation).
- Idempotent seeding.
- Canonical mapping.
- Historical record preservation.
- Deletion/archiving behavior.

Pengujian integrasi PostgreSQL harus menggunakan database test terisolasi, bukan database produksi.

## 11.5 Middleware tests

| Test                    | Expected                  |
| ----------------------- | ------------------------- |
| Public GET              | Accessible anonymously    |
| Admin without session   | 401                       |
| Insufficient permission | 403                       |
| Nonexistent route       | 404                       |
| Invalid request body    | 400/422 sesuai kontrak    |
| Oversized body          | 413                       |
| Rate limit exceeded     | 429                       |
| Invalid CSRF            | 403                       |
| Timeout                 | Standard timeout response |
| Login brute-force       | Throttled                 |
| Admin cache policy      | No-store                  |
| Sensitive logs          | No credentials or tokens  |

## 11.6 Cache tests

- Cache hit.
- Cache miss.
- Expiration.
- Invalidation.
- Filter-aware keys.
- Concurrent old-read/refill vs mutation; cancellation setelah commit; cache-bypass pada invalidation failure (§8.9 Blueprint).
- Database/cache failure behavior.
- Public/admin isolation.

## 11.7 Contract tests

Setiap endpoint publik harus diuji terhadap:

- Method/path.
- Status code.
- Envelope.
- DTO type.
- Required fields.
- Optional fields.
- Enum values.
- Canonical IDs.
- Date formats.
- Pagination/filtering.
- Error behavior.

Contract tests harus menggunakan spesifikasi yang telah direkonsiliasi, bukan memaksakan asumsi dari contoh dokumentasi lama.

---

# XII. PERFORMANCE & SECURITY ACCEPTANCE

## 12.1 Performance methodology

Setiap benchmark mencatat:

- Rust version.
- Build profile.
- Hardware.
- PostgreSQL version.
- Database size.
- Dataset.
- Concurrent users.
- Request duration.
- Warm/cold cache state.
- Cache configuration.
- Connection pool configuration.
- p50/p95/p99 latency.
- Error rate.
- CPU/RAM usage.

Benchmark tanpa informasi lingkungan tidak boleh digunakan sebagai bukti performa produksi.

## 12.2 Optimization order

Ikuti prioritas:

1. Correctness.
2. Query efficiency.
3. Proper indexes.
4. Connection pooling.
5. Caching.
6. Serialization efficiency.
7. Concurrency tuning.
8. Infrastructure scaling.

Jangan menambah Redis atau komponen distribusi hanya karena terlihat lebih cepat secara teoretis.

## 12.3 Security baseline

Minimum:

- Argon2id password hashing.
- Secure session cookies.
- CSRF protection.
- RBAC.
- Request validation.
- Safe SQL queries.
- Rate limiting.
- Secure upload.
- Secret redaction.
- Database least privilege.
- HTTPS.
- Auditable administrative changes.

Temuan keamanan kritis tidak boleh dilewati demi memenuhi milestone.

---

# XIII. DEPLOYMENT & OPERATIONS PLAN

## 13.1 Environment model

| Environment | Purpose                      |
| ----------- | ---------------------------- |
| Development | Local engineering            |
| Test        | Automated integration        |
| Staging     | Production-like verification |
| Production  | Public service               |

Gunakan konfigurasi dan database terisolasi per environment.

## 13.2 Deployment architecture

Rancangan awal:

**Client → HTTPS Reverse Proxy → Axum → PostgreSQL**

Moka berjalan di proses backend.

Media storage dapat menggunakan local persistent storage atau object storage sesuai keputusan M0.

Redis/Valkey tidak diperlukan untuk baseline satu instance.

## 13.3 Deployment requirements

- Production binary build.
- Reverse proxy configuration.
- Secure environment injection.
- PostgreSQL connection.
- Migration execution procedure.
- Health check.
- Log collection.
- Backup configuration.
- Resource constraints.
- Controlled restart.

## 13.4 Deployment safety

Sebelum production deployment:

1. Pastikan staging tests lulus.
2. Periksa migration impact.
3. Verifikasi backup.
4. Periksa secret configuration.
5. Verifikasi HTTPS dan origin configuration.
6. Verifikasi health/readiness.
7. Pastikan rollback plan tersedia.
8. Peroleh release approval.

Tidak boleh menjalankan deployment hanya karena semua unit tests lulus.

## 13.5 Incident response

Runbook harus mencakup:

- API unavailable.
- PostgreSQL connection failure.
- Migration failure.
- High error rate.
- Cache inconsistency.
- Login/session failures.
- Media upload problems.
- Unexpected resource exhaustion.
- Security incident.
- Backup/restore failure.

Setiap kejadian harus memiliki langkah diagnosis, mitigasi, dan pemulihan.

---

# XIV. TASK REPORTING TEMPLATE

Gunakan format berikut setelah setiap task.

## Task Report — [TASK-ID]

**Task:** [Nama pekerjaan]
**Milestone:** [M0–M6]
**Status:** PLANNED / READY / IN_PROGRESS / BLOCKED / REVIEW / DONE

### Objective

Ringkasan tujuan task.

### Scope

Komponen yang dikerjakan.

### Source & Architecture Review

- Relevant documents.
- Relevant frontend/backend source.
- CodeGraph findings.
- Impact analysis.

### Files Changed

Daftar file aktual yang berubah.

Jika tidak ada perubahan, tuliskan `NONE`.

### Implementation Summary

Penjelasan singkat apa yang benar-benar dikerjakan.

### Verification Results

| Check             | Status  | Evidence |
| ----------------- | ------- | -------- |
| Formatting        | NOT RUN | -        |
| Compilation       | NOT RUN | -        |
| Unit Tests        | NOT RUN | -        |
| Integration Tests | NOT RUN | -        |
| Contract Tests    | NOT RUN | -        |
| Security Tests    | NOT RUN | -        |

Ganti setiap status setelah pengujian benar-benar dijalankan.

### Acceptance Criteria

Cantumkan hasil masing-masing acceptance criteria.

### Risks & Blockers

Tuliskan isu yang masih ada.

### Architecture Impact

Jelaskan apakah ada dampak terhadap:

- API.
- Database.
- Frontend.
- Security.
- Cache.
- Other modules.

### Final Assessment

- DONE jika seluruh gate wajib lulus.
- BLOCKED jika terdapat kendala yang mencegah penyelesaian.
- REVIEW jika implementasi menunggu pemeriksaan.
- IN_PROGRESS jika pekerjaan belum selesai.

### Next Task

Tuliskan task lanjutan berdasarkan dependency plan.

---

# XV. PROGRESS TRACKING

## 15.1 Initial milestone status

| Milestone | Initial Status      | Verification |
| --------- | ------------------- | ------------ |
| M0        | BLOCKED (full sign-off) | Dokumentasi diperbaiki; parser/owner decisions pending |
| M1        | BLOCKED             | M0 approval pending; isolated offline check missing errno 0.3.14 |
| M2        | PLANNED             | NOT RUN      |
| M3        | PLANNED             | NOT RUN      |
| M4        | PLANNED             | NOT RUN      |
| M5        | PLANNED             | NOT RUN      |
| M6        | PLANNED             | NOT RUN      |

Status task2: baseline source SCAFFOLDED_ONLY, bukan fondasi sudah berjalan. Tidak ada test Cargo, database atau API yang dijalankan dalam task dokumentasi ini. Status verification aktual berada pada dua laporan ouput.

AI Agent harus memperbaruinya berdasarkan bukti aktual.

## 15.2 Progress update policy

Setelah menyelesaikan task:

1. Perbarui status task.
2. Catat evidence.
3. Catat perubahan kontrak yang disetujui.
4. Catat blocker.
5. Catat keputusan arsitektur.
6. Identifikasi task berikutnya.
7. Jangan mengubah milestone menjadi PASS sebelum semua gate lulus.

## 15.3 Documentation maintenance

**AGENTS.md**

Diperbarui ketika aturan engineering berubah.

**BACKEND_BLUEPRINT.md**

Diperbarui ketika keputusan arsitektur, kontrak, atau desain berubah.

**BACKEND_EXECUTION_PLAN.md**

Diperbarui ketika progress, task, dependency, atau acceptance criteria berubah.

**database.dbml**

Diperbarui ketika rancangan database berubah dan harus diselaraskan dengan migrasi.

**openapi.v1.yaml**

Diperbarui ketika kontrak endpoint berubah dan harus diselaraskan dengan implementasi dan contract tests.

Hindari membuat banyak dokumen duplikat untuk informasi yang sama.

---

# XVI. CHANGE MANAGEMENT & STOP CONDITIONS

## 16.1 Prohibited actions

AI Agent tidak boleh:

- Mengubah frontend tanpa izin.
- Menambah endpoint di luar scope tanpa persetujuan.
- Mengubah DTO publik secara sepihak.
- Membuat data statistik yang tidak tersedia.
- Menambahkan abstraksi tanpa kebutuhan.
- Mengganti teknologi utama tanpa keputusan.
- Menghapus data secara destruktif tanpa persetujuan.
- Melakukan production deployment otomatis.
- Menonaktifkan security untuk melewati pengujian.
- Mengklaim test berhasil tanpa eksekusi.
- Menyembunyikan kegagalan task.
- Menyimpan secrets dalam dokumentasi atau source.

## 16.2 Stop conditions

Agent harus menghentikan bagian pekerjaan yang terdampak jika menemukan:

1. Konflik API yang tidak dapat diselesaikan berdasarkan kontrak.
2. Potensi kehilangan data.
3. Kebutuhan credential yang tidak tersedia secara aman.
4. Perubahan schema yang berpotensi destruktif.
5. Penggunaan data resmi yang belum diverifikasi dan material terhadap hasil.
6. Keputusan keamanan yang belum ditetapkan.
7. Operasi pada lingkungan produksi tanpa otorisasi.
8. Risiko besar terhadap sistem existing.

Agent harus menjelaskan:

- Blocker.
- Dampak.
- Bukti.
- Opsi penyelesaian.
- Rekomendasi tindakan minimal.

Pekerjaan lain yang tidak bergantung pada blocker dapat dilanjutkan jika masih berada dalam scope yang diizinkan.

## 16.3 Milestone approval

Milestone dapat dilanjutkan apabila:

- Acceptance criteria terpenuhi.
- Pengujian wajib PASS.
- Tidak ada blocker kritis.
- Dokumentasi relevan sinkron.
- Progress report tersedia.
- Langkah berikutnya telah diotorisasi.

---

# XVII. DEFINITION OF DONE

Suatu task dinyatakan selesai jika:

- [ ] Scope yang disetujui telah dikerjakan.
- [ ] Struktur Clean Architecture dipatuhi.
- [ ] Tidak ada pelanggaran module ownership.
- [ ] API contract tetap kompatibel.
- [ ] Database integrity terpelihara.
- [ ] Security checks yang relevan lulus.
- [ ] Relevant tests PASS.
- [ ] Final diff telah diperiksa.
- [ ] Dokumentasi diperbarui jika diperlukan.
- [ ] Bukti pengujian dicatat.
- [ ] Tidak ada unresolved critical blocker.

**Task completion ≠ milestone completion.**

**Milestone completion ≠ production readiness.**

**Production readiness ≠ permission to deploy.**

Ketiga hal tersebut harus dinilai secara terpisah.

---

# XVIII. FINAL DELIVERY CRITERIA

Backend dinyatakan siap diajukan untuk penggunaan produksi apabila:

1. Seluruh 24 Public API lulus contract tests.
2. Migrasi canonical JSON tervalidasi.
3. PostgreSQL schema dan constraints valid.
4. Admin authentication dan RBAC teruji.
5. CRUD CMS yang masuk scope berfungsi.
6. Publishing workflow tidak mengekspos draft.
7. Cache consistency telah diuji.
8. Middleware dan security boundaries valid.
9. Error handling konsisten.
10. Media handling aman.
11. Observability tersedia.
12. Load test terdokumentasi.
13. Backup/restore teruji.
14. Staging release terverifikasi.
15. Dokumentasi operasional tersedia.
16. Tidak terdapat blocker kritis yang belum terselesaikan.
17. Persetujuan rilis telah diperoleh.

---

# FINAL EXECUTION DIRECTIVE

## Mandatory AI Agent Workflow

**Read AGENTS.md → Read Active Task → Consult Blueprint → Inspect Source with CodeGraph → Analyze Impact → Implement Authorized Scope → Test → Review → Report.**

## Development Priorities

1. Correctness and contract integrity.
2. Security and data protection.
3. Maintainability and SOLID.
4. Reliability and testability.
5. Measured performance.
6. Simplicity of operation.
7. Scalable evolution when justified.

## Implementation Roadmap

**M0 → M1 → M2 → M3 → M4 → M5 → M6 (milestone exit order; task DAG di bawah memperbolehkan verification-only §2.6)**

Setiap milestone harus menghasilkan sistem yang lebih lengkap, teruji, dan dapat dipertanggungjawabkan.

AI Agent tidak boleh melewati quality gates untuk mempercepat penyelesaian.

**Current Status: DRAFT — PLANNING ONLY.**

**End of BACKEND_EXECUTION_PLAN.md — Version 1.1.0**


## Task4 — delegated development approval and current implementation

OWNER_DELEGATED_APPROVAL: `task/task4.md` authorizes routine local/staging technical choices and proceeding with M1 before later milestone decisions are finalized. Historical approval gates above are superseded for that scope; unresolved official facts and production operations remain outside this delegation. Selected initial baseline: server-generated UUID request IDs, no query/header logging, 6 s timeout, 64 KiB request limit, no auth/admin routes until protected, bounded SeaORM pool with startup ping. Full M0/M1 acceptance remains incomplete; see `ouput/IMPLEMENTATION_STATUS.md` for current evidence and limitations.
