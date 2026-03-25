import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  Package,
  User,
  Phone,
  MapPin,
  Mail,
  CreditCard,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { createOrder } from "../services/api";

export default function Checkout() {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    email: "",
    address: "",
  });
  const [errors, setErrors] = useState({});

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = "Name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        ...formData,
        items: cart.map((item) => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          thumbnail: item.thumbnail,
        })),
        totalPrice: getCartTotal(),
        status: "pending",
      };

      const { data } = await createOrder(orderData);
      setOrderId(data._id);
      setShowSuccess(true);
      clearCart();
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to create order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate("/");
  };

  if (cart.length === 0 && !showSuccess) {
    return (
      <div className="min-h-screen bg-dark">
        <Header />
        <div className="max-w-14xl mx-auto px-4 py-16 text-center">
          <Package className="w-20 h-20 text-text-muted mx-auto mb-3" />
          <h2 className="text-xl font-bold text-white mb-2">
            Your cart is empty
          </h2>
          <p className="text-text-secondary mb-5 text-sm">
            Add some products before checkout
          </p>
          <Link
            to="/products"
            className="inline-block bg-primary hover:bg-primary/90 text-dark font-bold px-6 py-2.5 rounded-lg transition-all"
          >
            Continue Shopping
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

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
          <Link to="/cart" className="hover:text-primary">
            Cart
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white">Checkout</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-dark-card border border-[#2a2a2a] rounded-lg p-5"
            >
              <h1 className="text-xl font-bold text-white mb-5">Checkout</h1>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Customer Information */}
                <div>
                  <h2 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    Customer Information
                  </h2>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-text-secondary mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleChange}
                        className={`w-full px-3 py-2.5 bg-dark border rounded-lg text-white text-sm outline-none focus:ring-2 transition-all ${
                          errors.customerName
                            ? "border-secondary focus:ring-secondary/50"
                            : "border-[#2a2a2a] focus:border-primary focus:ring-primary/50"
                        }`}
                        placeholder="Enter your full name"
                      />
                      {errors.customerName && (
                        <p className="text-secondary text-xs mt-1">
                          {errors.customerName}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-text-secondary mb-1.5">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`w-full pl-10 pr-3 py-2.5 bg-dark border rounded-lg text-white text-sm outline-none focus:ring-2 transition-all ${
                              errors.phone
                                ? "border-secondary focus:ring-secondary/50"
                                : "border-[#2a2a2a] focus:border-primary focus:ring-primary/50"
                            }`}
                            placeholder="0123456789"
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-secondary text-xs mt-1">
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-text-secondary mb-1.5">
                          Email (Optional)
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full pl-10 pr-3 py-2.5 bg-dark border rounded-lg text-white text-sm outline-none focus:ring-2 transition-all ${
                              errors.email
                                ? "border-secondary focus:ring-secondary/50"
                                : "border-[#2a2a2a] focus:border-primary focus:ring-primary/50"
                            }`}
                            placeholder="your@email.com"
                          />
                        </div>
                        {errors.email && (
                          <p className="text-secondary text-xs mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div>
                  <h2 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    Shipping Address
                  </h2>

                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1.5">
                      Full Address *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows="3"
                      className={`w-full px-3 py-2.5 bg-dark border rounded-lg text-white text-sm outline-none focus:ring-2 transition-all resize-none ${
                        errors.address
                          ? "border-secondary focus:ring-secondary/50"
                          : "border-[#2a2a2a] focus:border-primary focus:ring-primary/50"
                      }`}
                      placeholder="Street address, city, district, ward..."
                    />
                    {errors.address && (
                      <p className="text-secondary text-xs mt-1">
                        {errors.address}
                      </p>
                    )}
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <h2 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-primary" />
                    Payment Method
                  </h2>

                  <div className="bg-dark border border-[#2a2a2a] rounded-lg p-3">
                    <div className="flex items-start gap-2.5">
                      <input
                        type="radio"
                        id="cod"
                        name="payment"
                        checked
                        readOnly
                        className="mt-0.5 accent-primary"
                      />
                      <div className="flex-1">
                        <label
                          htmlFor="cod"
                          className="text-white text-sm font-medium cursor-pointer"
                        >
                          Cash on Delivery (COD)
                        </label>
                        <p className="text-xs text-text-secondary mt-1">
                          Pay with cash when you receive your order
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button - Strong CTA */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-primary to-[#0088ff] hover:from-primary/90 hover:to-[#0088ff]/90 text-dark font-bold py-3.5 rounded-lg transition-all shadow-glow-blue disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Processing..." : "Place Order"}
                </button>
              </form>
            </motion.div>
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

              <div className="space-y-2.5 mb-5 max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item._id} className="flex gap-2.5">
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs font-medium line-clamp-2">
                        {item.name}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-text-secondary text-xs">
                          x{item.quantity}
                        </span>
                        <span className="text-primary font-semibold text-sm">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#2a2a2a] pt-3.5 space-y-2.5">
                <div className="flex justify-between text-sm text-text-secondary">
                  <span>Subtotal</span>
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
            </motion.div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
              onClick={handleSuccessClose}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-dark-card border border-[#2a2a2a] rounded-lg p-6 max-w-md w-full text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <CheckCircle className="w-16 h-16 text-primary mx-auto mb-3" />
                </motion.div>

                <h2 className="text-xl font-bold text-white mb-2">
                  Order Placed Successfully!
                </h2>
                <p className="text-text-secondary text-sm mb-5">
                  Thank you for your order. We'll contact you soon to confirm
                  delivery details.
                </p>

                <div className="bg-dark border border-[#2a2a2a] rounded-lg p-3 mb-5">
                  <p className="text-xs text-text-secondary mb-1">Order ID</p>
                  <p className="text-primary font-mono font-semibold text-sm">
                    {orderId}
                  </p>
                </div>

                <button
                  onClick={handleSuccessClose}
                  className="w-full bg-primary hover:bg-primary/90 text-dark font-bold py-2.5 rounded-lg transition-all"
                >
                  Back to Home
                </button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
