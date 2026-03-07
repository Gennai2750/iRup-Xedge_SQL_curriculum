import fs from 'fs';
import path from 'path';
import { Client } from 'pg';

describe('問題 3-4: LEFT JOINとIS NULLで未紐づけデータの検出', () => {
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

  test('従業員が紐づかない部門が0件であること', async () => {
    const sqlPath = path.join(__dirname, '../../exercises/03_join/3_4_left_join_null/answer.sql');
    const query = fs.readFileSync(sqlPath, 'utf-8');
    const result = await client.query(query);

    expect(result.rowCount).toBe(0);
  });
});
