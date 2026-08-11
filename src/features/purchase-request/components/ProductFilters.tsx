import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';

export interface ProductFiltersProps {
  searchQuery: string;
  selectedCategory: string;
  categories: string[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onClear: () => void;
}

export function ProductFilters({
  searchQuery,
  selectedCategory,
  categories,
  onSearchChange,
  onCategoryChange,
  onClear,
}: ProductFiltersProps) {
  return (
    <section className="mb-6 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        <div className="min-w-0 flex-1">
          <label htmlFor="product-search" className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-stone-600">
            Search products
          </label>
          <Input
            id="product-search"
            value={searchQuery}
            placeholder="Search by product or category"
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>

        <div className="min-w-[230px]">
          <label htmlFor="category-filter" className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-stone-600">
            Category
          </label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(event) => onCategoryChange(event.target.value)}
            className="w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-950 shadow-sm outline-none transition duration-200 focus:border-[#b54a3f] focus:ring-2 focus:ring-[#f0d2cd]"
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <Button type="button" variant="secondary" size="md" onClick={onClear}>
            Reset
          </Button>
        </div>
      </div>
    </section>
  );
}
