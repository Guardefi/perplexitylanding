'use client';
import { useEffect } from 'react';
import { gsap } from '@/lib/gsapConfig';

export function usePageTransitions() {
  useEffect(() => {
    // Wipe transition effect
    const createWipeTransition = () => {
      const wipe = document.createElement('div');
      wipe.className = 'fixed inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 z-50';
      wipe.style.clipPath = 'polygon(0 0, 0 0, 0 100%, 0 100%)';
      document.body.appendChild(wipe);

      const tl = gsap.timeline({
        onComplete: () => wipe.remove()
      });
      
      tl.to(wipe, {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        duration: 0.8,
        ease: 'power4.inOut'
      })
      .to(wipe, {
        clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
        duration: 0.8,
        ease: 'power4.inOut',
        delay: 0.2
      });
    };

    // Radial reveal transition
    const createRadialTransition = (x: number, y: number) => {
      const overlay = document.createElement('div');
      overlay.className = 'fixed inset-0 bg-war-room-void z-50';
      overlay.style.clipPath = `circle(0px at ${x}px ${y}px)`;
      document.body.appendChild(overlay);

      gsap.to(overlay, {
        clipPath: `circle(${Math.max(window.innerWidth, window.innerHeight) * 1.5}px at ${x}px ${y}px)`,
        duration: 1.2,
        ease: 'power4.out',
        onComplete: () => overlay.remove()
      });
    };

    // Glitch transition
    const createGlitchTransition = () => {
      const glitchContainer = document.createElement('div');
      glitchContainer.className = 'fixed inset-0 z-50 pointer-events-none';
      
      for (let i = 0; i < 10; i++) {
        const glitchBar = document.createElement('div');
        glitchBar.className = 'absolute w-full bg-cyan-400 mix-blend-screen';
        glitchBar.style.height = `${Math.random() * 10 + 5}%`;
        glitchBar.style.top = `${Math.random() * 100}%`;
        glitchBar.style.opacity = '0';
        glitchContainer.appendChild(glitchBar);
        
        gsap.to(glitchBar, {
          opacity: Math.random(),
          x: `${(Math.random() - 0.5) * 100}%`,
          duration: 0.1,
          repeat: 5,
          yoyo: true,
          ease: 'none',
          delay: Math.random() * 0.2
        });
      }
      
      document.body.appendChild(glitchContainer);
      
      setTimeout(() => glitchContainer.remove(), 1000);
    };

    return { createWipeTransition, createRadialTransition, createGlitchTransition };
  }, []);
}
