import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductGallery from '../components/ProductGallery';
import type { Product } from '../types';
import products from '../data/products.json';

function ProductDetails() {
  const { id } = useParams();
  const allProducts = products as Product[];
  const product = allProducts.find((item) => item.id === id);

  const relatedProducts = useMemo(() => {
    if (!product) {
      return [];
    }
    return allProducts.filter((item) => product.relatedIds.includes(item.id));
  }, [allProducts, product]);

  if (!product) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-4 py-20 text-brand-700">
        <div className="rounded-[2rem] border border-brand-200 bg-white p-10 text-center shadow-panel">
          <h1 className="text-2xl font-semibold text-brand-900">Product not found</h1>
          <p className="mt-3 text-sm leading-6">The item you are looking for is unavailable. Please return to the product catalog.</p>
          <Link
            to="/products"
            className="mt-6 inline-flex rounded-full bg-brand-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-800"
          >
            Back to Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="space-y-14 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-brand-600">Product details</p>
            <h1 className="mt-3 text-3xl font-semibold text-brand-900 sm:text-4xl">{product.name}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-brand-600">{product.shortDescription}</p>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center justify-center rounded-full border border-brand-200 bg-white px-5 py-3 text-sm font-semibold text-brand-900 transition hover:border-brand-900 hover:bg-brand-50"
          >
            Back to catalog
          </Link>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <ProductGallery product={product} />
          <section className="space-y-8 rounded-[2rem] border border-brand-200 bg-white p-8 shadow-panel">
            <div className="space-y-5">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-brand-600">Overview</p>
                <h2 className="mt-3 text-2xl font-semibold text-brand-900">Reliable performance for mission-critical installations.</h2>
              </div>
              <p className="text-sm leading-7 text-brand-600">{product.description}</p>
            </div>
            <div className="space-y-5">
              <h3 className="text-lg font-semibold text-brand-900">Specifications</h3>
              <div className="space-y-3">
                {product.specifications.map((spec) => (
                  <div key={spec.label} className="grid grid-cols-[140px_1fr] gap-3 text-sm text-brand-600">
                    <span className="font-semibold text-brand-900">{spec.label}</span>
                    <span>{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl bg-brand-100 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-600">Inquiry</p>
              <p className="mt-3 text-sm leading-7 text-brand-600">Contact our team to request pricing, delivery options, or technical assistance for this product.</p>
              <a
                href="mailto:laxmiengineeringworks.vapi@gmail.com?subject=Product Inquiry"
                className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-brand-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-800"
              >
                Send inquiry
              </a>
            </div>
          </section>
        </div>
      </div>

      <section className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] border border-brand-200 bg-white p-8 shadow-panel">
          <h2 className="text-2xl font-semibold text-brand-900">Related products</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {relatedProducts.map((item) => (
              <Link
                key={item.id}
                to={`/products/${item.id}`}
                className="rounded-3xl border border-brand-200 p-6 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <img src={item.images[0]} alt={item.name} className="mb-5 h-44 w-full overflow-hidden rounded-3xl object-cover" />
                <div className="space-y-3">
                  <p className="text-sm uppercase tracking-[0.24em] text-brand-500">{item.category}</p>
                  <h3 className="text-xl font-semibold text-brand-900">{item.name}</h3>
                  <p className="text-sm leading-6 text-brand-600">{item.shortDescription}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductDetails;
