import Header from '@/components/common/header'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Header />
      <main className='pt-[var(--h-header)]'>{children}</main>
    </>
  )
}

export default MainLayout
