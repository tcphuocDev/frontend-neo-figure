import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, TrendingUp, Star } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import {
  getFeaturedProducts,
  getHotProducts,
  getCategories,
} from "../services/api";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [hotProducts, setHotProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [featured, hot, cats] = await Promise.all([
        getFeaturedProducts(6),
        getHotProducts(8),
        getCategories(),
      ]);
      setFeaturedProducts(featured.data);
      setHotProducts(hot.data);
      setCategories(cats.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark" style={{ padding: "0 20px" }}>
      <Header />

      {/* Hero Banner - Compact */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background with overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-card to-dark">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=1920')] opacity-10 bg-cover bg-center" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 w-full max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary via-[#0088ff] to-primary bg-clip-text text-transparent">
                NEO FIGURE
              </span>
            </h1>
            <p className="text-lg md:text-xl text-text-secondary mb-6">
              Premium Anime Figures, Gundam Models & Gaming Collectibles
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-dark font-bold px-6 py-3 rounded-lg transition-all hover:scale-105 shadow-glow-blue"
            >
              <span>Shop Now</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>

        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/20 rounded-full blur-[100px] animate-pulse" />
      </section>

      {/* Promotional Banners */}
      <section className="w-full py-6">
        <div className="max-w-14xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/30 rounded-lg p-5 text-center hover:shadow-glow-blue transition-all group cursor-pointer"
            >
              <div className="text-3xl mb-2">🚚</div>
              <h3 className="text-white font-bold text-base mb-1 group-hover:text-primary transition-colors">
                Free Shipping
              </h3>
              <p className="text-text-secondary text-xs">
                On orders over 1M VND
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-secondary/20 to-secondary/5 border border-secondary/30 rounded-lg p-5 text-center hover:shadow-lg hover:shadow-secondary/20 transition-all group cursor-pointer"
            >
              <div className="text-3xl mb-2">✅</div>
              <h3 className="text-white font-bold text-base mb-1 group-hover:text-secondary transition-colors">
                Authentic Products
              </h3>
              <p className="text-text-secondary text-xs">
                100% genuine collectibles
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-green-500/20 to-green-500/5 border border-green-500/30 rounded-lg p-5 text-center hover:shadow-lg hover:shadow-green-500/20 transition-all group cursor-pointer"
            >
              <div className="text-3xl mb-2">🛡️</div>
              <h3 className="text-white font-bold text-base mb-1 group-hover:text-green-500 transition-colors">
                Warranty Support
              </h3>
              <p className="text-text-secondary text-xs">
                30-day return policy
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories - Large and Centered */}
      <section className="w-full py-10" style={{ marginTop: "15px" }}>
        <div className="max-w-14xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              <span className="bg-gradient-to-r from-primary to-[#0088ff] bg-clip-text text-transparent">
                Browse by Category
              </span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category) => (
                <Link
                  key={category._id}
                  to={`/products?category=${category.slug}`}
                  className="group"
                >
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-dark-card border border-[#2a2a2a] rounded-xl p-6 text-center hover:border-primary hover:shadow-glow-blue transition-all"
                  >
                    <div className="text-5xl mb-3">
                      {getCategoryIcon(category.slug)}
                    </div>
                    <h3 className="text-white text-base font-semibold group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="w-full py-10 bg-dark-card/30">
        <div className="max-w-14xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Welcome to NEO FIGURE
              </span>
            </h2>
            <p className="text-text-secondary text-base leading-relaxed mb-6 max-w-14xl mx-auto">
              Your ultimate destination for premium anime figures, gundam
              models, and collectible merchandise. We bring you authentic
              products from top Japanese brands including Bandai, Good Smile
              Company, and more. Every item in our collection is carefully
              curated to ensure the highest quality for collectors and
              enthusiasts.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-dark-card border border-[#2a2a2a] rounded-lg p-6 hover:border-primary/50 transition-all">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="text-white font-bold text-lg mb-2">
                  Premium Quality
                </h3>
                <p className="text-text-secondary text-sm">
                  Official licensed products from authentic manufacturers
                </p>
              </div>
              <div className="bg-dark-card border border-[#2a2a2a] rounded-lg p-6 hover:border-primary/50 transition-all">
                <div className="text-4xl mb-3">💎</div>
                <h3 className="text-white font-bold text-lg mb-2">
                  Rare Collectibles
                </h3>
                <p className="text-text-secondary text-sm">
                  Exclusive limited editions and hard-to-find items
                </p>
              </div>
              <div className="bg-dark-card border border-[#2a2a2a] rounded-lg p-6 hover:border-primary/50 transition-all">
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="text-white font-bold text-lg mb-2">
                  Fast Delivery
                </h3>
                <p className="text-text-secondary text-sm">
                  Quick and secure shipping to your doorstep
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hot Deals - Dense 4 column grid */}
      {hotProducts.length > 0 && (
        <section className="w-full py-10" style={{ marginTop: "15px" }}>
          <div className="max-w-14xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2
                  className="text-2xl font-bold text-white flex items-center gap-2"
                  style={{ marginBottom: "15px" }}
                >
                  <span className="w-1 h-8 bg-secondary"></span>
                  🔥 Hot Deals
                </h2>
                <Link
                  to="/products?isHot=true"
                  className="flex items-center gap-1 text-sm text-secondary hover:text-secondary/80 transition-colors"
                >
                  <span>View All</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {hotProducts.slice(0, 8).map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Featured Products - Dense 4 column grid */}
      {featuredProducts.length > 0 && (
        <section className="w-full py-10" style={{ marginTop: "15px" }}>
          <div className="max-w-14xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2
                  className="text-2xl font-bold text-white flex items-center gap-2"
                  style={{ marginBottom: "15px" }}
                >
                  <span className="w-1 h-8 bg-primary"></span>⭐ Featured
                  Collection
                </h2>
                <Link
                  to="/products?isFeatured=true"
                  className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  <span>View All</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {featuredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section - Compact */}
      <section className="w-full py-12" style={{ margin: "15px 0" }}>
        <div className="max-w-14xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30 rounded-xl p-10 text-center"
          >
            <TrendingUp className="w-14 h-14 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Discover Amazing Collectibles
            </h2>
            <p className="text-text-secondary mb-6 max-w-14xl mx-auto text-base">
              Explore our extensive collection of premium anime figures, gundam
              models, and gaming merchandise from top brands.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-dark font-bold px-8 py-3 rounded-lg transition-all hover:scale-105 shadow-glow-blue"
            >
              <span>Browse All Products</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Helper function for category icons
function getCategoryIcon(slug) {
  const icons = {
    gundam: "🤖",
    "anime-figure": "🎭",
    "scale-figure": "🗿",
    nendoroid: "🧸",
    figma: "🎪",
    "model-kit": "🔧",
  };
  return icons[slug] || "📦";
}
