import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { 
  Rocket, 
  Clock, 
  Check, 
  CheckCircle2, 
  Smartphone, 
  Zap, 
  Search, 
  ShieldCheck, 
  Send,
  Code,
  MessageSquare
} from 'lucide-react'

// --- ANIMATION VARIANTS ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 }
  }
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 90, damping: 18 } 
  }
}

// --- FLOATING CHIPS CONFIG ---
const outerFloatingChips = [
  { icon: Smartphone, text: '📱 Mobile Ready', pos: '-top-8 left-0' },
  { icon: Zap, text: '⚡ Fast Loading', pos: '-top-8 right-0' },
  { icon: Search, text: '🔍 SEO Ready', pos: 'top-1/2 -translate-y-1/2 -left-12 xl:-left-16', xlOnly: true },
  { icon: MessageSquare, text: '💬 WhatsApp Connected', pos: 'top-1/2 -translate-y-1/2 -right-12 xl:-right-16', xlOnly: true },
]

export function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" })

  return (
    <section ref={sectionRef} className="py-10 md:py-14 bg-[#FAFAFA] relative overflow-hidden" id="how-it-works">
      
      {/* Soft Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(37,99,235,0.05)_0%,_transparent_75%)] pointer-events-none" />

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-6 md:mb-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 shadow-2xs mb-3"
          >
            <Rocket className="w-3.5 h-3.5 text-[#2563EB]" />
            <span className="text-[11px] font-bold text-[#2563EB] tracking-wider uppercase">🚀 How It Works</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0A0A0A] mb-3 tracking-tight font-sans leading-[1.15]"
          >
            From idea to live website in just a few simple steps.
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-base md:text-lg text-[#6B7280] font-medium leading-relaxed"
          >
            We've simplified the entire process so you can focus on your business while we build your website.
          </motion.p>
        </div>

        {/* TIMELINE CONTAINER STAGE */}
        <div className="relative mb-8 md:mb-10 max-w-5xl mx-auto px-2 md:px-0">
          
          {/* DESKTOP CONNECTING PROGRESS LINE */}
          <div className="hidden lg:block absolute top-[90px] left-[8%] right-[8%] h-1 bg-gray-200 z-0 rounded-full">
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="h-full bg-gradient-to-r from-[#2563EB] via-blue-500 to-[#2563EB] origin-left rounded-full shadow-2xs"
            />
          </div>

          {/* MOBILE CONNECTING VERTICAL LINE */}
          <div className="lg:hidden absolute top-10 bottom-10 left-8 w-1 bg-gray-200 z-0 rounded-full">
            <motion.div 
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-full bg-[#2563EB] origin-top rounded-full"
            />
          </div>

          {/* FLOATING BADGES */}
          {outerFloatingChips.map((chip, i) => (
            <motion.div
              key={chip.text}
              animate={{ y: [0, -5, 0], rotate: [0, i % 2 === 0 ? 1 : -1, 0] }}
              transition={{ repeat: Infinity, duration: 5 + i, ease: "easeInOut", delay: i * 0.4 }}
              className={`${chip.xlOnly ? 'hidden xl:flex' : 'hidden md:flex'} absolute z-30 items-center gap-2 px-3 py-1.5 rounded-2xl bg-white/95 border border-gray-200/90 shadow-md backdrop-blur-md text-[11px] font-bold text-gray-700 pointer-events-none ${chip.pos}`}
            >
              <span>{chip.text}</span>
            </motion.div>
          ))}

          {/* STEPS GRID (4 STEPS) */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="grid grid-cols-1 lg:grid-cols-4 gap-6 relative z-10 pl-14 lg:pl-0"
          >

            {/* STEP 1: TELL US ABOUT YOUR BUSINESS */}
            <motion.div 
              variants={cardVariants}
              whileHover={{ y: -5, boxShadow: "0 20px 30px -10px rgba(0,0,0,0.08)" }}
              className="bg-white border border-gray-200/90 rounded-[24px] p-5 flex flex-col justify-between shadow-xs relative group transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] font-black text-base shadow-2xs group-hover:bg-[#2563EB] group-hover:text-white transition-colors duration-300">
                    💬
                  </div>
                  <span className="text-[10px] font-mono font-black text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                    STEP 01
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#0A0A0A] font-sans mb-1.5">
                  Tell Us About Business
                </h3>

                <p className="text-xs text-[#6B7280] font-medium leading-relaxed mb-4">
                  Share your business details, goals, and any ideas you already have.
                </p>
              </div>

              <div className="bg-blue-50/50 border border-blue-100/80 rounded-2xl p-3 space-y-2 mt-auto">
                <div className="bg-white p-2 rounded-xl text-[10px] text-gray-700 shadow-2xs border border-gray-100 flex items-center justify-between">
                  <span>"I run a salon in Indiranagar"</span>
                  <Check className="w-3 h-3 text-blue-600 shrink-0" />
                </div>

                <div className="bg-[#2563EB] text-white p-2 rounded-xl text-[10px] font-medium shadow-2xs ml-auto max-w-[90%] flex items-center justify-between gap-1.5">
                  <span>Requirements received!</span>
                  <Send className="w-3 h-3 text-blue-200 animate-pulse shrink-0" />
                </div>

                <div className="flex items-center gap-1 text-[9px] text-blue-600 font-bold px-1">
                  <span>Processing details</span>
                  <span className="w-1 h-1 bg-blue-600 rounded-full animate-ping" />
                </div>
              </div>
            </motion.div>


            {/* STEP 2: WE DESIGN & BUILD */}
            <motion.div 
              variants={cardVariants}
              whileHover={{ y: -5, boxShadow: "0 20px 30px -10px rgba(0,0,0,0.08)" }}
              className="bg-white border border-gray-200/90 rounded-[24px] p-5 flex flex-col justify-between shadow-xs relative group transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] font-black text-base shadow-2xs group-hover:bg-[#2563EB] group-hover:text-white transition-colors duration-300">
                    🎨
                  </div>
                  <span className="text-[10px] font-mono font-black text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                    STEP 02
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#0A0A0A] font-sans mb-1.5">
                  We Design & Build
                </h3>

                <p className="text-xs text-[#6B7280] font-medium leading-relaxed mb-4">
                  Our team designs and develops a modern website tailored to your brand.
                </p>
              </div>

              <div className="bg-gray-900 text-white rounded-2xl p-3 space-y-2 mt-auto border border-gray-800">
                <div className="flex items-center justify-between text-[10px] font-mono text-gray-400">
                  <span className="flex items-center gap-1"><Code size={11} className="text-blue-400" /> Building UI...</span>
                  <span className="text-emerald-400 font-bold">100% Ready</span>
                </div>

                <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden p-0.5">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={isInView ? { width: "100%" } : {}}
                    transition={{ duration: 1.8, delay: 0.6, ease: "easeInOut" }}
                    className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full rounded-full"
                  />
                </div>

                <div className="bg-white/10 rounded-xl p-2 border border-white/10 space-y-1">
                  <div className="w-2/3 h-1 bg-blue-400 rounded" />
                  <div className="w-full h-1 bg-gray-400/50 rounded" />
                </div>
              </div>
            </motion.div>


            {/* STEP 3: REVIEW & APPROVE */}
            <motion.div 
              variants={cardVariants}
              whileHover={{ y: -5, boxShadow: "0 20px 30px -10px rgba(0,0,0,0.08)" }}
              className="bg-white border border-gray-200/90 rounded-[24px] p-5 flex flex-col justify-between shadow-xs relative group transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] font-black text-base shadow-2xs group-hover:bg-[#2563EB] group-hover:text-white transition-colors duration-300">
                    👀
                  </div>
                  <span className="text-[10px] font-mono font-black text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                    STEP 03
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#0A0A0A] font-sans mb-1.5">
                  Review & Approve
                </h3>

                <p className="text-xs text-[#6B7280] font-medium leading-relaxed mb-4">
                  Review your website, request changes if needed, and approve the final result.
                </p>
              </div>

              <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-3 space-y-1.5 mt-auto">
                {["Design & Layout Checked", "Mobile View Verified", "WhatsApp Link Tested"].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -8 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.8 + (idx * 0.15) }}
                    className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-900 bg-white p-1 rounded-lg border border-emerald-100"
                  >
                    <CheckCircle2 size={11} className="text-emerald-600 shrink-0" />
                    <span className="truncate">{item}</span>
                  </motion.div>
                ))}

                <motion.button 
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="w-full bg-emerald-600 text-white font-bold text-[9px] py-1.5 rounded-lg shadow-2xs mt-1"
                >
                  Approved ✓ Ready to Launch
                </motion.button>
              </div>
            </motion.div>


            {/* STEP 4: LAUNCH YOUR WEBSITE */}
            <motion.div 
              variants={cardVariants}
              whileHover={{ y: -5, boxShadow: "0 20px 30px -10px rgba(37,99,235,0.15)" }}
              className="bg-white border-2 border-[#2563EB] rounded-[24px] p-5 flex flex-col justify-between shadow-md relative group transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center font-black text-base shadow-xs">
                    🚀
                  </div>
                  <span className="text-[10px] font-mono font-black text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                    STEP 04
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#0A0A0A] font-sans mb-1.5">
                  Launch Your Website
                </h3>

                <p className="text-xs text-[#6B7280] font-medium leading-relaxed mb-4">
                  Your website goes live and is ready for customers to find you online.
                </p>
              </div>

              <div className="bg-[#0A0A0A] text-white rounded-2xl p-3 space-y-2 mt-auto border border-gray-800 text-center">
                <div className="flex items-center justify-center gap-1.5">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                  <span className="text-[10px] font-bold text-emerald-400">WEBSITE IS LIVE</span>
                </div>

                <div className="bg-white/10 px-2.5 py-1 rounded-xl border border-white/10 font-mono text-[10px] text-blue-300 font-bold truncate">
                  https://yourbusiness.in
                </div>

                <div className="text-[9px] text-gray-400 font-medium">
                  Ready to accept leads & calls 🎉
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>


        {/* ESTIMATED TIMELINE PROGRESS STRIP */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white border border-gray-200/90 rounded-2xl p-3.5 md:p-4 max-w-xl mx-auto shadow-2xs flex items-center justify-center gap-3 text-center"
        >
          <div className="p-1.5 bg-blue-50 text-[#2563EB] rounded-xl shrink-0">
            <Clock size={18} className="animate-spin [animation-duration:8s]" />
          </div>
          <div className="text-xs md:text-sm font-bold text-[#0A0A0A]">
            Typical Delivery Time: <span className="text-[#2563EB]">⚡ 3–7 Business Days</span>
          </div>
        </motion.div>

      </div>
    </section>
  )
}