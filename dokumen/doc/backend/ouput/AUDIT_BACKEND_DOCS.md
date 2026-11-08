# M0 POST-REMEDIATION VERIFICATION — TASK2

Tanggal: 5 November 2026. Proyek: Balmon Pekanbaru. Scope: documentation/specification remediation only. Tidak ada implementasi Rust/frontend, migrasi/seed database atau deployment.

## 1. Outcome and historical baseline

**M0 penuh: BLOCKED_M0.** Artifact dan spesifikasi sudah diperbaiki dalam cakupan task2. Keputusan owner yang masih PROPOSED/DECISION_REQUIRED dan parser DBML belum boleh dianggap selesai. M1-01/M1-05 dapat menjadi task verifikasi scaffold terbatas berikutnya setelah otorisasi baru; tidak ada coding M1 pada task ini.

Audit task1 menemukan execution plan kosong dan OpenAPI backend hilang, dengan 21 temuan: 0 CRITICAL, 6 HIGH, 10 MEDIUM, 2 LOW, 3 INFO. **Saat task2 dimulai, execution plan sudah berisi 1.882 baris.** Task2 mempertahankan dan melengkapi 49 ID task existing; bukan menganggap laporan lama sebagai keadaan terkini. OpenAPI backend masih missing pada awal task2 dan dibuat dalam task ini.

Rekonsiliasi 21/21: **10 RESOLVED, 9 PARTIAL, 2 DEFERRED, 0 BLOCKED** pada level finding. Status ini terpisah dari status test dan approval milestone. RESOLVED berarti masalah dokumentasi diperbaiki/diverifikasi atau fakta positif dipertahankan; bukan fitur backend telah diuji.

## 2. Files changed and protected scope

| File | Perubahan task2 |
| --- | --- |
| AGENTS.md | Versi 2.1; path doc/backend, metadata envelope, source precedence dan aturan verifikasi terbatas |
| doc/backend/BACKEND_BLUEPRINT.md | Versi 1.1.0; kontrak publik/supersession, provider, HTTP/security, transaksi/cache, import identity, DB/public projection, traceability dan decision gates |
| doc/backend/BACKEND_EXECUTION_PLAN.md | Versi 1.1.0; 49 task existing dengan kontrol, DAG, command profiles, approval, status dan recovery; security dasar sejak M1 |
| doc/backend/database.dbml | 26 tabel PROPOSED, 26 checks, enam singleton, 11 FK actions, penghapusan 10 unique ganda, public nullability dan import keys |
| doc/backend/openapi.v1.yaml | NEW: 24 GET, 52 schema, 25 bundled canonical bindings, composite Performance wajib dan fixture; admin hanya proposal |
| doc/backend/ouput/AUDIT_BACKEND_DOCS.md | Laporan post-remediation ini, dengan konteks historis task1 |
| doc/backend/ouput/LLM_CONTEXT.txt | Ringkasan mandiri post-remediation, termasuk seluruh 21 status/evidence/risks |

Hash **477 file terlindungi** dicatat sebelum edit dan diperiksa ulang setelahnya: source frontend/backend, Cargo, resources, tests, supporting docs serta config/package yang relevan. `.env` tidak dibaca/dicetak. Tidak ada instalasi dependency, credential change, migrasi/seed, service launch, Git restore/cleanup, commit/push atau deployment. Perubahan dirty repo yang sudah ada dipertahankan. Hanya tujuh file di atas diubah oleh task2; hasil pemeriksaan tetap dua laporan pada folder `ouput`.

## 3. Verified source, contract and implementation facts

- Ada 22 canonical JSON, delapan domain, 11 root array dan 11 root object. Tidak ada wrapper value/Count pada canonical aktual; wrapper pada ekspor historis bukan format seed.
- Ada 25 reader dan 24 public GET paths yang tetap sama dengan OpenAPI frontend. Seluruh 52 schema backend lolos check_schema; 25 bundled payload bindings sama persis dengan subschema frontend setelah metadata tracking dibuang.
- OpenAPI backend mandiri: 249 occurrences `$ref` berupa pointer lokal yang resolve. Admin/auth hanya extension PROPOSED; tidak dibuat path final dari asumsi.
- Performance 200 selalu memuat metrics, chart, documentId dan distribution valid. Invalid year: 400; unknown year: 404; known partial year: 503. Persamaan tahun lintas bagian, document visibility dan aggregate sum tetap invariant Application/runtime, bukan otomatis dibuktikan oleh validasi shape.
- Envelope success/error wajib memuat meta: timestamp date-time, version 1.0.0, sourceMode static_snapshot/live_database. 404 memakai NOT_FOUND. Dua contoh Blueprint valid; success memakai dokumen canonical nyata.
- DBML tetap 26 tabel, 11 FK, lima enum; memiliki 26 named checks, enam singleton checks dan tidak ada unique inline/index ganda. Ini bukti struktur, **bukan parser DBML atau SQL execution**.
- Backend tetap SCAFFOLDED_ONLY: 10 modul × empat file layer komentar, main Hello world, shared/infra/middleware/app/config/state komentar, tiga file test komentar. Cargo.lock tersedia; compilation/functionality NOT RUN. Tidak mengklaim Axum/DB/API/auth/cache sudah implemented.
- Empat snapshot static identik byte dan SHA-256. Luas 93.355,82 vs 89.935,90 km², informasi pimpinan, tahun referensi statistik dan functions metrics tetap membutuhkan keputusan pemilik data.

