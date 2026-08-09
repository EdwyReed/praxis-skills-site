import { useEffect, useMemo, useState } from 'react'
import { skills } from '../data/skills'
import { SkillDemoPlayer } from './SkillDemoPlayer'

function useActiveSkill(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? '')

  useEffect(() => {
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => Boolean(n))
    if (!nodes.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target.id) setActive(visible[0].target.id)
      },
      { rootMargin: '-30% 0px -50% 0px', threshold: [0.15, 0.35, 0.55] },
    )
    nodes.forEach((n) => observer.observe(n))
    return () => observer.disconnect()
  }, [ids])

  return active
}

export function SkillAtlas() {
  const ids = useMemo(() => skills.map((s) => s.id), [])
  const active = useActiveSkill(ids)
  const activeSkill = skills.find((s) => s.id === active) ?? skills[0]

  return (
    <section id="skills" className="border-t border-white/6">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <div className="pt-20 pb-8 md:pt-28">
          <h2 className="max-w-[16ch] text-[clamp(2rem,3.5vw,3.2rem)] leading-[1.08] font-semibold tracking-[-0.03em] text-white">
            Skills as sessions.
          </h2>
          <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-zinc-400">
            Each skill is an agent procedure. Open one. Watch the session write
            artifacts.
          </p>
        </div>

        {/*
          Sticky needs a tall containing block. Default grid stretch makes the
          left/right columns as tall as the skill list; sticky children can then
          travel that height. Do not use items-start on this grid.
        */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <aside className="docs-scroll z-20 -mx-4 border-b border-white/8 bg-black/85 px-4 py-3 backdrop-blur-xl lg:sticky lg:top-24 lg:col-span-3 lg:mx-0 lg:max-h-[calc(100dvh-6.5rem)] lg:self-start lg:overflow-y-auto lg:border-b-0 lg:bg-transparent lg:px-0 lg:py-2 lg:backdrop-blur-none">
            <nav
              aria-label="Skills"
              className="flex gap-1.5 overflow-x-auto pb-1 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:pb-0"
            >
              {skills.map((skill) => {
                const isActive = active === skill.id
                return (
                  <a
                    key={skill.id}
                    href={`#${skill.id}`}
                    className={[
                      'shrink-0 rounded-lg px-2.5 py-2 font-mono text-[11.5px] no-underline transition-colors lg:w-full lg:text-[12px]',
                      isActive
                        ? 'bg-white/10 text-[#e8ff47]'
                        : 'text-zinc-500 hover:bg-white/5 hover:text-zinc-200',
                    ].join(' ')}
                  >
                    <span className={isActive ? 'text-[#e8ff47]' : 'text-zinc-600'}>
                      $
                    </span>
                    {skill.title.slice(1)}
                  </a>
                )
              })}
            </nav>
          </aside>

          <div className="lg:col-span-4">
            {skills.map((skill) => (
              <article
                key={skill.id}
                id={skill.id}
                className="scroll-mt-28 border-b border-white/6 py-16 last:border-b-0 md:min-h-[70dvh] md:py-20"
              >
                <h3 className="skill-mono text-[1.35rem] font-medium tracking-tight text-white md:text-[1.55rem]">
                  <span className="text-[#e8ff47]">$</span>
                  {skill.title.slice(1)}
                </h3>
                <p className="mt-4 max-w-[28ch] text-[1.05rem] leading-snug font-medium text-zinc-100">
                  {skill.summary}
                </p>
                <p className="mt-4 max-w-[34ch] font-mono text-[12px] leading-relaxed text-zinc-500">
                  writes {skill.writes}
                </p>
                <p className="mt-3 max-w-[36ch] text-[13px] leading-relaxed text-zinc-500">
                  Prompt: {skill.prompt}
                </p>

                <div className="mt-8 lg:hidden">
                  <SkillDemoPlayer skill={skill} />
                </div>
              </article>
            ))}
          </div>

          <div className="relative hidden min-h-0 lg:col-span-5 lg:block">
            <div className="sticky top-24 z-10">
              <SkillDemoPlayer skill={activeSkill} />
              <p className="mt-3 font-mono text-[11px] tracking-wide text-zinc-600">
                {activeSkill.title} · session
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
