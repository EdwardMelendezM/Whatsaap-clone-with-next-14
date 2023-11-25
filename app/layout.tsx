import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import {SocketProvider} from "@/components/providers/socket-provider";

const font = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Whatsaap Clone',
  description: 'Whatsaap Clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={cn(
          font.className,
          "bg-[#313338]"
        )}>
        <SocketProvider>
          {children}
        </SocketProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
