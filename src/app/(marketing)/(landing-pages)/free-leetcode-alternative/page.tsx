import FeatureLeftRightSection from '@/components/marketing/features/daily-challenge/feature-left-right/features-section';
import FAQsBlock from '@/components/marketing/global/blocks/faqs';
import FeatureDailyChallengeHero from '@/components/marketing/features/daily-challenge/hero/daily-challenge-hero';
import FeatureRoadmapThreeGridBlock from '@/components/marketing/features/roadmap/roadmap-three-grid';
import CallToActionBlock from '@/components/marketing/global/blocks/call-to-action-block';
import type { WebPageJsonLd } from '@/types';
import { getBaseUrl } from '@/utils';
import { createMetadata } from '@/utils/seo';
import Link from 'next/link';
import { QUESTIONS_COUNT } from '@/utils/constants/misc';
import ComparisonTable, { Feature } from '@/components/marketing/global/blocks/comparison-table';
import Testimonials from '@/components/marketing/global/blocks/testimonials';
import { Button } from '@/components/ui/button';

const features: Feature[] = [
  {
    name: 'Free Daily Coding Challenges',
    yourCompany: { value: true },
    otherCompany: { value: true },
  },
  {
    name: 'Question library',
    yourCompany: { value: true },
    otherCompany: { value: true },
  },
  {
    name: 'AI-assistant',
    yourCompany: { value: true },
    otherCompany: { value: false },
  },
  {
    name: 'Personalized Roadmaps',
    yourCompany: { value: true },
    otherCompany: { value: false },
  },
  {
    name: 'Leaderboards',
    yourCompany: { value: true },
    otherCompany: { value: true },
  },
  {
    name: 'Statistics',
    yourCompany: { value: true },
    otherCompany: { value: true },
  },
  {
    name: 'Personalized Coding Reports',
    yourCompany: { value: true },
    otherCompany: { value: false },
  },
  {
    name: 'Customized Coding Challenges',
    yourCompany: { value: true },
    otherCompany: { value: false },
  },
  {
    name: 'Open Source',
    yourCompany: { value: true },
    otherCompany: { value: false },
  },
  {
    name: 'Pro Pricing',
    yourCompany: {
      value: '$4.99/mo',
      tooltip: 'We offer a 30% discount for students.',
    },
    otherCompany: { value: '$35/mo' },
  },
  {
    name: 'Lifetime Access',
    yourCompany: { value: true },
    otherCompany: { value: false },
  },
  {
    name: 'Individual Student Discount',
    yourCompany: {
      value: true,
      tooltip: 'We offer a 30% discount for students.',
    },
    otherCompany: { value: false },
  },
  {
    name: 'Community',
    yourCompany: { value: true },
    otherCompany: { value: true },
  },
  {
    name: 'Personal Profile',
    yourCompany: { value: false, tooltip: 'Coming Soon!' },
    otherCompany: { value: true },
  },
  {
    name: 'Multi-language support',
    yourCompany: {
      value: false,
      tooltip:
        'We currently support JavaScript, and frameworks like React, and Vue. We are working on adding more languages and frameworks to the platform.',
    },
    otherCompany: { value: true },
  },
];

export async function generateMetadata() {
  return createMetadata({
    title: 'Free LeetCode Alternative | BizLevel',
    description:
      'Discover the best free LeetCode alternative with BizLevel. Engage in daily coding challenges and master new skills in just 5 minutes a day.',
    image: {
      text: 'Free LeetCode Alternative | BizLevel',
      bgColor: '#000',
      textColor: '#fff',
    },
    keywords: [
      'free leetcode alternative',
      'coding challenges',
      'daily coding challenges',
      'learn to code',
      'coding practice',
      'bizlevel',
      'programming',
      'developer skills',
    ],
    canonicalUrl: '/free-leetcode-alternative',
  });
}

