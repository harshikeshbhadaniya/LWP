import { useState } from 'react';
import type { Product } from '../types';

interface ProductGalleryProps {
  product: Product;
}

function ProductGallery({ product }: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-[2rem] border border-brand-200 bg-white shadow-panel">
        <img
          src={product.images[currentIndex]}
          alt={`${product.name} image ${currentIndex + 1}`}
          className="h-[360px] w-full object-cover sm:h-[420px]"
        />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {product.images.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => setCurrentIndex(index)}
            className={`overflow-hidden rounded-3xl border p-1 transition ${
              index === currentIndex ? 'border-brand-900' : 'border-brand-200'
            }`}
          >
            <img src={src} alt={`Thumbnail ${index + 1}`} className="h-24 w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductGallery;
