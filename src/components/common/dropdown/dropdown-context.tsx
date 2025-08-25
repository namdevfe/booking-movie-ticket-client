'use client'

import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react'

interface Coords {
  top: number
  left: number
  right: number
  bottom: number
  width: number
  height: number
}

interface DropdownContextType {
  isShowDropdown: boolean
  coords: Coords
  handleToggleDropdown: () => void
}

const DropdownContext = createContext<DropdownContextType>({
  isShowDropdown: false,
  coords: { top: 0, right: 0, left: 0, bottom: 0, height: 0, width: 0 },
  handleToggleDropdown: () => {}
})

interface DropdownProviderProps {
  children: ReactNode
}

const DropdownProvider = ({ children }: DropdownProviderProps) => {
  const [isShowDropdown, setIsShowDropdown] = useState<boolean>(false)
  const [coords, setCoords] = useState<Coords>({ top: 0, right: 0, left: 0, bottom: 0, height: 0, width: 0 })
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const handleToggleDropdown = () => {
    setIsShowDropdown((prev) => !prev)
  }

  const handleCloseDropdown = () => {
    setIsShowDropdown(false)
  }

  const value = { isShowDropdown, coords, handleToggleDropdown }

  // Close dropdown when click outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && dropdownRef.current.contains(e.target as Node)) {
        const clientRect = dropdownRef.current.getBoundingClientRect()
        setCoords(clientRect)
        return
      }

      handleCloseDropdown()
    }

    document.addEventListener('click', handleOutsideClick)

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  // Set current rect for dropdown content follow dropdown when resize
  useEffect(() => {
    const handleUpdatePosition = () => {
      if (dropdownRef.current) {
        const clientRect = dropdownRef.current.getBoundingClientRect()
        setCoords(clientRect)
      }
    }

    window.addEventListener('resize', handleUpdatePosition)
    // window.addEventListener('scroll', handleUpdatePosition, true)

    return () => {
      window.removeEventListener('resize', handleUpdatePosition)
      // window.removeEventListener('scroll', handleUpdatePosition, true)
    }
  }, [])

  return (
    <DropdownContext.Provider value={value}>
      <div className='relative' ref={dropdownRef}>
        {children}
      </div>
    </DropdownContext.Provider>
  )
}

export const useDropdown = () => {
  const context = useContext(DropdownContext)

  if (!context) {
    throw new Error('useDropdown must be used within DropdownProvider')
  }

  return context
}

export default DropdownProvider
