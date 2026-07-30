import { useRef } from 'react'
import { 
  motion, 
  useInView, 
  useScroll, 
  useSpring, 
  useReducedMotion,
  type Variants 
} from 'framer-motion'
import { 
  Rocket, 
  Clock, 
  Check, 
  CheckCircle2, 
  Smartphone, 
  Zap, 
  Search, 
  Send,
  Code,
  MessageSquare
} from 'lucide-react'

// --- SAAS-GRADE EASING CURVES & VARIANTS ---
const easeSaaS = [0.16, 1, 0.3, 1] as const

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 85, damping: 18 } 
  }
}

// --- FLOATING CHIPS CONFIG (DESKTOP ONLY) ---
const outerFloatingChips = [
  { icon: Smartphone, text: '📱 Mobile Ready', pos: '-top-8 left-0' },
  { icon: Zap, text: '⚡ Fast Loading', pos: '-top-8 right-0' },
  { icon: Search, text: '🔍 SEO Ready', pos: 'top-1/2 -translate-y-1/2 -left-12 xl:-left-16', xlOnly: true },
  { icon: MessageSquare, text: '💬 WhatsApp Connected', pos: 'top-1/2 -translate-y-1/2 -right-12 xl:-right-16', xlOnly: true },
]

export function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const mobileContainerRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const isInView = useInView(sectionRef, { once: true, margin: "-40px" })

  // --- MOBILE STEP INDIVIDUAL VIEWPORT OBSERVERS ---
  const step1Ref = useRef<HTMLDivElement>(null)
  const step2Ref = useRef<HTMLDivElement>(null)
  const step3Ref = useRef<HTMLDivElement>(null)
  const step4Ref = useRef<HTMLDivElement>(null)

  const isStep1InView = useInView(step1Ref, { once: true, amount: 0.35 })
  const isStep2InView = useInView(step2Ref, { once: true, amount: 0.35 })
  const isStep3InView = useInView(step3Ref, { once: true, amount: 0.35 })
  const isStep4InView = useInView(step4Ref, { once: true, amount: 0.35 })

  // --- SCROLL PROGRESS LINE FOR MOBILE TIMELINE ---
  const { scrollYProgress } = useScroll({
    target: mobileContainerRef,
    offset: ["start 70%", "end 60%"]
  })

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 20 })

  return (
    <section 
      ref={sectionRef} 
      className="py-12 sm:py-16 md:py-20 bg-[#FAFAFA] relative overflow-hidden" 
      id="how-it-works"
      aria-label="Website development process"
    >
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(37,99,235,0.05)_0%,_transparent_75%)] pointer-events-none transform-gpu" />

      <div className="max-w-[1300px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <motion.div 
            initial={{ opacity: 0, scale: 0.92 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, ease: easeSaaS }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 shadow-2xs mb-3 transform-gpu"
          >
            <Rocket className="w-3.5 h-3.5 text-[#2563EB]" />
            <span className="text-[11px] font-bold text-[#2563EB] tracking-wider uppercase">How It Works</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: easeSaaS }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A0A0A] mb-3 tracking-tight font-sans leading-[1.15] transform-gpu"
          >
            From idea to live website in simple steps.
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="text-sm sm:text-base md:text-lg text-[#6B7280] font-medium leading-relaxed max-w-xl mx-auto transform-gpu"
          >
            We've simplified the entire process so you can focus on your business while we build your website.
          </motion.p>
        </div>


        {/* ========================================================================= */}
        {/* 1. MOBILE-ONLY VERTICAL PROGRESS TIMELINE (≤1023px) */}
        {/* ========================================================================= */}
        <div ref={mobileContainerRef} className="block lg:hidden relative mb-10 max-w-md mx-auto">
          
          {/* VERTICAL CONNECTING TRACK (GRAY BASE + ANIMATED BLUE PROGRESS FILL) */}
          <div className="absolute top-6 bottom-8 left-6 w-1 bg-gray-200/90 z-0 rounded-full transform-gpu">
            <motion.div 
              style={{ scaleY: shouldReduceMotion ? 1 : smoothProgress }}
              className="w-full h-full bg-[#2563EB] origin-top rounded-full shadow-xs transform-gpu"
            />
          </div>

          <div className="space-y-8 relative z-10">

            {/* STEP 1 */}
            <div ref={step1Ref} className="flex gap-4 items-start transform-gpu">
              <motion.div 
                animate={isStep1InView ? { scale: [1, 1.06, 1] } : {}}
                transition={{ duration: 0.4, ease: easeSaaS }}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 z-10 transition-all duration-300 transform-gpu ${
                  isStep1InView 
                    ? 'bg-[#2563EB] text-white shadow-lg shadow-blue-500/30 ring-4 ring-blue-100' 
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                01
              </motion.div>

              <motion.div 
                variants={cardVariants}
                initial="hidden"
                animate={isStep1InView ? "show" : "hidden"}
                className="bg-white border border-gray-200/90 rounded-[24px] p-6 shadow-sm flex-1 space-y-3 transform-gpu"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#2563EB] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                    Step 01
                  </span>
                  <span className="text-xl" role="img" aria-label="chat icon">💬</span>
                </div>

                <h3 className="text-lg font-bold text-[#0A0A0A] font-sans">
                  Tell Us About Your Business
                </h3>

                <p className="text-xs text-[#6B7280] font-medium leading-relaxed">
                  Share your business details, goals, and any reference websites or ideas you already have in mind.
                </p>

                {/* Mockup Preview */}
                <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-3.5 space-y-2 pt-3">
                  <div className="bg-white p-2.5 rounded-xl text-xs text-gray-700 shadow-2xs border border-gray-100 flex items-center justify-between">
                    <span>"Salon in Indiranagar, Bangalore"</span>
                    <Check className="w-4 h-4 text-blue-600 shrink-0 ml-1" />
                  </div>
                  <div className="bg-[#2563EB] text-white p-2.5 rounded-xl text-xs font-bold shadow-2xs ml-auto max-w-[90%] flex items-center justify-between gap-2">
                    <span>Details Received!</span>
                    <Send className="w-3.5 h-3.5 text-blue-200 shrink-0" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* STEP 2 */}
            <div ref={step2Ref} className="flex gap-4 items-start transform-gpu">
              <motion.div 
                animate={isStep2InView ? { scale: [1, 1.06, 1] } : {}}
                transition={{ duration: 0.4, ease: easeSaaS }}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 z-10 transition-all duration-300 transform-gpu ${
                  isStep2InView 
                    ? 'bg-[#2563EB] text-white shadow-lg shadow-blue-500/30 ring-4 ring-blue-100' 
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                02
              </motion.div>

              <motion.div 
                variants={cardVariants}
                initial="hidden"
                animate={isStep2InView ? "show" : "hidden"}
                className="bg-white border border-gray-200/90 rounded-[24px] p-6 shadow-sm flex-1 space-y-3 transform-gpu"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#2563EB] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                    Step 02
                  </span>
                  <span className="text-xl" role="img" aria-label="design icon">🎨</span>
                </div>

                <h3 className="text-lg font-bold text-[#0A0A0A] font-sans">
                  We Design & Build
                </h3>

                <p className="text-xs text-[#6B7280] font-medium leading-relaxed">
                  Our team designs and develops a high-speed, mobile-friendly website tailored specifically to your brand.
                </p>

                <div className="bg-gray-900 text-white rounded-2xl p-3.5 space-y-2 border border-gray-800">
                  <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                    <span className="flex items-center gap-1.5"><Code size={12} className="text-blue-400" /> Building Site...</span>
                    <span className="text-emerald-400 font-bold">100% Ready</span>
                  </div>
                  <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden p-0.5">
                    <motion.div 
                      initial={{ width: "0%" }}
                      animate={isStep2InView ? { width: "100%" } : {}}
                      transition={{ duration: 1.8, delay: 0.3, ease: easeSaaS }}
                      className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full rounded-full transform-gpu"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* STEP 3 */}
            <div ref={step3Ref} className="flex gap-4 items-start transform-gpu">
              <motion.div 
                animate={isStep3InView ? { scale: [1, 1.06, 1] } : {}}
                transition={{ duration: 0.4, ease: easeSaaS }}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 z-10 transition-all duration-300 transform-gpu ${
                  isStep3InView 
                    ? 'bg-[#2563EB] text-white shadow-lg shadow-blue-500/30 ring-4 ring-blue-100' 
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                03
              </motion.div>

              <motion.div 
                variants={cardVariants}
                initial="hidden"
                animate={isStep3InView ? "show" : "hidden"}
                className="bg-white border border-gray-200/90 rounded-[24px] p-6 shadow-sm flex-1 space-y-3 transform-gpu"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#2563EB] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                    Step 03
                  </span>
                  <span className="text-xl" role="img" aria-label="review icon">👀</span>
                </div>

                <h3 className="text-lg font-bold text-[#0A0A0A] font-sans">
                  Review & Approve
                </h3>

                <p className="text-xs text-[#6B7280] font-medium leading-relaxed">
                  Review your website preview, request any text or color changes, and approve the final version.
                </p>

                <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-3.5 space-y-2">
                  {["Design Checked & Verified", "Mobile Fluid Test Passed"].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-bold text-emerald-900 bg-white p-2 rounded-xl border border-emerald-100">
                      <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* STEP 4 */}
            <div ref={step4Ref} className="flex gap-4 items-start transform-gpu">
              <motion.div 
                animate={isStep4InView ? { scale: [1, 1.06, 1] } : {}}
                transition={{ duration: 0.4, ease: easeSaaS }}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 z-10 transition-all duration-300 transform-gpu ${
                  isStep4InView 
                    ? 'bg-[#2563EB] text-white shadow-lg shadow-blue-500/30 ring-4 ring-blue-100' 
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                04
              </motion.div>

              <motion.div 
                variants={cardVariants}
                initial="hidden"
                animate={isStep4InView ? "show" : "hidden"}
                className="bg-white border-2 border-[#2563EB] rounded-[24px] p-6 shadow-md flex-1 space-y-3 transform-gpu"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-white bg-[#2563EB] px-2.5 py-1 rounded-full">
                    Step 04
                  </span>
                  <span className="text-xl" role="img" aria-label="launch icon">🚀</span>
                </div>

                <h3 className="text-lg font-bold text-[#0A0A0A] font-sans">
                  Launch Your Website
                </h3>

                <p className="text-xs text-[#6B7280] font-medium leading-relaxed">
                  Your website goes live on your custom domain, ready for new customers to find you on Google.
                </p>

                <div className="bg-[#0A0A0A] text-white rounded-2xl p-3.5 border border-gray-800 text-center space-y-2">
                  <div className="flex items-center justify-center gap-1.5">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                    <span className="text-xs font-bold text-emerald-400">WEBSITE IS LIVE</span>
                  </div>
                  <div className="bg-white/10 p-2 rounded-xl border border-white/10 font-mono text-xs text-blue-300 font-bold truncate">
                    https://yourbusiness.in
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>


        {/* ========================================================================= */}
        {/* 2. UNTOUCHED DESKTOP TIMELINE (≥1024px) */}
        {/* ========================================================================= */}
        <div className="hidden lg:block relative mb-10 max-w-5xl mx-auto">
          
          <div className="absolute top-[90px] left-[8%] right-[8%] h-1 bg-gray-200 z-0 rounded-full">
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.3, ease: easeSaaS }}
              className="h-full bg-gradient-to-r from-[#2563EB] via-blue-500 to-[#2563EB] origin-left rounded-full shadow-2xs transform-gpu"
            />
          </div>

          {outerFloatingChips.map((chip, i) => (
            <motion.div
              key={chip.text}
              animate={shouldReduceMotion ? {} : { y: [0, -5, 0], rotate: [0, i % 2 === 0 ? 1 : -1, 0] }}
              transition={{ repeat: Infinity, duration: 5 + i, ease: "easeInOut", delay: i * 0.4 }}
              className={`${chip.xlOnly ? 'hidden xl:flex' : 'flex'} absolute z-30 items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/95 border border-gray-200/90 shadow-md backdrop-blur-md text-xs font-bold text-gray-700 pointer-events-none transform-gpu ${chip.pos}`}
            >
              <span>{chip.text}</span>
            </motion.div>
          ))}

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="grid grid-cols-4 gap-6 relative z-10"
          >
            {/* STEP 1 */}
            <motion.div 
              variants={cardVariants}
              whileHover={{ y: -4, boxShadow: "0 20px 30px -10px rgba(0,0,0,0.08)" }}
              className="bg-white border border-gray-200/90 rounded-[24px] p-5 flex flex-col justify-between shadow-sm relative group transition-all duration-300 transform-gpu"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] font-black text-base shadow-2xs group-hover:bg-[#2563EB] group-hover:text-white transition-colors duration-300">
                    💬
                  </div>
                  <span className="text-[10px] font-mono font-extrabold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                    STEP 01
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#0A0A0A] font-sans mb-1">
                  Tell Us About Business
                </h3>

                <p className="text-xs text-[#6B7280] font-medium leading-relaxed">
                  Share your business details, goals, and any ideas you already have.
                </p>
              </div>

              <div className="bg-blue-50/50 border border-blue-100/80 rounded-2xl p-3 space-y-2 mt-4">
                <div className="bg-white p-2 rounded-xl text-[10px] text-gray-700 shadow-2xs border border-gray-100 flex items-center justify-between">
                  <span className="truncate">"Salon in Indiranagar"</span>
                  <Check className="w-3 h-3 text-blue-600 shrink-0 ml-1" />
                </div>

                <div className="bg-[#2563EB] text-white p-2 rounded-xl text-[10px] font-medium shadow-2xs ml-auto max-w-[95%] flex items-center justify-between gap-1">
                  <span className="truncate">Requirements received!</span>
                  <Send className="w-3 h-3 text-blue-200 shrink-0" />
                </div>
              </div>
            </motion.div>

            {/* STEP 2 */}
            <motion.div 
              variants={cardVariants}
              whileHover={{ y: -4, boxShadow: "0 20px 30px -10px rgba(0,0,0,0.08)" }}
              className="bg-white border border-gray-200/90 rounded-[24px] p-5 flex flex-col justify-between shadow-sm relative group transition-all duration-300 transform-gpu"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] font-black text-base shadow-2xs group-hover:bg-[#2563EB] group-hover:text-white transition-colors duration-300">
                    🎨
                  </div>
                  <span className="text-[10px] font-mono font-extrabold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                    STEP 02
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#0A0A0A] font-sans mb-1">
                  We Design & Build
                </h3>

                <p className="text-xs text-[#6B7280] font-medium leading-relaxed">
                  Our team designs and develops a modern website tailored to your brand.
                </p>
              </div>

              <div className="bg-gray-900 text-white rounded-2xl p-3 space-y-2 mt-4 border border-gray-800">
                <div className="flex items-center justify-between text-[10px] font-mono text-gray-400">
                  <span className="flex items-center gap-1"><Code size={10} className="text-blue-400" /> Building UI...</span>
                  <span className="text-emerald-400 font-bold">100% Ready</span>
                </div>

                <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden p-0.5">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={isInView ? { width: "100%" } : {}}
                    transition={{ duration: 1.8, delay: 0.5, ease: "easeInOut" }}
                    className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full rounded-full transform-gpu"
                  />
                </div>
              </div>
            </motion.div>

            {/* STEP 3 */}
            <motion.div 
              variants={cardVariants}
              whileHover={{ y: -4, boxShadow: "0 20px 30px -10px rgba(0,0,0,0.08)" }}
              className="bg-white border border-gray-200/90 rounded-[24px] p-5 flex flex-col justify-between shadow-sm relative group transition-all duration-300 transform-gpu"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] font-black text-base shadow-2xs group-hover:bg-[#2563EB] group-hover:text-white transition-colors duration-300">
                    👀
                  </div>
                  <span className="text-[10px] font-mono font-extrabold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                    STEP 03
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#0A0A0A] font-sans mb-1">
                  Review & Approve
                </h3>

                <p className="text-xs text-[#6B7280] font-medium leading-relaxed">
                  Review your website, request changes, and approve the final result.
                </p>
              </div>

              <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-3 space-y-1.5 mt-4">
                {["Design Checked", "Mobile Verified"].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-900 bg-white p-1.5 rounded-lg border border-emerald-100">
                    <CheckCircle2 size={12} className="text-emerald-600 shrink-0" />
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* STEP 4 */}
            <motion.div 
              variants={cardVariants}
              whileHover={{ y: -4, boxShadow: "0 20px 30px -10px rgba(37,99,235,0.15)" }}
              className="bg-white border-2 border-[#2563EB] rounded-[24px] p-5 flex flex-col justify-between shadow-md relative group transition-all duration-300 transform-gpu"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center font-black text-base shadow-2xs">
                    🚀
                  </div>
                  <span className="text-[10px] font-mono font-extrabold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                    STEP 04
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#0A0A0A] font-sans mb-1">
                  Launch Your Website
                </h3>

                <p className="text-xs text-[#6B7280] font-medium leading-relaxed">
                  Your website goes live and is ready for customers to find you online.
                </p>
              </div>

              <div className="bg-[#0A0A0A] text-white rounded-2xl p-3 space-y-2 mt-4 border border-gray-800 text-center">
                <div className="flex items-center justify-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                  <span className="text-[10px] font-bold text-emerald-400">WEBSITE IS LIVE</span>
                </div>

                <div className="bg-white/10 px-2 py-1 rounded-xl border border-white/10 font-mono text-[10px] text-blue-300 font-bold truncate">
                  https://yourbusiness.in
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>


        {/* ESTIMATED TIMELINE FOOTER */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5, ease: easeSaaS }}
          className="bg-white border border-gray-200/90 rounded-2xl p-4 max-w-xl mx-auto shadow-2xs flex items-center justify-center gap-3 text-center transform-gpu"
        >
          <div className="p-2 bg-blue-50 text-[#2563EB] rounded-xl shrink-0">
            <Clock size={18} className="animate-spin [animation-duration:8s]" />
          </div>
          <div className="text-xs sm:text-sm font-bold text-[#0A0A0A]">
            Typical Delivery Time: <span className="text-[#2563EB]">⚡ 3–7 Business Days</span>
          </div>
        </motion.div>

      </div>
    </section> 
  )
}