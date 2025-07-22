'use client'

import { useState } from 'react'
import styles from './header.module.scss'

const MobileMenuToggle = () => {
  const [isShowMobileMenu, setIsShowMobileMenu] = useState<boolean>(false)

  const handleToggle = () => {
    setIsShowMobileMenu(prev => !prev)
  }

  return (
    <button className={`${styles.mobileMenuToggle} ${isShowMobileMenu ? styles['--isShow'] : ''}`} onClick={handleToggle}>
      <span />
    </button>
  )
}

export default MobileMenuToggle