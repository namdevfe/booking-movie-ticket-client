import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    fontFamily: {
      anton: ['var(--font-anton)', 'sans-serif'],
      josefinSans: ['var(--font-josefinsans)', 'sans-serif']
    },
    extend: {
      colors: {
        primary: 'var(--primary-cl)',
        secondary: 'var(--secondary-cl)',
        gray: 'var(--gray-cl)',
        labelGray: 'var(--text-label-gray-cl)',
        error: 'var(--red-cl)',
        borderInputDefault: 'var(--border-input-default-cl)',
        borderInputHover: 'var(--border-input-hover-cl)',
        helperText: 'var(--helper-text-cl)',
        header: 'var(--bg-header-cl)'
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
        '5xl': '4.8rem'
      },
      height: {
        header: 'var(--h-header)',
        headerTop: 'var(--h-header-top)',
        headerBottom: 'var(--h-header-bottom)',
        headerSearch: 'var(--h-header-search)',
        adminSidebarLogo: 'var(--h-admin-sidebar-logo)',
        adminHeader: 'var(--h-admin-header)'
      },
      width: {
        headerSearch: 'var(--w-header-search)',
        adminSidebar: 'var(--w-admin-sidebar)',
        adminBody: 'var(--w-admin-body)',
        adminHeader: 'var(--w-admin-header)'
      }
    }
  },
  plugins: []
}
export default config
