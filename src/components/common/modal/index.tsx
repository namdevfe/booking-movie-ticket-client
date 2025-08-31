'use client'

import { cn } from '@/utils/cn'
import { createPortal } from 'react-dom'

interface ModalProps {
  children: React.ReactNode
  innerClassName?: string
  isOpen?: boolean
  onClose?: () => void
}

const Modal = ({ children, innerClassName = '', isOpen = false, onClose }: ModalProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleCloseModal = (_: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onClose?.()
  }

  const handleInnerModalClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
  }

  if (typeof window === 'undefined') return null

  return createPortal(
    <div
      className={cn(
        'fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.7)] z-[500] flex items-center justify-center  transition-opacity duration-300',
        'opacity-0 invisible pointer-events-none', // Close modal
        {
          'opacity-100 visible pointer-events-auto': isOpen // Open modal
        }
      )}
      onClick={handleCloseModal}
    >
      <div className={cn('bg-white shadow-lg rounded-[16px]', innerClassName)} onClick={handleInnerModalClick}>
        {children}
      </div>
    </div>,
    document.body
  )
}

export default Modal
