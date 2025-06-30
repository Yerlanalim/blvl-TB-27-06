import { Suspense } from 'react';

// components
import Hero from '@/components/shared/hero';
import { Button } from '@/components/ui/button';
import ContinueJourney from '@/components/app/navigation/continue-journey-button';
import { ArrowRightIcon, InfoIcon } from 'lucide-react';
import { StudyPathCard } from '@/components/app/study-paths/study-path-card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

// utils
import { createMetadata } from '@/utils/seo';
import { getStudyPathsAndGroupByCategory } from '@/utils/data/study-paths/get';
import { getBaseUrl } from '@/utils';

// types
import { WebPageJsonLd } from '@/types';

export async function generateMetadata() {
  return createMetadata({
    title: 'Пути обучения | BizLevel',
    description:
      'Коллекция путей обучения бизнесу: предпринимательство, маркетинг, продажи, управление. Создано для развития ваших навыков в различных областях бизнеса.',
    image: {
      text: 'Пути обучения | BizLevel',
      bgColor: '#000',
      textColor: '#fff',
    },
    canonicalUrl: '/roadmaps',
  });
}

const heroDescription = (
  <div className="flex flex-col gap-y-4 z-20 relative font-inter max-w-3xl">
    <p className="text-sm md:text-base text-gray-400 font-onest">
      Изучите нашу библиотеку путей обучения бизнесу, охватывающую множество тем. 
      Ставьте свои цели и проходите материалы в своем темпе, становясь на 1% лучше каждый день.
    </p>
    <div className="flex flex-col gap-y-2">
      <p className="text-gray-400 font-onest">Не можете найти то, что ищете?</p>
      <div className="flex items-center gap-x-2 pt-1">
        {/* BIZLEVEL: Убрано для бизнес-версии - нет coding challenges */}
        {/* <Button href="/coding-challenges" variant="secondary">
          View all challenges
        </Button> */}
        <Suspense
          fallback={
            <Button variant="ghost" className="w-full">
              Ваш следующий рекомендуемый вопрос
              <ArrowRightIcon className="size-4" />
            </Button>
          }
        >
          <ContinueJourney text="Продолжить с последнего урока" variant="ghost" />
        </Suspense>
      </div>
    </div>
  </div>
);

export default async function ExploreQuestionsPage() {
  // create json ld
  const jsonLd: WebPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: `${getBaseUrl()}/roadmaps`,
    headline: 'Пути обучения | BizLevel',
    description:
      'Кураторские списки бизнес-вопросов, охватывающие предпринимательство, маркетинг, продажи, управление. Идеально для ежедневной практики.',
    image:
      'https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images/Screenshot%202025-01-11%20at%2002.24.28.png',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${getBaseUrl()}` },
        { '@type': 'ListItem', position: 2, name: 'Roadmaps', item: `${getBaseUrl()}/roadmaps` },
      ],
    },
    author: {
      '@type': 'Organization',
      name: 'BizLevel',
      url: getBaseUrl(),
    },
    dateModified: new Date().toISOString(),
    datePublished: new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': getBaseUrl(),
    },
    keywords:
      'изучение бизнеса бесплатно, обучение предпринимательству, интерактивные бизнес-задачи, ежедневная практика бизнеса, персональный план обучения, развитие бизнес-навыков, лучшая платформа изучения бизнеса, AI помощь в бизнесе',
    publisher: {
      '@type': 'Organization',
      name: 'BizLevel',
      logo: {
        '@type': 'ImageObject',
        url: 'https://bizlevel.dev/favicon.ico',
      },
    },
  };

  const { categories, studyPathsByCategory } = await getStudyPathsAndGroupByCategory({
    sortCategoryOrder: true,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex flex-col gap-y-12 max-w-7xl mx-auto">
        <Hero heading="Библиотека" subheading={heroDescription} container={true} />
        <div className="lg:container flex flex-col lg:flex-row mt-5 gap-16">
          <div className="w-full flex flex-col gap-12">
            {categories.map((category) => (
              <div key={category} className="space-y-6">
                <div className="flex items-center gap-x-2">
                  <h2 className="text-2xl font-bold text-white">{category}</h2>
                  {studyPathsByCategory[category][0].categoryToolTip && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="size-4" />
                      </TooltipTrigger>
                      <TooltipContent>
                        {studyPathsByCategory[category][0].categoryToolTip}
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {studyPathsByCategory[category].map((studyPath) => (
                    <StudyPathCard key={studyPath.uid} studyPath={studyPath} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
