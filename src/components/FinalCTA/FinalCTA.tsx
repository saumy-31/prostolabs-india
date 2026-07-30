import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { 
  ArrowRight, 
  MessageSquare, 
  Zap, 
  Smartphone, 
  Search, 
  ShieldCheck, 
  Star, 
  CheckCircle2
} from 'lucide-react'
import { type PlanType } from '../Modal/EnquiryModal'

interface FinalCTAProps {
  onOpenModal?: (plan?: PlanType) => void
}

// --- ANIMATION VARIANTS ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 90, damping: 20 } 
  }
}

// --- TRUST BADGES DATA ---
const trustBadges = [
  { icon: Zap, label: "⚡ Fast Delivery" },
  { icon: Smartphone, label: "📱 Mobile Friendly" },
  { icon: Search, label: "🔍 SEO Ready" },
  { icon: MessageSquare, label: "💬 WhatsApp Support" },
  { icon: ShieldCheck, label: "🔒 Secure Hosting" },
  { icon: Star, label: "⭐ Ongoing Support" }
]

// --- REALISTIC INDIAN BUSINESS OWNER AVATARS ---
const clientAvatars = [
  {
    name: "Rohan Sharma",
    role: "Spice Route Bistro",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80&crop=faces"
  },
  {
    name: "Dr. Ananya Verma",
    role: "CarePlus Clinic",
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80&crop=faces"
  },
  {
    name: "Priya Patel",
    role: "Lumière Spa",
    src: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80&crop=faces"
  },
  {
    name: "Vikram Malhotra",
    role: "Apex Realty",
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80&crop=faces"
  },
  {
    name: "Suresh Kumar",
    role: "Mindspace Academy",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80&crop=faces"
  }
]

