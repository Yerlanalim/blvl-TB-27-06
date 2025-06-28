'use client';

/**
 * wrapper to provide a context for the onboarding flow
 * this context will be used to store all user onboarding data
 * throughout the different steps of the onboarding flow
 */
import { createContext, useContext, useState } from 'react';
import type { UpdatableUserFields, UserRecord, QuestionWithTags } from '@/types';
import { getOnboardingQuestions } from '@/utils/data/questions/get-onboarding';
import { UserTimeSpendingPerDay } from '@prisma/client';
import { answerOnboardingQuestions } from '@/actions/answers/answer-onboarding';

// context type
type OnboardingContextType = {
  user: Omit<UpdatableUserFields, 'email' | 'userLevel' | 'lastLogin' | 'createdAt' | 'updatedAt'>;
  setUser: React.Dispatch<
    React.SetStateAction<
      Omit<UpdatableUserFields, 'email' | 'userLevel' | 'lastLogin' | 'createdAt' | 'updatedAt'>
    >
  >;
  serverUser: UserRecord | null;
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  currentStep: 'stepOne' | 'stepTwo' | 'stepThree' | 'stepFour' | 'stepFive';
  setCurrentStep: React.Dispatch<
    React.SetStateAction<'stepOne' | 'stepTwo' | 'stepThree' | 'stepFour' | 'stepFive'>
  >;
  onboardingQuestions: QuestionWithTags[];
  handleGetOnboardingQuestions: () => Promise<void>;
  itemVariants: any;
  canContinue: boolean;
  setCanContinue: React.Dispatch<React.SetStateAction<boolean>>;
  timeSpendingPerDay: UserTimeSpendingPerDay | null;
  setTimeSpendingPerDay: React.Dispatch<React.SetStateAction<UserTimeSpendingPerDay | null>>;
  handleSetUserTimeSpendingPerDay: (timeSpendingPerDay: UserTimeSpendingPerDay) => void;
  firstQuestionSelection: 'startFromScratch' | 'personalizeLearning';
  setFirstQuestionSelection: React.Dispatch<
    React.SetStateAction<'startFromScratch' | 'personalizeLearning'>
  >;
  FIRST_QUESTION_TUTORIAL_SLUG: string;
  totalXp: number;
  setTotalXp: React.Dispatch<React.SetStateAction<number>>;
  questions: {
    uid: string;
    question: string;
    options: string[];
    correctAnswerIndex: number;
  }[];
  answerUserOnboardingQuestions: (
    questionUids: string[],
    correctAnswers: boolean[]
  ) => Promise<void>;
};

// create the context
const OnboardingContext = createContext<OnboardingContextType | null>(null);

// provide the context to all the children components
export const UserOnboardingContextProvider = ({
  children,
  serverUser,
}: {
  children: React.ReactNode;
  serverUser: UserRecord | null;
}) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // STATE

  // user state
  const [user, setUser] = useState<
    Omit<UpdatableUserFields, 'email' | 'userLevel' | 'lastLogin' | 'createdAt' | 'updatedAt'>
  >(
    serverUser as Omit<
      UpdatableUserFields,
      'email' | 'userLevel' | 'lastLogin' | 'createdAt' | 'updatedAt'
    >
  );

  const [canContinue, setCanContinue] = useState(true);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [currentStep, setCurrentStep] = useState<
    'stepOne' | 'stepTwo' | 'stepThree' | 'stepFour' | 'stepFive'
  >('stepOne');

  const [onboardingQuestions, setOnboardingQuestions] = useState<any[]>([]);

  const [timeSpendingPerDay, setTimeSpendingPerDay] = useState<UserTimeSpendingPerDay | null>(
    user?.timeSpendingPerDay || null
  );

  const [firstQuestionSelection, setFirstQuestionSelection] = useState<
    'startFromScratch' | 'personalizeLearning'
  >('startFromScratch');

  // CONSTANTS

  const FIRST_QUESTION_TUTORIAL_SLUG = 'writing-your-first-function';

  const [totalXp, setTotalXp] = useState(0);

  // BIZLEVEL: Questions data with correct answers - заменено на бизнес-вопросы
  const questions = [
    {
      uid: 'fj9348dhj2839h8d7wj9c0-dwn89nb2ubuc8w', // uid so we can save the user's answer to the db
      question: 'Что такое бизнес-модель?',
      options: [
        'Способ зарабатывать деньги',
        'План развития компании',
        'Описание того, как компания создает, предоставляет и получает ценность',
        'Не уверен',
      ],
      correctAnswerIndex: 2,
    },
    {
      uid: 'dh3982dh893ucb98nc90-cnuw2-xchmovkd',
      question: 'Что такое целевая аудитория?',
      options: [
        'Все люди на планете',
        'Группа людей, которым предназначен ваш продукт или услуга',
        'Только богатые клиенты',
        'Не уверен',
      ],
      correctAnswerIndex: 1,
    },
    {
      uid: 'dn3u29x98n23n9cm0c3-d32nuixwenciub',
      question: 'Что важнее всего при запуске бизнеса?',
      options: ['Большой стартовый капитал', 'Понимание потребностей клиентов', 'Красивый офис', 'Не уверен'],
      correctAnswerIndex: 1,
    },
  ];

  // METHODS

  const handleSetUserTimeSpendingPerDay = (timeSpendingPerDay: UserTimeSpendingPerDay) => {
    setTimeSpendingPerDay(timeSpendingPerDay);
    setUser({ ...user, timeSpendingPerDay });
  };

  const handleGetOnboardingQuestions = async () => {
    const questions = await getOnboardingQuestions(selectedTags);
    setOnboardingQuestions(questions);
  };

  const answerUserOnboardingQuestions = async (
    questionUids: string[],
    correctAnswers: boolean[]
  ) => {
    await answerOnboardingQuestions(questionUids, correctAnswers);
  };

  return (
    <OnboardingContext.Provider
      value={{
        user,
        setUser,
        serverUser,
        selectedTags,
        setSelectedTags,
        currentStep,
        setCurrentStep,
        onboardingQuestions,
        handleGetOnboardingQuestions,
        itemVariants,
        setCanContinue,
        canContinue,
        timeSpendingPerDay,
        setTimeSpendingPerDay,
        handleSetUserTimeSpendingPerDay,
        firstQuestionSelection,
        setFirstQuestionSelection,
        FIRST_QUESTION_TUTORIAL_SLUG,
        totalXp,
        setTotalXp,
        questions,
        answerUserOnboardingQuestions,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

// custom hook to use the context
export const useOnboardingContext = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboardingContext must be used within a UserContextProvider');
  }
  return context;
};
