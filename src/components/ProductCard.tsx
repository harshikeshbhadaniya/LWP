import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-brand-200 bg-white shadow-panel transition hover:-translate-y-1 hover:shadow-xl">
      <div className="aspect-[4/3] overflow-hidden bg-brand-100">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-brand-100 px-3 py-1 text-xs uppercase tracking-[0.22em] text-brand-600">
            {product.category}
          </span>
          <span className="text-sm font-semibold text-brand-900">Product</span>
        </div>
        <h3 className="text-xl font-semibold text-brand-900">{product.name}</h3>
        <p className="text-sm leading-6 text-brand-600">{product.shortDescription}</p>
        <Link
          to={`/products/${product.id}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-900 transition hover:text-brand-700"
        >
          View Details
          <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}

export default ProductCard;
