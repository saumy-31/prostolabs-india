import { useState, useEffect } from 'react'
import { SEO } from './components/seo/SEO'
import { Navbar } from './components/Navbar'
import { Hero } from './components/hero/Hero'
import { Pricing } from './components/Pricing/Pricing'
import { Features } from './components/Features/Features'
import { Showcase } from './components/Showcase/Showcase'
import { WhyUs } from './components/WhyUs/WhyUs'
import { HowItWorks } from './components/HowItWorks/HowItWorks'
import { Testimonials } from './components/Testimonials/Testimonials'
import { FAQ } from './components/FAQ/FAQ'
import { FinalCTA } from './components/FinalCTA/FinalCTA'
import { Footer } from './components/Footer/Footer'
import { EnquiryModal, type PlanType } from './components/Modal/EnquiryModal'
import { PrivacyPolicy } from './pages/PrivacyPolicy'
import { TermsConditions } from './pages/TermsConditions'
import { AboutUs } from './pages/AboutUs'
import { Contact } from './pages/Contact'
import './index.css'

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('care')
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  // Listen for browser URL / back button changes
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname)
      window.scrollTo(0, 0)
    }

    window.addEventListener('popstate', handleLocationChange)
    return () => window.removeEventListener('popstate', handleLocationChange)
  }, [])

  const handleOpenModal = (plan: PlanType = 'care') => {
    setSelectedPlan(plan)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  // ROUTE 1: ABOUT US PAGE
  if (currentPath === '/about') {
    return (
      <div className="relative w-full min-h-screen bg-[#FAFAFA] text-[#0A0A0A] font-sans">
        <SEO />
        <AboutUs onOpenModal={handleOpenModal} />
        <Footer />
        <EnquiryModal isOpen={isModalOpen} onClose={handleCloseModal} initialPlan={selectedPlan} />
      </div>
    )
  }

  // ROUTE 2: CONTACT PAGE
  if (currentPath === '/contact') {
    return (
      <div className="relative w-full min-h-screen bg-[#FAFAFA] text-[#0A0A0A] font-sans">
        <SEO />
        <Contact onOpenModal={handleOpenModal} />
        <Footer />
        <EnquiryModal isOpen={isModalOpen} onClose={handleCloseModal} initialPlan={selectedPlan} />
      </div>
    )
  }

  // ROUTE 3: PRIVACY POLICY
  if (currentPath === '/privacy-policy') {
    return (
      <div className="relative w-full min-h-screen bg-[#FAFAFA] text-[#0A0A0A] font-sans">
        <SEO />
        <PrivacyPolicy />
        <Footer />
      </div>
    )
  }

  // ROUTE 4: TERMS & CONDITIONS
  if (currentPath === '/terms-and-conditions') {
    return (
      <div className="relative w-full min-h-screen bg-[#FAFAFA] text-[#0A0A0A] font-sans">
        <SEO />
        <TermsConditions />
        <Footer />
      </div>
    )
  }

  // ROUTE 5: MAIN LANDING PAGE
  return (
    <div className="relative w-full min-h-screen bg-[#FAFAFA] text-[#0A0A0A] font-sans selection:bg-blue-100 selection:text-blue-900">
      <SEO />
      
      {/* NAVBAR */}
      <Navbar onOpenModal={() => handleOpenModal('care')} />
      
      <main className="relative z-10">
        <Hero onOpenModal={handleOpenModal} />
        <Pricing onOpenModal={handleOpenModal} />
        <Features />
        <Showcase />
        <WhyUs onOpenModal={handleOpenModal} />
        <HowItWorks />
        <Testimonials />
        <FAQ onOpenModal={handleOpenModal} />
        <FinalCTA onOpenModal={handleOpenModal} />
      </main>

      {/* FOOTER */}
      <Footer />

      {/* SINGLE UNIVERSAL ENQUIRY MODAL */}
      <EnquiryModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        initialPlan={selectedPlan}
      />
    </div>
  )
}