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

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white dark:from-purple-900 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-16 pt-10">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-purple-500 blur-3xl opacity-20 rounded-full"></div>
            <h1 className="text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 relative">
              AIpex
            </h1>
          </div>
          <p className="text-2xl text-gray-600 dark:text-gray-300 mb-8">
            The Best Tab Manager Extension for Google Chrome
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition hover:scale-105"
          >
            <Chrome className="mr-2 h-5 w-5" />{' '}
            <a href="https://chromewebstore.google.com/detail/aipex-%E2%80%94%E2%80%94-tab-history-mana/iglkpadagfelcpmiidndgjgafpdifnke?utm_source=ext_app_menu">
              Add AIpex to Chrome{' '}
            </a>
          </Button>
        </header>

        <main>
          <section className="mb-24">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">
              Supercharge Your Browsing with AI
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: 'Smart Tab Management',
                  icon: Layout,
                  description: 'AI-powered tab organization and grouping',
                },
                {
                  title: 'Intelligent History',
                  icon: History,
                  description: 'Context-aware browsing history suggestions',
                },
                {
                  title: 'Dynamic Bookmarks',
                  icon: Bookmark,
                  description:
                    'Auto-categorized and easily accessible bookmarks',
                },
                {
                  title: 'ChatGPT Sidebar',
                  icon: MessageSquare,
                  description: 'Integrated AI assistant for instant help',
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
                >
                  <CardHeader className="bg-gradient-to-br from-purple-500 to-pink-500 p-6 group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
                    <feature.icon className="w-12 h-12 mb-4 text-white" />
                    <CardTitle className="text-white">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="w-full max-w-7xl mx-auto px-4 mb-24">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">
              AIpex: The AI Chrome Extension in Action
            </h2>
            <div className="grid grid-cols-1 gap-12">
              {[
                {
                  title: 'AI-Powered Tab Organization',
                  src: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*9C-GLUsdt2kk2lgSnbSyxw.gif',
                  alt: 'AI-Powered Tab Organization',
                  description:
                    'Effortlessly organize your tabs using AI-driven suggestions and groupings.',
                },
                {
                  title: 'Unified Management',
                  src: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*vHkVQfDKE5GOxHp-J6fE_w.gif',
                  alt: 'History, Tab, and Bookmark Manager',
                  description:
                    'Seamlessly manage your history, tabs, and bookmarks in one place.',
                },
                {
                  title: 'ChatGPT Sidebar',
                  src: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*SgLf-C8bbcfdZUzm0ICZ8A.gif',
                  alt: 'ChatGPT Sidebar',
                  description:
                    'Get instant AI assistance with our integrated ChatGPT sidebar.',
                },
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
              How AIpex Works
            </h2>
            <Tabs defaultValue="tabs" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="tabs" className="text-lg">
                  Tabs
                </TabsTrigger>
                <TabsTrigger value="history" className="text-lg">
                  History
                </TabsTrigger>
                <TabsTrigger value="bookmarks" className="text-lg">
                  Bookmarks
                </TabsTrigger>
                <TabsTrigger value="chatgpt" className="text-lg">
                  ChatGPT
                </TabsTrigger>
              </TabsList>
              {[
                {
                  value: 'tabs',
                  title: 'Tab Management',
                  description: 'Organize your tabs efficiently',
                  content:
                    "AIpex uses advanced AI algorithms to group related tabs, identify and merge duplicate tabs, and provide quick access to your most frequently used tabs. It's the best tab manager extension for Google Chrome, learning from your browsing habits to optimize your workflow.",
                },
                {
                  value: 'history',
                  title: 'History Management',
                  description: 'Navigate your browsing history with ease',
                  content:
                    'Our intelligent history management system uses context-aware AI to suggest relevant past visits based on your current browsing session. It makes finding that elusive webpage you visited last week a breeze.',
                },
                {
                  value: 'bookmarks',
                  title: 'Bookmark Management',
                  description: 'Keep your bookmarks organized',
                  content:
                    'AIpex automatically categorizes and tags your bookmarks using natural language processing. It creates a dynamic, self-organizing bookmark system that evolves with your interests and makes finding saved pages intuitive.',
                },
                {
                  value: 'chatgpt',
                  title: 'ChatGPT Sidebar',
                  description: 'AI-powered assistance at your fingertips',
                  content:
                    "The integrated ChatGPT sidebar provides instant, context-aware assistance. Whether you need a quick summary of a long article, help with research, or coding tips, AIpex's AI assistant is always ready to help, making it a truly intelligent Chrome extension.",
                },
              ].map((tab) => (
                <TabsContent key={tab.value} value={tab.value}>
                  <Card className="bg-white dark:bg-gray-800 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
                        {tab.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-300">
                        {tab.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 dark:text-gray-200">
                        {tab.content}
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </section>

          <section className="mb-24">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">
              Frequently Asked Questions about AIpex
            </h2>
            <Accordion
              type="single"
              collapsible
              className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden"
            >
              {[
                {
                  question: 'Is AIpex free to use?',
                  answer:
                    'Yes, AIpex is completely free and open-source. You can use all its features, including the tab manager and ChatGPT sidebar, without any cost.',
                },
                {
                  question: 'How does AIpex handle my data?',
                  answer:
                    "AIpex respects your privacy. All data processing happens locally on your device. We don't store or transmit your browsing data to any external servers.",
                },
                {
                  question: 'Can I use AIpex on browsers other than Chrome?',
                  answer:
                    "Currently, AIpex is only available as a Chrome extension. We're considering support for other browsers in the future.",
                },
                {
                  question: 'How can I contribute to the AIpex project?',
                  answer:
                    'As an open-source project, we welcome contributions! You can contribute by submitting bug reports, feature requests, or pull requests on our GitHub repository.',
                },
                {
                  question:
                    'What makes AIpex the best tab manager extension for Google Chrome?',
                  answer:
                    'AIpex combines AI-powered tab management, intelligent history suggestions, dynamic bookmarks, and a ChatGPT sidebar. This comprehensive approach to browser organization and assistance sets it apart from other tab managers.',
                },
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
            <div className="flex justify-center gap-4 text-sm">
              <a 
                href="https://fluxai.pro/" 
                title="Flux AI Pro"
                className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                target="_blank" 
                rel="noopener noreferrer"
              >
                Flux AI Pro
              </a>
              <span className="text-gray-400">•</span>
              <a 
                href="https://aiwith.me/" 
                title="AI With Me: Discover thousands of AI Tools"
                className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                target="_blank" 
                rel="noopener noreferrer"
              >
                AI With Me
              </a>
              <a href="https://bai.tools/" title="Best AI Tools Directory" target="_blank"  className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors">Bai.tools</a>
              <a href="https://perchance-ai.net" target="_blank" rel="noopener noreferrer">Perchance AI</a>

            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
