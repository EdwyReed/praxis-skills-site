import { readFileSync, writeFileSync } from 'node:fs'

function skillPage(title, purpose, when, writes, steps, human) {
  return `# \`${title}\`

${purpose}

## When to use

${when}

## Writes

${writes}

## Procedure (agent)

${steps}

## Human involvement

${human}

## See also

- [Skills catalog](/docs/skills/catalog)
- [Feature flow](/docs/flow/overview)
`
}

const pages = {
  'skills/catalog': `# Skills catalog

Praxis ships **delivery workflows**, **support workflows**, and **embedded templates**.

## Delivery

| Skill | Purpose |
|---|---|
| \`praxis-init\` | Project direction and skill dependency gate |
| \`praxis-feature-flow\` | Lifecycle orchestration + resume |
| \`praxis-refine\` | Vague request → structured task |
| \`praxis-research\` | AS-IS facts only |
| \`praxis-design\` | Architecture, ADRs, contracts, challenge |
| \`praxis-plan\` | Vertical phases + TDD criteria |
| \`praxis-implement\` | One phase: write, review, gate |
| \`praxis-pr\` | PR from artifacts |
| \`praxis-docs-suite\` | Documentation suite |
| \`praxis-sentry-triage\` | Sentry → grouped tasks |
| \`praxis-qa-checklist\` | Coverage-driven QA lists |
| \`praxis-system-profile\` | Actors, integrations, questions |
| \`praxis-skill-from-git\` | History → project skill |
| \`praxis-ai-debug\` | Install / package health |
| \`praxis-clear-speech\` | Clear writing policy + audit |

## Templates and references

| Skill | Purpose |
|---|---|
| \`praxis-adr-template\` | One ADR per decision |
| \`praxis-api-contracts-template\` | REST / async contracts |
| \`praxis-design-template\` | Architecture / diagram format |
| \`praxis-owasp-top-10\` | OWASP + modern threats |
| \`praxis-security-audit-checklist\` | Security review checklist |
| \`praxis-stoplight-docs\` | Stoplight / SMD docs |
| \`praxis-task-refinement\` | INVEST, story formats |
| \`praxis-tdd-approach\` | Phase TDD contract |
| \`praxis-test-design-techniques\` | EP, BVA, tables, states |

## Invocation

Codex:

\`\`\`text
Use $praxis-research to …
\`\`\`

Claude Code (if installed): \`/praxis-research\`

Each delivery skill has its own page in the sidebar.
`,

  'skills/praxis-init': skillPage(
    '$praxis-init',
    'Initialize, audit, confirm, or refresh project direction and optional external skill dependencies.',
    '- Starting work in a repository\n- Praxis context missing or unconfirmed\n- Direction, design routing, or skill sources changed',
    '- `.praxis/project.md`\n- Optional `.praxis/skills.yaml`\n- Managed block in root `AGENTS.md`',
    '1. Detect new vs existing project\n2. Interview or audit\n3. Draft or refresh profile\n4. Set `needs-confirmation` until user confirms\n5. Validate size and schema\n6. Optionally draft skills.yaml candidates (never auto-install)\n7. Patch AGENTS.md discovery bridge',
    'You must confirm the profile before agents treat it as final for mutations.',
  ),
  'skills/praxis-feature-flow': skillPage(
    '$praxis-feature-flow',
    'Coordinate the complexity-adaptive feature lifecycle with resumable state under `.workflows/{id}/`.',
    '- Multi-phase delivery\n- Need status/resume across sessions\n- Adaptive ceremony',
    '- `.workflows/{feature-id}/state.json`\n- Phase directories for refine/research/design/plan/implement/docs/pr',
    '1. Ensure project context when required\n2. Assess complexity; get path acceptance when needed\n3. Run frontend gate if visual work applies\n4. Execute phases; persist state\n5. Stop at checkpoints\n6. Support status and resume',
    'Design acceptance and ship remain human decisions on non-trivial work.',
  ),
  'skills/praxis-refine': skillPage(
    '$praxis-refine',
    'Turn vague product or engineering requests into structured task contracts.',
    '- Unclear asks from PM or stakeholders\n- Need stories, AC, risks, estimate before design',
    '- Refined task artifact under the feature workflow (or standalone path)',
    '1. Load task-refinement references as needed\n2. Clarify only blocking unknowns\n3. Write user stories / AC / risks / sizing\n4. Do not design solutions yet',
    'Review the refined task before large design investment.',
  ),
  'skills/praxis-research': skillPage(
    '$praxis-research',
    'Produce facts-only AS-IS research before proposing a solution.',
    '- Need codebase truth\n- Before design or risky change',
    '- Research dossier: facts, entrypoints, complexity notes',
    '1. Load research rules\n2. Trace code and configs\n3. Record facts only (no redesign)\n4. List open questions\n5. Assess complexity',
    'Challenge incomplete or solution-shaped research.',
  ),
  'skills/praxis-design': skillPage(
    '$praxis-design',
    'Create architecture, diagrams, ADRs, API contracts, test strategy, and challenge review.',
    '- After research for non-trivial change\n- Before implementation of structural work',
    '- design/architecture.md, diagrams, adr/*, contracts',
    '1. Complete frontend skill gate when applicable\n2. Draft architecture and ADRs\n3. Run challenge review as required\n4. Stop for human checkpoint',
    'Do not allow implement until design is accepted or explicitly waived.',
  ),
  'skills/praxis-plan': skillPage(
    '$praxis-plan',
    'Decompose accepted design into vertical phases with TDD and verification criteria.',
    '- Design accepted\n- Need ordered implementation slices',
    '- plan/overview.md, plan/phase-N.md',
    '1. Read design artifacts\n2. Slice vertical phases\n3. Map dependencies\n4. Attach verification / TDD criteria per phase',
    'Confirm phase boundaries if they affect release planning.',
  ),
  'skills/praxis-implement': skillPage(
    '$praxis-implement',
    'Implement one planned phase with writer, reviewer, and quality-gate responsibilities.',
    '- Phase plan ready\n- Scope clear',
    '- Code + tests + implement reports / review notes',
    '1. Lock scope to the phase\n2. Load primary visual skill when UI applies\n3. TDD-oriented changes\n4. Reviewer / quality-gate pass\n5. Write phase report',
    'Reject silent scope expansion into later phases.',
  ),
  'skills/praxis-pr': skillPage(
    '$praxis-pr',
    'Prepare or create a pull request from workflow artifacts, not chat memory.',
    '- Implementation evidence ready\n- Need reviewable PR',
    '- PR summary, test plan, links to design/research',
    '1. Collect diffs, reports, CI signals\n2. Draft PR body from artifacts\n3. Open draft or ready PR as asked',
    'Merge remains a human (or org policy) decision.',
  ),
  'skills/praxis-docs-suite': skillPage(
    '$praxis-docs-suite',
    'Generate or update technical facts, architecture, OpenAPI, feature docs, and indexes.',
    '- Docs suite missing or stale\n- After significant product change',
    '- docs tree, OpenAPI, .meta.json as applicable',
    '1. Inventory code and existing docs\n2. Update facts and API surfaces\n3. Cross-review packaging when required',
    'Review published docs for accuracy before release notes.',
  ),
  'skills/praxis-sentry-triage': skillPage(
    '$praxis-sentry-triage',
    'Group Sentry issues into actionable tasks that feed refine/feature flow.',
    '- Noisy production errors\n- Need prioritized engineering work',
    '- Triage packets / grouped issue docs',
    '1. Pull recent issues (CLI/API/MCP as available)\n2. Cluster by root cause\n3. Assign severity\n4. Write groups for refine',
    'Confirm P0 before large interrupts.',
  ),
  'skills/praxis-qa-checklist': skillPage(
    '$praxis-qa-checklist',
    'Generate structured QA checklists from features or artifacts using test design techniques.',
    '- Need coverage-driven checklist\n- Before or after implement',
    '- QA checklist markdown',
    '1. Load test design techniques\n2. Apply EP/BVA/tables/states as fit\n3. Write checklist with priorities',
    'Adjust critical path cases for release criteria.',
  ),
  'skills/praxis-system-profile': skillPage(
    '$praxis-system-profile',
    'Describe actors, use cases, integrations, data flows, issues, and open questions.',
    '- Integration landscape unclear\n- Onboarding a complex subsystem',
    '- System profile document',
    '1. Trace integrations and actors\n2. Map flows\n3. List issues and open questions',
    'Use to align stakeholders before big design.',
  ),
  'skills/praxis-skill-from-git': skillPage(
    '$praxis-skill-from-git',
    'Extract real repository conventions from Git history into a project skill.',
    '- Want project-specific patterns grounded in history\n- Not a generic style guide',
    '- `.agents/skills/{project}-patterns/SKILL.md`',
    '1. Sample history\n2. Distill conventions with evidence\n3. Write skill package',
    'Review generated skill before requiring it on the team.',
  ),
  'skills/praxis-ai-debug': skillPage(
    '$praxis-ai-debug',
    'Inspect package, skill, reference, MCP, installation, and workflow health.',
    '- Skill missing in session\n- Install or discovery issues',
    '- Status notes; no mandatory mutation',
    '1. Check install receipts and skill paths\n2. Compare agent homes\n3. Report root cause and fix steps',
    'Usually restart agent after install fixes.',
  ),
  'skills/praxis-clear-speech': skillPage(
    '$praxis-clear-speech',
    'Write or audit clear replies, technical text, code messages, and UI copy.',
    '- Need clear operator-facing text\n- Audit docs or messages',
    '- Revised text; optional audit report',
    '1. Load policy for project mode\n2. Protect identifiers\n3. Rewrite or audit\n4. Optional structural script',
    'See [Clear Speech concept](/docs/concepts/clear-speech).',
  ),
  'skills/templates': `# Templates and references

Embedded skills used by design, security, docs, and planning agents.

| Skill | Use |
|---|---|
| \`praxis-adr-template\` | One-file ADR contract |
| \`praxis-api-contracts-template\` | REST and async message formats |
| \`praxis-design-template\` | Architecture + diagram structure |
| \`praxis-owasp-top-10\` | Vulnerability patterns by tech |
| \`praxis-security-audit-checklist\` | Security review checklist |
| \`praxis-stoplight-docs\` | Stoplight/SMD guidance |
| \`praxis-task-refinement\` | INVEST, stories, sizing |
| \`praxis-tdd-approach\` | Phase TDD sections |
| \`praxis-test-design-techniques\` | EP, BVA, decision tables, states, pairwise |

These are not full delivery orchestrators. Delivery skills load them when needed.
`,

  'cli/overview': `# CLI overview

Binary: \`praxis-skills\` (via \`npx praxis-skills@beta\`)

Zero runtime dependencies. Node 22+.

## Commands

| Command | Purpose |
|---|---|
| \`install\` | Install skills (and optional Taste family) |
| \`doctor\` | Verify installed skills (and Taste if receipt says so) |
| \`uninstall\` | Remove Praxis-owned installs |
| \`detect\` | Detect agent homes |
| \`list\` | List packaged skill names |
| \`version\` | Package version |

## Ownership

The CLI only mutates paths owned by \`distribution/manifest.json\` (and Taste paths when you opted in). Unrelated skills are preserved.

## Next

- [install](/docs/cli/install)
- [doctor · detect · list](/docs/cli/doctor)
`,

  'cli/install': `# CLI: install

\`\`\`bash
praxis-skills install
praxis-skills install --user | --repo [path] | --target <skills-dir>
                      [--agents <id,id|all>] [--all-agents]
                      [--with-slash-commands | --no-slash-commands]
                      [--with-taste-skill | --no-taste-skill]
                      [--commands-target <dir>]
                      [--force] [--dry-run] [--yes] [--json]
\`\`\`

## Interactive default

On a TTY with no target flags, the guided wizard runs:

1. Scope: user vs repo  
2. Agents: multi-select  
3. Taste Skill family: **default no**  
4. Plan + confirm  

## Non-interactive

Without \`--agents\`, installs **Codex only** (backward compatible).

\`\`\`bash
npx praxis-skills@beta install --user --yes
npx praxis-skills@beta install --user --agents codex,claude-code --yes
npx praxis-skills@beta install --user --with-taste-skill --force --yes
\`\`\`

## Replace policy

Existing Praxis skill directories are **skipped** unless \`--force\`. Force needs confirm or \`--yes\`.

## Receipts

Writes install receipt (e.g. \`praxis-skills.json\`) under the agent root when applicable, including optional \`tasteSkill\` metadata.
`,

  'cli/doctor': `# CLI: doctor · detect · list · version

## doctor

\`\`\`bash
npx praxis-skills@beta doctor --user
npx praxis-skills@beta doctor --user --agents codex,claude-code --json
\`\`\`

Checks each expected Praxis skill \`SKILL.md\`. If a receipt claims Taste Skill was installed, verifies the Taste family too.

Exit code 1 when unhealthy.

## detect

\`\`\`bash
npx praxis-skills@beta detect
npx praxis-skills@beta detect --json
\`\`\`

Filesystem detection of agent homes. No install.

## list

\`\`\`bash
npx praxis-skills@beta list --json
\`\`\`

Exact skill names owned by the distribution manifest.

## version

\`\`\`bash
npx praxis-skills@beta version
\`\`\`
`,

  'cli/uninstall': `# CLI: uninstall

\`\`\`bash
npx praxis-skills@beta uninstall --user --yes
npx praxis-skills@beta uninstall --user --agents claude-code --dry-run
npx praxis-skills@beta uninstall --repo . --agents codex --yes
\`\`\`

Removes:

- Praxis skill directories from the manifest (and legacy names when present)
- Slash adapters Praxis owns
- Install receipt when applicable

Does **not** delete unrelated skills. Prefer \`--dry-run\` first on multi-agent machines.

Project files (\`.praxis/\`, \`.workflows/\`) are **not** removed by uninstall.
`,

  'cli/taste-skill': `# CLI: Taste Skill flag

## Flag

| Flag | Default | Meaning |
|---|---|---|
| \`--with-taste-skill\` | off | Install full pinned Taste family into each selected agent skills root |
| \`--no-taste-skill\` | (explicit off) | Skip |

Wizard asks with default **no**.

## Mechanism

1. Read \`distribution/taste-skill.json\`  
2. \`git clone\` + checkout pinned revision  
3. Copy each \`skills/{folder}\` to install name directory  
4. Write \`praxis-taste-skill.json\` pin note when agent root exists  
5. Record \`tasteSkill\` on install receipt  

Requires **git** on PATH.

## Doctor

Taste checks run only when \`receipt.tasteSkill.installed\` is true.

## Policy reminder

Missing Taste Skill must not block workflows. Present applicable skills must be used. See [Taste Skill routing](/docs/concepts/taste-skill).
`,

  'config/project-md': `# Configuration: project.md

Path: \`.praxis/project.md\`

## Frontmatter (typical)

\`\`\`yaml
---
schema: praxis-project/v1
status: needs-confirmation # or confirmed
project_id: my-project
project_type: new # or existing
source: interview # audit | refresh
visual_scope: none # limited | significant
clear_speech: default # strict | off
updated: YYYY-MM-DD
---
\`\`\`

## Body sections

- Core Contract (compact)  
- Project Concept  
- Product Direction  
- Experience Direction  
- Communication Profile  
- Design Skill Routing  
- Reference Designs and Projects  
- Existing System and Assets  
- Constraints and Non-Negotiables  
- Open Questions  
- Confirmation  

## Design skill routing

One primary visual skill or \`none\`. Supplements listed separately. Conflicting style primaries prohibited.

## Validation

Run the init validator script. Enforce word limits. Record SHA-256 in workflow state.

See [Project context](/docs/concepts/project-context).
`,

  'config/skills-yaml': `# Configuration: skills.yaml

Path: \`.praxis/skills.yaml\` (optional)

## Schema

\`schema: praxis-skills/v1\`

## Package fields

| Field | Rule |
|---|---|
| \`id\` | Unique kebab-case |
| \`requirement\` | \`required\` or \`recommended\` only |
| \`role\` | Unique project responsibility |
| \`source.type\` | git / marketplace / website / local-generation |
| \`source.url\` | HTTPS when applicable |
| \`source.revision\` | Pinned; no floating branches |
| \`skills\` | Entrypoints only |
| \`rationale\` | Why required |
| \`applies_when\` | When to check |
| \`overflow_justification\` | After fifth required package |

## Runtime

- Validate + hash with project context  
- Never auto-install  
- Missing required → block only affected work after consent path  
- Missing recommended → report, continue  

See comments in package \`skills-template.yaml\` for a pinned Taste Skill example.
`,

  'config/agents-md': `# Configuration: AGENTS.md

Root \`AGENTS.md\` receives a **managed Praxis block** from \`$praxis-init\`.

## Purpose

Make project context discoverable in Codex when:

- Praxis skills are not installed  
- Session context is heavily loaded  

## Behavior

- Instructs agents to read \`.praxis/project.md\` before project-scoped work  
- Notes \`needs-confirmation\` limits  
- Mentions optional \`.praxis/skills.yaml\` without loading package lists eagerly  

## Editing

Do not hand-edit the managed markers if you rely on init refresh. Keep project-specific agent rules outside the managed block.
`,

  'config/mcp': `# Configuration: MCP

MCP servers are **optional**. Skills should degrade when tools are missing.

## Common optional connectors

| Domain | Examples |
|---|---|
| Errors | Sentry |
| Library docs | Context7 |
| Vendor docs | Platform documentation MCPs |

## Guidance

1. Prefer repository files and local search first  
2. Use MCP when it improves factual accuracy  
3. Record when a tool was unavailable and how you worked around it  

See package doc \`docs/how/configure-mcp.md\` on GitHub for environment-specific setup.
`,

  'guides/first-feature': `# Guide: first feature

## Goal

Ship one small-to-medium feature with Praxis artifacts and checkpoints.

## Steps

1. **Install** Praxis on your agent (Codex recommended).  
2. **Init** project context; confirm \`.praxis/project.md\`.  
3. **Feature flow** (or refine → research manually).  
4. Accept complexity path.  
5. Complete research; challenge solutions in research.  
6. Design; **you** accept or amend.  
7. Plan phases.  
8. Implement **one** phase; run tests.  
9. PR from artifacts.  
10. Merge when satisfied.

## Tips

- Name skills explicitly in prompts  
- Commit workflow artifacts that carry decisions  
- Restart agent after install  
- Prefer resume over re-explaining chat history  

## Next

- [Quick start](/docs/get-started/quick-start)
- [Feature flow](/docs/flow/overview)
`,

  'guides/frontend': `# Guide: frontend work

## Checklist

1. Confirm \`visual_scope\` in project.md  
2. Select one primary visual skill (often \`design-taste-frontend\`)  
3. If missing, agent offers Taste install; missing does **not** block non-visual prep  
4. Load the skill before visual design/code  
5. Record selection in state/design/plan  
6. Keep technical skills as supplements only  

## Install Taste with Praxis

\`\`\`bash
npx praxis-skills@beta install --user --with-taste-skill --yes
\`\`\`

## Out of Taste scope

Dashboards, dense admin, games: do not force Taste. Use product design system + engineering skills.

## See

- [Taste Skill routing](/docs/concepts/taste-skill)
- [$praxis-design](/docs/skills/praxis-design)
`,

  'guides/migrate-claude': `# Guide: migrate from Claude Code surfaces

Praxis is Codex-first. Claude support is via:

- Skills in \`~/.claude/skills\`  
- Thin \`/praxis-*\` command adapters  

## Steps

1. Install with \`--agents claude-code\`  
2. Prefer \`/praxis-init\` over bare \`/init\`  
3. Do not maintain forked workflow text in command files  
4. Keep repository \`.praxis\` and \`.workflows\` as the shared truth with Codex users  

Package docs: \`docs/how/migrate-from-claude-code.md\` on GitHub for deeper surface comparison.
`,

  'guides/uninstall': `# Guide: uninstall

\`\`\`bash
npx praxis-skills@beta uninstall --user --yes
npx praxis-skills@beta uninstall --repo . --agents codex,claude-code --yes
\`\`\`

## What remains

- Your \`.praxis/\` and \`.workflows/\` project files (not removed by uninstall)  
- Unrelated skills in the same home  

Delete project Praxis files manually if you want a full cleanse (careful: project data).

## Taste Skill

If you installed Taste via \`--with-taste-skill\`, those install-name directories may still exist under the agent skills root. Remove them explicitly if you no longer want them.
`,
}

const path = new URL('../src/docs/content.ts', import.meta.url)
let s = readFileSync(path, 'utf8')
// Remove trailing `} as const` or final `}`
s = s.replace(/\n\} as const\s*$/, '\n')
s = s.replace(/\n\}\s*$/, '\n')

let extra = ''
for (const [key, value] of Object.entries(pages)) {
  extra += `  ${JSON.stringify(key)}: ${JSON.stringify(value)},\n`
}
s = s.trimEnd()
if (!s.endsWith(',')) s += ','
s += `\n${extra}}\n`

writeFileSync(path, s)
console.log('written entries:', Object.keys(pages).length)
