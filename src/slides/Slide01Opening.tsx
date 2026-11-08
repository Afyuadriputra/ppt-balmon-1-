import Slide from '../deck/Slide';
import { asset } from '../utils/asset';

interface SlideProps {
  nav?: string;
  notes?: string;
}

export default function Slide01Opening({
  nav = 'Pembuka',
  notes = 'Selamat pagi/siang Bapak/Ibu pimpinan Balmon Pekanbaru. Hari ini saya memaparkan Laporan Kinerja Pengembangan Teknologi Informasi pada Balai Monitor Spektrum Frekuensi Radio Kelas I Pekanbaru. Presentasi ini mencakup otomasi pemantauan radio dengan Python dan FLRig, pengembangan portal web resmi Balmon Pekanbaru berbasis SvelteKit, arsitektur frontend dan komparasi backend, serta penegakan fondasi keamanan data.',
}: SlideProps) {
  const slideImg = asset('/assets/balmon/slides/slide-1.png');

  return (
    <Slide
      full
      nav={nav}
      notes={notes}
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
          src={slideImg}
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
          src={slideImg}
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
  );
}
