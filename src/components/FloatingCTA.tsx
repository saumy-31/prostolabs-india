import { useState} from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { PlanType } from './Modal/EnquiryModal'

interface FloatingCTAProps {
  onOpenModal?: (plan?: PlanType) => void
  isModalOpen?: boolean
}

const easeSaaS = [0.16, 1, 0.3, 1] as const

export function FloatingCTA({ onOpenModal, isModalOpen = false }: FloatingCTAProps) {
  const [isVisible, setIsVisible] = useState(false)
  const { scrollY } = useScroll()

  // Monitor scroll position to show CTA only after Hero section leaves viewport
  useMotionValueEvent(scrollY, "change", (latest) => {
    const heroElement = document.getElementById('hero')
    if (heroElement) {
      const heroBottom = heroElement.getBoundingClientRect().bottom + latest
      // Show when scrolled past 70% of the Hero section height
      if (latest > heroBottom * 0.7) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    } else {
      // Fallback threshold if hero ID is missing
      setIsVisible(latest > 400)
    }
  })

  return (
    <AnimatePresence>
      {isVisible && !isModalOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: easeSaaS }}
          className="fixed bottom-5 sm:bottom-8 right-5 sm:right-8 z-40 transform-gpu"
        >
          {/* Subtle Ambient Glow Behind Button */}
          <div className="absolute inset-0 bg-[#2563EB]/30 rounded-full blur-xl pointer-events-none scale-110" />

          {/* Floating Pill CTA Button */}
          <motion.button
            onClick={() => onOpenModal?.('care')}
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            // Periodic 9-second subtle attention animation
            animate={{
              scale: [1, 1.03, 1],
              y: [0, -2, 0]
            }}
            transition={{
              repeat: Infinity,
              repeatDelay: 8.5,
              duration: 1.2,
              ease: easeSaaS
            }}
            className="relative h-[56px] sm:h-[60px] px-6 sm:px-8 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white rounded-full border border-white/25 shadow-[0_12px_32px_rgba(37,99,235,0.38)] hover:shadow-[0_18px_40px_rgba(37,99,235,0.48)] backdrop-blur-md flex items-center justify-center gap-2.5 sm:gap-3 cursor-pointer group transform-gpu select-none transition-shadow duration-300"
          >
            {/* Top Shine Highlight */}
            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-full pointer-events-none" />

            <span className="text-base sm:text-lg">🚀</span>
            <span className="font-extrabold text-sm sm:text-base tracking-tight font-sans text-white drop-shadow-2xs">
              Start Your Website
            </span>
            <ArrowRight className="w-5 h-5 sm:w-5 sm:h-5 text-white stroke-[2.5] group-hover:translate-x-1 transition-transform duration-300 ease-out" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}