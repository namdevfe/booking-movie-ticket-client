'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '@/store'
import { getProfile } from '@/store/reducers/auth-slice'
import { STORAGE } from '@/constants/storage'
import { isClient } from '@/utils/is-client'

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<AppStore>(undefined)
  const isLoggedIn = isClient() && !!localStorage.getItem(STORAGE.ACCESS_TOKEN)

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()

    if (isLoggedIn) storeRef.current.dispatch(getProfile())
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}

export default StoreProvider
