import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title: string
  description: string
  path: string
  keywords?: string // <--- THIS PREVENTS THE TYPESCRIPT / ESLINT ERROR
  ogImage?: string
  ogType?: 'website' | 'article'
  schema?: Record<string, any> | Array<Record<string, any>>
}

export const SEO = ({
  title,
  description,
  path,
  keywords,
  ogImage = 'https://in.prostolabs.com/log.png',
  ogType = 'website',
  schema
}: SEOProps) => {
  const siteUrl = 'https://in.prostolabs.com'
  const fullUrl = `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:site_name" content="ProstoLabs India" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD Schema */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  )
}