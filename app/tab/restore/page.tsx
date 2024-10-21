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
    title: 'AIpex - Restore tabs',
    description: ' With AIPex, you can restore tabs in one keyword shorcut',
    keywords: 'restore tabs,How to restore tabs on chrome',
    openGraph: {
      title: 'AIpex - Restore tabs',
      description: 'Manage your tabs, history, and bookmarks with AI-powered assistance.',
      images: [{ url: 'With AIPex, you can restore tabs in one keyword shorcut' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'AIpex - Intelligent Chrome Extension',
      description: 'Manage your tabs, history, and bookmarks with AI-powered assistance.',
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
              How to restore tabs on chrome ​?
            </h1>
          </div>
          <p className="text-2xl text-gray-600 dark:text-gray-300 mb-8">
            <a href='https://aipex.quest'>
            With AIPex, you can restore tabs in one keyword shorcut
            </a>
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition hover:scale-105"
          >
            <Chrome className="mr-2 h-5 w-5" />{' '}
            <a href="https://chromewebstore.google.com/detail/aipex-%E2%80%94%E2%80%94-tab-history-mana/iglkpadagfelcpmiidndgjgafpdifnke?utm_source=ext_app_menu">
              Add AIpex to Chrome
            </a>
          </Button>
        </header>

        <main>
          <section className="mb-24">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">
                Restore tabs with AIPex
            </h2>
            <div className="grid grid-cols-1 gap-12">
              {[
                {
                  title: 'restore tabs on chrome',
                  src: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*oXexreLF9ROK85iv58ZRNQ.gif',
                  alt: 'restore tab',
                  description:
                    'How to restore tabs on chrome ​? Command/Ctrl + M and then you get there !',
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
                How to Restore Tabs with AIPex?
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
                        Use this simple keyboard shortcut to open the restore panel
                        </p>
                    </div>
                    </div>

                    <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">2</span>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-2 dark:text-white">Type "restore"</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                        Search for your closed tabs by typing "restore" in the search box
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
                        <span className="font-medium">Pro tip:</span> You can also use this shortcut anytime to quickly find and restore your recently closed tabs
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </section>

            <AipexFeatures />


          <section className="mb-24">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">
              Frequently Asked Questions about restore tabs
            </h2>
            <Accordion
              type="single"
              collapsible
              className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden"
            >
              {[
                {
                    "question": "How can I quickly restore tabs in AIpex?",
                    "answer": "With AIpex, you can instantly restore tabs using the simple Command+M shortcut. This quick keyboard combination makes tab restoration effortless and easy to remember."
                },
                {
                    "question": "What makes AIpex's restore tabs feature better than other extensions?",
                    "answer": "AIpex's restore tabs feature stands out with its minimalist approach - just press Command+M. Unlike other tab managers that require multiple steps, AIpex reduces the learning curve to a single, memorable shortcut."
                },
                {
                    "question": "Does AIpex save my restored tabs history?",
                    "answer": "Yes, AIpex automatically saves your tab history locally on your device. You can easily restore tabs from previous browsing sessions using Command+M, without worrying about data privacy."
                },
                {
                    "question": "Is AIpex's restore tabs feature free to use?",
                    "answer": "Yes, AIpex's restore tabs feature is completely free. You can restore unlimited tabs using the Command+M shortcut without any subscription or hidden costs."
                },
                {
                    "question": "Why should I use AIpex for restoring tabs?",
                    "answer": "AIpex offers the simplest way to restore tabs with just Command+M. This low memory burden combined with reliable tab restoration makes it the ideal choice for users who want an efficient, straightforward tab management solution."
                }
                ].map((item, index) => (
                <AccordionItem key={index} value={`item-${index + 1}`}>
                  <AccordionTrigger className="px-6 py-4 text-lg font-semibold text-gray-800 dark:text-white hover:bg-purple-50 dark:hover:bg-purple-900">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 text-gray-600 dark:text-gray-300">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <section className="text-center mb-24">
            <h2 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white">
              Open Source AI Chrome Extension
            </h2>
            <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
              AIpex is an open source and free-to-use AI Chrome extension.
              Contribute to our project on GitHub!
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
              &copy; 2024 AIpex - The Best Tab Manager Extension for Google Chrome. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
