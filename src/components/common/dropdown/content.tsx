'use client'

import { useDropdown } from '@/components/common/dropdown/dropdown-context'
import { ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface ContentProps {
  children: ReactNode
}

const Content = ({ children }: ContentProps) => {
  const { isShowDropdown, coords } = useDropdown()

  if (!isShowDropdown) return null

  return createPortal(
    <div
      style={{
        top: coords.top + coords.height + 10,
        left: coords.left,
        width: coords.width
      }}
      className='absolute z-[101] bg-white rounded-md overflow-hidden'
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>,
    document.body
  )
}

export default Content
