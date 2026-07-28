import { useState, useEffect, useRef } from 'react'
import { 
  motion, 
  AnimatePresence,
  useMotionValue, 
  useTransform, 
  useSpring, 
  useScroll, 
  animate,
  useReducedMotion
} from 'framer-motion'
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2,
  Lock,
  MessageSquare,
  Star,
  Zap,
  MapPin,
  Calendar,
  ChevronRight,
  ShieldCheck,
  UserCheck,
  Building2,
  Award
} from 'lucide-react'
import { BrowserMockup } from './BrowserMockup'
import type { PlanType } from '../Modal/EnquiryModal'

interface HeroProps {
  onOpenModal?: (plan?: PlanType) => void
}

// --- EASING & PHYSICS ---
const easeSaaS = [0.16, 1, 0.3, 1] as const

// --- LIVE NUMBER COUNTER FOR PHONE UI ---
function PhoneLiveCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString('en-IN'))

  useEffect(() => {
    count.set(0)
    const controls = animate(count, value, {
      duration: 1.6,
      ease: easeSaaS
    })
    return controls.stop
  }, [value, count])

  return (
    <span>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}

// --- LIVE COUNT UP PRICE COMPONENT (HERO HEADLINE) ---
function AnimatedPriceCounter() {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    const controls = animate(count, 499, {
      duration: 1.1,
      delay: 1.2,
      ease: easeSaaS,
      onComplete: () => setIsDone(true)
    })
    return controls.stop
  }, [count])

  return (
    <span className="inline-flex items-baseline relative font-black text-[#2563EB] tracking-tight">
      <span className="mr-0.5">₹</span>
      <motion.span>{rounded}</motion.span>

      <motion.span 
        initial={{ x: '-100%', opacity: 0 }}
        animate={isDone ? { x: '200%', opacity: [0, 1, 0] } : {}}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-70 pointer-events-none transform-gpu"
      />

      <motion.span 
        initial={{ scaleX: 0 }}
        animate={isDone ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, ease: easeSaaS }}
        className="absolute -bottom-0.5 left-0 right-0 h-[2.5px] sm:h-[3px] bg-[#2563EB] rounded-full origin-left shadow-2xs transform-gpu"
      />
    </span>
  )
}

// --- 6 INDIVIDUAL INDUSTRY WEBSITES (UNIQUE COMPONENT LAYOUTS) ---

// 1. RESTAURANT WEBSITE UI
function RestaurantWebsite() {
  return (
    <div className="flex-1 flex flex-col justify-between space-y-2">
      <motion.div 
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="relative h-24 rounded-2xl bg-cover bg-center overflow-hidden border border-white/10 flex flex-col justify-end p-2.5"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&auto=format&fit=crop&q=80')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="relative z-10 space-y-0.5">
          <span className="bg-amber-500/90 text-black font-extrabold text-[8px] px-1.5 py-0.5 rounded-md uppercase tracking-wider">
            Fine Dining
          </span>
          <h5 className="font-extrabold text-xs text-white leading-tight">Spice Route Bistro</h5>
        </div>
      </motion.div>

      {/* Menu Cards */}
      <div className="space-y-1.5">
        <div className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Popular Starters</div>
        <div className="grid grid-cols-2 gap-1.5">
          <motion.div 
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.2 }}
            className="bg-white/5 border border-white/10 p-1.5 rounded-xl text-left"
          >
            <div className="text-[10px] font-extrabold text-white truncate">Truffle Pizza</div>
            <div className="text-[8px] text-amber-400 font-bold">₹599</div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.25 }}
            className="bg-white/5 border border-white/10 p-1.5 rounded-xl text-left"
          >
            <div className="text-[10px] font-extrabold text-white truncate">Paneer Tikka</div>
            <div className="text-[8px] text-amber-400 font-bold">₹349</div>
          </motion.div>
        </div>
      </div>

      {/* Counter & Action */}
      <motion.div 
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.3 }}
        className="bg-amber-950/40 border border-amber-500/30 p-2 rounded-xl flex items-center justify-between text-[9px]"
      >
        <span className="text-amber-200 font-medium">Table Turn:</span>
        <span className="font-bold text-amber-400"><PhoneLiveCounter value={15} suffix=" Mins" /></span>
      </motion.div>

      <motion.button 
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.35 }}
        className="w-full h-8 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl text-[10px] font-extrabold text-white flex items-center justify-center gap-1 shadow-md"
      >
        <span>Reserve Table Now</span>
        <ChevronRight size={12} />
      </motion.button>
    </div>
  )
}

