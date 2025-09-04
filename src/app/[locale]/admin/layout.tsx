import AdminHeader from '@/app/[locale]/admin/_components/admin-header'
import AdminSidebar from '@/app/[locale]/admin/_components/admin-sidebar'

interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className='flex h-screen'>
      <AdminSidebar />
      <div className='ml-[var(--w-admin-sidebar)] w-adminBody bg-green-500 h-full'>
        <AdminHeader />
        <main>{children}</main>
      </div>
    </div>
  )
}

export default AdminLayout
