import { motion, useReducedMotion } from 'motion/react'

const facts = [
  {
    title: 'Routed, not bundled',
    body: 'Praxis does not ship Taste Skill inside the npm payload. It routes visual work and can install the full family when you opt in.',
  },
  {
    title: 'Default primary',
    body: 'design-taste-frontend, channel v2-experimental, pinned in distribution/taste-skill.json.',
  },
  {
    title: 'Missing does not block',
    body: 'If the skill is absent, work continues. If it is present and applicable, the agent must load and follow it.',
  },
]

export function TasteSkill() {
  const reduce = useReducedMotion()

  return (
    <section id="taste" className="border-t border-white/6">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-4 py-28 md:grid-cols-12 md:gap-10 md:px-8 md:py-36">
        <div className="md:col-span-5">
          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[14ch] text-[clamp(2rem,3.5vw,3.2rem)] leading-[1.08] font-semibold tracking-[-0.03em] text-white"
          >
            Taste Skill routing.
          </motion.h2>
          <p className="mt-5 max-w-[40ch] text-[15px] leading-relaxed text-zinc-400">
            Landing pages and redesigns go through a frontend gate before design
            or implementation commits a look. See{' '}
            <a
              href="https://www.tasteskill.dev/"
              target="_blank"
              rel="noreferrer"
              className="text-white underline decoration-white/25 underline-offset-4 hover:decoration-white/60"
            >
              tasteskill.dev
            </a>
            .
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://www.tasteskill.dev/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center rounded-full bg-white px-5 text-[13px] font-medium text-black no-underline hover:bg-zinc-200"
            >
              Taste Skill
            </a>
            <code className="inline-flex h-11 items-center rounded-full border border-white/10 bg-white/5 px-4 font-mono text-[12px] text-zinc-300">
              --with-taste-skill
            </code>
          </div>
        </div>

        <ul className="space-y-0 md:col-span-7">
          {facts.map((fact, i) => (
            <motion.li
              key={fact.title}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.45,
                delay: i * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="border-t border-white/8 py-6 first:border-t-0 first:pt-0"
            >
              <p className="text-[16px] font-medium text-white">{fact.title}</p>
              <p className="mt-2 max-w-[48ch] text-[14px] leading-relaxed text-zinc-400">
                {fact.body}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
