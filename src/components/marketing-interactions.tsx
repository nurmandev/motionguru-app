'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Maximize,
  Pause,
  Play,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { faqItems, workflowStages } from '../lib/content';

type SiteHeaderProps = { createHref: string };

export function SiteHeader({ createHref }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const signInHref = `${createHref.replace(/\/register$/, '')}/auth/login`;

  return (
    <>
      <div className="announcement">
        <span>Introducing a more thoughtful way to create product videos.</span>
        <a href="#features">Meet the workflow <ArrowUpRight size={13} aria-hidden="true" /></a>
      </div>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <Link href="#hero" className="brand-link" aria-label="MotionGuru home" onClick={closeMenu}>
          <Image src="/brand/motionguru-horizontal.svg" alt="MotionGuru" width={154} height={30} priority />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#features">Product</a>
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
          <a href="#pricing">Pricing</a>
        </nav>
        <div className="nav-actions">
          <Link className="nav-signin" href={signInHref}>Sign in</Link>
          <Link className="button button-nav" href={createHref}>Get started <ArrowUpRight size={15} aria-hidden="true" /></Link>
        </div>
        <button
          className="mobile-menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span /><span />
        </button>
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              id="mobile-navigation"
              className="mobile-nav"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              <a href="#features" onClick={closeMenu}>Product</a>
              <a href="#features" onClick={closeMenu}>Features</a>
              <a href="#how-it-works" onClick={closeMenu}>How it works</a>
              <a href="#pricing" onClick={closeMenu}>Pricing</a>
              <Link href={signInHref} onClick={closeMenu}>Sign in</Link>
              <Link className="button button-dark" href={createHref} onClick={closeMenu}>
                Get started <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

export function IntroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [infoOpen, setInfoOpen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [playbackError, setPlaybackError] = useState('');
  const source = process.env.NEXT_PUBLIC_INTRO_VIDEO_SRC;

  const showControls = useCallback(() => {
    setControlsVisible(true);
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) setControlsVisible(false);
    }, 2800);
  }, []);

  useEffect(() => {
    if (!playing) {
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
      return;
    }
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) setControlsVisible(false);
    }, 2800);
    return () => {
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
    };
  }, [playing]);

  const controlsActive = !playing || controlsVisible;

  const togglePlayback = async () => {
    if (!source) {
      setInfoOpen(true);
      return;
    }
    const video = videoRef.current;
    if (!video) return;
    setPlaybackError('');
    try {
      if (video.paused) await video.play();
      else video.pause();
      showControls();
    } catch {
      setPlaybackError('Playback could not start. Your browser may have blocked it.');
    }
  };

  const seek = (value: string) => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration)) return;
    video.currentTime = (Number(value) / 100) * video.duration;
    setProgress(Number(value));
  };

  const toggleMuted = () => {
    const video = videoRef.current;
    const next = !muted;
    setMuted(next);
    if (video) video.muted = next;
  };

  const toggleFullscreen = async () => {
    const player = playerRef.current;
    if (!player) return;
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await player.requestFullscreen();
    } catch {
      // Fullscreen can be unavailable in embedded contexts; playback still works.
    }
  };

  return (
    <>
      <div
        ref={playerRef}
        className={`video-player ${playing ? 'is-playing' : ''} ${controlsActive ? 'controls-visible' : 'controls-hidden'}`}
        data-motion="intro-video"
        onPointerMove={showControls}
        onFocus={showControls}
      >
        {source ? (
          <video
            ref={videoRef}
            className="intro-video-element"
            src={source}
            poster="/brand/og-default.png"
            playsInline
            preload="metadata"
            muted={muted}
            tabIndex={0}
            aria-label="MotionGuru product introduction video"
            onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
            onPlay={() => { setPlaying(true); showControls(); }}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
            onTimeUpdate={(event) => {
              const video = event.currentTarget;
              setCurrentTime(video.currentTime);
              setDuration(video.duration);
              setProgress(video.duration ? (video.currentTime / video.duration) * 100 : 0);
            }}
            onVolumeChange={(event) => setMuted(event.currentTarget.muted)}
            onClick={togglePlayback}
          />
        ) : (
          <div className="video-poster" role="img" aria-label="MotionGuru product story concept artwork">
            <div className="poster-grid" />
            <div className="poster-mark">M</div>
            <div className="poster-copy"><span>MOTIONGURU PRESENTS</span><strong>Every product<br />has a story.</strong><i>AN INTRODUCTION / CONCEPT FRAME</i></div>
            <div className="poster-orb" />
          </div>
        )}

        <button
          className="video-center-control"
          type="button"
          onClick={togglePlayback}
          aria-label={source ? (playing ? 'Pause introduction video' : 'Play introduction video') : 'Open video availability information'}
        >
          <span>{source && playing ? <Pause size={21} fill="currentColor" /> : <Play size={21} fill="currentColor" />}</span>
        </button>

        <div className="video-title">
          <span>THE MOTIONGURU INTRODUCTION</span>
          <span>{source ? '01:24' : 'CONCEPT PREVIEW'}</span>
        </div>

        {source && (
          <div className="video-controls">
            <button type="button" onClick={togglePlayback} aria-label={playing ? 'Pause video' : 'Play video'}>
              {playing ? <Pause size={15} /> : <Play size={15} />}
            </button>
            <span className="video-time">{formatTime(currentTime)}</span>
            <input
              aria-label="Video progress"
              aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(event) => seek(event.target.value)}
              style={{ '--progress': `${progress}%` } as React.CSSProperties}
            />
            <span className="video-time">{formatTime(duration)}</span>
            <button type="button" onClick={toggleMuted} aria-label={muted ? 'Unmute video' : 'Mute video'}>
              {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>
            <button type="button" onClick={toggleFullscreen} aria-label="Play video fullscreen">
              <Maximize size={15} />
            </button>
          </div>
        )}

        {!source && <p className="video-note">Video source not configured. Add a local or hosted file to enable playback.</p>}
        {playbackError && <p className="video-note video-error" role="status">{playbackError}</p>}
      </div>

      {infoOpen && (
        <AccessibleDialog className="video-info-dialog" onClose={() => setInfoOpen(false)}>
          <button className="modal-close" type="button" aria-label="Close" onClick={() => setInfoOpen(false)}><X size={19} /></button>
          <p className="eyebrow">INTRODUCTION VIDEO</p>
          <h3>A real introduction is on its way.</h3>
          <p>This concept frame is a placeholder, not a finished product demo. Configure <code>NEXT_PUBLIC_INTRO_VIDEO_SRC</code> to connect the player to a video file.</p>
          <button className="button button-dark" type="button" onClick={() => setInfoOpen(false)}>Understood <Check size={15} /></button>
        </AccessibleDialog>
      )}
    </>
  );
}

