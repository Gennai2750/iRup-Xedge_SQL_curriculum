import fs from 'fs';
import path from 'path';
import { Client } from 'pg';

describe('問題 2-3: 給与の合計と平均の取得', () => {
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

  test('給与の合計と平均を取得できること', async () => {
    const sqlPath = path.join(__dirname, '../../exercises/02_aggregation/2_3_sum_avg/answer.sql');
    const query = fs.readFileSync(sqlPath, 'utf-8');
    const result = await client.query(query);

    expect(result.rowCount).toBe(1);
    expect(result.rows[0]).toHaveProperty('total_salary');
    expect(result.rows[0]).toHaveProperty('avg_salary');
    expect(result.rows[0].total_salary).toBe('300000');
  });
});
