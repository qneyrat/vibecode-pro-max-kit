<p align="center">
  <a href="../../CONTRIBUTING.md">English</a> |
  <a href="CONTRIBUTING.zh-CN.md">简体中文</a> |
  <strong>日本語</strong> |
  <a href="CONTRIBUTING.ko-KR.md">한국어</a> |
  <a href="CONTRIBUTING.vi-VN.md">Tiếng Việt</a> |
  <a href="CONTRIBUTING.pt-BR.md">Portugues</a>
</p>

# vibecode-pro-max-kitへのコントリビュート

vibecode-pro-max-kitに興味を持っていただきありがとうございます！このプロジェクトはClaude CodeとCodex向けのすぐに使えるエージェントハーネスを提供しており、どなたからのコントリビューションも歓迎しています。

このプロジェクトに参加することで、[行動規範](../../CODE_OF_CONDUCT.md)に同意したものとみなされます。

---

## コミュニケーションチャンネル

- **WhatsApp（メイン）：** [コミュニティグループに参加する](https://chat.whatsapp.com/E42ySo6iGmuAyeh25eAXuu?s=cl&p=i&mlu=1)
- **GitHub Issues：** バグ報告、機能リクエスト、タスク管理
- **GitHub Discussions：** 質問、アイデア、一般的な会話

> 唯一のコミュニティチャンネルです——Discord、Slack、その他のプラットフォームは使用していません。

---

## 開発の前提条件

コントリビュートする前に、以下がインストールされていることを確認してください：

- **Node.js** >= 20
- **bash**または**zsh**シェル
- **git** >= 2.30
- **OS：** macOS、Linux、またはWindows（WSL2環境）

追加のパッケージマネージャーやランタイムは不要です。ハーネスはゼロ依存で設計されています。

---

## コントリビューションの種類

さまざまな種類のコントリビューションを歓迎しています：

### Skills

スキルは`.claude/skills/`配下に置かれる再利用可能な機能モジュールです。各スキルは：

- 独自のディレクトリが必要です（例：`.claude/skills/my-skill/`）
- YAMLフロントマター（name、description、triggers）付きの`SKILL.md`ファイルを含む必要があります
- `vc-`プレフィックスは**使用しないでください**——公式ハーネススキル用に予約されています
- 必要に応じて`scripts/`サブディレクトリにヘルパースクリプトを配置してください

### Agents

エージェント定義は、異なるワークフローフェーズ向けの専門ペルソナを提供します。各エージェントは：

- `.claude/agents/`バージョン（Claude Code用）と`.codex/agents/`バージョン（Codex用）の両方が必要です
- 2つのバージョン間のパリティを維持する必要があります
- 既存の命名規約に従ってください

### Hooks

`.claude/hooks/`配下に置かれるpre/post実行フックです。Claude Codeセッションの特定のライフサイクルポイントで自動的に実行されます。

### Protocols

`process/development-protocols/`配下の開発プロトコルドキュメントで、共有ワークフロールールと規約を定義します。

### Translations

ドキュメントやスキル説明のローカライズ版で、より多くの開発者がハーネスを利用できるようにします。

### Documentation

README.md、CLAUDE.md、AGENTS.md、インラインコメント、その他のドキュメントの改善。

### Bug Fixes

バリデーションスクリプト、インストールロジック、シードテンプレート、その他の既存機能のバグ修正。

---

## はじめかた

1. GitHubでリポジトリを**フォーク**する

2. フォークをローカルに**クローン**する：

   ```bash
   git clone https://github.com/<your-username>/vibecode-pro-max-kit.git
   cd vibecode-pro-max-kit
   ```

3. テストプロジェクトにハーネスを**インストール**して、すべて動作することを確認する：

   ```bash
   # From a test project directory
   bash /path/to/vibecode-pro-max-kit/install.sh
   ```

4. **セットアップスキルを実行**して、インストールされたハーネスを確認する：

   ```bash
   # Inside a Claude Code session in the test project
   # Invoke the vc-setup skill
   ```

5. **バリデーションスクリプトを実行**して、環境が正しいことを確認する：

   ```bash
   node .claude/skills/vc-audit-vc/scripts/validate-agent-parity.mjs
   node .claude/skills/vc-audit-vc/scripts/validate-skills.mjs
   ```

   変更を始める前に、すべてのバリデーションがパスしている必要があります。

---

## アーキテクチャ概要

ハーネスはClaude CodeとCodexの互換性のためにデュアルサーフェスアーキテクチャに従っています：

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

スキルは`.agents/skills`シンボリックリンクを通じて両方のサーフェスで共有されており、Codexが`.claude/skills/`を検出するために使用します。

フルアーキテクチャの詳細はCLAUDE.mdとAGENTS.mdを参照してください。

---

## Pull Requestガイドライン

### スコープ

- Pull Requestは焦点を絞ってください：**PRごとに1種類のコントリビューション**
- 単一のスキル追加、単一のエージェントペア、単一のバグ修正など
- 変更が複数の領域に渡る場合は、別々のPRに分割してください
- 目安サイズ：意味のある変更で**200〜400行**

### AI支援によるコントリビューション

AI支援によるコントリビューションは歓迎・推奨されています。AIエージェントハーネスなので、AIツールを使って構築するのは理にかなっています。ただし、提出するものをレビューして理解していることを確認してください。

### コミットメッセージ

conventional commit形式を使用してください：

- `feat:` -- 新しいスキル、エージェント、フック、または機能
- `fix:` -- 既存機能のバグ修正
- `docs:` -- ドキュメントのみの変更
- `chore:` -- メンテナンス、リファクタリング、ツール関連の変更

例：

```
feat: add code-coverage skill with lcov parsing
fix: correct symlink detection in install.sh on WSL2
docs: add examples to vc-generate-plan SKILL.md
chore: update validate-skills.mjs to check frontmatter
```

### ブランチ命名

わかりやすいブランチ名を使用してください：

```
feat/my-new-skill
fix/install-symlink-wsl
docs/contributing-guide
```

### PR説明

Pull Requestの説明に以下を含めてください：

- 変更内容とその理由
- テスト方法（どのバリデーションスクリプトを実行したか）
- 破壊的変更やマイグレーションノート

---

## vc-manifest.json

リポジトリルートにある`vc-manifest.json`ファイルは、ハーネスで管理されるすべてのファイルを追跡します。新しいファイル（スキル、エージェント、フック、プロトコル、シード）を追加する場合、このマニフェストを更新する必要があります。

マニフェストは`install.sh`と`vc-update`がどのファイルをコピー・同期するかを知るために使用されます。新しいファイルがマニフェストにリストされていない場合、ユーザーがハーネスをインストールまたはアップデートする際に含まれません。

マニフェストを変更する際は：

- 適切なセクションに新しいファイルパスを追加する
- 各セクション内でアルファベット順にソートする
- 更新後にバリデーションスクリプトを実行して一貫性を確認する

---

## スキルコントリビューションチェックリスト

新しいスキルを提出する前に、以下を確認してください：

- [ ] スキルが`.claude/skills/<skill-name>/`配下の独自ディレクトリにある
- [ ] 有効なYAMLフロントマター（最低限name、description）付きの`SKILL.md`がある
- [ ] スキル名に`vc-`プレフィックスを使用して**いない**（公式スキル用に予約）
- [ ] ヘルパースクリプトは`scripts/`サブディレクトリに配置されている
- [ ] `vc-manifest.json`がすべての新しいファイルパスで更新されている
- [ ] バリデーションがパスする：

  ```bash
  node .claude/skills/vc-audit-vc/scripts/validate-skills.mjs
  ```

---

## エージェントコントリビューションチェックリスト

新しいエージェントを提出する前に、以下を確認してください：

- [ ] `.claude/agents/<agent-name>.md`にエージェント定義がある
- [ ] `.codex/agents/<agent-name>.md`に対応する定義がある
- [ ] 両バージョンが機能的に同等（同じ目的、同じツール制限）
- [ ] エージェントパリティバリデーションがパスする：

  ```bash
  node .claude/skills/vc-audit-vc/scripts/validate-agent-parity.mjs
  ```

---

## レビュープロセス

Pull Requestを提出した後：

- メンテナーが**48営業時間以内**にPRをレビューします（ソフトターゲットであり、保証ではありません）
- レビュー前にCIバリデーションスクリプトがパスしている必要があります
- マージには少なくとも**1人のメンテナー承認**が必要です
- **CLAは不要**です——コントリビューションはリポジトリのMITライセンスに準拠します

変更がリクエストされた場合は、フォローアップコミットで対応してください（レビューコメントの上からforce-pushしないでください）。

---

## 認知と表彰

すべてのコントリビューターを表彰します：

- **READMEのContributorsセクション** -- [contrib.rocks](https://contrib.rocks)で自動生成（ビジュアルバナー）
- **詳細コントリビューターテーブル** -- [all-contributors](https://allcontributors.org/) botで管理。すべてのコントリビューションタイプ（コード、ドキュメント、デザイン、アイデア、テスト、バグ報告）を認識します。コントリビューター追加時にbotがPRでREADMEを自動更新します。
- **GitHubリリースノート** -- 各リリースでコントリビューターをクレジット
- **スキル/エージェントクレジット** -- コントリビューションの`metadata.author`フィールドにあなたの名前

botの設定は`.all-contributorsrc`を参照してください（botが初めて初期化された時に作成されます）。

### コントリビューターラダー

- **Contributor** -- マージされたPRがある人
- **Reviewer** -- PRレビューに招待される常連コントリビューター
- **Maintainer** -- マージ権限を持つ信頼されたコントリビューター

昇進は量ではなく、コントリビューションの品質と一貫性に基づきます。

---

## コントリビューションポリシー

PRは既存のissueを参照するべきです。コンテキストのないドライブバイPRはクローズされる場合があります。

トップコントリビューターはメンテナーとして招待される場合があります。

---

vibecode-pro-max-kitをみんなにとってより良いものにしてくれてありがとうございます！
