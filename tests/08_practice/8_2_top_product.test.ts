import fs from 'fs';
import path from 'path';
import { Client } from 'pg';

describe('問題 8-2: 最も売上金額が高い商品', () => {
  let client: Client;

  beforeAll(async () => {
    client = new Client({
      user: 'student',
      host: 'localhost',
      database: 'curriculum_db',
      password: 'password',
      port: 5432,
    });
    await client.connect();
  });

  afterAll(async () => {
    await client.end();
  });

  test('最も売上金額が高い商品（Laptop, 240000）が1件取得されること', async () => {
    const sqlPath = path.join(__dirname, '../../exercises/08_practice/8_2_top_product/answer.sql');
    const query = fs.readFileSync(sqlPath, 'utf-8');
    const result = await client.query(query);

    expect(result.rowCount).toBe(1);
    expect(result.rows[0].product_name).toBe('Laptop');
    expect(Number(result.rows[0].total_sales)).toBe(240000);
  });
});
