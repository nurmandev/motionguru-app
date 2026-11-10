import Image from 'next/image';
import Link from 'next/link';
import { PageMotion } from '../src/components/page-motion';
import { MarketingFooter } from '../src/components/marketing-footer';
import { FolderPreview } from '../src/components/folder-preview';
import { GenerateButton } from '../src/components/generate-button';
import { NotchNavbar } from '../src/components/notch-navbar';
import { TestimonialsCarousel } from '../src/components/testimonials-carousel';
import { createVideoHref } from '../src/lib/marketing-links';
import { getYouTubeEmbedUrl } from '../src/lib/testimonial-carousel';

export default function HomePage() {
  return (
    <>
      <NotchNavbar createHref={createVideoHref} />

      <div className="donatly-page-wrapper" id="top">
        {/* Hero Canvas Container */}
      <div className="donatly-canvas">
        {/* Subtle grid texture overlay in background */}
        <div className="donatly-grid-bg" aria-hidden="true">
          <div className="donatly-pixel-pattern" />
        </div>

        {/* Hero Section */}
        <main className="donatly-hero">
          {/* Centered Headline & Copy */}
          <div className="donatly-hero-center">
            <h1 className="donatly-headline" data-motion="hero-headline">
              Turn Ideas Into<br />
              Cinema-Grade Videos
            </h1>

            <p className="donatly-subheadline" data-motion="hero-copy">
              MotionGuru converts your URLs, mockups, and descriptions into high-converting 3D product films.<br className="hide-mobile" />
              AI storyboarding, automatic voiceovers, and studio motion physics. No editing required.
            </p>

            <div className="donatly-actions" data-motion="hero-actions">
              <GenerateButton href={createVideoHref} aria-label="Get started" />
            </div>
          </div>

          {/* 3-Column Card Layout matching the layout structure */}
          <div className="donatly-cards-row" data-motion="hero-visual">
            {/* LEFT COLUMN: 2 Stacked Cards */}
            <div className="donatly-left-col">
              {/* Top Card: Hari Folder Preview */}
              <div className="donatly-card donatly-card-folder">
                <FolderPreview
                  variant="hari"
                  size="lg"
                  label="3D Motion Engine"
                  className="donatly-folder-preview-card"
                />
              </div>

              {/* Bottom Card: Stat metric */}
              <div className="donatly-card donatly-card-stat">
                <h3>25,000+</h3>
                <p>Videos Generated</p>
              </div>
            </div>

            {/* CENTER COLUMN: Stepped-Arch AI Film Timeline */}
            <div className="donatly-center-col">
              <div className="donatly-arch-card">
                <iframe
                  className="donatly-hero-video"
                  src={getYouTubeEmbedUrl(
                    'https://youtu.be/pZv7me6dFns?si=eflcP4GpHgwEHCFR',
                    { muted: true, loop: true },
                  )}
                  title="MotionGuru product video"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            </div>

            {/* RIGHT COLUMN: Stepped-top card with Motion Craft and CTA */}
            <div className="donatly-right-col">
              <div className="donatly-card donatly-card-hands">
                <div className="donatly-card-bg-chevron right-chevron" aria-hidden="true">
                  <svg viewBox="0 0 160 120" preserveAspectRatio="none">
                    <polyline points="0,45 50,15 100,50 160,10" fill="none" stroke="#254d3e" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                    <polyline points="0,75 50,45 100,80 160,40" fill="none" stroke="#254d3e" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="donatly-hands-img-wrap">
                  <Image
                    src="/hero/motion-craft.jpg"
                    alt="Kinetic typography and motion graphics"
                    fill
                    className="donatly-img"
                    sizes="(max-width: 768px) 100vw, 340px"
                    priority
                  />
                </div>

                <div className="donatly-card-hands-content">
                  <h3>Paste Product URL,<br />Export in 4K</h3>
                  <Link href={createVideoHref} className="donatly-btn-explore" style={{ textDecoration: 'none' }}>
                    Start Creating Free
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* SECTION 2: White Rounded Card: "Turn Product Specs Into Motion Power" */}
      <section className="donatly-section-white" id="templates">
        <div className="donatly-section-header-split">
          <h2 className="donatly-sec-title">
            Product Specs to Studio-Quality Motion
          </h2>
          <div className="donatly-sec-header-right">
            <p className="donatly-sec-desc">
              Turn a URL or product brief into a studio-quality launch video in minutes, not weeks.
            </p>
            <Link href="#templates" className="donatly-btn-pill-lime">
              Explore Templates
            </Link>
          </div>
        </div>

        <div className="donatly-three-cards-grid">
          {/* Card 1 */}
          <div className="donatly-soft-card">
            <div className="donatly-soft-card-icon donatly-icon-lime">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <h3>AI Script &amp; Hook Synthesis</h3>
            <p>
              Paste your landing page URL or release notes. Our LLM pipeline crafts a high-retention narrative with hook, problem, feature reveals, and call-to-action.
            </p>
          </div>

          {/* Card 2 */}
          <div className="donatly-soft-card">
            <div className="donatly-soft-card-icon donatly-icon-green">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z" />
                <path d="m14 7 3 3" />
                <path d="M5 6v4" /><path d="M19 14v4" /><path d="M10 2v2" /><path d="M7 8H3" /><path d="M21 16h-4" /><path d="M11 3H9" />
              </svg>
            </div>
            <h3>Dynamic 3D Device Staging</h3>
            <p>
              Stage your UI across iPhones, MacBooks, tablets, and glass displays with physics-driven camera sweeps, realistic reflections, and depth of field.
            </p>
          </div>

          {/* Card 3 */}
          <div className="donatly-soft-card">
            <div className="donatly-soft-card-icon donatly-icon-teal">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <h3>Studio Voiceover &amp; Beat Sync</h3>
            <p>
              Ultra-realistic ElevenLabs neural narration auto-synced to beat-matched synthwave and cinematic soundtracks with micro-haptic sound effects.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: Lime Metric Banner Card: "Powering High-Converting Launches" */}
      <section className="donatly-metric-banner">
        <div className="donatly-metric-content">
          <h2 className="donatly-metric-title">
            Launch Videos That Convert
          </h2>
          <p className="donatly-metric-sub">
            From indie SaaS founders to hyper-growth tech teams, MotionGuru delivers product launch trailers that 3x click-through rates.
          </p>

          <div className="donatly-metric-number">
            1,420,000+
          </div>

          <div className="donatly-metric-cta-wrap">
            <Link href={createVideoHref} className="donatly-btn-metric">
              Start Generating Free →
            </Link>
            <span className="donatly-metric-note">
              Seconds of cinema-grade product video rendered with Remotion
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 4: Dark Dashboard Ink Card: 4 Features Grid */}
      <section className="donatly-features-grid-card" id="features">
        <div className="donatly-features-header">
          <h2 className="donatly-sec-title">
            Engineered For Frictionless Video Production
          </h2>
          <p className="donatly-features-sub">
            Everything you need to go from an idea or URL to an agency-grade 4K product trailer without opening a video editor.
          </p>
        </div>

        <div className="donatly-four-features-grid">
          {/* Feature 1 */}
          <div className="donatly-feature-box">
            <div className="donatly-feat-icon-check">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h4>Instant Storyboard Assembly</h4>
            <p>Our LLM synthesizes your product into 5 hook-driven beats: the problem hook, the hero feature reveal, workflow walkthrough, and the CTA.</p>
            <Link href="#templates" className="donatly-feat-more">Explore Storyboarding...</Link>
          </div>

          {/* Feature 2 */}
          <div className="donatly-feature-box">
            <div className="donatly-feat-icon-check">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h4>Remotion Real-Time Preview</h4>
            <p>Scrub frame-by-frame with zero lag using our embedded Remotion canvas player. Tweak easing curves and typography on the fly.</p>
            <Link href="#templates" className="donatly-feat-more">Explore Remotion Canvas...</Link>
          </div>

          {/* Feature 3 */}
          <div className="donatly-feature-box">
            <div className="donatly-feat-icon-check">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h4>Kinetic Typography &amp; 3D Glass</h4>
            <p>Every scene incorporates fluid spring physics, ray-traced glass mockups, chromatic aberration, and synchronized audio transitions.</p>
            <Link href="#templates" className="donatly-feat-more">Explore Motion Physics...</Link>
          </div>

          {/* Feature 4 */}
          <div className="donatly-feature-box">
            <div className="donatly-feat-icon-check">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h4>Multi-Aspect 4K Cloud Exports</h4>
            <p>Render simultaneously in 16:9 for YouTube &amp; Product Hunt, 9:16 for TikTok &amp; Instagram Reels, and 1:1 for hero sections in one click.</p>
            <Link href="#templates" className="donatly-feat-more">Explore Multi-Aspect...</Link>
          </div>
        </div>

        <div className="donatly-features-btn-wrap">
          <Link href={createVideoHref} className="donatly-btn-explore-all">
            Explore All Capabilities
          </Link>
        </div>
      </section>

      <TestimonialsCarousel />

      {/* SECTION 6: Standalone White Centered CTA Card */}
      <section className="motionguru-cta-card">
        <div className="motionguru-cta-center">
          <span className="motionguru-cta-eyebrow">Ready To Launch?</span>
          <h2 className="motionguru-cta-headline">
            Create Your Next Product Story in Minutes.
          </h2>
          <p className="motionguru-cta-sub">
            No timelines. No rendering farms. Just high-converting 3D video previews crafted by AI.
          </p>

          <div className="motionguru-cta-action-wrap">
            <Link href={createVideoHref} className="motionguru-btn-cta-white-card" data-magnetic>
              <span>Create Your First Video</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <MarketingFooter />

      <PageMotion />
      </div>
    </>
  );
}
