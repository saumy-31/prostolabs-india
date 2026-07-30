import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion'
import { 
  Star, 
  Quote, 
  Utensils, 
  Dumbbell, 
  Scissors, 
  Stethoscope, 
  Building2, 
  GraduationCap, 
  CheckCircle2, 
  Heart, 
  MapPin,
} from 'lucide-react'

// --- SAAS EASING CURVES ---
const easeSaaS = [0.16, 1, 0.3, 1] as const

// --- TESTIMONIAL DATA WITH REALISTIC INDIAN BUSINESS OWNER PORTRAITS ---
const testimonials = [
  {
    id: 'restaurant',
    name: 'Rohan Sharma',
    role: 'Founder & Owner',
    business: 'Spice Route Bistro',
    industry: 'Restaurant & Dining',
    location: 'Bengaluru, KA',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80&crop=faces',
    altText: 'Rohan Sharma, Founder of Spice Route Bistro - ProstoLabs website review',
    rating: 5,
    quote: "Our new website has completely changed how customers discover us online. Table reservations and direct WhatsApp orders doubled in our very first month.",
    projectType: 'Fine Dining Portal & Menu',
    packageSelected: '₹499/mo Care Plan',
    icon: Utensils,
    accentColor: '#D97706',
    bgColor: 'bg-amber-500/10'
  },
  {
    id: 'gym',
    name: 'Priya Patel',
    role: 'Managing Director',
    business: 'FitPulse Fitness Arena',
    industry: 'Gym & Fitness',
    location: 'Mumbai, MH',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80&crop=faces',
    altText: 'Priya Patel, Managing Director of FitPulse Fitness Arena - ProstoLabs website review',
    rating: 5,
    quote: "The process was incredibly simple, and the website looks amazing on mobile. Members love checking class schedules and booking trial passes directly online.",
    projectType: 'High-Energy Fitness Site',
    packageSelected: '₹4,999 One-Time',
    icon: Dumbbell,
    accentColor: '#10B981',
    bgColor: 'bg-emerald-500/10'
  },
  {
    id: 'salon',
    name: 'Ananya Verma',
    role: 'Lead Stylist & Owner',
    business: 'Lumière Spa & Salon',
    industry: 'Beauty & Wellness',
    location: 'Delhi, NCR',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&auto=format&fit=crop&q=80&crop=faces',
    altText: 'Ananya Verma, Lead Stylist of Lumière Spa & Salon - ProstoLabs website review',
    rating: 5,
    quote: "Customers can now contact us instantly through WhatsApp. Appointment management has never been easier, and our brand finally looks luxury.",
    projectType: 'Luxury Booking Showcase',
    packageSelected: '₹499/mo Care Plan',
    icon: Scissors,
    accentColor: '#F43F5E',
    bgColor: 'bg-pink-500/10'
  },
  {
    id: 'clinic',
    name: 'Dr. Arvind Rao',
    role: 'Chief Medical Specialist',
    business: 'CarePlus Multi-Specialty Clinic',
    industry: 'Healthcare & Clinic',
    location: 'Hyderabad, TS',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&auto=format&fit=crop&q=80&crop=faces',
    altText: 'Dr. Arvind Rao, Chief Medical Specialist at CarePlus Multi-Specialty Clinic - ProstoLabs website review',
    rating: 5,
    quote: "Professional, fast, and exactly what our medical practice needed. Patients regularly compliment how clean and easy it is to find doctor slots.",
    projectType: 'Medical Clinic & OPD Portal',
    packageSelected: '₹4,999 One-Time',
    icon: Stethoscope,
    accentColor: '#2563EB',
    bgColor: 'bg-blue-500/10'
  },
  {
    id: 'realestate',
    name: 'Vikram Malhotra',
    role: 'Principal Realtor',
    business: 'Apex Realty Group',
    industry: 'Real Estate',
    location: 'Pune, MH',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80&crop=faces',
    altText: 'Vikram Malhotra, Principal Realtor at Apex Realty Group - ProstoLabs website review',
    rating: 5,
    quote: "Our luxury property listings finally look premium online. We closed two major villa deals directly from inquiries that came through our ProstoLabs site.",
    projectType: 'Property Showcase Site',
    packageSelected: '₹499/mo Care Plan',
    icon: Building2,
    accentColor: '#D4AF37',
    bgColor: 'bg-amber-500/10'
  },
  {
    id: 'coaching',
    name: 'Suresh Kumar',
    role: 'Academic Director',
    business: 'Mindspace Academy',
    industry: 'Coaching & Education',
    location: 'Jaipur, RJ',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80&crop=faces',
    altText: 'Suresh Kumar, Academic Director at Mindspace Academy - ProstoLabs website review',
    rating: 5,
    quote: "Batch admissions grew noticeably after launching our website. Parents appreciate seeing transparent course schedules and faculty achievements.",
    projectType: 'Academy Enrollment Site',
    packageSelected: '₹4,999 One-Time',
    icon: GraduationCap,
    accentColor: '#4F46E5',
    bgColor: 'bg-indigo-500/10'
  }
]

