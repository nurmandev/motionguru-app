'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import {
  getAdjacentTestimonialIndex,
  getYouTubeEmbedUrl,
  getVisibleTestimonialIndices,
  testimonialStories,
  type TestimonialStory,
} from '@/lib/testimonial-carousel';

const slideVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    transform: `translateX(${direction * 12}px)`,
  }),
  center: {
    opacity: 1,
    transform: 'translateX(0px)',
  },
  exit: (direction: number) => ({
    opacity: 0,
    transform: `translateX(${direction * -12}px)`,
  }),
};

const reducedSlideVariants = {
  enter: { opacity: 0, transform: 'translateX(0px)' },
  center: { opacity: 1, transform: 'translateX(0px)' },
  exit: { opacity: 0, transform: 'translateX(0px)' },
};

function TestimonialCard({ story }: { story: TestimonialStory }) {
  if (story.kind === 'video') {
    return (
      <article className="donatly-test-card donatly-test-video">
        <div className="donatly-test-video-img">
          <VideoTestimonialPlayer story={story} />
        </div>
        <div className="donatly-video-author-pill">
          <div className="donatly-avatar-small">
            <Image src={story.image} alt="" fill sizes="34px" className="donatly-img" />
          </div>
          <div className="donatly-author-meta-mini">
            <strong>{story.author}</strong>
            <span>{story.role}</span>
          </div>
        </div>
      </article>
    );
  }

  const isLight = story.tone === 'light';

  return (
    <article className={`donatly-test-card donatly-test-${story.tone}`}>
      <div className={`donatly-quote-mark${isLight ? ' quote-dark' : ''}`} aria-hidden="true">
        “
      </div>
      <blockquote className={`donatly-test-quote${isLight ? ' quote-text-dark' : ''}`}>
        {story.quote}
      </blockquote>
      <div className="donatly-test-author">
        <div className="donatly-avatar-wrap">
          {story.avatar ? (
            <Image src={story.avatar} alt="" fill sizes="44px" className="donatly-img" />
          ) : (
            <span className="donatly-avatar-placeholder" aria-hidden="true">
              {story.initials}
            </span>
          )}
        </div>
        <div className="donatly-author-meta">
          <strong className={isLight ? 'text-dark' : undefined}>{story.author}</strong>
          <span className={isLight ? 'text-dark-muted' : undefined}>{story.role}</span>
        </div>
      </div>
    </article>
  );
}

function VideoTestimonialPlayer({
  story,
}: {
  story: Extract<TestimonialStory, { kind: 'video' }>;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (isPlaying) iframeRef.current?.focus();
  }, [isPlaying]);

  if (isPlaying) {
    return (
      <iframe
        ref={iframeRef}
        className="donatly-test-video-iframe"
        src={getYouTubeEmbedUrl(story.youtubeUrl)}
        title={`${story.author} testimonial video`}
        tabIndex={0}
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    );
  }

  return (
    <>
      <Image
        src={story.image}
        alt={`${story.author} testimonial video preview`}
        fill
        sizes="(max-width: 1024px) 100vw, 33vw"
        className="donatly-img"
      />
      <button
        type="button"
        className="donatly-video-center-btn"
        aria-label={`Play testimonial video from ${story.author}`}
        onClick={() => setIsPlaying(true)}
      >
        <span className="donatly-video-triangle" aria-hidden="true">
          ▶
        </span>
      </button>
    </>
  );
}

export function TestimonialsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<-1 | 1>(1);
  const reducedMotion = useReducedMotion();
  const visibleIndices = getVisibleTestimonialIndices(
    activeIndex,
    testimonialStories.length,
    3,
  );

  function showStory(index: number, nextDirection: -1 | 1) {
    setDirection(nextDirection);
    setActiveIndex(index);
  }

  function move(direction: -1 | 1) {
    setDirection(direction);
    setActiveIndex((index) =>
      getAdjacentTestimonialIndex(index, direction, testimonialStories.length),
    );
  }

  return (
    <section className="donatly-testimonials-card" id="showcase">
      <div className="donatly-testimonials-header">
        <h2 className="donatly-sec-title">For Founders &amp; Product Designers</h2>
        <div className="donatly-nav-arrows" role="group" aria-label="Testimonial controls">
          <button
            type="button"
            className="donatly-arrow-btn"
            aria-label="Previous testimonials"
            onClick={() => move(-1)}
          >
            ‹
          </button>
          <button
            type="button"
            className="donatly-arrow-btn active"
            aria-label="Next testimonials"
            onClick={() => move(1)}
          >
            ›
          </button>
        </div>
      </div>

      <div className="donatly-testimonials-row" aria-live="polite">
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          {visibleIndices.map((storyIndex) => {
            const story = testimonialStories[storyIndex];

            return (
              <motion.div
                key={story.id}
                className="donatly-testimonial-slide"
                layout={reducedMotion ? false : 'position'}
                custom={direction}
                variants={reducedMotion ? reducedSlideVariants : slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: reducedMotion ? 0.15 : 0.22,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                <TestimonialCard story={story} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="donatly-testimonial-pagination">
        <div role="group" aria-label="Choose a testimonial page" className="donatly-testimonial-dots">
          {testimonialStories.map((story, index) => (
            <button
              key={story.id}
              type="button"
              className="donatly-testimonial-dot"
              aria-label={`Show testimonials starting with ${story.author}`}
              aria-pressed={activeIndex === index}
              onClick={() => showStory(index, index >= activeIndex ? 1 : -1)}
            >
              <span aria-hidden="true" />
            </button>
          ))}
        </div>
        <p className="donatly-testimonial-count">
          {activeIndex + 1} <span aria-hidden="true">/</span> {testimonialStories.length}
        </p>
      </div>
    </section>
  );
}
