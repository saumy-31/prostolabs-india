import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  canonical?: string
}

export function SEO({ 
  title = "ProstoLabs | Professional Websites for Growing Businesses", 
  description = "We design, build, host, and maintain professional websites for Indian businesses for just ₹4,999. You focus on your business, we handle the tech.",
  canonical = "https://in.prostolabs.com"
}: SEOProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      
      {/* Brand Color */}
      <meta name="theme-color" content="#2563EB" />
    </Helmet>
  )
}