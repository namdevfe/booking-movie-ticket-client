import { ADMIN_ROUTES } from '@/constants/route'
import { STORAGE } from '@/constants/storage'
import authService from '@/services/auth-service'
import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { routing } from './i18n/routing'
import { RoleEnum } from '@/types/user-type'

const intlMiddleware = createMiddleware(routing)

export default async function middleware(req: NextRequest) {
  const locale = req.nextUrl.pathname.split('/')[1] || 'en'
  const token = req.cookies.get(STORAGE.ACCESS_TOKEN)?.value
  const isAdminRoute = ADMIN_ROUTES.some((path) => req.nextUrl.pathname.includes(path))

  // Token invalid
  if (!token) {
    if (isAdminRoute) {
      return NextResponse.redirect(new URL(`/${locale}/auth`, req.url))
    }
  }

  // Verify token
  const profileRes = await authService
    .getProfile(token)
    .catch((error: any) => console.log('🚀error---->', error))

  if (!profileRes?.data && isAdminRoute) {
    return NextResponse.redirect(new URL(`/${locale}/permission-denied`, req.url))
  }

  const profileData = profileRes?.data
  const isAdmin = profileData?.roles.some(
    (role) => role.name.toLowerCase() === RoleEnum.ADMIN.toLowerCase().toString()
  )
  // const isUser = profileData?.roles.some((role) => role.name === RoleEnum.USER.toString())

  if (!isAdmin && isAdminRoute) {
    return NextResponse.redirect(new URL(`/${locale}/permission-denied`, req.url))
  }

  // 2. Intl middleware xử lý routing
  return intlMiddleware(req)
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)', '/admin', '/admin/users']
}
