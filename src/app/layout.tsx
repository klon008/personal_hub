import type {Metadata} from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from '@/components/theme-provider';
import YandexMetrika from '@/components/YandexMetrika';
import CookieConsent from '@/components/CookieConsent';

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' })

export const metadata: Metadata = {
  title: 'Portfolio Vault',
  description: 'klon vault for portfolio projects.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head />
      <body className={`${manrope.variable} font-sans antialiased`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
        >
          {children}
          <Toaster />
          <CookieConsent />
          <YandexMetrika />
        </ThemeProvider>
      </body>
    </html>
  );
}
