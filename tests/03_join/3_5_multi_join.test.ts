import fs from 'fs';
import path from 'path';
import { Client } from 'pg';

describe('問題 3-5: 自己結合（セルフジョイン）', () => {
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

  test('全従業員（5件）のfirst_name, last_name, manager_nameが取得されること', async () => {
    const sqlPath = path.join(__dirname, '../../exercises/03_join/3_5_multi_join/answer.sql');
    const query = fs.readFileSync(sqlPath, 'utf-8');
    const result = await client.query(query);

    expect(result.rowCount).toBe(5);
    expect(result.rows[0]).toHaveProperty('first_name');
    expect(result.rows[0]).toHaveProperty('last_name');
    expect(result.rows[0]).toHaveProperty('manager_name');

    const john = result.rows.find((row: any) => row.first_name === 'John');
    expect(john.manager_name).toBeNull();
  });
});
