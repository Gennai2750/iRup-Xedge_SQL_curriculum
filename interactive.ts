import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import { Client } from 'pg';

const EXERCISES_DIR = path.join(__dirname, 'exercises');

interface Exercise {
  id: string;
  chapter: string;
  name: string;
  questionPath: string;
  answerPath: string;
}

function discoverExercises(): Exercise[] {
  const exercises: Exercise[] = [];
  const chapters = fs.readdirSync(EXERCISES_DIR).sort();

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
        exercises.push({
          id: problem,
          chapter,
          name: problem,
          questionPath,
          answerPath,
        });
      }
    }
  }
  return exercises;
}

function formatTable(rows: Record<string, unknown>[]): string {
  if (rows.length === 0) return '  (0 rows)\n';

  const columns = Object.keys(rows[0]);
  const widths: Record<string, number> = {};
  for (const col of columns) {
    widths[col] = col.length;
    for (const row of rows) {
      const val = String(row[col] ?? 'NULL');
      widths[col] = Math.max(widths[col], val.length);
    }
  }

  const header = columns.map(c => c.padEnd(widths[c])).join(' | ');
  const separator = columns.map(c => '-'.repeat(widths[c])).join('-+-');
  const body = rows.map(row =>
    columns.map(c => String(row[c] ?? 'NULL').padEnd(widths[c])).join(' | ')
  ).join('\n');

  return `  ${header}\n  ${separator}\n  ${body}\n  (${rows.length} rows)\n`;
}

function extractTitle(markdown: string): string {
  const match = markdown.match(/^#\s+(.+)/m);
  return match ? match[1] : '';
}

const C = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  red: '\x1b[31m',
};

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const ask = (prompt: string): Promise<string> =>
    new Promise(resolve => rl.question(prompt, resolve));

  const client = new Client({
    user: 'student',
    host: 'localhost',
    database: 'curriculum_db',
    password: 'password',
    port: 5432,
  });

  try {
    await client.connect();
  } catch {
    console.error(`${C.red}DB接続エラー: PostgreSQLが起動しているか確認してください。${C.reset}`);
    console.error(`${C.dim}  cd db && docker compose up -d${C.reset}`);
    rl.close();
    process.exit(1);
  }

  const exercises = discoverExercises();

  console.log(`
${C.cyan}${C.bold}============================================${C.reset}
${C.cyan}${C.bold}    SQL Interactive Practice${C.reset}
${C.cyan}${C.bold}============================================${C.reset}
`);

  while (true) {
    console.log(`${C.bold}問題一覧:${C.reset}`);
    console.log(`${C.dim}${'─'.repeat(50)}${C.reset}`);

    let currentChapter = '';
    exercises.forEach((ex, i) => {
      if (ex.chapter !== currentChapter) {
        currentChapter = ex.chapter;
        const chapterLabel = currentChapter.replace(/_/g, ' ').replace(/^\d+\s*/, m => `第${parseInt(m)}章: `);
        console.log(`\n${C.yellow}${C.bold}  ${chapterLabel}${C.reset}`);
      }
      const question = fs.readFileSync(ex.questionPath, 'utf-8');
      const title = extractTitle(question);
      const answerContent = fs.existsSync(ex.answerPath) ? fs.readFileSync(ex.answerPath, 'utf-8').trim() : '';
      const hasAnswer = answerContent.length > 0 && !answerContent.startsWith('--');
      const status = hasAnswer ? `${C.green}[済]${C.reset}` : `${C.dim}[ ]${C.reset}`;
      console.log(`    ${status} ${C.bold}${String(i + 1).padStart(2)}.${C.reset} ${title}`);
    });

    console.log(`\n${C.dim}  q: 終了${C.reset}\n`);

    const input = await ask(`${C.cyan}問題番号を入力 > ${C.reset}`);

    if (input.trim().toLowerCase() === 'q') {
      console.log(`\n${C.green}お疲れ様でした！${C.reset}\n`);
      break;
    }

    const idx = parseInt(input.trim()) - 1;
    if (isNaN(idx) || idx < 0 || idx >= exercises.length) {
      console.log(`${C.red}無効な番号です。1〜${exercises.length} の範囲で入力してください。${C.reset}\n`);
      continue;
    }

    const exercise = exercises[idx];

    console.log(`\n${C.cyan}${'═'.repeat(50)}${C.reset}`);
    const question = fs.readFileSync(exercise.questionPath, 'utf-8');
    console.log(question);
    console.log(`${C.cyan}${'═'.repeat(50)}${C.reset}\n`);

    while (true) {
      console.log(`${C.dim}SQLを入力してください（空行で実行、"back" で問題一覧に戻る）:${C.reset}`);
      console.log(`${C.magenta}sql>${C.reset}`);

      let sql = '';
      while (true) {
        const line = await ask(`${C.magenta}  > ${C.reset}`);
        if (line.trim().toLowerCase() === 'back') {
          sql = 'back';
          break;
        }
        if (line === '' && sql.trim().length > 0) break;
        sql += line + '\n';
      }

      if (sql === 'back') break;

      sql = sql.trim();
      if (!sql) continue;

      try {
        const result = await client.query(sql);

        if (result.rows && result.rows.length > 0) {
          console.log(`\n${C.green}${C.bold}結果:${C.reset}`);
          console.log(formatTable(result.rows));
        } else if (result.command === 'SELECT') {
          console.log(`\n${C.green}結果: 0件${C.reset}\n`);
        } else {
          console.log(`\n${C.green}実行成功: ${result.command} (${result.rowCount} rows affected)${C.reset}\n`);
        }

        // 自動保存
        fs.writeFileSync(exercise.answerPath, sql + '\n', 'utf-8');
        console.log(`${C.dim}answer.sql を更新しました${C.reset}\n`);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        console.log(`\n${C.red}${C.bold}SQLエラー:${C.reset} ${C.red}${message}${C.reset}\n`);
        console.log(`${C.dim}もう一度入力してください。${C.reset}\n`);
      }
    }
  }

  await client.end();
  rl.close();
}

main();
