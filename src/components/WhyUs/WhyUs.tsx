import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
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
  Compass 
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
    transition: { staggerChildren: 0.1, delayChildren: 0.05 }
  }
}

const leftCardVariant: Variants = {
  hidden: { opacity: 0, x: -30 },
  show: { 
    opacity: 1, 
    x: 0, 
    transition: { type: "spring", stiffness: 90, damping: 18 } 
  }
}

const rightCardVariant: Variants = {
  hidden: { opacity: 0, x: 30 },
  show: { 
    opacity: 1, 
    x: 0, 
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

  // --- DATA: AGENCY COMPARISON ---
  const agencyItems = [
    { text: "₹20,000–₹80,000 upfront cost", icon: X, mobile: true },
    { text: "2–6 weeks delivery timeline", icon: Clock, mobile: true },
    { text: "Maintenance costs charged extra", icon: X, mobile: true },
    { text: "Paid content updates & revisions", icon: X, mobile: false },
    { text: "Hidden charges & scope creep", icon: AlertCircle, mobile: true },
    { text: "Multiple meetings & complex onboarding", icon: X, mobile: false },
    { text: "Support depends on agency availability", icon: X, mobile: false },
  ]

  const prostoAgencyItems = [
    { text: "₹499/month OR ₹4,999 one-time", highlight: true },
    { text: "Launch in just 3–5 days", highlight: true },
    { text: "High-speed hosting included", highlight: false },
    { text: "Maintenance included (₹499/mo plan)", highlight: false },
    { text: "Direct WhatsApp support & quick changes", highlight: false },
    { text: "SEO ready & mobile responsive out of the box", highlight: false },
    { text: "100% transparent pricing — zero hidden fees", highlight: false },
    { text: "Simple 15-minute onboarding process", highlight: false },
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
      <section ref={agencySectionRef} className="py-8 sm:py-12 md:py-14 relative overflow-hidden">
        {/* Ambient Blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-8 space-y-2 sm:space-y-3">
            <motion.div 
              initial={{ opacity: 0, y: -8 }}
              animate={isAgencyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-blue-50 border border-blue-100/90 shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
              <span className="text-[10px] sm:text-[11px] font-bold text-[#2563EB] uppercase tracking-wider">
                Smart Investment Choice
              </span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 12 }}
              animate={isAgencyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl sm:text-4xl md:text-5xl font-black font-sans tracking-tight text-[#0A0A0A]"
            >
              Why Pay Agency Prices?
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 8 }}
              animate={isAgencyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-xs sm:text-base md:text-lg text-[#6B7280] font-medium leading-relaxed max-w-2xl mx-auto"
            >
              Get a professional business website without spending <span className="text-gray-900 font-bold underline decoration-red-300">₹20,000–₹80,000 upfront</span>.
            </motion.p>
          </div>

          {/* Cards */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={isAgencyInView ? "show" : "hidden"}
            className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 md:gap-8 items-stretch"
          >
            {/* Left Card: Traditional Agency */}
            <motion.div 
              variants={leftCardVariant}
              className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200/90 p-5 sm:p-8 shadow-xs sm:shadow-sm flex flex-col justify-between relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-4 sm:mb-5 pb-4 sm:pb-5 border-b border-gray-100">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gray-100 text-gray-600 flex items-center justify-center shrink-0">
                      <Building2 size={18} />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-xl font-bold text-[#0A0A0A]">Traditional Agency</h3>
                      <p className="text-[11px] sm:text-xs text-gray-500 font-medium">High overhead & custom agency fees</p>
                    </div>
                  </div>
                </div>

                <div className="mb-4 sm:mb-6 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-gray-50 border border-gray-200/60 text-center">
                  <div className="text-xl sm:text-3xl font-black text-gray-400 line-through">
                    ₹20,000 – ₹80,000
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-semibold text-gray-500 mt-0.5">High Upfront Capital Investment</div>
                </div>

                <ul className="space-y-2.5 sm:space-y-3">
                  {agencyItems.map((item, idx) => {
                    const IconComp = item.icon
                    return (
                      <motion.li 
                        key={idx}
                        initial={{ opacity: 0, x: -8 }}
                        animate={isAgencyInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.25 + (idx * 0.04) }}
                        className={`items-start gap-2.5 sm:gap-3 text-xs sm:text-sm font-medium text-gray-600 ${item.mobile ? 'flex' : 'hidden sm:flex'}`}
                      >
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0 mt-0.5">
                          <IconComp size={11} strokeWidth={2.5} />
                        </div>
                        <span>{item.text}</span>
                      </motion.li>
                    )
                  })}
                </ul>
              </div>

              <div className="mt-4 sm:mt-6 pt-4 sm:pt-5 border-t border-gray-100 text-[10px] sm:text-[11px] text-gray-400 font-medium text-center">
                Typically suited for large corporations with massive marketing budgets.
              </div>
            </motion.div>

            {/* Right Card: ProstoLabs */}
            <motion.div 
              variants={rightCardVariant}
              whileHover={{ y: -6, boxShadow: "0 20px 45px -10px rgba(37,99,235,0.18)" }}
              transition={{ type: "spring", stiffness: 120, damping: 16 }}
              className="bg-white rounded-2xl sm:rounded-3xl border-2 border-[#2563EB] p-5 sm:p-8 shadow-lg sm:shadow-xl shadow-blue-500/10 flex flex-col justify-between relative overflow-hidden"
            >
              <div>
                <motion.div 
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="mb-4 sm:mb-5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#2563EB] text-white text-[10px] sm:text-[11px] font-bold shadow-md shadow-blue-500/20"
                >
                  <Sparkles size={12} />
                  <span>⭐ Save thousands while getting the same essentials.</span>
                </motion.div>

                <div className="flex items-center justify-between mb-4 sm:mb-5 pb-4 sm:pb-5 border-b border-gray-100">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#2563EB] text-white flex items-center justify-center shadow-md shadow-blue-500/30 shrink-0">
                      <Zap size={18} />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-xl font-bold text-[#0A0A0A]">ProstoLabs</h3>
                      <p className="text-[11px] sm:text-xs text-[#2563EB] font-bold">Modern, Fast & Affordable</p>
                    </div>
                  </div>
                </div>

                <div className="mb-4 sm:mb-6 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-blue-50/80 border border-blue-100 text-center">
                  <div className="text-xl sm:text-3xl font-black text-[#2563EB]">
                    ₹499/mo <span className="text-xs text-gray-500 font-normal">OR</span> ₹4,999 <span className="text-xs text-gray-500 font-normal">one-time</span>
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-bold text-blue-900 mt-0.5">Full Website + Hosting + Ongoing Support</div>
                </div>

                <ul className="space-y-2.5 sm:space-y-3">
                  {prostoAgencyItems.map((item, idx) => (
                    <motion.li 
                      key={idx}
                      initial={{ opacity: 0, x: 8 }}
                      animate={isAgencyInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.25 + (idx * 0.04) }}
                      className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm font-semibold text-[#0A0A0A]"
                    >
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#2563EB] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                        <Check size={11} strokeWidth={3} />
                      </div>
                      <span className={item.highlight ? "text-[#2563EB] font-extrabold" : ""}>
                        {item.text}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-gray-100">
                <motion.button 
                  onClick={() => onOpenModal?.('care')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#2563EB] text-white font-bold text-xs sm:text-sm h-12 sm:h-auto sm:py-3.5 px-6 rounded-xl shadow-lg shadow-blue-500/25 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 text-center cursor-pointer"
                >
                  <span>Get Started at ₹499/month</span>
                  <ArrowRight size={15} />
                </motion.button>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* SECTION 2: DIY WEBSITE BUILDERS VS PROSTOLABS TABLE */}
      {/* ========================================================================= */}
      <section ref={diySectionRef} className="py-8 sm:py-12 md:py-14 bg-white border-t border-gray-200/80 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-8 space-y-2 sm:space-y-3">
            <motion.div 
              initial={{ opacity: 0, y: -8 }}
              animate={isDiyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-blue-50 border border-blue-100 shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
              <span className="text-[10px] sm:text-[11px] font-bold text-[#2563EB] uppercase tracking-wider">
                Managed Service vs DIY
              </span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 12 }}
              animate={isDiyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl sm:text-4xl md:text-5xl font-black font-sans tracking-tight text-[#0A0A0A]"
            >
              Build It Yourself... <br />
              <span className="text-[#2563EB]">Or Let Us Do Everything.</span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 8 }}
              animate={isDiyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-xs sm:text-base md:text-lg text-[#6B7280] font-medium leading-relaxed max-w-2xl mx-auto"
            >
              Spend your time running your business—not building your website.
            </motion.p>
          </div>

          {/* Touch-Friendly Comparison Table Container */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={isDiyInView ? "show" : "hidden"}
            className="rounded-2xl sm:rounded-3xl border border-gray-200/90 bg-white shadow-lg overflow-x-auto relative no-scrollbar"
          >
            <div className="min-w-[640px] md:min-w-0">
              
              {/* Table Header */}
              <div className="grid grid-cols-12 bg-gray-50/90 border-b border-gray-200/80 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-700 items-stretch sticky top-0 z-20 backdrop-blur-md">
                <div className="col-span-4 px-3 sm:px-6 py-3.5 text-gray-900 font-extrabold flex items-center">
                  Features
                </div>
                <div className="col-span-2 px-2 sm:px-4 py-3.5 text-center text-gray-600 font-bold border-l border-gray-200/60 flex items-center justify-center">
                  Wix
                </div>
                <div className="col-span-2 px-2 sm:px-4 py-3.5 text-center text-gray-600 font-bold border-l border-gray-200/60 flex items-center justify-center">
                  GoDaddy
                </div>
                <div className="col-span-4 px-3 sm:px-6 py-3.5 text-center bg-blue-50/90 border-l-2 border-[#2563EB] flex flex-col items-center justify-center relative">
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#2563EB] text-white text-[8px] sm:text-[10px] font-extrabold shadow-2xs mb-0.5">
                    ⭐ Best Value
                  </div>
                  <div className="text-xs sm:text-base font-black text-[#2563EB] tracking-tight">ProstoLabs</div>
                </div>
              </div>

              {/* Table Rows */}
              <div className="divide-y divide-gray-100">
                {diyComparisonData.map((row, idx) => {
                  const IconComp = row.icon
                  return (
                    <motion.div 
                      key={idx}
                      variants={rowVariant}
                      className="grid grid-cols-12 items-stretch hover:bg-gray-50/40 transition-colors group"
                    >
                      {/* Column 1: Feature */}
                      <div className="col-span-4 px-3 sm:px-6 py-3.5 min-h-[64px] sm:min-h-[88px] flex items-center gap-2 sm:gap-3">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-gray-100/80 text-[#2563EB] flex items-center justify-center shrink-0 group-hover:bg-blue-50 transition-all">
                          <IconComp size={14} />
                        </div>
                        <span className="text-[11px] sm:text-sm font-bold text-[#0A0A0A] leading-tight">{row.feature}</span>
                      </div>

                      {/* Column 2: Wix */}
                      <div className="col-span-2 px-2 sm:px-4 py-3.5 min-h-[64px] sm:min-h-[88px] flex items-center justify-center text-center text-[10px] sm:text-xs font-medium text-gray-500 border-l border-gray-100">
                        {row.isTimeField ? (
                          <span className="text-amber-800 font-bold bg-amber-50 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded border border-amber-200/60 text-[9px] sm:text-xs">{row.wix}</span>
                        ) : (
                          <span>{row.wix}</span>
                        )}
                      </div>

                      {/* Column 3: GoDaddy */}
                      <div className="col-span-2 px-2 sm:px-4 py-3.5 min-h-[64px] sm:min-h-[88px] flex items-center justify-center text-center text-[10px] sm:text-xs font-medium text-gray-500 border-l border-gray-100">
                        {row.isTimeField ? (
                          <span className="text-amber-800 font-bold bg-amber-50 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded border border-amber-200/60 text-[9px] sm:text-xs">{row.godaddy}</span>
                        ) : (
                          <span>{row.godaddy}</span>
                        )}
                      </div>

                      {/* Column 4: ProstoLabs */}
                      <div className="col-span-4 px-3 sm:px-6 py-3.5 min-h-[64px] sm:min-h-[88px] bg-blue-50/40 border-l-2 border-[#2563EB] flex items-center">
                        <div className="grid grid-cols-[20px_1fr] sm:grid-cols-[24px_1fr] gap-2.5 sm:gap-4 items-center w-full">
                          
                          {/* Badge */}
                          <motion.div 
                            initial={{ scale: 0.7, opacity: 0 }}
                            animate={isDiyInView ? { scale: 1, opacity: 1 } : {}}
                            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.12 + (idx * 0.02) }}
                            className="w-5 h-5 sm:w-6 sm:h-6 min-w-[20px] min-h-[20px] sm:min-w-[24px] sm:min-h-[24px] rounded-full bg-gradient-to-br from-[#3B82F6] via-[#2563EB] to-[#1D4ED8] text-white flex items-center justify-center shrink-0 shadow-2xs"
                          >
                            <Check size={12} strokeWidth={3} className="text-white" />
                          </motion.div>

                          {/* Text */}
                          {row.isTimeField ? (
                            <div>
                              <span className="inline-block bg-[#2563EB] text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-black shadow-2xs">
                                {row.prosto}
                              </span>
                            </div>
                          ) : (
                            <span className="text-[11px] sm:text-sm font-bold text-[#0A0A0A] leading-tight tracking-tight">
                              {row.prosto}
                            </span>
                          )}

                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

            </div>
          </motion.div>

          <div className="mt-4 sm:mt-6 text-center text-[11px] sm:text-xs text-gray-500 font-medium">
            Note: Wix and GoDaddy require you to build, maintain, and troubleshoot your website yourself. ProstoLabs is a complete "Done-For-You" service.
          </div>

        </div>
      </section>

    </div>
  )
}