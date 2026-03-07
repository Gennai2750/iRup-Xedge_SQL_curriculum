import express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { execFile } from 'child_process';
import { Client } from 'pg';

const app = express();
app.use(express.json());

const EXERCISES_DIR = path.join(__dirname, 'exercises');

interface Exercise {
  index: number;
  chapter: string;
  name: string;
  questionPath: string;
  answerPath: string;
}

function discoverExercises(): Exercise[] {
  const exercises: Exercise[] = [];
  const chapters = fs.readdirSync(EXERCISES_DIR).sort();
  let index = 0;

  for (const chapter of chapters) {
    const chapterPath = path.join(EXERCISES_DIR, chapter);
    if (!fs.statSync(chapterPath).isDirectory()) continue;

    const problems = fs.readdirSync(chapterPath).sort();
    for (const problem of problems) {
      const problemPath = path.join(chapterPath, problem);
      if (!fs.statSync(problemPath).isDirectory()) continue;

      const questionPath = path.join(problemPath, 'question.md');
      const answerPath = path.join(problemPath, 'answer.sql');
      if (fs.existsSync(questionPath)) {
        exercises.push({ index: index++, chapter, name: problem, questionPath, answerPath });
      }
    }
  }
  return exercises;
}

const exercises = discoverExercises();
const RESULTS_PATH = path.join(__dirname, '.practice-results.json');

type ExerciseStatus = 'pass' | 'fail' | null;

function loadResults(): Record<string, ExerciseStatus> {
  try {
    return JSON.parse(fs.readFileSync(RESULTS_PATH, 'utf-8'));
  } catch {
    return {};
  }
}

function saveResults(results: Record<string, ExerciseStatus>) {
  fs.writeFileSync(RESULTS_PATH, JSON.stringify(results, null, 2), 'utf-8');
}

function translateTestError(raw: string, testTitle: string): string {
  const hints: string[] = [];

  // rowCount の toBe → 件数の不一致
  const rowCountMatch = raw.match(/expect\(received\)\.toBe\(expected\)[\s\S]*?Expected:\s*(\d+)\s*Received:\s*(\d+)/);
  if (rowCountMatch && (raw.includes('rowCount') || /\d+件|全データ|件/.test(testTitle))) {
    hints.push(`取得件数が正しくありません。期待: ${rowCountMatch[1]}件 ／ あなたの結果: ${rowCountMatch[2]}件`);
  }

  // toHaveProperty → カラムが存在しない
  const propMatches = raw.matchAll(/expect\(received\)\.toHaveProperty\(path\)[\s\S]*?Expected path:\s*"(.+?)"/g);
  for (const m of propMatches) {
    hints.push(`結果にカラム "${m[1]}" が含まれていません。SELECT で指定するカラムを確認してください。`);
  }

  // not.toHaveProperty → 不要なカラムが含まれている
  const notPropMatches = raw.matchAll(/expect\(received\)\.not\.toHaveProperty\(path\)[\s\S]*?Expected path: not\s*"(.+?)"/g);
  for (const m of notPropMatches) {
    hints.push(`カラム "${m[1]}" は結果に含めないでください。`);
  }

  // toHaveLength → 配列の長さの不一致
  const lenMatch = raw.match(/Expected length:\s*(\d+)\s*Received length:\s*(\d+)/);
  if (lenMatch) {
    hints.push(`取得件数が正しくありません。期待: ${lenMatch[1]}件 ／ あなたの結果: ${lenMatch[2]}件`);
  }

  // toBe (値) → 値の不一致（rowCount以外）
  if (hints.length === 0) {
    const toBeMatches = [...raw.matchAll(/expect\(received\)\.toBe\(expected\)[\s\S]*?Expected:\s*(.+)\s*Received:\s*(.+)/g)];
    for (const m of toBeMatches) {
      const expected = m[1].trim();
      const received = m[2].trim();
      hints.push(`値が正しくありません。期待: ${expected} ／ あなたの結果: ${received}`);
    }
  }

  // toEqual → 配列や構造の不一致
  if (raw.includes('toEqual') && hints.length === 0) {
    const eqMatch = raw.match(/Expected:\s*([\s\S]*?)\s*Received:\s*([\s\S]*?)(?:\n\n|\s*at\s)/);
    if (eqMatch) {
      hints.push(`結果の内容が期待と一致しません。\n期待: ${eqMatch[1].trim()}\nあなたの結果: ${eqMatch[2].trim()}`);
    } else {
      hints.push('結果の内容や順序が期待と一致しません。');
    }
  }

  // toContain → 配列に含まれない
  if (raw.includes('toContain')) {
    const containMatch = raw.match(/Expected[\s\S]*?to contain:\s*(.+)/);
    if (containMatch) {
      hints.push(`結果に ${containMatch[1].trim()} が含まれていません。`);
    }
  }

  // toContainEqual / toMatchObject
  if (raw.includes('toContainEqual') || raw.includes('toMatchObject')) {
    hints.push('結果に期待されるレコードが含まれていません。');
  }

  // toBeGreaterThan / toBeGreaterThanOrEqual
  const gtMatch = raw.match(/Expected:.*>=?\s*(\d+)\s*Received:\s*(\d+)/);
  if (gtMatch) {
    hints.push(`値が期待より小さいです。${gtMatch[1]} 以上が必要ですが、${gtMatch[2]} でした。`);
  }

  // toBeNull
  if (raw.includes('toBeNull') && hints.length === 0) {
    hints.push('NULL であるべき値が NULL ではありません。');
  }

  // toMatch (regex)
  if (raw.includes('toMatch') && hints.length === 0) {
    hints.push('値のパターンが一致しません。WHERE 条件や LIKE の指定を確認してください。');
  }

  // not.toBe
  if (raw.includes('not.toBe') && hints.length === 0) {
    hints.push('特定の値にならないことが期待されていますが、その値になっています。');
  }

  if (hints.length > 0) {
    return hints.join('\n');
  }

  return '結果が期待と一致しませんでした。問題文を再確認してください。';
}

