# 問題 7-2: CROSS JOINによる意図しない直積

## 問題

`employees` テーブルと `departments` テーブルの CROSS JOIN を実行し、全ての組み合わせを取得してください。結果が何件になるか確認しましょう。

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

## 現在のデータ

- employees: 5件
- departments: 4件

## 期待される結果

CROSS JOIN により、5 x 4 = 20 件の全ての組み合わせが取得されること。
