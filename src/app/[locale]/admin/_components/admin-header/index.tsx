import Account from '@/components/common/account'
import { IconBell } from '@/components/common/icons'
import SearchInput from '@/components/common/search-input'

const AdminHeader = () => {
  return (
    <header className='fixed top-0 right-0 flex items-center justify-between w-adminHeader h-adminHeader bg-header px-[16px] py-[8px] transition-all duration-300'>
      {/* Search Input */}
      <SearchInput />

      <div className='flex items-center gap-[18px]'>
        <span className='flex flex-shrink-0 cursor-pointer'>
          <IconBell />
        </span>
        <Account />
      </div>
    </header>
  )
}

export default AdminHeader
