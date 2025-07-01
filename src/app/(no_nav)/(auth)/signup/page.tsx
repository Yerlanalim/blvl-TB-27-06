import SignupForm from '@/components/auth/signup';
import { createMetadata } from '@/utils/seo';
import RoadmapQuestionCard from '@/components/app/roadmaps/questions/[uid]/question-card';
import SocialProof from '@/components/marketing/global/social-proof';
import { getUserCount } from '@/utils/data/user/get-user-count';
import { Suspense } from 'react';
import Link from 'next/link';
import type { WebPageJsonLd, RoadmapUserQuestions } from '@/types';
import { getBaseUrl } from '@/utils';

export async function generateMetadata() {
  return createMetadata({
    title: 'Sign Up | BizLevel',
    description: 'Sign up for BizLevel to get started.',
    image: {
              text: 'Sign Up | BizLevel',
      bgColor: '#000',
      textColor: '#fff',
    },
    canonicalUrl: '/signup',
  });
}

const dummyQuestions: Partial<RoadmapUserQuestions>[] = [
  {
    uid: 'question-1',
    question: 'Какой тип планирования помогает определить долгосрочные цели компании?',
    difficulty: 'EASY',
    completed: true,
    userCorrect: true,
  },
  {
    uid: 'question-2',
    question: 'Что такое точка безубыточности в финансовом планировании?',
    difficulty: 'MEDIUM',
    completed: true,
    userCorrect: false,
  },
  {
    uid: 'question-3',
    question: 'Какая главная цель маркетинговой стратегии 4P?',
    difficulty: 'EASY',
    completed: true,
    userCorrect: true,
  },
];

const dummyRoadmapUid = 'roadmap-12345';

const dummyTotalQuestions = dummyQuestions.length;

export default async function SignupPage() {
  // create json ld
  const jsonLd: WebPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: `${getBaseUrl()}/signup`,
    headline: 'Sign Up for free | BizLevel',
    description:
      'Лучшая платформа для изучения бизнеса с нуля для начинающих предпринимателей. Кредитная карта не требуется.',
    image:
      'https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images/Screenshot%202025-01-11%20at%2002.24.28.png',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${getBaseUrl()}`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Sign Up',
          item: `${getBaseUrl()}/signup`,
        },
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
      '@id': `${getBaseUrl()}/signup`,
    },
    keywords:
      'изучение бизнеса бесплатно, бизнес-уроки для начинающих, интерактивные бизнес-задания, ежедневная бизнес-практика, персонализированная карта обучения, развитие бизнес-навыков, лучшая платформа для изучения бизнеса, AI-помощник в бизнесе, изучение предпринимательства',
    publisher: {
      '@type': 'Organization',
      name: 'BizLevel',
      logo: {
        '@type': 'ImageObject',
        url: 'https://bizlevel.dev/favicon.ico',
      },
    },
  };

  const userCount = await getUserCount().then((count) => Math.round(count / 10) * 10);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex gap-10 min-h-screen items-center overflow-hidden">
        {/* left side - Sign up form */}
        <div className="w-full xl:w-1/2 flex flex-col gap-5 items-center justify-center lg:p-8">
          <div className="w-full space-y-6 max-w-md">
            <div className="flex flex-col gap-y-1">
              <h1 className="!text-start font-bold font-onest text-xl lg:text-3xl mb-2 text-gradient from-white/75 to-white">
                Create your BizLevel account
              </h1>
              <p className="text-sm text-gray-400 mb-4">
                Начните свой путь к становлению экспертом в бизнесе бесплатно. Премиум-подписка для персонализированного опыта.
              </p>
            </div>
            <Suspense>
              <SignupForm prefilledEmail="" />
            </Suspense>
          </div>
          <span className="block text-sm text-gray-400 hover:text-white duration-300 text-center mt-4">
            Already have an account?{' '}
            <Link href="/login" prefetch className="underline">
              Sign in
            </Link>
          </span>
        </div>

        {/* right side - Hero/Marketing Content */}
        <div className="relative  hidden xl:flex xl:w-1/2 flex-col items-center justify-center overflow-hidden">
          <SocialProof
            userCount={userCount}
            dailyQuestion={null}
            padding="pb-5 pl-24"
            showDescription={false}
          />
          <div className="max-h-[26rem] relative -right-12">
            {dummyQuestions.map((question, index) => (
              <RoadmapQuestionCard
                key={question.uid}
                question={question}
                roadmapUid={dummyRoadmapUid}
                index={index}
                totalQuestions={dummyTotalQuestions}
                prevQuestionCorrect={index > 0 ? dummyQuestions[index - 1]?.userCorrect : undefined}
                prevQuestionAnswered={index > 0 ? dummyQuestions[index - 1]?.completed : undefined}
                isFakeCard={true}
              />
            ))}
            <div className="z-10 absolute inset-x-0 -left-8 bottom-0 h-36 bg-gradient-to-t from-[#000] to-transparent pointer-events-none"></div>
            <div className="z-10 absolute inset-y-0 right-0 h-full w-44 bg-gradient-to-l from-[#000] to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>
    </>
  );
}
