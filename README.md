<div align="center">

<a href="https://flowser.ai">
  <img src="assets/flowser-logo.svg" alt="Flowser" width="120">
</a>

*Sponsored by [Flowser.ai](https://flowser.ai) — AI Agents with computers for GTM*

<br>

# vibecode-pro-max-kit

**Your AI coding agent writes code before it understands your project.<br>This fixes that.**

Stop your agent from jumping straight to implementation. This harness forces a structured workflow — research first, plan second, execute third — with explicit approval at every transition. No more rewriting AI-generated code because it missed the point.

<p>
  <img src="https://img.shields.io/badge/version-2.0.2-blue" alt="Version">
  <img src="https://img.shields.io/badge/license-MIT-green" alt="License">
  <img src="https://img.shields.io/badge/agents-12-orange" alt="Agents">
  <img src="https://img.shields.io/badge/skills-31-purple" alt="Skills">
  <img src="https://img.shields.io/badge/platforms-Claude_Code_%7C_Codex-black" alt="Platforms">
</p>

</div>

---

## The Problem

You ask Claude to "add webhook support." It immediately starts writing code. No questions about your architecture. No check on existing patterns. No plan. You get 400 lines that don't fit your codebase, and you spend an hour fixing it.

**This happens because your agent has no workflow.** It has intelligence but no process.

## The Fix

This harness installs a complete development system into your project — not just a CLAUDE.md file, but 12 specialized agents, 31 skills, and a phase-locked workflow that forces your agent to **understand before it builds**.

```
You: "add webhook support to the API"

  1. RESEARCH  →  Agent reads your codebase, finds existing patterns, gathers context
  2. INNOVATE  →  Agent proposes 2-3 approaches with trade-offs
  3. PLAN      →  Agent writes a detailed spec — you review and approve it
  4. EXECUTE   →  Agent implements exactly what was planned
                  → auto-chains: tester → code-reviewer → git-manager
```

Every transition requires your explicit approval. Nothing auto-advances. You stay in control.

---

## Install (30 seconds)

```bash
curl -fsSL https://raw.githubusercontent.com/withkynam/vibecode-pro-max-kit/main/install.sh | bash
```

Then open Claude Code and say:

```
Run vc-setup
```

That's it. The setup skill detects your stack, asks you about your project (a real conversation, not a checklist), scaffolds the process directory, deep-scans your codebase, and populates context files with actual content — not placeholders.

<details>
<summary><strong>What happens during install</strong></summary>

- **Fresh project?** Installs the full harness, then `vc-setup` studies your codebase
- **Existing `.claude/` config?** Backs up to `.vibecode-backup/`, installs fresh, restores your `settings.json`
- **Existing `process/` directory?** Never touched by install — `vc-setup` handles migration intelligently
- **Existing `CLAUDE.md`?** Backed up as `CLAUDE.md.pre-vibecode`, harness version installed

</details>

<details>
<summary><strong>Detailed setup prompt</strong> (for more control over the process)</summary>

```
Run vc-setup to set up this project with the agent harness.

Follow the full interactive flow:

1. DETECT — Read package.json, detect my stack (framework, package manager, monorepo
   structure, test framework, database, auth). Also check if I have any existing .claude/,
   process/, or context files from a previous setup.

2. SHOW ME WHAT YOU FOUND — Present a summary of the detection results and wait for me
   to confirm before continuing. If this is an existing project with process/ folders or
   context files, tell me what you found and what looks good vs what could be improved.

3. ASK ME ABOUT THE PROJECT — Before scaffolding or scanning, have a real conversation
   with me about this project. Don't just ask a fixed list of questions and move on — ask
   follow-ups based on my answers, probe deeper on anything vague, and keep going until
   you genuinely understand the project. Start with the basics (what is this? who uses it?),
   then dig into architecture, features, conventions, pain points, and anything else that
   matters. Summarize your understanding back to me and confirm it's correct before moving on.

4. SCAFFOLD — Create the process/ directory structure. If I already have process/ folders,
   show me what you plan to change and wait for my approval before reorganizing anything.
   Never silently move or delete my existing files.

5. STUDY — Deep-scan the codebase and populate process/context/all-context.md with REAL
   content based on what you find AND what I told you. Include: repo structure, tech stack
   with versions, key patterns and conventions, import aliases, env vars, API routes,
   database schema, test setup. Do not leave placeholder text.

6. VALIDATE — Run all the validation checks to make sure everything is wired correctly.

Important rules:
- If I have existing context files or a well-written CLAUDE.md, read them first and
  preserve what is good. Merge intelligently — do not replace good content with generic scans.
- Show me a summary of what you plan to create or change at each major step and wait
  for my OK before proceeding.
- Do not create empty placeholder files. Only create files that have real content.
- Ask before reorganizing. If my existing setup works, tell me what you would improve
  and let me decide.
```

</details>

---

## What Makes This Different

Most agent harnesses give you a big CLAUDE.md and some instructions. Here's what this one does that others don't:

### Phase-locked execution
Your agent literally **cannot** write code during the research phase. Each phase has tool restrictions enforced at the agent level — not just instructions that can be ignored.

### Automatic skill discovery
When you say "add webhook support," the system automatically surfaces relevant skills (security audit, edge case generation) before routing to an agent. You don't need to know what skills exist — they find you.

### Real project context (not placeholders)
The setup process deep-scans your actual codebase and writes real content into context files — your real directory structure, your real tech stack with versions, your real patterns and conventions. Not `{{project_name}}` placeholder text.

### The agent asks before it acts
Every phase transition requires your explicit approval. For existing projects, the setup skill reads what you have, shows you what it found, and asks what you want to keep vs change. It never silently reorganizes your files.

### Works across Claude Code and Codex
The `process/` directory, plans, and context files are shared artifacts. Start a plan in Claude Code, continue in Codex. Both use the same agents, same skills, same workflow.

---

## How It Works

```
Your request
  → Step 0: Skill Discovery (match keywords → surface relevant skills)
  → Intent Detection (feature / bug / question / refactor / UI)
  → Route to the right agent
  → Phase-locked execution with explicit transitions
```

The orchestrator **never does the work itself** — it routes, monitors, and manages transitions.

### The Workflow

| Phase | What happens | You say |
|-------|-------------|---------|
| **RESEARCH** | Read-only fact gathering — codebase + web | *(automatic on feature requests)* |
| **INNOVATE** | Explore 2-3 approaches with trade-offs | `go` |
| **PLAN** | Write a detailed spec you can review | `go` |
| **EXECUTE** | Implement exactly what was planned | `ENTER EXECUTE MODE` |
| **UPDATE PROCESS** | Capture learnings, update context, archive plan | *(recommended after non-trivial work)* |

### Fast Mode

For when you know what you want and don't need a back-and-forth:

```
You: "ENTER FAST MODE - add rate limiting to the API"

→ Agent does RESEARCH + INNOVATE + PLAN in one compressed pass
→ Writes a full plan file — then STOPS and waits for you
→ You review the plan
→ You say "ENTER EXECUTE MODE" → implementation begins
```

Same safety guarantees as the full flow. The agent still can't execute without your approval — it just gets to the plan faster.

**Trivial fixes** (single file, <15 lines, no schema/auth changes) skip straight to execute automatically.

### Update Process — Your Agent Gets Smarter Over Time

Most agents forget everything between sessions. This one doesn't.

After completing work, the UPDATE PROCESS phase captures what was learned — patterns discovered, conventions confirmed, gotchas encountered — and writes them into your project's living context files. Next time, the agent starts with that knowledge instead of rediscovering it.

```
After EXECUTE completes, the orchestrator asks:

  "Implementation complete. Enter UPDATE PROCESS mode to
   archive the plan and capture learnings?"

→ update-process-agent archives the completed plan
→ Updates process/context/all-context.md with new patterns
→ Records decisions so future agents understand WHY, not just WHAT
```

This is how your agent harness compounds — each feature makes the next one faster and more accurate.

---

## What's Inside

### 12 Agents

<details>
<summary><strong>Core workflow agents</strong> (click to expand)</summary>

| Agent | Role |
|-------|------|
| `vc-research-agent` | Codebase + web research, read-only |
| `vc-innovate-agent` | Brainstorm approaches, no code or decisions |
| `vc-plan-agent` | Write spec to `process/general-plans/active/` |
| `vc-execute-agent` | Implement approved plan |
| `vc-fast-mode-agent` | Compressed RESEARCH→INNOVATE→PLAN, then pause |
| `vc-update-process-agent` | Capture learnings, archive plans |

</details>

<details>
<summary><strong>Specialist agents</strong> (click to expand)</summary>

| Agent | Role |
|-------|------|
| `vc-debugger` | Evidence-first root cause analysis |
| `vc-tester` | Diff-aware test verification |
| `vc-code-reviewer` | Pre-PR adversarial review |
| `vc-code-simplifier` | Refactor for clarity without behavior change |
| `vc-ui-ux-designer` | Design-aware frontend implementation |
| `vc-git-manager` | Conventional commits + push |

</details>

### 31 Skills (auto-discovered)

<details>
<summary><strong>Full skill catalog</strong> (click to expand)</summary>

**Contract skills** — project lifecycle management:
`vc-generate-plan` · `vc-generate-context` · `vc-audit-context` · `vc-audit-plans` · `vc-audit-vc` · `vc-setup` · `vc-update` · `vc-publish`

**Planning & analysis:**
`vc-predict` (5-persona risk debate) · `vc-scenario` (edge cases across 12 dimensions) · `vc-sequential-thinking` · `vc-problem-solving`

**Debug & security:**
`vc-debug` (systematic root cause) · `vc-security` (STRIDE + OWASP audit) · `vc-autoresearch` (autonomous metric optimization)

**Research & docs:**
`vc-docs-seeker` · `vc-scout` · `vc-docs` · `vc-repomix` · `vc-xia`

**Frontend & browser:**
`vc-frontend-design` (anti-AI-slop UI) · `vc-chrome-devtools` · `vc-agent-browser` · `vc-web-testing`

**Utilities:**
`vc-context-engineering` · `vc-mcp-management` · `vc-preview` · `vc-team` · `vc-tech-graph` · `vc-watzup` · `vc-merge-worktree`

</details>

### 7 Hooks

Session initialization, privacy guardrails, scout file blocking, usage tracking, edit quality reminders, subagent context injection, descriptive naming enforcement.

---

## Typical Session

```
# Feature request
You: "add webhook support to the API"
→ Skill discovery surfaces: vc-scenario, vc-security
→ research-agent gathers context
→ You say "go" → innovate-agent explores approaches
→ You say "go" → plan-agent writes the spec
→ You review the plan, say "ENTER EXECUTE MODE"
→ execute-agent implements → tester → code-reviewer → git-manager

# Bug fix
You: "login redirect is broken"
→ Routes to vc-debugger for root cause analysis
→ Then execute-agent implements the fix
→ tester → code-reviewer → git-manager

# Fast mode (when you know what you want)
You: "ENTER FAST MODE - add rate limiting middleware"
→ Compressed research+innovate+plan in one pass
→ You review the plan, say "ENTER EXECUTE MODE"
→ Done in minutes, not phases

# Quick question
You: "how does the auth middleware work?"
→ Orchestrator answers directly from codebase

# Large program
You: "build a full testing platform"
→ Creates umbrella plan + phase plans
→ Each phase: research → approve → execute → validate → report
```

---

## Project Structure — Living Knowledge, Not Dead Docs

After setup, your project gets a `process/` directory. This isn't just organization — it's **project memory that persists across sessions, agents, and teammates**.

```
process/
├── context/              # Living project knowledge (auto-populated, agent-maintained)
│   ├── all-context.md    # Authoritative project reference — real stack, real patterns
│   └── tests/            # Test runner config, commands, debugging procedures
├── general-plans/        # Cross-cutting work
│   ├── active/           # In-progress plans (agents resume from here)
│   ├── completed/        # Archived plans (searchable decision history)
│   ├── backlog/          # Future work (agents check before duplicating)
│   └── reports/          # Operational reports and post-mortems
├── features/             # Feature-scoped work (auto-created when 5+ artifacts accumulate)
│   └── {feature}/
│       ├── active/       # Feature plans in progress
│       ├── completed/    # Feature decision history
│       └── reports/      # Feature-specific reports
├── development-protocols/ # Shared workflow rules (managed by harness)
└── _seeds/               # Templates for new files
```

**Why this matters:**

- **Plans are resumable.** Close your laptop, come back tomorrow, say "continue" — the agent finds your active plan and picks up where you left off. No re-explaining.
- **Context compounds.** Every completed feature updates `all-context.md` with patterns and decisions. Session 50 is dramatically better than session 1.
- **History is searchable.** Completed plans in `completed/` explain *why* things were built a certain way — invaluable when you revisit code months later.
- **Features self-organize.** When a topic accumulates enough artifacts, it gets its own feature folder. Cross-cutting work stays in `general-plans/`.

Plans use date-stamped naming: `webhook-support_PLAN_07-04-26.md`

---

## Updating

Pull the latest harness improvements:

```
Run vc-update
```

Shows a dry-run diff of what changed, waits for your confirmation, then applies updates. Your `process/` directory and project-specific content are never touched.

---

## Star History

<a href="https://star-history.com/#withkynam/vibecode-pro-max-kit&Date">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=withkynam/vibecode-pro-max-kit&type=Date&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=withkynam/vibecode-pro-max-kit&type=Date" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=withkynam/vibecode-pro-max-kit&type=Date" />
 </picture>
</a>

---

## License

MIT
