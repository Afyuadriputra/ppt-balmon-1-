import Slide from '../deck/Slide';
import Reveal from '../deck/Reveal';
import BackendComparison from '../components/BackendComparison';
import { IconLayers } from '../components/Icons';

interface SlideProps {
  nav?: string;
  notes?: string;
}

export default function Slide05BackendArch({
  nav = 'Arsitektur Backend',
  notes = 'Pada tahap perencanaan backend, saya mengkaji dua pendekatan teknologi, yaitu Rust dengan framework Axum dan Python dengan framework FastAPI. Keduanya dapat dirancang menggunakan pola arsitektur modular monolith dan empat lapisan Clean Architecture. Tujuannya agar perbandingan dilakukan secara adil, dengan arsitektur dan kebutuhan API yang sama. Rust dipertimbangkan untuk kontrol resource dan keamanan memori, sedangkan FastAPI dipertimbangkan karena kecepatan pengembangan dan ekosistem Python. Keputusan akhir tetap perlu mempertimbangkan hasil implementasi dan pengujian yang sebenarnya.',
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
  );
}
