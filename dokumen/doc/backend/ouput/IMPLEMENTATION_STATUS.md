# BALMON BACKEND — IMPLEMENTATION STATUS

## Batch M1 CORS — 5 November 2026

M1-02/M1-03 **IN PROGRESS**: `PUBLIC_CORS_ORIGIN` opsional dengan validasi satu origin HTTP(S) yang eksplisit; default tanpa origin lintas domain. CORS hanya pada `/api/v1/public`, tanpa credentials, dengan preflight origin cocok berstatus 204; origin lain dan namespace admin tidak mendapat header allow-origin. Contoh konfigurasi tersedia sebagai komentar di `.env.example`. Request timeout error diselaraskan menjadi `REQUEST_TIMEOUT`; waktu tunggu akuisisi pool 1 detik sesuai blueprint.

**PASS:** Windows Cargo fmt --check, check, clippy -D warnings, 14 tes reguler; 1 tes PostgreSQL eksplisit dengan `.env.test` PASS terpisah; CodeGraph sync PASS. Tes awal preflight mengungkap origin ditolak masih mendapat header statis; diperbaiki dengan predicate dan tes lulus. Tidak ada migration/seed/data mutation.

**Masih IN PROGRESS:** M0-02–M0-07 dan M1; normalisasi JSON rejection, pengujian redaksi log aktual, validasi konfigurasi menyeluruh dan startup/shutdown binary belum lengkap. M2–M6 belum dikerjakan; lanjut sesuai acceptance dan dependency DAG.

## Batch PostgreSQL test — 5 November 2026

Pengguna menyediakan `backend/.env.test` dan mengotorisasi penggunaannya untuk tes database. **PASS:** koneksi SeaORM menggunakan konfigurasi tersebut, identitas server `current_database() = balmon_backend_test` dan `current_user = balmon_user`, HTTP readiness pada server Axum lokal, graceful shutdown server test, dan penutupan pool (1 tes PostgreSQL eksplisit). Tidak ada migration, rollback, seed, atau perubahan data. File `.env.test` terkonfirmasi Git ignored; nilai rahasia tidak dicatat. Tes PostgreSQL diberi `#[ignore]` agar tidak pernah menggunakan konfigurasi database tanpa pemanggilan eksplisit.

**PASS:** Cargo Windows offline fmt --check, check, clippy -D warnings dan test biasa (12 tes; tes PostgreSQL diabaikan dalam run biasa dan dijalankan terpisah secara eksplisit: 1 PASS). CodeGraph sync PASS. Status M0/M1 tetap REVIEW/IN PROGRESS; M1 belum memenuhi seluruh acceptance: CORS/preflight, rejection body, verifikasi redaksi log, validasi konfigurasi lengkap dan lifecycle binary startup/shutdown masih perlu pengujian. M2–M6 belum diimplementasikan; database bukan lagi blocker untuk tes koneksi. Verifikasi database dan isi tabel/backup sebelum migration/rollback/seed apa pun.

Langkah berikut: selesaikan mandatory M1 dan pekerjaan M0 independen, lalu M2 berdasarkan dependency DAG; gunakan `.env.test` secara eksplisit pada semua tes database dan periksa `current_database()` sebelum setiap operasi mutasi.

## Status terkini — task5, 5 November 2026

Task4 delegated approval tetap berlaku. **DONE:** M0-01. **REVIEW/IN PROGRESS:** M0-02–M0-07 dan M1-01–M1-06; acceptance lengkap belum dibuktikan. **PLANNED:** seluruh task M2–M6 yang tercantum dalam tabel task dan dependensi di bawah. Tidak ada migrasi atau seed yang dijalankan.

PostgreSQL Windows 17 service `postgresql-x64-17` **PASS** Running, psql.exe tersedia dan TCP 127.0.0.1:5432 **PASS**. Koneksi noninteraktif `psql -w` ke database administratif `postgres` dengan role `postgres` dan `balmon_user` **BLOCKED**, server meminta password; tidak ada credential dibaca, ditebak atau dicatat. Tidak membuat database/role dan tidak mengakses database development existing. Uji PostgreSQL healthy/readiness/lifecycle dan migration **BLOCKED** sampai autentikasi aman tersedia.

Windows Cargo offline: **PASS** fmt --check, check, clippy -D warnings, dan test (12 tests: 1 unit, 1 contract health envelope, 7 integration, 3 security). Contract test belum menguji 24 API domain. Timeout nyata 6 detik, koneksi ke port tertutup, startup tanpa URL, admin 404 dan redaksi respons diuji. Middleware tracing kini hanya mencatat matched route template dan tidak mencatat parameter URL/query. **NOT RUN:** CORS/preflight valid, invalid body decoder, log capture redaction, live PostgreSQL/graceful shutdown, frontend, migration, domain contract, cache dan performance. M1 belum DONE; jangan melompat ke M2 sebelum gate mandatory.

CodeGraph status tersedia; sync setelah perubahan **BLOCKED** karena lock dipegang proses node Windows aktif PID 19992; jangan hapus lock proses aktif. Verifikasi source secara langsung sampai indeks dapat disinkronkan. RTK tidak tersedia; shell langsung digunakan.

Langkah berikut: lanjutkan tes konfigurasi, tracing, body rejection, CORS dan graceful shutdown; siapkan akses PostgreSQL test terisolasi dengan mekanisme autentikasi resmi yang aman; jalankan tes pool/health/shutdown, tutup M0/M1 sesuai acceptance, lalu M2 sesuai DAG.

## Status terkini — task4, 5 November 2026

`task/task4.md` memberikan **OWNER_DELEGATED_APPROVAL** untuk keputusan development M0–M6 dan mengizinkan implementasi M1 tanpa menunggu penyelesaian keputusan yang hanya diperlukan milestone berikutnya. Persetujuan ini tidak mengesahkan fakta resmi yang belum diketahui atau tindakan produksi. Bagian task3 di bawah dipertahankan sebagai riwayat; pernyataan approval pending dan status scaffold-only di sana telah tersupersesi.

