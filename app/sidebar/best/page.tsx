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
    title: 'AIpex - Best Chrome Sidebar Extension | ChatGPT Sidebar Extension',
    description: 'AIpex is the ultimate Chrome sidebar extension that lets you embed ChatGPT in any webpage.',
    keywords: 'sidebar extension, chrome sidebar extension, best sidebar extension, chatgpt sidebar extension, browser sidebar extension, web sidebar extension, chrome extension sidebar, sidebar extension for chrome, sidebar extension chrome, sidebar extension chatgpt',
    openGraph: {
      title: 'AIpex - Best Chrome Sidebar Extension | ChatGPT Sidebar Extension',
      description: 'AIpex is the ultimate Chrome sidebar extension that lets you embed ChatGPT in any webpage. The most powerful and user-friendly sidebar extension for Chrome.',
      images: [{ url: 'https://source.unsplash.com/random/1200x630?chrome+sidebar+extension' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'AIpex - Best Chrome Sidebar Extension',
      description: 'The most powerful and user-friendly sidebar extension for Chrome. Embed ChatGPT in any webpage instantly.',
      images: ['https://source.unsplash.com/random/1200x630?chrome+extension'],
    },
    alternates: {
      canonical: 'https://aipex.quest/sidebar/best',
      languages: {
        'en-US': 'https://aipex.quest/sidebar/best',
      }
    }
  };

export default function BestChatGPTSidebar() {
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
            <Link href="/sidebar" className="hover:text-blue-600 transition-colors">
              Sidebar Extension
            </Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-white">Best Sidebar Extension</span>
          </nav>
        </div>

        <header className="text-center mb-16 pt-10">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-purple-500 blur-3xl opacity-20 rounded-full"></div>
            <h1 className="text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 relative">
              Best Chrome Sidebar Extension with ChatGPT Integration
            </h1>
          </div>
          <p className="text-2xl text-gray-600 dark:text-gray-300 mb-8">
            <a href='https://aipex.quest'>
              Transform your browsing experience with AIpex - the most powerful Chrome sidebar extension for instant AI assistance
            </a>
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition hover:scale-105"
          >
            <Chrome className="mr-2 h-5 w-5" />{' '}
            <a href="https://chromewebstore.google.com/detail/aipex-%E2%80%94%E2%80%94-tab-history-mana/iglkpadagfelcpmiidndgjgafpdifnke?utm_source=ext_app_menu">
              Install AIpex Sidebar Extension
            </a>
          </Button>
        </header>

        <main>
          <section className="mb-24">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">
              The Ultimate Chrome Sidebar Extension
            </h2>
            <div className="grid grid-cols-1 gap-12">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <Card className="relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-white">
                      Most Advanced Sidebar Extension for Chrome
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="relative w-full h-120 overflow-hidden rounded-lg">
                      <img
                        src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*IqAGAVkCJ8MYH0MqdLANkQ.gif"
                        alt="Chrome Sidebar Extension Demo"
                        className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      Experience the best Chrome sidebar extension: Press Command/Ctrl + M and type &quot;ai&quot; - it&apos;s that simple!
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <section className="mb-24">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">
              How to Use Our Chrome Sidebar Extension?
            </h2>
            
            <div className="max-w-3xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <div className="mb-8 text-center">
                  <span className="inline-flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-lg px-4 py-2 text-lg font-medium text-blue-800 dark:text-blue-200">
                    Quick Setup Guide
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
                        Activate your sidebar extension with this simple keyboard shortcut
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 dark:text-white">Type &quot;ai&quot;</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Launch the AI-powered sidebar extension instantly in your current webpage
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
                      <span className="font-medium">Pro tip:</span> Our sidebar extension works seamlessly across all websites for maximum productivity
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <AipexFeatures />

          <section className="mb-24">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">
              Chrome Sidebar Extension FAQs
            </h2>
            <Accordion
              type="single"
              collapsible
              className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden"
            >
              {[
                {
                  "question": "What makes AIpex the best Chrome sidebar extension?",
                  "answer": "AIpex stands out as the best Chrome sidebar extension due to its seamless integration, powerful AI capabilities, and intuitive keyboard shortcuts. Our sidebar extension combines functionality with ease of use."
                },
                {
                  "question": "How does AIpex sidebar extension compare to other Chrome extensions?",
                  "answer": "AIpex offers a more comprehensive sidebar experience with instant AI integration, customizable features, and faster performance compared to traditional Chrome sidebar extensions."
                },
                {
                  "question": "Can I customize the sidebar extension settings?",
                  "answer": "Yes, AIpex provides full customization options for your sidebar extension. Adjust the size, position, and behavior to match your browsing preferences."
                },
                {
                  "question": "Is this Chrome sidebar extension free to use?",
                  "answer": "Yes, AIpex sidebar extension is completely free. You get full access to all features without any subscription fees or hidden costs."
                },
                {
                  "question": "Why choose AIpex as your Chrome sidebar extension?",
                  "answer": "AIpex is the most advanced and user-friendly sidebar extension available for Chrome. With AI integration, quick access shortcuts, and robust features, it enhances your browsing experience significantly."
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
                  title: 'Google Search Alternative',
                  description: 'Smarter than Google Search with AI-powered results',
                  href: '/alternatives/google',
                  icon: Chrome,
                },
                {
                  title: 'ChatGPT Search Alternative',
                  description: 'Better than ChatGPT search extensions',
                  href: '/alternatives/searchgpt',
                  icon: MessageSquare,
                },
                {
                  title: 'Clear Browser Cache',
                  description: 'Quickly clear cache with simple shortcuts',
                  href: '/settings/cache',
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
              Open Source Sidebar Extension
            </h2>
            <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
              AIpex is an open source and free Chrome sidebar extension.
              Join our community and help improve the future of browser extensions!
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
              &copy; 2024 AIpex - The Best Chrome Sidebar Extension with AI Integration. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
