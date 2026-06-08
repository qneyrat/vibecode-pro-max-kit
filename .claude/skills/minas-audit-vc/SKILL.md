---
name: minas:audit-vc
description: >-
  Audit agent harness health: agent definition consistency, skill registry
  consistency, README.md sync, and protocol file wiring. Use when agents,
  skills, README.md, or development-protocol files move, split, or drift.
---

# Audit VC (Version Control Harness Health)

Use this skill to verify that the agent harness layer is internally consistent
and correctly wired across Claude, README.md, and protocol files.

For context routing, grouping, and discoverability audits, use the `audit-context` skill instead.

## Workflow

1. Run the shared skill discovery validator:
   ```bash
   node .claude/skills/minas-audit-vc/scripts/validate-skills.mjs
   ```
2. Run the README.md sync validator:
   ```bash
   node .claude/skills/minas-audit-vc/scripts/validate-guide-sync.mjs
   ```
3. Run the protocol wiring validator:
   ```bash
   node .claude/skills/minas-audit-vc/scripts/validate-protocol-wiring.mjs
   ```
4. Run the seed file consistency validator:
   ```bash
   node .claude/skills/minas-audit-vc/scripts/validate-seeds.mjs
   ```
5. Run the kit portability validator:
   ```bash
   node .claude/skills/minas-audit-vc/scripts/validate-kit-portability.mjs
   ```
6. If any script reports failures, inspect the referenced files and patch the smallest
   relevant surface.
7. Re-run the failed validators until they pass.

## Rules

- Treat `.claude/agents/` as canonical for agent definitions.
- Treat `.claude/skills/` as canonical for skills; `.agents/skills/` is the OpenCode discovery symlink.
- Treat validator warnings as audit findings unless the user asks for a strict cleanup.
- For context routing and discoverability audits, delegate to `audit-context`.
