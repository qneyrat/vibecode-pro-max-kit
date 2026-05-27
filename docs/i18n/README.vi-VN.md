<p align="center">
  <a href="../../README.md">English</a> |
  <a href="README.zh-CN.md">简体中文</a> |
  <a href="README.ja-JP.md">日本語</a> |
  <a href="README.ko-KR.md">한국어</a> |
  <strong>Tiếng Việt</strong> |
  <a href="README.pt-BR.md">Portugues</a>
</p>

<div align="center">

<a href="https://flowser.ai">
  <img src="assets/flowser-logo.svg" alt="Flowser" width="120">
</a>

*Được tài trợ bởi [Flowser.ai](https://flowser.ai) — AI Agents với máy tính cho GTM*

<br>

# vibecode-pro-max-kit

**Con AI coding agent của bạn viết code trước khi nó hiểu project của bạn.<br>Bộ harness này biến nó thành một senior engineer biết research, lên plan, và ngày càng thông minh hơn với mỗi feature.**

<br>

🔬 Spec-driven development cho AI agents<br>
📋 Tự động tạo PRDs, quản lý backlogs, route context tự động<br>
🧠 Knowledge base tự cải thiện, tích lũy theo từng lần ship<br>
⚡ Chạy autonomous hàng giờ cho những task lớn mà không mất state<br>
🤝 Plans và specs có thể chia sẻ — devs, PMs, và stakeholders cùng review chung một artifacts

<p align="center">
  <img src="https://media.tenor.com/q_5em_iLaxoAAAAC/tanjiro-i-water-style.gif" alt="Flow like water" width="480">
</p>

<p>
  <a href="https://github.com/withkynam/vibecode-pro-max-kit/stargazers"><img src="https://img.shields.io/github/stars/withkynam/vibecode-pro-max-kit" alt="Stars"></a>
  <a href="https://github.com/withkynam/vibecode-pro-max-kit/network/members"><img src="https://img.shields.io/github/forks/withkynam/vibecode-pro-max-kit" alt="Forks"></a>
  <a href="LICENSE"><img src="https://img.shields.io/github/license/withkynam/vibecode-pro-max-kit" alt="License"></a>
  <a href="https://github.com/withkynam/vibecode-pro-max-kit/graphs/contributors"><img src="https://img.shields.io/github/contributors/withkynam/vibecode-pro-max-kit" alt="Contributors"></a>
  <a href="https://github.com/withkynam/vibecode-pro-max-kit/actions/workflows/validate.yml"><img src="https://img.shields.io/github/actions/workflow/status/withkynam/vibecode-pro-max-kit/validate.yml" alt="CI"></a>
  <a href="https://github.com/withkynam/vibecode-pro-max-kit/commits/main"><img src="https://img.shields.io/github/last-commit/withkynam/vibecode-pro-max-kit" alt="Last Commit"></a>
  <img src="https://img.shields.io/badge/agents-12-orange" alt="Agents">
  <img src="https://img.shields.io/badge/skills-31-purple" alt="Skills">
  <img src="https://img.shields.io/badge/platforms-Claude_Code_%7C_Codex-black" alt="Platforms">
</p>

</div>

---

## 🚀 Cài đặt (30 giây)

```bash
curl -fsSL https://raw.githubusercontent.com/withkynam/vibecode-pro-max-kit/main/install.sh | bash
```

Sau đó mở Claude Code và gõ:

```
Run vc-setup
```

Vậy thôi. Skill setup sẽ detect stack của bạn, hỏi han về project (một cuộc trò chuyện thực sự, không phải checklist), scaffold thư mục process, deep-scan codebase, và populate các context files với nội dung thật — không phải placeholders.

<br>

<details>
<summary><strong>📦 Cài xong được gì</strong></summary>

<br>

```
your-project/
├── .claude/
│   ├── agents/              # 🤖 12 agent definitions chuyên biệt
│   │   ├── vc-research-agent.md
│   │   ├── vc-execute-agent.md
│   │   └── ...
│   ├── skills/              # ⚡ 31 skills tự động discover
│   │   ├── vc-generate-plan/
│   │   ├── vc-security/
│   │   ├── vc-scout/
│   │   └── ...
│   └── hooks/               # 🪝 7 lifecycle hooks
│       ├── privacy-block.cjs
│       ├── scout-block.cjs
│       └── ...
├── .codex/
│   └── agents/              # 🔄 Agents mirror cho Codex
├── CLAUDE.md                # 📋 Orchestrator + routing rules
├── AGENTS.md                # 📖 Agent registry
└── process/                 # 🧠 Được tạo bởi vc-setup (không phải install)
    └── ...
```

- **Project mới?** Cài full harness, sau đó `vc-setup` nghiên cứu codebase của bạn
- **Đã có `.claude/` config?** Backup vào `.vibecode-backup/`, cài mới, khôi phục `settings.json` của bạn
- **Đã có thư mục `process/`?** Không bao giờ bị đụng bởi install — `vc-setup` handle migration thông minh
- **Đã có `CLAUDE.md`?** Backup thành `CLAUDE.md.pre-vibecode`, cài version harness mới

</details>

<details>
<summary><strong>🤖 Prompt setup đầy đủ cho agent</strong> (copy-paste vào Claude Code để kiểm soát tối đa)</summary>

```
First, install the vibecode-pro-max-kit agent harness by running this command:

curl -fsSL https://raw.githubusercontent.com/withkynam/vibecode-pro-max-kit/main/install.sh | bash

After the install completes, run vc-setup to configure everything for this project.

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

<br>

<details>
<summary>📖 Mục lục</summary>

- [Vấn đề](#-vấn-đề)
- [Giải pháp](#️-giải-pháp)
- [Tại sao các team dùng cái này](#-tại-sao-các-team-dùng-cái-này)
- [Điểm khác biệt](#-điểm-khác-biệt)
- [Bên trong có gì](#-bên-trong-có-gì)
- [Cách hoạt động](#-cách-hoạt-động)
- [Hệ thống an toàn tích hợp](#️-hệ-thống-an-toàn-tích-hợp)
- [Contributing](#contributing)
- [Star History](#-star-history)

</details>

---

## 🔥 Vấn đề

Bạn bảo Claude "thêm webhook support." Nó lập tức bắt đầu viết code. Không hỏi gì về architecture. Không check các pattern đã có. Không plan. Bạn nhận được 400 dòng code không khớp với codebase, và mất cả tiếng để fix.

**Nhưng đó chỉ là bề nổi.** Những vấn đề sâu hơn mới đau thật:

<br>

> 🧠 **Context chết mỗi session**
>
> Agent quên sạch mọi thứ nó đã học. Cùng một lỗi, cùng một câu hỏi, lặp đi lặp lại. Không memory, không tích lũy knowledge.

> 📄 **Docs cũ ngay lập tức**
>
> Bạn viết context docs xịn tuần trước. Giờ đã outdated rồi. Không có gì tự động cập nhật chúng khi codebase thay đổi.

> 💥 **Task lớn sụp đổ giữa chừng**
>
> Context window đầy, state bị mất, agent bắt đầu hallucinate. Bạn phải restart lại từ đầu ở giờ thứ 3.

> 🤝 **Không spec, không review, không collaboration**
>
> PM của bạn không thể review cái agent sắp build. Không có artifact nào để chia sẻ, thảo luận, hay approve trước khi code được viết.

> 🎭 **Quyết định architecture bị hallucinate**
>
> Agent tự bịa pattern thay vì research xem các codebase khác giải quyết vấn đề tương tự như nào.

<br>

**Agent của bạn có intelligence nhưng không có process, không có memory, và không có cách nào collaborate với team.**

---

## 🛠️ Giải pháp

Bộ harness này cài đặt một hệ thống development hoàn chỉnh vào project của bạn — không chỉ một file CLAUDE.md, mà là **12 agents chuyên biệt, 31 skills**, và một workflow phase-locked buộc agent phải **hiểu trước khi build**.

<br>

| | Giải quyết vấn đề gì | Cách thức |
|---|---|---|
| 📋 | **Plans theo spec** | PMs và devs cùng review một plan artifact trước khi bất kỳ dòng code nào được viết |
| 🔄 | **Context tự cải thiện** | Tự động cập nhật mỗi khi ship feature — docs không bao giờ bị stale |
| ⚡ | **Autonomous execution** | Sống sót qua context compaction — chạy hàng giờ, không phải vài phút |
| 🧬 | **Architecture research** | Nghiên cứu các codebase thực trước khi đưa ra quyết định design |
| 🧭 | **Smart context routing** | Chỉ load những gì liên quan — không phải toàn bộ knowledge base mỗi lần |

<br>

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'fontSize': '16px', 'lineColor': '#8888AA'}} }%%
flowchart TD
    R["🔍 RESEARCH\nRead codebase, gather facts"]
    I["💡 INNOVATE\nExplore 2-3 approaches"]
    P["📋 PLAN\nWrite detailed spec"]
    E["⚡ EXECUTE\nImplement the plan"]
    T["✅ tester → reviewer → git-manager"]
    U["🧠 UPDATE PROCESS\nCapture learnings"]

    R -->|"you say 'go'"| I
    I -->|"you say 'go'"| P
    P -->|"ENTER EXECUTE MODE"| E
    E --> T
    E -->|"recommended"| U

    style R fill:#1565C0,stroke:#0D47A1,color:#FFFFFF
    style I fill:#E65100,stroke:#BF360C,color:#FFFFFF
    style P fill:#2E7D32,stroke:#1B5E20,color:#FFFFFF
    style E fill:#C62828,stroke:#B71C1C,color:#FFFFFF
    style T fill:#6A1B9A,stroke:#4A148C,color:#FFFFFF
    style U fill:#00695C,stroke:#004D40,color:#FFFFFF
```

Mỗi transition đều cần sự **phê duyệt rõ ràng** của bạn. Không có gì tự động chuyển phase. Bạn luôn nắm quyền kiểm soát.

---

## 💎 Tại sao các team dùng cái này

> Hầu hết các harness chỉ cho bạn một file CLAUDE.md và hướng dẫn. Cái này cho bạn một **hệ thống development autonomous** tích lũy intelligence theo thời gian.

<br>

### 📋 Spec-Driven Development — Không phải Vibes-Driven

Mỗi feature đều có một **plan với phân tích blast radius** trước khi bất kỳ dòng code nào được viết.

> 💡 Tự động tạo PRDs, quản lý backlogs, tổ chức feature groups. Phù hợp cho cả developers và product managers — agent plan như một senior engineer, không phải intern.

**Mỗi plan bao gồm:**

| Mục | Mục đích |
|---|---|
| 📍 **Touchpoints** | Mọi file sẽ được tạo hoặc sửa, liệt kê trước |
| 📜 **Public contracts** | Những API surfaces hoặc interfaces nào thay đổi |
| 💥 **Blast radius** | Cái gì có thể hỏng, tests nào cần chạy, cần theo dõi gì |
| ✅ **Verification evidence** | Cách chứng minh implementation là đúng |
| 🔄 **Resume handoff** | Đủ context để bất kỳ agent nào pick up giữa chừng plan |

<br>

### 🔄 Autonomous Multi-Phase Execution — Hàng giờ Hands-Free

Với những task lớn, agent chạy một **vòng lặp phân phase**:

```
🔍 research → ⚡ execute → ✅ validate → 📄 report → 🔄 repeat
```

> 💡 Nó tự heal khi bị stuck, tự reflect để cải thiện approach, và viết progress reports bền vững xuống disk. **Context compaction không thể kill nó** — toàn bộ state nằm trong files, không phải memory.

Đi pha cà phê rồi quay lại, mọi thứ đã xong.

<br>

### 🧬 Auto-Architecture Research — Học từ bất kỳ Codebase nào

Agent không chỉ đọc code của bạn — nó **nghiên cứu các repositories khác** để học cách họ giải quyết vấn đề tương tự (`vc-xia`).

> 💡 Nó research, so sánh các approaches, và adapt những patterns tốt nhất vào codebase của bạn. Các quyết định architecture dựa trên real-world implementations, không phải best practices bịa ra.

<br>

### 🧭 Persistent Smart Context Routing — Luôn đúng Context

Context không phải là một file khổng lồ. Nó được tổ chức thành **các knowledge domains tự động route**:

```
process/context/
├── all-context.md              # 🧭 Root router — đọc task, load cái liên quan
├── tests/
│   └── all-tests.md            # 🧪 Test runners, commands, debugging
├── container/
│   └── all-container.md        # 🐳 Docker, deployment, infra
├── uxui/
│   └── all-uxui.md             # 🎨 Components, design tokens, patterns
└── {your-domain}/
    └── all-{domain}.md         # 📚 Bất kỳ domain nào có 3+ durable docs
```

> 💡 Khi agent làm billing, nó load billing context — không phải toàn bộ docs codebase. Context **tự động cập nhật mỗi khi bạn hoàn thành feature**, nên nó không bao giờ stale.

<br>

### 🧠 Knowledge Base Tự Cải Thiện — Càng Ship Càng Thông Minh

Mỗi feature hoàn thành đều feed learnings ngược lại vào context system.

> 💡 Research findings, architectural decisions, debugging insights, và coding patterns được **capture và index tự động**. Feature thứ 100 được hưởng lợi từ mọi thứ đã học ở 99 feature trước. Knowledge tích lũy — nó không reset.

---

## ⚡ Điểm khác biệt

Hầu hết agent harnesses cho bạn một file CLAUDE.md to và vài hướng dẫn. Đây là những gì cái này thực sự làm:

<br>

### 🔒 Phase-Locked Tool Restrictions

Agent của bạn **không thể** viết code trong lúc research.

> Mỗi phase có tool restrictions được enforce ở agent level — RESEARCH chỉ read-only, INNOVATE không có Bash access, PLAN chỉ được ghi vào thư mục `process/`. Không phải kiểu hướng dẫn mà agent có thể bỏ qua — mà là **trực tiếp tắt luôn khả năng đó**.

<br>

### 🎯 Smart Auto-Routing với Intent Detection

Hệ thống detect intent từ ngôn ngữ tự nhiên và route đến pipeline đúng một cách tự động.

| Bạn nói | System detect | Route đến |
|---|---|---|
| "build webhook support" | Feature request | 🔍 research → 💡 innovate → 📋 plan → ⚡ execute |
| "login is broken" | Bug | 🐛 debugger → ⚡ execute |
| "clean up the auth module" | Refactor | ✨ code-simplifier (hoặc full pipeline nếu behavioral) |
| "add rate limiting" | Feature (fast) | ⏩ fast-mode (compressed pipeline) |

> 💡 Thứ tự ưu tiên 6 cấp để giải quyết xung đột khi nhiều intents khớp. Tối đa một câu hỏi làm rõ — không bao giờ hỏi 20 câu hỏi kiểu thẩm vấn.

<br>

### 🔍 Automatic Skill Discovery (Step 0)

Trước khi route bất kỳ request nào, orchestrator scan **31 skills** và match keywords.

> Nói "add webhook support" và nó tự động surface `vc-security` và `vc-scenario` cùng với feature workflow. Bạn không cần biết có skills nào — **chúng tự tìm đến bạn**.

<br>

### 💾 Sống sót qua Context Window Compaction

Khi context window đầy, **không mất gì cả**.

```
Plans          →  process/general-plans/active/
Reports        →  process/features/{feature}/reports/
Context docs   →  process/context/{domain}/all-{domain}.md
Learnings      →  process/context/all-context.md
Approval state →  re-injected by session-init hook after compaction
```

> 💡 Hook session-init detect compaction events và re-inject approval gate state — nên agent không thể âm thầm bỏ qua approval mà nó đã nhận.

<br>

### 🛡️ Self-Policing Violation Detection

Mỗi agent có built-in interrupt protocol.

> Khi nó detect mình sắp vượt phase boundary, nó tự dừng: *"PHASE JUMPING PREVENTED: [activity] belongs to EXECUTE but I'm in RESEARCH mode."* Đây là một **structural hallucination guard**.

<br>

### 🔄 Chạy trên cả Claude Code và Codex

Plans, context, và skills là shared artifacts.

```
.claude/agents/        ←→  .codex/agents/         # mirrored
.claude/skills/        ←→  .agents/skills          # symlinked
process/               ←→  shared by both          # plans, context, features
```

> 💡 Bắt đầu ở Claude Code, tiếp tục ở Codex. Cùng agents, cùng skills, cùng workflow.

---

## 🧭 Cách hoạt động

```
Request của bạn
  → Step 0: Skill Discovery (match keywords → surface relevant skills)
  → Intent Detection (feature / bug / question / refactor / UI)
  → Route đến agent đúng
  → Phase-locked execution với explicit transitions
```

Orchestrator **không bao giờ tự làm việc** — nó route, monitor, và quản lý transitions.

<br>

### 📊 Workflow

| Phase | Chuyện gì xảy ra | Bạn nói |
|-------|-------------|---------|
| 🔍 **RESEARCH** | Fact gathering read-only — codebase + web | *(tự động với feature requests)* |
| 💡 **INNOVATE** | Explore 2-3 approaches với trade-offs | `go` |
| 📋 **PLAN** | Viết spec chi tiết để bạn review | `go` |
| ⚡ **EXECUTE** | Implement đúng những gì đã plan | `ENTER EXECUTE MODE` |
| 🧠 **UPDATE PROCESS** | Capture learnings, cập nhật context, archive plan | *(khuyến khích sau non-trivial work)* |

> 💡 **Shortcuts:** `ENTER FAST MODE - [task]` nén RESEARCH+INNOVATE+PLAN thành một lượt — vẫn pause trước EXECUTE. Trivial fixes (single file, <15 dòng, không schema/auth changes) nhảy thẳng vào execute.

<br>

### 💻 Session điển hình

```
# 🆕 Feature request
You: "add webhook support to the API"
→ Skill discovery surfaces: vc-scenario, vc-security
→ research-agent thu thập context (read-only, không đụng code)
→ You say "go" → innovate-agent explore approaches
→ You say "go" → plan-agent viết spec với blast radius
→ You review plan, say "ENTER EXECUTE MODE"
→ execute-agent implement → self-review → tester → code-reviewer → git-manager
→ Closeout packet: thay đổi gì, verified gì, next step khuyến nghị
```

```
# 🐛 Bug fix
You: "login redirect is broken"
→ Route đến vc-debugger → thu thập evidence → competing hypotheses
→ Root cause xác định với proof chain
→ execute-agent implement fix → quality pipeline
```

```
# ⏩ Fast mode
You: "ENTER FAST MODE - add rate limiting middleware"
→ Nén research+innovate+plan trong một lượt
→ Safety pause bắt buộc → you review → "ENTER EXECUTE MODE"
```

```
# 🏗️ Large program
You: "build a full testing platform"
→ Tạo umbrella plan + phase plans trong feature folder
→ Mỗi phase: re-research → approve → execute → validate → durable report
→ Progress sống sót qua context compaction — durable reports trên disk
```

```
# 🔄 Autonomous optimization
You: "improve test coverage to 80% using vc-autoresearch"
→ Agent lặp: make change → commit → measure → keep/revert
→ Stuck detection sau 5 lần discard liên tiếp → strategy shift
→ Full audit trail trong TSV
```

---

## 🛡️ Hệ thống an toàn tích hợp

Đây không chỉ là guidelines — mà là **structural enforcement** được build vào mọi agent.

<br>

> ⏸️ **Check-In giữa chừng 50%**
>
> Đến khoảng nửa chặng execution, agent **tạm dừng** để báo cáo tiến độ, liệt kê items đã xong và còn lại, rồi hỏi: *"Tiếp tục approach hiện tại hay pause và quay lại PLAN?"*

> 🚫 **Không bao giờ âm thầm đi lệch**
>
> Nếu execute-agent gặp vấn đề cần đi lệch khỏi plan, nó **dừng ngay lập tức**, giải thích vấn đề, và quay lại PLAN mode. Không tự ý improvise.

> 🔙 **Approach Abandonment Protocol**
>
> Khi một approach fail, agent đánh giá reusable components, document lessons trước khi xóa, tạo abandonment summary, và quay lại PLAN. Knowledge được giữ lại, không bị mất.

> 🔐 **Privacy Guardrails Hook**
>
> Agent bị **chặn đọc** `.env`, credentials, SSH keys, và `.pem` files. Phải xin phê duyệt rõ ràng. Thiết kế fail-open nghĩa là hook bị lỗi cũng không block workflow của bạn.

> ⚠️ **High-Risk Evidence Packs**
>
> Với những thay đổi chạm vào auth, billing, schema migrations, hoặc public APIs — system yêu cầu evidence pack formal trước khi gọi công việc là "done." Tự động dừng nếu thiếu evidence.

> 📊 **Drift Signal Scoring**
>
> Sau execution, system chấm điểm mức độ cần thiết cho process updates: **LOW** (nhẹ nhàng), **MEDIUM** (thay đổi đáng kể), **HIGH** (đụng harness/protocol files). Thay đổi nhỏ được nhắc nhẹ. Thay đổi protocol được push mạnh.

---

## 🔍 Pre-Implementation Intelligence

Trước khi bất kỳ dòng code nào được viết, system có thể bắt issues thông qua phân tích chuyên biệt:

<br>

### 🎭 5-Persona Pre-Implementation Debate

**Skill:** `vc-predict`

| Persona | Focus |
|---|---|
| 🏗️ **Architect** | Structural integrity, extensibility, tech debt |
| 🔐 **Security** | Attack surfaces, auth flows, data exposure |
| ⚡ **Performance** | Latency, memory, scalability bottlenecks |
| 🎨 **UX** | User impact, edge cases, accessibility |
| 😈 **Devil's Advocate** | *"Sao không làm gì cả?"* — thách thức premise |

> 💡 Họ xác định agreements, giải quyết conflicts qua tradeoff weighting, và đưa ra verdict **GO / CAUTION / STOP**.

<br>

### 🎲 12-Dimension Edge Case Generator

**Skill:** `vc-scenario`

> Phân rã bất kỳ feature nào theo **12 dimensions** — tạo 3-5 scenarios mỗi dimension, xếp hạng theo severity. Outputs có thể dùng trực tiếp làm test specs.

| | | | |
|---|---|---|---|
| 👤 User Types | 📥 Input Extremes | ⏱️ Timing | 📈 Scale |
| 🔄 State Transitions | 🌍 Environment | 💥 Error Cascades | 🔑 Authorization |
| 💾 Data Integrity | 🔌 Integration | 📋 Compliance | 💰 Business Logic |

<br>

### 🔐 STRIDE + OWASP Security Audit

**Skill:** `vc-security`

> Dual-methodology security audit kết hợp **STRIDE threat modeling** với **OWASP Top 10**. Bao gồm dependency auditing, secret detection, và **auto-fix mode** sắp xếp findings theo severity và fix Critical trước — với regression guards ở mỗi bước.

---

## 🤖 Autonomous Agent Capabilities

<br>

### 🔄 Autonomous Metric Optimization

**Skill:** `vc-autoresearch`

Đặt mục tiêu, đi chơi. Agent chạy một **vòng lặp optimization có git-backed** trên bất kỳ metric đo được nào:

> 📈 Test coverage · 📦 Bundle size · ⚠️ ESLint errors · 🚀 Lighthouse score

Mỗi iteration thực hiện **MỘT thay đổi atomic** → commit → đo → giữ hoặc revert.

> 💡 Stuck detection trigger strategy shifts sau 5 lần discard liên tiếp. Full audit trail trong TSV.

<br>

### 👥 Parallel Agent Teams

**Skill:** `vc-team`

Nhiều agents độc lập làm việc **đồng thời** — không phải tuần tự:

| Template | Cách hoạt động |
|---|---|
| 🔍 **Research** | N góc nhìn được explore song song |
| ⚡ **Execute** | Parallel developers với **git worktree isolation** (zero file conflicts) |
| 🔎 **Review** | Reviewers độc lập tạo findings deduplicated, xếp hạng theo severity |
| 🐛 **Debug** | Competing hypotheses được test adversarially — debuggers cố disprove lẫn nhau |

<br>

### 🔬 Evidence-Before-Hypothesis Debugging

**Agent:** `vc-debugger`

> Debugger thu thập evidence trước → hình thành 2-3 competing hypotheses → test từng cái một cách có hệ thống → document elimination path → nêu root cause với evidence chain.

Nó **không bao giờ đoán — nó chứng minh.** Và nó không implement fixes — nó giao "fix boundary" lại cho execute-agent.

---

## ✅ Quality Pipeline — Tích hợp vào Execution

Execute-agent không chỉ viết code rồi gọi là xong. Nó tự động chain qua một **quality pipeline**:

<br>

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'fontSize': '16px', 'lineColor': '#8888AA'}} }%%
flowchart TD
    E["⚡ Execute-Agent\nImplements the plan"]
    SR["🔎 Self-Review\nLine-by-line check\nagainst plan"]
    T["🧪 Tester\nDiff-aware — only\nruns affected tests"]
    CR["🔍 Code Reviewer\nEdge case scout\n+ adversarial review"]
    CS["✨ Code Simplifier\nClarity refactoring"]
    GM["📦 Git Manager\nLogical commit splitting\nfrom touched_files"]

    E --> SR
    SR --> T
    T --> CR
    CR --> CS
    CS --> GM

    style E fill:#C62828,stroke:#B71C1C,color:#FFFFFF
    style SR fill:#AD1457,stroke:#880E4F,color:#FFFFFF
    style T fill:#6A1B9A,stroke:#4A148C,color:#FFFFFF
    style CR fill:#283593,stroke:#1A237E,color:#FFFFFF
    style CS fill:#00695C,stroke:#004D40,color:#FFFFFF
    style GM fill:#37474F,stroke:#263238,color:#FFFFFF
