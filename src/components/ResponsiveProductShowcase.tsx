import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconGlobe, IconLayers, IconCheckCircle, IconSliders } from './Icons';
import { asset } from '../utils/asset';

interface ShowcasePage {
  id: string;
  name: string;
  route: string;
  desktopSrc: string;
  mobileSrc: string;
  headline: string;
  description: string;
  techSpecs: string[];
}

const PAGES: ShowcasePage[] = [
  {
    id: 'beranda',
    name: 'Beranda Utama',
    route: 'https://balmon-pekanbaru-demo.vercel.app/',
    desktopSrc: asset('/assets/balmon/screenshots/home-desktop.png'),
    mobileSrc: asset('/assets/balmon/screenshots/home-mobile.png'),
    headline: 'Pusat Informasi & Ringkasan Layanan Publik',
    description: 'Menampilkan hero interaktif, ringkasan perizinan frekuensi, statistik balai, serta rilis pers penertiban spektrum radio di Riau.',
    techSpecs: ['SvelteKit 2 Prerendered', 'Tailwind CSS v4', 'WCAG 2.2 AA', '0ms Hydration Shift'],
  },
  {
    id: 'layanan',
    name: 'Katalog Layanan',
    route: 'https://balmon-pekanbaru-demo.vercel.app/layanan',
    desktopSrc: asset('/assets/balmon/screenshots/layanan-desktop.png'),
    mobileSrc: asset('/assets/balmon/screenshots/layanan-mobile.png'),
    headline: 'Panduan Perizinan & Layanan Spektrum Radio',
    description: 'Katalog perizinan ISR, integrasi sistem SIMS SDPPI, informasi alur pengajuan sertifikasi perangkat, dan FAQ teknis.',
    techSpecs: ['ServicesReader JSON', 'Ajv Schema Validated', 'Aksesibilitas Kontras Tinggi'],
  },
  {
    id: 'ppid',
    name: 'Portal PPID',
    route: 'https://balmon-pekanbaru-demo.vercel.app/informasi-publik/ppid',
    desktopSrc: asset('/assets/balmon/screenshots/ppid-desktop.png'),
    mobileSrc: asset('/assets/balmon/screenshots/ppid-mobile.png'),
    headline: 'Keterbukaan Informasi Publik (UU No. 14/2008)',
    description: 'Menyajikan struktur PPID, kategori informasi berkala, serta dan merta, formulir permohonan informasi, dan laporan tahunan.',
    techSpecs: ['PublicInfoReader JSON', 'Filter Kategori Reaktif', 'Dokumen Publik Terverifikasi'],
  },
  {
    id: 'publikasi',
    name: 'Berita & Siaran Pers',
    route: 'https://balmon-pekanbaru-demo.vercel.app/publikasi',
    desktopSrc: asset('/assets/balmon/screenshots/publikasi-desktop.png'),
    mobileSrc: asset('/assets/balmon/screenshots/publikasi-mobile.png'),
    headline: 'Publikasi Kegiatan Monitoring & Sosialisasi',
    description: 'Arsip berita operasi penertiban frekuensi ilegal, sosialisasi perangkat radio maritim/penerbangan, dan artikel edukasi.',
    techSpecs: ['PublicationsReader JSON', 'Optimasi WebP Gambar', 'Navigasi Ramah Mobile'],
  },
  {
    id: 'profil',
    name: 'Profil Balai',
    route: 'https://balmon-pekanbaru-demo.vercel.app/profil',
    desktopSrc: asset('/assets/balmon/screenshots/profil-desktop.png'),
    mobileSrc: asset('/assets/balmon/screenshots/profil-mobile.png'),
    headline: 'Tugas Pokok, Fungsi & Wilayah Kerja',
    description: 'Struktur organisasi Balmon Kelas I Pekanbaru, visi misi Ditjen SDPPI Komdigi, dan peta wilayah kerja 12 kabupaten/kota.',
    techSpecs: ['ProfileReader JSON', 'Diagram Organisasi SVG', 'Metadata OpenGraph Lengkap'],
  },
];

