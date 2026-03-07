import fs from 'fs';
import path from 'path';
import { Client } from 'pg';

describe('問題 7-4: SARGableな検索条件', () => {
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

  test('salaryが50000以上60000以下の従業員が3件取得されること', async () => {
    const sqlPath = path.join(__dirname, '../../exercises/07_antipattern/7_4_sargable/answer.sql');
    const query = fs.readFileSync(sqlPath, 'utf-8');
    const result = await client.query(query);

    expect(result.rowCount).toBe(3);
  });
});
