import Slide from '../deck/Slide';
import { asset } from '../utils/asset';

interface SlideProps {
  nav?: string;
  notes?: string;
}

export default function Slide04FrontendArch({
  nav = 'Arsitektur Frontend',
  notes = 'Frontend website Balmon menggunakan SvelteKit dan Svelte 5 untuk menyusun tampilan yang modern, responsif, dan modular. Salah satu keunggulan arsitekturnya adalah Repository Provider Pattern, yang memungkinkan sumber data berpindah dari JSON lokal ke REST API tanpa mengubah keseluruhan tampilan website. TypeScript dan Ajv digunakan untuk membantu menjaga konsistensi data.',
}: SlideProps) {
  const slideImg = asset('/assets/balmon/slides/slide-4.png');

  return (
    <Slide
      full
      nav={nav}
      notes={notes}
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
  );
}
