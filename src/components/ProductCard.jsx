import { Link } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Link
        to={`/product/${product._id}`}
        className="block bg-dark-card rounded-lg overflow-hidden border border-[#2a2a2a] hover:border-primary/60 hover:shadow-card-hover transition-all duration-300 group h-full flex flex-col"
      >
        {/* Image Container - Takes 70% height */}
        <div className="relative aspect-[3/4] overflow-hidden bg-dark">
          {/* Skeleton Loader */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-dark-card via-dark-hover to-dark-card animate-pulse" />
          )}

          {/* Product Image */}
          <img
            src={product.thumbnail}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-500 ${
              imageLoaded ? "opacity-100 group-hover:scale-105" : "opacity-0"
            }`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />

          {/* Badges - Top Left */}
          <div className="absolute top-xs left-xs flex flex-col gap-xs z-10">
            {discount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-secondary text-white text-small-text font-bold px-sm py-xs rounded shadow-lg"
              >
                -{discount}%
              </motion.span>
            )}
            {product.isHot && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white text-small-text font-bold px-sm py-xs rounded shadow-lg"
              >
                🔥 HOT
              </motion.span>
            )}
          </div>

          {/* Add to Cart Button - Visible on Hover */}
          <motion.button
            onClick={handleAddToCart}
            className="absolute bottom-xs right-xs w-9 h-9 bg-primary hover:bg-primary/90 text-dark rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg z-10"
            whileTap={{ scale: 0.9 }}
          >
            <ShoppingCart className="w-4 h-4" />
          </motion.button>

          {/* Out of Stock Overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-20">
              <span className="text-white font-bold text-body bg-secondary px-sm py-xs rounded">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Product Info - Compact */}
        <div className="p-sm flex-1 flex flex-col gap-sm">
          {/* Product Name - Smaller than price */}
          <h3 className="text-white text-body font-medium line-clamp-2 group-hover:text-primary transition-colors leading-tight">
            {product.name}
          </h3>

          {/* Rating & Sold - Small and compact */}
          <div className="flex items-center gap-md text-small-text text-text-secondary">
            <div className="flex items-center gap-xs">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span>{product.rating.toFixed(1)}</span>
            </div>
            <div>
              Sold: <span className="font-medium">{product.soldCount}</span>
            </div>
          </div>

          {/* Price - Bold and large emphasis */}
          <div className="mt-auto">
            <div className="flex items-baseline gap-sm">
              <div className="text-primary font-bold text-xl leading-none">
                {formatPrice(product.price)}
              </div>
              {product.originalPrice && (
                <div className="text-text-muted line-through text-small-text">
                  {formatPrice(product.originalPrice)}
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
