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
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import AipexFeatures from '@/components/ui/inner-link';
import { Metadata } from 'next';

export default function Home() {
  const [platform, setPlatform] = useState<'mac' | 'windows' | 'other'>('other');
  const features = [
    { group: 'Tab Manager', items: ['Switch between tabs', 'AI-powered tab organization'] },
    { group: 'History Manager', items: [] },
    { group: 'Bookmark Manager', items: [] },
    { group: 'AI Chatbot Sidebar', items: ['Continuous chat conversations', 'Basic AI interactions'] },
  ];
  const flatFeatures = [
    { label: 'Tab Manager', isGroup: true },
    { label: 'Switch between tabs', isGroup: false },
    { label: 'AI-powered tab organization', isGroup: false },
    { label: 'History Manager', isGroup: true },
    { label: 'Bookmark Manager', isGroup: true },
    { label: 'AI Chatbot Sidebar', isGroup: true },
    { label: 'Continuous chat conversations', isGroup: false },
    { label: 'Basic AI interactions', isGroup: false },
  ];
  const [visibleCount, setVisibleCount] = useState(0);
  useEffect(() => {
    setVisibleCount(0);
    const timer = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev < flatFeatures.length) return prev + 1;
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

  const featureList = [
    'Switch between tabs',
    'AI-powered tab organization',
    'Manage your history',
    'Bookmark your tabs',
    'Chat with AI in sidebar',
    'Continuous chat conversations',
    'Basic AI interactions',
  ];

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
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white dark:from-purple-900 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <header className="flex flex-col items-center justify-center min-h-[60vh] mb-16 pt-10">
          <div className="w-full max-w-3xl rounded-3xl px-8 py-6 text-3xl font-extrabold text-center shadow-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white dark:from-purple-700 dark:to-pink-700 dark:text-white border-4 border-white/30 dark:border-white/10 mb-4">
            {platform === 'mac' && (
              <span className="inline-block"><span role='img' aria-label='keyboard' className="mr-2 text-3xl">⌨️</span>Mac: <kbd className="px-4 py-3 bg-white/20 rounded border border-white/30 mx-1 text-2xl">Command + M</kbd></span>
            )}
            {platform === 'windows' && (
              <span className="inline-block"><span role='img' aria-label='keyboard' className="mr-2 text-3xl">⌨️</span>Windows: <kbd className="px-4 py-3 bg-white/20 rounded border border-white/30 mx-1 text-2xl">Ctrl + M</kbd></span>
            )}
            {platform === 'other' && (
              <span className="inline-block"><span role='img' aria-label='keyboard' className="mr-2 text-3xl">⌨️</span>Mac: <kbd className="px-4 py-3 bg-white/20 rounded border border-white/30 mx-1 text-2xl">Command + M</kbd> | Windows: <kbd className="px-4 py-3 bg-white/20 rounded border border-white/30 mx-1 text-2xl">Ctrl + M</kbd></span>
            )}
          </div>
          <div className="w-full max-w-2xl flex flex-col items-center">

            <h2 className="text-3xl md:text-4xl font-semibold text-center text-purple-700 dark:text-purple-300 min-h-[2.5em] h-[2.5em] flex items-center justify-center">
              <span className="inline-block">{useTypewriterLoop(featureList, 60, 1200)}<span className="blinking-cursor">|</span></span>
            </h2>
          </div>
        </header>

        <main>
          <section className="mb-24">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">
              Advanced Tab Management Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: 'Intelligent Tab Organization',
                  icon: Layout,
                  description: 'AI-powered tab grouping and automatic tab sorting',
                },
                {
                  title: 'Smart Tab History',
                  icon: History,
                  description: 'Advanced tab history tracking with search capabilities',
                },
                {
                  title: 'Tab Control Shortcuts',
                  icon: Bookmark,
                  description:
                    'Quick tab management with customizable keyboard shortcuts',
                },
                {
                  title: 'AI Tab Assistant',
                  icon: MessageSquare,
                  description: 'ChatGPT-powered tab suggestions and organization',
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
                >
                  <CardHeader className="bg-gradient-to-br from-purple-500 to-pink-500 p-6 group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
                    <feature.icon className="w-12 h-12 mb-4 text-white" />
                    <CardTitle className="text-white">
                      <h3>
                      {feature.title}
                      </h3>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                    </h4>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="w-full max-w-7xl mx-auto px-4 mb-24">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">
              See Our Tab Manager in Action
            </h2>
            <div className="aspect-w-16 aspect-h-9" style={{ paddingBottom: '56.25%', position: 'relative', height: 0, overflow: 'hidden' }}>
              <iframe
                src="https://www.youtube.com/embed/C7m4p8uPmag"
                title="AIpex Tab Manager Demo Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
              ></iframe>
            </div>
          </section>

          <section className="w-full max-w-7xl mx-auto px-4 mb-24">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">
              Professional Tab Management Solutions
            </h2>
            <div className="grid grid-cols-1 gap-12">
              {[
                {
                  title: 'Smart Tab Groups & Organization',
                  src: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*9C-GLUsdt2kk2lgSnbSyxw.gif',
                  alt: 'Tab Groups and Organization',
                  description:
                    'Automatically organize and group related tabs for better productivity and workflow management.',
                },
                {
                  title: 'Complete Tab Control Suite',
                  src: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*vHkVQfDKE5GOxHp-J6fE_w.gif',
                  alt: 'Tab Control Features',
                  description:
                    'Restore tabs, duplicate tabs, and manage windows with powerful tab management tools.',
                },
                {
                  title: 'AI-Powered Tab Assistant',
                  src: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*SgLf-C8bbcfdZUzm0ICZ8A.gif',
                  alt: 'AI Tab Assistant',
                  description:
                    'Get intelligent tab suggestions and management recommendations from our AI assistant.',
                },
              ].map((item, index) => (
                <div key={index} className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                  <Card className="relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-white">
                        <h2>
                        {item.title}
                        </h2>
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
              Comprehensive Tab Management Features
            </h2>
            <Tabs defaultValue="tabs" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="tabs" className="text-lg">
                  Tab Manager
                </TabsTrigger>
                <TabsTrigger value="history" className="text-lg">
                  Tab History
                </TabsTrigger>
                <TabsTrigger value="bookmarks" className="text-lg">
                  Tab Bookmarks
                </TabsTrigger>
                <TabsTrigger value="chatgpt" className="text-lg">
                  Tab Assistant
                </TabsTrigger>
              </TabsList>
              {[
                {
                  value: 'tabs',
                  title: 'Advanced Tab Management',
                  description: 'Professional tab organization tools',
                  content:
                    "Our tab manager uses cutting-edge AI algorithms to intelligently group related tabs, eliminate tab clutter, and streamline your browsing experience. Perfect for users who work with multiple tabs and need efficient tab organization.",
                },
                {
                  value: 'history',
                  title: 'Smart Tab History',
                  description: 'Enhanced tab history tracking',
                  content:
                    'The intelligent tab history system provides context-aware suggestions based on your browsing patterns, making it easy to find and restore previously closed tabs and manage your browsing sessions effectively.',
                },
                {
                  value: 'bookmarks',
                  title: 'Tab Bookmark Organization',
                  description: 'Efficient tab bookmark management',
                  content:
                    'Our tab manager automatically categorizes and organizes your bookmarked tabs using advanced AI technology, creating an intuitive and self-organizing system that adapts to your browsing habits.',
                },
                {
                  value: 'chatgpt',
                  title: 'AI Tab Assistant',
                  description: 'Intelligent tab management help',
                  content:
                    "The integrated AI assistant provides smart suggestions for tab organization, helps you find specific tabs quickly, and offers personalized recommendations for improving your tab management workflow.",
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

          <AipexFeatures />

          <section className="mb-24">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">
              Tab Manager FAQs
            </h2>
            <Accordion
              type="single"
              collapsible
              className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden"
            >
              {[
                {
                  question: 'Is this tab manager free to use?',
                  answer:
                    'Yes, our tab manager is completely free and open-source. All features, including advanced tab organization and AI assistance, are available at no cost.',
                },
                {
                  question: 'How does the tab manager handle my browsing data?',
                  answer:
                    "Our tab manager processes all data locally on your device. We prioritize your privacy and don't store or transmit your browsing information to external servers.",
                },
                {
                  question: 'Can I use this tab manager on other browsers?',
                  answer:
                    "Currently, our tab manager is exclusively available as a Chrome extension. We're exploring options to support additional browsers in future updates.",
                },
                {
                  question: 'How can I contribute to improving the tab manager?',
                  answer:
                    'As an open-source project, we welcome contributions to enhance our tab manager! You can submit bug reports, feature suggestions, or code contributions through our GitHub repository.',
                },
                {
                  question:
                    'What makes this the most effective tab manager for Chrome?',
                  answer:
                    'Our tab manager combines AI-powered tab organization, smart history tracking, intelligent bookmarking, and an AI assistant. This comprehensive approach to tab management sets it apart from traditional tab organizers.',
                },
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
        </main>
      </div>
    </div>
  );
}