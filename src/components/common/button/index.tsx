'use client'

import { Link } from '@/i18n/navigation'
import styles from './button.module.scss'
import { useLocale } from 'next-intl'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'transparent' | 'link'
  size?: 'md' | 'lg'
  href?: string
  locale?: string
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  href,
  locale,
  ...restProps
}: ButtonProps) => {
  const currentLocale = useLocale()

  const renderButtonVariantClassNames = (): string => {
    let variantClassNames: string = ''

    switch (variant) {
      case 'secondary':
        variantClassNames = styles['--secondary']
        break

      case 'transparent':
        variantClassNames = styles['--transparent']
        break

      case 'link':
        variantClassNames = styles['--link']
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

  if (href) {
    return (
      <Link
        href={href}
        locale={locale || currentLocale}
        className={`${styles.btn} ${renderButtonVariantClassNames()} ${renderButtonSizeClassNames()} ${className}`}
      >
        {children}
      </Link>
    )
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
