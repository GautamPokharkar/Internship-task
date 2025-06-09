'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Bot, Settings, Activity } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const { user } = useAuth();

  const cards = [
    {
      title: 'Profile',
      description: 'Manage your personal information and account settings',
      icon: User,
      href: '/dashboard/profile',
      color: 'bg-blue-500',
    },
    {
      title: 'Agent Configuration',
      description: 'Configure speech-to-text providers and models',
      icon: Bot,
      href: '/dashboard/agent',
      color: 'bg-green-500',
    },
    {
      title: 'Settings',
      description: 'System preferences and configuration options',
      icon: Settings,
      href: '#',
      color: 'bg-purple-500',
    },
    {
      title: 'Activity',
      description: 'View your recent activity and usage statistics',
      icon: Activity,
      href: '#',
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, {user?.username}!</h2>
        <p className="text-muted-foreground">
          Here's what's happening with your account today.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, index) => (
          <Card key={index} className="group transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${card.color} text-white`}>
                <card.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-xs">
                {card.description}
              </CardDescription>
              {card.href !== '#' ? (
                <Link href={card.href}>
                  <Button variant="outline" size="sm" className="mt-3 w-full">
                    Open
                  </Button>
                </Link>
              ) : (
                <Button variant="outline" size="sm" className="mt-3 w-full" disabled>
                  Coming Soon
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>Your account overview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Account Status</span>
              <span className="text-sm font-medium text-green-600">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Email</span>
              <span className="text-sm font-medium">{user?.email}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Phone</span>
              <span className="text-sm font-medium">{user?.phone || 'Not provided'}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Logged in</span>
                <span className="font-medium">Just now</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Profile updated</span>
                <span className="font-medium">2 days ago</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Account created</span>
                <span className="font-medium">1 week ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}