'use client'

import { useTranslations } from 'next-intl'
import styles from './auth-tabs.module.scss'
import { useState } from 'react'
import LoginForm from '@/app/[locale]/auth/_components/auth-tabs/login-form'
import RegisterForm from '@/app/[locale]/auth/_components/auth-tabs/register-form'

const AuthTabs = () => {
  const t = useTranslations('AuthPage')
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login')

  const handleTabChange = (tab: 'login' | 'register') => {
    setActiveTab(tab)
  }

  // Handle logic submit form

  return (
    <div className={styles.authTabs}>
      {/* Tab List */}
      <ul className={styles.tabList}>
        <li
          className={`${styles.tabItem} ${activeTab === 'login' ? styles['tabItem--active'] : ''}`}
          onClick={() => handleTabChange('login')}
        >
          <h2>{t('login.title')}</h2>
        </li>
        <li
          className={`${styles.tabItem} ${activeTab === 'register' ? styles['tabItem--active'] : ''}`}
          onClick={() => handleTabChange('register')}
        >
          <h2>{t('register.title')}</h2>
        </li>
      </ul>

      {/* Tab Content */}
      {activeTab === 'login' && <LoginForm />}
      {activeTab === 'register' && <RegisterForm />}
    </div>
  )
}

export default AuthTabs
