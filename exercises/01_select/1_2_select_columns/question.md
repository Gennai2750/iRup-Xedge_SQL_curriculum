# 問題 1-2: 特定カラムの取得

## 問題

`employees` テーブルから `first_name` と `last_name` のみを取得してください。

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

全社員の `first_name` と `last_name` のみが取得されること（5件）。
