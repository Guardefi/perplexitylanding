'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function VolumetricLightBeam({ position, target, intensity = 1 }: {
  position: [number, number, number];
  target: THREE.Vector3;
  intensity?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.ShaderMaterial>(null!);
  
  const geometry = useMemo(() => {
    return new THREE.CylinderGeometry(0.1, 2, 10, 16, 1, true);
  }, []);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uIntensity: { value: intensity },
        uColor: { value: new THREE.Color(0x00fff7) }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        void main() {
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uIntensity;
        uniform vec3 uColor;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          float distanceFromCenter = distance(vUv, vec2(0.5));
          float alpha = 1.0 - distanceFromCenter;
          alpha *= sin(vPosition.y * 0.5 + uTime * 2.0) * 0.3 + 0.7;
          alpha *= uIntensity;
          
          gl_FragColor = vec4(uColor, alpha * 0.3);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
  }, [intensity]);

  useFrame((state) => {
    if (meshRef.current && materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      meshRef.current.lookAt(target);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <primitive object={geometry} />
      <primitive object={material} ref={materialRef} />
    </mesh>
  );
}

// Export a component that adds volumetric lighting to an existing scene
export default function VolumetricLighting() {
  return (
    <>
      <VolumetricLightBeam 
        position={[5, 8, -5]} 
        target={new THREE.Vector3(0, 0, 0)} 
        intensity={0.8}
      />
      <VolumetricLightBeam 
        position={[-8, 2, -3]} 
        target={new THREE.Vector3(2, -2, 0)} 
        intensity={0.6}
      />
      <VolumetricLightBeam 
        position={[0, -5, 5]} 
        target={new THREE.Vector3(-3, 3, 0)} 
        intensity={0.4}
      />
    </>
  );
}
