import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <section className="overflow-hidden bg-brand-900 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:gap-16 lg:px-8">
        <div className="max-w-2xl space-y-6">
          <p className="inline-flex rounded-full bg-brand-800 px-4 py-2 text-xs uppercase tracking-[0.28em] text-brand-200">
            Hydraulic Reliability
          </p>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
            Hydraulic pipe and fittings engineered in Vapi, Gujarat.
          </h1>
          <p className="max-w-xl text-base leading-7 text-brand-200 sm:text-lg">
            Laxmi Engineering Works delivers durable hydraulic piping solutions and precision fittings for industrial systems across Gujarat and beyond.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/products"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-900 shadow-lg shadow-brand-900/10 transition hover:bg-brand-100"
            >
              Explore Products
              <ArrowRight size={18} className="ml-2" />
            </Link>
            <a
              href="#why-us"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:border-white"
            >
              Why choose us
            </a>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] bg-brand-800/80 p-6 shadow-panel sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.18),_transparent_35%)]" />
          <div className="relative space-y-6">
            <div className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <p className="text-sm uppercase tracking-[0.28em] text-brand-200">Proven capabilities</p>
              <p className="text-3xl font-semibold text-white">24/7 uptime support</p>
              <p className="text-sm leading-6 text-brand-300">
                End-to-end product support and on-site commissioning for every installation.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-brand-900/60 p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-brand-300">Hydraulic Piping</p>
                <p className="mt-3 text-2xl font-semibold text-white">Pressure-rated pipework</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-brand-900/60 p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-brand-300">JCB Pipes</p>
                <p className="mt-3 text-2xl font-semibold text-white">Durable fittings</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
