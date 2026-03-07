# 問題 7-3: NULLの比較の罠

## 問題

`employees` テーブルから `manager_id` が NULL の従業員を正しく取得してください。

`= NULL` ではなく `IS NULL` を使う必要があります。`WHERE manager_id = NULL` と書くと、NULLとの比較は常にUNKNOWNとなり、結果が0件になってしまいます。

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

`manager_id` が NULL の従業員（John Doe）の1件が取得されること。
