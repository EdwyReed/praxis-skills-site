/**
 * Generates public/sitemap.xml and public/robots.txt from docs navigation.
 * Run automatically before production build — no manual URL lists.
 *
 * Keep the XML minimal (loc only): Google does not need lastmod/changefreq/priority,
 * and a strict loc-only file is the least likely to confuse Search Console.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const siteUrl = (process.env.SITE_URL || 'https://praxis.velryx.cc').replace(/\/$/, '')

const navSource = readFileSync(join(root, 'src/docs/navigation.ts'), 'utf8')
const slugs = [...navSource.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1])

if (slugs.length === 0) {
  console.error('generate-sitemap: no doc slugs found in src/docs/navigation.ts')
  process.exit(1)
}

// Trailing slash on docs paths matches GitHub Pages directory indexes (HTTP 200).
const locs = [
  `${siteUrl}/`,
  ...slugs.map((slug) => `${siteUrl}/docs/${slug}/`),
]

const urlEntries = locs.map((loc) => `  <url>\n    <loc>${loc}</loc>\n  </url>`).join('\n')

// No BOM; LF only; trailing newline. text/xml-friendly pure ASCII URL set.
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`

// Homepage-only file for Search Console isolation tests.
const sitemapHome = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
  </url>
</urlset>
`

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`

const publicDir = join(root, 'public')
writeFileSync(join(publicDir, 'sitemap.xml'), sitemap, { encoding: 'utf8' })
writeFileSync(join(publicDir, 'sitemap-home.xml'), sitemapHome, { encoding: 'utf8' })
writeFileSync(join(publicDir, 'robots.txt'), robots, { encoding: 'utf8' })

console.log(
  `generate-sitemap: ${locs.length} URLs → public/sitemap.xml (+ sitemap-home.xml, robots.txt) for ${siteUrl}`,
)
