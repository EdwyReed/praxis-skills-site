/**
 * After Vite build: materialize SPA routes as real files so static hosts
 * return HTTP 200 (not 404.html soft-fallback). Google rejects sitemaps whose
 * URLs respond with 404.
 */
import { copyFileSync, mkdirSync, readFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const indexHtml = join(dist, 'index.html')

if (!existsSync(indexHtml)) {
  console.error('prerender-spa-routes: dist/index.html missing — run vite build first')
  process.exit(1)
}

const navSource = readFileSync(join(root, 'src/docs/navigation.ts'), 'utf8')
const slugs = [...navSource.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1])

const paths = [
  'docs', // /docs redirects in app; still useful as a real path
  ...slugs.map((slug) => `docs/${slug}`),
]

for (const rel of paths) {
  const dir = join(dist, rel)
  mkdirSync(dir, { recursive: true })
  copyFileSync(indexHtml, join(dir, 'index.html'))
}

// Keep soft fallback for unknown routes
copyFileSync(indexHtml, join(dist, '404.html'))

console.log(`prerender-spa-routes: wrote ${paths.length} route indexes + 404.html`)
