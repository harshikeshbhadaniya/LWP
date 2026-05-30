import ContactForm from '../components/ContactForm';

function Contact() {
  return (
    <main className="space-y-16 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6 text-brand-900">
        <p className="text-sm uppercase tracking-[0.28em] text-brand-600">Contact</p>
        <h1 className="text-3xl font-semibold sm:text-4xl">Talk to our engineering and sales team.</h1>
        <p className="text-sm leading-7 text-brand-600">
          Reach out for product inquiries, custom quotes, or service planning. We respond quickly and connect you with the right specialist.
        </p>
      </div>

      <div className="grid gap-12 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-10">
          <section className="rounded-[2rem] border border-brand-200 bg-white p-8 shadow-panel">
            <h2 className="text-2xl font-semibold text-brand-900">Contact details</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="rounded-3xl border border-brand-200 bg-brand-100 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-brand-600">Address</p>
                <p className="mt-3 text-sm leading-6 text-brand-700">Vapi, Gujarat, India</p>
              </div>
              <div className="rounded-3xl border border-brand-200 bg-brand-100 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-brand-600">Phone</p>
                <p className="mt-3 text-sm leading-6 text-brand-700">+91 9510916203, +91 8511906201</p>
              </div>
              <div className="rounded-3xl border border-brand-200 bg-brand-100 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-brand-600">Email</p>
                <p className="mt-3 text-sm leading-6 text-brand-700">laxmiengineeringworks.vapi@gmail.com</p>
              </div>
              <div className="rounded-3xl border border-brand-200 bg-brand-100 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-brand-600">WhatsApp</p>
                <a
                  className="mt-3 inline-flex rounded-full bg-brand-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-800"
                  href="https://wa.me/919510916203"
                  target="_blank"
                  rel="noreferrer"
                >
                  Message us
                </a>
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-[2rem] border border-brand-200 bg-white shadow-panel">
            <iframe
              title="Laxmi Engineering Works Location"
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d892.4787083030972!2d72.93788483631059!3d20.345300519119316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0cfb023ec1e93%3A0x8e995591f71c7c86!2sLaxmi%20Engineering%20Works!5e0!3m2!1sen!2sin!4v1780161514659!5m2!1sen!2sin"
               className="h-96 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </section>
        </div>

        <ContactForm />
      </div>
    </main>
  );
}

export default Contact;
