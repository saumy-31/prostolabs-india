import { useState, useEffect, useRef } from 'react'
import { 
  motion, 
  useMotionValue, 
  useTransform, 
  useSpring, 
  useScroll, 
  animate 
} from 'framer-motion'
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2
} from 'lucide-react'
import { BrowserMockup } from './BrowserMockup'
import type { PlanType } from '../Modal/EnquiryModal'

interface HeroProps {
  onOpenModal?: (plan?: PlanType) => void
}

// --- SPRING DYNAMICS ---
const springCinematic = {
  type: 'spring' as const,
  stiffness: 90,
  damping: 18,
  mass: 0.8
}

const springBouncy = {
  type: 'spring' as const,
  stiffness: 140,
  damping: 14
}

// --- LIVE COUNT UP PRICE COMPONENT ---
function AnimatedPriceCounter() {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    const controls = animate(count, 499, {
      duration: 1.1,
      delay: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onComplete: () => setIsDone(true)
    })
    return controls.stop
  }, [count])

  return (
    <span className="inline-flex items-baseline relative font-black text-[#2563EB] tracking-tight">
      <span className="mr-0.5">₹</span>
      <motion.span>{rounded}</motion.span>

      {/* Shine Pass Sweep */}
      <motion.span 
        initial={{ x: '-100%', opacity: 0 }}
        animate={isDone ? { x: '200%', opacity: [0, 1, 0] } : {}}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-70 pointer-events-none"
      />

      {/* Blue Underline Expansion */}
      <motion.span 
        initial={{ scaleX: 0 }}
        animate={isDone ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -bottom-0.5 left-0 right-0 h-[2.5px] sm:h-[3px] bg-[#2563EB] rounded-full origin-left shadow-2xs"
      />
    </span>
  )
}

export function Hero({ onOpenModal }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // --- DESKTOP MOUSE PARALLAX ---
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [4, -4])
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-4, 4])
  const glowX = useTransform(smoothMouseX, [-0.5, 0.5], [-25, 25])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  // --- SCROLL DEPTH PARALLAX ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  const mockupScrollY = useTransform(scrollYProgress, [0, 1], [0, 40])
  const bgScrollY = useTransform(scrollYProgress, [0, 1], [0, -40])

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative pt-18 sm:pt-24 lg:pt-28 pb-2 sm:pb-8 lg:pb-12 bg-[#FAFAFA] overflow-hidden select-none" 
      id="hero"
    >
      {/* CONTINUOUS AMBIENT MOVING BACKLIGHT */}
      <motion.div 
        style={{ y: bgScrollY, x: glowX }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.08, 0.14, 0.08] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[1000px] h-[300px] sm:h-[550px] bg-[#2563EB] rounded-full blur-[90px] sm:blur-[120px] pointer-events-none" 
      />

      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 md:px-12 relative z-10">
        
        {/* SINGLE UNIFIED COLUMN COMPOSITION */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-3 sm:space-y-4 lg:space-y-5">
          
          {/* 1. BADGE */}
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15, ...springCinematic }}
            className="inline-flex"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-blue-50 border border-blue-100/90 shadow-2xs">
              <span className="text-[11px] sm:text-xs">🇮🇳</span>
              <span className="text-[10px] sm:text-[11px] font-bold text-[#2563EB] tracking-wider uppercase">
                Built for Indian Businesses
              </span>
            </div>
          </motion.div>

          {/* 2. HEADLINE */}
          <h1 className="text-[2.1rem] leading-[1.08] sm:text-5xl lg:text-6xl font-black text-[#0A0A0A] font-sans tracking-tight max-w-3xl">
            <div className="overflow-hidden pb-0.5">
              <motion.div
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                Professional Websites
              </motion.div>
            </div>

            <div className="overflow-hidden flex flex-wrap items-baseline justify-center gap-x-2 sm:gap-x-3 pt-0.5">
              <motion.span
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
              >
                From Just
              </motion.span>

              <motion.div
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, delay: 0.65, ...springBouncy }}
                className="inline-flex items-baseline relative group cursor-pointer"
              >
                <AnimatedPriceCounter />

                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.9, ease: "easeOut" }}
                  className="text-lg sm:text-3xl font-bold text-[#2563EB] ml-0.5"
                >
                  /month
                </motion.span>
              </motion.div>
            </div>
          </h1>

          {/* 3. DESCRIPTION */}
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 1.0, ease: "easeOut" }}
            className="text-[13px] sm:text-base lg:text-lg text-[#6B7280] font-medium leading-relaxed max-w-md sm:max-w-xl"
          >
            Launch a modern, mobile-friendly website for your business without paying agency prices. Hosting, maintenance, security, and support are included.
          </motion.p>

          {/* 4. PRICING COMPARISON STRIP */}
          <motion.div 
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 1.15 }}
            className="pt-0.5"
          >
            <div className="inline-flex items-center gap-1.5 sm:gap-3 p-1 sm:p-2 px-2.5 sm:px-4 rounded-lg sm:rounded-2xl bg-white border border-gray-200/90 shadow-2xs text-[10px] sm:text-xs font-semibold">
              <div className="flex items-center gap-1 text-gray-500">
                <span>Agencies</span>
                <span className="line-through text-gray-400 font-bold">₹20k+</span>
              </div>
              <span className="text-gray-300 font-normal">→</span>
              <div className="flex items-center gap-1 text-[#2563EB] font-bold bg-blue-50/80 px-2 py-0.5 sm:py-1 rounded-md sm:rounded-xl border border-blue-100">
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                <span>ProstoLabs: ₹499/mo</span>
              </div>
            </div>
          </motion.div>

          {/* 5. CTA BUTTONS */}
          <div className="pt-0.5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
            <motion.button 
              onClick={() => onOpenModal?.('care')}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1.25, ...springBouncy }}
              whileHover={{ scale: 1.02, boxShadow: "0 20px 35px -10px rgba(37,99,235,0.35)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto h-[50px] sm:h-auto bg-[#2563EB] text-white font-bold text-xs sm:text-sm px-6 sm:px-8 py-3.5 rounded-xl shadow-md sm:shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group text-center cursor-pointer"
            >
              <span>Start at ₹499/month</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.a 
              href="#pricing"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 1.35 }}
              className="hidden sm:inline-flex h-auto bg-white text-[#0A0A0A] border border-gray-200/90 font-bold text-sm px-6 py-3.5 rounded-xl transition-all items-center justify-center text-center shadow-2xs cursor-pointer hover:bg-gray-50"
            >
              View Pricing
            </motion.a>
          </div>

          {/* 6. FEATURE BADGES (2-COLUMN GRID ON MOBILE) */}
          <div className="pt-2 sm:pt-3 border-t border-gray-200/60 w-full max-w-lg">
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-x-3 gap-y-1.5 sm:gap-x-5 text-[11px] sm:text-xs font-semibold text-gray-600">
              {[
                { text: "Hosting Included", mobile: true },
                { text: "SEO Ready", mobile: true },
                { text: "WhatsApp Support", mobile: true },
                { text: "Mobile Friendly", mobile: true },
                { text: "SSL Security", mobile: false }
              ].map((badge, idx) => (
                <motion.div 
                  key={badge.text}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 1.45 + (idx * 0.05) }}
                  className={`items-center justify-center gap-1.5 ${badge.mobile ? 'flex' : 'hidden sm:flex'}`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2563EB] shrink-0" />
                  <span>{badge.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 7. UNBOXED FLOATING BROWSER PREVIEW (CLIPPED 50% BELOW THE FOLD ON MOBILE) */}
          <motion.div 
            style={{ y: mockupScrollY }}
            className="w-full relative mt-4 sm:mt-8 pt-2"
          >
            {/* AMBIENT RADIAL BLUE GLOW BEHIND BROWSER */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] sm:w-[90%] h-[180px] sm:h-[320px] bg-[#2563EB]/20 rounded-full blur-2xl sm:blur-3xl pointer-events-none z-0" />

            {/* FLOATING UNBOXED MOCKUP CONTAINER */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.5, ease: "easeOut" }}
              className="relative z-10 w-full max-w-[340px] xs:max-w-[390px] sm:max-w-[780px] lg:max-w-[960px] mx-auto rounded-xl sm:rounded-2xl lg:rounded-3xl border border-gray-200/90 bg-white shadow-[0_20px_50px_-10px_rgba(37,99,235,0.22)] sm:shadow-[0_25px_60px_-12px_rgba(37,99,235,0.25)] overflow-hidden max-h-[210px] xs:max-h-[250px] sm:max-h-none"
            >
              <BrowserMockup rotateX={rotateX} rotateY={rotateY} />

              {/* MOBILE BOTTOM FADE-OUT GRADIENT OVERLAY (FORCES NATURAL SCROLL PEEK) */}
              <div className="sm:hidden absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA]/70 to-transparent pointer-events-none z-20" />
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* SECTION SEPARATOR & BLEND */}
      <div className="absolute bottom-0 left-0 right-0 h-8 sm:h-10 bg-gradient-to-b from-transparent via-gray-100/30 to-white/80 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1300px] px-5 sm:px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200/80 to-transparent" />
      </div>
    </section>
  )
}