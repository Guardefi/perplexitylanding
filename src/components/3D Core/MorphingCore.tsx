'use client';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { useRef, useEffect, useState, useMemo } from 'react';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { shaderMaterial } from '@react-three/drei';
import { useScrollSync } from '@/hooks/useScrollSync';
import { useCinematicCamera } from '@/lib/useCinematicCamera';
import SpaceBackground from './SpaceBackground';



// Inner wireframe for geometric lines
function InnerWireframe() {
  const ref = useRef<THREE.LineSegments>(null!);
  
  useEffect(() => {
    const geo = new THREE.SphereGeometry(2.2, 64, 64);
    const edges = new THREE.EdgesGeometry(geo, 1);
    ref.current.geometry = edges;
  }, []);
  
  return (
    <lineSegments ref={ref}>
      <bufferGeometry />
      <lineBasicMaterial color="#00fff7" linewidth={1} />
    </lineSegments>
  );
}

function PetalBloom({ scroll }: { scroll: number }) {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.004 + scroll * 0.02;
    }
  });

  return (
    <mesh ref={mesh} scale={1.18}>
      <sphereGeometry args={[2.2, 128, 128]} />
      <meshBasicMaterial 
        color="#00fff7" 
        transparent 
        opacity={0.3 + scroll * 0.2}
        wireframe
      />
      <InnerWireframe />
    </mesh>
  );
}

function WireframeSphere({ scroll }: { scroll: number }) {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.005 + scroll * 0.04;
      mesh.current.position.x = Math.sin(scroll * Math.PI * 2) * 0.3;
      mesh.current.position.y = Math.cos(scroll * Math.PI * 2) * 0.2;
    }
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshBasicMaterial wireframe color="#00fff7" transparent opacity={0.8} />
    </mesh>
  );
}

function CameraController() {
  const scroll = useScrollSync();
  useCinematicCamera(scroll, 0.12);
  return null;
}

export default function MorphingCore() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.ShaderMaterial>(null!);

  // Create shader material with properly initialized uniforms
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        morphProgress: { value: 0 },
        color1: { value: new THREE.Color('#00fff7') },
        color2: { value: new THREE.Color('#ff00ff') },
        intensity: { value: 1.0 }
      },
      vertexShader: `
        uniform float time;
        uniform float morphProgress;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          vUv = uv;
          vPosition = position;
          
          vec3 pos = position;
          float distortion = sin(pos.x * 5.0 + time) * 0.1;
          pos.y += distortion * morphProgress;
          pos.z += cos(pos.y * 3.0 + time * 0.5) * 0.05 * morphProgress;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform float intensity;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          float mixFactor = sin(vUv.x * 10.0 + time) * 0.5 + 0.5;
          vec3 color = mix(color1, color2, mixFactor);
          
          float alpha = 0.8 + sin(time + vPosition.y * 5.0) * 0.2;
          
          gl_FragColor = vec4(color * intensity, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })
  }, [])

  useFrame((state) => {
    if (meshRef.current && materialRef.current) {
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.y += 0.005
      
      materialRef.current.uniforms.time.value = state.clock.elapsedTime
      materialRef.current.uniforms.morphProgress.value = Math.sin(state.clock.elapsedTime * 0.5) * 0.5 + 0.5
    }
  })

  const scroll = useScrollSync();
  const [mouse, setMouse] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse([
        (e.clientX / window.innerWidth) * 2 - 1,
        (e.clientY / window.innerHeight) * 2 - 1
      ]);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <Canvas camera={{ position: [0, 2, 12], fov: 40 }}>
      <CameraController />
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 12]} intensity={2} color="#00fff7" />
      
      <SpaceBackground />
      
      <PetalBloom scroll={scroll} />
      <WireframeSphere scroll={scroll} />
      
      <EffectComposer>
        <Bloom luminanceThreshold={0.15} luminanceSmoothing={0.8} intensity={2.2} />
      </EffectComposer>

      <group>
        <mesh ref={meshRef} material={material}>
          <icosahedronGeometry args={[2, 4]} />
          <shaderMaterial ref={materialRef} attach="material" {...material} />
        </mesh>
        
        {/* Additional geometry with standard material */}
        <mesh position={[0, 0, -5]}>
          <torusGeometry args={[3, 0.5, 16, 100]} />
          <meshStandardMaterial 
            color="#00fff7" 
            emissive="#00fff7" 
            emissiveIntensity={0.2}
            wireframe
          />
        </mesh>
      </group>
    </Canvas>
  );
}
