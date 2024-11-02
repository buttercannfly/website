import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Chrome, Settings, Layout, MessageSquare } from 'lucide-react';
import { Description } from '@radix-ui/react-toast';

const Header = () => {
  const tabFeatures = [
    { title: 'Group Tabs', href: '/tab/group', description: 'Organize and group your tabs efficiently' },
    { title: 'Duplicate Tab', href: '/tab/duplicate', description: 'Quickly duplicate any tab' },
    { title: 'New Tab', href: '/tab/new', description: 'Open new tabs instantly' },
    { title: 'Incognito Tab', href: '/tab/incognito', description: 'Quick access to private browsing' },
    { title: 'Close Tab', href: '/tab/close-tab', description: 'Close tabs with keyboard shortcuts' },
    { title: 'Close Window', href: '/tab/close', description: 'Close windows quickly' },
    { title: 'Restore Tab', href: "/tab/restore", description: 'Restore Tab in one second'},
    { title: 'Switch Tab', href: '/tab/switch', description: "Switch Tab right away"},
    { title: 'Maximize Window', href: '/tab/maximize', description: 'Maximize window without remembering shorcuts'},
  ];

  const settingsFeatures = [
    { title: 'Clear Cache', href: '/settings/cache', description: 'Clear browser cache instantly' },
    { title: 'Clear Cookies', href: '/settings/cookies', description: 'Manage browser cookies' },
  ];

  const alternativeFeatures = [
    { title: 'Alternative  to Chatgpt Search', href: '/alternatives/searchgpt', description: 'Better Than ChatGPT Search Extensions' },
    { title: 'Alternative to Google Search', href: '/alternatives/google', description: 'Much Inteligent than Google Search' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Chrome className="h-6 w-6" />
          <span className="font-bold">AIpex</span>
        </Link>
        
        <NavigationMenu className="ml-6">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Layout className="mr-2 h-4 w-4" />
                <h3>
                  Tab Manager
                </h3>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {tabFeatures.map((feature) => (
                    <li key={feature.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={feature.href}
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          )}
                        >
                          <div className="text-sm font-medium leading-none">{feature.title}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            <h4>{feature.description}</h4>
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Settings className="mr-2 h-4 w-4" />
                <h3>Chrome Settings</h3>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4">
                  {settingsFeatures.map((feature) => (
                    <li key={feature.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={feature.href}
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          )}
                        >
                          <div className="text-sm font-medium leading-none">{feature.title}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            <h4>{feature.description}</h4>
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Settings className="mr-2 h-4 w-4" />
                <h3>Alternatives</h3>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4">
                  {alternativeFeatures.map((feature) => (
                    <li key={feature.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={feature.href}
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          )}
                        >
                          <div className="text-sm font-medium leading-none">{feature.title}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            <h4>{feature.description}</h4>
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/sidebar/best" legacyBehavior passHref>
                <NavigationMenuLink className={cn(
                  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                )}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <h3>Sidebar Extension</h3>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

export default Header;