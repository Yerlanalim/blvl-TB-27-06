import { Metadata } from 'next';
import LevelsList from '@/components/app/levels/levels-list';

// SEO метаданные
export const metadata: Metadata = {
  title: 'Карта уровней | BizLevel',
  description: 'Просматривайте свой прогресс и открывайте новые уровни обучения бизнесу на BizLevel.',
};

// Статическая информация о уровнях (номер, название, описание)
const LEVELS_INFO = [
  {
    number: 1,
    title: 'Осознание бизнес-целей: быстрый старт',
    description:
      'Определяем ключевые цели вашего бизнеса и ожидаемые результаты на ближайший месяц.',
  },
  {
    number: 2,
    title: 'Экспресс-стресс-менеджмент',
    description: 'Техники снятия стресса и поддержания продуктивности предпринимателя.',
  },
  {
    number: 3,
    title: 'Управление приоритетами: матрица «Важно-Срочно»',
    description: 'Учимся выделять главное и эффективно распределять время.',
  },
  {
    number: 4,
    title: 'Базовый учёт доходов/расходов',
    description: 'Простой метод контроля финансов и разделения личных и бизнес-средств.',
  },
  {
    number: 5,
    title: 'Создание УТП',
    description: 'Формируем уникальность продукта или услуги на рынке.',
  },
  {
    number: 6,
    title: 'Elevator Pitch: 1-минутное представление',
    description: 'Как за 60 секунд заинтересовать партнёра или инвестора.',
  },
  {
    number: 7,
    title: 'Мини-планирование на неделю (SMART)',
    description: 'Ставим SMART-цели и достигаем их пошагово.',
  },
  {
    number: 8,
    title: 'Блиц-опрос клиентов: 5 ключевых вопросов',
    description: 'Выявляем реальные потребности клиентов через короткие интервью.',
  },
  {
    number: 9,
    title: 'Регистрация и юридический чек-лист',
    description: 'Проверяем правильность оформления компании и налогов.',
  },
  {
    number: 10,
    title: 'Моя карта ближайших действий',
    description: 'Собираем все знания в план конкретных шагов.',
  },
];

export default function LevelsPage() {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-white">Карта уровней</h1>
      {/* Client-side список, чтобы учитывать персональный прогресс */}
      <LevelsList levels={LEVELS_INFO} />
    </div>
  );
} 