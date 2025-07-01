// TODO: /personalized-roadmaps - AI-генерация путей обучения в v2.0
// Отключено в MVP - функция в разработке

import ComingSoon from '@/components/shared/coming-soon';
import { createMetadata } from '@/utils/seo';

export async function generateMetadata() {
  return createMetadata({
    title: 'Персонализированные пути | BizLevel',
    description: 'Функция в разработке',
    canonicalUrl: '/personalized-roadmaps',
  });
}

export default function PersonalizedRoadmapsPage() {
  return (
    <ComingSoon
      title="Персонализированные пути"
      description="Функция AI-генерации индивидуальных путей обучения находится в разработке"
      expectedVersion="v2.0"
      redirectTo="/roadmaps"
      redirectText="Перейти к обучению"
    />
  );
}
