'use client';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ParticleSystem({ count = 5000 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null!);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      // Random sphere distribution
      const radius = Math.random() * 50 + 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Color variation
      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        colors[i * 3] = 0;
        colors[i * 3 + 1] = 1;
        colors[i * 3 + 2] = 0.97; // Cyan
      } else if (colorChoice < 0.66) {
        colors[i * 3] = 0.5;
        colors[i * 3 + 1] = 0;
        colors[i * 3 + 2] = 1; // Purple
      } else {
        colors[i * 3] = 1;
        colors[i * 3 + 1] = 1;
        colors[i * 3 + 2] = 1; // White
      }
      
      sizes[i] = Math.random() * 2 + 0.5;
    }
    
    return { positions, colors, sizes };
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    meshRef.current.rotation.y += 0.0001;
    
    // Animate individual particles
    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.getElapsedTime();
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3 + 1] += Math.sin(time + i * 0.001) * 0.001;
    }
    
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={particles.positions}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={particles.colors}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          array={particles.sizes}
          count={count}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={1}
        sizeAttenuation
        transparent
        opacity={0.6}
        vertexColors
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Wrapper component for the Canvas
function SpaceParticlesScene() {
  return <ParticleSystem />;
}

export default function SpaceParticles() {
  return (
    <div className="fixed inset-0 -z-20">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ 
          alpha: true,
          antialias: false,
          powerPreference: "high-performance"
        }}
      >
        <SpaceParticlesScene />
      </Canvas>
    </div>
  );
}
