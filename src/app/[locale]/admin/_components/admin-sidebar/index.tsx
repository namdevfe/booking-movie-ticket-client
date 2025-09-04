'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import Logo from '@/components/common/logo'
import Menu from '@/app/[locale]/admin/_components/admin-sidebar/menu'
const Sidebar = dynamic(() => import('@/components/common/sidebar'), { ssr: false })

const AdminSidebar = () => {
  return (
    <Sidebar className='fixed top-0 left-0 w-adminSidebar bg-[var(--bg-header-cl)] h-full transition-all duration-300 flex flex-col'>
      <div className='h-adminSidebarLogo px-[24px] py-[12px]'>
        <Logo />
      </div>
      <div className='flex-1 py-[20px] overflow-y-auto'>
        <Menu />
      </div>
    </Sidebar>
  )
}

export default AdminSidebar
