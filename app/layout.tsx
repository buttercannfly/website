import Header from '@/components/ui/header';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AIpex - Intelligent Chrome Extension for Tab Management',
  description: 'AIpex is an open-source Chrome extension that helps you manage tabs, history, and bookmarks with an integrated ChatGPT sidebar.',
  keywords: 'Chrome extension, tab management, history management, bookmark management, ChatGPT, AI assistant',
  openGraph: {
    title: 'AIpex - Intelligent Chrome Extension for Tab Management',
    description: 'Manage your tabs, history, and bookmarks with AI-powered assistance.',
    images: [{ url: 'https://source.unsplash.com/random/1200x630?chrome+extension' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AIpex - Intelligent Chrome Extension',
    description: 'Manage your tabs, history, and bookmarks with AI-powered assistance.',
    images: ['https://source.unsplash.com/random/1200x630?chrome+extension'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-336LLWQVC2"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-336LLWQVC2');
        `}
      </Script>
      <body className={inter.className}>
      <Header />
      {children}</body>
    </html>
  );
}