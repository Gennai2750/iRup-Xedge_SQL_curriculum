import fs from 'fs';
import path from 'path';
import { Client } from 'pg';

describe('問題 4-4: レコードの削除', () => {
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

  test('employee_id=5のレコードが削除され、合計4件になること', async () => {
    const sqlPath = path.join(__dirname, '../../exercises/04_dml/4_4_delete/answer.sql');
    const query = fs.readFileSync(sqlPath, 'utf-8');
    await client.query(query);

    const countResult = await client.query('SELECT COUNT(*) FROM employees');
    expect(Number(countResult.rows[0].count)).toBe(4);

    const result = await client.query('SELECT * FROM employees WHERE employee_id = 5');
    expect(result.rowCount).toBe(0);
  });
});
