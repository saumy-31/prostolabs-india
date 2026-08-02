import { Helmet } from 'react-helmet-async'

// Core Configuration Constants for India Domain
const SITE_CONFIG = {
  name: 'ProstoLabs India',
  domain: 'https://in.prostolabs.com',
  globalDomain: 'https://prostolabs.com',
  defaultTitle: 'ProstoLabs India | Web Engineering, AI Automations & Product Systems',
  titleTemplate: '%s | ProstoLabs India',
  defaultDescription: 'We design and engineer high-performance websites, custom web applications, AI automations, and growth strategy for forward-thinking brands in India and worldwide.',
  defaultImage: 'https://in.prostolabs.com/og-image.jpg',
  themeColor: '#2563EB',
  locale: 'en_IN',
  twitterHandle: '@prostolabs',
  logoUrl: 'https://in.prostolabs.com/logo.png'
}

export interface BreadcrumbItem {
  name: string
  path: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface SEOProps {
  title?: string
  description?: string
  path?: string
  keywords?: string // Preserved to prevent TS / ESLint errors across legacy implementations
  image?: string
  ogImage?: string // Preserved for backwards compatibility
  ogType?: 'website' | 'article' // Preserved for backwards compatibility
  type?: 'website' | 'article' | 'collection'
  published?: string
  modified?: string
  author?: string
  breadcrumbs?: BreadcrumbItem[]
  faq?: FAQItem[]
  noIndex?: boolean
  schema?: Record<string, any> | Array<Record<string, any>> // Preserved for custom schema overrides
}

/**
 * Helper function to convert various date string formats to standard ISO 8601 (YYYY-MM-DD)
 */
function formatIsoDate(dateString?: string): string | undefined {
  if (!dateString) return undefined
  
  // If already in YYYY-MM-DD or ISO format
  if (/^\d{4}-\d{2}-\d{2}/.test(dateString)) {
    return dateString.substring(0, 10)
  }

  const parsedDate = new Date(dateString)
  if (isNaN(parsedDate.getTime())) {
    return undefined
  }

  return parsedDate.toISOString().split('T')[0]
}

export function SEO({
  title,
  description = SITE_CONFIG.defaultDescription,
  path = '',
  keywords,
  image,
  ogImage,
  ogType,
  type = 'website',
  published,
  modified,
  author = 'ProstoLabs Editorial',
  breadcrumbs,
  faq,
  noIndex = false,
  schema
}: SEOProps) {
  // Normalize path and resolve final image / ogType fallbacks
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  const finalImage = image || ogImage || SITE_CONFIG.defaultImage
  const finalType = type || ogType || 'website'

  // Construct Absolute Canonical URL always pointing to in.prostolabs.com
  const canonicalUrl = `${SITE_CONFIG.domain}${normalizedPath}`
  
  // Construct Dynamic International Hreflang URLs
  const xDefaultUrl = `${SITE_CONFIG.globalDomain}${normalizedPath}`
  const enInUrl = `${SITE_CONFIG.domain}${normalizedPath}`

  const formattedTitle = title 
    ? (title.includes('ProstoLabs') ? title : `${title} | ${SITE_CONFIG.name}`)
    : SITE_CONFIG.defaultTitle

  // Format dates to clean ISO 8601 (YYYY-MM-DD)
  const isoPublished = formatIsoDate(published)
  const isoModified = formatIsoDate(modified) || isoPublished

  // =========================================================================
  // STRUCTURED DATA (SCHEMA.ORG) GRAPH GENERATOR
  // =========================================================================
  const schemaGraph: any[] = []

  // 1. Organization Schema
  const organizationSchema = {
    '@type': 'Organization',
    '@id': `${SITE_CONFIG.domain}/#organization`,
    'name': SITE_CONFIG.name,
    'url': SITE_CONFIG.domain,
    'logo': {
      '@type': 'ImageObject',
      '@id': `${SITE_CONFIG.domain}/#logo`,
      'url': SITE_CONFIG.logoUrl,
      'caption': SITE_CONFIG.name
    },
    'sameAs': [
      'https://instagram.com/prostolabs'
    ]
  }
  schemaGraph.push(organizationSchema)

  // 2. WebSite Schema
  const websiteSchema = {
    '@type': 'WebSite',
    '@id': `${SITE_CONFIG.domain}/#website`,
    'url': SITE_CONFIG.domain,
    'name': SITE_CONFIG.name,
    'description': SITE_CONFIG.defaultDescription,
    'publisher': {
      '@id': `${SITE_CONFIG.domain}/#organization`
    },
    'inLanguage': 'en-IN'
  }
  schemaGraph.push(websiteSchema)

  // 3. Page Schema (WebPage, CollectionPage, or BlogPosting)
  if (finalType === 'article') {
    const blogPostingSchema = {
      '@type': 'BlogPosting',
      '@id': `${canonicalUrl}/#article`,
      'isPartOf': {
        '@type': 'WebPage',
        '@id': canonicalUrl,
        'url': canonicalUrl,
        'name': formattedTitle
      },
      'headline': title || formattedTitle,
      'description': description,
      'image': finalImage,
      'datePublished': isoPublished,
      'dateModified': isoModified,
      'author': {
        '@type': 'Organization',
        'name': author,
        'url': SITE_CONFIG.domain
      },
      'publisher': {
        '@id': `${SITE_CONFIG.domain}/#organization`
      },
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': canonicalUrl
      },
      'inLanguage': 'en-IN'
    }
    schemaGraph.push(blogPostingSchema)
  } else if (finalType === 'collection') {
    const collectionPageSchema = {
      '@type': 'CollectionPage',
      '@id': `${canonicalUrl}/#webpage`,
      'url': canonicalUrl,
      'name': formattedTitle,
      'description': description,
      'isPartOf': {
        '@id': `${SITE_CONFIG.domain}/#website`
      },
      'publisher': {
        '@id': `${SITE_CONFIG.domain}/#organization`
      },
      'inLanguage': 'en-IN'
    }
    schemaGraph.push(collectionPageSchema)
  } else {
    const webPageSchema = {
      '@type': 'WebPage',
      '@id': `${canonicalUrl}/#webpage`,
      'url': canonicalUrl,
      'name': formattedTitle,
      'description': description,
      'isPartOf': {
        '@id': `${SITE_CONFIG.domain}/#website`
      },
      'publisher': {
        '@id': `${SITE_CONFIG.domain}/#organization`
      },
      'inLanguage': 'en-IN'
    }
    schemaGraph.push(webPageSchema)
  }

