# 問題 8-3: 部門ごとの平均給与と従業員一覧

## 問題

部門ごとの平均給与と従業員一覧を同時に表示してください。

取得するカラム: `department_name`, `first_name`, `last_name`, `salary`, `avg_salary`（部門平均給与）

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

### departments テーブル

| カラム名 | データ型 | 説明 |
|---|---|---|
| department_id | SERIAL | 部署ID（主キー） |
| department_name | VARCHAR | 部署名 |
| location | VARCHAR | 所在地 |

## ヒント

- ウィンドウ関数 `AVG() OVER (PARTITION BY ...)` を使うと、各行に部門平均を付与できます
- または、サブクエリで部門平均を算出して結合する方法もあります

## 期待される結果

5件の結果が返されること。各従業員の行に、所属部門の平均給与が含まれます。

| department_name | first_name | last_name | salary | avg_salary |
|---|---|---|---|---|
| HR | John | Doe | 50000 | 50000 |
| IT | Jane | Smith | 60000 | 62500 |
| IT | Alice | Johnson | 65000 | 62500 |
| Sales | Bob | Brown | 55000 | 55000 |
| Marketing | Charlie | Davis | 70000 | 70000 |
