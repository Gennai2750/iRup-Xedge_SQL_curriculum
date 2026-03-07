# 問題 6-2: CASE式による条件分岐

## 問題

従業員の `first_name`, `last_name`, `salary` と、`salary` に応じた `salary_level` を取得してください。CASE式を使用すること。

- `salary` が 60000 以上なら `'High'`
- `salary` が 50000 以上なら `'Medium'`
- それ以外は `'Low'`

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

## 期待される結果

全従業員（5件）の `first_name`, `last_name`, `salary`, `salary_level` が取得されること。
