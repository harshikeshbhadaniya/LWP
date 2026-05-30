import { useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import type { Product } from '../types';
import products from '../data/products.json';

function Products() {
  const allProducts = products as Product[];
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = useMemo(() => {
    return allProducts.filter((product) => {
      const searchMatch = [product.name, product.category, product.shortDescription, product.description]
        .join(' ')
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return searchMatch;
    });
  }, [allProducts, searchTerm]);

  return (
    <main className="space-y-12 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-4">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.28em] text-brand-600">Product catalog</p>
          <h1 className="mt-3 text-3xl font-semibold text-brand-900 sm:text-4xl">Browse engineered products.</h1>
          <p className="mt-4 text-sm leading-7 text-brand-600">
            Search the portfolio and compare product specs for your next procurement or upgrade.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-1 md:items-center">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>
      </div>

      <section className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.length > 0 ? (
          filtered.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <div className="col-span-full rounded-[2rem] border border-brand-200 bg-white p-10 text-center text-brand-600 shadow-panel">
            <p className="text-lg font-semibold text-brand-900">No matching products found.</p>
            <p className="mt-2 text-sm">Try adjusting the search text or broadening your keywords.</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default Products;
