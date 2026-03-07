import fs from 'fs';
import path from 'path';
import { Client } from 'pg';

describe('問題 2-2: 重複を除いた一覧の取得', () => {
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

  test('department_idの重複を除いた一覧を取得できること', async () => {
    const sqlPath = path.join(__dirname, '../../exercises/02_aggregation/2_2_distinct/answer.sql');
    const query = fs.readFileSync(sqlPath, 'utf-8');
    const result = await client.query(query);

    expect(result.rowCount).toBe(4);
  });
});
