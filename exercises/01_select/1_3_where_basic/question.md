# 問題 1-3: WHERE句による基本的な絞り込み

## 問題

`employees` テーブルから、給与（`salary`）が 60000 以上の社員を取得してください。

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

給与が 60000 以上の社員が取得されること（3件: Jane, Alice, Charlie）。
