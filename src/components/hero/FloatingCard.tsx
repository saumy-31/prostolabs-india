import { motion, type MotionValue } from 'framer-motion'
import { type ReactNode } from 'react'

interface FloatingCardProps {
  icon: ReactNode
  title: string
  subtitle?: string
  className: string
  delay: number
  floatYOffset: number
  parallaxX: MotionValue<number>
  parallaxY: MotionValue<number>
}

export function FloatingCard({ icon, title, subtitle, className, delay, floatYOffset, parallaxX, parallaxY }: FloatingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 20, 
        delay: delay 
      }}
      style={{ x: parallaxX, y: parallaxY }}
      className={`absolute z-30 ${className}`}
    >
      {/* Continuous float animation wrapper */}
      <motion.div
        animate={{ y: [0, floatYOffset, 0] }}
        transition={{ duration: 5 + delay, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.05, y: -5 }}
        className="flex items-center gap-3 bg-white/70 backdrop-blur-xl border border-white/60 p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-[#2563EB]/30 hover:shadow-[0_12px_40px_rgba(37,99,235,0.15)] transition-colors duration-300 cursor-default"
      >
        <div className="flex-shrink-0 text-[#2563EB]">{icon}</div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-[#0A0A0A] tracking-tight">{title}</span>
          {subtitle && <span className="text-xs font-semibold text-[#2563EB]">{subtitle}</span>}
        </div>
      </motion.div>
    </motion.div>
  )
}