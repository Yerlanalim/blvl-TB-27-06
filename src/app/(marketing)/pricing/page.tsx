import CallToActionBlock from '@/components/marketing/global/blocks/call-to-action-block';
import FAQsBlock from '@/components/marketing/global/blocks/faqs';
import PricingCardBlock from '@/components/marketing/pricing/pricing-card-block';
import { createMetadata } from '@/utils/seo';
import Link from 'next/link';
import FrequencyToggle from '@/components/shared/payment/frequency-toggle';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import Testimonials from '@/components/marketing/global/blocks/testimonials';
import PricingTable from '@/components/marketing/pricing/pricing-table';
import StudentDiscountBlock from '@/components/marketing/pricing/student-discount';

export async function generateMetadata() {
  return createMetadata({
    title: 'Pricing | BizLevel',
    description:
      'Start for free and unlock premium features with our affordable plans to help you become a better developer.',
    image: {
      text: 'Pricing | BizLevel',
      bgColor: '#000',
      textColor: '#fff',
    },
    keywords: [
      'бизнес-обучение',
      'подписка',
      'доступно',
      'премиум',
      'бесплатные бизнес-курсы',
      'самый популярный',
      'предпринимательство',
      'менеджмент курс',
      'развитие',
    ],
    canonicalUrl: '/pricing',
  });
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'bizlevel SaaS Platform',
  description:
    'BizLevel - это онлайн-платформа, которая помогает пользователям развивать бизнес-знания через интерактивные вопросы и задания.',
  brand: {
    '@type': 'Brand',
    name: 'bizlevel',
  },
  offers: [
    {
      '@type': 'Offer',
      name: 'Free Plan',
      price: '0',
      priceCurrency: 'USD',
      description:
        'Доступ ко всем бизнес-заданиям и ежедневным вызовам, таблицам лидеров, статистике и многому другому.',
      url: 'https://bizlevel.dev/pricing',
      category: 'Free',
    },
    {
      '@type': 'Offer',
      name: 'Pro Plan',
      price: '5.99',
      priceCurrency: 'USD',
      description: 'Разблокируйте все задания, ежедневные вызовы и персонализированные AI-карты обучения.',
      url: 'https://bizlevel.dev/pricing',
      category: 'Paid',
    },
    {
      '@type': 'Offer',
      name: 'Lifetime Access',
      price: '89.99',
      priceCurrency: 'USD',
      description:
        'Разблокируйте все задания, ежедневные вызовы и персонализированные AI-карты обучения. Пожизненный доступ.',
      url: 'https://bizlevel.dev/pricing',
      category: 'Paid',
    },
  ],
  url: 'https://bizlevel.dev/pricing',
  image:
    '/api/og?text=BizLevel&accentColor=%2322c55e',
};

async function updateFrequency(frequency: 'month' | 'year') {
  'use server';
  cookies().set('billing_frequency', frequency);
  revalidatePath('/pricing');
}

