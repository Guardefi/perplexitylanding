import { useEffect, useState } from 'react'

export function useScrollSync() {
  const [scrollProgress, setScrollProgress] = useState(0)
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = window.scrollY
      const progress = Math.min(scrolled / scrollHeight, 1)
      setScrollProgress(progress)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return scrollProgress
}
