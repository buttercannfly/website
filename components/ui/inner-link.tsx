'use client'

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AipexFeatures = () => {
  const features = [
    {
      value: 'tabs',
      title: 'Group Tabs',
      description: 'Organize your tabs efficiently',
      content:
        "AIpex uses advanced AI algorithms to group related tabs, identify and merge duplicate tabs, and provide quick access to your most frequently used tabs. It's the best tab manager extension for Google Chrome, learning from your browsing habits to optimize your workflow.",
      alt: 'Group Tabs',
      link: 'https://aipex.quest/tab/group'
    },
    {
      value: 'history',
      title: 'History Management',
      description: 'Navigate your browsing history with ease',
      content:
        'Our intelligent history management system uses context-aware AI to suggest relevant past visits based on your current browsing session. It makes finding that elusive webpage you visited last week a breeze.',
      alt: 'History Management',
      link: 'https://aipex.quest/tab/restore'
    },
    {
      value: 'incognito',
      title: 'Open incognito tab',
      description: 'Quick open an incognito tab',
      content:
        'AIpex only utilizes one step to open an incognito tab, without any knowledge on shortcuts',
      alt: 'incognito tab',
      link: 'https://aipex.quest/tab/incognito'
    },
    {
        value: 'duplicate',
        title: 'Duplicate tab',
        description: 'Quick duplicate a tab',
        content:
          'AIpex only utilizes one step to duplicate a tab, without any knowledge on shortcuts',
        alt: 'duplicate tab',
        link: 'https://aipex.quest/tab/duplicate'
      },
    {
      value: 'main',
      title: 'AIPex',
      description: 'AIPex - The Best Tab Manager Extension for Google Chrome',
      content:
        "AIpex is an open-source Chrome extension that helps you manage tabs, history, and bookmarks with an integrated ChatGPT sidebar.",
      alt: '',
      link: 'https://aipex.quest'
    },
    {
      value: 'close',
      title: 'Close Window',
      description: 'Close window in  one second',
      content:
        "With AIPex, just command/ctrl + M and then you get the close window",
      alt: '',
      link: 'https://aipex.quest/tab/close'
    },
    {
      value: 'close-tab',
      title: 'Close Tab',
      description: 'Close Tab in one second',
      content:
        "With AIPex, type command/ctrl + M and then search for close",
      alt: '',
      link: 'https://aipex.quest/tab/close-tab'
    },
    {
      value: 'maximize-window',
      title: 'Maximize Window',
      description: 'Maximize window in one second',
      content:
        "With AIPex, type command/ctrl + M and then search for fullsreen",
      alt: '',
      link: 'https://aipex.quest/tab/maximize'
    },
    {
      value: "switch-tabs",
      title: "Switch Tabs",
      description: "Switch between tabs and tab search",
      content: "WIth AIPex, type Command/Ctrl + M and search for tabs",
      alt: '',
      link: "https://aipex.quest/tab/switch"
    },{
      title: "Chatgpt Sidebar",
      description: "Embed Chatgpt Sidebar",
      content: "WIth AIPex, you can use AI to get to know every page",
      alt: '',
      link: "https://aipex.quest/sidebar/best"
    },
    {
      title: "Clear Cache",
      description: "Clear cache in one step",
      content: "Just Command/Ctrl + M, you can find how easy to clear cache",
      alt: '',
      link: "https://aipex.quest/settings/cache"
    },
    {
      title: "Clear Cookies",
      description: "Clear Cookies in one second",
      content: "Command/Ctrl + M, then you can find how easy to clear cache",
      alt: '',
      link: "https://aipex.quest/settings/cookies"
    },
    { title: 'Alternative to Chatgpt Search', href: '/alternatives/searchgpt', description: 'Better Than ChatGPT Search Extensions', content: "Command/Ctrl + M, then you can find how easy to search", alt: ''
     },
     {
      title: "Alternative to Google Search",
      description: "Better Than Google Search Extensions",
      content: "Command/Ctrl + M",
      alt: '',
      link: "https://aipex.quest/alternatives/google"
    }

  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === features.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [features.length]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === features.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? features.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="w-full max-w-4xl mx-auto px-4 mb-24">
      <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">
        AIpex: The AI Chrome Extension in Action
      </h2>
      
      <div className="relative">
        {/* Navigation Buttons */}
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          onClick={goToPrevious}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          onClick={goToNext}
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Current Feature Card */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <a
            href={features[currentIndex].link}
            className="block relative no-underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Card className="relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
                  <h3>{features[currentIndex].title}</h3>
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  <h4>{features[currentIndex].description}</h4>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-700 dark:text-gray-200">
                  {features[currentIndex].content}
                </p>
              </CardContent>
            </Card>
          </a>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-6">
          {features.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex
                  ? 'bg-purple-600'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AipexFeatures;