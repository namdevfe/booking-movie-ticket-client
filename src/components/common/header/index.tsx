'use client'

import Account from '@/components/common/account'
import Button from '@/components/common/button'
import { IconCor, IconSearch, IconTicket, IconUser } from '@/components/common/icons'
import Logo from '@/components/common/logo'
import SearchInput from '@/components/common/search-input'
import SelectLanguage from '@/components/common/select-language'
import { useTranslations } from 'next-intl'
import styles from './header.module.scss'
import MobileMenuToggle from './mobile-menu-toggle'
import { useAppSelector } from '@/store/hooks'

const Header = () => {
  const tButton = useTranslations('button')
  const profile = useAppSelector((state) => state.auth.profile)

  return (
    <header className={styles.header}>
      <div className='layout-container h-full'>
        {/* Header top */}
        <div className='h-headerTop flex items-center justify-between'>
          <Logo />

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
            <SearchInput />

            {/* Auth */}
            {!!profile ? (
              <Account profile={profile} />
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
