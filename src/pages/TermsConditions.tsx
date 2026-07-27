import { motion } from 'framer-motion'
import { 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Globe, 
  Server, 
  CreditCard, 
  ShieldAlert, 
  HelpCircle,
  ArrowLeft,
  Zap
} from 'lucide-react'

export function TermsConditions() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0A0A0A] py-12 md:py-20 px-4 sm:px-6 md:px-12 font-sans selection:bg-blue-100 selection:text-blue-900">
      <div className="max-w-4xl mx-auto space-y-10 relative z-10">
        
        {/* TOP BACK BUTTON / BRAND BAR */}
        <div className="flex items-center justify-between">
          <a 
            href="/" 
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-600 hover:text-[#2563EB] transition-colors bg-white px-4 py-2 rounded-xl border border-gray-200/80 shadow-2xs"
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </a>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Last Updated: July 2026
          </span>
        </div>

        {/* HEADER SECTION */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 shadow-2xs">
            <FileText className="w-3.5 h-3.5 text-[#2563EB]" />
            <span className="text-[11px] font-bold text-[#2563EB] tracking-wider uppercase">
              Service Agreement
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0A0A0A] font-sans">
            Terms & Conditions
          </h1>

          <p className="text-sm sm:text-base text-[#6B7280] font-medium leading-relaxed">
            Please read these terms carefully before choosing ProstoLabs for your website development and maintenance services.
          </p>
        </div>

        {/* CONTENT CARD */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white border border-gray-200/90 rounded-[32px] p-6 sm:p-10 shadow-xl space-y-10"
        >
          
          {/* SECTION 1: SERVICES OVERVIEW */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
              <div className="p-2 rounded-xl bg-blue-50 text-[#2563EB]">
                <Zap size={20} />
              </div>
              <h2 className="text-xl font-bold text-[#0A0A0A]">1. Website Development Services</h2>
            </div>
            <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
              ProstoLabs builds custom, mobile-responsive, modern websites for businesses across India. Most business websites are delivered within <strong>3–5 business days</strong> after receiving all required content, images, and business details from the customer.
            </p>
          </section>

          {/* SECTION 2: PLANS & PRICING */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
              <div className="p-2 rounded-xl bg-blue-50 text-[#2563EB]">
                <CreditCard size={20} />
              </div>
              <h2 className="text-xl font-bold text-[#0A0A0A]">2. Pricing Plans & Subscriptions</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* Care Plan Box */}
              <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-[#2563EB]">Care Plan (₹499/month)</h3>
                  <span className="text-xs font-black bg-[#2563EB] text-white px-2 py-0.5 rounded-full">Subscription</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  A fully managed website service. Includes your website build, cloud hosting, SSL security, ongoing maintenance, and unlimited content updates as long as the subscription remains active.
                </p>
              </div>

              {/* One-Time Plan Box */}
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-gray-900">One-Time Plan (₹4,999)</h3>
                  <span className="text-xs font-black bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full">Full Build</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Provides a complete website build with WhatsApp integration and basic SEO. After delivery, hosting, maintenance, and future updates are managed separately by the client.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 3: DOMAIN POLICY */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
              <div className="p-2 rounded-xl bg-blue-50 text-[#2563EB]">
                <Globe size={20} />
              </div>
              <h2 className="text-xl font-bold text-[#0A0A0A]">3. Domain Policy</h2>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-[#0A0A0A] font-medium">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#2563EB] shrink-0 mt-0.5" />
                <span><strong>Included Domain:</strong> The ₹499/month Care Plan includes one <code>.in</code> domain for the first year at no additional cost (subject to availability, with a registration fee up to ₹499).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#2563EB] shrink-0 mt-0.5" />
                <span><strong>Domain Renewals:</strong> From Year 2 onward, the domain renewal fee is paid by the customer at the standard registrar renewal price.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#2563EB] shrink-0 mt-0.5" />
                <span><strong>Premium Extensions:</strong> Extensions like <code>.com</code>, <code>.co</code>, or premium domains with extra registration costs are charged separately.</span>
              </li>
            </ul>
          </section>

          {/* SECTION 4: HOSTING POLICY */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
              <div className="p-2 rounded-xl bg-blue-50 text-[#2563EB]">
                <Server size={20} />
              </div>
              <h2 className="text-xl font-bold text-[#0A0A0A]">4. Hosting Policy</h2>
            </div>
            <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
              Hosting on the ₹499/month Care Plan is fully managed on ProstoLabs servers with high-speed performance and SSL security. If you cancel your ₹499/month Care Plan, hosting and website access will be discontinued upon subscription termination.
            </p>
          </section>

          {/* SECTION 5: UNLIMITED CONTENT UPDATES DEFINITION */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
              <div className="p-2 rounded-xl bg-[#2563EB] text-white">
                <FileText size={20} />
              </div>
              <h2 className="text-xl font-bold text-[#0A0A0A]">5. Unlimited Content Update Policy</h2>
            </div>
            
            <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
              The ₹499/month Care Plan includes <strong>unlimited content updates</strong> to keep your business info accurate.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 space-y-2">
                <h4 className="text-xs font-black text-emerald-900 uppercase">✓ Included in Content Updates</h4>
                <ul className="text-xs text-emerald-900 space-y-1 font-semibold">
                  <li>• Updating images & promotional banners</li>
                  <li>• Modifying prices, offers, or discounts</li>
                  <li>• Changing business hours & contact details</li>
                  <li>• Editing text content, services, or menus</li>
                </ul>
              </div>

              <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 space-y-2">
                <h4 className="text-xs font-black text-amber-900 uppercase">✕ Excluded (Charged Separately)</h4>
                <ul className="text-xs text-amber-900 space-y-1 font-semibold">
                  <li>• Complete website redesigns</li>
                  <li>• Brand name or logo redesigns</li>
                  <li>• Adding completely new pages</li>
                  <li>• Switching to a different business category</li>
                </ul>
              </div>
            </div>
          </section>

          {/* SECTION 6: ADDITIONAL FEATURES & CUSTOM WORK */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
              <div className="p-2 rounded-xl bg-blue-50 text-[#2563EB]">
                <HelpCircle size={20} />
              </div>
              <h2 className="text-xl font-bold text-[#0A0A0A]">6. Additional Features & Custom Work</h2>
            </div>
            <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
              Complex features such as E-commerce shopping carts, custom payment gateways, booking platforms, CRM portals, customer logins, and AI chatbots are not included in basic plans and will be quoted as custom development based on complexity.
            </p>
          </section>

          {/* SECTION 7: WEBSITE OWNERSHIP & CANCELLATION */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
              <div className="p-2 rounded-xl bg-blue-50 text-[#2563EB]">
                <ShieldAlert size={20} />
              </div>
              <h2 className="text-xl font-bold text-[#0A0A0A]">7. Subscription Cancellation & Ownership</h2>
            </div>
            <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
              You can cancel your ₹499/month subscription at any time. Because the Care Plan is a managed subscription, canceling it terminates active hosting and maintenance services. To retain permanent website code ownership without a subscription, clients can transition to our ₹4,999 One-Time Plan.
            </p>
          </section>

          {/* SECTION 8: LIMITATION OF LIABILITY */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                <AlertTriangle size={20} />
              </div>
              <h2 className="text-xl font-bold text-[#0A0A0A]">8. Limitation of Liability</h2>
            </div>
            <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
              ProstoLabs ensures maximum uptime and performance. However, ProstoLabs is not liable for indirect business losses, third-party API downtimes, internet outages, or illegal customer-supplied website content. Clients are strictly responsible for guaranteeing they own rights to images and text provided to us.
            </p>
          </section>

          {/* SECTION 9: CONTACT INFORMATION */}
          <section className="space-y-4 pt-4 border-t border-gray-100">
            <h2 className="text-xl font-bold text-[#0A0A0A]">9. Contact & Support</h2>
            <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
              For billing inquiries, plan updates, or technical support under your subscription:
            </p>
            <div className="bg-gray-50 border border-gray-200/80 rounded-2xl p-4 text-xs sm:text-sm space-y-1 font-semibold text-[#0A0A0A]">
              <p>🏢 <strong>ProstoLabs Technologies</strong></p>
              <p>💬 <strong>WhatsApp Support:</strong> +91 63925 77105</p>
              <p>📧 <strong>Email:</strong> support@prostolabs.in</p>
            </div>
          </section>

        </motion.div>
      </div>
    </div>
  )
}