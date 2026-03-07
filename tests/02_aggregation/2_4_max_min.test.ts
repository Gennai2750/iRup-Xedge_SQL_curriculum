import fs from 'fs';
import path from 'path';
import { Client } from 'pg';

describe('問題 2-4: 給与の最大値と最小値の取得', () => {
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

  test('給与の最大値と最小値を取得できること', async () => {
    const sqlPath = path.join(__dirname, '../../exercises/02_aggregation/2_4_max_min/answer.sql');
    const query = fs.readFileSync(sqlPath, 'utf-8');
    const result = await client.query(query);

    expect(result.rowCount).toBe(1);
    expect(result.rows[0]).toHaveProperty('max_salary');
    expect(result.rows[0]).toHaveProperty('min_salary');
    expect(result.rows[0].max_salary).toBe(70000);
    expect(result.rows[0].min_salary).toBe(50000);
  });
});
