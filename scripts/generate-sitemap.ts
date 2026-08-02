import fs from 'node:fs'
import path from 'node:path'
import { resources } from '../src/data/resourcesData.ts'

const SITE_URL = 'https://in.prostolabs.com'
const TODAY = new Date().toISOString().split('T')[0]

/**
 * Static Page Configurations for in.prostolabs.com
 */
const pageConfig: Record<string, { priority: string; changefreq: string }> = {
  '/': {
    priority: '1.0',
    changefreq: 'weekly'
  },
  '/about': {
    priority: '0.8',
    changefreq: 'monthly'
  },
  '/contact': {
    priority: '0.8',
    changefreq: 'monthly'
  },
  '/privacy-policy': {
    priority: '0.3',
    changefreq: 'yearly'
  },
  '/terms-and-conditions': {
    priority: '0.3',
    changefreq: 'yearly'
  },
  '/resources': {
    priority: '0.9',
    changefreq: 'weekly'
  }
}

function generateSitemapXml(): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`

  // 1. Static Pages Loop
  for (const [route, config] of Object.entries(pageConfig)) {
    const loc = route === '/' ? `${SITE_URL}/` : `${SITE_URL}${route}`
    xml += `  <url>
    <loc>${loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${config.changefreq}</changefreq>
    <priority>${config.priority}</priority>
  </url>\n`
  }

  // 2. Dynamic Resources Articles Loop
  for (const article of resources) {
    xml += `  <url>
    <loc>${SITE_URL}/resources/${article.slug}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>\n`
  }

  xml += `</urlset>
`
  return xml
}

// Write generated XML to public/sitemap.xml
const sitemapXml = generateSitemapXml()
const outputPath = path.join(process.cwd(), 'public', 'sitemap.xml')

fs.writeFileSync(outputPath, sitemapXml, 'utf-8')

console.log(
  `✅ India Sitemap generated with ${
    Object.keys(pageConfig).length + resources.length
  } URLs.`
)