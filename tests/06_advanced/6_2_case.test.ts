import fs from 'fs';
import path from 'path';
import { Client } from 'pg';

describe('問題 6-2: CASE式による条件分岐', () => {
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

  test('全従業員にsalary_levelが付与されること', async () => {
    const sqlPath = path.join(__dirname, '../../exercises/06_advanced/6_2_case/answer.sql');
    const query = fs.readFileSync(sqlPath, 'utf-8');
    const result = await client.query(query);

    expect(result.rowCount).toBe(5);
    result.rows.forEach((row: any) => {
      expect(row).toHaveProperty('salary_level');
    });

    const findRow = (firstName: string) =>
      result.rows.find((row: any) => row.first_name === firstName);

    expect(findRow('John')?.salary_level).toBe('Medium');
    expect(findRow('Jane')?.salary_level).toBe('High');
    expect(findRow('Charlie')?.salary_level).toBe('High');
  });
});
