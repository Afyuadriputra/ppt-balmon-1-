import Deck from './deck/Deck';
import Slide from './deck/Slide';
import Reveal from './deck/Reveal';
import RadioWaveform from './components/RadioWaveform';
import SpectrumWorkbench from './components/SpectrumWorkbench';
import PythonShowcase from './components/PythonShowcase';
import ResponsiveProductShowcase from './components/ResponsiveProductShowcase';
import BackendComparison from './components/BackendComparison';
import EditorialImpact from './components/EditorialImpact';
import {
  IconRadio,
  IconTower,
  IconLayers,
  IconGlobe,
  IconMail,
  IconPin,
} from './components/Icons';

export default function App() {
  return (
    <Deck>
      {/* ══════════════════════════════════════════════════════════════════
          SLIDE 1 — PEMBUKA
          Gambar Full PPT: slide 1.png (Seamless Edge Background)
          ══════════════════════════════════════════════════════════════════ */}
      <Slide
        full
        nav="Pembuka"
        notes="Selamat pagi/siang Bapak/Ibu pimpinan Balmon Pekanbaru. Hari ini saya memaparkan Laporan Kinerja Pengembangan Teknologi Informasi pada Balai Monitor Spektrum Frekuensi Radio Kelas I Pekanbaru. Presentasi ini mencakup otomasi pemantauan radio dengan Python dan FLRig, pengembangan portal web resmi Balmon Pekanbaru berbasis SvelteKit, arsitektur frontend dan komparasi backend, serta penegakan fondasi keamanan data."
        style={{
          background: 'linear-gradient(180deg, #082740 0%, #061f3a 100%)',
          boxShadow: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            background: 'linear-gradient(180deg, #082740 0%, #061f3a 100%)',
          }}
        >
          {/* Ambient edge-blur to make slide look completely full and seamless */}
          <img
            src="/assets/balmon/slides/slide-1.png"
            alt=""
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: -12,
              width: 'calc(100% + 24px)',
              height: 'calc(100% + 24px)',
              objectFit: 'cover',
              filter: 'blur(20px)',
              opacity: 0.9,
              transform: 'scale(1.05)',
              pointerEvents: 'none',
            }}
          />
          {/* Main crisp slide image */}
          <img
            src="/assets/balmon/slides/slide-1.png"
            alt="Slide 1 — Pembuka: Transformasi Digital & Otomasi Spektrum Frekuensi Radio"
            style={{
              position: 'relative',
              zIndex: 2,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'center',
              display: 'block',
            }}
          />
        </div>
      </Slide>

      {/* ══════════════════════════════════════════════════════════════════
          SLIDE 2 — PYTHON AUTOMATION
          Otomasi Monitoring Frekuensi Radio (monotoring.py)
          ══════════════════════════════════════════════════════════════════ */}
      <Slide
        full
        nav="Otomasi Radio"
        notes="Pada pilar pertama, kami mengimplementasikan skrip otomasi Python monotoring.py yang terhubung ke radio komunikasi via FLRig XML-RPC di port 12345. Sistem ini secara otomatis memindahkan frekuensi VFO-A dan mode radio AM untuk 62 entri stasiun gelombang pendek. Durasi dengar diatur 3 detik per frekuensi, di mana operator memverifikasi apakah siaran terdengar. Hasil dicatat secara otomatis ke file CSV dengan 11 kolom data standar."
      >
        <div
          style={{
            padding: 'var(--gutter-y) var(--gutter)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 2,
          }}
        >
          {/* Section Header */}
          <div style={{ marginBottom: 14 }}>
            <Reveal>
              <div
                className="kicker"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  color: 'var(--primary)',
                }}
              >
                <IconRadio style={{ width: 14, height: 14 }} />
                PILAR 1 · OTOMASI MONITORING SPEKTRUM RADIO
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                className="headline"
                style={{ fontSize: 'clamp(24px, 3.6vw, 44px)', margin: '4px 0 6px' }}
              >
                Pemindaian Frekuensi <span className="accent-text">Semi-Otomatis</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="lead" style={{ fontSize: 'clamp(13px, 1.3vw, 16px)', color: 'var(--fg-muted)', margin: 0 }}>
                Pengendalian transceiver melalui protokol FLRig XML-RPC untuk 62 stasiun siaran dengan verifikasi operator.
              </p>
            </Reveal>
          </div>

          {/* Split Content: Spectrum Workbench (Left) & Code/Pseudocode (Right) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
              gap: 20,
              alignItems: 'start',
            }}
          >
            {/* Left: Interactive Spectrum Workbench */}
            <SpectrumWorkbench />

            {/* Right: Actual Python Source Snippet & Pseudocode */}
            <PythonShowcase />
          </div>
        </div>
      </Slide>

      {/* ══════════════════════════════════════════════════════════════════
          SLIDE 3 — WEBSITE DEVELOPMENT
          Pengembangan Portal Website Balmon Pekanbaru (Live Screenshots)
          ══════════════════════════════════════════════════════════════════ */}
      <Slide
        full
        nav="Portal Website"
        notes="Pilar kedua adalah portal resmi Balmon Pekanbaru yang dapat diakses langsung pada demo Vercel. Menggunakan arsitektur SvelteKit 2 dan Svelte 5 Runes dengan Tailwind CSS v4. Tampilan desktop dan mobile yang Anda lihat adalah hasil tangkapan layar langsung dari website yang berfungsi. Fitur kunci meliputi arsitektur Repository Provider Pattern yang memisahkan tampilan dari data, mengelola 22 berkas canonical JSON dalam 8 domain, serta siap beralih ke REST API tanpa mengubah kode antarmuka."
      >
        <div
          style={{
            padding: 'var(--gutter-y) var(--gutter)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 2,
          }}
        >
          {/* Section Header */}
          <div style={{ marginBottom: 12 }}>
            <Reveal>
              <div
                className="kicker"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  color: 'var(--primary)',
                }}
              >
                <IconTower style={{ width: 14, height: 14 }} />
                PILAR 2 · PENGEMBANGAN WEBSITE PUBLIK
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                className="headline"
                style={{ fontSize: 'clamp(24px, 3.6vw, 44px)', margin: '4px 0 6px' }}
              >
                Portal Web Resmi <span className="accent-text">Balmon Pekanbaru</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="lead" style={{ fontSize: 'clamp(13px, 1.3vw, 16px)', color: 'var(--fg-muted)', margin: 0 }}>
                Tangkapan layar asli dari aplikasi web langsung (Vercel) pada viewport Desktop (1440×900) dan Mobile (390×844).
              </p>
            </Reveal>
          </div>

          {/* Interactive Responsive Product Showcase */}
          <ResponsiveProductShowcase />
        </div>
      </Slide>

      {/* ══════════════════════════════════════════════════════════════════
          SLIDE 4 — FRONTEND ARCHITECTURE & TECHNOLOGY STACK
          Gambar Full PPT: slide 4.png (Seamless Edge Background)
          ══════════════════════════════════════════════════════════════════ */}
      <Slide
        full
        nav="Arsitektur Frontend"
        notes="Frontend website Balmon menggunakan SvelteKit dan Svelte 5 untuk menyusun tampilan yang modern, responsif, dan modular. Salah satu keunggulan arsitekturnya adalah Repository Provider Pattern, yang memungkinkan sumber data berpindah dari JSON lokal ke REST API tanpa mengubah keseluruhan tampilan website. TypeScript dan Ajv digunakan untuk membantu menjaga konsistensi data."
        style={{
          background: 'linear-gradient(180deg, #132947 0%, #0c213f 100%)',
          boxShadow: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            background: 'linear-gradient(180deg, #132947 0%, #0c213f 100%)',
          }}
        >
          {/* Ambient edge-blur to make slide look completely full and seamless */}
          <img
            src="/assets/balmon/slides/slide-4.png"
            alt=""
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: -12,
              width: 'calc(100% + 24px)',
              height: 'calc(100% + 24px)',
              objectFit: 'cover',
              filter: 'blur(20px)',
              opacity: 0.9,
              transform: 'scale(1.05)',
              pointerEvents: 'none',
            }}
          />
          {/* Main crisp slide image */}
          <img
            src="/assets/balmon/slides/slide-4.png"
            alt="Slide 4 — Arsitektur Frontend Website Balmon"
            style={{
              position: 'relative',
              zIndex: 2,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'center',
              display: 'block',
            }}
          />
        </div>
      </Slide>

      {/* ══════════════════════════════════════════════════════════════════
          SLIDE 5 — BACKEND ARCHITECTURE & TECHNOLOGY COMPARISON
          Perencanaan Arsitektur Backend (Rust Axum vs Python FastAPI)
          ══════════════════════════════════════════════════════════════════ */}
      <Slide
        full
        nav="Arsitektur Backend"
        notes="Pada tahap perencanaan backend, saya mengkaji dua pendekatan teknologi, yaitu Rust dengan framework Axum dan Python dengan framework FastAPI. Keduanya dapat dirancang menggunakan pola arsitektur modular monolith dan empat lapisan Clean Architecture. Tujuannya agar perbandingan dilakukan secara adil, dengan arsitektur dan kebutuhan API yang sama. Rust dipertimbangkan untuk kontrol resource dan keamanan memori, sedangkan FastAPI dipertimbangkan karena kecepatan pengembangan dan ekosistem Python. Keputusan akhir tetap perlu mempertimbangkan hasil implementasi dan pengujian yang sebenarnya."
      >
        <div
          style={{
            padding: 'var(--gutter-y) var(--gutter)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 2,
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: 14 }}>
            <Reveal>
              <div
                className="kicker"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  color: 'var(--primary)',
                }}
              >
                <IconLayers style={{ width: 14, height: 14 }} />
                PERENCANAAN SISTEM · RANCANGAN BACKEND
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                className="headline"
                style={{ fontSize: 'clamp(24px, 3.6vw, 44px)', margin: '4px 0 6px' }}
              >
                Perencanaan <span className="accent-text">Arsitektur Backend</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="lead" style={{ fontSize: 'clamp(13px, 1.3vw, 16px)', color: 'var(--fg-muted)', margin: 0 }}>
                Dua alternatif teknologi, satu pendekatan arsitektur (Modular Monolith & Clean Architecture).
              </p>
            </Reveal>
          </div>

          {/* Comparative Backend Architecture Showcase */}
          <BackendComparison />
        </div>
      </Slide>

      {/* ══════════════════════════════════════════════════════════════════
          SLIDE 6 — SECURITY & SYSTEM QUALITY
          Gambar Full PPT: slide 6.png (Seamless Edge Background)
          ══════════════════════════════════════════════════════════════════ */}
      <Slide
        full
        nav="Keamanan Sistem"
        notes="Pada aspek keamanan sistem, kami menerapkan prinsip Defense-in-Depth dan transparansi teknis. Kami membedakan secara tegas apa yang telah terverifikasi dan apa yang menjadi rancangan arsitektur. Yang telah terverifikasi adalah validasi skema Ajv 2020 pada seluruh 22 file JSON canonical, pengujian kontrak data OpenAPI v1 dengan 24 endpoints, serta isolasi ketat terhadap berkas environment rahasia. Sedangkan arsitektur CORS origin-locked, RBAC, dan rate limiting telah siap diimplementasikan sesuai blueprint teknis."
        style={{
          background: 'linear-gradient(180deg, #122942 0%, #29608f 45%, #64abe5 100%)',
          boxShadow: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            background: 'linear-gradient(180deg, #122942 0%, #29608f 45%, #64abe5 100%)',
          }}
        >
          {/* Ambient edge-blur to make slide look completely full and seamless */}
          <img
            src="/assets/balmon/slides/slide-6.png"
            alt=""
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: -12,
              width: 'calc(100% + 24px)',
              height: 'calc(100% + 24px)',
              objectFit: 'cover',
              filter: 'blur(20px)',
              opacity: 0.9,
              transform: 'scale(1.05)',
              pointerEvents: 'none',
            }}
          />
          {/* Main crisp slide image */}
          <img
            src="/assets/balmon/slides/slide-6.png"
            alt="Slide 6 — Integritas Data & Keamanan Sistem"
            style={{
              position: 'relative',
              zIndex: 2,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'center',
              display: 'block',
            }}
          />
        </div>
      </Slide>

      {/* ══════════════════════════════════════════════════════════════════
          SLIDE 7 — CAPAIAN & DAMPAK
          Capaian Pengembangan dan Arah Lanjutan (Centered per Hard Rule 3)
          ══════════════════════════════════════════════════════════════════ */}
      <Slide
        center
        nav="Capaian & Roadmap"
        notes="Slide ini merangkum capaian riil yang terukur: 62 stasiun monitoring gelombang pendek dalam otomasi Python, 22 dataset canonical yang menopang 11 rute portal web di Vercel, dan 24 endpoint API yang telah terspesifikasi. Arah pengembangan selanjutnya terbagi menjadi tiga fase: dari fondasi yang telah selesai, menuju otomasi deteksi audio penuh dan backend database, hingga integrasi pemantauan spektrum real-time dan CMS pimpinan."
      >
        <div style={{ maxWidth: 1080, marginInline: 'auto', width: '100%' }}>
          {/* Header */}
          <Reveal>
            <div className="kicker" style={{ textAlign: 'center', marginBottom: 6, color: 'var(--primary)' }}>
              EVALUASI KINERJA & RENCANA STRATEGIS
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              className="headline"
              style={{
                textAlign: 'center',
                marginInline: 'auto',
                fontSize: 'clamp(26px, 4vw, 46px)',
                marginBottom: 6,
              }}
            >
              Capaian Terukur & <span className="accent-text">Arah Lanjutan</span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p
              className="lead"
              style={{
                textAlign: 'center',
                marginInline: 'auto',
                fontSize: 'clamp(13px, 1.4vw, 17px)',
                color: 'var(--fg-muted)',
                marginBottom: 20,
                maxWidth: 720,
              }}
            >
              Metrik hasil implementasi nyata yang dapat diverifikasi dari source code, dataset, dan blueprint arsitektur.
            </p>
          </Reveal>

          {/* Editorial Impact Report */}
          <EditorialImpact />
        </div>
      </Slide>

      {/* ══════════════════════════════════════════════════════════════════
          SLIDE 8 — PENUTUP
          Teknologi untuk Mendukung Kinerja dan Pelayanan
          ══════════════════════════════════════════════════════════════════ */}
      <Slide
        center
        full
        nav="Penutup"
        notes="Sebagai penutup, seluruh pengembangan ini bukan hanya tentang menulis baris kode, tetapi membangun fondasi transformasi digital yang berkelanjutan bagi Balmon Pekanbaru. Otomasi monitoring mempercepat proses pengawasan frekuensi, portal web meningkatkan keterbukaan informasi publik, dan fondasi keamanan melindungi integritas data institusi. Kami mengucapkan terima kasih atas perhatian Bapak/Ibu pimpinan dan membuka sesi diskusi."
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/assets/balmon/backgrounds/radio-monitoring.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.28,
          }}
          aria-hidden="true"
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at center, rgba(8, 24, 39, 0.72) 0%, rgba(8, 24, 39, 0.96) 100%)',
          }}
          aria-hidden="true"
        />

        <div
          className="container"
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 14,
          }}
        >
          {/* Institutional Header Logo */}
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 2 }}>
              <img
                src="/assets/balmon/logo-komdigi.svg"
                alt="Logo Kementerian Komunikasi dan Digital RI"
                style={{ height: 38, width: 'auto' }}
              />
            </div>
          </Reveal>

          {/* Kicker */}
          <Reveal delay={0.06}>
            <div
              className="kicker"
              style={{
                letterSpacing: '0.14em',
                color: 'var(--primary)',
              }}
            >
              TRANSFORMASI DIGITAL BERKELANJUTAN
            </div>
          </Reveal>

          {/* Headline */}
          <Reveal delay={0.12}>
            <h2
              className="headline"
              style={{
                fontSize: 'clamp(26px, 3.8vw, 48px)',
                fontWeight: 700,
                maxWidth: 920,
                margin: 0,
              }}
            >
              Teknologi untuk Mendukung <span className="accent-text">Kinerja & Pelayanan</span>
            </h2>
          </Reveal>

          {/* Closing Statement Box */}
          <Reveal delay={0.18}>
            <div
              style={{
                maxWidth: 820,
                background: 'rgba(8, 24, 39, 0.7)',
                border: '1px solid rgba(87, 213, 245, 0.3)',
                borderRadius: 'var(--radius)',
                padding: '16px 24px',
                marginTop: 6,
                marginBottom: 4,
                boxShadow: '0 20px 50px -20px rgba(0,0,0,0.8)',
              }}
            >
              <p
                style={{
                  fontSize: 'clamp(13px, 1.5vw, 17px)',
                  lineHeight: 1.55,
                  color: 'var(--fg)',
                  margin: 0,
                  fontStyle: 'italic',
                }}
              >
                &ldquo;Pengembangan otomasi monitoring radio, portal informasi publik, dan fondasi keamanan sistem merupakan langkah nyata menuju proses kerja yang lebih terstruktur, layanan digital yang lebih transparan, serta inovasi teknologi informasi yang berkelanjutan di Provinsi Riau.&rdquo;
              </p>
            </div>
          </Reveal>

          {/* Big Final Beat */}
          <Reveal delay={0.24}>
            <div
              className="display accent-text"
              style={{
                fontSize: 'clamp(42px, 6.5vw, 80px)',
                fontWeight: 800,
                letterSpacing: '0.04em',
                lineHeight: 1,
                margin: '6px 0 2px',
              }}
            >
              TERIMA KASIH
            </div>
          </Reveal>

          {/* Institution Footer Details */}
          <Reveal delay={0.3}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--fg)' }}>
                Balai Monitor Spektrum Frekuensi Radio Kelas I Pekanbaru
              </span>
              <span style={{ fontSize: 12, color: 'var(--fg-muted)' }}>
                Direktorat Jenderal Sumber Daya dan Perangkat Pos dan Informatika · Kementerian Komunikasi dan Digital RI
              </span>
            </div>
          </Reveal>

          {/* Contact Details Pills (0 Emoji in Chrome) */}
          <Reveal delay={0.36}>
            <div
              style={{
                display: 'flex',
                gap: 10,
                flexWrap: 'wrap',
                justifyContent: 'center',
                marginTop: 8,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  color: 'var(--fg-muted)',
                  background: 'rgba(255, 255, 255, 0.04)',
                  padding: '5px 12px',
                  borderRadius: 20,
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <IconPin style={{ width: 13, height: 13, color: '#57D5F5' }} />
                Jl. Sukarno Hatta No.244, Marpoyan Damai, Pekanbaru 28283
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: 'var(--fg-muted)',
                  background: 'rgba(255, 255, 255, 0.04)',
                  padding: '5px 12px',
                  borderRadius: 20,
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <IconGlobe style={{ width: 13, height: 13, color: '#57D5F5' }} />
                balmon-pekanbaru-demo.vercel.app
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: 'var(--fg-muted)',
                  background: 'rgba(255, 255, 255, 0.04)',
                  padding: '5px 12px',
                  borderRadius: 20,
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <IconMail style={{ width: 13, height: 13, color: '#57D5F5' }} />
                balmon.pekanbaru@komdigi.go.id
              </span>
            </div>
          </Reveal>
        </div>

        {/* Ambient Closing Waveform */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 1 }}>
          <RadioWaveform height={80} opacity={0.5} />
        </div>
      </Slide>
    </Deck>
  );
}