- M0-01 DONE; M0-02/03/04/05/06/07 REVIEW/IN PROGRESS: approval teknis telah didelegasikan, tetapi seluruh acceptance dan rekonsiliasi fakta belum diverifikasi.
- M1-01 dan M1-05: REVIEW; kompilasi dan struktur scaffold terverifikasi, namun acceptance lengkap belum diaudit ulang.
- M1-02/03/04/06: IN PROGRESS. Implementasi config, shared state, pool SeaORM, bootstrap, health, response/error dan middleware awal tersedia. Auth/admin belum dipasang. Tidak ada API publik domain.
- M2–M6: PLANNED; belum ada migrasi, import, CMS, cache, frontend integration atau deployment.

**Bukti batch task4:** PASS Windows Cargo offline `fmt --all -- --check`; `clippy --locked --offline --all-targets --all-features -- -D warnings`; `test --locked --offline --all-targets --all-features` (1 unit + 5 integration; file contract/security masing-masing 0 test). PASS `check --locked --offline --all-targets --all-features` setelah perubahan. Red awal test integrasi gagal karena router/state belum ada; clippy awal gagal `collapsible_if`, sudah diperbaiki.

**BLOCKED:** tes koneksi PostgreSQL sukses, migration/rollback dan seed: tidak ditemukan executable PostgreSQL, psql, Docker atau Podman di PATH Linux; target database yang aman dan terisolasi belum tersedia/terverifikasi. **NOT RUN:** tes kontrak endpoint, security suite khusus, timeout/concurrency, CORS/rate limit, cache, frontend dan performance. Gate M1 belum terpenuhi. Perlu memastikan startup/shutdown pool dan perilaku health dengan PostgreSQL disposable; jangan gunakan database existing tanpa memverifikasi target.

**Langkah berikut:** selesaikan baseline middleware/konfigurasi dan tes yang belum ada; sediakan PostgreSQL test terisolasi, jalankan integration test; selesaikan M0-02–07 berdasarkan acceptance, lanjut migrasi M2 dan API M3–M6.

## Riwayat task3 (sebagian telah tersupersesi)

Tanggal: 5 November 2026. Task aktif: `task/task3.md` — autonomous backend development berdasarkan execution plan. Status dicatat dari pemeriksaan saat ini; bukan bukti seluruh roadmap selesai.

## Kondisi milestone dan scope yang telah dikerjakan

**M0: BLOCKED / APPROVAL_PENDING.** M0-01 selesai; M0-04 menunggu review; M0-02/03/05/06/07 masih blocked oleh keputusan pemilik atau dependensi. Parser DBML dan validator OpenAPI yang sebelumnya belum tersedia kini telah dijalankan. Hasil teknis tersebut bukan persetujuan owner atas DBML, data resmi, keamanan, deployment atau CMS.

**M1: BLOCKED.** Struktur scaffold diperiksa dan diformat dengan benar, tetapi check Rust offline di sandbox terhenti karena `errno v0.3.14` tidak ada di cache Linux yang tersedia. Tidak ada perubahan source Rust atau dependency/lockfile. M1-01 dan M1-05 belum memenuhi acceptance compilation dan belum DONE. M1-02/03/04 dan implementasi M1 lainnya menunggu gate M0-07 dan persetujuan yang relevan sesuai execution plan §2.6.

**M2–M6: PLANNED.** Dependensi sebelumnya dan keputusan yang berdampak pada milestone terkait belum terpenuhi. Tidak ada migrasi, seed, server, endpoint, admin, cache, security runtime, staging atau deployment yang dijalankan. Tidak ada tes fungsional backend; tiga file test backend saat ini hanya komentar.

## Task yang dikerjakan pada batch ini

| Task | Status | Bukti / acceptance |
| --- | --- | --- |
| M0-01 Frontend Source Inventory | DONE | PASS: 22 JSON valid pada frontend Ajv 2020 + ajv-formats; 24 GET cocok; 25 reader; schema bindings, provider variable dan timeout 8000 ms diperiksa. Mapping tersedia di Blueprint §9.8. Ini tidak menguji endpoint live. |
| M0-04 API Contract Finalization | REVIEW | PASS: Redocly CLI 2.75.0 exit 0; Ajv memvalidasi 192 contoh respons dan delapan fixture; parity 24 paths dan contoh kontak/fungsi setelah koreksi lulus. Tiga lint warnings dan review owner masih ada. |
| M0-05 Database Blueprint | BLOCKED | PASS: parser resmi `@dbml/core` 11.0.1, format `dbmlv2`; hasil satu schema. Export PostgreSQL menghasilkan 26 tables, 26 checks dan 11 FK; SQL tidak dijalankan. Status keseluruhan blocked karena DBML/FK/import/data belum disetujui dan tidak ada migrasi atau uji PostgreSQL. |
| M1-01 Rust Project Scaffold | BLOCKED | PASS: Windows Cargo metadata `--locked --offline --no-deps`, `cargo fmt --all -- --check`. BLOCKED: isolated Linux Cargo check `--locked --offline --all-targets --all-features`, cache tidak memuat `errno v0.3.14`. |
| M1-05 Architecture Module Skeleton | BLOCKED | PASS: 10 module exports, masing-masing `mod.rs` dan empat file layer ada; 40 layer bisnis komentar saja. Compilation gate M1-01 belum lulus; tidak menyatakan batas implementasi runtime terverifikasi. |

Perubahan OpenAPI hanya tiga baris contoh: hapus metadata `$schema` dari contoh `GET /contacts`; kutip `08` dan `09` agar tetap string pada parser YAML 1.2. Nilai dua kode sama dengan JSON canonical. Hash awal OpenAPI dipulihkan secara eksak dengan membalik tiga perubahan tersebut dalam memori; tidak mengubah frontend atau canonical JSON. Redocly semula menemukan tiga warning validitas contoh tersebut; sesudah perbaikan tidak ada warning validitas contoh.

