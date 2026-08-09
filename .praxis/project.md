---
schema: praxis-project/v1
status: needs-confirmation
project_id: praxis-skills-site
project_type: existing
source: audit
visual_scope: significant
clear_speech: default
updated: 2026-08-09
---

# Core Contract

**Concept:** Marketing and documentation site for Praxis Skills. It explains the package, shows realistic agent skill sessions, documents install and workflow concepts, and drives people to the npm CLI and GitHub package without becoming a product runtime.

**Primary outcomes:** Credible dark product marketing for Praxis Skills; full Nuxt-style docs that stay accurate to the package; Remotion demos that read as real agent tool sessions, not stock motion; explicit human-in-the-loop story (direction · design · ship).

**Experience:** Dark, serious, restrained; short concrete copy; motion that supports meaning; sticky skill atlas and scroll-driven idea section; demos play once without loop rewind; docs are usable and self-contained.

**Avoid:** Generic AI landing clichés, craft-photo vibe, marketing filler, looping demo rewinds that break immersion, path-only GitHub stubs in docs, soft sticky columns broken by overflow ancestors.

**Non-negotiables:** Site remains a separate repository from `praxis-skills`; product claims must match the package; one primary visual skill for art direction; no silent invention of package APIs or install flags; build must stay TypeScript-clean.

**Design route:** Primary visual skill: `gpt-taste` (layout variance, hero discipline, motion, anti meta-labels). Technical supplements: `remotion-best-practices` for demos; `writing-clearly-and-concisely` for English copy. Taste family (`design-taste-frontend`) remains the recommended installable primary for broader frontend work; this site’s shipped direction is the gpt-taste variant of Taste Skill.

**Communication:** Praxis Clear Speech `default`. Marketing and brand voice stay short and concrete; docs use clear technical English.

## Project Concept

