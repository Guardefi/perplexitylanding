'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Navigation() {
  return (
    <header className="fixed top-0 left-0 z-40 w-full bg-war-room-void/60 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 pointer-events-auto">
          <span className="block h-6 w-6 rounded-full bg-cyan-400" />
          <span className="font-command text-xl tracking-wide">ScorpiusCore</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden gap-8 md:flex">
          {['Modules', 'Pricing', 'Demo'].map(t => (
            <li key={t}>
              <a
                href={`#${t.toLowerCase()}`}
                className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors"
              >
                {t}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <motion.a
          href="#cta"
          whileHover={{ scale: 1.05 }}
          className="btn-glow hidden md:inline-block rounded-lg bg-cyan-400 px-6 py-2 font-bold text-black pointer-events-auto"
        >
          Book Demo
        </motion.a>
      </nav>
    </header>
  )
}
