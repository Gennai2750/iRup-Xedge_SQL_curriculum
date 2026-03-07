import fs from 'fs';
import path from 'path';
import { Client } from 'pg';

describe('問題 5-2: カラムの追加', () => {
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

  test('employeesテーブルにemailカラムが追加されること', async () => {
    const sqlPath = path.join(__dirname, '../../exercises/05_ddl/5_2_alter_add/answer.sql');
    const query = fs.readFileSync(sqlPath, 'utf-8');
    await client.query(query);

    const result = await client.query(
      `SELECT column_name, data_type, character_maximum_length
       FROM information_schema.columns
       WHERE table_name = 'employees' AND column_name = 'email' AND table_schema = 'public'`
    );

    expect(result.rowCount).toBe(1);
    expect(result.rows[0].data_type).toBe('character varying');
    expect(result.rows[0].character_maximum_length).toBe(100);
  });
});