// 2. MEDICAL CLINIC WEBSITE UI
function ClinicWebsite() {
  return (
    <div className="flex-1 flex flex-col justify-between space-y-2">
      {/* Doctor Info Card */}
      <motion.div 
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="bg-blue-950/50 border border-blue-400/30 p-2.5 rounded-2xl flex items-center gap-2.5"
      >
        <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center shrink-0">
          <UserCheck size={20} className="text-blue-400" />
        </div>
        <div className="min-w-0">
          <div className="text-[8px] font-bold text-cyan-400 uppercase">Cardiologist</div>
          <h5 className="font-extrabold text-xs text-white truncate">Dr. Ananya Sharma</h5>
          <div className="text-[8px] text-gray-300 font-medium">MD • 15+ Yrs Exp</div>
        </div>
      </motion.div>

      {/* OPD Slots */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center text-[9px]">
          <span className="font-bold text-gray-300">OPD Slots Today</span>
          <span className="text-emerald-400 font-bold">4 Slots Left</span>
        </div>
        <div className="grid grid-cols-3 gap-1">
          {["4:30 PM", "5:15 PM", "6:00 PM"].map((time, idx) => (
            <motion.div 
              key={time}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 + idx * 0.05 }}
              className="bg-white/10 border border-white/10 rounded-lg p-1 text-center text-[9px] font-bold text-blue-200"
            >
              {time}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Trust Rating */}
      <motion.div 
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.3 }}
        className="bg-white/5 border border-white/10 p-2 rounded-xl flex items-center justify-between text-[9px]"
      >
        <span className="text-gray-300">Patients Treated:</span>
        <span className="font-extrabold text-emerald-400"><PhoneLiveCounter value={10000} suffix="+" /></span>
      </motion.div>

      <motion.button 
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.35 }}
        className="w-full h-8 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl text-[10px] font-extrabold text-white flex items-center justify-center gap-1 shadow-md"
      >
        <span>Book OPD Appointment</span>
        <Calendar size={12} />
      </motion.button>
    </div>
  )
}

// 3. SALON WEBSITE UI
function SalonWebsite() {
  return (
    <div className="flex-1 flex flex-col justify-between space-y-2">
      <motion.div 
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="bg-gradient-to-r from-pink-900/40 to-rose-900/40 border border-pink-500/30 p-2.5 rounded-2xl text-left"
      >
        <span className="bg-pink-500 text-white font-black text-[8px] px-2 py-0.5 rounded-full uppercase tracking-wider">
          20% OFF FIRST VISIT
        </span>
        <h5 className="font-black text-xs text-white mt-1.5">Lumiere Spa & Salon</h5>
        <p className="text-[8px] text-pink-200 leading-tight">Bespoke hair styling & deep skin hydration</p>
      </motion.div>

      {/* Services List */}
      <div className="space-y-1.5">
        <div className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Featured Packages</div>
        <motion.div 
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: 0.2 }}
          className="bg-white/5 border border-white/10 p-2 rounded-xl flex items-center justify-between text-[10px]"
        >
          <div>
            <div className="font-extrabold text-white">Keratin & Glow Facial</div>
            <div className="text-[8px] text-gray-400">90 Mins • Organic Spa</div>
          </div>
          <span className="font-bold text-pink-400">₹2,499</span>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.3 }}
        className="bg-pink-950/30 border border-pink-500/20 p-2 rounded-xl flex items-center justify-between text-[9px]"
      >
        <span className="text-gray-300">Client Rating:</span>
        <span className="font-bold text-amber-400">5.0 ⭐ (420+ Reviews)</span>
      </motion.div>

      <motion.button 
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.35 }}
        className="w-full h-8 bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl text-[10px] font-extrabold text-white flex items-center justify-center gap-1 shadow-md"
      >
        <span>Claim 20% Discount Pass</span>
        <ChevronRight size={12} />
      </motion.button>
    </div>
  )
}

