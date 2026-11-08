import Deck from './deck/Deck';
import {
  Slide01Opening,
  Slide02Automation,
  Slide03Website,
  Slide04FrontendArch,
  Slide05BackendArch,
  Slide06Security,
  Slide07Achievements,
  Slide08Closing,
} from './slides';

export default function App() {
  return (
    <Deck>
      {/* ══════════════════════════════════════════════════════════════════
          SLIDE 1 — PEMBUKA
          File: src/slides/Slide01Opening.tsx
          ══════════════════════════════════════════════════════════════════ */}
      <Slide01Opening
        nav="Pembuka"
        notes="Selamat pagi/siang Bapak/Ibu pimpinan Balmon Pekanbaru. Hari ini saya memaparkan Laporan Kinerja Pengembangan Teknologi Informasi pada Balai Monitor Spektrum Frekuensi Radio Kelas I Pekanbaru. Presentasi ini mencakup otomasi pemantauan radio dengan Python dan FLRig, pengembangan portal web resmi Balmon Pekanbaru berbasis SvelteKit, arsitektur frontend dan komparasi backend, serta penegakan fondasi keamanan data."
      />

      {/* ══════════════════════════════════════════════════════════════════
          SLIDE 2 — PYTHON AUTOMATION
          File: src/slides/Slide02Automation.tsx
          ══════════════════════════════════════════════════════════════════ */}
      <Slide02Automation
        nav="Otomasi Radio"
        notes="Pada pilar pertama, kami mengimplementasikan skrip otomasi Python monotoring.py yang terhubung ke radio komunikasi via FLRig XML-RPC di port 12345. Sistem ini secara otomatis memindahkan frekuensi VFO-A dan mode radio AM untuk 62 entri stasiun gelombang pendek. Durasi dengar diatur 3 detik per frekuensi, di mana operator memverifikasi apakah siaran terdengar. Hasil dicatat secara otomatis ke file CSV dengan 11 kolom data standar."
      />

      {/* ══════════════════════════════════════════════════════════════════
          SLIDE 3 — WEBSITE DEVELOPMENT
          File: src/slides/Slide03Website.tsx
          ══════════════════════════════════════════════════════════════════ */}
      <Slide03Website
        nav="Portal Website"
        notes="Pilar kedua adalah portal resmi Balmon Pekanbaru yang dapat diakses langsung pada demo Vercel. Menggunakan arsitektur SvelteKit 2 dan Svelte 5 Runes dengan Tailwind CSS v4. Tampilan desktop dan mobile yang Anda lihat adalah hasil tangkapan layar langsung dari website yang berfungsi. Fitur kunci meliputi arsitektur Repository Provider Pattern yang memisahkan tampilan dari data, mengelola 22 berkas canonical JSON dalam 8 domain, serta siap beralih ke REST API tanpa mengubah kode antarmuka."
      />

      {/* ══════════════════════════════════════════════════════════════════
          SLIDE 4 — FRONTEND ARCHITECTURE & TECHNOLOGY STACK
          File: src/slides/Slide04FrontendArch.tsx
          ══════════════════════════════════════════════════════════════════ */}
      <Slide04FrontendArch
        nav="Arsitektur Frontend"
        notes="Frontend website Balmon menggunakan SvelteKit dan Svelte 5 untuk menyusun tampilan yang modern, responsif, dan modular. Salah satu keunggulan arsitekturnya adalah Repository Provider Pattern, yang memungkinkan sumber data berpindah dari JSON lokal ke REST API tanpa mengubah keseluruhan tampilan website. TypeScript dan Ajv digunakan untuk membantu menjaga konsistensi data."
      />

      {/* ══════════════════════════════════════════════════════════════════
          SLIDE 5 — BACKEND ARCHITECTURE & TECHNOLOGY COMPARISON
          File: src/slides/Slide05BackendArch.tsx
          ══════════════════════════════════════════════════════════════════ */}
      <Slide05BackendArch
        nav="Arsitektur Backend"
        notes="Pada tahap perencanaan backend, saya mengkaji dua pendekatan teknologi, yaitu Rust dengan framework Axum dan Python dengan framework FastAPI. Keduanya dapat dirancang menggunakan pola arsitektur modular monolith dan empat lapisan Clean Architecture. Tujuannya agar perbandingan dilakukan secara adil, dengan arsitektur dan kebutuhan API yang sama. Rust dipertimbangkan untuk kontrol resource dan keamanan memori, sedangkan FastAPI dipertimbangkan karena kecepatan pengembangan dan ekosistem Python. Keputusan akhir tetap perlu mempertimbangkan hasil implementasi dan pengujian yang sebenarnya."
      />

      {/* ══════════════════════════════════════════════════════════════════
          SLIDE 6 — SECURITY & SYSTEM QUALITY
          File: src/slides/Slide06Security.tsx
          ══════════════════════════════════════════════════════════════════ */}
      <Slide06Security
        nav="Keamanan Sistem"
        notes="Pada aspek keamanan sistem, kami menerapkan prinsip Defense-in-Depth dan transparansi teknis. Kami membedakan secara tegas apa yang telah terverifikasi dan apa yang menjadi rancangan arsitektur. Yang telah terverifikasi adalah validasi skema Ajv 2020 pada seluruh 22 file JSON canonical, pengujian kontrak data OpenAPI v1 dengan 24 endpoints, serta isolasi ketat terhadap berkas environment rahasia. Sedangkan arsitektur CORS origin-locked, RBAC, dan rate limiting telah siap diimplementasikan sesuai blueprint teknis."
      />

      {/* ══════════════════════════════════════════════════════════════════
          SLIDE 7 — CAPAIAN & ROADMAP
          File: src/slides/Slide07Achievements.tsx
          ══════════════════════════════════════════════════════════════════ */}
      <Slide07Achievements
        nav="Capaian & Roadmap"
        notes="Slide ini merangkum capaian riil yang terukur: 62 stasiun monitoring gelombang pendek dalam otomasi Python, 22 dataset canonical yang menopang 11 rute portal web di Vercel, dan 24 endpoint API yang telah terspesifikasi. Arah pengembangan selanjutnya terbagi menjadi tiga fase: dari fondasi yang telah selesai, menuju otomasi deteksi audio penuh dan backend database, hingga integrasi pemantauan spektrum real-time dan CMS pimpinan."
      />

      {/* ══════════════════════════════════════════════════════════════════
          SLIDE 8 — PENUTUP
          File: src/slides/Slide08Closing.tsx
          ══════════════════════════════════════════════════════════════════ */}
      <Slide08Closing
        nav="Penutup"
        notes="Sebagai penutup, seluruh pengembangan ini bukan hanya tentang menulis baris kode, tetapi membangun fondasi transformasi digital yang berkelanjutan bagi Balmon Pekanbaru. Otomasi monitoring mempercepat proses pengawasan frekuensi, portal web meningkatkan keterbukaan informasi publik, dan fondasi keamanan melindungi integritas data institusi. Kami mengucapkan terima kasih atas perhatian Bapak/Ibu pimpinan dan membuka sesi diskusi."
      />
    </Deck>
  );
}
