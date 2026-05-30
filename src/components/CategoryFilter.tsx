interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
}

function CategoryFilter({ categories, activeCategory, onSelect }: CategoryFilterProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {['All', ...categories].map((category) => {
        const isActive = category === activeCategory;
        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelect(category)}
            className={`rounded-3xl border px-4 py-3 text-left text-sm font-semibold transition ${
              isActive
                ? 'border-brand-900 bg-brand-900 text-white'
                : 'border-brand-200 bg-white text-brand-700 hover:border-brand-900 hover:text-brand-900'
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}

export default CategoryFilter;
