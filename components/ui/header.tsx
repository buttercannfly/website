'use client'

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
import { Chrome, Settings, Layout, MessageSquare, User, LogOut } from 'lucide-react';
import { Description } from '@radix-ui/react-toast';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const Header = () => {
  const { data: session, status } = useSession();
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

        {/* User Authentication Section */}
        <div className="ml-auto flex items-center space-x-4">
          {status === 'loading' ? (
            <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
          ) : session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session.user?.image || ''} alt={session.user?.name || ''} />
                    <AvatarFallback>
                      {session.user?.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{session.user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session.user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/account" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Account & Credits</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => signIn()} variant="outline" size="sm">
              <User className="mr-2 h-4 w-4" />
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;