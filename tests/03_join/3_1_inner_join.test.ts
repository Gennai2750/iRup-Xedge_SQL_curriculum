import fs from 'fs';
import path from 'path';
import { Client } from 'pg';

describe('問題 3-1: INNER JOIN', () => {
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

  test('employeesとdepartmentsをINNER JOINし、全従業員（5件）のfirst_name, last_name, department_nameが取得されること', async () => {
    const sqlPath = path.join(__dirname, '../../exercises/03_join/3_1_inner_join/answer.sql');
    const query = fs.readFileSync(sqlPath, 'utf-8');
    const result = await client.query(query);

    expect(result.rowCount).toBe(5);
    expect(result.rows[0]).toHaveProperty('first_name');
    expect(result.rows[0]).toHaveProperty('last_name');
    expect(result.rows[0]).toHaveProperty('department_name');
  });
});
