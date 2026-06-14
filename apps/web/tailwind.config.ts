import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        bg: '#07111F',
        panel: '#0A1628',
        line: 'rgba(255,255,255,0.08)',
        brand: {
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6'
        },
        neon: {
          violet: '#9B8CFF',
          pink: '#FF6AD5',
          lime: '#B7FF66'
        }
      },
      backgroundImage: {
        'hero-radial': 'radial-gradient(circle at top left, rgba(155,140,255,0.22), transparent 28%), radial-gradient(circle at top right, rgba(45,212,191,0.18), transparent 24%), linear-gradient(180deg, #08111D 0%, #04070D 100%)',
        'glass-stroke': 'linear-gradient(180deg, rgba(255,255,255,0.14), rgba(255,255,255,0.03))'
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,255,255,0.06), 0 20px 60px rgba(6,13,27,0.55)',
        brand: '0 10px 40px rgba(45,212,191,0.2)'
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem'
      }
    }
  },
  plugins: []
};

export default config;
