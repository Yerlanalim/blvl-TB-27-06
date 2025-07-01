// TODO: /coding-challenges/custom - переименовать в "Индивидуальные задания" и адаптировать под бизнес в v2.0
// Отключено в MVP - функция появится в следующих обновлениях

import ComingSoon from '@/components/shared/coming-soon';
import { createMetadata } from '@/utils/seo';

export async function generateMetadata() {
  return createMetadata({
    title: 'Индивидуальные задания | BizLevel',
    description: 'Раздел появится в следующих обновлениях',
    canonicalUrl: '/coding-challenges/custom',
  });
}

export default function CustomCodingChallengesPage() {
  return (
    <ComingSoon
      title="Индивидуальные задания"
      description="Раздел с персонализированными бизнес-заданиями появится в следующих обновлениях"
      expectedVersion="v2.0"
      redirectTo="/roadmaps"
      redirectText="Вернуться к обучению"
    />
  );
}
