# 問題 4-1: レコードの挿入

## 問題

`employees` テーブルに新しいレコードを1件追加してください。

追加するデータは以下の通りです:

| カラム名 | 値 |
|---|---|
| first_name | David |
| last_name | Wilson |
| department_id | 3 |
| salary | 58000 |
| manager_id | 4 |

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

`employees` テーブルに上記のデータが1件追加され、合計6件のレコードが存在すること。
