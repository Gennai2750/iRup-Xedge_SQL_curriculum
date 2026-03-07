import fs from 'fs';
import path from 'path';
import { Client } from 'pg';

describe('問題 7-2: CROSS JOINによる意図しない直積', () => {
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

  test('CROSS JOINの結果が20件（5×4）であること', async () => {
    const sqlPath = path.join(__dirname, '../../exercises/07_antipattern/7_2_cross_join/answer.sql');
    const query = fs.readFileSync(sqlPath, 'utf-8');
    const result = await client.query(query);

    expect(result.rowCount).toBe(20);
  });
});
