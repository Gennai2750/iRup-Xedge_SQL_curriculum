# SQL自動採点カリキュラム：環境構築および問題構成定義書

本ドキュメントは、GitHub Pull RequestとGitHub Actions（GHA）を利用したSQLの自動採点学習プラットフォームの要件定義書です。この仕様に沿って、各章の具体的な問題（マークダウン）、解答枠、テストコードを作成してください。

---

## 1. 全体アーキテクチャ

受講者はローカルのDocker環境でSQLを記述・動作確認し、`answer.sql` をGitHubにPush（PR作成）します。GHAが自動でテストを実行して採点します。

### 1-1. ディレクトリ構成

```text
/ (リポジトリルート)
├── .github/
│   └── workflows/
│       └── grading.yml              # GHAの自動採点ワークフロー
├── db/
│   ├── init/
│   │   └── 01_schema.sql            # 初期DDLおよびDML（全問題共通）
│   └── docker-compose.yml           # ローカル環境・GHA共通DB
├── exercises/
│   ├── 01_select/
│   │   ├── 1_1_select_all/
│   │   │   ├── question.md          # 問題文（受講者が読む）
│   │   │   └── answer.sql           # 解答ファイル（受講者が編集・提出する）
│   │   └── 1_2_select_columns/
│   │       ├── question.md
│   │       └── answer.sql
│   ├── 02_aggregation/
│   │   └── ...
│   └── ...
├── tests/
│   ├── 01_select/
│   │   ├── 1_1_select_all.test.ts   # 採点用テストコード
│   │   └── 1_2_select_columns.test.ts
│   ├── 02_aggregation/
│   │   └── ...
│   └── ...
├── docs/
│   └── specifications.md            # 本ファイル
├── package.json
├── tsconfig.json
├── jest.config.ts
└── README.md
```

### 1-2. 命名規則

| 対象 | パターン | 例 |
|---|---|---|
| 章フォルダ（exercises/tests共通） | `{章番号:2桁}_{章の英語名}` | `01_select`, `03_join` |
| 問題フォルダ（exercises配下） | `{章}_{問題番号}_{英語の概要}` | `1_1_select_all`, `3_2_join_where` |
| テストファイル（tests配下） | `{章}_{問題番号}_{英語の概要}.test.ts` | `1_1_select_all.test.ts` |

---

## 2. 環境構築ファイル

### 2-1. データベース環境 (`db/docker-compose.yml`)

```yaml
services:
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: student
      POSTGRES_PASSWORD: password
      POSTGRES_DB: curriculum_db
    ports:
      - "5432:5432"
    volumes:
      - ./init:/docker-entrypoint-initdb.d
```

### 2-2. 共通初期データ (`db/init/01_schema.sql`)

```sql
CREATE TABLE departments (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL
);

CREATE TABLE employees (
    employee_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    department_id INTEGER REFERENCES departments(department_id),
    salary INTEGER NOT NULL,
    manager_id INTEGER
);

INSERT INTO departments (department_name, location) VALUES
('HR', 'Building 1'),
('IT', 'Building 2'),
('Sales', 'Building 1'),
('Marketing', 'Building 3');

INSERT INTO employees (first_name, last_name, department_id, salary, manager_id) VALUES
('John', 'Doe', 1, 50000, NULL),
('Jane', 'Smith', 2, 60000, 1),
('Alice', 'Johnson', 2, 65000, 2),
('Bob', 'Brown', 3, 55000, 1),
('Charlie', 'Davis', 4, 70000, 1);
```

### 2-3. パッケージ管理 (`package.json`)

```json
{
  "name": "sql-curriculum",
  "private": true,
  "scripts": {
    "test": "jest"
  },
  "devDependencies": {
    "@types/jest": "^29",
    "@types/pg": "^8",
    "jest": "^29",
    "pg": "^8",
    "ts-jest": "^29",
    "typescript": "^5"
  }
}
```

### 2-4. TypeScript設定 (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "outDir": "dist",
    "rootDir": "."
  },
  "include": ["tests/**/*.ts"]
}
```

### 2-5. Jest設定 (`jest.config.ts`)

```typescript
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
};

export default config;
```

### 2-6. GitHub Actions (`.github/workflows/grading.yml`)

```yaml
name: SQL Auto Grading
on:
  pull_request:
    paths:
      - 'exercises/**/*.sql'
