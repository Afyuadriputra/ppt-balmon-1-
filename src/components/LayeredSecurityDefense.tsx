import { useState } from 'react';
import { motion } from 'framer-motion';
import { IconShield, IconLock, IconCheckCircle, IconDatabase, IconServer } from './Icons';

interface SecurityLayer {
  step: string;
  name: string;
  scope: string;
  status: 'VERIFIED' | 'BLUEPRINT';
  statusLabel: string;
  statusColor: string;
  statusBg: string;
  details: string;
  checks: string[];
}

const LAYERS: SecurityLayer[] = [
  {
    step: 'LAPISAN 01',
    name: 'Perimeter & Protokol Web',
    scope: 'Gerbang Lalu Lintas Jaringan',
    status: 'VERIFIED',
    statusLabel: 'TERVERIFIKASI DI VERCEL',
    statusColor: '#4fe5b0',
    statusBg: 'rgba(79, 229, 176, 0.15)',
    details: 'Membatasi akses hanya dari domain resmi, mencegah serangan Cross-Origin, dan mengamankan transmisi data terenkripsi.',
    checks: [
      'CORS origin-lock khusus balmon-pekanbaru-demo.vercel.app',
      'Enkripsi TLS 1.3 / HTTPS wajib pada seluruh rute',
      'Proteksi header keamanan (X-Content-Type, CSP, HSTS)',
    ],
  },
  {
    step: 'LAPISAN 02',
    name: 'Validasi Kontrak & Skema Data',
    scope: 'Pemeriksaan Integritas Payload',
    status: 'VERIFIED',
    statusLabel: '22/22 SKEMA PASS',
    statusColor: '#4fe5b0',
    statusBg: 'rgba(79, 229, 176, 0.15)',
    details: 'Menolak data anomali sebelum diproses antarmuka pengguna melalui validasi runtime JSON Schema Draft 2020-12.',
    checks: [
      'Ajv 2020-12 strict mode pada 22 canonical JSON',
      '24 path endpoint OpenAPI v1 lolos audit Redocly CLI',
      'TypeScript strict mode tanpa toleransi `any` implisit',
    ],
  },
  {
    step: 'LAPISAN 03',
    name: 'Autentikasi & Kontrol Akses (RBAC)',
    scope: 'Manajemen Hak Akses Admin',
    status: 'BLUEPRINT',
    statusLabel: 'BLUEPRINT SPESIFIKASI',
    statusColor: '#F5B544',
    statusBg: 'rgba(245, 181, 68, 0.15)',
    details: 'Membedakan hak akses publik dengan hak kelola konten balai melalui hirarki peran terverifikasi secara stateless.',
    checks: [
      'Hirarki peran: Superadmin, Editor Konten, Operator Monitoring',
      'Token stateless JWT dengan masa berlaku pendek (short-lived)',
      'Isolasi penuh rute manajemen /api/v1/admin dari akses umum',
    ],
  },
  {
    step: 'LAPISAN 04',
    name: 'Isolasi Penyimpanan & Rahasia',
    scope: 'Fondasi Database & Lingkungan Server',
    status: 'VERIFIED',
    statusLabel: 'ZERO LEAKAGE PASS',
    statusColor: '#4fe5b0',
    statusBg: 'rgba(79, 229, 176, 0.15)',
    details: 'Menjamin tidak ada rahasia atau kunci API yang bocor ke repositori publik serta isolasi koneksi basis data.',
    checks: [
      'Zero credentials di git; pemisahan .env dan .env.test',
      'Pool koneksi PostgreSQL dengan proteksi injection via ORM',
      'Rencana Row-Level Security (RLS) pada 26 tabel database DBML',
    ],
  },
];

export default function LayeredSecurityDefense() {
  const [selectedLayer, setSelectedLayer] = useState(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%' }}>
      {/* 4 Sequential Defense Perimeter Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 12,
        }}
      >
        {LAYERS.map((layer, idx) => {
          const isSelected = idx === selectedLayer;
          return (
            <div
              key={idx}
              onClick={() => setSelectedLayer(idx)}
              style={{
                background: isSelected ? 'rgba(11, 42, 74, 0.85)' : 'rgba(8, 24, 39, 0.6)',
                border: `1.5px solid ${isSelected ? layer.statusColor : 'rgba(87, 213, 245, 0.15)'}`,
                borderRadius: 'var(--radius)',
                padding: '14px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: isSelected ? `0 10px 30px -10px ${layer.statusColor}30` : 'none',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--fg-faint)', letterSpacing: '0.06em' }}>
                  {layer.step}
                </span>
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    color: layer.statusColor,
                    background: layer.statusBg,
                    padding: '2px 6px',
                    borderRadius: 4,
                    border: `1px solid ${layer.statusColor}40`,
                  }}
                >
                  {layer.statusLabel}
                </span>
              </div>

              <div>
                <h4 style={{ fontSize: 13, fontWeight: 700, margin: 0, color: '#F7FAFC' }}>
                  {layer.name}
                </h4>
                <div style={{ fontSize: 10, color: 'var(--fg-muted)', marginTop: 2 }}>
                  {layer.scope}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 4 }}>
                {layer.checks.map((chk, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, fontSize: 11, color: 'var(--fg-muted)' }}>
                    <span style={{ color: layer.statusColor, fontWeight: 700, fontSize: 10 }}>✓</span>
                    <span style={{ lineHeight: 1.3 }}>{chk}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Layer In-Depth Context Strip */}
      <div
        style={{
          background: 'rgba(4, 13, 22, 0.75)',
          border: '1px solid rgba(87, 213, 245, 0.25)',
          borderRadius: 6,
          padding: '10px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <IconShield style={{ width: 18, height: 18, color: LAYERS[selectedLayer].statusColor }} />
          <div>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#F7FAFC' }}>
              Fokus: {LAYERS[selectedLayer].name}
            </span>
            <span style={{ fontSize: 11, color: 'var(--fg-muted)', marginLeft: 8 }}>
              {LAYERS[selectedLayer].details}
            </span>
          </div>
        </div>

        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: 'var(--primary)',
            background: 'rgba(87, 213, 245, 0.1)',
            padding: '3px 8px',
            borderRadius: 4,
          }}
        >
          PRINSIP DEFENSE-IN-DEPTH
        </span>
      </div>
    </div>
  );
}
