import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="border-t border-white/6">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-4 py-10 text-[13px] text-zinc-600 md:flex-row md:items-center md:justify-between md:px-8">
        <p>
          <span className="font-medium text-zinc-400">Praxis</span>
          <span className="mx-2 text-zinc-700">/</span>
          skills
        </p>
        <div className="flex flex-wrap gap-5">
          <Link to="/docs" className="text-zinc-500 no-underline hover:text-zinc-300">
            Docs
          </Link>
          <a
            href="https://github.com/EdwyReed/praxis-skills"
            target="_blank"
            rel="noreferrer"
            className="text-zinc-500 no-underline hover:text-zinc-300"
          >
            GitHub
          </a>
          <a
            href="https://www.npmjs.com/package/praxis-skills"
            target="_blank"
            rel="noreferrer"
            className="text-zinc-500 no-underline hover:text-zinc-300"
          >
            npm
          </a>
          <a
            href="https://www.tasteskill.dev/"
            target="_blank"
            rel="noreferrer"
            className="text-zinc-500 no-underline hover:text-zinc-300"
          >
            Taste Skill
          </a>
          <span>MIT</span>
        </div>
      </div>
    </footer>
  )
}
