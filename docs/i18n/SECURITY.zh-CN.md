<p align="center">
  <a href="../../SECURITY.md">English</a> |
  <strong>简体中文</strong> |
  <a href="SECURITY.ja-JP.md">日本語</a> |
  <a href="SECURITY.ko-KR.md">한국어</a> |
  <a href="SECURITY.vi-VN.md">Tiếng Việt</a> |
  <a href="SECURITY.pt-BR.md">Portugues</a>
</p>

# 安全策略

## 支持的版本

| 版本 | 是否支持 |
|---------|-----------|
| 最新 release | 是 |
| 旧版本 | 否 |

## 报告漏洞

**不要通过公开 issue 报告安全漏洞。**

请使用 GitHub Security Advisories 私密报告漏洞：

[报告漏洞](https://github.com/withkynam/vibecode-pro-max-kit/security/advisories/new)

> **注意：** 需要在仓库设置中启用 Private Vulnerability Reporting，"Report a vulnerability" 按钮才会出现。

### 响应时间线

- **48 小时**内确认收到你的报告
- **7 天**内完成初步评估和严重性分类
- 全程会及时通知你进展

## 范围

### 在范围内

- **Hook 脚本**（`privacy-block.cjs`、`scout-block.cjs`）——绕过漏洞导致 agent 访问到被阻止的资源
- **install.sh** ——供应链攻击、命令注入或路径穿越
- **Agent prompts** ——绕过阶段锁定或工具限制的 prompt 注入
- **隐私泄露** ——agent 在有防护的情况下仍然访问到凭证、API 密钥或敏感文件
- **System-reminder / subagent-init 注入** ——操纵 agent 行为的上下文注入攻击

### 不在范围内

- Claude Code 或 Codex 本身的漏洞（请分别报告给 Anthropic 或 OpenAI）
- 用户项目代码中的问题（不是 harness 的问题）
- 针对 maintainer 的社会工程攻击

## 披露时间线

- 我们的目标是在 **30 天**内修复已确认的漏洞
- 修复发布后进行协调披露
- 在 release notes 中致谢报告者（除非你希望匿名）

## 安全港

我们认为善意进行的安全研究是经过授权的。对于善意行事并遵循本策略的研究者，我们不会追究法律责任。

如果你不确定自己的研究是否符合条件，请在测试前联系我们——我们很乐意帮你明确范围。
