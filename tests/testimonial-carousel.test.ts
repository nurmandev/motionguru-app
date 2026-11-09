import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const carouselDataPath = fileURLToPath(
  new URL('../src/lib/testimonial-carousel.ts', import.meta.url),
);
const carouselDataSource = readFileSync(carouselDataPath, 'utf8');

test('testimonial pagination wraps forward and backward across all reviews', async () => {
  assert.ok(existsSync(carouselDataPath), 'testimonial carousel data module should exist');
  const { getAdjacentTestimonialIndex } = await import('../src/lib/testimonial-carousel.ts');

  assert.equal(getAdjacentTestimonialIndex(0, -1, 3), 2);
  assert.equal(getAdjacentTestimonialIndex(2, 1, 3), 0);
  assert.equal(getAdjacentTestimonialIndex(1, 1, 3), 2);
});

test('the 42 percent conversion review is the third paginated testimonial', async () => {
  assert.ok(existsSync(carouselDataPath), 'testimonial carousel data module should exist');
  const { testimonialStories } = await import('../src/lib/testimonial-carousel.ts');

  assert.equal(testimonialStories.length, 4);
  const thirdStory = testimonialStories[2];
  assert.equal(thirdStory?.kind, 'quote');
  if (thirdStory?.kind === 'quote') {
    assert.match(thirdStory.quote, /conversion rate increased by 42%/);
    assert.equal(thirdStory.author, 'David Rodrigo');
  }
});

test('pagination shows three cards by default and shifts one card per step', async () => {
  assert.ok(existsSync(carouselDataPath), 'testimonial carousel data module should exist');
  assert.match(carouselDataSource, /export function getVisibleTestimonialIndices/);
  const { getVisibleTestimonialIndices, testimonialStories } = await import(
    '../src/lib/testimonial-carousel.ts'
  );

  assert.deepEqual(getVisibleTestimonialIndices(0, testimonialStories.length, 3), [0, 1, 2]);
  assert.deepEqual(getVisibleTestimonialIndices(1, testimonialStories.length, 3), [1, 2, 3]);
  assert.deepEqual(getVisibleTestimonialIndices(3, testimonialStories.length, 3), [3, 0, 1]);
});

test('the additional card is identified as placeholder copy rather than a real customer review', async () => {
  assert.ok(existsSync(carouselDataPath), 'testimonial carousel data module should exist');
  const { testimonialStories } = await import('../src/lib/testimonial-carousel.ts');
  assert.equal(testimonialStories.length, 4);

  const sampleStory = testimonialStories[3];
  assert.ok(sampleStory);
  assert.equal(sampleStory.author, 'Sample review');
  assert.match(sampleStory.role, /placeholder/i);
});

test('Jhonatan’s play card points to his YouTube video and builds an autoplay embed URL', async () => {
  const { getYouTubeEmbedUrl, testimonialStories } = await import(
    '../src/lib/testimonial-carousel.ts'
  );
  const videoStory = testimonialStories.find((story) => story.id === 'jhonatan-perez');

  assert.ok(videoStory);
  assert.equal(videoStory.kind, 'video');
  if (videoStory.kind === 'video') {
    assert.equal(videoStory.youtubeUrl, 'https://youtu.be/SgmuplXU2iY?si=c9AbtOeAPMwKdzQh');
  }
  assert.equal(
    getYouTubeEmbedUrl('https://youtu.be/SgmuplXU2iY?si=c9AbtOeAPMwKdzQh'),
    'https://www.youtube-nocookie.com/embed/SgmuplXU2iY?autoplay=1&rel=0',
  );
});

test('YouTube embed URL builder rejects URLs that do not point to a recognized YouTube video', async () => {
  const { getYouTubeEmbedUrl } = await import('../src/lib/testimonial-carousel.ts');

  assert.equal(typeof getYouTubeEmbedUrl, 'function');
  assert.throws(() => getYouTubeEmbedUrl('https://example.com/watch?v=SgmuplXU2iY'), {
    name: 'TypeError',
  });
  assert.throws(() => getYouTubeEmbedUrl('https://youtu.be/not-a-valid-id'), {
    name: 'TypeError',
  });
  assert.throws(() => getYouTubeEmbedUrl('https://youtu.be/SgmuplXU2iY/extra'), {
    name: 'TypeError',
  });
  assert.throws(() => getYouTubeEmbedUrl('https://viewer@youtu.be/SgmuplXU2iY'), {
    name: 'TypeError',
  });
  assert.throws(() => getYouTubeEmbedUrl('https://youtu.be:444/SgmuplXU2iY'), {
    name: 'TypeError',
  });
});

test('hero YouTube embed is configured to autoplay muted and loop', async () => {
  const { getYouTubeEmbedUrl } = await import('../src/lib/testimonial-carousel.ts');

  assert.equal(
    getYouTubeEmbedUrl('https://youtu.be/pZv7me6dFns?si=eflcP4GpHgwEHCFR', {
      muted: true,
      loop: true,
    }),
    'https://www.youtube-nocookie.com/embed/pZv7me6dFns?autoplay=1&rel=0&mute=1&loop=1&playlist=pZv7me6dFns',
  );
});
