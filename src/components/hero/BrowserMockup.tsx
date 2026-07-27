import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, animate, type MotionValue } from 'framer-motion'
import { 
  Star, 
  Lock, 
  MessageCircle, 
  Sparkles, 
  ArrowUpRight, 
  CheckCircle2, 
  Globe,
  Bell,
  MousePointer2,
  Calendar,
  ShieldCheck,
  Zap
} from 'lucide-react'

interface BrowserMockupProps {
  rotateX: MotionValue<number>
  rotateY: MotionValue<number>
}

// --- BUSINESS DEMO SCENARIOS DATA ---
const DEMO_SCENARIOS = [
  {
    id: 'restaurant',
    url: 'thegrandbistro.in',
    category: 'Fine Dining & Hospitality',
    badge: 'Michelin Selection 2026',
    brandName: 'The Grand Bistro',
    title: 'Artisanal Culinary Excellence',
    subtitle: 'Handcrafted recipes & organic local ingredients in Mumbai.',
    ctaText: 'Reserve Table',
    bgImage: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1200&auto=format&fit=crop',
    accentColor: '#D97706', // Amber
    accentGradient: 'from-amber-500 to-orange-600',
    stat1: { val: 4.9, label: '350+ Google Reviews', suffix: '⭐' },
    stat2: { val: 15, label: 'Min Table Turn', suffix: 'm' },
    toast: '🎉 New Reservation: Table for 4 booked 2m ago',
    whatsappText: 'Instant Table Booking'
  },
  {
    id: 'salon',
    url: 'lumiere-salon.in',
    category: 'Luxury Spa & Beauty',
    badge: '✨ 20% Off First Visit',
    brandName: 'Lumière Spa & Salon',
    title: 'Redefine Everyday Elegance',
    subtitle: 'Bespoke hair styling, skin rejuvenation & luxury spa care.',
    ctaText: 'Book Appointment',
    bgImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop',
    accentColor: '#F43F5E', // Rose
    accentGradient: 'from-rose-500 to-pink-600',
    stat1: { val: 5.0, label: 'Happy Clients', suffix: '⭐' },
    stat2: { val: 100, label: 'Organic Products', suffix: '%' },
    toast: '💅 Slot Confirmed: Keratin Treatment at 4:30 PM',
    whatsappText: 'Direct Salon Booking'
  },
  {
    id: 'gym',
    url: 'fitpulse-arena.in',
    category: 'High Performance Fitness',
    badge: '⚡ Zero Initiation Fee',
    brandName: 'FitPulse Arena',
    title: 'Crush Your Personal Limits',
    subtitle: 'Elite strength gear, personal coaching & functional training.',
    ctaText: 'Claim 3-Day Pass',
    bgImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop',
    accentColor: '#10B981', // Emerald
    accentGradient: 'from-emerald-500 to-teal-600',
    stat1: { val: 1250, label: 'Active Members', suffix: '+' },
    stat2: { val: 24, label: 'Facility Access', suffix: '/7' },
    toast: '🔥 Free Pass Claimed by Rahul from Indiranagar',
    whatsappText: 'Chat with Trainer'
  },
  {
    id: 'clinic',
    url: 'careplus-health.in',
    category: 'Trusted Healthcare',
    badge: '🏥 OPD Slots Available',
    brandName: 'CarePlus Medical',
    title: 'Healthcare You Can Depend On',
    subtitle: 'Senior specialist doctors with zero waiting time.',
    ctaText: 'Book OPD Visit',
    bgImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop',
    accentColor: '#2563EB', // Blue
    accentGradient: 'from-blue-600 to-cyan-500',
    stat1: { val: 15, label: 'Yrs Combined Exp', suffix: '+' },
    stat2: { val: 10, label: 'Patients Treated', suffix: 'k+' },
    toast: '🩺 Dr. Ananya Sharma: 2 OPD Slots Open Today',
    whatsappText: 'WhatsApp Consultation'
  },
  {
    id: 'realestate',
    url: 'apex-estates.in',
    category: 'Luxury Architecture',
    badge: '🏡 New Villa Launch',
    brandName: 'Apex Luxury Estates',
    title: 'Architectural Masterpieces',
    subtitle: 'Verified villas & skyline penthouses with 3D walkthroughs.',
    ctaText: 'Schedule Tour',
    bgImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
    accentColor: '#D4AF37', // Gold
    accentGradient: 'from-amber-400 to-yellow-600',
    stat1: { val: 50, label: 'Villas Closed', suffix: 'Cr+' },
    stat2: { val: 0, label: 'Brokerage Fee', suffix: '%' },
    toast: '🏰 Private Site Visit Confirmed for Skyline Villa',
    whatsappText: 'Request Brochure'
  }
]

