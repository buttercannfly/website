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
    title: 'AIpex vs ChatGPT Search | Better Alternative to ChatGPT Search Extension',
    description: 'Compare AIpex with ChatGPT search extensions. Free, no login required, embedded ChatGPT-like search with Command+M shortcut. The most convenient way to search your tabs.',
    keywords: 'chatgpt search, chatgpt chrome extension, chatgpt alternative, free chatgpt search, embedded chatgpt, tab search ai, chrome ai search',
    openGraph: {
      title: 'AIpex - Free Alternative to ChatGPT Search Extensions',
      description: 'Search your tabs with AI power - no login, no new tabs, just Command+M for instant ChatGPT-like search experience.',
      images: [{ url: 'https://source.unsplash.com/random/1200x630?ai+search' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'AIpex - Better Than ChatGPT Search Extensions',
      description: 'Free AI-powered tab search without the hassle of ChatGPT extensions. No login required, works offline.',
      images: ['https://source.unsplash.com/random/1200x630?ai+extension'],
    },
  };

export default function ChatGPTSearch() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white dark:from-purple-900 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-16 pt-10">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-purple-500 blur-3xl opacity-20 rounded-full"></div>
            <h1 className="text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 relative">
              Better Than ChatGPT Search Extensions
            </h1>
          </div>
          <p className="text-2xl text-gray-600 dark:text-gray-300 mb-8">
            <a href='https://aipex.quest'>
            Free, embedded AI search for your tabs - No login, no new tabs, just Command+M
            </a>
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition hover:scale-105"
          >
            <Chrome className="mr-2 h-5 w-5" />{' '}
            <a href="https://chromewebstore.google.com/detail/aipex-%E2%80%94%E2%80%94-tab-history-mana/iglkpadagfelcpmiidndgjgafpdifnke?utm_source=ext_app_menu">
              Get Free AI Search Extension
            </a>
          </Button>
        </header>

        <main>
          <section className="mb-24">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">
                Why AIpex Beats ChatGPT Search Extensions
            </h2>
            <div className="aspect-w-16 aspect-h-9" style={{ paddingBottom: '56.25%', position: 'relative', height: 0, overflow: 'hidden' }}>
              <iframe
                src="https://www.youtube.com/embed/C7m4p8uPmag"
                title="AIpex vs Chatgpt Search"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
              ></iframe>
            </div>
          </section>

          <section className="mb-24">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">
                How to Use AIpex AI Search - Simpler Than ChatGPT
            </h2>
            
            <div className="max-w-3xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <div className="mb-8 text-center">
                    <span className="inline-flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-lg px-4 py-2 text-lg font-medium text-blue-800 dark:text-blue-200">
                    Search Your Tabs with AI in Two Simple Steps
                    </span>
                </div>

                <div className="space-y-8">
                    <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">1</span>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-2 dark:text-white">Press Command/Ctrl + M</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                        One shortcut to access AI search - no new tabs or ChatGPT login needed
                        </p>
                    </div>
                    </div>

                    <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">2</span>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-2 dark:text-white">Type Your Search</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                        Get instant AI-powered results from your tabs - faster than ChatGPT
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
                        <span className="font-medium">Pro tip:</span> AIpex works offline and doesn't require any API keys or ChatGPT subscription
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </section>

            <AipexFeatures />

          <section className="mb-24">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">
              AIpex vs ChatGPT Search FAQ
            </h2>
            <Accordion
              type="single"
              collapsible
              className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden"
            >
              {[
                {
                    "question": "How is AIpex different from ChatGPT search extensions?",
                    "answer": "AIpex is completely free, requires no login, and works offline. Unlike ChatGPT extensions, it's embedded directly in your browser with just Command/Ctrl+M to activate."
                },
                {
                    "question": "Do I need a ChatGPT account or API key to use AIpex?",
                    "answer": "No! AIpex works independently of ChatGPT. You don't need any accounts, API keys, or subscriptions to use our AI search features."
                },
                {
                    "question": "Is AIpex's search as powerful as ChatGPT?",
                    "answer": "AIpex is optimized specifically for searching your tabs and browser history, making it more efficient than general-purpose ChatGPT for this use case."
                },
                {
                    "question": "Does AIpex work offline like ChatGPT?",
                    "answer": "Even better - AIpex works completely offline, while ChatGPT extensions require internet connection and API access."
                },
                {
                    "question": "Will AIpex open new tabs like ChatGPT extensions?",
                    "answer": "No! AIpex is embedded in your current window - no new tabs needed. Just use Command/Ctrl+M to search instantly."
                },
                {
                    "question": "Why choose AIpex over ChatGPT extensions?",
                    "answer": "AIpex is free, faster, works offline, requires no login, and is specifically designed for browser search. It's the most convenient way to search your tabs with AI."
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
              Open Source AI Search Alternative
            </h2>
            <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
              AIpex is a free, open-source alternative to ChatGPT search extensions.
              Join our community and help make AI search better for everyone!
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
              &copy; 2024 AIpex - Free Alternative to ChatGPT Search Extensions. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}