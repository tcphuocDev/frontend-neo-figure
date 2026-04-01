import { useState, useEffect } from "react";
import {
  Filter,
  X,
  Star,
  Check,
  DollarSign,
  Sparkles,
  Flame,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getCategories } from "../services/api";

export default function FilterSidebar({
  filters,
  onFilterChange,
  onClose,
  isMobile,
  onToggle,
}) {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(!isMobile);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCategoryChange = (categorySlug) => {
    onFilterChange({ ...filters, category: categorySlug, page: 1 });
  };

  const handlePriceChange = (min, max) => {
    onFilterChange({ ...filters, minPrice: min, maxPrice: max, page: 1 });
  };

  const handleRatingChange = (rating) => {
    onFilterChange({ ...filters, minRating: rating, page: 1 });
  };

  const clearFilters = () => {
    onFilterChange({
      category: "",
      minPrice: "",
      maxPrice: "",
      minRating: "",
      isHot: "",
      isFeatured: "",
      page: 1,
    });
  };

  const content = (
    <div className="gap-md flex flex-col max-h-[calc(100vh-300px)] overflow-y-auto pr-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-sm border-b border-[#2a2a2a]">
        <div className="flex items-center gap-sm">
          <Filter className="w-4 h-4 text-primary" />
          <h2 className="text-heading-sm font-bold text-white">Filters</h2>
        </div>
        <div className="flex items-center gap-xs">
          {!isMobile && onToggle && (
            <button
              onClick={onToggle}
              className="p-xs hover:bg-dark-hover rounded transition-colors"
              title="Hide filters"
            >
              <X className="w-4 h-4 text-text-secondary hover:text-white" />
            </button>
          )}
          {isMobile && (
            <button
              onClick={onClose}
              className="p-xs hover:bg-dark-hover rounded transition-colors"
            >
              <X className="w-4 h-4 text-text-secondary hover:text-white" />
            </button>
          )}
        </div>
      </div>

      {/* Clear Filters */}
      <button
        onClick={clearFilters}
        className="w-full px-sm py-xs bg-dark-hover hover:bg-dark border border-[#2a2a2a] hover:border-primary/50 rounded text-body text-text-secondary hover:text-primary transition-all font-medium"
      >
        Clear All
      </button>

      {/* Categories */}
      <div>
        <h3 className="text-white text-heading-sm font-semibold mb-md flex items-center gap-xs">
          <Sparkles className="w-4 h-4 text-primary" />
          Categories
        </h3>
        <div className="gap-sm flex flex-col">
          <button
            onClick={() => handleCategoryChange("")}
            className={`w-full text-left px-sm py-sm rounded text-heading-sm transition-all flex items-center justify-between ${
              !filters.category
                ? "bg-primary text-dark font-semibold"
                : "text-text-secondary hover:bg-dark-hover hover:text-white"
            }`}
          >
            <span>All Categories</span>
            {!filters.category && <Check className="w-4 h-4" />}
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => handleCategoryChange(cat.slug)}
              className={`w-full text-left px-sm py-sm rounded text-heading-sm transition-all flex items-center justify-between ${
                filters.category === cat.slug
                  ? "bg-primary text-dark font-semibold"
                  : "text-text-secondary hover:bg-dark-hover hover:text-white"
              }`}
            >
              <span>{cat.name}</span>
              {filters.category === cat.slug && (
                <Check className="w-4 h-4" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-white text-heading-sm font-semibold mb-md flex items-center gap-xs">
          <DollarSign className="w-4 h-4 text-green-500" />
          Price Range
        </h3>
        <div className="gap-sm flex flex-col">
          {[
            { label: "All Prices", min: "", max: "" },
            { label: "Under 500K", min: 0, max: 500000 },
            { label: "500K - 1M", min: 500000, max: 1000000 },
            { label: "1M - 2M", min: 1000000, max: 2000000 },
            { label: "2M - 5M", min: 2000000, max: 5000000 },
            { label: "Over 5M", min: 5000000, max: "" },
          ].map((range, index) => {
            const isActive =
              (filters.minPrice == range.min ||
                (!filters.minPrice && range.min === "")) &&
              (filters.maxPrice == range.max ||
                (!filters.maxPrice && range.max === ""));
            return (
              <button
                key={index}
                onClick={() => handlePriceChange(range.min, range.max)}
                className={`w-full text-left px-sm py-sm rounded text-heading-sm transition-all flex items-center justify-between ${
                  isActive
                    ? "bg-green-500 text-dark font-semibold"
                    : "text-text-secondary hover:bg-dark-hover hover:text-white"
                }`}
              >
                <span>{range.label}</span>
                {isActive && <Check className="w-4 h-4" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="text-white text-heading-sm font-semibold mb-md flex items-center gap-xs">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          Rating
        </h3>
        <div className="gap-sm flex flex-col">
          {[5, 4, 3].map((rating) => {
            const isActive = filters.minRating === rating.toString();
            return (
              <button
                key={rating}
                onClick={() => handleRatingChange(rating)}
                className={`w-full text-left px-sm py-sm rounded text-heading-sm transition-all flex items-center justify-between ${
                  isActive
                    ? "bg-yellow-500 text-dark font-semibold"
                    : "text-text-secondary hover:bg-dark-hover hover:text-white"
                }`}
              >
                <div className="flex items-center gap-xs">
                  <div className="flex items-center">
                    {[...Array(rating)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          isActive
                            ? "fill-dark text-dark"
                            : "fill-yellow-400 text-yellow-400"
                        }`}
                      />
                    ))}
                  </div>
                  <span>& Up</span>
                </div>
                {isActive && <Check className="w-4 h-4" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Special Filters */}
      <div>
        <h3 className="text-white text-heading-sm font-semibold mb-md flex items-center gap-xs">
          <Flame className="w-4 h-4 text-secondary" />
          Special
        </h3>
        <div className="gap-sm flex flex-col">
          <button
            onClick={() =>
              onFilterChange({
                ...filters,
                isHot: filters.isHot ? "" : true,
                page: 1,
              })
            }
            className={`w-full text-left px-sm py-sm rounded text-heading-sm transition-all flex items-center gap-sm ${
              filters.isHot
                ? "bg-secondary text-white font-semibold"
                : "bg-secondary/10 border border-secondary/30 text-secondary hover:bg-secondary/20"
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>Hot Deals</span>
            {filters.isHot && <Check className="w-4 h-4 ml-auto" />}
          </button>
          <button
            onClick={() =>
              onFilterChange({
                ...filters,
                isFeatured: filters.isFeatured ? "" : true,
                page: 1,
              })
            }
            className={`w-full text-left px-sm py-sm rounded text-heading-sm transition-all flex items-center gap-sm ${
              filters.isFeatured
                ? "bg-primary text-dark font-semibold"
                : "bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20"
            }`}
          >
            <Star className="w-4 h-4 fill-current" />
            <span>Featured</span>
            {filters.isFeatured && <Check className="w-4 h-4 ml-auto" />}
          </button>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            {/* Sidebar */}
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-dark-card border-r border-[#2a2a2a] p-md overflow-y-auto z-50 lg:hidden"
            >
              {content}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  return (
    <div className="bg-dark-card rounded-lg p-md border border-[#2a2a2a] sticky top-24">
      {content}
    </div>
  );
}
