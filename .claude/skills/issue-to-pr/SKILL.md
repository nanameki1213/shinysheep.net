---
name: issue-to-pr
description: GitHub issue を起点に、ブランチ作成 → 実装 → コミット → push → PR 作成（または PR 作成 URL の提示）までの一連の流れを実行する。「issue #12 を対応して PR を出して」「このイシューを実装してプルリク作って」のように、issue 番号や issue 内容から作業を始めて PR にまとめたいときに使う。
---

# issue-to-pr

GitHub issue を起点に、ブランチを切って実装し、コミット・push して PR を作成（または作成リンクを提示）するまでを一気通貫で行う。

このリポジトリの前提:
- リモート: `origin` = `https://github.com/nanameki1213/shagi.dev`
- メインブランチ: `main`
- frontend は **yarn**（`frontend/yarn.lock`）。lint/build もここで実行する。
- `gh` CLI は**未インストール**。PR 作成は `gh` があればそれを使い、無ければ push 後に GitHub の比較 URL を提示する（後述）。
- コミットメッセージは既存履歴に合わせ **日本語の Conventional Commits**（例: `feat: 〜`, `fix: 〜`, `refactor: 〜`, `chore: 〜`）。

## 手順

### 1. issue を特定して読む
ユーザーが issue 番号を指定していれば取得する。本文・タイトル・ラベルから「何を実現すべきか」を把握する。

```bash
# gh があれば
gh issue view <番号>
# gh が無ければ GitHub API（認証トークンがあれば）
git ls-remote origin >/dev/null  # リモート疎通確認
# 本文取得（要 GITHUB_TOKEN など。無ければユーザーに issue 内容を貼ってもらう）
```

`gh` も API トークンも無い場合は、**ユーザーに issue の内容（タイトル・本文）を貼ってもらう**。

受け入れ条件・対象範囲が曖昧なら、着手前に確認する。

### 2. ベースを最新化してブランチを作成
```bash
git checkout main
git pull --ff-only origin main
git checkout -b <type>/issue-<番号>-<短い英語スラッグ>
```
ブランチ名の `<type>` は作業内容に合わせる（`feat` / `fix` / `refactor` / `chore` など）。
例: `feat/issue-12-reading-notes-tags`

### 3. 実装
issue の要件に沿って変更を加える。既存コードのスタイル・命名・コメント量に合わせること。

### 4. 検証
変更が frontend に及ぶ場合は最低限 lint と build を通す。
```bash
cd frontend
yarn lint
yarn build
```
失敗したら直してから次へ進む。スキップした場合はその旨を明示する。

### 5. コミット
関連する変更を意味のある単位でコミットする。日本語 Conventional Commits 形式。
```bash
git add -A
git commit -m "$(cat <<'EOF'
<type>: <変更内容の要約>

<必要なら詳細。Closes #<番号> を含めると PR/issue が自動で紐づく>

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>
EOF
)"
```

### 6. push
```bash
git push -u origin HEAD
```

### 7. PR 作成
**`gh` がある場合:**
```bash
gh pr create --base main --head <ブランチ名> \
  --title "<type>: <要約>" \
  --body "$(cat <<'EOF'
## 概要
<このPRで何をしたか>

## 対応 issue
Closes #<番号>

## 動作確認
- [ ] yarn lint
- [ ] yarn build

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

**`gh` が無い場合:** push 後にこの URL を組み立ててユーザーに提示する（ブラウザで開けば本文を埋めた PR 作成画面になる）。
```
https://github.com/nanameki1213/shagi.dev/compare/main...<ブランチ名>?expand=1
```
タイトル・本文の文面（`Closes #<番号>` を含む）も合わせてチャットに出力し、ユーザーがそのまま貼り付けられるようにする。

### 8. 仕上げ
作成した PR の URL（または比較 URL）と、行った変更・検証結果の要約を報告する。

## 注意
- `main` に直接コミット・push しない。必ずブランチを切る。
- push と PR 作成は外向きの操作。ユーザーが明示的に依頼している場合のみ実行し、それ以外は確認してから行う。
- 検証（lint/build）を省いた場合は正直に伝える。
