export interface StudyPath {
  slug: string;
  title: string;
  description: string;
  heroChip: React.ReactNode;
  questionSlugs: string[];
  educationLevel: string;
}

// BIZLEVEL: Заменены технические пути на бизнес-обучение
export const studyPaths: StudyPath[] = [
  {
    title: 'Основы предпринимательства',
    slug: 'business-fundamentals',
    description:
      'Изучите основные концепции ведения бизнеса. Узнайте о бизнес-моделях, планировании, анализе рынка и создании стратегии развития.',
    heroChip: 'Все что нужно для начала вашего бизнес-пути',
    questionSlugs: [
      // BIZLEVEL: Здесь будут бизнес-вопросы когда они будут созданы
    ],
    educationLevel: 'beginner',
  },
  {
    title: 'Маркетинг и продвижение',
    slug: 'marketing-fundamentals',
    description: 'Научитесь продвигать ваш продукт или услугу. Изучите основы маркетинга, рекламы и работы с клиентами.',
    heroChip: 'Изучите как привлекать и удерживать клиентов',
    questionSlugs: [
      // BIZLEVEL: Здесь будут маркетинговые вопросы когда они будут созданы
    ],
    educationLevel: 'beginner',
  },
  {
    title: 'Финансовое планирование',
    slug: 'financial-planning',
    description: 'Основы финансового планирования в бизнесе. Бюджетирование, инвестиции и управление денежными потоками.',
    heroChip: 'Научитесь управлять финансами бизнеса',
    questionSlugs: [
      // BIZLEVEL: Здесь будут финансовые вопросы когда они будут созданы
    ],
    educationLevel: 'intermediate',
  },
  {
    title: 'Управление командой',
    slug: 'team-management',
    description: 'Изучите основы управления людьми в бизнесе. Мотивация, делегирование и построение эффективной команды.',
    heroChip: 'Научитесь эффективно управлять командой',
    questionSlugs: [
      // BIZLEVEL: Здесь будут вопросы по управлению когда они будут созданы
    ],
    educationLevel: 'intermediate',
  },
  {
    title: 'Продажи и переговоры',
    slug: 'sales-negotiations',
    description: 'Основы продаж и ведения переговоров. Техники убеждения, работа с возражениями и закрытие сделок.',
    heroChip: 'Изучите искусство продаж и переговоров',
    questionSlugs: [
      // BIZLEVEL: Здесь будут вопросы по продажам когда они будут созданы
    ],
    educationLevel: 'intermediate',
  },
  {
    title: 'Цифровой маркетинг',
    slug: 'digital-marketing',
    description: 'Современные методы продвижения в интернете. Социальные сети, контент-маркетинг и онлайн-реклама.',
    heroChip: 'Освойте цифровые каналы продвижения',
    questionSlugs: [
      // BIZLEVEL: Здесь будут вопросы по цифровому маркетингу когда они будут созданы
    ],
    educationLevel: 'advanced',
  },
];
