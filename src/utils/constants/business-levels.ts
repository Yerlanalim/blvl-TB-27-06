export interface BusinessLevel {
  slug: string;
  title: string;
  description: string;
  questionSlugs: string[];
  estimatedTime: number; // в минутах
  unlockCondition: string;
  isUnlocked: boolean;
  videoLessons: number;
  testLessons: number;
  totalLessons: number;
  level: number;
}

// BIZLEVEL: Константы бизнес-уровней для пошагового обучения предпринимательству
export const businessLevels: BusinessLevel[] = [
  {
    slug: 'level-1',
    title: 'Основы бизнеса',
    description: 'Изучите фундаментальные концепции бизнеса. Узнайте что такое бизнес-модель, как ставить цели и определять целевую аудиторию.',
    questionSlugs: [
      // Пока пустые, будут заполнены при создании вопросов
    ],
    estimatedTime: 45, // 3 видео по 10 мин + 2 теста по 7.5 мин
    unlockCondition: 'Доступен сразу',
    isUnlocked: true,
    videoLessons: 3,
    testLessons: 2,
    totalLessons: 5,
    level: 1,
  },
  {
    slug: 'level-2',
    title: 'Маркетинг',
    description: 'Научитесь привлекать клиентов и продвигать свой продукт. Изучите основы маркетинга, рекламы и работы с аудиторией.',
    questionSlugs: [
      // Пока пустые, будут заполнены при создании вопросов
    ],
    estimatedTime: 62, // 4 видео по 10 мин + 3 теста по 7.5 мин
    unlockCondition: 'Завершите "Основы бизнеса"',
    isUnlocked: false,
    videoLessons: 4,
    testLessons: 3,
    totalLessons: 7,
    level: 2,
  },
  {
    slug: 'level-3',
    title: 'Продажи',
    description: 'Освойте искусство продаж и переговоров. Научитесь работать с возражениями, закрывать сделки и строить долгосрочные отношения с клиентами.',
    questionSlugs: [
      // Пока пустые, будут заполнены при создании вопросов
    ],
    estimatedTime: 52, // 3 видео по 10 мин + 3 теста по 7.5 мин
    unlockCondition: 'Завершите "Маркетинг"',
    isUnlocked: false,
    videoLessons: 3,
    testLessons: 3,
    totalLessons: 6,
    level: 3,
  },
  {
    slug: 'level-4',
    title: 'Управление',
    description: 'Изучите основы управления бизнесом и командой. Научитесь планировать, делегировать задачи и принимать эффективные решения.',
    questionSlugs: [
      // Пока пустые, будут заполнены при создании вопросов
    ],
    estimatedTime: 72, // 5 видео по 10 мин + 3 теста по 7.5 мин
    unlockCondition: 'Завершите "Продажи"',
    isUnlocked: false,
    videoLessons: 5,
    testLessons: 3,
    totalLessons: 8,
    level: 4,
  },
  {
    slug: 'level-5',
    title: 'Финансы',
    description: 'Освойте финансовое планирование и управление денежными потоками. Изучите основы инвестиций, бюджетирования и финансового анализа.',
    questionSlugs: [
      // Пока пустые, будут заполнены при создании вопросов
    ],
    estimatedTime: 62, // 4 видео по 10 мин + 3 теста по 7.5 мин
    unlockCondition: 'Завершите "Управление"',
    isUnlocked: false,
    videoLessons: 4,
    testLessons: 3,
    totalLessons: 7,
    level: 5,
  },
];

// Утилитарные функции для работы с уровнями
export const getBusinessLevelBySlug = (slug: string): BusinessLevel | undefined => {
  return businessLevels.find(level => level.slug === slug);
};

export const getUnlockedLevels = (): BusinessLevel[] => {
  return businessLevels.filter(level => level.isUnlocked);
};

export const getNextLevel = (currentLevelSlug: string): BusinessLevel | undefined => {
  const currentIndex = businessLevels.findIndex(level => level.slug === currentLevelSlug);
  return currentIndex !== -1 && currentIndex < businessLevels.length - 1 
    ? businessLevels[currentIndex + 1] 
    : undefined;
};

export const getTotalEstimatedTime = (): number => {
  return businessLevels.reduce((total, level) => total + level.estimatedTime, 0);
};

export const getTotalLessons = (): number => {
  return businessLevels.reduce((total, level) => total + level.totalLessons, 0);
}; 