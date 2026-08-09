import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const points = [
  {
    title: 'Direction',
    body: '.praxis/project.md holds confirmed decisions. Sessions can die. The profile stays.',
  },
  {
    title: 'Evidence',
    body: '.workflows/{id}/ stores phase files you can reopen, review, and resume.',
  },
  {
    title: 'Portable skills',
    body: 'SKILL.md contracts move across Codex, Claude Code, Cursor, and Grok homes.',
  },
]

export function Idea() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const words = gsap.utils.toArray<HTMLElement>('.idea-word')
      gsap.fromTo(
        words,
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.08,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 70%',
            end: 'top 25%',
            scrub: true,
          },
        },
      )
    },
    { scope: root },
  )

  const headline = 'Chat ends. Files remain.'

  return (
    <section
      ref={root}
      className="border-t border-white/6 px-4 py-28 md:px-8 md:py-40"
    >
      <div className="mx-auto max-w-[1400px]">
        <h2 className="max-w-4xl text-[clamp(2.2rem,5vw,4.5rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-white">
          {headline.split(' ').map((word) => (
            <span key={word} className="idea-word mr-[0.28em] inline-block">
              {word}
            </span>
          ))}
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 md:grid-cols-3">
          {points.map((point) => (
            <article
              key={point.title}
              className="bg-zinc-950 p-7 transition-colors duration-500 hover:bg-zinc-900/80 md:p-8"
            >
              <h3 className="text-[15px] font-semibold tracking-tight text-white">
                {point.title}
              </h3>
              <p className="mt-3 max-w-[32ch] text-[14px] leading-relaxed text-zinc-400">
                {point.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
