import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import '@/styles/globals.scss'

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
  ]
})

export const metadata: Metadata = {
  title: 'Booking Movie Ticket',
  description: 'Website built by NawDev'
}
 
export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: {locale: string}
}) {
  // Ensure that the incoming `locale` is valid
  const {locale} = params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)
 
  return (
    <html lang={locale}>
       <body className={`${josefinSans.className} ${anton.variable}`}>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  )
}