# 問題 6-3: サブクエリ応用（グループごとの最大値）

## 問題

各部門（`department_id`）で最も給与が高い従業員の `first_name`, `last_name`, `department_id`, `salary` を取得してください。サブクエリを使用すること。

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

各部門ごとに最も給与が高い従業員（4件、各部門1件ずつ）が取得されること。
