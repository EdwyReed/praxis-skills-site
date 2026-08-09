import { readFileSync, writeFileSync } from 'node:fs'

const path = new URL('../src/docs/content.ts', import.meta.url)
let s = readFileSync(path, 'utf8')

// Evaluate as module is hard; replace string values via unique keys using JSON serialization.
// Load by evaluating the export with a tiny transform.
const js = s
  .replace(/export const docsContent(?::\s*[^=]+)?\s*=\s*/, 'const docsContent = ')
  .replace(/\n\} as const\s*$/, '\n}')
  .replace(/\n\}\s*$/, '\n}\nexport { docsContent }\n')

const tmp = new URL('../src/docs/content.tmp.mjs', import.meta.url)
writeFileSync(tmp, js)

const { docsContent } = await import(tmp.href + '?t=' + Date.now())

const GH = 'https://github.com/EdwyReed/praxis-skills/blob/master'

docsContent['config/mcp'] = `# Configuration: MCP

MCP servers are **optional**. Skills should degrade when tools are missing.

## Policy

Praxis Skills can use Sentry, Context7, OpenAI Docs, GitHub, browser, and Stoplight-related tooling when those integrations are available. They are optional unless a specific workflow needs live external data.

If a dependency is missing, workflow skills should either:

- use filesystem-only fallback behavior, or  
- report the exact missing dependency and the artifact that cannot be produced.

## Common connectors

| Domain | Example | Notes |
|---|---|---|
| Errors | Sentry MCP | Useful for \`$praxis-sentry-triage\` |
| Library docs | Context7 | Library API facts |
| Vendor docs | Platform documentation MCPs | When coding against a vendor API |
| Repo / issues | GitHub MCP | Optional; prefer local git when enough |

## Codex configuration

Add MCP servers in your Codex configuration **without committing secrets**.

Example skeleton (fill commands/URLs/secrets outside the repo):

\`\`\`toml
# ~/.codex/config.toml (example)

model = "gpt-5.5"
model_reasoning_effort = "medium"

[features]
# Optional. Required only when a workflow explicitly asks Codex to use subagents.
multi_agent = true

# [mcp_servers.sentry]
# command = "npx"
# args = ["-y", "@sentry/mcp-server"]

# [mcp_servers.context7]
# command = "npx"
# args = ["-y", "@upstash/context7-mcp"]

# [mcp_servers.openaiDeveloperDocs]
# url = "https://developers.openai.com/mcp"
\`\`\`

Source example in the package:

- [\`.codex/config.example.toml\`](${GH}/.codex/config.example.toml)

## Guidance for agents

1. Prefer repository files and local search first  
2. Use MCP when it improves factual accuracy  
3. Record when a tool was unavailable and how you worked around it  

## Related

- [\`$praxis-sentry-triage\`](/docs/skills/praxis-sentry-triage)
- [\`$praxis-ai-debug\`](/docs/skills/praxis-ai-debug)
- Package how-to: [docs/how/configure-mcp.md](${GH}/docs/how/configure-mcp.md)
`

docsContent['guides/migrate-claude'] = `# Guide: migrate from Claude Code surfaces

The original workflow source used Claude Code slash commands and install symlinks into \`~/.claude\`. That historical checkout installer is obsolete.

Praxis is Codex-first. Claude support is install-time packaging:

- full skill packages under \`~/.claude/skills/praxis-*\` (or project \`.claude/skills\`)
- thin slash adapters under \`commands/\` as **\`/praxis-*\`**

## Install Claude surface

\`\`\`bash
npx praxis-skills@beta install --user --agents claude-code --yes
# interactive:
npx praxis-skills@beta install --user
\`\`\`

Codex in parallel:

\`\`\`bash
npx praxis-skills@beta install --user --agents codex,claude-code --yes
\`\`\`

## Command map

| Slash command (prefixed) | Praxis skill (source of truth) |
|---|---|
| \`/praxis-init\` | \`praxis-init\` |
| \`/praxis-feature\` | \`praxis-feature-flow\` |
| \`/praxis-refine\` | \`praxis-refine\` |
| \`/praxis-research\` | \`praxis-research\` |
| \`/praxis-design\` | \`praxis-design\` |
| \`/praxis-plan\` | \`praxis-plan\` |
| \`/praxis-implement\` | \`praxis-implement\` |
| \`/praxis-docs-suite\` | \`praxis-docs-suite\` |
| \`/praxis-pr\` | \`praxis-pr\` |
| \`/praxis-sentry-triage\` | \`praxis-sentry-triage\` |
| \`/praxis-qa-checklist\` | \`praxis-qa-checklist\` |
| \`/praxis-system-profile\` | \`praxis-system-profile\` |
| \`/praxis-skill-from-git\` | \`praxis-skill-from-git\` |
| \`/praxis-ai-debug\` | \`praxis-ai-debug\` |
| \`/praxis-clear-speech\` | \`praxis-clear-speech\` |

Unprefixed names (\`/init\`, \`/feature\`, …) are **not** installed: they collide with Claude built-ins. The installer removes those legacy adapters when present.

## Rules

1. Prefer \`/praxis-init\` over bare \`/init\`  
2. Slash commands do **not** re-implement workflows; they load the skill package  
3. Codex skill invocation (\`$praxis-*\`) stays first-class  
4. Keep \`.praxis/\` and \`.workflows/\` as the shared truth across agents  
5. Claude Agent Teams map to optional subagents; if unavailable, skills run roles inline  

## Surface comparison

| Concern | Claude-era source | Codex-native port |
|---|---|---|
| Entry point | Slash commands in \`commands/\` | Skills in \`.agents/skills/\` |
| Durable guidance | \`CLAUDE.md\` | \`AGENTS.md\` |
| Agent roles | \`agents/**/*.md\` | \`references/agents/**/*.md\` |
| Multi-agent work | Agent Teams | Optional subagents + inline fallback |
| Install path | \`~/.claude\` symlinks | Repo / user skills / plugin |
| Distribution | Git checkout + symlinks | npm CLI + plugin bundle |

## Source docs in the package

- [docs/how/migrate-from-claude-code.md](${GH}/docs/how/migrate-from-claude-code.md)
- [docs/comparisons/claude-code-vs-codex-surfaces.md](${GH}/docs/comparisons/claude-code-vs-codex-surfaces.md)

## Related

- [Agents](/docs/get-started/agents)
- [Installation](/docs/get-started/installation)
`

