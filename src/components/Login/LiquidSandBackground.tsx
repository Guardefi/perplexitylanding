'use client'

import { useEffect, useRef } from 'react'

export default function LiquidSandBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      radius: number
    }> = []
    
    // Create particles
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1
      })
    }
    
    let mouseX = 0
    let mouseY = 0
    
    canvas.addEventListener('mousemove', (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    })
    
    function animate() {
      if (!ctx || !canvas) return
      
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach((particle) => {
        // Mouse interaction
        const dx = mouseX - particle.x
        const dy = mouseY - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 100) {
          const force = (100 - distance) / 100
          particle.vx -= (dx / distance) * force * 0.2
          particle.vy -= (dy / distance) * force * 0.2
        }
        
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy
        
        // Damping
        particle.vx *= 0.99
        particle.vy *= 0.99
        
        // Boundaries
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1
        
        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = '#00d4d4'
        ctx.fill()
        
        // Draw connections
        particles.forEach((otherParticle) => {
          const dx = otherParticle.x - particle.x
          const dy = otherParticle.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(0, 212, 212, ${1 - distance / 100})`
            ctx.stroke()
          }
        })
      })
      
      requestAnimationFrame(animate)
    }
    
    animate()
    
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)' }}
    />
  )
}
