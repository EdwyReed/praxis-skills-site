import { motion, useReducedMotion } from 'motion/react'
import { agents } from '../data/skills'

export function Agents() {
  const reduce = useReducedMotion()

  return (
    <section id="agents" className="border-t border-white/6">
      <div className="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-32">
        <h2 className="max-w-[18ch] text-[clamp(1.8rem,3vw,2.8rem)] font-semibold tracking-[-0.03em] text-white">
          One package. Four agent homes.
        </h2>
        <p className="mt-4 max-w-[44ch] text-[15px] leading-relaxed text-zinc-400">
          Shared skill contracts. Discovery maps for Codex, Claude Code, Cursor,
          and Grok. Claude slash commands use the /praxis-* prefix.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {agents.map((agent, i) => (
            <motion.div
              key={agent.name}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.45,
                delay: i * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="rounded-2xl border border-white/8 bg-gradient-to-b from-white/[0.04] to-transparent p-6 transition-transform duration-500 hover:-translate-y-0.5"
            >
              <p className="text-[16px] font-semibold text-white">{agent.name}</p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">
                {agent.note}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
