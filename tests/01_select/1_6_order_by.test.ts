import fs from 'fs';
import path from 'path';
import { Client } from 'pg';

describe('問題 1-6: ORDER BYによる並び替え', () => {
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

  test('全社員が給与の降順で取得されること', async () => {
    const sqlPath = path.join(__dirname, '../../exercises/01_select/1_6_order_by/answer.sql');
    const query = fs.readFileSync(sqlPath, 'utf-8');
    const result = await client.query(query);

    expect(result.rowCount).toBe(5);
    expect(result.rows[0].salary).toBe(70000);
    expect(result.rows[result.rows.length - 1].salary).toBe(50000);
  });
});