// --- LOCAL BUSINESS CATEGORY LOGO PLACEHOLDERS ---
const businessLogos = [
  { name: 'Gourmet Bistro', category: 'Restaurant', icon: Utensils },
  { name: 'FitPulse Arena', category: 'Fitness', icon: Dumbbell },
  { name: 'Lumière Spa', category: 'Salon', icon: Scissors },
  { name: 'CarePlus Health', category: 'Clinic', icon: Stethoscope },
  { name: 'Apex Homes', category: 'Real Estate', icon: Building2 },
  { name: 'Mindspace Academy', category: 'Coaching', icon: GraduationCap }
]

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const isInView = useInView(sectionRef, { once: true, margin: "-40px" })

  const current = testimonials[activeIndex]

  return (
    <section 
      ref={sectionRef} 
      className="py-12 sm:py-20 md:py-28 bg-[#FAFAFA] relative overflow-hidden" 
      id="testimonials"
      aria-label="Website development reviews India"
    >
      
      {/* Background Radial Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[650px] bg-[radial-gradient(ellipse_at_center,_rgba(37,99,235,0.06)_0%,_transparent_75%)] pointer-events-none transform-gpu" />

      <div className="max-w-[1300px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 shadow-2xs mb-4 transform-gpu"
          >
            <Heart className="w-3.5 h-3.5 text-[#2563EB] fill-[#2563EB]" />
            <span className="text-[11px] font-bold text-[#2563EB] tracking-wider uppercase">Loved by Businesses</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: easeSaaS }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A0A0A] mb-3 tracking-tight font-sans leading-[1.18] transform-gpu"
          >
            Businesses trust ProstoLabs to build their online presence.
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="text-sm sm:text-base md:text-lg text-[#6B7280] leading-relaxed max-w-xl mx-auto transform-gpu"
          >
            From restaurants and gyms to clinics and real estate businesses, we help local brands launch modern websites that perform.
          </motion.p>
        </div>

        {/* GOOGLE REVIEW STYLE RATING BADGE */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="flex justify-center mb-8 transform-gpu"
        >
          <div className="bg-white border border-gray-200/90 rounded-2xl px-5 py-2.5 shadow-2xs flex items-center justify-center gap-3 transform-gpu">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} className="fill-amber-400" />
              ))}
            </div>
            <span className="font-extrabold text-xs text-[#0A0A0A]">4.9 / 5.0 Average Rating</span>
            <span className="text-gray-300">•</span>
            <span className="text-xs text-gray-500 font-medium">Verified Local Reviews</span>
          </div>
        </motion.div>


        {/* ========================================================================= */}
        {/* 1. MOBILE-ONLY HORIZONTAL SWIPEABLE CAROUSEL (≤1023px) */}
        {/* ========================================================================= */}
        <div className="block lg:hidden mb-12">
          
          {/* Swipe Indicator Header */}
          <div className="flex items-center justify-center gap-2 mb-4 text-xs font-bold text-gray-400 uppercase tracking-widest transform-gpu">
            <span>← Swipe stories →</span>
          </div>

          {/* Swipeable Snap Scroll Track */}
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 no-scrollbar -mx-6 px-6 transform-gpu">
            {testimonials.map((item) => {
              const IconComp = item.icon
              return (
                <div 
                  key={item.id}
                  className="snap-center shrink-0 w-[90%] max-w-[340px] bg-white border-2 border-[#2563EB]/80 rounded-[28px] p-6 shadow-lg relative flex flex-col justify-between transform-gpu"
                >
                  {/* Background Soft Glow */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl pointer-events-none transform-gpu" />

                  <div className="space-y-4">
                    {/* Responsive Mobile Header: Vertically Centered Badge + Fixed Right Rating */}
                    <div className="flex items-center justify-between gap-3 sm:gap-4">
                      {/* Flexible Category Badge */}
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-[#2563EB] border border-blue-100 text-[11px] font-bold uppercase tracking-wider max-w-[65%] sm:max-w-[70%] leading-tight">
                        <IconComp size={13} className="shrink-0" />
                        <span className="truncate">{item.industry}</span>
                      </div>

                      {/* Fixed Right-Aligned Rating */}
                      <div className="flex items-center gap-0.5 text-amber-400 shrink-0 ml-auto">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} size={14} className="fill-amber-400" />
                        ))}
                      </div>
                    </div>

                    {/* Large Quote */}
                    <div className="relative pt-2">
                      <Quote className="text-blue-100/90 w-8 h-8 absolute -top-2 -left-2 -z-10" />
                      <p className="text-base font-bold text-[#0A0A0A] font-sans leading-relaxed">
                        "{item.quote}"
                      </p>
                    </div>
                  </div>

                  {/* Customer Avatar & Bio Responsive Mobile Footer */}
                  <div className="pt-5 mt-6 border-t border-gray-100 flex flex-col min-[380px]:flex-row items-start min-[380px]:items-center justify-between gap-3 min-[380px]:gap-2">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <img 
                        src={item.avatar} 
                        alt={item.altText} 
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs shrink-0 transform-gpu" 
                        loading="lazy"
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="font-extrabold text-sm text-[#0A0A0A] font-sans flex items-center gap-1 truncate">
                          <span className="truncate">{item.name}</span>
                          <CheckCircle2 size={14} className="text-[#2563EB] shrink-0" />
                        </h3>
                        <p className="text-xs text-gray-500 font-medium truncate">{item.business}</p>
                        <p className="text-[10px] text-gray-400 flex items-center gap-0.5 mt-0.5 truncate">
                          <MapPin size={10} className="shrink-0" /> <span className="truncate">{item.location}</span>
                        </p>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-100 rounded-xl px-2.5 py-1.5 text-left min-[380px]:text-right shrink-0 self-start min-[380px]:self-auto">
                      <div className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Plan</div>
                      <div className="text-[11px] font-bold text-[#2563EB] whitespace-nowrap">{item.packageSelected}</div>
                    </div>
                  </div>

                </div>
              )
            })}
          </div>

        </div>


        {/* ========================================================================= */}
        {/* 2. UNTOUCHED DESKTOP SHOWCASE (≥1024px) */}
        {/* ========================================================================= */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-start mb-20">
          
          {/* LEFT SIDE: FEATURED TESTIMONIAL CARD */}
          <div className="col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.35, ease: easeSaaS }}
                className="bg-white border-2 border-[#2563EB]/80 rounded-[32px] p-10 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[440px] transform-gpu"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none transform-gpu" />

                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#2563EB] border border-blue-100 text-xs font-bold uppercase tracking-wider">
                      <current.icon size={15} />
                      <span>{current.industry}</span>
                    </div>

                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(current.rating)].map((_, i) => (
                        <Star key={i} size={16} className="fill-amber-400" />
                      ))}
                    </div>
                  </div>

                  <div className="relative mb-8">
                    <Quote className="text-blue-100/80 w-12 h-12 absolute -top-4 -left-2 -z-10" />
                    <p className="text-2xl font-bold text-[#0A0A0A] leading-snug font-sans tracking-tight">
                      "{current.quote}"
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <img 
                      src={current.avatar} 
                      alt={current.altText} 
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-2xs shrink-0 transform-gpu" 
                      loading="lazy"
                    />
                    <div>
                      <h3 className="font-bold text-sm text-[#0A0A0A] font-sans flex items-center gap-1">
                        {current.name}
                        <CheckCircle2 size={14} className="text-[#2563EB]" />
                      </h3>
                      <p className="text-xs text-gray-500 font-medium">{current.role}, {current.business}</p>
                      <p className="text-[11px] text-gray-400 flex items-center gap-0.5 mt-0.5">
                        <MapPin size={10} /> {current.location}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200/80 rounded-xl px-3.5 py-2 text-right">
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Plan</div>
                    <div className="text-xs font-bold text-[#2563EB]">{current.packageSelected}</div>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT SIDE: VERTICAL SELECTOR STACK */}
          <div className="col-span-5 space-y-3">
            {testimonials.map((item, idx) => {
              const isActive = activeIndex === idx
              const IconComp = item.icon

              return (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveIndex(idx)}
                  whileHover={shouldReduceMotion ? {} : { x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label={`Read testimonial from ${item.name}, ${item.business}`}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-4 cursor-pointer transform-gpu ${
                    isActive 
                      ? 'bg-white border-[#2563EB] shadow-md ring-2 ring-blue-100' 
                      : 'bg-white/80 border-gray-200/80 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-2.5 rounded-xl shrink-0 transition-colors ${isActive ? 'bg-[#2563EB] text-white' : 'bg-gray-100 text-gray-600'}`}>
                      <IconComp size={18} />
                    </div>
                    <div className="truncate">
                      <div className={`text-xs font-bold truncate ${isActive ? 'text-[#0A0A0A]' : 'text-gray-700'}`}>
                        {item.business}
                      </div>
                      <div className="text-[11px] text-gray-500 font-medium truncate">
                        {item.name}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5 shrink-0 text-amber-400">
                    <Star size={13} className="fill-amber-400" />
                    <span className="text-xs font-bold text-gray-800">{item.rating}.0</span>
                  </div>
                </motion.button>
              )
            })}
          </div>

        </div>

        {/* CLIENT LOGO ROW */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="pt-10 border-t border-gray-200/80 transform-gpu"
        >
          <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">
            Trusted across Indian local business industries
          </p>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 sm:gap-4">
            {businessLogos.map((logo, idx) => {
              const LogoIcon = logo.icon
              return (
                <motion.div
                  key={idx}
                  whileHover={shouldReduceMotion ? {} : { y: -3, borderColor: "rgba(37,99,235,0.3)" }}
                  className="bg-white border border-gray-200/80 rounded-2xl p-4 flex flex-col items-center justify-center gap-1 shadow-2xs transition-all duration-200 transform-gpu"
                >
                  <LogoIcon className="w-5 h-5 text-[#2563EB]" />
                  <span className="text-xs font-bold text-[#0A0A0A] font-sans text-center truncate w-full">{logo.name}</span>
                  <span className="text-[10px] text-gray-400 font-medium">{logo.category}</span>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

      </div>
    </section>
  )
}