import { useState } from 'react'
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
        <>
          {/* ========================================================================= */}
          {/* 1. MOBILE-ONLY STICKY BOTTOM ACTION BAR (≤767px)                          */}
          {/* ========================================================================= */}
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.3, ease: easeSaaS }}
            className="block md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200/90 shadow-[0_-8px_25px_rgba(0,0,0,0.06)] px-4 py-2.5 pb-[calc(10px+env(safe-area-inset-bottom,0px))] transform-gpu"
          >
            <motion.button
              onClick={() => onOpenModal?.('care')}
              whileTap={{ scale: 0.98 }}
              className="w-full h-[56px] bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white rounded-full border border-white/20 shadow-md shadow-blue-500/25 flex items-center justify-center gap-2.5 px-5 cursor-pointer font-sans transform-gpu active:bg-blue-700 select-none"
            >
              <span className="text-base shrink-0">🚀</span>
              <span className="font-bold text-sm tracking-tight text-white whitespace-nowrap">
                Let's Build Your Website
              </span>
              <ArrowRight className="w-4 h-4 text-white stroke-[2.5] shrink-0" />
            </motion.button>
          </motion.div>

          {/* ========================================================================= */}
          {/* 2. UNTOUCHED DESKTOP FLOATING PILL (≥768px)                              */}
          {/* ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: easeSaaS }}
            className="hidden md:block fixed bottom-8 right-8 z-40 transform-gpu"
          >
            {/* Subtle Ambient Glow Behind Button */}
            <div className="absolute inset-0 bg-[#2563EB]/30 rounded-full blur-xl pointer-events-none scale-110" />

            <motion.button
              onClick={() => onOpenModal?.('care')}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              animate={{
                scale: [1, 1.02, 1],
                y: [0, -1, 0]
              }}
              transition={{
                repeat: Infinity,
                repeatDelay: 9.8,
                duration: 1.2,
                ease: easeSaaS
              }}
              className="relative h-[60px] px-8 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white rounded-full border border-white/25 shadow-[0_12px_32px_rgba(37,99,235,0.38)] hover:shadow-[0_18px_40px_rgba(37,99,235,0.48)] backdrop-blur-md flex items-center justify-center gap-3 cursor-pointer group transform-gpu select-none transition-shadow duration-300"
            >
              {/* Top Shine Highlight */}
              <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-full pointer-events-none" />

              <span className="text-lg shrink-0">🚀</span>
              <span className="font-bold text-base tracking-tight font-sans text-white drop-shadow-2xs whitespace-nowrap">
                Let's Build Your Website
              </span>
              <ArrowRight className="w-5 h-5 text-white stroke-[2.5] shrink-0 group-hover:translate-x-1 transition-transform duration-300 ease-out" />
            </motion.button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}