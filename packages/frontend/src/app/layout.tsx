import type { Metadata } from 'next';
import { fontHeading, fontSubheading, inter } from '@/assets/fonts';
// import StoreProvider from './store-provider';
import { Toaster } from '@/components/ui/sonner';
import '@/styles/globals.css';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';
import { AuthProvider } from '../context/auth-provider';
import { PageLayout } from '@/components/layout/page-layout';
import { CollapseProvider } from '@/context/collapse-context';

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
        {/* <StoreProvider> */}
        <AuthProvider>
          <CollapseProvider>
            <PageLayout>{children}</PageLayout>
          </CollapseProvider>
        </AuthProvider>
        {/* </StoreProvider> */}
        <Toaster />
      </body>
    </html>
  );
}
