# 問題 2-5: 部門ごとの従業員数の取得

## 問題

`employees` テーブルから `department_id` ごとの従業員数（`employee_count`）を取得してください。

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

`department_id` ごとの従業員数（`employee_count`）が取得されること（4件）。
