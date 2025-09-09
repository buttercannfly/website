import Header from '@/components/ui/header';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { structuredData, faqStructuredData } from './structured-data';
import Providers from '@/components/providers/session-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Open Claude for Chrome - Free Alternative to Claude for Chrome Extension',
  description: 'Open Claude for Chrome is a powerful, open-source Chrome extension that provides Claude AI assistance directly in your browser. Get the same functionality as Claude for Chrome for free with advanced tab management and AI chat features.',
  keywords: 'claude chrome, claude for chrome, open claude for chrome, claude chrome extension, claude ai chrome, free claude chrome, claude browser extension, claude ai assistant, chrome extension claude, claude for chrome alternative',
  openGraph: {
    title: 'Open Claude for Chrome - Free Alternative to Claude for Chrome Extension',
    description: 'Get Claude AI assistance directly in Chrome with our free, open-source extension. Advanced tab management, AI chat, and browser automation features.',
    images: [{ url: 'https://source.unsplash.com/random/1200x630?chrome+extension+ai' }],
    url: 'https://aipex.quest',
    type: 'website',
  },
  icons: [
    {
      rel: 'icon',
      url: '/favicon/favicon.svg',
      type: 'image/svg+xml',
    },
    {
      rel: 'icon',
      url: '/favicon/favicon.ico',
      type: 'image/x-icon',
      sizes: '32x32',
    },
    {
      rel: 'shortcut icon',
      url: '/favicon/favicon.ico',
      type: 'image/x-icon',
    },
    {
      rel: 'apple-touch-icon',
      url: '/favicon/favicon.ico',
      sizes: '180x180',
    },
    {
      rel: 'mask-icon',
      url: '/favicon/favicon.svg',
      color: '#3B82F6',
    }
  ],
  twitter: {
    card: 'summary_large_image',
    title: 'Open Claude for Chrome - Free Claude Chrome Extension',
    description: 'Get Claude AI assistance directly in Chrome with our free, open-source extension. Advanced tab management and AI chat features.',
    images: ['https://source.unsplash.com/random/1200x630?chrome+extension+ai'],
  },
  alternates: {
    canonical: 'https://aipex.quest',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
        src="https://www.googletagmanager.com/gtag/js?id=G-753M5NZSBJ"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-753M5NZSBJ');
        `}
      </Script>
      <Script
        src="https://cloud.umami.is/script.js"
        data-website-id="b52f3149-18d4-4b9f-be83-58e9fb4352b1"
        strategy="afterInteractive"
      />

      <body className={inter.className}>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <Script
          id="faq-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqStructuredData),
          }}
        />
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}