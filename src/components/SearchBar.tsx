interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="block w-full rounded-3xl border border-brand-200 bg-white px-4 py-3 shadow-sm focus-within:border-brand-900">
      <span className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-500">Search products</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by name, category, or keyword"
        className="mt-2 w-full border-0 bg-transparent py-2 text-sm text-brand-900 outline-none placeholder:text-brand-400"
      />
    </label>
  );
}

export default SearchBar;
