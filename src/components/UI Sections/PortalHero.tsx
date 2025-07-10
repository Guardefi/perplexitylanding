'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'

export default function PortalHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const portalScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 2])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  
  return (
    <section ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Portal Background */}
        <motion.div
          style={{
            scale: portalScale,
            opacity
          }}
          className="absolute inset-0 bg-gradient-radial from-cyber-cyan-bright/20 via-transparent to-transparent"
        />
        
        {/* Content */}
        <motion.div
          style={{ opacity }}
          className="relative z-10 text-center max-w-4xl mx-auto px-6"
        >
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-command text-5xl md:text-7xl font-bold mb-6 cyber-glow-intense"
          >
            Enter the War Room
          </motion.h1>
          
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 font-body"
          >
            Fortune 500-grade quantum threat detection meets alien technology aesthetics
          </motion.p>
          
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/login"
              className="px-8 py-4 bg-cyber-cyan-bright hover:bg-cyber-cyan-intense text-war-room-void font-command font-bold rounded-lg transition-all hover:shadow-xl hover:shadow-cyber-cyan-bright/50 hover:scale-105"
            >
              Launch Platform
            </Link>
            <Link
              href="#demo"
              className="px-8 py-4 border-2 border-cyber-cyan-bright text-cyber-cyan-bright hover:bg-cyber-cyan-bright hover:text-war-room-void font-command font-bold rounded-lg transition-all"
            >
              View Demo
            </Link>
          </motion.div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-cyber-cyan-bright rounded-full flex justify-center">
            <div className="w-1 h-3 bg-cyber-cyan-bright rounded-full mt-2 animate-bounce" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
