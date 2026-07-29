import { useState, useEffect, Suspense, lazy } from 'react'
import { SEO } from './components/seo/SEO'
import { Navbar } from './components/Navbar'
import { Hero } from './components/hero/Hero'
import { type PlanType } from './components/Modal/EnquiryModal'

// IMPORT PAGES
import { AboutUs } from './pages/AboutUs'
import { Contact } from './pages/Contact'
import { PrivacyPolicy } from './pages/PrivacyPolicy'
import { TermsConditions } from './pages/TermsConditions'

import './index.css'

// Lazy load SEO component
const LazySEO = lazy(() => import('./components/seo/SEO').then(m => ({ default: m.SEO })));

// LAZY LOAD HEAVY BELOW-THE-FOLD COMPONENTS
const Pricing = lazy(() => import('./components/Pricing/Pricing').then(m => ({ default: m.Pricing })));
const Features = lazy(() => import('./components/Features/Features').then(m => ({ default: m.Features })));
const Showcase = lazy(() => import('./components/Showcase/Showcase').then(m => ({ default: m.Showcase })));
const WhyUs = lazy(() => import('./components/WhyUs/WhyUs').then(m => ({ default: m.WhyUs })));
const HowItWorks = lazy(() => import('./components/HowItWorks/HowItWorks').then(m => ({ default: m.HowItWorks })));
const Testimonials = lazy(() => import('./components/Testimonials/Testimonials').then(m => ({ default: m.Testimonials })));
const FAQ = lazy(() => import('./components/FAQ/FAQ').then(m => ({ default: m.FAQ })));
const FinalCTA = lazy(() => import('./components/FinalCTA/FinalCTA').then(m => ({ default: m.FinalCTA })));
const Footer = lazy(() => import('./components/Footer/Footer').then(m => ({ default: m.Footer })));
const FloatingCTA = lazy(() => import('./components/FloatingCTA').then(m => ({ default: m.FloatingCTA })));
const EnquiryModal = lazy(() => import('./components/Modal/EnquiryModal').then(m => ({ default: m.EnquiryModal })));

// SKELETONS FOR CLS PREVENTION
const PageSkeleton = ({ height }: { height: string }) => (
  <div className={`w-full ${height} bg-[#FAFAFA] animate-pulse rounded-2xl border border-gray-200`} />
);

const FeaturesSkeleton = () => (
  <div className="max-w-[1300px] mx-auto px-6 md:px-12 py-12 sm:py-16 md:py-20">
    <PageSkeleton height="h-[400px] sm:h-[500px]" />
  </div>
);

const ShowcaseSkeleton = () => (
  <div className="max-w-[1350px] mx-auto px-6 md:px-12 py-12 sm:py-16 md:py-20">
    <PageSkeleton height="h-[600px] sm:h-[700px]" />
  </div>
);

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('care')
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  // Listen for browser URL, back button, and hash-based navigation changes
  useEffect(() => {
    const handleLocationAndHash = () => {
      setCurrentPath(window.location.pathname)

      if (window.location.pathname === '/' && window.location.hash) {
        const targetId = window.location.hash.replace('#', '')
        
        setTimeout(() => {
          const element = document.getElementById(targetId)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100)
      } else if (!window.location.hash) {
        window.scrollTo(0, 0)
      }
    }

    window.addEventListener('popstate', handleLocationAndHash)
    handleLocationAndHash()

    return () => window.removeEventListener('popstate', handleLocationAndHash)
  }, [])

  const handleOpenModal = (plan: PlanType = 'care') => {
    setSelectedPlan(plan)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  // FIXED: Using ReactElement type instead of namespace JSX.Element
  const wrapWithSuspense = (component: React.ReactNode) => (
  <Suspense fallback={<PageSkeleton height="min-h-screen" />}>
    <SEO />
    {component}
    <Footer />
    <Suspense fallback={null}>
      <EnquiryModal isOpen={isModalOpen} onClose={handleCloseModal} initialPlan={selectedPlan} />
    </Suspense>
  </Suspense>
);

  // ROUTE 1: ABOUT US PAGE
  if (currentPath === '/about') {
    return wrapWithSuspense(<AboutUs onOpenModal={handleOpenModal} />);
  }

  // ROUTE 2: CONTACT PAGE
  if (currentPath === '/contact') {
    return wrapWithSuspense(<Contact onOpenModal={handleOpenModal} />);
  }

  // ROUTE 3: PRIVACY POLICY
  if (currentPath === '/privacy-policy') {
    return wrapWithSuspense(<PrivacyPolicy />);
  }

  // ROUTE 4: TERMS & CONDITIONS
  if (currentPath === '/terms-and-conditions') {
    return wrapWithSuspense(<TermsConditions />);
  }

  // ROUTE 5: MAIN LANDING PAGE
  return (
    <div className="relative w-full min-h-screen bg-[#FAFAFA] text-[#0A0A0A] font-sans selection:bg-blue-100 selection:text-blue-900">
      <LazySEO />
      
      <Navbar onOpenModal={() => handleOpenModal('care')} />
      
      <main className="relative z-10">
        <Hero onOpenModal={handleOpenModal} />
        
        <Suspense fallback={<FeaturesSkeleton />}>
          <Pricing onOpenModal={handleOpenModal} />
        </Suspense>

        <Suspense fallback={<FeaturesSkeleton />}>
          <Features />
        </Suspense>

        <Suspense fallback={<ShowcaseSkeleton />}>
          <Showcase />
        </Suspense>

        <Suspense fallback={<FeaturesSkeleton />}>
          <WhyUs onOpenModal={handleOpenModal} />
        </Suspense>

        <Suspense fallback={<FeaturesSkeleton />}>
          <HowItWorks />
        </Suspense>

        <Suspense fallback={<FeaturesSkeleton />}>
          <Testimonials />
        </Suspense>

        <Suspense fallback={<FeaturesSkeleton />}>
          <FAQ onOpenModal={handleOpenModal} />
        </Suspense>

        <Suspense fallback={<PageSkeleton height="h-[300px]" />}>
          <FinalCTA onOpenModal={handleOpenModal} />
        </Suspense>
      </main>

      <Suspense fallback={<PageSkeleton height="h-[200px]" />}>
        <Footer />
      </Suspense>

      <Suspense fallback={null}>
        <FloatingCTA onOpenModal={handleOpenModal} isModalOpen={isModalOpen} />
        <EnquiryModal isOpen={isModalOpen} onClose={handleCloseModal} initialPlan={selectedPlan} />
      </Suspense>
    </div>
  )
}