import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#33BBFF',
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#5DCAFA',
          500: '#33BBFF',
          600: '#1AA0E6',
          700: '#1287C2',
          800: '#0E6A99',
          900: '#0C4A6E',
        },
        ink: {
          900: '#0B0D12',
          800: '#1A1D24',
          700: '#2A2E37',
          500: '#5B6271',
          300: '#A6ABB7',
          100: '#E5E7EC',
        },
      },
      fontFamily: {
        sans: [
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'Roboto',
          'Helvetica Neue',
          'Segoe UI',
          'Apple SD Gothic Neo',
          'Noto Sans KR',
          'sans-serif',
        ],
      },
      maxWidth: {
        container: '1200px',
      },
      boxShadow: {
        card: '0 4px 24px rgba(11, 13, 18, 0.06)',
        elevated: '0 12px 40px rgba(11, 13, 18, 0.12)',
      },
    },
  },
  plugins: [],
};

export default config;
