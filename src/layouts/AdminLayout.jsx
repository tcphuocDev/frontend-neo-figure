import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  FolderTree,
  Bot,
  LogOut,
  Menu,
  X,
  Users,
  Upload,
} from 'lucide-react';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      path: '/admin',
      exact: true,
    },
    {
      title: 'Products',
      icon: Package,
      path: '/admin/products',
    },
    {
      title: 'Orders',
      icon: ShoppingCart,
      path: '/admin/orders',
    },
    {
      title: 'Categories',
      icon: FolderTree,
      path: '/admin/categories',
    },
    {
      title: 'Users',
      icon: Users,
      path: '/admin/users',
    },
    {
      title: 'AI Agents',
      icon: Bot,
      path: '/admin/agents',
    },
    {
      title: 'Upload',
      icon: Upload,
      path: '/admin/upload',
    },
  ];

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    // Clear auth data
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-dark flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-dark-card border-r border-[#2a2a2a] transition-all duration-300 flex flex-col fixed h-screen z-50`}
      >
        {/* Header */}
        <div className="p-4 border-b border-[#2a2a2a] flex items-center justify-between">
          {sidebarOpen && (
            <Link to="/admin" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-dark font-bold">N</span>
              </div>
              <span className="text-white font-bold text-lg">NEO ADMIN</span>
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-dark rounded-lg transition-colors"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5 text-text-secondary" />
            ) : (
              <Menu className="w-5 h-5 text-text-secondary" />
            )}
          </button>
        </div>

        {/* Navigation */}
        {/* <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path, item.exact);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  active
                    ? 'bg-primary text-dark font-semibold'
                    : 'text-text-secondary hover:bg-dark hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                {sidebarOpen && <span>{item.title}</span>}
              </Link>
            );
          })}
        </nav> */}

        {/* Footer */}
        {/* <div className="p-4 border-t border-[#2a2a2a]">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-text-secondary hover:bg-dark hover:text-danger transition-all"
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div> */}
      </aside>

      {/* Main Content */}
      <div
        className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}
      >
        {/* Top Bar */}
        <header className="bg-dark-card border-b border-[#2a2a2a] p-4 sticky top-0 z-40">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-white">
              {menuItems.find((item) => isActive(item.path, item.exact))
                ?.title || 'Admin Panel'}
            </h1>
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="text-text-secondary hover:text-primary transition-colors text-sm"
              >
                ← Back to Store
              </Link>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-dark font-bold text-sm">A</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">{/* <Outlet /> */}</main>
      </div>
    </div>
  );
}
