import type { Metadata, Viewport } from 'next';
import '../src/app/globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const pageTitle = 'AI Product Video Maker | MotionGuru';
const pageDescription =
  'Turn a product URL, idea, or existing assets into a polished product video. MotionGuru helps teams shape the story, storyboard scenes, and create cinematic product films with AI.';

export const metadata: Metadata = {
  applicationName: 'MotionGuru',
  title: pageTitle,
  description: pageDescription,
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  alternates: siteUrl ? { canonical: '/' } : undefined,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: 'website',
    siteName: 'MotionGuru',
    ...(siteUrl ? { url: siteUrl } : {}),
    images: ['/brand/og-default.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: pageDescription,
    images: ['/brand/og-default.png'],
  },
  icons: { icon: '/logo.svg' },
};

export const viewport: Viewport = {
  themeColor: '#f5f4f1',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/*
         * Motion-enabled browsers get a single frame of protection against
         * seeing the pre-animation state. If scripting or hydration fails, the
         * timeout (or the noscript override below) restores all content.
         */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{if(window.matchMedia('(prefers-reduced-motion: no-preference)').matches){var e=document.documentElement;e.classList.add('motion-pending');window.setTimeout(function(){e.classList.remove('motion-pending')},3000)}}catch(_){}})();",
          }}
        />
        <noscript>
          <style>{`.motion-pending [data-motion],.motion-pending .reveal{opacity:1!important;visibility:visible!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
