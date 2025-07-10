'use client';
import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsapConfig';

interface GlitchTextProps {
  children: string;
  className?: string;
  intensity?: number;
}

export default function GlitchText({ children, className = '', intensity = 1 }: GlitchTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const glitchRef = useRef<HTMLSpanElement>(null);
  const glitch2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const text = textRef.current;
    const glitch = glitchRef.current;
    const glitch2 = glitch2Ref.current;
    if (!text || !glitch || !glitch2) return;

    const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const originalText = children;
    
    const glitchEffect = () => {
      const glitchText = originalText
        .split('')
        .map(char => Math.random() < 0.1 * intensity ? chars[Math.floor(Math.random() * chars.length)] : char)
        .join('');
      
      glitch.textContent = glitchText;
      glitch2.textContent = glitchText;
      
      gsap.set(glitch, {
        x: (Math.random() - 0.5) * 4 * intensity,
        y: (Math.random() - 0.5) * 2 * intensity,
        opacity: 0.8
      });
      
      gsap.set(glitch2, {
        x: (Math.random() - 0.5) * 4 * intensity,
        y: (Math.random() - 0.5) * 2 * intensity,
        opacity: 0.8
      });
      
      gsap.to([glitch, glitch2], {
        opacity: 0,
        duration: 0.1,
        onComplete: () => {
          glitch.textContent = originalText;
          glitch2.textContent = originalText;
          gsap.set([glitch, glitch2], { x: 0, y: 0 });
        }
      });
    };

    const interval = setInterval(glitchEffect, 3000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, [children, intensity]);

  return (
    <span className={`relative inline-block ${className}`}>
      <span ref={textRef}>{children}</span>
      <span 
        ref={glitchRef}
        className="absolute inset-0 text-red-500 mix-blend-multiply"
        style={{ filter: 'blur(0.5px)' }}
      >
        {children}
      </span>
      <span 
        ref={glitch2Ref}
        className="absolute inset-0 text-cyan-400 mix-blend-screen"
        style={{ filter: 'blur(0.5px)' }}
      >
        {children}
      </span>
    </span>
  );
}