Tiga warning Redocly yang masih ada: informasi lisensi belum tersedia; server masih `localhost` untuk target development; komponen `PerformanceMetricsDTO` belum direferensikan langsung. Jangan mengarang lisensi atau alamat produksi untuk menghilangkan warning.

## Status dan dependensi seluruh task

| Task ID | Task | Status | Dependensi langsung |
| --- | --- | --- | --- |
| M0-01 | Frontend Source Inventory | DONE | NONE (source inventory) |
| M0-02 | Canonical Data Traceability | BLOCKED | M0-01 |
| M0-03 | Contract Conflict Resolution | BLOCKED | M0-02 |
| M0-04 | API Contract Finalization | REVIEW | M0-01, M0-02 |
| M0-05 | Database Blueprint Finalization | BLOCKED | M0-02 |
| M0-06 | Security, Caching & Integration Decisions | BLOCKED | M0-04, M0-05 |
| M0-07 | Architecture Freeze & Implementation Readiness | BLOCKED | M0-01, M0-02, M0-03, M0-04, M0-05, M0-06 |
| M1-01 | Rust Project Scaffold | BLOCKED | M0-01 |
| M1-02 | Configuration & AppState | PLANNED | M0-07, M1-01 |
| M1-03 | Axum Routing & Error Foundation | PLANNED | M1-02, M0-04, M0-06 |
| M1-04 | PostgreSQL Connectivity | PLANNED | M1-02, M1-03 |
| M1-05 | Architecture Module Skeleton | BLOCKED | M1-01 |
| M1-06 | Foundation Tests & CI | PLANNED | M1-03, M1-04, M1-05 |
| M2-01 | SeaORM Entity & Migration Foundation | PLANNED | M1-06, M0-05 |
| M2-02 | Core Content Schema | PLANNED | M2-01, M2-04 |
| M2-03 | Institutional & Statistical Schema | PLANNED | M2-01, M2-02, M2-04 |
| M2-04 | CMS Infrastructure Schema | PLANNED | M2-01 |
| M2-05 | Canonical Import & Seeding | PLANNED | M2-02, M2-03, M2-04, M0-03 |
| M2-06 | Static Resources & Data Parity Verification | PLANNED | M2-05 |
| M3-01 | Shared API Contract Verification Harness | PLANNED | M2-06, M1-03, M0-04 |
| M3-02 | Contacts, Institution & Site Content | PLANNED | M3-01 |
| M3-03 | Services API | PLANNED | M3-01 |
| M3-04 | Publications API | PLANNED | M3-01 |
| M3-05 | Public Information API | PLANNED | M3-01 |
| M3-06 | Coverage & Performance API | PLANNED | M3-01, M0-03 |
| M3-07 | Full Public Contract Verification | PLANNED | M3-02, M3-03, M3-04, M3-05, M3-06 |
| M4-01 | Global Tower Middleware Regression & Completion | PLANNED | M1-03, M3-07 |
| M4-02 | Scoped HTTP Security | PLANNED | M4-01 |
| M4-03 | Moka Cache Infrastructure | PLANNED | M4-01 |
| M4-04 | Cache Consistency Foundation | PLANNED | M4-03 |
| M4-05 | Observability Foundation | PLANNED | M4-01, M4-03 |
| M4-06 | Frontend Provider Integration | PLANNED | M3-07, M4-04, M4-05, M0-06 |
| M4-07 | Middleware & Cache Test Gate | PLANNED | M4-02, M4-04, M4-05, M4-06 |
| M5-01 | Authentication & Sessions | PLANNED | M4-07, M2-04, M0-06 |
| M5-02 | RBAC & Authorization | PLANNED | M5-01 |
| M5-03 | Publications & Document CRUD | PLANNED | M5-02, M5-06 |
| M5-04 | Services & Portal Management | PLANNED | M5-02 |
| M5-05 | Singleton & Institutional CMS | PLANNED | M5-02, M5-06 |
| M5-06 | Media Management | PLANNED | M5-02 |
| M5-07 | Publishing Workflow & Audit/Cache Regression | PLANNED | M5-03, M5-04, M5-05, M4-04 |
| M5-08 | Statistical Data Administration | PLANNED | M5-02, M3-06, M4-04 |
| M5-09 | Admin API Integration & Security Testing | PLANNED | M5-03, M5-04, M5-05, M5-06, M5-07, M5-08 |
| M6-01 | Security Hardening | PLANNED | M5-09 |
| M6-02 | Database Optimization | PLANNED | M5-09 |
| M6-03 | Performance Benchmarking | PLANNED | M6-02 |
| M6-04 | Deployment Configuration | PLANNED | M6-01, M6-03 |
| M6-05 | Backup, Restore & Recovery | PLANNED | M6-04 |
| M6-06 | Operational Runbook & Handover | PLANNED | M6-04, M6-05 |
| M6-07 | Final Release Gate | PLANNED | M6-01, M6-03, M6-05, M6-06 |

## Verifikasi aktual