// 4. GYM WEBSITE UI
function GymWebsite() {
  return (
    <div className="flex-1 flex flex-col justify-between space-y-2">
      <motion.div 
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="bg-emerald-950/50 border border-emerald-500/40 p-2.5 rounded-2xl text-left"
      >
        <div className="flex items-center justify-between">
          <span className="text-emerald-400 font-extrabold text-[8px] uppercase tracking-wider">
            ⚡ 0 INITIATION FEE
          </span>
          <span className="text-[8px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono">24/7 OPEN</span>
        </div>
        <h5 className="font-black text-sm text-white mt-1">FitPulse Fitness Arena</h5>
      </motion.div>

      {/* Fitness Counter */}
      <div className="grid grid-cols-2 gap-1.5">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white/5 border border-white/10 p-2 rounded-xl text-center"
        >
          <div className="text-sm font-black text-emerald-400">
            <PhoneLiveCounter value={1250} suffix="+" />
          </div>
          <div className="text-[8px] text-gray-400 font-medium">Active Members</div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.25 }}
          className="bg-white/5 border border-white/10 p-2 rounded-xl text-center"
        >
          <div className="text-sm font-black text-white">780 kcal</div>
          <div className="text-[8px] text-gray-400 font-medium">Avg Burned/Session</div>
        </motion.div>
      </div>

      <motion.button 
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.35 }}
        className="w-full h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl text-[10px] font-extrabold text-white flex items-center justify-center gap-1 shadow-md"
      >
        <span>Get Free 1-Day Trial Pass</span>
        <Zap size={12} className="fill-white" />
      </motion.button>
    </div>
  )
}

// 5. REAL ESTATE WEBSITE UI
function RealEstateWebsite() {
  return (
    <div className="flex-1 flex flex-col justify-between space-y-2">
      <motion.div 
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="relative h-24 rounded-2xl bg-cover bg-center overflow-hidden border border-white/10 flex flex-col justify-end p-2.5"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&auto=format&fit=crop&q=80')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <div className="relative z-10 space-y-0.5">
          <span className="bg-amber-400 text-black font-extrabold text-[8px] px-1.5 py-0.5 rounded uppercase">
            0% Brokerage
          </span>
          <h5 className="font-extrabold text-xs text-white">Apex Sky Villas</h5>
        </div>
      </motion.div>

      <div className="bg-white/5 border border-white/10 p-2 rounded-xl space-y-1 text-[9px]">
        <div className="flex justify-between items-center">
          <span className="text-gray-300 font-medium">4 BHK Luxury Villa</span>
          <span className="font-extrabold text-amber-400 text-xs">₹1.85 Cr</span>
        </div>
        <div className="text-[8px] text-gray-400">Private Pool • 3,400 sq.ft • City View</div>
      </div>

      <motion.button 
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.35 }}
        className="w-full h-8 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-xl text-[10px] font-extrabold text-white flex items-center justify-center gap-1 shadow-md"
      >
        <span>Schedule Private Visit</span>
        <MapPin size={12} />
      </motion.button>
    </div>
  )
}

