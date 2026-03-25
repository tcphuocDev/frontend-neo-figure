import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, getCartCount } =
    useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(item._id);
    } else {
      updateQuantity(item._id, newQuantity);
    }
  };

  return (
    <div className="min-h-screen bg-dark">
      <Header />

      <div className="max-w-14xl mx-auto px-4 py-6">
        {/* Breadcrumb - Compact */}
        <div className="text-xs text-text-secondary mb-4">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white">Shopping Cart</span>
        </div>

        {cart.length === 0 ? (
          /* Empty Cart */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-dark-card border border-[#2a2a2a] rounded-lg p-10 text-center"
          >
            <ShoppingBag className="w-20 h-20 text-text-muted mx-auto mb-3" />
            <h2 className="text-xl font-bold text-white mb-2">
              Your cart is empty
            </h2>
            <p className="text-text-secondary mb-5 text-sm">
              Add some awesome figures to get started!
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-dark font-bold px-6 py-2.5 rounded-lg transition-all"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-3">
              <h1 className="text-2xl font-bold text-white mb-4">
                Shopping Cart ({getCartCount()} items)
              </h1>

              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="bg-dark-card border border-[#2a2a2a] rounded-lg p-4 hover:border-primary/30 transition-all"
                  >
                    <div className="flex gap-3">
                      {/* Product Image */}
                      <Link
                        to={`/product/${item._id}`}
                        className="flex-shrink-0 w-20 h-20 bg-dark rounded-lg overflow-hidden"
                      >
                        <img
                          src={item.thumbnail}
                          alt={item.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform"
                        />
                      </Link>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/product/${item._id}`}
                          className="text-white text-sm font-semibold hover:text-primary transition-colors line-clamp-2"
                        >
                          {item.name}
                        </Link>
                        <p className="text-xs text-text-secondary mt-1">
                          {item.brand} {item.series && `• ${item.series}`}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-primary font-bold">
                            {formatPrice(item.price)}
                          </span>
                          {item.originalPrice && (
                            <span className="text-xs text-text-muted line-through">
                              {formatPrice(item.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex flex-col items-end gap-2">
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-text-secondary hover:text-secondary transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="flex items-center border border-[#2a2a2a] rounded overflow-hidden">
                          <button
                            onClick={() =>
                              handleQuantityChange(item, item.quantity - 1)
                            }
                            className="p-1.5 hover:bg-dark-hover transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5 text-white" />
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => {
                              const val = parseInt(e.target.value) || 1;
                              handleQuantityChange(item, val);
                            }}
                            className="w-10 bg-transparent text-center text-white text-sm outline-none"
                          />
                          <button
                            onClick={() =>
                              handleQuantityChange(item, item.quantity + 1)
                            }
                            className="p-1.5 hover:bg-dark-hover transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5 text-white" />
                          </button>
                        </div>

                        {/* Subtotal */}
                        <div className="text-white font-bold text-sm">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary - Sticky */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-dark-card border border-[#2a2a2a] rounded-lg p-5 sticky top-24"
              >
                <h2 className="text-lg font-bold text-white mb-4">
                  Order Summary
                </h2>

                <div className="space-y-2.5 mb-5">
                  <div className="flex justify-between text-sm text-text-secondary">
                    <span>Subtotal ({getCartCount()} items)</span>
                    <span className="text-white font-medium">
                      {formatPrice(getCartTotal())}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-text-secondary">
                    <span>Shipping</span>
                    <span className="text-primary font-medium">Free</span>
                  </div>
                  <div className="border-t border-[#2a2a2a] pt-2.5 flex justify-between text-lg font-bold">
                    <span className="text-white">Total</span>
                    <span className="text-primary">
                      {formatPrice(getCartTotal())}
                    </span>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  className="block w-full bg-gradient-to-r from-primary to-[#0088ff] hover:from-primary/90 hover:to-[#0088ff]/90 text-dark text-center font-bold py-3.5 rounded-lg transition-all shadow-glow-blue mb-2.5"
                >
                  Proceed to Checkout
                </Link>

                <Link
                  to="/products"
                  className="block w-full bg-dark-hover hover:bg-dark border border-[#2a2a2a] text-white text-center font-medium py-2.5 rounded-lg transition-all text-sm"
                >
                  Continue Shopping
                </Link>

                {/* Trust Badges */}
                <div className="mt-5 pt-5 border-t border-[#2a2a2a] space-y-2.5 text-xs text-text-secondary">
                  <div className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Free shipping on all orders</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>100% authentic products</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
