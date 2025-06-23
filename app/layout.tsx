import type React from "react"
import type { Metadata, Viewport } from "next"
import { Montserrat, Lora } from "next/font/google"
import "./globals.css"
import Header from "../components/Header"
import { TrackingScripts } from "../components/analytics/TrackingScripts"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
})

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  weight: ["400", "500", "600"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "The Web Wrench - Digital Marketing for Home Improvement Pros",
  description:
    "Get more leads with proven digital marketing strategies for contractors, remodelers, and home service professionals.",
  generator: "v0.dev",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/android-chrome-192x192.png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/android-chrome-512x512.png',
      },
    ],
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'The Web Wrench',
  },
  formatDetection: {
    telephone: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${lora.variable}`}>
      <head>
        <TrackingScripts />
      </head>
      <body className={montserrat.variable}>
        {/* Next.js 13+ automatically adds viewport meta tag from the viewport export */}
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}
