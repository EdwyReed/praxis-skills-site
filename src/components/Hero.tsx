import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { skills } from '../data/skills'
import { SkillDemoPlayer } from './SkillDemoPlayer'

const heroSkill = skills[0]

export function Hero() {
  const reduce = useReducedMotion()

  return (
    <section
      id="top"
      className="relative mx-auto grid min-h-[100dvh] w-full max-w-[1400px] grid-cols-1 items-center gap-10 overflow-x-hidden px-4 pb-16 pt-28 md:grid-cols-12 md:gap-8 md:px-8 md:pt-24"
    >
      <div className="md:col-span-5">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-5 text-[12px] tracking-[0.16em] text-zinc-500 uppercase"
        >
          Codex-first skill package
        </motion.p>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl text-[clamp(2.25rem,4.4vw,4.1rem)] leading-[1.06] font-semibold tracking-[-0.03em] text-white"
        >
          A flow that outlives sessions and agents.
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 max-w-[38ch] text-[16px] leading-relaxed text-zinc-400"
        >
          Direction, research, design, and PR evidence stay in the repo. Close
          the chat. Switch Codex, Claude, Cursor, or Grok. Resume from files.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <a
            href="#install"
            className="inline-flex h-12 items-center rounded-full bg-white px-6 text-[14px] font-medium text-black no-underline transition-transform active:scale-[0.98] hover:bg-zinc-200"
          >
            Install
          </a>
          <Link
            to="/docs"
            className="inline-flex h-12 items-center rounded-full border border-white/15 bg-white/5 px-6 text-[14px] font-medium text-white no-underline backdrop-blur-sm transition-colors hover:border-white/25"
          >
            Read docs
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.75, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        className="md:col-span-7"
      >
        <SkillDemoPlayer skill={heroSkill} />
        <p className="mt-3 text-[12px] text-zinc-600">
          Live composition: agent loads a skill, writes artifacts, waits for you.
        </p>
      </motion.div>
    </section>
  )
}
