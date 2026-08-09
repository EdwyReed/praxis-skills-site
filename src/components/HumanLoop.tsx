import { motion, useReducedMotion } from 'motion/react'

const gates = [
  {
    id: 'direction',
    label: 'Direction',
    when: 'Before project mutations',
    skill: '$praxis-init',
    human: 'Confirm or correct .praxis/project.md. Inferred profiles stay needs-confirmation.',
    agent: 'Audits the repo, drafts the profile, waits. Does not treat draft direction as truth.',
  },
  {
    id: 'design',
    label: 'Design',
    when: 'Before implementation of large change',
    skill: '$praxis-design',
    human: 'Review architecture, ADRs, and contracts. Accept, revise, or stop.',
    agent: 'Writes inspectable design files. Does not silently jump from inference to code.',
  },
  {
    id: 'ship',
    label: 'Ship',
    when: 'Before merge and publish',
    skill: '$praxis-pr',
    human: 'Read the PR body, test plan, and evidence links. Merge is still your call.',
    agent: 'Assembles artifacts from the workflow. Does not invent review that never happened.',
  },
]

export function HumanLoop() {
  const reduce = useReducedMotion()

  return (
    <section id="human" className="border-t border-white/6">
      <div className="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-32">
        <div className="max-w-3xl">
          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.08] font-semibold tracking-[-0.03em] text-white"
          >
            Humans keep the gates.
          </motion.h2>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 max-w-[48ch] text-[15px] leading-relaxed text-zinc-400"
          >
            Agents write files and can resume after a dead session. Costly moves
            still wait on you: project direction, design acceptance, and ship.
            This is supervision through artifacts, not a separate approval product.
          </motion.p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-3 lg:grid-cols-3">
          {gates.map((gate, i) => (
            <motion.article
              key={gate.id}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.5,
                delay: i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col rounded-2xl border border-white/8 bg-gradient-to-b from-white/[0.04] to-transparent p-6 md:p-7"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-[18px] font-semibold tracking-tight text-white">
                  {gate.label}
                </h3>
                <span className="skill-mono text-[11px] text-[#e8ff47]">
                  {gate.skill}
                </span>
              </div>
              <p className="mt-2 text-[12px] tracking-wide text-zinc-500 uppercase">
                {gate.when}
              </p>

              <div className="mt-8 space-y-5 border-t border-white/8 pt-6">
                <div>
                  <p className="text-[11px] tracking-[0.14em] text-zinc-600 uppercase">
                    You
                  </p>
                  <p className="mt-2 text-[14px] leading-relaxed text-zinc-300">
                    {gate.human}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] tracking-[0.14em] text-zinc-600 uppercase">
                    Agent
                  </p>
                  <p className="mt-2 text-[14px] leading-relaxed text-zinc-500">
                    {gate.agent}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10 max-w-[52ch] text-[13px] leading-relaxed text-zinc-600"
        >
          Checkpoints live in skill contracts and repository files. Small work
          can take a shorter path when you accept it. Agents can still skip a
          gate if the session ignores the skill; the package cannot force a
          human click.
        </motion.p>
      </div>
    </section>
  )
}
