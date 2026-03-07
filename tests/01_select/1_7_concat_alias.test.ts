import fs from 'fs';
import path from 'path';
import { Client } from 'pg';

describe('問題 1-7: CONCATとASによる結合と別名', () => {
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

  test('full_nameカラムが取得され、正しく結合されていること', async () => {
    const sqlPath = path.join(__dirname, '../../exercises/01_select/1_7_concat_alias/answer.sql');
    const query = fs.readFileSync(sqlPath, 'utf-8');
    const result = await client.query(query);

    expect(result.rowCount).toBe(5);
    expect(result.rows[0]).toHaveProperty('full_name');
    const fullNames = result.rows.map((row: any) => row.full_name);
    expect(fullNames).toContain('John Doe');
  });
});
