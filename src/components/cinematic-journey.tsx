'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Check, Play, Sparkles } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { gsap, registerGsap } from '@/lib/animations/gsap';
import { motionConfig } from '@/lib/animations/config';
import { appBaseUrl } from '@/lib/content';

type JourneyScene = {
  id: string;
  kicker: string;
  title: string;
  body: string;
  short: string;
};

const scenes: JourneyScene[] = [
  {
    id: 'idea',
    kicker: '01 / THE IDEA',
    title: 'It starts with a feeling.',
    body: 'A product is more than a set of features. It is a point of view waiting to be seen.',
    short: 'THE IDEA',
  },
  {
    id: 'understanding',
    kicker: '02 / THE UNDERSTANDING',
    title: 'Then it becomes clear.',
    body: 'MotionGuru reads the product, the audience, and the intent behind them.',
    short: 'UNDERSTANDING',
  },
  {
    id: 'story',
    kicker: '03 / THE STORY',
    title: 'Structure gives it shape.',
    body: 'Scenes, pacing, and visual rhythm turn understanding into a storyboard.',
    short: 'THE STORY',
  },
  {
    id: 'motion',
    kicker: '04 / THE MOTION',
    title: 'Every scene earns its movement.',
    body: 'Typography, transitions, and composition are directed with intent, not decoration.',
    short: 'THE MOTION',
  },
  {
    id: 'film',
    kicker: '05 / THE FILM',
    title: 'The idea becomes a film.',
    body: 'A finished product introduction, composed to be understood and remembered.',
    short: 'THE FILM',
  },
  {
    id: 'next',
    kicker: '06 / THE NEXT FRAME',
    title: 'And then it is yours.',
    body: 'Your next product story starts here. The next frame is waiting to be made.',
    short: 'THE NEXT FRAME',
  },
];

const createVideoHref = `${appBaseUrl}/register`;

function SceneVisual({ id }: { id: string }) {
  if (id === 'idea') {
    return (
      <div className="jv jv-idea">
        <div className="jv-orb">
          <span />
          <i />
        </div>
        <span className="jv-label"><Sparkles size={11} aria-hidden="true" /> A FEELING, NOT A FEATURE</span>
      </div>
    );
  }

  if (id === 'understanding') {
    return (
      <div className="jv jv-ui">
        <div className="jv-window-bar">
          <span /><span /><span /><b>PRODUCT / UNDERSTOOD</b>
        </div>
        <div className="jv-ui-body">
          <div className="jv-ui-copy">
            <span>PRODUCT SIGNAL</span>
            <strong>Work, in better rhythm.</strong>
            <p>A calmer space for teams to do their best collaborative work.</p>
            <span className="jv-complete"><Check size={11} aria-hidden="true" /> ANALYSIS COMPLETE</span>
          </div>
          <div className="jv-ui-aside">
            <span>BRAND SIGNALS</span>
            <i /><i /><i />
            <b>92</b>
          </div>
        </div>
      </div>
    );
  }

  if (id === 'story') {
    return (
      <div className="jv jv-story">
        <div className="jv-story-top"><span>ATLAS / STORYBOARD</span><span>04 SCENES</span></div>
        <div className="jv-frames">
          <div className="jv-frame jv-frame-a"><span>01</span><b>Less noise.<br />More flow.</b></div>
          <div className="jv-frame jv-frame-b"><span>02</span><i /></div>
          <div className="jv-frame jv-frame-c"><span>03</span><b>Make room<br />to think.</b></div>
        </div>
        <div className="jv-timeline"><span /><span /><span /><span /></div>
      </div>
    );
  }

  if (id === 'motion') {
    return (
      <div className="jv jv-motion">
        <span className="jv-motion-tag">SCENE 03 / BRAND REVEAL</span>
        <div className="jv-type">move<br /><em>with</em><br />meaning<span>.</span></div>
        <i className="jv-shape" />
        <div className="jv-motion-controls"><span>00:03</span><i /><i /><i /><span>00:12</span></div>
      </div>
    );
  }

  if (id === 'film') {
    return (
      <div className="jv jv-film">
        <div className="jv-film-top"><span>FINAL STORY / PREVIEW</span><span>16:9</span></div>
        <div className="jv-film-frame">
          <span>YOUR PRODUCT<br />IN A NEW LIGHT.</span>
          <i className="jv-film-orb" />
          <span className="jv-play"><Play size={13} fill="currentColor" aria-hidden="true" /></span>
        </div>
        <div className="jv-film-bottom"><span><i /></span><b>EXPORT READY</b></div>
      </div>
    );
  }

  return (
    <div className="jv jv-next">
      <span className="jv-next-kicker">THE NEXT FRAME IS YOURS</span>
      <strong>Make it<br /><em>understood.</em></strong>
      <Link href={createVideoHref} className="jv-next-link">
        Create your first video <ArrowUpRight size={14} aria-hidden="true" />
      </Link>
    </div>
  );
}

