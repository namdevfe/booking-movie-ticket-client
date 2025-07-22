'use client'

import styles from './button.module.scss'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'transparent'
  size?: 'md' | 'lg'
}

const Button = ({ children, variant = 'primary', size = 'md', className = '', ...restProps }: ButtonProps) => {
  const renderButtonVariantClassNames = (): string => {
    let variantClassNames: string = ''

    switch (variant) {
      case 'secondary':
        variantClassNames = styles['--secondary']
        break

      case 'transparent':
        variantClassNames = styles['--transparent']
        break

      default:
        variantClassNames = styles['--primary']
        break
    }

    return variantClassNames
  }

  const renderButtonSizeClassNames = (): string => {
    let sizeClassNames: string = ''

    switch (size) {
      case 'lg':
        sizeClassNames = styles['--size-lg']
        break

      default:
        sizeClassNames = styles['--size-md']
        break
    }

    return sizeClassNames
  }

  return (
    <button
      className={`${styles.btn} ${renderButtonVariantClassNames()} ${renderButtonSizeClassNames()} ${className}`}
      {...restProps}
    >
      {children}
    </button>
  )
}

export default Button
