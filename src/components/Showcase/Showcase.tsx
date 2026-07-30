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
  Stethoscope,
  UserCheck
} from 'lucide-react'

// --- EASING CURVES ---
const easeSaaS = [0.16, 1, 0.3, 1] as const

// --- ANIMATED LIVE COUNTER ---
function MetricCounter({ value, suffix = "", decimals = 0 }: { value: number; suffix?: string; decimals?: number }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => 
    decimals > 0 ? latest.toFixed(decimals) : Math.round(latest).toString()
  )
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-40px" })

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration: 1.8,
        ease: easeSaaS,
      })
      return controls.stop
    }
  }, [isInView, value, count])

  return (
    <span className="inline-block transform-gpu">
      <motion.span ref={ref}>{rounded}</motion.span>
      {suffix}
    </span>
  )
}

// --- INDUSTRY SHOWCASE DEFINITIONS WITH HIGH-RES REALISTIC PREVIEWS ---
const industries = [
  {
    id: 'restaurant',
    name: 'Restaurant',
    icon: Utensils,
    url: 'gourmet-bistro.in',
    badge: 'Fine Dining & Hospitality',
    preview: {
      tag: '⭐ Michelin Starred Chef',
      headline: 'Artisanal Culinary Excellence in Every Bite',
      description: 'Handcrafted recipes, organic local ingredients, and an unforgettable fine dining ambiance.',
      accent: 'from-amber-500 via-orange-600 to-red-600',
      heroImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80',
      altText: 'Gourmet Bistro - Restaurant website design portfolio example by ProstoLabs India',
      ctaText: 'Reserve Table',
      secondaryCta: 'Explore Menu',
      stat1: '4.9 ⭐',
      stat1Label: '1,200+ Reviews',
      stat2: '15 Mins',
      stat2Label: 'Avg. Table Turn',
      cardTag: 'Chef Special',
      cardTitle: 'Wood-Fired Truffle Pizza',
      cardPrice: '₹649',
      cardMeta: 'Fresh Mozzarella • Black Truffle',
      badgeIcon: Utensils
    }
  },
  {
    id: 'gym',
    name: 'Gym & Fitness',
    icon: Dumbbell,
    url: 'fitpulse-arena.in',
    badge: 'High Performance Fitness',
    preview: {
      tag: '⚡ 0 Initiation Fee This Week',
      headline: 'CRUSH YOUR LIMITS. REBUILD YOURSELF.',
      description: 'State-of-the-art strength gear, elite personal coaching, and high-energy group functional training.',
      accent: 'from-emerald-500 via-teal-500 to-cyan-600',
      heroImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80',
      altText: 'FitPulse Fitness Arena - Gym website design portfolio example by ProstoLabs India',
      ctaText: 'Claim Free Pass',
      secondaryCta: 'View Schedule',
      stat1: '1,250+',
      stat1Label: 'Active Members',
      stat2: '24/7',
      stat2Label: 'Facility Access',
      cardTag: 'Live Burn Tracker',
      cardTitle: 'CrossFit & HIIT Arena',
      cardPrice: '780 kcal',
      cardMeta: 'Avg. Burned per 45 min session',
      badgeIcon: Dumbbell
    }
  },
  {
    id: 'salon',
    name: 'Salon & Spa',
    icon: Scissors,
    url: 'lumiere-salon.in',
    badge: 'Luxury Beauty & Care',
    preview: {
      tag: '✨ 20% Off First Treatment',
      headline: 'Redefine Your Everyday Elegance & Beauty',
      description: 'Pamper yourself with bespoke hair styling, skin rejuvenation, and luxury spa treatments.',
      accent: 'from-pink-500 via-rose-500 to-purple-600',
      heroImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=80',
      altText: 'Lumiere Spa & Salon - Beauty salon website design portfolio example by ProstoLabs India',
      ctaText: 'Book Slot',
      secondaryCta: 'View Spa Menu',
      stat1: '5.0 ⭐',
      stat1Label: '850+ Clients',
      stat2: '100%',
      stat2Label: 'Organic Hair Care',
      cardTag: 'Popular Choice',
      cardTitle: 'Keratin & Glow Facial',
      cardPrice: '₹2,499',
      cardMeta: '90 Mins • Deep Hydration',
      badgeIcon: Scissors
    }
  },
  {
    id: 'clinic',
    name: 'Medical Clinic',
    icon: Stethoscope,
    url: 'careplus-health.in',
    badge: 'Trusted Healthcare',
    preview: {
      tag: '🏥 OPD Slots Available Today',
      headline: 'World-Class Healthcare You Can Depend On',
      description: 'Expert doctors, zero waiting time, and compassionate medical care for your entire family.',
      accent: 'from-blue-600 via-blue-500 to-cyan-500',
      heroImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&auto=format&fit=crop&q=80',
      altText: 'CarePlus Health - Medical clinic website design portfolio example by ProstoLabs India',
      ctaText: 'Book OPD Slot',
      secondaryCta: 'Find Doctor',
      stat1: '15+ Yrs',
      stat1Label: 'Combined Experience',
      stat2: '10k+',
      stat2Label: 'Patients Treated',
      cardTag: 'Chief Specialist',
      cardTitle: 'Dr. Arvind Rao',
      cardPrice: 'Cardiologist',
      cardMeta: 'MD • Available Today (4 slots left)',
      badgeIcon: UserCheck
    }
  },
  {
    id: 'realestate',
    name: 'Real Estate',
    icon: Building2,
    url: 'apex-estates.in',
    badge: 'Luxury Properties',
    preview: {
      tag: '🏡 New Launch in City Center',
      headline: 'Discover Villas & Penthouses Crafted for You',
      description: 'Explore verified luxury properties with 3D virtual walkthroughs and 100% legal clearance.',
      accent: 'from-amber-600 via-yellow-600 to-amber-700',
      heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80',
      altText: 'Apex Estates - Real estate website design portfolio example by ProstoLabs India',
      ctaText: 'Schedule Visit',
      secondaryCta: 'Brochure',
      stat1: '₹50Cr+',
      stat1Label: 'Properties Closed',
      stat2: '0%',
      stat2Label: 'Brokerage Fee',
      cardTag: 'Featured Listing',
      cardTitle: 'Skyline Villa Residency',
      cardPrice: '₹1.85 Cr',
      cardMeta: '4 BHK • Private Pool • 3,400 sq.ft',
      badgeIcon: Building2
    }
  },
  {
    id: 'coaching',
    name: 'Coaching',
    icon: GraduationCap,
    url: 'apex-academy.in',
    badge: 'Education & Admissions',
    preview: {
      tag: '🎓 Batch 2026 Admissions Open',
      headline: 'Empowering Top Ranks in JEE, NEET & Boards',
      description: 'Learn from IIT & AIIMS alumni mentors with small batch sizes and rigorous test series.',
      accent: 'from-indigo-600 via-purple-600 to-blue-700',
      heroImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
      altText: 'Apex Academy - Coaching institute website design portfolio example by ProstoLabs India',
      ctaText: 'Free Demo Class',
      secondaryCta: 'Batch Schedule',
      stat1: '98.4%',
      stat1Label: 'Success Rate',
      stat2: 'AIR 14',
      stat2Label: 'Top JEE Ranker',
      cardTag: 'Scholarship Test',
      cardTitle: 'Talent Hunt Exam',
      cardPrice: 'Up to 100%',
      cardMeta: 'Fee Scholarship • Next Sunday',
      badgeIcon: GraduationCap
    }
  }
]

