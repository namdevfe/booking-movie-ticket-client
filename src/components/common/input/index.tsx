'use client'

import { cn } from '@/utils/cn'
import { forwardRef, InputHTMLAttributes, ReactNode } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode
  required?: boolean
  error?: string
  rootClassName?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { label, required = false, className = '', error, rootClassName = '', ...restProps } = props
  const isError = !!error

  return (
    <div className={cn('form-control', rootClassName)}>
      {label && (
        <label className='block mb-[8px]'>
          <span className='inline-block text-labelGray'>{label}</span>
          {required && <span className='inline-block ml-[8px] text-error'>*</span>}
        </label>
      )}

      <input
        className={cn(
          `inline-block pt-[12px] pb-[8px] pl-[16px] pr-[36px] border border-borderInputDefault transition-colors duration-300 hover:border-borderInputHover text-gray`,
          className,
          {
            'border-error': isError
          }
        )}
        ref={ref}
        {...restProps}
      />

      {error && <p className='mt-1 text-xs text-error'>{error}</p>}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
