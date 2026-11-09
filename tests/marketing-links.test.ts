import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const linksPath = fileURLToPath(new URL('../src/lib/marketing-links.ts', import.meta.url));

test('homepage section links remain local on home and route back from other pages', async () => {
  assert.ok(existsSync(linksPath), 'shared marketing links module should exist');
  const { getHomeSectionHref } = await import('../src/lib/marketing-links.ts');

  assert.equal(getHomeSectionHref('/', 'features'), '#features');
  assert.equal(getHomeSectionHref('/privacy', 'features'), '/#features');
  assert.equal(getHomeSectionHref('/terms', 'pricing'), '/#pricing');
  assert.equal(getHomeSectionHref('/route-that-does-not-exist', 'top'), '/#top');
});
