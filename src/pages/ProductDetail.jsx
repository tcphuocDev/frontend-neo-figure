import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  ShoppingCart,
  Heart,
  Minus,
  Plus,
  ChevronRight,
  Package,
  Shield,
  Truck,
  Loader2,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { getProductById, getRelatedProducts } from "../services/api";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const [productRes, relatedRes] = await Promise.all([
        getProductById(id),
        getRelatedProducts(id, 6),
      ]);
      setProduct(productRes.data);
      setRelatedProducts(relatedRes.data);
      setSelectedImage(0);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/cart");
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark">
        <Header />
        <div className="flex items-center justify-center h-[80vh]">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-dark">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl text-white">Product not found</h2>
        </div>
      </div>
    );
  }

  const allImages = [product.thumbnail, ...(product.images || [])];
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  return (
    <div className="min-h-screen bg-dark">
      <Header />

      <div className="max-w-14xl mx-auto px-4 py-6">
        {/* Breadcrumb - Compact */}
        <div className="text-xs text-text-secondary mb-4 flex items-center gap-2">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/products" className="hover:text-primary transition-colors">
            Products
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white font-medium">{product.name}</span>
        </div>

        {/* Product Details - Compact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-10">
          {/* Image Gallery - 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-3"
          >
            {/* Main Image */}
            <div className="relative aspect-square bg-dark-card rounded-lg overflow-hidden border border-[#2a2a2a]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  src={allImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </AnimatePresence>

              {/* Badges */}
              <div className="absolute top-3 left-3 flex gap-2">
                {product.isHot && (
                  <div className="bg-secondary text-white px-2.5 py-1 rounded text-xs font-bold">
                    🔥 HOT
                  </div>
                )}
                {discount > 0 && (
                  <div className="bg-primary text-dark px-2.5 py-1 rounded text-xs font-bold">
                    -{discount}%
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-6 gap-2">
                {allImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-primary"
                        : "border-[#2a2a2a] hover:border-primary/50"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info - 3 columns - Conversion focused */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3 space-y-4"
          >
            {/* Brand/Series */}
            <div className="text-primary text-xs font-semibold uppercase">
              {product.brand} {product.series && `• ${product.series}`}
            </div>

            {/* Title - Large and bold */}
            <h1 className="text-2xl lg:text-3xl font-bold text-white leading-tight">
              {product.name}
            </h1>

            {/* Rating & Sales - Compact */}
            <div className="flex items-center gap-5 text-sm pb-3 border-b border-[#2a2a2a]">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-white font-semibold">
                    {product.rating.toFixed(1)}
                  </span>
                </div>
                <span className="text-text-secondary">
                  ({product.reviewCount})
                </span>
              </div>
              <div className="text-text-secondary">
                <span className="text-white font-semibold">
                  {product.soldCount}
                </span>{" "}
                sold
              </div>
            </div>

            {/* Price - HUGE emphasis */}
            <div className="bg-gradient-to-r from-dark-card to-transparent border border-[#2a2a2a] rounded-lg p-5">
              <div className="flex items-baseline gap-3 mb-2">
                <div className="text-4xl lg:text-5xl font-bold text-primary">
                  {formatPrice(product.price)}
                </div>
                {product.originalPrice && (
                  <div className="text-lg text-text-muted line-through">
                    {formatPrice(product.originalPrice)}
                  </div>
                )}
              </div>
              {product.shortDescription && (
                <p className="text-text-secondary text-sm">
                  {product.shortDescription}
                </p>
              )}
            </div>

            {/* Specifications - Compact grid */}
            {(product.scale ||
              product.height ||
              product.material ||
              product.character) && (
              <div className="grid grid-cols-2 gap-3">
                {product.scale && (
                  <div className="bg-dark-card border border-[#2a2a2a] rounded-lg p-3">
                    <div className="text-text-secondary text-xs">Scale</div>
                    <div className="text-white font-semibold text-sm">
                      {product.scale}
                    </div>
                  </div>
                )}
                {product.height && (
                  <div className="bg-dark-card border border-[#2a2a2a] rounded-lg p-3">
                    <div className="text-text-secondary text-xs">Height</div>
                    <div className="text-white font-semibold text-sm">
                      {product.height}
                    </div>
                  </div>
                )}
                {product.material && (
                  <div className="bg-dark-card border border-[#2a2a2a] rounded-lg p-3">
                    <div className="text-text-secondary text-xs">Material</div>
                    <div className="text-white font-semibold text-sm">
                      {product.material}
                    </div>
                  </div>
                )}
                {product.character && (
                  <div className="bg-dark-card border border-[#2a2a2a] rounded-lg p-3">
                    <div className="text-text-secondary text-xs">Character</div>
                    <div className="text-white font-semibold text-sm">
                      {product.character}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Quantity Selector - Compact */}
            <div>
              <div className="text-white text-sm font-semibold mb-2">
                Quantity
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-[#2a2a2a] rounded-lg overflow-hidden">
                  <button
                    onClick={decreaseQuantity}
                    className="p-2.5 hover:bg-dark-hover transition-colors"
                  >
                    <Minus className="w-4 h-4 text-white" />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 1;
                      setQuantity(Math.min(Math.max(1, val), product.stock));
                    }}
                    className="w-14 bg-transparent text-center text-white outline-none"
                  />
                  <button
                    onClick={increaseQuantity}
                    className="p-2.5 hover:bg-dark-hover transition-colors"
                  >
                    <Plus className="w-4 h-4 text-white" />
                  </button>
                </div>
                <span className="text-text-secondary text-sm">
                  {product.stock} available
                </span>
              </div>
            </div>

            {/* Action Buttons - Strong conversion focus */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 flex items-center justify-center gap-2 bg-dark-hover hover:bg-dark border-2 border-primary text-primary hover:text-primary/90 font-bold py-3.5 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="flex-1 bg-gradient-to-r from-primary to-[#0088ff] hover:from-primary/90 hover:to-[#0088ff]/90 text-dark font-bold py-3.5 rounded-lg transition-all shadow-glow-blue hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>
            </div>

            {/* Features - Compact */}
            <div className="flex gap-4 pt-4 border-t border-[#2a2a2a]">
              <div className="flex items-center gap-2 text-text-secondary text-xs">
                <Truck className="w-4 h-4 text-primary" />
                <span>Free Ship</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary text-xs">
                <Shield className="w-4 h-4 text-primary" />
                <span>Authentic</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary text-xs">
                <Package className="w-4 h-4 text-primary" />
                <span>Safe Pack</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs: Description & Specifications - Compact */}
        <div className="bg-dark-card border border-[#2a2a2a] rounded-lg p-5 mb-10">
          <div className="flex border-b border-[#2a2a2a] mb-4">
            <button
              onClick={() => setActiveTab("description")}
              className={`px-5 py-2.5 text-sm font-semibold transition-colors ${
                activeTab === "description"
                  ? "text-primary border-b-2 border-primary"
                  : "text-text-secondary hover:text-white"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("specifications")}
              className={`px-5 py-2.5 text-sm font-semibold transition-colors ${
                activeTab === "specifications"
                  ? "text-primary border-b-2 border-primary"
                  : "text-text-secondary hover:text-white"
              }`}
            >
              Specifications
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "description" && (
              <motion.div
                key="description"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-text-secondary text-sm leading-relaxed"
              >
                <p>{product.description || product.shortDescription}</p>
              </motion.div>
            )}

            {activeTab === "specifications" && (
              <motion.div
                key="specifications"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-2 gap-3"
              >
                {[
                  { label: "SKU", value: product.sku },
                  { label: "Brand", value: product.brand },
                  { label: "Series", value: product.series },
                  { label: "Character", value: product.character },
                  { label: "Scale", value: product.scale },
                  { label: "Height", value: product.height },
                  { label: "Material", value: product.material },
                  { label: "Stock", value: product.stock },
                ]
                  .filter((item) => item.value)
                  .map((item) => (
                    <div
                      key={item.label}
                      className="flex justify-between py-2 border-b border-[#2a2a2a] text-sm"
                    >
                      <span className="text-text-secondary">{item.label}:</span>
                      <span className="text-white font-medium">
                        {item.value}
                      </span>
                    </div>
                  ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Related Products - Dense 6 columns */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary"></span>
              Related Products
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {relatedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
