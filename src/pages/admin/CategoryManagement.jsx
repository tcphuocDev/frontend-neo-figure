import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, FolderTree } from 'lucide-react';
import { getCategories } from '../../services/api';
import { adminApi } from '../../services/adminApi';

export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const { data } = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingCategory) {
        await adminApi.updateCategory(editingCategory._id, formData);
      } else {
        await adminApi.createCategory(formData);
      }
      setShowModal(false);
      setFormData({ name: '', slug: '', description: '' });
      setEditingCategory(null);
      fetchCategories();
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Failed to save category');
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || '',
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) {
      return;
    }

    try {
      await adminApi.deleteCategory(id);
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Failed to delete category');
    }
  };

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Category Management</h2>
          <p className="text-text-secondary mt-1">Organize products by categories</p>
        </div>
        <button
          onClick={() => {
            setEditingCategory(null);
            setFormData({ name: '', slug: '', description: '' });
            setShowModal(true);
          }}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-dark font-bold rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Category</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="bg-dark-card rounded-lg border border-[#2a2a2a] overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-text-secondary">Loading...</div>
        ) : categories.length === 0 ? (
          <div className="p-8 text-center text-text-secondary">No categories found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
            {categories.map((category) => (
              <div
                key={category._id}
                className="bg-dark p-6 rounded-lg border border-[#2a2a2a] hover:border-primary/50 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FolderTree className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEdit(category)}
                      className="p-2 text-text-secondary hover:text-warning hover:bg-dark-card rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(category._id)}
                      className="p-2 text-text-secondary hover:text-danger hover:bg-dark-card rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-white font-bold text-lg mb-2">{category.name}</h3>
                <p className="text-text-secondary text-sm mb-3">/{category.slug}</p>
                {category.description && (
                  <p className="text-text-secondary text-sm line-clamp-2">{category.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-dark-card rounded-lg border border-[#2a2a2a] max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-white mb-4">
              {editingCategory ? 'Edit Category' : 'Add Category'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-text-secondary text-sm mb-2">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      name: e.target.value,
                      slug: generateSlug(e.target.value),
                    });
                  }}
                  className="w-full px-4 py-2 bg-dark border border-[#2a2a2a] rounded-lg text-white focus:border-primary focus:outline-none"
                  placeholder="Enter category name"
                />
              </div>

              <div>
                <label className="block text-text-secondary text-sm mb-2">Slug *</label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-4 py-2 bg-dark border border-[#2a2a2a] rounded-lg text-white focus:border-primary focus:outline-none"
                  placeholder="category-slug"
                />
              </div>

              <div>
                <label className="block text-text-secondary text-sm mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 bg-dark border border-[#2a2a2a] rounded-lg text-white focus:border-primary focus:outline-none resize-none"
                  rows="3"
                  placeholder="Optional description..."
                />
              </div>

              <div className="flex items-center space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-dark font-bold rounded-lg hover:bg-primary/90 transition-colors"
                >
                  {editingCategory ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingCategory(null);
                    setFormData({ name: '', slug: '', description: '' });
                  }}
                  className="flex-1 px-4 py-2 bg-dark border border-[#2a2a2a] text-white rounded-lg hover:border-primary transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
