import { IconCheckCircle, IconActivity, IconSparkles } from './Icons';

export default function RoadmapHorizon() {
  const phases = [
    {
      phase: 'Fase 1 · Selesai',
      badge: 'SELESAI & AKTIF',
      badgeColor: '#4fe5b0',
      badgeBg: 'rgba(79, 229, 176, 0.15)',
      title: 'Fondasi Otomasi & Portal Publik',
      items: [
        'Otomasi scanning 62 stasiun shortwave via FLRig',
        'Portal SvelteKit 2 & Tailwind v4 responsif di Vercel',
        '22 canonical JSON tervalidasi skema Ajv 2020',
      ],
      icon: <IconCheckCircle style={{ width: 16, height: 16, color: '#4fe5b0' }} />,
    },
    {
      phase: 'Fase 2 · Jangka Pendek',
      badge: 'TAHAP BERIKUTNYA',
      badgeColor: '#57D5F5',
      badgeBg: 'rgba(87, 213, 245, 0.15)',
      title: 'Backend Rust & Deteksi Audio Otomatis',
      items: [
        'Aktivasi fungsi RMS/dBFS audio loop tanpa intervensi manual',
        'Implementasi backend Axum & koneksi pool PostgreSQL',
        'Migrasi SeaORM 26 tabel & pengujian integrasi data',
      ],
      icon: <IconActivity style={{ width: 16, height: 16, color: '#57D5F5' }} />,
    },
    {
      phase: 'Fase 3 · Jangka Menengah',
      badge: 'PENGEMBANGAN LANJUTAN',
      badgeColor: '#F5B544',
      badgeBg: 'rgba(245, 181, 68, 0.15)',
      title: 'Portal CMS Admin & Smart Alerting',
      items: [
        'Portal CMS admin Balmon dengan autentikasi RBAC',
        'Integrasi visualisasi spektrum RF real-time di portal web',
        'Sistem peringatan otomatis gangguan interferensi radio',
      ],
      icon: <IconSparkles style={{ width: 16, height: 16, color: '#F5B544' }} />,
    },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: 16,
        width: '100%',
        marginTop: 20,
      }}
    >
      {phases.map((p, idx) => (
        <div
          key={idx}
          style={{
            background: 'rgba(11, 42, 74, 0.55)',
            border: '1px solid rgba(87, 213, 245, 0.2)',
            borderRadius: 'var(--radius)',
            padding: '18px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--fg-faint)', textTransform: 'uppercase' }}>
              {p.phase}
            </span>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: p.badgeColor,
                background: p.badgeBg,
                padding: '2px 8px',
                borderRadius: 4,
                border: `1px solid ${p.badgeColor}40`,
              }}
            >
              {p.badge}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {p.icon}
            <h4 style={{ fontSize: 14, fontWeight: 700, margin: 0, color: '#F7FAFC' }}>
              {p.title}
            </h4>
          </div>

          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, color: 'var(--fg-muted)', lineHeight: 1.5 }}>
            {p.items.map((it, i) => (
              <li key={i}>{it}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