### Traceability sumber → database → module → DTO → GET → reader

Paths sumber relatif frontend/src/lib/data. Source/DTO/reader CONFIRMED; destination dan klasifikasi database masih PROPOSED.

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



## 4. Complete findings reconciliation

Severity/category mempertahankan klasifikasi task1. Status baru menunjukkan hasil remediasi dokumentasi; PARTIAL/DEFERRED bukan approval. Setiap row menyebut perubahan, bukti baris aktual, hasil pemeriksaan, risiko tersisa dan milestone impact.

| ID | Original severity/category | Status | Perubahan | Bukti aktual | Pemeriksaan | Remaining risks | Milestone impact |
| --- | --- | --- | --- | --- | --- | --- | --- |
| AUD-001 | HIGH/MISSING_ARTIFACT | RESOLVED | Execution plan existing dilengkapi dengan 49 task, DAG, kontrol task, commands, approval, recovery, dan baseline scaffold. | doc/backend/BACKEND_EXECUTION_PLAN.md:L181; doc/backend/BACKEND_EXECUTION_PLAN.md:L189; doc/backend/BACKEND_EXECUTION_PLAN.md:L223; doc/backend/BACKEND_EXECUTION_PLAN.md:L306 | PASS: 49 ID unik, dependensi tersedia, DAG tanpa siklus, kontrol dan acceptance per task. | Plan berisi 1.882 baris sebelum task2; bukan file kosong lagi. Implementasi dan milestone belum DONE. | M0 artifact lengkap; kesiapan M1 dapat dinilai per task. |
| AUD-002 | HIGH/MISSING_ARTIFACT | RESOLVED | OpenAPI backend mandiri dibuat: 24 GET, schema canonical dibundel, admin/auth hanya extension PROPOSED. | doc/backend/openapi.v1.yaml:L2; doc/backend/openapi.v1.yaml:L4294; doc/backend/openapi.v1.yaml:L1856 | PASS: YAML, schema OpenAPI resmi, 249 refs lokal, 24 path, 52 schema dan semantik yang diperiksa. | Validator semantik pihak ketiga penuh NOT RUN; API belum berjalan; snapshot schema harus dijaga dari drift. | M0-04 review; baseline publik M3 tersedia; kontrak admin M5 belum final. |
| AUD-003 | HIGH/CONTRACT_MISMATCH | RESOLVED | Envelope diselaraskan: meta wajib, sourceMode static_snapshot/live_database, 404 NOT_FOUND, contoh success dari dokumen canonical. | doc/backend/BACKEND_BLUEPRINT.md:L763; doc/backend/BACKEND_BLUEPRINT.md:L802; doc/backend/openapi.v1.yaml:L2257; doc/backend/openapi.v1.yaml:L2276 | PASS: 192 contoh respons, dua contoh Blueprint dan fixture metadata negatif. | Header dan rejection runtime belum diuji; error admin tambahan masih proposal. | Baseline envelope M1-03 dan kontrak M3. |
| AUD-004 | HIGH/DOCUMENT_CONFLICT | PARTIAL | Canonical/DTO/Ajv ditetapkan sebagai baseline; contoh Coverage/Performance lama ditandai SUPERSEDED dalam register pusat. | doc/backend/BACKEND_BLUEPRINT.md:L956; doc/backend/BACKEND_BLUEPRINT.md:L1495; doc/backend/BACKEND_BLUEPRINT.md:L1512 | PASS: 25 bundled bindings sama dengan frontend dan register supersession tersedia. | Supporting docs di luar allowlist tidak diedit. Jika dibaca terpisah masih memuat contoh lama; override register harus ikut dibaca. | M0/M2/M3 memakai dokumen utama; revisi supporting mandiri memerlukan task lain. |
| AUD-005 | MEDIUM/DOCUMENT_CONFLICT | RESOLVED | Contoh aktif memakai BALMON_PUBLIC_INFORMATION_SOURCE; global default yang tidak dibaca selector dihapus dari contoh aktif. | doc/backend/BACKEND_BLUEPRINT.md:L1654; doc/backend/BACKEND_BLUEPRINT.md:L1664; doc/backend/BACKEND_BLUEPRINT.md:L965 | PASS: delapan override cocok dengan selector frontend aktual. | Frontend tidak diubah; contoh lama di supporting diberi override historis. | M4-06 memakai konfigurasi yang benar. |
| AUD-006 | MEDIUM/SECURITY | PARTIAL | Urutan request/response middleware, masking, request ID, preflight, timeout 6 detik dan error adapter ditulis eksplisit. | doc/backend/BACKEND_BLUEPRINT.md:L1158; doc/backend/BACKEND_EXECUTION_PLAN.md:L651; doc/backend/BACKEND_EXECUTION_PLAN.md:L1195 | PASS: dokumen menetapkan stack dan budget 6s < 8s; runtime order/rejection NOT RUN. | Limit, origin, rate, trust proxy dan baseline HTTP masih PROPOSED; memerlukan persetujuan M0-06. | M1-03/M4 HTTP menunggu approval; security dasar mulai M1. |
| AUD-007 | MEDIUM/DATABASE_DESIGN | PARTIAL | DBML memuat 26 named checks, termasuk enam singleton; validasi aggregate dimiliki transaksi Application. | doc/backend/database.dbml:L205; doc/backend/database.dbml:L490; doc/backend/database.dbml:L751; doc/backend/BACKEND_BLUEPRINT.md:L1627 | PASS: struktur 26 checks, enam singleton dan FK targets; parser DBML NOT RUN. | Schema masih PROPOSED, belum disetujui/diterapkan. SUM anak harus diuji sebagai invariant transaksi. | M0-05/M2 menunggu parser dan persetujuan. |
| AUD-008 | MEDIUM/CONTRACT_MISMATCH | PARTIAL | Public-required fields diperketat NOT NULL; tanggal artikel draft tetap nullable dengan publish check; tanggal jabatan/tahun yang tidak diketahui tetap NULL. | doc/backend/database.dbml:L456; doc/backend/database.dbml:L501; doc/backend/database.dbml:L606; doc/backend/BACKEND_BLUEPRINT.md:L1627 | PASS: deklarasi struktural dan schema payload; PostgreSQL/mapper tests NOT RUN. | Public completeness dan model draft tahunan masih proposal; tidak membuat angka/grade pengganti. | M0-05/M2 schema/M3 projection memerlukan persetujuan. |
| AUD-009 | LOW/DATABASE_DESIGN | RESOLVED | Sepuluh deklarasi UNIQUE ganda pada indexes dihapus; constraint inline dan indeks lain dipertahankan. | doc/backend/database.dbml:L57; doc/backend/database.dbml:L592; doc/backend/database.dbml:L785 | PASS: tidak ada duplicate inline/index uniqueness pada 26 tabel. | DDL migration aktual belum dibuat atau diuji parser. | M2 tidak menyalin indeks unik ganda. |
| AUD-010 | MEDIUM/DATABASE_DESIGN | PARTIAL | Seluruh 11 FK diberi delete:restrict/update:restrict, disertai alasan retensi per relasi. | doc/backend/database.dbml:L888; doc/backend/database.dbml:L908; doc/backend/BACKEND_BLUEPRINT.md:L1631 | PASS: 11/11 refs mempunyai dua action dan target kolom yang ada. | Ini rekomendasi konservatif PROPOSED; cleanup eksplisit dan retensinya memerlukan keputusan owner. | M0-05/M2 migration FK menunggu persetujuan. |
| AUD-011 | MEDIUM/DATA_INTEGRITY | PARTIAL | Pinned source hash, insert-only/conflict policy, deterministic import keys dan review alias personel dijelaskan. | doc/backend/BACKEND_BLUEPRINT.md:L1610; doc/backend/database.dbml:L313; doc/backend/BACKEND_EXECUTION_PLAN.md:L900 | PASS: traceability 22 sumber dan aturan identitas; seeding/rerun/CMS-conflict tests NOT RUN. | Manifest dibuat pada M2-05; alias individu dan perubahan snapshot harus ditinjau pemilik data. Nama sama bukan bukti identitas. | M0-02/03 dan M2-05 belum siap seeding. |
| AUD-012 | MEDIUM/SECURITY | PARTIAL | Rekomendasi PostgreSQL session store, CSRF token+Origin, expiry, rotation, revocation dan deny-by-default ditulis tanpa final admin paths. | doc/backend/BACKEND_BLUEPRINT.md:L1186; doc/backend/BACKEND_BLUEPRINT.md:L1188; doc/backend/BACKEND_BLUEPRINT.md:L1190; doc/backend/openapi.v1.yaml:L4294 | PASS: opsi, konsekuensi, approval dan acceptance security tercatat; runtime security NOT RUN. | Library/store schema, topology, cookie origins, role matrix dan API admin belum disetujui. | M0-06/M5-01/02; autentikasi/RBAC harus mendahului CRUD. |
| AUD-013 | MEDIUM/ARCHITECTURE | PARTIAL | Atomic audit, post-commit invalidation, guarded refill, bypass sebelum transaksi dan cancellation recovery ditentukan sebagai proposal. | doc/backend/BACKEND_BLUEPRINT.md:L1356; doc/backend/BACKEND_BLUEPRINT.md:L1360; doc/backend/BACKEND_EXECUTION_PLAN.md:L1283; doc/backend/BACKEND_EXECUTION_PLAN.md:L1582 | PASS: ownership/race/failure acceptance tersedia; concurrency/DB/audit tests NOT RUN. | Jaminan satu proses masih desain; persetujuan, pengukuran dan pengujian race diperlukan; multi-instance belum final. | M4-04 dapat memakai fixture mutasi sebelum CMS; semua CRUD M5 wajib atomic audit sejak awal. |
| AUD-014 | HIGH/PERFORMANCE | DEFERRED | Freshness tetap keputusan terbuka; SSR/hybrid direkomendasikan dengan konsekuensi hosting, SLA, slug baru dan rollback. | doc/backend/BACKEND_BLUEPRINT.md:L1693; doc/backend/BACKEND_BLUEPRINT.md:L2008 | PASS: fakta prerender dipertahankan dan tidak ada frontend edit; runtime freshness NOT RUN. | Owner belum memilih SSR/hybrid/rebuild. Perubahan database tidak menjamin HTML publik otomatis berubah. | M0 final/M4-06/M5-07 tertahan; verifikasi scaffold independen. |
| AUD-015 | MEDIUM/CONTRACT_MISMATCH | PARTIAL | Reports direkomendasikan sebagai data pendukung internal; metadata organisasi disimpan untuk parity, leaders saja pada reader; tanpa endpoint ke-25. | doc/backend/BACKEND_BLUEPRINT.md:L1625; doc/backend/BACKEND_BLUEPRINT.md:L1580 | PASS: reports dan organisasi ada pada traceability; 24 path tetap. | Pilihan ownership/retention/internal CMS masih PROPOSED dan menunggu M0-02. | M2-05 dan composition terkait menunggu approval mapping. |
| AUD-016 | MEDIUM/DATA_INTEGRITY | DEFERRED | Luas, pimpinan, tahun statistik dan functions metrics tidak diubah; opsi provenance/owner review dan gate dicatat. | doc/backend/BACKEND_BLUEPRINT.md:L2004; doc/backend/BACKEND_BLUEPRINT.md:L2005; doc/backend/BACKEND_BLUEPRINT.md:L2006; doc/backend/BACKEND_BLUEPRINT.md:L2007 | PASS: canonical dan empat snapshot tetap sama. | Definisi indikator, identitas/tanggal berlaku, tahun referensi dan ownership metrik belum diputuskan pemilik data. | M0 final, seed/publish domain terkait tertahan; verifikasi scaffold tidak bergantung pada data ini. |
| AUD-017 | LOW/PATH_MISMATCH | RESOLVED | Path aktif pada AGENTS/Blueprint/Plan diperbaiki menjadi doc/backend; path sejarah ditandai unavailable. | AGENTS.md:L159; doc/backend/BACKEND_BLUEPRINT.md:L562; doc/backend/BACKEND_EXECUTION_PLAN.md:L15; doc/backend/BACKEND_BLUEPRINT.md:L967 | PASS: tidak ada docs/backend aktif dalam tiga dokumen utama; tujuh artifact nonempty. | Link lama pada supporting read-only dipertahankan dengan register override. | Navigasi M0–M6 benar; histori tidak dihapus. |
| AUD-018 | INFO/ARCHITECTURE | RESOLVED | Temuan positif arsitektur dipertahankan: 10 modul, empat layer, consumer-owned ports, composition root dan pemilik 26 tabel. | doc/backend/BACKEND_BLUEPRINT.md:L487; doc/backend/BACKEND_BLUEPRINT.md:L510 | PASS: desain/source boundary ditelaah; tidak ada perubahan arsitektur implementasi. | Scaffold tidak membuktikan fungsi atau persetujuan semua keputusan rinci. | M1–M5 tetap modular monolith; tanpa feature crates/generic repository baru. |
| AUD-019 | INFO/DATA_INTEGRITY | RESOLVED | Inventori positif canonical/snapshot diverifikasi ulang; root array/object dan wrapper ekspor historis diperjelas. | doc/backend/BACKEND_BLUEPRINT.md:L1580; doc/backend/BACKEND_BLUEPRINT.md:L1479 | PASS: 22 schema Python, empat snapshot byte/SHA-256 MATCH dan 25 reader. | Ajv NOT RUN; klasifikasi 18+4 tetap PROPOSED, bukan persetujuan migrasi/data resmi. | Inventori M0 terverifikasi; parser seed M2 mengikuti JSON aktual. |
| AUD-020 | INFO/IMPLEMENTATION_GAP | RESOLVED | Baseline SCAFFOLDED_ONLY dicatat eksplisit; komentar/exports/Hello world bukan fitur implemented dan nol test bukan functionality proof. | doc/backend/BACKEND_EXECUTION_PLAN.md:L306; doc/backend/BACKEND_EXECUTION_PLAN.md:L181; doc/backend/BACKEND_EXECUTION_PLAN.md:L596; doc/backend/BACKEND_EXECUTION_PLAN.md:L707 | PASS: inspeksi source dan preservation; Cargo/runtime NOT RUN. | Fondasi M1 belum diimplementasikan; toolchain harus diperiksa pada task terpisah. | M1-01/M1-05 hanya kandidat verification-only setelah otorisasi baru. |
| AUD-021 | HIGH/CONTRACT_MISMATCH | RESOLVED | PerformanceCompositeDTO mewajibkan distribution; unknown year 404, known partial year 503; fixture mismatch tersedia. | doc/backend/openapi.v1.yaml:L3731; doc/backend/openapi.v1.yaml:L4303; doc/backend/BACKEND_BLUEPRINT.md:L975 | PASS: composite cocok dengan tiga target frontend dan delapan fixture schema; dua runtime scenarios NOT RUN. | Frontend wire yang permissive sengaja tidak diubah; backend wajib memenuhi kontrak lebih ketat tanpa data palsu. | M0-04/M3-06 baseline kontrak siap review; implementasi tetap menunggu gates. |

