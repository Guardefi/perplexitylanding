'use client';
import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Points, PointMaterial } from '@react-three/drei';

// Generate star positions with realistic clustering
function generateStarPositions(count = 9000, radius = 120) {
  const positions = [];
  const colors = [];
  
  for (let i = 0; i < count; i++) {
    const r = Math.abs((Math.random() + Math.random() + Math.random()) / 3) * radius;
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    
    positions.push(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi)
    );
    
    // Star color variation (blue to white to yellow)
    const temp = Math.random();
    if (temp < 0.3) {
      colors.push(0.7, 0.8, 1.0); // Blue stars
    } else if (temp < 0.8) {
      colors.push(1.0, 1.0, 1.0); // White stars
    } else {
      colors.push(1.0, 0.9, 0.7); // Yellow/orange stars
    }
  }
  
  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors)
  };
}

export function AnimatedStars() {
  const ref = useRef<THREE.Points>(null);
  const { positions, colors } = useMemo(() => generateStarPositions(12000, 150), []);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.0001;
      ref.current.rotation.x += 0.00003;
      
      const material = ref.current.material as THREE.PointsMaterial;
      material.opacity = 0.7 + 0.1 * Math.sin(state.clock.getElapsedTime() * 0.5);
    }
  });

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={colors.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.8}
        sizeAttenuation
        transparent
        opacity={0.8}
        vertexColors
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Animated meteor system
function randomMeteor() {
  const angle = Math.random() * 2 * Math.PI;
  const radius = 120 + Math.random() * 40;
  const speed = 0.5 + Math.random() * 1.2;
  
  return {
    x: Math.cos(angle) * radius,
    y: Math.random() * 60 - 30,
    z: Math.sin(angle) * radius,
    dx: -Math.cos(angle) * speed,
    dy: -0.2 - Math.random() * 0.3,
    dz: -Math.sin(angle) * speed,
    life: 0,
    maxLife: 100 + Math.random() * 80,
    tail: 2 + Math.random() * 3,
    brightness: 0.8 + Math.random() * 0.4,
  };
}

export function Meteors({ count = 8 }) {
  const [meteors] = useState(() => Array.from({ length: count }, randomMeteor));
  
  useFrame(() => {
    for (let meteor of meteors) {
      meteor.x += meteor.dx;
      meteor.y += meteor.dy;
      meteor.z += meteor.dz;
      meteor.life++;
      
      if (meteor.life > meteor.maxLife) {
        Object.assign(meteor, randomMeteor());
      }
    }
  });

  return (
    <>
      {meteors.map((m, i) => (
        <group key={i} position={[m.x, m.y, m.z]}>
          <mesh>
            <sphereGeometry args={[0.15, 8, 8]} />
            <meshBasicMaterial 
              color="#ffffff" 
              emissive="#ffeeaa" 
              emissiveIntensity={m.brightness}
            />
          </mesh>
          
          <mesh
            position={[m.dx * -m.tail * 0.5, m.dy * -m.tail * 0.5, m.dz * -m.tail * 0.5]}
            lookAt={[m.x + m.dx, m.y + m.dy, m.z + m.dz]}
          >
            <cylinderGeometry args={[0.08, 0.02, m.tail, 8]} />
            <meshBasicMaterial 
              color="#ffddaa" 
              transparent 
              opacity={0.7 * m.brightness}
              emissive="#ffaa44"
              emissiveIntensity={0.3}
            />
          </mesh>
          
          <mesh
            position={[m.dx * -m.tail * 0.7, m.dy * -m.tail * 0.7, m.dz * -m.tail * 0.7]}
            lookAt={[m.x + m.dx, m.y + m.dy, m.z + m.dz]}
          >
            <cylinderGeometry args={[0.12, 0.04, m.tail * 1.2, 8]} />
            <meshBasicMaterial 
              color="#ffddaa" 
              transparent 
              opacity={0.3 * m.brightness}
              emissive="#ff8844"
              emissiveIntensity={0.2}
            />
          </mesh>
        </group>
      ))}
    </>
  );
}

// Distant galaxy layer
export function DistantGalaxies() {
  const ref = useRef<THREE.Points>(null);
  
  const galaxyPositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 50; i++) {
      const radius = 200 + Math.random() * 100;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions.push(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );
    }
    return new Float32Array(positions);
  }, []);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.00005;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={galaxyPositions}
          count={galaxyPositions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={3}
        sizeAttenuation
        transparent
        opacity={0.4}
        color="#8844ff"
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Main space background component
export default function SpaceBackground() {
  return (
    <>
      <fog attach="fog" args={['#050510', 100, 200]} />
      <AnimatedStars />
      <DistantGalaxies />
      <Meteors />
    </>
  );
}