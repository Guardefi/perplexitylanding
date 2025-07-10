'use client';
import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsapConfig';

export default function MorphingGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const items = grid.querySelectorAll('.grid-item');
    
    // Initial random positions
    gsap.set(items, {
      x: () => Math.random() * 400 - 200,
      y: () => Math.random() * 400 - 200,
      rotation: () => Math.random() * 360,
      scale: () => Math.random() * 0.5 + 0.5,
      opacity: 0
    });

    // Morph to grid layout
    ScrollTrigger.create({
      trigger: grid,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => {
        gsap.to(items, {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          stagger: {
            from: 'center',
            amount: 0.5
          }
        });
      },
      onLeaveBack: () => {
        gsap.to(items, {
          x: () => Math.random() * 400 - 200,
          y: () => Math.random() * 400 - 200,
          rotation: () => Math.random() * 360,
          scale: () => Math.random() * 0.5 + 0.5,
          opacity: 0,
          duration: 1,
          ease: 'power2.in',
          stagger: 0.05
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const gridItems = Array.from({ length: 9 }, (_, i) => ({
    id: i,
    title: `Module ${i + 1}`,
    color: `hsl(${180 + i * 20}, 70%, 60%)`
  }));

  return (
    <section className="h-screen flex items-center justify-center bg-gradient-to-b from-war-room-abyss to-war-room-void">
      <div ref={gridRef} className="grid grid-cols-3 gap-8 max-w-2xl">
        {gridItems.map(item => (
          <div
            key={item.id}
            className="grid-item w-32 h-32 rounded-lg glass-morphism p-4 flex items-center justify-center transform-gpu"
            style={{ backgroundColor: `${item.color}20` }}
          >
            <span className="text-white font-command text-sm">{item.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
