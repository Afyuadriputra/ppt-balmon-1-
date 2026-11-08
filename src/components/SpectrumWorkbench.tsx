import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconRadio, IconActivity, IconFileSpreadsheet, IconCheckCircle, IconSliders } from './Icons';
import { asset } from '../utils/asset';

interface Station {
  id: number;
  freqHz: number;
  freqKHz: number;
  mhz: string;
  name: string;
  location: string;
  power: string;
  mode: string;
  defaultStatus: 'ADA SUARA' | 'TIDAK ADA SUARA' | 'DILEWATI';
}

const STATIONS: Station[] = [
  { id: 1, freqHz: 11500000, freqKHz: 11500, mhz: '11.500', name: 'SOH Xi Wang Zhi Sheng', location: 'Miaoli, Taiwan', power: '1 kW', mode: 'AM', defaultStatus: 'ADA SUARA' },
  { id: 7, freqHz: 11610000, freqKHz: 11610, mhz: '11.610', name: 'CNR 2 Business Radio', location: 'Beijing, China', power: '150 kW', mode: 'AM', defaultStatus: 'ADA SUARA' },
  { id: 8, freqHz: 11615000, freqKHz: 11615, mhz: '11.615', name: 'JRC Radio Tamazui', location: 'Vatikan (SM Galeria)', power: '250 kW', mode: 'AM', defaultStatus: 'TIDAK ADA SUARA' },
  { id: 14, freqHz: 11665000, freqKHz: 11665, mhz: '11.665', name: 'RTM WaiLimbang FM', location: 'Kajang, Malaysia', power: '100 kW', mode: 'AM', defaultStatus: 'ADA SUARA' },
  { id: 20, freqHz: 11700000, freqKHz: 11700, mhz: '11.700', name: 'Radio France Int. (RFI)', location: 'Issoudun, Prancis', power: '500 kW', mode: 'AM', defaultStatus: 'ADA SUARA' },
  { id: 27, freqHz: 11750000, freqKHz: 11750, mhz: '11.750', name: 'Radio Voz Missionaria', location: 'Camboriu, Brasil', power: '1 kW', mode: 'AM', defaultStatus: 'DILEWATI' },
  { id: 45, freqHz: 12005000, freqKHz: 12005, mhz: '12.005', name: 'Radio Free Asia (RFA)', location: 'Agingan, Saipan', power: '250 kW', mode: 'AM', defaultStatus: 'ADA SUARA' },
  { id: 62, freqHz: 12190000, freqKHz: 12190, mhz: '12.190', name: 'Radio Rossii', location: 'Samara, Rusia', power: '250 kW', mode: 'AM', defaultStatus: 'ADA SUARA' },
];

