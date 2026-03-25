import { X, Edit, Trash2, ExternalLink, Package, DollarSign, BarChart } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductDetailModal({ product, isOpen, onClose, onDelete }) {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);

  if (!isOpen || !product) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleEdit = () => {
    onClose();
    navigate(`/admin/products/edit/${product._id}`);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      onDelete(product._id);
      onClose();
    }
  };

  const allImages = [product.thumbnail, ...(product.images || [])].filter(Boolean);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col animate-slideUp">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Product Details</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                SKU: {product.sku || 'N/A'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden">
                <img
                  src={allImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.isHot && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full shadow-lg">
                      🔥 HOT
                    </span>
                  </div>
                )}
                {product.isFeatured && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full shadow-lg">
                      ⭐ Featured
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {allImages.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === idx
                          ? 'border-blue-500 shadow-md'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm mb-1">
                    <BarChart className="w-4 h-4" />
                    <span className="font-medium">Sold</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {product.soldCount || 0}
                  </p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-sm mb-1">
                    <Package className="w-4 h-4" />
                    <span className="font-medium">Stock</span>
                  </div>
                  <p
                    className={`text-2xl font-bold ${
                      product.stock > 10
                        ? 'text-green-600'
                        : product.stock > 0
                          ? 'text-yellow-600'
                          : 'text-red-600'
                    }`}
                  >
                    {product.stock}
                  </p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 text-sm mb-1">
                    <BarChart className="w-4 h-4" />
                    <span className="font-medium">Rating</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {product.rating?.toFixed(1) || '0.0'}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Info */}
            <div className="space-y-6">
              {/* Product Name */}
              <div>
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Product Name
                </label>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {product.name}
                </p>
              </div>

              {/* Price Section */}
              <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Current Price
                    </label>
                    <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <div>
                      <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Original Price
                      </label>
                      <p className="text-xl font-semibold text-gray-400 line-through mt-1">
                        {formatPrice(product.originalPrice)}
                      </p>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold rounded">
                        -
                        {Math.round(
                          ((product.originalPrice - product.price) / product.originalPrice) * 100,
                        )}
                        %
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Description
                </label>
                <p className="text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
                  {product.description || 'No description available'}
                </p>
              </div>

              {/* Category & Brand */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Category
                  </label>
                  <p className="text-gray-900 dark:text-white font-medium mt-1">
                    {product.categoryId?.name || 'N/A'}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Brand
                  </label>
                  <p className="text-gray-900 dark:text-white font-medium mt-1">
                    {product.brand || 'N/A'}
                  </p>
                </div>
              </div>

              {/* Status Tags */}
              <div>
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block">
                  Status
                </label>
                <div className="flex flex-wrap gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      product.inStock
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}
                  >
                    {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                  </span>
                  {product.isHot && (
                    <span className="px-3 py-1 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-full text-xs font-medium">
                      🔥 Hot Deal
                    </span>
                  )}
                  {product.isFeatured && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-full text-xs font-medium">
                      ⭐ Featured
                    </span>
                  )}
                  {product.isOnSale && (
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 rounded-full text-xs font-medium">
                      💰 On Sale
                    </span>
                  )}
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div>
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Created
                  </label>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    {formatDate(product.createdAt)}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Last Updated
                  </label>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    {formatDate(product.updatedAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/30">
          <div className="flex items-center justify-between">
            <a
              href={`/products/${product.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              View on Customer Site
            </a>
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium shadow-sm hover:shadow-md flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
              <button
                onClick={handleEdit}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium shadow-sm hover:shadow-md flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
