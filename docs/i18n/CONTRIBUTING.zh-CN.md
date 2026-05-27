<p align="center">
  <a href="../../CONTRIBUTING.md">English</a> |
  <strong>简体中文</strong> |
  <a href="CONTRIBUTING.ja-JP.md">日本語</a> |
  <a href="CONTRIBUTING.ko-KR.md">한국어</a> |
  <a href="CONTRIBUTING.vi-VN.md">Tiếng Việt</a> |
  <a href="CONTRIBUTING.pt-BR.md">Portugues</a>
</p>

# 为 vibecode-pro-max-kit 做贡献

感谢你有兴趣为 vibecode-pro-max-kit 做贡献！这个项目为 Claude Code 和 Codex 提供开箱即用的 agent harness，我们欢迎所有人的贡献。

参与本项目即表示你同意遵守我们的 [行为准则](../../CODE_OF_CONDUCT.md)。

---

## 沟通渠道

- **WhatsApp（主要）：** [加入我们的社区群](https://chat.whatsapp.com/E42ySo6iGmuAyeh25eAXuu?s=cl&p=i&mlu=1)
- **GitHub Issues：** Bug 报告、功能请求和任务追踪
- **GitHub Discussions：** 问题、想法和一般性讨论

> 这是我们唯一的社区渠道——我们不用 Discord、Slack 或其他平台。

---

## 开发前提条件

在贡献之前，确保你已安装以下工具：

- **Node.js** >= 20
- **bash** 或 **zsh** shell
- **git** >= 2.30
- **操作系统：** macOS、Linux 或带 WSL2 的 Windows

不需要额外的包管理器或运行时。harness 设计为零依赖。

---

## 贡献类型

我们欢迎各种类型的贡献：

### Skills

Skills 是位于 `.claude/skills/` 下的可复用能力模块。每个 skill 必须：

- 有自己的目录（例如 `.claude/skills/my-skill/`）
- 包含带 YAML frontmatter 的 `SKILL.md` 文件（name、description、triggers）
- **不要**使用 `vc-` 前缀——该前缀保留给官方 harness skills
- 如需辅助脚本，放在 `scripts/` 子目录下

### Agents

Agent 定义为不同工作流阶段提供专用角色。每个 agent 必须：

- 同时有 `.claude/agents/` 版本（Claude Code 用）和 `.codex/agents/` 版本（Codex 用）
- 两个版本保持一致
- 遵循现有的命名规范

### Hooks

位于 `.claude/hooks/` 下的前置/后置执行 hooks。它们在 Claude Code 会话的特定生命周期节点自动运行。

### Protocols

`process/development-protocols/` 下的开发协议文档，定义共享的工作流规则和惯例。

### 翻译

文档和 skill 描述的本地化版本，让 harness 能服务更多开发者。

### 文档

对 README.md、CLAUDE.md、AGENTS.md、行内注释或其他文档的改进。

### Bug 修复

对验证脚本、安装逻辑、seed 模板或其他现有功能的修复。

---

## 快速上手

1. 在 GitHub 上 **Fork** 仓库

2. **Clone** 你的 fork 到本地：

   ```bash
   git clone https://github.com/<your-username>/vibecode-pro-max-kit.git
   cd vibecode-pro-max-kit
   ```

3. 把 harness **安装**到一个测试项目里验证是否正常：

   ```bash
   # From a test project directory
   bash /path/to/vibecode-pro-max-kit/install.sh
   ```

4. **运行 setup skill** 验证安装的 harness：

   ```bash
   # Inside a Claude Code session in the test project
   # Invoke the vc-setup skill
   ```

5. **运行验证脚本**确认环境正确：

   ```bash
   node .claude/skills/vc-audit-vc/scripts/validate-agent-parity.mjs
   node .claude/skills/vc-audit-vc/scripts/validate-skills.mjs
   ```

   开始改代码前，所有验证都应该通过。

---

## 架构概览

harness 采用双平台架构以兼容 Claude Code 和 Codex：

```
.claude/
  agents/          # Claude Code agent definitions (*.md)
  skills/          # Shared skill modules (each skill is a directory with SKILL.md)
  hooks/           # Pre/post execution hooks
.codex/
  agents/          # Codex agent definitions (mirrored from .claude/agents/)
process/
  development-protocols/   # Shared workflow rules and conventions
  context/                 # Project knowledge and context docs
  _seeds/                  # Template seeds for new project scaffolding
```

Skills 通过 `.agents/skills` symlink 在两个平台间共享，Codex 用它来发现 `.claude/skills/`。

完整架构详情见 CLAUDE.md 和 AGENTS.md。

---

## Pull Request 指南

### 范围

- PR 保持专注：**每个 PR 只做一种类型的贡献**
- 单个 skill 添加、单个 agent 对、单个 bug 修复等
- 如果你的改动涉及多个区域，拆成多个 PR
- 目标规模：**200-400 行**有意义的改动

### AI 辅助贡献

欢迎并鼓励 AI 辅助贡献。这本身就是个 AI agent harness——用 AI 工具来构建它完全说得通。只要确保你 review 并理解了你提交的内容。

### Commit 信息

使用 conventional commit 格式：

- `feat:` -- 新的 skill、agent、hook 或能力
- `fix:` -- 现有功能的 bug 修复
- `docs:` -- 仅文档改动
- `chore:` -- 维护、重构或工具链改动

示例：

```
feat: add code-coverage skill with lcov parsing
fix: correct symlink detection in install.sh on WSL2
docs: add examples to vc-generate-plan SKILL.md
chore: update validate-skills.mjs to check frontmatter
```

### 分支命名

使用描述性分支名：

```
feat/my-new-skill
fix/install-symlink-wsl
docs/contributing-guide
```

### PR 描述

PR 描述中需要包含：

- 改了什么、为什么改
- 怎么测试的（跑了哪些验证脚本）
- 是否有破坏性变更或迁移说明

---

## vc-manifest.json

仓库根目录的 `vc-manifest.json` 文件追踪 harness 中所有受管文件。当你添加新文件（skills、agents、hooks、protocols、seeds）时，必须更新这个 manifest。

`install.sh` 和 `vc-update` 用这个 manifest 来决定复制和同步哪些文件。如果你的新文件没在 manifest 里，用户安装或更新时就不会包含它。

更新 manifest 时：

- 把新文件路径添加到对应的 section
- 每个 section 内按字母顺序排列
- 更新后运行验证脚本确认一致性

---

## Skill 贡献 Checklist

提交新 skill 前，确认以下事项：

- [ ] Skill 位于 `.claude/skills/<skill-name>/` 下自己的目录中
- [ ] `SKILL.md` 存在且有合法的 YAML frontmatter（至少有 name、description）
- [ ] Skill 名称**没有**使用 `vc-` 前缀（保留给官方 skills）
- [ ] 辅助脚本放在 `scripts/` 子目录下
- [ ] `vc-manifest.json` 已更新所有新文件路径
- [ ] 验证通过：

  ```bash
  node .claude/skills/vc-audit-vc/scripts/validate-skills.mjs
  ```

---

## Agent 贡献 Checklist

提交新 agent 前，确认以下事项：

- [ ] Agent 定义存在于 `.claude/agents/<agent-name>.md`
- [ ] 对应定义存在于 `.codex/agents/<agent-name>.md`
- [ ] 两个版本功能等价（同样的用途、同样的工具限制）
- [ ] Agent 一致性验证通过：

  ```bash
  node .claude/skills/vc-audit-vc/scripts/validate-agent-parity.mjs
  ```

---

## Review 流程

提交 PR 后：

- maintainer 会在 **48 个工作小时**内 review 你的 PR（软目标，不保证）
- CI 验证脚本必须通过才能开始 review
- 需要至少**一个 maintainer 批准**才能合并
- **不需要 CLA**——你的贡献受仓库的 MIT license 管辖

如果需要修改，请在后续 commit 中处理（不要 force-push 覆盖 review 评论）。

---

## 荣誉认可

所有贡献者都会被认可：

- **README Contributors 板块** -- 通过 [contrib.rocks](https://contrib.rocks) 自动生成（可视化 banner）
- **详细贡献者表格** -- 通过 [all-contributors](https://allcontributors.org/) bot 管理，认可所有贡献类型（代码、文档、设计、创意、测试、bug 报告）。bot 在添加贡献者时通过 PR 自动更新 README。
- **GitHub Release notes** -- 每个版本的 release notes 中致谢贡献者
- **Skill/Agent 署名** -- 你的名字写在贡献的 `metadata.author` 字段里

bot 配置详见 `.all-contributorsrc`（bot 首次初始化时创建）。

### 贡献者阶梯

- **Contributor** -- 任何有合并 PR 的人
- **Reviewer** -- 受邀 review PR 的活跃贡献者
- **Maintainer** -- 有 merge 权限的信任贡献者

晋升基于贡献的质量和持续性，不是数量。

---

## 贡献政策

PR 应当关联已有的 issue。没有上下文的随手 PR 可能会被关闭。

优秀的贡献者可能会被邀请成为 maintainer。

---

感谢你帮助让 vibecode-pro-max-kit 变得更好！
