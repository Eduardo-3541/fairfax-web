export const metadata = {
  title: "Contact",
  description:
    "Get in touch with Fairfax Interiors to discuss your project, schedule a consultation, or request more information about our services.",
};

const contactDetails = [
  { label: "Email", value: "info@fairfaxinteriors.com", href: "mailto:info@fairfaxinteriors.com" },
  { label: "Telephone", value: "07974 097364", href: "tel:+4407974097364" },
  { label: "Office", value: "The Chantry, Stratford Road, Wroxton, Oxfordshire, OX15 6QS" },
];

const availability = [
  { day: "Monday - Thursday", time: "11:00 - 15:00" },
  { day: "Friday - Saturday", time: "By appointment" },
  { day: "Sunday & Bank Holidays", time: "Closed" },
];

export default function ContactPage() {
  return (
    <main className="bg-[var(--brand-light)] text-[var(--brand-dark)]">
      <section className="mx-auto w-full max-w-5xl px-6 py-16 md:px-12 lg:px-0">
        <header className="mb-12 text-center">
          <h1 className="text-[clamp(2.4rem,4vw,3.6rem)] tracking-[0.24em] uppercase">
            Contact
          </h1>
          <p className="mt-6 text-base leading-relaxed text-[var(--brand-dark)]/80">
            We would love to hear about your project. Complete the simple enquiry form or reach us directly using the
            details below and we will aim to respond within two working days.
          </p>
        </header>

        <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr]">
          <section className="rounded-lg border border-[var(--brand-dark)]/10 bg-white/70 p-8 shadow-sm backdrop-blur">
            <h2 className="text-xl font-semibold tracking-[0.18em] uppercase">Enquiry Form</h2>
            <form
              className="mt-6 space-y-6"
              action="https://formsubmit.co/info@fairfaxinteriors.com"
              method="POST"
            >
              <input type="hidden" name="_subject" value="Website enquiry" />
              <input type="hidden" name="_captcha" value="false" />
              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col text-sm tracking-[0.18em] uppercase">
                  Name
                  <input
                    required
                    name="name"
                    type="text"
                    className="mt-2 rounded-md border border-[var(--brand-dark)]/20 bg-white px-3 py-2 text-base tracking-normal text-[var(--brand-dark)] focus:border-[var(--brand-dark)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-dark)]"
                  />
                </label>
                <label className="flex flex-col text-sm tracking-[0.18em] uppercase">
                  Email
                  <input
                    required
                    name="email"
                    type="email"
                    className="mt-2 rounded-md border border-[var(--brand-dark)]/20 bg-white px-3 py-2 text-base tracking-normal text-[var(--brand-dark)] focus:border-[var(--brand-dark)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-dark)]"
                  />
                </label>
                <label className="flex flex-col text-sm tracking-[0.18em] uppercase">
                  Phone (optional)
                  <input
                    name="phone"
                    type="tel"
                    className="mt-2 rounded-md border border-[var(--brand-dark)]/20 bg-white px-3 py-2 text-base tracking-normal text-[var(--brand-dark)] focus:border-[var(--brand-dark)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-dark)]"
                  />
                </label>
                <label className="flex flex-col text-sm tracking-[0.18em] uppercase">
                  Location
                  <input
                    name="location"
                    type="text"
                    className="mt-2 rounded-md border border-[var(--brand-dark)]/20 bg-white px-3 py-2 text-base tracking-normal text-[var(--brand-dark)] focus:border-[var(--brand-dark)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-dark)]"
                  />
                </label>
              </div>
              <label className="flex flex-col text-sm tracking-[0.18em] uppercase">
                Project Details
                <textarea
                  required
                  name="message"
                  rows={8}
                  className="mt-2 rounded-md border border-[var(--brand-dark)]/20 bg-white px-3 py-2 text-base tracking-normal text-[var(--brand-dark)] focus:border-[var(--brand-dark)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-dark)]"
                  placeholder="Tell us about your project, timelines, and any key requirements."
                />
              </label>
              <button
                type="submit"
                className="w-full rounded-full border border-[var(--brand-dark)] bg-[var(--brand-dark)] px-5 py-3 text-sm tracking-[0.24em] uppercase text-[var(--brand-light)] transition hover:bg-transparent hover:text-[var(--brand-dark)]"
              >
                Submit Enquiry
              </button>
            </form>
          </section>

          <aside className="space-y-10 text-base leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold tracking-[0.18em] uppercase">Direct Contact</h2>
              <ul className="mt-4 space-y-4 text-[var(--brand-dark)]/85">
                {contactDetails.map(({ label, value, href }) => (
                  <li key={`${label}-${value}`}>
                    <span className="font-semibold uppercase tracking-[0.18em] text-[var(--brand-dark)]">
                      {label}
                    </span>
                    <br />
                    {href ? (
                      <a className="underline underline-offset-4" href={href}>
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold tracking-[0.18em] uppercase">Studio Hours</h2>
              <ul className="mt-4 space-y-3 text-[var(--brand-dark)]/80">
                {availability.map(({ day, time }) => (
                  <li key={day} className="flex justify-between gap-4">
                    <span className="font-medium">{day}</span>
                    <span>{time}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold tracking-[0.18em] uppercase">Appointments</h2>
              <p className="mt-4 text-[var(--brand-dark)]/80">
                Consultations are held in person across the UK or remotely via video call. Let us know your preferred format
                and we’ll coordinate a time that works for you.
              </p>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}
