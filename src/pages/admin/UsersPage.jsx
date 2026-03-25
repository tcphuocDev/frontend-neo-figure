import { useState } from 'react';
import {
  UserPlus,
  Mail,
  Phone,
  Shield,
  Edit,
  Trash2,
  MoreVertical,
} from 'lucide-react';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/admin/Modal';
import { formatDate } from '../../utils/adminUtils';

const UsersPage = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      phone: '0901234567',
      role: 'customer',
      status: 'active',
      orders: 12,
      totalSpent: 15600000,
      joined: '2025-12-15T10:00:00',
    },
    {
      id: 2,
      name: 'Trần Thị B',
      email: 'tranthib@example.com',
      phone: '0912345678',
      role: 'customer',
      status: 'active',
      orders: 8,
      totalSpent: 9200000,
      joined: '2026-01-20T14:30:00',
    },
    {
      id: 3,
      name: 'Lê Minh C',
      email: 'leminhc@example.com',
      phone: '0923456789',
      role: 'admin',
      status: 'active',
      orders: 0,
      totalSpent: 0,
      joined: '2025-11-01T09:00:00',
    },
    {
      id: 4,
      name: 'Phạm Thị D',
      email: 'phamthid@example.com',
      phone: '0934567890',
      role: 'customer',
      status: 'inactive',
      orders: 3,
      totalSpent: 4100000,
      joined: '2026-02-10T16:45:00',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const getRoleBadge = (role) => {
    const styles = {
      admin: 'bg-purple-500/10 text-purple-600',
      customer: 'bg-primary-light text-primary',
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${styles[role]}`}
      >
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-success/10 text-success',
      inactive: 'bg-text-secondary/10 text-text-secondary',
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const columns = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(value)}&background=1677FF&color=fff`}
            alt={value}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-medium text-text-primary dark:text-white">
              {value}
            </p>
            <p className="text-sm text-text-secondary dark:text-gray-400">
              {row.email}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: 'phone',
      label: 'Phone',
      render: (value) => (
        <div className="flex items-center gap-2 text-text-primary dark:text-gray-300">
          <Phone className="w-4 h-4 text-text-secondary" />
          {value}
        </div>
      ),
    },
    {
      key: 'role',
      label: 'Role',
      render: (value) => getRoleBadge(value),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => getStatusBadge(value),
    },
    {
      key: 'orders',
      label: 'Orders',
      sortable: true,
      render: (value) => <span className="font-semibold">{value}</span>,
    },
    {
      key: 'totalSpent',
      label: 'Total Spent',
      sortable: true,
      render: (value) => (
        <span className="font-semibold text-success">
          {new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
          }).format(value)}
        </span>
      ),
    },
    {
      key: 'joined',
      label: 'Joined',
      sortable: true,
      render: (value) => formatDate(value),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setEditingUser(row);
              setIsModalOpen(true);
            }}
            className="p-2 hover:bg-background dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Edit className="w-4 h-4 text-text-secondary dark:text-gray-400" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (confirm(`Delete user ${row.name}?`)) {
                setUsers(users.filter((u) => u.id !== row.id));
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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary dark:text-white mb-1">
            User Management
          </h1>
          <p className="text-text-secondary dark:text-gray-400">
            Manage your customers and admin users
          </p>
        </div>
        <button
          onClick={() => {
            setEditingUser(null);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg"
        >
          <UserPlus className="w-5 h-5" />
          Add User
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-background-card dark:bg-gray-800 rounded-xl shadow-sm border border-border dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary-light rounded-lg">
              <Shield className="w-5 h-5 text-cyan-500" />
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Users
            </p>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {users.length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <Shield className="w-5 h-5 text-emerald-500" />
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Active Users
            </p>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {users.filter((u) => u.status === 'active').length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Shield className="w-5 h-5 text-purple-500" />
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Admins
            </p>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {users.filter((u) => u.role === 'admin').length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-amber-500/10 rounded-lg">
              <Shield className="w-5 h-5 text-amber-500" />
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Customers
            </p>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {users.filter((u) => u.role === 'customer').length}
          </p>
        </div>
      </div>

      {/* Users Table */}
      <DataTable
        data={users}
        columns={columns}
        searchable={true}
        filterable={true}
      />

      {/* User Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingUser ? 'Edit User' : 'Add New User'}
        size="lg"
      >
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 outline-none"
                placeholder="Enter full name"
                defaultValue={editingUser?.name}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 outline-none"
                placeholder="email@example.com"
                defaultValue={editingUser?.email}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone
              </label>
              <input
                type="tel"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 outline-none"
                placeholder="0901234567"
                defaultValue={editingUser?.phone}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Role
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 outline-none"
                defaultValue={editingUser?.role || 'customer'}
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
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
              {editingUser ? 'Save Changes' : 'Create User'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default UsersPage;