// 6. COACHING WEBSITE UI
function CoachingWebsite() {
  return (
    <div className="flex-1 flex flex-col justify-between space-y-2">
      <motion.div 
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="bg-indigo-950/50 border border-indigo-500/30 p-2.5 rounded-2xl text-left"
      >
        <div className="inline-block bg-indigo-500 text-white font-extrabold text-[8px] px-2 py-0.5 rounded uppercase mb-1">
          BATCH 2026 ADMISSIONS
        </div>
        <h5 className="font-black text-xs text-white">Mindspace Academy</h5>
        <p className="text-[8px] text-indigo-200">IIT & AIIMS Alumni Faculty Mentors</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-1.5 text-[9px]">
        <div className="bg-white/5 border border-white/10 p-2 rounded-xl">
          <div className="text-indigo-400 font-extrabold">98.4%</div>
          <div className="text-[8px] text-gray-400">Selection Rate</div>
        </div>

        <div className="bg-white/5 border border-white/10 p-2 rounded-xl">
          <div className="text-indigo-400 font-extrabold">AIR 14</div>
          <div className="text-[8px] text-gray-400">Top JEE Ranker</div>
        </div>
      </div>

      <motion.button 
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.35 }}
        className="w-full h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-[10px] font-extrabold text-white flex items-center justify-center gap-1 shadow-md"
      >
        <span>Register Free Demo Class</span>
        <ChevronRight size={12} />
      </motion.button>
    </div>
  )
}

// --- PHONE ROTATOR DEMOS REGISTRY ---
const phoneDemos = [
  { id: 'restaurant', businessName: 'Spice Route Bistro', domain: 'spiceroute.in', notification: '💬 WhatsApp: Table for 4 confirmed!', component: RestaurantWebsite },
  { id: 'clinic', businessName: 'CarePlus Multi-Clinic', domain: 'careplus.in', notification: '✅ Slot Confirmed: Dr. Sharma at 4:30 PM', component: ClinicWebsite },
  { id: 'salon', businessName: 'Lumiere Spa & Salon', domain: 'lumieresalon.in', notification: '💬 WhatsApp: Hair Spa enquiry received', component: SalonWebsite },
  { id: 'gym', businessName: 'FitPulse Fitness', domain: 'fitpulse.in', notification: '🔥 Trial Pass sent via WhatsApp', component: GymWebsite },
  { id: 'realestate', businessName: 'Apex Estate Realty', domain: 'apexestates.in', notification: '📑 Brochure Downloaded', component: RealEstateWebsite },
  { id: 'coaching', businessName: 'Mindspace Academy', domain: 'mindspace.in', notification: '✅ Seat Reserved for Sunday Demo', component: CoachingWebsite }
]

