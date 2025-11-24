export const metadata = {
  title: "Privacy Policy",
  description:
    "How Fairfax Interiors collects, uses, and protects your personal information for design services and shop enquiries.",
};

export default function PrivacyPage() {
  return (
    <main className="bg-[var(--brand-light)] text-[var(--brand-dark)]">
      <section className="mx-auto w-full max-w-4xl px-6 py-16 md:px-12 lg:px-0">
        <header className="mb-12 text-center">
          <h1 className="text-[clamp(1.85rem,3vw,2.8rem)] tracking-[0.24em] uppercase">
            Privacy Policy
          </h1>
          <p className="mt-6 text-base leading-relaxed text-[var(--brand-dark)]/80">
            Fairfax Interiors is committed to keeping your personal information safe and only using it when necessary to
            deliver our design services and shop orders. This policy explains what we collect, how we use it, and your
            choices.
          </p>
        </header>

        <article className="space-y-12 text-base leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold tracking-[0.18em] uppercase">Personal Information</h2>
            <p className="mt-4">
              When you enquire with Fairfax Interiors or become a client—either through our studio or our shop—we ask for
              your name and contact details (such as email, postal address, and telephone number) so we can communicate
              with you and provide the services you request. We only collect what we need for legitimate business reasons
              and never ask for more than necessary.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-[0.18em] uppercase">How We Use This Information</h2>
            <p className="mt-4">
              If you make an enquiry about a piece for sale or any Fairfax Interiors service, we use your information only
              to respond and, if you place an order, to fulfil it. We will not voluntarily disclose personal information to
              third parties unless required by law or a competent authority under applicable data protection legislation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-[0.18em] uppercase">Our Website and Cookies</h2>
            <p className="mt-4">
              When you visit our website, we may place cookies on your device. Cookies help the site remember your details
              so you don&apos;t have to re-enter them, and they let us understand how the site is used so we can improve it.
              Cookies are specific to our server and cannot be used to track you across the internet. Credit card details
              and passwords are not stored in cookies. You can block or erase cookies in your browser, but some parts of the
              site may not work optimally without them.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-[0.18em] uppercase">How We Protect Your Information</h2>
            <p className="mt-4">
              Fairfax Interiors uses appropriate technical and organisational measures to protect personal information from
              unauthorised or unlawful processing and against accidental loss or destruction. Access is limited to team
              members and trusted partners who need it to perform their work or deliver a requested service, such as
              arranging delivery of an order.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-[0.18em] uppercase">Your Consent</h2>
            <p className="mt-4">
              By submitting your information to us through the website, by phone, email, or in person, you consent to its
              use as set out in this policy. We may update this page from time to time; continued use of our site and
              services means you agree to any changes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-[0.18em] uppercase">Contacting Us</h2>
            <p className="mt-4">
              If you have questions about this policy or would like us to erase any personal data we hold about you,
              please email{" "}
              <a className="underline underline-offset-4" href="mailto:info@fairfaxinteriors.com">
                info@fairfaxinteriors.com
              </a>
              . This does not include data we must retain for administrative, legal, or security purposes.
            </p>
          </section>

          <section>
            <p className="mt-4 text-sm text-[var(--brand-dark)]/80">Last updated: 24 November 2025.</p>
          </section>
        </article>
      </section>
    </main>
  );
}
