'use client';
import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsapConfig';

export default function TextRevealAnimation() {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const text = textRef.current;
    if (!text) return;

    // Split text into characters for individual animation
    const chars = text.textContent?.split('') || [];
    text.innerHTML = chars.map(char => 
      `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`
    ).join('');

    const spans = text.querySelectorAll('span');

    gsap.fromTo(spans, 
      {
        y: 100,
        opacity: 0,
        rotationX: 90,
      },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.02,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: text,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="h-screen flex items-center justify-center">
      <h1 
        ref={textRef}
        className="text-6xl font-command font-bold text-white cyan-glow"
        style={{ perspective: '1000px' }}
      >
        Beautiful Scrolling
      </h1>
    </div>
  );
}
