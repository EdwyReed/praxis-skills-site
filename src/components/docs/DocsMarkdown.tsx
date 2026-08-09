import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Link } from 'react-router-dom'
import type { Components } from 'react-markdown'

const components: Components = {
  a: ({ href, children }) => {
    if (!href) return <span>{children}</span>
    if (href.startsWith('/')) {
      return (
        <Link to={href} className="text-[#e8ff47] underline decoration-[#e8ff47]/30 underline-offset-2 hover:decoration-[#e8ff47]/70">
          {children}
        </Link>
      )
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="text-[#e8ff47] underline decoration-[#e8ff47]/30 underline-offset-2 hover:decoration-[#e8ff47]/70"
      >
        {children}
      </a>
    )
  },
  h1: ({ children, ...props }) => (
    <h1
      className="mb-6 text-[2rem] leading-tight font-semibold tracking-[-0.03em] text-white md:text-[2.35rem]"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => {
    const text = String(children)
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    return (
      <h2
        id={id}
        className="mt-12 mb-4 scroll-mt-28 border-t border-white/8 pt-10 text-[1.35rem] font-semibold tracking-tight text-white first:mt-0 first:border-t-0 first:pt-0"
        {...props}
      >
        {children}
      </h2>
    )
  },
  h3: ({ children, ...props }) => {
    const text = String(children)
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    return (
      <h3
        id={id}
        className="mt-8 mb-3 scroll-mt-28 text-[1.05rem] font-semibold text-white"
        {...props}
      >
        {children}
      </h3>
    )
  },
  p: ({ children }) => (
    <p className="mb-4 text-[15px] leading-relaxed text-zinc-400">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mb-4 list-disc space-y-2 pl-5 text-[15px] text-zinc-400">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 list-decimal space-y-2 pl-5 text-[15px] text-zinc-400">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed marker:text-zinc-600">{children}</li>,
  strong: ({ children }) => (
    <strong className="font-semibold text-zinc-200">{children}</strong>
  ),
  code: ({ className, children }) => {
    const isBlock = Boolean(className?.includes('language-'))
    if (!isBlock) {
      return (
        <code className="rounded bg-white/8 px-1.5 py-0.5 font-mono text-[12.5px] text-[#e8ff47]">
          {children}
        </code>
      )
    }
    return (
      <code className={`${className ?? ''} font-mono text-[12.5px] text-zinc-200`}>
        {children}
      </code>
    )
  },
  pre: ({ children }) => (
    <pre className="mb-6 overflow-x-auto rounded-xl border border-white/10 bg-black/60 p-4 font-mono text-[12.5px] leading-relaxed text-zinc-200">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="mb-6 overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full min-w-[32rem] border-collapse text-left text-[13px]">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-white/[0.04] text-zinc-300">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="border-b border-white/10 px-3 py-2.5 font-medium">{children}</th>
  ),
  td: ({ children }) => (
    <td className="border-b border-white/6 px-3 py-2.5 align-top text-zinc-400">
      {children}
    </td>
  ),
  blockquote: ({ children }) => (
    <blockquote className="mb-4 border-l-2 border-[#e8ff47]/50 pl-4 text-zinc-400">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-10 border-white/8" />,
}

export function DocsMarkdown({ source }: { source: string }) {
  return (
    <div className="docs-prose max-w-3xl">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {source}
      </ReactMarkdown>
    </div>
  )
}
