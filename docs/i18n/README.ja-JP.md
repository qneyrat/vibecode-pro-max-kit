<p align="center">
  <a href="../../README.md">English</a> |
  <a href="README.zh-CN.md">简体中文</a> |
  <strong>日本語</strong> |
  <a href="README.ko-KR.md">한국어</a> |
  <a href="README.vi-VN.md">Tiếng Việt</a> |
  <a href="README.pt-BR.md">Portugues</a>
</p>

<div align="center">

<a href="https://flowser.ai">
  <img src="assets/flowser-logo.svg" alt="Flowser" width="120">
</a>

*[Flowser.ai](https://flowser.ai) がスポンサーです — GTM向けコンピュータ付きAIエージェント*

<br>

# vibecode-pro-max-kit

**あなたのAIコーディングエージェント、プロジェクトを理解する前にコードを書き始めてませんか？<br>このハーネスを導入すれば、リサーチし、計画を立て、機能を出すたびに賢くなるシニアエンジニアに変わります。**

<br>

🔬 AIエージェントのためのスペック駆動開発<br>
📋 PRDの自動生成、バックログ管理、コンテキストの自動ルーティング<br>
🧠 機能をリリースするたびに成長する自己改善型ナレッジベース<br>
⚡ 大きなタスクでも状態を失わずに何時間も自律実行<br>
🤝 プランとスペックは共有可能——開発者、PM、ステークホルダーが同じ成果物をレビューできます

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

## 🚀 インストール（30秒）

```bash
curl -fsSL https://raw.githubusercontent.com/withkynam/vibecode-pro-max-kit/main/install.sh | bash
```

次にClaude Codeを開いて、こう言ってください：

```
Run vc-setup
```

以上です。セットアップスキルがスタックを検出し、プロジェクトについて質問し（チェックリストではなく本当の会話です）、processディレクトリを構築し、コードベースをディープスキャンして、コンテキストファイルにプレースホルダーではなく実際の内容を書き込みます。

<br>

<details>
<summary><strong>📦 インストールされるもの</strong></summary>

<br>

```
your-project/
├── .claude/
│   ├── agents/              # 🤖 12の専門エージェント定義
│   │   ├── vc-research-agent.md
│   │   ├── vc-execute-agent.md
│   │   └── ...
│   ├── skills/              # ⚡ 31の自動検出スキル
│   │   ├── vc-generate-plan/
│   │   ├── vc-security/
│   │   ├── vc-scout/
│   │   └── ...
│   └── hooks/               # 🪝 7つのライフサイクルフック
│       ├── privacy-block.cjs
│       ├── scout-block.cjs
│       └── ...
├── .codex/
│   └── agents/              # 🔄 Codex用ミラーエージェント
├── CLAUDE.md                # 📋 オーケストレーター＋ルーティングルール
├── AGENTS.md                # 📖 エージェントレジストリ
└── process/                 # 🧠 vc-setupで作成（installでは作成されません）
    └── ...
```

- **新規プロジェクト？** フルハーネスをインストール後、`vc-setup`がコードベースを調査します
- **既存の`.claude/`設定がある？** `.vibecode-backup/`にバックアップし、新規インストール後、`settings.json`を復元します
- **既存の`process/`ディレクトリがある？** installでは一切触りません——`vc-setup`がインテリジェントにマイグレーションします
- **既存の`CLAUDE.md`がある？** `CLAUDE.md.pre-vibecode`としてバックアップし、ハーネスバージョンをインストールします

</details>

<details>
<summary><strong>🤖 フルエージェントセットアッププロンプト</strong>（最大限コントロールしたい場合はClaude Codeにコピペしてください）</summary>

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
<summary>📖 目次</summary>

- [課題](#-課題)
- [解決策](#️-解決策)
- [チームが使う理由](#-チームが使う理由)
- [何が違うのか](#-何が違うのか)
- [中身の紹介](#-中身の紹介)
- [仕組み](#-仕組み)
- [組み込みセーフティシステム](#️-組み込みセーフティシステム)
- [コントリビュート](#コントリビュート)
- [Star History](#-star-history)

</details>

---

## 🔥 課題

Claudeに「Webhook対応を追加して」と頼むと、すぐにコードを書き始めます。アーキテクチャについて質問もしない。既存パターンのチェックもしない。プランもなし。コードベースに合わない400行ができあがって、修正に1時間かかります。

**でもこれは表面的な問題に過ぎません。** もっと根深い問題があります：

<br>

> 🧠 **セッションごとにコンテキストが消える**
>
> エージェントは学んだことを全部忘れます。毎回同じミス、同じ質問。記憶もなく、知識の蓄積もありません。

> 📄 **ドキュメントが一瞬で古くなる**
>
> 先週いいコンテキストドキュメントを書いたのに、もう古くなってます。コードベースの変化に合わせて自動更新する仕組みがありません。

> 💥 **大きなタスクが途中で破綻する**
>
> コンテキストウィンドウがいっぱいになり、状態が失われ、エージェントがハルシネーションを始めます。3時間目にゼロからやり直しです。

> 🤝 **スペックもレビューもコラボレーションもない**
>
> PMがエージェントのビルド内容をレビューできない。コードを書く前に共有・議論・承認できる成果物がありません。

> 🎭 **アーキテクチャの判断がハルシネーションされる**
>
> エージェントは他のコードベースがどう解決したかを調べずに、パターンをでっち上げます。

<br>

**あなたのエージェントには知性があっても、プロセスも記憶もチームとのコラボレーション手段もないのです。**

---

## 🛠️ 解決策

このハーネスは、単なるCLAUDE.mdファイルではなく、完全な開発システムをプロジェクトにインストールします——**12の専門エージェント、31のスキル**、そしてエージェントに**理解してからビルドする**ことを強制するフェーズロック型ワークフローです。

<br>

| | 解決する課題 | どうやって |
|---|---|---|
| 📋 | **スペック駆動プラン** | コードを一行も書く前に、PMと開発者が同じプラン成果物をレビューします |
| 🔄 | **自己改善型コンテキスト** | 機能リリースのたびに自動更新——ドキュメントが古くなりません |
| ⚡ | **自律実行** | コンテキストコンパクションを生き延びる——分単位ではなく時間単位で動きます |
| 🧬 | **アーキテクチャリサーチ** | 設計判断の前に実際のコードベースを調査します |
| 🧭 | **スマートコンテキストルーティング** | 毎回ナレッジベース全体ではなく、関連するものだけを読み込みます |

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

すべてのフェーズ遷移には**あなたの明示的な承認**が必要です。自動で進むことはありません。常にあなたがコントロールできます。

---

## 💎 チームが使う理由

> ほとんどのハーネスはCLAUDE.mdと指示書を渡すだけです。これは時間とともに知性が蓄積される**自律型開発システム**です。

<br>

### 📋 スペック駆動開発——バイブス駆動ではなく

すべての機能に、コードを一行も書く前に**影響範囲分析付きの計画書**が作成されます。

> 💡 PRDの自動生成、バックログ管理、フィーチャーグループの整理。開発者とプロダクトマネージャーの両方に対応——エージェントはインターンではなくシニアエンジニアのように計画します。

**すべてのプランに含まれるもの：**

| セクション | 目的 |
|---|---|
| 📍 **タッチポイント** | 作成・変更されるすべてのファイルを事前にリストアップ |
| 📜 **パブリックコントラクト** | どのAPIサーフェスやインターフェースが変わるか |
| 💥 **影響範囲** | 何が壊れる可能性があるか、どのテストを実行するか、何に注意するか |
| ✅ **検証エビデンス** | 実装が正しいことをどう証明するか |
| 🔄 **リジュームハンドオフ** | どのエージェントでもプランの途中から引き継げる十分なコンテキスト |

<br>

### 🔄 自律マルチフェーズ実行——何時間もハンズフリーで作業

大きなタスクでは、エージェントが**反復的なフェーズループ**を実行します：

```
🔍 research → ⚡ execute → ✅ validate → 📄 report → 🔄 repeat
```

> 💡 行き詰まったら自己回復し、自己反省でアプローチを改善し、永続的な進捗レポートをディスクに書き込みます。**コンテキストコンパクションでも死にません**——すべての状態はメモリではなくファイルに保存されます。

席を離れて戻ってきたら、作業が完了しています。

<br>

### 🧬 自動アーキテクチャリサーチ——あらゆるコードベースから学ぶ

エージェントはあなたのコードを読むだけでなく、**他のリポジトリを調査**して同様の問題をどう解決したかを学びます（`vc-xia`）。

> 💡 リサーチし、アプローチを比較し、最適なパターンをコードベースに適用します。アーキテクチャの判断は、ハルシネーションされたベストプラクティスではなく、実際の実装に基づきます。

<br>

### 🧭 永続スマートコンテキストルーティング——常に適切なコンテキスト

コンテキストは一つの巨大なファイルではありません。**自動ルーティングされるナレッジドメイン**に整理されています：

```
process/context/
├── all-context.md              # 🧭 ルートルーター——タスクを読み取り、関連するものを読み込む
├── tests/
│   └── all-tests.md            # 🧪 テストランナー、コマンド、デバッグ
├── container/
│   └── all-container.md        # 🐳 Docker、デプロイ、インフラ
├── uxui/
│   └── all-uxui.md             # 🎨 コンポーネント、デザイントークン、パターン
└── {your-domain}/
    └── all-{domain}.md         # 📚 3つ以上の永続ドキュメントがあるドメイン
```

> 💡 エージェントが請求関連の作業をする時は、請求コンテキストだけを読み込みます——コードベースのドキュメント全部ではありません。コンテキストは**機能が完了するたびに自動更新**されるので、古くなりません。

<br>

### 🧠 自己改善型ナレッジベース——リリースするほど賢くなる

完了した機能ごとに、学びをコンテキストシステムにフィードバックします。

> 💡 リサーチ結果、アーキテクチャの判断、デバッグの知見、コーディングパターンが**自動的にキャプチャされてインデックスされます**。100個目の機能は最初の99個で学んだすべてから恩恵を受けます。知識は蓄積されます——リセットされません。

---

## ⚡ 何が違うのか

ほとんどのエージェントハーネスは大きなCLAUDE.mdといくつかの指示をくれるだけです。これが実際にやることはこうです：

<br>

### 🔒 フェーズロック型ツール制限

エージェントはリサーチ中に文字通り**コードを書くことができません**。

> 各フェーズにはエージェントレベルで強制されるツール制限があります——RESEARCHはリードオンリー、INNOVATEはBashアクセスが一切なし、PLANは`process/`ディレクトリにのみ書き込み可能。無視できる指示ではありません——**実際に機能を制限します**。

<br>

### 🎯 インテント検出によるスマート自動ルーティング

システムが自然言語からあなたの意図を検出し、正しいパイプラインに自動ルーティングします。

| あなたの発言 | システムが検出 | ルーティング先 |
|---|---|---|
| "build webhook support" | 機能リクエスト | 🔍 research → 💡 innovate → 📋 plan → ⚡ execute |
| "login is broken" | バグ | 🐛 debugger → ⚡ execute |
| "clean up the auth module" | リファクタ | ✨ code-simplifier（振る舞いが変わる場合はフルパイプライン） |
| "add rate limiting" | 機能（高速） | ⏩ fast-mode（短縮パイプライン） |

> 💡 複数のインテントが一致した場合、6段階の優先順位で解決します。質問は最大1つ——20回も質問攻めにしません。

<br>

### 🔍 自動スキルディスカバリー（Step 0）

リクエストをルーティングする前に、オーケストレーターが**31のスキル**をスキャンしてキーワードをマッチングします。

> "add webhook support"と言えば、自動的に`vc-security`と`vc-scenario`がフィーチャーワークフローと一緒にサーフェスされます。どんなスキルがあるか知る必要はありません——**スキルがあなたを見つけます**。

<br>

### 💾 コンテキストウィンドウコンパクションを生き延びる

コンテキストウィンドウがいっぱいになっても、**何も失われません**。

```
Plans          →  process/general-plans/active/
Reports        →  process/features/{feature}/reports/
Context docs   →  process/context/{domain}/all-{domain}.md
Learnings      →  process/context/all-context.md
Approval state →  re-injected by session-init hook after compaction
```

> 💡 session-initフックがコンパクションイベントを検出し、承認ゲートの状態を再注入します——エージェントが既に受けた承認をサイレントにスキップすることはできません。

<br>

### 🛡️ 自己ポリシング違反検出

すべてのエージェントに割り込みプロトコルが組み込まれています。

> フェーズ境界を超えようとしたことを検出すると、自ら停止します：*"PHASE JUMPING PREVENTED: [activity] belongs to EXECUTE but I'm in RESEARCH mode."* これは**構造的ハルシネーションガード**です。

<br>

### 🔄 Claude CodeとCodexの両方で動作

プラン、コンテキスト、スキルは共有アーティファクトです。

```
.claude/agents/        ←→  .codex/agents/         # mirrored
.claude/skills/        ←→  .agents/skills          # symlinked
process/               ←→  shared by both          # plans, context, features
```

> 💡 Claude Codeで始めて、Codexで続行。同じエージェント、同じスキル、同じワークフロー。

---

## 🧭 仕組み

```
Your request
  → Step 0: Skill Discovery (match keywords → surface relevant skills)
  → Intent Detection (feature / bug / question / refactor / UI)
  → Route to the right agent
  → Phase-locked execution with explicit transitions
```

オーケストレーターは**自分では作業を行いません**——ルーティング、モニタリング、遷移管理を行います。

<br>

### 📊 ワークフロー

| フェーズ | 何が起きるか | あなたの発言 |
|-------|-------------|---------|
| 🔍 **RESEARCH** | リードオンリーのファクトギャザリング——コードベース＋Web | *（機能リクエスト時に自動）* |
| 💡 **INNOVATE** | トレードオフ付きで2〜3のアプローチを探索 | `go` |
| 📋 **PLAN** | レビュー可能な詳細スペックを作成 | `go` |
| ⚡ **EXECUTE** | プラン通りに実装 | `ENTER EXECUTE MODE` |
| 🧠 **UPDATE PROCESS** | 学びをキャプチャ、コンテキスト更新、プランアーカイブ | *（重要な作業の後に推奨）* |

> 💡 **ショートカット：** `ENTER FAST MODE - [task]`でRESEARCH+INNOVATE+PLANを1パスに圧縮——それでもEXECUTEの前には必ず一時停止します。些細な修正（単一ファイル、15行未満、スキーマ/認証変更なし）はそのままexecuteへ直行します。

<br>

### 💻 典型的なセッション

```
# 🆕 Feature request
You: "add webhook support to the API"
→ Skill discovery surfaces: vc-scenario, vc-security
→ research-agent gathers context (read-only, can't touch code)
→ You say "go" → innovate-agent explores approaches
→ You say "go" → plan-agent writes spec with blast radius
→ You review the plan, say "ENTER EXECUTE MODE"
→ execute-agent implements → self-review → tester → code-reviewer → git-manager
→ Closeout packet: what changed, what's verified, recommended next step
```

```
# 🐛 Bug fix
You: "login redirect is broken"
→ Routes to vc-debugger → evidence gathering → competing hypotheses
→ Root cause identified with proof chain
→ execute-agent implements the fix → quality pipeline
```

```
# ⏩ Fast mode
You: "ENTER FAST MODE - add rate limiting middleware"
→ Compressed research+innovate+plan in one pass
→ Mandatory safety pause → you review → "ENTER EXECUTE MODE"
```

```
# 🏗️ Large program
You: "build a full testing platform"
→ Creates umbrella plan + phase plans in a feature folder
→ Each phase: re-research → approve → execute → validate → durable report
→ Progress survives context compaction — durable reports on disk
```

```
# 🔄 Autonomous optimization
You: "improve test coverage to 80% using vc-autoresearch"
→ Agent iterates: make change → commit → measure → keep/revert
→ Stuck detection after 5 consecutive discards → strategy shift
→ Full audit trail in TSV
```

---

## 🛡️ 組み込みセーフティシステム

これらは単なるガイドラインではありません——すべてのエージェントに組み込まれた**構造的な強制力**です。

<br>

> ⏸️ **50%中間チェックイン**
>
> 実行のおよそ半分の地点で、エージェントが**一時停止**し、進捗を報告し、完了済みと残りのアイテムをリストし、こう聞きます：*「現在のアプローチで続行しますか？それともPLANに戻りますか？」*

> 🚫 **サイレントな逸脱は絶対にしない**
>
> execute-agentがプランからの逸脱を必要とする問題に遭遇した場合、**即座に停止**し、問題を説明し、PLANモードに戻ります。こっそりアドリブすることはありません。

> 🔙 **アプローチ放棄プロトコル**
>
> アプローチが失敗した場合、エージェントは再利用可能なコンポーネントを評価し、削除前に教訓をドキュメント化し、放棄サマリーを作成して、PLANに戻ります。知識は失われず、保存されます。

> 🔐 **プライバシーガードレールフック**
>
> エージェントは`.env`、クレデンシャル、SSHキー、`.pem`ファイルの**読み取りをブロック**されます。明示的な承認が必要です。フェイルオープン設計なので、壊れたフックがワークフローをブロックすることはありません。

> ⚠️ **ハイリスクエビデンスパック**
>
> 認証、課金、スキーママイグレーション、パブリックAPIに影響する変更では、作業を「完了」と呼ぶ前に正式なエビデンスパックが必要です。エビデンスがない場合は自動停止します。

> 📊 **ドリフトシグナルスコアリング**
>
> 実行後、システムがプロセス更新の緊急度をスコアリングします：**LOW**（軽いタッチ）、**MEDIUM**（大きな変更）、**HIGH**（ハーネス/プロトコルファイルに変更あり）。小さな変更には軽いナッジ。プロトコル変更には強いプッシュ。

---

## 🔍 実装前インテリジェンス

コードを一行も書く前に、専門的な分析で問題を事前にキャッチできます：

<br>

### 🎭 5ペルソナ実装前ディベート

**スキル：** `vc-predict`

| ペルソナ | フォーカス |
|---|---|
| 🏗️ **アーキテクト** | 構造的整合性、拡張性、技術的負債 |
| 🔐 **セキュリティ** | 攻撃対象面、認証フロー、データ漏洩 |
| ⚡ **パフォーマンス** | レイテンシ、メモリ、スケーラビリティのボトルネック |
| 🎨 **UX** | ユーザーへの影響、エッジケース、アクセシビリティ |
| 😈 **デビルズアドボケイト** | *「何もしないという選択肢は？」*——前提を問い直す |

> 💡 合意点を特定し、トレードオフの重み付けで対立を解決し、**GO / CAUTION / STOP**の判定を出します。

<br>

### 🎲 12次元エッジケースジェネレーター

**スキル：** `vc-scenario`

> あらゆる機能を**12次元**で分解し、各次元で3〜5のシナリオを重大度順に生成します。出力はそのままテストスペックとして使用できます。

| | | | |
|---|---|---|---|
| 👤 ユーザータイプ | 📥 入力の極端値 | ⏱️ タイミング | 📈 スケール |
| 🔄 状態遷移 | 🌍 環境 | 💥 エラーカスケード | 🔑 認可 |
| 💾 データ整合性 | 🔌 インテグレーション | 📋 コンプライアンス | 💰 ビジネスロジック |

<br>

### 🔐 STRIDE + OWASP セキュリティ監査

**スキル：** `vc-security`

> **STRIDE脅威モデリング**と**OWASP Top 10**を組み合わせたデュアルメソドロジーセキュリティ監査。依存関係の監査、シークレット検出、そして発見事項を重大度順にソートしてCriticalから修正する**自動修正モード**を含みます——各ステップでリグレッションガード付き。

---

## 🤖 自律エージェント機能

<br>

### 🔄 自律メトリクス最適化

**スキル：** `vc-autoresearch`

ゴールを設定して、席を離れるだけ。エージェントが計測可能なあらゆるメトリクスに対して**反復的なgitバック付き最適化ループ**を実行します：

> 📈 テストカバレッジ · 📦 バンドルサイズ · ⚠️ ESLintエラー · 🚀 Lighthouseスコア

各イテレーションで**1つのアトミックな変更**→コミット→計測→キープまたはリバート。

> 💡 5回連続でディスカードするとスタック検出が発動し、戦略をシフトします。TSVでフル監査証跡。

<br>

### 👥 並列エージェントチーム

**スキル：** `vc-team`

複数の独立したエージェントが**同時に**動きます——シーケンシャルではなく：

| テンプレート | 仕組み |
|---|---|
| 🔍 **Research** | N個の角度を並列で探索 |
| ⚡ **Execute** | **git worktreeアイソレーション**による並列開発者（ファイル競合ゼロ） |
| 🔎 **Review** | 独立したレビュアーが重複排除＋重大度ランク付きのフィードバックを生成 |
| 🐛 **Debug** | 対立仮説を敵対的にテスト——デバッガー同士がお互いの仮説を反証しようとする |

<br>

### 🔬 エビデンスファースト仮説検証型デバッグ

**エージェント：** `vc-debugger`

> デバッガーはまず証拠を集め→2〜3の対立仮説を立て→各仮説を体系的にテスト→除外パスをドキュメント化→証拠チェーン付きで根本原因を特定します。

**推測ではなく——証明します。** そして修正の実装はしません——「修正境界」をexecute-agentに渡します。

---

## ✅ クオリティパイプライン——実行に組み込み済み

execute-agentはコードを書いて終わりではありません。**クオリティパイプライン**を自動的にチェーンします：

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

| ステップ | 何をするか |
|---|---|
| 🔎 **セルフレビュー** | プランに対して全チェックリスト項目を確認し、逸脱をドキュメント化 |
| 🧪 **テスター** | 変更ファイルをテストファイルにマッピング、70%超マッピング時はフルスイートに自動エスカレーション |
| 🔍 **コードレビュアー** | レビュー前にエッジケーススカウトを実行、N+1クエリ、認証パス、データリークをチェック |
| ✨ **シンプリファイアー** | レビューパス後のクラリティリファクタリング——振る舞いの変更なし |
| 📦 **Gitマネージャー** | `touched_files`リストを受け取り、論理的なconventional commitsに分割、不明なファイルは拒否 |

---

## 📋 プランライフサイクル——バイブス駆動ではなくスペック駆動

すべての重要な機能は**プランライフサイクル**に従います——作成され、レビューされ、その通りに実行され、プロジェクト履歴としてアーカイブされる計画書です。

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

> 💡 半年後に誰かが*「なんでこの認証方式にしたんだっけ？」*と聞いた時、答えは`completed/`にあります。Slackのスレッドに埋もれてはいません。

<br>

**プランのディスク上の配置：**

```
process/
├── general-plans/
│   ├── active/                  # 📋 現在作業中のプラン
│   │   └── webhooks_PLAN_28-05-26.md
│   ├── completed/               # ✅ アーカイブ済みプラン（検索可能な履歴）
│   ├── backlog/                 # 📌 保留中の作業
│   ├── reports/                 # 📄 横断的なレポート
│   └── references/              # 📚 リサーチ成果物
└── features/
    └── billing/                 # 🏷️ フィーチャースコープ（5+アーティファクト）
        ├── active/
        ├── completed/
        ├── backlog/
        ├── reports/
        └── references/
```

---

## 🏗️ フェーズプログラム——崩壊しない大規模プロジェクト

通常の機能は1つのプランを使います。**大規模なマルチフェーズプロジェクト**はフェーズプログラムを使います——アンブレラプランと個別のフェーズプラン、それぞれに検証ゲートが付きます。

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

**主な特徴：**

| | 機能 | なぜ重要か |
|---|---|---|
| 🔄 | **毎フェーズでリリサーチ** | コードのドリフトをチェックし、最新レポートを読み、前提を更新 |
| ✅ | **検証ゲート** | エビデンスで証明されるまでフェーズは`VERIFIED`にならない。正直なステータス：`PLANNED` → `CODE DONE` → `TESTING` → `VERIFIED`または`BLOCKED` |
| 📄 | **永続レポート** | 毎フェーズの結果をディスクに書き込み。進捗はコンテキストコンパクションを生き延びる |
| 🧠 | **学びがフィードフォワード** | フェーズ1の発見がフェーズ2のプランを実行前に更新 |
| 🏗️ | **基盤 vs 拡張** | 「アーキテクチャの証明」と「すべての実装」を明確に分離 |
| 🚧 | **正直なブロッカー処理** | ブロックされたフェーズはエビデンス付きで`BLOCKED`のまま。グリーンステータスを強制しない |

---

## 🧠 コンテキストグループ——巨大な1ファイルではなく整理された知識

プロジェクトの知識は**コンテキストグループ**に整理されます——永続的なナレッジドメインで、各グループに`all-{group}.md`ルーターがあり、エージェントに何をいつ読むべきかを指示します。

<br>

```
process/context/
├── all-context.md              # 🧭 ルートルーター——アーキテクチャ、スタック、パターン、規約
├── tests/
│   └── all-tests.md            # 🧪 テストランナー、コマンド、デバッグ手順
├── container/
│   └── all-container.md        # 🐳 Docker、デプロイ、インフラ手順
├── uxui/
│   └── all-uxui.md             # 🎨 コンポーネント、デザイントークン、パターン
├── infra/
│   └── all-infra.md            # 🖥️ ワーカーノード、プロビジョニング、DNS
├── skills/
│   └── all-skills.md           # ⚡ スキルランタイム、アプリアーキテクチャ
├── workflows/
│   └── all-workflows.md        # 🔄 ワークフローランタイム、デプロイ
└── {your-domain}/
    └── all-{domain}.md         # 📚 3+永続ドキュメントがあるナレッジドメイン
```

<br>

| | 仕組み |
|---|---|
| 🧭 **ルーターパターン** | エージェントはタスクに関連するものだけを読み、すべてを読むわけではない |
| 📏 **自動プロモーション** | 3+ドキュメントまたは800+行のトピックは独自のコンテキストグループに昇格 |
| 🔄 **生きたドキュメント** | 重要な機能のたびに`update-process-agent`が更新 |
| 🧪 **監査可能** | `vc-audit-context`がルーティングと一貫性を検証 |

---

## 📁 フィーチャーフォルダー——自己整理するプロジェクトメモリ

トピックが5+のアーティファクトを蓄積すると、独自の**フィーチャーフォルダー**が付与されます——完全なライフサイクルコンテナです。

<br>

```
process/features/{feature}/
├── active/       # 📋 現在作業中のプラン
├── completed/    # ✅ アーカイブ済みプラン（検索可能な意思決定履歴）
├── backlog/      # 📌 保留中の作業（エージェントが重複作成前にチェック）
├── reports/      # 📄 実行レポート、ポストモーテム、検証結果
└── references/   # 📚 将来の意思決定に役立つリサーチ成果物
```

<br>

| | 何が起きるか |
|---|---|
| 🆕 | 新しい作業は`active/`で開始→レポートが蓄積→プランが`completed/`にアーカイブ |
| 📌 | 保留中の作業は`backlog/`へ——エージェントは重複プラン作成前にチェック |
| 📦 | 一般アーティファクトが5+に達すると自動的にフィーチャープロモーション |
| 🔍 | すべてのフィーチャーに完全で自己完結した履歴——プラン、判断、レポート、リサーチ |

---

## 🤖 中身の紹介

<br>

### 12エージェント

<details>
<summary>クリックでエージェント一覧を展開（12エージェント）</summary>

<br>

**コアワークフローエージェント** — RIPER-5フェーズごとに1つ：

| エージェント | 役割 |
|-------|------|
| 🔍 `vc-research-agent` | コードベース＋Webリサーチ、リードオンリー。矛盾追跡機能内蔵 |
| 💡 `vc-innovate-agent` | 2〜3のアプローチをブレスト。PLAN前に意思決定サマリーを必ず出力 |
| 📋 `vc-plan-agent` | 合理化防止ガード付きスペック作成。「やり方はもう分かってる」はプランではない |
| ⚡ `vc-execute-agent` | プラン通りに実装。50%チェックイン、逸脱プロトコル、セルフレビュー |
| ⏩ `vc-fast-mode-agent` | RESEARCH→INNOVATE→PLANの圧縮版、安全一時停止付き |
| 🧠 `vc-update-process-agent` | 古いアーティファクトスキャンを含む7フェーズ必須チェックリスト |

<br>

**スペシャリストエージェント** — EXECUTE中またはスタンドアロンで呼び出し：

| エージェント | 役割 |
|-------|------|
| 🐛 `vc-debugger` | エビデンスファースト仮説検証。対立仮説、除外チェーン |
| 🧪 `vc-tester` | Diff対応。影響のあるテストのみ実行。設定変更時は自動エスカレーション |
| 🔎 `vc-code-reviewer` | レビュー前にエッジケーススカウト。N+1検出、認証パス検証 |
| ✨ `vc-code-simplifier` | 振る舞いを変えないクラリティリファクタリング |
| 🎨 `vc-ui-ux-designer` | デザイン対応のフロントエンド実装。実行中にリサーチサブエージェントを起動可能 |
| 📦 `vc-git-manager` | `touched_files`からの論理的コミット分割。不明なファイルは拒否 |

</details>

<br>

### 31スキル（自動検出）

<details>
<summary>クリックでスキル一覧を展開（31スキル）</summary>

<br>

**🔧 コントラクトスキル** — `vc-generate-plan` · `vc-generate-context` · `vc-audit-context` · `vc-audit-plans` · `vc-audit-vc` · `vc-setup` · `vc-update` · `vc-publish`

**🧠 プランニング** — `vc-predict`（5ペルソナディベート） · `vc-scenario`（12次元エッジケース） · `vc-sequential-thinking` · `vc-problem-solving`

**🐛 デバッグ＆セキュリティ** — `vc-debug` · `vc-security`（STRIDE + OWASP + 自動修正） · `vc-autoresearch`（自律最適化）

**📚 リサーチ** — `vc-docs-seeker` · `vc-scout` · `vc-docs` · `vc-repomix` · `vc-xia`（リポジトリ比較）

**🎨 フロントエンド** — `vc-frontend-design` · `vc-chrome-devtools` · `vc-agent-browser` · `vc-web-testing`

**⚙️ ユーティリティ** — `vc-context-engineering` · `vc-mcp-management` · `vc-preview` · `vc-team`（並列エージェント） · `vc-tech-graph` · `vc-watzup`（セッションハンドオフ） · `vc-merge-worktree`

</details>

<br>

### 🪝 7つのフック

| フック | 何をするか |
|------|-------------|
| 🔐 **プライバシーガードレール** | `.env`、クレデンシャル、SSHキーをブロック。明示的な承認が必要 |
| 🚫 **スカウトブロッカー** | `node_modules/`、`dist/`へのエージェントの侵入を防止。gitignore構文の`.ckignore` |
| 🧠 **セッション初期化** | スタック検出、環境変数注入、コンパクション後の承認ゲート復元 |
| 💉 **サブエージェントコンテキスト** | すべてのサブエージェントに〜200トークンのコンパクトコンテキストブロックを注入 |
| ✨ **編集品質** | 5回以上の編集後、code-simplifierの実行を提案（ノンブロッキング、スロットリング付き） |
| 📛 **記述的命名** | すべてのWriteで言語対応のファイル命名規約を適用 |
| 📊 **使用量トラッキング** | セッションメトリクスとトークン認識 |

<br>

**すべての配置場所：**

```
your-project/
├── .claude/
│   ├── agents/              # 🤖 12のエージェント定義（.md）
│   ├── skills/              # ⚡ 31のスキルモジュール（各ディレクトリにSKILL.md）
│   └── hooks/               # 🪝 7つのライフサイクルフック（.cjs）
├── .codex/
│   └── agents/              # 🔄 Codex互換ミラー
├── .agents/
│   └── skills -> ../.claude/skills   # 🔗 Codexディスカバリー用シンボリックリンク
├── CLAUDE.md                # 📋 オーケストレーター設定＋ルーティングルール
├── AGENTS.md                # 📖 エージェント＋スキルレジストリ
└── process/
    ├── context/             # 🧠 自動ルーティングされるナレッジドメイン
    ├── general-plans/       # 📋 横断的なプラン＋レポート
    ├── features/            # 🏷️ フィーチャースコープのライフサイクルフォルダー
    └── development-protocols/  # 📜 共有ワークフロールール
```

---

## 🔄 アップデート

最新のハーネス改善を取得するには：

```
Run vc-update
```

> 💡 dry-runのdiffを表示し、確認を待ちます。あなたの`process/`ディレクトリとプロジェクト固有のコンテンツは**一切触れません**。

---

## コントリビュート

コントリビューションを歓迎します！ガイドラインは[CONTRIBUTING.ja-JP.md](CONTRIBUTING.ja-JP.md)をご覧ください。

<br>

**クイックリンク：**

- 🐛 [バグを報告する](https://github.com/withkynam/vibecode-pro-max-kit/issues/new?template=1.bug_report.yml)
- 💡 [機能をリクエストする](https://github.com/withkynam/vibecode-pro-max-kit/issues/new?template=2.feature_request.yml)
- ⚡ [スキルを提出する](https://github.com/withkynam/vibecode-pro-max-kit/issues/new?template=3.skill_submission.yml)
- 🌐 [翻訳を追加する](https://github.com/withkynam/vibecode-pro-max-kit/issues/new?template=5.translation.yml)

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

## 📄 ライセンス

MIT
