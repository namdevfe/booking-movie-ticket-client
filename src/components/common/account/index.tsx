'use client'

import Dropdown from '@/components/common/dropdown'
import { Link } from '@/i18n/navigation'
import { Profile } from '@/types/auth-type'
import Image from 'next/image'

interface AccountProps {
  profile: Profile | null
}

const Account = ({ profile }: AccountProps) => {
  const { email, username } = profile || {}

  return (
    <Dropdown>
      <Dropdown.Trigger className='flex items-center gap-[12px]'>
        <div className='relative w-[34px] h-[34px] rounded-full overflow-hidden'>
          <Image
            fill
            src='https://images.unsplash.com/photo-1728577740843-5f29c7586afe?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt='avatar'
            objectFit='cover'
          />
        </div>
        <div>
          <p className='text-left'>
            <strong>{username}</strong>
          </p>
          <p className='text-sm text-gray'>{email}</p>
        </div>
      </Dropdown.Trigger>
      <Dropdown.Content>
        <ul className='flex flex-col'>
          <li className='flex'>
            <Link
              href='/profile'
              className='py-2 px-4 flex items-center w-full text-[var(--black-cl)] transition-colors duration-300 hover:bg-gray hover:text-white'
            >
              Profile
            </Link>
          </li>
          <li>
            <button className='py-2 px-4 flex items-center w-full text-[var(--black-cl)] transition-colors duration-300 hover:bg-gray hover:text-white'>
              Logout
            </button>
          </li>
        </ul>
      </Dropdown.Content>
    </Dropdown>
  )
}

export default Account
