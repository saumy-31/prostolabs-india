import { useEffect, useRef } from 'react'
import { motion, useInView, animate, useMotionValue, useTransform, type Variants } from 'framer-motion'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { type PlanType } from '../Modal/EnquiryModal'

interface PricingProps {
  onOpenModal?: (plan?: PlanType) => void
}

// --- CONSTANTS & EASING ---
const springConfig = { type: "spring" as const, stiffness: 85, damping: 18 }
const featureSpring = { type: "spring" as const, stiffness: 100, damping: 15 }
const easeSaaS = [0.16, 1, 0.3, 1] as const

// --- BULLETPROOF NUMBER COUNTER ---
function AnimatedCounter({ value }: { value: number }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString('en-IN'))
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-30px" })

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration: 1.8,
        ease: easeSaaS,
      })
      return controls.stop
    }
  }, [isInView, value, count])

  return <motion.span ref={ref} className="transform-gpu inline-block">{rounded}</motion.span>
}

export function Pricing({ onOpenModal }: PricingProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-40px" })

  // --- VARIANTS ---
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: springConfig }
  }

  const featureVariants: Variants = {
    hidden: { opacity: 0, x: -6 },
    show: { opacity: 1, x: 0, transition: featureSpring }
  }

  const carePlanFeatures = [
    { text: "Professional Website", primary: true },
    { text: "Hosting Included", primary: true },
    { text: "Maintenance Included", primary: true },
    { text: "Unlimited Content Updates", primary: true },
    { text: "WhatsApp & Tech Support", primary: true },
    { text: "Security & Monthly Backup", primary: false },
    { text: "Performance Monitoring", primary: false },
    { text: "SEO Ready", primary: false },
  ]

  const customFeatures = [
    { text: "E-commerce & Payments", primary: true },
    { text: "Booking Systems & CRM", primary: true },
    { text: "AI Solutions & Bots", primary: true },
    { text: "Dashboards & Custom Apps", primary: true },
    { text: "Enterprise Portals", primary: false },
    { text: "API Integrations", primary: false },
  ]

  return (
    <section ref={containerRef} className="relative py-12 sm:py-16 md:py-20 bg-[#FAFAFA] overflow-hidden" id="pricing">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 8 }} 
            animate={isInView ? { opacity: 1, y: 0 } : {}} 
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 shadow-2xs mb-3 transform-gpu"
          >
            <span className="text-xs">💙</span>
            <span className="text-[11px] font-bold text-[#2563EB] tracking-wider uppercase">Simple Pricing</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 12 }} 
            animate={isInView ? { opacity: 1, y: 0 } : {}} 
            transition={{ duration: 0.5, delay: 0.1, ease: easeSaaS }}
            className="text-3xl sm:text-4xl lg:text-5xl leading-[1.12] font-black text-[#0A0A0A] mb-3 tracking-tight font-sans transform-gpu"
          >
            Find the Right Plan for Your Business
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 8 }} 
            animate={isInView ? { opacity: 1, y: 0 } : {}} 
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="text-sm sm:text-base md:text-lg text-[#6B7280] font-medium leading-relaxed max-w-xl mx-auto transform-gpu"
          >
            Transparent pricing with no hidden fees. Choose the option that fits your needs today.
          </motion.p>
        </div>

        {/* ========================================================================= */}
        {/* 1. MOBILE-ONLY SWIPEABLE CAROUSEL (≤1023px) */}
        {/* ========================================================================= */}
        <div className="block lg:hidden">
          
          {/* Swipe Indicator Pill */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex items-center justify-center gap-2 mb-2 text-xs font-bold text-gray-400 uppercase tracking-widest transform-gpu"
          >
            <span>← Swipe to compare plans →</span>
          </motion.div>

          {/* Horizontally Scrollable Cards Container (pt-4 guarantees no badge clipping) */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25, ease: easeSaaS }}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pt-4 pb-6 px-6 -mx-4 sm:-mx-6 no-scrollbar transform-gpu"
          >
            
            {/* CARD 1: CARE PLAN (RECOMMENDED & FIRST) */}
            <div className="snap-center shrink-0 w-[88%] max-w-[320px] bg-white rounded-3xl p-6 border-2 border-[#2563EB] shadow-xl relative flex flex-col justify-between transform-gpu">
              {/* Floating Top Badge with Proper Elevation & Padding */}
              <div className="absolute -top-3.5 right-5 z-20 bg-[#2563EB] text-white px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wide shadow-md whitespace-nowrap">
                🔥 Most Popular
              </div>

              <div>
                <span className="inline-block text-[10px] font-extrabold text-[#2563EB] bg-blue-50 px-2.5 py-1 rounded-lg uppercase tracking-wider mb-2">
                  Recommended
                </span>
                <h3 className="text-2xl font-black text-[#0A0A0A] mb-1 font-sans">Care Plan</h3>
                
                <div className="my-3 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-[#0A0A0A] tracking-tight">
                    ₹<AnimatedCounter value={499} />
                  </span>
                  <span className="text-sm font-bold text-[#6B7280]">/month</span>
                </div>

                <p className="text-xs text-[#6B7280] font-medium mb-4">All-inclusive managed website & support.</p>

                <ul className="space-y-2.5 mb-6 border-t border-gray-100 pt-4">
                  {carePlanFeatures.slice(0, 5).map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs font-bold text-[#0A0A0A]">
                      <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <motion.button 
                onClick={() => onOpenModal?.('care')}
                whileTap={{ scale: 0.98 }}
                className="w-full h-[52px] bg-[#2563EB] text-white font-bold text-sm rounded-2xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer active:bg-blue-700 transition-colors transform-gpu"
              >
                <span>Start for ₹499/month</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>

            {/* CARD 2: ONE-TIME PLAN */}
            <div className="snap-center shrink-0 w-[88%] max-w-[320px] bg-white rounded-3xl p-6 border border-gray-200 shadow-md relative flex flex-col justify-between transform-gpu">
              <div>
                <span className="inline-block text-[10px] font-extrabold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-lg uppercase tracking-wider mb-2">
                  Full Ownership
                </span>
                <h3 className="text-2xl font-black text-[#0A0A0A] mb-1 font-sans">One-Time Plan</h3>
                
                <div className="my-3 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-[#0A0A0A] tracking-tight">
                    ₹<AnimatedCounter value={4999} />
                  </span>
                  <span className="text-sm font-bold text-[#6B7280]">one-time</span>
                </div>

                <p className="text-xs text-[#6B7280] font-medium mb-4">Pay once and keep total ownership.</p>

                <ul className="space-y-2.5 mb-6 border-t border-gray-100 pt-4">
                  {["Professional Website", "Mobile Responsive", "WhatsApp Integration", "Google Maps", "Basic SEO Setup"].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs font-bold text-[#0A0A0A]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <motion.button 
                onClick={() => onOpenModal?.('onetime')}
                whileTap={{ scale: 0.98 }}
                className="w-full h-[52px] bg-white text-[#0A0A0A] border border-gray-300 font-bold text-sm rounded-2xl shadow-2xs flex items-center justify-center cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors transform-gpu"
              >
                Buy One-Time
              </motion.button>
            </div>

            {/* CARD 3: CUSTOM SOLUTION */}
            <div className="snap-center shrink-0 w-[88%] max-w-[320px] bg-white rounded-3xl p-6 border border-gray-200 shadow-md relative flex flex-col justify-between transform-gpu">
              <div>
                <span className="inline-block text-[10px] font-extrabold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-lg uppercase tracking-wider mb-2">
                  Custom Build
                </span>
                <h3 className="text-2xl font-black text-[#0A0A0A] mb-1 font-sans">Custom Solution</h3>
                
                <div className="my-3 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-[#0A0A0A] tracking-tight">
                    Custom Quote
                  </span>
                </div>

                <p className="text-xs text-[#6B7280] font-medium mb-4">For e-commerce, web apps, and complex builds.</p>

                <ul className="space-y-2.5 mb-6 border-t border-gray-100 pt-4">
                  {customFeatures.slice(0, 5).map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs font-bold text-[#0A0A0A]">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <motion.button 
                onClick={() => onOpenModal?.('custom')}
                whileTap={{ scale: 0.98 }}
                className="w-full h-[52px] bg-[#0A0A0A] text-white font-bold text-sm rounded-2xl shadow-md flex items-center justify-center cursor-pointer hover:bg-gray-800 active:bg-gray-900 transition-colors transform-gpu"
              >
                Request Quote
              </motion.button>
            </div>

          </motion.div>
        </div>

        {/* ========================================================================= */}
        {/* 2. UNTOUCHED DESKTOP PRICING GRID (≥1024px) */}
        {/* ========================================================================= */}
        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          animate={isInView ? "show" : "hidden"}
          className="hidden lg:grid grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto"
        >
          {/* 1. CARE PLAN (FEATURED) */}
          <motion.div variants={cardVariants} className="relative h-full transform-gpu">
            <div className="absolute inset-0 bg-[#2563EB] blur-[50px] opacity-10 rounded-[32px] transform translate-y-6" />
            
            <motion.div 
              whileHover={{ y: -6, boxShadow: "0 25px 50px -12px rgba(37,99,235,0.20)" }} 
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative h-full bg-white rounded-[28px] p-8 border-2 border-[#2563EB] shadow-lg flex flex-col z-10 group transition-all duration-300 transform-gpu"
            >
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#2563EB] text-white px-3.5 py-1 rounded-full text-[11px] font-extrabold tracking-wide shadow-md flex items-center gap-1">
                🔥 Most Popular
              </div>

              <h3 className="text-xl font-bold text-[#0A0A0A] mb-3 font-sans">Care Plan</h3>
              
              <div className="mb-2 flex items-baseline gap-1">
                <span className="text-[2.75rem] font-black text-[#0A0A0A] tracking-tight leading-none">
                  ₹<AnimatedCounter value={499} />
                </span>
                <span className="text-sm font-bold text-[#6B7280]">/month</span>
              </div>
              
              <p className="text-[13px] text-[#6B7280] font-medium mb-5 leading-relaxed">Perfect for businesses that want everything managed.</p>

              <motion.ul variants={containerVariants} className="space-y-3 mb-6 flex-1">
                {carePlanFeatures.map((item, i) => (
                  <motion.li 
                    key={i} 
                    variants={featureVariants} 
                    className="flex items-center gap-2.5 transform-gpu"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#2563EB] shrink-0" />
                    <span className="text-[#0A0A0A] text-[13px] font-semibold">{item.text}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.button 
                onClick={() => onOpenModal?.('care')}
                variants={featureVariants}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full relative inline-flex items-center justify-center gap-2 bg-[#2563EB] text-white px-6 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 hover:shadow-[0_8px_25px_rgba(37,99,235,0.35)] overflow-hidden group/btn mt-auto z-10 cursor-pointer transform-gpu"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start for ₹499/month
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* 2. ONE-TIME PLAN */}
          <motion.div variants={cardVariants} className="relative h-full transform-gpu">
            <motion.div 
              whileHover={{ y: -6, boxShadow: "0 20px 40px -15px rgba(0,0,0,0.08)" }} 
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative h-full bg-white/80 backdrop-blur-xl rounded-[28px] p-8 border border-gray-200/90 shadow-sm flex flex-col z-10 transition-all duration-300 transform-gpu"
            >
              <h3 className="text-xl font-bold text-[#0A0A0A] mb-3 font-sans">One-Time Plan</h3>
              
              <div className="mb-2 flex items-baseline gap-1">
                <span className="text-[2.75rem] font-black text-[#0A0A0A] tracking-tight leading-none">
                  ₹<AnimatedCounter value={4999} />
                </span>
                <span className="text-sm font-bold text-[#6B7280]">one-time</span>
              </div>
              
              <p className="text-[13px] text-[#6B7280] font-medium mb-5 leading-relaxed">Pay once and own your website.</p>

              <motion.ul variants={containerVariants} className="space-y-3 mb-5">
                {["Professional Website", "Mobile Responsive", "WhatsApp Integration", "Google Maps", "Basic SEO Setup", "Website Ownership"].map((feature, i) => (
                  <motion.li key={i} variants={featureVariants} className="flex items-center gap-2.5 transform-gpu">
                    <CheckCircle2 className="w-5 h-5 text-[#6B7280] shrink-0" />
                    <span className="text-[#0A0A0A] text-[13px] font-semibold">{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.p variants={featureVariants} className="text-[11px] text-[#6B7280] font-medium leading-normal mb-6 flex-1 bg-gray-50 p-3.5 rounded-xl border border-gray-200/60 transform-gpu">
                Future updates or support can be requested anytime and are charged separately based on work required.
              </motion.p>

              <motion.button 
                onClick={() => onOpenModal?.('onetime')}
                variants={featureVariants}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full inline-flex items-center justify-center gap-2 bg-white text-[#0A0A0A] border border-gray-200 px-6 py-3.5 rounded-xl font-bold text-sm hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 shadow-2xs mt-auto z-10 cursor-pointer transform-gpu"
              >
                Buy Once
              </motion.button>
            </motion.div>
          </motion.div>

          {/* 3. CUSTOM SOLUTION */}
          <motion.div variants={cardVariants} className="relative h-full transform-gpu">
            <motion.div 
              whileHover={{ y: -6, boxShadow: "0 20px 40px -15px rgba(0,0,0,0.08)" }} 
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative h-full bg-white/80 backdrop-blur-xl rounded-[28px] p-8 border border-gray-200/90 shadow-sm flex flex-col z-10 transition-all duration-300 transform-gpu"
            >
              <h3 className="text-xl font-bold text-[#0A0A0A] mb-3 font-sans">Custom Solution</h3>
              
              <div className="mb-2 flex items-baseline gap-1">
                <span className="text-[2.25rem] font-black text-[#0A0A0A] tracking-tight leading-none pt-1">
                  Custom Quote
                </span>
              </div>
              
              <p className="text-[13px] text-[#6B7280] font-medium mb-5 leading-relaxed">For businesses that need more than a standard website.</p>

              <motion.ul variants={containerVariants} className="space-y-3 mb-6 flex-1">
                {customFeatures.map((item, i) => (
                  <motion.li key={i} variants={featureVariants} className="flex items-center gap-2.5 transform-gpu">
                    <CheckCircle2 className="w-5 h-5 text-[#6B7280] shrink-0" />
                    <span className="text-[#0A0A0A] text-[13px] font-semibold">{item.text}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.button 
                onClick={() => onOpenModal?.('custom')}
                variants={featureVariants}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#0A0A0A] text-white px-6 py-3.5 rounded-xl font-bold text-sm hover:bg-gray-800 transition-all duration-300 shadow-2xs mt-auto z-10 cursor-pointer transform-gpu"
              >
                Request a Quote
              </motion.button>
            </motion.div>
          </motion.div>

        </motion.div>

      </div>
    </section>
  )
}