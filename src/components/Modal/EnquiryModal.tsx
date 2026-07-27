import { useState, useEffect } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { 
  X, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Globe, 
  MessageSquare, 
  Loader2 
} from 'lucide-react'

// --- CONFIGURATION ---
const WHATSAPP_PHONE_NUMBER = "916392577105"

export type PlanType = 'care' | 'onetime' | 'custom'

interface EnquiryModalProps {
  isOpen: boolean
  onClose: () => void
  initialPlan?: PlanType
}

interface FormData {
  fullName: string
  mobileNumber: string
  email: string
  businessName: string
  businessType: string
  hasDomain: 'Yes' | 'No'
  domainName: string
}

interface FormErrors {
  fullName?: string
  mobileNumber?: string
  email?: string
  businessName?: string
  businessType?: string
  domainName?: string
}

const businessTypes = [
  "Restaurant",
  "Cafe",
  "Gym",
  "Salon",
  "Clinic",
  "Real Estate",
  "Coaching Institute",
  "Retail Store",
  "Construction",
  "Personal Portfolio",
  "Other"
]

// --- PLAN METADATA MAP ---
const PLAN_DETAILS: Record<PlanType, {
  name: string
  price: string
  period: string
  badge: string
  whatsappLabel: string
  features: string[]
}> = {
  care: {
    name: "Care Plan",
    price: "₹499",
    period: "/month",
    badge: "💙 Care Plan – ₹499/month",
    whatsappLabel: "Care Plan – ₹499/month",
    features: [
      "Professional Website",
      "Hosting Included",
      "Maintenance Included",
      "Unlimited Updates",
      "SSL Security",
      "WhatsApp Support"
    ]
  },
  onetime: {
    name: "One-Time Plan",
    price: "₹4,999",
    period: "one-time",
    badge: "💎 One-Time Plan – ₹4,999",
    whatsappLabel: "One-Time Plan – ₹4,999",
    features: [
      "Professional Website",
      "Mobile Responsive",
      "WhatsApp Integration",
      "Google Maps Setup",
      "Basic Technical SEO",
      "Full Website Ownership"
    ]
  },
  custom: {
    name: "Custom Solution",
    price: "Custom Quote",
    period: "",
    badge: "⚡ Custom Solution / Enterprise",
    whatsappLabel: "Custom Solution",
    features: [
      "E-commerce / Store",
      "Booking Systems",
      "CRM & Portals",
      "AI Solutions & Bots",
      "Custom Dashboards",
      "Custom Web Applications"
    ]
  }
}

// --- ANIMATION VARIANTS ---
const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
}

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 15 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 300, damping: 25 } 
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    y: 10, 
    transition: { duration: 0.2, ease: "easeInOut" } 
  }
}

