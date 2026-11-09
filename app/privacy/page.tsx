import type { Metadata } from 'next';
import { MarketingFooter } from '../../src/components/marketing-footer';
import { MarketingHeader } from '../../src/components/marketing-header';

const description =
  'Learn what information MotionGuru handles, how it is used, and the privacy choices available to you.';

export const metadata: Metadata = {
  title: 'Privacy Policy | MotionGuru',
  description,
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: 'Privacy Policy | MotionGuru',
    description,
    type: 'website',
    siteName: 'MotionGuru',
  },
};

const policySections = [
  { id: 'information', label: 'Information we handle' },
  { id: 'use', label: 'How we use information' },
  { id: 'providers', label: 'Providers and integrations' },
  { id: 'choices', label: 'Your choices' },
  { id: 'retention', label: 'Retention and contact' },
] as const;

export default function PrivacyPage() {
  return (
    <div className="donatly-page-wrapper" id="top">
      <MarketingHeader />
      <main className="legal-page privacy-page">
        <header className="privacy-header">
        <div className="privacy-meta">
          <p className="eyebrow">Privacy</p>
          <p>Last updated: November 9, 2026</p>
        </div>
        <h1>Privacy Policy</h1>
        <p className="privacy-intro">
          How MotionGuru handles information when you use our website and services.
        </p>

        <dl className="privacy-summary" aria-label="Privacy policy overview">
          <div>
            <dt>Accounts</dt>
            <dd>Account and workspace details</dd>
          </div>
          <div>
            <dt>Projects</dt>
            <dd>Briefs, uploads, and generated files</dd>
          </div>
          <div>
            <dt>Your choices</dt>
            <dd>Account controls and privacy requests</dd>
          </div>
        </dl>

        <aside className="privacy-review-status" aria-label="Policy review status">
          <strong>Review in progress.</strong> Production providers and regions, retention and
          deletion, AI-improvement settings, privacy rights, and company contact details are being
          verified before this notice is final.
        </aside>
        </header>

        <div className="privacy-layout">
        <nav className="privacy-toc" aria-label="On this page">
          <p className="eyebrow">On this page</p>
          <ol>
            {policySections.map((section, index) => (
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
          <section id="information">
            <p className="privacy-section-index">01 / INFORMATION</p>
            <h2>Information we handle</h2>
            <p>
              This may include account and sign-in details, workspace and project information,
              product URLs, briefs, prompts, scripts, uploaded files, generated media, and
              information needed to support payments or connected services.
            </p>
          </section>

          <section id="use">
            <p className="privacy-section-index">02 / USE</p>
            <h2>How we use information</h2>
            <p>
              We use information to provide accounts and workspaces, process the content you submit,
              create requested outputs, deliver account messages, support transactions and
              integrations, maintain security, troubleshoot issues, and meet legal obligations.
            </p>
            <p>
              When a feature uses an AI provider, relevant text, project details, or attached images
              may be sent to that provider to complete your request.
            </p>
          </section>

          <section id="providers">
            <p className="privacy-section-index">03 / PROCESSING</p>
            <h2>Providers and integrations</h2>
            <p>
              MotionGuru uses Better Auth for account and session management. Depending on the
              feature and deployment, processing or storage may involve MongoDB, Anthropic, Groq, an
              S3-compatible service, Cloudinary, an email provider, or a payment provider such as
              Flutterwave or Polar.
            </p>
            <p>
              If you connect GitHub, Figma, Notion, Google Drive, Slack, or a custom MCP server,
              information may be exchanged with that service when you use its integration. Each
              provider and connected service has its own privacy terms.
            </p>
            <p>
              Browser storage may be used for drafts, editor state, workspace selection, and
              preferences. The service also records operational details such as AI task type,
              provider, usage, status, and integration activity.
            </p>
          </section>

          <section id="choices">
            <p className="privacy-section-index">04 / CONTROL</p>
            <h2>Your choices</h2>
            <p>
              Account settings include data export and deletion controls. Their scope and completion
              timing are still being verified. The product also has a setting related to using
              projects to improve AI suggestions; its effect on processing has not been confirmed.
            </p>
            <p>
              Privacy rights depend on the laws that apply where you live. The request process and
              response timelines will be added after the service’s launch jurisdictions are
              confirmed.
            </p>
          </section>

          <section id="retention">
            <p className="privacy-section-index">05 / DETAILS</p>
            <h2>Retention and contact</h2>
            <p>
              Specific retention periods, deletion from projects and backups, production storage
              regions, and security details are being confirmed. Company identity, a privacy contact,
              and the applicable legal jurisdiction must also be added before publication.
            </p>
          </section>
        </article>
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}
