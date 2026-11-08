import Slide from '../deck/Slide';
import Reveal from '../deck/Reveal';
import ResponsiveProductShowcase from '../components/ResponsiveProductShowcase';
import { IconTower } from '../components/Icons';

interface SlideProps {
  nav?: string;
  notes?: string;
}

export default function Slide03Website({
  nav = 'Portal Website',
  notes = 'Pilar kedua adalah portal resmi Balmon Pekanbaru yang dapat diakses langsung pada demo Vercel. Menggunakan arsitektur SvelteKit 2 dan Svelte 5 Runes dengan Tailwind CSS v4. Tampilan desktop dan mobile yang Anda lihat adalah hasil tangkapan layar langsung dari website yang berfungsi. Fitur kunci meliputi arsitektur Repository Provider Pattern yang memisahkan tampilan dari data, mengelola 22 berkas canonical JSON dalam 8 domain, serta siap beralih ke REST API tanpa mengubah kode antarmuka.',
}: SlideProps) {
  return (
    <Slide full nav={nav} notes={notes}>
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
  );
}
