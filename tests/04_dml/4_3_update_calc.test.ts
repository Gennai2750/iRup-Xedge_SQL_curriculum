import fs from 'fs';
import path from 'path';
import { Client } from 'pg';

describe('問題 4-3: 計算を用いたレコードの更新', () => {
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

  test('IT部門の全従業員の給与が10%増加すること', async () => {
    const sqlPath = path.join(__dirname, '../../exercises/04_dml/4_3_update_calc/answer.sql');
    const query = fs.readFileSync(sqlPath, 'utf-8');
    await client.query(query);

    const result = await client.query(
      'SELECT salary FROM employees WHERE department_id = 2 ORDER BY employee_id'
    );
    expect(Number(result.rows[0].salary)).toBe(66000);
    expect(Number(result.rows[1].salary)).toBe(71500);
  });
});
