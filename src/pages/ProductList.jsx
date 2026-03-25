import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, Package, Home } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";
import SortBar from "../components/SortBar";
import Pagination from "../components/Pagination";
import { getProducts } from "../services/api";

export default function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [desktopFilterOpen, setDesktopFilterOpen] = useState(true);

  // Get filters from URL params
  const filters = {
    page: searchParams.get("page") || "1",
    limit: searchParams.get("limit") || "12",
    category: searchParams.get("category") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    minRating: searchParams.get("minRating") || "",
    sortBy: searchParams.get("sortBy") || "newest",
    search: searchParams.get("search") || "",
    isHot: searchParams.get("isHot") || "",
    isFeatured: searchParams.get("isFeatured") || "",
  };

  useEffect(() => {
    fetchProducts();
    window.scrollTo(0, 0);
  }, [searchParams]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await getProducts(filters);
      setProducts(data.products);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    const params = {};
    Object.keys(newFilters).forEach((key) => {
      if (newFilters[key]) {
        params[key] = newFilters[key];
      }
    });
    setSearchParams(params);
  };

  const handleSortChange = (sortBy) => {
    handleFilterChange({ ...filters, sortBy, page: 1 });
  };

  const handlePageChange = (page) => {
    handleFilterChange({ ...filters, page });
  };

  return (
    <div className="min-h-screen bg-dark" style={{ padding: "0 20px" }}>
      <Header />

      <div className="w-full py-4 lg:py-6">
        <div className="max-w-14xl mx-auto px-4">
          {/* Breadcrumb - Compact */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center text-xs text-text-secondary mb-4 bg-dark-card px-3 py-2 rounded-lg border border-[#2a2a2a]"
          >
            <Home className="w-3.5 h-3.5 mr-1.5" />
            <span className="hover:text-primary transition-colors cursor-pointer">
              Home
            </span>
            <span className="mx-1.5">/</span>
            <span className="text-white font-medium">Products</span>
            {filters.category && (
              <>
                <span className="mx-1.5">/</span>
                <span className="text-primary font-medium capitalize">
                  {filters.category.replace("-", " ")}
                </span>
              </>
            )}
          </motion.div>

          <div className="flex gap-5 lg:gap-6">
            {/* Sidebar - Desktop - Collapsible */}
            {desktopFilterOpen && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: 0.1 }}
                className="hidden lg:block lg:w-60 xl:w-64 flex-shrink-0"
              >
                <FilterSidebar
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  isMobile={false}
                  onToggle={() => setDesktopFilterOpen(!desktopFilterOpen)}
                />
              </motion.div>
            )}

            {/* Mobile Filter Sidebar */}
            {filterOpen && (
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                onClose={() => setFilterOpen(false)}
                isMobile={true}
              />
            )}

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Sort Bar with Filter Toggle */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <SortBar
                  sortOption={filters.sortBy}
                  setSortOption={handleSortChange}
                  totalProducts={pagination.total || 0}
                  onFilterToggle={() => setFilterOpen(true)}
                  onDesktopFilterToggle={() =>
                    setDesktopFilterOpen(!desktopFilterOpen)
                  }
                  desktopFilterOpen={desktopFilterOpen}
                />
              </motion.div>

              {/* Products Grid - Dense 4 column */}
              {loading ? (
                <div className="flex flex-col items-center justify-center h-96 bg-dark-card rounded-lg border border-[#2a2a2a]">
                  <Loader2 className="w-12 h-12 text-primary animate-spin mb-3" />
                  <p className="text-text-secondary">
                    Loading amazing products...
                  </p>
                </div>
              ) : products.length > 0 ? (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                  >
                    {products.map((product, index) => (
                      <motion.div
                        key={product._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.02 }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Pagination */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-6"
                  >
                    <Pagination
                      currentPage={Number(filters.page)}
                      totalPages={pagination.totalPages || 1}
                      onPageChange={handlePageChange}
                    />
                  </motion.div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-center py-16 bg-dark-card rounded-lg border border-[#2a2a2a]"
                >
                  <Package className="w-20 h-20 text-text-muted mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">
                    No Products Found
                  </h3>
                  <p className="text-text-secondary mb-6 max-w-md mx-auto text-sm">
                    We couldn't find any products matching your criteria. Try
                    adjusting your filters or search terms.
                  </p>
                  <button
                    onClick={() => handleFilterChange({ page: 1 })}
                    className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-dark font-bold rounded-lg transition-all hover:scale-105"
                  >
                    Clear All Filters
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
