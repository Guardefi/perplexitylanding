'use client';
import { useEffect, useRef } from 'react';

export default function LiquidMorphing() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const animate = () => {
      time += 0.01;
      
      ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create multiple liquid blobs
      const blobs = [
        { x: 0.3, y: 0.4, size: 0.3, speed: 1.2, color: '#00fff7' },
        { x: 0.7, y: 0.6, size: 0.25, speed: 0.8, color: '#8844ff' },
        { x: 0.5, y: 0.2, size: 0.2, speed: 1.5, color: '#ff4488' }
      ];

      blobs.forEach(blob => {
        const x = canvas.width * (blob.x + Math.sin(time * blob.speed) * 0.1);
        const y = canvas.height * (blob.y + Math.cos(time * blob.speed * 0.7) * 0.1);
        const radius = Math.min(canvas.width, canvas.height) * blob.size;

        // Create morphing shape
        ctx.beginPath();
        
        for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
          const xNoise = Math.sin(angle * 5 + time) * 20;
          const yNoise = Math.cos(angle * 3 + time) * 20;
          const r = radius + Math.sin(angle * 4 + time * 2) * 30;
          
          const px = x + Math.cos(angle) * r + xNoise;
          const py = y + Math.sin(angle) * r + yNoise;
          
          if (angle === 0) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }
        
        ctx.closePath();
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, `${blob.color}40`);
        gradient.addColorStop(0.5, `${blob.color}20`);
        gradient.addColorStop(1, `${blob.color}00`);
        
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-30 opacity-30"
      style={{ filter: 'blur(40px)' }}
    />
  );
}
