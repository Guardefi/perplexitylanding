import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ScorpiusCore | Medieval Alien War Room Security Platform',
  description: 'Where medieval tactics meet alien technology. Enterprise-grade security with a cosmic aesthetic.',
  keywords: 'security platform, cybersecurity, smart contract auditing, blockchain security',
  authors: [{ name: 'ScorpiusCore Team' }],
  openGraph: {
    title: 'ScorpiusCore | Medieval Alien War Room',
    description: 'Enterprise security platform with cosmic aesthetics',
    type: 'website',
    locale: 'en_US',
    siteName: 'ScorpiusCore',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ScorpiusCore',
    description: 'Where medieval tactics meet alien technology',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: '#00fff7',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/fonts/command.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/terminal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-war-room-void text-white antialiased">
        {children}
      </body>
    </html>
  )
}
