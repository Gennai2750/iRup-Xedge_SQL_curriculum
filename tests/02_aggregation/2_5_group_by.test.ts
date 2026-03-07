import fs from 'fs';
import path from 'path';
import { Client } from 'pg';

describe('問題 2-5: 部門ごとの従業員数の取得', () => {
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

  test('department_idごとの従業員数を取得できること', async () => {
    const sqlPath = path.join(__dirname, '../../exercises/02_aggregation/2_5_group_by/answer.sql');
    const query = fs.readFileSync(sqlPath, 'utf-8');
    const result = await client.query(query);

    expect(result.rowCount).toBe(4);
    expect(result.rows[0]).toHaveProperty('department_id');
    expect(result.rows[0]).toHaveProperty('employee_count');
  });
});
