export type DocsNavItem = {
  title: string
  slug: string
}

export type DocsNavGroup = {
  title: string
  items: DocsNavItem[]
}

/** Nuxt-style grouped sidebar. First item is the docs home. */
export const docsNavigation: DocsNavGroup[] = [
  {
    title: 'Get started',
    items: [
      { title: 'Introduction', slug: 'get-started/introduction' },
      { title: 'Installation', slug: 'get-started/installation' },
      { title: 'Quick start', slug: 'get-started/quick-start' },
      { title: 'Agents', slug: 'get-started/agents' },
    ],
  },
  {
    title: 'Concepts',
    items: [
      { title: 'Architecture', slug: 'concepts/architecture' },
      { title: 'Project context', slug: 'concepts/project-context' },
      { title: 'Artifacts & workflows', slug: 'concepts/artifacts' },
      { title: 'Human checkpoints', slug: 'concepts/human-checkpoints' },
      { title: 'Complexity paths', slug: 'concepts/complexity' },
      { title: 'Taste Skill routing', slug: 'concepts/taste-skill' },
      { title: 'Clear Speech', slug: 'concepts/clear-speech' },
    ],
  },
  {
    title: 'Feature flow',
    items: [
      { title: 'Overview', slug: 'flow/overview' },
      { title: 'Phases', slug: 'flow/phases' },
      { title: 'State schema', slug: 'flow/state' },
      { title: 'Resume & status', slug: 'flow/resume' },
    ],
  },
  {
    title: 'Skills',
    items: [
      { title: 'Skills catalog', slug: 'skills/catalog' },
      { title: '$praxis-init', slug: 'skills/praxis-init' },
      { title: '$praxis-feature-flow', slug: 'skills/praxis-feature-flow' },
      { title: '$praxis-refine', slug: 'skills/praxis-refine' },
      { title: '$praxis-research', slug: 'skills/praxis-research' },
      { title: '$praxis-design', slug: 'skills/praxis-design' },
      { title: '$praxis-plan', slug: 'skills/praxis-plan' },
      { title: '$praxis-implement', slug: 'skills/praxis-implement' },
      { title: '$praxis-pr', slug: 'skills/praxis-pr' },
      { title: '$praxis-docs-suite', slug: 'skills/praxis-docs-suite' },
      { title: '$praxis-sentry-triage', slug: 'skills/praxis-sentry-triage' },
      { title: '$praxis-qa-checklist', slug: 'skills/praxis-qa-checklist' },
      { title: '$praxis-system-profile', slug: 'skills/praxis-system-profile' },
      { title: '$praxis-skill-from-git', slug: 'skills/praxis-skill-from-git' },
      { title: '$praxis-ai-debug', slug: 'skills/praxis-ai-debug' },
      { title: '$praxis-clear-speech', slug: 'skills/praxis-clear-speech' },
      { title: 'Templates & references', slug: 'skills/templates' },
    ],
  },
  {
    title: 'CLI',
    items: [
      { title: 'CLI overview', slug: 'cli/overview' },
      { title: 'install', slug: 'cli/install' },
      { title: 'doctor · detect · list', slug: 'cli/doctor' },
      { title: 'uninstall', slug: 'cli/uninstall' },
      { title: 'Taste Skill flag', slug: 'cli/taste-skill' },
    ],
  },
  {
    title: 'Configuration',
    items: [
      { title: 'project.md', slug: 'config/project-md' },
      { title: 'skills.yaml', slug: 'config/skills-yaml' },
      { title: 'AGENTS.md', slug: 'config/agents-md' },
      { title: 'MCP', slug: 'config/mcp' },
    ],
  },
  {
    title: 'Guides',
    items: [
      { title: 'First feature', slug: 'guides/first-feature' },
      { title: 'Frontend work', slug: 'guides/frontend' },
      { title: 'Migrate from Claude Code', slug: 'guides/migrate-claude' },
      { title: 'Uninstall', slug: 'guides/uninstall' },
    ],
  },
]

export function flattenDocsNav() {
  return docsNavigation.flatMap((group) => group.items)
}

export function getDocsNavNeighbors(slug: string) {
  const flat = flattenDocsNav()
  const index = flat.findIndex((item) => item.slug === slug)
  return {
    prev: index > 0 ? flat[index - 1] : null,
    next: index >= 0 && index < flat.length - 1 ? flat[index + 1] : null,
  }
}
