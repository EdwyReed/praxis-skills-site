/**
 * Demo lines mirror real agent UIs (Codex / Claude Code / Cursor):
 * user message → tool calls → short results → assistant prose.
 */
export type SkillDemoLine = {
  kind: 'user' | 'assistant' | 'tool' | 'result'
  /** Main text (path, message body, result summary). */
  text: string
  /** Tool name for kind=tool (Read, Grep, Write, Bash, …). */
  name?: string
}

export type Skill = {
  id: string
  title: string
  summary: string
  writes: string
  prompt: string
  /** cwd shown in the fake terminal chrome */
  cwd: string
  demo: SkillDemoLine[]
  group: 'delivery' | 'support'
}

export type ReferenceSkill = {
  id: string
  title: string
  body: string
}

export const skills: Skill[] = [
  {
    id: 'praxis-init',
    title: '$praxis-init',
    summary: 'Confirm project direction before the first mutation.',
    writes: '.praxis/project.md · AGENTS.md bridge',
    prompt: 'Run $praxis-init on this repo. Draft project direction, do not edit code yet.',
    cwd: '~/work/ledger-api',
    demo: [
      {
        kind: 'user',
        text: 'Run $praxis-init. Draft project direction. Do not edit application code.',
      },
      {
        kind: 'assistant',
        text: 'Loading praxis-init. Checking for an existing profile and AGENTS.md.',
      },
      { kind: 'tool', name: 'Read', text: '.praxis/project.md' },
      { kind: 'result', text: 'Error: ENOENT' },
      { kind: 'tool', name: 'Read', text: 'AGENTS.md' },
      { kind: 'result', text: 'ok · 86 lines · no praxis bootstrap block' },
      { kind: 'tool', name: 'Bash', text: 'git log --oneline -12 && ls -la' },
      {
        kind: 'result',
        text: '12 commits · package.json, src/, docs/, .github/',
      },
      {
        kind: 'assistant',
        text: 'Drafting .praxis/project.md with status needs-confirmation. No repo mutations until you confirm.',
      },
      {
        kind: 'tool',
        name: 'Write',
        text: '.praxis/project.md',
      },
      {
        kind: 'result',
        text: 'wrote 1.9k · status: needs-confirmation · visual_scope: none',
      },
    ],
    group: 'delivery',
  },
  {
    id: 'praxis-feature',
    title: '$praxis-feature',
    summary: 'Run the lifecycle with resume and human checkpoints.',
    writes: '.workflows/{id}/ state + phase files',
    prompt: 'Use $praxis-feature for account recovery. Resume if state already exists.',
    cwd: '~/work/ledger-api',
    demo: [
      {
        kind: 'user',
        text: '$praxis-feature for account recovery. Prefer resume if we already started.',
      },
      { kind: 'tool', name: 'Glob', text: '.workflows/**/state.json' },
      {
        kind: 'result',
        text: '.workflows/042-account-recovery/state.json',
      },
      {
        kind: 'tool',
        name: 'Read',
        text: '.workflows/042-account-recovery/state.json',
      },
      {
        kind: 'result',
        text: 'phase.research=done · design=in_progress · implement=pending',
      },
      {
        kind: 'assistant',
        text: 'Resuming 042-account-recovery. Design is open. I will not start implement until design is accepted.',
      },
      {
        kind: 'tool',
        name: 'Read',
        text: '.workflows/042-account-recovery/design/architecture.md',
      },
      {
        kind: 'result',
        text: 'ok · open questions: 2 · status: needs human review',
      },
    ],
    group: 'delivery',
  },
  {
    id: 'praxis-refine',
    title: '$praxis-refine',
    summary: 'Turn a vague request into a task contract.',
    writes: 'stories · acceptance criteria · risks',
    prompt: 'Users say onboarding feels slow. Turn that into a refined task.',
    cwd: '~/work/ledger-api',
    demo: [
      {
        kind: 'user',
        text: 'Users say onboarding feels slow. Refine into stories + risks. Do not design yet.',
      },
      {
        kind: 'assistant',
        text: 'Using praxis-refine. I will ask only what blocks a usable contract, then write the artifact.',
      },
      {
        kind: 'tool',
        name: 'Grep',
        text: 'onboard|signup|welcome path:src,docs',
      },
      {
        kind: 'result',
        text: 'docs/onboarding.md · src/auth/signup.ts · 4 hits',
      },
      {
        kind: 'assistant',
        text: 'Assumptions: web signup only, no SSO in scope. Writing refined-task.md for your review.',
      },
      {
        kind: 'tool',
        name: 'Write',
        text: '.workflows/051-onboarding-speed/refine/refined-task.md',
      },
      {
        kind: 'result',
        text: '3 stories · 5 AC · risks: analytics lag, email deliverability · size M',
      },
    ],
    group: 'delivery',
  },
  {
    id: 'praxis-research',
    title: '$praxis-research',
    summary: 'Record AS-IS facts. Do not invent a solution yet.',
    writes: 'research dossier under .workflows/',
    prompt: 'How are report totals calculated today? Facts only.',
    cwd: '~/work/ledger-api',
    demo: [
      {
        kind: 'user',
        text: '$praxis-research: how are monthly report totals calculated? Facts only, no redesign.',
      },
      {
        kind: 'tool',
        name: 'Read',
        text: '.agents/skills/praxis-research/SKILL.md',
      },
      { kind: 'result', text: 'ok · AS-IS research · no solution proposals' },
      {
        kind: 'tool',
        name: 'Grep',
        text: 'computeTotal|reportTotals|aggregate path:src',
      },
      {
        kind: 'result',
        text: 'src/reports/aggregate.ts:18 · src/billing/totals.ts:41',
      },
      { kind: 'tool', name: 'Read', text: 'src/reports/aggregate.ts' },
      {
        kind: 'result',
        text: '124 lines · computeReportTotals() sums line items after tax filter',
      },
      {
        kind: 'tool',
        name: 'Write',
        text: '.workflows/019-report-totals/research/facts.md',
      },
      {
        kind: 'result',
        text: 'wrote facts + entrypoints · complexity: medium · open questions: 1',
      },
    ],
    group: 'delivery',
  },
  {
    id: 'praxis-design',
    title: '$praxis-design',
    summary: 'Produce architecture you can review and reject.',
    writes: 'diagrams · ADRs · contracts',
    prompt: 'Design the approved notification change. Stop before code.',
    cwd: '~/work/ledger-api',
    demo: [
      {
        kind: 'user',
        text: 'Design the notification change we accepted in refine. Checkpoint before implement.',
      },
      {
        kind: 'tool',
        name: 'Read',
        text: '.workflows/033-notifications/research/facts.md',
      },
      { kind: 'result', text: 'ok · current: sync mailer in API request path' },
      {
        kind: 'assistant',
        text: 'Frontend gate: not applicable (API-only). Drafting architecture + one ADR for async dispatch.',
      },
      {
        kind: 'tool',
        name: 'Write',
        text: '.workflows/033-notifications/design/architecture.md',
      },
      {
        kind: 'tool',
        name: 'Write',
        text: '.workflows/033-notifications/design/adr/001-async-dispatch.md',
      },
      {
        kind: 'assistant',
        text: 'Design ready for review. I will not open implement until you accept or amend the ADR.',
      },
    ],
    group: 'delivery',
  },
  {
    id: 'praxis-plan',
    title: '$praxis-plan',
    summary: 'Split design into vertical phases with verification.',
    writes: 'phase plan · TDD criteria',
    prompt: 'Break the accepted design into phases with verification.',
    cwd: '~/work/ledger-api',
    demo: [
      {
        kind: 'user',
        text: 'Design accepted. $praxis-plan into vertical phases with TDD checks.',
      },
      {
        kind: 'tool',
        name: 'Read',
        text: '.workflows/033-notifications/design/architecture.md',
      },
      { kind: 'result', text: 'ok · target: queue + worker · rollback: feature flag' },
      {
        kind: 'assistant',
        text: 'Four phases. Phase 2 depends on the outbox table from phase 1.',
      },
      {
        kind: 'tool',
        name: 'Write',
        text: '.workflows/033-notifications/plan/overview.md',
      },
      {
        kind: 'tool',
        name: 'Write',
        text: '.workflows/033-notifications/plan/phase-02.md',
      },
      {
        kind: 'result',
        text: 'overview + phase-02 · verify: unit + contract tests listed',
      },
    ],
    group: 'delivery',
  },
  {
    id: 'praxis-implement',
    title: '$praxis-implement',
    summary: 'Implement one phase: write, review, gate.',
    writes: 'code · review notes · gate evidence',
    prompt: 'Implement phase 2 only. Stay inside the plan.',
    cwd: '~/work/ledger-api',
    demo: [
      {
        kind: 'user',
        text: '$praxis-implement phase 2 only. Do not start phase 3.',
      },
      {
        kind: 'tool',
        name: 'Read',
        text: '.workflows/033-notifications/plan/phase-02.md',
      },
      {
        kind: 'result',
        text: 'scope: worker consumer · tests: src/workers/notify.test.ts',
      },
      {
        kind: 'tool',
        name: 'Bash',
        text: 'npm test -- src/workers/notify.test.ts',
      },
      { kind: 'result', text: 'FAIL  0/3 · missing consumer module' },
      {
        kind: 'tool',
        name: 'ApplyPatch',
        text: 'src/workers/notify.ts (+ tests)',
      },
      { kind: 'result', text: 'patched 2 files' },
      {
        kind: 'tool',
        name: 'Bash',
        text: 'npm test -- src/workers/notify.test.ts',
      },
      { kind: 'result', text: 'PASS  3/3' },
      {
        kind: 'tool',
        name: 'Write',
        text: '.workflows/033-notifications/implement/phase-02-report.md',
      },
    ],
    group: 'delivery',
  },
  {
    id: 'praxis-pr',
    title: '$praxis-pr',
    summary: 'Open a PR from artifacts, not chat memory.',
    writes: 'PR body · test plan · evidence links',
    prompt: 'Prepare the PR for phase 2 from workflow artifacts.',
    cwd: '~/work/ledger-api',
    demo: [
      {
        kind: 'user',
        text: 'Prepare a PR for phase 2. Pull summary from workflow artifacts, not chat history.',
      },
      { kind: 'tool', name: 'Bash', text: 'git status && git diff --stat' },
      {
        kind: 'result',
        text: '4 files changed · +182/-11 · branch feat/notify-worker',
      },
      {
        kind: 'tool',
        name: 'Read',
        text: '.workflows/033-notifications/implement/phase-02-report.md',
      },
      { kind: 'result', text: 'ok · tests PASS · open follow-ups: none' },
      {
        kind: 'tool',
        name: 'Bash',
        text: 'gh pr create --draft --title "feat: notification worker (phase 2)" --body-file …',
      },
      {
        kind: 'result',
        text: 'https://github.com/acme/ledger-api/pull/884 · draft',
      },
    ],
    group: 'delivery',
  },
  {
    id: 'praxis-docs-suite',
    title: '$praxis-docs-suite',
    summary: 'Build or refresh the documentation suite.',
    writes: 'facts · architecture · OpenAPI · indexes',
    prompt: 'Update docs for the new billing endpoints.',
    cwd: '~/work/ledger-api',
    demo: [
      {
        kind: 'user',
        text: 'Update the docs suite for the new /v1/billing/* endpoints.',
      },
      {
        kind: 'tool',
        name: 'Grep',
        text: 'router\\.(get|post).*billing path:src',
      },
      {
        kind: 'result',
        text: 'src/routes/billing.ts · 6 handlers',
      },
      {
        kind: 'tool',
        name: 'Read',
        text: 'docs/openapi/billing.yaml',
      },
      { kind: 'result', text: 'stale · missing POST /v1/billing/invoices/{id}/void' },
      {
        kind: 'tool',
        name: 'ApplyPatch',
        text: 'docs/openapi/billing.yaml',
      },
      {
        kind: 'tool',
        name: 'Write',
        text: 'docs/.meta.json',
      },
      { kind: 'result', text: 'openapi updated · meta hash refreshed' },
    ],
    group: 'support',
  },
  {
    id: 'praxis-sentry-triage',
    title: '$praxis-sentry-triage',
    summary: 'Group Sentry noise into tasks you can schedule.',
    writes: 'triage packets for refine / feature',
    prompt: 'Triage last 48h of production errors into groups.',
    cwd: '~/work/ledger-api',
    demo: [
      {
        kind: 'user',
        text: 'Triage Sentry for the last 48h. Group into actionable tasks.',
      },
      {
        kind: 'tool',
        name: 'Bash',
        text: 'sentry-cli issues list --query "is:unresolved age:-48h" --limit 50',
      },
      {
        kind: 'result',
        text: '47 issues · top: TypeError in totals.ts · Stripe webhook 401',
      },
      {
        kind: 'assistant',
        text: 'Collapsing to 4 groups. One P0 on report totals. Writing triage packet.',
      },
      {
        kind: 'tool',
        name: 'Write',
        text: '.workflows/from-sentry/2026-08-09/groups.md',
      },
      {
        kind: 'result',
        text: '4 groups · P0:1 · P1:2 · P2:1 · ready for $praxis-refine',
      },
    ],
    group: 'support',
  },
  {
    id: 'praxis-qa-checklist',
    title: '$praxis-qa-checklist',
    summary: 'Generate coverage-driven QA checklists.',
    writes: 'structured checklist',
    prompt: 'QA checklist for checkout with coupons.',
    cwd: '~/work/ledger-api',
    demo: [
      {
        kind: 'user',
        text: 'Generate a QA checklist for checkout with percent and fixed coupons.',
      },
      {
        kind: 'tool',
        name: 'Read',
        text: 'docs/features/checkout.md',
      },
      { kind: 'result', text: 'ok · states: cart → pay → confirm · coupons: 2 types' },
      {
        kind: 'assistant',
        text: 'Applying EP + BVA + decision table. No code changes.',
      },
      {
        kind: 'tool',
        name: 'Write',
        text: '.workflows/060-checkout-coupons/qa/checklist.md',
      },
      {
        kind: 'result',
        text: '28 cases · critical path: 9 · negative: 11 · edge: 8',
      },
    ],
    group: 'support',
  },
  {
    id: 'praxis-system-profile',
    title: '$praxis-system-profile',
    summary: 'Map actors, integrations, and open questions.',
    writes: 'system profile artifact',
    prompt: 'Profile how billing talks to tax and ledger.',
    cwd: '~/work/ledger-api',
    demo: [
      {
        kind: 'user',
        text: 'System profile: billing ↔ tax service ↔ ledger. Actors and open questions.',
      },
      {
        kind: 'tool',
        name: 'Grep',
        text: 'taxClient|ledgerClient|Stripe path:src',
      },
      {
        kind: 'result',
        text: 'src/integrations/tax.ts · src/integrations/ledger.ts · 11 refs',
      },
      {
        kind: 'tool',
        name: 'Write',
        text: 'docs/system-profile-billing.md',
      },
      {
        kind: 'result',
        text: 'actors: 4 · integrations: 3 · open questions: 5',
      },
    ],
    group: 'support',
  },
  {
    id: 'praxis-skill-from-git',
    title: '$praxis-skill-from-git',
    summary: 'Extract real conventions from history into a skill.',
    writes: '.agents/skills/{project}-patterns',
    prompt: 'Mine last year of commits into a project skill.',
    cwd: '~/work/ledger-api',
    demo: [
      {
        kind: 'user',
        text: 'Extract real conventions from git history into .agents/skills/ledger-patterns.',
      },
      {
        kind: 'tool',
        name: 'Bash',
        text: 'git log --since=2025-08-01 --name-only --pretty=format: | head -200',
      },
      {
        kind: 'result',
        text: 'heavy: src/billing/* · tests mirror src · ADR in docs/adr/',
      },
      {
        kind: 'assistant',
        text: 'Patterns from history only. Not inventing a generic style guide.',
      },
      {
        kind: 'tool',
        name: 'Write',
        text: '.agents/skills/ledger-patterns/SKILL.md',
      },
      {
        kind: 'result',
        text: 'wrote SKILL.md · 6 conventions · sources pinned to commits',
      },
    ],
    group: 'support',
  },
  {
    id: 'praxis-ai-debug',
    title: '$praxis-ai-debug',
    summary: 'Inspect package, install, and workflow health.',
    writes: 'status report',
    prompt: 'Why is $praxis-design missing in this session?',
    cwd: '~/work/ledger-api',
    demo: [
      {
        kind: 'user',
        text: 'Doctor: $praxis-design is not available in this agent session. Why?',
      },
      {
        kind: 'tool',
        name: 'Bash',
        text: 'ls ~/.agents/skills | rg praxis || true',
      },
      {
        kind: 'result',
        text: 'praxis-init, praxis-research… · praxis-design present on disk',
      },
      {
        kind: 'tool',
        name: 'Read',
        text: '~/.agents/praxis-skills.json',
      },
      {
        kind: 'result',
        text: 'receipt ok · version 0.4.0-beta.7 · agent: codex',
      },
      {
        kind: 'assistant',
        text: 'Skill is installed under ~/.agents/skills. Session catalog is stale. Restart the agent or re-index skills.',
      },
    ],
    group: 'support',
  },
  {
    id: 'praxis-clear-speech',
    title: '$praxis-clear-speech',
    summary: 'Write or audit clear technical prose.',
    writes: 'audited text · findings',
    prompt: 'Rewrite this operator error for clarity.',
    cwd: '~/work/ledger-api',
    demo: [
      {
        kind: 'user',
        text: 'Rewrite for operators: "Invoice voidance failed due to non-positive residual monetary aggregate." Keep field names.',
      },
      {
        kind: 'tool',
        name: 'Read',
        text: '.agents/skills/praxis-clear-speech/SKILL.md',
      },
      { kind: 'result', text: 'ok · clear speech · protect identifiers' },
      {
        kind: 'assistant',
        text: 'Suggested: "Cannot void invoice: remaining amount is zero or negative. Check amount_due." Identifiers unchanged.',
      },
      {
        kind: 'tool',
        name: 'ApplyPatch',
        text: 'src/billing/errors.ts',
      },
      { kind: 'result', text: '1 string updated · no API field renames' },
    ],
    group: 'support',
  },
]

