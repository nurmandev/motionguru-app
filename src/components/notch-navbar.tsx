import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, UserRound } from 'lucide-react';

export function NotchNavbar({ createHref }: { createHref: string }) {
  return (
    <header className="notch-nav">
      <div className="notch-rail" aria-hidden="true" />
      <div className="notch-tab">
        <div className="notch-corner notch-corner-start" aria-hidden="true">
          <svg viewBox="0 0 50 64" preserveAspectRatio="none" focusable="false">
            <path d="M0 39.5 C25 39.5 25 63.5 50 63.5" />
            <path d="M0 36.5 C25 36.5 25 60.5 50 60.5" />
          </svg>
        </div>

        <div className="notch-body">
          <nav className="notch-content" aria-label="Main navigation">
            <Link className="notch-link notch-about-link" href="/about">
              <UserRound size={15} strokeWidth={1.8} aria-hidden="true" />
              About
            </Link>
            <Link className="notch-logo" href="/#top" aria-label="MotionGuru home">
              <Image src="/logo.svg" alt="" width={26} height={26} priority unoptimized />
              <span className="notch-brand-name">MotionGuru</span>
            </Link>
            <Link className="notch-cta" href={createHref}>
              Get Started
              <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" />
            </Link>
          </nav>
        </div>

        <div className="notch-corner notch-corner-end" aria-hidden="true">
          <svg viewBox="0 0 50 64" preserveAspectRatio="none" focusable="false">
            <path d="M0 63.5 C25 63.5 25 39.5 50 39.5" />
            <path d="M0 60.5 C25 60.5 25 36.5 50 36.5" />
          </svg>
        </div>
      </div>
      <div className="notch-rail" aria-hidden="true" />
    </header>
  );
}
