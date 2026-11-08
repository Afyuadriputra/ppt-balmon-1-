import { IconShield, IconLock, IconCheckCircle, IconDatabase, IconServer } from './Icons';

export default function SecurityArchitecture() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18, width: '100%' }}>
      {/* Two Column Grid: Verified vs Blueprint */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 20,
        }}
      >
        {/* Column 1: Status Terverifikasi */}
        <div
          style={{
            background: 'rgba(11, 42, 74, 0.65)',
            border: '1px solid rgba(79, 229, 176, 0.35)',
            borderRadius: 'var(--radius)',
            padding: '22px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            boxShadow: '0 20px 40px -20px rgba(0,0,0,0.7)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: 'rgba(79, 229, 176, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#4fe5b0',
                }}
              >
                <IconCheckCircle style={{ width: 18, height: 18 }} />
              </div>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: '#F7FAFC' }}>
                  Status Terverifikasi
                </h3>
                <span style={{ fontSize: 12, color: '#4fe5b0', fontWeight: 600 }}>
                  IMPLEMENTASI & PENGUJIAN AKTIF
                </span>
              </div>
            </div>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                background: 'rgba(79, 229, 176, 0.2)',
                color: '#4fe5b0',
                padding: '3px 8px',
                borderRadius: 4,
                border: '1px solid rgba(79, 229, 176, 0.4)',
              }}
            >
              100% PASS
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div
              style={{
                background: 'rgba(8, 24, 39, 0.6)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px 14px',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--fg)' }}>
                  1. Validasi Skema Ajv 2020
                </span>
              </div>
              <p style={{ fontSize: 12, color: 'var(--fg-muted)', margin: 0, lineHeight: 1.4 }}>
                22/22 canonical JSON tervalidasi skema JSON Schema Draft 2020-12 strict mode sebelum render antarmuka.
              </p>
            </div>

            <div
              style={{
                background: 'rgba(8, 24, 39, 0.6)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px 14px',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--fg)' }}>
                  2. Verifikasi Kontrak OpenAPI v1
                </span>
              </div>
              <p style={{ fontSize: 12, color: 'var(--fg-muted)', margin: 0, lineHeight: 1.4 }}>
                24 API paths dan 192 response examples divalidasi dengan Redocly CLI tanpa error skema.
              </p>
            </div>

            <div
              style={{
                background: 'rgba(8, 24, 39, 0.6)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px 14px',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--fg)' }}>
                  3. Isolasi Secrets & Zero Leakage
                </span>
              </div>
              <p style={{ fontSize: 12, color: 'var(--fg-muted)', margin: 0, lineHeight: 1.4 }}>
                Pemisahan file lingkungan <code style={{ color: '#57D5F5' }}>.env</code> dan <code style={{ color: '#57D5F5' }}>.env.test</code> dari repositori Git; tidak ada kredensial terbuka.
              </p>
            </div>
          </div>
        </div>

        {/* Column 2: Rancangan Backend */}
        <div
          style={{
            background: 'rgba(11, 42, 74, 0.65)',
            border: '1px solid rgba(245, 181, 68, 0.35)',
            borderRadius: 'var(--radius)',
            padding: '22px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            boxShadow: '0 20px 40px -20px rgba(0,0,0,0.7)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: 'rgba(245, 181, 68, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#F5B544',
                }}
              >
                <IconShield style={{ width: 18, height: 18 }} />
              </div>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: '#F7FAFC' }}>
                  Rancangan Backend
                </h3>
                <span style={{ fontSize: 12, color: '#F5B544', fontWeight: 600 }}>
                  BLUEPRINT ARSITEKTUR RUST & POSTGRESQL
                </span>
              </div>
            </div>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                background: 'rgba(245, 181, 68, 0.2)',
                color: '#F5B544',
                padding: '3px 8px',
                borderRadius: 4,
                border: '1px solid rgba(245, 181, 68, 0.4)',
              }}
            >
              BLUEPRINT SPEC
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div
              style={{
                background: 'rgba(8, 24, 39, 0.6)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px 14px',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--fg)' }}>
                  1. Scoped CORS & Rate Limiting
                </span>
              </div>
              <p style={{ fontSize: 12, color: 'var(--fg-muted)', margin: 0, lineHeight: 1.4 }}>
                CORS dibatasi khusus pada <code style={{ color: '#57D5F5' }}>/api/v1/public</code> dengan validasi origin eksplisit; proteksi DoS via Tower rate limiting.
              </p>
            </div>

            <div
              style={{
                background: 'rgba(8, 24, 39, 0.6)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px 14px',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--fg)' }}>
                  2. Role-Based Access Control (RBAC)
                </span>
              </div>
              <p style={{ fontSize: 12, color: 'var(--fg-muted)', margin: 0, lineHeight: 1.4 }}>
                Autentikasi sesi terproteksi dan kontrol hak akses bertingkat dialokasikan pada rute admin <code style={{ color: '#57D5F5' }}>/api/v1/admin</code>.
              </p>
            </div>

            <div
              style={{
                background: 'rgba(8, 24, 39, 0.6)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px 14px',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--fg)' }}>
                  3. Relational Database Blueprint
                </span>
              </div>
              <p style={{ fontSize: 12, color: 'var(--fg-muted)', margin: 0, lineHeight: 1.4 }}>
                26 tabel SeaORM, 26 checks, dan 11 foreign keys dengan integritas <code style={{ color: '#57D5F5' }}>ON DELETE RESTRICT</code>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
