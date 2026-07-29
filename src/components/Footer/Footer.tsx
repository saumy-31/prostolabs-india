import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { 
  Mail, 
  MessageSquare, 
  MapPin 
} from 'lucide-react'

// --- INLINE BRAND SVG COMPONENTS ---
function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

// --- ANIMATION VARIANTS ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 90, damping: 18 } 
  }
}

export function Footer() {
  const footerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(footerRef, { once: true, margin: "-50px" })

  // --- CROSS-PAGE SECTION NAVIGATION HANDLER ---
  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()

    if (window.location.pathname === '/') {
      // 1. On Home page -> Direct smooth scroll
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        window.history.pushState(null, '', `/#${sectionId}`)
      }
    } else {
      // 2. On other page -> Push Home route with hash & dispatch state update
      window.history.pushState(null, '', `/#${sectionId}`)
      window.dispatchEvent(new PopStateEvent('popstate'))
    }
  }

  const solutionsLinks = [
    { label: "Website Plans", target: "pricing" },
    { label: "Everything Included", target: "features" },
    { label: "Industries", target: "work" },
    { label: "How It Works", target: "how-it-works" }
  ]

  const companyLinks = [
    { label: "About Us", href: "/about", isRoute: true },
    { label: "Why ProstoLabs", target: "why-us" },
    { label: "FAQ", target: "faq" },
    { label: "Contact", href: "/contact", isRoute: true }
  ]

  const socialLinks = [
    { name: "WhatsApp", icon: MessageSquare, href: "https://wa.me/916392577105", color: "hover:bg-green-500 hover:text-white" },
    { name: "Instagram", icon: InstagramIcon, href: "https://www.instagram.com/prostolabs", color: "hover:bg-pink-500 hover:text-white" },
    { name: "Email", icon: Mail, href: "mailto:hello@prostolabs.com", color: "hover:bg-[#2563EB] hover:text-white" }
  ]

  return (
    <footer 
      ref={footerRef} 
      className="bg-white border-t border-gray-200/80 pt-16 md:pt-20 pb-[calc(90px+env(safe-area-inset-bottom,16px))] md:pb-12 relative overflow-hidden text-[#0A0A0A]"
    >
      {/* SUBTLE AMBIENT BACKGROUND GLOW */}
      <motion.div 
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none transform-gpu" 
      />

      <div className="max-w-[1300px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* TOP 4-COLUMN GRID */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12 sm:mb-16"
        >

          {/* COLUMN 1: BRAND & LOGO */}
          <motion.div variants={itemVariants} className="space-y-4 transform-gpu">
            <a href="/" className="inline-flex items-center gap-2 cursor-pointer group">
              <div className="w-9 h-9 rounded-xl bg-[#2563EB] text-white flex items-center justify-center font-extrabold text-lg shadow-md group-hover:shadow-blue-500/25 transition-all">
                P
              </div>
              <span className="font-extrabold text-xl tracking-tight font-sans text-[#0A0A0A]">
                Prosto<span className="text-[#2563EB]">Labs</span>
              </span>
            </a>

            <p className="text-xs md:text-sm text-[#6B7280] leading-relaxed max-w-xs font-medium">
              We build modern, affordable websites that help Indian businesses grow online.
            </p>

            <div className="pt-2 space-y-2 text-xs font-semibold text-gray-700">
              <a 
                href="mailto:hello@prostolabs.com" 
                className="flex items-center gap-2 text-gray-600 hover:text-[#2563EB] transition-colors w-fit"
              >
                <Mail size={15} className="text-[#2563EB]" />
                <span>hello@prostolabs.com</span>
              </a>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin size={15} className="text-[#2563EB]" />
                <span>India</span>
              </div>
            </div>
          </motion.div>

          {/* COLUMN 2: SOLUTIONS */}
          <motion.div variants={itemVariants} className="space-y-4 transform-gpu">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#0A0A0A] font-sans">
              Solutions
            </h4>
            <ul className="space-y-2.5">
              {solutionsLinks.map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={`/#${link.target}`} 
                    onClick={(e) => handleSectionClick(e, link.target)}
                    className="text-xs md:text-sm text-[#6B7280] hover:text-[#2563EB] font-medium transition-colors inline-block relative group py-0.5 cursor-pointer"
                  >
                    <span>{link.label}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#2563EB] transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* COLUMN 3: COMPANY */}
          <motion.div variants={itemVariants} className="space-y-4 transform-gpu">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#0A0A0A] font-sans">
              Company
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link, idx) => (
                <li key={idx}>
                  {link.isRoute ? (
                    <a 
                      href={link.href} 
                      className="text-xs md:text-sm text-[#6B7280] hover:text-[#2563EB] font-medium transition-colors inline-block relative group py-0.5 cursor-pointer"
                    >
                      <span>{link.label}</span>
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#2563EB] transition-all duration-300 group-hover:w-full" />
                    </a>
                  ) : (
                    <a 
                      href={`/#${link.target}`} 
                      onClick={(e) => handleSectionClick(e, link.target!)}
                      className="text-xs md:text-sm text-[#6B7280] hover:text-[#2563EB] font-medium transition-colors inline-block relative group py-0.5 cursor-pointer"
                    >
                      <span>{link.label}</span>
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#2563EB] transition-all duration-300 group-hover:w-full" />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* COLUMN 4: CONNECT */}
          <motion.div variants={itemVariants} className="space-y-4 transform-gpu">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#0A0A0A] font-sans">
              Connect
            </h4>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              Reach out directly on social media or send us a message.
            </p>

            <div className="flex flex-wrap gap-2.5 pt-1">
              {socialLinks.map((social, idx) => {
                const IconComp = social.icon
                return (
                  <motion.a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-2.5 bg-gray-100/80 border border-gray-200/80 text-gray-700 rounded-xl transition-all duration-300 flex items-center justify-center transform-gpu ${social.color}`}
                    aria-label={social.name}
                  >
                    <IconComp size={18} />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

        </motion.div>

        {/* ANIMATED DIVIDER LINE */}
        <div className="relative my-6 sm:my-8">
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent origin-left transform-gpu"
          />
        </div>

        {/* BOTTOM ROW */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B7280] font-medium pt-2 mb-6 sm:mb-8 transform-gpu"
        >
          <div>
            © {new Date().getFullYear()} ProstoLabs. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a href="/privacy-policy" className="hover:text-[#2563EB] transition-colors relative group">
              Privacy Policy
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#2563EB] transition-all duration-200 group-hover:w-full" />
            </a>
            <a href="/terms-and-conditions" className="hover:text-[#2563EB] transition-colors relative group">
              Terms & Conditions
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#2563EB] transition-all duration-200 group-hover:w-full" />
            </a>
          </div>
        </motion.div>

        {/* CENTERED TAGLINE */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="text-center pt-4 border-t border-gray-100 transform-gpu"
        >
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            Helping Indian businesses build a better online presence.
          </span>
        </motion.div>

      </div>
    </footer>
  )
}