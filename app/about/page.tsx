import type { Metadata } from 'next';
import Link from 'next/link';
import { NotchNavbar } from '../../src/components/notch-navbar';
import { MarketingFooter } from '../../src/components/marketing-footer';
import { createVideoHref } from '../../src/lib/marketing-links';

export const metadata: Metadata = {
  title: 'About | MotionGuru',
  description:
    'MotionGuru is a generative video studio that turns product ideas into cinema-grade films with AI storyboarding, 3D staging, and sound design.',
};

export default function AboutPage() {
  return (
    <>
      <NotchNavbar createHref={createVideoHref} />

      <div className="donatly-page-wrapper">
        <main className="donatly-canvas about-canvas">
          <section className="about-hero">
            <p className="eyebrow">About MotionGuru</p>
            <h1>Product stories, engineered to move.</h1>
            <p className="about-lede">
              MotionGuru is a generative video studio for teams who care how their product is seen.
              We turn URLs, briefs, and screen recordings into cinematic product films — without the
              timelines, tooling, or guesswork of a traditional production.
            </p>
          </section>

          <section className="about-story">
            <div className="about-story-copy">
              <h2>Every product has a frame worth remembering.</h2>
              <p>
                We built MotionGuru around a simple belief: the story of a product should move as
                fast as the team building it. AI handles the storyboard, staging, voice, and edit;
                you stay in control of the point of view.
              </p>
              <p>
                From the first hook to the final call to action, every scene is designed for
                clarity, rhythm, and conversion — whether it plays on a landing page, a launch
                stage, or a vertical feed.
              </p>
            </div>

            <dl className="about-facts">
              <div>
                <dt>Videos generated</dt>
                <dd>25,000+</dd>
              </div>
              <div>
                <dt>Export formats</dt>
                <dd>4K · 16:9 · 9:16 · 1:1</dd>
              </div>
              <div>
                <dt>Brief to first cut</dt>
                <dd>Minutes</dd>
              </div>
            </dl>
          </section>

          <section className="about-cta">
            <h2>Put your product in motion.</h2>
            <Link href={createVideoHref} className="donatly-btn-donate">
              Get started
            </Link>
          </section>
        </main>

        <MarketingFooter />
      </div>
    </>
  );
}
