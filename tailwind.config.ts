import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette — derived from the hero robot backdrop image.
        // Soft, premium aesthetic-clinic: Peach/Blush + Plum/Wine.
        // Token KEYS are kept stable (used as classes across the app);
        // their VALUES define the active scheme:
        //   nude     = peach pink (dominant) · 100 = blush #FADCD5
        //   blush    = soft blush #FADCD5 (calm/nurturing section tint)
        //   espresso = deep plum #4B2138 · light = rose-wine #6D3C52 · dark = #1B0C1A
        //   taupe    = mauve #765D67 (muted text)
        //   wine     = coral (warm accent)
        nude: {
          DEFAULT: '#F6C9B4', // dominant brand colour — peach pink
          50: '#FEF6F1',
          100: '#FADCD5', // soft blush (from palette)
          200: '#F8D2C2',
          300: '#F6C9B4',
          400: '#EDA988',
          500: '#E59071',
        },
        blush: '#FADCD5', // soft blush — calm, nurturing section tint
        espresso: {
          DEFAULT: '#4B2138', // deep plum — premium contrast anchor
          light: '#6D3C52', // rose-wine — hover / secondary deep
          dark: '#1B0C1A', // near-black plum — deepest ground
          ink: '#2D222F', // dark eggplant — alt deep neutral
        },
        cream: '#FFF6EF', // warm cream backgrounds
        taupe: '#765D67', // mauve — muted text
        wine: '#E8927C', // coral — warm accent
        // shadcn/ui compatibility tokens (mapped to the brand palette)
        card: '#FFFFFF',
        'card-foreground': '#4B2138',
        'muted-foreground': '#765D67',
      },
      fontFamily: {
        hero: ['var(--font-cinzel)', 'Georgia', 'serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-instrument)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-space-mono)', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        soft: '0 20px 60px -20px rgba(75, 33, 56, 0.18)',
        glow: '0 0 0 1px rgba(246, 201, 180, 0.5), 0 30px 80px -30px rgba(75, 33, 56, 0.35)',
        card: '0 1px 2px rgba(75,33,56,0.04), 0 12px 40px -16px rgba(75,33,56,0.16)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        spotlight: {
          '0%': { opacity: '0', transform: 'translate(-72%, -62%) scale(0.5)' },
          '100%': { opacity: '1', transform: 'translate(-50%, -40%) scale(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 8s linear infinite',
        spotlight: 'spotlight 2s ease 0.75s 1 forwards',
      },
    },
  },
  plugins: [],
};

export default config;