export function Hero({ onOpenModal }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  // --- LIVE INTERACTIVE STATE ---
  const [demoIndex, setDemoIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setIsLoading(true)
      setTimeout(() => {
        setDemoIndex((prev) => (prev + 1) % phoneDemos.length)
        setIsLoading(false)
      }, 400) // Shimmer transition phase duration
    }, 4600)

    return () => clearInterval(timer)
  }, [])

  const currentDemo = phoneDemos[demoIndex]
  const ActiveComponent = currentDemo.component

  // --- DESKTOP MOUSE PARALLAX ---
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [3, -3])
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-3, 3])
  const glowX = useTransform(smoothMouseX, [-0.5, 0.5], [-25, 25])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  // --- SCROLL DEPTH PARALLAX ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  const mockupScrollY = useTransform(scrollYProgress, [0, 1], [0, 50])
  const bgScrollY = useTransform(scrollYProgress, [0, 1], [0, -40])

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 lg:pb-20 bg-[#FAFAFA] overflow-hidden select-none" 
      id="hero"
    >
      {/* BACKGROUND AMBIENT GLOW */}
      <motion.div 
        style={{ y: shouldReduceMotion ? 0 : bgScrollY, x: shouldReduceMotion ? 0 : glowX }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.08, 0.14, 0.08] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[1000px] h-[300px] sm:h-[550px] bg-[#2563EB] rounded-full blur-[90px] sm:blur-[120px] pointer-events-none z-0 transform-gpu" 
      />

      {/* ========================================================================= */}
      {/* 1. MOBILE-FIRST DEDICATED LAYOUT (≤1023px) */}
      {/* ========================================================================= */}
      <div className="block lg:hidden px-6 relative z-10 max-w-md mx-auto text-center space-y-6">
        
        {/* BADGE */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="inline-flex justify-center transform-gpu"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 shadow-2xs">
            <span className="text-xs">🇮🇳</span>
            <span className="text-[11px] font-bold text-[#2563EB] tracking-wider uppercase">
              Built for Indian Businesses
            </span>
          </div>
        </motion.div>

        {/* HEADLINE WITH ₹499 FOCAL POINT */}
        <motion.div 
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: easeSaaS }}
          className="space-y-2 transform-gpu"
        >
          <h1 className="text-[2.25rem] leading-[1.1] font-black text-[#0A0A0A] font-sans tracking-tight">
            Professional Websites
          </h1>
          <div className="text-2xl font-extrabold text-[#0A0A0A] flex items-center justify-center gap-1.5">
            <span>From Just</span>
            <div className="text-3xl font-black text-[#2563EB]">
              <AnimatedPriceCounter />
              <span className="text-lg font-bold ml-0.5">/mo</span>
            </div>
          </div>
        </motion.div>

        {/* SUBTITLE */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2, ease: "easeOut" }}
          className="text-sm text-[#6B7280] font-medium leading-relaxed px-1 transform-gpu"
        >
          Launch a modern, mobile-friendly website for your business without paying agency prices. Hosting, maintenance, security, and support included.
        </motion.p>

        {/* COMPARISON PILL */}
        <motion.div 
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="inline-flex items-center gap-2 p-1.5 px-3.5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs text-xs font-semibold transform-gpu"
        >
          <div className="flex items-center gap-1 text-gray-500">
            <span>Agencies</span>
            <span className="line-through text-gray-400 font-bold">₹20k+</span>
          </div>
          <span className="text-gray-300 font-normal">→</span>
          <div className="flex items-center gap-1 text-[#2563EB] font-bold bg-blue-50 px-2 py-0.5 rounded-xl border border-blue-100">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>ProstoLabs: ₹499/mo</span>
          </div>
        </motion.div>

        {/* 56px TALL CTA BUTTONS */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.38 }}
          className="space-y-3 pt-1 transform-gpu"
        >
          <motion.button 
            onClick={() => onOpenModal?.('care')}
            whileTap={{ scale: 0.98 }}
            className="w-full h-[56px] bg-[#2563EB] text-white font-bold text-base rounded-2xl shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer active:bg-blue-700 transition-colors"
          >
            <span>Start at ₹499/month</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          <a 
            href="#pricing"
            className="w-full h-[56px] bg-white text-[#0A0A0A] border border-gray-200 font-bold text-base rounded-2xl shadow-2xs flex items-center justify-center cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors"
          >
            View Pricing
          </a>
        </motion.div>

        {/* TRUST BADGES (2-COLUMN GRID) */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.48 }}
          className="pt-3 border-t border-gray-200/60 transform-gpu"
        >
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-gray-600 text-left">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
              <span>Hosting Included</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
              <span>SEO Ready</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
              <span>WhatsApp Support</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
              <span>Mobile Friendly</span>
            </div>
          </div>
        </motion.div>

        {/* LIVE SIMULATED INTERACTIVE PHONE DEMO */}
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.55, ease: easeSaaS }}
          className="relative pt-4 transform-gpu"
        >
          <div className="absolute inset-0 bg-[#2563EB]/15 blur-2xl rounded-full scale-90 pointer-events-none" />

          {/* Phone Frame */}
          <div className="relative w-[255px] h-[450px] mx-auto bg-[#090D16] rounded-[38px] border-4 border-gray-800 p-2 shadow-2xl overflow-hidden flex flex-col justify-between">
            
            {/* Phone Notch */}
            <div className="w-16 h-3 bg-gray-800 rounded-full mx-auto mb-1.5 shrink-0 relative z-30" />

            {/* Screen Inner Stage */}
            <div className="w-full flex-1 bg-[#0F172A] rounded-[28px] p-3 flex flex-col justify-between border border-white/10 text-white text-left relative overflow-hidden">
              
              {/* Top Browser Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-2 shrink-0 z-20">
                <div className="flex items-center gap-1.5 overflow-hidden">
                  <Lock size={10} className="text-emerald-400 shrink-0" />
                  <span className="font-mono text-[9px] text-gray-300 truncate">{currentDemo.domain}</span>
                </div>

                <div className="flex items-center gap-1 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-400/30 shrink-0">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                  <span className="text-[8px] font-mono text-emerald-300 font-bold">ONLINE</span>
                </div>
              </div>

              {/* Dynamic Screen Viewport Area */}
              <div className="flex-1 my-2 relative flex flex-col justify-between overflow-hidden">
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    /* Loading Shimmer Transition Phase */
                    <motion.div 
                      key="loading-state"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 bg-[#0F172A] p-2 flex flex-col justify-center space-y-3"
                    >
                      <div className="w-full h-12 bg-white/5 rounded-xl animate-pulse" />
                      <div className="w-3/4 h-4 bg-white/5 rounded animate-pulse" />
                      <div className="w-1/2 h-3 bg-white/5 rounded animate-pulse" />
                      <div className="w-full h-8 bg-blue-500/20 rounded-xl animate-pulse mt-auto" />
                    </motion.div>
                  ) : (
                    /* Render Active Website Layout */
                    <motion.div
                      key={currentDemo.id}
                      initial={{ opacity: 0, scale: 0.98, y: 12 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98, y: -12 }}
                      transition={{ duration: 0.5, ease: easeSaaS }}
                      className="w-full h-full flex flex-col justify-between transform-gpu"
                    >
                      <ActiveComponent />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Floating WhatsApp Notification Pop-up */}
              <motion.div 
                key={`notif-${currentDemo.id}`}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6, ease: easeSaaS }}
                className="bg-emerald-950/90 border border-emerald-500/40 text-emerald-200 p-1.5 px-2 rounded-xl text-[9px] font-bold flex items-center gap-1.5 shadow-lg shrink-0 z-20"
              >
                <MessageSquare size={10} className="text-emerald-400 shrink-0" />
                <span className="truncate">{currentDemo.notification}</span>
              </motion.div>

            </div>

            {/* Bottom Screen Indicator Dots */}
            <div className="flex items-center justify-center gap-1.5 pt-2 pb-0.5 relative z-30 shrink-0">
              {phoneDemos.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsLoading(true)
                    setTimeout(() => {
                      setDemoIndex(idx)
                      setIsLoading(false)
                    }, 200)
                  }}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    demoIndex === idx ? 'w-5 bg-[#2563EB]' : 'w-1 bg-gray-700'
                  }`}
                />
              ))}
            </div>

          </div>
        </motion.div>

      </div>


      {/* ========================================================================= */}
      {/* 2. STRICT 2-COLUMN DESKTOP GRID LAYOUT (≥1024px UNTOUCHED) */}
      {/* ========================================================================= */}
      <div className="hidden lg:block max-w-[1300px] mx-auto px-12 relative z-10">
        <div className="grid grid-cols-12 gap-8 items-center">
          
          {/* LEFT COLUMN: HERO TEXT & CONTENT (7 COLS) */}
          <div className="col-span-7 space-y-5">
            
            <motion.div 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 }}
              className="inline-flex transform-gpu"
            >
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 shadow-2xs">
                <span className="text-xs">🇮🇳</span>
                <span className="text-[11px] font-bold text-[#2563EB] tracking-wider uppercase">
                  Built for Indian Businesses
                </span>
              </div>
            </motion.div>

            <h1 className="text-5xl lg:text-6xl font-black text-[#0A0A0A] font-sans tracking-tight">
              <div className="overflow-hidden pb-0.5">
                <motion.div
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: easeSaaS }}
                  className="transform-gpu"
                >
                  Professional Websites
                </motion.div>
              </div>

              <div className="overflow-hidden flex items-baseline gap-x-3 pt-0.5">
                <motion.span
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.42, ease: easeSaaS }}
                  className="transform-gpu"
                >
                  From Just
                </motion.span>

                <motion.div
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, delay: 0.65 }}
                  className="inline-flex items-baseline relative group cursor-pointer transform-gpu"
                >
                  <AnimatedPriceCounter />

                  <motion.span 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, delay: 0.9, ease: "easeOut" }}
                    className="text-3xl font-bold text-[#2563EB] ml-0.5"
                  >
                    /month
                  </motion.span>
                </motion.div>
              </div>
            </h1>

            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 1.0, ease: "easeOut" }}
              className="text-lg text-[#6B7280] font-medium leading-relaxed max-w-xl transform-gpu"
            >
              Launch a modern, mobile-friendly website for your business without paying agency prices. Hosting, maintenance, security, and support are included.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.15 }}
              className="pt-0.5 transform-gpu"
            >
              <div className="inline-flex items-center gap-3 p-2 px-4 rounded-2xl bg-white border border-gray-200/90 shadow-2xs text-xs font-semibold">
                <div className="flex items-center gap-1 text-gray-500">
                  <span>Agencies</span>
                  <span className="line-through text-gray-400 font-bold">₹20k+</span>
                </div>
                <span className="text-gray-300 font-normal">→</span>
                <div className="flex items-center gap-1 text-[#2563EB] font-bold bg-blue-50 px-2 py-1 rounded-xl border border-blue-100">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>ProstoLabs: ₹499/mo</span>
                </div>
              </div>
            </motion.div>

            <div className="pt-0.5 flex items-center gap-3">
              <motion.button 
                onClick={() => onOpenModal?.('care')}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.25 }}
                whileHover={{ scale: 1.02, boxShadow: "0 20px 35px -10px rgba(37,99,235,0.35)" }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#2563EB] text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group cursor-pointer transform-gpu"
              >
                <span>Start at ₹499/month</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.a 
                href="#pricing"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 1.35 }}
                className="bg-white text-[#0A0A0A] border border-gray-200/90 font-bold text-sm px-6 py-3.5 rounded-xl transition-all items-center justify-center text-center shadow-2xs cursor-pointer hover:bg-gray-50 transform-gpu"
              >
                View Pricing
              </motion.a>
            </div>

            <div className="pt-3 border-t border-gray-200/60 w-full">
              <div className="flex flex-wrap items-center gap-x-5 text-xs font-semibold text-gray-600">
                {["Hosting Included", "SEO Ready", "WhatsApp Support", "Mobile Friendly", "SSL Security"].map((text, idx) => (
                  <motion.div 
                    key={text}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 1.45 + (idx * 0.05) }}
                    className="flex items-center gap-1.5 transform-gpu"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
                    <span>{text}</span>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: DESKTOP BROWSER PREVIEW (5 COLS) */}
          <motion.div 
            style={{ y: shouldReduceMotion ? 0 : mockupScrollY }}
            className="col-span-5 relative transform-gpu"
          >
            <div className="relative rounded-2xl border border-gray-200/90 bg-white shadow-2xl overflow-hidden">
              <BrowserMockup rotateX={rotateX} rotateY={rotateY} />
            </div>
          </motion.div>

        </div>
      </div>

      {/* SECTION SEPARATOR & BLEND */}
      <div className="absolute bottom-0 left-0 right-0 h-8 sm:h-10 bg-gradient-to-b from-transparent via-gray-100/30 to-white/80 pointer-events-none z-10" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1300px] px-6 z-10">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200/80 to-transparent" />
      </div>
    </section>
  )
}