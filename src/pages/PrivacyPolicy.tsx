import { motion } from 'framer-motion'
import { 
  ShieldCheck, 
  Database, 
  MessageSquare, 
  Lock, 
  Cookie, 
  Share2, 
  Mail, 
  ArrowLeft,
  CheckCircle2
} from 'lucide-react'

export function PrivacyPolicy() {
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
            <ShieldCheck className="w-3.5 h-3.5 text-[#2563EB]" />
            <span className="text-[11px] font-bold text-[#2563EB] tracking-wider uppercase">
              Data Protection
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0A0A0A] font-sans">
            Privacy Policy
          </h1>

          <p className="text-sm sm:text-base text-[#6B7280] font-medium leading-relaxed">
            At ProstoLabs, we respect your privacy and are committed to protecting the personal and business information you share with us.
          </p>
        </div>

        {/* CONTENT CARD */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white border border-gray-200/90 rounded-[32px] p-6 sm:p-10 shadow-xl space-y-10"
        >
          
          {/* SECTION 1: INFORMATION WE COLLECT */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
              <div className="p-2 rounded-xl bg-blue-50 text-[#2563EB]">
                <Database size={20} />
              </div>
              <h2 className="text-xl font-bold text-[#0A0A0A]">1. Information We Collect</h2>
            </div>
            <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
              We collect information to provide better web development, hosting, and ongoing website management services to Indian business owners. We only gather information that is necessary for processing your project requests.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-[#0A0A0A] font-medium pt-1">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#2563EB] shrink-0 mt-0.5" />
                <span><strong>Personal Contact Details:</strong> Full Name, Mobile Number, and Email Address.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#2563EB] shrink-0 mt-0.5" />
                <span><strong>Business Identity:</strong> Business Name, Business Category/Type, Logo, Branding Assets, and Contact Details for your website.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#2563EB] shrink-0 mt-0.5" />
                <span><strong>Domain & Hosting Data:</strong> Preferred domain choices (e.g., example.in) or existing domain management credentials provided voluntarily for deployment.</span>
              </li>
            </ul>
          </section>

          {/* SECTION 2: HOW WE USE YOUR INFORMATION */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
              <div className="p-2 rounded-xl bg-blue-50 text-[#2563EB]">
                <ShieldCheck size={20} />
              </div>
              <h2 className="text-xl font-bold text-[#0A0A0A]">2. How We Use Your Information</h2>
            </div>
            <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
              We use the collected information solely for business execution, service fulfillment, and customer support. Specifically, we use your data to:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-[#0A0A0A] font-medium">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#2563EB] shrink-0 mt-0.5" />
                <span>Build, design, and configure your custom business website.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#2563EB] shrink-0 mt-0.5" />
                <span>Register your .in domain and configure secure hosting servers.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#2563EB] shrink-0 mt-0.5" />
                <span>Communicate with you regarding content updates, maintenance, and renewals.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#2563EB] shrink-0 mt-0.5" />
                <span>Send billing invoices, payment reminders, and service notifications.</span>
              </li>
            </ul>
          </section>

          {/* SECTION 3: FORM SUBMISSIONS & WHATSAPP ENQUIRIES */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                <MessageSquare size={20} />
              </div>
              <h2 className="text-xl font-bold text-[#0A0A0A]">3. Form Submissions & WhatsApp Enquiries</h2>
            </div>
            <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
              When you fill out an enquiry form on the ProstoLabs website, your responses are formatted into a direct structured message and transferred to WhatsApp Web/App to connect you directly with our project onboarding team.
            </p>
            <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-4 text-xs sm:text-sm text-emerald-900 font-medium">
              We do not sell, trade, or rent your mobile numbers or business details to third-party telemarketers or ad networks. Your contact information is strictly used for one-on-one communication regarding your website build.
            </div>
          </section>

          {/* SECTION 4: DATA SECURITY */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
              <div className="p-2 rounded-xl bg-blue-50 text-[#2563EB]">
                <Lock size={20} />
              </div>
              <h2 className="text-xl font-bold text-[#0A0A0A]">4. Data Security & Storage</h2>
            </div>
            <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
              We employ industry-standard technical measures to keep your data safe. All website data is transmitted over secure 256-bit SSL encryption. Website files and database backups under our ₹499/month Care Plan are stored on high-speed, isolated cloud infrastructure with automated monitoring.
            </p>
          </section>

          {/* SECTION 5: COOKIES & ANALYTICS */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
              <div className="p-2 rounded-xl bg-blue-50 text-[#2563EB]">
                <Cookie size={20} />
              </div>
              <h2 className="text-xl font-bold text-[#0A0A0A]">5. Cookies & Tracking Technologies</h2>
            </div>
            <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
              ProstoLabs uses basic functional cookies and privacy-friendly analytics tools to evaluate page loading speeds, user interactions, and website responsiveness. These cookies do not store personally identifiable financial data. You can choose to disable cookies in your web browser settings at any time.
            </p>
          </section>

          {/* SECTION 6: THIRD-PARTY SERVICES */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
              <div className="p-2 rounded-xl bg-blue-50 text-[#2563EB]">
                <Share2 size={20} />
              </div>
              <h2 className="text-xl font-bold text-[#0A0A0A]">6. Third-Party Service Providers</h2>
            </div>
            <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
              To deliver a complete website solution, we integrate with trusted third-party infrastructure providers:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-[#0A0A0A] font-medium">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#2563EB] shrink-0 mt-0.5" />
                <span><strong>Domain Registrars:</strong> For registering and managing .in or .com domains.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#2563EB] shrink-0 mt-0.5" />
                <span><strong>Cloud Hosting Servers:</strong> For hosting web applications and assets securely.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#2563EB] shrink-0 mt-0.5" />
                <span><strong>WhatsApp (Meta Platforms):</strong> For instant customer messaging and support routing.</span>
              </li>
            </ul>
          </section>

          {/* SECTION 7: CONTACT INFORMATION */}
          <section className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-50 text-[#2563EB]">
                <Mail size={20} />
              </div>
              <h2 className="text-xl font-bold text-[#0A0A0A]">7. Contact Us About Privacy</h2>
            </div>
            <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
              If you have any questions, concerns, or requests regarding this Privacy Policy or your data, please contact us:
            </p>
            <div className="bg-gray-50 border border-gray-200/80 rounded-2xl p-4 text-xs sm:text-sm space-y-1 font-semibold text-[#0A0A0A]">
              <p>🏢 <strong>ProstoLabs Technologies</strong></p>
              <p>💬 <strong>WhatsApp Direct:</strong> +91 63925 77105</p>
              <p>📧 <strong>Email:</strong> support@prostolabs.in</p>
            </div>
          </section>

        </motion.div>
      </div>
    </div>
  )
}