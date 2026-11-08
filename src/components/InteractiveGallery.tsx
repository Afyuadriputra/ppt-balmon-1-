import { useState } from 'react';
import BrowserFrame from './BrowserFrame';
import { asset } from '../utils/asset';

interface GalleryItem {
  id: string;
  label: string;
  desktopSrc: string;
  mobileSrc: string;
  url: string;
  description: string;
  tags: string[];
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'home',
    label: 'Beranda Utama',
    desktopSrc: asset('/assets/balmon/screenshots/home-desktop.png'),
    mobileSrc: asset('/assets/balmon/screenshots/home-mobile.png'),
    url: 'balmon-pekanbaru-demo.vercel.app/',
    description: 'Hero interaktif, sorotan layanan spektrum, peta pengawasan 12 kab/kota Riau, dan siaran pers terkini.',
    tags: ['SvelteKit 2', 'Runes Reaktif', 'WCAG AA', 'Peta D3 Geo'],
  },
  {
    id: 'layanan',
    label: 'Katalog Layanan',
    desktopSrc: asset('/assets/balmon/screenshots/layanan-desktop.png'),
    mobileSrc: asset('/assets/balmon/screenshots/layanan-mobile.png'),
    url: 'balmon-pekanbaru-demo.vercel.app/layanan',
    description: 'Perizinan spektrum radio, alur aplikasi SIMS SDPPI, kalkulator BHP frekuensi, dan FAQ interaktif.',
    tags: ['ServicesReader', 'BHP Frekuensi', 'Modal Bits UI'],
  },
  {
    id: 'ppid',
    label: 'Portal PPID',
    desktopSrc: asset('/assets/balmon/screenshots/ppid-desktop.png'),
    mobileSrc: asset('/assets/balmon/screenshots/ppid-mobile.png'),
    url: 'balmon-pekanbaru-demo.vercel.app/informasi-publik/ppid',
    description: 'Layanan keterbukaan informasi publik UU No. 14/2008, regulasi, formulir unduhan, dan kontak meja PPID.',
    tags: ['PublicInfoReader', 'KIP UU 14/2008', 'Filter Dokumen'],
  },
  {
    id: 'publikasi',
    label: 'Pusat Publikasi',
    desktopSrc: asset('/assets/balmon/screenshots/publikasi-desktop.png'),
    mobileSrc: asset('/assets/balmon/screenshots/publikasi-mobile.png'),
    url: 'balmon-pekanbaru-demo.vercel.app/publikasi',
    description: 'Agregasi siaran pers penertiban frekuensi, berita kegiatan monitoring balai, dan konten edukasi spektrum.',
    tags: ['PublicationsReader', 'WebP Optimized', 'Prerendered'],
  },
  {
    id: 'profil',
    label: 'Profil Institusi',
    desktopSrc: '/assets/balmon/screenshots/profil-desktop.png',
    mobileSrc: '/assets/balmon/screenshots/kontak-mobile.png',
    url: 'balmon-pekanbaru-demo.vercel.app/profil',
    description: 'Visi misi, 9 tupoksi Permenkominfo 17/2021, struktur organisasi, dan kontak pelayanan PTSP.',
    tags: ['InstitutionReader', 'ContactsReader', 'Permenkominfo 17/2021'],
  },
];

export default function InteractiveGallery() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const active = GALLERY_ITEMS.find((item) => item.id === activeTab) || GALLERY_ITEMS[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%' }}>
      {/* Tab Navigation Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          flexWrap: 'wrap',
          background: 'rgba(8, 24, 39, 0.65)',
          padding: '6px 10px',
          borderRadius: 'var(--radius)',
          border: '1px solid rgba(87, 213, 245, 0.2)',
          width: 'fit-content',
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--primary)',
            padding: '4px 8px',
          }}
        >
          Halaman:
        </span>
        {GALLERY_ITEMS.map((item) => {
          const isSelected = item.id === activeTab;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                background: isSelected ? 'var(--primary)' : 'rgba(255, 255, 255, 0.05)',
                color: isSelected ? '#081827' : 'var(--fg)',
                border: isSelected ? '1px solid var(--primary)' : '1px solid rgba(255, 255, 255, 0.08)',
                padding: '6px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: 13,
                fontWeight: isSelected ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Showcase Grid: Desktop BrowserFrame + Mobile Phone Frame */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) auto',
          gap: 20,
          alignItems: 'center',
        }}
      >
        {/* Desktop Viewport */}
        <div style={{ minWidth: 0 }}>
          <BrowserFrame url={active.url}>
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxHeight: 'clamp(280px, 46vh, 480px)',
                overflow: 'hidden',
                background: '#04101c',
              }}
            >
              <img
                src={active.desktopSrc}
                alt={`${active.label} Desktop Screenshot`}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'cover',
                  objectPosition: 'top',
                }}
              />
            </div>
          </BrowserFrame>
          {/* Subtext description below browser */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 10,
              marginTop: 10,
              padding: '0 4px',
            }}
          >
            <span style={{ fontSize: 13, color: 'var(--fg-muted)' }}>
              {active.description}
            </span>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {active.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    padding: '2px 8px',
                    borderRadius: 4,
                    background: 'rgba(87, 213, 245, 0.1)',
                    color: '#57D5F5',
                    border: '1px solid rgba(87, 213, 245, 0.25)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Device Frame */}
        <div
          style={{
            width: 'clamp(140px, 14vw, 200px)',
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '100%',
              background: '#040b12',
              borderRadius: 24,
              border: '3px solid rgba(87, 213, 245, 0.35)',
              boxShadow: '0 25px 60px -15px rgba(0,0,0,0.9), inset 0 0 0 1px rgba(255,255,255,0.1)',
              padding: '8px 6px',
              position: 'relative',
            }}
          >
            {/* Phone Speaker/Camera Notch */}
            <div
              style={{
                width: 44,
                height: 4,
                borderRadius: 2,
                background: 'rgba(255, 255, 255, 0.2)',
                margin: '0 auto 6px',
              }}
            />
            {/* Mobile Screen Container */}
            <div
              style={{
                width: '100%',
                maxHeight: 'clamp(260px, 42vh, 400px)',
                overflow: 'hidden',
                borderRadius: 16,
                background: '#000',
              }}
            >
              <img
                src={active.mobileSrc}
                alt={`${active.label} Mobile Screenshot`}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'cover',
                  objectPosition: 'top',
                }}
              />
            </div>
          </div>
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: 'var(--fg-faint)',
              marginTop: 8,
              textAlign: 'center',
            }}
          >
            Mobile Responsive (390×844)
          </span>
        </div>
      </div>
    </div>
  );
}
