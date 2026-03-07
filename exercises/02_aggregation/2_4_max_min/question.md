# 問題 2-4: 給与の最大値と最小値の取得

## 問題

`employees` テーブルの給与の最大値（`max_salary`）と最小値（`min_salary`）を取得してください。

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

給与の最大値（`max_salary`: 70000）と最小値（`min_salary`: 50000）が1行で取得されること。