| Pemeriksaan | Status | Bukti dan batas |
| --- | --- | --- |
| CodeGraph Windows 1.6.2 `status` | PASS | Indeks 279 file, 2.980 nodes, 6.446 edges; tool melaporkan up to date. Query/callers/callees/impact/affected dan explore dijalankan; sync sesudah edit melaporkan already up to date. MCP alternatif melaporkan graph kosong. |
| CodeGraph CLI WSL / rtk | BLOCKED | Shell `codegraph status` gagal karena `node` tidak ada di PATH; `rtk` tidak tersedia. Binary Windows CodeGraph dipanggil langsung sebagai fallback. Kegagalan WSL bukan kegagalan Windows. |
| DBML parser | PASS | `@dbml/core` 11.0.1 `new Parser().parse(input, "dbmlv2")`, exit 0. Syntax/parser dan export DDL saja, bukan SQL execution/migration/constraints runtime atau owner approval. Exporter menambahkan `DEFERRABLE INITIALLY IMMEDIATE` pada 11 FK; DBML tidak secara eksplisit memilih deferrability, sehingga kebijakan ini harus ditinjau sebelum migration. |
| OpenAPI lint | PASS | Redocly CLI 2.75.0 `lint`, exit 0, tiga warnings dokumentasi yang disebut di atas. Tidak mengklaim API berjalan. |
| Ajv canonical inventory | PASS | Ajv 2020 dengan konfigurasi strict seperti validator frontend dan ajv-formats: 22/22 canonical JSON; 24 path dan 25 reader; code provider/timeout ditelaah. Identity/provider live/runtime tidak termasuk. |
| Ajv API examples and fixtures | PASS | YAML 1.2 parse, 24 paths, 192 contoh response, delapan fixture positif/negatif; contoh office tanpa metadata dan kode `08`/`09` sama dengan sumber. Ajv schema 2020 backend memakai strict:false untuk keyword OpenAPI; canonical memakai strict:true. Dua fixture status HTTP runtime tetap NOT RUN. |
| Cargo metadata / fmt | PASS | Cargo Windows 1.99.1 metadata `--locked --offline --no-deps`, exit 0; `cargo fmt --all -- --check`, exit 0. Ini tidak berarti compilation atau functionality PASS. |
| Cargo check, isolated Linux | BLOCKED | Setelah memperbaiki setup library sandbox, `cargo check --manifest-path /project/Cargo.toml --locked --offline --all-targets --all-features` exit 101 karena crate `errno v0.3.14` tidak tersedia di cache offline. Tidak mengunduh dependency proyek atau mengubah Cargo.lock. Diagnostic awal `rustc -vV` juga gagal karena dynamic library path belum dipasang; diperbaiki pada percobaan berikutnya. |
| Cargo clippy / test | NOT RUN | Cargo check terhalang offline cache; tidak mengulang gate yang bergantung pada penyebab sama. Minimal toolchain Linux temporary juga belum membuktikan ketersediaan C compiler. Tidak mengklaim zero-test sebagai lulus fitur. |
| Frontend provider switching, Svelte/Vitest/build/browser | NOT RUN | Tidak ada perubahan frontend. Ajv schema checks di atas bukan provider integration atau UI runtime tests. |
| PostgreSQL migrations, seed, backend API/security/performance, staging | NOT RUN | Owner decisions dan milestone prerequisites belum selesai; tidak ada service/database dijalankan. |
| Source protection | PASS | 477 hash file frontend/backend/Cargo/resources/tests/supporting docs sama dengan snapshot sebelumnya. Perubahan dirty existing root dan nested frontend dipertahankan. `.env` tidak dibaca/dicetak. |
| Diff scope | PASS | OpenAPI terbukti hanya tiga baris contoh; execution plan terbukti hanya update status, checkbox dan evidence task3 terhadap hash sebelum task3. Dua laporan baru adalah file handoff yang diminta. |

Parser/lint/Ajv dijalankan di namespace user+network+mount+PID dengan network terisolasi, project inputs dan tools read-only, home/scratch sementara, environment allowlist dan batas CPU/memori/proses/ukuran file. Alat Node Linux 24.13.0 dan Rust 1.99.1 serta validator dipasang sementara di `/tmp/balmon-task3-tools-Bgsx7T` untuk eksekusi sandbox; checksum archive Node dan rustup diverifikasi terhadap file checksum resmi. Ini bukan dependency Cargo yang ditambahkan ke proyek dan tidak mengubah toolchain sistem. Direktori temporary bisa hilang setelah sesi.

## Approval pending dan keputusan yang benar-benar terbuka

1. **HTTP/security foundation M1:** owner perlu meninjau rekomendasi middleware, request ID, redaction, timeout/body limit dan response/error mapping pada Blueprint §7.12 sebelum M1-03; production topology/origin dan auth tetap keputusan terpisah.
2. **DBML/seed M2:** owner perlu meninjau checks, 11 FK RESTRICT, deferrability yang ditambahkan exporter, identitas import/alias dan kebijakan tidak menimpa CMS pada DBML dan Blueprint §9.8. Parser PASS bukan approval, dan tidak ada migrasi.
3. **Fakta resmi:** selisih luas wilayah, pimpinan/tanggal berlaku, tahun statistik dan metrik functions perlu pemilik data; tidak mengisi fakta berdasarkan asumsi.
4. **M4–M6:** freshness SSR/hybrid/rebuild, topology aktual, storage media, final auth/RBAC/CSRF/admin contract dan workflow CMS tetap menunggu keputusan pada milestone terdampak. Tidak ada production deployment tanpa izin terpisah.
5. **Offline verification:** cache Rust Linux perlu tersedia lengkap dan C toolchain perlu diverifikasi pada lingkungan terisolasi sebelum check/clippy/test dapat diklaim. Rencana verifikasi terbatas §2.6 melarang instalasi/update dependency proyek; perubahan terhadap batas itu memerlukan scope yang sesuai.

## File yang diubah dalam task3

- `doc/backend/openapi.v1.yaml` — tiga koreksi contoh saja.
- `doc/backend/BACKEND_EXECUTION_PLAN.md` — status M0-01/M1-01/M1-05, checkbox dan evidence yang benar.
- `doc/backend/ouput/IMPLEMENTATION_STATUS.md` — laporan ini, baru.
- `doc/backend/ouput/LLM_HANDOFF.txt` — ringkasan lanjutan mandiri, baru.

