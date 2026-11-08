import { useState } from 'react';
import CountUp from './CountUp';
import { IconRadio, IconTower, IconShield, IconCheckCircle, IconActivity, IconSliders } from './Icons';

export default function EditorialImpact() {
  const [activeHorizon, setActiveHorizon] = useState(0);

  const horizons = [
    {
      phase: 'HORIZON 1 · SELESAI & AKTIF',
      title: 'Fondasi Otomasi & Portal Publik',
      statusColor: '#4fe5b0',
      items: [
        'Otomasi scanning 62 stasiun shortwave via FLRig CAT XML-RPC',
        'Portal SvelteKit 2 & Tailwind v4 responsif di Vercel',
        '22 canonical JSON tervalidasi skema Ajv 2020 strict mode',
      ],
    },
    {
      phase: 'HORIZON 2 · TAHAP BERIKUTNYA',
      title: 'Backend REST API & Deteksi Audio',
      statusColor: '#57D5F5',
      items: [
        'Aktivasi fungsi RMS/dBFS audio loop tanpa intervensi manual',
        'Implementasi backend REST (Axum/FastAPI) & pool PostgreSQL',
        'Migrasi ORM 26 tabel database DBML & integrasi provider API',
      ],
    },
    {
      phase: 'HORIZON 3 · PENGEMBANGAN LANJUTAN',
      title: 'CMS Pimpinan & Integrasi Spektrum RF',
      statusColor: '#F5B544',
      items: [
        'Portal CMS admin Balmon terproteksi autentikasi RBAC',
        'Integrasi visualisasi spektrum radio real-time di web',
        'Peta GIS pengawasan spektrum radio 12 kab/kota se-Riau',
      ],
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
      {/* 3 Metric Cards with CountUp & Concrete Editorial Proof */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 16,
        }}
      >
        {/* Metric 1 */}
        <div
          style={{
            background: 'rgba(8, 24, 39, 0.75)',
            border: '1px solid rgba(87, 213, 245, 0.3)',
            borderRadius: 'var(--radius)',
            padding: '18px 20px',
            textAlign: 'left',
            boxShadow: '0 15px 40px -15px rgba(0,0,0,0.8)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--fg-faint)', textTransform: 'uppercase' }}>
              Pilar 1 · Otomasi Spektrum
            </span>
            <IconRadio style={{ width: 16, height: 16, color: '#57D5F5' }} />
          </div>
          <div
            style={{
              fontFamily: 'var(--font-head)',
              fontSize: 'clamp(36px, 4.2vw, 52px)',
              fontWeight: 700,
              color: '#57D5F5',
              lineHeight: 1.1,
            }}
          >
            <CountUp to={62} />
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--fg)', marginTop: 4 }}>
            Stasiun Monitoring Terotomasi
          </div>
          <p style={{ fontSize: 11, color: 'var(--fg-muted)', marginTop: 4, marginBottom: 0, lineHeight: 1.4 }}>
            Pemindaian frekuensi CAT XML-RPC, verifikasi operator, dan pencatatan log 11 parameter ke CSV.
          </p>
        </div>

        {/* Metric 2 */}
        <div
          style={{
            background: 'rgba(8, 24, 39, 0.75)',
            border: '1px solid rgba(245, 181, 68, 0.3)',
            borderRadius: 'var(--radius)',
            padding: '18px 20px',
            textAlign: 'left',
            boxShadow: '0 15px 40px -15px rgba(0,0,0,0.8)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--fg-faint)', textTransform: 'uppercase' }}>
              Pilar 2 · Portal Publik
            </span>
            <IconTower style={{ width: 16, height: 16, color: '#F5B544' }} />
          </div>
          <div
            style={{
              fontFamily: 'var(--font-head)',
              fontSize: 'clamp(36px, 4.2vw, 52px)',
              fontWeight: 700,
              color: '#F5B544',
              lineHeight: 1.1,
            }}
          >
            <CountUp to={22} />
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--fg)', marginTop: 4 }}>
            Canonical Datasets Tervalidasi
          </div>
          <p style={{ fontSize: 11, color: 'var(--fg-muted)', marginTop: 4, marginBottom: 0, lineHeight: 1.4 }}>
            Menopang 11 rute navigasi responsif aktif di Vercel dengan Repository Provider Pattern.
          </p>
        </div>

        {/* Metric 3 */}
        <div
          style={{
            background: 'rgba(8, 24, 39, 0.75)',
            border: '1px solid rgba(79, 229, 176, 0.3)',
            borderRadius: 'var(--radius)',
            padding: '18px 20px',
            textAlign: 'left',
            boxShadow: '0 15px 40px -15px rgba(0,0,0,0.8)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--fg-faint)', textTransform: 'uppercase' }}>
              Pilar 3 · Rekayasa & Keamanan
            </span>
            <IconShield style={{ width: 16, height: 16, color: '#4fe5b0' }} />
          </div>
          <div
            style={{
              fontFamily: 'var(--font-head)',
              fontSize: 'clamp(36px, 4.2vw, 52px)',
              fontWeight: 700,
              color: '#4fe5b0',
              lineHeight: 1.1,
            }}
          >
            <CountUp to={24} />
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--fg)', marginTop: 4 }}>
            Endpoint API Terspesifikasi
          </div>
          <p style={{ fontSize: 11, color: 'var(--fg-muted)', marginTop: 4, marginBottom: 0, lineHeight: 1.4 }}>
            Spesifikasi OpenAPI v1 tervalidasi Redocly, 26 tabel database DBML, dan zero credential leakage.
          </p>
        </div>
      </div>

      {/* 3-Horizon Strategic Timeline Strip */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 12,
        }}
      >
        {horizons.map((h, idx) => {
          const isSelected = idx === activeHorizon;
          return (
            <div
              key={idx}
              onClick={() => setActiveHorizon(idx)}
              style={{
                background: isSelected ? 'rgba(11, 42, 74, 0.75)' : 'rgba(8, 24, 39, 0.55)',
                border: `1.5px solid ${isSelected ? h.statusColor : 'rgba(87, 213, 245, 0.15)'}`,
                borderRadius: 'var(--radius)',
                padding: '14px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: h.statusColor, letterSpacing: '0.04em' }}>
                  {h.phase}
                </span>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: h.statusColor }} />
              </div>

              <h4 style={{ fontSize: 13, fontWeight: 700, margin: 0, color: '#F7FAFC' }}>
                {h.title}
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {h.items.map((it, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, fontSize: 11, color: 'var(--fg-muted)' }}>
                    <span style={{ color: h.statusColor, fontWeight: 700 }}>•</span>
                    <span style={{ lineHeight: 1.35 }}>{it}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
