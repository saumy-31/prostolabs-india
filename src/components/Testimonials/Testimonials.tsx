import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
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

// --- ANIMATED NUMBER COUNTER ---

// --- TESTIMONIAL DATA ---
const testimonials = [
  {
    id: 'restaurant',
    name: 'Rohan Sharma',
    role: 'Founder & Owner',
    business: 'Spice Route Bistro',
    industry: 'Restaurant & Dining',
    location: 'Bengaluru, KA',
    avatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=150&auto=format&fit=crop&q=80',
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
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
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
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
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
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
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
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
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
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
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
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const current = testimonials[activeIndex]

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-[#FAFAFA] relative overflow-hidden" id="testimonials">
      
      {/* Subtle Radial Blue Gradient Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[650px] bg-[radial-gradient(ellipse_at_center,_rgba(37,99,235,0.06)_0%,_transparent_75%)] pointer-events-none" />

      <div className="max-w-[1300px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 shadow-2xs mb-6"
          >
            <Heart className="w-3.5 h-3.5 text-[#2563EB] fill-[#2563EB]" />
            <span className="text-[11px] font-bold text-[#2563EB] tracking-wider uppercase">Loved by Businesses</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0A0A0A] mb-4 tracking-tight font-sans leading-[1.18]"
          >
            Businesses trust ProstoLabs to build their online presence.
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-[#6B7280] leading-relaxed"
          >
            From restaurants and gyms to clinics and real estate businesses, we're helping local businesses launch modern websites that look great and perform even better.
          </motion.p>
        </div>

        {/* GOOGLE REVIEW STYLE SUMMARY BADGE */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex justify-center mb-6"
        >
          <div className="bg-white border border-gray-200/90 rounded-2xl px-5 py-3 shadow-sm flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <Star size={18} className="fill-amber-400" />
                </motion.div>
              ))}
            </div>
            <span className="font-extrabold text-sm text-[#0A0A0A]">4.9 / 5.0 Average Rating</span>
            <span className="hidden sm:inline text-gray-300">•</span>
            <span className="text-xs text-gray-500 font-medium">Verified Local Business Reviews across India</span>
          </div>
        </motion.div>

        {/* INTERACTIVE SHOWCASE STAGE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          
          {/* LEFT SIDE: FEATURED TESTIMONIAL CARD (7 COLS) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="bg-white border-2 border-[#2563EB]/80 rounded-[32px] p-8 md:p-10 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[440px]"
              >
                {/* Background Accent Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                <div>
                  {/* Top Bar: Industry & Rating */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#2563EB] border border-blue-100 text-xs font-bold uppercase tracking-wider">
                      <current.icon size={15} />
                      <span>{current.industry}</span>
                    </div>

                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(current.rating)].map((_, i) => (
                        <Star key={i} size={16} className="fill-amber-400" />
                      ))}
                    </div>
                  </div>

                  {/* Quote Body */}
                  <div className="relative mb-8">
                    <Quote className="text-blue-100 w-12 h-12 absolute -top-4 -left-2 -z-10" />
                    <p className="text-lg md:text-2xl font-bold text-[#0A0A0A] leading-snug font-sans tracking-tight">
                      "{current.quote}"
                    </p>
                  </div>
                </div>

                {/* Footer: Client Info & Selected Package */}
                <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  
                  <div className="flex items-center gap-3.5">
                    <img 
                      src={current.avatar} 
                      alt={current.name} 
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm shrink-0" 
                    />
                    <div>
                      <h4 className="font-bold text-sm text-[#0A0A0A] font-sans flex items-center gap-1.5">
                        {current.name}
                        <CheckCircle2 size={14} className="text-[#2563EB]" />
                      </h4>
                      <p className="text-xs text-gray-500 font-medium">{current.role}, {current.business}</p>
                      <p className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                        <MapPin size={11} /> {current.location}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200/80 rounded-xl px-3.5 py-2 text-left sm:text-right w-full sm:w-auto">
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Verified Plan</div>
                    <div className="text-xs font-bold text-[#2563EB]">{current.packageSelected}</div>
                  </div>

                </div>

              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT SIDE: VERTICAL STACK SELECTOR (5 COLS) */}
          <div className="lg:col-span-5 space-y-3 overflow-x-auto lg:overflow-visible flex lg:flex-col gap-3 lg:gap-0 pb-4 lg:pb-0 scrollbar-none">
            {testimonials.map((item, idx) => {
              const isActive = activeIndex === idx
              const IconComp = item.icon

              return (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveIndex(idx)}
                  whileHover={{ x: 4 }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-4 shrink-0 min-w-[280px] lg:min-w-0 ${
                    isActive 
                      ? 'bg-white border-[#2563EB] shadow-md ring-2 ring-blue-100' 
                      : 'bg-white/80 border-gray-200/80 hover:bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl shrink-0 ${isActive ? 'bg-[#2563EB] text-white' : 'bg-gray-100 text-gray-600'}`}>
                      <IconComp size={18} />
                    </div>
                    <div className="truncate">
                      <div className={`text-xs font-bold truncate ${isActive ? 'text-[#0A0A0A]' : 'text-gray-700'}`}>
                        {item.business}
                      </div>
                      <div className="text-[11px] text-gray-500 font-medium truncate">
                        {item.name} • {item.industry}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0 text-amber-400">
                    <Star size={13} className="fill-amber-400" />
                    <span className="text-xs font-bold text-gray-800">{item.rating}.0</span>
                  </div>
                </motion.button>
              )
            })}
          </div>

        </div>

        

        {/* LOCAL BUSINESS CLIENT LOGO ROW */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="pt-10 border-t border-gray-200/80"
        >
          <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">
            Trusted across Indian local business industries
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {businessLogos.map((logo, idx) => {
              const LogoIcon = logo.icon
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -3, borderColor: "rgba(37,99,235,0.3)" }}
                  className="bg-white border border-gray-200/80 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 shadow-2xs transition-all duration-200"
                >
                  <LogoIcon className="w-5 h-5 text-[#2563EB]" />
                  <span className="text-xs font-bold text-[#0A0A0A] font-sans text-center">{logo.name}</span>
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