```

<br>

| Bước | Làm gì |
|---|---|
| 🔎 **Self-review** | Check mọi checklist item với plan để phát hiện deviations, document lại |
| 🧪 **Tester** | Map changed files sang test files, auto-escalate lên full suite khi >70% được mapped |
| 🔍 **Code reviewer** | Dispatch edge case scout TRƯỚC review, check N+1 queries, auth paths, data leaks |
| ✨ **Simplifier** | Clarity refactoring sau khi review pass — không thay đổi behavior |
| 📦 **Git manager** | Nhận danh sách `touched_files`, split thành logical conventional commits, từ chối unknown files |

---

## 📋 Plan Lifecycle — Spec-Driven, Không phải Vibes-Driven

Mọi feature non-trivial đều theo một **plan lifecycle** — một spec được viết ra, review, execute theo, và archive thành project history.

<br>

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'fontSize': '16px', 'lineColor': '#8888AA'}} }%%
flowchart TD
    A["🆕 Feature Request"]
    B["📝 Plan Created\nin active/"]
    C{"👀 User Reviews\nthe Plan"}
    D["⚡ Execute Against Plan"]
    E["📦 Plan Archived\nto completed/"]
    F["🧠 Learnings Written\nto all-context.md"]
    G["🔄 Next Feature\nStarts Smarter"]

    A --> B
    B --> C
    C -->|"✅ Approved"| D
    C -->|"✏️ Needs Changes"| B
    D --> E
    E --> F
    F --> G
    G -.->|"context compounds"| A

    style A fill:#1565C0,stroke:#0D47A1,color:#FFFFFF
    style B fill:#E65100,stroke:#BF360C,color:#FFFFFF
    style C fill:#F57F17,stroke:#F9A825,color:#000000
    style D fill:#C62828,stroke:#B71C1C,color:#FFFFFF
    style E fill:#6A1B9A,stroke:#4A148C,color:#FFFFFF
    style F fill:#00695C,stroke:#004D40,color:#FFFFFF
    style G fill:#1565C0,stroke:#0D47A1,color:#FFFFFF
```

