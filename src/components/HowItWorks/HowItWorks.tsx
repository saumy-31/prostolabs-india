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
  Send,
  Code,
  MessageSquare
} from 'lucide-react'

// --- ANIMATION VARIANTS ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.12 }
  }
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 90, damping: 18 } 
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
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" })

  return (
    <section ref={sectionRef} className="py-6 sm:py-12 md:py-14 bg-[#FAFAFA] relative overflow-hidden" id="how-it-works">
      
      {/* Soft Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(37,99,235,0.05)_0%,_transparent_75%)] pointer-events-none" />

      {/* GUARANTEED 20-24PX MARGINS ON MOBILE */}
      <div className="max-w-[1300px] mx-auto px-5 sm:px-6 md:px-12 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-blue-50 border border-blue-100 shadow-2xs mb-2 sm:mb-3"
          >
            <Rocket className="w-3.5 h-3.5 text-[#2563EB]" />
            <span className="text-[10px] sm:text-[11px] font-bold text-[#2563EB] tracking-wider uppercase">How It Works</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A0A0A] mb-2 sm:mb-3 tracking-tight font-sans leading-[1.15]"
          >
            From idea to live website in simple steps.
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-xs sm:text-base md:text-lg text-[#6B7280] font-medium leading-relaxed max-w-xl mx-auto"
          >
            We've simplified the entire process so you can focus on your business while we build your website.
          </motion.p>
        </div>

        {/* TIMELINE CONTAINER STAGE */}
        <div className="relative mb-5 sm:mb-10 max-w-5xl mx-auto">
          
          {/* DESKTOP CONNECTING PROGRESS LINE (UNTOUCHED) */}
          <div className="hidden lg:block absolute top-[90px] left-[8%] right-[8%] h-1 bg-gray-200 z-0 rounded-full">
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="h-full bg-gradient-to-r from-[#2563EB] via-blue-500 to-[#2563EB] origin-left rounded-full shadow-2xs"
            />
          </div>

          {/* STREAMLINED MOBILE CONNECTING VERTICAL LINE */}
          <div className="lg:hidden absolute top-5 bottom-5 left-4.5 w-0.5 bg-gray-200 z-0 rounded-full">
            <motion.div 
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full bg-[#2563EB] origin-top rounded-full"
            />
          </div>

          {/* FLOATING BADGES (DESKTOP ONLY) */}
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

          {/* STEPS GRID (4 STEPS): COMPACT MOBILE TIMELINE PADDING */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-6 relative z-10 pl-9 sm:pl-12 lg:pl-0"
          >

            {/* STEP 1: TELL US ABOUT YOUR BUSINESS */}
            <motion.div 
              variants={cardVariants}
              whileHover={{ y: -4, boxShadow: "0 20px 30px -10px rgba(0,0,0,0.08)" }}
              className="bg-white border border-gray-200/90 rounded-xl sm:rounded-[24px] p-3.5 sm:p-5 flex flex-col justify-between shadow-2xs sm:shadow-sm relative group transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] font-black text-xs sm:text-base shadow-2xs group-hover:bg-[#2563EB] group-hover:text-white transition-colors duration-300">
                    💬
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-mono font-extrabold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                    STEP 01
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-[#0A0A0A] font-sans mb-1">
                  Tell Us About Business
                </h3>

                <p className="text-[11px] sm:text-xs text-[#6B7280] font-medium leading-relaxed">
                  Share your business details, goals, and any ideas you already have.
                </p>
              </div>

              {/* COMPACT MOCKUP VISUAL */}
              <div className="bg-blue-50/50 border border-blue-100/80 rounded-lg sm:rounded-2xl p-2 sm:p-3 space-y-1 sm:space-y-2 mt-3">
                <div className="bg-white p-1.5 sm:p-2 rounded-md sm:rounded-xl text-[9px] sm:text-[10px] text-gray-700 shadow-2xs border border-gray-100 flex items-center justify-between">
                  <span className="truncate">"Salon in Indiranagar"</span>
                  <Check className="w-3 h-3 text-blue-600 shrink-0 ml-1" />
                </div>

                <div className="bg-[#2563EB] text-white p-1.5 sm:p-2 rounded-md sm:rounded-xl text-[9px] sm:text-[10px] font-medium shadow-2xs ml-auto max-w-[95%] flex items-center justify-between gap-1">
                  <span className="truncate">Requirements received!</span>
                  <Send className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-200 shrink-0" />
                </div>
              </div>
            </motion.div>


            {/* STEP 2: WE DESIGN & BUILD */}
            <motion.div 
              variants={cardVariants}
              whileHover={{ y: -4, boxShadow: "0 20px 30px -10px rgba(0,0,0,0.08)" }}
              className="bg-white border border-gray-200/90 rounded-xl sm:rounded-[24px] p-3.5 sm:p-5 flex flex-col justify-between shadow-2xs sm:shadow-sm relative group transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] font-black text-xs sm:text-base shadow-2xs group-hover:bg-[#2563EB] group-hover:text-white transition-colors duration-300">
                    🎨
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-mono font-extrabold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                    STEP 02
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-[#0A0A0A] font-sans mb-1">
                  We Design & Build
                </h3>

                <p className="text-[11px] sm:text-xs text-[#6B7280] font-medium leading-relaxed">
                  Our team designs and develops a modern website tailored to your brand.
                </p>
              </div>

              {/* COMPACT MOCKUP VISUAL */}
              <div className="bg-gray-900 text-white rounded-lg sm:rounded-2xl p-2 sm:p-3 space-y-1 sm:space-y-2 mt-3 border border-gray-800">
                <div className="flex items-center justify-between text-[8px] sm:text-[10px] font-mono text-gray-400">
                  <span className="flex items-center gap-1"><Code size={9} className="text-blue-400" /> Building UI...</span>
                  <span className="text-emerald-400 font-bold">100% Ready</span>
                </div>

                <div className="w-full bg-gray-800 h-1 sm:h-1.5 rounded-full overflow-hidden p-0.5">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={isInView ? { width: "100%" } : {}}
                    transition={{ duration: 1.8, delay: 0.5, ease: "easeInOut" }}
                    className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full rounded-full"
                  />
                </div>
              </div>
            </motion.div>


            {/* STEP 3: REVIEW & APPROVE */}
            <motion.div 
              variants={cardVariants}
              whileHover={{ y: -4, boxShadow: "0 20px 30px -10px rgba(0,0,0,0.08)" }}
              className="bg-white border border-gray-200/90 rounded-xl sm:rounded-[24px] p-3.5 sm:p-5 flex flex-col justify-between shadow-2xs sm:shadow-sm relative group transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] font-black text-xs sm:text-base shadow-2xs group-hover:bg-[#2563EB] group-hover:text-white transition-colors duration-300">
                    👀
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-mono font-extrabold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                    STEP 03
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-[#0A0A0A] font-sans mb-1">
                  Review & Approve
                </h3>

                <p className="text-[11px] sm:text-xs text-[#6B7280] font-medium leading-relaxed">
                  Review your website, request changes, and approve the final result.
                </p>
              </div>

              {/* COMPACT MOCKUP VISUAL */}
              <div className="bg-emerald-50/50 border border-emerald-100 rounded-lg sm:rounded-2xl p-2 sm:p-3 space-y-1 sm:space-y-1.5 mt-3">
                {["Design Checked", "Mobile Verified"].map((item, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-bold text-emerald-900 bg-white p-1 rounded sm:rounded-lg border border-emerald-100"
                  >
                    <CheckCircle2 size={10} className="text-emerald-600 shrink-0" />
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>


            {/* STEP 4: LAUNCH YOUR WEBSITE */}
            <motion.div 
              variants={cardVariants}
              whileHover={{ y: -4, boxShadow: "0 20px 30px -10px rgba(37,99,235,0.15)" }}
              className="bg-white border-2 border-[#2563EB] rounded-xl sm:rounded-[24px] p-3.5 sm:p-5 flex flex-col justify-between shadow-xs sm:shadow-md relative group transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-2xl bg-[#2563EB] text-white flex items-center justify-center font-black text-xs sm:text-base shadow-2xs">
                    🚀
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-mono font-extrabold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                    STEP 04
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-[#0A0A0A] font-sans mb-1">
                  Launch Your Website
                </h3>

                <p className="text-[11px] sm:text-xs text-[#6B7280] font-medium leading-relaxed">
                  Your website goes live and is ready for customers to find you online.
                </p>
              </div>

              {/* COMPACT MOCKUP VISUAL */}
              <div className="bg-[#0A0A0A] text-white rounded-lg sm:rounded-2xl p-2 sm:p-3 space-y-1 sm:space-y-2 mt-3 border border-gray-800 text-center">
                <div className="flex items-center justify-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                  <span className="text-[8px] sm:text-[10px] font-bold text-emerald-400">WEBSITE IS LIVE</span>
                </div>

                <div className="bg-white/10 px-1.5 py-0.5 sm:py-1 rounded-md sm:rounded-xl border border-white/10 font-mono text-[8px] sm:text-[10px] text-blue-300 font-bold truncate">
                  https://yourbusiness.in
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>


        {/* ESTIMATED TIMELINE PROGRESS STRIP */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white border border-gray-200/90 rounded-xl sm:rounded-2xl p-3 sm:p-4 max-w-xl mx-auto shadow-2xs flex items-center justify-center gap-2.5 sm:gap-3 text-center"
        >
          <div className="p-1.5 bg-blue-50 text-[#2563EB] rounded-lg sm:rounded-xl shrink-0">
            <Clock size={15} className="animate-spin [animation-duration:8s]" />
          </div>
          <div className="text-xs sm:text-sm font-bold text-[#0A0A0A]">
            Typical Delivery Time: <span className="text-[#2563EB]">⚡ 3–7 Business Days</span>
          </div>
        </motion.div>

      </div>
    </section> 
  )
}