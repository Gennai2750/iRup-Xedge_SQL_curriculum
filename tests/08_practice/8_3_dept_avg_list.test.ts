import fs from 'fs';
import path from 'path';
import { Client } from 'pg';

describe('問題 8-3: 部門ごとの平均給与と従業員一覧', () => {
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

  test('全従業員（5件）のdepartment_name, first_name, salary, avg_salaryが取得されること', async () => {
    const sqlPath = path.join(__dirname, '../../exercises/08_practice/8_3_dept_avg_list/answer.sql');
    const query = fs.readFileSync(sqlPath, 'utf-8');
    const result = await client.query(query);

    expect(result.rowCount).toBe(5);
    expect(result.rows[0]).toHaveProperty('department_name');
    expect(result.rows[0]).toHaveProperty('first_name');
    expect(result.rows[0]).toHaveProperty('salary');
    expect(result.rows[0]).toHaveProperty('avg_salary');
  });
});
