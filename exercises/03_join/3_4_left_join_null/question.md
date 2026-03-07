# 問題 3-4: LEFT JOINとIS NULLで未紐づけデータの検出

## 問題

`departments` テーブルを基準に `employees` テーブルを LEFT JOIN し、従業員が紐づかない部門を見つけてください。`employee_id` が NULL の行を抽出し、`department_name` を取得してください。

※ 現在のデータでは全ての部門に従業員が存在するため、結果は0件になります。

## テーブル構造

### employees テーブル

| カラム名 | データ型 | 説明 |
|---|---|---|
| employee_id | SERIAL | 社員ID（主キー） |
| first_name | VARCHAR | 名 |
| last_name | VARCHAR | 姓 |
| department_id | INT | 部署ID（外部キー） |
| salary | INT | 給与 |
| manager_id | INT | 上司ID |

### departments テーブル

| カラム名 | データ型 | 説明 |
|---|---|---|
| department_id | SERIAL | 部署ID（主キー） |
| department_name | VARCHAR | 部署名 |
| location | VARCHAR | 所在地 |

## 期待される結果

従業員が紐づかない部門（0件）の `department_name` が取得されること。
