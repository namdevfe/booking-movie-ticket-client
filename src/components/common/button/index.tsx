'use client'

import { Link } from '@/i18n/navigation'
import styles from './button.module.scss'
import { useLocale } from 'next-intl'
import Spinner from '@/components/common/spinner'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'transparent' | 'link' | 'disabled'
  size?: 'md' | 'lg'
  href?: string
  locale?: string
  isLoading?: boolean
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  href,
  locale,
  disabled = false,
  isLoading = false,
  onClick,
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
      className={`group ${styles.btn} ${renderButtonVariantClassNames()} ${renderButtonSizeClassNames()} ${
        disabled || isLoading ? styles['--disabled'] : ''
      } ${className}`}
      disabled={disabled || isLoading}
      onClick={disabled || isLoading ? () => {} : onClick}
      {...restProps}
    >
      {isLoading && (
        <Spinner
          size='sm'
          className='border-black border-t-transparent group-hover:border-white group-hover:border-t-transparent'
        />
      )}
      {children}
    </button>
  )
}

export default Button
