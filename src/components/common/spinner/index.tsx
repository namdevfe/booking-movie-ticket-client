'use client'

import { cn } from '@/utils/cn'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizes: Record<any, string> = {
  sm: 'w-[20px] h-[20px] border-[4px]',
  md: 'w-[40px] h-[40px] border-[7px]',
  lg: 'w-[60px] h-[60px] border-[10px]'
}

const Spinner = ({ size = 'md', className = '' }: SpinnerProps) => {
  return (
    <div
      className={cn(
        'w-[40px] h-[40px] border-[7px] border-primary border-t-transparent rounded-full animate-spin',
        sizes[size],
        className
      )}
    />
  )
}

export default Spinner
