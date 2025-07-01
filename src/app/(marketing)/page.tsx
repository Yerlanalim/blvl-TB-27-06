import dynamic from 'next/dynamic';

import HomepageHero from '@/components/marketing/homepage/hero/hero';

const FeaturesBentoGrid = dynamic(
  () => import('@/components/marketing/homepage/features/features-bento-grid'),
  { ssr: false }
);

import PersonalizedBlock from '@/components/marketing/homepage/personalized/block';
import CallToActionBlock from '@/components/marketing/global/blocks/call-to-action-block';

import { Metadata } from 'next';
import { getBaseUrl } from '@/utils';
import type { WebPageJsonLd } from '@/types';
import Testimonials from '@/components/marketing/homepage/testimonials';
import MarketingContentGrid, {
  MarketingContentGridProps,
} from '@/components/marketing/global/blocks/content-grid';

import HomepageUserStats from '@/components/marketing/global/blocks/homepage-user-stats';
import { getUserCount } from '@/utils/data/user/get-user-count';
import ChatBot from '@/components/ui/icons/chat-bot';
import ArcheryTarget from '@/components/ui/icons/target';
import Calendar from '@/components/ui/icons/calendar';
import MirrorTabletPhone3 from '@/components/ui/icons/mirror-tablet-phone-3';
import CreditCardIcon from '@/components/ui/icons/credit-card';
import GraduationCap from '@/components/ui/icons/graduation-cap';
import ThreeBlockShowcase from '@/components/marketing/global/blocks/three-block-showcase';
import FeatureIconGrid from '@/components/marketing/global/blocks/feature-icon-grid';
import { Code } from 'lucide-react';
import RoadmapIcon from '@/components/ui/icons/roadmap';
import MaterialSymbolsFilterListRounded from '@/components/ui/icons/filter';
import Document from '@/components/ui/icons/document';

