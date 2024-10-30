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
    title: 'How to Close Tab in Chrome | Best Tab Closing Extension - AIPex',
    description: 'Learn how to close tabs quickly in Chrome with AIPex. The fastest way to close tabs using keyboard shortcuts and smart controls. Get the best Chrome tab closing extension.',
    keywords: 'close tab, how to close tab in chrome, chrome close tab, close tab shortcut, close multiple tabs, close tab extension, chrome tab closer, close tab chrome extension, tab closing shortcut, best way to close tabs',
    openGraph: {
      title: 'AIPex - The Ultimate Chrome Tab Closing Solution',
      description: 'Close Chrome tabs instantly with keyboard shortcuts. The most efficient way to manage and close browser tabs.',
      images: [{ url: 'Close Chrome tabs instantly with AIPex smart tab controls' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'AIPex - Smart Tab Closing for Chrome',
      description: 'The fastest way to close Chrome tabs with keyboard shortcuts',
      images: ['https://source.unsplash.com/random/1200x630?chrome+extension'],
    },
  };

export default function CloseTab() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white dark:from-purple-900 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-16 pt-10">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-purple-500 blur-3xl opacity-20 rounded-full"></div>
            <h1 className="text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 relative">
              Close Chrome Tabs Instantly & Efficiently
            </h1>
          </div>
          <p className="text-2xl text-gray-600 dark:text-gray-300 mb-8">
            <a href='https://aipex.quest'>
              Master tab management with AIPex - Close any Chrome tab with lightning-fast keyboard shortcuts
            </a>
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition hover:scale-105"
          >
            <Chrome className="mr-2 h-5 w-5" />{' '}
            <a href="https://chromewebstore.google.com/detail/aipex-%E2%80%94%E2%80%94-tab-history-mana/iglkpadagfelcpmiidndgjgafpdifnke?utm_source=ext_app_menu">
              Get the Best Tab Closing Extension for Chrome
            </a>
          </Button>
        </header>

        <main>
          <section className="mb-24">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">
              The Ultimate Chrome Tab Closing Experience
            </h2>
            <div className="grid grid-cols-1 gap-12">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <Card className="relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-white">
                      Close Chrome Tabs with One Quick Shortcut
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="relative w-full h-120 overflow-hidden rounded-lg">
                      <img
                        src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*IqAGAVkCJ8MYH0MqdLANkQ.gif"
                        alt="Closing tabs quickly in Chrome with AIPex"
                        className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      Master the art of tab management in Chrome! Simply press Command/Ctrl + M and type "closetab" to instantly close any tab. It's the fastest way to keep your browser organized.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <section className="mb-24">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">
              Quick Guide: Close Chrome Tabs Like a Pro
            </h2>
            
            <div className="max-w-3xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <div className="mb-8 text-center">
                  <span className="inline-flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-lg px-4 py-2 text-lg font-medium text-blue-800 dark:text-blue-200">
                    Master Tab Closing in Two Easy Steps
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
                        Activate AIPex's powerful command panel with this universal shortcut
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 dark:text-white">Type "closetab"</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Enter "closetab" for instant tab closure - the fastest way to close Chrome tabs
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
                      <span className="font-medium">Pro tip:</span> Use this powerful shortcut combination on any tab for lightning-fast tab management
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <AipexFeatures />

          <section className="mb-24">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">
              Expert Tips for Closing Chrome Tabs
            </h2>
            <Accordion
              type="single"
              collapsible
              className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden"
            >
              {[
                {
                  "question": "What's the fastest way to close tabs in Chrome?",
                  "answer": "AIPex provides the fastest method: simply press Command+M and type 'closetab'. This shortcut is designed for maximum efficiency and speed when managing your Chrome tabs."
                },
                {
                  "question": "How does AIPex's tab closing compare to Chrome's built-in methods?",
                  "answer": "AIPex offers a more streamlined experience with its Command+M shortcut. Unlike Chrome's traditional methods, AIPex makes tab closing faster, more intuitive, and accessible from anywhere in your browser."
                },
                {
                  "question": "Can I close multiple Chrome tabs efficiently with AIPex?",
                  "answer": "Yes! AIPex lets you rapidly close multiple tabs using the Command+M shortcut. Simply repeat the process for each tab - it's significantly faster than traditional methods."
                },
                {
                  "question": "Is AIPex's tab closing feature available for all Chrome users?",
                  "answer": "Yes, AIPex's tab closing feature is completely free and available to all Chrome users. Install the extension and start using the powerful tab management features immediately."
                },
                {
                  "question": "Why is AIPex the best choice for closing Chrome tabs?",
                  "answer": "AIPex combines speed, efficiency, and user-friendly design to create the ultimate tab closing solution. With features like instant keyboard shortcuts and smart controls, it's the most advanced tab management tool available."
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
              Open Source Tab Management Extension
            </h2>
            <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
              AIPex is an open source and free tab management extension.
              Join our community and help improve Chrome tab management!
            </p>
            <Button
              variant="outline"
              size="lg"
              className="bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900"
            >
              <Github className="mr-2 h-5 w-5" />{' '}
              <a href="https://github.com/buttercannfly/AIPex" target="_blank">
                Explore AIPex on GitHub
              </a>
            </Button>
          </section>
        </main>

        <footer className="text-center text-gray-600 dark:text-gray-400 py-6">
          <div className="mb-4">
            <p className="mb-3">
              &copy; 2024 AIPex - The Ultimate Tab Management Extension for Chrome. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}