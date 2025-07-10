'use client'

import dynamic from 'next/dynamic'
import Navigation from '@/components/UI Sections/Navigation'
import Hero from '@/components/UI Sections/Hero'
import PortalHero from '@/components/UI Sections/PortalHero'
import PainPoints from '@/components/UI Sections/PainPoints'
import ModulesShowcase from '@/components/UI Sections/ModulesShowcase'
import EnterpriseModules from '@/components/UI Sections/EnterpriseModules'
import LiveMetrics from '@/components/UI Sections/LiveMetrics'
import PricingTiers from '@/components/UI Sections/PricingTiers'
import SocialProof from '@/components/UI Sections/SocialProof'
import FinalCTA from '@/components/UI Sections/FinalCTA'

// GSAP Components
import TextRevealAnimation from '@/components/GSAP/TextRevealAnimation'
import GSAPScrollController from '@/components/GSAP/GSAPScrollController'
import CameraMovement from '@/components/GSAP/CameraMovement'
import MorphingShapes from '@/components/GSAP/MorphingShapes'
import PhysicsScrollElements from '@/components/GSAP/PhysicsScrollElements'

// Effects Components

import CursorFollower from '@/components/Effects/CursorFollower'
import HorizontalScrollSection from '@/components/Effects/HorizontalScrollSection'
import GlitchText from '@/components/Effects/GlitchText'
import AdvancedCursor from '@/components/Effects/AdvancedCursor'
import MorphingGrid from '@/components/Effects/MorphingGrid'
import LiquidMorphing from '@/components/Effects/LiquidMorphing'
import ChromaticAberration from '@/components/Effects/ChromaticAberration'
import { usePageTransitions } from '@/components/Effects/PageTransitions'


// Performance & Loading
import ResourcePreloader from '@/components/ResourcePreloader'
import { usePerformanceOptimizer, useFPSMonitor } from '@/lib/performanceOptimizer'

const ScorpiusCore = dynamic(() => import('@/components/3D Core/ScorpiusCore'), {
  ssr: false,
  loading: () => <div className="h-screen w-full bg-war-room-void animate-pulse" />
})

export default function HomePage() {
  usePerformanceOptimizer();
  
  // Only show FPS monitor in development
  if (process.env.NODE_ENV === 'development') {
    useFPSMonitor();
  }

  return (
    <>
      {/* Resource Preloader */}
      <ResourcePreloader />
      
      <main className="relative min-h-screen bg-war-room-void">
        {/* Advanced cursor system */}
        <AdvancedCursor />
        
        {/* Layered background effects */}
        
        <Navigation />
        
        {/* 3D Scene - Fixed Position */}
        <div className="fixed inset-0 z-0">
          <ScorpiusCore />
        </div>
        
        {/* Content Sections - Scrollable */}
        <div className="relative z-10">
          {/* Enhanced Hero */}
          <section className="h-screen flex items-center justify-center relative">
            <div className="text-center">
              <GlitchText className="text-8xl font-command font-bold cyan-glow mb-8">
                ScorpiusCore
              </GlitchText>
              <p className="text-2xl text-gray-300 max-w-2xl mx-auto">
                Where medieval tactics meet alien technology in the cosmic battlefield
              </p>
            </div>
          </section>
          
          <TextRevealAnimation />
          <PortalHero />
          <GSAPScrollController />
          <PainPoints />

          <ModulesShowcase />
          <MorphingShapes />
          <EnterpriseModules />
          <PhysicsScrollElements />
          <LiveMetrics />
          <PricingTiers />
          <SocialProof />
          <FinalCTA />
        </div>
      </main>
    </>
  )
}
