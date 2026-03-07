import fs from 'fs';
import path from 'path';
import { Client } from 'pg';

describe('問題 1-3: WHERE句による基本的な絞り込み', () => {
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

  test('給与が60000以上の社員が3件取得されること', async () => {
    const sqlPath = path.join(__dirname, '../../exercises/01_select/1_3_where_basic/answer.sql');
    const query = fs.readFileSync(sqlPath, 'utf-8');
    const result = await client.query(query);

    expect(result.rowCount).toBe(3);
    result.rows.forEach((row: any) => {
      expect(row.salary).toBeGreaterThanOrEqual(60000);
    });
  });
});
