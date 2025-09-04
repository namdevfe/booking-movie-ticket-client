'use client'

import { cn } from '@/utils/cn'

interface SidebarProps {
  children: React.ReactNode
  className?: string
}

const Sidebar = ({ children, className }: SidebarProps) => {
  return <aside className={cn(className)}>{children}</aside>
}

export default Sidebar
