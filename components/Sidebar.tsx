'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { User, Bot, LogOut, LayoutDashboard, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const [collapsed, setCollapsed] = useState(true);

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard ,
    },
    {
      name: 'Profile',
      href: '/dashboard/profile',
      icon: User,
    },
    {
      name: 'Agent',
      href: '/dashboard/agent',
      icon: Bot,
    },
  ];

  return (
    <div
      className={cn(
        'flex h-full flex-col border-r bg-card transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
      onMouseEnter={() => setCollapsed(false)}
      onMouseLeave={() => setCollapsed(true)}
    >
      <div className="flex h-16 items-center border-b px-6">
  <Sparkles className="h-5 w-5 text-primary" />
  {!collapsed && (
    <Link href="/" className="ml-3 text-lg font-semibold hover:underline">
      VoiceAI
    </Link>
  )}
</div>


      <div className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <div
                  className={cn(
                    'flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {!collapsed && <span className="ml-3">{item.name}</span>}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t p-4">
        {!collapsed && (
          <div className="mb-3 text-sm text-muted-foreground">
            Signed in as <span className="font-medium">{user?.username}</span>
          </div>
        )}
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start',
            collapsed && 'px-2 py-2'
          )}
          onClick={logout}
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && <span className="ml-2">Sign out</span>}
        </Button>
      </div>
    </div>
  );
}
