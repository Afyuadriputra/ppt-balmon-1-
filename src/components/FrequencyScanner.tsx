import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IconActivity, IconRadio, IconFileSpreadsheet, IconCheckCircle } from './Icons';

const SAMPLE_STATIONS = [
  { no: 1, freq: '11.500.000', mhz: '11.500', call: 'SOH Xi Wang Zhi Sheng', loc: 'Miaoli, Taiwan', mode: 'AM', pwr: '1 kW', status: 'ADA SUARA' },
  { no: 7, freq: '11.610.000', mhz: '11.610', call: 'CNR 2 Business Radio', loc: 'Beijing, China', mode: 'AM', pwr: '150 kW', status: 'ADA SUARA' },
  { no: 8, freq: '11.615.000', mhz: '11.615', call: 'JRC Radio Tamazui', loc: 'Santa Maria di Galeria, Vatikan', mode: 'AM', pwr: '250 kW', status: 'TIDAK ADA SUARA' },
  { no: 14, freq: '11.665.000', mhz: '11.665', call: 'RTM WaiLimbang FM', loc: 'Kajang, Malaysia', mode: 'AM', pwr: '100 kW', status: 'ADA SUARA' },
  { no: 20, freq: '11.700.000', mhz: '11.700', call: 'Radio France Int.', loc: 'Issoudun, Prancis', mode: 'AM', pwr: '500 kW', status: 'ADA SUARA' },
  { no: 27, freq: '11.750.000', mhz: '11.750', call: 'Radio Voz Missionaria', loc: 'Camboriu, Brasil', mode: 'AM', pwr: '1 kW', status: 'TIDAK DIKETAHUI' },
];

export default function FrequencyScanner() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(3);
  const current = SAMPLE_STATIONS[activeIdx];

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setActiveIdx((i) => (i + 1) % SAMPLE_STATIONS.length);
          return 3;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        background: 'rgba(11, 42, 74, 0.75)',
        border: '1px solid rgba(87, 213, 245, 0.25)',
        borderRadius: 'var(--radius)',
        padding: '20px 24px',
        boxShadow: '0 20px 50px -20px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      {/* Top Status Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ display: 'inline-flex', width: 10, height: 10, borderRadius: '50%', background: '#4fe5b0', boxShadow: '0 0 10px #4fe5b0' }} />
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.05em', color: 'var(--primary)', textTransform: 'uppercase' }}>
            FLRig XML-RPC · CAT ONLINE (PORT 12345)
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--fg-muted)' }}>
          <IconRadio style={{ width: 15, height: 15, color: 'var(--primary)' }} />
          <span>Shortwave Broadcast Band</span>
        </div>
      </div>

      {/* VFO Frequency Display Screen */}
      <div
        style={{
          background: 'linear-gradient(180deg, #04101c 0%, #06192c 100%)',
          border: '1px solid rgba(87, 213, 245, 0.3)',
          borderRadius: 'var(--radius-sm)',
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: '0.1em', color: 'var(--fg-faint)', textTransform: 'uppercase' }}>
              VFO-A Transceiver Frequency
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(28px, 3.4vw, 42px)',
                fontWeight: 700,
                color: '#57D5F5',
                letterSpacing: '0.04em',
                lineHeight: 1.1,
                marginTop: 4,
                textShadow: '0 0 20px rgba(87, 213, 245, 0.5)',
              }}
            >
              {current.freq} <span style={{ fontSize: '0.45em', color: 'var(--fg-muted)', fontWeight: 500 }}>Hz</span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span
              style={{
                display: 'inline-block',
                background: 'rgba(87, 213, 245, 0.15)',
                color: 'var(--primary)',
                border: '1px solid rgba(87, 213, 245, 0.4)',
                borderRadius: 6,
                padding: '4px 10px',
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.08em',
              }}
            >
              {current.mode}
            </span>
            <div style={{ fontSize: 12, color: '#F5B544', marginTop: 6, fontWeight: 600 }}>
              Dwell: {secondsLeft}s
            </div>
          </div>
        </div>

        {/* Station Metadata Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: 10,
            borderTop: '1px solid rgba(87, 213, 245, 0.12)',
            paddingTop: 12,
            fontSize: 12,
          }}
        >
          <div>
            <span style={{ color: 'var(--fg-faint)', display: 'block' }}>Callsign:</span>
            <span style={{ fontWeight: 600, color: 'var(--fg)' }}>{current.call}</span>
          </div>
          <div>
            <span style={{ color: 'var(--fg-faint)', display: 'block' }}>Transmitter Loc:</span>
            <span style={{ fontWeight: 600, color: 'var(--fg)' }}>{current.loc}</span>
          </div>
          <div>
            <span style={{ color: 'var(--fg-faint)', display: 'block' }}>Database Index:</span>
            <span style={{ fontWeight: 600, color: '#57D5F5' }}>
              Stasiun {String(current.no).padStart(2, '0')} / 62
            </span>
          </div>
        </div>
      </div>

      {/* Operator Verification & Audio Foundation */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 12,
        }}
      >
        <div
          style={{
            background: 'rgba(8, 24, 39, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 'var(--radius-sm)',
            padding: '12px 14px',
          }}
        >
          <div style={{ fontSize: 11, color: 'var(--fg-faint)', textTransform: 'uppercase', marginBottom: 6 }}>
            Verifikasi Operator (Manual)
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <span
              style={{
                fontSize: 11,
                padding: '3px 8px',
                borderRadius: 4,
                background: current.status === 'ADA SUARA' ? 'rgba(79, 229, 176, 0.2)' : 'rgba(255,255,255,0.05)',
                color: current.status === 'ADA SUARA' ? '#4fe5b0' : 'var(--fg-muted)',
                fontWeight: current.status === 'ADA SUARA' ? 700 : 500,
                border: current.status === 'ADA SUARA' ? '1px solid #4fe5b0' : '1px solid transparent',
              }}
            >
              [1] Ada Suara
            </span>
            <span
              style={{
                fontSize: 11,
                padding: '3px 8px',
                borderRadius: 4,
                background: current.status === 'TIDAK ADA SUARA' ? 'rgba(245, 181, 68, 0.2)' : 'rgba(255,255,255,0.05)',
                color: current.status === 'TIDAK ADA SUARA' ? '#F5B544' : 'var(--fg-muted)',
                fontWeight: current.status === 'TIDAK ADA SUARA' ? 700 : 500,
                border: current.status === 'TIDAK ADA SUARA' ? '1px solid #F5B544' : '1px solid transparent',
              }}
            >
              [2] Hening
            </span>
          </div>
        </div>

        <div
          style={{
            background: 'rgba(8, 24, 39, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 'var(--radius-sm)',
            padding: '12px 14px',
          }}
        >
          <div style={{ fontSize: 11, color: 'var(--fg-faint)', textTransform: 'uppercase', marginBottom: 6 }}>
            Ekspor Hasil Terstruktur
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
            <IconFileSpreadsheet style={{ width: 18, height: 18, color: '#57D5F5' }} />
            <div>
              <span style={{ fontWeight: 600, color: 'var(--fg)', display: 'block' }}>11 Kolom CSV Standard</span>
              <span style={{ fontSize: 11, color: 'var(--fg-faint)' }}>Encoding utf-8-sig</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
