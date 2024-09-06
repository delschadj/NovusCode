'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { DashboardNav } from '../dashboard-nav';
import { navItems } from '@/constants/data';
import { cn } from '@/lib/utils';
import { ChevronLeft, ArrowLeft, Plus } from 'lucide-react';
import { useSidebar } from '@/hooks/useSidebar';
import Link from 'next/link';

import { Loader } from 'lucide-react';

import { useProjectData } from '@/context/ProjectDataContext';
import { useUserData } from '@/context/UserDataContext';

type SidebarProps = {
  className?: string;
};

const baseProjectNavItems = [
  {
    title: 'Back to Projects',
    href: '/projects',
    icon: 'ArrowLeft',
    label: 'Back to Projects'
  },
  {
    title: 'General Information',
    slug: 'general',
    icon: 'BadgeInfo',
    label: 'General Information'
  },
  {
    title: 'Code Structure',
    slug: 'code-structure',
    icon: 'Code',
    label: 'Code Structure'
  },
  {
    title: 'Components and Modules',
    slug: 'components',
    icon: 'Box',
    label: 'Components and Modules'
  },
  {
    title: 'Build and Dev Process',
    slug: 'build-process',
    icon: 'Wrench',
    label: 'Build and Dev Process'
  },
  {
    title: 'Chat',
    slug: 'chat',
    icon: 'MessageCircle',
    label: 'Chat'
  },
  {
    title: 'Code Explorer',
    slug: 'code-explorer',
    icon: 'Sparkle',
    label: 'Code Explorer'
  }
];

export default function Sidebar({ className }: SidebarProps) {
  const { isMinimized, toggle } = useSidebar();
  const pathname = usePathname() || '';
  const [chatNavItems, setChatNavItems] = useState([]);
  const [loading, setLoading] = useState(false); // New loading state

  const isProjectPage =
    pathname.startsWith('/projects/') && pathname !== '/projects/new';
  const isChatPage = pathname.includes('/chat');
  const projectId = isProjectPage ? pathname.split('/')[2] : '';

  const { user } = useUserData();
  const { projectData } = useProjectData();

  const handleToggle = () => {
    toggle();
  };

  useEffect(() => {
    if (isChatPage) {
      const fetchChatItems = async () => {
        setLoading(true); // Start loading
        try {
          const response = await fetch('http://localhost:4000/retrieveChats', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              uid: user.uid,
              projectID: projectData.id
            })
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();

          const sortedChatItems = [
            {
              title: 'Back to Project',
              href: `/projects/${projectId}/general`,
              icon: 'ArrowLeft',
              label: 'Back to Project',
              forceReload: true // Ensure a full page reload
            },
            {
              title: 'New Chat',
              href: `/projects/${projectId}/chat`,
              icon: 'Plus',
              label: 'New Chat',
              forceReload: true // Ensure a full page reload
            },
            ...data.map((chat) => ({
              ...chat, // Spread all key-value pairs from chat data
              href: chat.href || '#', // Ensure href is defined
              label: chat.title || 'No Title', // Provide a fallback if title is missing
              forceReload: chat.forceReload || false // Default to false if not provided
            }))
          ];

          setChatNavItems(sortedChatItems);
        } catch (error) {
          console.error('Error fetching chat items:', error);
        } finally {
          setLoading(false); // End loading
        }
      };

      fetchChatItems();
    }
  }, [isChatPage, user, projectData]);

  const projectNavItems = baseProjectNavItems.map((item) => ({
    ...item,
    href: item.slug ? `/projects/${projectId}/${item.slug}` : item.href,
    forceReload: false // Default to no reload
  }));

  const getNavItems = () => {
    if (pathname === '/projects/new') return navItems;
    if (isChatPage) return chatNavItems;
    if (isProjectPage) return projectNavItems;
    return navItems;
  };

  return (
    <aside
      className={cn(
        'relative hidden h-screen flex-none border-r bg-card transition-[width] duration-500 md:block',
        !isMinimized ? 'w-72' : 'w-[72px]',
        className
      )}
    >
      <div className="hidden p-5 pt-10 lg:block">
        <Link href={'/dashboard'}>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            {!isMinimized && (
              <span className="text-xl font-bold">NovusCode</span>
            )}
          </div>
        </Link>
      </div>
      <ChevronLeft
        className={cn(
          'absolute -right-3 top-10 z-50 cursor-pointer rounded-full border bg-background text-3xl text-foreground',
          isMinimized && 'rotate-180'
        )}
        onClick={handleToggle}
      />
      <div
        className={cn(
          'space-y-4 overflow-y-auto py-4',
          isChatPage ? 'max-h-[calc(100vh-4rem)]' : 'max-h-screen'
        )}
      >
        <div className="space-y-4 px-3 py-2">
          <div className="mt-4 space-y-1">
            {loading ? (
              <div className="flex h-full items-center justify-center">
                <Loader className="h-8 w-8 animate-spin text-foreground" />{' '}
                {/* Loading animation */}
              </div>
            ) : (
              <DashboardNav items={getNavItems()} />
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