export function WorkflowExperience() {
  const [active, setActive] = useState(0);
  const [scene, setScene] = useState(0);
  const current = workflowStages[active];

  return (
    <div className="workflow-demo reveal">
      <div className="workflow-sidebar">
        <span className="workflow-brand"><i /> ATLAS / DEMO PROJECT</span>
        <div className="workflow-tabs" role="tablist" aria-label="Demonstration workflow stages">
          {workflowStages.map((stage, index) => (
            <button
              type="button"
              role="tab"
              aria-selected={active === index}
              aria-controls="workflow-panel"
              id={`workflow-tab-${stage.id}`}
              className={active === index ? 'active' : ''}
              key={stage.id}
              onClick={() => { setActive(index); setScene(0); }}
            >
              <span>{stage.number}</span>{stage.label}<i />
            </button>
          ))}
        </div>
        <div className="workflow-sidebar-foot"><span>DEMONSTRATION DATA</span><span>NOT A LIVE GENERATION</span></div>
      </div>

      <div className="workflow-panel" role="tabpanel" id="workflow-panel" aria-labelledby={`workflow-tab-${current.id}`}>
        <div className="workflow-panel-top">
          <span>{current.number} / {current.label.toUpperCase()}</span>
          <span className="demo-badge">{current.status}</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            className="workflow-panel-content"
            key={current.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={`workflow-visual workflow-visual-${active}`}>
              {active === 0 && (
                <>
                  <div className="brief-card"><span>PRODUCT BRIEF</span><strong>Atlas</strong><p>A calmer space for teams to do their best collaborative work.</p><div className="brief-url">atlas.example <ArrowUpRight size={12} /></div></div>
                  <div className="brief-analysis"><span>PRODUCT SIGNALS</span><b>Clear, focused teamwork</b><i /><i /><i /><span className="analysis-complete"><Check size={12} /> ANALYSIS COMPLETE</span></div>
                </>
              )}
              {active === 1 && (
                <>
                  <div className="direction-orb">✳</div>
                  <div className="direction-copy"><span>CREATIVE DIRECTION / 01</span><strong>Quiet focus<br />in a noisy world.</strong><p>Let the team&apos;s best work take center stage.</p><div className="direction-colorways"><i /><i /><i /><span>VISUAL TONE</span></div></div>
                </>
              )}
              {active === 2 && (
                <>
                  <div className="workflow-scene" key={scene}><span>SCENE 0{scene + 1} / 04</span><strong>{['Find your focus.', 'Bring teams together.', 'Make room for ideas.', 'Move work forward.'][scene]}</strong><i className={`scene-shape scene-shape-${scene}`} /></div>
                  <div className="scene-picker" aria-label="Choose a storyboard scene">
                    {[0, 1, 2, 3].map((item) => (
                      <button type="button" key={item} className={scene === item ? 'active' : ''} onClick={() => setScene(item)} aria-label={`Preview scene ${item + 1}`} aria-pressed={scene === item}><span>0{item + 1}</span></button>
                    ))}
                  </div>
                </>
              )}
              {active === 3 && (
                <>
                  <div className="workflow-final-frame"><span>ATLAS / PRODUCT INTRODUCTION</span><div><b>Less noise.<br /><em>More good work.</em></b><i /></div><small>CONCEPT PREVIEW / NOT A RENDERED VIDEO</small></div>
                  <button className="preview-next" type="button" onClick={() => setActive(2)}><ArrowLeft size={14} /> Back to storyboard</button>
                </>
              )}
            </div>
            <div className="workflow-description">
              <div><span>{current.status}</span><h3>{current.title}</h3><p>{current.detail}</p></div>
              <div className="workflow-controls">
                <button type="button" aria-label="Previous workflow stage" onClick={() => setActive((active + workflowStages.length - 1) % workflowStages.length)}><ArrowLeft size={16} /></button>
                <button type="button" aria-label="Next workflow stage" onClick={() => setActive((active + 1) % workflowStages.length)}><ArrowRight size={16} /></button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

type ShowcaseItem = { id: string; category: string; name: string; tone: string };

export function ShowcaseGallery({ examples }: { examples: readonly ShowcaseItem[] }) {
  const [selected, setSelected] = useState<ShowcaseItem | null>(null);

  return (
    <>
      <div className="showcase-grid">
        {examples.map((example, index) => (
          <button
            className={`showcase-card showcase-${example.tone}`}
            type="button"
            key={example.id}
            onClick={() => setSelected(example)}
            aria-label={`Open concept preview: ${example.name}`}
          >
            <span className="showcase-count">0{index + 1} / CONCEPT FRAME</span>
            <span className="showcase-art">
              <i className="showcase-form showcase-form-a" /><i className="showcase-form showcase-form-b" /><i className="showcase-form showcase-form-c" />
              <span className="showcase-art-title">
                {example.id === 'saas' ? 'Work<br/>beautifully.' : example.id === 'mobile' ? 'Everyday,<br/>closer.' : example.id === 'fintech' ? 'Move with<br/>confidence.' : example.id === 'ai' ? 'A clearer<br/>point of view.' : 'Make a<br/>first mark.'}
              </span>
              <span className="showcase-play"><Play size={13} fill="currentColor" /></span>
            </span>
            <span className="showcase-meta"><span>{example.category}</span><strong>{example.name}</strong><span>FICTIONAL PRODUCT CONCEPT</span></span>
          </button>
        ))}
      </div>
      {selected && (
        <AccessibleDialog className={`showcase-dialog showcase-${selected.tone}`} onClose={() => setSelected(null)}>
          <button className="modal-close" type="button" aria-label="Close concept preview" onClick={() => setSelected(null)}><X size={19} /></button>
          <div className="dialog-art"><div className="dialog-art-title">{selected.name}</div><span>CONCEPT FRAME</span></div>
          <p className="eyebrow">{selected.category}</p>
          <h3>{selected.name}</h3>
          <p>This is a visual direction for a fictional product, not a customer project or finished video.</p>
          <button className="button button-dark" type="button" onClick={() => setSelected(null)}>Close preview <Check size={15} /></button>
        </AccessibleDialog>
      )}
    </>
  );
}

export function PricingPresentation({
  plans,
  createHref,
}: {
  plans: readonly { id: string; name: string; summary: string; isSample: boolean; featured?: boolean }[];
  createHref: string;
}) {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

  return (
    <div className="pricing-wrap reveal">
      <div className="pricing-tools">
        <span>Illustrative plan structure</span>
        <div className="billing-switch" role="group" aria-label="Billing period">
          <button type="button" className={billing === 'monthly' ? 'selected' : ''} aria-pressed={billing === 'monthly'} onClick={() => setBilling('monthly')}>Monthly</button>
          <button type="button" className={billing === 'annual' ? 'selected' : ''} aria-pressed={billing === 'annual'} onClick={() => setBilling('annual')}>Annual</button>
        </div>
        <span className="billing-note">Billing details not published</span>
      </div>
      <div className="pricing-cards">
        {plans.map((plan, index) => (
          <article className={`pricing-card ${plan.featured ? 'pricing-card-featured' : ''}`} key={plan.id}>
            <div className="plan-top"><span>0{index + 1} / SAMPLE</span>{plan.featured && <span className="plan-highlight">POSSIBLE FIT</span>}</div>
            <h3>{plan.name}</h3>
            <p>{plan.summary}</p>
            <div className="plan-price">Not published<span> / plan details to come</span></div>
            <div className="plan-divider" />
            <span className="plan-disclaimer">Illustrative only. No price or benefits implied.</span>
            <Link className={plan.featured ? 'button button-dark' : 'button button-outline'} href={createHref}>Get started <ArrowUpRight size={15} /></Link>
          </article>
        ))}
      </div>
      <p className="pricing-footnote">
        {billing === 'monthly' ? 'Monthly billing option selected.' : 'Annual billing option selected.'} No billing terms or prices are available yet.
      </p>
    </div>
  );
}

export function FAQ() {
  return (
    <div className="faq-list">
      {faqItems.map((item, index) => (
        <details className="faq-item" key={item.question}>
          <summary><span className="faq-number">0{index + 1}</span><span>{item.question}</span><ChevronDown size={18} aria-hidden="true" /></summary>
          <div className="faq-answer"><p>{item.answer}</p></div>
        </details>
      ))}
    </div>
  );
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return '00:00';
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
  const remainder = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${remainder}`;
}

function AccessibleDialog({
  className,
  onClose,
  children,
}: {
  className: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    if (!dialog.open) dialog.showModal();

    return () => {
      document.body.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
      restoreFocusRef.current?.focus?.();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className={className}
      aria-modal="true"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      {children}
    </dialog>
  );
}
