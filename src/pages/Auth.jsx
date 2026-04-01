import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  AlertCircle,
  Sparkles,
  Heart,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Auth() {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [particles, setParticles] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Generate floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        await login(form.email, form.password);
      } else {
        await register(form.name, form.email, form.password);
      }
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a0f] via-[#1a0a2e] to-[#0f051d] px-4 relative overflow-hidden">
      {/* Animated Background Gradient Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 blur-[120px] rounded-full top-[-200px] left-[-200px]"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute w-[500px] h-[500px] bg-gradient-to-r from-pink-500/20 via-rose-500/20 to-red-500/20 blur-[120px] rounded-full bottom-[-150px] right-[-150px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-[400px] h-[400px] bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 blur-[100px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
        className="relative w-full max-w-md z-10"
      >
        {/* Decorative Elements */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-6 -right-6 text-pink-400"
        >
          <Heart size={40} fill="currentColor" className="opacity-60" />
        </motion.div>
        <motion.div
          animate={{
            rotate: [360, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-4 -left-4 text-cyan-400"
        >
          <Star size={32} fill="currentColor" className="opacity-70" />
        </motion.div>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
          className="absolute -bottom-8 -right-8 text-purple-400"
        >
          <Sparkles size={36} className="opacity-50" />
        </motion.div>

        {/* Main Card */}
        <div className="relative backdrop-blur-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent border-2 border-white/20 rounded-3xl p-8 shadow-[0_0_80px_rgba(0,206,255,0.3),0_0_40px_rgba(255,0,150,0.2)] overflow-hidden">
          {/* Animated Border Glow */}
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl"
          />

          {/* Inner Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-pink-500/5 rounded-3xl" />

          <div className="relative z-10">
            {/* Title with Animation */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-4xl font-extrabold text-center mb-2">
                <motion.span
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="bg-gradient-to-r from-cyan-400 via-purple-400 via-pink-400 to-cyan-400 bg-[length:200%_auto] bg-clip-text text-transparent"
                  style={{ display: "inline-block" }}
                >
                  {isLogin ? "✨ Welcome Back!" : "🌟 Join Us!"}
                </motion.span>
              </h2>
              <p className="text-center text-gray-400 text-sm mb-6">
                {isLogin
                  ? "Continue your adventure"
                  : "Start your journey today"}
              </p>
            </motion.div>

            {/* Toggle */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex mb-md bg-black/30 backdrop-blur-sm rounded-2xl p-xs border border-white/10"
            >
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className={`relative flex-1 py-sm rounded-xl text-body font-bold transition-all duration-300 ${
                  isLogin ? "text-white" : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {isLogin && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl shadow-[0_0_30px_rgba(0,206,255,0.6)]"
                    transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">🔐 Login</span>
              </button>
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className={`relative flex-1 py-sm rounded-xl text-body font-bold transition-all duration-300 ${
                  !isLogin ? "text-white" : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {!isLogin && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl shadow-[0_0_30px_rgba(255,0,150,0.6)]"
                    transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">✨ Register</span>
              </button>
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="gap-md flex flex-col">
              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.9 }}
                    className="flex items-center gap-sm p-sm bg-red-500/20 backdrop-blur-sm border-2 border-red-500/50 rounded-xl text-red-300 text-body shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                  >
                    <AlertCircle size={18} />
                    <span className="font-medium">{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div
                    key="name"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FloatingInput
                      icon={<User size={18} className="text-purple-400" />}
                      label="Full Name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <FloatingInput
                icon={<Mail size={18} className="text-cyan-400" />}
                label="Email Address"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />

              <FloatingInput
                icon={<Lock size={18} className="text-pink-400" />}
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                }
              />

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className={`relative w-full h-12 rounded-xl font-bold text-base overflow-hidden transition-all duration-300 ${
                  loading ? "cursor-not-allowed" : ""
                }`}
              >
                <motion.div
                  animate={{
                    backgroundPosition: loading
                      ? ["0% 50%", "100% 50%", "0% 50%"]
                      : "0% 50%",
                  }}
                  transition={{
                    duration: 3,
                    repeat: loading ? Infinity : 0,
                    ease: "linear",
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 via-purple-500 to-pink-500 bg-[length:200%_auto]"
                />
                <motion.div
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />
                <span className="relative z-10 text-white drop-shadow-lg">
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        ⚡
                      </motion.span>
                      Processing...
                    </span>
                  ) : isLogin ? (
                    "🚀 Let's Go!"
                  ) : (
                    "✨ Create Account"
                  )}
                </span>
                <motion.div
                  className="absolute inset-0 shadow-[0_0_40px_rgba(0,206,255,0.6)]"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              </motion.button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-md">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
              />
              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="px-sm text-small-text text-gray-400 font-semibold"
              >
                ⭐
              </motion.span>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent"
              />
            </div>

            {/* Social Login */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="gap-sm flex flex-col"
            >
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className="w-full h-11 border-2 border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/30 rounded-xl text-white text-body font-medium transition-all duration-300 flex items-center justify-center gap-sm shadow-lg"
              >
                <span className="text-lg">🌐</span>
                Continue with Google
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className="w-full h-11 border-2 border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/30 rounded-xl text-white text-body font-medium transition-all duration-300 flex items-center justify-center gap-sm shadow-lg"
              >
                <span className="text-lg">📘</span>
                Continue with Facebook
              </motion.button>
            </motion.div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <p className="text-center text-gray-400 text-body mt-md">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-sm text-transparent bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text font-bold hover:from-cyan-300 hover:to-pink-300 transition-all"
                >
                  {isLogin ? "Register Now! ✨" : "Login Here! 🚀"}
                </button>
              </p>

              <Link
                to="/"
                className="block text-center text-gray-500 text-body mt-sm hover:text-gray-300 transition-colors"
              >
                ← Back to Home
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* Floating Input Component with Anime Style */
function FloatingInput({
  icon,
  label,
  name,
  type = "text",
  value,
  onChange,
  rightIcon,
  required = false,
  minLength,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="relative"
    >
      {/* Glow Effect on Focus */}
      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 blur-xl rounded-xl"
          />
        )}
      </AnimatePresence>

      <div className="relative">
        {/* Icon */}
        <motion.div
          animate={{
            scale: isFocused ? [1, 1.2, 1] : 1,
          }}
          transition={{
            duration: 0.3,
          }}
          className="absolute left-md top-1/2 -translate-y-1/2 z-10 flex items-center justify-center"
        >
          {icon}
        </motion.div>

        {/* Floating Label */}
        <motion.label
          initial={false}
          animate={{
            top: isFocused || hasValue ? "8px" : "50%",
            fontSize: isFocused || hasValue ? "11px" : "13px",
            translateY: isFocused || hasValue ? "0%" : "-50%",
          }}
          transition={{
            duration: 0.2,
            ease: "easeOut",
          }}
          className={`absolute left-14 pointer-events-none z-10 px-1 transition-colors duration-300
            ${
              isFocused || hasValue
                ? "font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
                : "text-gray-400"
            }
          `}
          style={{
            transformOrigin: "left center",
          }}
        >
          {label}
        </motion.label>

        {/* Input Field */}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          minLength={minLength}
          className={`w-full h-12 pl-14 pr-12 pt-sm pb-xs bg-black/30 backdrop-blur-sm border-2 rounded-xl text-white text-body outline-none transition-all duration-300 ${
            isFocused
              ? "border-cyan-400 shadow-[0_0_20px_rgba(0,206,255,0.4)]"
              : "border-white/20 hover:border-white/30"
          }`}
        />

        {/* Right Icon */}
        {rightIcon && (
          <div className="absolute right-md top-1/2 -translate-y-1/2 z-10 flex items-center justify-center">
            {rightIcon}
          </div>
        )}

        {/* Bottom Border Animation */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isFocused ? 1 : 0 }}
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full"
          style={{ originX: 0.5 }}
        />
      </div>
    </motion.div>
  );
}