Laporan sebelumnya `AUDIT_BACKEND_DOCS.md` dan `LLM_CONTEXT.txt` dipertahankan sebagai hasil task2; bagian yang menyatakan parser/Ajv belum dijalankan bersifat historis. Gunakan laporan ini untuk hasil task3 terkini. Ada 158 entri dirty Git root dan 126 entri dirty nested frontend sebelum task3; perubahan tersebut bukan dibuat atau dibersihkan oleh task ini.

## Langkah berikutnya yang konkret

Minta owner meninjau dan memutuskan baseline HTTP/security §7.12 dan apakah pekerjaan M1 yang independen boleh berjalan dengan isu data/DBML/SSR/CMS tetap ditunda pada milestone terkait. Ini tidak menandai M0 DONE. Jika disetujui, dokumentasikan keputusan dan scope yang diotorisasi; lanjutkan M1-02/03 sesuai DAG dan verifikasi pada sandbox dengan dependency cache yang cukup. Jika owner menghendaki gate M0 penuh tanpa pengecualian, selesaikan M0-02/03/05/06 dan M0-07 setelah keputusan terkait. Tidak boleh mengasumsikan persetujuan.

## Lampiran: command sandbox yang dieksekusi

Command berikut menggunakan direktori sementara yang mungkin hilang setelah sesi. Isi scratch bukan bagian repo. Semua mount input bersifat read-only, network namespace terisolasi, dan proses hanya dapat menulis pada `/scratch`.

### DBML parser dan lint OpenAPI

```bash
unshare --user --map-root-user --net --mount --pid --fork bash -c '
set -e
TASK3_ROOT=/tmp/balmon-task3-sandbox-KBktti
TASK3_REPO="/mnt/d/KERJA/magang hub/batch2/Balaimonitor/balmon-pekanbaru"
mount --make-rprivate /
mount --bind "$TASK3_ROOT" "$TASK3_ROOT"
mount -o remount,bind,ro "$TASK3_ROOT"
mount --bind /tmp/balmon-task3-tools-Bgsx7T "$TASK3_ROOT/runtime"
mount -o remount,bind,ro "$TASK3_ROOT/runtime"
mount --bind "$TASK3_REPO/doc/backend/database.dbml" "$TASK3_ROOT/inputs/database.dbml"
mount -o remount,bind,ro "$TASK3_ROOT/inputs/database.dbml"
mount --bind "$TASK3_REPO/doc/backend/openapi.v1.yaml" "$TASK3_ROOT/inputs/openapi.yaml"
mount -o remount,bind,ro "$TASK3_ROOT/inputs/openapi.yaml"
mount --bind /dev/null "$TASK3_ROOT/dev/null"
mount --bind /dev/urandom "$TASK3_ROOT/dev/urandom"
mount -t tmpfs -o size=256m,nosuid,nodev tmpfs "$TASK3_ROOT/scratch"
mkdir -p "$TASK3_ROOT/scratch/home" "$TASK3_ROOT/scratch/tmp"
ulimit -t 60
ulimit -v 3145728
ulimit -u 64
ulimit -f 16384
cd "$TASK3_ROOT"
exec env -i HOME=/scratch/home TMPDIR=/scratch/tmp PATH=/runtime/bin LANG=C.UTF-8 NODE_OPTIONS=--max-old-space-size=512 /usr/sbin/chroot "$TASK3_ROOT" /runtime/bin/node -e "$1"
' _ 'const fs=require("fs");const {Parser}=require("/runtime/validators/node_modules/@dbml/core");let result=0;try{let db=new Parser().parse(fs.readFileSync("/inputs/database.dbml","utf8"),"dbmlv2");console.log("DBML_PARSER PASS version=11.0.1 schemas="+db.schemas.length);}catch(e){result=1;console.error("DBML_PARSER FAIL",String(e));}const cp=require("child_process");let lint=cp.spawnSync(process.execPath,["/runtime/validators/node_modules/@redocly/cli/bin/cli.js","lint","/inputs/openapi.yaml"],{encoding:"utf8",timeout:45000,env:process.env});console.log("REDOCLY_STATUS",lint.status);console.log((lint.stdout||"")+(lint.stderr||""));if(lint.error)console.error(String(lint.error));if(result||lint.status!==0)process.exit(1);'
```

### M0-01: Ajv canonical dan inventory

