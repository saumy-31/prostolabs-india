import { useEffect, useRef } from 'react'
import { motion, useInView, animate, useMotionValue, useTransform, type Variants } from 'framer-motion'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { type PlanType } from '../Modal/EnquiryModal'

interface PricingProps {
  onOpenModal?: (plan?: PlanType) => void
}

// --- CONSTANTS ---
const springConfig = { type: "spring" as const, stiffness: 80, damping: 20 }
const featureSpring = { type: "spring" as const, stiffness: 100 }

// --- BULLETPROOF NUMBER COUNTER ---
function AnimatedCounter({ value }: { value: number }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString('en-IN'))
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

  return <motion.span ref={ref}>{rounded}</motion.span>
}

export function Pricing({ onOpenModal }: PricingProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-60px" })

  // --- VARIANTS ---
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 } }
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0, transition: springConfig }
  }

  const featureVariants: Variants = {
    hidden: { opacity: 0, x: -8 },
    show: { opacity: 1, x: 0, transition: featureSpring }
  }

  return (
    <section ref={containerRef} className="relative py-10 md:py-14 bg-[#FAFAFA] overflow-hidden" id="pricing">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-10 flex flex-col items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 8 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 shadow-2xs mb-3"
          >
            <span className="text-xs">💙</span>
            <span className="text-[11px] font-bold text-[#2563EB] tracking-wider uppercase">Simple Pricing</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl leading-[1.12] font-black text-[#0A0A0A] mb-3 tracking-tight font-sans"
          >
            Find the Right Plan for Your Business
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 8 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.15 }}
            className="text-base md:text-lg text-[#6B7280] font-medium leading-relaxed max-w-xl mx-auto"
          >
            Transparent pricing with no hidden fees. Choose the option that fits your needs today.
          </motion.p>
          
        </div>

        {/* PRICING CARDS */}
        <motion.div 
          variants={containerVariants} initial="hidden" animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch max-w-6xl mx-auto"
        >
          {/* 1. Care Plan (Featured) */}
          <motion.div variants={cardVariants} className="relative h-full">
            <div className="absolute inset-0 bg-[#2563EB] blur-[50px] opacity-10 rounded-[32px] transform translate-y-6" />
            
            <motion.div 
              whileHover={{ y: -6, boxShadow: "0 25px 50px -12px rgba(37,99,235,0.20)" }} 
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative h-full bg-white rounded-[28px] p-6 sm:p-8 border-2 border-[#2563EB] shadow-lg flex flex-col z-10 group transition-all duration-300"
            >
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#2563EB] text-white px-3.5 py-1 rounded-full text-[11px] font-bold tracking-wide shadow-md flex items-center gap-1">
                🔥 Most Popular
              </div>

              <h3 className="text-xl font-bold text-[#0A0A0A] mb-3 font-sans">Care Plan</h3>
              
              <div className="mb-2 flex items-baseline gap-1">
                <span className="text-4xl sm:text-[2.75rem] font-black text-[#0A0A0A] tracking-tight leading-none">
                  ₹<AnimatedCounter value={499} />
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#6B7280]">/month</span>
              </div>
              
              <p className="text-xs sm:text-[13px] text-[#6B7280] font-medium mb-5 leading-relaxed min-h-[36px]">Perfect for businesses that want everything managed.</p>

              <motion.ul variants={containerVariants} className="space-y-3 mb-6 flex-1">
                {["Professional Website", "Hosting Included*", "Maintenance Included", "Unlimited Content Updates*", "Security Updates", "Technical Support", "Monthly Backup", "Performance Monitoring", "SEO Ready"].map((feature, i) => (
                  <motion.li key={i} variants={featureVariants} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563EB] shrink-0 mt-0.5" />
                    <span className="text-[#0A0A0A] text-xs sm:text-[13px] font-semibold">{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.button 
                onClick={() => onOpenModal?.('care')}
                variants={featureVariants}
                className="w-full relative inline-flex items-center justify-center gap-2 bg-[#2563EB] text-white px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 hover:shadow-[0_8px_25px_rgba(37,99,235,0.35)] overflow-hidden group/btn mt-auto z-10 cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start for ₹499/month
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* 2. One-Time Plan */}
          <motion.div variants={cardVariants} className="relative h-full">
            <motion.div 
              whileHover={{ y: -6, boxShadow: "0 20px 40px -15px rgba(0,0,0,0.08)" }} 
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative h-full bg-white/80 backdrop-blur-xl rounded-[28px] p-6 sm:p-8 border border-gray-200/90 shadow-sm flex flex-col z-10 transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-[#0A0A0A] mb-3 font-sans">One-Time Plan</h3>
              
              <div className="mb-2 flex items-baseline gap-1">
                <span className="text-4xl sm:text-[2.75rem] font-black text-[#0A0A0A] tracking-tight leading-none">
                  ₹<AnimatedCounter value={4999} />
                </span>
              </div>
              
              <p className="text-xs sm:text-[13px] text-[#6B7280] font-medium mb-5 leading-relaxed min-h-[36px]">Pay once and own your website.</p>

              <motion.ul variants={containerVariants} className="space-y-3 mb-5">
                {["Professional Website", "Mobile Responsive", "WhatsApp Integration", "Google Maps", "Basic SEO Setup", "Website Ownership"].map((feature, i) => (
                  <motion.li key={i} variants={featureVariants} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#6B7280] shrink-0 mt-0.5" />
                    <span className="text-[#0A0A0A] text-xs sm:text-[13px] font-semibold">{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.p variants={featureVariants} className="text-[11px] text-[#6B7280] font-medium leading-relaxed mb-6 flex-1 bg-gray-50 p-3.5 rounded-xl border border-gray-200/60">
                Future content updates, new features, design changes, maintenance, or support can be requested anytime and are charged separately based on the work required.
              </motion.p>

              <motion.button 
                onClick={() => onOpenModal?.('onetime')}
                variants={featureVariants}
                className="w-full inline-flex items-center justify-center gap-2 bg-white text-[#0A0A0A] border border-gray-200 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 shadow-2xs mt-auto z-10 cursor-pointer"
              >
                Buy Once
              </motion.button>
            </motion.div>
          </motion.div>

          {/* 3. Custom Solution */}
          <motion.div variants={cardVariants} className="relative h-full md:col-span-2 lg:col-span-1">
            <motion.div 
              whileHover={{ y: -6, boxShadow: "0 20px 40px -15px rgba(0,0,0,0.08)" }} 
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative h-full bg-white/80 backdrop-blur-xl rounded-[28px] p-6 sm:p-8 border border-gray-200/90 shadow-sm flex flex-col z-10 transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-[#0A0A0A] mb-3 font-sans">Custom Solution</h3>
              
              <div className="mb-2 flex items-baseline gap-1">
                <span className="text-3xl sm:text-[2.25rem] font-black text-[#0A0A0A] tracking-tight leading-none pt-1">
                  Custom Quote
                </span>
              </div>
              
              <p className="text-xs sm:text-[13px] text-[#6B7280] font-medium mb-5 leading-relaxed min-h-[36px]">For businesses that need more than a standard website.</p>

              <motion.ul variants={containerVariants} className="space-y-3 mb-6 flex-1">
                {["E-commerce", "Booking Systems", "CRM", "AI Solutions", "Dashboards", "Custom Web Applications", "Enterprise Portals", "API Integrations"].map((feature, i) => (
                  <motion.li key={i} variants={featureVariants} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#6B7280] shrink-0 mt-0.5" />
                    <span className="text-[#0A0A0A] text-xs sm:text-[13px] font-semibold">{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.button 
                onClick={() => onOpenModal?.('custom')}
                variants={featureVariants}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#0A0A0A] text-white px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm hover:bg-gray-800 transition-all duration-300 shadow-2xs mt-auto z-10 cursor-pointer"
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