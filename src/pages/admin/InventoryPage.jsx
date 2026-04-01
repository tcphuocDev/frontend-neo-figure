import { useState } from 'react';
import {
  Package,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Plus,
  Edit,
  Trash2,
} from 'lucide-react';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/admin/Modal';
import { formatPrice } from '../../utils/adminUtils';

const InventoryPage = () => {
  const [inventory, setInventory] = useState([
    {
      id: 1,
      sku: 'GDM-RX78-001',
      product: 'Gundam RX-78-2 Ver.Ka',
      category: 'Gundam',
      stock: 45,
      reorderLevel: 20,
      cost: 1000000,
      price: 1250000,
      supplier: 'Bandai',
      lastRestocked: '2026-03-01T10:00:00',
      status: 'in_stock',
    },
    {
      id: 2,
      sku: 'ONP-LUF-002',
      product: 'One Piece Luffy Gear 5',
      category: 'One Piece',
      stock: 12,
      reorderLevel: 15,
      cost: 680000,
      price: 850000,
      supplier: 'Megahouse',
      lastRestocked: '2026-02-28T14:30:00',
      status: 'low_stock',
    },
    {
      id: 3,
      sku: 'NAR-UZU-003',
      product: 'Naruto Uzumaki Sage Mode',
      category: 'Naruto',
      stock: 0,
      reorderLevel: 10,
      cost: 1600000,
      price: 2100000,
      supplier: 'Tsume Art',
      lastRestocked: '2026-02-15T09:00:00',
      status: 'out_of_stock',
    },
    {
      id: 4,
      sku: 'DBZ-GKU-004',
      product: 'Dragon Ball Z Goku Ultra Instinct',
      category: 'Dragon Ball',
      stock: 28,
      reorderLevel: 15,
      cost: 1150000,
      price: 1450000,
      supplier: 'Banpresto',
      lastRestocked: '2026-03-02T16:45:00',
      status: 'in_stock',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const getStatusBadge = (status, stock, reorderLevel) => {
    let finalStatus = status;

    if (stock === 0) finalStatus = 'out_of_stock';
    else if (stock <= reorderLevel) finalStatus = 'low_stock';
    else finalStatus = 'in_stock';

    const styles = {
      in_stock: 'bg-success/10 text-success',
      low_stock: 'bg-warning/10 text-warning',
      out_of_stock: 'bg-error/10 text-error',
    };

    const labels = {
      in_stock: 'In Stock',
      low_stock: 'Low Stock',
      out_of_stock: 'Out of Stock',
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${styles[finalStatus]}`}
      >
        {labels[finalStatus]}
      </span>
    );
  };

  const columns = [
    {
      key: 'sku',
      label: 'SKU',
      sortable: true,
      render: (value) => (
        <span className="font-mono font-medium text-primary">{value}</span>
      ),
    },
    {
      key: 'product',
      label: 'Product',
      sortable: true,
      render: (value) => <span className="font-medium">{value}</span>,
    },
    {
      key: 'category',
      label: 'Category',
      sortable: true,
    },
    {
      key: 'stock',
      label: 'Stock',
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center gap-2">
          <span className="font-semibold">{value}</span>
          {value <= row.reorderLevel && value > 0 && (
            <AlertCircle className="w-4 h-4 text-warning" />
          )}
        </div>
      ),
    },
    {
      key: 'reorderLevel',
      label: 'Reorder Level',
      sortable: true,
    },
    {
      key: 'cost',
      label: 'Cost',
      sortable: true,
      render: (value) => (
        <span className="text-text-secondary dark:text-gray-400">
          {formatPrice(value)}
        </span>
      ),
    },
    {
      key: 'price',
      label: 'Price',
      sortable: true,
      render: (value) => (
        <span className="font-semibold text-success">{formatPrice(value)}</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value, row) =>
        getStatusBadge(value, row.stock, row.reorderLevel),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setEditingItem(row);
              setIsModalOpen(true);
            }}
            className="p-2 hover:bg-background dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Edit className="w-4 h-4 text-text-secondary dark:text-gray-400" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (confirm(`Delete ${row.product}?`)) {
                setInventory(inventory.filter((i) => i.id !== row.id));
              }
            }}
            className="p-2 hover:bg-error/10 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4 text-error" />
          </button>
        </div>
      ),
    },
  ];

  const totalValue = inventory.reduce(
    (sum, item) => sum + item.stock * item.cost,
    0,
  );
  const lowStockItems = inventory.filter(
    (item) => item.stock <= item.reorderLevel && item.stock > 0,
  ).length;
  const outOfStockItems = inventory.filter((item) => item.stock === 0).length;

  return (
    <div className="space-y-sm">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary dark:text-white mb-1">
            Inventory Management
          </h1>
          <p className="text-text-secondary dark:text-gray-400">
            Track and manage your product inventory
          </p>
        </div>
        <button
          onClick={() => {
            setEditingItem(null);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Add Item
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-sm">
        <div className="bg-background-card dark:bg-gray-800 rounded-xl shadow-sm border border-border dark:border-gray-700 p-6">
          <div className="flex items-center gap-xs mb-xs">
            <div className="p-xs bg-primary-light rounded-lg">
              <Package className="w-4 h-4 text-primary" />
            </div>
            <p className="text-sm font-medium text-text-secondary dark:text-gray-400">
              Total Items
            </p>
          </div>
          <p className="text-2xl font-bold text-text-primary dark:text-white">
            {inventory.length}
          </p>
        </div>
        <div className="bg-background-card dark:bg-gray-800 rounded-xl shadow-sm border border-border dark:border-gray-700 p-sm">
          <div className="flex items-center gap-xs mb-xs">
            <div className="p-xs bg-success/10 rounded-lg">
              <TrendingUp className="w-4 h-4 text-success" />
            </div>
            <p className="text-sm font-medium text-text-secondary dark:text-gray-400">
              Total Value
            </p>
          </div>
          <p className="text-2xl font-bold text-text-primary dark:text-white">
            {formatPrice(totalValue)}
          </p>
        </div>
        <div className="bg-background-card dark:bg-gray-800 rounded-xl shadow-sm border border-border dark:border-gray-700 p-sm">
          <div className="flex items-center gap-xs mb-xs">
            <div className="p-xs bg-warning/10 rounded-lg">
              <AlertCircle className="w-4 h-4 text-warning" />
            </div>
            <p className="text-sm font-medium text-text-secondary dark:text-gray-400">
              Low Stock
            </p>
          </div>
          <p className="text-2xl font-bold text-text-primary dark:text-white">
            {lowStockItems}
          </p>
        </div>
        <div className="bg-background-card dark:bg-gray-800 rounded-xl shadow-sm border border-border dark:border-gray-700 p-sm">
          <div className="flex items-center gap-xs mb-xs">
            <div className="p-xs bg-error/10 rounded-lg">
              <TrendingDown className="w-4 h-4 text-error" />
            </div>
            <p className="text-sm font-medium text-text-secondary dark:text-gray-400">
              Out of Stock
            </p>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {outOfStockItems}
          </p>
        </div>
      </div>

      {/* Inventory Table */}
      <DataTable
        data={inventory}
        columns={columns}
        searchable={true}
        filterable={true}
      />

      {/* Inventory Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit Inventory Item' : 'Add New Item'}
        size="lg"
      >
        <form className="space-y-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-sm\">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                SKU
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 outline-none font-mono"
                placeholder="GDM-RX78-001"
                defaultValue={editingItem?.sku}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Product Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 outline-none"
                placeholder="Product name"
                defaultValue={editingItem?.product}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-sm\">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Stock Quantity
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 outline-none"
                placeholder="0"
                defaultValue={editingItem?.stock}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Reorder Level
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 outline-none"
                placeholder="0"
                defaultValue={editingItem?.reorderLevel}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 outline-none"
                placeholder="Category"
                defaultValue={editingItem?.category}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-sm\">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cost Price (VNĐ)
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 outline-none"
                placeholder="0"
                defaultValue={editingItem?.cost}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Selling Price (VNĐ)
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 outline-none"
                placeholder="0"
                defaultValue={editingItem?.price}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Supplier
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 outline-none"
              placeholder="Supplier name"
              defaultValue={editingItem?.supplier}
            />
          </div>
          <div className="flex justify-end gap-2 pt-sm\">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-200 font-medium"
            >
              {editingItem ? 'Save Changes' : 'Add Item'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default InventoryPage;
