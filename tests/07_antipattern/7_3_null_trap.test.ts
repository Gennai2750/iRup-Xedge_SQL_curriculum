import fs from 'fs';
import path from 'path';
import { Client } from 'pg';

describe('問題 7-3: NULLの比較の罠', () => {
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

  test('manager_idがNULLの従業員が1件取得されること', async () => {
    const sqlPath = path.join(__dirname, '../../exercises/07_antipattern/7_3_null_trap/answer.sql');
    const query = fs.readFileSync(sqlPath, 'utf-8');
    const result = await client.query(query);

    expect(result.rowCount).toBe(1);
    expect(result.rows[0].first_name).toBe('John');
  });
});
