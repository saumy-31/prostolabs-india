import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { PlanType } from './Modal/EnquiryModal'

interface FloatingCTAProps {
  onOpenModal: (plan?: PlanType) => void
  isModalOpen?: boolean
}

export function FloatingCTA({ onOpenModal, isModalOpen }: FloatingCTAProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const heroElement = document.getElementById('hero')
      if (!heroElement) {
        // Fallback: show after scrolling 400px if #hero is not found
        setIsVisible(window.scrollY > 400)
        return
      }

      const heroRect = heroElement.getBoundingClientRect()
      // Hide while hero is visible on screen, show once hero scrolls past top
      const isHeroOut = heroRect.bottom <= 100
      setIsVisible(isHeroOut)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check on render

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Hide CTA if EnquiryModal is currently open
  const shouldShow = isVisible && !isModalOpen

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="fixed z-40 
                     /* Mobile Styles: full-width bar at bottom with safe-area padding */
                     bottom-[calc(16px+env(safe-area-inset-bottom))] left-4 right-4 
                     /* Desktop Styles: fixed bottom-right pill */
                     sm:left-auto sm:right-6 sm:bottom-6"
        >
          <motion.button
            onClick={() => onOpenModal('care')}
            whileHover={{ y: -2, boxShadow: "0 20px 35px -8px rgba(37, 99, 235, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto h-[56px] sm:h-[56px] px-6 sm:px-8
                       bg-[#2563EB] text-white font-bold text-sm sm:text-base 
                       rounded-full shadow-lg shadow-blue-500/25 
                       flex items-center justify-center gap-2.5 
                       cursor-pointer transition-colors hover:bg-blue-700"
          >
            <span>Start Your Website</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}