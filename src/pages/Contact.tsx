import { motion } from 'framer-motion'
import { 
  MessageSquare, 
  Mail, 
  MapPin, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  Headphones,
  Zap
} from 'lucide-react'
import type { PlanType } from '../components/Modal/EnquiryModal'

interface ContactProps {
  onOpenModal?: (plan?: PlanType) => void
}

export function Contact({ onOpenModal }: ContactProps) {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0A0A0A] py-12 md:py-20 px-4 sm:px-6 md:px-12 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* AMBIENT BACKGROUND GLOW */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-10 relative z-10">
        
        {/* TOP NAVIGATION BAR */}
        <div className="flex items-center justify-between">
          <a 
            href="/" 
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-600 hover:text-[#2563EB] transition-colors bg-white px-4 py-2 rounded-xl border border-gray-200/80 shadow-2xs"
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </a>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Direct Support
          </span>
        </div>

        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 shadow-2xs">
            <Headphones className="w-3.5 h-3.5 text-[#2563EB]" />
            <span className="text-[11px] font-bold text-[#2563EB] tracking-wider uppercase">
              Get in Touch
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0A0A0A] font-sans">
            Let's Build Something Great Together
          </h1>

          <p className="text-sm sm:text-base text-[#6B7280] font-medium leading-relaxed">
            Have questions about our plans, pricing, or custom web projects? Contact our team directly.
          </p>
        </div>

        {/* CONTACT CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          
          {/* LEFT: DIRECT WHATSAPP ACTION CARD */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="bg-white border-2 border-[#2563EB] rounded-[32px] p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <MessageSquare size={24} />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-200">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                  <span className="text-[10px] font-extrabold text-emerald-700">Online Now</span>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-black text-[#0A0A0A]">Instant WhatsApp Support</h3>
                <p className="text-xs text-[#6B7280] font-medium mt-1">
                  The fastest way to get your website started or ask pre-sales questions.
                </p>
              </div>

              <div className="space-y-2 pt-2 text-xs font-semibold text-gray-700">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-[#2563EB]" />
                  <span>Response Time: &lt; 15 Minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={16} className="text-[#2563EB]" />
                  <span>Available: Mon–Sat (9 AM – 9 PM IST)</span>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/916392577105"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm py-3.5 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare size={18} fill="white" />
              <span>Chat on WhatsApp (+91 63925 77105)</span>
            </a>
          </motion.div>

          {/* RIGHT: EMAIL & ENQUIRY FORM TRIGGER CARD */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="bg-white border border-gray-200/90 rounded-[32px] p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="p-3 rounded-2xl bg-blue-50 text-[#2563EB] w-fit">
                <Mail size={24} />
              </div>

              <div>
                <h3 className="text-xl font-black text-[#0A0A0A]">Submit an Enquiry</h3>
                <p className="text-xs text-[#6B7280] font-medium mt-1">
                  Fill in your details and select your plan using our quick enquiry modal.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200/80 rounded-2xl p-4 space-y-2 text-xs font-semibold text-gray-700">
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-[#2563EB]" />
                  <span>Email: support@prostolabs.in</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#2563EB]" />
                  <span>Location: India</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenModal?.('care')}
              className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-sm py-3.5 px-6 rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Open Enquiry Form</span>
              <ArrowRight size={18} />
            </button>
          </motion.div>

        </div>

      </div>
    </div>
  )
}