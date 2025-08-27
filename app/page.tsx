"use client";

import React, { useEffect, useState } from 'react';
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
  CheckCircle,
  Zap,
  Brain,
  Shield,
  Download,
  Star,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import AipexFeatures from '@/components/ui/inner-link';

export default function Home() {
  const [platform, setPlatform] = useState<'mac' | 'windows' | 'other'>('other');
  
  const claudeFeatures = [
    'Claude AI Chat in Chrome',
    'Free Claude Chrome Extension',
    'Open Source Claude for Chrome',
    'Claude AI Assistant',
    'Advanced Tab Management',
    'Browser Automation',
    'Claude Chrome Integration'
  ];

  const [visibleCount, setVisibleCount] = useState(0);
  useEffect(() => {
    setVisibleCount(0);
    const timer = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev < claudeFeatures.length) return prev + 1;
        clearInterval(timer);
        return prev;
      });
    }, 600);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const p = window.navigator.platform.toLowerCase();
      const ua = window.navigator.userAgent.toLowerCase();
      if (p.includes('mac') || ua.includes('mac')) {
        setPlatform('mac');
      } else if (p.includes('win') || ua.includes('windows')) {
        setPlatform('windows');
      } else {
        setPlatform('other');
      }
    }
  }, []);

  function useTypewriterLoop(words: string[], speed = 60, pause = 1200) {
    const [display, setDisplay] = useState('');
    const [wordIdx, setWordIdx] = useState(0);
    const [charIdx, setCharIdx] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
      let timeout: NodeJS.Timeout;
      if (!isDeleting && charIdx < words[wordIdx].length) {
        timeout = setTimeout(() => {
          setDisplay(words[wordIdx].slice(0, charIdx + 1));
          setCharIdx(charIdx + 1);
        }, speed);
      } else if (!isDeleting && charIdx === words[wordIdx].length) {
        timeout = setTimeout(() => setIsDeleting(true), pause);
      } else if (isDeleting && charIdx > 0) {
        timeout = setTimeout(() => {
          setDisplay(words[wordIdx].slice(0, charIdx - 1));
          setCharIdx(charIdx - 1);
        }, speed / 2);
      } else if (isDeleting && charIdx === 0) {
        setIsDeleting(false);
        setWordIdx((wordIdx + 1) % words.length);
      }
      return () => clearTimeout(timeout);
    }, [charIdx, isDeleting, wordIdx, words, speed, pause]);

    return display;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white dark:from-blue-900 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <header className="flex flex-col items-center justify-center min-h-[70vh] mb-16 pt-10">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Open Claude for Chrome
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              The <strong>free, open-source alternative</strong> to Claude for Chrome. Get Claude AI assistance directly in your browser with advanced tab management and automation features.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
                onClick={() => window.open('https://github.com/AIPexStudio/open-claude-for-chrome', '_blank')}
              >
                <Github className="mr-2 h-5 w-5" />
                View on GitHub
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 px-8 py-4 text-lg"
                onClick={() => window.open('https://chromewebstore.google.com/detail/aipex/iglkpadagfelcpmiidndgjgafpdifnke', '_blank')}
              >
                <Download className="mr-2 h-5 w-5" />
                Install Extension
              </Button>
            </div>
          </div>

          <div className="w-full max-w-3xl rounded-3xl px-8 py-6 text-2xl font-bold text-center shadow-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white dark:from-blue-700 dark:to-purple-700 border-4 border-white/30 dark:border-white/10 mb-6">
            {platform === 'mac' && (
              <span className="inline-block">
                <span role='img' aria-label='keyboard' className="mr-2 text-2xl">⌨️</span>
                Mac: <kbd className="px-4 py-2 bg-white/20 rounded border border-white/30 mx-1 text-xl">Command + M</kbd>
              </span>
            )}
            {platform === 'windows' && (
              <span className="inline-block">
                <span role='img' aria-label='keyboard' className="mr-2 text-2xl">⌨️</span>
                Windows: <kbd className="px-4 py-2 bg-white/20 rounded border border-white/30 mx-1 text-xl">Ctrl + M</kbd>
              </span>
            )}
            {platform === 'other' && (
              <span className="inline-block">
                <span role='img' aria-label='keyboard' className="mr-2 text-2xl">⌨️</span>
                Mac: <kbd className="px-4 py-2 bg-white/20 rounded border border-white/30 mx-1 text-xl">Command + M</kbd> | Windows: <kbd className="px-4 py-2 bg-white/20 rounded border border-white/30 mx-1 text-xl">Ctrl + M</kbd>
              </span>
            )}
          </div>

          <div className="w-full max-w-2xl flex flex-col items-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-center text-blue-700 dark:text-blue-300 min-h-[2em] h-[2em] flex items-center justify-center">
              <span className="inline-block">
                {useTypewriterLoop(claudeFeatures, 60, 1200)}
                <span className="blinking-cursor">|</span>
              </span>
            </h2>
          </div>
        </header>

        <main>
          {/* Why Choose Open Claude for Chrome */}
          <section className="mb-24">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">
              Why Choose Open Claude for Chrome?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: '100% Free & Open Source',
                  icon: Star,
                  description: 'No subscription fees, no hidden costs. Get Claude for Chrome functionality completely free.',
                },
                {
                  title: 'Claude AI Integration',
                  icon: Brain,
                  description: 'Direct access to Claude AI assistant with advanced conversation capabilities and context awareness.',
                },
                {
                  title: 'Advanced Tab Management',
                  icon: Layout,
                  description: 'AI-powered tab organization, smart grouping, and intelligent tab suggestions.',
                },
                {
                  title: 'Privacy & Security',
                  icon: Shield,
                  description: 'Your data stays local. No tracking, no data collection, complete privacy protection.',
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
                >
                  <CardHeader className="bg-gradient-to-br from-blue-500 to-purple-500 p-6 group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                    <feature.icon className="w-12 h-12 mb-4 text-white" />
                    <CardTitle className="text-white">
                      <h3>{feature.title}</h3>
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

          {/* Demo Video Section */}
          <section className="w-full max-w-7xl mx-auto px-4 mb-24">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">
              See Open Claude for Chrome in Action
            </h2>
            <div className="aspect-w-16 aspect-h-9" style={{ paddingBottom: '56.25%', position: 'relative', height: 0, overflow: 'hidden' }}>
              <iframe
                src="https://www.youtube.com/embed/C7m4p8uPmag"
                title="Open Claude for Chrome Demo - Free Claude Chrome Extension"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
              ></iframe>
            </div>
          </section>

          {/* Feature Showcase */}
          <section className="w-full max-w-7xl mx-auto px-4 mb-24">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">
              Powerful Features of Open Claude for Chrome
            </h2>
            <div className="grid grid-cols-1 gap-12">
              {[
                {
                  title: 'Claude AI Chat Sidebar',
                  src: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*9C-GLUsdt2kk2lgSnbSyxw.gif',
                  alt: 'Claude AI Chat in Chrome Extension',
                  description:
                    'Access Claude AI directly in your browser sidebar. Get intelligent assistance, answer questions, and have conversations without leaving your current page.',
                },
                {
                  title: 'Smart Tab Organization',
                  src: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*vHkVQfDKE5GOxHp-J6fE_w.gif',
                  alt: 'AI-Powered Tab Management',
                  description:
                    'Let AI organize your tabs intelligently. Group related tabs, suggest tab management actions, and maintain a clean browsing environment.',
                },
                {
                  title: 'Browser Automation',
                  src: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*SgLf-C8bbcfdZUzm0ICZ8A.gif',
                  alt: 'Claude Chrome Browser Automation',
                  description:
                    'Automate repetitive browser tasks with Claude AI. Fill forms, extract data, and perform complex browser operations with simple commands.',
                },
              ].map((item, index) => (
                <div key={index} className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                  <Card className="relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-white">
                        <h2>{item.title}</h2>
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

          {/* Detailed Features */}
          <section className="mb-24">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">
              Complete Claude Chrome Extension Features
            </h2>
            <Tabs defaultValue="claude" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="claude" className="text-lg">
                  Claude AI
                </TabsTrigger>
                <TabsTrigger value="tabs" className="text-lg">
                  Tab Management
                </TabsTrigger>
                <TabsTrigger value="automation" className="text-lg">
                  Automation
                </TabsTrigger>
                <TabsTrigger value="privacy" className="text-lg">
                  Privacy
                </TabsTrigger>
              </TabsList>
              {[
                {
                  value: 'claude',
                  title: 'Claude AI Integration',
                  description: 'Advanced AI assistant in your browser',
                  content:
                    "Open Claude for Chrome provides seamless integration with Claude AI, giving you access to one of the most advanced AI assistants directly in your browser. Chat with Claude, get intelligent responses, and leverage AI-powered features without switching between applications.",
                },
                {
                  value: 'tabs',
                  title: 'Intelligent Tab Management',
                  description: 'AI-powered tab organization',
                  content:
                    'Our advanced tab management system uses AI to intelligently group related tabs, suggest tab organization strategies, and help you maintain a clean and efficient browsing environment. Perfect for users who work with multiple tabs simultaneously.',
                },
                {
                  value: 'automation',
                  title: 'Browser Automation',
                  description: 'Automate tasks with Claude AI',
                  content:
                    'Leverage Claude AI to automate repetitive browser tasks. Fill forms automatically, extract data from web pages, perform complex browser operations, and streamline your workflow with intelligent automation capabilities.',
                },
                {
                  value: 'privacy',
                  title: 'Privacy-First Design',
                  description: 'Your data stays private',
                  content:
                    "Unlike other Claude Chrome extensions, Open Claude for Chrome prioritizes your privacy. All data processing happens locally when possible, and we don't collect or store your personal information or browsing data.",
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

          {/* Comparison Section */}
          <section className="mb-24">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">
              Open Claude for Chrome vs Claude for Chrome
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-white dark:bg-gray-800 shadow-lg">
                <CardHeader className="bg-gradient-to-br from-green-500 to-green-600">
                  <CardTitle className="text-white text-2xl">Open Claude for Chrome</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>100% Free & Open Source</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>Full Claude AI Integration</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>Advanced Tab Management</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>Browser Automation</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>Privacy-First Design</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>Community Driven</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 shadow-lg">
                <CardHeader className="bg-gradient-to-br from-gray-500 to-gray-600">
                  <CardTitle className="text-white text-2xl">Other Claude Extensions</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <span className="w-5 h-5 text-red-500 mr-3">✗</span>
                      <span>Paid Subscriptions</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-5 h-5 text-red-500 mr-3">✗</span>
                      <span>Limited Features</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-5 h-5 text-red-500 mr-3">✗</span>
                      <span>Data Collection</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-5 h-5 text-red-500 mr-3">✗</span>
                      <span>Closed Source</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-5 h-5 text-red-500 mr-3">✗</span>
                      <span>No Community Input</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-5 h-5 text-red-500 mr-3">✗</span>
                      <span>Restrictive Licensing</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          <AipexFeatures />

          {/* FAQ Section */}
          <section className="mb-24">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">
              Frequently Asked Questions
            </h2>
            <Accordion
              type="single"
              collapsible
              className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden"
            >
              {[
                {
                  question: 'Is Open Claude for Chrome really free?',
                  answer:
                    'Yes! Open Claude for Chrome is completely free and open-source. There are no subscription fees, no premium tiers, and no hidden costs. All features are available to everyone.',
                },
                {
                  question: 'How does Open Claude for Chrome compare to Claude for Chrome?',
                  answer:
                    'Open Claude for Chrome provides the same core functionality as Claude for Chrome but is completely free and open-source. We offer advanced tab management, browser automation, and privacy protection that many paid alternatives lack.',
                },
                {
                  question: 'Is my data safe with Open Claude for Chrome?',
                  answer:
                    'Absolutely. We prioritize your privacy. All data processing happens locally when possible, and we don\'t collect or store your personal information or browsing data.',
                },
                {
                  question: 'Can I contribute to Open Claude for Chrome?',
                  answer:
                    'Yes! As an open-source project, we welcome contributions from the community. You can submit bug reports, feature suggestions, or code contributions through our GitHub repository.',
                },
                {
                  question: 'What makes Open Claude for Chrome the best Claude Chrome extension?',
                  answer:
                    'Open Claude for Chrome combines Claude AI integration, advanced tab management, browser automation, and privacy protection in a completely free, open-source package. No other extension offers this combination of features without cost.',
                },
                {
                  question: 'How do I install Open Claude for Chrome?',
                  answer:
                    'You can install Open Claude for Chrome from the Chrome Web Store or build it from source on GitHub. The installation process is simple and takes just a few clicks.',
                },
              ].map((item, index) => (
                <AccordionItem key={index} value={`item-${index + 1}`}>
                  <AccordionTrigger className="px-6 py-4 text-lg font-semibold text-gray-800 dark:text-white hover:bg-blue-50 dark:hover:bg-blue-900">
                    <h3>{item.question}</h3>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 text-gray-600 dark:text-gray-300">
                    <h4>{item.answer}</h4>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* CTA Section */}
          <section className="mb-24 text-center">
            <Card className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-12">
              <CardContent>
                <h2 className="text-4xl font-bold mb-6">
                  Ready to Try Open Claude for Chrome?
                </h2>
                <p className="text-xl mb-8 opacity-90">
                  Join thousands of users who have switched to the free, open-source alternative to Claude for Chrome.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    variant="secondary"
                    className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg"
                    onClick={() => window.open('https://github.com/AIPexStudio/open-claude-for-chrome', '_blank')}
                  >
                    <Github className="mr-2 h-5 w-5" />
                    View on GitHub
                  </Button>
                  <Button 
                    size="lg" 
                    className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg"
                    onClick={() => window.open('https://chromewebstore.google.com/detail/aipex/iglkpadagfelcpmiidndgjgafpdifnke', '_blank')}
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Install Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
}