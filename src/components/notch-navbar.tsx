'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowUpRight,
  Layers,
  Menu,
  Sparkles,
  X,
  type LucideIcon,
} from 'lucide-react';

type NavItem = { label: string; href: string; icon: LucideIcon };

const startItems: NavItem[] = [{ label: 'Home', href: '#hero', icon: Layers }];

const endItems: NavItem[] = [
  { label: 'The next frame is yours', href: '#final-cta', icon: Sparkles },
];

export function NotchNavbar({ createHref }: { createHref: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const signInHref = `${createHref.replace(/\/register$/, '')}/auth/login`;

  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    const desktop = window.matchMedia('(min-width: 980px)');
    const onBreakpoint = () => {
      if (desktop.matches) setMenuOpen(false);
    };

    window.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onBreakpoint);

    return () => {
      window.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onBreakpoint);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="announcement">
        <span>Introducing a more thoughtful way to create product videos.</span>
        <a href="#final-cta">
          Start your story <ArrowUpRight size={13} aria-hidden="true" />
        </a>
      </div>

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
            <div className="notch-content">
              <nav className="notch-links notch-links-start" aria-label="Primary">
                {startItems.map(({ label, href, icon: Icon }) => (
                  <Link className="notch-link" href={href} key={label}>
                    <Icon size={14} strokeWidth={1.8} aria-hidden="true" />
                    <span>{label}</span>
                  </Link>
                ))}
              </nav>

              <button
                className="notch-toggle"
                type="button"
                aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={menuOpen}
                aria-controls="notch-mobile-menu"
                onClick={() => setMenuOpen((open) => !open)}
              >
                {menuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
              </button>

              <Link className="notch-logo" href="#hero" aria-label="MotionGuru home" onClick={closeMenu}>
                <Image
                  src="/logo.svg"
                  alt="MotionGuru"
                  width={26}
                  height={26}
                  priority
                />
              </Link>

              <div className="notch-end">
                <nav className="notch-links notch-links-end" aria-label="Secondary">
                  {endItems.map(({ label, href, icon: Icon }) => (
                    <Link className="notch-link" href={href} key={label}>
                      <Icon size={14} strokeWidth={1.8} aria-hidden="true" />
                      <span>{label}</span>
                    </Link>
                  ))}
                </nav>
                <div className="notch-auth">
                  <Link className="notch-signin" href={signInHref} onClick={closeMenu}>
                    Sign in
                  </Link>
                  <Link className="notch-cta" href={createHref} onClick={closeMenu}>
                    Get started <ArrowUpRight size={13} aria-hidden="true" />
                  </Link>
                </div>
              </div>

              <Link
                className="notch-quick"
                href={createHref}
                aria-label="Get started"
                onClick={closeMenu}
              >
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="notch-corner notch-corner-end" aria-hidden="true">
            <svg viewBox="0 0 50 64" preserveAspectRatio="none" focusable="false">
              <path d="M0 63.5 C25 63.5 25 39.5 50 39.5" />
              <path d="M0 60.5 C25 60.5 25 36.5 50 36.5" />
            </svg>
          </div>
        </div>

        <div className="notch-rail" aria-hidden="true" />

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="notch-mobile-menu"
              className="notch-menu"
              initial={{ opacity: 0, y: -12, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.985 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <nav aria-label="Mobile navigation">
                {[...startItems, ...endItems].map(({ label, href, icon: Icon }) => (
                  <Link key={label} href={href} onClick={closeMenu}>
                    <Icon size={17} strokeWidth={1.7} aria-hidden="true" />
                    <span>{label}</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                ))}
              </nav>
              <div className="notch-menu-foot">
                <Link className="notch-signin" href={signInHref} onClick={closeMenu}>
                  Sign in
                </Link>
                <Link className="notch-cta" href={createHref} onClick={closeMenu}>
                  Get started <ArrowUpRight size={13} aria-hidden="true" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
