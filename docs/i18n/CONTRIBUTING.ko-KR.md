<p align="center">
  <a href="../../CONTRIBUTING.md">English</a> |
  <a href="CONTRIBUTING.zh-CN.md">简体中文</a> |
  <a href="CONTRIBUTING.ja-JP.md">日本語</a> |
  <strong>한국어</strong> |
  <a href="CONTRIBUTING.vi-VN.md">Tiếng Việt</a> |
  <a href="CONTRIBUTING.pt-BR.md">Portugues</a>
</p>

# vibecode-pro-max-kit 기여 가이드

vibecode-pro-max-kit에 관심을 가져주셔서 감사해요! 이 프로젝트는 Claude Code와 Codex를 위한 즉시 사용 가능한 에이전트 harness를 제공하며, 모든 분의 기여를 환영해요.

이 프로젝트에 참여함으로써 [행동 강령](../../CODE_OF_CONDUCT.md)을 준수하는 것에 동의하게 돼요.

---

## 커뮤니케이션 채널

- **WhatsApp (메인):** [커뮤니티 그룹 참여하기](https://chat.whatsapp.com/E42ySo6iGmuAyeh25eAXuu?s=cl&p=i&mlu=1)
- **GitHub Issues:** 버그 리포트, 기능 요청, 작업 트래킹
- **GitHub Discussions:** 질문, 아이디어, 일반 대화

> 이게 유일한 커뮤니티 채널이에요 -- Discord, Slack, 또는 다른 플랫폼은 사용하지 않아요.

---

## 개발 사전 요구사항

기여하기 전에 다음이 설치되어 있는지 확인해주세요:

- **Node.js** >= 20
- **bash** 또는 **zsh** 셸
- **git** >= 2.30
- **운영체제:** macOS, Linux, 또는 WSL2가 있는 Windows

추가 패키지 매니저나 런타임은 필요 없어요. 이 harness는 zero-dependency로 설계되었어요.

---

## 기여 유형

다양한 종류의 기여를 환영해요:

### Skill

Skill은 `.claude/skills/` 아래에 있는 재사용 가능한 기능 모듈이에요. 각 skill은 다음을 충족해야 해요:

- 자체 디렉토리가 있어야 해요 (예: `.claude/skills/my-skill/`)
- YAML frontmatter(name, description, triggers)가 있는 `SKILL.md` 파일을 포함해야 해요
- `vc-` 접두사를 사용하면 **안 돼요** -- 이 접두사는 공식 harness skill 전용이에요
- 필요한 경우 헬퍼 스크립트는 `scripts/` 하위 디렉토리에 넣어야 해요

### Agent

Agent 정의는 다양한 워크플로우 페이즈를 위한 전문 페르소나를 제공해요. 각 agent는:

- `.claude/agents/` 버전 (Claude Code용)과 `.codex/agents/` 버전 (Codex용) 모두 있어야 해요
- 두 버전 간 동등성을 유지해야 해요
- 기존 네이밍 컨벤션을 따라야 해요

### Hook

`.claude/hooks/` 아래에 있는 pre/post 실행 hook이에요. Claude Code 세션의 특정 라이프사이클 시점에서 자동으로 실행돼요.

### Protocol

`process/development-protocols/` 아래의 개발 프로토콜 문서로, 공유 워크플로우 규칙과 컨벤션을 정의해요.

### 번역

더 많은 개발자가 harness에 접근할 수 있도록 문서와 skill 설명의 현지화 버전이에요.

### 문서

README.md, CLAUDE.md, AGENTS.md, 인라인 코멘트 또는 기타 문서의 개선이에요.

### 버그 수정

검증 스크립트, 설치 로직, seed 템플릿 또는 기타 기존 기능의 수정이에요.

---

## 시작하기

1. GitHub에서 레포지토리를 **Fork**하세요

2. fork를 로컬에 **Clone**하세요:

   ```bash
   git clone https://github.com/<your-username>/vibecode-pro-max-kit.git
   cd vibecode-pro-max-kit
   ```

3. 테스트 프로젝트에 harness를 **설치**해서 모든 게 잘 되는지 확인하세요:

   ```bash
   # From a test project directory
   bash /path/to/vibecode-pro-max-kit/install.sh
   ```

4. **setup skill을 실행**해서 설치된 harness를 확인하세요:

   ```bash
   # Inside a Claude Code session in the test project
   # Invoke the vc-setup skill
   ```

5. **검증 스크립트를 실행**해서 환경이 올바른지 확인하세요:

   ```bash
   node .claude/skills/vc-audit-vc/scripts/validate-agent-parity.mjs
   node .claude/skills/vc-audit-vc/scripts/validate-skills.mjs
   ```

   변경을 시작하기 전에 모든 검증이 통과해야 해요.

---

## 아키텍처 개요

이 harness는 Claude Code와 Codex 호환성을 위한 dual-surface 아키텍처를 따라요:

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

Skill은 `.agents/skills` symlink를 통해 양쪽 surface에서 공유돼요. Codex가 이 symlink를 사용해서 `.claude/skills/`를 탐색해요.

전체 아키텍처 세부사항은 CLAUDE.md와 AGENTS.md를 참고해주세요.

---

## Pull Request 가이드라인

### 범위

- PR은 집중적으로 유지하세요: **PR당 하나의 기여 유형**
- skill 하나 추가, agent 페어 하나, 버그 수정 하나 등
- 변경이 여러 영역에 걸치면 별도의 PR로 나눠주세요
- 목표 크기: 의미 있는 변경 **200-400줄**

### AI 보조 기여

AI 보조 기여를 환영하고 권장해요. AI 에이전트 harness인 만큼 AI 도구를 사용해서 만드는 게 당연하죠. 다만 제출하는 내용을 리뷰하고 이해했는지만 확인해주세요.

### Commit 메시지

conventional commit 형식을 사용해주세요:

- `feat:` -- 새로운 skill, agent, hook 또는 기능
- `fix:` -- 기존 기능의 버그 수정
- `docs:` -- 문서 전용 변경
- `chore:` -- 유지보수, 리팩토링 또는 툴링 변경

예시:

```
feat: add code-coverage skill with lcov parsing
fix: correct symlink detection in install.sh on WSL2
docs: add examples to vc-generate-plan SKILL.md
chore: update validate-skills.mjs to check frontmatter
```

### Branch 네이밍

설명적인 branch 이름을 사용해주세요:

```
feat/my-new-skill
fix/install-symlink-wsl
docs/contributing-guide
```

### PR 설명

PR 설명에 다음을 포함해주세요:

- 변경이 뭘 하는지, 왜 하는지
- 어떻게 테스트했는지 (어떤 검증 스크립트를 실행했는지)
- 브레이킹 체인지나 마이그레이션 참고사항

---

## vc-manifest.json

레포지토리 루트의 `vc-manifest.json` 파일은 harness의 모든 관리 파일을 추적해요. 새 파일(skill, agent, hook, protocol, seed)을 추가할 때 이 manifest를 업데이트해야 해요.

manifest는 `install.sh`와 `vc-update`가 어떤 파일을 복사하고 동기화할지 알기 위해 사용돼요. 새 파일이 manifest에 없으면 사용자가 harness를 설치하거나 업데이트할 때 포함되지 않아요.

manifest를 수정할 때:

- 적절한 섹션에 새 파일 경로를 추가하세요
- 각 섹션 내에서 항목을 알파벳순으로 정렬하세요
- 업데이트 후 검증 스크립트를 실행해서 일관성을 확인하세요

---

## Skill 기여 체크리스트

새 skill을 제출하기 전에 확인하세요:

- [ ] Skill이 `.claude/skills/<skill-name>/` 아래 자체 디렉토리에 있는지
- [ ] 유효한 YAML frontmatter(최소 name, description)가 있는 `SKILL.md`가 존재하는지
- [ ] Skill 이름에 `vc-` 접두사를 사용하지 **않는지** (공식 skill 전용)
- [ ] 헬퍼 스크립트가 `scripts/` 하위 디렉토리에 있는지
- [ ] `vc-manifest.json`이 모든 새 파일 경로로 업데이트되었는지
- [ ] 검증 통과:

  ```bash
  node .claude/skills/vc-audit-vc/scripts/validate-skills.mjs
  ```

---

## Agent 기여 체크리스트

새 agent를 제출하기 전에 확인하세요:

- [ ] `.claude/agents/<agent-name>.md`에 agent 정의가 있는지
- [ ] `.codex/agents/<agent-name>.md`에 매칭되는 정의가 있는지
- [ ] 두 버전이 기능적으로 동등한지 (같은 목적, 같은 도구 제한)
- [ ] Agent 동등성 검증 통과:

  ```bash
  node .claude/skills/vc-audit-vc/scripts/validate-agent-parity.mjs
  ```

---

## 리뷰 프로세스

PR을 제출한 후:

- 메인테이너가 **48 영업시간** 내에 PR을 리뷰할 거예요 (소프트 타겟이지 보장은 아니에요)
- 리뷰 전에 CI 검증 스크립트가 통과해야 해요
- 머지하려면 최소 **메인테이너 1명의 승인**이 필요해요
- **CLA는 필요 없어요** -- 기여는 레포지토리의 MIT 라이선스에 따라요

변경이 요청되면 후속 커밋으로 처리해주세요 (리뷰 코멘트 위에 force-push하지 마세요).

---

## 인정

모든 기여자를 인정해요:

- **README Contributors 섹션** -- [contrib.rocks](https://contrib.rocks)를 통해 자동 생성 (비주얼 배너)
- **상세 기여자 테이블** -- [all-contributors](https://allcontributors.org/) 봇으로 관리하며, 모든 기여 유형(코드, 문서, 디자인, 아이디어, 테스팅, 버그 리포트)을 인정해요. 기여자가 추가되면 봇이 PR을 통해 README를 자동 업데이트해요.
- **GitHub Release notes** -- 각 릴리스에서 기여자가 크레딧돼요
- **Skill/Agent 크레딧** -- 기여물의 `metadata.author` 필드에 여러분의 이름이 들어가요

봇 설정은 `.all-contributorsrc`를 참고하세요 (봇이 처음 초기화될 때 생성돼요).

### 기여자 래더

- **Contributor** -- 머지된 PR이 있는 분
- **Reviewer** -- PR 리뷰에 초대된 정기 기여자
- **Maintainer** -- 머지 권한이 있는 신뢰받는 기여자

승진은 기여의 양이 아니라 품질과 일관성에 기반해요.

---

## 기여 정책

PR은 기존 issue를 참조해야 해요. 맥락 없는 드라이브-바이 PR은 닫힐 수 있어요.

최고 기여자는 메인테이너로 초대될 수 있어요.

---

vibecode-pro-max-kit을 모두를 위해 더 좋게 만드는 데 도움을 주셔서 감사해요!