## 5. Architecture, database and security implications

Empat layer, consumer-owned ports, composition root dan ownership tabel dipertahankan. Infrastructure mengimplementasikan port Application/Domain. Tidak menambah generic repository atau feature crate. DBML FK RESTRICT merupakan rekomendasi retensi konservatif, sehingga cleanup memerlukan operasi eksplisit dan approval. SQL/SeaORM belum diterapkan.

Import direkomendasikan memakai source SHA-256 dan mapping version yang dipin, insert-only serta penolakan konflik source/CMS yang terlihat. FAQ positional key hanya sah untuk snapshot yang ditinjau. District key berasal dari hash NFC type/name; person/assignment memakai source pointer dan manifest. Alias satu individu pada beberapa penugasan perlu owner review; nama sama bukan bukti identitas. Manifest nyata dibuat pada task M2-05.

HTTP proposal menjelaskan urutan masking request → server request ID → Trace → masking response → security/error adapter → compression public → timeout 6 detik → body/concurrency limits → scoped router. Preflight berada sebelum auth/CSRF; auth/admin no-store. PostgreSQL session, CSRF token+Origin, role freshness dan permission matrix masih rekomendasi. M1-03 mencakup baseline HTTP sejak awal; M4 melengkapi/regresi dan tidak menunggu CMS untuk test fixture mutasi.

