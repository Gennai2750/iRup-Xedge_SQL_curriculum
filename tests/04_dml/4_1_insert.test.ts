import fs from 'fs';
import path from 'path';
import { Client } from 'pg';

describe('問題 4-1: レコードの挿入', () => {
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

  test('employeesテーブルにレコードが1件追加され、合計6件になること', async () => {
    const sqlPath = path.join(__dirname, '../../exercises/04_dml/4_1_insert/answer.sql');
    const query = fs.readFileSync(sqlPath, 'utf-8');
    await client.query(query);

    const countResult = await client.query('SELECT COUNT(*) FROM employees');
    expect(Number(countResult.rows[0].count)).toBe(6);
  });

  test('追加されたレコードのfirst_nameがDavidであること', async () => {
    const sqlPath = path.join(__dirname, '../../exercises/04_dml/4_1_insert/answer.sql');
    const query = fs.readFileSync(sqlPath, 'utf-8');
    await client.query(query);

    const result = await client.query("SELECT * FROM employees WHERE first_name = 'David'");
    expect(result.rowCount).toBe(1);
    expect(result.rows[0].last_name).toBe('Wilson');
    expect(Number(result.rows[0].department_id)).toBe(3);
    expect(Number(result.rows[0].salary)).toBe(58000);
    expect(Number(result.rows[0].manager_id)).toBe(4);
  });
});
