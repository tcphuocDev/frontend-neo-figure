import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, ChevronDown, User, LogOut, Settings } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { getCartCount } = useCart();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const categories = [
    { name: 'All Products', path: '/products' },
    { name: 'Gundam', path: '/products?category=gundam' },
    { name: 'Anime Figures', path: '/products?category=anime-figure' },
    { name: 'Nendoroid', path: '/products?category=nendoroid' },
    { name: 'Figma', path: '/products?category=figma' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-dark/95 backdrop-blur-md border-b border-[#2a2a2a] shadow-lg"
    >
      <div className="max-w-14xl mx-auto px-4">
        {/* Main Header - Compact */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="text-xl font-bold bg-gradient-to-r from-primary to-[#0088ff] bg-clip-text text-transparent">
              NEO FIGURE
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-6">
            <div
              className={`flex w-full h-11 overflow-hidden rounded-lg border ${
                searchFocused ? 'border-primary shadow-glow-blue' : 'border-[#2a2a2a]'
              } bg-dark-card transition-all duration-300`}
            >
              {/* Icon */}
              <div className="flex items-center pl-4">
                <Search className="w-4 h-4 text-text-secondary" />
              </div>

              {/* Input */}
              <input
                type="text"
                placeholder="Search for figures, gundam, anime..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="flex-1 px-3 bg-transparent outline-none text-white text-sm placeholder-text-secondary"
              />

              {/* Button */}
              <button
                type="submit"
                className="px-6 bg-primary hover:bg-primary/90 text-dark text-sm font-semibold transition-all duration-300"
              >
                Tìm kiếm
              </button>
            </div>
          </form>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Categories Dropdown - Desktop */}
            <div className="hidden lg:block relative group">
              <button
                className="flex items-center gap-1 px-3 py-2 text-sm text-text-secondary hover:text-primary hover:bg-dark-hover
               rounded-lg transition-colors"
              >
                Categories
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full right-0 mt-1 w-48 bg-dark-card border border-[#2a2a2a] rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                {categories.map((cat, idx) => (
                  <Link
                    key={idx}
                    to={cat.path}
                    className="block px-4 py-2.5 text-sm text-text-secondary hover:text-primary hover:bg-dark-hover first:rounded-t-lg last:rounded-b-lg transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Hot Deals */}
            <Link
              to="/products?isHot=true"
              className="hidden md:flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-secondary hover:text-secondary/80 hover:bg-dark-hover rounded-lg transition-colors"
            >
              <span className="text-base">🔥</span>
              Hot Deals
            </Link>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2 hover:bg-dark-hover rounded-lg transition-colors group"
            >
              <ShoppingCart
                className="w-5 h-5 text-primary group-hover:sc
a               le-110 transition-transform"
              />
              {getCartCount() > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-secondary text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-glow-red"
                >
                  {getCartCount()}
                </motion.span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="hidden md:block relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  onBlur={() => setTimeout(() => setUserMenuOpen(false), 200)}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-dark-hover rounded-lg transition-colors group"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-7 h-7 rounded-full border-2 border-primary"
                    />
                  ) : (
                    <div
                      className="w-7 h-7 rounded
-                     full bg-primary/20 border-2 border-primary flex items-center justify-center"
                    >
                      <User className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  <span className="text-sm text-white max-w-[100px] truncate">{user.name}</span>
                  <ChevronDown className="w-4 h-4 text-text-secondary" />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full right-0 mt-1 w-48 bg-dark-card border border-[#2a2a2a] rounded-lg shadow-xl overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-[#2a2a2a]">
                        <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                        <p className="text-xs text-text-secondary truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          // Navigate to profile page
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-text-secondary hover:text-primary hover:bg-dark-hover transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        My Account
                      </button>
                      <button
                        onClick={() => {
                          logout();
                          setUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-secondary hover:text-secondary/80 hover:bg-dark-hover transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/auth"
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-dark font-semibold rounded-lg transition-colors text-sm"
              >
                <User className="w-4 h-4" />
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-dark-hover rounded-lg transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-primary" />
              ) : (
                <Menu className="w-5 h-5 text-primary" />
              )}
            </button>
          </div>
        </div>

        {/* Quick Navigation - Desktop Only */}
        <nav className="hidden md:flex items-center gap-6 py-2 text-xs border-t border-[#2a2a2a] align-center justify-center">
          <Link to="/products" className="text-text-secondary hover:text-primary transition-colors">
            All Products
          </Link>
          <Link
            to="/products?category=gundam"
            className="text-text-secondary hover:text-primary transition-colors"
          >
            Gundam
          </Link>
          <Link
            to="/products?category=anime-figure"
            className="text-text-secondary hover:text-primary transition-colors"
          >
            Anime Figures
          </Link>
          <Link
            to="/products?category=nendoroid"
            className="text-text-secondary hover:text-primary transition-colors"
          >
            Nendoroid
          </Link>
          <Link
            to="/products?category=figma"
            className="text-text-secondary hover:text-primary transition-colors"
          >
            Figma
          </Link>
          <Link
            to="/products?isFeatured=true"
            className="text-primary hover:text-primary/80 transition-colors font-semibold"
          >
            ⭐ Featured
          </Link>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-[#2a2a2a] bg-dark-card"
          >
            <div className="px-4 py-4 space-y-3">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mb-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-10 px-4 pl-10 bg-dark rounded-lg border border-[#2a2a2a] focus:border-primary focus:outline-none text-white text-sm placeholder-text-secondary"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                </div>
              </form>

              {/* Mobile Links */}
              {categories.map((cat, idx) => (
                <Link
                  key={idx}
                  to={cat.path}
                  className="block py-2 text-sm text-text-secondary hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}
              <Link
                to="/products?isHot=true"
                className="block py-2 text-sm text-secondary hover:text-secondary/80 font-semibold transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                🔥 Hot Deals
              </Link>
              <Link
                to="/products?isFeatured=true"
                className="block py-2 text-sm text-primary hover:text-primary/80 font-semibold transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                ⭐ Featured
              </Link>

              {/* Mobile User Menu */}
              {user ? (
                <>
                  <div className="border-t border-[#2a2a2a] pt-3 mt-3">
                    <div className="flex items-center gap-2 mb-3">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-8 h-8 rounded-full border-2 border-primary"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-semibold text-white">{user.name}</p>
                        <p className="text-xs text-text-secondary">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        // Navigate to profile
                        setMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 py-2 text-sm text-text-secondary hover:text-primary transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      My Account
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 py-2 text-sm text-secondary hover:text-secondary/80 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <Link
                  to="/auth"
                  className="block py-2 px-4 mt-3 bg-primary hover:bg-primary/90 text-dark font-semibold rounded-lg transition-colors text-sm text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login / Register
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
