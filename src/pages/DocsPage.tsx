import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { DocsMarkdown } from '../components/docs/DocsMarkdown'
import { DocsSidebar } from '../components/docs/DocsSidebar'
import { DocsToc } from '../components/docs/DocsToc'
import { docsContent } from '../docs/content'
import { flattenDocsNav, getDocsNavNeighbors } from '../docs/navigation'

export function DocsPage() {
  const { '*': splat } = useParams()
  const slug = (splat ?? 'get-started/introduction').replace(/\/$/, '')
  const source = docsContent[slug]
  const neighbors = getDocsNavNeighbors(slug)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    setMobileOpen(false)
    window.scrollTo(0, 0)
  }, [slug])

  if (!source) {
    const first = flattenDocsNav()[0]?.slug ?? 'get-started/introduction'
    return <Navigate to={`/docs/${first}`} replace />
  }

  return (
    <div className="min-h-[100dvh] bg-[#050505] text-white">
      <header className="sticky top-0 z-40 border-b border-white/8 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between gap-4 px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-baseline gap-2 no-underline">
              <span className="text-[14px] font-semibold text-white">Praxis</span>
              <span className="text-[12px] text-zinc-500">docs</span>
            </Link>
            <button
              type="button"
              className="rounded-lg border border-white/10 px-2.5 py-1 text-[12px] text-zinc-400 lg:hidden"
              onClick={() => setMobileOpen((v) => !v)}
            >
              Menu
            </button>
          </div>
          <div className="flex items-center gap-4 text-[13px] text-zinc-500">
            <Link to="/" className="hidden no-underline hover:text-white sm:inline">
              Home
            </Link>
            <a
              href="https://github.com/EdwyReed/praxis-skills"
              target="_blank"
              rel="noreferrer"
              className="no-underline hover:text-white"
            >
              GitHub
            </a>
            <Link
              to="/#install"
              className="inline-flex h-8 items-center rounded-full bg-white px-3 text-[12px] font-medium text-black no-underline"
            >
              Install
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-0 lg:grid-cols-[240px_minmax(0,1fr)_200px]">
        <aside
          className={[
            'docs-scroll border-white/8 lg:sticky lg:top-14 lg:h-[calc(100dvh-3.5rem)] lg:overflow-y-auto lg:border-r lg:px-4 lg:py-8',
            mobileOpen
              ? 'border-b px-4 py-4'
              : 'hidden lg:block',
          ].join(' ')}
        >
          <DocsSidebar onNavigate={() => setMobileOpen(false)} />
        </aside>

        <main className="min-w-0 px-4 py-10 md:px-8 md:py-12 lg:px-10">
          <DocsMarkdown source={source} />

          <div className="mt-14 flex flex-col gap-3 border-t border-white/8 pt-8 sm:flex-row sm:justify-between">
            {neighbors.prev ? (
              <Link
                to={`/docs/${neighbors.prev.slug}`}
                className="rounded-xl border border-white/10 px-4 py-3 text-[13px] text-zinc-400 no-underline hover:border-white/20 hover:text-white"
              >
                <span className="block text-[11px] text-zinc-600">Previous</span>
                {neighbors.prev.title}
              </Link>
            ) : (
              <span />
            )}
            {neighbors.next ? (
              <Link
                to={`/docs/${neighbors.next.slug}`}
                className="rounded-xl border border-white/10 px-4 py-3 text-right text-[13px] text-zinc-400 no-underline hover:border-white/20 hover:text-white sm:ml-auto"
              >
                <span className="block text-[11px] text-zinc-600">Next</span>
                {neighbors.next.title}
              </Link>
            ) : null}
          </div>
        </main>

        <aside className="docs-scroll hidden py-12 pr-4 lg:sticky lg:top-14 lg:block lg:h-[calc(100dvh-3.5rem)] lg:overflow-y-auto">
          <DocsToc contentKey={slug} />
        </aside>
      </div>
    </div>
  )
}
