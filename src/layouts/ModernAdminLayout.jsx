import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Warehouse,
  BarChart3,
  Settings,
  Menu,
  X,
  Sun,
  Moon,
  Bell,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Users, label: 'Users', path: '/admin/users' },
    { icon: Package, label: 'Products', path: '/admin/products' },
    { icon: ShoppingCart, label: 'Orders', path: '/admin/orders' },
    { icon: Warehouse, label: 'Inventory', path: '/admin/inventory' },
    { icon: BarChart3, label: 'Reports', path: '/admin/reports' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  const isActive = (path) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-admin-bg-primary dark:bg-gray-900 flex">
      {/* SIDEBAR DESKTOP */}
      <aside
        className={`hidden lg:flex flex-col border-r border-admin-border-DEFAULT dark:border-gray-700 bg-admin-bg-card dark:bg-gray-800 transition-all duration-300 shadow-sm
        ${sidebarOpen ? 'w-64' : 'w-20'}`}
      >
        {/* LOGO */}
        <div className="h-16 flex items-center gap-3 px-4 border-b border-admin-border-DEFAULT dark:border-gray-700">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-lg">N</span>
          </div>

          {sidebarOpen && (
            <div>
              <h1 className="font-bold text-admin-text-primary dark:text-white">NEO FIGURE</h1>
              <p className="text-xs text-admin-text-secondary dark:text-gray-400">Admin Panel</p>
            </div>
          )}
        </div>

        {/* MENU */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium
              ${
                isActive(item.path)
                  ? 'bg-primary text-white shadow-md'
                  : 'text-admin-text-secondary dark:text-gray-400 hover:bg-admin-bg-hover dark:hover:bg-gray-700 hover:text-admin-text-primary dark:hover:text-white'
              }`}
            >
              <item.icon size={18} />
              {sidebarOpen && <span className="text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* LOGOUT */}
        <div className="p-4 border-t border-admin-border-DEFAULT dark:border-gray-700">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all font-medium">
            <LogOut size={18} />
            {sidebarOpen && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOP NAVBAR */}
        <nav className="h-16 flex items-center justify-between px-6 border-b border-admin-border-DEFAULT dark:border-gray-700 bg-admin-bg-card dark:bg-gray-800 shadow-sm">
          {/* LEFT */}
          <div className="flex items-center gap-3">
            {/* Toggle sidebar */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden lg:block p-2 hover:bg-admin-bg-hover dark:hover:bg-gray-700 rounded-lg transition-colors"
              title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            >
              <Menu size={20} className="text-admin-text-secondary dark:text-gray-400" />
            </button>

            {/* Mobile menu */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-admin-bg-hover dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Menu size={20} className="text-admin-text-secondary dark:text-gray-400" />
            </button>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-admin-bg-hover dark:hover:bg-gray-700 rounded-lg transition-colors"
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? (
                <Sun size={18} className="text-admin-text-secondary dark:text-gray-400" />
              ) : (
                <Moon size={18} className="text-admin-text-secondary dark:text-gray-400" />
              )}
            </button>

            {/* Notification */}
            <button className="relative p-2 hover:bg-admin-bg-hover dark:hover:bg-gray-700 rounded-lg transition-colors">
              <Bell size={18} className="text-admin-text-secondary dark:text-gray-400" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-800"></span>
            </button>

            {/* Profile */}
            <div className="flex items-center gap-3 pl-3 border-l border-admin-border-DEFAULT dark:border-gray-700">
              <img
                src="https://ui-avatars.com/api/?name=Admin&background=1677FF&color=fff"
                alt="Admin"
                className="w-8 h-8 rounded-full ring-2 ring-admin-border-DEFAULT dark:ring-gray-700"
              />
              <ChevronDown size={16} className="text-admin-text-secondary dark:text-gray-400" />
            </div>
          </div>
        </nav>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-6 overflow-auto bg-admin-bg-primary dark:bg-gray-900">
          <Outlet />
        </main>
      </div>

      {/* MOBILE SIDEBAR */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-admin-bg-card dark:bg-gray-800 shadow-2xl">
            <div className="h-16 flex items-center justify-between px-4 border-b border-admin-border-DEFAULT dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">N</span>
                </div>
                <span className="font-bold text-admin-text-primary dark:text-white">Menu</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-admin-bg-hover dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X size={20} className="text-admin-text-secondary dark:text-gray-400" />
              </button>
            </div>

            <nav className="p-4 space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium
                  ${
                    isActive(item.path)
                      ? 'bg-primary text-white'
                      : 'text-admin-text-secondary dark:text-gray-400 hover:bg-admin-bg-hover dark:hover:bg-gray-700'
                  }`}
                >
                  <item.icon size={18} />
                  <span className="text-sm">{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-admin-border-DEFAULT dark:border-gray-700">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all font-medium">
                <LogOut size={18} />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;