```bash
unshare --user --map-root-user --net --mount --pid --fork bash -c '
set -e
TASK3_ROOT=/tmp/balmon-task3-sandbox-KBktti
TASK3_REPO="/mnt/d/KERJA/magang hub/batch2/Balaimonitor/balmon-pekanbaru"
mount --make-rprivate /
mount --bind "$TASK3_ROOT" "$TASK3_ROOT"
mount -o remount,bind,ro "$TASK3_ROOT"
mount --bind /tmp/balmon-task3-tools-Bgsx7T "$TASK3_ROOT/runtime"
mount -o remount,bind,ro "$TASK3_ROOT/runtime"
mount --bind "$TASK3_REPO/doc/backend/database.dbml" "$TASK3_ROOT/inputs/database.dbml"
mount -o remount,bind,ro "$TASK3_ROOT/inputs/database.dbml"
mount --bind "$TASK3_REPO/doc/backend/openapi.v1.yaml" "$TASK3_ROOT/inputs/openapi.yaml"
mount -o remount,bind,ro "$TASK3_ROOT/inputs/openapi.yaml"
mount --bind "$TASK3_REPO/frontend/src/lib/data" "$TASK3_ROOT/inputs/data"
mount -o remount,bind,ro "$TASK3_ROOT/inputs/data"
mount --bind "$TASK3_REPO/frontend/src/lib/contracts/schemas" "$TASK3_ROOT/inputs/schemas"
mount -o remount,bind,ro "$TASK3_ROOT/inputs/schemas"
mount --bind "$TASK3_REPO/frontend/src/lib/contracts/static-contracts.json" "$TASK3_ROOT/inputs/static-contracts.json"
mount -o remount,bind,ro "$TASK3_ROOT/inputs/static-contracts.json"
mount --bind "$TASK3_REPO/frontend/node_modules" "$TASK3_ROOT/mnt/d/KERJA/magang hub/batch2/Balaimonitor/balmon-pekanbaru/frontend/node_modules"
mount -o remount,bind,ro "$TASK3_ROOT/mnt/d/KERJA/magang hub/batch2/Balaimonitor/balmon-pekanbaru/frontend/node_modules"
mount --bind "$TASK3_REPO/frontend/docs/api/openapi.yaml" "$TASK3_ROOT/inputs/frontend-openapi.yaml"
mount -o remount,bind,ro "$TASK3_ROOT/inputs/frontend-openapi.yaml"
mount --bind "$TASK3_REPO/frontend/src/lib/repositories/interfaces/index.ts" "$TASK3_ROOT/inputs/interfaces.ts"
mount -o remount,bind,ro "$TASK3_ROOT/inputs/interfaces.ts"
mount --bind "$TASK3_REPO/frontend/src/lib/config/data-source.ts" "$TASK3_ROOT/inputs/provider-config.ts"
mount -o remount,bind,ro "$TASK3_ROOT/inputs/provider-config.ts"
mount --bind "$TASK3_REPO/frontend/src/lib/api/client.ts" "$TASK3_ROOT/inputs/api-client.ts"
mount -o remount,bind,ro "$TASK3_ROOT/inputs/api-client.ts"
mount --bind /dev/null "$TASK3_ROOT/dev/null"
mount --bind /dev/urandom "$TASK3_ROOT/dev/urandom"
mount -t tmpfs -o size=256m,nosuid,nodev tmpfs "$TASK3_ROOT/scratch"
mkdir -p "$TASK3_ROOT/scratch/home" "$TASK3_ROOT/scratch/tmp"
ulimit -t 60
ulimit -v 3145728
ulimit -u 64
ulimit -f 16384
cd "$TASK3_ROOT"
exec env -i HOME=/scratch/home TMPDIR=/scratch/tmp PATH=/runtime/bin LANG=C.UTF-8 NODE_OPTIONS=--max-old-space-size=512 /usr/sbin/chroot "$TASK3_ROOT" /runtime/bin/node -e "$1"
' _ 'const fs=require("fs");const path=require("path");const root="/mnt/d/KERJA/magang hub/batch2/Balaimonitor/balmon-pekanbaru/frontend/node_modules";const Ajv=require(root+"/ajv/dist/2020.js").Ajv2020;const addFormats=require(root+"/ajv-formats");const ajv=new Ajv({allErrors:true,strict:true,strictRequired:false,coerceTypes:false,useDefaults:false,removeAdditional:false});addFormats(ajv);const mapping=JSON.parse(fs.readFileSync("/inputs/static-contracts.json"));let bad=[];for(const [file,[domain,key]] of Object.entries(mapping)){let schema=JSON.parse(fs.readFileSync(path.join("/inputs/schemas",domain+".schema.json")));let target=key?schema.properties[key]:schema;let validate=ajv.compile(target);let data=JSON.parse(fs.readFileSync(path.join("/inputs/data",file)));if(!validate(data))bad.push({file,errors:validate.errors});}function paths(file){return Array.from(fs.readFileSync(file,"utf8").matchAll(/^  (\/[^:\r\n]+):\s*$/gm),m=>m[1]).sort()}const backend=paths("/inputs/openapi.yaml");const frontend=paths("/inputs/frontend-openapi.yaml");const methods=Array.from(fs.readFileSync("/inputs/interfaces.ts","utf8").matchAll(/\bget\w+\s*\(/g));const cfg=fs.readFileSync("/inputs/provider-config.ts","utf8");const client=fs.readFileSync("/inputs/api-client.ts","utf8");if(Object.keys(mapping).length!==22||backend.length!==24||JSON.stringify(backend)!==JSON.stringify(frontend)||methods.length!==25||!cfg.includes("BALMON_PUBLIC_INFORMATION_SOURCE")||cfg.includes("BALMON_DATA_SOURCE_DEFAULT")||!client.includes("8000"))throw Error("inventory mismatch");if(bad.length){console.error(JSON.stringify(bad));process.exit(1)}console.log("M0-01 PASS 22 canonical Ajv schemas;24 backend/frontend GET paths;25 reader methods;provider name;8000ms default");'
```

### OpenAPI examples dan fixture Ajv