<br>

> 💡 Sáu tháng sau, khi ai đó hỏi *"tại sao mình build auth kiểu này?"*, câu trả lời nằm trong `completed/`. Không bị trôi trong Slack thread.

<br>

**Plans nằm ở đâu trên disk:**

```
process/
├── general-plans/
│   ├── active/                  # 📋 Plans đang được làm
│   │   └── webhooks_PLAN_28-05-26.md
│   ├── completed/               # ✅ Plans đã archive (lịch sử tìm kiếm được)
│   ├── backlog/                 # 📌 Công việc trì hoãn
│   ├── reports/                 # 📄 Reports cross-cutting
│   └── references/              # 📚 Research outputs
└── features/
    └── billing/                 # 🏷️ Feature-scoped (5+ artifacts)
        ├── active/
        ├── completed/
        ├── backlog/
        ├── reports/
        └── references/
```

---

## 🏗️ Phase Programs — Dự án lớn không bị vỡ

Feature bình thường dùng một plan. **Dự án lớn multi-phase** dùng phase program — một umbrella plan cùng với các phase plans riêng, mỗi cái có validation gate riêng.

<br>

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'fontSize': '16px', 'lineColor': '#8888AA'}} }%%
flowchart TD
    UP["🎯 Umbrella Plan\nOverall program goal"]
    P1["📋 Phase 1 Plan"]
    P2["📋 Phase 2 Plan"]
    P3["📋 Phase 3 Plan"]

    R1["🔍 Re-Research"]
    E1["⚡ Execute"]
    V1["✅ Validate"]
    RP1["📄 Durable Report"]

    R2["🔍 Re-Research"]
    E2["⚡ Execute"]
    V2["✅ Validate"]
    RP2["📄 Durable Report"]

    UP --> P1
    UP --> P2
    UP --> P3

    P1 --> R1
    R1 -->|"approval"| E1
    E1 --> V1
    V1 --> RP1
    RP1 -.->|"learnings feed\nnext phase"| R2

    P2 --> R2
    R2 -->|"approval"| E2
    E2 --> V2
    V2 --> RP2

    style UP fill:#1565C0,stroke:#0D47A1,color:#FFFFFF
    style P1 fill:#E65100,stroke:#BF360C,color:#FFFFFF
    style P2 fill:#E65100,stroke:#BF360C,color:#FFFFFF
    style P3 fill:#E65100,stroke:#BF360C,color:#FFFFFF
    style R1 fill:#1565C0,stroke:#0D47A1,color:#FFFFFF
    style E1 fill:#C62828,stroke:#B71C1C,color:#FFFFFF
    style V1 fill:#2E7D32,stroke:#1B5E20,color:#FFFFFF
    style RP1 fill:#6A1B9A,stroke:#4A148C,color:#FFFFFF
    style R2 fill:#1565C0,stroke:#0D47A1,color:#FFFFFF
    style E2 fill:#C62828,stroke:#B71C1C,color:#FFFFFF
    style V2 fill:#2E7D32,stroke:#1B5E20,color:#FFFFFF
    style RP2 fill:#6A1B9A,stroke:#4A148C,color:#FFFFFF
