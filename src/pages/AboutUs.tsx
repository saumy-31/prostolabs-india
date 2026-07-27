import { motion } from 'framer-motion'
import { 
  Sparkles, 
  Target, 

  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  
} from 'lucide-react'
import type { PlanType } from '../components/Modal/EnquiryModal'

interface AboutUsProps {
  onOpenModal?: (plan?: PlanType) => void
}

export function AboutUs({ onOpenModal }: AboutUsProps) {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0A0A0A] py-12 md:py-20 px-4 sm:px-6 md:px-12 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* AMBIENT BACKGROUND GLOWS */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        
        {/* TOP NAVIGATION BAR */}
        <div className="flex items-center justify-between">
          <a 
            href="/" 
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-600 hover:text-[#2563EB] transition-colors bg-white px-4 py-2 rounded-xl border border-gray-200/80 shadow-2xs"
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </a>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 shadow-2xs">
            <span className="text-xs">🇮🇳</span>
            <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider">Built for India</span>
          </div>
        </div>

        {/* HERO SECTION */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
            <span className="text-[11px] font-bold text-[#2563EB] tracking-wider uppercase">
              About ProstoLabs
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black tracking-tight text-[#0A0A0A] font-sans leading-[1.1]">
            Modern Web Development <br />
            <span className="text-[#2563EB]">For Every Business.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#6B7280] font-medium leading-relaxed max-w-2xl mx-auto">
            ProstoLabs was founded with a simple goal: eliminate agency price markups and give business owners a complete, modern website without high upfront overhead.
          </p>
        </div>

        {/* OUR STORY / MISSION CONTAINER */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white border border-gray-200/90 rounded-[32px] p-6 sm:p-10 shadow-xl space-y-8"
        >
          {/* THE PROBLEM WE SOLVE */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
              <div className="p-2 rounded-xl bg-blue-50 text-[#2563EB]">
                <Target size={22} />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0A]">The Problem We Solved</h2>
            </div>
            
            <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
              When business owners in India want a website, they usually face two frustrating options:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="bg-red-50/50 border border-red-100 rounded-2xl p-5 space-y-2">
                <h3 className="font-extrabold text-red-900 text-sm">1. Traditional Agencies</h3>
                <p className="text-xs text-red-800/80 leading-relaxed font-medium">
                  Charge ₹20,000 to ₹80,000 upfront, take 4–6 weeks to deliver, and bill heavily for every minor text change or server maintenance task.
                </p>
              </div>

              <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-5 space-y-2">
                <h3 className="font-extrabold text-amber-900 text-sm">2. DIY Builders (Wix / GoDaddy)</h3>
                <p className="text-xs text-amber-800/80 leading-relaxed font-medium">
                  Require 20+ hours of your own time to build, often look unprofessional, and leave you to troubleshoot hosting, domain DNS, and technical bugs yourself.
                </p>
              </div>
            </div>
          </div>

          {/* OUR APPROACH */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
              <div className="p-2 rounded-xl bg-blue-50 text-[#2563EB]">
                <Zap size={22} />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0A]">The ProstoLabs Approach</h2>
            </div>

            <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
              We created a third option: **Done-For-You Websites starting at just ₹499/month.** We build, host, secure, and maintain your website while providing direct WhatsApp support so you never have to worry about tech code or updates.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 text-center space-y-1">
                <div className="text-2xl font-black text-[#2563EB]">3–5 Days</div>
                <div className="text-xs font-bold text-gray-700">Rapid Delivery</div>
              </div>
              <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 text-center space-y-1">
                <div className="text-2xl font-black text-[#2563EB]">100% Managed</div>
                <div className="text-xs font-bold text-gray-700">Zero Tech Headache</div>
              </div>
              <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 text-center space-y-1">
                <div className="text-2xl font-black text-[#2563EB]">WhatsApp First</div>
                <div className="text-xs font-bold text-gray-700">Direct Support</div>
              </div>
            </div>
          </div>

          {/* CORE PILLARS */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
              <div className="p-2 rounded-xl bg-blue-50 text-[#2563EB]">
                <ShieldCheck size={22} />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0A]">Why Clients Trust Us</h2>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-semibold text-gray-800">
              <li className="flex items-center gap-2.5 bg-gray-50 p-3 rounded-xl border border-gray-200/60">
                <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
                <span>Transparent pricing with zero hidden fees</span>
              </li>
              <li className="flex items-center gap-2.5 bg-gray-50 p-3 rounded-xl border border-gray-200/60">
                <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
                <span>High-speed cloud hosting & free SSL included</span>
              </li>
              <li className="flex items-center gap-2.5 bg-gray-50 p-3 rounded-xl border border-gray-200/60">
                <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
                <span>Unlimited content updates on Care Plan</span>
              </li>
              <li className="flex items-center gap-2.5 bg-gray-50 p-3 rounded-xl border border-gray-200/60">
                <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
                <span>Mobile responsive & SEO-ready structure</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* BOTTOM CTA CARD */}
        <div className="bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#1D4ED8] rounded-[32px] p-8 sm:p-10 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-black font-sans">Ready to launch your website?</h3>
            <p className="text-xs sm:text-sm text-blue-100 font-medium">Get started today for just ₹499/month or ₹4,999 one-time.</p>
          </div>
          <button
            onClick={() => onOpenModal?.('care')}
            className="bg-white text-[#2563EB] font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl hover:bg-blue-50 transition-all flex items-center gap-2 shrink-0 cursor-pointer shadow-lg"
          >
            <span>Start Your Website</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  )
}