import { useEffect, useState } from 'react'

type TocItem = { id: string; text: string }

export function DocsToc({ contentKey }: { contentKey: string }) {
  const [items, setItems] = useState<TocItem[]>([])

  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>('.docs-prose h2[id]'),
    )
    setItems(
      nodes.map((node) => ({
        id: node.id,
        text: node.textContent ?? node.id,
      })),
    )
  }, [contentKey])

  if (!items.length) return null

  return (
    <nav aria-label="On this page" className="space-y-2">
      <p className="text-[11px] font-medium tracking-[0.14em] text-zinc-600 uppercase">
        On this page
      </p>
      <ul className="space-y-1.5 border-l border-white/8 pl-3">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="block text-[12.5px] leading-snug text-zinc-500 no-underline hover:text-zinc-200"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