jobs:
  grade:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Start Database
        run: |
          cd db && docker compose up -d
          until docker exec $(docker compose ps -q db) pg_isready -U student; do sleep 1; done
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm test
```

---

## 3. テストコードの実装方針

テストコードは、受講者が記述した `answer.sql` をテキストとして読み込み、DBで実行して結果（件数・カラム・値）をアサーションします。

### 3-1. テンプレート

```typescript
import fs from 'fs';
import path from 'path';
import { Client } from 'pg';

describe('章・問題番号: タイトル', () => {
  let client: Client;

  beforeAll(async () => {
    client = new Client({
      user: 'student',
      host: 'localhost',
      database: 'curriculum_db',
      password: 'password',
      port: 5432,
    });
    await client.connect();
  });

  afterAll(async () => {
    await client.end();
  });

  test('テストの期待値', async () => {
    const sqlPath = path.join(__dirname, '../../exercises/01_select/1_1_select_all/answer.sql');
    const query = fs.readFileSync(sqlPath, 'utf-8');
    const result = await client.query(query);

    expect(result.rowCount).toBe(/* 期待される行数 */);
    expect(result.rows[0]).toHaveProperty('/* 期待されるカラム名 */');
  });
});
```

### 3-2. DML問題（第4章・第5章）のテスト方針

DML/DDL問題はデータを変更するため、テストごとにトランザクションで分離する。

```typescript
beforeEach(async () => {
  await client.query('BEGIN');
});

