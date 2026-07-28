import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView, type Variants } from 'framer-motion'
import { 
  ChevronDown, 
  MessageSquare, 
  Mail, 
  Zap, 
  HelpCircle, 
  ArrowRight
} from 'lucide-react'
import { type PlanType } from '../Modal/EnquiryModal'

interface FAQProps {
  onOpenModal?: (plan?: PlanType) => void
}

// --- ANIMATION VARIANTS ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 95, damping: 18 } 
  }
}

// --- FAQ DATA ---
const faqList = [
  {
    question: "1. Does the ₹499/month Care Plan include a domain?",
    answer: (
      <div className="space-y-2 sm:space-y-3">
        <p>Yes. The ₹499/month Care Plan includes one .in domain for the first year at no additional cost.</p>
        <p>The domain is provided subject to availability and is limited to .in domains with a registration cost of up to ₹499.</p>
        <p>From the second year onward, the domain renewal fee is paid by the customer at the standard renewal price.</p>
      </div>
    )
  },
  {
    question: "2. What if my preferred domain isn't available?",
    answer: (
      <div className="space-y-2 sm:space-y-3">
        <p>If your preferred domain is already registered or costs more than the included allowance, we'll help you choose the closest available alternative.</p>
        <p>If you prefer a premium domain or a different extension such as .com, .co, or .net, the additional registration cost will be charged separately.</p>
      </div>
    )
  },
  {
    question: "3. How many times can I update my website content?",
    answer: (
      <div className="space-y-2 sm:space-y-3">
        <p>The ₹499/month Care Plan includes unlimited content updates.</p>
        <p>This includes updates such as:</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 pt-1 font-semibold text-[#0A0A0A]">
          <li className="flex items-center gap-2">• Images</li>
          <li className="flex items-center gap-2">• Offers & Promotions</li>
          <li className="flex items-center gap-2">• Contact Information</li>
          <li className="flex items-center gap-2">• Business Hours</li>
          <li className="flex items-center gap-2">• Services</li>
          <li className="flex items-center gap-2">• Text Content</li>
          <li className="flex items-center gap-2">• Pricing Changes</li>
          <li className="flex items-center gap-2">• Banners</li>
        </ul>
        <p className="pt-1 sm:pt-2">As long as your business identity remains the same, we'll keep your website content updated.</p>
      </div>
    )
  },
  {
    question: "4. What is not included in unlimited content updates?",
    answer: (
      <div className="space-y-2 sm:space-y-3">
        <p>Unlimited content updates do not include redesigning the website or changing your business identity.</p>
        <p>Examples include:</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 pt-1 font-semibold text-[#0A0A0A]">
          <li>• Complete website redesign</li>
          <li>• Brand name changes</li>
          <li>• Logo redesign</li>
          <li>• New pages</li>
          <li>• Major layout changes</li>
          <li>• Changing to a different business category</li>
        </ul>
        <p className="pt-1 sm:pt-2">These requests are considered development work and are charged separately.</p>
      </div>
    )
  },
  {
    question: "5. Can I add more features later?",
    answer: (
      <div className="space-y-2 sm:space-y-3">
        <p className="font-bold text-[#0A0A0A]">Absolutely.</p>
        <p>Your website can grow with your business.</p>
        <p>Additional features such as:</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 pt-1 font-semibold text-[#0A0A0A]">
          <li>• E-commerce Store</li>
          <li>• Online Payments</li>
          <li>• Booking Systems</li>
          <li>• API Integrations</li>
          <li>• Customer Login</li>
          <li>• CRM Integration</li>
          <li>• AI Chatbots</li>
          <li>• Dashboards</li>
          <li>• Membership Systems</li>
          <li>• Custom Forms</li>
        </ul>
        <p className="pt-1 sm:pt-2">can be added at any time for an additional development fee based on complexity.</p>
      </div>
    )
  },
  {
    question: "6. Can I cancel my ₹499/month Care Plan?",
    answer: (
      <div className="space-y-2 sm:space-y-3">
        <p>Yes. You can cancel your subscription at any time.</p>
        <p>The ₹499/month Care Plan is a managed website subscription. If you cancel your plan, your website, hosting, maintenance, support, and content updates will be discontinued.</p>
        <p>If you would like to continue using your website without a monthly subscription, you can choose our ₹4,999 One-Time Plan for full code ownership.</p>
      </div>
    )
  },
  {
    question: "7. How long does it take to launch my website?",
    answer: (
      <div className="space-y-2 sm:space-y-3">
        <p>Most business websites are delivered within 3–5 business days after we receive all the required content and information.</p>
        <p>Custom projects may take longer depending on their complexity.</p>
      </div>
    )
  },
  {
    question: "8. Is hosting included?",
    answer: (
      <div className="space-y-2 sm:space-y-3">
        <p className="font-bold text-[#0A0A0A]">Yes.</p>
        <p>The ₹499/month Care Plan includes secure hosting, SSL, routine maintenance, backups, and technical support.</p>
        <p>For the ₹4,999 One-Time Plan, hosting is managed by you after delivery.</p>
      </div>
    )
  },
  {
    question: "9. Will my website work on mobile devices?",
    answer: (
      <div className="space-y-2 sm:space-y-3">
        <p className="font-bold text-[#0A0A0A]">Yes.</p>
        <p>Every website we build is fully responsive and optimized for mobile phones, tablets, laptops, and desktop computers.</p>
      </div>
    )
  },
  {
    question: "10. Will my website be SEO-friendly?",
    answer: (
      <div className="space-y-2 sm:space-y-3">
        <p className="font-bold text-[#0A0A0A]">Yes.</p>
        <p>Every website includes a basic SEO setup, including:</p>
        <ul className="space-y-1.5 pt-1 font-semibold text-[#0A0A0A]">
          <li>• Proper page titles</li>
          <li>• Meta descriptions</li>
          <li>• Mobile optimization</li>
          <li>• Fast loading</li>
          <li>• Google-friendly website structure</li>
        </ul>
      </div>
    )
  },
  {
    question: "11. Why is ProstoLabs so affordable?",
    answer: (
      <div className="space-y-2 sm:space-y-3">
        <p>We focus on streamlined processes, reusable components, and long-term customer relationships instead of charging large upfront agency fees.</p>
        <p>This allows us to provide professionally designed business websites at an affordable monthly price while maintaining quality and performance.</p>
      </div>
    )
  }
]

export function FAQ({ onOpenModal }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section ref={sectionRef} className="py-12 sm:py-20 md:py-32 bg-[#FAFAFA] relative overflow-hidden" id="faq">
      
      {/* AMBIENT FLOATING GRADIENT BACKGROUND ORBS */}
      <motion.div 
        animate={{ y: [0, -25, 0], scale: [1, 1.06, 1] }}
        transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
        className="absolute top-1/3 -left-20 w-[550px] h-[550px] bg-blue-500/5 rounded-full blur-[110px] pointer-events-none" 
      />
      <motion.div 
        animate={{ y: [0, 25, 0], scale: [1, 1.08, 1] }}
        transition={{ repeat: Infinity, duration: 11, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/3 -right-20 w-[550px] h-[550px] bg-indigo-500/5 rounded-full blur-[110px] pointer-events-none" 
      />

      <div className="max-w-[1300px] mx-auto px-6 sm:px-6 md:px-12 relative z-10 w-full overflow-x-hidden">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-blue-50 border border-blue-100 shadow-2xs mb-3 sm:mb-6"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#2563EB]" />
            <span className="text-[10px] sm:text-[11px] font-bold text-[#2563EB] tracking-wider uppercase">❓ FAQ</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#0A0A0A] mb-2 sm:mb-4 tracking-tight font-sans leading-[1.18]"
          >
            Questions people ask <br className="hidden sm:block" />
            before getting a website.
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-xs sm:text-base md:text-lg text-[#6B7280] leading-relaxed"
          >
            Everything you need to know before choosing ProstoLabs.
          </motion.p>
        </div>

        {/* MAIN SPLIT LAYOUT (QUESTIONS FIRST ON MOBILE, SUPPORT CARD SECOND) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start w-full">
          
          {/* ACCORDION QUESTIONS (8 COLS ON DESKTOP, FIRST ON MOBILE) */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="lg:col-span-8 order-1 lg:order-2 space-y-4 sm:space-y-3.5 w-full"
          >
            {faqList.map((item, idx) => {
              const isOpen = openIndex === idx

              return (
                <motion.div 
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -2, boxShadow: "0 20px 40px -15px rgba(37,99,235,0.12)" }}
                  className={`border rounded-[20px] sm:rounded-2xl overflow-hidden relative transition-colors duration-300 w-full ${
                    isOpen 
                      ? 'bg-blue-50/30 border-[#2563EB] shadow-md ring-2 ring-blue-100' 
                      : 'bg-white border-gray-200/90 hover:border-blue-400/60 shadow-2xs'
                  }`}
                >
                  {/* Active Blue Bar */}
                  {isOpen && (
                    <motion.div 
                      layoutId="activeBar"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      exit={{ scaleY: 0 }}
                      className="absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 bg-[#2563EB] rounded-l-[20px] sm:rounded-l-2xl z-20"
                    />
                  )}

                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full min-h-[56px] py-4 px-5 sm:p-5 md:p-6 text-left flex items-center justify-between gap-3.5 cursor-pointer relative z-10"
                  >
                    <span className={`text-sm sm:text-base font-sans leading-snug transition-colors duration-200 pr-1 ${
                      isOpen ? 'font-extrabold text-[#2563EB]' : 'font-bold text-[#0A0A0A]'
                    }`}>
                      {item.question}
                    </span>

                    <motion.div 
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className={`p-2 rounded-xl shrink-0 transition-colors ${
                        isOpen ? 'bg-[#2563EB] text-white shadow-xs' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      <ChevronDown size={18} className="sm:w-4 sm:h-4" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="px-5 pb-5 sm:px-6 sm:pb-6 relative z-10">
                          
                          <motion.div 
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="h-px bg-blue-100 origin-left mb-3.5 sm:mb-4"
                          />

                          <motion.div 
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="text-xs sm:text-sm text-[#6B7280] leading-relaxed break-words"
                          >
                            {item.answer}
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </motion.div>

          {/* SUPPORT CARD (4 COLS ON DESKTOP, SECOND ON MOBILE) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 order-2 lg:order-1 lg:sticky lg:top-28 mt-4 lg:mt-0 w-full"
          >
            <motion.div 
              whileHover={{ y: -6, boxShadow: "0 25px 50px -12px rgba(37,99,235,0.18)" }}
              className="bg-white border-2 border-[#2563EB] rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 shadow-lg sm:shadow-xl relative overflow-hidden flex flex-col justify-between group transition-all duration-300 w-full"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-5 sm:mb-6">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-blue-50 text-[#2563EB] border border-blue-100 flex items-center justify-center font-bold text-xl shadow-2xs">
                    💬
                  </div>
                  
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-200">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                    <span className="text-[10px] font-bold text-emerald-700">Online Now</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#0A0A0A] font-sans mb-2">
                  Need more help?
                </h3>

                <p className="text-xs text-[#6B7280] leading-relaxed mb-5 sm:mb-6">
                  Have a specific question about your business or custom requirements? Talk directly to our team.
                </p>

                <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                  <div className="flex items-center gap-3 bg-gray-50/80 border border-gray-200/80 p-3 rounded-xl text-xs font-semibold text-[#0A0A0A]">
                    <div className="p-1.5 bg-green-50 text-green-600 rounded-lg shrink-0">
                      <MessageSquare size={15} />
                    </div>
                    <span>WhatsApp Direct Support</span>
                  </div>

                  <div className="flex items-center gap-3 bg-gray-50/80 border border-gray-200/80 p-3 rounded-xl text-xs font-semibold text-[#0A0A0A]">
                    <div className="p-1.5 bg-blue-50 text-[#2563EB] rounded-lg shrink-0">
                      <Mail size={15} />
                    </div>
                    <span>Email Consultation</span>
                  </div>

                  <div className="flex items-center gap-3 bg-emerald-50/60 border border-emerald-100 p-3 rounded-xl text-xs font-bold text-emerald-900">
                    <div className="p-1.5 bg-emerald-100 text-emerald-600 rounded-lg shrink-0">
                      <Zap size={15} />
                    </div>
                    <span>⚡ Average Response: &lt; 15 Mins</span>
                  </div>
                </div>
              </div>

              <motion.button 
                onClick={() => onOpenModal?.('care')}
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#2563EB] text-white font-bold text-sm h-[52px] sm:h-auto sm:py-3.5 rounded-2xl sm:rounded-xl shadow-md hover:bg-blue-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Talk to ProstoLabs</span>
                <ArrowRight size={15} />
              </motion.button>

            </motion.div>
          </motion.div>

        </div>

      </div>
    </section>
  )
}