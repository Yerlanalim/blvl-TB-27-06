'use client';

import { motion } from 'framer-motion';

// components
import { Card } from '@/components/ui/card';
import OnboardingUserDetails from './onboarding-user-details';
import OnboardingIntroVideo from './onboarding-intro-video'; // ЭТАП 7.1.1: новый компонент
// ЭТАП 7.1.1: Временно отключенные компоненты
// import OnboardingTimeCommitment from './onboarding-time-commitment';
// import OnboardingNotifications from './onboarding-notifications';
import OnboardingTags from './onboarding-tags';
import OnboardingQuestions from './onboarding-questions';
import OnboardingPricing from './onboarding-pricing';
import OnboardingFooter from './onboarding-footer';
import OnboardingInitialQuestions from './onboarding-initial-questions';

// contexts
import { useOnboardingContext } from '@/contexts/onboarding-context';

// utils
import { cn } from '@/lib/utils';

// hooks
import { useOnboardingSteps, STEPS } from '@/hooks/use-onboarding-steps';
// ЭТАП 6.2: Временно скрыто - будет добавлено в v2.0
// import OnboardingFirstQuestionSelection from './onboarding-first-question-selection';
import OnboardingFirstQuestionSelectionPlaceholder from './onboarding-first-question-selection-placeholder';

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      staggerChildren: 0.1,
    },
  },
};

const stepComponents = {
  [STEPS.USER_DETAILS]: OnboardingUserDetails,
  [STEPS.INTRO_VIDEO]: OnboardingIntroVideo, // ЭТАП 7.1.1: новый шаг с вводным видео
  [STEPS.INITIAL_QUESTIONS]: OnboardingInitialQuestions,
  
  // ЭТАП 7.1.1: Временно отключенные компоненты - сохраняем для отката
  // [STEPS.TIME_COMMITMENT]: OnboardingTimeCommitment,
  // [STEPS.NOTIFICATIONS]: OnboardingNotifications,
  
  // ЭТАП 6.2: Временно показываем заглушку вместо полноценного компонента
  [STEPS.FIRST_QUESTION_SELECTION]: OnboardingFirstQuestionSelectionPlaceholder,
  [STEPS.TAGS]: OnboardingTags,
  [STEPS.QUESTIONS]: OnboardingQuestions,
  [STEPS.PRICING]: OnboardingPricing,
};

export default function OnboardingForm() {
  const { itemVariants } = useOnboardingContext();
  const { currentStep, isLoading, handleSkip, handleContinue, handleBack, showSkipButton } =
    useOnboardingSteps();

  const StepComponent = stepComponents[currentStep];

  return (
    <div className="container min-h-screen flex items-center justify-center p-4">
      <motion.div initial="hidden" animate="visible" variants={containerVariants}>
        <Card
          className={cn(
            'rounded-lg shadow-xl overflow-hidden min-w-fit relative',
            currentStep === STEPS.PRICING ||
              currentStep === STEPS.INTRO_VIDEO,
            currentStep === STEPS.PRICING || 
              currentStep === STEPS.INITIAL_QUESTIONS ||
              currentStep === STEPS.INTRO_VIDEO
              ? 'border-none'
              : 'border border-black-50'
          )}
          style={{
            background:
              currentStep === STEPS.PRICING || 
              currentStep === STEPS.INITIAL_QUESTIONS ||
              currentStep === STEPS.INTRO_VIDEO
                ? 'none'
                : 'radial-gradient(128% 107% at 0% 0%, #212121 0%, rgb(0,0,0) 77.61%)',
          }}
        >
          <StepComponent />
          <motion.div variants={itemVariants}>
            <OnboardingFooter
              currentStep={currentStep}
              isLoading={isLoading}
              showSkipButton={showSkipButton()}
              onSkip={handleSkip}
              onContinue={handleContinue}
              onBack={handleBack}
            />
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}