export function FinalCTA({ onOpenModal }: FinalCTAProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" })

  return (
    <section 
      ref={sectionRef} 
      className="hidden lg:block py-8 sm:py-12 md:py-14 bg-[#FAFAFA] relative overflow-hidden" 
      id="get-started"
      aria-label="Start your website today"
    >
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        
        {/* FULL-WIDTH PREMIUM CANVAS CARD */}
        <div className="bg-gradient-to-b from-[#1E3A8A] via-[#2563EB] to-[#1D4ED8] rounded-[24px] sm:rounded-[32px] md:rounded-[36px] p-6 sm:p-10 md:p-12 lg:p-14 text-white shadow-xl sm:shadow-2xl relative overflow-hidden border border-blue-400/30">
          
          {/* FLOATING AMBIENT BACKGROUND GLOWS */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className="absolute -top-24 -right-24 w-96 h-96 bg-white/15 rounded-full blur-3xl pointer-events-none" 
          />
          <motion.div 
            animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl pointer-events-none" 
          />
          <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

          {/* HEADER CONTENT */}
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10 md:mb-12 relative z-10 space-y-3">
            
            {/* BADGE */}
            <motion.div 
              initial={{ opacity: 0, y: -8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white shadow-xs"
            >
              <motion.span 
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                🚀
              </motion.span>
              <span className="text-[11px] font-bold tracking-wider uppercase">Ready to Launch?</span>
            </motion.div>

            {/* HEADING */}
            <motion.h2 
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-sans tracking-tight leading-[1.15] text-white"
            >
              Your business deserves a website that works as hard as you do.
            </motion.h2>

            {/* SUBHEADING */}
            <motion.p 
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-xs sm:text-base md:text-lg text-blue-100 leading-relaxed max-w-2xl mx-auto font-medium"
            >
              Whether you're just getting started or ready to scale, ProstoLabs makes it simple to launch a modern website that helps your business grow.
            </motion.p>
          </div>

          {/* ========================================================================= */}
          {/* DESKTOP 3-CARD GRID */}
          {/* ========================================================================= */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="grid grid-cols-3 gap-6 mb-10 md:mb-12 relative z-10 items-stretch"
          >
            {/* CARD 1: ₹499 / MONTH */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -8, boxShadow: "0 30px 60px -12px rgba(0,0,0,0.4)" }}
              className="bg-white text-[#0A0A0A] rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative shadow-2xl group transition-all duration-300 border-2 border-white ring-4 ring-white/20"
            >
              <div className="absolute -top-3.5 right-6 bg-[#2563EB] text-white px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md flex items-center gap-1">
                🔥 Most Popular
              </div>

              <div>
                <div className="inline-block px-3 py-1 bg-blue-50 text-[#2563EB] rounded-full text-[10px] font-extrabold uppercase tracking-widest mb-4">
                  Fully Managed Care
                </div>

                <h3 className="text-3xl md:text-4xl font-black text-[#0A0A0A] font-sans tracking-tight mb-2">
                  ₹499 <span className="text-sm font-semibold text-gray-500">/ month</span>
                </h3>

                <p className="text-xs text-gray-600 mb-5 leading-relaxed font-medium min-h-[36px]">
                  Best for businesses that want everything managed seamlessly.
                </p>

                <hr className="border-gray-100 mb-5" />

                <ul className="space-y-2.5 mb-6">
                  {["Modern Custom Website", "High-Speed Hosting Included", "Routine Maintenance", "SSL & Security Managed", "Content Updates Included", "WhatsApp Support Channel"].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs font-bold text-[#0A0A0A]">
                      <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <motion.button 
                onClick={() => onOpenModal?.('care')}
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                aria-label="Start Monthly Plan at ₹499 per month"
                className="w-full bg-[#2563EB] text-white font-bold text-xs sm:text-sm py-3.5 rounded-xl shadow-lg hover:bg-blue-700 transition-colors text-center mt-auto flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Start Monthly Plan</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>

            {/* CARD 2: ₹4,999 ONE-TIME */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -6, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.3)" }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative group transition-all duration-300"
            >
              <div>
                <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-blue-100 mb-4">
                  💎 Full Ownership
                </div>

                <h3 className="text-3xl md:text-4xl font-black text-white font-sans tracking-tight mb-2">
                  ₹4,999 <span className="text-sm font-semibold text-blue-200">one-time</span>
                </h3>

                <p className="text-xs text-blue-100 mb-5 leading-relaxed font-medium min-h-[36px]">
                  Perfect for businesses that want to own their website completely.
                </p>

                <hr className="border-white/15 mb-5" />

                <ul className="space-y-2.5 mb-5">
                  {["Professional Website Build", "Mobile Responsive Design", "WhatsApp Integration", "Google Maps Setup", "Basic Technical SEO", "Full Website Ownership"].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs font-semibold text-white">
                      <CheckCircle2 className="w-4 h-4 text-blue-200 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-[10px] text-blue-200 bg-white/10 p-2.5 rounded-xl border border-white/15 mb-6 leading-normal font-medium">
                  Note: Future updates, maintenance, and new features are available at an additional cost.
                </p>
              </div>

              <motion.button 
                onClick={() => onOpenModal?.('onetime')}
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                aria-label="Buy One-Time Plan for ₹4,999"
                className="w-full bg-white text-[#2563EB] font-bold text-xs sm:text-sm py-3.5 rounded-xl shadow-md hover:bg-blue-50 transition-colors text-center mt-auto cursor-pointer"
              >
                Buy One-Time Plan
              </motion.button>
            </motion.div>

            {/* CARD 3: CUSTOM SOLUTION */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -6, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.3)" }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative group transition-all duration-300"
            >
              <div>
                <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-blue-100 mb-4">
                  Enterprise & Apps
                </div>

                <h3 className="text-2xl md:text-3xl font-black text-white font-sans tracking-tight mb-2">
                  Custom Solution
                </h3>

                <p className="text-xs text-blue-100 mb-5 leading-relaxed font-medium min-h-[36px]">
                  For businesses needing something beyond a standard website.
                </p>

                <hr className="border-white/15 mb-5" />

                <ul className="space-y-2.5 mb-6">
                  {["E-commerce Stores & Payment", "Booking & Reservation Systems", "Custom CRM Portals", "AI Solutions & Bots", "Analytics Dashboards", "Custom Web Applications"].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs font-semibold text-white">
                      <CheckCircle2 className="w-4 h-4 text-blue-200 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <motion.button 
                onClick={() => onOpenModal?.('custom')}
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                aria-label="Get a custom quote for enterprise projects"
                className="w-full bg-white/20 text-white border border-white/30 font-bold text-xs sm:text-sm py-3.5 rounded-xl shadow-md hover:bg-white/30 transition-colors backdrop-blur-md text-center mt-auto cursor-pointer"
              >
                Get a Custom Quote
              </motion.button>
            </motion.div>
          </motion.div>

          {/* TRUST STRIP BADGES */}
          <div className="mb-6 sm:mb-10 relative z-10">
            <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar pb-2 sm:pb-0">
              {trustBadges.map((badge, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-full text-[11px] font-bold text-white whitespace-nowrap shrink-0"
                >
                  <span>{badge.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SOCIAL PROOF AVATARS STACK */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-row items-center justify-center gap-3 mb-8 relative z-10 text-center"
          >
            <div className="flex -space-x-2 overflow-hidden p-0.5">
              {clientAvatars.map((person, i) => (
                <motion.img 
                  key={i} 
                  src={person.src} 
                  alt={`${person.name}, ${person.role}`} 
                  title={`${person.name} (${person.role})`}
                  whileHover={{ scale: 1.15, zIndex: 30 }}
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white/90 object-cover shadow-md transition-transform" 
                  loading="lazy"
                />
              ))}
            </div>
            <p className="text-sm font-semibold text-blue-100">
              Helping businesses across India build modern websites.
            </p>
          </motion.div>

          {/* PRIMARY & SECONDARY ACTION BUTTONS */}
          <div className="flex flex-row items-center justify-center gap-3.5 max-w-md mx-auto relative z-10">
            <motion.button 
              onClick={() => onOpenModal?.('care')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              aria-label="Start your website today with ProstoLabs"
              className="bg-white text-[#2563EB] px-7 py-3.5 rounded-2xl font-black text-sm shadow-xl hover:bg-blue-50 transition-all flex items-center justify-center gap-2 group text-center cursor-pointer"
            >
              <span>Start Your Website Today</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.a 
              href="https://wa.me/916392577105" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Talk on WhatsApp with ProstoLabs"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-emerald-500 text-white border border-emerald-400/30 px-7 py-3.5 rounded-2xl font-bold text-sm shadow-lg hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 text-center cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Talk on WhatsApp</span>
            </motion.a>
          </div>

        </div>

      </div>
    </section>
  )
}