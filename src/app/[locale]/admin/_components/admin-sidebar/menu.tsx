'use client'

import { IconDashboard } from '@/components/common/icons'
import { usePathname } from '@/i18n/navigation'
import { cn } from '@/utils/cn'

const MENU_ITEMS: { key: string; icon: React.ReactNode; title: string; href?: string }[] = [
  {
    key: 'dashboard',
    title: 'Dashboard',
    icon: <IconDashboard width={16} height={16} />,
    href: '/admin'
  },
  {
    key: 'users',
    title: 'Users',
    icon: <IconDashboard width={16} height={16} />,
    href: '/admin/users'
  },
  {
    key: 'movies',
    title: 'Movies',
    icon: <IconDashboard width={16} height={16} />,
    href: '/admin/movies'
  },
  {
    key: 'categories',
    title: 'Categories',
    icon: <IconDashboard width={16} height={16} />,
    href: '/admin/categories'
  }
]

const Menu = () => {
  const pathname = usePathname()

  return (
    <ul className='px-[8px] flex flex-col gap-[8px]'>
      {MENU_ITEMS.map(({ key, icon, title, href }) => {
        const isActive = pathname === href

        return (
          <li key={key}>
            <div
              className={cn(
                'group flex items-center gap-[4px] px-[20px] py-[12px] rounded-[4px] cursor-pointer transition-colors duration-300',
                'hover:bg-secondary', // Hover
                {
                  'bg-secondary': isActive // Active
                }
              )}
            >
              <span
                className={cn(
                  'text-neutral-400 transition-colors duration-300', // Common
                  'group-hover:text-white', // Hover
                  {
                    'text-white': isActive
                  }
                )}
              >
                {icon}
              </span>
              <span
                className={cn(
                  'transition-colors duration-300', // Transition
                  'text-sm text-neutral-400 leading-normal', // Typography
                  'group-hover:text-white', // Hover
                  {
                    'text-white': isActive
                  }
                )}
              >
                {title}
              </span>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default Menu
