import { Link } from '@/i18n/navigation'
import Image from 'next/image'

const Logo = () => {
  return (
    <Link href='/' className='relative flex'>
      <Image src='/img/logo.webp' alt='logo' width={130} height={45} />
    </Link>
  )
}

export default Logo
