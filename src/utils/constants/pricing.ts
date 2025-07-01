import type { UserRecord } from '@/types';
import { QUESTIONS_COUNT } from './misc';

export type FeatureSection = {
  name: string;
  description: string;
  free: boolean;
  premium: boolean;
  lifetime: boolean;
};

export type FeatureList = {
  [key: string]: {
    title: string;
    features: FeatureSection[];
  };
};

export const entireFeatureList: FeatureList = {
  lessons: {
    title: 'Уроки и задания',
    features: [
      {
        name: `${QUESTIONS_COUNT}+ бесплатных уроков`,
        description: 'Новый урок каждый день',
        free: true,
        premium: true,
        lifetime: true,
      },
      {
        name: 'Интерактивные тесты',
        description: 'Тесты с множественным выбором',
        free: true,
        premium: true,
        lifetime: true,
      },
      {
        name: 'Видео-уроки',
        description: 'Обучающие видео от экспертов',
        free: true,
        premium: true,
        lifetime: true,
      },
      {
        name: 'Уведомления о новых уроках',
        description: 'Получайте уведомления о новых материалах',
        free: true,
        premium: true,
        lifetime: true,
      },
      {
        name: 'Ежедневные задания',
        description: 'Выполняйте ежедневные бизнес-задания',
        free: true,
        premium: true,
        lifetime: true,
      },
      {
        name: 'Доступ к премиум урокам',
        description: 'Доступ к продвинутым и специализированным урокам',
        free: false,
        premium: true,
        lifetime: true,
      },
      {
        name: 'Персональные бизнес-кейсы',
        description: 'Генерация индивидуальных бизнес-заданий',
        free: false,
        premium: true,
        lifetime: true,
      },
    ],
  },
  businessPaths: {
    title: 'Карта уровней и прогресс',
    features: [
      {
        name: 'Базовые уровни обучения',
        description: 'Доступ к стандартным программам обучения',
        free: true,
        premium: true,
        lifetime: true,
      },
      {
        name: 'Отслеживание прогресса',
        description: 'Отслеживайте ваш прогресс в обучении',
        free: true,
        premium: true,
        lifetime: true,
      },
      {
        name: 'Цели обучения',
        description: 'Устанавливайте и отслеживайте цели (скоро)',
        free: true,
        premium: true,
        lifetime: true,
      },
      {
        name: 'Персональные программы',
        description: 'Индивидуальные программы под ваши цели',
        free: false,
        premium: true,
        lifetime: true,
      },
      {
        name: 'Доступ к премиум уровням (скоро)',
        description: 'Доступ к продвинутым программам обучения',
        free: false,
        premium: true,
        lifetime: true,
      },
    ],
  },
  stats: {
    title: 'Статистика и отчеты',
    features: [
      {
        name: 'Базовое отслеживание прогресса',
        description: 'Отслеживайте ваш ежедневный прогресс',
        free: true,
        premium: true,
        lifetime: true,
      },
      {
        name: 'Генерация бизнес-отчетов',
        description: 'Создавайте детальные отчеты о прогрессе',
        free: false,
        premium: true,
        lifetime: true,
      },
    ],
  },
  aiAssistant: {
    title: 'AI-наставник Leo',
    features: [
      {
        name: 'AI токены',
        description: 'Кредиты для помощи AI-наставника',
        free: false,
        premium: true,
        lifetime: true,
      },
      {
        name: 'Помощь с уроками',
        description: 'AI-поддержка при изучении материалов',
        free: false,
        premium: true,
        lifetime: true,
      },
      {
        name: 'Разбор ответов',
        description: 'Объяснение правильных ответов с помощью AI',
        free: false,
        premium: true,
        lifetime: true,
      },
    ],
  },
  support: {
    title: 'Поддержка и обновления',
    features: [
      {
        name: 'Базовая поддержка',
        description: 'Email поддержка по основным вопросам',
        free: true,
        premium: true,
        lifetime: true,
      },
      {
        name: 'Приоритетная поддержка',
        description: 'Быстрый ответ с приоритетом',
        free: false,
        premium: true,
        lifetime: true,
      },
      {
        name: 'Доступ к бета-функциям',
        description: 'Ранний доступ к новым возможностям',
        free: false,
        premium: true,
        lifetime: true,
      },
    ],
  },
};

