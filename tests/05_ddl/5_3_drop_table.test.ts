import fs from 'fs';
import path from 'path';
import { Client } from 'pg';

describe('問題 5-3: テーブルの削除', () => {
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

  beforeEach(async () => {
    await client.query('BEGIN');
  });

  afterEach(async () => {
    await client.query('ROLLBACK');
  });

  test('ordersテーブルが削除されること', async () => {
    const sqlPath = path.join(__dirname, '../../exercises/05_ddl/5_3_drop_table/answer.sql');
    const query = fs.readFileSync(sqlPath, 'utf-8');
    await client.query(query);

    const result = await client.query(
      `SELECT table_name FROM information_schema.tables WHERE table_name = 'orders' AND table_schema = 'public'`
    );

    expect(result.rowCount).toBe(0);
  });
});
