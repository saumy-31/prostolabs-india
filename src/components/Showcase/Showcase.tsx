import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { 
  Sparkles, 
  Lock, 
  Zap, 
  TrendingUp, 
  MessageSquare, 
  Smartphone,
  ExternalLink,
  ChevronRight,
  AlertTriangle,
  Building2,
  GraduationCap,
  Utensils,
  Dumbbell,
  Scissors,
  Stethoscope
} from 'lucide-react'

// --- ANIMATED LIVE COUNTER ---
function MetricCounter({ value, suffix = "", decimals = 0 }: { value: number; suffix?: string; decimals?: number }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => 
    decimals > 0 ? latest.toFixed(decimals) : Math.round(latest).toString()
  )
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

  return (
    <span>
      <motion.span ref={ref}>{rounded}</motion.span>
      {suffix}
    </span>
  )
}

// --- INDUSTRY SHOWCASE DEFINITIONS ---
const industries = [
  {
    id: 'restaurant',
    name: 'Restaurant',
    icon: Utensils,
    url: 'gourmet-bistro.in',
    badge: 'Fine Dining & Hospitality',
    theme: 'dark-luxury',
    preview: {
      tag: '🔥 Table Reservation Open',
      headline: 'Artisanal Culinary Excellence in Every Bite',
      description: 'Experience handcrafted recipes, organic local ingredients, and an unforgettable fine dining ambiance.',
      accent: 'from-amber-500 to-orange-600',
      accentColor: '#D97706',
      ctaText: 'Reserve a Table',
      secondaryCta: 'Explore Dinner Menu',
      stat1: '4.9 ⭐',
      stat1Label: '350+ Google Reviews',
      stat2: '15 Mins',
      stat2Label: 'Average Table Turn',
      cardTag: 'Chef Signature Dish',
      cardTitle: 'Wood-Fired Truffle Pizza',
      cardPrice: '₹649',
      cardMeta: 'Fresh Mozzarella • Black Truffle Oil • Basil'
    }
  },
  {
    id: 'gym',
    name: 'Gym & Fitness',
    icon: Dumbbell,
    url: 'fitpulse-arena.in',
    badge: 'High Performance Fitness',
    theme: 'neon-energy',
    preview: {
      tag: '⚡ 0 Initiation Fee This Week',
      headline: 'CRUSH YOUR LIMITS. REBUILD YOURSELF.',
      description: 'State-of-the-art strength gear, elite personal coaching, and high-energy group functional training.',
      accent: 'from-emerald-500 to-teal-400',
      accentColor: '#10B981',
      ctaText: 'Claim Free 3-Day Pass',
      secondaryCta: 'View Class Schedule',
      stat1: '1,250+',
      stat1Label: 'Active Members',
      stat2: '24/7',
      stat2Label: 'Facility Access',
      cardTag: 'Live Fitness Tracker',
      cardTitle: 'Strength & Conditioning',
      cardPrice: '780 kcal',
      cardMeta: 'Avg. Burned per 45 min session'
    }
  },
  {
    id: 'salon',
    name: 'Salon & Spa',
    icon: Scissors,
    url: 'lumiere-salon.in',
    badge: 'Luxury Beauty & Care',
    theme: 'rose-elegance',
    preview: {
      tag: '✨ 20% Off First Treatment',
      headline: 'Redefine Your Everyday Elegance & Beauty',
      description: 'Pamper yourself with bespoke hair styling, skin rejuvenation, and luxury spa treatments.',
      accent: 'from-rose-400 to-pink-600',
      accentColor: '#F43F5E',
      ctaText: 'Book Appointment',
      secondaryCta: 'View Spa Menu',
      stat1: '5.0 ⭐',
      stat1Label: '420+ Happy Clients',
      stat2: '100%',
      stat2Label: 'Organic Hair Products',
      cardTag: 'Most Popular Choice',
      cardTitle: 'Keratin & Glow Facial',
      cardPrice: '₹2,499',
      cardMeta: '90 Mins • Deep Hydration & Styling'
    }
  },
  {
    id: 'clinic',
    name: 'Medical Clinic',
    icon: Stethoscope,
    url: 'careplus-health.in',
    badge: 'Trusted Healthcare',
    theme: 'clean-medical',
    preview: {
      tag: '🏥 OPD Appointments Available Today',
      headline: 'World-Class Healthcare You Can Depend On',
      description: 'Expert doctors, zero waiting time, and compassionate medical care for your entire family.',
      accent: 'from-blue-600 to-cyan-500',
      accentColor: '#2563EB',
      ctaText: 'Book OPD Consultation',
      secondaryCta: 'Find Specialist Doctor',
      stat1: '15+ Yrs',
      stat1Label: 'Combined Experience',
      stat2: '10k+',
      stat2Label: 'Patients Treated',
      cardTag: 'Verified Senior Specialist',
      cardTitle: 'Dr. Ananya Sharma',
      cardPrice: 'Cardiologist',
      cardMeta: 'MD • Available Today (4 slots left)'
    }
  },
  {
    id: 'realestate',
    name: 'Real Estate',
    icon: Building2,
    url: 'apex-estates.in',
    badge: 'Luxury Properties',
    theme: 'architectural-gold',
    preview: {
      tag: '🏡 New Premium Launch in City Center',
      headline: 'Discover Villas & Penthouses Crafted for You',
      description: 'Explore verified luxury properties with 3D virtual walkthroughs and 100% legal clearance.',
      accent: 'from-[#D4AF37] to-amber-600',
      accentColor: '#D4AF37',
      ctaText: 'Schedule Site Visit',
      secondaryCta: 'Download Brochure',
      stat1: '₹50Cr+',
      stat1Label: 'Properties Closed',
      stat2: '0%',
      stat2Label: 'Brokerage on Select Projects',
      cardTag: 'Featured Listing',
      cardTitle: 'Skyline Luxury Villa',
      cardPrice: '₹1.85 Cr',
      cardMeta: '4 BHK • Private Pool • 3,400 sq.ft'
    }
  },
  {
    id: 'coaching',
    name: 'Coaching Institute',
    icon: GraduationCap,
    url: 'apex-academy.in',
    badge: 'Education & Admissions',
    theme: 'indigo-academic',
    preview: {
      tag: '🎓 Batch 2026 Admissions Open',
      headline: 'Empowering Top Ranks in JEE, NEET & Boards',
      description: 'Learn from IIT & AIIMS alumni mentors with small batch sizes and rigorous test series.',
      accent: 'from-indigo-600 to-purple-600',
      accentColor: '#4F46E5',
      ctaText: 'Book Free Demo Class',
      secondaryCta: 'View Batch Schedule',
      stat1: '98.4%',
      stat1Label: 'Success Rate in 2025',
      stat2: 'AIR 14',
      stat2Label: 'Top JEE Ranker',
      cardTag: 'Scholarship Test',
      cardTitle: 'Talent Hunt Exam',
      cardPrice: 'Up to 100%',
      cardMeta: 'Fee Scholarship • Next Sunday 10 AM'
    }
  }
]

