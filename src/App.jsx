import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext.jsx';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import AdminLogin from './pages/AdminLogin';

// Protected Route
import ProtectedAdminRoute from './components/ProtectedAdminRoute';

// Modern Admin Pages
import ModernAdminLayout from './layouts/ModernAdminLayout';
import UltraModernDashboard from './pages/admin/UltraModernDashboard';
import UsersPage from './pages/admin/UsersPage';
import ProductManagement from './pages/admin/ProductManagement';
import ProductForm from './pages/admin/ProductForm';
import OrderManagement from './pages/admin/OrderManagement';
import InventoryPage from './pages/admin/InventoryPage';
import ReportsPage from './pages/admin/ReportsPage';
import SettingsPage from './pages/admin/SettingsPage';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />

            {/* Admin Login */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Admin Routes */}
            <Route element={<ProtectedAdminRoute />}>
              <Route path="/admin" element={<ModernAdminLayout />}>
                <Route index element={<UltraModernDashboard />} />
                <Route path="users" element={<UsersPage />} />
                <Route path="products" element={<ProductManagement />} />
                <Route path="products/new" element={<ProductForm />} />
                <Route path="products/edit/:id" element={<ProductForm />} />
                <Route path="orders" element={<OrderManagement />} />
                <Route path="inventory" element={<InventoryPage />} />
                <Route path="reports" element={<ReportsPage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
