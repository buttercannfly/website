import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Chrome, Github, Home, Layout, MessageSquare, History, Bookmark } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { Metadata } from 'next';
import AipexFeatures from '@/components/ui/inner-link';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'AIpex - clear cache',
    description: 'With AIPex, you can clear cache in one keyword shortcut',
    keywords: 'clear cache, How to clear cache on chrome, manage cache',
    openGraph: {
      title: 'AIpex - clear cache',
      description: 'With AIPex, you can clear cache in one keyword shortcut',
      images: [{ url: 'With AIPex, you can clear cache in one keyword shortcut' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'AIpex - Intelligent Chrome Extension',
      description: 'With AIPex, you can clear cache in one keyword shortcut',
      images: ['https://source.unsplash.com/random/1200x630?chrome+extension'],
    },
    alternates: {
      canonical: 'https://aipex.quest/settings/cache',
      languages: {
        'en-US': 'https://aipex.quest/settings/cache',
      }
    }
  };

export default function ClearCache() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white dark:from-purple-900 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
              <Home className="h-4 w-4" />
              Home
            </Link>
            <span>/</span>
            <Link href="/settings" className="hover:text-blue-600 transition-colors">
              Settings
            </Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-white">Clear Cache</span>
          </nav>
        </div>

        <header className="text-center mb-16 pt-10">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-purple-500 blur-3xl opacity-20 rounded-full"></div>
            <h1 className="text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 relative">
              How to clear cache in Chrome?
            </h1>
          </div>
          <p className="text-2xl text-gray-600 dark:text-gray-300 mb-8">
            <a href='https://aipex.quest'>
              With AIPex, clear your cache with a simple keyboard shortcut
            </a>
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition hover:scale-105"
          >
            <Chrome className="mr-2 h-5 w-5" />{' '}
            <a href="https://chromewebstore.google.com/detail/aipex-%E2%80%94%E2%80%94-tab-history-mana/iglkpadagfelcpmiidndgjgafpdifnke?utm_source=ext_app_menu">
              Add AIPex to Chrome
            </a>
          </Button>
        </header>

        <main>
          <section className="mb-24">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">
              Clear cache with AIPex
            </h2>
            <div className="grid grid-cols-1 gap-12">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <Card className="relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-white">
                      clear cache on chrome
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="relative w-full h-120 overflow-hidden rounded-lg">
                      <img
                        src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*IqAGAVkCJ8MYH0MqdLANkQ.gif"
                        alt="clear cache"
                        className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      How to clear cache on Chrome? Press Command/Ctrl + M and type "cache" - it's that simple!
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <section className="mb-24">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">
              How to Clear Cache with AIPex?
            </h2>
            
            <div className="max-w-3xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <div className="mb-8 text-center">
                  <span className="inline-flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-lg px-4 py-2 text-lg font-medium text-blue-800 dark:text-blue-200">
                    Just Two Simple Steps
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
                        Use this simple keyboard shortcut to open the AIPex command panel
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 dark:text-white">Type "cache"</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Simply type "cache" to instantly clear your browser cache
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
                      <span className="font-medium">Pro tip:</span> You can use this shortcut to quickly clear your cache whenever you need a fresh start
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <AipexFeatures />

          <section className="mb-24">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">
              Frequently Asked Questions about clearing cache
            </h2>
            <Accordion
              type="single"
              collapsible
              className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden"
            >
              {[
                {
                  "question": "What's the shortcut key to clear cache in Chrome using AIPex?",
                  "answer": "With AIPex, clearing cache is as simple as pressing Command+M and typing 'cache'. This quick keyboard shortcut makes cache management effortless and instantaneous."
                },
                {
                  "question": "How to clear cache on Chrome with AIPex?",
                  "answer": "AIPex's cache clearing feature offers a more streamlined experience with a single keyboard shortcut (Command+M). Unlike Chrome's traditional methods, AIPex makes the process faster and more intuitive."
                },
                {
                  "question": "Can I clear cache for specific sites with AIPex?",
                  "answer": "Yes, AIPex allows you to efficiently clear cache for specific sites. Simply use Command+M and type 'cache' for the site you want to clear. The process is quick and seamless."
                },
                {
                  "question": "Is AIPex's cache clearing feature free to use?",
                  "answer": "Yes, AIPex's cache clearing feature is completely free. You can clear cache using the Command+M shortcut without any subscription or hidden costs."
                },
                {
                  "question": "Why should I use AIPex for clearing cache?",
                  "answer": "AIPex offers the fastest and most convenient way to clear cache with just Command+M and typing 'cache'. This simple approach, combined with its reliability and efficiency, makes it the ideal choice for users who frequently need to manage their cache."
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

          {/* Related Pages Section */}
          <section className="mb-24">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">
              Explore More AIpex Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Smart Tab Management',
                  description: 'Organize and group your tabs efficiently with AI',
                  href: '/tab/group',
                  icon: Layout,
                },
                {
                  title: 'Chrome Sidebar Extension',
                  description: 'Get AI assistance directly in your browser',
                  href: '/sidebar/best',
                  icon: MessageSquare,
                },
                {
                  title: 'Google Search Alternative',
                  description: 'Smarter than Google Search with AI-powered results',
                  href: '/alternatives/google',
                  icon: Chrome,
                },
                {
                  title: 'ChatGPT Search Alternative',
                  description: 'Better than ChatGPT search extensions',
                  href: '/alternatives/searchgpt',
                  icon: History,
                },
                {
                  title: 'Account & Credits',
                  description: 'Manage your account and view usage credits',
                  href: '/account',
                  icon: Bookmark,
                },
                {
                  title: 'Back to Home',
                  description: 'Return to the main AIpex homepage',
                  href: '/',
                  icon: Home,
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                  onClick={() => window.location.href = feature.href}
                >
                  <CardHeader className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">
                          {feature.title}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <p className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                    <div className="mt-4 flex items-center text-purple-600 dark:text-purple-400 text-sm font-medium">
                      Explore →
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="text-center mb-24">
            <h2 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white">
              Open Source AI Chrome Extension
            </h2>
            <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
              AIPex is an open source and free-to-use AI Chrome extension.
              Contribute to our project on GitHub!
            </p>
            <Button
              variant="outline"
              size="lg"
              className="bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900"
            >
              <Github className="mr-2 h-5 w-5" />{' '}
              <a href="https://github.com/buttercannfly/AIPex" target="_blank">
                View AIPex on GitHub
              </a>
            </Button>
          </section>
        </main>

        <footer className="text-center text-gray-600 dark:text-gray-400 py-6">
          <div className="mb-4">
            <p className="mb-3">
              &copy; 2024 AIPex - The Best Cache Manager Extension for Google Chrome. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
