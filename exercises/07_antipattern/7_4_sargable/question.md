# 問題 7-4: SARGableな検索条件

## 問題

`employees` テーブルから `salary` が 50000 以上 60000 以下の従業員を WHERE 句で取得してください。

関数でカラムを加工するとインデックスが効かなくなるため、`salary BETWEEN 50000 AND 60000` のようにカラムをそのまま条件に使いましょう。

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

`salary` が 50000 以上 60000 以下の従業員（John, Jane, Bob）の3件が取得されること。