```

<br>

**Tính năng chính:**

| | Tính năng | Tại sao quan trọng |
|---|---|---|
| 🔄 | **Re-research mỗi phase** | Check code drift, đọc reports mới nhất, cập nhật assumptions |
| ✅ | **Validation gates** | Phase chưa `VERIFIED` cho đến khi evidence chứng minh. Status trung thực: `PLANNED` → `CODE DONE` → `TESTING` → `VERIFIED` hoặc `BLOCKED` |
| 📄 | **Durable reports** | Mỗi phase viết results xuống disk. Progress sống sót qua context compaction |
| 🧠 | **Learnings feed forward** | Phát hiện Phase 1 cập nhật plan Phase 2 trước khi execute |
| 🏗️ | **Foundation vs expansion** | Tách rõ "chứng minh architecture" khỏi "implement mọi thứ" |
| 🚧 | **Honest blocker handling** | Phases bị blocked giữ nguyên `BLOCKED` với evidence. Không ép green status |

---

## 🧠 Context Groups — Knowledge có tổ chức, không phải một file khổng lồ

Project knowledge được tổ chức thành **context groups** — các knowledge domains bền vững, mỗi cái có một `all-{group}.md` router cho agents biết đọc gì và khi nào.

<br>

```
process/context/
├── all-context.md              # 🧭 Root router — architecture, stack, patterns, conventions
├── tests/
│   └── all-tests.md            # 🧪 Test runners, commands, debugging procedures
├── container/
│   └── all-container.md        # 🐳 Docker, deployment, infra procedures
├── uxui/
│   └── all-uxui.md             # 🎨 Components, design tokens, patterns
├── infra/
│   └── all-infra.md            # 🖥️ Worker nodes, provisioning, DNS
├── skills/
│   └── all-skills.md           # ⚡ Skill runtime, app architecture
├── workflows/
│   └── all-workflows.md        # 🔄 Workflow runtime, deployment
└── {your-domain}/
    └── all-{domain}.md         # 📚 Bất kỳ knowledge domain nào có 3+ durable docs
