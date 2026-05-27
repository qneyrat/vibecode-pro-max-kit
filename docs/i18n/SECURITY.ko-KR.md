<p align="center">
  <a href="../../SECURITY.md">English</a> |
  <a href="SECURITY.zh-CN.md">简体中文</a> |
  <a href="SECURITY.ja-JP.md">日本語</a> |
  <strong>한국어</strong> |
  <a href="SECURITY.vi-VN.md">Tiếng Việt</a> |
  <a href="SECURITY.pt-BR.md">Portugues</a>
</p>

# 보안 정책

## 지원 버전

| 버전 | 지원 여부 |
|---------|-----------|
| 최신 릴리스 | Yes |
| 이전 버전 | No |

## 취약점 신고

**보안 취약점에 대해 공개 issue를 열지 마세요.**

대신 GitHub Security Advisories를 사용해서 비공개로 취약점을 신고해주세요:

[취약점 신고하기](https://github.com/withkynam/vibecode-pro-max-kit/security/advisories/new)

> **참고:** 레포지토리 설정에서 Private Vulnerability Reporting이 활성화되어 있어야 "Report a vulnerability" 버튼이 나타나요.

### 응답 타임라인

- 신고 접수 후 **48시간** 이내 확인
- **7일** 이내 초기 평가 및 심각도 분류
- 전체 프로세스 동안 진행 상황을 계속 알려드릴게요

## 범위

### 범위 내

- **Hook 스크립트** (`privacy-block.cjs`, `scout-block.cjs`) — 에이전트가 차단된 리소스에 접근할 수 있게 하는 우회 취약점
- **install.sh** — 공급망 공격, 명령어 인젝션, 또는 경로 순회
- **Agent 프롬프트** — phase-locking이나 도구 제한을 우회하는 프롬프트 인젝션
- **프라이버시 누출** — 가드레일이 있음에도 에이전트가 자격 증명, API 키, 또는 민감한 파일에 접근하는 경우
- **System-reminder / subagent-init 인젝션** — 에이전트 동작을 조작하는 컨텍스트 인젝션 공격

### 범위 외

- Claude Code 또는 Codex 자체의 취약점 (각각 Anthropic 또는 OpenAI에 신고해주세요)
- 사용자 프로젝트 코드의 문제 (harness가 아닌 경우)
- 메인테이너를 대상으로 한 소셜 엔지니어링 공격

## 공개 타임라인

- 확인된 취약점을 **30일** 이내에 수정하는 것을 목표로 해요
- 수정이 릴리스된 후 조율된 공개
- 릴리스 노트에서 신고자에게 크레딧을 드려요 (익명을 원하시면 존중해요)

## Safe Harbor

선의로 수행된 보안 리서치는 승인된 것으로 간주해요. 이 정책을 따르고 선의로 행동하는 연구자에 대해 법적 조치를 취하지 않을 거예요.

자신의 리서치가 해당되는지 확실하지 않다면, 테스트 전에 먼저 연락해주세요 — 범위를 기꺼이 명확히 해드릴게요.