Domain write dan audit direkomendasikan atomik dalam satu transaksi. Cache invalidation sesudah commit. Writer mengaktifkan bypass sebelum transaksi; coordinated read/write guard menangani refill lama dan warm reads. Cancellation/outcome ambigu meninggalkan bypass sampai recovery clear. Kegagalan cache tidak membatalkan durability commit. Ini proposal satu proses, dengan tradeoff latency dan lock ordering yang perlu approval/test; bukan klaim konsistensi multi-replica. Kebijakan HTTP cache juga tidak menyelesaikan prerender HTML freshness.

## 6. Decisions intentionally pending

| Kelompok keputusan | Rekomendasi tertulis | Approval / milestone yang tertahan |
| --- | --- | --- |
| Luas, pimpinan, tahun statistik, functions metrics | Pertahankan snapshot/provenance; pemilik data menentukan definisi/tanggal berlaku; reference_year tetap NULL | OPEN-003/004/005/011; M0 final dan domain seed/publish terkait |
| SSR/hybrid/rebuild | SSR/hybrid untuk konten dinamis; controlled rebuild alternatif dengan SLA, slug discovery dan rollback | OPEN-007; M4-06/M5-07 |
| Topology aktual | Satu backend dan same-origin HTTPS reverse proxy sebagai PROPOSED | OPEN-009; origin/trust chain/cookie facts belum diketahui; M5/M6 |
| Media produksi | Object storage dan safe public asset origin sebagai rekomendasi | OPEN-010; provider/biaya/backup/public URL belum dipilih; M5-06/M6 |
| CMS workflow/Admin API | Draft→Review→Published→Archived dan deny-by-default; revision policy perlu keputusan | OPEN-008/012; M5 belum mempunyai final admin paths |
| DB/import/retention | Checks, FK RESTRICT, pinned import manifest dan public completeness | M0-05 parser/review/approval; M2 belum boleh migration/seed |
| Session/security/cache/audit | PostgreSQL store, synchronizer token, role freshness, atomic audit, guarded cache/bypass | M0-06 dan runtime failure/cancellation tests M4/M5 |
| Supporting historis | Central SUPERSEDED register dalam Blueprint §6.9 | Di luar allowlist, tidak diedit; pembaca standalone tetap harus membawa override |

