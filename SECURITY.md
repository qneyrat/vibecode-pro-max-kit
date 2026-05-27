<p align="center">
  <a href="SECURITY.md"><strong>English</strong></a> |
  <a href="docs/i18n/SECURITY.zh-CN.md">简体中文</a> |
  <a href="docs/i18n/SECURITY.ja-JP.md">日本語</a> |
  <a href="docs/i18n/SECURITY.ko-KR.md">한국어</a> |
  <a href="docs/i18n/SECURITY.vi-VN.md">Tiếng Việt</a> |
  <a href="docs/i18n/SECURITY.pt-BR.md">Portugues</a>
</p>

# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| Latest release | Yes |
| Older versions | No |

## Reporting a Vulnerability

**Do NOT open a public issue for security vulnerabilities.**

Instead, use GitHub Security Advisories to report vulnerabilities privately:

[Report a vulnerability](https://github.com/withkynam/vibecode-pro-max-kit/security/advisories/new)

> **Note:** Private Vulnerability Reporting must be enabled in repository settings for the "Report a vulnerability" button to appear.

### Response Timeline

- **48-hour** acknowledgment of your report
- **7-day** initial assessment and severity classification
- We will keep you informed of progress throughout the process

## Scope

### In Scope

- **Hook scripts** (`privacy-block.cjs`, `scout-block.cjs`) — bypass vulnerabilities that allow agents to access blocked resources
- **install.sh** — supply chain attacks, command injection, or path traversal
- **Agent prompts** — prompt injection that bypasses phase-locking or tool restrictions
- **Privacy leaks** — agent accessing credentials, API keys, or sensitive files despite guardrails
- **System-reminder / subagent-init injection** — context injection attacks that manipulate agent behavior

### Out of Scope

- Vulnerabilities in Claude Code or Codex themselves (report to Anthropic or OpenAI respectively)
- Issues in user project code (not the harness)
- Social engineering attacks against maintainers

## Disclosure Timeline

- We aim to fix confirmed vulnerabilities within **30 days**
- Coordinated disclosure after the fix is released
- Credit given to the reporter in release notes (unless you prefer anonymity)

## Safe Harbor

We consider security research conducted in good faith to be authorized. We will not pursue legal action against researchers who act in good faith and follow this policy.

If you are unsure whether your research qualifies, please reach out before testing — we are happy to clarify scope.
