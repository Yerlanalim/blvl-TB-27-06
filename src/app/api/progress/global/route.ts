import { NextResponse } from 'next/server';
import { getGlobalProgress } from '@/utils/data/progress/get-global-progress';

/**
 * BIZLEVEL: API endpoint для получения глобального прогресса пользователя
 * GET /api/progress/global
 */
export async function GET() {
  try {
    const progressData = await getGlobalProgress();
    
    if (!progressData) {
      return NextResponse.json(
        { error: 'User not authenticated' },
        { status: 401 }
      );
    }

    return NextResponse.json(progressData);
    
  } catch (error) {
    console.error('Error fetching global progress:', error);
    return NextResponse.json(
      { error: 'Failed to fetch progress data' },
      { status: 500 }
    );
  }
} 