## 7. Verification execution ledger

| Check/command | Status | Actual result and limit |
| --- | --- | --- |
| rtk --version | BLOCKED | Exit 127: tidak tersedia di WSL; tidak diinstal, shell langsung sebagai fallback |
| CodeGraph MCP context / codegraph status | BLOCKED | MCP 0 nodes/edges/files; CLI exit 127 node tidak ditemukan. Targeted inspection, tanpa mutasi indeks |
| File presence/nonempty | PASS | Lima dokumen/spec utama dan dua laporan; plan sudah ada sebelum task2 |
| Python MarkdownIt, fences, paths, traceability | PASS | Tiga dokumen utama dapat diparse, fences seimbang, path aktif benar dan 22 sumber termapping |
| Python yaml.safe_load + local pointer walk | PASS | 24 GET, 249 refs resolve, 52 schema definitions |
| Official OpenAPI 3.1 structural JSON Schema | PASS | Validator Python jsonschema, nol error; schema resmi dan hash tercantum di bawah |
| Explicit OpenAPI semantic checks Python | PASS | Operation IDs unik, path parameters required/matching, query default valid, status/schema/examples dan 24 path parity |
| Canonical/schema compatibility Python | PASS | 22/22 file Draft202012+FormatChecker; 25 bundled bindings identik; empat snapshot MATCH; 25 reader |
| Response/error/negative fixtures | PASS | 192 validasi contoh respons + dua contoh Blueprint; delapan schema fixtures; composite cocok dengan frontend wire/metrics/distribution |
| Task controls and dependency DAG | PASS | 49 ID unik, dependensi valid, tanpa siklus; kontrol dan acceptance per task |
| DBML structural/source inspection | PASS | 26 tabel, 11 refs, lima enum, 26 checks, enam singleton, nol unique ganda; bukan parser syntax proof |
| git diff --check -- AGENTS.md doc/backend | FAIL | Default Git WSL menandai CRLF existing sebagai trailing whitespace; kegagalan dicatat |
| git -c core.whitespace=blank-at-eol,blank-at-eof,space-before-tab,cr-at-eol diff --check -- AGENTS.md doc/backend | PASS | Pemeriksaan CRLF-aware mempertahankan whitespace checks biasa; tidak mengubah config Git atau line endings existing |
| Task2 diff review, protected hashes, Git status | PASS | Tujuh file diizinkan berubah; 477 hash file terlindungi tetap; perubahan existing dipertahankan |
| DBML parser | NOT RUN | dbml2sql, @dbml/core, pydbml tidak terpasang di lingkungan WSL; tidak mengklaim syntax valid |
| Full third-party OpenAPI semantic validator | NOT RUN | openapi-spec-validator/swagger-parser/redocly tidak tersedia; pemeriksaan resmi struktural dan semantik terbatas bukan pengganti klaim full validator |
| Node/Ajv/provider/TypeScript/Vitest/build/browser | NOT RUN | Node tidak tersedia di PATH WSL. Python PASS bukan Ajv PASS; Windows toolchain tidak dinilai |
| Cargo fmt/check/clippy/test/audit/deny | NOT RUN | Task dokumentasi; tidak ada Rust implementation atau compilation claim |
| PostgreSQL/migration/seed/API/security/load/staging | NOT RUN | Di luar scope; dua runtime fixture scenarios masih spesifikasi |

