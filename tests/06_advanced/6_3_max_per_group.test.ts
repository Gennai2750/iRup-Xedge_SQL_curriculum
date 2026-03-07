import fs from 'fs';
import path from 'path';
import { Client } from 'pg';

describe('問題 6-3: サブクエリ応用（グループごとの最大値）', () => {
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

  test('各部門で最も給与が高い従業員が4件取得されること', async () => {
    const sqlPath = path.join(__dirname, '../../exercises/06_advanced/6_3_max_per_group/answer.sql');
    const query = fs.readFileSync(sqlPath, 'utf-8');
    const result = await client.query(query);

    expect(result.rowCount).toBe(4);

    const findByDept = (deptId: number) =>
      result.rows.find((row: any) => Number(row.department_id) === deptId);

    expect(findByDept(1)?.first_name).toBe('John');
    expect(Number(findByDept(1)?.salary)).toBe(50000);
    expect(findByDept(2)?.first_name).toBe('Alice');
    expect(Number(findByDept(2)?.salary)).toBe(65000);
    expect(findByDept(3)?.first_name).toBe('Bob');
    expect(Number(findByDept(3)?.salary)).toBe(55000);
    expect(findByDept(4)?.first_name).toBe('Charlie');
    expect(Number(findByDept(4)?.salary)).toBe(70000);
  });
});
