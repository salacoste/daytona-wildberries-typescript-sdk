import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const root = resolve(fileURLToPath(new URL('../../..', import.meta.url)));

async function read(path: string): Promise<string> {
  return (await readFile(resolve(root, path), 'utf8')).trim();
}

function typeScriptBlocks(markdown: string): string[] {
  return [...markdown.matchAll(/```typescript\n([\s\S]*?)\n```/g)].map((match) => match[1]);
}

describe('NodeNext guide fixtures', () => {
  it('keeps the English and Russian snippets identical to the compiled fixtures', async () => {
    const [english, russian, esmFixture, commonJsFixture] = await Promise.all([
      read('docs/guides/nodenext.md'),
      read('docs/ru/guides/nodenext.md'),
      read('tests/fixtures/docs/nodenext/consumer.mts'),
      read('tests/fixtures/docs/nodenext/consumer.cts'),
    ]);

    expect(typeScriptBlocks(english)).toEqual([esmFixture, commonJsFixture]);
    expect(typeScriptBlocks(russian)).toEqual([esmFixture, commonJsFixture]);
  });
});
