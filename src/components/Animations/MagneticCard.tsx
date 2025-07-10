'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ReactNode } from 'react'

export default function MagneticCard({ children }: { children: ReactNode }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const rx = useSpring(useTransform(y, [-75, 75], [15, -15]), { stiffness: 200, damping: 20 })
  const ry = useSpring(useTransform(x, [-75, 75], [-15, 15]), { stiffness: 200, damping: 20 })

  const handleMove = (e: React.PointerEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }

  return (
    <motion.div
      onPointerMove={handleMove}
      onPointerLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX: rx, rotateY: ry, perspective: 1000 }}
      className="relative rounded-xl glass-morphism corner-accent p-8 cursor-pointer select-none"
    >
      {children}
    </motion.div>
  )
}