export function EnquiryModal({ isOpen, onClose, initialPlan = 'care' }: EnquiryModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<PlanType>(initialPlan)
  
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    mobileNumber: '',
    email: '',
    businessName: '',
    businessType: '',
    hasDomain: 'No',
    domainName: ''
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showToast, setShowToast] = useState(false)

  // Sync state if initialPlan prop changes when opened
  useEffect(() => {
    if (isOpen) {
      setSelectedPlan(initialPlan)
    }
  }, [isOpen, initialPlan])

  // ESC key listener & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required"
    } else if (!/^[0-9+\s-]{10,15}$/.test(formData.mobileNumber.trim())) {
      newErrors.mobileNumber = "Valid mobile number required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Valid email address required"
    }

    if (!formData.businessName.trim()) {
      newErrors.businessName = "Business name is required"
    }

    if (!formData.businessType) {
      newErrors.businessType = "Please select a type"
    }

    if (formData.hasDomain === 'Yes' && !formData.domainName.trim()) {
      newErrors.domainName = "Domain name is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    const activePlan = PLAN_DETAILS[selectedPlan]

    // Build WhatsApp message
    let message = `🚀 *New Website Inquiry*\n\n`
    message += `👤 *Name:* ${formData.fullName.trim()}\n`
    message += `📱 *Mobile:* ${formData.mobileNumber.trim()}\n`
    message += `📧 *Email:* ${formData.email.trim()}\n`
    message += `🏢 *Business Name:* ${formData.businessName.trim()}\n`
    message += `💼 *Business Type:* ${formData.businessType}\n`
    message += `🌐 *Already Have Domain:* ${formData.hasDomain}\n`

    if (formData.hasDomain === 'Yes') {
      message += `📌 *Domain Name:* ${formData.domainName.trim()}\n`
    }

    message += `\n📦 *Selected Plan:* ${activePlan.whatsappLabel}`

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodedMessage}`

    setShowToast(true)

    setTimeout(() => {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
      setIsSubmitting(false)
      setShowToast(false)
      onClose()
      
      // Reset form
      setFormData({
        fullName: '',
        mobileNumber: '',
        email: '',
        businessName: '',
        businessType: '',
        hasDomain: 'No',
        domainName: ''
      })
      setErrors({})
    }, 1200)
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const currentPlanMeta = PLAN_DETAILS[selectedPlan]

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-hidden">
          
          {/* BACKDROP OVERLAY */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-0"
          />

          {/* MODAL CONTAINER */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-[740px] max-h-[90vh] bg-white rounded-[24px] shadow-2xl border border-gray-100 flex flex-col overflow-hidden z-10 my-auto"
          >

            {/* STICKY HEADER */}
            <div className="shrink-0 p-4 sm:p-5 md:px-6 md:py-4 border-b border-gray-100 bg-white relative z-20 flex items-center justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-100 shadow-2xs mb-1">
                  <Sparkles className="w-3 h-3 text-[#2563EB]" />
                  <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider">
                    {currentPlanMeta.badge}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0A] tracking-tight font-sans">
                  🚀 Start Your Website
                </h2>
                <p className="text-[11px] sm:text-xs text-[#6B7280] font-medium leading-normal">
                  Fill in your details below and we'll redirect you to WhatsApp to complete your request.
                </p>
              </div>

              {/* CLOSE BUTTON */}
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-3"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            </div>

            {/* SCROLLABLE FORM BODY */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 md:p-6 space-y-3.5 custom-scrollbar">
              <form id="enquiry-modal-form" onSubmit={handleSubmit} className="space-y-3.5">
                
                {/* SELECT PLAN DROPDOWN */}
                <div>
                  <label className="block text-[11px] font-bold text-[#0A0A0A] mb-1">
                    Select Your Plan
                  </label>
                  <select
                    value={selectedPlan}
                    onChange={(e) => setSelectedPlan(e.target.value as PlanType)}
                    className="w-full text-xs font-bold px-3.5 py-2.5 rounded-xl border border-blue-200 bg-blue-50/60 text-[#2563EB] focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all cursor-pointer"
                  >
                    <option value="care">Care Plan – ₹499/month (Recommended)</option>
                    <option value="onetime">One-Time Plan – ₹4,999</option>
                    <option value="custom">Custom Solution / Enterprise</option>
                  </select>
                </div>

                {/* ROW 1: FULL NAME | MOBILE NUMBER */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-[#0A0A0A] mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className={`w-full text-xs px-3.5 py-2.5 rounded-xl border font-medium bg-gray-50/60 text-[#0A0A0A] placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 transition-all ${
                        errors.fullName 
                          ? 'border-red-400 focus:ring-red-200' 
                          : 'border-gray-200 focus:border-[#2563EB] focus:ring-blue-100'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-[10px] font-semibold text-red-500 mt-0.5">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#0A0A0A] mb-1">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.mobileNumber}
                      onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                      className={`w-full text-xs px-3.5 py-2.5 rounded-xl border font-medium bg-gray-50/60 text-[#0A0A0A] placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 transition-all ${
                        errors.mobileNumber 
                          ? 'border-red-400 focus:ring-red-200' 
                          : 'border-gray-200 focus:border-[#2563EB] focus:ring-blue-100'
                      }`}
                    />
                    {errors.mobileNumber && (
                      <p className="text-[10px] font-semibold text-red-500 mt-0.5">{errors.mobileNumber}</p>
                    )}
                  </div>
                </div>

                {/* ROW 2: EMAIL ADDRESS | BUSINESS NAME */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-[#0A0A0A] mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full text-xs px-3.5 py-2.5 rounded-xl border font-medium bg-gray-50/60 text-[#0A0A0A] placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 transition-all ${
                        errors.email 
                          ? 'border-red-400 focus:ring-red-200' 
                          : 'border-gray-200 focus:border-[#2563EB] focus:ring-blue-100'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[10px] font-semibold text-red-500 mt-0.5">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#0A0A0A] mb-1">
                      Business Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="ABC Restaurant"
                      value={formData.businessName}
                      onChange={(e) => handleInputChange('businessName', e.target.value)}
                      className={`w-full text-xs px-3.5 py-2.5 rounded-xl border font-medium bg-gray-50/60 text-[#0A0A0A] placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 transition-all ${
                        errors.businessName 
                          ? 'border-red-400 focus:ring-red-200' 
                          : 'border-gray-200 focus:border-[#2563EB] focus:ring-blue-100'
                      }`}
                    />
                    {errors.businessName && (
                      <p className="text-[10px] font-semibold text-red-500 mt-0.5">{errors.businessName}</p>
                    )}
                  </div>
                </div>

                {/* ROW 3: BUSINESS TYPE | DO YOU ALREADY HAVE A DOMAIN? */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 items-start">
                  <div>
                    <label className="block text-[11px] font-bold text-[#0A0A0A] mb-1">
                      Business Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.businessType}
                      onChange={(e) => handleInputChange('businessType', e.target.value)}
                      className={`w-full text-xs px-3.5 py-2.5 rounded-xl border font-medium bg-gray-50/60 text-[#0A0A0A] focus:outline-none focus:bg-white focus:ring-2 transition-all cursor-pointer ${
                        errors.businessType 
                          ? 'border-red-400 focus:ring-red-200' 
                          : 'border-gray-200 focus:border-[#2563EB] focus:ring-blue-100'
                      }`}
                    >
                      <option value="" disabled>Select category</option>
                      {businessTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    {errors.businessType && (
                      <p className="text-[10px] font-semibold text-red-500 mt-0.5">{errors.businessType}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#0A0A0A] mb-1.5">
                      Do you already have a domain?
                    </label>
                    <div className="flex items-center gap-5 pt-1">
                      <label className="flex items-center gap-1.5 text-xs font-semibold text-[#0A0A0A] cursor-pointer">
                        <input
                          type="radio"
                          name="hasDomain"
                          value="Yes"
                          checked={formData.hasDomain === 'Yes'}
                          onChange={() => handleInputChange('hasDomain', 'Yes')}
                          className="w-3.5 h-3.5 text-[#2563EB] focus:ring-[#2563EB]"
                        />
                        <span>Yes</span>
                      </label>

                      <label className="flex items-center gap-1.5 text-xs font-semibold text-[#0A0A0A] cursor-pointer">
                        <input
                          type="radio"
                          name="hasDomain"
                          value="No"
                          checked={formData.hasDomain === 'No'}
                          onChange={() => handleInputChange('hasDomain', 'No')}
                          className="w-3.5 h-3.5 text-[#2563EB] focus:ring-[#2563EB]"
                        />
                        <span>No</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* REVEALABLE DOMAIN INPUT FIELD */}
                <AnimatePresence>
                  {formData.hasDomain === 'Yes' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-1">
                        <label className="block text-[11px] font-bold text-[#0A0A0A] mb-1">
                          Domain Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="example.in"
                            value={formData.domainName}
                            onChange={(e) => handleInputChange('domainName', e.target.value)}
                            className={`w-full text-xs px-3.5 py-2.5 rounded-xl border font-medium bg-gray-50/60 text-[#0A0A0A] placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 transition-all ${
                              errors.domainName 
                                ? 'border-red-400 focus:ring-red-200' 
                                : 'border-gray-200 focus:border-[#2563EB] focus:ring-blue-100'
                            }`}
                          />
                          <Globe className="w-3.5 h-3.5 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                        </div>
                        {errors.domainName && (
                          <p className="text-[10px] font-semibold text-red-500 mt-0.5">{errors.domainName}</p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* DYNAMIC PLAN SUMMARY CARD */}
                <div className="bg-blue-50/70 border border-blue-100/90 rounded-2xl p-3.5 text-[#0A0A0A] space-y-2 mt-2">
                  <div className="flex items-center justify-between pb-2 border-b border-blue-100">
                    <div>
                      <span className="text-[9px] font-bold text-blue-600 uppercase tracking-wider block">Selected Plan</span>
                      <h4 className="text-xs sm:text-sm font-black text-[#0A0A0A] flex items-center gap-1">
                        {currentPlanMeta.name}
                      </h4>
                    </div>
                    <div className="text-right">
                      <span className="text-base sm:text-lg font-black text-[#2563EB]">{currentPlanMeta.price}</span>
                      {currentPlanMeta.period && (
                        <span className="text-[10px] text-gray-500 font-semibold">{currentPlanMeta.period}</span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-[11px] font-semibold text-gray-700">
                    {currentPlanMeta.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-[#2563EB] shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </form>
            </div>

            {/* STICKY FOOTER WITH SUBMIT BUTTON */}
            <div className="shrink-0 p-4 sm:px-6 sm:py-4 border-t border-gray-100 bg-white relative z-20">
              <motion.button
                form="enquiry-modal-form"
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.015 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.985 }}
                className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm py-3 px-5 rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <MessageSquare className="w-4 h-4 fill-white" />
                    <span>Continue to WhatsApp</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </motion.button>
            </div>

            {/* TOAST NOTIFICATION ON REDIRECT */}
            <AnimatePresence>
              {showToast && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="absolute bottom-16 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-[11px] font-bold px-3.5 py-2 rounded-full shadow-2xl flex items-center gap-2 border border-gray-700"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Redirecting you to WhatsApp...</span>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}