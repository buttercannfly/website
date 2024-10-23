import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { title } from 'process';

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
    }
  ];

  return (
    <section className="w-full max-w-24xl mx-auto px-4 mb-24">
      <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">
        AIpex: The AI Chrome Extension in Action
      </h2>
      <Tabs defaultValue="tabs" className="w-full">
        <TabsList className="grid w-full grid-cols-8 mb-8">
          {features.map((item) => (
            <TabsTrigger key={item.value} value={item.value} className="text-lg">
              {item.title || 'Overview'}
            </TabsTrigger>
          ))}
        </TabsList>
        {features.map((item) => (
          <TabsContent key={item.value} value={item.value}>
            <a
              href={item.link}
              className="block relative group no-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <Card className="relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
                    {item.title || 'Overview'}
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-700 dark:text-gray-200">
                    {item.content}
                  </p>
                </CardContent>
              </Card>
            </a>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default AipexFeatures;