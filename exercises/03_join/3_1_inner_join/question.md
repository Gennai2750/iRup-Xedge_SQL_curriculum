# 問題 3-1: INNER JOIN

## 問題

`employees` テーブルと `departments` テーブルを INNER JOIN し、各従業員の `first_name`、`last_name`、`department_name` を取得してください。

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

全従業員（5件）の `first_name`、`last_name`、`department_name` が取得されること。
