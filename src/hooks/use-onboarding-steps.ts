'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useOnboardingContext } from '@/contexts/onboarding-context';
import { updateUser } from '@/actions/user/authed/update-user';
// ВРЕМЕННО ЗАКОММЕНТИРОВАНО: отключаем Stripe функциональность до настройки API ключей
// import { createCouponOnSignup } from '@/actions/user/account/create-coupon';
// import { sendWelcomeEmail } from '@/actions/misc/send-welcome-email';

export const STEPS = {
  USER_DETAILS: 'USER_DETAILS', // get the users info
  INTRO_VIDEO: 'INTRO_VIDEO', // ЭТАП 7.1.1: новый шаг с вводным видео
  INITIAL_QUESTIONS: 'INITIAL_QUESTIONS', // give the user 3 very simple multiple choice questions to gauge skill level and give them quick wins!
  
  // ЭТАП 7.1.1: Временно отключенные шаги - НЕ УДАЛЯЕМ для возможности отката
  // TIME_COMMITMENT: 'TIME_COMMITMENT', // BIZLEVEL: get the users daily learning goal
  // NOTIFICATIONS: 'NOTIFICATIONS', // offer push notifications
  
  TAGS: 'TAGS', // get the users interests
  PRICING: 'PRICING', // get the users pricing plan
  QUESTIONS: 'QUESTIONS', // get the users questions
  FIRST_QUESTION_SELECTION: 'FIRST_QUESTION_SELECTION', // get the users first question (either send them to the first question or the tag selection)
} as const;

type StepKey = keyof typeof STEPS;
type StepValue = (typeof STEPS)[StepKey];

