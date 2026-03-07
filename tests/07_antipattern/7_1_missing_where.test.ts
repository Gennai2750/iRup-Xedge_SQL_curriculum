import fs from 'fs';
import path from 'path';
import { Client } from 'pg';

describe('問題 7-1: WHERE句の付け忘れ', () => {
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

  test('employee_id=3の給与のみが70000に更新されること', async () => {
    const sqlPath = path.join(__dirname, '../../exercises/07_antipattern/7_1_missing_where/answer.sql');
    const query = fs.readFileSync(sqlPath, 'utf-8');
    await client.query(query);

    const result = await client.query('SELECT salary FROM employees WHERE employee_id = 3');
    expect(Number(result.rows[0].salary)).toBe(70000);
  });

  test('他のレコードが更新されていないこと（全件更新されていないこと）', async () => {
    const sqlPath = path.join(__dirname, '../../exercises/07_antipattern/7_1_missing_where/answer.sql');
    const query = fs.readFileSync(sqlPath, 'utf-8');
    await client.query(query);

    const result = await client.query('SELECT COUNT(*) FROM employees WHERE salary = 70000');
    expect(Number(result.rows[0].count)).not.toBe(5);
  });
});