  // 4. BreadcrumbList Schema
  if (breadcrumbs && breadcrumbs.length > 0) {
    const breadcrumbSchema = {
      '@type': 'BreadcrumbList',
      '@id': `${canonicalUrl}/#breadcrumb`,
      'itemListElement': breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': item.name,
        'item': `${SITE_CONFIG.domain}${item.path.startsWith('/') ? item.path : `/${item.path}`}`
      }))
    }
    schemaGraph.push(breadcrumbSchema)
  }

  // 5. FAQPage Schema
  if (faq && faq.length > 0) {
    const faqSchema = {
      '@type': 'FAQPage',
      '@id': `${canonicalUrl}/#faq`,
      'mainEntity': faq.map((item) => ({
        '@type': 'Question',
        'name': item.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': item.answer
        }
      }))
    }
    schemaGraph.push(faqSchema)
  }

  // 6. Custom Direct Schema Injections (if supplied via props)
  if (schema) {
    if (Array.isArray(schema)) {
      schemaGraph.push(...schema)
    } else {
      schemaGraph.push(schema)
    }
  }

  // Final Unified JSON-LD Output
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@graph': schemaGraph
  }

  return (
    <Helmet>
      {/* =================================================================== */}
      {/* 1. STANDARD META TAGS                                               */}
      {/* =================================================================== */}
      <title>{formattedTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="theme-color" content={SITE_CONFIG.themeColor} />

      {/* =================================================================== */}
      {/* 2. INTERNATIONAL SEO (HREFLANG TAGS)                                */}
      {/* =================================================================== */}
      <link rel="alternate" hrefLang="x-default" href={xDefaultUrl} />
<link rel="alternate" hrefLang="en-IN" href={enInUrl} />

      {/* =================================================================== */}
      {/* 3. OPEN GRAPH TAGS                                                  */}
      {/* =================================================================== */}
      <meta property="og:site_name" content={SITE_CONFIG.name} />
      <meta property="og:title" content={formattedTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={finalType === 'article' ? 'article' : 'website'} />
      <meta property="og:locale" content={SITE_CONFIG.locale} />

      {/* Article Specific OpenGraph Metadata */}
      {finalType === 'article' && isoPublished && (
        <meta property="article:published_time" content={isoPublished} />
      )}
      {finalType === 'article' && isoModified && (
        <meta property="article:modified_time" content={isoModified} />
      )}
      {finalType === 'article' && author && (
        <meta property="article:author" content={author} />
      )}

      {/* =================================================================== */}
      {/* 4. TWITTER CARDS                                                    */}
      {/* =================================================================== */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SITE_CONFIG.twitterHandle} />
      <meta name="twitter:creator" content={SITE_CONFIG.twitterHandle} />
      <meta name="twitter:title" content={formattedTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={finalImage} />

      {/* =================================================================== */}
      {/* 5. JSON-LD STRUCTURED DATA GRAPH                                    */}
      {/* =================================================================== */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLdData)}
      </script>
    </Helmet>
  )
}