export default function ResponsiveProductShowcase() {
  const [activeTab, setActiveTab] = useState('beranda');
  const activePage = PAGES.find((p) => p.id === activeTab) || PAGES[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%' }}>
      {/* Segmented Control Page Switcher */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 10,
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            background: 'rgba(8, 24, 39, 0.8)',
            border: '1px solid rgba(87, 213, 245, 0.25)',
            borderRadius: 8,
            padding: 3,
            gap: 2,
          }}
        >
          {PAGES.map((page) => {
            const isSelected = page.id === activeTab;
            return (
              <button
                key={page.id}
                onClick={() => setActiveTab(page.id)}
                style={{
                  background: isSelected ? '#57D5F5' : 'transparent',
                  color: isSelected ? '#081827' : 'var(--fg-muted)',
                  border: 'none',
                  borderRadius: 6,
                  padding: '6px 14px',
                  fontSize: 12,
                  fontWeight: isSelected ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {page.name}
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--fg-muted)' }}>
          <IconGlobe style={{ width: 14, height: 14, color: '#57D5F5' }} />
          <a
            href="https://balmon-pekanbaru-demo.vercel.app/"
            target="_blank"
            rel="noreferrer"
            style={{ color: '#57D5F5', textDecoration: 'none', fontWeight: 600 }}
          >
            balmon-pekanbaru-demo.vercel.app
          </a>
        </div>
      </div>

      {/* Side-by-Side Dual Frame: Desktop Frame (Left ~74%) + Mobile Frame (Right ~26%) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 210px',
          gap: 16,
          alignItems: 'start',
        }}
      >
        {/* Desktop Browser Mockup */}
        <div
          style={{
            background: '#061320',
            border: '1px solid rgba(87, 213, 245, 0.3)',
            borderRadius: 10,
            overflow: 'hidden',
            boxShadow: '0 20px 50px -20px rgba(0,0,0,0.85)',
          }}
        >
          {/* macOS Browser Header */}
          <div
            style={{
              background: '#0a1d30',
              borderBottom: '1px solid rgba(87, 213, 245, 0.15)',
              padding: '8px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            {/* Traffic Lights */}
            <div style={{ display: 'flex', gap: 5 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#EF4444' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#F59E0B' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981' }} />
            </div>

            {/* URL Pill */}
            <div
              style={{
                flex: 1,
                background: 'rgba(4, 13, 22, 0.8)',
                border: '1px solid rgba(87, 213, 245, 0.2)',
                borderRadius: 4,
                padding: '3px 10px',
                fontSize: 11,
                color: 'var(--fg-muted)',
                fontFamily: 'monospace',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              <span style={{ color: '#4fe5b0' }}>https://</span>
              <span>{activePage.route.replace('https://', '')}</span>
            </div>

            <span style={{ fontSize: 10, color: 'var(--fg-faint)', fontWeight: 600 }}>1440 × 900</span>
          </div>

          {/* Desktop Screenshot Canvas */}
          <div
            style={{
              position: 'relative',
              height: 310,
              overflow: 'hidden',
              background: '#040d16',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={`desktop-${activePage.id}`}
                src={activePage.desktopSrc}
                alt={`${activePage.name} Desktop View`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top',
                  display: 'block',
                }}
              />
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Device Frame (390 x 844 aspect) */}
        <div
          style={{
            background: '#061320',
            border: '2px solid rgba(87, 213, 245, 0.35)',
            borderRadius: 24,
            overflow: 'hidden',
            boxShadow: '0 20px 45px -15px rgba(0,0,0,0.9)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Mobile Top Dynamic Island Bar */}
          <div
            style={{
              background: '#040d16',
              padding: '6px 10px 4px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: 60,
                height: 12,
                borderRadius: 8,
                background: '#000',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            />
          </div>

          {/* Mobile Screenshot Canvas */}
          <div
            style={{
              position: 'relative',
              height: 300,
              overflow: 'hidden',
              background: '#040d16',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={`mobile-${activePage.id}`}
                src={activePage.mobileSrc}
                alt={`${activePage.name} Mobile View`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top',
                  display: 'block',
                }}
              />
            </AnimatePresence>
          </div>

          {/* Mobile Bottom Home Indicator */}
          <div
            style={{
              background: '#040d16',
              padding: '5px 0 6px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <div style={{ width: 44, height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.3)' }} />
          </div>
        </div>
      </div>

      {/* Active Page Meta Details & Engineering Annotations */}
      <div
        style={{
          background: 'rgba(8, 24, 39, 0.65)',
          border: '1px solid rgba(87, 213, 245, 0.2)',
          borderRadius: 8,
          padding: '10px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 10,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#F7FAFC' }}>
            {activePage.headline}
          </span>
          <span style={{ fontSize: 11, color: 'var(--fg-muted)', maxWidth: 650 }}>
            {activePage.description}
          </span>
        </div>

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {activePage.techSpecs.map((spec, i) => (
            <span
              key={i}
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: '#57D5F5',
                background: 'rgba(87, 213, 245, 0.1)',
                border: '1px solid rgba(87, 213, 245, 0.25)',
                padding: '3px 8px',
                borderRadius: 4,
              }}
            >
              {spec}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
