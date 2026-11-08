import Slide from '../deck/Slide';
import { asset } from '../utils/asset';

interface SlideProps {
  nav?: string;
  notes?: string;
}

export default function Slide06Security({
  nav = 'Keamanan Sistem',
  notes = 'Pada aspek keamanan sistem, kami menerapkan prinsip Defense-in-Depth dan transparansi teknis. Kami membedakan secara tegas apa yang telah terverifikasi dan apa yang menjadi rancangan arsitektur. Yang telah terverifikasi adalah validasi skema Ajv 2020 pada seluruh 22 file JSON canonical, pengujian kontrak data OpenAPI v1 dengan 24 endpoints, serta isolasi ketat terhadap berkas environment rahasia. Sedangkan arsitektur CORS origin-locked, RBAC, dan rate limiting telah siap diimplementasikan sesuai blueprint teknis.',
}: SlideProps) {
  const slideImg = asset('/assets/balmon/slides/slide-6.png');

  return (
    <Slide
      full
      nav={nav}
      notes={notes}
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
  );
}
