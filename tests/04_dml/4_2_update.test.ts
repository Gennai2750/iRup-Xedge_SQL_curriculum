import fs from 'fs';
import path from 'path';
import { Client } from 'pg';

describe('問題 4-2: レコードの更新', () => {
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

  test('employee_id=4の給与が60000に更新されること', async () => {
    const sqlPath = path.join(__dirname, '../../exercises/04_dml/4_2_update/answer.sql');
    const query = fs.readFileSync(sqlPath, 'utf-8');
    await client.query(query);

    const result = await client.query('SELECT salary FROM employees WHERE employee_id = 4');
    expect(Number(result.rows[0].salary)).toBe(60000);
  });
});
