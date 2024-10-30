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
    title: 'AIPex - The Best Way to Switch Tabs in Chrome',
    description: 'Learn how to switch tabs efficiently in Chrome with AIPex. Quick tab switching with keyboard shortcuts and smart search.',
    keywords: 'switch tabs, switch between tabs, tab switching chrome, how to switch tabs, chrome tab switcher, quick tab switch, keyboard tab switch'
  };

export default function Restore() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white dark:from-purple-900 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-16 pt-10">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-purple-500 blur-3xl opacity-20 rounded-full"></div>
            <h1 className="text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 relative">
              Switch Tabs in Chrome Like a Pro
            </h1>
          </div>
          <p className="text-2xl text-gray-600 dark:text-gray-300 mb-8">
            <a href='https://aipex.quest'>
              Master tab switching in Chrome with AIPex - The smartest way to switch between tabs using Command/Ctrl + M
            </a>
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition hover:scale-105"
          >
            <Chrome className="mr-2 h-5 w-5" />{' '}
            <a href="https://chromewebstore.google.com/detail/aipex-%E2%80%94%E2%80%94-tab-history-mana/iglkpadagfelcpmiidndgjgafpdifnke?utm_source=ext_app_menu">
              Get Quick Tab Switching with AIPex
            </a>
          </Button>
        </header>

        <main>
          <section className="mb-24">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">
                Effortless Tab Switching in Chrome
            </h2>
            <div className="grid grid-cols-1 gap-12">
              {[
                {
                  title: 'Switch Between Chrome Tabs Instantly',
                  src: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*asTnKKa6GIBOsB2s8_rF0w.gif',
                  alt: 'Quick tab switching demonstration',
                  description:
                    'Switch tabs effortlessly in Chrome with AIPex. Just press Command/Ctrl + M to instantly switch between any open tabs!',
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
                Master Tab Switching with AIPex
            </h2>
            
            <div className="max-w-3xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <div className="mb-8 text-center">
                    <span className="inline-flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-lg px-4 py-2 text-lg font-medium text-blue-800 dark:text-blue-200">
                    Switch Tabs in Two Easy Steps
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
                        Activate AIPex's quick tab switcher with this simple shortcut
                        </p>
                    </div>
                    </div>

                    <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">2</span>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-2 dark:text-white">Search and Switch</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                        Type the URL or title to instantly switch to your desired tab
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
                        <span className="font-medium">Pro tip:</span> Use AIPex's smart tab switching to quickly navigate between tabs, bookmarks, and history
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </section>

            <AipexFeatures />


          <section className="mb-24">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">
              Tab Switching FAQs - Everything You Need to Know
            </h2>
            <Accordion
              type="single"
              collapsible
              className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden"
            >
              {[
                {
                    "question": "What's the fastest way to switch tabs in Chrome?",
                    "answer": "AIPex provides the fastest tab switching solution - just press Command+M and type your tab's name or URL. Our smart search instantly switches to your desired tab."
                },
                {
                    "question": "How does AIPex make tab switching easier?",
                    "answer": "AIPex streamlines tab switching with intelligent search and keyboard shortcuts. Just use Command/Ctrl + M to switch between tabs instantly."
                },
                {
                    "question": "What makes AIPex the best tab switcher?",
                    "answer": "AIPex combines smart search with quick keyboard shortcuts for the most efficient tab switching experience in Chrome."
                },
                {
                    "question": "Is AIPex's tab switching feature free?",
                    "answer": "Yes, AIPex's powerful tab switching feature is completely free. Switch between unlimited tabs without any subscription."
                },
                {
                    "question": "How to switch between multiple Chrome tabs quickly?",
                    "answer": "Use AIPex's Command/Ctrl + M shortcut to instantly switch between any open tabs in Chrome."
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
              Open Source Tab Switching Extension
            </h2>
            <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
              AIPex is an open source and free tab switching solution.
              Join our community and contribute to better tab management!
            </p>
            <Button
              variant="outline"
              size="lg"
              className="bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900"
            >
              <Github className="mr-2 h-5 w-5" />{' '}
              <a href="https://github.com/buttercannfly/AIPex" target="_blank" >
                {' '}
                Explore AIPex on GitHub
              </a>
            </Button>
          </section>
        </main>

        <footer className="text-center text-gray-600 dark:text-gray-400 py-6">
          <div className="mb-4">
            <p className="mb-3">
              &copy; 2024 AIPex - The Ultimate Tab Switching Extension for Chrome. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