function runTest(exercise: Exercise): Promise<{ passed: boolean; message: string }> {
  const testFile = path.join(__dirname, 'tests', exercise.chapter, `${exercise.name}.test.ts`);
  if (!fs.existsSync(testFile)) {
    return Promise.resolve({ passed: false, message: 'テストファイルが見つかりません' });
  }

  return new Promise(resolve => {
    const jestBin = path.join(__dirname, 'node_modules', '.bin', 'jest');
    execFile(jestBin, ['--json', '--no-coverage', testFile], { timeout: 15000 }, (err, stdout, stderr) => {
      try {
        // stdoutにテキストとJSONが混在するので、JSON部分だけ抽出
        const jsonMatch = (stdout || '').match(/(\{[\s\S]*"numFailedTests"[\s\S]*\})\s*$/);
        if (!jsonMatch) {
          resolve({ passed: false, message: stderr || err?.message || 'テスト出力を解析できませんでした' });
          return;
        }
        const result = JSON.parse(jsonMatch[1]);
        const passed = result.numFailedTests === 0;
        if (passed) {
          resolve({ passed: true, message: '' });
          return;
        }
        const failedAssertions: { title: string; messages: string[] }[] = result.testResults
          ?.flatMap((r: { assertionResults?: { status: string; title: string; failureMessages: string[] }[] }) =>
            (r.assertionResults ?? [])
              .filter((a: { status: string }) => a.status === 'failed')
              .map((a: { title: string; failureMessages: string[] }) => ({ title: a.title, messages: a.failureMessages }))
          ) ?? [];
        const testTitle = failedAssertions[0]?.title ?? '';
        const raw = failedAssertions.flatMap(a => a.messages).join('\n').replace(/\x1b\[[0-9;]*m/g, '');
        const message = translateTestError(raw, testTitle);
        resolve({ passed: false, message });
      } catch {
        resolve({ passed: false, message: err?.message ?? 'テスト実行に失敗しました' });
      }
    });
  });
}

function getClient(): Client {
  return new Client({
    user: 'student',
    host: 'localhost',
    database: 'curriculum_db',
    password: 'password',
    port: 5432,
  });
}

// API: 問題一覧
app.get('/api/exercises', (_req, res) => {
  const results = loadResults();
  const list = exercises.map(ex => {
    const question = fs.readFileSync(ex.questionPath, 'utf-8');
    const titleMatch = question.match(/^#\s+(.+)/m);
    const answerContent = fs.existsSync(ex.answerPath) ? fs.readFileSync(ex.answerPath, 'utf-8').trim() : '';
    const attempted = answerContent.length > 0 && !answerContent.startsWith('--');
    return {
      index: ex.index,
      chapter: ex.chapter,
      name: ex.name,
      title: titleMatch ? titleMatch[1] : ex.name,
      status: results[ex.name] ?? (attempted ? 'attempted' : null),
    };
  });
  res.json(list);
});

// API: 問題詳細
app.get('/api/exercises/:index', (req, res) => {
  const idx = parseInt(req.params.index);
  const ex = exercises[idx];
  if (!ex) return res.status(404).json({ error: 'Not found' });

  const question = fs.readFileSync(ex.questionPath, 'utf-8');
  const currentAnswer = fs.existsSync(ex.answerPath) ? fs.readFileSync(ex.answerPath, 'utf-8').trim() : '';
  res.json({ index: idx, chapter: ex.chapter, name: ex.name, question, currentAnswer });
});

// API: SQL実行 & answer.sql保存 & テスト実行
app.post('/api/exercises/:index/run', async (req, res) => {
  const idx = parseInt(req.params.index);
  const ex = exercises[idx];
  if (!ex) return res.status(404).json({ error: 'Not found' });

  const { sql } = req.body;
  if (!sql || typeof sql !== 'string' || !sql.trim()) {
    return res.status(400).json({ error: 'SQL is required' });
  }

  // 常に保存
  fs.writeFileSync(ex.answerPath, sql.trim() + '\n', 'utf-8');

  const client = getClient();
  try {
    await client.connect();

    // DML/DDLがDBを変更しないようトランザクションで囲んでROLLBACKする
    await client.query('BEGIN');
    const result = await client.query(sql.trim());
    const rows = result.rows ?? [];
    const columns = result.fields?.map(f => f.name) ?? [];
    const { command, rowCount } = result;
    await client.query('ROLLBACK');

    // テスト実行
    const testResult = await runTest(ex);
    const results = loadResults();
    results[ex.name] = testResult.passed ? 'pass' : 'fail';
    saveResults(results);

    res.json({
      command,
      rowCount,
      columns,
      rows,
      testPassed: testResult.passed,
      testMessage: testResult.message,
    });
  } catch (err: unknown) {
    await client.query('ROLLBACK').catch(() => {});
    const message = err instanceof Error ? err.message : String(err);

    // SQLエラーでも不正解として記録
    const results = loadResults();
    results[ex.name] = 'fail';
    saveResults(results);

    res.status(422).json({ error: message });
  } finally {
    await client.end();
  }
});

// フロントエンド配信
app.use(express.static(path.join(__dirname, 'public')));

const PORT = 3333;
app.listen(PORT, () => {
  console.log(`SQL Practice running at http://localhost:${PORT}`);
});
