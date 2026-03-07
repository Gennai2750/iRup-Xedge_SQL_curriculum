# 問題 2-3: 給与の合計と平均の取得

## 問題

`employees` テーブルの給与の合計（`total_salary`）と平均（`avg_salary`）を取得してください。

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

給与の合計（`total_salary`）と平均（`avg_salary`）が1行で取得されること。
