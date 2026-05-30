function About() {
  return (
    <main className="space-y-16 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6 text-brand-900">
        <p className="text-sm uppercase tracking-[0.28em] text-brand-600">About us</p>
        <h1 className="text-3xl font-semibold sm:text-4xl">A legacy of dependable industrial solutions.</h1>
        <p className="text-sm leading-7 text-brand-600">
          Laxmi Engineering Works is a Vapi-based manufacturer of hydraulic pipe and fittings. We supply durable, precision-engineered components for industrial systems across Gujarat and nearby regions.
        </p>
      </div>

      <section className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-brand-200 bg-white p-8 shadow-panel">
          <h2 className="text-2xl font-semibold text-brand-900">Our mission</h2>
          <p className="mt-4 text-sm leading-7 text-brand-600">
            To deliver engineered equipment that improves reliability, safety, and productivity while supporting the evolving requirements of industrial facilities.
          </p>
          <ul className="mt-8 space-y-4 text-brand-600">
            <li className="rounded-3xl border border-brand-200 bg-brand-100 p-5">
              <strong className="block text-brand-900">Performance-driven design</strong>
              Components and systems built for high uptime and low maintenance.
            </li>
            <li className="rounded-3xl border border-brand-200 bg-brand-100 p-5">
              <strong className="block text-brand-900">Engineering precision</strong>
              Every product follows strict quality controls and certification standards.
            </li>
            <li className="rounded-3xl border border-brand-200 bg-brand-100 p-5">
              <strong className="block text-brand-900">Customer-first service</strong>
              Dedicated support for planning, installation, and aftercare.
            </li>
          </ul>
        </div>

        <div className="rounded-[2rem] border border-brand-200 bg-brand-900 px-8 py-10 text-white shadow-panel">
          <h2 className="text-2xl font-semibold">Our strengths</h2>
          <div className="mt-8 space-y-6">
            {[
              { title: 'Strategic sourcing', detail: 'Sourcing premium materials from trusted industrial suppliers.' },
              { title: 'Global compliance', detail: 'Meeting ISO, CE, and industry-specific regulatory requirements.' },
              { title: 'Custom engineering', detail: 'Tailored solutions for unique plant layouts and workflows.' },
              { title: 'Scalable delivery', detail: 'Flexible production schedules for pilot to series deployment.' },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl bg-brand-800/90 p-6">
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-brand-300">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl rounded-[2rem] border border-brand-200 bg-white p-10 shadow-panel">
        <h2 className="text-2xl font-semibold text-brand-900">Our vision</h2>
        <p className="mt-4 text-sm leading-7 text-brand-600">
          We aim to be the trusted partner for industrial operators seeking dependable equipment, smart automation, and service continuity that protects productivity and reduces operational risk.
        </p>
      </section>
    </main>
  );
}

export default About;
