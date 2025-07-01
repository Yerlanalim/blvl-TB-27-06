// TODO: /coding-challenges - переименовать в "Практика" и адаптировать под бизнес-задачи в v2.0
// Отключено в MVP - функция появится в следующих обновлениях

import ComingSoon from '@/components/shared/coming-soon';
import { createMetadata } from '@/utils/seo';

export async function generateMetadata() {
  return createMetadata({
    title: 'Практические задания | BizLevel',
    description: 'Раздел появится в следующих обновлениях',
    canonicalUrl: '/coding-challenges',
  });
}

export default function CodingChallengesPage() {
  return (
    <ComingSoon
      title="Практические задания"
      description="Раздел с практическими бизнес-заданиями появится в следующих обновлениях"
      expectedVersion="v2.0"
      redirectTo="/roadmaps"
      redirectText="Вернуться к обучению"
    />
  );
}
