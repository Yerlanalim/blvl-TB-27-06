import { QuestionResources, StatisticsReport, UserBookmarks } from '@prisma/client';
import { QuestionAnswer } from './QuestionAnswers';
import { Tags } from './Tags';
import { Answer } from './Answers';

export type QuestionDifficulty = 'BEGINNER' | 'EASY' | 'MEDIUM' | 'HARD';

// BIZLEVEL: Добавлен VIDEO тип для бизнес-уроков
export type QuestionType = 'MULTIPLE_CHOICE' | 'CODING_CHALLENGE' | 'SIMPLE_MULTIPLE_CHOICE' | 'VIDEO';

/**
 * Структура тест-кейса для CODING_CHALLENGE вопросов
 */
export interface TestCase {
  input: any[];
  expected: any;
  isHidden?: boolean;
}

/**
 * Конфигурация параметров для CODING_CHALLENGE вопросов
 */
export interface ParamConfig {
  name: string;
  type: 'string' | 'number' | 'boolean';
  required: boolean;
}

/**
 * Утилитарные функции для безопасного преобразования JSON данных
 */
export function parseTestCases(jsonValue: any): TestCase[] | null {
  if (!jsonValue) return null;
  if (Array.isArray(jsonValue)) return jsonValue as TestCase[];
  if (typeof jsonValue === 'string') {
    try {
      const parsed = JSON.parse(jsonValue);
      return Array.isArray(parsed) ? parsed : null;
    } catch {
      return null;
    }
  }
  return null;
}

export function parseExpectedParams(jsonValue: any): ParamConfig[] | null {
  if (!jsonValue) return null;
  if (Array.isArray(jsonValue)) return jsonValue as ParamConfig[];
  if (typeof jsonValue === 'string') {
    try {
      const parsed = JSON.parse(jsonValue);
      return Array.isArray(parsed) ? parsed : null;
    } catch {
      return null;
    }
  }
  return null;
}

/**
 * This type represents the shape of the data of a question.
 */
export type Question = {
  title: string | null;
  description: string | null;
  answers: QuestionAnswer[];
  uid: string;
  question: string;
  createdAt: Date;
  updatedAt: Date;
  questionDate: string | null;
  answerResource: string | null;
  correctAnswer: string | null;

  codeSnippet: string | null;

  /** Идентификатор Vimeo видео для VIDEO вопросов */
  videoId: string | null;

  hint: string | null;

  dailyQuestion: boolean;

  customQuestion: boolean;

  tags?: Tags[];

  difficulty: QuestionDifficulty;

  linkedReports?: StatisticsReport[];

  QuestionResources?: QuestionResources[];

  slug: string | null;

  slugGenerated: boolean;

  questionType: QuestionType;

  nextQuestionSlug: string | null;

  previousQuestionSlug: string | null;

  // Строго типизированные поля для CODING_CHALLENGE (null для других типов)
  testCases: TestCase[] | null;

  functionName: string | null;

  // Строго типизированные параметры для CODING_CHALLENGE (null для других типов)
  expectedParams: ParamConfig[] | null;

  bookmarks?: UserBookmarks[];

  isPremiumQuestion: boolean;

  userAnswers?: Answer[];

  afterQuestionInfo?: string | null;

  aiTimeToComplete?: number | null;
};

/**
 * Тип для данных из Prisma (с JsonValue типами)
 */
export type QuestionFromDB = Omit<Question, 'testCases' | 'expectedParams'> & {
  testCases: any; // JsonValue из Prisma
  expectedParams: any; // JsonValue из Prisma
};

/**
 * Функция для преобразования Question из БД в типизированный Question
 */
export function transformQuestionFromDB(dbQuestion: QuestionFromDB): Question {
  return {
    ...dbQuestion,
    testCases: parseTestCases(dbQuestion.testCases),
    expectedParams: parseExpectedParams(dbQuestion.expectedParams),
  };
}

export type QuestionWithoutAnswers = Omit<
  Question,
  'answers' | 'testCases' | 'functionName' | 'expectedParams'
>;

export type QuestionWithTags = QuestionWithoutAnswers & {
  tags: {
    tag: {
      uid: string;
      name: string;
    };
  }[];
};

/** Mock question type for storybook */
export interface QuestionMock {
  uid: string;
  question: string;
  questionDate: string;
  correctAnswer: string;
  answers: QuestionAnswer[];
  createdAt?: Date;
  updatedAt?: Date;
  title?: string | null;
  description?: string | null;
  dailyQuestion?: boolean;
  customQuestion?: boolean;
  difficulty?: string;
  slug?: string | null;
  slugGenerated?: boolean;
  questionType?: string;
  videoId?: string | null;
  [key: string]: any;
}
