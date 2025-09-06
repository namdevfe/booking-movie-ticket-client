import { STORAGE } from '@/constants/storage'
import authService from '@/services/auth-service'
import { LoginPayload, Profile } from '@/types/auth-type'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  isLoading: {
    login: boolean
    profile: boolean
  }
  profile?: Profile | null
}

const initialState: AuthState = {
  isLoading: { login: false, profile: false },
  profile: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<any>) => {
      state.profile = action.payload
    }
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(login.pending, (state) => {
      state.isLoading.profile = true
    })
    builder.addCase(login.fulfilled, (state) => {
      state.isLoading.login = false
    })
    builder.addCase(login.rejected, (state) => {
      state.isLoading.login = false
    })

    // Get Profile
    builder.addCase(getProfile.pending, (state) => {
      state.isLoading.profile = true
    })
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload
      state.isLoading.profile = false
    })
    builder.addCase(getProfile.rejected, (state) => {
      state.profile = null
      state.isLoading.profile = false
    })
  }
})

const { actions, reducer: authReducer } = authSlice
export const { setAuth } = actions
export default authReducer

// Async Actions
export const login = createAsyncThunk(
  'auth/login',
  async (data: LoginPayload, { dispatch, rejectWithValue }) => {
    try {
      const payload: Record<string, any> = { password: data.password }
      const isLoginWithEmail = data.emailOrUsername.includes('@')

      if (isLoginWithEmail) {
        payload.email = data.emailOrUsername
      } else {
        payload.username = data.emailOrUsername
      }

      const res = await authService.login(
        payload as LoginPayload & ({ email?: string } | { username?: string })
      )

      if (res?.statusCode === 200 && res.data?.accessToken) {
        const { accessToken, refreshToken } = res.data

        // Save token to localStorage for client component
        localStorage.setItem(STORAGE.ACCESS_TOKEN, JSON.stringify(accessToken))
        localStorage.setItem(STORAGE.REFRESH_TOKEN, JSON.stringify(refreshToken))

        // Save token to cookies for server component
        const saveTokenToCookiesRes = await authService.saveTokenToCookies(res.data)

        if (saveTokenToCookiesRes?.statusCode === 200) {
          dispatch(getProfile())
          return res
        }
      }
    } catch (error: any) {
      return rejectWithValue(error)
    }
  }
)

export const getProfile = createAsyncThunk('auth/getProfile', async (_, thunkAPI) => {
  const accessToken = localStorage.getItem(STORAGE.ACCESS_TOKEN)

  if (accessToken) {
    try {
      const res = await authService.getProfile()

      if (res?.statusCode === 200 && res.data) {
        return res.data
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error)
    }
  }
})
