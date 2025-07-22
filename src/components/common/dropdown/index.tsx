'use client'

import Content from '@/components/common/dropdown/content'
import DropdownProvider from '@/components/common/dropdown/dropdown-context'
import Trigger from '@/components/common/dropdown/trigger'
import { ReactNode } from 'react'

interface DropdownProps {
  children: ReactNode
}

const Dropdown = ({ children }: DropdownProps) => {
  return <DropdownProvider>{children}</DropdownProvider>
}

Dropdown.Trigger = Trigger
Dropdown.Content = Content

export default Dropdown