```bash
unshare --user --map-root-user --net --mount --pid --fork bash -c '
set -e
TASK3_ROOT=/tmp/balmon-task3-sandbox-KBktti
TASK3_REPO="/mnt/d/KERJA/magang hub/batch2/Balaimonitor/balmon-pekanbaru"
mount --make-rprivate /
mount --bind "$TASK3_ROOT" "$TASK3_ROOT"
mount -o remount,bind,ro "$TASK3_ROOT"
mount --bind /tmp/balmon-task3-tools-Bgsx7T "$TASK3_ROOT/runtime"
mount -o remount,bind,ro "$TASK3_ROOT/runtime"
mount --bind "$TASK3_REPO/doc/backend/database.dbml" "$TASK3_ROOT/inputs/database.dbml"
mount -o remount,bind,ro "$TASK3_ROOT/inputs/database.dbml"
mount --bind "$TASK3_REPO/doc/backend/openapi.v1.yaml" "$TASK3_ROOT/inputs/openapi.yaml"
mount -o remount,bind,ro "$TASK3_ROOT/inputs/openapi.yaml"
mount --bind "$TASK3_REPO/frontend/src/lib/data" "$TASK3_ROOT/inputs/data"
mount -o remount,bind,ro "$TASK3_ROOT/inputs/data"
mount --bind "$TASK3_REPO/frontend/src/lib/contracts/schemas" "$TASK3_ROOT/inputs/schemas"
mount -o remount,bind,ro "$TASK3_ROOT/inputs/schemas"
mount --bind "$TASK3_REPO/frontend/src/lib/contracts/static-contracts.json" "$TASK3_ROOT/inputs/static-contracts.json"
mount -o remount,bind,ro "$TASK3_ROOT/inputs/static-contracts.json"
mount --bind "$TASK3_REPO/frontend/node_modules" "$TASK3_ROOT/mnt/d/KERJA/magang hub/batch2/Balaimonitor/balmon-pekanbaru/frontend/node_modules"
mount -o remount,bind,ro "$TASK3_ROOT/mnt/d/KERJA/magang hub/batch2/Balaimonitor/balmon-pekanbaru/frontend/node_modules"
mount --bind "$TASK3_REPO/frontend/docs/api/openapi.yaml" "$TASK3_ROOT/inputs/frontend-openapi.yaml"
mount -o remount,bind,ro "$TASK3_ROOT/inputs/frontend-openapi.yaml"
mount --bind "$TASK3_REPO/frontend/src/lib/repositories/interfaces/index.ts" "$TASK3_ROOT/inputs/interfaces.ts"
mount -o remount,bind,ro "$TASK3_ROOT/inputs/interfaces.ts"
mount --bind "$TASK3_REPO/frontend/src/lib/config/data-source.ts" "$TASK3_ROOT/inputs/provider-config.ts"
mount -o remount,bind,ro "$TASK3_ROOT/inputs/provider-config.ts"
mount --bind "$TASK3_REPO/frontend/src/lib/api/client.ts" "$TASK3_ROOT/inputs/api-client.ts"
mount -o remount,bind,ro "$TASK3_ROOT/inputs/api-client.ts"
mount --bind /dev/null "$TASK3_ROOT/dev/null"
mount --bind /dev/urandom "$TASK3_ROOT/dev/urandom"
mount -t tmpfs -o size=256m,nosuid,nodev tmpfs "$TASK3_ROOT/scratch"
mkdir -p "$TASK3_ROOT/scratch/home" "$TASK3_ROOT/scratch/tmp"
ulimit -t 60
ulimit -v 3145728
ulimit -u 64
ulimit -f 16384
cd "$TASK3_ROOT"
exec env -i HOME=/scratch/home TMPDIR=/scratch/tmp PATH=/runtime/bin LANG=C.UTF-8 NODE_OPTIONS=--max-old-space-size=512 /usr/sbin/chroot "$TASK3_ROOT" /runtime/bin/node -e "$1"
' _ 'const fs=require("fs");const assert=require("assert");const root="/mnt/d/KERJA/magang hub/batch2/Balaimonitor/balmon-pekanbaru/frontend/node_modules";const YAML=require(root+"/.pnpm/yaml@1.10.3/node_modules/yaml");const {Ajv2020}=require(root+"/ajv/dist/2020.js");const addFormats=require(root+"/ajv-formats");const ajv=new Ajv2020({strict:false,allErrors:true});addFormats(ajv);const spec=YAML.parse(fs.readFileSync("/inputs/openapi.yaml","utf8"));const source=YAML.parse(fs.readFileSync("/inputs/frontend-openapi.yaml","utf8"));const j=file=>JSON.parse(fs.readFileSync(file,"utf8"));function pointer(ref){assert(ref.startsWith("#/"));return ref.slice(2).split("/").reduce((v,k)=>v[k.replace(/~1/g,"/").replace(/~0/g,"~")],spec)}function resolve(x){if(Array.isArray(x))return x.map(resolve);if(x&&typeof x==="object"){if(x.$ref)return resolve(pointer(x.$ref));return Object.fromEntries(Object.entries(x).map(([k,v])=>[k,resolve(v)]))}return x}assert.deepStrictEqual(Object.keys(spec.paths).sort(),Object.keys(source.paths).sort());let office=j("/inputs/data/contacts/office.json");delete office.$schema;assert.deepStrictEqual(spec.paths["/contacts"].get.responses["200"].content["application/json"].example.data,office);let funcs=j("/inputs/data/institution/functions.json");let actual=spec.paths["/institution/functions"].get.responses["200"].content["application/json"].example.data;assert.deepStrictEqual(actual,funcs);assert.strictEqual(actual[7].code,"08");assert.strictEqual(actual[8].code,"09");let checked=0;for(const [path,op] of Object.entries(spec.paths)){for(const response of Object.values(op.get.responses)){let r=resolve(response),body=r.content["application/json"],valid=ajv.validate(resolve(body.schema),body.example);if(!valid)throw Error(path+" "+JSON.stringify(ajv.errors));checked++}}let perf=spec.paths["/performance"].get.responses["200"].content["application/json"].example;let cases=0;for(const f of spec["x-contract-fixtures"]){if(f.expectedValid===undefined)continue;let obj=JSON.parse(JSON.stringify(f.base==="GET /performance 404 example"?spec.components.responses.NOT_FOUND.content["application/json"].example:perf));if(f.mutation){let target=f.mutation.remove||f.mutation.replace;let parts=target.slice(1).split("/"),key=parts.pop(),parent=parts.reduce((v,k)=>v[k],obj);if(f.mutation.remove)delete parent[key];else parent[key]=f.mutation.value}let valid=ajv.validate(resolve(pointer(f.schema||"#/components/schemas/PerformanceCompositeDTOResponse")),obj);assert.strictEqual(valid,f.expectedValid,f.id);cases++}let front=j("/inputs/schemas/performance.schema.json");assert(ajv.validate(front.$defs.response,perf.data));let without=JSON.parse(JSON.stringify(perf.data));delete without.distribution;assert(ajv.validate(front.$defs.response,without));assert(!ajv.validate(resolve(pointer("#/components/schemas/PerformanceCompositeDTOResponse")),{...perf,data:without}));console.log("OPENAPI_AJV PASS paths="+Object.keys(spec.paths).length+" response-examples="+checked+" fixture-tests="+cases+" office-data/parity function-code-08/09 PASS");'
```

