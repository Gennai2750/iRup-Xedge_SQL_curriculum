# SQL自動採点カリキュラム

GitHub Pull RequestとGitHub Actionsを利用したSQLの自動採点学習プラットフォームです。

## 環境構築

### 1. データベースの起動

```bash
cd db
docker compose up -d
```

### 2. 依存パッケージのインストール

```bash
npm install
```

## 学習の進め方

1. `exercises/` 配下の各問題フォルダにある `question.md` を読む
2. 同じフォルダの `answer.sql` に回答を記述する
3. ローカルでテストを実行して確認する
4. GitHubにPush（PR作成）すると自動採点が実行される

### ローカルでのテスト実行

```bash
# 全テスト実行
npm test

# 特定の章のみ実行
npx jest tests/01_select

# 特定の問題のみ実行
npx jest tests/01_select/1_1_select_all.test.ts
```

## カリキュラム構成

| 章 | テーマ | 問題数 |
|---|---|---|
| 第1章 | データの基本抽出（SELECTの基礎） | 7問 |
| 第2章 | データの集計とグループ化 | 6問 |
| 第3章 | 複数テーブルの結合（JOIN） | 5問 |
| 第4章 | データの追加・更新・削除（DML） | 4問 |
| 第5章 | テーブルの作成と構造変更（DDL） | 3問 |
| 第6章 | 高度なクエリ（応用編） | 3問 |
| 第7章 | エンジニアが陥りがちなミスとアンチパターン | 5問 |
| 第8章 | 実践総合演習 | 3問 |

## データベース接続情報

| 項目 | 値 |
|---|---|
| Host | localhost |
| Port | 5432 |
| Database | curriculum_db |
| User | student |
| Password | password |
