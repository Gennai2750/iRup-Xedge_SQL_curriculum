# 問題 2-2: 重複を除いた一覧の取得

## 問題

`employees` テーブルから `department_id` の重複を除いた一覧を取得してください。

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

重複を除いた `department_id` の一覧が取得されること（4件）。
