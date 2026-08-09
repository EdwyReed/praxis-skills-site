import { NavLink } from 'react-router-dom'
import { docsNavigation } from '../../docs/navigation'

export function DocsSidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav aria-label="Documentation" className="space-y-8">
      {docsNavigation.map((group) => (
        <div key={group.title}>
          <p className="mb-2 px-2 text-[11px] font-medium tracking-[0.14em] text-zinc-600 uppercase">
            {group.title}
          </p>
          <ul className="space-y-0.5">
            {group.items.map((item) => (
              <li key={item.slug}>
                <NavLink
                  to={`/docs/${item.slug}`}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    [
                      'block rounded-lg px-2.5 py-1.5 text-[13px] no-underline transition-colors',
                      isActive
                        ? 'bg-white/10 text-white'
                        : 'text-zinc-500 hover:bg-white/5 hover:text-zinc-200',
                    ].join(' ')
                  }
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}
