'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon, ClockIcon, Construction } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ComingSoonProps {
  title: string;
  description: string;
  expectedVersion?: string;
  redirectTo?: string;
  redirectText?: string;
}

export default function ComingSoon({
  title,
  description,
  expectedVersion = 'v2.0',
  redirectTo = '/roadmaps',
  redirectText = 'Вернуться к обучению'
}: ComingSoonProps) {
  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[60vh]">
      <Card className="max-w-2xl w-full text-center">
        <CardHeader className="space-y-6">
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
            <Construction className="w-12 h-12 text-white" />
          </div>
          
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold text-white">
              {title}
            </CardTitle>
            <CardDescription className="text-lg text-gray-400">
              {description}
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <ClockIcon className="w-4 h-4" />
            <span>Ожидается в {expectedVersion}</span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="default">
              <Link href={redirectTo}>
                {redirectText}
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            
            <Button asChild variant="outline">
              <Link href="/leo-chat">
                Обсудить с Leo
              </Link>
            </Button>
          </div>
          
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            Мы работаем над тем, чтобы сделать BizLevel лучшей платформой для изучения бизнеса. 
            Следите за обновлениями!
          </p>
        </CardContent>
      </Card>
    </div>
  );
} 