### DBML export PostgreSQL, tanpa eksekusi SQL

```bash
unshare --user --map-root-user --net --mount --pid --fork bash -c '
set -e
TASK3_ROOT=/tmp/balmon-task3-sandbox-KBktti
TASK3_REPO="/mnt/d/KERJA/magang hub/batch2/Balaimonitor/balmon-pekanbaru"
mount --make-rprivate /
mount --bind "$TASK3_ROOT" "$TASK3_ROOT"
mount -o remount,bind,ro "$TASK3_ROOT"
mount --bind /tmp/balmon-task3-tools-Bgsx7T "$TASK3_ROOT/runtime"
mount -o remount,bind,ro "$TASK3_ROOT/runtime"
mount --bind "$TASK3_REPO/doc/backend/database.dbml" "$TASK3_ROOT/inputs/database.dbml"
mount -o remount,bind,ro "$TASK3_ROOT/inputs/database.dbml"
mount --bind "$TASK3_REPO/doc/backend/openapi.v1.yaml" "$TASK3_ROOT/inputs/openapi.yaml"
mount -o remount,bind,ro "$TASK3_ROOT/inputs/openapi.yaml"
mount --bind /dev/null "$TASK3_ROOT/dev/null"
mount --bind /dev/urandom "$TASK3_ROOT/dev/urandom"
mount -t tmpfs -o size=256m,nosuid,nodev tmpfs "$TASK3_ROOT/scratch"
mkdir -p "$TASK3_ROOT/scratch/home" "$TASK3_ROOT/scratch/tmp"
ulimit -t 60
ulimit -v 3145728
ulimit -u 64
ulimit -f 16384
cd "$TASK3_ROOT"
exec env -i HOME=/scratch/home TMPDIR=/scratch/tmp PATH=/runtime/bin LANG=C.UTF-8 NODE_OPTIONS=--max-old-space-size=512 /usr/sbin/chroot "$TASK3_ROOT" /runtime/bin/node -e "$1"
' _ 'const fs=require("fs");const {Parser,ModelExporter}=require("/runtime/validators/node_modules/@dbml/core");const db=new Parser().parse(fs.readFileSync("/inputs/database.dbml","utf8"),"dbmlv2");const sql=ModelExporter.export(db,"postgres",{isNormalized:false});let lines=sql.split("\n");console.log("POSTGRES_DDL_EXPORT PASS chars="+sql.length+" tables="+(sql.match(/CREATE TABLE/g)||[]).length+" checks="+(sql.match(/\bCHECK\b/g)||[]).length+" fk="+(sql.match(/\bFOREIGN KEY\b/g)||[]).length);console.log(lines.filter(x=>x.includes("FOREIGN KEY")||x.includes("chk_articles_public_complete")||x.includes("chk_ppid_settings_singleton")).join("\n"));'
```

### Cargo check offline terisolasi

```bash
unshare --user --map-root-user --net --mount --pid --fork bash -c '
set -e
TASK3_ROOT=/tmp/balmon-task3-sandbox-KBktti
TASK3_BACKEND="/mnt/d/KERJA/magang hub/batch2/Balaimonitor/balmon-pekanbaru/backend"
mount --make-rprivate /
mount --bind "$TASK3_ROOT" "$TASK3_ROOT"
mount -o remount,bind,ro "$TASK3_ROOT"
mount --bind /tmp/balmon-task3-tools-Bgsx7T "$TASK3_ROOT/runtime"
mount -o remount,bind,ro "$TASK3_ROOT/runtime"
mount --bind "$TASK3_BACKEND/Cargo.toml" "$TASK3_ROOT/project/Cargo.toml"
mount -o remount,bind,ro "$TASK3_ROOT/project/Cargo.toml"
mount --bind "$TASK3_BACKEND/Cargo.lock" "$TASK3_ROOT/project/Cargo.lock"
mount -o remount,bind,ro "$TASK3_ROOT/project/Cargo.lock"
mount --bind "$TASK3_BACKEND/src" "$TASK3_ROOT/project/src"
mount -o remount,bind,ro "$TASK3_ROOT/project/src"
mount --bind "$TASK3_BACKEND/tests" "$TASK3_ROOT/project/tests"
mount -o remount,bind,ro "$TASK3_ROOT/project/tests"
mount --bind /dev/null "$TASK3_ROOT/dev/null"
mount --bind /dev/urandom "$TASK3_ROOT/dev/urandom"
mount -t tmpfs -o size=1536m,nosuid,nodev tmpfs "$TASK3_ROOT/scratch"
mkdir -p "$TASK3_ROOT/scratch/home" "$TASK3_ROOT/scratch/tmp" "$TASK3_ROOT/scratch/cargo/registry" "$TASK3_ROOT/scratch/target"
mount --bind "/mnt/c/Users/M-SI/.cargo/registry" "$TASK3_ROOT/scratch/cargo/registry"
mount -o remount,bind,ro "$TASK3_ROOT/scratch/cargo/registry"
ulimit -t 60
ulimit -v 4194304
ulimit -u 64
ulimit -f 131072
cd "$TASK3_ROOT"
exec env -i HOME=/scratch/home TMPDIR=/scratch/tmp CARGO_HOME=/scratch/cargo CARGO_TARGET_DIR=/scratch/target CARGO_NET_OFFLINE=true CARGO_BUILD_JOBS=2 LD_LIBRARY_PATH=/runtime/rustup/toolchains/1.99.1-x86_64-unknown-linux-gnu/lib PATH=/runtime/rustup/toolchains/1.99.1-x86_64-unknown-linux-gnu/bin:/usr/bin LANG=C.UTF-8 /usr/sbin/chroot "$TASK3_ROOT" /runtime/rustup/toolchains/1.99.1-x86_64-unknown-linux-gnu/bin/cargo check --manifest-path /project/Cargo.toml --locked --offline --all-targets --all-features
'
```

