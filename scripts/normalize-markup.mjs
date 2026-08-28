import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { extname, resolve } from 'node:path';
import { format } from 'prettier';
import xmlPlugin from '@prettier/plugin-xml';

const MARKUP_EXTENSIONS = new Set(['.html', '.xml', '.svg']);
const roots = process.argv.slice(2);

if (roots.length === 0) {
  throw new Error('Pass at least one directory to normalize.');
}

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const path = resolve(directory, entry.name);
      if (entry.isDirectory()) return collectFiles(path);
      return MARKUP_EXTENSIONS.has(extname(entry.name)) ? [path] : [];
    }),
  );
  return files.flat();
}

async function normalize(file) {
  const extension = extname(file);
  const source = (await readFile(file, 'utf8')).replace(/\r\n?/g, '\n');
  const formatted = await format(source, {
    parser: extension === '.html' ? 'html' : 'xml',
    plugins: extension === '.html' ? [] : [xmlPlugin],
    printWidth: 100,
    tabWidth: 2,
    useTabs: false,
    endOfLine: 'lf',
    htmlWhitespaceSensitivity: 'css',
    xmlWhitespaceSensitivity: 'strict',
    singleAttributePerLine: false,
  });

  const normalized = `${formatted.trimEnd()}\n`;
  if (normalized === source) return false;
  await writeFile(file, normalized, 'utf8');
  return true;
}

let documentCount = 0;
let changedCount = 0;
for (const root of roots) {
  const directory = resolve(root);
  if (!(await stat(directory)).isDirectory()) throw new Error(`${directory} is not a directory.`);
  const files = (await collectFiles(directory)).sort();
  const results = await Promise.all(files.map(normalize));
  documentCount += files.length;
  changedCount += results.filter(Boolean).length;
}

console.log(`Normalized ${documentCount} HTML/XML documents (${changedCount} changed).`);
