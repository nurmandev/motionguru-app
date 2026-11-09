import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const pageSource = readFileSync(
  fileURLToPath(new URL('../app/page.tsx', import.meta.url)),
  'utf8',
);
const navbarSource = readFileSync(
  fileURLToPath(new URL('../src/components/notch-navbar.tsx', import.meta.url)),
  'utf8',
);

test('the landing page keeps only the hero and closing call-to-action sections', () => {
  const sectionIds = [...pageSource.matchAll(/<section id="([^"]+)"/g)].map((match) => match[1]);

  assert.deepEqual(sectionIds, ['hero', 'final-cta']);
});

test('the landing page keeps its navbar and footer', () => {
  assert.match(pageSource, /<NotchNavbar\b/);
  assert.match(pageSource, /<footer className="site-footer/);
  assert.match(pageSource, /The next frame is yours/);
});

test('the hero uses a framed product-film composition instead of the 3D blob', () => {
  const heroMarkup = pageSource.split('<section id="hero"')[1].split('</section>')[0];

  assert.match(heroMarkup, /hero-film-stage/);
  assert.doesNotMatch(heroMarkup, /<HeroVisual className="hero-sculpture"/);
  assert.doesNotMatch(heroMarkup, /<Atmosphere variant="hero"/);
});

test('local page and navbar links target sections that still exist', () => {
  const sectionIds = new Set(
    [...pageSource.matchAll(/<section id="([^"]+)"/g)].map((match) => match[1]),
  );
  const localLinks = [...`${pageSource}\n${navbarSource}`.matchAll(/href="#([^"]+)"/g)];

  assert.ok(localLinks.every((match) => sectionIds.has(match[1])));
});