export const references: ReferenceSkill[] = [
  { id: 'praxis-adr-template', title: '$praxis-adr-template', body: 'One ADR file per decision.' },
  { id: 'praxis-api-contracts-template', title: '$praxis-api-contracts-template', body: 'REST and async message contracts.' },
  { id: 'praxis-design-template', title: '$praxis-design-template', body: 'Architecture and diagram format.' },
  { id: 'praxis-owasp-top-10', title: '$praxis-owasp-top-10', body: 'OWASP Top 10 and modern threats.' },
  { id: 'praxis-security-audit-checklist', title: '$praxis-security-audit-checklist', body: 'Tech-aware security checklist.' },
  { id: 'praxis-stoplight-docs', title: '$praxis-stoplight-docs', body: 'Stoplight / SMD API docs.' },
  { id: 'praxis-task-refinement', title: '$praxis-task-refinement', body: 'INVEST, story formats, sizing.' },
  { id: 'praxis-tdd-approach', title: '$praxis-tdd-approach', body: 'Phase TDD and verification.' },
  { id: 'praxis-test-design-techniques', title: '$praxis-test-design-techniques', body: 'EP, BVA, tables, states, pairwise.' },
]

export const agents = [
  { name: 'Codex', note: 'Primary target. .agents/skills' },
  { name: 'Claude Code', note: 'Skills + /praxis-* commands' },
  { name: 'Cursor', note: 'Mapped skill home' },
  { name: 'Grok', note: 'Mapped skill home' },
]
