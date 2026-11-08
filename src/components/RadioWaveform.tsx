import { motion, useReducedMotion } from 'framer-motion';

export default function RadioWaveform({
  className = '',
  height = 100,
  opacity = 0.8,
}: {
  className?: string;
  height?: number;
  opacity?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <div
      className={`relative w-full overflow-hidden pointer-events-none ${className}`}
      style={{ height, opacity }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 100"
        fill="none"
        preserveAspectRatio="none"
        style={{ width: '100%', height: '100%' }}
      >
        <defs>
          <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2186C7" stopOpacity="0.1" />
            <stop offset="35%" stopColor="#57D5F5" stopOpacity="0.9" />
            <stop offset="65%" stopColor="#38B6E8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#2186C7" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="amberGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F5B544" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#F5B544" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#F5B544" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Carrier Wave 1 - Primary Spectrum Cyan with subtle floating motion */}
        <motion.path
          d="M0,50 Q150,15 300,50 T600,50 T900,50 T1200,50"
          stroke="url(#cyanGrad)"
          strokeWidth="2.5"
          fill="none"
          animate={
            reduce
              ? undefined
              : {
                  y: [-4, 4, -4],
                  opacity: [0.7, 1, 0.7],
                }
          }
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Carrier Wave 2 - Higher Frequency Harmonics */}
        <motion.path
          d="M0,50 Q75,30 150,50 T300,50 T450,50 T600,50 T750,50 T900,50 T1050,50 T1200,50"
          stroke="rgba(87, 213, 245, 0.45)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          fill="none"
          animate={
            reduce
              ? undefined
              : {
                  y: [3, -3, 3],
                  opacity: [0.5, 0.9, 0.5],
                }
          }
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Carrier Wave 3 - Signal Amber Pulse */}
        <motion.path
          d="M0,50 Q200,25 400,50 T800,50 T1200,50"
          stroke="url(#amberGrad)"
          strokeWidth="1.8"
          fill="none"
          animate={
            reduce
              ? undefined
              : {
                  y: [-3, 3, -3],
                  opacity: [0.4, 0.8, 0.4],
                }
          }
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Center RF Carrier Line */}
        <line
          x1="0"
          y1="50"
          x2="1200"
          y2="50"
          stroke="rgba(87, 213, 245, 0.2)"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}