export const getPlans = (
  user: Partial<UserRecord> | null,
  hideFree: boolean = false,
  billingPeriod: 'month' | 'year' = 'month'
) => {
  const plans = [
    !hideFree && {
      id: 'free',
      name: 'Бесплатно',
      currencySymbol: '$',
      price: 0,
      frequency: 'forever',
      frequencyText: 'навсегда',
      shortText: 'Отлично для новичков, желающих изучить основы бизнеса.',
      features: [
        {
          name: 'Персональные уроки бизнеса прямо в ваш почтовый ящик',
        },
        { name: 'Доступ к программам обучения и системе прогресса' },
        {
          name: `Доступ к ${QUESTIONS_COUNT}+ урокам по основам бизнеса, маркетингу, продажам и управлению (добавляются ежедневно!)`,
        },
        { name: 'Просмотр таблиц лидеров и соревнование с другими пользователями' },
        { name: 'Базовая статистика и отслеживание прогресса' },
        { name: 'Базовая поддержка' },
      ],
      compactFeatures: [
        { name: 'Соревнуйтесь с другими пользователями каждый день' },
        { name: 'Базовая статистика и отслеживание прогресса' },
        { name: 'Базовая поддержка' },
      ],
      entireFeatureList,
      cta: {
        text: user?.userLevel === 'FREE' ? 'Текущий план' : 'Начать',
        href: '/signup',
      },
      mostPopular: false,
      disabled: user?.userLevel === 'FREE',
    },
    {
      id: 'premium',
      name: 'Премиум',
      paymentLink: {
        local:
          billingPeriod === 'month'
            ? `https://buy.stripe.com/14k15yef2bTqcHS4gr?client_reference_id=${user?.uid}`
            : `https://buy.stripe.com/28o8y0gna9LigY828k?client_reference_id=${user?.uid}`,
        production:
          billingPeriod === 'month'
            ? `https://buy.stripe.com/14k15yef2bTqcHS4gr?client_reference_id=${user?.uid}`
            : `https://buy.stripe.com/28o8y0gna9LigY828k?client_reference_id=${user?.uid}`,
      },
      price: billingPeriod === 'month' ? 5.99 : 4.99,
      currencySymbol: '$',
      frequency: billingPeriod,
      frequencyText:
        billingPeriod === 'month' ? 'в месяц, ежемесячно' : 'в месяц, годовая оплата',
      shortText: 'Идеально для тех, кто ищет персонализированный опыт изучения бизнеса.',
      features: [
        { name: 'Доступ к премиум урокам' },
        {
          name: 'Расширенные рекомендации уроков',
        },
        { name: 'Глубокая аналитика и отслеживание прогресса' },
        { name: '15 персонализированных программ под ваши цели каждый месяц' },
        { name: 'Персональные бизнес-кейсы' },
        { name: 'Неограниченные токены AI-наставника' },
        { name: 'Доступ к бета-функциям' },
        { name: 'Приоритетная поддержка' },
      ],
      compactFeatures: [
        { name: 'Доступ к премиум урокам' },
        { name: '15 персонализированных программ под ваши цели каждый месяц' },
        { name: 'Глубокая аналитика и отслеживание прогресса' },
        { name: 'Персональные бизнес-кейсы' },
        { name: 'Неограниченные токены AI-наставника' },
      ],
      entireFeatureList,
      cta: {
        text: user?.userLevel === 'PREMIUM' ? 'Current plan' : 'Get started',
        href: {
          local:
            billingPeriod === 'month'
              ? `https://buy.stripe.com/14k15yef2bTqcHS4gr?client_reference_id=${user?.uid}`
              : `https://buy.stripe.com/28o8y0gna9LigY828k?client_reference_id=${user?.uid}`,
          production:
            billingPeriod === 'month'
              ? `https://buy.stripe.com/14k15yef2bTqcHS4gr?client_reference_id=${user?.uid}`
              : `https://buy.stripe.com/28o8y0gna9LigY828k?client_reference_id=${user?.uid}`,
        },
      },
      mostPopular: false,
      disabled: user?.userLevel === 'PREMIUM',
    },
    /**
     * Lifetime plan
     */
    {
      id: 'price_1QoOikCX23ptLp4LTks1YO7V',
      name: 'Lifetime',
      price: 94.99,
      originalPrice: 149,
      chip: 'Save $40!',
      currencySymbol: '$',
      frequency: 'once',
      frequencyText: 'pay once, yours forever',
      shortText: 'Access to all features and future updates!',
      features: [
        { name: 'Access to premium questions' },
        {
          name: 'Enhanced question suggestions',
        },
        { name: 'In depth stat analysis and progress tracking' },
        { name: '25 personalized roadmaps tailored to your goals' },
        { name: 'Personalized coding challenges' },
        { name: '500 AI assistant tokens' },
        { name: 'Access to upcoming beta features' },
        { name: 'Priority support' },
        { name: 'Lifetime access to all features' },
      ],
      compactFeatures: [
        { name: 'Access to premium questions' },
        { name: '25 personalized roadmaps tailored to your goals' },
        { name: 'In depth stat analysis and progress tracking' },
        { name: 'Personalized coding challenges' },
        { name: '500 AI assistant tokens' },
        { name: 'Lifetime access to all features and future updates!' },
      ],
      entireFeatureList,
      paymentLink: {
        local: `https://buy.stripe.com/14kcOg1sgcXudLW28n?client_reference_id=${user?.uid}`,
        production: `https://buy.stripe.com/14kcOg1sgcXudLW28n?client_reference_id=${user?.uid}`,
      },
      cta: {
        text: user?.userLevel === 'PREMIUM' ? 'Current plan' : 'Get started',
        href: {
          local: `https://buy.stripe.com/14kcOg1sgcXudLW28n?client_reference_id=${user?.uid}`,
          production: `https://buy.stripe.com/14kcOg1sgcXudLW28n?client_reference_id=${user?.uid}`,
        },
      },
      mostPopular: false,
    },
  ];

  return plans;
};

export type Plan = ReturnType<typeof getPlans>[number];
