import type { Metadata } from 'next';
import { fontHeading, fontSubheading, inter } from '@/assets/fonts';
import StoreProvider from './StoreProvider';
import '@/styles/globals.css';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';
import { Header } from '@/components/site-header';

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.variable,
          fontHeading.variable,
          fontSubheading.variable
        )}
      >
        <StoreProvider>
          <Header />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
