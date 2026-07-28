import { useEffect, useRef } from 'react'
import { 
  motion, 
  useInView, 
  useMotionValue, 
  useTransform, 
  useSpring, 
  animate, 
  type Variants 
} from 'framer-motion'
import { 
  Smartphone, 
  Zap, 
  MessageSquare, 
  Search, 
  MapPin, 
  ShieldCheck, 
  Lock, 
  Sparkles, 
  TrendingUp,
  Globe,
  CheckCircle2,
  ArrowRight
} from 'lucide-react'

// --- ANIMATED NUMBER COUNTER ---
function LiveCounter({ value, suffix = "", decimals = 0 }: { value: number; suffix?: string; decimals?: number }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => 
    decimals > 0 ? latest.toFixed(decimals) : Math.round(latest).toString()
  )
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  useEffect(() => {
    if (isInView) {
      animate(count, value, {
        duration: 2,
        ease: [0.16, 1, 0.3, 1],
      })
    }
  }, [isInView, value, count])

  return (
    <span>
      <motion.span ref={ref}>{rounded}</motion.span>
      {suffix}
    </span>
  )
}

// --- CONTAINER VARIANTS ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 90, damping: 20 } 
  }
}

// --- INTERACTIVE MULTI-DEVICE ILLUSTRATION (DESKTOP) ---
function MultiDeviceIllustration() {
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 45, damping: 20 }
  const laptopX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig)
  const laptopY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-8, 8]), springConfig)
  
  const phoneX = useSpring(useTransform(mouseX, [-0.5, 0.5], [16, -16]), springConfig)
  const phoneY = useSpring(useTransform(mouseY, [-0.5, 0.5], [14, -14]), springConfig)

  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768 || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex-1 w-full flex items-center justify-center my-2 py-2 overflow-visible cursor-pointer group/stage"
    >
      <motion.div 
        style={{ x: glowX }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="absolute w-[280px] sm:w-[380px] h-[160px] sm:h-[250px] bg-gradient-to-tr from-[#2563EB] via-blue-500 to-cyan-400 rounded-full blur-2xl sm:blur-3xl pointer-events-none z-0"
      />

      <motion.div 
        style={{ x: laptopX, y: laptopY }}
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="w-[200px] sm:w-[340px] md:w-[380px] h-[130px] sm:h-[220px] bg-[#090D16] rounded-xl sm:rounded-2xl border border-gray-800 p-1.5 sm:p-2 shadow-xl relative z-10"
      >
        <div className="w-full h-full bg-[#0F172A] rounded-lg sm:rounded-xl p-2 sm:p-3 flex flex-col gap-1 sm:gap-2.5 overflow-hidden border border-white/5 relative">
          <div className="flex items-center justify-between border-b border-white/10 pb-1 sm:pb-2">
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/80" />
              <div className="w-1.5 h-1.5 rounded-full bg-green-500/80" />
            </div>
            <div className="flex items-center gap-1 text-[8px] font-mono text-gray-300 bg-white/5 px-1.5 py-0.5 rounded border border-white/5">
              <Lock className="w-2 h-2 text-emerald-400" />
              <span>prostolabs.in</span>
            </div>
            <Globe className="w-2.5 h-2.5 text-gray-500" />
          </div>

          <div className="flex-1 flex flex-col justify-between pt-0.5 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded bg-[#2563EB] flex items-center justify-center text-[8px] text-white font-bold">P</div>
                <div className="w-12 sm:w-20 h-1.5 bg-white/70 rounded-full" />
              </div>
              <div className="w-10 sm:w-14 h-3.5 bg-[#2563EB] rounded flex items-center justify-center text-[7px] text-white font-bold">
                Contact
              </div>
            </div>

            <div className="space-y-1 my-auto">
              <div className="w-24 sm:w-36 h-2 bg-gradient-to-r from-blue-400 to-indigo-300 rounded-full" />
              <div className="w-32 sm:w-48 h-1.5 bg-white/40 rounded-full" />
            </div>

            <div className="grid grid-cols-3 gap-1 pt-1 border-t border-white/5">
              <div className="h-5 sm:h-8 bg-white/5 rounded p-1 flex items-center gap-1">
                <div className="w-2 h-2 rounded bg-blue-500/40" />
                <div className="w-6 h-1 bg-white/30 rounded" />
              </div>
              <div className="h-5 sm:h-8 bg-white/5 rounded p-1 flex items-center gap-1">
                <div className="w-2 h-2 rounded bg-emerald-500/40" />
                <div className="w-6 h-1 bg-white/30 rounded" />
              </div>
              <div className="h-5 sm:h-8 bg-white/5 rounded p-1 flex items-center gap-1">
                <div className="w-2 h-2 rounded bg-amber-500/40" />
                <div className="w-6 h-1 bg-white/30 rounded" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        style={{ x: phoneX, y: phoneY }}
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 4.2, delay: 0.2, ease: "easeInOut" }}
        className="w-[75px] sm:w-[125px] h-[130px] sm:h-[220px] bg-[#090D16] rounded-[16px] sm:rounded-[24px] border border-gray-800 p-1 sm:p-2 shadow-xl absolute -right-1 sm:right-6 z-20"
      >
        <div className="w-full h-full bg-[#0F172A] rounded-[12px] sm:rounded-[18px] p-1.5 flex flex-col justify-between border border-white/10 relative overflow-hidden">
          <div className="w-5 h-1 bg-gray-700 rounded-full mx-auto mb-0.5" />
          <div className="space-y-1 my-auto">
            <div className="w-full h-2 bg-blue-400 rounded-full" />
            <div className="w-3/4 h-1 bg-white/40 rounded-full" />
          </div>
          <div className="w-full h-4 bg-[#2563EB] rounded text-[6px] font-bold text-white flex items-center justify-center shadow-xs">
            Book
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export function Features() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" })

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-20 bg-[#FAFAFA] relative overflow-hidden" id="features">
      
      {/* Soft Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[radial-gradient(ellipse_at_center,_rgba(37,99,235,0.06)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-[1300px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center mb-10 sm:mb-14 max-w-2xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 shadow-2xs mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
            <span className="text-[11px] font-bold text-[#2563EB] tracking-wider uppercase">✨ Everything Included</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A0A0A] mb-3 tracking-tight font-sans leading-[1.15]"
          >
            Everything you need to launch and grow.
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-[#6B7280] leading-relaxed font-medium max-w-lg mx-auto"
          >
            Every website is built with essential tools modern businesses need. No hidden add-ons. No confusing packages.
          </motion.p>
        </div>


        {/* ========================================================================= */}
        {/* 1. MOBILE-ONLY STACKED PREMIUM CARDS (≤768px) */}
        {/* ========================================================================= */}
        <div className="block md:hidden space-y-6">
          
          {/* CARD 1: MOBILE RESPONSIVE */}
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="bg-white border border-gray-200/90 rounded-[24px] p-6 shadow-sm flex flex-col justify-between overflow-hidden relative"
          >
            <div className="space-y-2 mb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#2563EB]">
                <Smartphone size={14} />
                <span className="text-xs font-bold uppercase tracking-wider">Multi-Device</span>
              </div>
              <h3 className="text-xl font-extrabold text-[#0A0A0A] font-sans">Mobile Responsive</h3>
              <p className="text-xs text-[#6B7280] font-medium leading-relaxed">
                Smoothly adapts across desktop, tablet, and mobile screens so your business looks top tier on every device.
              </p>
            </div>

            <div className="bg-[#090D16] rounded-2xl p-4 border border-gray-800 shadow-md my-2 flex items-center justify-between">
              <div className="space-y-1.5 w-full">
                <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 border-b border-white/10 pb-2">
                  <span className="text-emerald-400 font-bold flex items-center gap-1"><Lock size={10} /> prostolabs.in</span>
                  <span>100% Fluid</span>
                </div>
                <div className="w-full h-3 bg-gradient-to-r from-blue-400 to-indigo-300 rounded-full mt-2" />
                <div className="w-3/4 h-2 bg-white/30 rounded-full" />
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-[#2563EB] font-bold">
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} /> iOS & Android Tested</span>
              <span className="text-gray-400">Mobile First</span>
            </div>
          </motion.div>

          {/* CARD 2: SPEED SCORE */}
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="bg-gradient-to-b from-emerald-50/50 to-white border border-emerald-100 rounded-[24px] p-6 shadow-sm flex flex-col justify-between overflow-hidden relative"
          >
            <div className="space-y-2 mb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-700">
                <Zap size={14} className="fill-emerald-600" />
                <span className="text-xs font-bold uppercase tracking-wider">Fast Performance</span>
              </div>
              <h3 className="text-xl font-extrabold text-[#0A0A0A] font-sans">Speed Score 99/100</h3>
              <p className="text-xs text-[#6B7280] font-medium leading-relaxed">
                Ultra-fast load times ensure visitors stay on your page and convert into paying customers instantly.
              </p>
            </div>

            <div className="bg-white border border-emerald-100 rounded-2xl p-4 my-2 flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="text-3xl font-black text-emerald-600 font-sans">
                  <LiveCounter value={99} />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">Google PageSpeed</div>
                  <div className="text-[10px] font-semibold text-emerald-600">Grade A+ Optimized</div>
                </div>
              </div>
              <div className="text-right text-[10px] text-gray-400 font-mono space-y-0.5">
                <div>LCP: 0.4s</div>
                <div>FID: 2ms</div>
              </div>
            </div>
          </motion.div>

          {/* CARD 3: WHATSAPP INTEGRATION */}
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="bg-white border border-gray-200/90 rounded-[24px] p-6 shadow-sm flex flex-col justify-between overflow-hidden relative"
          >
            <div className="space-y-2 mb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-600">
                <MessageSquare size={14} />
                <span className="text-xs font-bold uppercase tracking-wider">Lead Capture</span>
              </div>
              <h3 className="text-xl font-extrabold text-[#0A0A0A] font-sans">WhatsApp Chat Integration</h3>
              <p className="text-xs text-[#6B7280] font-medium leading-relaxed">
                Connect directly with prospective customers through a floating 1-tap WhatsApp action button.
              </p>
            </div>

            <div className="bg-emerald-950/5 border border-emerald-900/10 rounded-2xl p-3.5 space-y-2.5 my-2">
              <div className="bg-white text-[#0A0A0A] p-2.5 rounded-xl text-xs shadow-2xs border border-gray-100 max-w-[88%]">
                Hi! I want to know more about your service options.
              </div>
              <div className="bg-[#2563EB] text-white p-2.5 rounded-xl text-xs shadow-2xs ml-auto max-w-[88%]">
                Hello! 👋 We'd be happy to help you set up!
              </div>
            </div>
          </motion.div>

          {/* CARD 4: SEO READY */}
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="bg-white border border-gray-200/90 rounded-[24px] p-6 shadow-sm flex flex-col justify-between overflow-hidden relative"
          >
            <div className="space-y-2 mb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-orange-600">
                <Search size={14} />
                <span className="text-xs font-bold uppercase tracking-wider">Search Engine</span>
              </div>
              <h3 className="text-xl font-extrabold text-[#0A0A0A] font-sans">SEO Ready & Google Indexing</h3>
              <p className="text-xs text-[#6B7280] font-medium leading-relaxed">
                Complete meta tag structure, page titles, and sitemap generation included so Google finds you fast.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200/80 rounded-2xl p-3.5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-xs shrink-0">
                G
              </div>
              <div className="truncate">
                <div className="text-[10px] text-emerald-600 font-bold">https://yourbusiness.in • Indexed ✓</div>
                <div className="text-xs font-bold text-[#2563EB] truncate">Your Business Name — #1 Best Service</div>
              </div>
            </div>
          </motion.div>

          {/* CARD 5: GOOGLE MAPS */}
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="bg-white border border-gray-200/90 rounded-[24px] p-6 shadow-sm flex flex-col justify-between overflow-hidden relative"
          >
            <div className="space-y-2 mb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600">
                <MapPin size={14} />
                <span className="text-xs font-bold uppercase tracking-wider">Location</span>
              </div>
              <h3 className="text-xl font-extrabold text-[#0A0A0A] font-sans">Google Maps Setup</h3>
              <p className="text-xs text-[#6B7280] font-medium leading-relaxed">
                Help local customers navigate directly to your storefront or office with embedded map pins.
              </p>
            </div>

            <div className="h-20 bg-slate-100 rounded-2xl relative overflow-hidden flex items-center justify-center border border-slate-200/80">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:8px_8px]" />
              <MapPin size={28} className="text-red-600 fill-red-500 drop-shadow-md z-10" />
            </div>
          </motion.div>

          {/* CARD 6: SSL & HOSTING */}
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="bg-white border border-gray-200/90 rounded-[24px] p-6 shadow-sm flex flex-col justify-between overflow-hidden relative"
          >
            <div className="space-y-2 mb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#2563EB]">
                <ShieldCheck size={14} />
                <span className="text-xs font-bold uppercase tracking-wider">Security</span>
              </div>
              <h3 className="text-xl font-extrabold text-[#0A0A0A] font-sans">Secure Managed Hosting</h3>
              <p className="text-xs text-[#6B7280] font-medium leading-relaxed">
                256-bit SSL encryption certificate, monthly backups, and 99.9% uptime managed automatically.
              </p>
            </div>

            <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock size={14} className="text-[#2563EB]" />
                <span className="text-xs font-bold text-[#0A0A0A]">256-bit SSL Active</span>
              </div>
              <span className="text-xs font-bold text-emerald-600">99.9% Uptime</span>
            </div>
          </motion.div>

        </div>


        {/* ========================================================================= */}
        {/* 2. UNTOUCHED DESKTOP BENTO GRID (≥768px) */}
        {/* ========================================================================= */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="hidden md:grid grid-cols-4 gap-5 auto-rows-[270px]"
        >
          {/* 1. MOBILE RESPONSIVE CARD */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -6, boxShadow: "0 25px 50px -12px rgba(37,99,235,0.18)", borderColor: "rgba(37,99,235,0.35)" }}
            className="md:col-span-2 md:row-span-2 bg-white border border-gray-200/90 rounded-[32px] p-8 flex flex-col justify-between overflow-hidden relative shadow-sm group transition-all duration-300"
          >
            <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '16px 16px' }} />

            <div className="relative z-20">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-50 text-[#2563EB] mb-2.5">
                <Smartphone size={15} />
                <span className="text-xs font-bold uppercase tracking-wider">Multi-Device</span>
              </div>
              <h3 className="text-2xl font-bold text-[#0A0A0A] font-sans tracking-tight">Mobile Responsive</h3>
              <p className="text-sm text-[#6B7280] mt-0.5 font-medium">Smoothly adapts across desktop, tablet, and mobile screens.</p>
            </div>

            <MultiDeviceIllustration />

            <div className="relative z-20 pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-semibold">
              <span className="flex items-center gap-1.5 text-[#2563EB]">
                <CheckCircle2 size={15} /> Tested on iOS & Android
              </span>
              <span className="text-gray-400">100% Mobile Ready</span>
            </div>
          </motion.div>

          {/* 2. FAST PERFORMANCE CARD */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -6, boxShadow: "0 25px 50px -12px rgba(16,185,129,0.18)", borderColor: "rgba(16,185,129,0.35)" }}
            className="md:col-span-1 md:row-span-2 bg-gradient-to-b from-emerald-50/40 via-white to-white border border-emerald-100 rounded-[32px] p-6 flex flex-col justify-between overflow-hidden relative shadow-sm group transition-all duration-300"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-100/80 text-emerald-700 mb-3">
                <Zap size={15} className="fill-emerald-600 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider">Fast Load</span>
              </div>
              <h3 className="text-xl font-bold text-[#0A0A0A] font-sans">Speed Score</h3>
              <p className="text-xs text-[#6B7280] mt-1 font-medium">Instant load times for higher conversion.</p>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center my-3 relative">
              <motion.div 
                animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute w-28 h-28 bg-emerald-400/20 rounded-full blur-xl pointer-events-none"
              />

              <svg className="w-36 h-36 transform -rotate-90 relative z-10">
                <circle cx="72" cy="72" r="56" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-emerald-100" />
                <motion.circle 
                  initial={{ strokeDashoffset: 351 }}
                  animate={isInView ? { strokeDashoffset: 10 } : {}}
                  transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                  cx="72" cy="72" r="56" 
                  stroke="currentColor" 
                  strokeWidth="10" 
                  fill="transparent" 
                  strokeDasharray="351" 
                  className="text-emerald-500" 
                  strokeLinecap="round"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20">
                <motion.div 
                  animate={{ scale: [1, 1.06, 1] }} 
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                  className="text-4xl font-black text-emerald-600 tracking-tight font-sans drop-shadow-2xs"
                >
                  <LiveCounter value={99} />
                </motion.div>
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest mt-0.5">Mobile Score</span>
              </div>
            </div>

            <div className="bg-emerald-50/80 border border-emerald-100 rounded-xl p-3 flex justify-between items-center text-[11px] font-medium text-emerald-900 shadow-2xs">
              <span>LCP: <strong className="text-emerald-600">0.4s</strong></span>
              <span>FID: <strong className="text-emerald-600">2ms</strong></span>
              <span>CLS: <strong className="text-emerald-600">0.0</strong></span>
            </div>
          </motion.div>

          {/* 3. WHATSAPP INTEGRATION CARD */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -6, boxShadow: "0 25px 50px -12px rgba(34,197,94,0.18)", borderColor: "rgba(34,197,94,0.35)" }}
            className="md:col-span-1 md:row-span-2 bg-[#2563EB]/0 bg-white border border-gray-200/90 rounded-[32px] p-6 flex flex-col justify-between overflow-hidden relative shadow-sm group transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-green-50 text-green-600">
                  <MessageSquare size={15} />
                  <span className="text-xs font-bold uppercase tracking-wider">WhatsApp</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 rounded-full border border-emerald-200">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                  <span className="text-[10px] font-bold text-emerald-700">Online</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#0A0A0A] font-sans">Lead Capture</h3>
              <p className="text-xs text-[#6B7280] mt-1 font-medium">Connect directly with customers.</p>
            </div>

            <div className="bg-emerald-950/5 border border-emerald-900/10 rounded-2xl p-3.5 space-y-3 my-3 flex-1 flex flex-col justify-end">
              <motion.div 
                initial={{ opacity: 0, x: -15 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white text-[#0A0A0A] p-3 rounded-2xl rounded-bl-xs text-xs shadow-2xs max-w-[85%] border border-gray-100"
              >
                Hi, I want more information about your services!
                <div className="text-[9px] text-gray-400 text-right mt-1">10:42 AM</div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: [0, 1, 0] } : {}}
                transition={{ repeat: Infinity, duration: 1.8, delay: 0.9 }}
                className="bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-full text-[10px] font-semibold w-fit flex items-center gap-1"
              >
                <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.4s]" />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 15, scale: 0.95 }}
                animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.4, type: "spring" }}
                className="bg-[#2563EB] text-white p-3 rounded-2xl rounded-br-xs text-xs shadow-md ml-auto max-w-[85%]"
              >
                Hello! 👋 We would love to help you build your website.
                <div className="text-[9px] text-blue-200 text-right mt-1">10:43 AM ✓✓</div>
              </motion.div>
            </div>

            <div className="text-[11px] text-center font-semibold text-[#2563EB] bg-blue-50 py-2 rounded-xl border border-blue-100">
              Direct WhatsApp Button Included
            </div>
          </motion.div>

          {/* 4. SEO OPTIMIZED CARD */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -6, boxShadow: "0 25px 50px -12px rgba(249,115,22,0.18)", borderColor: "rgba(249,115,22,0.35)" }}
            className="md:col-span-2 md:row-span-1 bg-white border border-gray-200/90 rounded-[32px] p-6 flex flex-col justify-between overflow-hidden relative shadow-sm group transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-orange-50 text-orange-600 mb-1.5">
                  <Search size={15} />
                  <span className="text-xs font-bold uppercase tracking-wider">Search Engine</span>
                </div>
                <h3 className="text-xl font-bold text-[#0A0A0A] font-sans">SEO Ready & Google Indexing</h3>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-xl border border-emerald-200 shadow-2xs">
                <TrendingUp size={14} /> Rank #1 Target
              </div>
            </div>

            <motion.div 
              initial={{ y: 10, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-2 bg-gray-50 border border-gray-200/80 rounded-2xl p-3 flex items-center justify-between gap-4 group-hover:border-orange-200 transition-colors"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-extrabold text-sm shrink-0 shadow-2xs">
                  G
                </div>
                <div className="truncate">
                  <div className="text-[11px] text-gray-500 flex items-center gap-1">
                    https://yourbusiness.in <span className="text-emerald-600 font-bold">• Indexed ✓</span>
                  </div>
                  <div className="text-xs font-bold text-[#2563EB] truncate">
                    Your Business Name — #1 Best Service
                  </div>
                </div>
              </div>

              <div className="shrink-0 bg-white px-3 py-1 rounded-xl border border-gray-200 shadow-2xs text-center">
                <div className="text-xs font-extrabold text-emerald-600">100 / 100</div>
                <div className="text-[9px] text-gray-400 font-semibold uppercase">SEO Score</div>
              </div>
            </motion.div>
          </motion.div>

          {/* 5. GOOGLE MAPS CARD */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -6, boxShadow: "0 25px 50px -12px rgba(239,68,68,0.18)", borderColor: "rgba(239,68,68,0.35)" }}
            className="md:col-span-1 md:row-span-1 bg-white border border-gray-200/90 rounded-[32px] p-5 flex flex-col justify-between overflow-hidden relative shadow-sm group transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 bg-red-50 text-red-600 rounded-xl">
                <MapPin size={18} />
              </div>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Local Search</span>
            </div>

            <div>
              <h3 className="text-base font-bold text-[#0A0A0A] font-sans">Google Maps</h3>
              <p className="text-xs text-[#6B7280]">Interactive pin & directions.</p>
            </div>

            <div className="h-16 bg-slate-100 rounded-2xl relative overflow-hidden flex items-center justify-center border border-slate-200/80">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:8px_8px]" />
              <MapPin size={24} className="text-red-600 fill-red-500 drop-shadow-md z-10" />
            </div>
          </motion.div>

          {/* 6. SSL SECURE & HOSTING CARD */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -6, boxShadow: "0 25px 50px -12px rgba(37,99,235,0.18)", borderColor: "rgba(37,99,235,0.35)" }}
            className="md:col-span-1 md:row-span-1 bg-white border border-gray-200/90 rounded-[32px] p-5 flex flex-col justify-between overflow-hidden relative shadow-sm group transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 bg-blue-50 text-[#2563EB] rounded-xl relative">
                <ShieldCheck size={18} />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
              </div>
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Active
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-[#0A0A0A] font-sans">Secure Hosting</h3>
              <p className="text-xs text-[#6B7280]">SSL Certificate & 99.9% Uptime.</p>
            </div>

            <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock size={14} className="text-[#2563EB]" />
                <span className="text-xs font-bold text-[#0A0A0A]">256-bit SSL</span>
              </div>
              <span className="text-xs font-bold text-emerald-600">99.9% Uptime</span>
            </div>
          </motion.div>

        </motion.div>


        {/* ========================================================================= */}
        {/* 3. CTA BOTTOM BANNER (MOBILE SPECIFIC STACK VS DESKTOP HORIZONTAL STRIP) */}
        {/* ========================================================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 sm:mt-12 bg-gradient-to-br from-[#2563EB] via-[#1D4ED8] to-[#1E3A8A] rounded-[24px] sm:rounded-[32px] p-7 sm:p-10 shadow-xl relative overflow-hidden group"
        >
          {/* Ambient Glow Orb */}
          <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />

          {/* Mobile Stack Layout (block md:hidden) */}
          <div className="block md:hidden text-center text-white relative z-10 space-y-5">
            <div className="space-y-2">
              <h3 className="text-xl font-black font-sans leading-tight">
                Ready to launch your business online?
              </h3>
              <p className="text-blue-100 text-xs font-medium leading-relaxed">
                Everything above is included with every ProstoLabs plan.
              </p>
            </div>

            <motion.a 
              href="#pricing" 
              whileTap={{ scale: 0.97 }}
              className="w-full h-[52px] bg-white text-[#2563EB] px-6 rounded-2xl font-black text-sm shadow-lg hover:bg-blue-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Start for ₹499/month</span>
              <ArrowRight size={16} />
            </motion.a>
          </div>

          {/* Desktop Horizontal Layout (hidden md:flex) */}
          <div className="hidden md:flex items-center justify-between gap-6 text-white relative z-10">
            <div>
              <h3 className="text-2xl font-bold font-sans mb-1">Ready to launch your business online?</h3>
              <p className="text-blue-100 text-base font-medium">Everything above is included with every ProstoLabs plan.</p>
            </div>

            <motion.a 
              href="#pricing" 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-white text-[#2563EB] h-auto px-6 py-3.5 rounded-xl font-bold text-sm hover:bg-blue-50 transition-all duration-300 shadow-md flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              <span>Start for ₹499/month</span>
              <ArrowRight size={15} />
            </motion.a>
          </div>
        </motion.div>

      </div>
    </section>
  )
}