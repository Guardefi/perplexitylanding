'use client'

import { motion } from 'framer-motion'

const pains = [
  'Zero-days launch faster than patch cycles',
  'Compliance reports cost $50k+ per audit',
  'Security dashboards nobody understands',
  'Quantum threats targeting legacy systems'
]

export default function PainPoints() {
  return (
    <section className="scroll-section flex items-center justify-center bg-war-room-abyss py-32 px-6">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mx-auto max-w-4xl text-center"
      >
        <h2 className="cyan-glow mb-10 font-command text-4xl md:text-5xl font-bold">
          Today's Security Experience Is Broken
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {pains.map((pain, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass-morphism p-6 rounded-lg"
            >
              <div className="flex items-start gap-4">
                <span className="mt-1 flex-shrink-0 h-3 w-3 rounded-full bg-red-500 animate-pulse" />
                <p className="text-gray-300 text-left">{pain}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