// --- LIVE STAT COUNTER ---
function LiveCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => 
    latest % 1 === 0 ? Math.round(latest) : latest.toFixed(1)
  )

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1]
    })
    return controls.stop
  }, [count, value])

  return (
    <span>
     <motion.span>{rounded as any}</motion.span>
      {suffix}
    </span>
  )
}

export function BrowserMockup({ rotateX, rotateY }: BrowserMockupProps) {
  const [activeIdx, setActiveIndex] = useState(0)

  // 7-second automatic business scene cycle
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % DEMO_SCENARIOS.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [])

  const current = DEMO_SCENARIOS[activeIdx]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 25 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 85, damping: 18 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-full z-20 group/mockup"
    >
      {/* AMBIENT BACKLIGHT GLOW THAT ADAPTS TO CURRENT BRAND ACCENT */}
      <motion.div 
        animate={{ backgroundColor: current.accentColor }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 blur-[100px] opacity-20 rounded-[32px] transform translate-y-8 scale-95 pointer-events-none" 
      />

      {/* FLOATING TOP BRAND BADGE */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
        className="hidden sm:flex absolute -top-5 -left-4 z-40 items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-white/95 border border-gray-200/90 shadow-xl backdrop-blur-md text-xs font-bold text-gray-900 pointer-events-none"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        <span>⚡ Built by ProstoLabs • Live Demo</span>
      </motion.div>

      {/* MAIN BROWSER CONTAINER */}
      <div className="bg-white rounded-[26px] shadow-[0_30px_90px_-15px_rgba(0,0,0,0.25)] border border-gray-200/90 overflow-hidden flex flex-col h-[460px] sm:h-[490px] md:h-[520px] relative z-10">
        
        {/* GLASS REFLECTION SHEEN PASS */}
        <motion.div 
          animate={{ x: ['-100%', '200%'] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", repeatDelay: 2.5 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 pointer-events-none z-40"
        />

        {/* 1. BROWSER HEADER TOOLBAR */}
        <div className="bg-[#FAFAFA]/90 backdrop-blur-md border-b border-gray-200/80 px-4 py-2.5 flex items-center justify-between relative z-30 shrink-0">
          
          {/* Traffic Light Buttons */}
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]/40" />
          </div>

          {/* Animated URL Bar */}
          <div className="mx-auto w-1/2 max-w-[260px] h-6.5 bg-white rounded-lg border border-gray-200/80 flex items-center justify-between px-2.5 shadow-2xs relative overflow-hidden">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-gray-500 truncate z-10">
              <Lock className="w-3 h-3 text-emerald-500 shrink-0" />
              <span className="text-emerald-600 font-semibold">https://</span>
              <AnimatePresence mode="wait">
                <motion.span 
                  key={current.url}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="text-gray-800 font-bold truncate"
                >
                  {current.url}
                </motion.span>
              </AnimatePresence>
            </div>
            <Sparkles className="w-3 h-3 text-[#2563EB] shrink-0 z-10" />

            {/* Address Bar Timer Progress Line */}
            <motion.div 
              key={current.id}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 7, ease: "linear" }}
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#2563EB] to-emerald-400 origin-left pointer-events-none"
            />
          </div>

          <div className="flex items-center gap-1 text-emerald-600 text-[10px] font-mono font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            <span>100% SEO</span>
          </div>
        </div>

        {/* 2. INTERACTIVE DEMO VIEWPORT */}
        <div className="relative flex-1 overflow-hidden bg-[#0A0D14] text-white">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 flex flex-col justify-between p-5 sm:p-7 overflow-hidden"
            >
              {/* Image Background with Parallax Pan */}
              <motion.div 
                initial={{ scale: 1.08, y: 0 }}
                animate={{ scale: 1, y: -12 }}
                transition={{ duration: 7, ease: "linear" }}
                className="absolute inset-0 bg-cover bg-center opacity-45 z-0"
                style={{ backgroundImage: `url('${current.bgImage}')` }}
              />

              {/* Gradient Overlay for Typography Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-[#0A0D14]/60 to-[#0A0D14]/30 z-0" />

              {/* DEMO SITE NAVBAR */}
              <div className="relative z-10 flex items-center justify-between pb-3 border-b border-white/15">
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-lg bg-gradient-to-r ${current.accentGradient} flex items-center justify-center font-black text-xs text-white shadow-md`}>
                    ✓
                  </div>
                  <span className="font-extrabold text-xs tracking-wide uppercase text-white font-sans">
                    {current.brandName}
                  </span>
                </div>

                <div className="hidden sm:flex items-center gap-4 text-[11px] font-semibold text-gray-300">
                  <span>Services</span>
                  <span>About</span>
                  <span>Reviews</span>
                </div>

                <div className="bg-white/15 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full text-[10px] font-bold">
                  Contact
                </div>
              </div>

              {/* HERO FOCUS CONTENT */}
              <div className="relative z-10 my-auto max-w-sm pt-2">
                
                {/* Category Badge */}
                <motion.div 
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                  className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-[10px] font-bold text-white mb-2.5 shadow-xs"
                >
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>{current.badge}</span>
                </motion.div>

                {/* Headline */}
                <motion.h2 
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-[1.12] mb-2 font-sans"
                >
                  {current.title}
                </motion.h2>

                {/* Subtitle */}
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="text-xs text-gray-300 leading-relaxed mb-4 font-medium"
                >
                  {current.subtitle}
                </motion.p>

                {/* CTA Action Buttons */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-2.5"
                >
                  <motion.div 
                    whileHover={{ scale: 1.04 }}
                    className={`bg-gradient-to-r ${current.accentGradient} text-white font-extrabold text-[11px] px-4.5 py-2 rounded-xl shadow-lg flex items-center gap-1.5 cursor-pointer`}
                  >
                    <span>{current.ctaText}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </motion.div>

                  <div className="bg-white/10 backdrop-blur-md border border-white/15 text-white px-3 py-2 rounded-xl text-[11px] font-bold">
                    Explore
                  </div>
                </motion.div>
              </div>

              {/* BOTTOM STATS & TRUST STRIP */}
              <div className="relative z-10 pt-3 border-t border-white/10 grid grid-cols-2 gap-2">
                <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 backdrop-blur-md flex items-center justify-between">
                  <div>
                    <div className="text-xs font-black text-white font-sans">
                      <LiveCounter value={current.stat1.val} suffix={current.stat1.suffix} />
                    </div>
                    <div className="text-[9px] text-gray-400 font-medium">{current.stat1.label}</div>
                  </div>
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 backdrop-blur-md flex items-center justify-between">
                  <div>
                    <div className="text-xs font-black text-white font-sans">
                      <LiveCounter value={current.stat2.val} suffix={current.stat2.suffix} />
                    </div>
                    <div className="text-[9px] text-gray-400 font-medium">{current.stat2.label}</div>
                  </div>
                  <Zap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                </div>
              </div>

              {/* SIMULATED FLOATING TOAST NOTIFICATION */}
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1.2, type: "spring", stiffness: 120 }}
                className="absolute top-16 right-4 z-30 bg-white/95 border border-gray-200 text-gray-900 p-2.5 rounded-2xl shadow-xl backdrop-blur-md flex items-center gap-2 max-w-[210px]"
              >
                <div className="p-1.5 bg-blue-50 text-[#2563EB] rounded-xl shrink-0">
                  <Bell className="w-3.5 h-3.5" />
                </div>
                <div className="text-[10px] font-bold leading-tight">
                  {current.toast}
                </div>
              </motion.div>

              {/* SIMULATED ANIMATED CURSOR JOURNEY */}
              <motion.div
                animate={{
                  x: [40, 140, 140, 60, 40],
                  y: [120, 160, 160, 220, 120],
                  scale: [1, 1, 0.85, 1, 1]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: "easeInOut",
                  repeatDelay: 1
                }}
                className="absolute top-0 left-0 pointer-events-none z-40 drop-shadow-md text-white"
              >
                <MousePointer2 className="w-4 h-4 fill-white text-[#2563EB]" />
              </motion.div>

            </motion.div>
          </AnimatePresence>

          {/* FLOATING WHATSAPP CHAT POPUP */}
          <motion.div 
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="absolute bottom-3 right-3 z-30 bg-emerald-600 text-white p-2.5 rounded-2xl shadow-xl border border-emerald-400/40 flex items-center gap-2 text-left pointer-events-none"
          >
            <div className="p-1.5 bg-white/20 rounded-xl shrink-0">
              <MessageCircle className="w-3.5 h-3.5 fill-white text-emerald-600" />
            </div>
            <div>
              <div className="text-[10px] font-extrabold flex items-center gap-1">
                <span>{current.whatsappText}</span>
                <span className="w-1.5 h-1.5 bg-emerald-300 rounded-full animate-ping" />
              </div>
              <div className="text-[8px] text-emerald-100 font-medium">Direct Lead Channel</div>
            </div>
          </motion.div>

        </div>

      </div>
    </motion.div>
  )
}