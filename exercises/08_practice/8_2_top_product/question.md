# 問題 8-2: 最も売上金額が高い商品

## 問題

最も売上金額（`price * quantity` の合計）が高い商品を特定してください。

取得するカラム: `product_id`, `product_name`, `total_sales`

## テーブル構造

### products テーブル

| カラム名 | データ型 | 説明 |
|---|---|---|
| product_id | SERIAL | 商品ID（主キー） |
| product_name | VARCHAR | 商品名 |
| price | INT | 価格 |
| category | VARCHAR | カテゴリ |

### orders テーブル

| カラム名 | データ型 | 説明 |
|---|---|---|
| order_id | SERIAL | 注文ID（主キー） |
| employee_id | INT | 社員ID（外部キー） |
| product_id | INT | 商品ID（外部キー） |
| quantity | INT | 数量 |
| order_date | DATE | 注文日 |

## ヒント

- `products` と `orders` を結合してください
- `SUM(price * quantity)` で売上金額を算出します
- 最も高い1件だけを取得する方法を考えてください（`ORDER BY` + `LIMIT` など）

## 期待される結果

1件の結果が返されること。

| product_id | product_name | total_sales |
|---|---|---|
| 1 | Laptop | 240000 |
