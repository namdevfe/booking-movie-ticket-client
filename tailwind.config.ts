import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    fontFamily: {
      'anton':['var(--font-anton)', 'sans-serif']
    },
    extend: {
      colors: {
        primary: 'var(--primary-cl)',
        secondary: 'var(--secondary-cl)',
      },
       fontSize: {
        xs: '1.2rem',
        sm: '1.4rem',
        base: '1.6rem',
        lg: '1.8rem',
        xl: '2.0rem',
        '2xl': '2.4rem',
        '3xl': '3.2rem',
        '4xl': '4.0rem',
        '5xl': '4.8rem',
      },
    }
  },
  plugins: []
}
export default config
