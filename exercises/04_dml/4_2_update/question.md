# 問題 4-2: レコードの更新

## 問題

`employees` テーブルの `employee_id` が 4 の Bob Brown の給与（`salary`）を 60000 に更新してください。

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

## 現在のデータ

| employee_id | first_name | last_name | department_id | salary | manager_id |
|---|---|---|---|---|---|
| 4 | Bob | Brown | 3 | 55000 | 1 |

## 期待される結果

`employee_id` が 4 のレコードの `salary` が 60000 に更新されること。
