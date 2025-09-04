'use client'

import Button from '@/components/common/button'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

interface SearchInputProps {}

const SearchInput = () => {
  const tSearch = useTranslations('search')

  return (
    <div className='px-[16px] flex w-headerSearch h-headerSearch overflow-hidden bg-white rounded-[1000px]'>
      <input type='text' placeholder={tSearch('placeholder')} className='w-full text-sm text-gray' spellCheck={false} />
      <Button variant='transparent' className='w-[20px] !h-full !p-0'>
        <Image src='/img/ic-header-search.svg' alt='icon-header-search' width={16} height={16} />
      </Button>
    </div>
  )
}

export default SearchInput
