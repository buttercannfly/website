import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Chrome, Github } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { Metadata } from 'next';
import AipexFeatures from '@/components/ui/inner-link';

export const metadata: Metadata = {
    title: 'AIpex - Open Incognito Tab in Chrome | Best Incognito Tab Extension',
    description: 'Learn how to open incognito tabs in Chrome with AIpex. Quick incognito tab access with keyboard shortcuts. The best Chrome extension for managing incognito tabs.',
    keywords: 'incognito tab, open incognito tab, chrome incognito tab, how to open incognito tab, incognito tab chrome, incognito tab shortcut, incognito tab extension, private browsing tab, private tab chrome, new incognito tab',
    openGraph: {
      title: 'AIpex - Ultimate Chrome Incognito Tab Management Solution',
      description: 'Easily open and manage incognito tabs in Chrome with one-click shortcuts. Enhanced private browsing with AIpex incognito tab features.',
      images: [{ url: 'https://source.unsplash.com/random/1200x630?chrome+incognito+tab' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'AIpex - Professional Incognito Tab Management Extension',
      description: 'The most efficient way to open and manage incognito tabs in Chrome. Access private browsing instantly with our powerful incognito tab features.',
      images: ['https://source.unsplash.com/random/1200x630?chrome+extension'],
    },
  };

export default function IncognitoTab() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white dark:from-purple-900 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-16 pt-10">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-purple-500 blur-3xl opacity-20 rounded-full"></div>
            <h1 className="text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 relative">
              Open Incognito Tab in Chrome Instantly
            </h1>
          </div>
          <p className="text-2xl text-gray-600 dark:text-gray-300 mb-8">
            <a href='https://aipex.quest'>
              Launch Chrome incognito tabs faster than ever with AIpex&apos;s smart keyboard shortcuts
            </a>
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition hover:scale-105"
          >
            <Chrome className="mr-2 h-5 w-5" />{' '}
            <a href="https://chromewebstore.google.com/detail/aipex-%E2%80%94%E2%80%94-tab-history-mana/iglkpadagfelcpmiidndgjgafpdifnke?utm_source=ext_app_menu">
              Get AIpex Incognito Tab Manager
            </a>
          </Button>
        </header>

        <main>
          <section className="mb-24">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">
              Manage Incognito Tabs with AIpex
            </h2>
            <div className="grid grid-cols-1 gap-12">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <Card className="relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-white">
                      Quick Incognito Tab Access in Chrome
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="relative w-full h-120 overflow-hidden rounded-lg">
                      <img
                        src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*MVo5-RYs3K6pAMNjzfl33Q.gif"
                        alt="Opening incognito tab in Chrome"
                        className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      Need a new incognito tab in Chrome? Press Command/Ctrl + M and type &quot;incognito&quot; - it&apos;s the fastest way to private browsing!
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <section className="mb-24">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">
              Launch Incognito Tabs in Two Simple Steps
            </h2>
            
            <div className="max-w-3xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <div className="mb-8 text-center">
                  <span className="inline-flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-lg px-4 py-2 text-lg font-medium text-blue-800 dark:text-blue-200">
                    Quick Incognito Tab Access
                  </span>
                </div>

                <div className="space-y-8">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 dark:text-white">Press Command + M</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Access AIpex&apos;s command panel for quick incognito tab creation
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 dark:text-white">Type &quot;incognito&quot;</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Enter &quot;incognito&quot; to instantly launch a new incognito tab for private browsing
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-3 text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-medium">Pro tip:</span> Use incognito tabs for secure, private browsing sessions with no history or cookie tracking
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <AipexFeatures />


          <section className="mb-24">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">
              Incognito Tab FAQs
            </h2>
            <Accordion
              type="single"
              collapsible
              className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden"
            >
              {[
                {
                  "question": "What makes AIpex the best Chrome incognito tab manager?",
                  "answer": "AIpex offers the fastest way to open incognito tabs with simple keyboard shortcuts. Our extension streamlines private browsing with instant incognito tab access and smart management features."
                },
                {
                  "question": "How does AIpex&apos;s incognito tab feature compare to Chrome&apos;s default?",
                  "answer": "AIpex provides a more efficient way to open incognito tabs through quick keyboard commands. While Chrome requires multiple clicks, AIpex lets you launch incognito tabs instantly with a simple shortcut."
                },
                {
                  "question": "What are the advantages of using incognito tabs?",
                  "answer": "Incognito tabs provide private browsing sessions where your history, cookies, and site data remain completely private. They&apos;re perfect for sensitive browsing, online shopping, or using shared devices."
                },
                {
                  "question": "Can I customize AIpex&apos;s incognito tab shortcuts?",
                  "answer": "Yes, AIpex allows you to customize keyboard shortcuts for opening incognito tabs, making private browsing even more convenient and tailored to your preferences."
                },
                {
                  "question": "Why choose AIpex for managing incognito tabs?",
                  "answer": "AIpex combines speed, simplicity, and powerful features for the ultimate incognito tab experience. With smart shortcuts and seamless integration, it&apos;s the most efficient way to manage private browsing in Chrome."
                }
              ].map((item, index) => (
                <AccordionItem key={index} value={`item-${index + 1}`}>
                  <AccordionTrigger className="px-6 py-4 text-lg font-semibold text-gray-800 dark:text-white hover:bg-purple-50 dark:hover:bg-purple-900">
                    <h3>{item.question}</h3>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 text-gray-600 dark:text-gray-300">
                    <h4>{item.answer}</h4>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <section className="text-center mb-24">
            <h2 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white">
              Open Source Incognito Tab Manager
            </h2>
            <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
              AIpex is a free, open-source Chrome extension for smart incognito tab management.
              Join our community and help improve private browsing!
            </p>
            <Button
              variant="outline"
              size="lg"
              className="bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900"
            >
              <Github className="mr-2 h-5 w-5" />{' '}
              <a href="https://github.com/buttercannfly/AIPex" target="_blank">
                View AIpex on GitHub
              </a>
            </Button>
          </section>
        </main>

        <footer className="text-center text-gray-600 dark:text-gray-400 py-6">
          <div className="mb-4">
            <p className="mb-3">
              &copy; 2024 AIpex - The Ultimate Chrome Incognito Tab Manager. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}