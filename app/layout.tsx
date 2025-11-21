import type { Metadata } from 'next'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Sunspots Holidays - Discover Tailor-Made Travel',
  description: 'Trust Sunspots Holidays\' experience planning trips to destinations around the world.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

