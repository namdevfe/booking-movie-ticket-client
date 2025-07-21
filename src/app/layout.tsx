import type { Metadata } from 'next'
import localFont from 'next/font/local'
import '@/styles/globals.scss'

// Fonts
const anton = localFont({
  src: './fonts/Anton-Regular.ttf',
  display: 'fallback',
  variable: '--font-anton'
})

const josefinSans = localFont({
  src: [
    {
      path: './fonts/JosefinSans-Regular.ttf',
      style: 'normal'
    },
    {
      path: './fonts/JosefinSans-Medium.ttf',
      style: 'normal'
    },
    {
      path: './fonts/JosefinSans-Bold.ttf',
      style: 'normal'
    },
    {
      path: './fonts/JosefinSans-SemiBold.ttf',
      style: 'normal'
    }
  ]
})

export const metadata: Metadata = {
  title: 'Booking Movie Ticket',
  description: 'Website built by NawDev'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${josefinSans.className} ${anton.variable}`}>
        {children}
      </body>
    </html>
  )
}