const title = 'Обучение бизнесу с нуля | BizLevel - Платформа для предпринимателей';
const description =
  'BizLevel поможет вам изучить основы бизнеса и предпринимательства. Интерактивные уроки, практические задания и персональная поддержка AI-наставника Leo.';

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    // Primary keywords
    'обучение бизнесу',
    'основы бизнеса',
    'предпринимательство',
    'бизнес для начинающих',
    // Secondary keywords
    'бизнес-образование',
    'стартап',
    'малый бизнес',
    'бизнес-навыки',
    // Long-tail keywords
    'изучить бизнес онлайн бесплатно',
    'интерактивная платформа обучения бизнесу',
    'бизнес-курсы для начинающих',
    'как начать свой бизнес',
  ],
  openGraph: {
    title,
    description,
    type: 'website',
    url: getBaseUrl(),
    siteName: 'BizLevel',
    images: [
      {
        url: '/api/og?text=BizLevel&accentColor=%2322c55e',
        width: 1200,
        height: 630,
        alt: 'BizLevel - Платформа для обучения бизнесу и предпринимательству',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [
      {
        url: '/api/og?text=BizLevel&accentColor=%2322c55e',
        width: 1200,
        height: 630,
        alt: 'BizLevel - Платформа для обучения бизнесу и предпринимательству',
      },
    ],
    creator: '@bizlevel',
    site: '@bizlevel',
  },
  alternates: {
    canonical: getBaseUrl(),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function Page() {
  const jsonLd: WebPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: getBaseUrl(),
    headline: title,
    description,
    image: '/api/og?text=BizLevel&accentColor=%2322c55e',
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
      'обучение бизнесу, основы бизнеса, предпринимательство, бизнес для начинающих, бизнес-образование, стартап, малый бизнес, бизнес-навыки, изучить бизнес онлайн бесплатно, интерактивная платформа обучения бизнесу, бизнес-курсы для начинающих, как начать свой бизнес',
    publisher: {
      '@type': 'Organization',
      name: 'BizLevel',
      logo: {
        '@type': 'ImageObject',
        url: 'https://bizlevel.kz/favicon.ico',
      },
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: getBaseUrl(),
        },
      ],
    },
  };

  const contentGridItems: MarketingContentGridProps[] = [
    {
      title: 'Ни дня без обучения',
      description:
        'Получайте персонализированные бизнес-задания каждый день. Изучайте основы предпринимательства всего за 3 минуты в день.',
      icon: (
        <Calendar
          fill="#334155"
          secondaryfill="#f1f5f9"
          strokewidth={1}
          width="1.5em"
          height="1.5em"
        />
      ),
    },
    {
      title: 'Идеально для новичков',
      description:
        'Начните свой предпринимательский путь с простых заданий. Пошаговые инструкции и ясные объяснения делают изучение бизнеса легким и увлекательным.',
      icon: <GraduationCap width="1.5em" height="1.5em" />,
    },
    {
      title: 'Учитесь везде',
      description:
        'Изучайте бизнес на любом устройстве с нашей мобильной платформой. Идеально для обучения в дороге.',
      icon: (
        <MirrorTabletPhone3 width="1.5em" height="1.5em" fill="#3b82f6" secondaryfill="#ef4444" />
      ),
    },
    {
      title: 'Мгновенная обратная связь',
      description:
        'Получайте мгновенную обратную связь от AI-наставника Leo. Идеально для изучения бизнеса и развития навыков.',
      icon: <ChatBot className="size-6" />,
    },
    {
      title: 'Достигайте целей',
      description:
        'Ставьте учебные цели и получайте уведомления. Идеально для поддержания мотивации и развития бизнес-навыков.',
      icon: <ArcheryTarget width="1.5em" height="1.5em" />,
    },
    {
      title: 'Без кредитной карты',
      description:
        'Попробуйте BizLevel бесплатно, кредитная карта не требуется. Идеально для изучения основ бизнеса.',
      icon: <CreditCardIcon className="size-6" />,
    },
  ];

  const userCount = getUserCount();

  // calculate 5 days from now
  const date = new Date();
  date.setDate(date.getDate() + 5);
  const marketingContentGridSubHeading = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const featureIconGridItems = [
    {
      title: 'Интерактивные кейсы',
      description:
        'Практикуйтесь с бизнес-кейсами, имитирующими реальные ситуации. Развивайте навыки, решая важные задачи.',
      icon: <Code width="1.5em" height="1.5em" />,
    },
    {
      title: 'Структурированное обучение',
      description:
        'Следуйте простому, структурированному пути для развития бизнес-навыков. Получайте ежедневные напоминания!',
      icon: <RoadmapIcon height="1.5em" width="1.5em" />,
    },
    {
      title: 'Отчеты о прогрессе',
      description:
        'Не учитесь вслепую. Генерируйте отчеты для отслеживания прогресса и понимания слабых мест.',
      icon: <Document width="1.5em" height="1.5em" />,
    },
    {
      title: 'Расширенная фильтрация',
      description:
        'Легко навигируйте по нашей обширной библиотеке бизнес-заданий с расширенными опциями фильтрации.',
      icon: <MaterialSymbolsFilterListRounded className="size-6" />,
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="overflow-x-hidden container z-30">
        <HomepageHero userCountPromise={userCount} />
        <FeaturesBentoGrid />
        <HomepageUserStats userCountPromise={userCount} />

        <PersonalizedBlock paddingBottom="pb-10" />

        <FeatureIconGrid
          borderTop
          items={featureIconGridItems}
          paddingTop="pt-12"
          paddingBottom="pb-24"
        />
        <ThreeBlockShowcase
          title="Создано для развития ваших бизнес-навыков"
          subheader="Обеспечиваем максимальную пользу от вашего предпринимательского пути. От новичка до эксперта - мы поможем вам."
          align="left"
        />
        <MarketingContentGrid
          title='"С BizLevel изучение бизнеса стало проще, чем когда-либо"'
          subheading={`- Вы, ${marketingContentGridSubHeading}`}
          items={contentGridItems}
        />
        <Testimonials />
        <CallToActionBlock
          title="Готовы раскрыть свой потенциал?"
          description="Присоединяйтесь к предпринимателям, которые серьезно относятся к своему развитию. Попробуйте BizLevel бесплатно."
        />
      </div>
    </>
  );
}