// --- FLOATING CHIPS CONFIG ---
const floatingChips = [
  { icon: Zap, text: '⚡ 95+ Performance', bg: 'bg-[#0F172A] text-emerald-400 border-emerald-500/30', pos: '-top-5 -left-4 md:-left-8' },
  { icon: Smartphone, text: '📱 100% Responsive', bg: 'bg-[#0F172A] text-blue-400 border-blue-500/30', pos: 'top-1/4 -right-4 md:-right-8' },
  { icon: MessageSquare, text: '💬 WhatsApp Chat', bg: 'bg-[#0F172A] text-green-400 border-green-500/30', pos: 'bottom-1/3 -left-4 md:-left-8' },
  { icon: TrendingUp, text: '🔍 SEO Ranked #1', bg: 'bg-[#0F172A] text-orange-400 border-orange-500/30', pos: '-bottom-5 right-4 md:right-8' },
]

export function Showcase() {
  const [activeTab, setActiveTab] = useState(0)
  const [isBeforeView, setIsBeforeView] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" })

  const currentInd = industries[activeTab]

  const handleTabChange = (index: number) => {
    if (index === activeTab) return
    setIsLoading(true)
    setActiveTab(index)
    setTimeout(() => {
      setIsLoading(false)
    }, 400)
  }

  return (
    <section ref={sectionRef} className="py-10 md:py-14 bg-[#FAFAFA] relative overflow-hidden" id="work">
      
      {/* Soft Ambient Radial Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[550px] bg-[radial-gradient(ellipse_at_center,_rgba(37,99,235,0.06)_0%,_transparent_75%)] pointer-events-none" />

      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center mb-6 md:mb-8 max-w-2xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 shadow-2xs mb-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
            <span className="text-[11px] font-bold text-[#2563EB] tracking-wider uppercase">✨ Our Work</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0A0A0A] mb-3 tracking-tight font-sans leading-[1.15]"
          >
            Websites that help businesses grow.
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-base md:text-lg text-[#6B7280] font-medium leading-relaxed"
          >
            From restaurants and salons to gyms and clinics, every website is designed to look modern, load fast, and convert visitors into customers.
          </motion.p>
        </div>

        {/* BEFORE VS AFTER TOGGLE */}
        <motion.div 
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-5"
        >
          <div className="bg-white border border-gray-200/90 rounded-full p-1 shadow-2xs flex items-center">
            <button
              onClick={() => setIsBeforeView(false)}
              className={`px-4.5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                !isBeforeView 
                  ? 'bg-[#2563EB] text-white shadow-xs' 
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              ProstoLabs Redesign
            </button>
            <button
              onClick={() => setIsBeforeView(true)}
              className={`px-4.5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                isBeforeView 
                  ? 'bg-amber-600 text-white shadow-xs' 
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              Old Dated Website
            </button>
          </div>
        </motion.div>

        {/* CATEGORY SELECTOR TABS */}
        {!isBeforeView && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-2 mb-6 no-scrollbar"
          >
            {industries.map((ind, idx) => {
              const IconComp = ind.icon
              const isActive = activeTab === idx
              return (
                <button
                  key={ind.id}
                  onClick={() => handleTabChange(idx)}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-300 flex items-center gap-2 border shrink-0 cursor-pointer ${
                    isActive 
                      ? 'bg-[#0A0A0A] border-[#0A0A0A] text-white shadow-xs scale-[1.02]' 
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  <IconComp className={`w-3.5 h-3.5 ${isActive ? 'text-[#2563EB]' : 'text-gray-500'}`} />
                  <span>{ind.name}</span>
                </button>
              )
            })}
          </motion.div>
        )}

        {/* BROWSER SHOWCASE DISPLAY STAGE */}
        <div className="relative max-w-5xl mx-auto perspective-[1200px]">
          
          {/* FLOATING FEATURE CHIPS */}
          {!isBeforeView && floatingChips.map((chip, i) => {
            const ChipIcon = chip.icon
            return (
              <motion.div
                key={chip.text}
                animate={{ y: [0, -6, 0], rotate: [0, i % 2 === 0 ? 1 : -1, 0] }}
                transition={{ repeat: Infinity, duration: 4.5 + i, ease: "easeInOut", delay: i * 0.4 }}
                className={`hidden lg:flex absolute z-30 items-center gap-2 px-3.5 py-2 rounded-2xl border shadow-lg backdrop-blur-md text-xs font-bold ${chip.bg} ${chip.pos}`}
              >
                <ChipIcon className="w-3.5 h-3.5 shrink-0" />
                <span>{chip.text}</span>
              </motion.div>
            )
          })}

          {/* BROWSER FRAME CONTAINER */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.97, y: 20 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 85 }}
            className="bg-[#090D16] rounded-[28px] border border-gray-800 shadow-[0_25px_80px_-15px_rgba(0,0,0,0.3)] overflow-hidden relative"
          >
            {/* Ambient Backlight Reflection */}
            <div className="absolute top-0 right-0 w-[450px] h-[250px] bg-blue-600/10 blur-[80px] pointer-events-none" />

            {/* TOP BROWSER NAVBAR */}
            <div className="bg-[#0F172A]/90 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-gray-800/80 text-gray-400 relative z-20">
              
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/90 shadow-2xs" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/90 shadow-2xs" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/90 shadow-2xs" />
              </div>

              {/* URL Address Bar */}
              <div className="flex items-center justify-center gap-2 bg-[#1E293B]/80 text-gray-200 px-4 py-1 rounded-xl text-[11px] font-mono w-full max-w-md mx-3 border border-white/10 shadow-inner">
                {isBeforeView ? (
                  <span className="text-amber-400 flex items-center gap-1.5 font-bold truncate">
                    ⚠️ http://outdated-business-site-2010.com (Not Secure)
                  </span>
                ) : (
                  <>
                    <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span className="text-emerald-400 font-semibold">https://</span>
                    <span className="truncate">{currentInd.url}</span>
                  </>
                )}
              </div>

              <div className="w-5 h-5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                <ExternalLink className="w-3 h-3 text-gray-400" />
              </div>

              {isLoading && (
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB]"
                />
              )}
            </div>

            {/* INTERIOR WEBSITE SHOWCASE VIEWPORT */}
            <div className="min-h-[420px] md:min-h-[460px] relative overflow-hidden flex flex-col justify-between">
              
              <AnimatePresence mode="wait">
                {isBeforeView ? (
                  /* OLD OUTDATED WEBSITE PREVIEW */
                  <motion.div 
                    key="before-view"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 md:p-10 bg-[#F5F2EB] text-gray-900 font-serif min-h-[420px] flex flex-col justify-between"
                  >
                    <div className="border-b-2 border-red-900 pb-3 flex justify-between items-center">
                      <div className="text-sm md:text-base font-bold text-red-900 uppercase font-mono tracking-wider">
                        *** WELCOME TO OUR HOMEPAGE ***
                      </div>
                      <div className="text-[10px] text-red-800 bg-red-100 px-2 py-0.5 border border-red-300 font-mono">
                        Flash Player Needed
                      </div>
                    </div>

                    <div className="my-6 text-center space-y-3 max-w-xl mx-auto">
                      <div className="text-xl md:text-2xl font-black text-[#800000] underline font-serif">
                        Old Non-Responsive Legacy Website
                      </div>
                      <p className="text-xs md:text-sm font-sans text-gray-700 leading-relaxed">
                        Hard to read on mobile devices. Takes 8+ seconds to load. Missing WhatsApp integration, Google Maps listing, and SSL security.
                      </p>
                      
                      <div className="flex flex-wrap justify-center gap-2 text-[10px] font-mono py-1">
                        <span className="bg-yellow-200 border border-yellow-400 px-2.5 py-0.5 text-yellow-900">
                          ⚠️ Not Mobile Friendly
                        </span>
                        <span className="bg-red-200 border border-red-400 px-2.5 py-0.5 text-red-900">
                          ❌ No SSL Security
                        </span>
                      </div>
                    </div>

                    <div className="bg-amber-100 p-3 border border-amber-300 rounded-xl text-xs text-center font-mono text-amber-900">
                      70%+ of potential customers leave within 3 seconds of seeing an outdated website.
                    </div>
                  </motion.div>
                ) : (
                  /* BESPOKE INDUSTRY PREVIEW */
                  <motion.div 
                    key={currentInd.id}
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="flex-1 flex flex-col justify-between p-5 md:p-8 relative text-white"
                  >

                    {/* MOCK WEBSITE HEADER NAV */}
                    <div className="flex items-center justify-between pb-4 border-b border-white/10 relative z-10">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-xl bg-gradient-to-r ${currentInd.preview.accent} flex items-center justify-center font-bold text-white text-xs shadow-xs`}>
                          ✓
                        </div>
                        <span className="font-bold text-white text-sm font-sans tracking-tight">{currentInd.name}</span>
                      </div>

                      <div className="hidden sm:flex items-center gap-5 text-[11px] font-semibold text-gray-300">
                        <span>Services</span>
                        <span>About</span>
                        <span>Reviews</span>
                        <span>Contact</span>
                      </div>

                      <button className={`px-3.5 py-1.5 rounded-xl text-white font-bold text-[11px] bg-gradient-to-r ${currentInd.preview.accent} shadow-2xs`}>
                        {currentInd.preview.ctaText}
                      </button>
                    </div>

                    {/* HERO FOCUS CONTENT */}
                    <div className="py-6 md:py-8 relative z-10 max-w-2xl">
                      
                      <motion.div 
                        initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                        className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-[11px] font-bold text-white mb-3 shadow-2xs"
                      >
                        <span>{currentInd.preview.tag}</span>
                      </motion.div>

                      <motion.h3 
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                        className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight font-sans leading-[1.12] mb-3 text-white"
                      >
                        {currentInd.preview.headline}
                      </motion.h3>

                      <motion.p 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                        className="text-xs md:text-sm text-gray-300 leading-relaxed mb-6 max-w-xl font-medium"
                      >
                        {currentInd.preview.description}
                      </motion.p>

                      <motion.div 
                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                        className="flex flex-wrap items-center gap-2.5"
                      >
                        <button className={`px-5 py-2.5 rounded-xl text-white font-bold text-xs bg-gradient-to-r ${currentInd.preview.accent} flex items-center gap-1.5 shadow-md hover:scale-[1.02] transition-transform cursor-pointer`}>
                          <span>{currentInd.preview.ctaText}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>

                        <button className="px-4 py-2.5 rounded-xl bg-white/10 text-white border border-white/15 font-bold text-xs hover:bg-white/20 transition-all backdrop-blur-md cursor-pointer">
                          {currentInd.preview.secondaryCta}
                        </button>
                      </motion.div>
                    </div>

                    {/* BOTTOM UI CARD & STATS ROW */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10 relative z-10 items-center">
                      
                      <div className="bg-white/5 border border-white/10 p-3 rounded-2xl backdrop-blur-md">
                        <div className="text-sm font-black text-white">{currentInd.preview.stat1}</div>
                        <div className="text-[10px] text-gray-400 font-medium">{currentInd.preview.stat1Label}</div>
                      </div>

                      <div className="bg-white/5 border border-white/10 p-3 rounded-2xl backdrop-blur-md">
                        <div className="text-sm font-black text-white">{currentInd.preview.stat2}</div>
                        <div className="text-[10px] text-gray-400 font-medium">{currentInd.preview.stat2Label}</div>
                      </div>

                      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-white/15 p-3 rounded-2xl backdrop-blur-md flex items-center justify-between">
                        <div>
                          <div className="text-[9px] font-bold text-blue-400 uppercase tracking-wider">{currentInd.preview.cardTag}</div>
                          <div className="text-xs font-bold text-white">{currentInd.preview.cardTitle}</div>
                        </div>
                        <div className="text-xs font-black text-white bg-white/10 px-2 py-0.5 rounded-lg">
                          {currentInd.preview.cardPrice}
                        </div>
                      </div>

                    </div>

                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </motion.div>
        </div>

        {/* TRUST METRICS COUNTERS */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/80 shadow-2xs text-center">
            <div className="text-2xl md:text-3xl font-black text-[#0A0A0A] font-sans tracking-tight mb-0.5">
              <MetricCounter value={50} suffix="+" />
            </div>
            <div className="text-xs font-semibold text-gray-500">Websites Delivered</div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/80 shadow-2xs text-center">
            <div className="text-2xl md:text-3xl font-black text-[#2563EB] font-sans tracking-tight mb-0.5">
              <MetricCounter value={99} suffix="%" />
            </div>
            <div className="text-xs font-semibold text-gray-500">Client Satisfaction</div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/80 shadow-2xs text-center">
            <div className="text-2xl md:text-3xl font-black text-[#0A0A0A] font-sans tracking-tight mb-0.5">
              <MetricCounter value={95} suffix="+" />
            </div>
            <div className="text-xs font-semibold text-gray-500">Speed Score</div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/80 shadow-2xs text-center">
            <div className="text-2xl md:text-3xl font-black text-[#2563EB] font-sans tracking-tight mb-0.5">
              24/7
            </div>
            <div className="text-xs font-semibold text-gray-500">Ongoing Support</div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}