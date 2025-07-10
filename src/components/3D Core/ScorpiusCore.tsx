'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Bloom, ChromaticAberration, EffectComposer, Vignette } from '@react-three/postprocessing'
import { Environment, Preload, Html } from '@react-three/drei'
import { Vector2 } from 'three'
import MorphingCore from './MorphingCore'
import VolumetricLighting from '@/components/Effects/VolumetricLighting'
import { useCinematicCamera } from '@/lib/useCinematicCamera'
import { useScrollSync } from '@/hooks/useScrollSync'

function CameraController() {
  const scroll = useScrollSync()
  useCinematicCamera(scroll, 0.05)
  return null
}

function LoadingFallback() {
  return (
    <Html center>
      <div className="text-cyan-400 font-command text-xl animate-pulse">
        INITIALIZING CORE...
      </div>
    </Html>
  )
}

export default function ScorpiusCore() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={<LoadingFallback />}>
          <CameraController />
          
          {/* Lighting */}
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#00fff7" />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#ff00ff" />
          
          {/* Volumetric Lighting Effects */}
          <VolumetricLighting />
          
          {/* Main scene */}
          <MorphingCore />
          
          {/* Environment */}
          <Environment preset="night" />
          
          {/* Post-processing */}
          <EffectComposer multisampling={4}>
            <Bloom 
              intensity={0.5} 
              luminanceThreshold={0.9}
              luminanceSmoothing={0.9}
              radius={0.8}
            />
            <ChromaticAberration 
              offset={new Vector2(0.002, 0.002)}
              radialModulation={false}
              modulationOffset={0}
            />
            <Vignette darkness={0.4} offset={0.5} />
          </EffectComposer>
          
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  )
}
