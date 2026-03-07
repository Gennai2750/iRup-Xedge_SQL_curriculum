import fs from 'fs';
import path from 'path';
import { Client } from 'pg';

describe('問題 1-5: LIKE句によるパターンマッチ', () => {
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

  test('first_nameがJで始まる社員が2件取得されること', async () => {
    const sqlPath = path.join(__dirname, '../../exercises/01_select/1_5_like/answer.sql');
    const query = fs.readFileSync(sqlPath, 'utf-8');
    const result = await client.query(query);

    expect(result.rowCount).toBe(2);
    result.rows.forEach((row: any) => {
      expect(row.first_name).toMatch(/^J/);
    });
  });
});
