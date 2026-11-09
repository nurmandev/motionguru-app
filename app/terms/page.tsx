import type { Metadata } from 'next';
import Link from 'next/link';
import { MarketingFooter } from '../../src/components/marketing-footer';
import { MarketingHeader } from '../../src/components/marketing-header';

const description =
  'Terms for using MotionGuru, including account responsibilities, submitted content, and service availability.';

export const metadata: Metadata = {
  title: 'Terms of Service | MotionGuru',
  description,
  alternates: { canonical: '/terms' },
  openGraph: {
    title: 'Terms of Service | MotionGuru',
    description,
    type: 'website',
    siteName: 'MotionGuru',
  },
};

const termsSections = [
  { id: 'accounts', label: 'Accounts' },
  { id: 'service', label: 'The service' },
  { id: 'content', label: 'Your content and outputs' },
  { id: 'acceptable-use', label: 'Acceptable use' },
  { id: 'ownership', label: 'Ownership and pricing' },
  { id: 'third-parties', label: 'Third-party services' },
  { id: 'ending-access', label: 'Ending access' },
  { id: 'changes', label: 'Changes and legal terms' },
] as const;

export default function TermsPage() {
  return (
    <div className="donatly-page-wrapper" id="top">
      <MarketingHeader />
      <main className="legal-page privacy-page">
        <header className="privacy-header">
        <div className="privacy-meta">
          <p className="eyebrow">Legal</p>
          <p>Last updated: November 9, 2026</p>
        </div>
        <h1>Terms of Service</h1>
        <p className="privacy-intro">
          The terms for accessing the MotionGuru website and using our services.
        </p>

        <dl className="privacy-summary" aria-label="Terms overview">
          <div>
            <dt>Accounts</dt>
            <dd>Keep account details accurate and secure</dd>
          </div>
          <div>
            <dt>Your content</dt>
            <dd>You retain rights to what you submit</dd>
          </div>
          <div>
            <dt>Service</dt>
            <dd>Features may change as the product develops</dd>
          </div>
        </dl>

        <aside
          className="privacy-review-status terms-review-status"
          aria-label="Terms review status"
        >
          <strong>Review in progress.</strong> Company and contact details, governing law,
          generated-content licensing, and liability terms need legal review before these terms are
          final.
        </aside>
        </header>

        <div className="privacy-layout">
        <nav className="privacy-toc" aria-label="On this page">
          <p className="eyebrow">On this page</p>
          <ol>
            {termsSections.map((section, index) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  {section.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="privacy-document">
          <section id="accounts">
            <p className="privacy-section-index">01 / ACCOUNTS</p>
            <h2>Accounts</h2>
            <p>
              You must be legally able to enter a contract where you live. Provide accurate account
              information, keep your sign-in details secure, and tell us about suspected
              unauthorized access. You are responsible for activity under your account.
            </p>
          </section>

          <section id="service">
            <p className="privacy-section-index">02 / SERVICE</p>
            <h2>The service</h2>
            <p>
              MotionGuru is a product-video creation service in development. Features, previews, and
              availability may change. We do not promise uninterrupted access or that a feature
              will remain available.
            </p>
          </section>

          <section id="content">
            <p className="privacy-section-index">03 / CONTENT</p>
            <h2>Your content and generated materials</h2>
            <p>
              You retain your rights to the text, URLs, images, video, and other materials you
              submit. You confirm that you have permission to submit them and let us use them to
              provide, maintain, and secure the features you request.
            </p>
            <p>
              Generated scripts, storyboards, images, audio, or video may be inaccurate, incomplete,
              or similar to materials created for others. Review outputs before relying on or
              sharing them, and check that your use respects applicable law and third-party rights.
            </p>
          </section>

          <section id="acceptable-use">
            <p className="privacy-section-index">04 / USE</p>
            <h2>Acceptable use</h2>
            <p>
              Do not use MotionGuru to break the law, infringe rights, distribute harmful code,
              deceive or harm others, interfere with the service, bypass access controls, or probe
              systems without authorization. We may restrict access when needed to protect users,
              the service, or others.
            </p>
          </section>

          <section id="ownership">
            <p className="privacy-section-index">05 / OWNERSHIP</p>
            <h2>Ownership and pricing</h2>
            <p>
              MotionGuru or its licensors own the service, software, branding, and materials we
              provide. These terms give you permission to use the service, not ownership of those
              materials. Commercial-use rights for generated or exported materials are still under
              review.
            </p>
            <p>
              Website pricing and plan examples are illustrative. If paid features become available,
              their price and terms will be shown before purchase.
            </p>
          </section>

          <section id="third-parties">
            <p className="privacy-section-index">06 / THIRD PARTIES</p>
            <h2>Third-party services and privacy</h2>
            <p>
              Some features rely on third-party websites or services, which are governed by their
              own terms and privacy practices. Our <Link href="/privacy">Privacy Policy</Link>{' '}
              explains how information is handled by MotionGuru.
            </p>
          </section>

          <section id="ending-access">
            <p className="privacy-section-index">07 / ACCESS</p>
            <h2>Ending access, warranties, and liability</h2>
            <p>
              You may stop using MotionGuru at any time. We may suspend or end access for a serious
              breach, a security risk, or where required by law.
            </p>
            <p>
              To the extent permitted by law, the service is provided “as is” and “as available.”
              Any limitation of liability must be reviewed and completed for the laws that apply.
              Nothing in these terms limits liability that cannot legally be excluded.
            </p>
          </section>

          <section id="changes">
            <p className="privacy-section-index">08 / UPDATES</p>
            <h2>Changes and legal terms</h2>
            <p>
              We may update these terms as the service changes. For material changes, we will
              provide notice and update the date above. Governing law and legal contact details will
              be added after the applicable company and jurisdiction are confirmed.
            </p>
          </section>
        </article>
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}
