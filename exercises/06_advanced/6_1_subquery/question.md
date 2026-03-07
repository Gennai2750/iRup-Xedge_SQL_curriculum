# 問題 6-1: サブクエリ（平均給与との比較）

## 問題

全従業員の平均給与より高い給与を持つ従業員の `first_name`, `last_name`, `salary` を取得してください。サブクエリを使用すること。

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

平均給与（60000）より高い給与の従業員（2件）が取得されること。
