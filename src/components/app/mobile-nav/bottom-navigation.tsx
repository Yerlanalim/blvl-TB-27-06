'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Map, MessageCircle, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  {
    label: 'Главная',
    href: '/dashboard',
    icon: Home,
  },
  {
    label: 'Карта',
    href: '/roadmaps', 
    icon: Map,
  },
  {
    label: 'Leo',
    href: '/leo-chat',
    icon: MessageCircle,
  },
  {
    label: 'Профиль',
    href: '/settings/profile',
    icon: User,
  },
];

export default function BottomNavigation() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === href;
    }
    if (href === '/roadmaps') {
      return pathname.startsWith('/roadmaps') && !pathname.startsWith('/personalized-roadmaps');
    }
    if (href === '/leo-chat') {
      return pathname.startsWith('/leo-chat');
    }
    if (href === '/settings/profile') {
      return pathname.startsWith('/settings');
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-black border-t border-black-50">
      <div className="flex items-center justify-around py-2 px-4">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-3 rounded-lg transition-colors duration-200',
                active 
                  ? 'text-accent bg-accent/10' 
                  : 'text-gray-400 hover:text-white'
              )}
            >
              <item.icon 
                className={cn(
                  'w-5 h-5 mb-1',
                  active ? 'text-accent' : 'text-current'
                )} 
              />
              <span className="text-xs font-medium truncate">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
} 