# Praxis Skills site

Marketing site for [praxis-skills](https://github.com/EdwyReed/praxis-skills).

## Direction

- Dark, serious UI (closer to tasteskill.dev than craft photography)
- **Remotion** compositions for agent skill sessions (typewriter demos)
- **GSAP** scroll: word scrub; CSS sticky skill rail
- **Human-in-the-loop** gates: direction · design · ship
- Copy: short, concrete, no marketing filler

## Skills applied in this iteration

1. **gpt-taste** — layout variance, hero discipline, motion, ban on meta-labels
2. **writing-clearly-and-concisely** — active voice, omit needless words
3. **remotion-best-practices** — frame-driven `AgentSkillDemo` via `@remotion/player`

## Routes

| Path | Page |
|---|---|
| `/` | Marketing home |
| `/docs` | Docs index → introduction |
| `/docs/*` | Full documentation (Nuxt-style sidebar + TOC) |

## Run

```bash
npm install
npm run dev
```

```bash
npm run build
npm run preview
```

## Stack

Vite · React · TypeScript · Tailwind v4 · React Router · react-markdown · Motion · GSAP · Remotion Player
