import fs from 'fs';
import path from 'path';
import { Client } from 'pg';

describe('問題 5-1: テーブルの作成', () => {
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

  test('projectsテーブルが作成されること', async () => {
    const sqlPath = path.join(__dirname, '../../exercises/05_ddl/5_1_create_table/answer.sql');
    const query = fs.readFileSync(sqlPath, 'utf-8');
    await client.query(query);

    const tableResult = await client.query(
      `SELECT table_name FROM information_schema.tables WHERE table_name = 'projects' AND table_schema = 'public'`
    );
    expect(tableResult.rowCount).toBe(1);
  });

  test('projectsテーブルに正しいカラムが定義されていること', async () => {
    const sqlPath = path.join(__dirname, '../../exercises/05_ddl/5_1_create_table/answer.sql');
    const query = fs.readFileSync(sqlPath, 'utf-8');
    await client.query(query);

    const columnsResult = await client.query(
      `SELECT column_name, data_type, is_nullable
       FROM information_schema.columns
       WHERE table_name = 'projects' AND table_schema = 'public'
       ORDER BY ordinal_position`
    );

    const columns = columnsResult.rows;
    const columnNames = columns.map((c: any) => c.column_name);

    expect(columnNames).toContain('project_id');
    expect(columnNames).toContain('project_name');
    expect(columnNames).toContain('start_date');
    expect(columnNames).toContain('budget');

    const projectName = columns.find((c: any) => c.column_name === 'project_name');
    expect(projectName.is_nullable).toBe('NO');

    const startDate = columns.find((c: any) => c.column_name === 'start_date');
    expect(startDate.is_nullable).toBe('NO');
  });
});
