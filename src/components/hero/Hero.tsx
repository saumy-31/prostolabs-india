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

      {/* Shine Pass Sweep across Price when complete */}
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
        className="absolute -bottom-1 left-0 right-0 h-[3px] bg-[#2563EB] rounded-full origin-left shadow-2xs"
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

  // Max 3.5° rotation on mouse hover
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [3.5, -3.5])
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-3.5, 3.5])
  const glowX = useTransform(smoothMouseX, [-0.5, 0.5], [-25, 25])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return // Mobile safety
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
  const mockupScrollY = useTransform(scrollYProgress, [0, 1], [0, 50])
  const bgScrollY = useTransform(scrollYProgress, [0, 1], [0, -40])

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative pt-5 sm:pt-12 md:pt-16 lg:pt-20 pb-3 sm:pb-4 md:pb-6 lg:pb-8 bg-[#FAFAFA] overflow-hidden select-none" 
      id="hero"
    >
      {/* CONTINUOUS AMBIENT MOVING BACKLIGHT */}
      <motion.div 
        style={{ y: bgScrollY, x: glowX }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.06, 0.1, 0.06] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[550px] bg-[#2563EB] rounded-full blur-[120px] pointer-events-none" 
      />

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        
        {/* GRID STRUCTURE: Compact gap on mobile, spacious on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-start">
          
          {/* LEFT COLUMN: HERO COPY & VALUE PROP (7 COLS) */}
          <div className="lg:col-span-7 space-y-2.5 sm:space-y-4 lg:space-y-5">
            
            {/* BADGE */}
            <motion.div 
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ...springCinematic }}
              className="inline-flex"
            >
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-blue-50 border border-blue-100/90 shadow-2xs">
                <span className="text-[11px] sm:text-xs">🇮🇳</span>
                <span className="text-[10px] sm:text-[11px] font-bold text-[#2563EB] tracking-wider uppercase">
                  Built for Indian Businesses
                </span>
              </div>
            </motion.div>

            {/* HEADLINE MASK REVEAL */}
            <h1 className="text-[1.85rem] leading-[1.1] sm:text-5xl lg:text-6xl font-black text-[#0A0A0A] font-sans tracking-tight sm:leading-[1.08]">
              {/* Line 1 */}
              <div className="overflow-hidden pb-0.5 sm:pb-1">
                <motion.div
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.65, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  Professional Websites
                </motion.div>
              </div>

              {/* Line 2 & Price Star */}
              <div className="overflow-hidden flex flex-wrap items-baseline gap-x-2 sm:gap-x-3 pt-0.5">
                <motion.span
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.65, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                  From Just
                </motion.span>

                {/* Price Count Up & Highlight */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8, ...springBouncy }}
                  className="inline-flex items-baseline relative group cursor-pointer"
                >
                  <AnimatedPriceCounter />

                  <motion.span 
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.2, ease: "easeOut" }}
                    className="text-xl sm:text-3xl font-bold text-[#2563EB] ml-0.5"
                  >
                    /month
                  </motion.span>
                </motion.div>
              </div>
            </h1>

            {/* DESCRIPTION */}
            <motion.p 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.4, ease: "easeOut" }}
              className="text-xs sm:text-base lg:text-lg text-[#6B7280] font-medium leading-relaxed max-w-xl"
            >
              Launch a modern, mobile-friendly website for your business without paying agency prices. Hosting, maintenance, security, and support are included.
            </motion.p>

            {/* PRICING COMPARISON STRIP */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 1.55 }}
              className="pt-0.5"
            >
              <div className="inline-flex flex-wrap items-center gap-1.5 sm:gap-3 p-1.5 sm:p-2 px-3 sm:px-4 rounded-xl sm:rounded-2xl bg-white border border-gray-200/90 shadow-2xs text-[11px] sm:text-xs font-semibold">
                <div className="flex items-center gap-1.5 text-gray-500">
                  <span>Traditional Agencies</span>
                  <span className="line-through text-gray-400 font-bold">₹20,000+</span>
                </div>
                <span className="text-gray-300 font-normal">→</span>
                <div className="flex items-center gap-1.5 text-[#2563EB] font-bold bg-blue-50/80 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg sm:rounded-xl border border-blue-100">
                  <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                  <span>ProstoLabs: From ₹499/month</span>
                </div>
              </div>
            </motion.div>

            {/* CTA BUTTONS (COMPACT 54px HEIGHT ON MOBILE) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1">
              <motion.button 
                onClick={() => onOpenModal?.('care')}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, delay: 1.7, ...springBouncy }}
                whileHover={{ scale: 1.03, boxShadow: "0 20px 35px -10px rgba(37,99,235,0.35)" }}
                whileTap={{ scale: 0.97 }}
                className="h-[54px] sm:h-auto bg-[#2563EB] text-white font-bold text-sm px-6 sm:px-7 py-3.5 rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group text-center relative overflow-hidden cursor-pointer"
              >
                <span>Start at ₹499/month</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.a 
                href="#pricing"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: 1.85 }}
                whileHover={{ scale: 1.025, backgroundColor: "#F9FAFB" }}
                whileTap={{ scale: 0.975 }}
                className="h-[54px] sm:h-auto bg-white text-[#0A0A0A] border border-gray-200/90 font-bold text-sm px-6 py-3.5 rounded-xl transition-all flex items-center justify-center text-center shadow-2xs cursor-pointer"
              >
                View Pricing
              </motion.a>
            </div>

            {/* TRUST BADGES STAGGER REVEAL */}
            <div className="pt-2 sm:pt-3 border-t border-gray-200/60">
              <div className="flex flex-wrap items-center gap-x-3.5 sm:gap-x-5 gap-y-1.5 sm:gap-y-2 text-[11px] sm:text-xs font-semibold text-gray-600">
                {[
                  "Hosting Included",
                  "Mobile Friendly",
                  "SEO Ready",
                  "WhatsApp Integration",
                  "Secure Hosting"
                ].map((badgeText, idx) => (
                  <motion.div 
                    key={badgeText}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 2.0 + (idx * 0.06) }}
                    className="flex items-center gap-1 sm:gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2563EB] shrink-0" />
                    <span>{badgeText}</span>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: BROWSER PREVIEW (5 COLS, MAX HEIGHT CAPPED ON MOBILE) */}
          <motion.div 
            style={{ y: mockupScrollY }}
            className="lg:col-span-5 relative perspective-1000 max-h-[390px] lg:max-h-none overflow-hidden lg:overflow-visible rounded-2xl"
          >
            <BrowserMockup rotateX={rotateX} rotateY={rotateY} />
          </motion.div>

        </div>
      </div>

      {/* ELEGANT SEAMLESS SECTION SEPARATOR & BLEND */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-b from-transparent via-gray-100/30 to-white/80 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1300px] px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200/80 to-transparent" />
      </div>
    </section>
  )
}