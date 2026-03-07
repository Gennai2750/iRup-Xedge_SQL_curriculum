# 問題 4-4: レコードの削除

## 問題

`employees` テーブルから `employee_id` が 5 のレコードを削除してください。

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

`employee_id` が 5 のレコードが削除され、合計4件のレコードが残ること。
