'use client'

import { useDropdown } from '@/components/common/dropdown/dropdown-context'
import { ReactNode } from 'react'

interface TriggerProps {
  children: ReactNode
  className?: string
}

const Trigger = ({ children, className = '' }: TriggerProps) => {
  const { handleToggleDropdown } = useDropdown()

  return (
    <button className={className} onClick={handleToggleDropdown}>
      {children}
    </button>
  )
}

export default Trigger
