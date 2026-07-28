import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView, type Variants } from 'framer-motion'
import { 
  Check, 
  X, 
  Sparkles, 
  ArrowRight, 
  Building2, 
  Zap, 
  Clock, 
  AlertCircle,
  Palette, 
  Rocket, 
  Server, 
  Wrench, 
  RefreshCw, 
  Search, 
  MessageSquare, 
  MapPin, 
  ShieldCheck, 
  Headphones, 
  Smartphone, 
  Compass,
  ChevronDown
} from 'lucide-react'
import { type PlanType } from '../Modal/EnquiryModal'

interface WhyUsProps {
  onOpenModal?: (plan?: PlanType) => void
}

// --- FRAMER MOTION VARIANTS ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 }
  }
}

const leftCardVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 90, damping: 18 } 
  }
}

const rightCardVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 90, damping: 18 } 
  }
}

const rowVariant: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 18 } }
}

export function WhyUs({ onOpenModal }: WhyUsProps) {
  const agencySectionRef = useRef<HTMLDivElement>(null)
  const diySectionRef = useRef<HTMLDivElement>(null)

  const isAgencyInView = useInView(agencySectionRef, { once: true, margin: "-60px" })
  const isDiyInView = useInView(diySectionRef, { once: true, margin: "-60px" })

  // Accordion state for mobile view
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx)
  }

  // --- DATA: AGENCY COMPARISON ---
  const agencyItems = [
    { text: "₹20,000–₹80,000 upfront cost", icon: X },
    { text: "2–6 weeks delivery timeline", icon: Clock },
    { text: "Maintenance charged extra", icon: X },
    { text: "Hidden charges & scope creep", icon: AlertCircle },
    { text: "Paid content updates & revisions", icon: X },
    { text: "Support depends on availability", icon: X },
  ]

  const prostoAgencyItems = [
    { text: "₹499/mo OR ₹4,999 one-time", highlight: true },
    { text: "Launch in just 3–5 days", highlight: true },
    { text: "High-speed hosting included", highlight: false },
    { text: "Maintenance & support included", highlight: false },
    { text: "Direct WhatsApp support & changes", highlight: false },
    { text: "100% transparent pricing — 0 hidden fees", highlight: false },
  ]

  // --- DATA: DIY BUILDER COMPARISON TABLE ---
  const diyComparisonData = [
    { icon: Palette, feature: "Professional Custom Design", wix: "DIY Template", godaddy: "Basic Layouts", prosto: "100% Handcrafted For You" },
    { icon: Rocket, feature: "Website Setup & Build", wix: "You build it", godaddy: "You build it", prosto: "Done entirely by our experts" },
    { icon: Server, feature: "Hosting Setup & Config", wix: "Included (DIY)", godaddy: "Extra renewal fee", prosto: "Managed high-speed hosting" },
    { icon: Wrench, feature: "Ongoing Maintenance", wix: "Self-managed", godaddy: "Self-managed", prosto: "Fully managed by ProstoLabs" },
    { icon: RefreshCw, feature: "Content Updates", wix: "Edit yourself", godaddy: "Edit yourself", prosto: "Send us a WhatsApp message" },
    { icon: Search, feature: "SEO Optimization", wix: "Basic checklist", godaddy: "Basic settings", prosto: "Technical SEO ready out of box" },
    { icon: MessageSquare, feature: "WhatsApp Integration", wix: "3rd-party app", godaddy: "Limited app", prosto: "Built-in direct WhatsApp chat" },
    { icon: MapPin, feature: "Google Maps Setup", wix: "Manual widget", godaddy: "Basic embed", prosto: "Verified location integration" },
    { icon: ShieldCheck, feature: "SSL Security", wix: "Included", godaddy: "Paid add-on", prosto: "Fully managed SSL security" },
    { icon: Headphones, feature: "Technical Support", wix: "Help center", godaddy: "Call center queue", prosto: "Direct WhatsApp support team" },
    { icon: Smartphone, feature: "Mobile Optimization", wix: "Manual edits", godaddy: "Auto-generated", prosto: "Flawless on all mobile screens" },
    { icon: Compass, feature: "Business Guidance", wix: "Software only", godaddy: "Software only", prosto: "Strategy for local business" },
    { icon: Clock, feature: "Time Required From You", wix: "15–30+ Hours", godaddy: "10–20+ Hours", prosto: "~15 Mins onboarding", isTimeField: true },
  ]

  return (
    <div className="bg-[#FAFAFA] text-[#0A0A0A]" id="why-us">
      
      {/* ========================================================================= */}
      {/* SECTION 1: PROSTOLABS VS TRADITIONAL AGENCIES CARDS */}
      {/* ========================================================================= */}
      <section ref={agencySectionRef} className="py-12 sm:py-16 md:py-20 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-3">
            <motion.div 
              initial={{ opacity: 0, y: -8 }}
              animate={isAgencyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
              <span className="text-[11px] font-bold text-[#2563EB] uppercase tracking-wider">
                Smart Investment Choice
              </span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 12 }}
              animate={isAgencyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-black font-sans tracking-tight text-[#0A0A0A]"
            >
              Why Pay Agency Prices?
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 8 }}
              animate={isAgencyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-sm sm:text-base md:text-lg text-[#6B7280] font-medium leading-relaxed max-w-2xl mx-auto"
            >
              Get a professional business website without spending <span className="text-gray-900 font-bold underline decoration-red-300">₹20,000–₹80,000 upfront</span>.
            </motion.p>
          </div>

          {/* MOBILE-ONLY STACKED CARDS (≤1023px) */}
          <div className="block lg:hidden space-y-6">
            <motion.div 
              variants={leftCardVariant}
              initial="hidden"
              animate={isAgencyInView ? "show" : "hidden"}
              className="bg-white rounded-[24px] border border-gray-200 p-6 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                  <div className="w-12 h-12 rounded-2xl bg-gray-100 text-gray-700 flex items-center justify-center shrink-0">
                    <Building2 size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0A0A0A]">Traditional Agency</h3>
                    <p className="text-xs text-gray-500 font-medium">High overhead & expensive fees</p>
                  </div>
                </div>

                <div className="mb-6 p-4 rounded-2xl bg-gray-50 border border-gray-200/60 text-center">
                  <div className="text-2xl font-black text-gray-400 line-through">
                    ₹20,000 – ₹80,000
                  </div>
                  <div className="text-xs font-semibold text-gray-500 mt-1">High Upfront Capital Investment</div>
                </div>

                <ul className="space-y-3.5">
                  {agencyItems.map((item, idx) => {
                    const IconComp = item.icon
                    return (
                      <li key={idx} className="flex items-center gap-3 text-xs font-medium text-gray-700">
                        <div className="w-6 h-6 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                          <IconComp size={14} strokeWidth={2.5} />
                        </div>
                        <span>{item.text}</span>
                      </li>
                    )
                  })}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-400 font-medium text-center">
                Typically suited for large corporations with massive budgets.
              </div>
            </motion.div>

            <motion.div 
              variants={rightCardVariant}
              initial="hidden"
              animate={isAgencyInView ? "show" : "hidden"}
              className="bg-white rounded-[24px] border-2 border-[#2563EB] p-6 shadow-lg shadow-blue-500/10 flex flex-col justify-between relative overflow-hidden"
            >
              <div>
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                  <div className="w-12 h-12 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center shadow-md shadow-blue-500/30 shrink-0">
                    <Zap size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0A0A0A]">ProstoLabs</h3>
                    <p className="text-xs text-[#2563EB] font-bold">Modern, Fast & Affordable</p>
                  </div>
                </div>

                <div className="mb-6 p-4 rounded-2xl bg-blue-50/80 border border-blue-100 text-center">
                  <div className="text-2xl font-black text-[#2563EB]">
                    ₹499/mo <span className="text-xs text-gray-500 font-normal">OR</span> ₹4,999 <span className="text-xs text-gray-500 font-normal">one-time</span>
                  </div>
                  <div className="text-xs font-bold text-blue-900 mt-1">Full Website + Hosting + Ongoing Support</div>
                </div>

                <ul className="space-y-3.5">
                  {prostoAgencyItems.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-xs font-semibold text-[#0A0A0A]">
                      <div className="w-6 h-6 rounded-full bg-[#2563EB] text-white flex items-center justify-center shrink-0">
                        <Check size={14} strokeWidth={3} />
                      </div>
                      <span className={item.highlight ? "text-[#2563EB] font-extrabold" : ""}>
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <button 
                  onClick={() => onOpenModal?.('care')}
                  className="w-full bg-[#2563EB] text-white font-bold text-sm h-[52px] px-6 rounded-2xl shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Get Started at ₹499/month</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          </div>

          {/* DESKTOP SIDE-BY-SIDE CARDS (≥1024px) */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={isAgencyInView ? "show" : "hidden"}
            className="hidden lg:grid grid-cols-2 gap-8 items-stretch"
          >
            <motion.div 
              variants={leftCardVariant}
              className="bg-white rounded-3xl border border-gray-200/90 p-8 shadow-sm flex flex-col justify-between relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-5 pb-5 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gray-100 text-gray-600 flex items-center justify-center shrink-0">
                      <Building2 size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#0A0A0A]">Traditional Agency</h3>
                      <p className="text-xs text-gray-500 font-medium">High overhead & agency fees</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6 p-3.5 rounded-2xl bg-gray-50 border border-gray-200/60 text-center">
                  <div className="text-3xl font-black text-gray-400 line-through">
                    ₹20,000 – ₹80,000
                  </div>
                  <div className="text-[11px] font-semibold text-gray-500 mt-0.5">High Upfront Capital Investment</div>
                </div>

                <ul className="space-y-3">
                  {agencyItems.map((item, idx) => {
                    const IconComp = item.icon
                    return (
                      <motion.li 
                        key={idx}
                        initial={{ opacity: 0, x: -8 }}
                        animate={isAgencyInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.25 + (idx * 0.04) }}
                        className="flex items-center gap-3 text-sm font-medium text-gray-600"
                      >
                        <div className="w-5 h-5 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0 shadow-2xs">
                          <IconComp size={11} strokeWidth={2.5} />
                        </div>
                        <span>{item.text}</span>
                      </motion.li>
                    )
                  })}
                </ul>
              </div>

              <div className="mt-6 pt-5 border-t border-gray-100 text-[11px] text-gray-400 font-medium text-center">
                Typically suited for large corporations with massive marketing budgets.
              </div>
            </motion.div>

            <motion.div 
              variants={rightCardVariant}
              whileHover={{ y: -6, boxShadow: "0 20px 45px -10px rgba(37,99,235,0.18)" }}
              transition={{ type: "spring", stiffness: 120, damping: 16 }}
              className="bg-white rounded-3xl border-2 border-[#2563EB] p-8 shadow-xl shadow-blue-500/10 flex flex-col justify-between relative overflow-hidden"
            >
              <div>
                <motion.div 
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="mb-5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2563EB] text-white text-[11px] font-bold shadow-md shadow-blue-500/20"
                >
                  <Sparkles size={13} />
                  <span>⭐ Save thousands while getting the same essentials.</span>
                </motion.div>

                <div className="flex items-center justify-between mb-5 pb-5 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center shadow-md shadow-blue-500/30 shrink-0">
                      <Zap size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#0A0A0A]">ProstoLabs</h3>
                      <p className="text-xs text-[#2563EB] font-bold">Modern, Fast & Affordable</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6 p-3.5 rounded-2xl bg-blue-50/80 border border-blue-100 text-center">
                  <div className="text-3xl font-black text-[#2563EB]">
                    ₹499/mo <span className="text-xs text-gray-500 font-normal">OR</span> ₹4,999 <span className="text-xs text-gray-500 font-normal">one-time</span>
                  </div>
                  <div className="text-[11px] font-bold text-blue-900 mt-0.5">Full Website + Hosting + Ongoing Support</div>
                </div>

                <ul className="space-y-3">
                  {prostoAgencyItems.map((item, idx) => (
                    <motion.li 
                      key={idx}
                      initial={{ opacity: 0, x: 8 }}
                      animate={isAgencyInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.25 + (idx * 0.04) }}
                      className="flex items-center gap-3 text-sm font-semibold text-[#0A0A0A]"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#2563EB] text-white flex items-center justify-center shrink-0 shadow-2xs">
                        <Check size={11} strokeWidth={3} />
                      </div>
                      <span className={item.highlight ? "text-[#2563EB] font-extrabold" : ""}>
                        {item.text}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-5 border-t border-gray-100">
                <motion.button 
                  onClick={() => onOpenModal?.('care')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#2563EB] text-white font-bold text-sm py-3.5 px-6 rounded-xl shadow-lg shadow-blue-500/25 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 text-center cursor-pointer"
                >
                  <span>Get Started at ₹499/month</span>
                  <ArrowRight size={14} />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* SECTION 2: MANAGED SERVICE VS DIY (PROSTOLABS VS OTHERS) */}
      {/* ========================================================================= */}
      <section ref={diySectionRef} className="py-12 sm:py-16 md:py-20 bg-white border-t border-gray-200/80 relative overflow-hidden">
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
            <motion.div 
              initial={{ opacity: 0, y: -8 }}
              animate={isDiyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
              <span className="text-[11px] font-bold text-[#2563EB] uppercase tracking-wider">
                Managed Service vs DIY
              </span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 12 }}
              animate={isDiyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-black font-sans tracking-tight text-[#0A0A0A]"
            >
              Build It Yourself... <br />
              <span className="text-[#2563EB]">Or Let Us Do Everything.</span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 8 }}
              animate={isDiyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-sm sm:text-base md:text-lg text-[#6B7280] font-medium leading-relaxed max-w-2xl mx-auto"
            >
              Spend your time running your business—not building your website.
            </motion.p>
          </div>

          {/* ========================================================================= */}
          {/* MOBILE EXPANDABLE COMPARISON CARDS WITH SWIPEABLE PILLS (≤1023px) */}
          {/* ========================================================================= */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={isDiyInView ? "show" : "hidden"}
            className="block lg:hidden space-y-3"
          >
            {/* SWIPEABLE SUMMARY BADGES FOR QUICK SCANNING */}
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar -mx-6 px-6 mb-2">
              <div className="px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-[#2563EB] text-[11px] font-extrabold whitespace-nowrap shrink-0 flex items-center gap-1.5">
                <Check size={13} strokeWidth={3} />
                <span>ProstoLabs: 100% Done-For-You</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-gray-100 border border-gray-200 text-gray-600 text-[11px] font-bold whitespace-nowrap shrink-0">
                Wix: DIY Builders
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-gray-100 border border-gray-200 text-gray-600 text-[11px] font-bold whitespace-nowrap shrink-0">
                GoDaddy: Self-Managed
              </div>
            </div>

            {/* EXPANDABLE CARDS (ONE PER FEATURE) */}
            {diyComparisonData.map((item, idx) => {
              const IconComp = item.icon
              const isExpanded = expandedIndex === idx

              return (
                <motion.div 
                  key={idx}
                  variants={rowVariant}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isExpanded 
                      ? 'bg-white border-[#2563EB] shadow-md shadow-blue-500/10 ring-1 ring-[#2563EB]/20' 
                      : 'bg-white border-gray-200/90 shadow-2xs hover:border-gray-300'
                  }`}
                >
                  {/* FEATURE ROW CARD HEADER (TOUCH TARGET) */}
                  <button
                    onClick={() => toggleExpand(idx)}
                    className="w-full p-4 flex items-center justify-between text-left cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3 pr-2 min-w-0">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isExpanded ? 'bg-[#2563EB] text-white shadow-xs' : 'bg-blue-50 text-[#2563EB]'
                      }`}>
                        <IconComp size={18} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-black text-[#0A0A0A] tracking-tight leading-tight truncate">
                          {item.feature}
                        </div>
                        {/* High-visibility primary value pill */}
                        <div className="text-[11px] font-bold text-[#2563EB] mt-0.5 truncate">
                          {item.prosto}
                        </div>
                      </div>
                    </div>

                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                      isExpanded ? 'bg-blue-50 border-blue-200 text-[#2563EB] rotate-180' : 'bg-gray-50 border-gray-200 text-gray-400'
                    }`}>
                      <ChevronDown size={15} />
                    </div>
                  </button>

                  {/* EXPANDABLE DETAILED COMPARISON PANEL */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden border-t border-gray-100 bg-gray-50/50"
                      >
                        <div className="p-4 space-y-2.5 text-xs">
                          
                          {/* PROSTOLABS HIGHLIGHTED ROW */}
                          <div className="bg-blue-50 border border-blue-200/80 rounded-xl p-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-5 h-5 rounded-full bg-[#2563EB] text-white flex items-center justify-center shrink-0 shadow-2xs">
                                <Check size={12} strokeWidth={3} />
                              </div>
                              <span className="font-extrabold text-[#2563EB] text-xs">ProstoLabs</span>
                            </div>
                            <span className="font-bold text-[#0A0A0A] text-right ml-2">{item.prosto}</span>
                          </div>

                          {/* OTHER PLATFORMS COMPARISON GRID */}
                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-white border border-gray-200/80 rounded-xl p-2.5 text-center">
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-0.5">Wix</span>
                              <span className="font-semibold text-gray-700 text-[11px]">{item.wix}</span>
                            </div>

                            <div className="bg-white border border-gray-200/80 rounded-xl p-2.5 text-center">
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-0.5">GoDaddy</span>
                              <span className="font-semibold text-gray-700 text-[11px]">{item.godaddy}</span>
                            </div>
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </motion.div>

          {/* ========================================================================= */}
          {/* DESKTOP TABLE (≥1024px UNTOUCHED) */}
          {/* ========================================================================= */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={isDiyInView ? "show" : "hidden"}
            className="hidden lg:block rounded-3xl border border-gray-200/90 bg-white shadow-xl overflow-hidden relative"
          >
            <div className="grid grid-cols-12 bg-gray-50/90 border-b border-gray-200/80 text-xs font-bold uppercase tracking-wider text-gray-700 items-stretch sticky top-0 z-20 backdrop-blur-md">
              <div className="col-span-4 px-6 py-4 text-gray-900 font-extrabold flex items-center">
                Features
              </div>
              <div className="col-span-2 px-4 py-4 text-center text-gray-600 font-bold border-l border-gray-200/60 flex items-center justify-center">
                Wix
              </div>
              <div className="col-span-2 px-4 py-4 text-center text-gray-600 font-bold border-l border-gray-200/60 flex items-center justify-center">
                GoDaddy
              </div>
              <div className="col-span-4 px-6 py-4 text-center bg-blue-50/90 border-l-2 border-[#2563EB] flex flex-col items-center justify-center relative">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#2563EB] text-white text-[10px] font-extrabold shadow-2xs mb-0.5">
                  ⭐ Best Value
                </div>
                <div className="text-base font-black text-[#2563EB] tracking-tight">ProstoLabs</div>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {diyComparisonData.map((row, idx) => {
                const IconComp = row.icon
                return (
                  <motion.div 
                    key={idx}
                    variants={rowVariant}
                    className="grid grid-cols-12 items-stretch hover:bg-gray-50/40 transition-colors group"
                  >
                    <div className="col-span-4 px-6 py-4 min-h-[88px] flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-gray-100/80 text-[#2563EB] flex items-center justify-center shrink-0 group-hover:bg-blue-50 transition-all">
                        <IconComp size={16} />
                      </div>
                      <span className="text-sm font-bold text-[#0A0A0A] leading-tight">{row.feature}</span>
                    </div>

                    <div className="col-span-2 px-4 py-4 min-h-[88px] flex items-center justify-center text-center text-xs font-medium text-gray-500 border-l border-gray-100">
                      {row.isTimeField ? (
                        <span className="text-amber-800 font-bold bg-amber-50 px-2.5 py-1 rounded border border-amber-200/60 text-xs">{row.wix}</span>
                      ) : (
                        <span>{row.wix}</span>
                      )}
                    </div>

                    <div className="col-span-2 px-4 py-4 min-h-[88px] flex items-center justify-center text-center text-xs font-medium text-gray-500 border-l border-gray-100">
                      {row.isTimeField ? (
                        <span className="text-amber-800 font-bold bg-amber-50 px-2.5 py-1 rounded border border-amber-200/60 text-xs">{row.godaddy}</span>
                      ) : (
                        <span>{row.godaddy}</span>
                      )}
                    </div>

                    <div className="col-span-4 px-6 py-4 min-h-[88px] bg-blue-50/40 border-l-2 border-[#2563EB] flex items-center">
                      <div className="grid grid-cols-[24px_1fr] gap-4 items-center w-full">
                        <motion.div 
                          initial={{ scale: 0.7, opacity: 0 }}
                          animate={isDiyInView ? { scale: 1, opacity: 1 } : {}}
                          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.12 + (idx * 0.02) }}
                          className="w-6 h-6 min-w-[24px] min-h-[24px] rounded-full bg-gradient-to-br from-[#3B82F6] via-[#2563EB] to-[#1D4ED8] text-white flex items-center justify-center shrink-0 shadow-2xs"
                        >
                          <Check size={13} strokeWidth={3} className="text-white" />
                        </motion.div>

                        {row.isTimeField ? (
                          <div>
                            <span className="inline-block bg-[#2563EB] text-white px-3 py-1 rounded-lg text-xs font-black shadow-2xs">
                              {row.prosto}
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm font-bold text-[#0A0A0A] leading-tight tracking-tight">
                            {row.prosto}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

          </motion.div>

          <div className="mt-6 text-center text-xs text-gray-500 font-medium">
            Note: Wix and GoDaddy require you to build, maintain, and troubleshoot your website yourself. ProstoLabs is a complete "Done-For-You" service.
          </div>

        </div>
      </section>

    </div>
  )
}