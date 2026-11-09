'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createVideoHref, getHomeSectionHref } from '@/lib/marketing-links';

export function MarketingFooter() {
  const pathname = usePathname();

  return (
    <footer className="motionguru-monumental-footer">
      <div className="motionguru-footer-nav-tier">
        <div className="motionguru-footer-brand-summary">
          <div className="donatly-footer-logo-row">
            <Image src="/logo.svg" alt="MotionGuru" width={32} height={32} />
            <span className="motionguru-footer-brand-title">MotionGuru</span>
          </div>
          <p className="donatly-footer-tagline">
            Cinema-grade 3D product introduction videos, powered by generative AI motion physics
            and real-time Remotion rendering.
          </p>
        </div>

        <div className="motionguru-footer-cols-wrap">
          <div className="motionguru-col">
            <span className="motionguru-col-heading">Product Studio</span>
            <Link href={createVideoHref}>AI Storyboarding</Link>
            <Link href={getHomeSectionHref(pathname, 'templates')}>3D Device Staging</Link>
            <Link href={getHomeSectionHref(pathname, 'templates')}>Kinetic Typography</Link>
            <Link href={getHomeSectionHref(pathname, 'templates')}>Voiceover Engine</Link>
            <Link href={createVideoHref}>Multi-Aspect 4K Export</Link>
          </div>

          <div className="motionguru-col">
            <span className="motionguru-col-heading">Templates</span>
            <Link href={getHomeSectionHref(pathname, 'templates')}>SaaS Feature Spotlight</Link>
            <Link href={getHomeSectionHref(pathname, 'templates')}>Mobile App Showcase</Link>
            <Link href={getHomeSectionHref(pathname, 'templates')}>Dark Tech Teaser</Link>
            <Link href={getHomeSectionHref(pathname, 'templates')}>Hardware 3D Orbit</Link>
            <Link href={getHomeSectionHref(pathname, 'templates')}>Minimalist Typography</Link>
          </div>

          <div className="motionguru-col">
            <span className="motionguru-col-heading">Resources</span>
            <Link href={createVideoHref}>Get Started Free</Link>
            <Link href={getHomeSectionHref(pathname, 'showcase')}>Customer Stories</Link>
            <Link href={getHomeSectionHref(pathname, 'pricing')}>Pricing Plans</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>

      <div className="motionguru-monolithic-type-wrap" aria-hidden="true">
        <span className="motionguru-monolithic-text">MOTIONGURU</span>
      </div>

      <div className="motionguru-bottom-bar">
        <div className="motionguru-bottom-left">
          <span>© 2026 MotionGuru, Inc. All rights reserved.</span>
        </div>
        <div className="motionguru-bottom-right">
          <Link href={getHomeSectionHref(pathname, 'top')} className="motionguru-back-to-top">
            <span>Back to Top</span>
            <span className="motionguru-arrow-up" aria-hidden="true">
              ↑
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
