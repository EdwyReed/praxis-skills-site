import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        aria-label="Primary"
        className={[
          'flex h-12 w-full max-w-5xl items-center justify-between rounded-full border px-4 transition-colors duration-300 md:h-14 md:px-5',
          scrolled
            ? 'border-white/10 bg-black/70 backdrop-blur-xl'
            : 'border-white/5 bg-black/30 backdrop-blur-md',
        ].join(' ')}
      >
        <a href="#top" className="flex items-baseline gap-2 no-underline">
          <span className="text-[14px] font-semibold tracking-tight text-white">
            Praxis
          </span>
          <span className="text-[12px] text-zinc-500">skills</span>
        </a>

        <div className="flex items-center gap-4 text-[13px] text-zinc-400 md:gap-6">
          <a href="#human" className="hidden no-underline hover:text-white md:inline">
            Gates
          </a>
          <a href="#skills" className="hidden no-underline hover:text-white sm:inline">
            Skills
          </a>
          <Link to="/docs" className="no-underline hover:text-white">
            Docs
          </Link>
          <a
            href="https://github.com/EdwyReed/praxis-skills"
            target="_blank"
            rel="noreferrer"
            className="hidden no-underline hover:text-white lg:inline"
          >
            GitHub
          </a>
          <a
            href="#install"
            className="inline-flex h-9 items-center rounded-full bg-white px-3.5 text-[13px] font-medium text-black no-underline transition-transform active:scale-[0.98] hover:bg-zinc-200"
          >
            Install
          </a>
        </div>
      </nav>
    </header>
  )
}
