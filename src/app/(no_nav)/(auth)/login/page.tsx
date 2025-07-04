import LoginForm from '@/components/auth/login';
import type { WebPageJsonLd } from '@/types';
import { getBaseUrl } from '@/utils';
import Link from 'next/link';

import { createMetadata } from '@/utils/seo';

export async function generateMetadata() {
  return createMetadata({
    title: 'Login | BizLevel',
    description: 'Login to your account to continue.',
    image: {
              text: 'Login | BizLevel',
      bgColor: '#000',
      textColor: '#fff',
    },
    canonicalUrl: '/login',
  });
}

export default function LoginPage({
  searchParams,
}: {
  searchParams: { redirectUrl: string; onboarding: string };
}) {
  // create json ld
  const jsonLd: WebPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: `${getBaseUrl()}/login`,
          headline: 'Login | BizLevel',
    description:
      'Кураторские списки бизнес-заданий по разным темам: менеджмент, маркетинг, финансы. Идеально для ежедневной практики в бизнесе.',
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
          name: 'Login',
          item: `${getBaseUrl()}/login`,
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
      '@id': `${getBaseUrl()}/login`,
    },
    keywords:
      'изучение бизнеса бесплатно, бизнес-уроки для начинающих, интерактивные бизнес-задания, ежедневная бизнес-практика, персонализированная карта обучения, развитие бизнес-навыков, лучшая платформа для изучения бизнеса, AI-помощник в бизнесе, изучение предпринимательства',
    publisher: {
      '@type': 'Organization',
      name: 'BizLevel',
      logo: {
        '@type': 'ImageObject',
        url: 'https://bizlevel.kz/favicon.ico',
      },
    },
  };

  const { redirectUrl, onboarding } = searchParams;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="w-full xl:w-1/2 flex flex-col gap-5 items-center justify-center lg:p-8">
        <div className="w-full space-y-6 max-w-md">
          <div className="flex flex-col gap-y-1">
            <h1 className="font-bold text-xl lg:text-3xl mb-2 font-onest text-gradient from-white/75 to-white">
              Welcome back!
            </h1>
            <p className="text-gray-300 mb-4 text-sm font-onest text-wrap">
              Sign in to your account to continue.
            </p>
          </div>
          <LoginForm redirectUrl={redirectUrl} onboarding={onboarding} />
        </div>
        <span className="block text-sm text-gray-400 hover:text-white duration-300 text-center mt-4">
          Don't have an account?{' '}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </span>
      </div>
    </>
  );
}
