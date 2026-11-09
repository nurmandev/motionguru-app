import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { capabilities, processSteps, storyDirections } from '../src/lib/content.ts';

const privacyPageSource = readFileSync(
  fileURLToPath(new URL('../app/privacy/page.tsx', import.meta.url)),
  'utf8',
);
const termsPageSource = readFileSync(
  fileURLToPath(new URL('../app/terms/page.tsx', import.meta.url)),
  'utf8',
);
const notFoundPageSource = readFileSync(
  fileURLToPath(new URL('../app/not-found.tsx', import.meta.url)),
  'utf8',
);
const homePageSource = readFileSync(
  fileURLToPath(new URL('../app/page.tsx', import.meta.url)),
  'utf8',
);

test('marketing content defines three capabilities, process steps, and story directions', () => {
  assert.equal(processSteps.length, 3);
  assert.equal(capabilities.length, 3);
  assert.equal(storyDirections.length, 3);
});

test('the workflow moves from input to direction to output', () => {
  assert.deepEqual(
    processSteps.map((step) => step.id),
    ['input', 'direction', 'output'],
  );
});

test('every story direction is labelled as concept work', () => {
  assert.ok(storyDirections.every((story) => story.category.length > 0));
  assert.ok(storyDirections.every((story) => story.note.length > 0));
});

test('the privacy policy has a concise introduction and linked section navigation', () => {
  const sectionIds = [
    'information',
    'use',
    'providers',
    'choices',
    'retention',
  ];

  assert.match(privacyPageSource, /How MotionGuru handles information/);
  assert.match(privacyPageSource, /<nav className="privacy-toc" aria-label="On this page">/);
  assert.match(privacyPageSource, /href=\{`#\$\{section\.id\}`\}/);
  for (const sectionId of sectionIds) {
    assert.match(privacyPageSource, new RegExp(`id="${sectionId}"`));
  }
});

test('the privacy policy does not expose bracketed placeholders or repetitive draft caveats', () => {
  assert.doesNotMatch(
    privacyPageSource,
    /\[(?:Privacy|Company|Confirm|Applicable|Insert|Security|Regions)[^\]]*\]/i,
  );
  assert.doesNotMatch(privacyPageSource, /Draft, not a final privacy notice/);
  assert.match(privacyPageSource, /privacy-review-status/);
});

test('the terms page uses linked section navigation and keeps legal review status explicit', () => {
  const sectionIds = [
    'accounts',
    'service',
    'content',
    'acceptable-use',
    'ownership',
    'third-parties',
    'ending-access',
    'changes',
  ];

  assert.match(termsPageSource, /<nav className="privacy-toc" aria-label="On this page">/);
  assert.match(termsPageSource, /href=\{`#\$\{section\.id\}`\}/);
  for (const sectionId of sectionIds) {
    assert.match(termsPageSource, new RegExp(`id="${sectionId}"`));
  }
  assert.doesNotMatch(
    termsPageSource,
    /\[(?:insert|Jurisdiction|Contact|Company)[^\]]*\]/i,
  );
  assert.match(termsPageSource, /terms-review-status/);
});

test('the 404 home action uses Next navigation', () => {
  assert.match(notFoundPageSource, /import Link from 'next\/link';/);
  assert.match(notFoundPageSource, /<Link className="button button-dark not-found-home" href="\/">/);
  assert.match(notFoundPageSource, /Back to home/);
});

test('the founder testimonial section renders its carousel component', () => {
  assert.match(
    homePageSource,
    /import \{ TestimonialsCarousel \} from '\.\.\/src\/components\/testimonials-carousel';/,
  );
  assert.match(homePageSource, /<TestimonialsCarousel\s*\/>/);
});

test('every page uses the shared homepage navbar and footer', () => {
  for (const [route, source] of [
    ['home', homePageSource],
    ['privacy', privacyPageSource],
    ['terms', termsPageSource],
    ['not-found', notFoundPageSource],
  ]) {
    assert.match(source, /<MarketingHeader\s*\/>/, `${route} should render the shared navbar`);
    assert.match(source, /<MarketingFooter\s*\/>/, `${route} should render the shared footer`);
  }
});

test('legal pages no longer render their own separate navigation', () => {
  assert.doesNotMatch(privacyPageSource, /className="legal-nav"/);
  assert.doesNotMatch(termsPageSource, /className="legal-nav"/);
});
