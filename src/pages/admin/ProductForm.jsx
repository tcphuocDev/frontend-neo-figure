import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { getCategories } from '../../services/api';
import { adminApi } from '../../services/adminApi';

export default function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    sku: '',
    price: 0,
    originalPrice: 0,
    isOnSale: false,
    thumbnail: '',
    images: [],
    categoryId: '',
    stock: 0,
    inStock: true,
    rating: 0,
    reviewCount: 0,
    soldCount: 0,
    brand: '',
    series: '',
    character: '',
    material: '',
    height: '',
    scale: '',
    shortDescription: '',
    description: '',
    tags: '',
    isHot: false,
    isFeatured: false,
  });

  useEffect(() => {
    fetchCategories();
    if (isEdit) {
      fetchProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchCategories = async () => {
    try {
      const { data } = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProduct = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/products/${id}`);
      const product = await response.json();
      setFormData({
        ...product,
        categoryId: product.categoryId?._id || '',
        tags: product.tags?.join(', ') || '',
      });
    } catch (error) {
      console.error('Error fetching product:', error);
      alert('Failed to load product');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageUpload = async (e, field = 'thumbnail') => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const { data } = await adminApi.uploadImage(file);
      if (field === 'thumbnail') {
        setFormData({ ...formData, thumbnail: data.url });
      } else {
        setFormData({ ...formData, images: [...formData.images, data.url] });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    setFormData({
      ...formData,
      name,
      slug: generateSlug(name),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Nếu On Sale, originalPrice phải lớn hơn price
    if (formData.isOnSale && formData.originalPrice) {
      const price = Number(formData.price);
      const originalPrice = Number(formData.originalPrice);

      if (price >= originalPrice) {
        alert('❌ Lỗi: Original Price (giá gốc) phải LỚN HƠN Selling Price (giá sale)!\n\n' +
              'Ví dụ đúng:\n' +
              '- Selling Price: 800,000₫ (giá sau giảm)\n' +
              '- Original Price: 1,000,000₫ (giá gốc, sẽ bị gạch)');
        return;
      }
    }

    setLoading(true);

    try {
      const submitData = {
        ...formData,
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice),
        stock: Number(formData.stock),
        rating: Number(formData.rating),
        reviewCount: Number(formData.reviewCount),
        soldCount: Number(formData.soldCount),
        tags: formData.tags ? formData.tags.split(',').map((t) => t.trim()) : [],
      };

      if (isEdit) {
        await adminApi.updateProduct(id, submitData);
        alert('Product updated successfully!');
      } else {
        await adminApi.createProduct(submitData);
        alert('Product created successfully!');
      }
      navigate('/admin/products');
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-md">
      {/* Header */}
      <div className="flex items-center gap-md">
        <button
          onClick={() => navigate('/admin/products')}
          className="p-2 hover:bg-white dark:bg-gray-800 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
        <div>
          <h2 className="text-heading-lg font-bold text-gray-900 dark:text-white">
            {isEdit ? 'Edit Product' : 'Add New Product'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-xs">
            {isEdit ? 'Update product information' : 'Create a new product listing'}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-md">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-md">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-md">
            {/* Basic Information */}
            <div className="bg-white dark:bg-gray-800 p-md rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-md">Basic Information</h3>
              <div className="space-y-md">
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-xs">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleNameChange}
                    required
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-xs">
                    Slug *
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-md">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-xs">
                      SKU *
                    </label>
                    <input
                      type="text"
                      name="sku"
                      value={formData.sku}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-xs">
                      Category *
                    </label>
                    <select
                      name="categoryId"
                      value={formData.categoryId}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none"
                    >
                      <option value="">Select category</option>
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-xs">
                    Short Description
                  </label>
                  <textarea
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-xs">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="bg-white dark:bg-gray-800 p-md rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-md">Product Details</h3>
              <div className="grid grid-cols-2 gap-md">
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-xs">
                    Brand
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-xs">
                    Series
                  </label>
                  <input
                    type="text"
                    name="series"
                    value={formData.series}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-xs">
                    Character
                  </label>
                  <input
                    type="text"
                    name="character"
                    value={formData.character}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-xs">
                    Material
                  </label>
                  <input
                    type="text"
                    name="material"
                    value={formData.material}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-xs">
                    Height
                  </label>
                  <input
                    type="text"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-xs">
                    Scale
                  </label>
                  <input
                    type="text"
                    name="scale"
                    value={formData.scale}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-md">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-xs">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="action, limited edition, pre-order"
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-md">
            {/* Pricing */}
            <div className="bg-white dark:bg-gray-800 p-md rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-md">Pricing</h3>

              {/* Info Box */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-md">
                <div className="flex gap-2">
                  <div className="text-blue-600 dark:text-blue-400 text-sm">
                    <strong>📌 Cách hoạt động:</strong>
                    <ul className="mt-1 space-y-1 list-disc list-inside">
                      <li><strong>Selling Price</strong> = Giá hiển thị TO, ĐẬM cho khách (giá sau giảm nếu đang sale)</li>
                      <li><strong>Original Price</strong> = Giá gốc cao hơn, sẽ bị GẠCH NGANG khi có sale</li>
                      <li>Ví dụ: Sale Price = 800k → Original Price = 1,000k</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-md">
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-xs">
                    Selling Price (VND) * {formData.isOnSale && <span className="text-blue-500">← Giá sau giảm (Sale Price)</span>}
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    placeholder="Giá bán hiện tại"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isOnSale"
                      checked={formData.isOnSale}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-900 dark:text-white">On Sale (Đang giảm giá)</span>
                  </label>
                </div>

                {formData.isOnSale && (
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-xs">
                      Original Price (VND) <span className="text-red-500">← Giá GỐC (cao hơn, sẽ bị gạch)</span>
                    </label>
                    <input
                      type="number"
                      name="originalPrice"
                      value={formData.originalPrice}
                      onChange={handleInputChange}
                      placeholder="Giá trước khi giảm"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none"
                    />
                    {formData.originalPrice && formData.price >= formData.originalPrice && (
                      <p className="text-red-500 text-xs mt-1">⚠️ Original Price phải lớn hơn Selling Price!</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Inventory */}
            <div className="bg-white dark:bg-gray-800 p-md rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-md">Inventory</h3>
              <div className="space-y-md">
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-xs">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="inStock"
                      checked={formData.inStock}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-900 dark:text-white">In Stock</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="bg-white dark:bg-gray-800 p-md rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-md">Images</h3>
              <div className="space-y-md">
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-xs">
                    Thumbnail *
                  </label>
                  {formData.thumbnail ? (
                    <div className="relative">
                      <img
                        src={formData.thumbnail}
                        alt="Thumbnail"
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, thumbnail: '' })}
                        className="absolute top-2 right-2 p-1 bg-red-600 rounded-full hover:bg-red-600/80"
                      >
                        <X className="w-4 h-4 text-gray-900 dark:text-white" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:border-primary transition-colors">
                      <Upload className="w-8 h-8 text-gray-600 dark:text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {uploadingImage ? 'Uploading...' : 'Click to upload'}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'thumbnail')}
                        className="hidden"
                        disabled={uploadingImage}
                      />
                    </label>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-xs">
                    Gallery Images
                  </label>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    {formData.images.map((img, index) => (
                      <div key={index} className="relative">
                        <img
                          src={img}
                          alt={`Gallery ${index}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 p-1 bg-red-600 rounded-full hover:bg-red-600/80"
                        >
                          <X className="w-3 h-3 text-gray-900 dark:text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:border-primary transition-colors">
                    <Upload className="w-6 h-6 text-gray-600 dark:text-gray-400 mb-1" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {uploadingImage ? 'Uploading...' : 'Add more'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'images')}
                      className="hidden"
                      disabled={uploadingImage}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Flags */}
            <div className="bg-white dark:bg-gray-800 p-md rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-md">Flags</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isHot"
                    checked={formData.isHot}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-900 dark:text-white">🔥 Hot Product</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-900 dark:text-white">⭐ Featured Product</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-md bg-white dark:bg-gray-800 p-md rounded-lg border border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="px-md py-sm border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white hover:bg-gray-50 dark:bg-gray-900 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-md py-sm bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700/90 transition-colors disabled:opacity-50"
          >
            {loading ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
}