export function CinematicJourney() {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (reducedMotion) return;
    registerGsap();

    const root = rootRef.current;
    if (!root) return;

    const context = gsap.context(() => {
      const sceneNodes = gsap.utils.toArray<HTMLElement>('.journey-scene', root);
      const camera = root.querySelector<HTMLElement>('.journey-camera');
      if (!sceneNodes.length) return;

      gsap.set(sceneNodes, {
        autoAlpha: 0,
        z: -520,
        y: 44,
        rotateX: 7,
        transformPerspective: 1400,
      });
      gsap.set(sceneNodes[0], { autoAlpha: 1, z: 0, y: 0, rotateX: 0 });

      const timeline = gsap.timeline({
        defaults: { ease: motionConfig.ease.inOut },
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.65,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const index = Math.min(scenes.length - 1, Math.floor(self.progress * scenes.length));
            if (countRef.current) countRef.current.textContent = `0${index + 1}`;
            if (labelRef.current) labelRef.current.textContent = scenes[index].short;
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });

      if (camera) {
        timeline.to(camera, { rotateY: 2.4, rotateX: -1.2, scale: 1.018, duration: scenes.length, ease: 'none' }, 0);
      }

      sceneNodes.forEach((scene, index) => {
        if (index === 0) return;
        const at = index;
        timeline.to(
          sceneNodes[index - 1],
          { autoAlpha: 0, z: 260, y: -48, rotateX: -6, duration: 0.55, ease: 'power2.in' },
          at - 0.55,
        );
        timeline.to(
          scene,
          { autoAlpha: 1, z: 0, y: 0, rotateX: 0, duration: 0.9, ease: 'power2.out' },
          at - 0.45,
        );
      });

      timeline.to({}, { duration: 0.45 });

      if (labelRef.current) labelRef.current.textContent = scenes[0].short;
    }, root);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section id="journey" className="journey-section" aria-labelledby="journey-title">
      <div className="journey-intro page-gutter reveal">
        <div className="section-topline">
          <span>05 / THE CINEMATIC JOURNEY</span>
          <span>A STORY IN SIX FRAMES</span>
        </div>
        <div className="journey-heading">
          <p className="eyebrow">Follow an idea all the way to a finished film</p>
          <h2 id="journey-title">One continuous story, from first thought to final frame.</h2>
        </div>
      </div>

      {reducedMotion ? (
        <div className="journey-static page-gutter">
          {scenes.map((scene, index) => (
            <article className="journey-static-scene" key={scene.id}>
              <div className="journey-static-visual"><SceneVisual id={scene.id} /></div>
              <div className="journey-static-copy">
                <span>{scene.kicker}</span>
                <h3>{scene.title}</h3>
                <p>{scene.body}</p>
              </div>
              <span className="journey-static-index">0{index + 1}</span>
            </article>
          ))}
        </div>
      ) : (
        <div className="journey-scroll" ref={rootRef}>
          <div className="journey-sticky">
            <div className="journey-viewport">
              <div className="journey-camera">
                <div className="journey-stage">
                  {scenes.map((scene, index) => (
                    <article className={`journey-scene journey-scene-${index + 1}`} key={scene.id}>
                      <div className="journey-scene-visual">
                        <SceneVisual id={scene.id} />
                      </div>
                      <div className="journey-scene-copy">
                        <span className="journey-kicker">{scene.kicker}</span>
                        <h3>{scene.title}</h3>
                        <p>{scene.body}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
            <div className="journey-hud" aria-hidden="true">
              <span className="journey-count" ref={countRef}>01</span>
              <span className="journey-total">/ 06</span>
              <div className="journey-track"><div className="journey-track-fill" ref={progressRef} /></div>
              <span className="journey-label" ref={labelRef}>THE IDEA</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
