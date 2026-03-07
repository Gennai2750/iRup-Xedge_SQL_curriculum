import fs from 'fs';
import path from 'path';
import { Client } from 'pg';

describe('問題 6-1: サブクエリ（平均給与との比較）', () => {
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

  test('平均給与より高い給与の従業員が2件取得されること', async () => {
    const sqlPath = path.join(__dirname, '../../exercises/06_advanced/6_1_subquery/answer.sql');
    const query = fs.readFileSync(sqlPath, 'utf-8');
    const result = await client.query(query);

    expect(result.rowCount).toBe(2);
    result.rows.forEach((row: any) => {
      expect(Number(row.salary)).toBeGreaterThan(60000);
    });
  });
});
