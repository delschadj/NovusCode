import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { NavItem } from '@/types';
import { Dispatch, SetStateAction } from 'react';
import { useSidebar } from '@/hooks/useSidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './ui/tooltip';
import { useChat } from '@/context/ChatContext';

interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
  isMobileNav?: boolean;
}

export function DashboardNav({
  items,
  setOpen,
  isMobileNav = false
}: DashboardNavProps) {
  const path = usePathname();
  const { isMinimized } = useSidebar();
  const { setSelectedChat } = useChat();

  const handleChatSelection = (item: NavItem) => {
    setSelectedChat(item);
  };

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-4rem)] mb-4">
      <TooltipProvider>
        {items.map((item, index) => {
          if (item.isHeading) {
            return (
              <div
                key={index}
                className="text-sm font-semibold text-foreground mt-2"
              >
                {item.title}
              </div>
            );
          }

          const Icon = item.icon ? Icons[item.icon] : null;

          return (
            item.href && (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  {item.forceReload ? (
                    <a
                      href={item.disabled ? '/' : item.href}
                      className={cn(
                        'flex items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                        path === item.href ? 'bg-accent' : 'transparent',
                        item.disabled && 'cursor-not-allowed opacity-80'
                      )}
                      onClick={() => {
                        console.log('Item object:', item);
                        handleChatSelection(item);
                        if (setOpen) setOpen(false);
                      }}
                    >
                      {Icon && <Icon className="ml-3 h-5 w-5 flex-none" />}
                      {isMobileNav || (!isMinimized && !isMobileNav) ? (
                        <span className="mr-2 truncate">{item.title}</span>
                      ) : (
                        ''
                      )}
                    </a>
                  ) : (
                    <Link
                      href={item.disabled ? '/' : item.href}
                      className={cn(
                        'flex items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                        path === item.href ? 'bg-accent' : 'transparent',
                        item.disabled && 'cursor-not-allowed opacity-80'
                      )}
                      onClick={() => {
                        console.log('Item object:', item);
                        handleChatSelection(item);
                        if (setOpen) setOpen(false);
                      }}
                    >
                      {Icon && <Icon className="ml-3 h-5 w-5 flex-none" />}
                      {isMobileNav || (!isMinimized && !isMobileNav) ? (
                        <span className="mr-2 truncate">{item.title}</span>
                      ) : (
                        ''
                      )}
                    </Link>
                  )}
                </TooltipTrigger>
                <TooltipContent
                  align="center"
                  side="right"
                  sideOffset={8}
                  className={!isMinimized ? 'hidden' : 'inline-block'}
                >
                  {item.title}
                </TooltipContent>
              </Tooltip>
            )
          );
        })}
      </TooltipProvider>
    </nav>
  );
}
