# 問題 7-5: GROUP BYの正しい使い方

## 問題

`department_id` ごとに従業員数（`employee_count`）と平均給与（`avg_salary`）を取得してください。

SELECT 句には GROUP BY に含まれるカラムか集計関数のみ指定できます。

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

| department_id | employee_count | avg_salary |
|---|---|---|
| 1 | 1 | 50000 |
| 2 | 2 | 62500 |
| 3 | 1 | 55000 |
| 4 | 1 | 70000 |

4件のレコードが取得されること。
