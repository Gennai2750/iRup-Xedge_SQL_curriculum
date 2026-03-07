import fs from 'fs';
import path from 'path';
import { Client } from 'pg';

describe('問題 7-5: GROUP BYの正しい使い方', () => {
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

  test('department_idごとの従業員数と平均給与が4件取得されること', async () => {
    const sqlPath = path.join(__dirname, '../../exercises/07_antipattern/7_5_group_by_error/answer.sql');
    const query = fs.readFileSync(sqlPath, 'utf-8');
    const result = await client.query(query);

    expect(result.rowCount).toBe(4);
    expect(result.rows[0]).toHaveProperty('department_id');
    expect(result.rows[0]).toHaveProperty('employee_count');
    expect(result.rows[0]).toHaveProperty('avg_salary');
  });
});
