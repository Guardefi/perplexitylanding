'use client';
import { useScrollSync } from '@/hooks/useScrollSync';
import { motion, AnimatePresence } from 'framer-motion';

const sections = [
  {
    title: 'ScorpiusCore',
    subtitle: 'The Next-Gen Cyber Defense Engine',
    description: 'A living, breathing core of wireframe intelligence and pulsing quantum energy. The heart of your medieval high-tech alien war room.',
    align: 'center'
  },
  {
    title: 'Quantum Threat Detection',
    subtitle: 'See the Unseen',
    description: 'AI-powered, zero-latency threat recognition that maps every anomaly and shadow, instantly neutralizing attacks before they manifest.',
    align: 'left'
  },
  {
    title: 'Adaptive Defense Layers',
    subtitle: 'Multi-Protocol. Multi-Chain. Multi-Reality.',
    description: 'Dynamic energy shields and protocol firewalls that adapt in real-time to the evolving threatscape across all blockchain networks.',
    align: 'right'
  },
  {
    title: 'Enterprise Command',
    subtitle: 'Total Control. Infinite Insight.',
    description: 'Executive dashboards, compliance automation, and instant incident response. Everything you need for Fortune 500-grade security management.',
    align: 'center'
  },
];

export default function OverlayCards() {
  const scroll = useScrollSync();
  const active = Math.floor(scroll * (sections.length - 1) + 0.5);

  return (
    <div className="pointer-events-none fixed inset-0 flex flex-col items-center justify-center z-10">
      {sections.map((sec, i) => (
        <AnimatePresence key={i} mode="wait">
          {active === i && (
            <motion.div
              initial={{ opacity: 0, y: 80, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -80, scale: 0.95 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              style={{
                position: 'absolute',
                top: '50%',
                left: sec.align === 'left' ? '8%' : sec.align === 'right' ? 'auto' : '50%',
                right: sec.align === 'right' ? '8%' : 'auto',
                transform: sec.align === 'center'
                  ? 'translate(-50%, -50%)'
                  : 'translateY(-50%)',
                textAlign: sec.align as 'left' | 'center' | 'right',
                maxWidth: 600,
                width: '90vw',
                zIndex: 100,
                pointerEvents: 'none'
              }}
            >
              <div className="glass-morphism rounded-xl p-8 shadow-lg corner-accent">
                <h1 className="text-5xl md:text-7xl font-command font-bold cyan-glow mb-4">
                  {sec.title}
                </h1>
                <h2 className="text-2xl md:text-3xl text-cyan-400 mb-4">
                  {sec.subtitle}
                </h2>
                <p className="text-lg md:text-xl text-gray-200">
                  {sec.description}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      ))}
    </div>
  );
}