export default function SpectrumWorkbench() {
  const [stationIdx, setStationIdx] = useState(1); // default to CNR 2 (11.610 MHz)
  const [dwellSeconds, setDwellSeconds] = useState(3);
  const [isPlaying, setIsPlaying] = useState(true);
  const [operatorChoice, setOperatorChoice] = useState<'1' | '2' | '3' | null>('1');
  const [logs, setLogs] = useState<Array<{
    timestamp: string;
    khz: number;
    stasiun: string;
    status: string;
  }>>([
    { timestamp: '10:14:02', khz: 11500, stasiun: 'SOH Xi Wang Zhi Sheng', status: 'ADA SUARA' },
    { timestamp: '10:14:06', khz: 11610, stasiun: 'CNR 2 Business Radio', status: 'ADA SUARA' },
  ]);

  const current = STATIONS[stationIdx];

  // Frequency scale min and max
  const minFreq = 11500;
  const maxFreq = 12190;
  const freqPct = ((current.freqKHz - minFreq) / (maxFreq - minFreq)) * 100;

  // Dwell countdown timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setDwellSeconds((prev) => {
        if (prev <= 1) {
          // Advance to next station
          setStationIdx((idx) => (idx + 1) % STATIONS.length);
          return 3;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleManualInput = (choice: '1' | '2' | '3') => {
    setOperatorChoice(choice);
    const statusMap = { '1': 'ADA SUARA', '2': 'TIDAK ADA SUARA', '3': 'DILEWATI' };
    const newStatus = statusMap[choice];
    
    // Append to log
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    
    setLogs((prev) => [
      { timestamp: timeStr, khz: current.freqKHz, stasiun: current.name, status: newStatus },
      ...prev.slice(0, 3),
    ]);

    // Move to next station
    setStationIdx((idx) => (idx + 1) % STATIONS.length);
    setDwellSeconds(3);
  };

  return (
    <div
      style={{
        background: 'rgba(8, 24, 39, 0.75)',
        border: '1px solid rgba(87, 213, 245, 0.25)',
        borderRadius: 'var(--radius)',
        padding: '18px 20px',
        boxShadow: '0 20px 50px -20px rgba(0,0,0,0.8)',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top Equipment Banner & CAT Status */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 10,
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Authentic Hardware Thumbnail */}
          <div
            style={{
              width: 52,
              height: 38,
              borderRadius: 6,
              overflow: 'hidden',
              border: '1px solid rgba(87, 213, 245, 0.4)',
              background: '#040d16',
              flexShrink: 0,
            }}
          >
            <img
              src={asset('/assets/balmon/radio/icom-7300.jpg')}
              alt="Icom IC-7300 Transceiver"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  color: 'var(--fg)',
                }}
              >
                ICOM IC-7300 CAT TRANSCEIVER
              </span>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  background: 'rgba(79, 229, 176, 0.15)',
                  color: '#4fe5b0',
                  padding: '2px 6px',
                  borderRadius: 4,
                  border: '1px solid rgba(79, 229, 176, 0.3)',
                }}
              >
                XML-RPC 127.0.0.1:12345
              </span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--fg-muted)', marginTop: 2 }}>
              Protokol FLRig Server · Band HF Shortwave (11.500 – 12.190 MHz)
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            style={{
              background: isPlaying ? 'rgba(87, 213, 245, 0.15)' : 'rgba(255, 255, 255, 0.08)',
              border: `1px solid ${isPlaying ? 'rgba(87, 213, 245, 0.4)' : 'rgba(255, 255, 255, 0.15)'}`,
              color: isPlaying ? '#57D5F5' : 'var(--fg-muted)',
              borderRadius: 6,
              padding: '4px 10px',
              fontSize: 11,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: isPlaying ? '#4fe5b0' : '#888',
              }}
            />
            {isPlaying ? 'Auto-Scan Aktif' : 'Pause'}
          </button>
        </div>
      </div>

      {/* Main Workbench Display: VFO Readout + Details */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: 16,
          alignItems: 'center',
          background: 'rgba(4, 13, 22, 0.85)',
          border: '1px solid rgba(87, 213, 245, 0.2)',
          borderRadius: 8,
          padding: '14px 18px',
        }}
      >
        {/* Left: Big Digital VFO Readout */}
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--fg-faint)', textTransform: 'uppercase' }}>
              VFO-A FREKUENSI
            </span>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                background: 'rgba(87, 213, 245, 0.15)',
                color: '#57D5F5',
                padding: '1px 6px',
                borderRadius: 3,
              }}
            >
              MODE: {current.mode}
            </span>
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: 'clamp(28px, 3.8vw, 42px)',
              fontWeight: 700,
              color: '#57D5F5',
              letterSpacing: '0.04em',
              lineHeight: 1.1,
              marginTop: 4,
            }}
          >
            {current.mhz} <span style={{ fontSize: 18, color: 'var(--fg-muted)' }}>MHz</span>
          </div>
          <div style={{ fontSize: 11, color: 'var(--fg-faint)', marginTop: 2, fontFamily: 'monospace' }}>
            {current.freqHz.toLocaleString('id-ID')} Hz · Band 25 Meter
          </div>
        </div>

        {/* Right: Station Data & Live Dwell Countdown */}
        <div
          style={{
            borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
            paddingLeft: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--fg-faint)' }}>
            STASIUN {current.id} DARI 62
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#F7FAFC' }}>
            {current.name}
          </div>
          <div style={{ fontSize: 11, color: 'var(--fg-muted)' }}>
            Tx: {current.location} · {current.power}
          </div>

          {/* Dwell bar */}
          <div style={{ marginTop: 4 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--fg-faint)', marginBottom: 3 }}>
              <span>Dwell Observation</span>
              <span style={{ color: '#F5B544', fontWeight: 700 }}>{dwellSeconds}s tersisa</span>
            </div>
            <div style={{ width: '100%', height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden' }}>
              <motion.div
                key={`${current.id}-${dwellSeconds}`}
                initial={{ width: `${(dwellSeconds / 3) * 100}%` }}
                animate={{ width: `${((dwellSeconds - 1) / 3) * 100}%` }}
                transition={{ duration: 1, ease: 'linear' }}
                style={{ height: '100%', background: '#F5B544' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Frequency Dial / Scale Ruler */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--fg-faint)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Spektrum 11.500 – 12.190 MHz (62 Titik Frekuensi ITU)
          </span>
          <span style={{ fontSize: 10, color: 'var(--fg-faint)' }}>
            Posisi needle: {current.mhz} MHz
          </span>
        </div>

        {/* Scale track */}
        <div
          style={{
            position: 'relative',
            height: 36,
            background: 'rgba(4, 13, 22, 0.9)',
            border: '1px solid rgba(87, 213, 245, 0.2)',
            borderRadius: 6,
            overflow: 'hidden',
          }}
        >
          {/* Tick lines */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              padding: '0 8px 4px',
            }}
          >
            {STATIONS.map((st, i) => {
              const pos = ((st.freqKHz - minFreq) / (maxFreq - minFreq)) * 100;
              const isSelected = i === stationIdx;
              return (
                <div
                  key={st.id}
                  onClick={() => {
                    setStationIdx(i);
                    setDwellSeconds(3);
                  }}
                  style={{
                    position: 'absolute',
                    left: `${pos}%`,
                    bottom: 0,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      width: isSelected ? 2 : 1,
                      height: isSelected ? 20 : 10,
                      background: isSelected ? '#57D5F5' : 'rgba(255, 255, 255, 0.2)',
                    }}
                  />
                  <span
                    style={{
                      fontSize: 8,
                      color: isSelected ? '#57D5F5' : 'var(--fg-faint)',
                      fontFamily: 'monospace',
                      marginTop: 2,
                    }}
                  >
                    {st.mhz}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Active Red Tuning Needle */}
          <motion.div
            animate={{ left: `${freqPct}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              width: 2,
              background: '#FF4D4D',
              boxShadow: '0 0 8px #FF4D4D',
              zIndex: 3,
            }}
          />
        </div>
      </div>

      {/* Operator Verification (Human-in-the-Loop) & Live CSV Log Strip */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: 14,
          alignItems: 'stretch',
        }}
      >
        {/* Left: Operator Verification Buttons */}
        <div
          style={{
            background: 'rgba(4, 13, 22, 0.65)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 6,
            padding: '10px 14px',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--fg-faint)', textTransform: 'uppercase' }}>
            Verifikasi Operator (Human-in-the-Loop input):
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            <button
              onClick={() => handleManualInput('1')}
              style={{
                background: operatorChoice === '1' ? 'rgba(79, 229, 176, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                border: `1px solid ${operatorChoice === '1' ? '#4fe5b0' : 'rgba(255, 255, 255, 0.1)'}`,
                color: operatorChoice === '1' ? '#4fe5b0' : 'var(--fg)',
                borderRadius: 6,
                padding: '6px 8px',
                fontSize: 11,
                fontWeight: 700,
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              [1] Ada Suara
            </button>
            <button
              onClick={() => handleManualInput('2')}
              style={{
                background: operatorChoice === '2' ? 'rgba(245, 181, 68, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                border: `1px solid ${operatorChoice === '2' ? '#F5B544' : 'rgba(255, 255, 255, 0.1)'}`,
                color: operatorChoice === '2' ? '#F5B544' : 'var(--fg)',
                borderRadius: 6,
                padding: '6px 8px',
                fontSize: 11,
                fontWeight: 700,
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              [2] Hening
            </button>
            <button
              onClick={() => handleManualInput('3')}
              style={{
                background: operatorChoice === '3' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                border: `1px solid ${operatorChoice === '3' ? '#888' : 'rgba(255, 255, 255, 0.1)'}`,
                color: operatorChoice === '3' ? '#ccc' : 'var(--fg-muted)',
                borderRadius: 6,
                padding: '6px 8px',
                fontSize: 11,
                fontWeight: 700,
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              [3] Lewati
            </button>
          </div>
        </div>

        {/* Right: Live CSV Logging Preview */}
        <div
          style={{
            background: 'rgba(4, 13, 22, 0.65)',
            border: '1px solid rgba(87, 213, 245, 0.2)',
            borderRadius: 6,
            padding: '10px 14px',
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, fontWeight: 700, color: 'var(--primary)' }}>
              <IconFileSpreadsheet style={{ width: 12, height: 12 }} />
              <span>hasil_pemindaian.csv (11 Kolom)</span>
            </div>
            <span style={{ fontSize: 9, color: 'var(--fg-faint)', fontFamily: 'monospace' }}>UTF-8-SIG</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontFamily: 'monospace', fontSize: 10 }}>
            {logs.slice(0, 2).map((log, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  background: 'rgba(255, 255, 255, 0.03)',
                  padding: '3px 6px',
                  borderRadius: 3,
                  color: 'var(--fg-muted)',
                }}
              >
                <span>{log.timestamp} · {log.khz} kHz</span>
                <span style={{ color: log.status === 'ADA SUARA' ? '#4fe5b0' : '#F5B544', fontWeight: 600 }}>
                  {log.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
