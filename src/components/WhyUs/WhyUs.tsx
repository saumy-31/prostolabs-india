import { useState, useRef } from 'react'
import { 
  motion, 
  AnimatePresence, 
  useInView, 
  useReducedMotion,
  type Variants 
} from 'framer-motion'
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
  DollarSign,
  UserX,
  ZapOff,
  Lock,
  Database,
  Key,
  Calendar,
  HelpCircle,
  Mail,
  Gauge
} from 'lucide-react'
import { type PlanType } from '../Modal/EnquiryModal'

interface WhyUsProps {
  onOpenModal?: (plan?: PlanType) => void
}

// --- SAAS EASING CURVES & VARIANTS ---
const easeSaaS = [0.16, 1, 0.3, 1] as const

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 }
  }
}

const leftCardVariant: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 85, damping: 18 } 
  }
}

const rightCardVariant: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 85, damping: 18 } 
  }
}

export function WhyUs({ onOpenModal }: WhyUsProps) {
  const agencySectionRef = useRef<HTMLDivElement>(null)
  const diySectionRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const isAgencyInView = useInView(agencySectionRef, { once: true, margin: "-30px" })
  const isDiyInView = useInView(diySectionRef, { once: true, margin: "-30px" })

  // --- EXPAND STATES FOR COMPARISON TABLE ---
  const [showAllMobileRows, setShowAllMobileRows] = useState(false)
  const [showAllDesktopRows, setShowAllDesktopRows] = useState(false)

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

  // --- DATA: COMPREHENSIVE BUSINESS COMPARISON TABLE ---
  const diyComparisonData = [
    { icon: DollarSign, feature: "Starting Price", wix: "₹1,000+/mo (Plus Add-ons)", godaddy: "₹800+/mo (Renews Higher)", prosto: "₹499/mo or ₹4,999 One-time", isHighlight: true },
    { icon: UserX, feature: "You Build It Yourself", wix: "Yes (Requires 20+ Hrs)", godaddy: "Yes (Requires 15+ Hrs)", prosto: "No — Done Entirely For You", isHighlight: true },
    { icon: Rocket, feature: "Ready-to-Launch Website", wix: "Self-assembled", godaddy: "Self-assembled", prosto: "100% Fully Built & Ready" },
    { icon: Palette, feature: "Professional Custom Design", wix: "Generic Template", godaddy: "Basic Layouts", prosto: "Handcrafted Custom Design" },
    { icon: Server, feature: "Managed Hosting Included", wix: "Basic Shared", godaddy: "Extra Renewal Cost", prosto: "Fast Enterprise Cloud Hosting" },
    { icon: Lock, feature: "SSL Security Included", wix: "Included", godaddy: "Paid Annual Add-on", prosto: "Fully Managed & Auto-Renewed" },
    { icon: Wrench, feature: "Ongoing Maintenance", wix: "Self-managed", godaddy: "Self-managed", prosto: "100% Managed By ProstoLabs" },
    { icon: RefreshCw, feature: "Monthly Content Updates", wix: "Edit Yourself", godaddy: "Edit Yourself", prosto: "Send Us a WhatsApp Message" },
    { icon: MessageSquare, feature: "WhatsApp Support & Chat", wix: "3rd-Party Paid App", godaddy: "Limited Integration", prosto: "Direct WhatsApp Support Team" },
    { icon: MapPin, feature: "Google Maps & Business Setup", wix: "Manual Widget", godaddy: "Basic Embed", prosto: "Verified Profile & Map Integration" },
    { icon: Search, feature: "SEO Optimization Ready", wix: "Basic Checklist", godaddy: "Basic Settings", prosto: "Full Technical SEO On-Page Setup" },
    { icon: Smartphone, feature: "Mobile Responsiveness", wix: "Manual Mobile Edits", godaddy: "Auto-generated", prosto: "Flawless Multi-device Tuning" },
    { icon: Gauge, feature: "Fast Page Load Speeds", wix: "Variable (Heavy Scripts)", godaddy: "Average", prosto: "Optimized for <1s Speed Scores" },
    { icon: ShieldCheck, feature: "Website Security", wix: "Standard Software", godaddy: "Basic Protection", prosto: "Active Firewall & Threat Protection" },
    { icon: Database, feature: "Automated Daily Backups", wix: "Manual Revision Points", godaddy: "Paid Add-on", prosto: "Automated Cloud Backups" },
    { icon: Headphones, feature: "Technical Support", wix: "Support Ticket System", godaddy: "Call Center Queue", prosto: "Direct Developer Access on WhatsApp" },
    { icon: Key, feature: "Full Website Ownership", wix: "Locked to Platform", godaddy: "Locked to Platform", prosto: "100% Client Code & Asset Rights" },
    { icon: Calendar, feature: "Delivery Time", wix: "2–4 Weeks Self-Work", godaddy: "1–3 Weeks Self-Work", prosto: "3–7 Business Days Guaranteed", isHighlight: true },
    { icon: ZapOff, feature: "Hidden Charges", wix: "App Store Add-ons", godaddy: "High Renewal Prices", prosto: "Zero Hidden Fees — Transparent" },
    { icon: HelpCircle, feature: "Custom Domain Setup", wix: "Self-configured", godaddy: "Self-configured", prosto: "Complete DNS & SSL Configuration" },
    { icon: Mail, feature: "Business Email Setup", wix: "Google Workspace Extra", godaddy: "Paid Add-on", prosto: "DNS MX Routing & Setup Included" },
    { icon: Clock, feature: "Your Time Commitment", wix: "15–30+ Hours", godaddy: "10–20+ Hours", prosto: "~15 Mins Onboarding Brief", isTimeField: true },
  ]

  const visibleMobileRows = showAllMobileRows ? diyComparisonData : diyComparisonData.slice(0, 6)
  const visibleDesktopRows = showAllDesktopRows ? diyComparisonData : diyComparisonData.slice(0, 6)

  return (
    <div className="bg-[#FAFAFA] text-[#0A0A0A] font-sans selection:bg-blue-100 selection:text-blue-900" id="why-us">
      
      {/* ========================================================================= */}
      {/* SECTION 1: PROSTOLABS VS TRADITIONAL AGENCIES CARDS */}
      {/* ========================================================================= */}
      <section ref={agencySectionRef} className="py-12 sm:py-16 md:py-20 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none transform-gpu" />

        <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-3">
            <motion.div 
              initial={{ opacity: 0, y: -8 }}
              animate={isAgencyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 shadow-2xs transform-gpu"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
              <span className="text-[11px] font-bold text-[#2563EB] uppercase tracking-wider">
                Smart Investment Choice
              </span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 12 }}
              animate={isAgencyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1, ease: easeSaaS }}
              className="text-3xl sm:text-4xl md:text-5xl font-black font-sans tracking-tight text-[#0A0A0A] transform-gpu"
            >
              Why Pay High Agency Fees?
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 8 }}
              animate={isAgencyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
              className="text-sm sm:text-base md:text-lg text-[#6B7280] font-medium leading-relaxed max-w-2xl mx-auto transform-gpu"
            >
              Get a custom business website without spending <span className="text-gray-900 font-bold underline decoration-red-300">₹20,000–₹80,000 upfront</span>.
            </motion.p>
          </div>

          {/* MOBILE-ONLY STACKED CARDS (≤1023px) */}
          <div className="block lg:hidden space-y-6">
            <motion.div 
              variants={leftCardVariant}
              initial="hidden"
              animate={isAgencyInView ? "show" : "hidden"}
              className="bg-white rounded-[24px] border border-gray-200 p-6 shadow-sm flex flex-col justify-between transform-gpu"
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
              className="bg-white rounded-[24px] border-2 border-[#2563EB] p-6 shadow-lg shadow-blue-500/10 flex flex-col justify-between relative overflow-hidden transform-gpu"
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
                <motion.button 
                  onClick={() => onOpenModal?.('care')}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#2563EB] text-white font-bold text-sm h-[52px] px-6 rounded-2xl shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer active:bg-blue-700 transition-colors transform-gpu"
                >
                  <span>Get Started at ₹499/month</span>
                  <ArrowRight size={16} />
                </motion.button>
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
              className="bg-white rounded-3xl border border-gray-200/90 p-8 shadow-sm flex flex-col justify-between relative overflow-hidden transform-gpu"
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
                        transition={{ delay: 0.2 + (idx * 0.04) }}
                        className="flex items-center gap-3 text-sm font-medium text-gray-600 transform-gpu"
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
              className="bg-white rounded-3xl border-2 border-[#2563EB] p-8 shadow-xl shadow-blue-500/10 flex flex-col justify-between relative overflow-hidden transform-gpu"
            >
              <div>
                <motion.div 
                  animate={shouldReduceMotion ? {} : { scale: [1, 1.02, 1] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="mb-5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2563EB] text-white text-[11px] font-bold shadow-md shadow-blue-500/20 transform-gpu"
                >
                  <Sparkles size={13} />
                  <span>⭐ Save thousands while getting identical core results.</span>
                </motion.div>

                <div className="flex items-center justify-between mb-5 pb-5 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center shadow-md shadow-blue-500/30 shrink-0">
                      <Zap size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#0A0A0A]">ProstoLabs</h3>
                      <p className="text-xs text-[#2563EB] font-bold">Modern, Fast & Fully Managed</p>
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
                      transition={{ delay: 0.2 + (idx * 0.04) }}
                      className="flex items-center gap-3 text-sm font-semibold text-[#0A0A0A] transform-gpu"
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
                  className="w-full bg-[#2563EB] text-white font-bold text-sm py-3.5 px-6 rounded-xl shadow-lg shadow-blue-500/25 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 text-center cursor-pointer transform-gpu"
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
      {/* SECTION 2: MANAGED SERVICE VS DIY BUILDERS */}
      {/* ========================================================================= */}
      <section ref={diySectionRef} className="py-16 sm:py-20 md:py-24 bg-white border-t border-gray-200/80 relative overflow-hidden">
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[700px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none transform-gpu" />

        <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10">
          
          {/* SECTION HEADER */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
            <motion.div 
              initial={{ opacity: 0, y: -8 }}
              animate={isDiyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 shadow-2xs transform-gpu"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
              <span className="text-[11px] font-bold text-[#2563EB] uppercase tracking-wider">
                Compare Before You Decide
              </span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 12 }}
              animate={isDiyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1, ease: easeSaaS }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-sans tracking-tight text-[#0A0A0A] transform-gpu leading-[1.15]"
            >
              Why Build It Yourself When <br className="hidden sm:block" />
              <span className="text-[#2563EB]">We Can Do Everything For You?</span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 8 }}
              animate={isDiyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
              className="text-base sm:text-lg text-[#6B7280] font-medium leading-relaxed max-w-2xl mx-auto transform-gpu"
            >
              Website builders give you tools. ProstoLabs gives you a finished, professionally managed website—without technical work.
            </motion.p>
          </div>

          {/* ========================================================================= */}
          {/* MOBILE COMPARISON TABLE (≤1023px) */}
          {/* ========================================================================= */}
          <div className="block lg:hidden relative mb-12">
            <div className="rounded-2xl border-2 border-gray-200 bg-white shadow-lg overflow-x-auto no-scrollbar relative transform-gpu">
              <table className="w-full text-left min-w-[500px] border-collapse">
                <thead>
                  <tr className="bg-gray-100/80 border-b border-gray-200 text-[10px] font-extrabold uppercase tracking-wider text-gray-700">
                    <th className="p-3.5 w-[35%] font-sans">Feature</th>
                    <th className="p-3.5 text-center w-[20%]">Wix</th>
                    <th className="p-3.5 text-center w-[20%]">GoDaddy</th>
                    <th className="p-3.5 text-center w-[25%] bg-gradient-to-b from-[#2563EB] to-[#1D4ED8] text-white relative shadow-md">
                      <div className="inline-block bg-white text-[#2563EB] text-[8px] px-2 py-0.5 rounded-full font-black mb-1 uppercase tracking-wider">
                        ⭐ BEST VALUE
                      </div>
                      <div className="text-xs font-black font-sans tracking-tight">ProstoLabs</div>
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 text-xs font-medium">
                  <AnimatePresence initial={false}>
                    {visibleMobileRows.map((row, idx) => {
                      const IconComp = row.icon
                      return (
                        <motion.tr 
                          key={idx}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.25, ease: easeSaaS }}
                          className={`transform-gpu ${row.isHighlight ? 'bg-blue-50/20 font-semibold' : 'hover:bg-gray-50/50'}`}
                        >
                          <td className="p-3.5 flex items-center gap-2.5 font-bold text-[#0A0A0A]">
                            <div className="w-6 h-6 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0">
                              <IconComp size={13} />
                            </div>
                            <span className="truncate">{row.feature}</span>
                          </td>

                          <td className="p-3.5 text-center text-gray-500 text-[11px]">
                            {row.isTimeField ? (
                              <span className="text-amber-800 font-bold bg-amber-50 px-1.5 py-0.5 rounded text-[10px]">{row.wix}</span>
                            ) : (
                              row.wix
                            )}
                          </td>

                          <td className="p-3.5 text-center text-gray-500 text-[11px]">
                            {row.isTimeField ? (
                              <span className="text-amber-800 font-bold bg-amber-50 px-1.5 py-0.5 rounded text-[10px]">{row.godaddy}</span>
                            ) : (
                              row.godaddy
                            )}
                          </td>

                          <td className="p-3.5 text-center bg-blue-50/60 border-l-2 border-[#2563EB] font-bold text-[#2563EB] text-[11px]">
                            <div className="flex items-center justify-center gap-1.5">
                              <div className="w-4 h-4 rounded-full bg-[#2563EB] text-white flex items-center justify-center shrink-0">
                                <Check size={10} strokeWidth={3} />
                              </div>
                              {row.isTimeField ? (
                                <span className="bg-[#2563EB] text-white px-2 py-0.5 rounded text-[10px] font-black">{row.prosto}</span>
                              ) : (
                                <span className="text-[#0A0A0A] font-extrabold">{row.prosto}</span>
                              )}
                            </div>
                          </td>
                        </motion.tr>
                      )
                    })}
                  </AnimatePresence>
                </tbody>
              </table>

              {!showAllMobileRows && (
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none transform-gpu" />
              )}
            </div>

            <div className="mt-4 text-center">
              <motion.button
                onClick={() => setShowAllMobileRows(!showAllMobileRows)}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border border-gray-300 shadow-md text-xs font-extrabold text-[#2563EB] active:bg-blue-50 transition-colors cursor-pointer transform-gpu"
              >
                <span>{showAllMobileRows ? "Show Less ↑" : "View All Features ↓"}</span>
              </motion.button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* DESKTOP COMPARISON TABLE (≥1024px) */}
          {/* ========================================================================= */}
          <div className="hidden lg:block relative mb-16">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate={isDiyInView ? "show" : "hidden"}
              className="rounded-[32px] border-2 border-gray-200/90 bg-white shadow-2xl overflow-hidden relative transform-gpu"
            >
              <div className="grid grid-cols-12 bg-gray-100/90 border-b border-gray-200 text-xs font-extrabold uppercase tracking-wider text-gray-700 items-stretch sticky top-0 z-20 backdrop-blur-md">
                <div className="col-span-4 px-8 py-5 text-gray-900 font-black text-sm flex items-center font-sans">
                  Comparison Criteria
                </div>
                <div className="col-span-2 px-4 py-5 text-center text-gray-600 font-extrabold border-l border-gray-200/80 flex items-center justify-center">
                  Wix
                </div>
                <div className="col-span-2 px-4 py-5 text-center text-gray-600 font-extrabold border-l border-gray-200/80 flex items-center justify-center">
                  GoDaddy
                </div>
                
                {/* PROSTOLABS HIGHLIGHTED HEADER COLUMN */}
                <div className="col-span-4 px-6 py-5 text-center bg-gradient-to-b from-[#2563EB] to-[#1D4ED8] text-white border-l-2 border-[#2563EB] flex flex-col items-center justify-center relative shadow-lg">
                  <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-white text-[#2563EB] text-[10px] font-black uppercase tracking-wider mb-1 shadow-sm">
                    ⭐ BEST VALUE
                  </div>
                  <div className="text-xl font-black font-sans tracking-tight">ProstoLabs</div>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                <AnimatePresence initial={false}>
                  {visibleDesktopRows.map((row, idx) => {
                    const IconComp = row.icon
                    return (
                      <motion.div 
                        key={idx}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: easeSaaS }}
                        className={`grid grid-cols-12 items-stretch transition-colors group transform-gpu ${
                          row.isHighlight 
                            ? 'bg-blue-50/25 hover:bg-blue-50/40' 
                            : 'hover:bg-gray-50/60'
                        }`}
                      >
                        {/* FEATURE TITLE */}
                        <div className="col-span-4 px-8 py-4.5 min-h-[72px] flex items-center gap-3.5">
                          <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <IconComp size={16} />
                          </div>
                          <span className="text-sm font-bold text-[#0A0A0A] font-sans leading-snug">{row.feature}</span>
                        </div>

                        {/* WIX COLUMN */}
                        <div className="col-span-2 px-4 py-4.5 min-h-[72px] flex items-center justify-center text-center text-xs font-semibold text-gray-500 border-l border-gray-100">
                          {row.isTimeField ? (
                            <span className="text-amber-800 font-bold bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/60 text-xs">{row.wix}</span>
                          ) : (
                            <span>{row.wix}</span>
                          )}
                        </div>

                        {/* GODADDY COLUMN */}
                        <div className="col-span-2 px-4 py-4.5 min-h-[72px] flex items-center justify-center text-center text-xs font-semibold text-gray-500 border-l border-gray-100">
                          {row.isTimeField ? (
                            <span className="text-amber-800 font-bold bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/60 text-xs">{row.godaddy}</span>
                          ) : (
                            <span>{row.godaddy}</span>
                          )}
                        </div>

                        {/* PROSTOLABS COLUMN (VISUALLY HIGHLIGHTED) */}
                        <div className="col-span-4 px-8 py-4.5 min-h-[72px] bg-blue-50/50 border-l-2 border-[#2563EB] flex items-center transition-colors group-hover:bg-blue-50/80">
                          <div className="grid grid-cols-[24px_1fr] gap-3.5 items-center w-full">
                            <motion.div 
                              initial={{ scale: 0.7, opacity: 0 }}
                              animate={isDiyInView ? { scale: 1, opacity: 1 } : {}}
                              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.08 + (idx * 0.015) }}
                              className="w-6 h-6 rounded-full bg-[#2563EB] text-white flex items-center justify-center shrink-0 shadow-xs transform-gpu"
                            >
                              <Check size={13} strokeWidth={3} className="text-white" />
                            </motion.div>

                            {row.isTimeField ? (
                              <div>
                                <span className="inline-block bg-[#2563EB] text-white px-3 py-1 rounded-lg text-xs font-black shadow-xs">
                                  {row.prosto}
                                </span>
                              </div>
                            ) : (
                              <span className="text-sm font-extrabold text-[#0A0A0A] font-sans leading-tight">
                                {row.prosto}
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </div>

              {!showAllDesktopRows && (
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none transform-gpu z-10" />
              )}
            </motion.div>

            {/* EXPAND BUTTON FOR DESKTOP */}
            <div className="mt-8 text-center">
              <motion.button
                onClick={() => setShowAllDesktopRows(!showAllDesktopRows)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white border border-gray-300 shadow-md text-xs font-extrabold text-[#2563EB] hover:bg-blue-50 transition-all cursor-pointer transform-gpu"
              >
                <span>{showAllDesktopRows ? "Show Less ↑" : "View All 22 Comparison Features ↓"}</span>
              </motion.button>
            </div>
          </div>


          {/* ========================================================================= */}
          {/* SUMMARY BOX: WHY BUSINESSES CHOOSE PROSTOLABS */}
          {/* ========================================================================= */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={isDiyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2, ease: easeSaaS }}
            className="p-8 sm:p-10 md:p-12 rounded-[32px] bg-gradient-to-br from-white via-[#FAFAFA] to-blue-50/40 border-2 border-blue-100 shadow-xl relative overflow-hidden mb-8"
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-[#2563EB]" />
                <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">The Fully Managed Advantage</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0A] tracking-tight font-sans mb-8">
                Why Businesses Choose ProstoLabs
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-sans text-sm font-bold text-[#0A0A0A]">
                {[
                  "We build everything for you",
                  "No generic templates",
                  "No coding or DIY work required",
                  "Enterprise hosting included",
                  "100% managed website maintenance",
                  "Direct WhatsApp support access",
                  "SEO ready out of the box",
                  "Flawless mobile responsiveness",
                  "Secure SSL & active firewalls",
                  "Launch in 3–7 business days",
                  "Transparent pricing — 0 hidden fees",
                  "100% full website ownership rights"
                ].map((point, index) => (
                  <div key={index} className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-gray-200/80 shadow-2xs">
                    <div className="w-5 h-5 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>


          {/* ========================================================================= */}
          {/* TRUST NOTE */}
          {/* ========================================================================= */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={isDiyInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="p-6 rounded-2xl bg-blue-50/60 border border-blue-100 text-center max-w-4xl mx-auto"
          >
            <p className="text-xs sm:text-sm text-[#6B7280] font-medium leading-relaxed">
              <strong className="text-[#0A0A0A] font-bold">Important Note:</strong> Unlike DIY website builders, ProstoLabs is a fully managed service. We design, build, launch, maintain, secure, and support your website while you focus on growing your business.
            </p>
          </motion.div>

        </div>
      </section>

    </div>
  )
}