import { motion, useReducedMotion } from 'motion/react'
import { references } from '../data/skills'

export function References() {
  const reduce = useReducedMotion()

  return (
    <section className="border-t border-white/6 bg-zinc-950/50">
      <div className="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-28">
        <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] font-semibold tracking-[-0.03em] text-white">
          Reference library
        </h2>
        <p className="mt-3 max-w-[48ch] text-[15px] text-zinc-400">
          Templates and checklists used by the delivery skills. Compact by
          design.
        </p>

        <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {references.map((ref, i) => (
            <motion.li
              key={ref.id}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.4,
                delay: Math.min(i * 0.03, 0.2),
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group rounded-2xl border border-white/8 bg-black/40 p-5 transition-colors hover:border-white/15 hover:bg-white/[0.03]"
            >
              <p className="skill-mono text-[12.5px] font-medium text-zinc-200">
                <span className="text-[#e8ff47]">$</span>
                {ref.title.slice(1)}
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">
                {ref.body}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
