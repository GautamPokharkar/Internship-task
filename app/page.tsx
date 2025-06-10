'use client';

import Link from 'next/link';
import { ArrowRight, Shield, Sparkles, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: Shield,
      title: 'Advance Voice Intellegence',
      description: 'Powered by real-time voice AI and natural language tech.',
    },
    {
      icon: Users,
      title: 'User Management',
      description: 'Complete profile management and user preferences.',
    },
    {
      icon: Zap,
      title: 'STT Configuration',
      description: 'Advanced speech-to-text configuration with multiple providers.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 via-white to-white dark:from-black dark:via-[#0e7490] dark:to-[#1e293b]">

      {/* Header */}
      <header className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">VoiceAI</span>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button>Go to Dashboard</Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button variant="outline">Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      
      <main className="container mx-auto px-6 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold leading-tight text-gray-900 dark:text-white">
            Next generation 
            <span className="block text-primary">Vocie Technology</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-600 dark:text-gray-300">
            What if your voice agent could smile?<br></br>
            Ours does—with tone, timing, and empathy built in.


          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            {!isAuthenticated ? (
              <>
                <Link href="/signup">
                  <Button size="lg" className="w-full sm:w-auto group">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Sign In
                  </Button>
                </Link>
              </>
            ) : (
              <Link href="/dashboard">
                <Button size="lg" className="w-full sm:w-auto group">
                  Open Dashboard
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="mt-24">
          <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white">
            Powerful Features
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <Card
  key={index}
  className="group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 
             bg-sky-50 dark:bg-[#1f2937] border border-gray-200 dark:border-gray-700"
>
  <CardContent className="p-6 text-center">
    <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
      <feature.icon className="h-6 w-6" />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
      {feature.title}
    </h3>
    <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
  </CardContent>
</Card>

            ))}
          </div>
        </div>
      </main>
    </div>
  );
}