```

<br>

| | Cách hoạt động |
|---|---|
| 🧭 **Router pattern** | Agents chỉ đọc cái liên quan đến task, không phải mọi thứ |
| 📏 **Auto-promotion** | Topics có 3+ docs hoặc 800+ dòng tự có context group riêng |
| 🔄 **Living docs** | Được cập nhật bởi `update-process-agent` sau mỗi feature non-trivial |
| 🧪 **Auditable** | `vc-audit-context` verify routing và consistency |

---

## 📁 Feature Folders — Project Memory Tự Tổ Chức

Khi một topic tích lũy 5+ artifacts, nó có **feature folder** riêng — một lifecycle container hoàn chỉnh.

<br>

```
process/features/{feature}/
├── active/       # 📋 Plans đang được làm
├── completed/    # ✅ Plans đã archive (lịch sử quyết định tìm kiếm được)
├── backlog/      # 📌 Công việc trì hoãn (agents check trước khi tạo duplicate plans)
├── reports/      # 📄 Execution reports, post-mortems, validation results
└── references/   # 📚 Research outputs phục vụ quyết định tương lai
```

<br>

| | Chuyện gì xảy ra |
|---|---|
| 🆕 | Công việc mới bắt đầu ở `active/` → reports tích lũy → plan archive vào `completed/` |
| 📌 | Công việc trì hoãn vào `backlog/` — agents check trước khi tạo plans trùng lặp |
| 📦 | Feature promotion tự động khi general artifacts đạt 5+ |
| 🔍 | Mỗi feature có lịch sử hoàn chỉnh, khép kín — plans, decisions, reports, research |

---

## 🤖 Bên trong có gì

<br>

### 12 Agents

<details>
<summary>Click để xem danh sách agents (12 agents)</summary>

<br>

**Core workflow agents** — mỗi agent cho một phase RIPER-5:

| Agent | Vai trò |
|-------|------|
| 🔍 `vc-research-agent` | Codebase + web research, read-only. Có contradiction tracking |
| 💡 `vc-innovate-agent` | Brainstorm 2-3 approaches. Phải tạo decision summary trước PLAN |
| 📋 `vc-plan-agent` | Viết spec với anti-rationalization guards. "Tôi đã biết cách" không phải là plan |
| ⚡ `vc-execute-agent` | Implement theo plan. 50% check-in, deviation protocol, self-review |
| ⏩ `vc-fast-mode-agent` | RESEARCH→INNOVATE→PLAN nén lại với safety pause bắt buộc |
| 🧠 `vc-update-process-agent` | Checklist bắt buộc 7 bước bao gồm quét stale artifacts |

<br>

**Specialist agents** — được gọi trong EXECUTE hoặc standalone:

| Agent | Vai trò |
|-------|------|
| 🐛 `vc-debugger` | Evidence-before-hypothesis. Competing hypotheses, elimination chains |
| 🧪 `vc-tester` | Diff-aware. Chỉ chạy affected tests. Auto-escalate khi config thay đổi |
| 🔎 `vc-code-reviewer` | Edge case scout TRƯỚC review. N+1 detection, auth path validation |
| ✨ `vc-code-simplifier` | Clarity refactoring không thay đổi behavior |
| 🎨 `vc-ui-ux-designer` | Design-aware frontend. Có thể spawn research subagent giữa execution |
| 📦 `vc-git-manager` | Logical commit splitting từ `touched_files`. Từ chối unknown files |

</details>

<br>

### 31 Skills (tự động discover)

<details>
<summary>Click để xem danh sách skills (31 skills)</summary>

<br>

**🔧 Contract skills** — `vc-generate-plan` · `vc-generate-context` · `vc-audit-context` · `vc-audit-plans` · `vc-audit-vc` · `vc-setup` · `vc-update` · `vc-publish`

**🧠 Planning** — `vc-predict` (5-persona debate) · `vc-scenario` (12-dimension edge cases) · `vc-sequential-thinking` · `vc-problem-solving`

**🐛 Debug & security** — `vc-debug` · `vc-security` (STRIDE + OWASP + auto-fix) · `vc-autoresearch` (autonomous optimization)

**📚 Research** — `vc-docs-seeker` · `vc-scout` · `vc-docs` · `vc-repomix` · `vc-xia` (repo comparison)

**🎨 Frontend** — `vc-frontend-design` · `vc-chrome-devtools` · `vc-agent-browser` · `vc-web-testing`

**⚙️ Utilities** — `vc-context-engineering` · `vc-mcp-management` · `vc-preview` · `vc-team` (parallel agents) · `vc-tech-graph` · `vc-watzup` (session handoff) · `vc-merge-worktree`

</details>

<br>

### 🪝 7 Hooks

| Hook | Chức năng |
|------|-------------|
| 🔐 **Privacy guardrails** | Chặn `.env`, credentials, SSH keys. Yêu cầu phê duyệt rõ ràng |
| 🚫 **Scout blocker** | Ngăn agent lang thang vào `node_modules/`, `dist/`. Gitignore-syntax `.ckignore` |
| 🧠 **Session init** | Detect stack, inject env vars, khôi phục approval gates sau compaction |
| 💉 **Subagent context** | Inject ~200 token compact context block vào mọi subagent |
| ✨ **Edit quality** | Sau 5+ edits, nhắc chạy code-simplifier (non-blocking, throttled) |
| 📛 **Descriptive naming** | Language-aware file naming conventions trên mỗi Write |
| 📊 **Usage tracking** | Session metrics và token awareness |

<br>

**Mọi thứ nằm ở đâu:**

```
your-project/
├── .claude/
│   ├── agents/              # 🤖 12 agent definitions (.md)
│   ├── skills/              # ⚡ 31 skill modules (each a directory with SKILL.md)
│   └── hooks/               # 🪝 7 lifecycle hooks (.cjs)
├── .codex/
│   └── agents/              # 🔄 Mirrored cho Codex compatibility
├── .agents/
│   └── skills -> ../.claude/skills   # 🔗 Symlink cho Codex discovery
├── CLAUDE.md                # 📋 Orchestrator config + routing rules
├── AGENTS.md                # 📖 Agent + skill registry
└── process/
    ├── context/             # 🧠 Auto-routed knowledge domains
    ├── general-plans/       # 📋 Cross-cutting plans + reports
    ├── features/            # 🏷️ Feature-scoped lifecycle folders
    └── development-protocols/  # 📜 Shared workflow rules
