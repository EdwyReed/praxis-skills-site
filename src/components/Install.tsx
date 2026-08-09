import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'

const COMMAND = 'npx praxis-skills@beta install'
const TASTE = 'npx praxis-skills@beta install --with-taste-skill'

export function Install() {
  const reduce = useReducedMotion()
  const [copied, setCopied] = useState<'base' | 'taste' | null>(null)

  async function copy(text: string, key: 'base' | 'taste') {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      window.setTimeout(() => setCopied(null), 1500)
    } catch {
      setCopied(null)
    }
  }

  return (
    <section id="install" className="border-t border-white/6 bg-zinc-950/60">
      <div className="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-32">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-[clamp(1.8rem,3vw,2.8rem)] font-semibold tracking-[-0.03em] text-white">
            Install
          </h2>
          <p className="mt-4 max-w-[42ch] text-[15px] leading-relaxed text-zinc-400">
            Guided installer. Codex by default. Add agents as needed. Taste Skill
            family is optional and off by default.
          </p>

          <div className="mt-10 max-w-3xl space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex min-h-14 flex-1 items-center overflow-x-auto rounded-2xl border border-white/10 bg-black px-4">
                <code className="font-mono text-[13px] whitespace-nowrap text-zinc-200 md:text-[14px]">
                  {COMMAND}
                </code>
              </div>
              <button
                type="button"
                onClick={() => copy(COMMAND, 'base')}
                className="inline-flex h-14 shrink-0 items-center justify-center rounded-2xl bg-white px-6 text-[14px] font-medium text-black transition-transform active:scale-[0.98] hover:bg-zinc-200"
              >
                {copied === 'base' ? 'Copied' : 'Copy'}
              </button>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex min-h-14 flex-1 items-center overflow-x-auto rounded-2xl border border-white/10 bg-black px-4">
                <code className="font-mono text-[12px] whitespace-nowrap text-zinc-400 md:text-[13px]">
                  {TASTE}
                </code>
              </div>
              <button
                type="button"
                onClick={() => copy(TASTE, 'taste')}
                className="inline-flex h-14 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 text-[14px] font-medium text-white transition-transform active:scale-[0.98] hover:bg-white/10"
              >
                {copied === 'taste' ? 'Copied' : 'Copy + Taste'}
              </button>
            </div>
          </div>

          <p className="mt-6 text-[13px] text-zinc-600">
            Requires Node.js 22+. Restart agent sessions after install. Full
            reference:{' '}
            <Link to="/docs/get-started/installation" className="text-zinc-400 underline decoration-white/15 underline-offset-2 hover:text-white">
              installation docs
            </Link>
            .
          </p>
        </motion.div>
      </div>
    </section>
  )
}
