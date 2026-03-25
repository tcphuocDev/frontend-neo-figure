import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="flex flex-col items-center gap-3 mt-8"
    >
      {/* Page Info */}
      <div className="text-xs text-text-secondary">
        Page <span className="text-primary font-semibold">{currentPage}</span>{" "}
        of <span className="text-white font-semibold">{totalPages}</span>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-1.5">
        {/* Previous Button */}
        <motion.button
          whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
          whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 rounded border transition-all ${
            currentPage === 1
              ? "border-[#2a2a2a] text-text-muted cursor-not-allowed bg-dark-card"
              : "border-[#2a2a2a] text-text-secondary hover:border-primary hover:text-primary hover:bg-dark-hover"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
        </motion.button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) =>
            page === "..." ? (
              <span
                key={`ellipsis-${index}`}
                className="px-1.5 text-text-muted text-sm"
              >
                •••
              </span>
            ) : (
              <motion.button
                key={page}
                whileHover={{ scale: currentPage === page ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onPageChange(page)}
                className={`min-w-[36px] h-9 rounded border transition-all font-semibold text-sm ${
                  currentPage === page
                    ? "bg-primary text-dark border-primary shadow-glow-blue"
                    : "border-[#2a2a2a] text-text-secondary hover:border-primary/50 hover:text-white hover:bg-dark-hover"
                }`}
              >
                {page}
              </motion.button>
            ),
          )}
        </div>

        {/* Next Button */}
        <motion.button
          whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
          whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded border transition-all ${
            currentPage === totalPages
              ? "border-gray-800 text-gray-600 cursor-not-allowed bg-dark-card"
              : "border-gray-700 text-gray-400 hover:border-primary hover:text-primary hover:bg-dark-hover hover:shadow-lg hover:shadow-primary/10"
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
}
