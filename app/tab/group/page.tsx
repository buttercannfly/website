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
    title: 'AIpex - group tabs',
    description: ' With AIPex, you can group tabs in one keyword shorcut',
    keywords: 'group tabs, How to group tabs on chrome, organize tabs',
    openGraph: {
      title: 'AIpex - group tabs',
      description: 'With AIPex, you can group tabs in one keyword shorcut',
      images: [{ url: 'With AIPex, you can group tabs in one keyword shorcut' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'AIpex - Intelligent Chrome Extension',
      description: 'With AIPex, you can group tabs in one keyword shorcut',
      images: ['https://source.unsplash.com/random/1200x630?chrome+extension'],
    },
  };

export default function GroupTabs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white dark:from-purple-900 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-16 pt-10">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-purple-500 blur-3xl opacity-20 rounded-full"></div>
            <h1 className="text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 relative">
              How to group tabs in Chrome?
            </h1>
          </div>
          <p className="text-2xl text-gray-600 dark:text-gray-300 mb-8">
            <a href='https://aipex.quest'>
              With AIPex, organize and group your tabs with a simple keyboard shortcut
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
              Group tabs with AIPex
            </h2>
            <div className="grid grid-cols-1 gap-12">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <Card className="relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-white">
                      group open tabs chrome
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="relative w-full h-120 overflow-hidden rounded-lg">
                      <img
                        src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*9C-GLUsdt2kk2lgSnbSyxw.gif"
                        alt="group tabs"
                        className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      How to group tabs in Chrome? Press Command/Ctrl + M and type "organize" to instantly group your open tabs!
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <section className="mb-24">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">
              How to Group Tabs with AIPex?
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
                      <h3 className="text-xl font-semibold mb-2 dark:text-white">Type "organize"</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Simply type "organize" to automatically group your open tabs
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
                      <span className="font-medium">Pro tip:</span> AIPex intelligently groups your tabs based on content and domain similarities
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <AipexFeatures />


          <section className="mb-24">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">
              Frequently Asked Questions about grouping tabs
            </h2>
            <Accordion
              type="single"
              collapsible
              className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden"
            >
              {[
                {
                  "question": "How can I quickly group tabs in Chrome using AIPex?",
                  "answer": "With AIPex, grouping tabs is as simple as pressing Command+M and typing 'organize'. This quick keyboard shortcut automatically organizes your tabs into logical groups based on content and domain similarities."
                },
                {
                  "question": "How organize chrome extensions into sub folders ?",
                  "answer": "With AIPex, pressing Command+M and typing 'organize'. This quick keyboard shortcut automatically organizes your tabs into logical groups based on content and domain similarities."
                },
                {
                  "question": "What makes AIPex's tab grouping feature better than Chrome's built-in options?",
                  "answer": "AIPex's tab grouping feature uses AI to intelligently organize your tabs based on content relationships, not just domains. It's faster than manual grouping and more accurate than traditional automated solutions."
                },
                {
                  "question": "How does AIPex decide how to group my tabs?",
                  "answer": "AIPex analyzes tab content, URLs, and page context to create meaningful groups. It intelligently identifies related content and creates logical groupings that make sense for your workflow."
                },
                {
                  "question": "Is AIPex's tab grouping feature free to use?",
                  "answer": "Yes, AIPex's tab grouping feature is completely free. You can organize unlimited tabs using the Command+M shortcut without any subscription or hidden costs."
                },
                {
                  "question": "Why should I use AIPex for grouping tabs?",
                  "answer": "AIPex offers the most intelligent and efficient way to organize tabs with just Command+M and typing 'organize'. Its AI-powered grouping, combined with the simple shortcut, makes it the ideal choice for users who want to keep their tabs organized automatically."
                },
                {
                  "question": "How organize chrome extensions into sub folders",
                  "answer": "With AIPex, grouping tabs is as simple as pressing Command+M and typing 'organize'"
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
              &copy; 2024 AIPex - The Best Tab Manager Extension for Google Chrome. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}