```

---

## 🔄 Cập nhật

Pull những cải tiến harness mới nhất:

```
Run vc-update
```

> 💡 Hiển thị dry-run diff, đợi xác nhận. Thư mục `process/` và nội dung project-specific của bạn **không bao giờ bị đụng**.

---

## Contributing

Chúng tôi hoan nghênh contributions! Xem [CONTRIBUTING.md](CONTRIBUTING.md) để biết guidelines.

<br>

**Links nhanh:**

- 🐛 [Báo bug](https://github.com/withkynam/vibecode-pro-max-kit/issues/new?template=1.bug_report.yml)
- 💡 [Yêu cầu feature](https://github.com/withkynam/vibecode-pro-max-kit/issues/new?template=2.feature_request.yml)
- ⚡ [Submit skill](https://github.com/withkynam/vibecode-pro-max-kit/issues/new?template=3.skill_submission.yml)
- 🌐 [Thêm bản dịch](https://github.com/withkynam/vibecode-pro-max-kit/issues/new?template=5.translation.yml)

<br>

<a href="https://github.com/withkynam/vibecode-pro-max-kit/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=withkynam/vibecode-pro-max-kit" alt="Contributors" />
</a>

---

## ⭐ Star History

<a href="https://star-history.com/#withkynam/vibecode-pro-max-kit&Date">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=withkynam/vibecode-pro-max-kit&type=Date&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=withkynam/vibecode-pro-max-kit&type=Date" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=withkynam/vibecode-pro-max-kit&type=Date" />
 </picture>
</a>

---

## 📄 License

MIT
