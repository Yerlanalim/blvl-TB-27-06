import { createMetadata } from '@/utils/seo';

export async function generateMetadata() {
  return createMetadata({
    title: 'Раздел в разработке | BizLevel',
    description: 'Этот раздел временно недоступен. Скоро здесь появятся новые возможности для обучения бизнесу.',
    canonicalUrl: '/features/coding-challenges',
  });
}

// BIZLEVEL: Заглушка для coding challenges - раздел отключен для бизнес-версии
export default function CodingChallengesPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black-100">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-black-75 border border-black-50 rounded-lg flex items-center justify-center">
            <svg 
              className="w-8 h-8 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
              />
            </svg>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-white mb-3">
          Раздел в разработке
        </h1>
        <p className="text-gray-400 mb-6">
          Этот раздел временно недоступен. Мы работаем над новыми возможностями для обучения бизнесу, которые появятся в следующих обновлениях.
        </p>
        <a 
          href="/roadmaps"
          className="inline-flex items-center px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
        >
          Перейти к курсам
        </a>
      </div>
    </div>
  );
}
