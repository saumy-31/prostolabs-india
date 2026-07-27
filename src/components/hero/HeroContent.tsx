import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import SplitType from 'split-type'
import { ArrowRight, Search, Smartphone, MessageCircle, Building2 } from 'lucide-react'

export function HeroContent() {
  const headlineRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!headlineRef.current) return
    const text = new SplitType(headlineRef.current, { types: 'lines, chars' } as any)
    
    gsap.from(text.chars, {
      y: 30, opacity: 0, rotationX: -80, stagger: 0.015, duration: 1, 
      ease: "power3.out", transformOrigin: "0% 50% -50", delay: 0.1
    })
    return () => { text.revert() }
  }, [])

  const trustItems = [
    { icon: Search, text: "SEO Ready" },
    { icon: Smartphone, text: "Mobile Friendly" },
    { icon: MessageCircle, text: "WhatsApp Integration" },
    { icon: Building2, text: "Google Business" }
  ]

  return (
    <div className="relative z-20 flex flex-col justify-center w-full">
      
      {/* Badge */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm w-fit mb-10"
      >
        <span className="text-sm leading-none">🇮🇳</span>
        <span className="text-[11px] font-bold text-[#0A0A0A] tracking-wider uppercase">Built for Indian Businesses</span>
      </motion.div>

      {/* Refined Heading: Plus Jakarta Sans (font-sans), Bold weight, Premium line breaks */}
      <h1 
        ref={headlineRef} 
        className="text-[2.25rem] md:text-[3rem] lg:text-[3.5rem] leading-[1.15] font-bold font-sans text-[#0A0A0A] mb-8 tracking-tight [perspective:1000px]"
      >
        Your Business <br />
        Deserves a <br className="hidden sm:block" />
        Better Website.
      </h1>

      <motion.p 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}
        className="text-base md:text-lg text-[#6B7280] mb-10 max-w-md leading-relaxed"
      >
        Professional websites designed for local businesses. Fast, mobile-friendly, SEO-ready, and built to help you get more customers.
      </motion.p>

      {/* Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", delay: 1 }}
        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-6"
      >
        <button className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#2563EB] text-white px-8 py-4 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_25px_rgba(37,99,235,0.35)] overflow-hidden">
          <span className="relative z-10 flex items-center gap-2">
            Start Your Website
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        </button>
        
        <button className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-[#0A0A0A] border border-gray-200 px-8 py-4 rounded-xl font-bold text-sm hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 shadow-sm">
          See Live Websites
        </button>
      </motion.div>

      {/* Pricing Text */}
      <motion.p 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        className="text-[13px] font-semibold text-[#6B7280] mb-6 text-center sm:text-left"
      >
        Starting from ₹4,999 <span className="mx-2 opacity-40">•</span> Maintenance from ₹499/month
      </motion.p>

      {/* Trust Row */}
      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-4 pt-8 border-t border-gray-200/60">
        {trustItems.map((item, i) => (
          <motion.div
            key={item.text}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 + (i * 0.1), type: "spring" }}
            className="flex items-center gap-2 text-[#6B7280]"
          >
            <item.icon className="w-4 h-4 text-[#2563EB]" />
            <span className="text-xs font-bold tracking-tight">{item.text}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}