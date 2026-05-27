<p align="center">
  <a href="../../CONTRIBUTING.md">English</a> |
  <a href="CONTRIBUTING.zh-CN.md">简体中文</a> |
  <a href="CONTRIBUTING.ja-JP.md">日本語</a> |
  <a href="CONTRIBUTING.ko-KR.md">한국어</a> |
  <strong>Tiếng Việt</strong> |
  <a href="CONTRIBUTING.pt-BR.md">Portugues</a>
</p>

# Đóng góp cho vibecode-pro-max-kit

Cảm ơn bạn đã quan tâm đến việc đóng góp cho vibecode-pro-max-kit! Project này cung cấp một agent harness sẵn dùng cho Claude Code và Codex, và chúng tôi hoan nghênh contributions từ mọi người.

Khi tham gia project này, bạn đồng ý tuân thủ [Code of Conduct](../../CODE_OF_CONDUCT.md) của chúng tôi.

---

## Kênh liên lạc

- **WhatsApp (chính):** [Tham gia group cộng đồng](https://chat.whatsapp.com/E42ySo6iGmuAyeh25eAXuu?s=cl&p=i&mlu=1)
- **GitHub Issues:** Báo bug, yêu cầu feature, và theo dõi task
- **GitHub Discussions:** Câu hỏi, ý tưởng, và trao đổi chung

> Đây là kênh cộng đồng duy nhất của chúng tôi -- chúng tôi không dùng Discord, Slack, hay các platform khác.

---

## Yêu cầu trước khi đóng góp

Trước khi đóng góp, đảm bảo bạn đã cài:

- **Node.js** >= 20
- **bash** hoặc **zsh** shell
- **git** >= 2.30
- **Hệ điều hành:** macOS, Linux, hoặc Windows với WSL2

Không cần thêm package managers hay runtimes nào khác. Harness được thiết kế zero-dependency.

---

## Các loại đóng góp

Chúng tôi hoan nghênh nhiều kiểu đóng góp:

### Skills

Skills là các capability modules tái sử dụng nằm dưới `.claude/skills/`. Mỗi skill phải:

- Có thư mục riêng (ví dụ: `.claude/skills/my-skill/`)
- Chứa file `SKILL.md` với YAML frontmatter (name, description, triggers)
- **Không** dùng prefix `vc-` -- prefix đó dành riêng cho official harness skills
- Bao gồm helper scripts trong thư mục con `scripts/` nếu cần

### Agents

Agent definitions cung cấp các personas chuyên biệt cho từng workflow phase. Mỗi agent phải:

- Có cả version `.claude/agents/` (cho Claude Code) và `.codex/agents/` (cho Codex)
- Duy trì parity giữa hai versions
- Tuân theo naming conventions hiện có

### Hooks

Hooks pre- và post-execution nằm dưới `.claude/hooks/`. Chúng chạy tự động tại các lifecycle points cụ thể trong Claude Code sessions.

### Protocols

Tài liệu development protocol dưới `process/development-protocols/` định nghĩa shared workflow rules và conventions.

### Translations

Bản dịch localized của documentation và skill descriptions để harness dễ tiếp cận hơn với nhiều developers.

### Documentation

Cải thiện README.md, CLAUDE.md, AGENTS.md, inline comments, hoặc bất kỳ documentation nào khác.

### Bug Fixes

Sửa lỗi cho validation scripts, install logic, seed templates, hoặc bất kỳ chức năng hiện có nào.

---

## Bắt đầu

1. **Fork** repository trên GitHub

2. **Clone** fork về máy:

   ```bash
   git clone https://github.com/<your-username>/vibecode-pro-max-kit.git
   cd vibecode-pro-max-kit
   ```

3. **Cài** harness vào một test project để verify mọi thứ hoạt động:

   ```bash
   # Từ thư mục test project
   bash /path/to/vibecode-pro-max-kit/install.sh
   ```

4. **Chạy setup skill** để verify harness đã cài:

   ```bash
   # Trong Claude Code session ở test project
   # Gọi skill vc-setup
   ```

5. **Chạy validation scripts** để confirm môi trường đúng:

   ```bash
   node .claude/skills/vc-audit-vc/scripts/validate-agent-parity.mjs
   node .claude/skills/vc-audit-vc/scripts/validate-skills.mjs
   ```

   Tất cả validations phải pass trước khi bạn bắt đầu thay đổi.

---

## Tổng quan Architecture

Harness theo kiến trúc dual-surface cho Claude Code và Codex compatibility:

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

Skills được share giữa hai surfaces qua symlink `.agents/skills` mà Codex dùng để discover `.claude/skills/`.

Xem CLAUDE.md và AGENTS.md để biết chi tiết architecture đầy đủ.

---

## Hướng dẫn Pull Request

### Scope

- Giữ pull requests tập trung: **một loại đóng góp mỗi PR**
- Một skill mới, một cặp agent, một bug fix, v.v.
- Nếu thay đổi đụng nhiều areas, tách thành PR riêng
- Kích thước mục tiêu: **200-400 dòng** thay đổi có ý nghĩa

### AI-Assisted Contributions

AI-assisted contributions được hoan nghênh và khuyến khích. Đây là agent harness cho AI — dùng AI tools để build nó hoàn toàn hợp lý. Chỉ cần đảm bảo bạn review và hiểu cái bạn đang submit.

### Commit Messages

Dùng conventional commit format:

- `feat:` -- Skill, agent, hook, hoặc capability mới
- `fix:` -- Bug fix trong chức năng hiện có
- `docs:` -- Chỉ thay đổi documentation
- `chore:` -- Maintenance, refactoring, hoặc thay đổi tooling

Ví dụ:

```
feat: add code-coverage skill with lcov parsing
fix: correct symlink detection in install.sh on WSL2
docs: add examples to vc-generate-plan SKILL.md
chore: update validate-skills.mjs to check frontmatter
```

### Branch Naming

Dùng tên branch mô tả rõ ràng:

```
feat/my-new-skill
fix/install-symlink-wsl
docs/contributing-guide
```

### PR Description

Bao gồm trong mô tả pull request:

- Thay đổi gì và tại sao
- Bạn đã test như nào (chạy validation scripts nào)
- Breaking changes hoặc migration notes nếu có

---

## vc-manifest.json

File `vc-manifest.json` ở root repository theo dõi tất cả managed files trong harness. Khi bạn thêm files mới (skills, agents, hooks, protocols, seeds), bạn phải cập nhật manifest này.

Manifest được dùng bởi `install.sh` và `vc-update` để biết files nào cần copy và sync. Nếu file mới không có trong manifest, nó sẽ không được include khi users install hoặc update harness.

Khi sửa manifest:

- Thêm file paths mới vào section tương ứng
- Giữ entries sắp xếp theo alphabet trong mỗi section
- Chạy validation scripts sau khi cập nhật để confirm consistency

---

## Checklist đóng góp Skill

Trước khi submit skill mới, verify:

- [ ] Skill nằm trong thư mục riêng dưới `.claude/skills/<skill-name>/`
- [ ] `SKILL.md` tồn tại với YAML frontmatter hợp lệ (tối thiểu name, description)
- [ ] Tên skill **không** dùng prefix `vc-` (dành riêng cho official skills)
- [ ] Helper scripts nằm trong thư mục con `scripts/`
- [ ] `vc-manifest.json` đã được cập nhật với tất cả file paths mới
- [ ] Validation pass:

  ```bash
  node .claude/skills/vc-audit-vc/scripts/validate-skills.mjs
  ```

---

## Checklist đóng góp Agent

Trước khi submit agent mới, verify:

- [ ] Agent definition tồn tại trong `.claude/agents/<agent-name>.md`
- [ ] Definition tương ứng tồn tại trong `.codex/agents/<agent-name>.md`
- [ ] Cả hai versions tương đương về chức năng (cùng purpose, cùng tool restrictions)
- [ ] Agent parity validation pass:

  ```bash
  node .claude/skills/vc-audit-vc/scripts/validate-agent-parity.mjs
  ```

---

## Quy trình Review

Sau khi bạn submit pull request:

- Maintainer sẽ review PR của bạn trong **48 giờ làm việc** (mục tiêu mềm, không phải cam kết)
- CI validation scripts phải pass trước khi review
- Cần tối thiểu **một maintainer approval** để merge
- **Không cần CLA** -- đóng góp của bạn được điều chỉnh bởi MIT license của repository

Nếu có yêu cầu thay đổi, vui lòng address trong follow-up commits (không force-push đè lên review comments).

---

## Ghi nhận đóng góp

Tất cả contributors đều được ghi nhận:

- **README Contributors section** -- Tự động tạo qua [contrib.rocks](https://contrib.rocks) (visual banner)
- **Bảng contributor chi tiết** -- Quản lý qua [all-contributors](https://allcontributors.org/) bot, ghi nhận mọi loại đóng góp (code, docs, design, ideas, testing, bug reports). Bot tự động cập nhật README qua PR khi contributors được thêm.
- **GitHub Release notes** -- Contributors được credit trong mỗi release
- **Skill/Agent credits** -- Tên bạn trong field `metadata.author` của đóng góp

Xem `.all-contributorsrc` cho bot configuration (được tạo khi bot được khởi tạo lần đầu).

### Contributor Ladder

- **Contributor** -- Bất kỳ ai có merged PR
- **Reviewer** -- Contributors thường xuyên được mời review PRs
- **Maintainer** -- Contributors đáng tin cậy có merge access

Thăng tiến dựa trên chất lượng và tính nhất quán của contributions, không phải số lượng.

---

## Chính sách đóng góp

PRs nên reference một issue đã có. Drive-by PRs không có context có thể bị close.

Top contributors có thể được mời làm maintainers.

---

Cảm ơn bạn đã giúp vibecode-pro-max-kit tốt hơn cho mọi người!
