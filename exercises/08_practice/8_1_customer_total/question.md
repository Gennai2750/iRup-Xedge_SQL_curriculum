# 問題 8-1: 従業員別の合計購入金額

## 問題

各従業員（employee）の合計購入金額を算出し、金額が高い順に表示してください。

合計購入金額は `price * quantity` の合計（total_amount）として計算します。

取得するカラム: `employee_id`, `first_name`, `last_name`, `total_amount`

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

### orders テーブル

| カラム名 | データ型 | 説明 |
|---|---|---|
| order_id | SERIAL | 注文ID（主キー） |
| employee_id | INT | 社員ID（外部キー） |
| product_id | INT | 商品ID（外部キー） |
| quantity | INT | 数量 |
| order_date | DATE | 注文日 |

### products テーブル

| カラム名 | データ型 | 説明 |
|---|---|---|
| product_id | SERIAL | 商品ID（主キー） |
| product_name | VARCHAR | 商品名 |
| price | INT | 価格 |
| category | VARCHAR | カテゴリ |

## ヒント

- `employees`, `orders`, `products` の3テーブルを結合する必要があります
- `SUM(price * quantity)` で合計金額を算出します
- `GROUP BY` と `ORDER BY` を組み合わせてください

## 期待される結果

5件の結果が金額の降順で返されること。

| employee_id | first_name | last_name | total_amount |
|---|---|---|---|
| 3 | Alice | Johnson | 190000 |
| 1 | John | Doe | 126000 |
| 2 | Jane | Smith | 105000 |
| 5 | Charlie | Davis | 60000 |
| 4 | Bob | Brown | 9000 |
