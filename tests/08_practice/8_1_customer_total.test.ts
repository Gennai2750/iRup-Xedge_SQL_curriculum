import fs from 'fs';
import path from 'path';
import { Client } from 'pg';

describe('問題 8-1: 従業員別の合計購入金額', () => {
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

  test('各従業員の合計購入金額が金額降順で5件取得されること', async () => {
    const sqlPath = path.join(__dirname, '../../exercises/08_practice/8_1_customer_total/answer.sql');
    const query = fs.readFileSync(sqlPath, 'utf-8');
    const result = await client.query(query);

    expect(result.rowCount).toBe(5);
    expect(result.rows[0]).toHaveProperty('total_amount');
    expect(Number(result.rows[0].total_amount)).toBe(190000);
  });
});
