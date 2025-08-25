import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import styles from './header.module.scss'
import MobileMenuToggle from './mobile-menu-toggle'
import Button from '@/components/common/button'
import { IconCor, IconSearch, IconTicket, IconUser } from '@/components/common/icons'
import Account from '@/components/common/header/account'
import { getTranslations } from 'next-intl/server'
import SelectLanguage from '@/components/common/select-language'

const Header = async () => {
  const isLoggedIn = false
  const tButton = await getTranslations('button')
  const tSearch = await getTranslations('search')

  return (
    <header className={styles.header}>
      <div className='layout-container h-full'>
        {/* Header top */}
        <div className='h-headerTop flex items-center justify-between'>
          <Link href='/' className='relative flex'>
            <Image src='/img/logo.webp' alt='logo' width={130} height={45} />
          </Link>

          <div className='hidden items-center gap-[10px] md:flex'>
            <Button size='lg'>
              <IconTicket />
              <span>{tButton('buyTicket')}</span>
            </Button>
            <Button variant='secondary' size='lg'>
              <IconCor />
              <span>{tButton('buyPopcorn')}</span>
            </Button>
          </div>

          {/* Search & Auth Mobile */}
          <div className='hidden items-center gap-4 gap md:flex lg:hidden'>
            <Button variant='transparent' className={styles.btnSearch}>
              <IconSearch className='w-[14px] h-[14px]' />
            </Button>
            <Button variant='transparent' className={styles.btnAuth}>
              <IconUser className='w-full h-full' />
            </Button>
          </div>

          {/* Search & Auth Desktop */}
          <div className='hidden items-center gap-[36px] gap md:hidden lg:flex'>
            {/* Search */}
            <div className='px-[16px] flex w-headerSearch h-headerSearch overflow-hidden bg-white rounded-[1000px]'>
              <input
                type='text'
                placeholder={tSearch('placeholder')}
                className='w-full text-sm text-gray'
                spellCheck={false}
              />
              <Button variant='transparent' className='w-[20px] !h-full !p-0'>
                <Image src='/img/ic-header-search.svg' alt='icon-header-search' width={16} height={16} />
              </Button>
            </div>

            {/* Auth */}
            {isLoggedIn ? (
              <Account />
            ) : (
              <Button
                className='!p-0 hover:text-primary !font-josefinSans !text-base !normal-case'
                variant='transparent'
                href='/auth'
              >
                <IconUser className='w-[24px] h-[24px]' />
                <span>{tButton('login')}</span>
              </Button>
            )}

            <SelectLanguage />
          </div>

          {/* Select Cinema */}
          <div className='md:hidden'>Chọn rạp</div>

          <MobileMenuToggle />
        </div>

        {/* Header bottom */}
        <div className='border-t border-[rgba(248,250,252,0.1)]'>Header bottom</div>
      </div>
    </header>
  )
}

export default Header
