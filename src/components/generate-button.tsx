'use client';

import { useState, type AnchorHTMLAttributes } from 'react';

export interface GenerateButtonProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string;
  /**
   * The hue value (0-360) for the button's highlight color.
   * Default is 210 (Blue).
   */
  hue?: number;
  /**
   * If true, forces the button into its "Generating" state.
   * By default, the button also enters this state when focused or clicked.
   */
  isGenerating?: boolean;
}

export function GenerateButton({
  href,
  hue = 210,
  isGenerating: controlledIsGenerating,
  className,
  onClick,
  ...props
}: GenerateButtonProps) {
  const [isFocused, setIsFocused] = useState(false);
  const isGenerating = controlledIsGenerating !== undefined ? controlledIsGenerating : isFocused;

  return (
    <a
      href={href}
      className={['gen-btn', className].filter(Boolean).join(' ')}
      data-generating={isGenerating}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onClick={(event) => {
        setIsFocused(true);
        onClick?.(event);
      }}
      {...props}
    >
      <style>{`
        .gen-btn {
          --border-radius: 24px;
          --padding: 4px;
          --transition: 0.4s;
          --button-color: #101010;
          --highlight-color-hue: ${hue}deg;

          position: relative;
          user-select: none;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          width: min(220px, calc(100vw - 40px));
          min-height: 56px;
          padding: 0.5em 1.1em;
          font-family: "Poppins", "Inter", "Segoe UI", sans-serif;
          font-size: clamp(15px, 1.2vw, 17px);
          line-height: 1.2;
          font-weight: 400;
          text-decoration: none;

          background-color: var(--button-color);

          box-shadow:
            inset 0px 1px 1px rgba(255, 255, 255, 0.2),
            inset 0px 2px 2px rgba(255, 255, 255, 0.15),
            inset 0px 4px 4px rgba(255, 255, 255, 0.1),
            inset 0px 8px 8px rgba(255, 255, 255, 0.05),
            inset 0px 16px 16px rgba(255, 255, 255, 0.05),
            0px -1px 1px rgba(0, 0, 0, 0.02),
            0px -2px 2px rgba(0, 0, 0, 0.03),
            0px -4px 4px rgba(0, 0, 0, 0.05),
            0px -8px 8px rgba(0, 0, 0, 0.06),
            0px -16px 16px rgba(0, 0, 0, 0.08);

          border: solid 1px rgba(255, 255, 255, 0.133);
          border-radius: var(--border-radius);
          cursor: pointer;

          transition: box-shadow var(--transition), border var(--transition), background-color var(--transition);
        }

        .gen-btn::before {
          content: "";
          position: absolute;
          top: calc(0px - var(--padding));
          left: calc(0px - var(--padding));
          width: calc(100% + var(--padding) * 2);
          height: calc(100% + var(--padding) * 2);
          border-radius: calc(var(--border-radius) + var(--padding));
          pointer-events: none;
          background-image: linear-gradient(0deg, rgba(0,0,0,0.267), rgba(0,0,0,0.667));

          z-index: -1;
          transition: box-shadow var(--transition), filter var(--transition);
          box-shadow: 0 -8px 8px -6px rgba(0,0,0,0) inset,
            0 -16px 16px -8px rgba(0,0,0,0) inset,
            1px 1px 1px rgba(255,255,255,0.133),
            2px 2px 2px rgba(255,255,255,0.067),
            -1px -1px 1px rgba(0,0,0,0.133),
            -2px -2px 2px rgba(0,0,0,0.067);
        }

        .gen-btn::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: inherit;
          pointer-events: none;
          background-image: linear-gradient(
            0deg,
            #fff,
            hsl(var(--highlight-color-hue), 100%, 70%),
            hsla(var(--highlight-color-hue), 100%, 70%, 50%),
            8%,
            transparent
          );
          background-position: 0 0;
          opacity: 0;
          transition: opacity var(--transition), filter var(--transition);
        }

        .gen-btn-letter {
          position: relative;
          display: inline-block;
          color: rgba(255,255,255,0.333);
          animation: gen-letter-anim 2s ease-in-out infinite;
          transition: color var(--transition), text-shadow var(--transition), opacity var(--transition);
        }

        @keyframes gen-letter-anim {
          50% {
            text-shadow: 0 0 3px rgba(255,255,255,0.533);
            color: #fff;
          }
        }

        .gen-txt-wrapper {
          position: relative;
          display: flex;
          width: 6em;
          min-height: 1.2em;
          flex: 0 0 6em;
          align-items: center;
        }

        .gen-txt-1,
        .gen-txt-2 {
          position: absolute;
          left: 50%;
          display: flex;
          gap: 0.9em;
          white-space: nowrap;
          transform: translateX(-50%);
        }

        .gen-txt-word {
          display: inline-flex;
        }

        .gen-txt-1 {
          animation: gen-appear-anim 1s ease-in-out forwards;
        }

        .gen-txt-2 {
          opacity: 0;
        }

        @keyframes gen-appear-anim {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        /* Generating (Focus/Active) state */
        .gen-btn[data-generating="true"] .gen-txt-1 {
          animation: gen-opacity-anim 0.3s ease-in-out forwards;
          animation-delay: 1s;
        }
        .gen-btn[data-generating="true"] .gen-txt-2 {
          animation: gen-opacity-anim 0.3s ease-in-out reverse forwards;
          animation-delay: 1s;
        }

        @keyframes gen-opacity-anim {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }

        .gen-btn[data-generating="true"] .gen-btn-letter {
          animation: gen-focused-letter-anim 1s ease-in-out forwards, gen-letter-anim 1.2s ease-in-out infinite;
          animation-delay: 0s, 1s;
        }

        @keyframes gen-focused-letter-anim {
          0%, 100% { filter: blur(0px); }
          50% {
            transform: scale(2);
            filter: blur(10px) brightness(150%) drop-shadow(-36px 12px 12px hsl(var(--highlight-color-hue), 100%, 70%));
          }
        }

        .gen-btn[data-generating="true"]::before {
          box-shadow: 0 -8px 12px -6px rgba(255,255,255,0.2) inset,
            0 -16px 16px -8px hsla(var(--highlight-color-hue), 100%, 70%, 20%) inset,
            1px 1px 1px rgba(255,255,255,0.2),
            2px 2px 2px rgba(255,255,255,0.067),
            -1px -1px 1px rgba(0,0,0,0.133),
            -2px -2px 2px rgba(0,0,0,0.067);
        }

        .gen-btn[data-generating="true"]::after {
          opacity: 0.6;
          mask-image: linear-gradient(0deg, #fff, transparent);
          filter: brightness(100%);
        }

        /* Animation delays for letters */
        .gen-btn-letter:nth-child(1), .gen-btn[data-generating="true"] .gen-btn-letter:nth-child(1) { animation-delay: 0s; }
        .gen-btn-letter:nth-child(2), .gen-btn[data-generating="true"] .gen-btn-letter:nth-child(2) { animation-delay: 0.08s; }
        .gen-btn-letter:nth-child(3), .gen-btn[data-generating="true"] .gen-btn-letter:nth-child(3) { animation-delay: 0.16s; }
        .gen-btn-letter:nth-child(4), .gen-btn[data-generating="true"] .gen-btn-letter:nth-child(4) { animation-delay: 0.24s; }
        .gen-btn-letter:nth-child(5), .gen-btn[data-generating="true"] .gen-btn-letter:nth-child(5) { animation-delay: 0.32s; }
        .gen-btn-letter:nth-child(6), .gen-btn[data-generating="true"] .gen-btn-letter:nth-child(6) { animation-delay: 0.4s; }
        .gen-btn-letter:nth-child(7), .gen-btn[data-generating="true"] .gen-btn-letter:nth-child(7) { animation-delay: 0.48s; }
        .gen-btn-letter:nth-child(8), .gen-btn[data-generating="true"] .gen-btn-letter:nth-child(8) { animation-delay: 0.56s; }
        .gen-btn-letter:nth-child(9), .gen-btn[data-generating="true"] .gen-btn-letter:nth-child(9) { animation-delay: 0.64s; }
        .gen-btn-letter:nth-child(10), .gen-btn[data-generating="true"] .gen-btn-letter:nth-child(10) { animation-delay: 0.72s; }
        .gen-btn-letter:nth-child(11), .gen-btn[data-generating="true"] .gen-btn-letter:nth-child(11) { animation-delay: 0.8s; }
        .gen-btn-letter:nth-child(12), .gen-btn[data-generating="true"] .gen-btn-letter:nth-child(12) { animation-delay: 0.88s; }
        .gen-btn-letter:nth-child(13), .gen-btn[data-generating="true"] .gen-btn-letter:nth-child(13) { animation-delay: 0.96s; }

        /* Hover & Active states */
        .gen-btn:active {
          border: solid 1px hsla(var(--highlight-color-hue), 100%, 80%, 70%);
          background-color: hsla(var(--highlight-color-hue), 50%, 20%, 0.5);
        }
        .gen-btn:active::before {
          box-shadow: 0 -8px 12px -6px rgba(255,255,255,0.667) inset,
            0 -16px 16px -8px hsla(var(--highlight-color-hue), 100%, 70%, 80%) inset,
            1px 1px 1px rgba(255,255,255,0.267),
            2px 2px 2px rgba(255,255,255,0.133),
            -1px -1px 1px rgba(0,0,0,0.133),
            -2px -2px 2px rgba(0,0,0,0.067);
        }
        .gen-btn:active::after {
          opacity: 1;
          mask-image: linear-gradient(0deg, #fff, transparent);
          filter: brightness(200%);
        }
        .gen-btn:active .gen-btn-letter {
          text-shadow: 0 0 1px hsla(var(--highlight-color-hue), 100%, 90%, 90%);
          animation: none;
        }

        .gen-btn:hover {
          border: solid 1px hsla(var(--highlight-color-hue), 100%, 80%, 40%);
        }
        .gen-btn:hover::before {
          box-shadow: 0 -8px 8px -6px rgba(255,255,255,0.667) inset,
            0 -16px 16px -8px hsla(var(--highlight-color-hue), 100%, 70%, 30%) inset,
            1px 1px 1px rgba(255,255,255,0.133),
            2px 2px 2px rgba(255,255,255,0.067),
            -1px -1px 1px rgba(0,0,0,0.133),
            -2px -2px 2px rgba(0,0,0,0.067);
        }
        .gen-btn:hover::after {
          opacity: 1;
          mask-image: linear-gradient(0deg, #fff, transparent);
        }
        .notch-generate {
          font-size: 14px;
        }
      `}</style>

      <span className="gen-txt-wrapper" aria-hidden="true">
        <span className="gen-txt-1">
          {'Get started'.split(' ').map((word, wordIndex) => (
            <span key={`t1-word-${wordIndex}`} className="gen-txt-word">
              {word.split('').map((letter, i) => (
                <span key={`t1-${wordIndex}-${i}`} className="gen-btn-letter">
                  {letter}
                </span>
              ))}
            </span>
          ))}
        </span>
        <span className="gen-txt-2">
          {'Get started'.split(' ').map((word, wordIndex) => (
            <span key={`t2-word-${wordIndex}`} className="gen-txt-word">
              {word.split('').map((letter, i) => (
                <span key={`t2-${wordIndex}-${i}`} className="gen-btn-letter">
                  {letter}
                </span>
              ))}
            </span>
          ))}
        </span>
      </span>
    </a>
  );
}

export default GenerateButton;
