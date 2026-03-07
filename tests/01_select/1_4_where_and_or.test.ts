import fs from 'fs';
import path from 'path';
import { Client } from 'pg';

describe('問題 1-4: WHERE句でのAND/OR条件', () => {
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

  test('department_id=2またはsalary>=65000の社員が3件取得されること', async () => {
    const sqlPath = path.join(__dirname, '../../exercises/01_select/1_4_where_and_or/answer.sql');
    const query = fs.readFileSync(sqlPath, 'utf-8');
    const result = await client.query(query);

    expect(result.rowCount).toBe(3);
    const names = result.rows.map((row: any) => row.first_name).sort();
    expect(names).toEqual(['Alice', 'Charlie', 'Jane']);
  });
});
