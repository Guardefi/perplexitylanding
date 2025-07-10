'use client';
import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FloatingOrb({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const targetPosition = useRef(new THREE.Vector3());

  useFrame((state) => {
    if (!meshRef.current) return;

    // Convert mouse position to 3D space
    targetPosition.current.set(
      (mousePosition.x / window.innerWidth) * 4 - 2,
      -(mousePosition.y / window.innerHeight) * 4 + 2,
      0
    );

    // Smooth follow with spring physics
    meshRef.current.position.lerp(targetPosition.current, 0.1);
    
    // Add floating animation
    meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 2) * 0.1;
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.02;
    
    // Pulsing scale
    const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[0.3, 1]} />
      <meshStandardMaterial 
        color="#00fff7" 
        emissive="#00fff7" 
        emissiveIntensity={0.5}
        wireframe
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

// Scene component to be used inside Canvas
function CursorFollowerScene({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[2, 2, 2]} color="#00fff7" intensity={1} />
      <FloatingOrb mousePosition={mousePosition} />
    </>
  );
}

export default function CursorFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <CursorFollowerScene mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
}
