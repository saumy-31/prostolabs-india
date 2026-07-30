import { useState, useEffect, Suspense, lazy } from 'react'
import { SEO } from './components/seo/SEO'
import { Navbar } from './components/Navbar'
import { Hero } from './components/hero/Hero'
import { type PlanType } from './components/Modal/EnquiryModal'

import { Resources } from './pages/Resources'
import { ResourceArticle } from './pages/ResourceArticle'

// IMPORT PAGES
import { AboutUs } from './pages/AboutUs'
import { Contact } from './pages/Contact'
import { PrivacyPolicy } from './pages/PrivacyPolicy'
import { TermsConditions } from './pages/TermsConditions'

import './index.css'

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

// HOMEPAGE STRUCTURED DATA SCHEMAS
const homeSchema = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ProstoLabs India",
    "url": "https://in.prostolabs.com"
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ProstoLabs India",
    "url": "https://in.prostolabs.com",
    "logo": "https://in.prostolabs.com/log.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "hello@prostolabs.com",
      "contactType": "customer service"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://in.prostolabs.com/#localbusiness",
    "name": "ProstoLabs India",
    "image": "https://in.prostolabs.com/log.png",
    "url": "https://in.prostolabs.com",
    "priceRange": "₹499/mo - ₹4,999",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    },
    "areaServed": "IN",
    "description": "Affordable website development for Indian businesses. Includes hosting, maintenance, SSL security, WhatsApp support, and SEO."
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Does the ₹499/month Care Plan include a domain?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. The ₹499/month Care Plan includes one .in domain for the first year at no additional cost. The domain is provided subject to availability and is limited to .in domains with a registration cost of up to ₹499."
        }
      },
      {
        "@type": "Question",
        "name": "What if my preferred domain isn't available?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "If your preferred domain isn't available, our team will help you find a suitable alternative that fits your business name."
        }
      },
      {
        "@type": "Question",
        "name": "How many times can I update my website content?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can request unlimited content updates as part of the ₹499/month Care Plan."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to launch my website?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our typical delivery time to launch your website is 3-7 business days."
        }
      },
      {
        "@type": "Question",
        "name": "Is hosting included?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, secure hosting with a 256-bit SSL Certificate and 99.9% uptime is included."
        }
      },
      {
        "@type": "Question",
        "name": "Will my website work on mobile devices?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, your website will be 100% mobile responsive and smoothly adapt across desktop, tablet, and mobile screens."
        }
      },
      {
        "@type": "Question",
        "name": "Why is ProstoLabs so affordable?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We utilize streamlined processes, modern development frameworks, and a managed service model to deliver high-quality websites without the heavy overhead of traditional agencies."
        }
      }
    ]
  }
]

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

  // GLOBAL LAYOUT WRAPPER (Navbar -> Subpage -> Footer)
  const wrapWithSuspense = (
    component: React.ReactNode, 
    seoProps: { title: string; description: string; path: string }
  ) => (
    <Suspense fallback={<PageSkeleton height="min-h-screen" />}>
      <SEO 
        title={seoProps.title}
        description={seoProps.description}
        path={seoProps.path}
      />
      <Navbar onOpenModal={() => handleOpenModal('care')} />
      <div className="pt-20 sm:pt-24 min-h-screen">
        {component}
      </div>
      <Footer />
      <Suspense fallback={null}>
        <FloatingCTA onOpenModal={handleOpenModal} isModalOpen={isModalOpen} />
        <EnquiryModal isOpen={isModalOpen} onClose={handleCloseModal} initialPlan={selectedPlan} />
      </Suspense>
    </Suspense>
  );

  // ROUTE 1: ABOUT US PAGE
  if (currentPath === '/about') {
    return wrapWithSuspense(
      <AboutUs onOpenModal={handleOpenModal} />, 
      {
        title: "About ProstoLabs India | Affordable Website Development",
        description: "Learn how ProstoLabs helps Indian businesses launch modern, affordable and fully managed websites.",
        path: "/about"
      }
    );
  }

  // ROUTE 2: RESOURCES HUB
  if (currentPath === '/resources') {
    return wrapWithSuspense(
      <Resources />, 
      {
        title: "Resources | Website Tips for Indian Businesses",
        description: "Learn how to grow your business online with ProstoLabs.",
        path: "/resources"
      }
    );
  }

  // ROUTE 3: RESOURCE ARTICLES (DYNAMIC)
  if (currentPath.startsWith('/resources/')) {
    return wrapWithSuspense(
      <ResourceArticle />, 
      {
        title: "Article | ProstoLabs",
        description: "Read our latest insights.",
        path: currentPath
      }
    );
  }

  // ROUTE 4: CONTACT PAGE
  if (currentPath === '/contact') {
    return wrapWithSuspense(
      <Contact onOpenModal={handleOpenModal} />, 
      {
        title: "Contact ProstoLabs India | Talk to Our Experts",
        description: "Have questions? Contact ProstoLabs India for website development, pricing or custom solutions.",
        path: "/contact"
      }
    );
  }

  // ROUTE 5: PRIVACY POLICY
  if (currentPath === '/privacy-policy') {
    return wrapWithSuspense(
      <PrivacyPolicy />, 
      {
        title: "Privacy Policy | ProstoLabs India",
        description: "Read the official Privacy Policy of ProstoLabs India. Learn how we collect, use, and protect your personal information.",
        path: "/privacy-policy"
      }
    );
  }

  // ROUTE 6: TERMS & CONDITIONS
  if (currentPath === '/terms-and-conditions') {
    return wrapWithSuspense(
      <TermsConditions />, 
      {
        title: "Terms & Conditions | ProstoLabs India",
        description: "Review the Terms and Conditions for using ProstoLabs India's website and managed website development services.",
        path: "/terms-and-conditions"
      }
    );
  }

  // ROUTE 7: MAIN LANDING PAGE (HOMEPAGE)
  return (
    <div className="relative w-full min-h-screen bg-[#FAFAFA] text-[#0A0A0A] font-sans selection:bg-blue-100 selection:text-blue-900">
      <SEO 
        title="Affordable Website Development for Indian Businesses | ProstoLabs India"
        description="Launch a professional website from just ₹499/month with hosting, maintenance, SSL, WhatsApp support and SEO included. Built for Indian businesses by ProstoLabs."
        keywords="website development India, affordable website design, website for small business, business website India, professional website India, website development company India, website builder alternative, website design for local businesses, managed website service"
        path="/"
        schema={homeSchema}
      />
      
      <Navbar onOpenModal={() => handleOpenModal('care')} />
      
      <main className="relative z-10" id="main-content">
        <Hero onOpenModal={handleOpenModal} />
        
        <Suspense fallback={<FeaturesSkeleton />}>
          <Pricing onOpenModal={handleOpenModal} />
        </Suspense>

        <Suspense fallback={<FeaturesSkeleton />}>
          <Features onOpenModal={handleOpenModal} />
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