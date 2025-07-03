import { cache } from 'react';
import type { UnifiedProgressData } from '@/types/Progress';

/**
 * Получает унифицированный прогресс с API `/api/progress/unified`.
 * Для простоты логики обращаемся к существующему маршруту, но
 * используем `React.cache()` чтобы избежать лишних сетевых запросов
 * при множественных вызовах в пределах одного запроса Next.js.
 */
export const getUnifiedProgress = cache(async (): Promise<UnifiedProgressData | null> => {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3001');

    const res = await fetch(`${baseUrl}/api/progress/unified`, {
      headers: { 'Content-Type': 'application/json' },
      // Не кэшируем на уровне fetch; кэш выполняет React.cache
      cache: 'no-store',
    });

    if (!res.ok) return null;
    return (await res.json()) as UnifiedProgressData;
  } catch (error) {
    console.error('getUnifiedProgress util error:', error);
    return null;
  }
}); 