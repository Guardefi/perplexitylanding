'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamic import to avoid SSR issues with CountUp
const CountUp = dynamic(() => import('react-countup'), { ssr: false });

export default function LiveMetrics() {
  const [metrics, setMetrics] = useState({
    threats: 2847293,
    assets: 847,
    zeroDays: 15847,
    uptime: 99.99
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        threats: prev.threats + Math.floor(Math.random() * 50),
        zeroDays: prev.zeroDays + Math.floor(Math.random() * 3)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="scroll-section bg-war-room-void py-28" id="metrics">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-command font-bold cyan-glow mb-6">
            Live Defense Metrics
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Real-time performance data from the quantum battlefield
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="glass-morphism text-center corner-accent p-8 transition hover:scale-105"
          >
            <div className="cyan-glow mb-2 font-command text-4xl">
              <CountUp end={metrics.threats} duration={2} separator="," />
            </div>
            <div className="text-sm text-gray-400 mb-2">Threats Neutralized</div>
            <div className="text-xs text-green-400 font-bold">↗ +12.3%</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="glass-morphism text-center corner-accent p-8 transition hover:scale-105"
          >
            <div className="cyan-glow mb-2 font-command text-4xl">
              $<CountUp end={metrics.assets} duration={2} />B
            </div>
            <div className="text-sm text-gray-400 mb-2">Assets Protected</div>
            <div className="text-xs text-green-400 font-bold">↗ +98.7%</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="glass-morphism text-center corner-accent p-8 transition hover:scale-105"
          >
            <div className="cyan-glow mb-2 font-command text-4xl">
              <CountUp end={metrics.zeroDays} duration={2} separator="," />
            </div>
            <div className="text-sm text-gray-400 mb-2">Zero-Days Stopped</div>
            <div className="text-xs text-green-400 font-bold">↗ +156%</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="glass-morphism text-center corner-accent p-8 transition hover:scale-105"
          >
            <div className="cyan-glow mb-2 font-command text-4xl">
              <CountUp end={metrics.uptime} duration={2} decimals={2} />%
            </div>
            <div className="text-sm text-gray-400 mb-2">System Uptime</div>
            <div className="text-xs text-green-400 font-bold">✓ SLA Met</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
