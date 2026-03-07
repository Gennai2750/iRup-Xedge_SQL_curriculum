# 問題 2-6: HAVING句による絞り込み

## 問題

`employees` テーブルから `department_id` ごとの従業員数を集計し、従業員数が2人以上の部門のみ取得してください。

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

従業員数が2人以上の部門のみ取得されること（1件: IT部門の `department_id` = 2）。
