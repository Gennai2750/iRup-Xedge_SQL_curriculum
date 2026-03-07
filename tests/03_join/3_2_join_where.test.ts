import fs from 'fs';
import path from 'path';
import { Client } from 'pg';

describe('問題 3-2: JOINとWHERE句の組み合わせ', () => {
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

  test('IT部署の従業員（2件）のfirst_name, last_name, department_nameが取得されること', async () => {
    const sqlPath = path.join(__dirname, '../../exercises/03_join/3_2_join_where/answer.sql');
    const query = fs.readFileSync(sqlPath, 'utf-8');
    const result = await client.query(query);

    expect(result.rowCount).toBe(2);
    result.rows.forEach((row: any) => {
      expect(row.department_name).toBe('IT');
    });
  });
});
