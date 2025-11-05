export const metadata = {
  title: "Privacy & GDPR",
  description:
    "Learn how Fairfax Interiors handles personal data in accordance with UK GDPR, including the information we collect and your privacy rights.",
};

export default function PrivacyPage() {
  return (
    <main className="bg-[var(--brand-light)] text-[var(--brand-dark)]">
      <section className="mx-auto w-full max-w-4xl px-6 py-16 md:px-12 lg:px-0">
        <header className="mb-12 text-center">
          <h1 className="text-[clamp(2.4rem,4vw,3.6rem)] tracking-[0.24em] uppercase">
            Privacy & GDPR
          </h1>
          <p className="mt-6 text-base leading-relaxed text-[var(--brand-dark)]/80">
            Fairfax Interiors is committed to protecting your personal information and being transparent about how we
            handle data in line with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
            This page explains what we collect, why we collect it, and the rights you have.
          </p>
        </header>

        <article className="space-y-12 text-base leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold tracking-[0.18em] uppercase">Who We Are</h2>
            <p className="mt-4">
              Fairfax Interiors Ltd, based at The Chantry, Stratford Road, Wroxton, Oxfordshire, OX15 6QS, is the data controller
              responsible for your personal data. If you have any questions about this notice or how we use your information,
              please contact us at{" "}
              <a className="underline underline-offset-4" href="mailto:info@fairfaxinteriors.com">
                info@fairfaxinteriors.com
              </a>{" "}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-[0.18em] uppercase">Information We Collect</h2>
            <p className="mt-4">The information we collect depends on how you interact with us. It can include:</p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-[var(--brand-dark)]/90">
              <li>Identity data such as your name, title, and job role.</li>
              <li>Contact data including email address, phone number, and postal address.</li>
              <li>
                Project-related information, such as property details and design preferences, that you share so we can
                deliver our services.
              </li>
              <li>Financial information necessary for invoicing and payment processing.</li>
              <li>Technical data such as IP address and browser type collected through cookies and analytics services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-[0.18em] uppercase">How We Use Your Data</h2>
            <p className="mt-4">We only use your personal information when the law allows us to. This includes:</p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-[var(--brand-dark)]/90">
              <li>Providing design consultation and project management services.</li>
              <li>Responding to your enquiries and managing our relationship with you.</li>
              <li>Processing payments and fulfilling contractual obligations.</li>
              <li>Improving our website, services, and client experience.</li>
              <li>
                Sending updates or marketing communications where you have requested them or where we have a legitimate
                interest, with the option to opt out at any time.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-[0.18em] uppercase">Lawful Bases for Processing</h2>
            <p className="mt-4">
              Under UK GDPR, we must have a valid lawful basis to process your data. Depending on the context we rely on:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-[var(--brand-dark)]/90">
              <li>
                <strong>Contract:</strong> when processing is necessary to perform a contract with you or to take steps at
                your request before entering a contract.
              </li>
              <li>
                <strong>Consent:</strong> where you have given clear permission (for example, subscribing to our newsletter).
              </li>
              <li>
                <strong>Legitimate interests:</strong> when processing is needed for our business interests and does not
                override your rights.
              </li>
              <li>
                <strong>Legal obligation:</strong> where we must comply with the law, such as maintaining financial records.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-[0.18em] uppercase">Cookies & Analytics</h2>
            <p className="mt-4">
              Our website uses cookies and similar technologies to understand how visitors use the site and to enhance your
              experience. Cookies may collect anonymised usage statistics such as page views, time on site, and browser
              details. You can control cookies through your browser settings and can opt out of analytics tracking where tools
              provide that option.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-[0.18em] uppercase">Data Sharing & Transfers</h2>
            <p className="mt-4">
              We only share your data with trusted third parties when necessary to deliver our services—for example, with
              specialist contractors or suppliers involved in your project, professional advisers, and service providers such
              as website hosting or payment processors. All third parties are required to respect the security of your data
              and to process it in accordance with the law. We do not sell your personal information.
            </p>
            <p className="mt-4">
              If data needs to be transferred outside the UK or European Economic Area, we ensure appropriate safeguards are in
              place, such as the UK government-approved standard contractual clauses.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-[0.18em] uppercase">How Long We Keep Your Data</h2>
            <p className="mt-4">
              We keep your personal data only for as long as necessary to fulfil the purposes we collected it for, including
              satisfying any legal, accounting, or reporting requirements. When the information is no longer needed, we will
              securely delete or anonymise it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-[0.18em] uppercase">Your GDPR Rights</h2>
            <p className="mt-4">
              You have rights under UK GDPR in relation to your personal data. These include the right to:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-[var(--brand-dark)]/90">
              <li>Request access to the personal data we hold about you.</li>
              <li>Request correction of inaccurate or incomplete information.</li>
              <li>Request erasure of your data in certain circumstances.</li>
              <li>Object to processing carried out on the basis of legitimate interests.</li>
              <li>Request restriction of processing or ask us to transfer your data to another organisation.</li>
              <li>Withdraw consent at any time when we rely on consent to process your information.</li>
            </ul>
            <p className="mt-4">
              To exercise any of these rights, please contact us using the details above. We aim to respond within one month.
              You also have the right to lodge a complaint with the Information Commissioner&apos;s Office (ICO) at{" "}
              <a className="underline underline-offset-4" href="https://ico.org.uk" target="_blank" rel="noreferrer">
                ico.org.uk
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-[0.18em] uppercase">Keeping Your Data Secure</h2>
            <p className="mt-4">
              We have implemented appropriate technical and organisational security measures to protect your personal
              information from unauthorised access, loss, misuse, or alteration. These controls are reviewed regularly to
              address emerging risks. While we aim to ensure security, transmission of information via the internet can never
              be guaranteed completely secure, so any transmission is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-[0.18em] uppercase">Changes to This Notice</h2>
            <p className="mt-4">
              We may update this policy from time to time to reflect changes in our practices, services, or legal obligations.
              The latest version will always be available on this page. This policy was last updated on 30 October 2025.
            </p>
          </section>
        </article>
      </section>
    </main>
  );
}
