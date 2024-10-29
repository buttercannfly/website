import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Bookmark,
  History,
  Layout,
  MessageSquare,
  Chrome,
  Github,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Metadata } from 'next';
import AipexFeatures from '@/components/ui/inner-link';

export const metadata: Metadata = {
    title: 'AIpex - How to Restore Tabs in Chrome | Best Tab Restore Extension',
    description: 'Learn how to restore closed tabs in Chrome with AIpex. Quick tab restoration with keyboard shortcuts. The best Chrome extension for restoring tabs and managing browser history.',
    keywords: 'restore tabs, restore closed tabs, restore chrome tabs, how to restore tabs on chrome, chrome tab restore, restore last closed tab, restore tab shortcut, tab recovery chrome, reopen closed tabs chrome, restore tab history',
    openGraph: {
      title: 'AIpex - Ultimate Chrome Tab Restore & Tab Recovery Solution',
      description: 'Easily restore closed tabs in Chrome with one-click shortcuts. Never lose your tabs again with AIpex tab restore and tab recovery features.',
      images: [{ url: 'https://source.unsplash.com/random/1200x630?chrome+tab+restore' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'AIpex - Professional Tab Restore & Tab Recovery Extension',
      description: 'The most efficient way to restore tabs in Chrome. Restore closed tabs instantly with our powerful tab restore features.',
      images: ['https://source.unsplash.com/random/1200x630?chrome+extension'],
    },
  };

export default function Restore() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white dark:from-purple-900 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-16 pt-10">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-purple-500 blur-3xl opacity-20 rounded-full"></div>
            <h1 className="text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 relative">
              How to Restore Tabs in Chrome - Complete Guide to Tab Recovery
            </h1>
          </div>
          <p className="text-2xl text-gray-600 dark:text-gray-300 mb-8">
            <a href='https://aipex.quest'>
            Instantly restore closed tabs and recover lost browsing sessions with AIpex&apos;s powerful tab restore features
            </a>
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition hover:scale-105"
          >
            <Chrome className="mr-2 h-5 w-5" />{' '}
            <a href="https://chromewebstore.google.com/detail/aipex-%E2%80%94%E2%80%94-tab-history-mana/iglkpadagfelcpmiidndgjgafpdifnke?utm_source=ext_app_menu">
              Get Ultimate Tab Restore Extension
            </a>
          </Button>
        </header>

        <main>
          <section className="mb-24">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">
                Quick Tab Restore & Recovery with AIpex
            </h2>
            <div className="grid grid-cols-1 gap-12">
              {[
                {
                  title: 'Restore Closed Tabs & Recover Lost Sessions Instantly',
                  src: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*oXexreLF9ROK85iv58ZRNQ.gif',
                  alt: 'Chrome tab restore and recovery demonstration',
                  description:
                    'Never lose your tabs again! Simply use Command/Ctrl + M to restore any closed tab in Chrome instantly. Our advanced tab restore features help you recover your entire browsing history.',
                }
              ].map((item, index) => (
                <div key={index} className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                  <Card className="relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-white">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="relative w-full h-120 overflow-hidden rounded-lg">
                        <img
                          src={item.src}
                          alt={item.alt}
                          className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <p className="text-lg text-gray-600 dark:text-gray-300">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-24">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">
                Complete Guide to Tab Restore and Recovery in Chrome
            </h2>
            
            <div className="max-w-3xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <div className="mb-8 text-center">
                    <span className="inline-flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-lg px-4 py-2 text-lg font-medium text-blue-800 dark:text-blue-200">
                    Restore Tabs and Recover Sessions in Two Easy Steps
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
                        Access the tab restore and recovery panel with this universal shortcut
                        </p>
                    </div>
                    </div>

                    <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">2</span>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-2 dark:text-white">Type &quot;restore&quot;</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                        Find and restore recently closed tabs from your complete browsing history
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
                        <span className="font-medium">Pro tip:</span> Use AIpex&apos;s advanced tab restore features anytime to recover your browsing sessions and restore important tabs
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </section>

            <AipexFeatures />


          <section className="mb-24">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">
              Common Questions About Tab Restore and Recovery
            </h2>
            <Accordion
              type="single"
              collapsible
              className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden"
            >
              {[
                {
                    "question": "What's the fastest way to restore tabs with AIpex?",
                    "answer": "AIpex provides the quickest tab restore solution with Command+M shortcut. This simple keyboard combination lets you restore tabs instantly without any additional clicks."
                },
                {
                    "question": "How does AIpex's tab restore feature compare to Chrome's built-in options?",
                    "answer": "AIpex offers a more comprehensive tab restore experience with a single keyboard shortcut (Command+M). Unlike Chrome's built-in Ctrl+Shift+T, AIpex provides a searchable history of closed tabs and smarter tab restore features."
                },
                {
                    "question": "Can I restore multiple closed tabs at once?",
                    "answer": "Yes! AIpex's advanced tab restore capabilities allow you to restore multiple tabs simultaneously. Simply use Command+M to open the restore panel and select multiple tabs from your browsing history."
                },
                {
                    "question": "How long does AIpex keep my closed tab history for restoration?",
                    "answer": "AIpex maintains an extensive history of your closed tabs, making it easy to restore tabs from previous browsing sessions. You can access and restore tabs from weeks ago using our powerful tab restore features."
                },
                {
                    "question": "Is the tab restore feature available offline?",
                    "answer": "Yes, AIpex's tab restore feature works offline. Your recent tab history is stored locally, allowing you to restore tabs even without an internet connection."
                },
                {
                    "question": "Why choose AIpex for tab restoration?",
                    "answer": "AIpex combines speed, simplicity, and powerful tab restore features for the best tab recovery experience. With intelligent tab management and a user-friendly interface, it's the most efficient way to restore and organize your browsing sessions."
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
              Open Source Tab Restore Solution
            </h2>
            <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
              AIpex is a free, open-source Chrome extension for intelligent tab restore and management.
              Join our community and contribute to better tab restoration!
            </p>
            <Button
              variant="outline"
              size="lg"
              className="bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900"
            >
              <Github className="mr-2 h-5 w-5" />{' '}
              <a href="https://github.com/buttercannfly/AIpex" target="_blank" >
                {' '}
                View AIpex on GitHub
              </a>
            </Button>
          </section>
        </main>

        <footer className="text-center text-gray-600 dark:text-gray-400 py-6">
          <div className="mb-4">
            <p className="mb-3">
              &copy; 2024 AIpex - The Ultimate Chrome Tab Restore & Recovery Extension. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
