import Slide from '../deck/Slide';
import Reveal from '../deck/Reveal';
import SpectrumWorkbench from '../components/SpectrumWorkbench';
import PythonShowcase from '../components/PythonShowcase';
import { IconRadio } from '../components/Icons';

interface SlideProps {
  nav?: string;
  notes?: string;
}

export default function Slide02Automation({
  nav = 'Otomasi Radio',
  notes = 'Pada pilar pertama, kami mengimplementasikan skrip otomasi Python monotoring.py yang terhubung ke radio komunikasi via FLRig XML-RPC di port 12345. Sistem ini secara otomatis memindahkan frekuensi VFO-A dan mode radio AM untuk 62 entri stasiun gelombang pendek. Durasi dengar diatur 3 detik per frekuensi, di mana operator memverifikasi apakah siaran terdengar. Hasil dicatat secara otomatis ke file CSV dengan 11 kolom data standar.',
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
  );
}
