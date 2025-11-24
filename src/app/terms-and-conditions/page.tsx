export const metadata = {
  title: "Website Terms & Conditions",
  description:
    "Understand the terms that govern use of the Fairfax Interiors website, including permitted use, copyright, liability, and contact information.",
};

export default function TermsAndConditionsPage() {
  return (
    <main className="bg-[var(--brand-light)] text-[var(--brand-dark)]">
      <section className="mx-auto w-full max-w-4xl px-6 py-16 md:px-12 lg:px-0">
        <header className="mb-12 text-center">
          <h1 className="text-[clamp(1.85rem,3vw,2.8rem)] tracking-[0.24em] uppercase">
            Website Terms & Conditions
          </h1>
          <p className="mt-6 text-base leading-relaxed text-[var(--brand-dark)]/80">
            Please read these terms before using the Fairfax Interiors website. By accessing{" "}
            <span className="font-semibold">fairfaxinteriors.com</span> (the “Site”) you agree to be bound by the clauses
            below. If you do not agree, please refrain from using the Site.
          </p>
        </header>

        <article className="space-y-12 text-base leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold tracking-[0.18em] uppercase">1. About Us</h2>
            <p className="mt-4">
              The Site is operated by Fairfax Interiors. You can contact us at{" "}
              <a className="underline underline-offset-4" href="mailto:info@fairfaxinteriors.com">
                info@fairfaxinteriors.com
              </a>{" "}
              or +44 (0)7974 097364.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-[0.18em] uppercase">2. Using the Site</h2>
            <ul className="mt-4 space-y-2 list-disc pl-6 text-[var(--brand-dark)]/90">
              <li>The Site is provided for personal, non-commercial use and for learning about our services.</li>
              <li>
                You must be at least 16 years of age to submit enquiries. By contacting us you confirm you meet this
                requirement.
              </li>
              <li>
                You may not use the Site in any way that breaches applicable law or could damage, disable, overburden, or
                impair our servers or networks.
              </li>
              <li>
                We reserve the right to suspend or withdraw the Site without notice if we suspect misuse or need to carry
                out maintenance.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-[0.18em] uppercase">3. Intellectual Property</h2>
            <p className="mt-4">
              All content on the Site—including text, imagery, logos, graphics, and layout—is owned by or licensed to Fairfax
              Interiors and is protected by copyright and other intellectual property laws. You may view, download, and print
              content for personal reference only. You must not reproduce, modify, distribute, or use any material for
              commercial purposes without prior written permission from Fairfax Interiors.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-[0.18em] uppercase">4. User Submissions</h2>
            <p className="mt-4">
              If you submit information through forms or email links, you confirm the information is accurate and that you
              have permission to provide it. Do not send confidential or commercially sensitive material unless we have agreed
              to receive it. We will handle personal data in accordance with our{" "}
              <a className="underline underline-offset-4" href="/privacy-policy">
                Privacy Policy
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-[0.18em] uppercase">5. Third-Party Links</h2>
            <p className="mt-4">
              The Site may include links to third-party websites (for example, supplier or social media pages). These are
              provided for convenience only. We do not endorse or control the content of external sites and accept no
              responsibility for any loss or damage that may arise from your use of them.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-[0.18em] uppercase">6. Accuracy of Information</h2>
            <p className="mt-4">
              We aim to keep the Site accurate and up to date, but content is provided for general information only and should
              not be relied upon as professional or technical advice. You must obtain specialist advice tailored to your
              circumstances before acting on information found on the Site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-[0.18em] uppercase">7. Liability</h2>
            <ul className="mt-4 space-y-2 list-disc pl-6 text-[var(--brand-dark)]/90">
              <li>
                To the fullest extent permitted by law, we exclude all warranties, representations, or other terms which may
                apply to the Site or its content, whether express or implied.
              </li>
              <li>
                Fairfax Interiors will not be liable for any loss or damage arising from your use of or reliance on the Site,
                including any indirect or consequential loss, loss of business, or loss of data.
              </li>
              <li>
                Nothing in these terms excludes or limits liability for death or personal injury caused by negligence, fraud,
                or any other liability which cannot be excluded or limited under applicable law.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-[0.18em] uppercase">8. Indemnity</h2>
            <p className="mt-4">
              You agree to indemnify and hold Fairfax Interiors harmless from any claims, liabilities, damages, expenses,
              and costs (including legal fees) arising from your breach of these terms or misuse of the Site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-[0.18em] uppercase">9. Changes to These Terms</h2>
            <p className="mt-4">
              We may revise these terms from time to time by updating this page. Any changes take effect immediately on
              publication. We encourage you to check this page periodically to ensure you are aware of the latest version.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-[0.18em] uppercase">10. Governing Law</h2>
            <p className="mt-4">
              These terms and any dispute arising from your use of the Site are governed by the laws of England and Wales. The
              courts of England and Wales have exclusive jurisdiction to resolve any dispute arising under or in connection
              with these terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-[0.18em] uppercase">Contact Us</h2>
            <p className="mt-4">
              For questions about these terms, please email{" "}
              <a className="underline underline-offset-4" href="mailto:info@fairfaxinteriors.com">
                info@fairfaxinteriors.com
              </a>{" "}
              or write to Fairfax Interiors, The Chantry, Stratford Road, Wroxton, Oxfordshire, OX15 6QS.
            </p>
            <p className="mt-4 text-sm text-[var(--brand-dark)]/70">Last updated: 24 November 2025.</p>
          </section>
        </article>
      </section>
    </main>
  );
}