docsContent['config/skills-yaml'] = `# Configuration: skills.yaml

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
| \`source.revision\` | Pinned; no floating branches (\`main\`, \`latest\`) |
| \`skills\` | Entrypoints only |
| \`rationale\` | Why required |
| \`applies_when\` | When to check |
| \`overflow_justification\` | After fifth required package |

## Runtime

- Validate + hash with project context  
- Never auto-install  
- Missing required → block only affected work after consent path  
- Missing recommended → report, continue  

## Example: pin Taste Skill (frontend projects)

\`\`\`yaml
schema: praxis-skills/v1

packages:
  - id: leonxlnx-taste-skill
    requirement: recommended
    role: primary-frontend-direction
    source:
      type: git
      url: https://github.com/Leonxlnx/taste-skill
      revision: e988add20dab0fa97d7a76781c48961c8184288e
    skills:
      - design-taste-frontend
    rationale: Default visual direction for marketing and redesign (Taste Skill v2 experimental).
    applies_when: Visually significant frontend design or implementation is in scope.
\`\`\`

Keep the revision in sync with Praxis pin when possible: [distribution/taste-skill.json](${GH}/distribution/taste-skill.json).

## Template in the package

Scaffold comments live in:

- [plugin/skills/praxis-init/assets/skills-template.yaml](${GH}/plugin/skills/praxis-init/assets/skills-template.yaml)

## Related

- [Project context](/docs/concepts/project-context)
- [Taste Skill routing](/docs/concepts/taste-skill)
`

// Expand installation with plugin path + source links
docsContent['get-started/installation'] = docsContent['get-started/installation'].replace(
  `## Uninstall

\`\`\`bash
npx praxis-skills@beta uninstall --user --agents claude-code --yes
npx praxis-skills@beta uninstall --user --dry-run
\`\`\`

Only manifest-owned Praxis paths are removed. Unrelated skills stay.

## Next

- [Quick start](/docs/get-started/quick-start)
- [CLI install reference](/docs/cli/install)
`,
  `## Plugin install (source checkout)

The plugin bundle lives in \`plugin/\` (\`.codex-plugin/plugin.json\` + packaged skills).

\`\`\`powershell
pwsh ./install.ps1 --plugin --dry-run
pwsh ./install.ps1 --plugin
pwsh ./verify-install.ps1
\`\`\`

Writes a local marketplace entry under \`.agents/plugins/marketplace.json\` for repo-local testing.

Source:

- [docs/how/install-as-plugin.md](${GH}/docs/how/install-as-plugin.md)
- [docs/how/install.md](${GH}/docs/how/install.md)

## Uninstall

\`\`\`bash
npx praxis-skills@beta uninstall --user --agents claude-code --yes
npx praxis-skills@beta uninstall --user --dry-run
\`\`\`

Only manifest-owned Praxis paths are removed. Unrelated skills stay.

More detail: [docs/how/uninstall.md](${GH}/docs/how/uninstall.md)

## Next

- [Quick start](/docs/get-started/quick-start)
- [CLI install reference](/docs/cli/install)
`,
)

// architecture package docs line - ensure link
docsContent['concepts/architecture'] = docsContent['concepts/architecture'].replace(
  '| `docs/` | Maintainer and install docs in the package repo |',
  `| \`docs/\` | Maintainer docs in the [package repo](${GH}/docs) |`,
)

// Serialize back
const keys = Object.keys(docsContent)
let out = `/**\n * Full documentation body keyed by navigation slug.\n * Written as Markdown; rendered with react-markdown + GFM.\n */\nexport const docsContent: Record<string, string> = {\n`
for (const key of keys) {
  out += `  ${JSON.stringify(key)}: ${JSON.stringify(docsContent[key])},\n`
}
out += `}\n`

writeFileSync(path, out)
console.log('patched content keys', keys.length)
