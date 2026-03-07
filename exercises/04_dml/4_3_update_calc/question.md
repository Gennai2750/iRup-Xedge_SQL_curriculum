# 問題 4-3: 計算を用いたレコードの更新

## 問題

IT部門（`department_id` = 2）に所属する全従業員の給与（`salary`）を10%増加させてください。

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

## 現在のデータ（IT部門）

| employee_id | first_name | last_name | department_id | salary | manager_id |
|---|---|---|---|---|---|
| 2 | Jane | Smith | 2 | 60000 | 1 |
| 3 | Alice | Johnson | 2 | 65000 | 2 |

## 期待される結果

IT部門の従業員の給与がそれぞれ10%増加すること。

- Jane Smith: 60000 -> 66000
- Alice Johnson: 65000 -> 71500
