export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Admin Theme - Light & Professional
        admin: {
          bg: {
            primary: '#F5F7FA',
            card: '#FFFFFF',
            hover: '#F0F4F8',
            active: '#E6F4FF',
          },
          text: {
            primary: '#1F2937',
            secondary: '#6B7280',
            muted: '#9CA3AF',
            disabled: '#D1D5DB',
          },
          border: {
            DEFAULT: '#E5E7EB',
            hover: '#D1D5DB',
            focus: '#3B82F6',
          },
        },
        // Primary Blue
        primary: {
          DEFAULT: '#1677FF',
          hover: '#4096FF',
          light: '#E6F4FF',
          dark: '#0958D9',
        },
        // Background Colors (for customer site - keep for compatibility)
        background: {
          DEFAULT: '#F5F7FA',
          card: '#FFFFFF',
        },
        text: {
          primary: '#1F2937',
          secondary: '#6B7280',
        },
        border: {
          DEFAULT: '#E5E7EB',
        },
        // Status Colors
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        danger: '#EF4444',
        info: '#3B82F6',

        // Keep old colors for backward compatibility (customer site)
        secondary: '#ff003c',
        dark: {
          DEFAULT: '#0f0f0f',
          card: '#1a1a1a',
          hover: '#252525',
        },
        'text-muted': '#9CA3AF',
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(0, 245, 255, 0.3)',
        'glow-red': '0 0 20px rgba(255, 0, 60, 0.3)',
        'glow-blue-lg': '0 0 40px rgba(0, 245, 255, 0.4)',
        card: '0 2px 8px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 8px 24px rgba(0, 245, 255, 0.15)',
      },
      backdropBlur: {
        xs: '2px',
      },
      spacing: {
        18: '4.5rem',
        88: '22rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { transform: 'translateY(20px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 245, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 245, 255, 0.6)' },
        },
      },
      transitionDuration: {
        400: '400ms',
      },
    },
  },
  plugins: [],
};