export function useOnboardingSteps() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    // serverUser, // BIZLEVEL: временно не используется
    user,
    // ЭТАП 6.2: Временно не используемые переменные
    // handleGetOnboardingQuestions,
    canContinue,
    // ЭТАП 7.1.1: Временно не используемые после упрощения onboarding
    // timeSpendingPerDay,
    // firstQuestionSelection,
    // FIRST_QUESTION_TUTORIAL_SLUG,
    totalXp,
  } = useOnboardingContext();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStepState] = useState<StepKey>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.slice(1).replace(/-/g, '_').toUpperCase();
      return Object.values(STEPS).includes(hash as StepValue) ? (hash as StepKey) : 'USER_DETAILS';
    }
    return 'USER_DETAILS';
  });

  // Update URL hash when step changes
  useEffect(() => {
    const hashValue = currentStep.toLowerCase().replace(/_/g, '-');
    window.location.hash = hashValue;
  }, [currentStep]);

  const stepConfig = {
    // ЭТАП 7.1.1: Упрощенный flow - USER_DETAILS → INTRO_VIDEO → первый урок
    [STEPS.USER_DETAILS]: {
      next: STEPS.INTRO_VIDEO, // было: STEPS.INITIAL_QUESTIONS
      component: 'OnboardingUserDetails',
    },
    [STEPS.INTRO_VIDEO]: {
      next: 'FIRST_LESSON', // Специальный маркер для перехода к первому уроку
      component: 'OnboardingIntroVideo',
    },
    
    // ЭТАП 7.1.1: Сохраняем остальные шаги для возможности отката, но не используем в основном flow
    [STEPS.INITIAL_QUESTIONS]: {
      next: STEPS.TAGS, // было: STEPS.TIME_COMMITMENT
      component: 'OnboardingInitialQuestions',
    },
    
    // ЭТАП 7.1.1: Временно отключенные шаги - СОХРАНЯЕМ код для отката
    /*
    [STEPS.TIME_COMMITMENT]: {
      next: STEPS.NOTIFICATIONS,
      component: 'OnboardingTimeCommitment',
    },
    [STEPS.NOTIFICATIONS]: {
      next: STEPS.PRICING, // было: STEPS.FIRST_QUESTION_SELECTION
      component: 'OnboardingNotifications',
    },
    */
    
    // ЭТАП 6.2: Временно скрываем шаг выбора - TODO: v2.0 добавить персонализацию
    [STEPS.FIRST_QUESTION_SELECTION]: {
      next: STEPS.TAGS,
      component: 'OnboardingFirstQuestionSelection',
    },
    [STEPS.TAGS]: {
      next: STEPS.PRICING,
      component: 'OnboardingTags',
    },
    [STEPS.PRICING]: {
      next: 'DASHBOARD', // Направляем сразу на dashboard после pricing
      component: 'OnboardingPricing',
    },
    [STEPS.QUESTIONS]: {
      next: 'DASHBOARD',
      component: 'OnboardingQuestions',
    },
  } as const;

  const handleSkip = () => {
    const nextStep = stepConfig[currentStep].next;
    if (nextStep === 'DASHBOARD') {
      localStorage.removeItem('onboarding');
      window.location.hash = '';
      router.push('/dashboard?onboarding=true');
    }
    // ЭТАП 7.1.1: Переход к первому уроку после INTRO_VIDEO
    else if (nextStep === 'FIRST_LESSON') {
      localStorage.removeItem('onboarding');
      window.location.hash = '';
      router.push('/question/welcome-to-business?onboarding=true');
    }
    // if the user is skipping past the tags, redirect to the dashboard
    else if (nextStep === STEPS.TAGS) {
      localStorage.removeItem('onboarding');
      router.push('/dashboard?onboarding=true');
    } else {
      setCurrentStepState(nextStep as StepKey);
    }
  };

  const handleContinue = async () => {
    if (!user || !canContinue) return;

    setIsLoading(true);
    try {
      // ЭТАП 7.1.1: Новая логика для INTRO_VIDEO шага
      if (currentStep === STEPS.INTRO_VIDEO) {
        // После просмотра вводного видео направляем на первый урок
        localStorage.removeItem('onboarding');
        window.location.hash = '';
        router.push('/question/welcome-to-business?onboarding=true');
        return;
      }

      // ЭТАП 6.2: Упрощенный онбординг - убираем логику выбора первого вопроса
      // TODO: v2.0 - вернуть персонализацию через выбор пути обучения
      
      // После pricing сразу направляем на первый уровень обучения
      if (currentStep === STEPS.PRICING) {
        // Проверяем показывался ли pricing ранее
        const pricingShown = localStorage.getItem('pricingShown');
        if (!pricingShown) {
          localStorage.setItem('pricingShown', 'true');
        }
        
        // remove onboarding data
        localStorage.removeItem('onboarding');
        // Направляем на первый уровень обучения
        router.push('/roadmaps?level=1&onboarding=true');
        return;
      }

      // ЭТАП 7.1.1: Убираем логику TIME_COMMITMENT (временно отключен)
      /*
      if (currentStep === STEPS.TIME_COMMITMENT) {
        await updateUser({ userDetails: { ...user, timeSpendingPerDay } });
        setCurrentStepState(stepConfig[STEPS.TIME_COMMITMENT].next as StepKey);
      } 
      */
      
      if (currentStep === STEPS.USER_DETAILS) {
        await updateUser({ userDetails: user });

        // if this is false, we need to create a coupon and send the welcome email
        // ВРЕМЕННО ЗАКОММЕНТИРОВАНО: отключаем Stripe функциональность до настройки API ключей
        /*
        if (!user.hasCreatedCustomSignupCoupon) {
          const coupon = await createCouponOnSignup();
          // send the welcome email
          await sendWelcomeEmail(serverUser, coupon?.name ?? '');
        }
        */

        setCurrentStepState(stepConfig[STEPS.USER_DETAILS].next as StepKey);
      } else if (currentStep === STEPS.INITIAL_QUESTIONS) {
        // Fix the userXp field by ensuring it's a numeric value
        // Make sure to use the existing user object and only update the userXp field
        const userXpValue = typeof totalXp === 'number' && !isNaN(totalXp) ? totalXp : 0;

        try {
          await updateUser({
            userDetails: {
              ...user,
              userXp: userXpValue,
            },
          });
          console.log(`Successfully updated user with XP: ${userXpValue}`);
          setCurrentStepState(stepConfig[STEPS.INITIAL_QUESTIONS].next as StepKey);
        } catch (error) {
          console.error('Error updating user XP:', error);
          // We'll still proceed to the next step even if the XP update fails
          setCurrentStepState(stepConfig[STEPS.INITIAL_QUESTIONS].next as StepKey);
        }
      } else {
        await updateUser({ userDetails: user });
        const nextStep = stepConfig[currentStep].next;

        if (nextStep === 'DASHBOARD') {
          localStorage.removeItem('onboarding');
          router.push('/dashboard?onboarding=true');
        } else if (nextStep === STEPS.PRICING) {
          setCurrentStepState(STEPS.PRICING);
        } else {
          setCurrentStepState(nextStep as StepKey);
        }
      }
    } catch (error) {
      console.error('Error during continue:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    // ЭТАП 6.2: Упрощенная логика возврата назад
    const previousStep = Object.entries(stepConfig).find(
      ([, config]) => config.next === currentStep
    )?.[0];
    if (previousStep) {
      setCurrentStepState(previousStep as StepKey);
    }
  };

  const showSkipButton = () => {
    const refInUrl = searchParams.get('ref') !== null;
    const isStepOne = currentStep === STEPS.USER_DETAILS;
    const hasUsername = (user?.username?.length ?? 0) > 0;

    return refInUrl || (!isStepOne && hasUsername) || (isStepOne && refInUrl && hasUsername);
  };

  return {
    currentStep,
    isLoading,
    handleSkip,
    handleContinue,
    handleBack,
    showSkipButton,
    stepConfig,
  };
}