Schema resmi yang diambil read-only dan divalidasi: [OpenAPI 3.1 schema 2025-09-15](https://spec.openapis.org/oas/3.1/schema/2025-09-15). SHA-256: `d0a3955182364c7b5fdebfd0583ecad259a870b4a2fe86a1b0fe8785f8224fed`. Nol error adalah hasil struktural terhadap schema tersebut, ditambah semantik eksplisit yang disebut di ledger; bukan bukti backend berfungsi. Kegagalan WSL tidak dianggap kegagalan Windows.

## 8. M0 readiness and safe next action

**BLOCKED_M0 untuk sign-off penuh.** Missing artifact, metadata envelope dan Performance specification blockers telah ditangani. Parser DBML, review/approval serta keputusan owner tetap diperlukan. PASS schema OpenAPI tidak menyetujui arsitektur atau membuktikan endpoint bekerja.

Task baru dapat mengotorisasi **M1-01 verifikasi scaffold existing**, lalu **M1-05 verifikasi module boundaries existing**, sesuai Execution Plan §2.6. Cakupannya tanpa re-init, edit source, instalasi/update dependency, perubahan lock, pembacaan .env, koneksi DB/service atau perubahan frontend. Gunakan toolchain existing dan checks `--locked --offline`. Jika butuh perbaikan source/lock/dependency, laporkan FAIL/BLOCKED dan siapkan scope perbaikan terpisah. M1-02/03/04 serta implementasi fondasi tetap menunggu M0-07 dan gate yang relevan.

Langkah berikutnya: review opsi PROPOSED yang konkret dan keputusan data/render/topology/media/workflow, jalankan parser DBML serta validator OAS semantik penuh pada lingkungan yang sudah mempunyai alatnya, lalu audit ulang gate. Deliverable remediasi dokumen selesai dengan batas verifikasi yang dinyatakan; milestone M0 belum selesai dan production readiness tidak diklaim.

## 9. Reproduction recipes and evidence boundaries

Checks dijalankan inline memakai paket yaml/jsonschema/markdown-it yang sudah tersedia, tanpa membuat script tambahan di repo atau mengeksekusi application code. Primary references untuk penulisan spesifikasi: [DBML checks/FK syntax](https://dbml.dbdiagram.io/docs/), [Tower ServiceBuilder order](https://docs.rs/tower/0.5.3/tower/struct.ServiceBuilder.html#order), [OWASP CSRF](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html). Referensi ini tidak menggantikan parser/runtime verification.

### Contract/schema/data checks

```python
from pathlib import Path
from copy import deepcopy
import yaml,json,re,jsonschema
spec=yaml.safe_load(Path('doc/backend/openapi.v1.yaml').read_text())
old=yaml.safe_load(Path('frontend/docs/api/openapi.yaml').read_text())
refs=[]
def pointer(ref):
 assert ref.startswith('#/'),ref
 x=spec
 for key in ref[2:].split('/'):x=x[key.replace('~1','/').replace('~0','~')]
 return x
def resolve(o):
 if isinstance(o,dict):
  if '$ref'in o:return resolve(pointer(o['$ref']))
  return {k:resolve(v) for k,v in o.items()}
 if isinstance(o,list):return [resolve(v) for v in o]
 return o
def walk(o):
 if isinstance(o,dict):
  if '$ref'in o:refs.append(o['$ref']);pointer(o['$ref'])
  for v in o.values():walk(v)
 elif isinstance(o,list):
  for v in o:walk(v)
walk(spec)
assert len(spec['paths'])==24 and set(spec['paths'])==set(old['paths'])
assert all(set(o)=={'get'} for o in spec['paths'].values())
ops=[x['get']['operationId'] for x in spec['paths'].values()]
assert len(set(ops))==24
for path,op in spec['paths'].items():
 required=set(re.findall(r'\{([^}]+)\}',path))
 declared={p['name'] for p in op['get'].get('parameters',[]) if p['in']=='path' and p.get('required')}
 assert required==declared
 for param in op['get'].get('parameters',[]):
  if 'default'in param['schema']:jsonschema.validate(param['schema']['default'],param['schema'])
 for code,res in op['get']['responses'].items():
  assert re.fullmatch('[1-5][0-9][0-9]',code)
  r=resolve(res);sch=r['content']['application/json']['schema']
  jsonschema.Draft202012Validator.check_schema(sch)
  jsonschema.Draft202012Validator(sch,format_checker=jsonschema.FormatChecker()).validate(r['content']['application/json']['example'])
for name,sch in spec['components']['schemas'].items():
 jsonschema.Draft202012Validator.check_schema(resolve(sch))
bindings=0
for name,sch in spec['components']['schemas'].items():
 if 'x-frontend-schema' not in sch:continue
 path,fragment=sch['x-frontend-schema'].split('#');target=json.loads(Path(path).read_text())
 for bit in fragment.lstrip('/').split('/') if fragment else []:target=target[bit]
 target=deepcopy(target);target.pop('$schema',None);target.pop('$id',None)
 mine=deepcopy(sch);mine.pop('x-frontend-schema')
 assert mine==target,name
 bindings+=1
mapping=json.loads(Path('frontend/src/lib/contracts/static-contracts.json').read_text())
assert len(mapping)==22
for filename,(domain,key) in mapping.items():
 sch=json.loads((Path('frontend/src/lib/contracts/schemas')/(domain+'.schema.json')).read_text())
 sch=sch['properties'][key] if key else sch
 jsonschema.Draft202012Validator(sch,format_checker=jsonschema.FormatChecker()).validate(json.loads((Path('frontend/src/lib/data')/filename).read_text()))
for fn in ['profile','functions','legal-bases','homepage']:
 canonical=Path('frontend/src/lib/data')/('site_content' if fn=='homepage' else 'institution')/(fn+'.json')
 assert canonical.read_bytes()==(Path('backend/resources/static')/(fn+'.json')).read_bytes()
perf=spec['paths']['/performance']['get']['responses']['200']['content']['application/json']['example']
fixture_count=0
for f in spec['x-contract-fixtures']:
 if 'expectedValid' not in f:continue
 obj=deepcopy(perf if f['base'] in ['PERF-OK','GET /performance 200 example'] else spec['components']['responses']['NOT_FOUND']['content']['application/json']['example'])
 mutation=f.get('mutation')
 if mutation:
  path=mutation.get('remove',mutation.get('replace'));objparent=obj;parts=path.strip('/').split('/')
  for bit in parts[:-1]:objparent=objparent[bit]
  if 'remove'in mutation:del objparent[parts[-1]]
  else:objparent[parts[-1]]=mutation['value']
 sch=resolve(pointer(f.get('schema','#/components/schemas/PerformanceCompositeDTOResponse')))
 valid=not list(jsonschema.Draft202012Validator(sch,format_checker=jsonschema.FormatChecker()).iter_errors(obj))
 assert valid==f['expectedValid'],f['id']
 fixture_count+=1
fs=json.loads(Path('frontend/src/lib/contracts/schemas/performance.schema.json').read_text())
jsonschema.validate(perf['data'],fs['$defs']['response'])
jsonschema.validate({k:v for k,v in perf['data'].items() if k!='distribution'},fs['properties']['metrics'])
jsonschema.validate(perf['data']['distribution'],fs['properties']['distribution'])
blue=Path('doc/backend/BACKEND_BLUEPRINT.md').read_text()
examples=[json.loads(x) for x in re.findall(r'\x60\x60\x60json\n(.*?)\n\x60\x60\x60',blue,re.S)]
assert len(examples)==2
for e in examples:
 if e['success']:
  sch=resolve(spec['components']['schemas']['PublicDocumentDTOResponse'])
 else:sch=resolve(spec['components']['schemas']['ErrorResponse'])
 jsonschema.Draft202012Validator(sch,format_checker=jsonschema.FormatChecker()).validate(e)
assert len(re.findall(r'\bget\w+\(',Path('frontend/src/lib/repositories/interfaces/index.ts').read_text()))==25
print('PASS OpenAPI:24 GET parity; refs',len(refs),';52 schemas;192 success/error example validations;25 exact canonical bindings')
print('PASS22 canonical JSON;4 snapshots;25 readers;Performance target compatibility;schema fixtures',fixture_count,';Blueprint2 examples')

```

### Document/DAG/DBML structural checks

```python
from pathlib import Path
import re,json
from markdown_it import MarkdownIt
plan=Path('doc/backend/BACKEND_EXECUTION_PLAN.md').read_text()
tasks=re.findall(r'^### (M[0-6]-\d{2}) —',plan,re.M)
assert len(tasks)==49 and len(set(tasks))==49
edges={}
for ident,block in re.findall(r'^### (M[0-6]-\d{2}) — (.*?)(?=^### M[0-6]-|\Z)',plan,re.M|re.S):
 dep=re.search(r'^\*\*Dependencies:\*\* (.+)',block,re.M).group(1)
 edges[ident]=re.findall(r'M[0-6]-\d{2}',dep)
 for label in ['Objective','Status','Deliverables','Verification commands','Approval gate','Rollback / failure']:assert f'**{label}:**' in block,(ident,label)
 assert '**Acceptance' in block or '**M' in block,ident
visiting=set();done=set()
def visit(n):
 assert n in edges,n
 assert n not in visiting,n
 if n in done:return
 visiting.add(n)
 for d in edges[n]:visit(d)
 visiting.remove(n);done.add(n)
for n in tasks:visit(n)
db=Path('doc/backend/database.dbml').read_text()
tables=re.findall(r'^Table (\w+) \{(.*?)(?=^Table |^// TABEL|\Z)',db,re.M|re.S)
assert len(tables)==26
checks=len(re.findall(r"\[name: 'chk_",db))
refs=re.findall(r'^Ref: (\w+)\.(\w+) > (\w+)\.(\w+) \[delete: (.+), update: (.+)\]$',db,re.M)
assert len(refs)==11
columns={name:set(re.findall(r'^  (\w+) [a-z][^\n]*',block,re.M))-{'checks','indexes'} for name,block in tables}
for child,col,parent,key,delete,update in refs:
 assert col in columns[child] and key in columns[parent],(child,col,parent,key)
 assert delete=='restrict' and update=='restrict'
singletons=0
for name,block in tables:
 if 'id smallint' in block:
  assert '\x60id = 1\x60' in block,name
  singletons+=1
 inline=set(re.findall(r'^  (\w+) [^\n]*\[unique',block,re.M))
 idx=set(re.findall(r'^    (\w+) \[unique\]',block,re.M))
 assert not inline.intersection(idx),(name,inline&idx)
assert singletons==6
for filename in ['AGENTS.md','doc/backend/BACKEND_BLUEPRINT.md','doc/backend/BACKEND_EXECUTION_PLAN.md']:
 text=Path(filename).read_text()
 assert text.strip()
 MarkdownIt().parse(text)
 assert 'docs/backend/' not in text,filename
 assert len(re.findall(r'^\x60\x60\x60',text,re.M))%2==0,filename
mapping=json.loads(Path('frontend/src/lib/contracts/static-contracts.json').read_text())
blue=Path('doc/backend/BACKEND_BLUEPRINT.md').read_text()
for filename in mapping:assert f'\x60{filename}\x60' in blue,filename
print('PASS49task controls;DAG acyclic;DBML structural only26table/11FK/6singleton/checks'+str(checks)+'/duplicateUnique0')
print('PASS Markdown parse/fences/paths;traceability22;DBML parser validation NOT RUN (not installed)')

```

