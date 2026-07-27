import { useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'

export function useParallax() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring configuration for buttery smooth, premium easing
  const springConfig = { damping: 30, stiffness: 100, mass: 0.5 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  // Maximum 3 degrees of rotation for a subtle, high-end feel
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [3, -3])
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-3, 3])

  // Parallax offsets for floating cards (creates depth)
  const floatX = useTransform(smoothX, [-0.5, 0.5], [-30, 30])
  const floatY = useTransform(smoothY, [-0.5, 0.5], [-30, 30])
  const floatXReverse = useTransform(smoothX, [-0.5, 0.5], [20, -20])
  const floatYReverse = useTransform(smoothY, [-0.5, 0.5], [20, -20])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      const x = e.clientX / innerWidth - 0.5
      const y = e.clientY / innerHeight - 0.5
      mouseX.set(x)
      mouseY.set(y)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return { rotateX, rotateY, floatX, floatY, floatXReverse, floatYReverse }
}