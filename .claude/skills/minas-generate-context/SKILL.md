---
name: minas:generate-context
description: Generate or update the project's authoritative repository context at .minas/process/context/all-context.md. Use when repo context is missing, stale, or contradicted by code.
metadata:
  author: flowser
  version: "1.0.0"
---

# Generate Context

Use this skill to maintain `.minas/process/context/all-context.md`, the broad portable project knowledge layer shared by Codex and Claude. Use `.minas/process/context/all-context.md` as the context router before reading grouped docs.

Optional input: a package, app, feature, context group, or architectural area to refresh first.

## Workflow

1. Read `references/generate-context.md` for the full context contract.
2. Determine mode:
   - Full scan when `.minas/process/context/all-context.md` is missing.
   - Delta update when it exists.
3. Read `.minas/process/context/all-context.md` when present to identify relevant grouped context files.
4. Inspect current repo state, active plans, feature folders, package scripts, tooling, important architecture files, and relevant `.minas/process/context/**/*.md` docs.
5. Produce exactly one updated file: `.minas/process/context/all-context.md`.
6. Include scan timestamp, repo HEAD if available, changes since last update, open questions, and source references.
7. Validate the generated context:
   ```bash
   node .claude/skills/minas-generate-context/scripts/validate-all-context.mjs
   ```
8. If routing or grouped context changed, also run:
   ```bash
   node .claude/skills/minas-audit-context/scripts/validate-context-discovery.mjs
   ```

## Rules

- Treat `.minas/process/context/` as durable cross-agent knowledge.
- Treat `.minas/process/context/all-context.md` as the durable routing protocol; do not replace it with generated prose.
- Do not store agent-specific mechanics here unless they affect project workflow.
- Do not rewrite grouped context docs; if they are stale or mis-grouped, flag `audit-context`.
- Prefer concise, factual, path-specific documentation.
- Use `pnpm` terminology for package management.
- Treat validation failures as blockers before presenting context as refreshed.
