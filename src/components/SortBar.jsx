import { ArrowUpDown, Filter, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";

export default function SortBar({
  sortOption,
  setSortOption,
  totalProducts,
  onFilterToggle,
  onDesktopFilterToggle,
  desktopFilterOpen,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-between items-center mb-4 bg-dark-card px-4 py-2.5 rounded-lg border border-[#2a2a2a]"
    >
      {/* Left: Product Count & Filter Toggles */}
      <div className="flex items-center gap-3">
        <div className="text-sm text-text-secondary">
          {totalProducts > 0 ? (
            <>
              <span className="text-white font-semibold">{totalProducts}</span>{" "}
              products
            </>
          ) : (
            "Loading..."
          )}
        </div>

        {/* Mobile Filter Button */}
        {onFilterToggle && (
          <button
            onClick={onFilterToggle}
            className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 bg-primary hover:bg-primary/90 text-dark text-sm font-semibold rounded transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        )}

        {/* Desktop Filter Toggle */}
        {onDesktopFilterToggle && (
          <button
            onClick={onDesktopFilterToggle}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-dark-hover hover:bg-dark border border-[#2a2a2a] hover:border-primary/50 rounded text-sm text-text-secondary hover:text-primary transition-all"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>{desktopFilterOpen ? "Hide Filters" : "Show Filters"}</span>
          </button>
        )}
      </div>

      {/* Right: Sort */}
      <div className="flex items-center gap-2">
        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-text-secondary hidden sm:block">Sort:</span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="bg-dark-hover text-white px-3 py-1.5 rounded border border-[#2a2a2a] hover:border-primary/50 focus:border-primary focus:outline-none cursor-pointer text-sm transition-colors"
          >
            <option value="newest">Newest</option>
            <option value="price_asc">Price: Low → High</option>
            <option value="price_desc">Price: High → Low</option>
            <option value="popular">Popular</option>
          </select>
        </div>
      </div>
    </motion.div>
  );
}