afterEach(async () => {
  await client.query('ROLLBACK');
});
```

---

## 4. カリキュラム（問題）構成

以下の構成に従って、各問題の `question.md`、`answer.sql`（ひな形）、および `*.test.ts` を作成してください。

### 第1章：データの基本抽出（SELECTの基礎） — `01_select`

| 問題ID | タイトル | キーワード | フォルダ名 |
|---|---|---|---|
| 1-1 | 全てのデータを取得する | `SELECT *` | `1_1_select_all` |
| 1-2 | 特定の列だけを取得する | `SELECT` | `1_2_select_columns` |
| 1-3 | 条件に一致するデータを絞り込む | `WHERE`, `=`, `>=`, `<=` | `1_3_where_basic` |
| 1-4 | 複数の条件を組み合わせる | `AND`, `OR` | `1_4_where_and_or` |
| 1-5 | 文字列の曖昧検索を行う | `LIKE` | `1_5_like` |
| 1-6 | データを特定の順番で並び替える | `ORDER BY` | `1_6_order_by` |
| 1-7 | 取得した文字列を結合・加工する | `CONCAT`, `AS` | `1_7_concat_alias` |

### 第2章：データの集計とグループ化 — `02_aggregation`

| 問題ID | タイトル | キーワード | フォルダ名 |
|---|---|---|---|
| 2-1 | データの件数を数える | `COUNT` | `2_1_count` |
| 2-2 | 重複を除外して種類を抽出する | `DISTINCT` | `2_2_distinct` |
| 2-3 | 数値の合計値と平均値を求める | `SUM`, `AVG` | `2_3_sum_avg` |
| 2-4 | 最大値と最小値を求める | `MAX`, `MIN` | `2_4_max_min` |
| 2-5 | カテゴリごとにデータをグループ化して集計する | `GROUP BY` | `2_5_group_by` |
| 2-6 | 集計した結果に対して条件を絞り込む | `HAVING` | `2_6_having` |

### 第3章：複数テーブルの結合（JOIN） — `03_join`

| 問題ID | タイトル | キーワード | フォルダ名 |
|---|---|---|---|
| 3-1 | 2つのテーブルを内部結合する | `INNER JOIN` | `3_1_inner_join` |
| 3-2 | 結合した結果に対して条件で絞り込む | `INNER JOIN` + `WHERE` | `3_2_join_where` |
| 3-3 | 片方のテーブルを基準に外部結合する | `LEFT JOIN` | `3_3_left_join` |
| 3-4 | 外部結合を使って「紐づくデータがないレコード」を見つける | `IS NULL` | `3_4_left_join_null` |
| 3-5 | 3つ以上のテーブルを結合する | 複数JOIN | `3_5_multi_join` |

### 第4章：データの追加・更新・削除（DML） — `04_dml`

※テストコードは `BEGIN` / `ROLLBACK` で実行後のテーブル状態を検証すること。

| 問題ID | タイトル | キーワード | フォルダ名 |
|---|---|---|---|
| 4-1 | 新しいレコードを1件追加する | `INSERT` | `4_1_insert` |
| 4-2 | 条件を指定して特定のデータを更新する | `UPDATE` + `WHERE` | `4_2_update` |
| 4-3 | 既存の数値を元に計算して更新する | `UPDATE` + 式 | `4_3_update_calc` |
| 4-4 | 条件を指定して特定のデータを削除する | `DELETE` | `4_4_delete` |

### 第5章：テーブルの作成と構造変更（DDL） — `05_ddl`

| 問題ID | タイトル | キーワード | フォルダ名 |
|---|---|---|---|
| 5-1 | 新しいテーブルを適切なデータ型で作成する | `CREATE TABLE` | `5_1_create_table` |
| 5-2 | 既存のテーブルに新しい列を追加する | `ALTER TABLE ADD` | `5_2_alter_add` |
| 5-3 | テーブルそのものを削除する | `DROP TABLE` | `5_3_drop_table` |

### 第6章：高度なクエリ（応用編） — `06_advanced`

| 問題ID | タイトル | キーワード | フォルダ名 |
|---|---|---|---|
| 6-1 | クエリの中で別のクエリを実行する | サブクエリ | `6_1_subquery` |
| 6-2 | 条件に応じて出力する値を分岐させる | `CASE` | `6_2_case` |
| 6-3 | 各カテゴリの中で最も値が大きいレコードを取得する | サブクエリ応用 | `6_3_max_per_group` |

### 第7章：エンジニアが陥りがちなミスとアンチパターン — `07_antipattern`

※実務でのインシデントを防ぐためのアンチパターン体験。

| 問題ID | タイトル | キーワード | フォルダ名 |
|---|---|---|---|
| 7-1 | 恐怖の全件更新・全件削除 | `WHERE` 忘れ | `7_1_missing_where` |
| 7-2 | 意図しないデータの爆発 | クロスジョイン | `7_2_cross_join` |
| 7-3 | `NULL` の罠 | `IS NULL`, 集計関数 | `7_3_null_trap` |
| 7-4 | インデックスが効かない検索 | SARGable | `7_4_sargable` |
| 7-5 | `GROUP BY` での不正なカラム指定 | `GROUP BY` | `7_5_group_by_error` |

### 第8章：実践総合演習 — `08_practice`

※別途 `orders` / `products` テーブルなどを `db/init/` に追加する想定。

| 問題ID | タイトル | キーワード | フォルダ名 |
|---|---|---|---|
| 8-1 | 各顧客の合計購入金額を算出し、金額が高い順に表示する | JOIN + 集計 | `8_1_customer_total` |
| 8-2 | 最も売上金額が高い商品を特定する | サブクエリ + 集計 | `8_2_top_product` |
| 8-3 | 部門ごとの平均給与と従業員一覧を同時に表示する | JOIN + 集計 | `8_3_dept_avg_list` |

---

## 5. 実装フェーズ（作業順序）

段階的に実装する場合は以下の順序で進めてください。

| フェーズ | 内容 | 対象ファイル |
|---|---|---|
| 1 | 環境構築 | `db/`, `package.json`, `tsconfig.json`, `jest.config.ts`, `.github/workflows/` |
| 2 | 第1章の問題・テスト作成 | `exercises/01_select/`, `tests/01_select/` |
| 3 | 第2章の問題・テスト作成 | `exercises/02_aggregation/`, `tests/02_aggregation/` |
| 4 | 第3章の問題・テスト作成 | `exercises/03_join/`, `tests/03_join/` |
| 5 | 第4章の問題・テスト作成 | `exercises/04_dml/`, `tests/04_dml/` |
| 6 | 第5章の問題・テスト作成 | `exercises/05_ddl/`, `tests/05_ddl/` |
| 7 | 第6章の問題・テスト作成 | `exercises/06_advanced/`, `tests/06_advanced/` |
| 8 | 第7章の問題・テスト作成 | `exercises/07_antipattern/`, `tests/07_antipattern/` |
| 9 | 第8章の問題・テスト作成 + 追加テーブル定義 | `exercises/08_practice/`, `tests/08_practice/`, `db/init/` |
| 10 | README作成・最終確認 | `README.md` |
