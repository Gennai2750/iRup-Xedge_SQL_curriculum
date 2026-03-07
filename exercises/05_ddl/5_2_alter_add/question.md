# 問題 5-2: カラムの追加

## 問題

`employees` テーブルに `email` カラム（VARCHAR(100)）を追加してください。

## テーブル構造

### employees テーブル（変更前）

| カラム名 | データ型 | 説明 |
|---|---|---|
| employee_id | SERIAL | 社員ID（主キー） |
| first_name | VARCHAR | 名 |
| last_name | VARCHAR | 姓 |
| department_id | INT | 部署ID（外部キー） |
| salary | INT | 給与 |
| manager_id | INT | 上司ID |

## 期待される結果

`employees` テーブルに `email`（VARCHAR(100)）カラムが追加されていること。
