import Header from '@/components/common/header'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className='pt-[var(--h-header)]'>{children}</main>
    </>
  )
}

export default MainLayout