export default function Page() {
  const jsonLd: WebPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: `${getBaseUrl()}/free-leetcode-alternative`,
    headline: 'The Best Free LeetCode Alternative | BizLevel',
    description:
      'BizLevel transforms your coding journey into a personalized, engaging, and effective experience. Ensuring you learn essential coding skills faster than ever.',
    image:
      '/api/og?text=BizLevel&accentColor=%2322c55e',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${getBaseUrl()}` },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Free LeetCode Alternative',
          item: `${getBaseUrl()}/free-leetcode-alternative`,
        },
      ],
    },
    author: {
      '@type': 'Organization',
      name: 'BizLevel',
      url: `${getBaseUrl()}/free-leetcode-alternative`,
    },
    dateModified: new Date().toISOString(),
    datePublished: new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${getBaseUrl()}/free-leetcode-alternative`,
    },
    keywords:
      'learn to code, learn to code for free, learn javascript, coding challenges, daily coding challenges, web development, tech skills assessment, learn to code on phone',
    publisher: {
      '@type': 'Organization',
      name: 'BizLevel',
      logo: {
        '@type': 'ImageObject',
        url: 'https://bizlevel.dev/favicon.ico',
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${getBaseUrl()}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const faqs = [
    {
      question: 'What is BizLevel?',
      answer: 'BizLevel is a platform that helps you learn to code.',
    },
    {
      question: 'What are daily coding challenges on BizLevel?',
      answer:
        'Daily coding challenges on BizLevel are designed to help you learn to code. They are designed to be challenging, and to help you learn essential coding skills faster than ever.',
    },
    {
      question: 'Do I need to pay to use the daily challenge?',
      answer: (
        <>
          No, the daily challenge is free to use for everyone. You can{' '}
          <Link href="/signup" className="text-accent">
            sign up
          </Link>{' '}
          for free and start solving challenges today.
        </>
      ),
    },
    {
      question: 'How can I track my progress?',
      answer:
        'You can track your progress by looking at the leaderboard, or checking out your statistics page.',
    },
    {
      question: 'What are roadmaps on BizLevel?',
      answer:
        'Roadmaps are personalized learning paths that are created based on your current coding skills. We analyze your current skills set, and are able to create a roadmap that is tailored to you. Meaning every user will be getting a unique experience with BizLevel.',
    },
    {
      question: 'What are leaderboards on BizLevel?',
      answer:
        'Leaderboards are a way to see how you stack up against other users on BizLevel. You can see your rank, and how you compare to other users. This is an opt-in feature, and you can choose to hide your rank from the public if you wish.',
    },
    {
      question: 'What makes BizLevel better than other coding platforms?',
      answer:
        'BizLevel is the best free LeetCode alternative due to it being personalized, engaging, and effective with real-world coding challenges. We ensure you learn essential coding skills faster than ever, and that you are able to track your progress and see how you compare to other users. We are also open source, and you can see the code for the platform on our GitHub page.',
    },
    {
      question: 'How many coding challenges are there on BizLevel?',
      answer: `There are over ${QUESTIONS_COUNT}+ coding challenges on BizLevel. We are constantly adding new challenges, and we are working on adding more real-world coding challenges to the platform.`,
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container">
        <FeatureDailyChallengeHero
          header="The Best Free LeetCode Alternative"
          subheader="BizLevel transforms your coding journey into a personalized, engaging, and effective experience. Ensuring you learn essential coding skills faster than ever."
          animatedSpan="Free LeetCode Alternative"
        />

        <FeatureLeftRightSection
          leftHeader="Learn new coding skills with ease"
          leftSubheader="BizLevel empowers your growth with intuitive progress tracking. See how far you've come with streak counts that celebrate your dedication and keep you motivated. Stay on track, achieve consistency, and make self-improvement a daily habit."
        />

        <div className="md:container mx-auto pt-16 pb-48 max-w-5xl">
          <div className="flex flex-col gap-y-3 mb-10 items-center">
            <h1 className="text-3xl md:text-5xl font-bold text-center text-gradient from-white/55 to-white">
              Product Comparison
            </h1>
            <p className="text-center text-lg max-w-xl mx-auto">
              BizLevel is the best free LeetCode alternative. A more personalized and engaging
              experience with real-world coding challenges.
            </p>
            <Button href="/signup" variant="accent">
              Start for free
            </Button>
          </div>
          <ComparisonTable
            features={features}
            yourCompanyName="BizLevel"
            otherCompanyName="LeetCode"
          />
        </div>

        <Testimonials />

        <FeatureRoadmapThreeGridBlock />

        <FAQsBlock faqs={faqs} />

        <CallToActionBlock
          title="Learning to Code Made Simple"
          description="BizLevel is the best free LeetCode alternative - Join BizLevel today and start your journey to becoming a better developer."
        />
      </div>
    </>
  );
}
