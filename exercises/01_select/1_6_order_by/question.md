# 問題 1-6: ORDER BYによる並び替え

## 問題

`employees` テーブルから全社員を取得し、給与（`salary`）の降順で並び替えてください。

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

全社員が給与の降順で取得されること（5件、先頭: Charlie 70000、末尾: John 50000）。
