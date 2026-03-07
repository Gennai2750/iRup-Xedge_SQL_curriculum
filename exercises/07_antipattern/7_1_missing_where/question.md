# 問題 7-1: WHERE句の付け忘れ

## 問題

`employees` テーブルの `employee_id` が 3 の従業員の給与（`salary`）を 70000 に更新する UPDATE 文を、WHERE 句を正しく付けて書いてください。

WHERE 句を忘れると全件更新されてしまいます。

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
| 1 | John | Doe | 1 | 50000 | NULL |
| 2 | Jane | Smith | 2 | 60000 | 1 |
| 3 | Alice | Johnson | 2 | 65000 | 2 |
| 4 | Bob | Brown | 3 | 55000 | 1 |
| 5 | Charlie | Davis | 4 | 70000 | 1 |

## 期待される結果

`employee_id` が 3 のレコードの `salary` のみが 70000 に更新されること（他のレコードは変更されないこと）。