// --- FLOATING CHIPS CONFIG (DESKTOP) ---
const floatingChips = [
  { icon: Zap, text: '⚡ 95+ Performance', bg: 'bg-[#0F172A] text-emerald-400 border-emerald-500/30', pos: '-top-5 -left-4 md:-left-8' },
  { icon: Smartphone, text: '📱 100% Responsive', bg: 'bg-[#0F172A] text-blue-400 border-blue-500/30', pos: 'top-1/4 -right-4 md:-right-8' },
  { icon: MessageSquare, text: '💬 WhatsApp Chat', bg: 'bg-[#0F172A] text-green-400 border-green-500/30', pos: 'bottom-1/3 -left-4 md:-left-8' },
  { icon: TrendingUp, text: '🔍 SEO Ranked #1', bg: 'bg-[#0F172A] text-orange-400 border-orange-500/30', pos: '-bottom-5 right-4 md:right-8' },
]

export function Showcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isBeforeView, setIsBeforeView] = useState(false)
  
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-40px" })

  const currentInd = industries[activeIndex]

  const handleTabChange = (index: number) => {
    if (index === activeIndex) return
    setActiveIndex(index)
  }

  return (
    <section 
      ref={sectionRef} 
      className="py-12 sm:py-16 md:py-20 bg-[#FAFAFA] relative overflow-hidden" 
      id="work"
      aria-label="Website design portfolio India"
    >
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[550px] bg-[radial-gradient(ellipse_at_center,_rgba(37,99,235,0.06)_0%,_transparent_75%)] pointer-events-none" />

      <div className="max-w-[1350px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center mb-6 sm:mb-10 max-w-2xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 shadow-2xs mb-3 transform-gpu"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
            <span className="text-[11px] font-bold text-[#2563EB] tracking-wider uppercase">Our Work</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: easeSaaS }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A0A0A] mb-3 tracking-tight font-sans leading-[1.15] transform-gpu"
          >
            Websites that help businesses grow.
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="text-sm sm:text-base md:text-lg text-[#6B7280] font-medium leading-relaxed max-w-xl mx-auto transform-gpu"
          >
            From restaurants and salons to gyms and clinics, every website is designed to look modern, load fast, and convert visitors.
          </motion.p>
        </div>

        {/* BEFORE VS AFTER TOGGLE */}
        <motion.div 
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-6 transform-gpu"
        >
          <div className="bg-white border border-gray-200/90 rounded-full p-1 shadow-2xs flex items-center">
            <button
              onClick={() => setIsBeforeView(false)}
              aria-label="Show ProstoLabs redesign showcase"
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-1.5 cursor-pointer transform-gpu ${
                !isBeforeView 
                  ? 'bg-[#2563EB] text-white shadow-xs' 
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>ProstoLabs Redesign</span>
            </button>
            <button
              onClick={() => setIsBeforeView(true)}
              aria-label="Show old dated website example"
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-1.5 cursor-pointer transform-gpu ${
                isBeforeView 
                  ? 'bg-amber-600 text-white shadow-xs' 
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Old Dated Website</span>
            </button>
          </div>
        </motion.div>


        {/* ========================================================================= */}
        {/* 1. MOBILE PHONE-FIRST SWIPEABLE SHOWCASE (≤768px ONLY) */}
        {/* ========================================================================= */}
        <div className="block md:hidden">
          
          {/* SWIPEABLE CATEGORY SELECTOR BADGES */}
          {!isBeforeView && (
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-2 no-scrollbar -mx-6 px-6 transform-gpu">
              {industries.map((ind, idx) => {
                const IconComp = ind.icon
                const isActive = activeIndex === idx
                return (
                  <button
                    key={ind.id}
                    onClick={() => handleTabChange(idx)}
                    aria-label={`Show ${ind.name} portfolio preview`}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border shrink-0 cursor-pointer transform-gpu active:scale-95 ${
                      isActive 
                        ? 'bg-[#0A0A0A] border-[#0A0A0A] text-white shadow-xs' 
                        : 'bg-white border-gray-200 text-gray-600'
                    }`}
                  >
                    <IconComp className={`w-3.5 h-3.5 ${isActive ? 'text-[#2563EB]' : 'text-gray-400'}`} />
                    <span>{ind.name}</span>
                  </button>
                )
              })}
            </div>
          )}

          {/* PHONE MOCKUP STAGE */}
          <div className="relative max-w-[310px] mx-auto transform-gpu">
            <div className="absolute inset-0 bg-[#2563EB]/15 blur-2xl rounded-full scale-90 pointer-events-none" />

            {/* Smartphone Outer Box */}
            <div className="relative bg-[#090D16] rounded-[40px] border-4 border-gray-800 p-2.5 shadow-2xl overflow-hidden min-h-[520px] flex flex-col justify-between transform-gpu">
              
              {/* Phone Speaker Notch */}
              <div className="w-20 h-3 bg-gray-800 rounded-full mx-auto mb-2 shrink-0 z-20" />

              {/* Phone Screen Display */}
              <div className="w-full bg-[#0B0F19] rounded-[30px] flex-1 flex flex-col justify-between border border-white/10 text-white relative overflow-hidden">
                
                <AnimatePresence mode="wait">
                  {isBeforeView ? (
                    <motion.div 
                      key="mobile-before"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.35, ease: easeSaaS }}
                      className="flex-1 flex flex-col justify-between p-4 text-center text-gray-900 bg-[#F5F2EB] rounded-[26px] transform-gpu"
                    >
                      <div className="text-[9px] font-mono text-red-900 uppercase font-bold">⚠️ Outdated 2010 Site</div>
                      <div className="my-auto space-y-2">
                        <div className="text-base font-serif font-black text-[#800000] underline">Not Mobile Friendly</div>
                        <p className="text-[11px] text-gray-600 font-sans leading-tight">Takes 8+ seconds to load. Tiny non-responsive text and broken links.</p>
                      </div>
                      <div className="text-[9px] bg-red-100 text-red-900 p-1.5 font-mono rounded-lg">70% Users Exit Immediately</div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={currentInd.id}
                      initial={{ opacity: 0, scale: 0.98, y: 12 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98, y: -12 }}
                      transition={{ duration: 0.4, ease: easeSaaS }}
                      className="flex-1 flex flex-col justify-between relative transform-gpu"
                    >
                      {/* Background Realistic Image Layer with Gradient Overlay */}
                      <div className="absolute inset-0 z-0">
                        <img 
                          src={currentInd.preview.heroImage} 
                          alt={currentInd.preview.altText}
                          className="w-full h-full object-cover opacity-35 filter brightness-90"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19]/90 via-[#0B0F19]/80 to-[#0B0F19]" />
                      </div>

                      {/* Foreground Content */}
                      <div className="relative z-10 p-3.5 flex-1 flex flex-col justify-between space-y-3">
                        {/* Top Bar */}
                        <div className="flex items-center justify-between border-b border-white/10 pb-2">
                          <div className="flex items-center gap-1.5">
                            <div className={`w-5 h-5 rounded-md bg-gradient-to-r ${currentInd.preview.accent} flex items-center justify-center font-bold text-[10px]`}>
                              ✓
                            </div>
                            <span className="font-bold text-xs tracking-tight">{currentInd.name}</span>
                          </div>
                          <div className="text-[9px] text-gray-300 font-mono border border-white/15 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-xs">
                            {currentInd.url}
                          </div>
                        </div>

                        {/* Main Showcase Hero */}
                        <div className="space-y-2 my-auto pt-2">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-white/10 text-[9px] font-bold rounded-full border border-white/20 backdrop-blur-md">
                            {currentInd.preview.tag}
                          </span>
                          <h3 className="text-lg font-black leading-tight text-white drop-shadow-sm font-sans">
                            {currentInd.preview.headline}
                          </h3>
                          <p className="text-[10px] text-gray-200 leading-relaxed font-medium line-clamp-2">
                            {currentInd.preview.description}
                          </p>
                        </div>

                        {/* Featured Mini Card */}
                        <div className="bg-white/10 border border-white/15 rounded-xl p-2.5 backdrop-blur-md space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-bold text-amber-400 uppercase tracking-wider">{currentInd.preview.cardTag}</span>
                            <span className="text-[10px] font-black text-white">{currentInd.preview.cardPrice}</span>
                          </div>
                          <div className="text-xs font-bold text-white truncate">{currentInd.preview.cardTitle}</div>
                        </div>

                        {/* Phone CTA */}
                        <button 
                          aria-label={`Action for ${currentInd.name}`}
                          className={`w-full py-2.5 rounded-xl font-extrabold text-xs text-white bg-gradient-to-r ${currentInd.preview.accent} shadow-md flex items-center justify-center gap-1 transform-gpu active:scale-95 transition-transform cursor-pointer`}
                        >
                          <span>{currentInd.preview.ctaText}</span>
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>
          </div>

          {/* SWIPEABLE METRICS ROW FOR MOBILE */}
          <div className="mt-8 flex gap-3 overflow-x-auto snap-x snap-mandatory pb-4 no-scrollbar -mx-6 px-6 transform-gpu">
            <div className="snap-center shrink-0 w-[140px] bg-white p-3.5 rounded-2xl border border-gray-200/80 shadow-2xs text-center transform-gpu">
              <div className="text-xl font-black text-[#0A0A0A] font-sans">
                <MetricCounter value={50} suffix="+" />
              </div>
              <div className="text-[10px] font-semibold text-gray-500">Websites Live</div>
            </div>

            <div className="snap-center shrink-0 w-[140px] bg-white p-3.5 rounded-2xl border border-gray-200/80 shadow-2xs text-center transform-gpu">
              <div className="text-xl font-black text-[#2563EB] font-sans">
                <MetricCounter value={99} suffix="%" />
              </div>
              <div className="text-[10px] font-semibold text-gray-500">Satisfaction</div>
            </div>

            <div className="snap-center shrink-0 w-[140px] bg-white p-3.5 rounded-2xl border border-gray-200/80 shadow-2xs text-center transform-gpu">
              <div className="text-xl font-black text-[#0A0A0A] font-sans">
                <MetricCounter value={95} suffix="+" />
              </div>
              <div className="text-[10px] font-semibold text-gray-500">Speed Score</div>
            </div>

            <div className="snap-center shrink-0 w-[140px] bg-white p-3.5 rounded-2xl border border-gray-200/80 shadow-2xs text-center transform-gpu">
              <div className="text-xl font-black text-[#2563EB] font-sans">24/7</div>
              <div className="text-[10px] font-semibold text-gray-500">Tech Support</div>
            </div>
          </div>

        </div>


        {/* ========================================================================= */}
        {/* 2. UNTOUCHED DESKTOP SHOWCASE (≥768px ONLY) */}
        {/* ========================================================================= */}
        <div className="hidden md:block">
          
          {/* CATEGORY SELECTOR TABS */}
          {!isBeforeView && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="flex items-center justify-center gap-2 mb-6 transform-gpu"
            >
              {industries.map((ind, idx) => {
                const IconComp = ind.icon
                const isActive = activeIndex === idx
                return (
                  <button
                    key={ind.id}
                    onClick={() => handleTabChange(idx)}
                    aria-label={`View ${ind.name} portfolio showcase`}
                    className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all duration-300 flex items-center gap-2 border cursor-pointer transform-gpu ${
                      isActive 
                        ? 'bg-[#0A0A0A] border-[#0A0A0A] text-white shadow-xs scale-[1.02]' 
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <IconComp className={`w-3.5 h-3.5 ${isActive ? 'text-[#2563EB]' : 'text-gray-500'}`} />
                    <span>{ind.name}</span>
                  </button>
                )
              })}
            </motion.div>
          )}

          {/* DESKTOP BROWSER SHOWCASE DISPLAY STAGE */}
          <div className="relative max-w-5xl mx-auto perspective-[1200px]">
            
            {!isBeforeView && floatingChips.map((chip, i) => {
              const ChipIcon = chip.icon
              return (
                <motion.div
                  key={chip.text}
                  animate={{ y: [0, -6, 0], rotate: [0, i % 2 === 0 ? 1 : -1, 0] }}
                  transition={{ repeat: Infinity, duration: 4.5 + i, ease: "easeInOut", delay: i * 0.4 }}
                  className={`hidden lg:flex absolute z-30 items-center gap-2 px-3.5 py-2 rounded-2xl border shadow-lg backdrop-blur-md text-xs font-bold transform-gpu ${chip.bg} ${chip.pos}`}
                >
                  <ChipIcon className="w-3.5 h-3.5 shrink-0" />
                  <span>{chip.text}</span>
                </motion.div>
              )
            })}

            <motion.div 
              initial={{ opacity: 0, scale: 0.97, y: 20 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 85 }}
              className="bg-[#090D16] rounded-[28px] border border-gray-800 shadow-[0_25px_80px_-15px_rgba(0,0,0,0.3)] overflow-hidden relative transform-gpu"
            >
              <div className="absolute top-0 right-0 w-[450px] h-[250px] bg-blue-600/10 blur-[80px] pointer-events-none transform-gpu" />

              {/* Top Browser Bar */}
              <div className="bg-[#0F172A]/90 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-gray-800/80 text-gray-400 relative z-20">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/90 shadow-2xs" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/90 shadow-2xs" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/90 shadow-2xs" />
                </div>

                <div className="flex items-center justify-center gap-1.5 bg-[#1E293B]/80 text-gray-200 px-4 py-1 rounded-xl text-[11px] font-mono w-full max-w-md mx-2 border border-white/10 shadow-inner">
                  {isBeforeView ? (
                    <span className="text-amber-400 flex items-center gap-1 font-bold truncate">
                      ⚠️ outdated-site-2010.com
                    </span>
                  ) : (
                    <>
                      <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span className="text-emerald-400 font-semibold">https://</span>
                      <span className="truncate">{currentInd.url}</span>
                    </>
                  )}
                </div>

                <div className="w-5 h-5 rounded bg-white/5 border border-white/10 flex items-center justify-center">
                  <ExternalLink className="w-3 h-3 text-gray-400" />
                </div>
              </div>

              {/* Viewport Display Stage */}
              <div className="min-h-[480px] relative overflow-hidden flex flex-col justify-between bg-[#0B0F19]">
                <AnimatePresence mode="wait">
                  {isBeforeView ? (
                    <motion.div 
                      key="before-view"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-10 bg-[#F5F2EB] text-gray-900 font-serif min-h-[480px] flex flex-col justify-between transform-gpu"
                    >
                      <div className="border-b border-red-900/40 pb-2 flex justify-between items-center">
                        <div className="text-base font-bold text-red-900 uppercase font-mono tracking-wider">
                          *** WELCOME TO OUR HOMEPAGE ***
                        </div>
                        <div className="text-xs text-red-800 bg-red-100 px-2 py-0.5 border border-red-300 font-mono">
                          Flash Player Needed
                        </div>
                      </div>

                      <div className="my-6 text-center space-y-2 max-w-xl mx-auto">
                        <div className="text-2xl font-black text-[#800000] underline font-serif">
                          Old Non-Responsive Legacy Website
                        </div>
                        <p className="text-sm font-sans text-gray-700 leading-relaxed">
                          Hard to read on mobile devices. Takes 8+ seconds to load. Missing WhatsApp integration, Google Maps listing, and SSL security.
                        </p>
                      </div>

                      <div className="bg-amber-100 p-3 border border-amber-300 rounded-xl text-xs text-center font-mono text-amber-900">
                        70%+ of potential customers leave within 3 seconds of seeing an outdated website.
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key={currentInd.id}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.35, ease: easeSaaS }}
                      className="flex-1 flex flex-col justify-between relative text-white transform-gpu overflow-hidden min-h-[480px]"
                    >
                      {/* Rich Background Image with Soft Gradient Overlay */}
                      <div className="absolute inset-0 z-0">
                        <img 
                          src={currentInd.preview.heroImage} 
                          alt={currentInd.preview.altText} 
                          className="w-full h-full object-cover opacity-30 filter contrast-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19] via-[#0B0F19]/90 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-[#0B0F19]/80" />
                      </div>

                      {/* Top Navigation Bar */}
                      <div className="flex items-center justify-between p-6 pb-4 border-b border-white/10 relative z-10 backdrop-blur-xs">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-xl bg-gradient-to-r ${currentInd.preview.accent} flex items-center justify-center font-bold text-white text-xs shadow-sm`}>
                            ✓
                          </div>
                          <div>
                            <span className="font-extrabold text-white text-sm font-sans tracking-tight block">{currentInd.name}</span>
                            <span className="text-[10px] text-gray-400 font-mono block">{currentInd.badge}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-6 text-xs font-semibold text-gray-300">
                          <span className="hover:text-white cursor-pointer transition-colors">Services</span>
                          <span className="hover:text-white cursor-pointer transition-colors">About</span>
                          <span className="hover:text-white cursor-pointer transition-colors">Reviews</span>
                          <span className="hover:text-white cursor-pointer transition-colors">Contact</span>
                        </div>

                        <button 
                          aria-label={`Action for ${currentInd.name}`}
                          className={`px-4 py-2 rounded-xl text-white font-bold text-xs bg-gradient-to-r ${currentInd.preview.accent} shadow-md transform-gpu hover:opacity-95 active:scale-95 transition-all cursor-pointer`}
                        >
                          {currentInd.preview.ctaText}
                        </button>
                      </div>

                      {/* Main Hero Showcase */}
                      <div className="px-8 py-6 relative z-10 max-w-2xl">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-bold text-white mb-4 shadow-sm">
                          <span>{currentInd.preview.tag}</span>
                        </div>

                        <h3 className="text-3xl lg:text-4xl font-black tracking-tight font-sans leading-[1.12] mb-3 text-white drop-shadow-sm">
                          {currentInd.preview.headline}
                        </h3>

                        <p className="text-sm text-gray-300 leading-relaxed mb-6 max-w-xl font-medium">
                          {currentInd.preview.description}
                        </p>

                        <div className="flex items-center gap-3">
                          <button 
                            aria-label={`Primary action: ${currentInd.preview.ctaText}`}
                            className={`px-6 py-3 rounded-xl text-white font-extrabold text-xs bg-gradient-to-r ${currentInd.preview.accent} flex items-center gap-1.5 shadow-lg cursor-pointer transform-gpu hover:opacity-95 active:scale-95 transition-all`}
                          >
                            <span>{currentInd.preview.ctaText}</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>

                          <button 
                            aria-label={`Secondary action: ${currentInd.preview.secondaryCta}`}
                            className="px-5 py-3 rounded-xl bg-white/10 text-white border border-white/20 font-bold text-xs hover:bg-white/20 transition-all backdrop-blur-md cursor-pointer transform-gpu active:scale-95"
                          >
                            {currentInd.preview.secondaryCta}
                          </button>
                        </div>
                      </div>

                      {/* Bottom Real-time Feature Metrics Strip */}
                      <div className="grid grid-cols-3 gap-4 px-8 py-4 border-t border-white/10 relative z-10 items-center backdrop-blur-md bg-black/20">
                        <div className="bg-white/5 border border-white/10 p-3 rounded-2xl backdrop-blur-md transform-gpu">
                          <div className="text-base font-black text-white">{currentInd.preview.stat1}</div>
                          <div className="text-[11px] text-gray-400 font-medium truncate">{currentInd.preview.stat1Label}</div>
                        </div>

                        <div className="bg-white/5 border border-white/10 p-3 rounded-2xl backdrop-blur-md transform-gpu">
                          <div className="text-base font-black text-white">{currentInd.preview.stat2}</div>
                          <div className="text-[11px] text-gray-400 font-medium truncate">{currentInd.preview.stat2Label}</div>
                        </div>

                        <div className="bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-white/20 p-3 rounded-2xl backdrop-blur-md flex items-center justify-between transform-gpu">
                          <div>
                            <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">{currentInd.preview.cardTag}</div>
                            <div className="text-xs font-bold text-white truncate">{currentInd.preview.cardTitle}</div>
                          </div>
                          <div className="text-xs font-black text-white bg-white/15 px-2 py-1 rounded-lg shrink-0 border border-white/20">
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

          {/* METRIC COUNTERS */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 grid grid-cols-4 gap-4 max-w-4xl mx-auto transform-gpu"
          >
            <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-2xs text-center transform-gpu">
              <div className="text-3xl font-black text-[#0A0A0A] font-sans tracking-tight mb-0.5">
                <MetricCounter value={50} suffix="+" />
              </div>
              <div className="text-xs font-semibold text-gray-500">Websites Delivered</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-2xs text-center transform-gpu">
              <div className="text-3xl font-black text-[#2563EB] font-sans tracking-tight mb-0.5">
                <MetricCounter value={99} suffix="%" />
              </div>
              <div className="text-xs font-semibold text-gray-500">Client Satisfaction</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-2xs text-center transform-gpu">
              <div className="text-3xl font-black text-[#0A0A0A] font-sans tracking-tight mb-0.5">
                <MetricCounter value={95} suffix="+" />
              </div>
              <div className="text-xs font-semibold text-gray-500">Speed Score</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-2xs text-center transform-gpu">
              <div className="text-3xl font-black text-[#2563EB] font-sans tracking-tight mb-0.5">
                24/7
              </div>
              <div className="text-xs font-semibold text-gray-500">Ongoing Support</div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  )
}