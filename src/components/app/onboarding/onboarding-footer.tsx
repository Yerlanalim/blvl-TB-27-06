import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/loading';
import { ArrowLeft } from 'lucide-react';
import { CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { STEPS } from '@/hooks/use-onboarding-steps';
import { useOnboardingContext } from '@/contexts/onboarding-context';

interface OnboardingFooterProps {
  currentStep: keyof typeof STEPS;
  isLoading: boolean;
  showSkipButton: boolean;
  onSkip: () => void;
  onContinue: () => void;
  onBack: () => void;
}

export default function OnboardingFooter({
  currentStep,
  isLoading,
  showSkipButton,
  onSkip,
  onContinue,
  onBack,
}: OnboardingFooterProps) {
  const { user, canContinue } = useOnboardingContext();

  return (
    <CardFooter
      className={cn(
        'flex flex-wrap items-center gap-3 lg:justify-between',
        currentStep === STEPS.USER_DETAILS && 'lg:justify-end'
      )}
    >
      <AnimatePresence>
        {(currentStep === STEPS.PRICING ||
          currentStep === STEPS.INITIAL_QUESTIONS ||
          currentStep === STEPS.QUESTIONS ||
          currentStep === STEPS.INTRO_VIDEO ||
          currentStep === STEPS.TAGS ||
          currentStep === STEPS.FIRST_QUESTION_SELECTION) && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Button type="button" variant="secondary" onClick={onBack} disabled={isLoading}>
              <ArrowLeft className="mr-2 size-4" />
              Back
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex items-center gap-x-3">
        {showSkipButton &&
          currentStep !== STEPS.FIRST_QUESTION_SELECTION &&
          currentStep !== STEPS.INITIAL_QUESTIONS && (
            <Button type="button" variant="ghost" onClick={onSkip} disabled={isLoading}>
              Skip
            </Button>
          )}
        <Button
          variant="accent"
          type="button"
          onClick={onContinue}
          disabled={
            isLoading ||
            !canContinue ||
            (!user?.username && currentStep === STEPS.USER_DETAILS) ||
            (!user?.howDidYouHearAboutBizLevel && currentStep === STEPS.USER_DETAILS)
          }
        >
          {currentStep === STEPS.INTRO_VIDEO ? 'Начать обучение' : 'Continue'}
          {isLoading && <LoadingSpinner className="ml-2 size-4" />}
        </Button>
      </div>
    </CardFooter>
  );
}
