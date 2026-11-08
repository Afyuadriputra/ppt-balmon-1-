import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  IconRust,
  IconFastAPI,
  IconLayers,
  IconCheckCircle,
} from './Icons';

export default function BackendComparison() {
  const [activeTab, setActiveTab] = useState<'both' | 'rust' | 'fastapi'>('both');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%' }}>
      {/* Upper Area: Shared Clean Architecture Banner */}
      <div
        style={{
          background: 'rgba(8, 24, 39, 0.7)',
          border: '1px solid rgba(87, 213, 245, 0.25)',
          borderRadius: 'var(--radius)',
          padding: '12px 18px',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          boxShadow: '0 15px 40px -15px rgba(0,0,0,0.8)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <IconLayers style={{ width: 16, height: 16, color: '#57D5F5' }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: '#F7FAFC' }}>
              Target Arsitektur Bersama: Modular Monolith & 4-Layer Clean Architecture
            </span>
          </div>
          
          {/* Tab Selector */}
          <div
            style={{
              display: 'inline-flex',
              background: 'rgba(4, 13, 22, 0.9)',
              padding: '2px 4px',
              borderRadius: 20,
              border: '1px solid rgba(87, 213, 245, 0.3)',
              gap: 2,
            }}
          >
            <button
              onClick={() => setActiveTab('both')}
              style={{
                background: activeTab === 'both' ? '#57D5F5' : 'transparent',
                color: activeTab === 'both' ? '#081827' : 'var(--fg-muted)',
                border: 'none',
                borderRadius: 14,
                padding: '3px 10px',
                fontSize: 10,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Komparasi Berdampingan
            </button>
            <button
              onClick={() => setActiveTab('rust')}
              style={{
                background: activeTab === 'rust' ? '#F5B544' : 'transparent',
                color: activeTab === 'rust' ? '#081827' : 'var(--fg-muted)',
                border: 'none',
                borderRadius: 14,
                padding: '3px 10px',
                fontSize: 10,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Fokus Rust (Axum)
            </button>
            <button
              onClick={() => setActiveTab('fastapi')}
              style={{
                background: activeTab === 'fastapi' ? '#4fe5b0' : 'transparent',
                color: activeTab === 'fastapi' ? '#081827' : 'var(--fg-muted)',
                border: 'none',
                borderRadius: 14,
                padding: '3px 10px',
                fontSize: 10,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Fokus Python (FastAPI)
            </button>
          </div>
        </div>

        {/* 4 Layers Stepper Pipeline */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 10,
          }}
        >
          <div style={{ background: 'rgba(4, 13, 22, 0.7)', padding: '7px 12px', borderRadius: 6, border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div style={{ fontSize: 9, color: '#57D5F5', fontWeight: 700 }}>LAPISAN 1</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--fg)' }}>Presentation Layer</div>
            <div style={{ fontSize: 10, color: 'var(--fg-muted)', marginTop: 2 }}>HTTP Routes, DTO Envelopes & Validasi Input</div>
          </div>
          <div style={{ background: 'rgba(4, 13, 22, 0.7)', padding: '7px 12px', borderRadius: 6, border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div style={{ fontSize: 9, color: '#F5B544', fontWeight: 700 }}>LAPISAN 2</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--fg)' }}>Application Layer</div>
            <div style={{ fontSize: 10, color: 'var(--fg-muted)', marginTop: 2 }}>Use Cases, Alur Publikasi Konten & CMS Admin</div>
          </div>
          <div style={{ background: 'rgba(4, 13, 22, 0.7)', padding: '7px 12px', borderRadius: 6, border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div style={{ fontSize: 9, color: '#4fe5b0', fontWeight: 700 }}>LAPISAN 3</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--fg)' }}>Domain Layer</div>
            <div style={{ fontSize: 10, color: 'var(--fg-muted)', marginTop: 2 }}>Entitas Bisnis Murni (Framework-Agnostic)</div>
          </div>
          <div style={{ background: 'rgba(4, 13, 22, 0.7)', padding: '7px 12px', borderRadius: 6, border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div style={{ fontSize: 9, color: '#38B6E8', fontWeight: 700 }}>LAPISAN 4</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--fg)' }}>Infrastructure Layer</div>
            <div style={{ fontSize: 10, color: 'var(--fg-muted)', marginTop: 2 }}>PostgreSQL, Pool Koneksi, Cache & Storage</div>
          </div>
        </div>
      </div>

      {/* Lower Area: Dual Engine Comparison Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: activeTab === 'both' ? 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))' : '1fr',
          gap: 16,
        }}
      >
        {/* OPTION A: RUST + AXUM */}
        {(activeTab === 'both' || activeTab === 'rust') && (
          <div
            style={{
              background: 'rgba(8, 24, 39, 0.75)',
              border: '1.5px solid rgba(245, 181, 68, 0.4)',
              borderRadius: 'var(--radius)',
              padding: '16px 18px',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              boxShadow: '0 15px 40px -15px rgba(0,0,0,0.8)',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 6,
                    background: 'rgba(245, 181, 68, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#F5B544',
                  }}
                >
                  <IconRust style={{ width: 20, height: 20 }} />
                </div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, margin: 0, color: '#F7FAFC' }}>
                    Opsi A: Rust + Axum
                  </h3>
                  <span style={{ fontSize: 10, color: '#F5B544', fontWeight: 600 }}>
                    BLUEPRINT M0-M1 (EKSEKUSI EFISIENSI TINGGI)
                  </span>
                </div>
              </div>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  background: 'rgba(245, 181, 68, 0.2)',
                  color: '#F5B544',
                  padding: '2px 8px',
                  borderRadius: 4,
                  border: '1px solid rgba(245, 181, 68, 0.4)',
                }}
              >
                RESOURCE INTENSIVE READY
              </span>
            </div>

            {/* Stack Tags */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', fontSize: 11 }}>
              <span style={{ background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: 4, color: 'var(--fg-muted)' }}>
                Framework: <strong>Axum</strong>
              </span>
              <span style={{ background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: 4, color: 'var(--fg-muted)' }}>
                Runtime: <strong>Tokio</strong>
              </span>
              <span style={{ background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: 4, color: 'var(--fg-muted)' }}>
                ORM: <strong>SeaORM</strong>
              </span>
              <span style={{ background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: 4, color: 'var(--fg-muted)' }}>
                DB: <strong>PostgreSQL</strong>
              </span>
              <span style={{ background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: 4, color: 'var(--fg-muted)' }}>
                Cache: <strong>Moka</strong>
              </span>
            </div>

            {/* Rationale Points */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                <span style={{ color: '#4fe5b0', fontWeight: 700 }}>✓</span>
                <span style={{ color: 'var(--fg-muted)' }}>
                  <strong style={{ color: 'var(--fg)' }}>Keamanan Memori & Konkurensi</strong>: Zero garbage collector; verifikasi kepemilikan memori dan thread-safety saat kompilasi.
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                <span style={{ color: '#4fe5b0', fontWeight: 700 }}>✓</span>
                <span style={{ color: 'var(--fg-muted)' }}>
                  <strong style={{ color: 'var(--fg)' }}>Efisiensi Sumber Daya</strong>: Footprint RAM sangat minimal dan latensi respon sangat terprediksi untuk server berdaya rendah.
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                <span style={{ color: '#F5B544', fontWeight: 700 }}>△</span>
                <span style={{ color: 'var(--fg-faint)' }}>
                  <em>Trade-off</em>: Waktu kompilasi awal dan kurva pembelajaran tim lebih tinggi dibanding bahasa berbasis skrip.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* OPTION B: PYTHON + FASTAPI */}
        {(activeTab === 'both' || activeTab === 'fastapi') && (
          <div
            style={{
              background: 'rgba(8, 24, 39, 0.75)',
              border: '1.5px solid rgba(87, 213, 245, 0.4)',
              borderRadius: 'var(--radius)',
              padding: '16px 18px',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              boxShadow: '0 15px 40px -15px rgba(0,0,0,0.8)',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 6,
                    background: 'rgba(87, 213, 245, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#57D5F5',
                  }}
                >
                  <IconFastAPI style={{ width: 20, height: 20 }} />
                </div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, margin: 0, color: '#F7FAFC' }}>
                    Opsi B: Python + FastAPI
                  </h3>
                  <span style={{ fontSize: 10, color: '#57D5F5', fontWeight: 600 }}>
                    RANCANGAN SPESIFIKASI API INTEGRASI
                  </span>
                </div>
              </div>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  background: 'rgba(87, 213, 245, 0.2)',
                  color: '#57D5F5',
                  padding: '2px 8px',
                  borderRadius: 4,
                  border: '1px solid rgba(87, 213, 245, 0.4)',
                }}
              >
                RAPID ITERATION READY
              </span>
            </div>

            {/* Stack Tags */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', fontSize: 11 }}>
              <span style={{ background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: 4, color: 'var(--fg-muted)' }}>
                Framework: <strong>FastAPI</strong>
              </span>
              <span style={{ background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: 4, color: 'var(--fg-muted)' }}>
                Runtime: <strong>Uvicorn (ASGI)</strong>
              </span>
              <span style={{ background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: 4, color: 'var(--fg-muted)' }}>
                Validation: <strong>Pydantic v2</strong>
              </span>
              <span style={{ background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: 4, color: 'var(--fg-muted)' }}>
                ORM: <strong>SQLAlchemy</strong>
              </span>
              <span style={{ background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: 4, color: 'var(--fg-muted)' }}>
                DB: <strong>PostgreSQL</strong>
              </span>
            </div>

            {/* Rationale Points */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                <span style={{ color: '#4fe5b0', fontWeight: 700 }}>✓</span>
                <span style={{ color: 'var(--fg-muted)' }}>
                  <strong style={{ color: 'var(--fg)' }}>Kecepatan Prototyping</strong>: Siklus penulisan kode cepat; dokumentasi Swagger/OpenAPI dibuat otomatis secara langsung.
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                <span style={{ color: '#4fe5b0', fontWeight: 700 }}>✓</span>
                <span style={{ color: 'var(--fg-muted)' }}>
                  <strong style={{ color: 'var(--fg)' }}>Sinergi Ekosistem Python</strong>: Terpadu dengan skrip otomasi spektrum radio (<code style={{ color: '#57D5F5' }}>monotoring.py</code>) dan modul audio RF.
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                <span style={{ color: '#57D5F5', fontWeight: 700 }}>△</span>
                <span style={{ color: 'var(--fg-faint)' }}>
                  <em>Trade-off</em>: Konsumsi memori runtime lebih tinggi; membutuhkan tuning worker pool pada beban permintaan tinggi.
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Evaluation Framework */}
      <div
        style={{
          background: 'rgba(4, 13, 22, 0.75)',
          border: '1px solid rgba(87, 213, 245, 0.2)',
          borderRadius: 6,
          padding: '8px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 10,
        }}
      >
        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--fg)' }}>
          Kriteria Keputusan Rekayasa Sistem:
        </span>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', fontSize: 10, color: 'var(--fg-muted)' }}>
          <span>1. Efisiensi Memori</span>
          <span>•</span>
          <span>2. Kecepatan Iterasi</span>
          <span>•</span>
          <span>3. Integrasi Otomasi Python</span>
          <span>•</span>
          <span>4. Kemudahan Pemeliharaan</span>
        </div>
        <span style={{ fontSize: 10, color: '#F5B544', fontWeight: 600 }}>
          *Evaluasi Objektif Tanpa Klaim Fiktif
        </span>
      </div>
    </div>
  );
}
