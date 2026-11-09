export type TestimonialStory =
  | {
      id: string;
      kind: 'quote';
      tone: 'dark' | 'light';
      quote: string;
      author: string;
      role: string;
      avatar: string | null;
      initials?: string;
    }
  | {
      id: string;
      kind: 'video';
      author: string;
      role: string;
      image: string;
      youtubeUrl: string;
    };

export const testimonialStories: TestimonialStory[] = [
  {
    id: 'amina-marcel',
    kind: 'quote',
    tone: 'dark',
    quote:
      'Creating our product reveal video used to cost us $6,000 and two weeks with video freelancers. With MotionGuru, we pasted our Stripe URL and exported a breathtaking 4K trailer in under 3 minutes.',
    author: 'Amina Marcel',
    role: 'Head of Growth, Kroma SaaS',
    avatar: '/hero/avatar-1.jpg',
  },
  {
    id: 'jhonatan-perez',
    kind: 'video',
    author: 'Jhonatan Perez',
    role: 'Founder, ApexFlow AI',
    image: '/hero/testimonial-video.jpg',
    youtubeUrl: 'https://youtu.be/SgmuplXU2iY?si=c9AbtOeAPMwKdzQh',
  },
  {
    id: 'david-rodrigo',
    kind: 'quote',
    tone: 'light',
    quote:
      'The 3D device staging and typographic pacing feel like an Apple keynote. Our conversion rate increased by 42% after embedding the MotionGuru trailer on our hero.',
    author: 'David Rodrigo',
    role: 'Design Lead, Nextwave Hardware',
    avatar: '/hero/avatar-2.jpg',
  },
  {
    id: 'sample-review',
    kind: 'quote',
    tone: 'dark',
    quote:
      'Sample testimonial copy. Replace this card with an approved customer review before publishing.',
    author: 'Sample review',
    role: 'Placeholder content · Replace before publishing',
    avatar: null,
    initials: 'S',
  },
];

export function getYouTubeEmbedUrl(
  videoUrl: string,
  options: { muted?: boolean; loop?: boolean } = {},
) {
  const parsedUrl = new URL(videoUrl);
  const allowedHosts = new Set([
    'youtu.be',
    'www.youtu.be',
    'youtube.com',
    'www.youtube.com',
    'm.youtube.com',
  ]);

  if (
    parsedUrl.protocol !== 'https:' ||
    !allowedHosts.has(parsedUrl.hostname) ||
    parsedUrl.port ||
    parsedUrl.username ||
    parsedUrl.password
  ) {
    throw new TypeError('Expected an HTTPS YouTube video URL.');
  }

  const pathSegments = parsedUrl.pathname.split('/').filter(Boolean);
  const videoId = parsedUrl.hostname.endsWith('youtu.be')
    ? pathSegments.length === 1
      ? pathSegments[0]
      : undefined
    : parsedUrl.pathname === '/watch'
      ? parsedUrl.searchParams.get('v')
      : parsedUrl.pathname.match(/^\/(?:embed|shorts)\/([^/]+)$/)?.[1];

  if (!videoId || !/^[A-Za-z0-9_-]{11}$/.test(videoId)) {
    throw new TypeError('YouTube video URL must contain a valid video ID.');
  }

  const embedUrl = new URL(`https://www.youtube-nocookie.com/embed/${videoId}`);
  embedUrl.searchParams.set('autoplay', '1');
  embedUrl.searchParams.set('rel', '0');
  if (options.muted) embedUrl.searchParams.set('mute', '1');
  if (options.loop) {
    embedUrl.searchParams.set('loop', '1');
    embedUrl.searchParams.set('playlist', videoId);
  }
  return embedUrl.toString();
}

export function getAdjacentTestimonialIndex(
  currentIndex: number,
  direction: -1 | 1,
  total: number,
) {
  if (total <= 0) return 0;
  const normalizedIndex = ((currentIndex % total) + total) % total;
  return (normalizedIndex + direction + total) % total;
}

export function getVisibleTestimonialIndices(
  startIndex: number,
  total: number,
  visibleCount: number,
) {
  if (total <= 0 || visibleCount <= 0) return [];
  const normalizedIndex = ((startIndex % total) + total) % total;
  const count = Math.min(visibleCount, total);
  return Array.from({ length: count }, (_, offset) => (normalizedIndex + offset) % total);
}
