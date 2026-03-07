# 問題 1-7: CONCATとASによる結合と別名

## 問題

`employees` テーブルから `first_name` と `last_name` を `CONCAT` 関数で結合し、`full_name` という別名（エイリアス）で取得してください。

※ `first_name` と `last_name` の間にはスペースを入れてください。

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

全社員の `full_name` が取得されること（5件、例: 'John Doe'）。
