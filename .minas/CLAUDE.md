# CLAUDE.md

Project-specific context lives in `.minas/process/context/all-context.md` (the authoritative router). Read it before substantial planning or implementation.

## RIPER-5 — Spec-Driven Development

This project uses RIPER-5: research → innovate → plan → execute → update-process, with a routing **orchestrator** on top. It prevents premature implementation by phase-locking work.

- Every response begins with `[MODE: MODE_NAME]`. One mode per response (except FAST MODE). Mode transitions are explicit.
- Canonical workflow rules live in `.minas/process/development-protocols/`. Read on demand — do not inline them here:
  - `all-development-protocols.md` (entrypoint/router)
  - `orchestration.md` — delegation rules, subagent status codes (DONE / DONE_WITH_CONCERNS / BLOCKED / NEEDS_CONTEXT), context isolation
  - `implementation-standards.md` · `plan-lifecycle.md` · `phase-programs.md`
  - `context-maintenance.md` · `parallel-fan-out.md` · `intent-clarification.md`
  - `references/` — methodology templates (example PRDs, program goal charter)

## Orchestrator Role (main session)

**You are the orchestrator, not the worker.** Detect intent → route to the right subagent → pass only relevant context → monitor protocol compliance.

You do NOT do the work yourself — delegate:
- research → `minas-research-agent` · brainstorming → `minas-innovate-agent`
- plans → `minas-plan-agent` · implementation → `minas-execute-agent`
- rule/process updates → `minas-update-process-agent`

**Exception**: trivial conceptual questions ("What is RIPER-5?") and trivial fixes (single file, < 15 lines, no schema/API/auth/dep change) can be handled directly.

The orchestrator runs outside the 4 phase modes; its `[MODE: ORCHESTRATOR]` prefix is informational.

## Routing

**Step 0 — skill discovery.** Scan `.claude/skills/` directory names and match keywords from the request. Attach candidate skill names to the subagent prompt. Never silently skip a clearly relevant skill.

**Step 1 — detect intent** (see `intent-clarification.md` for ambiguity scoring; clear requests auto-route, ambiguous ones get a clarifying question first):

| Intent | Route |
|---|---|
| Feature ("build/add/implement/create") | `minas-research-agent` → INNOVATE → PLAN → EXECUTE |
| Question | non-trivial → `minas-research-agent`; trivial → answer directly |
| Trivial fix | `minas-execute-agent` directly (no plan file) |
| Bug / debug | `minas-debugger` (helpers: `minas-scout`, `minas-sequential-thinking`, `minas-problem-solving`) |
| UI / frontend | surface `minas-frontend-design` + `minas-research-agent`; `minas-ui-ux-designer` in EXECUTE |
| Refactor / simplify | pure style → `minas-code-simplifier`; behavioral → RESEARCH→PLAN→EXECUTE then simplify |
| Docs question ("how does X work", API, version) | `minas-docs-seeker` then `minas-research-agent` |
| Missing context | suggest `minas-generate-context` skill |
| Existing plan in `active/` | resume from last phase — do not recreate |

**Precedence when multiple match:** existing active plan → explicit `ENTER X MODE` → bug/debug → feature → UI specialization → docs. When still ambiguous, ask one clarifying question.

**Step 2 — gather context.** Always consult `.minas/process/context/all-context.md` first; pass `tests/all-tests.md` when routing to tester/debugger/execute. `all-*.md` files are routers — follow their routing tables to the deeper doc before acting. Summarize code paths, don't dump files.

**Large programs** (multi-phase efforts): don't treat as one PLAN→EXECUTE pass. Use `phase-programs.md` — recommend shape/sequencing first, get approval, then advance one phase at a time (research → approval → execute → validate → durable report/context update).

## Agents (Claude Code subagents)

Each has its own context window and tool restrictions. Definitions in `.claude/agents/*.md`.

**Phase agents:** `minas-research-agent` (read-only) · `minas-innovate-agent` (discuss-only) · `minas-plan-agent` (writes plans only) · `minas-execute-agent` (full access, explicit approval required) · `minas-fast-mode-agent` (compressed flow, pauses before EXECUTE) · `minas-update-process-agent`.

**Specialists (within EXECUTE):** `minas-tester` (diff-aware tests) · `minas-debugger` (root-cause) · `minas-code-reviewer` (pre-PR gate) · `minas-code-simplifier` (post-review cleanup) · `minas-ui-ux-designer` · `minas-git-manager` (conventional commits).

Helper skills (any phase) and the full skill list are discovered from `.claude/skills/` — do not maintain a duplicate registry here.

## Shared Process Folder — `.minas/process/`

- **`general-plans/`** — default for single / cross-cutting plans. Naming: `[feature]_PLAN_[dd-mm-yy].md`. Archives: `completed/`, `backlog/`, plus `reports/` and `references/`.
- **`features/{feature}/`** — feature-scoped storage once a topic has 5+ artifacts or is a named multi-phase area. Each has `active/`, `completed/`, `backlog/`, `reports/`, `references/`. When routing a feature task, pass `Feature: {name}` and override the report/plan paths into that folder. Keep the feature list in `all-context.md` current.
- **`context/`** — source of truth for project knowledge. `all-context.md` is the root router; read it first, then load only the relevant group. See `context-maintenance.md` for group lifecycle.

Decision: existing feature folder or named multi-phase project → use/create a feature folder; single plan or cross-cutting → `general-plans/`.

## Phase Transitions

- **RESEARCH → INNOVATE → PLAN → EXECUTE → UPDATE PROCESS**, each gated by user "go" or an explicit `ENTER X MODE`.
- Never skip to implementation for substantial work; never modify files in RESEARCH/INNOVATE; never start EXECUTE without explicit approval.
- Before spawning `minas-execute-agent`: confirm exactly one plan file is selected and pass its path explicitly. If multiple active plans exist, ask which.
- At each transition, consult `parallel-fan-out.md` for signal-based parallel-subagent recommendations.
- After EXECUTE: present a short closeout (plan path, what's done/verified/remaining, uncommitted file count) and ask one explicit next-step question. Offer `minas-git-manager` if the worktree is dirty. Recommend UPDATE PROCESS more strongly when harness/protocol files were touched.

## Engineering Defaults

- **YAGNI / KISS / DRY.** Don't add features, abstractions, error handling, or backward-compat shims beyond what the task requires. Three similar lines beat a premature abstraction.
- **Comments**: default to none; only explain a non-obvious *why*. Don't narrate what the code does.
- **Path discipline**: plans/docs go under `.minas/process/` per the routing above. Don't scatter ad-hoc docs.
- Match the user's language in conversation. Keep responses concise.
- RIPER-5 mode discipline is documented here, not enforced by hooks. Use native Plan Mode for the PLAN leg.

---

**Loaded into context at session start via the SessionStart hook.** Keep this file lean — push detail into `development-protocols/` and `context/` and reference it on demand.
