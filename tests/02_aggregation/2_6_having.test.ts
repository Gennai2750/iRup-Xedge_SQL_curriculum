import fs from 'fs';
import path from 'path';
import { Client } from 'pg';

describe('問題 2-6: HAVING句による絞り込み', () => {
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

  test('従業員数が2人以上の部門のみ取得できること', async () => {
    const sqlPath = path.join(__dirname, '../../exercises/02_aggregation/2_6_having/answer.sql');
    const query = fs.readFileSync(sqlPath, 'utf-8');
    const result = await client.query(query);

    expect(result.rowCount).toBe(1);
    expect(result.rows[0].employee_count).toBe('2');
  });
});
