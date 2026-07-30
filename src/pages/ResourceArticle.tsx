import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { resources } from '../data/resourcesData'
import { 
  ArrowLeft, Clock, Calendar, User, Share2, 
  ChevronDown, ChevronUp, Check, Copy, MessageSquare,
  Sparkles, Lightbulb, Quote, TrendingUp, CheckCircle2,
  AlertTriangle, ArrowRight, Building2
} from 'lucide-react'
import { SEO } from '../components/seo/SEO'
import { Helmet } from 'react-helmet-async'

export function ResourceArticle() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  const slug = currentPath.replace('/resources/', '').replace(/\/$/, '')
  const article = resources.find((r) => r.slug === slug) || resources[0]

  const [activeId, setActiveId] = useState<string>('')
  const [isTocOpen, setIsTocOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // Scroll Progress Bar
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Auto-detect active H2 in Table of Contents
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id)
        })
      },
      { rootMargin: '-10% 0px -65% 0px' }
    )

    const headings = document.querySelectorAll('h2[id]')
    headings.forEach((h) => observer.observe(h))

    return () => observer.disconnect()
  }, [article])

  const navigateTo = (e: React.MouseEvent, path: string) => {
    e.preventDefault()
    window.history.pushState(null, '', path)
    window.dispatchEvent(new PopStateEvent('popstate'))
    window.scrollTo(0, 0)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(`${article.title} - ${window.location.href}`)
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank')
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.seoDescription,
    "image": article.thumbnail,
    "datePublished": article.date,
    "author": {
      "@type": "Organization",
      "name": "ProstoLabs India"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ProstoLabs India",
      "logo": {
        "@type": "ImageObject",
        "url": "https://in.prostolabs.com/log.png"
      }
    }
  }

  const tocHeadings = article.contentBlocks.filter((b) => b.type === 'h2')
  const relatedArticles = resources.filter((r) => r.slug !== article.slug).slice(0, 2)

  return (
    <div className="bg-[#FAFAFA] text-[#0A0A0A] font-sans min-h-screen relative selection:bg-blue-100 selection:text-blue-900">
      
      {/* Top Reading Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-[#2563EB] origin-left z-50 shadow-sm shadow-blue-500/50" 
        style={{ scaleX }} 
      />

      <SEO 
        title={`${article.title} | ProstoLabs Resources`}
        description={article.seoDescription}
        keywords={article.keywords}
        path={`/resources/${article.slug}`}
      />

      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>

      {/* ARTICLE HEADER CONTAINER */}
      <header className="pt-8 pb-12 px-6 border-b border-gray-200/80 bg-white">
        <div className="max-w-4xl mx-auto space-y-6">
          
          <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
            <a 
              href="/resources" 
              onClick={(e) => navigateTo(e, '/resources')} 
              className="hover:text-[#2563EB] transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft size={14} />
              <span>Resources</span>
            </a>
            <span>/</span>
            <span className="text-[#2563EB] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-100">
              {article.category}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A0A0A] leading-[1.15] tracking-tight font-sans">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs text-gray-500 font-semibold pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <User size={15} className="text-[#2563EB]" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={15} className="text-[#2563EB]" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={15} className="text-[#2563EB]" />
              <span>{article.readingTime}</span>
            </div>
          </div>

        </div>
      </header>

      {/* MAIN LAYOUT */}
      <div className="max-w-[1250px] mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LEFT / MAIN COLUMN */}
        <main className="lg:col-span-8 space-y-8">
          
          {/* Hero Image */}
          <div className="rounded-[28px] overflow-hidden border border-gray-200/90 shadow-md aspect-[16/9]">
            <img src={article.thumbnail} alt={article.title} className="w-full h-full object-cover" />
          </div>

          {/* Mobile TOC Accordion */}
          {tocHeadings.length > 0 && (
            <div className="lg:hidden border border-gray-200 rounded-2xl overflow-hidden bg-white p-4 shadow-sm">
              <button 
                onClick={() => setIsTocOpen(!isTocOpen)} 
                className="w-full flex items-center justify-between font-bold text-sm text-[#0A0A0A]"
              >
                <span className="flex items-center gap-2">
                  <Sparkles size={16} className="text-[#2563EB]" />
                  <span>Table of Contents</span>
                </span>
                {isTocOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              {isTocOpen && (
                <div className="pt-3 space-y-2 border-t border-gray-100 mt-3 text-xs font-semibold text-gray-600">
                  {tocHeadings.map((h, i) => (
                    <a 
                      key={i}
                      href={`#${h.id}`} 
                      onClick={() => setIsTocOpen(false)} 
                      className="block hover:text-[#2563EB] py-1"
                    >
                      {h.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* EDITORIAL CONTENT RENDERER */}
          <div className="space-y-7 text-[#0A0A0A]">
            {article.contentBlocks.map((block, idx) => {
              switch (block.type) {
                
                case 'paragraph':
                  return (
                    <p key={idx} className="text-base sm:text-lg text-[#374151] leading-[1.75] font-medium">
                      {block.text}
                    </p>
                  )

                case 'h2':
                  return (
                    <div key={idx} className="pt-6 pb-2 border-t border-gray-200/80 mt-10">
                      <h2 
                        id={block.id} 
                        className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0A] tracking-tight font-sans"
                      >
                        {block.title}
                      </h2>
                    </div>
                  )

                case 'stat':
                  return (
                    <div key={idx} className="p-6 sm:p-8 rounded-[24px] bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-100 my-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-6">
                      <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center font-bold">
                        <TrendingUp size={24} />
                      </div>
                      <div>
                        <span className="text-3xl sm:text-4xl font-extrabold text-[#2563EB] block font-sans tracking-tight">
                          {block.value}
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-gray-700 leading-snug block mt-1">
                          {block.label}
                        </span>
                      </div>
                    </div>
                  )

                case 'tip':
                  return (
                    <div key={idx} className="p-6 sm:p-7 rounded-[24px] bg-white border border-blue-200 shadow-md shadow-blue-500/5 my-8 space-y-2 relative overflow-hidden">
                      <div className="w-1.5 absolute left-0 top-0 bottom-0 bg-[#2563EB]" />
                      <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#2563EB]">
                        <Lightbulb size={16} />
                        <span>{block.title || 'Pro Tip'}</span>
                      </div>
                      <p className="text-sm sm:text-base font-semibold text-gray-800 leading-relaxed">
                        {block.text}
                      </p>
                    </div>
                  )

                case 'warning':
                  return (
                    <div key={idx} className="p-6 sm:p-8 rounded-[24px] bg-amber-50/60 border border-amber-200 my-8 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-700">
                        <AlertTriangle size={18} />
                        <span>{block.title}</span>
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-amber-900 leading-relaxed whitespace-pre-line">
                        {block.text}
                      </p>
                    </div>
                  )

                case 'checklist':
                  return (
                    <div key={idx} className="p-6 sm:p-8 rounded-[28px] bg-white border border-gray-200/90 shadow-sm my-8 space-y-4">
                      {block.title && (
                        <h4 className="font-extrabold text-base sm:text-lg text-[#0A0A0A] flex items-center gap-2">
                          <CheckCircle2 size={20} className="text-[#2563EB]" />
                          <span>{block.title}</span>
                        </h4>
                      )}
                      <div className="space-y-3">
                        {block.items?.map((item, itemIdx) => (
                          <div key={itemIdx} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                            <span className="w-5 h-5 rounded-full bg-blue-100 text-[#2563EB] flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
                              ✓
                            </span>
                            <span className="text-xs sm:text-sm font-semibold text-gray-700 leading-normal">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )

                case 'table':
                  return (
                    <div key={idx} className="my-8 overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
                      <table className="w-full text-left border-collapse text-xs sm:text-sm">
                        <thead>
                          <tr className="bg-gray-50 border-b border-gray-200 text-gray-900 font-extrabold">
                            {block.tableData?.headers.map((h, i) => (
                              <th key={i} className="p-4">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                          {block.tableData?.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-gray-50/50">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className={`p-4 ${cIdx === 0 ? 'font-bold text-[#0A0A0A]' : ''}`}>
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )

                case 'case_study':
                  return (
                    <div key={idx} className="my-8 p-6 sm:p-8 rounded-[28px] bg-white border border-gray-200 shadow-md space-y-6">
                      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                        <div>
                          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2563EB] block">Case Study</span>
                          <h4 className="text-xl font-extrabold text-[#0A0A0A]">{block.caseStudyData?.name}</h4>
                        </div>
                        <span className="text-xs font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full flex items-center gap-1">
                          <Building2 size={12} /> {block.caseStudyData?.location}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="p-4 rounded-2xl bg-red-50/50 border border-red-100 space-y-2">
                          <span className="text-xs font-bold text-red-600 uppercase">BEFORE Website</span>
                          {block.caseStudyData?.before.map((b, i) => (
                            <div key={i} className="text-xs font-semibold text-gray-700 flex justify-between">
                              <span>{b.label}:</span>
                              <span className="font-bold text-gray-900">{b.value}</span>
                            </div>
                          ))}
                        </div>

                        <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-2">
                          <span className="text-xs font-bold text-emerald-600 uppercase">AFTER Website</span>
                          {block.caseStudyData?.after.map((a, i) => (
                            <div key={i} className="text-xs font-semibold text-gray-700 flex justify-between">
                              <span>{a.label}:</span>
                              <span className="font-bold text-emerald-700">{a.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm font-medium text-gray-600 leading-relaxed pt-2 border-t border-gray-100">
                        {block.caseStudyData?.summary}
                      </p>
                    </div>
                  )

                case 'faq':
                  return (
                    <div key={idx} className="my-8 space-y-3">
                      {block.faqItems?.map((faq, fIdx) => (
                        <div key={fIdx} className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
                          <button 
                            onClick={() => setOpenFaq(openFaq === fIdx ? null : fIdx)}
                            className="w-full p-4 text-left font-bold text-sm text-[#0A0A0A] flex justify-between items-center"
                          >
                            <span>{faq.question}</span>
                            {openFaq === fIdx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                          {openFaq === fIdx && (
                            <div className="p-4 pt-0 text-xs sm:text-sm font-medium text-gray-600 border-t border-gray-50 leading-relaxed">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )

                case 'quote':
                  return (
                    <div key={idx} className="p-8 rounded-[28px] bg-gray-900 text-white my-8 space-y-4 shadow-xl relative overflow-hidden">
                      <Quote className="w-10 h-10 text-blue-500/30 absolute right-6 top-6" />
                      <p className="text-base sm:text-xl font-bold leading-relaxed relative z-10 font-sans italic">
                        "{block.text}"
                      </p>
                      {block.author && (
                        <span className="text-xs font-bold text-blue-400 block tracking-wider uppercase">
                          — {block.author}
                        </span>
                      )}
                    </div>
                  )

                case 'image':
                  return (
                    <div key={idx} className="my-8 space-y-2">
                      <div className="rounded-[24px] overflow-hidden border border-gray-200 shadow-sm aspect-[16/9]">
                        <img src={block.src} alt={block.alt || 'Article visual'} className="w-full h-full object-cover" />
                      </div>
                      {block.alt && (
                        <span className="text-xs font-medium text-gray-400 block text-center">
                          {block.alt}
                        </span>
                      )}
                    </div>
                  )

                default:
                  return null
              }
            })}
          </div>

          {/* Social Share Bar */}
          <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Share this resource:
            </span>
            <div className="flex items-center gap-3">
              <button 
                onClick={shareOnWhatsApp}
                className="px-4 py-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 text-xs font-bold flex items-center gap-2 hover:bg-emerald-600 hover:text-white transition-all cursor-pointer"
              >
                <MessageSquare size={15} />
                <span>WhatsApp</span>
              </button>
              <button 
                onClick={handleCopyLink}
                className="px-4 py-2.5 rounded-xl bg-white text-gray-700 border border-gray-200 text-xs font-bold flex items-center gap-2 hover:bg-gray-50 transition-all cursor-pointer shadow-sm"
              >
                {copied ? <Check size={15} className="text-emerald-600" /> : <Copy size={15} />}
                <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          </div>

          {/* Related Articles Cards */}
          <div className="pt-10 border-t border-gray-200 space-y-6">
            <h3 className="text-xl font-extrabold text-[#0A0A0A]">Recommended Next Reads</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedArticles.map((rel) => (
                <a 
                  key={rel.slug} 
                  href={`/resources/${rel.slug}`}
                  onClick={(e) => navigateTo(e, `/resources/${rel.slug}`)}
                  className="p-6 rounded-[24px] bg-white border border-gray-200/80 hover:border-[#2563EB] hover:shadow-lg transition-all group cursor-pointer block space-y-2"
                >
                  <span className="text-[10px] font-extrabold text-[#2563EB] uppercase tracking-wider block">
                    {rel.category}
                  </span>
                  <h4 className="font-bold text-sm text-[#0A0A0A] group-hover:text-[#2563EB] transition-colors line-clamp-2 leading-snug">
                    {rel.title}
                  </h4>
                  <span className="text-xs font-bold text-[#2563EB] flex items-center gap-1 pt-2">
                    <span>Read Article</span>
                    <ArrowRight size={12} />
                  </span>
                </a>
              ))}
            </div>
          </div>

        </main>

        {/* RIGHT COLUMN: Desktop Sticky TOC Sidebar */}
        <aside className="hidden lg:block lg:col-span-4">
          <div className="sticky top-28 space-y-8">
            
            {/* TOC Box */}
            {tocHeadings.length > 0 && (
              <div className="p-6 rounded-[28px] bg-white border border-gray-200/90 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#0A0A0A]">
                  <Sparkles size={14} className="text-[#2563EB]" />
                  <span>Table of Contents</span>
                </div>
                <nav className="space-y-1.5 text-xs font-bold text-gray-500">
                  {tocHeadings.map((h, i) => (
                    <a 
                      key={i}
                      href={`#${h.id}`} 
                      className={`block p-2 rounded-xl transition-all ${
                        activeId === h.id 
                          ? 'bg-blue-50 text-[#2563EB] font-bold border-l-2 border-[#2563EB]' 
                          : 'hover:text-[#0A0A0A] hover:bg-gray-50'
                      }`}
                    >
                      {h.title}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            {/* Sidebar CTA Card */}
            <div className="p-8 rounded-[28px] bg-gradient-to-br from-[#2563EB] via-[#1D4ED8] to-[#1E3A8A] text-white text-center space-y-4 shadow-xl">
              <h4 className="text-xl font-extrabold leading-snug font-sans">
                Ready to build your restaurant website?
              </h4>
              <p className="text-xs text-blue-100 font-medium leading-relaxed">
                Partner with ProstoLabs to launch a fast, direct-ordering website with hosting, SSL, and menu updates included.
              </p>
              <a 
                href="/contact"
                onClick={(e) => navigateTo(e, '/contact')}
                className="block w-full py-3.5 px-4 rounded-xl bg-white text-[#2563EB] font-bold text-xs hover:bg-blue-50 transition-colors shadow-md cursor-pointer"
              >
                Let's Build Your Website
              </a>
            </div>

          </div>
        </aside>

      </div>
    </div>
  )
}