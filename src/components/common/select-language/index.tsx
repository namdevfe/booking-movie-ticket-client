'use client'

import Dropdown from '@/components/common/dropdown'
import { LANGUAGE_OPTIONS } from '@/components/common/select-language/contants'
import { Link, usePathname } from '@/i18n/navigation'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import { RiArrowDownSFill } from 'react-icons/ri'

const SelectLanguage = () => {
  const pathname = usePathname()
  const locale = useLocale()
  const selectedLanguageItem = LANGUAGE_OPTIONS.find((item) => item.value === locale)

  return (
    <Dropdown>
      <Dropdown.Trigger className='flex items-center gap-[8px]'>
        {selectedLanguageItem && (
          <>
            <Image src={selectedLanguageItem.iconUrl} alt={selectedLanguageItem.title} width={24} height={24} />
            <span className='text-sm'>{selectedLanguageItem.title}</span>
          </>
        )}
        <RiArrowDownSFill className='w-[20px] h-[20px]' />
      </Dropdown.Trigger>
      <Dropdown.Content>
        <ul className='flex flex-col'>
          {LANGUAGE_OPTIONS.map((option, index) => (
            <li key={option.value || new Date().getTime() + index} className='flex'>
              <Link
                href={pathname}
                locale={option.value}
                className={`w-full py-2 px-4 flex items-center gap-[8px] transition-colors duration-300 cursor-pointer group hover:bg-[#3366cccc] ${
                  selectedLanguageItem?.value === option.value ? 'bg-[#3366cccc]' : ''
                }`}
              >
                <Image src={option.iconUrl} alt={option.title} width={24} height={24} />
                <span
                  className={`transition-colors duration-300 text-sm text-gray group-hover:text-white ${
                    selectedLanguageItem?.value === option.value ? 'text-white' : ''
                  }`}
                >
                  {option.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Dropdown.Content>
    </Dropdown>
  )
}

export default SelectLanguage
