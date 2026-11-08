import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  IconSvelte,
  IconTypeScript,
  IconTailwind,
  IconCheckCircle,
  IconDatabase,
  IconServer,
  IconCode,
  IconGitBranch,
} from './Icons';

export default function FrontendArchitecture() {
  const [providerMode, setProviderMode] = useState<'static' | 'api'>('static');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%' }}>
      {/* Main Grid: Left Architecture Diagram (56%) & Right Key Pillars (44%) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
          gap: 18,
          alignItems: 'stretch',
        }}
      >
        {/* LEFT COLUMN: Custom Interactive Architecture Flow */}
        <div
          style={{
            background: 'rgba(8, 24, 39, 0.7)',
            border: '1px solid rgba(87, 213, 245, 0.25)',
            borderRadius: 'var(--radius)',
            padding: '18px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            boxShadow: '0 20px 50px -20px rgba(0,0,0,0.8)',
            position: 'relative',
          }}
        >
          {/* Header & Mode Switcher */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 8,
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              paddingBottom: 10,
            }}
          >
            <div>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: 'var(--fg-faint)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                ALUR DATA & VALIDASI RUNTIME
              </span>
              <h3 style={{ fontSize: 15, fontWeight: 700, margin: 0, color: '#F7FAFC' }}>
                Repository Provider Pattern
              </h3>
            </div>

            {/* Interactive Mode Toggle */}
            <div
              style={{
                display: 'inline-flex',
                background: 'rgba(4, 13, 22, 0.9)',
                padding: '3px 4px',
                borderRadius: 20,
                border: '1px solid rgba(87, 213, 245, 0.3)',
              }}
            >
              <button
                onClick={() => setProviderMode('static')}
                style={{
                  background: providerMode === 'static' ? '#F5B544' : 'transparent',
                  color: providerMode === 'static' ? '#081827' : 'var(--fg-muted)',
                  border: 'none',
                  borderRadius: 16,
                  padding: '4px 12px',
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                ● Static Mode
              </button>
              <button
                onClick={() => setProviderMode('api')}
                style={{
                  background: providerMode === 'api' ? '#57D5F5' : 'transparent',
                  color: providerMode === 'api' ? '#081827' : 'var(--fg-muted)',
                  border: 'none',
                  borderRadius: 16,
                  padding: '4px 12px',
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                ● API Mode
              </button>
            </div>
          </div>

          {/* Diagram Flow Layers */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {/* Layer 1: Public Visitor */}
            <div
              style={{
                background: 'rgba(4, 13, 22, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 6,
                padding: '7px 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#57D5F5' }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--fg)' }}>
                  Pengguna Publik / Browser
                </span>
              </div>
              <span style={{ fontSize: 10, color: 'var(--fg-faint)', fontFamily: 'monospace' }}>
                Desktop (1440px) & Mobile (390px)
              </span>
            </div>

            <div style={{ textAlign: 'center', color: '#57D5F5', fontSize: 11, lineHeight: 1 }}>↓</div>

            {/* Layer 2: Presentation Layer */}
            <div
              style={{
                background: 'rgba(245, 181, 68, 0.08)',
                border: '1px solid rgba(245, 181, 68, 0.3)',
                borderRadius: 6,
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <IconSvelte style={{ width: 16, height: 16, color: '#F5B544' }} />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#F5B544' }}>
                    SvelteKit 2 & Svelte 5 Runes
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--fg-muted)' }}>
                    UI Components & Page Routes (+page.svelte)
                  </div>
                </div>
              </div>
              <span style={{ fontSize: 10, color: '#F5B544', background: 'rgba(245, 181, 68, 0.15)', padding: '2px 6px', borderRadius: 4 }}>
                $state & $derived
              </span>
            </div>

            <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: 11, lineHeight: 1 }}>↓</div>

            {/* Layer 3: View-Model Mappers */}
            <div
              style={{
                background: 'rgba(4, 13, 22, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 6,
                padding: '7px 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <IconCode style={{ width: 15, height: 15, color: '#57D5F5' }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--fg)' }}>
                  View-Model Mappers
                </span>
              </div>
              <span style={{ fontSize: 10, color: 'var(--fg-muted)' }}>
                Transformasi DTO ke Struktur UI
              </span>
            </div>

            <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: 11, lineHeight: 1 }}>↓</div>

            {/* Layer 4: The Abstraction Pivot - Repository Provider */}
            <div
              style={{
                background: 'rgba(87, 213, 245, 0.12)',
                border: '1.5px solid #57D5F5',
                borderRadius: 6,
                padding: '9px 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 0 15px rgba(87, 213, 245, 0.15)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <IconGitBranch style={{ width: 16, height: 16, color: '#57D5F5' }} />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#57D5F5' }}>
                    Repository Provider Pattern
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--fg-muted)' }}>
                    Pemisah Sumber Data (Abstraksi Kontrak)
                  </div>
                </div>
              </div>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: providerMode === 'static' ? '#F5B544' : '#57D5F5',
                  background: 'rgba(0,0,0,0.4)',
                  padding: '2px 8px',
                  borderRadius: 4,
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                Aktif: {providerMode === 'static' ? 'Static JSON' : 'REST API'}
              </span>
            </div>

            {/* Fork Branches */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 10,
                marginTop: 2,
              }}
            >
              {/* Left Branch: Static JSON Provider */}
              <motion.div
                animate={{
                  opacity: providerMode === 'static' ? 1 : 0.45,
                  scale: providerMode === 'static' ? 1.01 : 0.99,
                }}
                transition={{ duration: 0.2 }}
                style={{
                  background:
                    providerMode === 'static'
                      ? 'rgba(245, 181, 68, 0.12)'
                      : 'rgba(4, 13, 22, 0.5)',
                  border: `1px solid ${providerMode === 'static' ? '#F5B544' : 'rgba(255, 255, 255, 0.08)'}`,
                  borderRadius: 6,
                  padding: '8px 10px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <IconDatabase style={{ width: 13, height: 13, color: '#F5B544' }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#F5B544' }}>
                    Static Provider
                  </span>
                </div>
                <div style={{ fontSize: 10, color: 'var(--fg-muted)' }}>
                  22 Berkas JSON Canonical
                </div>
                <div style={{ fontSize: 9, color: 'var(--fg-faint)', marginTop: 2 }}>
                  ✓ Aktif di Demo Vercel<br />
                  ✓ 8 Domain Data Lengkap
                </div>
              </motion.div>

              {/* Right Branch: REST API + Ajv Validation */}
              <motion.div
                animate={{
                  opacity: providerMode === 'api' ? 1 : 0.45,
                  scale: providerMode === 'api' ? 1.01 : 0.99,
                }}
                transition={{ duration: 0.2 }}
                style={{
                  background:
                    providerMode === 'api'
                      ? 'rgba(87, 213, 245, 0.12)'
                      : 'rgba(4, 13, 22, 0.5)',
                  border: `1px solid ${providerMode === 'api' ? '#57D5F5' : 'rgba(255, 255, 255, 0.08)'}`,
                  borderRadius: 6,
                  padding: '8px 10px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <IconServer style={{ width: 13, height: 13, color: '#57D5F5' }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#57D5F5' }}>
                    REST API Client
                  </span>
                </div>
                <div style={{ fontSize: 10, color: 'var(--fg-muted)' }}>
                  Validasi Skema Ajv 2020
                </div>
                <div style={{ fontSize: 9, color: 'var(--fg-faint)', marginTop: 2 }}>
                  ✓ 24 Endpoint OpenAPI v1<br />
                  ✓ Siap Axum / FastAPI
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Technical Stack Pillars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* Pillar 1: SvelteKit 2 & Svelte 5 */}
          <div
            style={{
              background: 'rgba(8, 24, 39, 0.7)',
              border: '1px solid rgba(245, 181, 68, 0.3)',
              borderRadius: 'var(--radius)',
              padding: '14px 16px',
              display: 'flex',
              gap: 12,
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 6,
                background: 'rgba(245, 181, 68, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#F5B544',
                flexShrink: 0,
              }}
            >
              <IconSvelte style={{ width: 20, height: 20 }} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h4 style={{ fontSize: 14, fontWeight: 700, margin: 0, color: '#F7FAFC' }}>
                  SvelteKit 2 & Svelte 5 Runes
                </h4>
                <span style={{ fontSize: 9, color: '#F5B544', background: 'rgba(245, 181, 68, 0.15)', padding: '1px 6px', borderRadius: 3, fontWeight: 700 }}>
                  RUNTIMES
                </span>
              </div>
              <p style={{ fontSize: 12, color: 'var(--fg-muted)', margin: '4px 0 0', lineHeight: 1.45 }}>
                Menggunakan deklarasi reaktivitas sinyal eksplisit (<code style={{ color: '#F5B544' }}>$state</code> dan <code style={{ color: '#F5B544' }}>$derived</code>) tanpa virtual DOM. Menghasilkan payload JavaScript sangat kecil dan render instan.
              </p>
            </div>
          </div>

          {/* Pillar 2: Repository Provider Pattern */}
          <div
            style={{
              background: 'rgba(8, 24, 39, 0.7)',
              border: '1px solid rgba(87, 213, 245, 0.3)',
              borderRadius: 'var(--radius)',
              padding: '14px 16px',
              display: 'flex',
              gap: 12,
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 6,
                background: 'rgba(87, 213, 245, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#57D5F5',
                flexShrink: 0,
              }}
            >
              <IconGitBranch style={{ width: 20, height: 20 }} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h4 style={{ fontSize: 14, fontWeight: 700, margin: 0, color: '#F7FAFC' }}>
                  Repository Provider Abstraction
                </h4>
                <span style={{ fontSize: 9, color: '#57D5F5', background: 'rgba(87, 213, 245, 0.15)', padding: '1px 6px', borderRadius: 3, fontWeight: 700 }}>
                  DESAIN POLA
                </span>
              </div>
              <p style={{ fontSize: 12, color: 'var(--fg-muted)', margin: '4px 0 0', lineHeight: 1.45 }}>
                Memisahkan tampilan antarmuka dari sumber data fisik. Perpindahan dari 22 berkas JSON lokal ke backend REST API dapat dilakukan tanpa mengubah satupun kode komponen UI.
              </p>
            </div>
          </div>

          {/* Pillar 3: Ajv Schema Validation & TypeScript */}
          <div
            style={{
              background: 'rgba(8, 24, 39, 0.7)',
              border: '1px solid rgba(79, 229, 176, 0.3)',
              borderRadius: 'var(--radius)',
              padding: '14px 16px',
              display: 'flex',
              gap: 12,
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 6,
                background: 'rgba(79, 229, 176, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#4fe5b0',
                flexShrink: 0,
              }}
            >
              <IconCheckCircle style={{ width: 20, height: 20 }} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h4 style={{ fontSize: 14, fontWeight: 700, margin: 0, color: '#F7FAFC' }}>
                  Validasi Skema Ajv & TypeScript
                </h4>
                <span style={{ fontSize: 9, color: '#4fe5b0', background: 'rgba(79, 229, 176, 0.15)', padding: '1px 6px', borderRadius: 3, fontWeight: 700 }}>
                  INTEGRITAS
                </span>
              </div>
              <p style={{ fontSize: 12, color: 'var(--fg-muted)', margin: '4px 0 0', lineHeight: 1.45 }}>
                Setiap payload diverifikasi menggunakan JSON Schema Draft 2020-12 secara ketat. Menjamin tidak ada data anomali atau field hilang yang merusak tampilan saat runtime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
