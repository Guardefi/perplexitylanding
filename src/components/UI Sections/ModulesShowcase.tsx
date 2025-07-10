'use client';
import { motion } from 'framer-motion';
import MagneticCard from '@/components/Animations/MagneticCard';

const modules = [
  {
    icon: '🐝',
    name: 'Hive Alert',
    pitch: 'They won\'t know they\'ve been flagged—until the funds evaporate.',
    firepower: 'Real-time bait contracts, ML threat detection, gas-pattern sniping, private mempool mirroring.',
    uptime: '99.99%',
    response: '<100ms',
    specs: [
      'Sub-millisecond detection',
      'Private mempool monitoring',
      'ML threat classification',
      'Automated honeypot deployment'
    ]
  },
  {
    icon: '🧬',
    name: 'Bytecode Similarity Engine',
    pitch: 'Copy-paste devs get publicly executed.',
    firepower: 'AST diffing, opcode graph clustering, zero-day clone detection, exploit-trail heat-maps.',
    uptime: '99.97%',
    response: '<50ms',
    specs: [
      'AST differential analysis',
      'Opcode graph clustering',
      'Zero-day clone detection',
      'Exploit trail mapping'
    ]
  },
  {
    icon: '🤖',
    name: 'AI Trading Bot',
    pitch: 'Front-runs the frontrunners.',
    firepower: 'Sub-100ms mempool scan (Rust), ML profit classifier ≈95%, flash-loan executor integration.',
    uptime: '99.98%',
    response: '<25ms',
    specs: [
      'Rust-powered mempool scanning',
      '95% ML profit classification',
      'Flash-loan integration',
      'Cross-DEX arbitrage'
    ]
  },
  {
    icon: '📡',
    name: 'Mempool Monitoring',
    pitch: 'See the strike before the attacker clicks send.',
    firepower: 'Multi-chain feed (ETH/BSC/Arb/Polygon), toxic-bundle radar, whale-move tracker.',
    uptime: '99.99%',
    response: '<15s',
    specs: [
      'Multi-chain monitoring',
      'Toxic bundle detection',
      'Whale movement tracking',
      'Real-time pre-alerts'
    ]
  },
  {
    icon: '🌉',
    name: 'Cross-Chain Bridge Network',
    pitch: 'Bridge hacks get smothered in-flight.',
    firepower: 'Liquidity leak radar, validator-quorum checks, emergency auto-pause protocols.',
    uptime: '99.96%',
    response: '<200ms',
    specs: [
      'Liquidity leak detection',
      'Validator quorum monitoring',
      'Emergency pause protocols',
      'Cross-chain health scoring'
    ]
  },
  {
    icon: '🔐',
    name: 'Wallet Guard',
    pitch: 'Approve a token, get drained? Not on our watch.',
    firepower: 'Infinite-approval detector, proxy-risk scoring, one-click revocation.',
    uptime: '99.99%',
    response: '<10ms',
    specs: [
      'Infinite approval detection',
      'Proxy risk assessment',
      'One-click revocation',
      'Insurance integration'
    ]
  }
];

export default function ModulesShowcase() {
  return (
    <section className="relative py-32 px-8 z-20" id="modules">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-command font-bold cyan-glow mb-6">
            Under-the-Hood Firepower
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Each module is a weapon forged in the quantum fires of cybersecurity excellence. Medieval precision meets alien technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((module, index) => (
            <motion.div
              key={module.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1,
                ease: [0.23, 1, 0.32, 1] 
              }}
              viewport={{ once: true }}
            >
              <MagneticCard>
                <div className="h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-4xl">{module.icon}</div>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-cyan-400/20 text-cyan-400 text-xs rounded font-terminal">
                        ACTIVE
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-command font-bold text-white mb-3">{module.name}</h3>
                  <p className="text-cyan-300 text-sm mb-4 italic">"{module.pitch}"</p>

                  <div className="bg-war-room-void/50 rounded-lg p-4 mb-4">
                    <h4 className="text-xs font-terminal text-cyan-400 mb-2 uppercase tracking-wide">
                      Combat Specifications
                    </h4>
                    <p className="text-xs text-gray-300 leading-relaxed">{module.firepower}</p>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-xs font-terminal text-cyan-400 mb-2 uppercase tracking-wide">
                      Technical Arsenal
                    </h4>
                    <ul className="space-y-1">
                      {module.specs.map((spec, i) => (
                        <li key={i} className="flex items-center text-xs text-gray-300">
                          <div className="w-1 h-1 bg-cyan-400 rounded-full mr-2 animate-pulse-glow"></div>
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-cyan-400/20">
                    <div className="text-center">
                      <div className="text-lg font-command text-cyan-400">{module.uptime}</div>
                      <div className="text-xs text-gray-400">Uptime SLA</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-command text-cyan-400">{module.response}</div>
                      <div className="text-xs text-gray-400">Response Time</div>
                    </div>
                  </div>
                </div>
              </MagneticCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
