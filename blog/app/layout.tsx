import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.scss';
import Script from 'next/script';
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://yasdtech.com'),
  title: 'yasd tech',
  description: 'yasdのテックブログです',
  keywords: [
    'テックブログ',
    'ポートフォリオ',
    'プログラミング',
    'エンジニア',
    'フロントエンド',
    'バックエンド',
  ],
  /** 正規URLの指定 */
  alternates: {
    canonical: 'https://yasdtech.com/',
  },
  /** SNSでの見え方を設定 */
  openGraph: {
    title: 'yasd tech',
    description: 'yasdのテックブログです',
    url: 'https://yasdtech.com/',
    siteName: 'yasd tech',
    locale: 'ja_JP',
    type: 'website',
    images: ['./opengraph-image.png'],
  },
  /** 検索エンジン周りの設定。インデックス、リンクフォローの制御 */
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'yasd tech',
    description: 'yasdのテックブログです',
    images: ['./opengraph-image.png'],
  },
  generator: 'Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';

  return (
    <html lang="ja">
      <head>
        {/* <GoogleAnalytics gaId={GA_ID} /> */}
        {/* Google Analyticsのスクリプトをasyncで非同期に読み込む */}
        {/* <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="lazyOnload"
        />
        <Script id="ga-setup" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', { page_path: window.location.pathname });
          `}
        </Script> */}
        <GoogleAnalytics gaId={GA_ID} />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
