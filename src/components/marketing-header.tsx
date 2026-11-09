'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createVideoHref, getHomeSectionHref } from '@/lib/marketing-links';

export function MarketingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="motionguru-standalone-navbar">
        <div className="motionguru-navbar-inner">
          <Link href="/" className="donatly-brand">
            <span className="donatly-logo-mark" aria-hidden="true">
              <Image src="/logo.svg" alt="MotionGuru" width={28} height={28} />
            </span>
            <span className="donatly-brand-name">MotionGuru</span>
          </Link>

          <div className="donatly-nav-actions desktop-only">
            <Link href={createVideoHref} className="donatly-btn-get-started" data-magnetic>
              Create Video Free
            </Link>
          </div>

          <button
            type="button"
            className="motionguru-hamburger-btn mobile-only"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="motionguru-mobile-navigation"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className={`motionguru-burger-bar ${mobileMenuOpen ? 'bar-open-top' : ''}`} />
            <span className={`motionguru-burger-bar ${mobileMenuOpen ? 'bar-open-mid' : ''}`} />
            <span className={`motionguru-burger-bar ${mobileMenuOpen ? 'bar-open-bot' : ''}`} />
          </button>
        </div>
      </header>

      <div
        className={`motionguru-sidebar-backdrop ${mobileMenuOpen ? 'active' : ''}`}
        aria-hidden="true"
        onClick={() => setMobileMenuOpen(false)}
      />

      <aside
        id="motionguru-mobile-navigation"
        className={`motionguru-sidebar-drawer ${mobileMenuOpen ? 'open' : ''}`}
        aria-label="Mobile Navigation"
        aria-hidden={!mobileMenuOpen}
        inert={!mobileMenuOpen}
      >
        <div className="motionguru-sidebar-top">
          <Link className="donatly-brand" href="/" onClick={() => setMobileMenuOpen(false)}>
            <Image src="/logo.svg" alt="MotionGuru" width={26} height={26} />
            <span className="donatly-brand-name">MotionGuru</span>
          </Link>
          <button
            type="button"
            className="motionguru-sidebar-close"
            aria-label="Close menu"
            onClick={() => setMobileMenuOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav className="motionguru-sidebar-links" aria-label="Homepage sections">
          <Link href={getHomeSectionHref(pathname, 'templates')} onClick={() => setMobileMenuOpen(false)}>
            Video Templates
          </Link>
          <Link href={getHomeSectionHref(pathname, 'features')} onClick={() => setMobileMenuOpen(false)}>
            Studio Features
          </Link>
          <Link href={getHomeSectionHref(pathname, 'showcase')} onClick={() => setMobileMenuOpen(false)}>
            Showcase Stories
          </Link>
          <Link href={getHomeSectionHref(pathname, 'pricing')} onClick={() => setMobileMenuOpen(false)}>
            Pricing &amp; Plans
          </Link>
        </nav>

        <div className="motionguru-sidebar-footer">
          <Link
            href={createVideoHref}
            className="motionguru-sidebar-btn-cta"
            onClick={() => setMobileMenuOpen(false)}
          >
            Create Video Free
          </Link>
        </div>
      </aside>
    </>
  );
}
