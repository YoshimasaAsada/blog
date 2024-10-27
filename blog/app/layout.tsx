import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.scss'
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://yasdtech.com'),
  title: 'yasd tech',
  description: 'yasdのテックブログです',
  openGraph: {
    title: 'yasd tech',
    description: 'yasdのテックブログです',
    url: 'https://yasdtech.com/',
    siteName: 'yasd tech',
    locale: 'ja_JP',
    type: 'website',
    images: ['./opengraph-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'yasd tech',
    description: 'yasdのテックブログです',
    images: ['./opengraph-image.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID || ''

  return (
    <html lang="ja">
      <head>
        <GoogleAnalytics gaId={GA_ID} />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
