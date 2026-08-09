/**
 * Generates public/sitemap.xml and public/robots.txt from docs navigation.
 * Run automatically before production build — no manual URL lists.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const siteUrl = (process.env.SITE_URL || 'https://praxis.velryx.cc').replace(/\/$/, '')
const today = new Date().toISOString().slice(0, 10)

const navSource = readFileSync(join(root, 'src/docs/navigation.ts'), 'utf8')
const slugs = [...navSource.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1])

if (slugs.length === 0) {
  console.error('generate-sitemap: no doc slugs found in src/docs/navigation.ts')
  process.exit(1)
}

/** @type {{ path: string, changefreq: string, priority: string }[]} */
// Trailing slash on docs paths matches GitHub Pages directory indexes (HTTP 200, no 301).
const routes = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  ...slugs.map((slug) => ({
    path: `/docs/${slug}/`,
    changefreq: 'weekly',
    priority: slug === 'get-started/introduction' ? '0.9' : '0.7',
  })),
]

const urlEntries = routes
  .map(
    ({ path, changefreq, priority }) => `  <url>
    <loc>${siteUrl}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`

const publicDir = join(root, 'public')
writeFileSync(join(publicDir, 'sitemap.xml'), sitemap)
writeFileSync(join(publicDir, 'robots.txt'), robots)

console.log(
  `generate-sitemap: ${routes.length} URLs → public/sitemap.xml (+ robots.txt) for ${siteUrl}`,
)
