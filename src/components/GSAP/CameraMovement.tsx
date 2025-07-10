'use client';
import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsapConfig';

export default function CameraMovement() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    
    if (!scene || !camera) return;

    // Create cinematic camera movement
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scene,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        pin: true,
      }
    });

    tl.to(camera, {
      x: "20vw",
      y: "-10vh",
      scale: 1.2,
      rotationY: 15,
      duration: 1,
      ease: "power2.inOut"
    })
    .to(camera, {
      x: "-15vw", 
      y: "15vh",
      scale: 0.9,
      rotationY: -20,
      rotationX: 10,
      duration: 1,
      ease: "power2.inOut"
    })
    .to(camera, {
      x: 0,
      y: 0,
      scale: 1,
      rotationY: 0,
      rotationX: 0,
      duration: 1,
      ease: "power2.inOut"
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={sceneRef} className="h-screen relative overflow-hidden bg-gradient-to-br from-war-room-void to-war-room-abyss">
      <div 
        ref={cameraRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
      >
        <div className="w-64 h-64 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-3xl shadow-2xl">
          <div className="w-full h-full bg-black/20 rounded-3xl flex items-center justify-center backdrop-blur-sm">
            <span className="text-white text-2xl font-command cyber-glow">OBJECT</span>
          </div>
        </div>
      </div>
    </div>
  );
}
