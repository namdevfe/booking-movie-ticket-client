import { STORAGE } from '@/constants/storage'
import authService from '@/services/auth-service'
import { cookies } from 'next/headers'
import React from 'react'

const TestPage = async () => {
  const cookieStore = cookies()
  const accessToken = JSON.parse(cookieStore.get(STORAGE.ACCESS_TOKEN)?.value || '')

  if (accessToken) {
    const res = await authService.getProfile(accessToken)
    console.log('🚀res---->', res)
  }

  return <div>TestPage</div>
}

export default TestPage
