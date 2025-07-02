'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useOnboardingContext } from '@/contexts/onboarding-context';
import { updateUser } from '@/actions/user/authed/update-user';

export const STEPS = {
  USER_DETAILS: 'USER_DETAILS',
  INTRO_VIDEO: 'INTRO_VIDEO',
  INITIAL_QUESTIONS: 'INITIAL_QUESTIONS',
  TAGS: 'TAGS',
  PRICING: 'PRICING',
  QUESTIONS: 'QUESTIONS',
  FIRST_QUESTION_SELECTION: 'FIRST_QUESTION_SELECTION',
} as const;

type StepKey = keyof typeof STEPS;
type StepValue = (typeof STEPS)[StepKey];

export function useOnboardingSteps() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    user,
    canContinue,
    totalXp,
  } = useOnboardingContext();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStepState] = useState<StepKey>('USER_DETAILS');

  // Initialize step from URL hash after hydration
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.slice(1).replace(/-/g, '_').toUpperCase();
      if (Object.values(STEPS).includes(hash as StepValue)) {
        setCurrentStepState(hash as StepKey);
      }
    }
  }, []);

  // Update URL hash when step changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hashValue = currentStep.toLowerCase().replace(/_/g, '-');
      window.location.hash = hashValue;
    }
  }, [currentStep]);

  const stepConfig = {
    [STEPS.USER_DETAILS]: {
      next: STEPS.INTRO_VIDEO,
      component: 'OnboardingUserDetails',
    },
    [STEPS.INTRO_VIDEO]: {
      next: 'FIRST_LESSON',
      component: 'OnboardingIntroVideo',
    },
    [STEPS.INITIAL_QUESTIONS]: {
      next: STEPS.TAGS,
      component: 'OnboardingInitialQuestions',
    },
    [STEPS.FIRST_QUESTION_SELECTION]: {
      next: STEPS.TAGS,
      component: 'OnboardingFirstQuestionSelection',
    },
    [STEPS.TAGS]: {
      next: STEPS.PRICING,
      component: 'OnboardingTags',
    },
    [STEPS.PRICING]: {
      next: 'DASHBOARD',
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
      if (typeof window !== 'undefined') {
        localStorage.removeItem('onboarding');
        window.location.hash = '';
      }
      router.push('/dashboard?onboarding=true');
    }
    else if (nextStep === 'FIRST_LESSON') {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('onboarding');
        window.location.hash = '';
      }
      // BIZLEVEL: Перенаправляем на карту уровней вместо несуществующего вопроса
      router.push('/roadmaps?level=1&onboarding=true');
    }
    else if (nextStep === STEPS.TAGS) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('onboarding');
      }
      router.push('/dashboard?onboarding=true');
    } else {
      setCurrentStepState(nextStep as StepKey);
    }
  };

  const handleContinue = async () => {
    if (!user || !canContinue) return;

    setIsLoading(true);
    try {
      if (currentStep === STEPS.INTRO_VIDEO) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('onboarding');
          window.location.hash = '';
        }
        // BIZLEVEL: Перенаправляем на карту уровней вместо несуществующего вопроса
        router.push('/roadmaps?level=1&onboarding=true');
        return;
      }

      if (currentStep === STEPS.PRICING) {
        if (typeof window !== 'undefined') {
          const pricingShown = localStorage.getItem('pricingShown');
          if (!pricingShown) {
            localStorage.setItem('pricingShown', 'true');
          }
          localStorage.removeItem('onboarding');
        }
        router.push('/roadmaps?level=1&onboarding=true');
        return;
      }

      if (currentStep === STEPS.USER_DETAILS) {
        await updateUser({ userDetails: user });
        setCurrentStepState(stepConfig[STEPS.USER_DETAILS].next as StepKey);
      } else if (currentStep === STEPS.INITIAL_QUESTIONS) {
        const userXpValue = typeof totalXp === 'number' && !isNaN(totalXp) ? totalXp : 0;

        try {
          await updateUser({
            userDetails: {
              ...user,
              userXp: userXpValue,
            },
          });
          setCurrentStepState(stepConfig[STEPS.INITIAL_QUESTIONS].next as StepKey);
        } catch (error) {
          console.error('Error updating user XP:', error);
          setCurrentStepState(stepConfig[STEPS.INITIAL_QUESTIONS].next as StepKey);
        }
      } else {
        await updateUser({ userDetails: user });
        const nextStep = stepConfig[currentStep].next;

        if (nextStep === 'DASHBOARD') {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('onboarding');
          }
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
