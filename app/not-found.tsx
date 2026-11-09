import Link from 'next/link';
import { MarketingFooter } from '../src/components/marketing-footer';
import { MarketingHeader } from '../src/components/marketing-header';

export default function NotFound() {
  return (
    <div className="donatly-page-wrapper" id="top">
      <MarketingHeader />
      <main className="not-found-page">
        <h1 className="not-found-code">404</h1>
        <p className="not-found-label">Page not found</p>
        <Link className="button button-dark not-found-home" href="/">
          Back to home
        </Link>
      </main>
      <MarketingFooter />
    </div>
  );
}
