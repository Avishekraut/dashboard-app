import { ChevronDown, Search, X } from "lucide-react";

export interface Category {
  slug: string;
  name: string;
  url: string;
}

interface FiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  categories: Category[];
  onCategoryChange: (value: string) => void;
  onClear: () => void;
  isFilterApplied: boolean;
}

const Filters = ({
  search,
  onSearchChange,
  category,
  categories,
  onCategoryChange,
  onClear,
  isFilterApplied,
}: FiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4 mb-6">
      <div className="relative w-full sm:w-64">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search products..."
          className="w-full pl-10 pr-4 py-2 text-sm text-gray-700 placeholder:text-gray-600
            border border-gray-300 rounded-md
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
            transition"
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-full sm:w-44">
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-md
            bg-white
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
            transition
            appearance-none"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
        </div>

        {isFilterApplied && (
          <button
            onClick={onClear}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-red-200 text-sm cursor-pointer flex items-center gap-2"
          >
            Clear Filters
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Filters;
