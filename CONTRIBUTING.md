<p align="center">
  <a href="CONTRIBUTING.md"><strong>English</strong></a> |
  <a href="docs/i18n/CONTRIBUTING.zh-CN.md">简体中文</a> |
  <a href="docs/i18n/CONTRIBUTING.ja-JP.md">日本語</a> |
  <a href="docs/i18n/CONTRIBUTING.ko-KR.md">한국어</a> |
  <a href="docs/i18n/CONTRIBUTING.vi-VN.md">Tiếng Việt</a> |
  <a href="docs/i18n/CONTRIBUTING.pt-BR.md">Portugues</a>
</p>

# Contributing to minas-kit

Thank you for your interest in contributing to minas-kit! This project provides a ready-to-use agent harness for Claude Code and Codex, and we welcome contributions from everyone.

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

---

## Communication Channels

- **WhatsApp (primary):** [Join our community group](https://chat.whatsapp.com/E42ySo6iGmuAyeh25eAXuu?s=cl&p=i&mlu=1)
- **GitHub Issues:** Bug reports, feature requests, and task tracking
- **GitHub Discussions:** Questions, ideas, and general conversation

> This is our only community channel -- we do not use Discord, Slack, or other platforms.

---

## Development Prerequisites

Before contributing, make sure you have the following installed:

- **Node.js** >= 20
- **bash** or **zsh** shell
- **git** >= 2.30
- **Operating system:** macOS, Linux, or Windows with WSL2

No additional package managers or runtimes are required. The harness is designed to be zero-dependency.

---

## Types of Contributions

We welcome many kinds of contributions:

### Skills

Skills are reusable capability modules that live under `.claude/skills/`. Each skill must:

- Have its own directory (e.g., `.claude/skills/my-skill/`)
- Contain a `SKILL.md` file with YAML frontmatter (name, description, triggers)
- **Not** use the `minas-` prefix -- that prefix is reserved for official harness skills
- Include any helper scripts under a `scripts/` subdirectory if needed

### Agents

Agent definitions provide specialized personas for different workflow phases. Each agent must:

- Have both a `.claude/agents/` version (for Claude Code) and a `.codex/agents/` version (for Codex)
- Maintain parity between the two versions
- Follow the existing naming conventions

### Hooks

Pre- and post-execution hooks that live under `.claude/hooks/`. These run automatically at specific lifecycle points in Claude Code sessions.

### Protocols

Development protocol documents under `.minas/process/development-protocols/` that define shared workflow rules and conventions.

### Translations

Localized versions of documentation and skill descriptions to make the harness accessible to more developers.

### Documentation

Improvements to README.md, CLAUDE.md, AGENTS.md, inline comments, or any other documentation.

### Bug Fixes

Fixes for validation scripts, install logic, seed templates, or any other existing functionality.

---

## Getting Started

1. **Fork** the repository on GitHub

2. **Clone** your fork locally:

   ```bash
   git clone https://github.com/<your-username>/minas-kit.git
   cd minas-kit
   ```

3. **Install** the harness into a test project to verify everything works:

   ```bash
   # From a test project directory
   bash /path/to/minas-kit/install.sh
   ```

4. **Run the setup skill** to verify the installed harness:

   ```bash
   # Inside a Claude Code session in the test project
   # Invoke the minas-setup skill
   ```

5. **Run validation scripts** to confirm your environment is correct:

   ```bash
   node .claude/skills/minas-audit-vc/scripts/validate-agent-parity.mjs
   node .claude/skills/minas-audit-vc/scripts/validate-skills.mjs
   ```

   All validations should pass before you start making changes.

---

## Architecture Overview

The harness follows a dual-surface architecture for Claude Code and Codex compatibility:

```
.claude/
  agents/          # Claude Code agent definitions (*.md)
  skills/          # Shared skill modules (each skill is a directory with SKILL.md)
  hooks/           # Pre/post execution hooks
.codex/
  agents/          # Codex agent definitions (mirrored from .claude/agents/)
.minas/process/
  development-protocols/   # Shared workflow rules and conventions
  context/                 # Project knowledge and context docs
  _seeds/                  # Template seeds for new project scaffolding
```

Skills are shared between both surfaces via the `.agents/skills` symlink that Codex uses to discover `.claude/skills/`.

See CLAUDE.md and AGENTS.md for full architecture details.

---

## Pull Request Guidelines

### Scope

- Keep pull requests focused: **one contribution type per PR**
- A single skill addition, a single agent pair, a single bug fix, etc.
- If your change touches multiple areas, split it into separate PRs
- Target size: **200-400 lines** of meaningful changes

### AI-Assisted Contributions

AI-assisted contributions are welcome and encouraged. This is an AI agent harness -- it makes sense to use AI tools to build it. Just make sure you review and understand what you are submitting.

### Commit Messages

Use conventional commit format:

- `feat:` -- New skill, agent, hook, or capability
- `fix:` -- Bug fix in existing functionality
- `docs:` -- Documentation-only changes
- `chore:` -- Maintenance, refactoring, or tooling changes

Examples:

```
feat: add code-coverage skill with lcov parsing
fix: correct symlink detection in install.sh on WSL2
docs: add examples to minas-generate-plan SKILL.md
chore: update validate-skills.mjs to check frontmatter
```

### Branch Naming

Use descriptive branch names:

```
feat/my-new-skill
fix/install-symlink-wsl
docs/contributing-guide
```

### PR Description

Include in your pull request description:

- What the change does and why
- How you tested it (which validation scripts you ran)
- Any breaking changes or migration notes

---

## minas-manifest.json

The `minas-manifest.json` file at the repository root tracks all managed files in the harness. When you add new files (skills, agents, hooks, protocols, seeds), you must update this manifest.

The manifest is used by `install.sh` and `minas-update` to know which files to copy and sync. If your new file is not listed in the manifest, it will not be included when users install or update the harness.

When modifying the manifest:

- Add your new file paths to the appropriate section
- Keep entries sorted alphabetically within each section
- Run the validation scripts after updating to confirm consistency

---

## Skill Contribution Checklist

Before submitting a new skill, verify:

- [ ] Skill lives in its own directory under `.claude/skills/<skill-name>/`
- [ ] `SKILL.md` exists with valid YAML frontmatter (name, description, at minimum)
- [ ] Skill name does **not** use the `minas-` prefix (reserved for official skills)
- [ ] Any helper scripts are under a `scripts/` subdirectory
- [ ] `minas-manifest.json` is updated with all new file paths
- [ ] Validation passes:

  ```bash
  node .claude/skills/minas-audit-vc/scripts/validate-skills.mjs
  ```

---

## Agent Contribution Checklist

Before submitting a new agent, verify:

- [ ] Agent definition exists in `.claude/agents/<agent-name>.md`
- [ ] Matching definition exists in `.codex/agents/<agent-name>.md`
- [ ] Both versions are functionally equivalent (same purpose, same tool restrictions)
- [ ] Agent parity validation passes:

  ```bash
  node .claude/skills/minas-audit-vc/scripts/validate-agent-parity.mjs
  ```

---

## Review Process

After you submit a pull request:

- A maintainer will review your PR within **48 business hours** (soft target, not a guarantee)
- CI validation scripts must pass before review
- At least **one maintainer approval** is required to merge
- **No CLA** is required -- your contribution is governed by the repository's MIT license

If changes are requested, please address them in follow-up commits (do not force-push over review comments).

---

## Recognition

All contributors are recognized:

- **README Contributors section** -- Auto-generated via [contrib.rocks](https://contrib.rocks) (visual banner)
- **Detailed contributor table** -- Managed via [all-contributors](https://allcontributors.org/) bot, which recognizes all contribution types (code, docs, design, ideas, testing, bug reports). The bot auto-updates README via PR when contributors are added.
- **GitHub Release notes** -- Contributors credited in each release
- **Skill/Agent credits** -- Your name in the `metadata.author` field of your contribution

See `.all-contributorsrc` for bot configuration (created when the bot is first initialized).

### Contributor Ladder

- **Contributor** -- Anyone who has a merged PR
- **Reviewer** -- Regular contributors invited to review PRs
- **Maintainer** -- Trusted contributors with merge access

Advancement is based on quality and consistency of contributions, not volume.

---

## Contribution Policy

PRs should reference an existing issue. Drive-by PRs without context may be closed.

Top contributors may be invited as maintainers.

---

Thank you for helping make minas-kit better for everyone!
