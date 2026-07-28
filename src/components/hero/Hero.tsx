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

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [3, -3])
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-3, 3])
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
  const mockupScrollY = useTransform(scrollYProgress, [0, 1], [0, 50])
  const bgScrollY = useTransform(scrollYProgress, [0, 1], [0, -40])

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 lg:pb-20 bg-[#FAFAFA] overflow-hidden select-none" 
      id="hero"
    >
      {/* CONTINUOUS AMBIENT MOVING BACKLIGHT */}
      <motion.div 
        style={{ y: bgScrollY, x: glowX }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.08, 0.14, 0.08] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[1000px] h-[300px] sm:h-[550px] bg-[#2563EB] rounded-full blur-[90px] sm:blur-[120px] pointer-events-none z-0" 
      />

      {/* ========================================================================= */}
      {/* 1. MOBILE-FIRST DEDICATED LAYOUT (≤1023px) */}
      {/* ========================================================================= */}
      <div className="block lg:hidden px-6 relative z-10 max-w-md mx-auto text-center space-y-6">
        
        {/* BADGE */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ...springCinematic }}
          className="inline-flex justify-center"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 shadow-2xs">
            <span className="text-xs">🇮🇳</span>
            <span className="text-[11px] font-bold text-[#2563EB] tracking-wider uppercase">
              Built for Indian Businesses
            </span>
          </div>
        </motion.div>

        {/* HEADLINE WITH ₹499 FOCAL POINT */}
        <div className="space-y-2">
          <h1 className="text-[2.25rem] leading-[1.1] font-black text-[#0A0A0A] font-sans tracking-tight">
            Professional Websites
          </h1>
          <div className="text-2xl font-extrabold text-[#0A0A0A] flex items-center justify-center gap-1.5">
            <span>From Just</span>
            <div className="text-3xl font-black text-[#2563EB]">
              <AnimatedPriceCounter />
              <span className="text-lg font-bold ml-0.5">/mo</span>
            </div>
          </div>
        </div>

        {/* SUBTITLE */}
        <p className="text-sm text-[#6B7280] font-medium leading-relaxed px-1">
          Launch a modern, mobile-friendly website for your business without paying agency prices. Hosting, maintenance, security, and support included.
        </p>

        {/* COMPARISON PILL */}
        <div className="inline-flex items-center gap-2 p-1.5 px-3.5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs text-xs font-semibold">
          <div className="flex items-center gap-1 text-gray-500">
            <span>Agencies</span>
            <span className="line-through text-gray-400 font-bold">₹20k+</span>
          </div>
          <span className="text-gray-300 font-normal">→</span>
          <div className="flex items-center gap-1 text-[#2563EB] font-bold bg-blue-50 px-2 py-0.5 rounded-xl border border-blue-100">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>ProstoLabs: ₹499/mo</span>
          </div>
        </div>

        {/* 56px TALL CTA BUTTONS */}
        <div className="space-y-3 pt-1">
          <motion.button 
            onClick={() => onOpenModal?.('care')}
            whileTap={{ scale: 0.98 }}
            className="w-full h-[56px] bg-[#2563EB] text-white font-bold text-base rounded-2xl shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Start at ₹499/month</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          <a 
            href="#pricing"
            className="w-full h-[56px] bg-white text-[#0A0A0A] border border-gray-200 font-bold text-base rounded-2xl shadow-2xs flex items-center justify-center cursor-pointer hover:bg-gray-50"
          >
            View Pricing
          </a>
        </div>

        {/* TRUST BADGES (2-COLUMN GRID) */}
        <div className="pt-3 border-t border-gray-200/60">
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-gray-600 text-left">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
              <span>Hosting Included</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
              <span>SEO Ready</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
              <span>WhatsApp Support</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
              <span>Mobile Friendly</span>
            </div>
          </div>
        </div>

        {/* MOBILE SHOWCASE MOCKUP */}
        <div className="relative pt-4">
          <div className="absolute inset-0 bg-[#2563EB]/15 blur-2xl rounded-full scale-90 pointer-events-none" />

          <div className="relative w-[240px] h-[420px] mx-auto bg-[#090D16] rounded-[36px] border-4 border-gray-800 p-2 shadow-2xl overflow-hidden">
            <div className="w-16 h-3 bg-gray-800 rounded-full mx-auto mb-2" />
            <div className="w-full h-[375px] bg-[#0F172A] rounded-[28px] p-3 flex flex-col justify-between border border-white/10 text-white text-left relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-lg bg-[#2563EB] flex items-center justify-center font-bold text-[10px]">P</div>
                  <span className="font-bold text-xs tracking-tight">ProstoLabs</span>
                </div>
                <div className="text-[9px] bg-white/10 px-2 py-0.5 rounded-full font-mono text-emerald-400">
                  Online
                </div>
              </div>

              <div className="space-y-2 my-auto">
                <div className="inline-block px-2 py-0.5 bg-blue-500/20 text-blue-300 text-[9px] font-bold rounded-full border border-blue-400/30">
                  ⚡ Launch in 3 Days
                </div>
                <h4 className="text-base font-extrabold leading-tight">
                  High-Converting Websites for Local Brands.
                </h4>
                <p className="text-[10px] text-gray-400 leading-relaxed">
                  We build, host, and manage your website starting at ₹499/mo.
                </p>
              </div>

              <div className="w-full h-9 bg-[#2563EB] rounded-xl text-xs font-bold flex items-center justify-center shadow-md">
                Claim Your Website →
              </div>
            </div>
          </div>
        </div>

      </div>


      {/* ========================================================================= */}
      {/* 2. STRICT 2-COLUMN DESKTOP GRID LAYOUT (≥1024px) */}
      {/* ========================================================================= */}
      <div className="hidden lg:block max-w-[1300px] mx-auto px-12 relative z-10">
        <div className="grid grid-cols-12 gap-8 items-center">
          
          {/* LEFT COLUMN: HERO TEXT & CONTENT (7 COLS) */}
          <div className="col-span-7 space-y-5">
            
            <motion.div 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15, ...springCinematic }}
              className="inline-flex"
            >
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 shadow-2xs">
                <span className="text-xs">🇮🇳</span>
                <span className="text-[11px] font-bold text-[#2563EB] tracking-wider uppercase">
                  Built for Indian Businesses
                </span>
              </div>
            </motion.div>

            <h1 className="text-5xl lg:text-6xl font-black text-[#0A0A0A] font-sans tracking-tight">
              <div className="overflow-hidden pb-0.5">
                <motion.div
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  Professional Websites
                </motion.div>
              </div>

              <div className="overflow-hidden flex items-baseline gap-x-3 pt-0.5">
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
                    className="text-3xl font-bold text-[#2563EB] ml-0.5"
                  >
                    /month
                  </motion.span>
                </motion.div>
              </div>
            </h1>

            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 1.0, ease: "easeOut" }}
              className="text-lg text-[#6B7280] font-medium leading-relaxed max-w-xl"
            >
              Launch a modern, mobile-friendly website for your business without paying agency prices. Hosting, maintenance, security, and support are included.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.15 }}
              className="pt-0.5"
            >
              <div className="inline-flex items-center gap-3 p-2 px-4 rounded-2xl bg-white border border-gray-200/90 shadow-2xs text-xs font-semibold">
                <div className="flex items-center gap-1 text-gray-500">
                  <span>Agencies</span>
                  <span className="line-through text-gray-400 font-bold">₹20k+</span>
                </div>
                <span className="text-gray-300 font-normal">→</span>
                <div className="flex items-center gap-1 text-[#2563EB] font-bold bg-blue-50 px-2 py-1 rounded-xl border border-blue-100">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>ProstoLabs: ₹499/mo</span>
                </div>
              </div>
            </motion.div>

            <div className="pt-0.5 flex items-center gap-3">
              <motion.button 
                onClick={() => onOpenModal?.('care')}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.25, ...springBouncy }}
                whileHover={{ scale: 1.02, boxShadow: "0 20px 35px -10px rgba(37,99,235,0.35)" }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#2563EB] text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Start at ₹499/month</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.a 
                href="#pricing"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 1.35 }}
                className="bg-white text-[#0A0A0A] border border-gray-200/90 font-bold text-sm px-6 py-3.5 rounded-xl transition-all items-center justify-center text-center shadow-2xs cursor-pointer hover:bg-gray-50"
              >
                View Pricing
              </motion.a>
            </div>

            <div className="pt-3 border-t border-gray-200/60 w-full">
              <div className="flex flex-wrap items-center gap-x-5 text-xs font-semibold text-gray-600">
                {["Hosting Included", "SEO Ready", "WhatsApp Support", "Mobile Friendly", "SSL Security"].map((text, idx) => (
                  <motion.div 
                    key={text}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 1.45 + (idx * 0.05) }}
                    className="flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
                    <span>{text}</span>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: DESKTOP BROWSER PREVIEW (5 COLS - NEATLY CONTAINED) */}
          <motion.div 
            style={{ y: mockupScrollY }}
            className="col-span-5 relative"
          >
            <div className="relative rounded-2xl border border-gray-200/90 bg-white shadow-2xl overflow-hidden">
              <BrowserMockup rotateX={rotateX} rotateY={rotateY} />
            </div>
          </motion.div>

        </div>
      </div>

      {/* SECTION SEPARATOR & BLEND */}
      <div className="absolute bottom-0 left-0 right-0 h-8 sm:h-10 bg-gradient-to-b from-transparent via-gray-100/30 to-white/80 pointer-events-none z-10" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1300px] px-6 z-10">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200/80 to-transparent" />
      </div>
    </section>
  )
}