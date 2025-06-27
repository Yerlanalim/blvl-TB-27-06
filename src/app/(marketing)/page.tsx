import dynamic from 'next/dynamic';

import HomepageHero from '@/components/marketing/homepage/hero/hero';

const FeaturesBentoGrid = dynamic(
  () => import('@/components/marketing/homepage/features/features-bento-grid'),
  { ssr: false }
);

import PersonalizedBlock from '@/components/marketing/homepage/personalized/block';
import OpenSourceBlock from '@/components/marketing/global/open-source/open-source-block';
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
      title: 'Never miss a day',
      description:
        'We send you a personalized coding challenge every day to keep you on track. Getting your daily coding fix in as little as 3 minutes per day.',
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
      title: 'Perfect for Beginners',
      description:
        'Start your coding journey with beginner-friendly challenges. Our step-by-step guidance and clear explanations make learning to code easy and enjoyable.',
      icon: <GraduationCap width="1.5em" height="1.5em" />,
    },
    {
      title: 'Code Anywhere',
      description:
        'Learn and practice coding on any device with our mobile-optimized platform. Perfect for learning on the go.',
      icon: (
        <MirrorTabletPhone3 width="1.5em" height="1.5em" fill="#3b82f6" secondaryfill="#ef4444" />
      ),
    },
    {
      title: 'Instant Feedback',
      description:
        'Get instant feedback on your code with our AI-powered coding assistant. Perfect for learning to code and improving your skills.',
      icon: <ChatBot className="size-6" />,
    },
    {
      title: 'Stay on Track',
      description:
        'Set yourself study goals and get notified when you need to code. Perfect for staying on track and improving your skills.',
      icon: <ArcheryTarget width="1.5em" height="1.5em" />,
    },
    {
      title: 'No Credit Card Required',
      description:
        'Try BizLevel for free, no credit card required. Perfect for learning to code and improving your skills.',
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
      title: 'Interactive Challenges',
      description:
        'Practice with hands-on coding challenges that simulate real-world scenarios. Build skills while solving problems that matter.',
      icon: <Code width="1.5em" height="1.5em" />,
    },
    {
      title: 'Structured Learning Paths',
      description:
        'Follow a simple, structured learning path to boost your coding skills. Opt-in to receive daily reminders to complete it!',
      icon: <RoadmapIcon height="1.5em" width="1.5em" />,
    },
    {
      title: 'Generate Code Reports',
      description:
        "Don't just code blindly. Generate code reports to track your progress and understand your weaknesses.",
      icon: <Document width="1.5em" height="1.5em" />,
    },
    {
      title: 'Advanced Filtering',
      description:
        'Easily navigate through our vast library of coding challenges with our advanced filtering options.',
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
          title="Built to build your coding skills"
          subheader="Ensuring you get the most out of your coding journey. From beginner to advanced, we've got you covered."
          align="left"
        />
        <MarketingContentGrid
          title='"With BizLevel, learning to code has never been easier"'
          subheading={`- You, ${marketingContentGridSubHeading}`}
          items={contentGridItems}
        />
        <Testimonials />
        <OpenSourceBlock />
        <CallToActionBlock
          title="Ready to unlock your full potential?"
          description="Join developers taking their development journey seriously. Try BizLevel for free, no credit card required."
        />
      </div>
    </>
  );
}
