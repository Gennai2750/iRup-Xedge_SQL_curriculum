# 問題 3-5: 自己結合（セルフジョイン）

## 問題

`employees` テーブルを自己結合（セルフジョイン）して、各従業員の `first_name`、`last_name`、およびマネージャーの `first_name` を `manager_name` として取得してください。LEFT JOIN を使用し、`manager_id` が NULL の場合は `manager_name` も NULL になるようにしてください。

## テーブル構造

### employees テーブル

| カラム名 | データ型 | 説明 |
|---|---|---|
| employee_id | SERIAL | 社員ID（主キー） |
| first_name | VARCHAR | 名 |
| last_name | VARCHAR | 姓 |
| department_id | INT | 部署ID（外部キー） |
| salary | INT | 給与 |
| manager_id | INT | 上司ID（employee_idを参照） |

## 期待される結果

全従業員（5件）の `first_name`、`last_name`、`manager_name` が取得されること。John（manager_id が NULL）の `manager_name` は NULL になる。
