import Slide from '../deck/Slide';
import Reveal from '../deck/Reveal';
import RadioWaveform from '../components/RadioWaveform';
import { IconPin, IconGlobe, IconMail } from '../components/Icons';
import { asset } from '../utils/asset';

interface SlideProps {
  nav?: string;
  notes?: string;
}

export default function Slide08Closing({
  nav = 'Penutup',
  notes = 'Sebagai penutup, seluruh pengembangan ini bukan hanya tentang menulis baris kode, tetapi membangun fondasi transformasi digital yang berkelanjutan bagi Balmon Pekanbaru. Otomasi monitoring mempercepat proses pengawasan frekuensi, portal web meningkatkan keterbukaan informasi publik, dan fondasi keamanan melindungi integritas data institusi. Kami mengucapkan terima kasih atas perhatian Bapak/Ibu pimpinan dan membuka sesi diskusi.',
}: SlideProps) {
  const bgImage = asset('/assets/balmon/backgrounds/radio-monitoring.jpg');
  const logoKomdigi = asset('/assets/balmon/logo-komdigi.svg');

  return (
    <Slide center full nav={nav} notes={notes}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${bgImage})`,
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
              src={logoKomdigi}
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
  );
}
