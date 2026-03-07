import fs from 'fs';
import path from 'path';
import { Client } from 'pg';

describe('問題 3-3: LEFT JOIN', () => {
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

  test('departmentsを基準にLEFT JOINし、全行（5件）のdepartment_name, first_nameが取得されること', async () => {
    const sqlPath = path.join(__dirname, '../../exercises/03_join/3_3_left_join/answer.sql');
    const query = fs.readFileSync(sqlPath, 'utf-8');
    const result = await client.query(query);

    expect(result.rowCount).toBe(5);
    expect(result.rows[0]).toHaveProperty('department_name');
    expect(result.rows[0]).toHaveProperty('first_name');
  });
});
