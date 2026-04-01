import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, Filter, Download } from 'lucide-react';
import { getProducts } from '../../services/api';
import { adminApi } from '../../services/adminApi';
import ProductDetailModal from '../../components/admin/ProductDetailModal';

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    page: 1,
    limit: 20,
    category: '',
    sortBy: 'newest',
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await getProducts({
        ...filters,
        search: searchTerm,
      });
      setProducts(data.products);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setFilters({ ...filters, page: 1 });
    fetchProducts();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await adminApi.deleteProduct(id);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  return (
    <div className="space-y-md">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-heading-lg font-bold text-white">Product Management</h2>
          <p className="text-text-secondary mt-xs">Manage your product inventory</p>
        </div>
        <Link
          to="/admin/products/new"
          className="flex items-center gap-sm px-md py-sm bg-primary text-dark font-bold rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Product</span>
        </Link>
      </div>

      {/* Search & Filters */}
      <div className="bg-dark-card p-md rounded-lg border border-[#2a2a2a]">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-md">
          <div className="md:col-span-3">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full px-4 py-2 bg-dark border border-[#2a2a2a] rounded-lg text-white focus:border-primary focus:outline-none"
            />
          </div>

          <select
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value, page: 1 })}
            className="px-4 py-2 bg-dark border border-[#2a2a2a] rounded-lg text-white focus:border-primary focus:outline-none"
          >
            <option value="newest">Newest First</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="popular">Most Popular</option>
          </select>

          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-primary text-dark font-bold rounded-lg hover:bg-primary/90 transition-colors"
          >
            Search
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-dark-card rounded-lg border border-[#2a2a2a] overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-text-secondary">Loading...</div>
        ) : products.length === 0 ? (
          <div className="p-8 text-center text-text-secondary">No products found</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-dark border-b border-[#2a2a2a]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2a2a2a]">
                  {products.map((product) => (
                    <tr key={product._id} className="hover:bg-dark/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={product.thumbnail}
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <p className="text-white font-medium line-clamp-1">{product.name}</p>
                            <p className="text-text-secondary text-sm">SKU: {product.sku}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-text-secondary">
                          {product.categoryId?.name || 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-white font-medium">{formatPrice(product.price)}</p>
                          {product.isOnSale && product.originalPrice && (
                            <p className="text-text-secondary text-sm line-through">
                              {formatPrice(product.originalPrice)}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`${
                            product.stock > 10
                              ? 'text-success'
                              : product.stock > 0
                                ? 'text-warning'
                                : 'text-danger'
                          }`}
                        >
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col space-y-1">
                          {product.isHot && (
                            <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-danger/20 text-danger w-fit">
                              🔥 HOT
                            </span>
                          )}
                          {product.isFeatured && (
                            <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-primary/20 text-primary w-fit">
                              ⭐ Featured
                            </span>
                          )}
                          {!product.inStock && (
                            <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-text-muted/20 text-text-muted w-fit">
                              Out of Stock
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleViewProduct(product)}
                            className="p-2 text-text-secondary hover:text-primary hover:bg-dark rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <Link
                            to={`/admin/products/edit/${product._id}`}
                            className="p-2 text-text-secondary hover:text-warning hover:bg-dark rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="p-2 text-text-secondary hover:text-danger hover:bg-dark rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="px-6 py-4 border-t border-[#2a2a2a] flex items-center justify-between">
                <p className="text-text-secondary text-sm">
                  Showing {(pagination.page - 1) * pagination.limit + 1} to{' '}
                  {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
                  {pagination.total} products
                </p>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
                    disabled={pagination.page === 1}
                    className="px-4 py-2 bg-dark border border-[#2a2a2a] rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary transition-colors"
                  >
                    Previous
                  </button>
                  <span className="text-white">
                    Page {pagination.page} of {pagination.totalPages}
                  </span>
                  <button
                    onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
                    disabled={pagination.page === pagination.totalPages}
                    className="px-4 py-2 bg-dark border border-[#2a2a2a] rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onDelete={handleDelete}
      />
    </div>
  );
}