export default async function PricingPage() {
  const cookieStore = cookies();

  const faqs = [
    {
      question: 'Можно ли использовать BizLevel бесплатно?',
      answer: (
        <>
          Конечно! BizLevel предлагает бесплатный план для начала прямо сейчас.{' '}
          <Link href="/signup" className="text-accent">
            Зарегистрируйтесь бесплатно
          </Link>{' '}
          и погрузитесь в нашу богатую библиотеку бизнес-ресурсов уже сегодня. Переходите на платный план для 
          разблокировки всех функций в любое время.
        </>
      ),
    },
    {
      question: 'Что такое BizLevel и как он помогает предпринимателям?',
      answer:
        'BizLevel - это инновационная онлайн-платформа обучения, созданная для предпринимателей всех уровней. Наши инструменты, включая тесты, бизнес-карты и руководства, помогают развивать навыки, повышать продуктивность и быть впереди в бизнес-индустрии.',
    },
    {
      question: 'Чем BizLevel отличается от других бизнес-платформ?',
      answer:
        'BizLevel выделяется предложением кратких, интерактивных бизнес-кейсов, которые являются одновременно увлекательными и образовательными. Наша платформа создана для быстрого и эффективного улучшения навыков без необходимости в обширных руководствах или длинном контенте.',
    },
    {
      question: 'Что такое AI-помощник?',
      answer:
        "AI-помощник - это ваш персональный бизнес-наставник, который может дать советы и руководство для ответа на наши задания. Сложно ответить на вопрос? Спросите AI-помощника о помощи. Не понимаете ответ? Спросите AI-помощника!",
    },
    {
      question: 'Каковы ключевые преимущества использования BizLevel?',
      answer: (
        <>
          BizLevel предоставляет увлекательные, краткие бизнес-вопросы и практические карты для помощи
          предпринимателям в развитии навыков и решении реальных бизнес-задач. Мы стремимся улучшить ваши
          навыки как предпринимателя всего за 10 минут в день. Вы можете ознакомиться с нашими учебными путями{' '}
          <Link href={`/questions/explore`} className="text-accent">
            здесь
          </Link>{' '}
          чтобы получить представление о том, что мы предлагаем.
        </>
      ),
    },
    {
      question: 'Как начать работу с BizLevel?',
      answer: (
        <>
          It’s easy!{' '}
          <Link href="/signup" className="text-accent">
            Sign up for a free account
          </Link>{' '}
          . Ready to take your skills to the next level? Upgrade to a paid plan and unlock all our
          features.
        </>
      ),
    },
    {
      question: 'What is the refund policy?',
      answer: (
        <>
          You can get a refund within 14 days of your purchase. Please contact us at{' '}
          <Link href="mailto:team@bizlevel.dev" className="text-accent">
            team@bizlevel.dev
          </Link>{' '}
          to request a refund.
        </>
      ),
    },
    {
      question: 'Do you offer any discounts?',
      answer: (
        <>
          Yes! We believe that BizLevel should be available to all students. To claim your
          discount, please email us at{' '}
          <a href="mailto:team@bizlevel.dev" className="text-accent">
            team@bizlevel.dev
          </a>{' '}
          using your student email address. We are currently running a limited time, 50% discount
          for students. This will be available until the end of February 2025, after which the
          discount will be 30% off.
        </>
      ),
    },
    {
      question: 'I have more questions, how can I contact you?',
      answer: (
        <>
          Please contact us at{' '}
          <Link href="mailto:team@bizlevel.dev" className="text-accent">
            team@bizlevel.dev
          </Link>{' '}
          and we will get back to you as soon as possible.
        </>
      ),
    },
  ];

  const billingPeriod = (cookieStore.get('billing_frequency')?.value as 'month' | 'year') || 'year';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="text-center min-h-screen container flex flex-col">
        <div className="flex flex-col gap-y-2 items-center pb-16 pt-28 md:pb-20 md:pt-32 xl:pt-40 xl:pb-32 max-w-7xl mx-auto">
          <div className="group w-fit relative inline-flex overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              Pricing
            </span>
          </div>
          <h1 className="text-3xl lg:text-5xl !font-onest !font-medium !leading-[1.1] text-gradient from-white to-white/75">
            Изучение бизнеса стало <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent/55">
              проще{' '}
            </span>{' '}
            чем когда-либо
          </h1>
          <p className="text-gray-400 max-w-xl">
            Сделайте изучение бизнеса легким с нашими доступными тарифными планами. Начните бесплатно и 
            улучшите доступ к персонализации.
          </p>
          <FrequencyToggle initialFrequency={billingPeriod} onFrequencyChange={updateFrequency} />
          <div className="my-10">
            <PricingCardBlock frequency={billingPeriod} />
          </div>

          <div className="mt-28 mb-14 w-full">
            <StudentDiscountBlock />
          </div>

          <div className="mt-28 mb-14 w-full">
            <PricingTable />
          </div>
        </div>

        <div className="mt-10 mb-28">
          <Testimonials header="Loved by developers just like you" />
        </div>

        <FAQsBlock faqs={faqs} />

        <CallToActionBlock title="Your dream career in tech is a click away" />
      </div>
    </>
  );
}
