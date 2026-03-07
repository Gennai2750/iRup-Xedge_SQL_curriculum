# 問題 5-1: テーブルの作成

## 問題

`projects` という新しいテーブルを作成してください。

## カラム定義

| カラム名 | データ型 | 制約 |
|---|---|---|
| project_id | SERIAL | PRIMARY KEY |
| project_name | VARCHAR(100) | NOT NULL |
| start_date | DATE | NOT NULL |
| budget | INTEGER | なし |

## 期待される結果

`projects` テーブルが作成され、上記のカラムが定義されていること。
