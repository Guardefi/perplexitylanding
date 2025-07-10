'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  
  const clip = useTransform(scrollYProgress, [0, 1], ['circle(0% at 50% 50%)', 'circle(150% at 50% 50%)']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-war-room-void to-war-room-abyss"
    >
      {/* Animated portal overlay */}
      <motion.div
        style={{ clipPath: clip, scale }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#00fff7_0%,_#0a0a0a_80%)]"
      />

      {/* Text content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          className="max-w-4xl font-command text-6xl md:text-7xl lg:text-8xl cyan-glow mb-8"
        >
          Fortune-500 Defense<br />
          Made <span className="text-cyan-400">Beautiful</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="mt-6 max-w-2xl text-lg md:text-xl text-gray-300 mb-12"
        >
          Medieval grit meets alien tech. ScorpiusCore neutralizes threats before they exist – now in an interface executives actually love.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <a
            href="#modules"
            className="btn-glow rounded-lg bg-cyan-400 px-8 py-4 font-bold text-black transition hover:bg-cyan-300"
          >
            Explore Modules
          </a>
          <a
            href="#cta"
            className="rounded-lg border-2 border-cyan-400 px-8 py-4 font-bold text-cyan-400 transition hover:bg-cyan-400 hover:text-black"
          >
            Book Demo
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400"
      >
        <span className="block mb-2 text-xs font-terminal uppercase tracking-wide">Scroll to Continue</span>
        <div className="h-10 w-px bg-gray-400 animate-pulse-glow mx-auto" />
      </motion.div>
    </section>
  );
}
