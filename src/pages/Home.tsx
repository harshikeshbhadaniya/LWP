import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import type { Product } from '../types';
import products from '../data/products.json';

function Home() {
  const featuredProducts = (products as Product[]).filter((product) => product.featured);

  return (
    <main className="space-y-20">
      <HeroSection />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-brand-500">Featured products</p>
            <h2 className="mt-3 text-3xl font-semibold text-brand-900 sm:text-4xl">Designed for industrial performance</h2>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center justify-center rounded-full bg-brand-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-800"
          >
            View full catalog
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-brand-100 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.28em] text-brand-600">About Laxmi Engineering Works</p>
              <h2 className="text-3xl font-semibold text-brand-900 sm:text-4xl">Hydraulic piping solutions built for industrial strength.</h2>
              <p className="max-w-xl text-base leading-7 text-brand-600">
                Based in Vapi, Gujarat, Laxmi Engineering Works specializes in hydraulic pipe and fittings for demanding industrial applications. We combine precision manufacturing with reliable delivery to support your workflow.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {[
                { label: 'Project delivery', value: 'Fast, reliable timelines across complex installations.' },
                { label: 'Technical service', value: '24/7 support for startups, upgrades, and maintenance.' },
                { label: 'Quality assurance', value: 'Certified components with industry-grade testing standards.' },
                { label: 'Custom integration', value: 'Solutions tailored for your facility and workflow.' },
              ].map((item) => (
                <div key={item.label} className="rounded-3xl border border-brand-200 bg-white p-6 shadow-panel">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-800">{item.label}</p>
                  <p className="mt-3 text-sm leading-6 text-brand-600">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="why-us" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="rounded-[2rem] bg-brand-900 px-8 py-10 text-white shadow-panel">
            <p className="text-sm uppercase tracking-[0.28em] text-brand-300">Why choose us</p>
            <h3 className="mt-4 text-2xl font-semibold">Industry expertise that keeps your line moving.</h3>
            <p className="mt-4 text-sm leading-6 text-brand-300">
              We combine proven design practices with adaptive technology to minimize risk and maximize uptime on every deployment.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2">
            {[
              { title: 'Precision products', desc: 'Equipment built for repeatable performance and long service life.' },
              { title: 'Supply chain trust', desc: 'Reliable sourcing and manufacturing from established partners.' },
              { title: 'Certified safety', desc: 'Compliance with global industrial standards and certifications.' },
              { title: 'Custom support', desc: 'Dedicated engineering and service teams for your exact needs.' },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-brand-200 bg-white p-7 shadow-panel">
                <h4 className="text-lg font-semibold text-brand-900">{item.title}</h4>
                <p className="mt-3 text-sm leading-6 text-brand-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-white/10 bg-brand-800/95 p-8 sm:p-12">
            <div className="grid gap-6 lg:grid-cols-2 lg:items-center lg:gap-12">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-brand-300">Ready to partner</p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight">Discuss your next industrial equipment or automation project.</h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-brand-300">
                  Our specialists can help scope the right system, source materials, and schedule delivery for your next process expansion.
                </p>
              </div>
              <div className="space-y-4">
                <p className="rounded-3xl bg-brand-900/80 px-5 py-4 text-sm font-semibold text-white">Call us at +91 9510916203</p>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-900 transition hover:bg-brand-100"
                >
                  Contact sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
