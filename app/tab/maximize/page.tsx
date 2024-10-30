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
    title: 'AIpex - How to Maximize Window in Chrome | Best Window Maximizer',
    description: 'Learn how to maximize windows in Chrome quickly and easily with AIPex. One-click window maximization, keyboard shortcuts, and smart window management tools.',
    keywords: 'maximize window, maximize chrome window, how to maximize window, window maximizer chrome, maximize browser window, chrome window maximize shortcut, maximize window size chrome, maximize chrome tab, maximize chrome browser window, window maximizer extension',
    openGraph: {
      title: 'AIpex - The Ultimate Chrome Window Maximizer Tool',
      description: 'Maximize Chrome windows instantly with keyboard shortcuts and smart controls. The most efficient way to manage window size.',
      images: [{ url: 'Maximize Chrome windows instantly with AIPex smart window controls' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'AIpex - Smart Window Maximization for Chrome',
      description: 'The fastest way to maximize Chrome windows with keyboard shortcuts',
      images: ['https://source.unsplash.com/random/1200x630?chrome+extension'],
    },
  };

export default function MaximizeWindow() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white dark:from-purple-900 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-16 pt-10">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-purple-500 blur-3xl opacity-20 rounded-full"></div>
            <h1 className="text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 relative">
              How to Maximize Windows in Chrome Efficiently
            </h1>
          </div>
          <p className="text-2xl text-gray-600 dark:text-gray-300 mb-8">
            <a href='https://aipex.quest'>
              The smartest Chrome window maximizer - Maximize any window instantly with AIPex's powerful shortcuts
            </a>
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition hover:scale-105"
          >
            <Chrome className="mr-2 h-5 w-5" />{' '}
            <a href="https://chromewebstore.google.com/detail/aipex-%E2%80%94%E2%80%94-tab-history-mana/iglkpadagfelcpmiidndgjgafpdifnke?utm_source=ext_app_menu">
              Get the Best Window Maximizer for Chrome
            </a>
          </Button>
        </header>

        <main>
          <section className="mb-24">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">
              The Ultimate Chrome Window Maximizer
            </h2>
            <div className="grid grid-cols-1 gap-12">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <Card className="relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-white">
                      Smart Window Maximization for Chrome
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="relative w-full h-120 overflow-hidden rounded-lg">
                      <img
                        src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*aEC0T87pAbTwYsAACEfYxw.gif"
                        alt="Chrome window maximizer in action"
                        className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      Looking for the fastest way to maximize windows in Chrome? Simply press Command/Ctrl + M and type "maximize" - Experience the most efficient window management tool!
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <section className="mb-24">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">
              Master Chrome Window Maximization with AIPex
            </h2>
            
            <div className="max-w-3xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <div className="mb-8 text-center">
                  <span className="inline-flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-lg px-4 py-2 text-lg font-medium text-blue-800 dark:text-blue-200">
                    Maximize Windows in Two Easy Steps
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
                        Access AIPex's powerful window maximization features with this quick shortcut
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 dark:text-white">Type "maximize"</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Instantly maximize your Chrome window to full screen with one command
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
                      <span className="font-medium">Pro tip:</span> Use AIPex's window maximizer on any Chrome window or tab for optimal viewing experience
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <AipexFeatures />

          <section className="mb-24">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">
              Chrome Window Maximizer FAQs
            </h2>
            <Accordion
              type="single"
              collapsible
              className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden"
            >
              {[
                {
                  "question": "What's the fastest way to maximize windows in Chrome?",
                  "answer": "AIPex provides the quickest window maximization method - simply press Command+M and type 'maximize'. This shortcut works instantly on any Chrome window or tab."
                },
                {
                  "question": "How does AIPex's window maximizer compare to Chrome's built-in controls?",
                  "answer": "AIPex's window maximizer offers a more streamlined experience with keyboard shortcuts and smart controls. Unlike Chrome's traditional methods, AIPex makes window maximization faster and more intuitive."
                },
                {
                  "question": "Can I maximize multiple Chrome windows simultaneously?",
                  "answer": "Yes, AIPex's window maximizer lets you efficiently maximize multiple windows. Use Command+M and type 'maximize' for each window you want to maximize - it's quick and seamless."
                },
                {
                  "question": "What are the best shortcuts for maximizing Chrome windows?",
                  "answer": "AIPex offers the most efficient shortcut: Command/Ctrl + M followed by typing 'maximize'. This combination provides instant window maximization with minimal effort."
                },
                {
                  "question": "Why choose AIPex as your Chrome window maximizer?",
                  "answer": "AIPex is the most advanced window maximizer for Chrome, offering instant maximization through keyboard shortcuts, smart controls, and seamless integration. It's designed for users who value efficiency and productivity."
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
              Open Source Window Management Extension
            </h2>
            <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
              AIPex is an open source and free window maximizer for Chrome.
              Join our community and help improve window management!
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
              &copy; 2024 AIPex - The Ultimate Window Maximizer for Chrome. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}