`praxis-skills-site` is the public web surface for [praxis-skills](https://github.com/EdwyReed/praxis-skills). Audience: engineers and teams evaluating or installing Praxis Skills for Codex-first delivery workflows.

The site is not the workflow package. It markets and documents the package. Canonical product behavior lives in the `praxis-skills` repository.

## Product Direction

### Active directions

- Keep a dark, serious marketing home closer to tasteskill.dev than stock craft photography.
- Explain Praxis as artifact-driven, human-gated engineering workflow—not magical orchestration.
- Ship Remotion `@remotion/player` compositions that show realistic skill sessions (tool calls, terminals, status lines).
- Maintain a full documentation tree under `/docs` (sidebar + TOC + markdown content).
- Cover Taste Skill routing honestly: Praxis routes and can install Taste; it does not ship Taste inside the default npm payload unless the user opts in.
- Keep install CTAs aligned with the current beta npm path (`npx praxis-skills@beta …`).
- Preserve independent Praxis project context in this repository (not shared with the package repo).

### Non-goals

- Hosting the workflow runtime, skill installer logic, or package release pipeline.
- Becoming a general design-system library or multi-product marketing platform.
- Auto-generating docs from the package on every build (content is curated in-repo for now).
- Claiming agent compatibility beyond what the package has verified.

## Experience Direction

| Dimension | Desired | Avoid |
|-----------|---------|-------|
| Visual tone | Dark, serious, editorial-tech | Bright SaaS templates, stock photos, rainbow gradients |
| Copy | Short, concrete, operational | Hype, empty benefit lists, vague “AI-powered” claims |
| Motion | GSAP scroll with purpose; Remotion demos that finish once | Infinite loop rewind, decorative motion without meaning |
| Layout | Sticky skill rail, stretch grid columns, readable docs | Broken sticky from overflow-x-hidden ancestors; cramped docs chrome |
| Trust | Real commands, real GitHub blob links, honest HITL limits | Path stubs without URLs; overstated automation |

## Communication Profile

| Field | Selection | Notes |
|-------|-----------|-------|
| Praxis Clear Speech | default | Core rules on replies, docs, human-readable code, UI copy |
| English technical profile | automatic | On technical English; marketing stays concise and concrete |
| Code and UI surfaces | comments, messages, help, and interface copy | Protect package names, install flags, exact external text |
| Explicit style overrides | marketing landing voice | Short active sentences; no meta-labels in the UI |
| Project glossary | None confirmed | Prefer package terms: Praxis Skills, project.md, skills.yaml, HITL |

## Design Skill Routing

| Role | Selection | Rationale |
|------|-----------|-----------|
| Visual scope | significant | Marketing site + motion demos + docs chrome |
| Primary visual skill | `gpt-taste` | Shipped iteration used this Taste variant for layout, hero, and motion discipline |
| Technical supplements | `remotion-best-practices`; `writing-clearly-and-concisely` | Frame-driven demos; English prose quality |
| Explicit-only styles | `design-taste-frontend` (v2 experimental) as family default when switching primary | Prefer one primary at a time; pin via `.praxis/skills.yaml` |
| Prohibited combinations | Multiple competing style primaries at once; Superpowers lifecycle as site process authority | Conflicting art direction; wrong lifecycle for a marketing repo |

## Reference Designs and Projects

| Reference | URL or project path | Borrow | Avoid | Evidence |
|-----------|---------------------|--------|-------|----------|
| Taste Skill product site | https://www.tasteskill.dev/ | Dark serious product marketing density | Copying layout literally | Active public reference; README direction |
| Praxis Skills package | https://github.com/EdwyReed/praxis-skills | Commands, skill names, install flags, concepts | Inventing APIs not in the package | Sibling product repository |
| Taste Skill routing pin | Package `distribution/taste-skill.json` | Revision and install names for optional family | Floating branch pins | Package distribution contract |
| Nuxt-style docs pattern | In-repo `/docs` layout (sidebar + TOC) | Navigation density and scroll behavior | Over-designed docs chrome | Shipped docs pages |

## Existing System and Assets

| Asset or system | Canonical location | Role |
|-----------------|--------------------|------|
| App shell and routes | `src/App.tsx`, `src/pages/` | Home + docs router |
| Marketing sections | `src/components/` | Hero, Idea, HumanLoop, TasteSkill, SkillAtlas, Install, etc. |
| Skill demo data | `src/data/skills.ts` | Per-skill demo scripts for Remotion |
| Remotion composition | `src/remotion/AgentSkillDemo.tsx` | Frame-driven agent session player |
| Docs content | `src/docs/content.ts`, `src/docs/navigation.ts` | Inlined markdown + nav tree |
| Docs UI | `src/components/docs/` | Sidebar, TOC, markdown render |
| Static images | `public/images/` | Hero and section stills |
| Tooling scripts | `scripts/` | Docs content maintenance helpers |
| Build | Vite 7, React 19, Tailwind 4, TypeScript | Dev and production build |
| Package product | Sibling `praxis-skills` repo | Canonical workflow package |

## Constraints and Non-Negotiables

- Keep this repository independent from `praxis-skills`; do not merge packaging or skill sources into the site.
- Product claims, install commands, and skill names must match the current package release (beta channel until stated otherwise).
- Prefer honest HITL language: direction, design, and ship remain human decisions on non-trivial work.
- Remotion demos play once; do not reintroduce seamless loop rewind without an explicit product decision.
- Sticky layout must not reintroduce ancestor `overflow-x-hidden` that clips sticky descendants; use clip-based overflow patterns instead.
- Do not invent GitHub paths or package flags; use real blob URLs and verified CLI surfaces.
- Keep `clear_speech: default` unless the owner switches mode.
- Run `npm run build` before claiming site completion for visual or docs changes.
- Do not auto-install external skill packages; missing recommended Taste Skill is reported, not silently fixed.

## Open Questions

- Should docs content later sync from the package repository, or stay curated only in this site?
- What production host and domain will publish the site (static host, custom domain)?
- When the package leaves beta, how should install CTAs and version badges update?
- Should analytics, SEO metadata, and social cards be expanded before a public launch push?

## Confirmation

| Field | Value |
|-------|-------|
| Status | needs-confirmation |
| Confirmed by | — |
| Confirmed on | — |
| Material corrections | Audited from shipped site, README direction, and sibling package contracts. Awaiting owner confirmation of Core Contract, design route (`gpt-taste` primary), and open questions. |
