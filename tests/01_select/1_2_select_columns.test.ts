import fs from 'fs';
import path from 'path';
import { Client } from 'pg';

describe('問題 1-2: 特定カラムの取得', () => {
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

  test('first_nameとlast_nameのみが取得されること（5件）', async () => {
    const sqlPath = path.join(__dirname, '../../exercises/01_select/1_2_select_columns/answer.sql');
    const query = fs.readFileSync(sqlPath, 'utf-8');
    const result = await client.query(query);

    expect(result.rowCount).toBe(5);
    expect(result.rows[0]).toHaveProperty('first_name');
    expect(result.rows[0]).toHaveProperty('last_name');
    expect(result.rows[0]).not.toHaveProperty('employee_id');
  });
});
