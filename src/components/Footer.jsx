import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dark-card border-t border-[#2a2a2a] mt-12">
      <div className="max-w-14xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Company Info */}
          <div>
            <h3 className="text-base font-bold bg-gradient-to-r from-primary to-[#0088ff] bg-clip-text text-transparent mb-3">
              NEO FIGURE
            </h3>
            <p className="text-text-secondary text-xs mb-3 leading-relaxed">
              Your premium destination for anime figures, gundam models, and
              collectibles.
            </p>
            <div className="flex gap-2">
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-dark-hover hover:bg-primary hover:text-dark transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-dark-hover hover:bg-primary hover:text-dark transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-dark-hover hover:bg-primary hover:text-dark transition-all"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-dark-hover hover:bg-primary hover:text-dark transition-all"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3">
              Quick Links
            </h4>
            <ul className="space-y-1.5 text-text-secondary text-xs">
              <li>
                <Link
                  to="/products"
                  className="hover:text-primary transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/products?isHot=true"
                  className="hover:text-primary transition-colors"
                >
                  Hot Deals
                </Link>
              </li>
              <li>
                <Link
                  to="/products?isFeatured=true"
                  className="hover:text-primary transition-colors"
                >
                  Featured
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="hover:text-primary transition-colors"
                >
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3">
              Categories
            </h4>
            <ul className="space-y-1.5 text-text-secondary text-xs">
              <li>
                <Link
                  to="/products?category=gundam"
                  className="hover:text-primary transition-colors"
                >
                  Gundam Models
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=anime-figure"
                  className="hover:text-primary transition-colors"
                >
                  Anime Figures
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=nendoroid"
                  className="hover:text-primary transition-colors"
                >
                  Nendoroid
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=figma"
                  className="hover:text-primary transition-colors"
                >
                  Figma
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=scale-figure"
                  className="hover:text-primary transition-colors"
                >
                  Scale Figures
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3">Support</h4>
            <ul className="space-y-1.5 text-text-secondary text-xs">
              <li>Email: support@neofigure.com</li>
              <li>Phone: +84 123 456 789</li>
              <li>Address: Ho Chi Minh City, Vietnam</li>
              <li className="pt-1.5">
                <span className="text-white">Business Hours:</span>
                <br />
                Mon - Sat: 9:00 AM - 9:00 PM
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#2a2a2a] mt-6 pt-5 text-center text-text-secondary text-xs">
          <p>
            &copy; {new Date().getFullYear()} NEO FIGURE. All rights reserved.
          </p>
          <p className="mt-2">Made with ❤️ for anime & gaming enthusiasts</p>
        </div>
      </div>
    </footer>
  );
}
