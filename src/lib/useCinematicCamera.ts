import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useEffect, useRef } from 'react';

const KEYFRAMES = [
  { s: 0.00, pos: [ 0,  2, 12], fov: 40, rot: [ -0.1,  0,    0 ], xOff:  0, shake: 0 },
  { s: 0.20, pos: [ 8,  4,  8], fov: 60, rot: [ -0.2,  0.5,  0 ], xOff:  3, shake: 0.02 },
  { s: 0.40, pos: [ 0, 10,  6], fov: 75, rot: [ -0.7,  0,    0 ], xOff:  0, shake: 0.05 },
  { s: 0.60, pos: [-8,  4,  8], fov: 60, rot: [ -0.2, -0.5,  0 ], xOff: -3, shake: 0.02 },
  { s: 0.80, pos: [ 0, -2, 10], fov: 50, rot: [  0.1,  0,    0 ], xOff:  0, shake: 0 },
  { s: 1.00, pos: [ 0,  2, 12], fov: 40, rot: [ -0.1,  0,    0 ], xOff:  0, shake: 0 },
] as const;

export function useCinematicCamera(scroll: number, ease = 0.1) {
  const { camera, scene } = useThree();
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  
  // Scene tilt for dramatic effect
  scene.rotation.x = -0.05;

  // Mouse tracking for subtle camera drift
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    timeRef.current = state.clock.getElapsedTime();
    
    const tRaw = scroll * (KEYFRAMES.length - 1);
    const i = Math.floor(tRaw);
    const t = tRaw - i;
    const start = KEYFRAMES[i];
    const end = KEYFRAMES[Math.min(i + 1, KEYFRAMES.length - 1)];

    const lerp = (a: number, b: number) => a + (b - a) * t;

    // Base position with enhanced X offset
    const basePos = [
      lerp(start.pos[0], end.pos[0]),
      lerp(start.pos[1], end.pos[1]),
      lerp(start.pos[2], end.pos[2])
    ];
    const xOff = lerp(start.xOff, end.xOff);
    
    // Add dynamic camera shake for intense moments
    const shakeIntensity = lerp(start.shake || 0, end.shake || 0);
    const shake = {
      x: Math.sin(timeRef.current * 20) * shakeIntensity,
      y: Math.cos(timeRef.current * 25) * shakeIntensity,
      z: Math.sin(timeRef.current * 30) * shakeIntensity * 0.5
    };
    
    // Mouse influence for parallax effect
    const mouseInfluence = {
      x: mouseRef.current.x * 0.3,
      y: mouseRef.current.y * 0.2
    };
    
    const targetPos = new THREE.Vector3(
      basePos[0] + xOff + shake.x + mouseInfluence.x,
      basePos[1] + shake.y + mouseInfluence.y,
      basePos[2] + shake.z
    );

    // FOV with dynamic adjustments
    const targetFov = lerp(start.fov, end.fov);
    
    // Enhanced rotation with mouse influence
    const targetRot = new THREE.Euler(
      lerp(start.rot[0], end.rot[0]) + mouseRef.current.y * 0.05,
      lerp(start.rot[1], end.rot[1]) + mouseRef.current.x * 0.05,
      lerp(start.rot[2], end.rot[2]),
      'XYZ'
    );

    // Adaptive smoothing based on movement speed
    const movementSpeed = targetPos.distanceTo(camera.position);
    const adaptiveSmoothFactor = ease * (movementSpeed > 0.5 ? 0.6 : 0.8);
    
    // Apply smooth transitions
    camera.position.lerp(targetPos, adaptiveSmoothFactor);
    camera.fov += (targetFov - camera.fov) * adaptiveSmoothFactor;
    
    // Smooth rotation with quaternion slerp for better interpolation
    const currentQuaternion = camera.quaternion.clone();
    const targetQuaternion = new THREE.Quaternion().setFromEuler(targetRot);
    camera.quaternion.slerp(targetQuaternion, adaptiveSmoothFactor);
    
    camera.updateProjectionMatrix();
    
    // Dynamic look-at with offset based on scroll
    const lookAtOffset = new THREE.Vector3(
      Math.sin(scroll * Math.PI * 2) * 0.5,
      0,
      Math.cos(scroll * Math.PI * 2) * 0.5
    );
    camera.lookAt(lookAtOffset);
  });
}

// Additional camera effects hook
export function useCameraEffects() {
  const { camera } = useThree();
  
  useFrame((state) => {
    // Depth of field simulation through fog
    const scrollProgress = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.5 + 0.5;
    
    // Dynamic near/far planes for performance
    camera.near = 0.1;
    camera.far = 100 + scrollProgress * 50;
    camera.updateProjectionMatrix();
  });
}

// Cinematic transitions hook for specific moments
export function useCinematicTransitions(triggerTransition: boolean) {
  const { camera } = useThree();
  const transitionRef = useRef({ 
    active: false, 
    startTime: 0,
    duration: 2000 
  });

  useEffect(() => {
    if (triggerTransition && !transitionRef.current.active) {
      transitionRef.current.active = true;
      transitionRef.current.startTime = Date.now();
    }
  }, [triggerTransition]);

  useFrame(() => {
    if (!transitionRef.current.active) return;

    const elapsed = Date.now() - transitionRef.current.startTime;
    const progress = Math.min(elapsed / transitionRef.current.duration, 1);

    // Dramatic zoom and rotation effect
    const zoomEffect = Math.sin(progress * Math.PI) * 0.3;
    camera.fov = camera.fov + zoomEffect * 10;
    camera.rotation.z = Math.sin(progress * Math.PI * 2) * 0.1;
    
    if (progress >= 1) {
      transitionRef.current.active = false;
      camera.rotation.z = 0;
    }
    
    camera.updateProjectionMatrix();
  });
}
