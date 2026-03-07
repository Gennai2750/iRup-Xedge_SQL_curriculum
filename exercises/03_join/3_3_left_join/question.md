# 問題 3-3: LEFT JOIN

## 問題

`departments` テーブルを基準に `employees` テーブルを LEFT JOIN し、`department_name`、`first_name`、`last_name` を取得してください。全ての部門が表示されるようにしてください。

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

全部門と紐づく従業員（5件）の `department_name`、`first_name`、`last_name` が取得されること。従業員が存在しない部門の場合、`first_name` と `last_name` は NULL になる。
