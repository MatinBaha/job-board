import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@/services/clerk/components/ClerkProvider';

const openSans = Open_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Job Board',
  description: 'a place to list your Jobs',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${openSans.variable} h-full antialiased font-sans dark`}
      >
        <body className="min-h-full flex flex-col">{children}</body>
      </html>
    </ClerkProvider>
  );
}
