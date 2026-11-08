import { useState } from 'react';
import CodeWindow from './CodeWindow';
import { IconTerminal, IconCode } from './Icons';

const PYTHON_CODE = `# monotoring.py — Otomasi Pemindaian Frekuensi Balmon Pekanbaru
import xmlrpc.client, time, csv
from datetime import datetime

# 1. Inisialisasi koneksi XML-RPC ke FLRig CAT Server
FLRIG_URL = "http://127.0.0.1:12345"
flrig = xmlrpc.client.ServerProxy(FLRIG_URL, allow_none=True)

# 2. Pemindaian semi-otomatis 62 entri stasiun gelombang pendek
for indeks, stasiun in enumerate(daftar_stasiun, start=1):
    mhz = stasiun["freq_hz"] / 1_000_000
    
    # Tuning frekuensi VFO-A & mode operasi radio AM
    flrig.rig.set_vfoA(float(stasiun["freq_hz"]))
    time.sleep(0.2)
    flrig.rig.set_mode(stasiun["mode"])
    
    # Dwell time 3 detik untuk observasi siaran langsung
    for sisa in range(DURASI, 0, -1):
        time.sleep(1)
        
    # Verifikasi operator manual (Human-in-the-Loop)
    pilihan = input("Apakah ada suara? (1: Ada, 2: Tidak, 3: Lewati): ")
    if pilihan == "1":
        catatan["status"] = "ADA SUARA"
    elif pilihan == "2":
        catatan["status"] = "TIDAK ADA SUARA"
    else:
        catatan["status"] = "TIDAK DIKETAHUI"
        
    hasil.append(catatan)

# 3. Ekspor hasil pemindaian ke CSV (11 kolom standar SDPPI)
simpan_csv(hasil, "hasil_pemindaian.csv")`;

const PSEUDOCODE = `// Pseudocode Alur Kerja Otomasi Monitoring Frekuensi Radio
START
  1. Inisialisasi koneksi FLRig via XML-RPC (127.0.0.1:12345)
  2. Verifikasi kesiapan transceiver CAT dan input audio
  
  3. UNTUK SETIAP stasiun DARI 62 entri stasiun:
       a. Kirim perintah set_vfoA(freq_hz) ke transceiver
       b. Kirim perintah set_mode(mode_am) ke transceiver
       c. Tunggu jeda dengar selama 3 detik (Dwell Time)
       d. Operator memasukkan hasil observasi siaran:
          - [1] "ADA SUARA" (siaran terdeteksi)
          - [2] "TIDAK ADA SUARA" (hening / noise)
          - [3] "TIDAK DIKETAHUI" (dilewati)
       e. Tambahkan catatan ke daftar rekaman sementara
       
  4. Simpan seluruh rekaman ke "hasil_pemindaian.csv"
     - Format UTF-8-SIG (11 parameter terstandarisasi)
END`;

export default function PythonShowcase() {
  const [tab, setTab] = useState<'python' | 'pseudo'>('python');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {/* Tab Switcher */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            onClick={() => setTab('python')}
            style={{
              background: tab === 'python' ? 'rgba(87, 213, 245, 0.15)' : 'transparent',
              border: `1px solid ${tab === 'python' ? 'rgba(87, 213, 245, 0.4)' : 'transparent'}`,
              color: tab === 'python' ? '#57D5F5' : 'var(--fg-muted)',
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
            <IconTerminal style={{ width: 13, height: 13 }} />
            <span>Python Source (monotoring.py)</span>
          </button>
          <button
            onClick={() => setTab('pseudo')}
            style={{
              background: tab === 'pseudo' ? 'rgba(87, 213, 245, 0.15)' : 'transparent',
              border: `1px solid ${tab === 'pseudo' ? 'rgba(87, 213, 245, 0.4)' : 'transparent'}`,
              color: tab === 'pseudo' ? '#57D5F5' : 'var(--fg-muted)',
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
            <IconCode style={{ width: 13, height: 13 }} />
            <span>Alur Pseudocode</span>
          </button>
        </div>

        <span style={{ fontSize: 11, color: 'var(--fg-faint)', fontFamily: 'monospace' }}>
          {tab === 'python' ? 'XML-RPC CAT Control' : '4 Tahap Eksekusi'}
        </span>
      </div>

      {/* Code Display */}
      <CodeWindow
        title={tab === 'python' ? 'automation/monotoring.py' : 'ALUR_LOGIKA.md'}
        highlight={tab === 'python' ? [9, 10, 14, 18, 20] : [5, 6, 7]}
        code={tab === 'python' ? PYTHON_CODE : PSEUDOCODE}
      />
    </div>
  );
}
