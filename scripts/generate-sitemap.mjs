/**
 * Build sitemap files per Google Search Central + sitemaps.org protocol.
 *
 * @see https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
 * @see https://www.sitemaps.org/protocol.html
 *
 * Outputs (site root via public/):
 *   - sitemap.xml  — XML (recommended; matches Google’s example shape)
 *   - sitemap.txt  — text format (one absolute URL per line)
 *   - robots.txt   — Allow + absolute Sitemap: line
 *
 * Rules applied:
 *   - UTF-8, no BOM
 *   - Absolute https URLs only (canonical host SITE_URL)
 *   - XML entity-escape all tag values
 *   - <lastmod> from git last-change of real content (not “now”)
 *   - No <priority> / <changefreq> (Google ignores them)
 *   - ≤ 50_000 URLs / ≤ 50 MB (we are far below)
 */
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs'
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

/** sitemaps.org / Google: entity-escape all XML tag values */
function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

/** YYYY-MM-DD from last git commit that touched any of the paths (content mtime). */
function gitLastmod(paths) {
  try {
    const out = execFileSync(
      'git',
      ['log', '-1', '--format=%cs', '--', ...paths],
      { cwd: root, encoding: 'utf8' },
    ).trim()
    if (/^\d{4}-\d{2}-\d{2}$/.test(out)) return out
  } catch {
    // fall through
  }
  return new Date().toISOString().slice(0, 10)
}

// lastmod must reflect content change, not sitemap generation time (sitemaps.org + Google).
const homeLastmod = gitLastmod([
  'src/pages/HomePage.tsx',
  'src/components',
  'src/data/skills.ts',
  'index.html',
])
const docsLastmod = gitLastmod([
  'src/docs/content.ts',
  'src/docs/navigation.ts',
  'src/pages/DocsPage.tsx',
  'src/components/docs',
])

/**
 * Canonical URLs only (one host, https).
 * Docs paths keep trailing slash — GitHub Pages serves directory indexes as 200.
 */
const pages = [
  { loc: `${siteUrl}/`, lastmod: homeLastmod },
  ...slugs.map((slug) => ({
    loc: `${siteUrl}/docs/${slug}/`,
    lastmod: docsLastmod,
  })),
]

if (pages.length > 50_000) {
  console.error('generate-sitemap: exceeds 50_000 URL limit; split into multiple sitemaps')
  process.exit(1)
}

// Google’s XML example shape: urlset + url + loc + lastmod
// https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap#xml
const xmlBody = pages
  .map(
    ({ loc, lastmod }) => `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${escapeXml(lastmod)}</lastmod>
  </url>`,
  )
  .join('\n')

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlBody}
</urlset>
`

// Text sitemap: only URLs, one per line, .txt extension
// https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap#text
const sitemapTxt = `${pages.map((p) => p.loc).join('\n')}\n`

// robots.txt discovery (absolute Sitemap URL)
// https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap#addsitemap
const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
Sitemap: ${siteUrl}/sitemap.txt
`

const publicDir = join(root, 'public')
writeFileSync(join(publicDir, 'sitemap.xml'), sitemapXml, { encoding: 'utf8' })
writeFileSync(join(publicDir, 'sitemap.txt'), sitemapTxt, { encoding: 'utf8' })
writeFileSync(join(publicDir, 'robots.txt'), robotsTxt, { encoding: 'utf8' })

// Drop obsolete isolation file from earlier debugging
const homeOnly = join(publicDir, 'sitemap-home.xml')
if (existsSync(homeOnly)) unlinkSync(homeOnly)

const bytes = Buffer.byteLength(sitemapXml, 'utf8')
if (bytes > 50 * 1024 * 1024) {
  console.error('generate-sitemap: uncompressed XML exceeds 50 MB limit')
  process.exit(1)
}

console.log(
  `generate-sitemap: ${pages.length} URLs, ${bytes} B XML → public/sitemap.xml + sitemap.txt (${siteUrl})`,
)
console.log(`  home lastmod=${homeLastmod}  docs lastmod=${docsLastmod}`)
