import { useState } from 'react'
import { Search, ArrowRight, Clock, Sparkles } from 'lucide-react'
import { resources } from '../data/resourcesData'

export function Resources() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', 'Website Design', 'SEO & Local Search', 'Small Business', 'Digital Strategy']

  const filteredArticles = resources.filter((art) => {
    const matchesSearch = art.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          art.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const navigateToArticle = (e: React.MouseEvent, slug: string) => {
    // Allows standard browser actions (Ctrl+Click to open in new tab, Right Click -> Open in New Tab)
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return

    e.preventDefault()
    window.history.pushState(null, '', `/resources/${slug}`)
    window.dispatchEvent(new PopStateEvent('popstate'))
    window.scrollTo(0, 0)
  }

  const featured = resources[0]

  return (
    <div className="bg-[#FAFAFA] text-[#0A0A0A] font-sans min-h-screen pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 sm:pt-16 pb-12 px-6 overflow-hidden text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-[#2563EB]">
            <Sparkles size={14} />
            <span>Knowledge Hub</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#0A0A0A]">
            Practical Guides to Grow Your Business Online.
          </h1>
          <p className="text-base sm:text-lg text-[#6B7280] max-w-2xl mx-auto font-medium">
            Actionable website tips, SEO advice, and digital strategies tailored for Indian small businesses, cafes, clinics, and service providers.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto pt-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 mt-2 pointer-events-none" size={18} />
            <input 
              type="text" 
              placeholder="Search guides, SEO tips, pricing..."
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200/90 bg-white shadow-sm focus:ring-2 focus:ring-[#2563EB] focus:outline-none text-sm font-medium transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search resources"
            />
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2563EB] ${
                  selectedCategory === cat 
                    ? 'bg-[#2563EB] text-white shadow-md shadow-blue-500/20' 
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-[1300px] mx-auto px-6 space-y-16">
        
        {/* 2. FEATURED ARTICLE (Full Card Link) */}
        {searchTerm === '' && selectedCategory === 'All' && featured && (
          <a
            href={`/resources/${featured.slug}`}
            onClick={(e) => navigateToArticle(e, featured.slug)}
            className="group block relative rounded-[32px] bg-white border border-gray-200/90 shadow-sm hover:shadow-xl hover:border-[#2563EB]/40 transition-all duration-300 transform-gpu hover:-translate-y-1.5 overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 aspect-[16/9] lg:aspect-auto overflow-hidden relative">
                <img 
                  src={featured.thumbnail} 
                  alt={featured.title} 
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-300 ease-out"
                />
              </div>
              <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-xs font-bold text-[#2563EB]">
                    <span className="px-3 py-1 bg-blue-50 rounded-full border border-blue-100">{featured.category}</span>
                    <span className="text-gray-400">{featured.readingTime}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0A] leading-tight group-hover:text-[#2563EB] transition-colors duration-300">
                    {featured.title}
                  </h2>
                  <p className="text-sm text-[#6B7280] leading-relaxed font-medium">
                    {featured.excerpt}
                  </p>
                </div>
                <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-medium">{featured.date}</span>
                  <span className="px-5 py-2.5 rounded-xl bg-[#2563EB] text-white text-xs font-bold flex items-center gap-2 group-hover:bg-blue-700 transition-colors">
                    <span>Read Article</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </div>
              </div>
            </div>
          </a>
        )}

        {/* 3. ARTICLES GRID (Entire Cards Wrapped in Links) */}
        <div>
          <h2 className="text-xl font-bold text-[#0A0A0A] mb-6">Latest Resources & Insights</h2>
          {filteredArticles.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-gray-200">
              <p className="text-gray-500 font-medium">No guides found matching your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((art) => (
                <a 
                  key={art.slug} 
                  href={`/resources/${art.slug}`}
                  onClick={(e) => navigateToArticle(e, art.slug)}
                  className="group rounded-[28px] bg-white border border-gray-200/90 shadow-sm hover:shadow-xl hover:border-[#2563EB]/40 transition-all duration-300 transform-gpu hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2"
                >
                  <div>
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img 
                        src={art.thumbnail} 
                        alt={art.title} 
                        className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-300 ease-out"
                      />
                    </div>
                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-[#2563EB] font-bold">{art.category}</span>
                        <span className="text-gray-400 flex items-center gap-1"><Clock size={12} /> {art.readingTime}</span>
                      </div>
                      <h3 className="text-lg font-bold text-[#0A0A0A] leading-snug group-hover:text-[#2563EB] transition-colors duration-300">
                        {art.title}
                      </h3>
                      <p className="text-xs text-[#6B7280] leading-relaxed font-medium line-clamp-3">
                        {art.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-gray-50 mt-4 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-gray-400">{art.date}</span>
                    <span className="text-xs font-bold text-[#2563EB] flex items-center gap-1">
                      <span>Read Article</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}