import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import '@/styles/globals.scss'
import { ToastContainer } from 'react-toastify'

// Fonts
const anton = localFont({
  src: '../fonts/Anton-Regular.ttf',
  display: 'fallback',
  variable: '--font-anton'
})

const josefinSans = localFont({
  src: [
    {
      path: '../fonts/JosefinSans-Regular.ttf',
      style: 'normal'
    },
    {
      path: '../fonts/JosefinSans-Medium.ttf',
      style: 'normal'
    },
    {
      path: '../fonts/JosefinSans-Bold.ttf',
      style: 'normal'
    },
    {
      path: '../fonts/JosefinSans-SemiBold.ttf',
      style: 'normal'
    }
  ],
  variable: '--font-josefinsans'
})

export const metadata: Metadata = {
  title: 'Cinestar - Hệ thống rạp chiếu phim giá rẻ, hiện đại bậc nhất',
  description:
    'Cinestar không chỉ chiếu phim - chúng tôi còn mang đến nhiều mô hình giải trí đặc sắc khác, giúp bạn tận hưởng từng giây phút bên ngoài màn ảnh rộng.'
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  return (
    <html lang={locale}>
      <body className={`${josefinSans.className} ${josefinSans.variable} ${anton.variable}`}>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        <ToastContainer theme='colored' />
      </body>
    </html>
  )
}
