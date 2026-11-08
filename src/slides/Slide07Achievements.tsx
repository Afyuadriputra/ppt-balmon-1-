import Slide from '../deck/Slide';
import Reveal from '../deck/Reveal';
import EditorialImpact from '../components/EditorialImpact';

interface SlideProps {
  nav?: string;
  notes?: string;
}

export default function Slide07Achievements({
  nav = 'Capaian & Roadmap',
  notes = 'Slide ini merangkum capaian riil yang terukur: 62 stasiun monitoring gelombang pendek dalam otomasi Python, 22 dataset canonical yang menopang 11 rute portal web di Vercel, dan 24 endpoint API yang telah terspesifikasi. Arah pengembangan selanjutnya terbagi menjadi tiga fase: dari fondasi yang telah selesai, menuju otomasi deteksi audio penuh dan backend database, hingga integrasi pemantauan spektrum real-time dan CMS pimpinan.',
}: SlideProps) {
  return (
    <Slide center nav={nav} notes={notes}>
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
  );
}
